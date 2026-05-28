// Replacement entrypoint for Stockfish. The official main.cpp is excluded
// from the build (see podspec). This file exposes a small C ABI the
// Swift/ObjC++ bridge calls to feed UCI commands and read engine output
// line-by-line.
//
// Stockfish 17.1's main.cpp does:
//     Bitboards::init();
//     Position::init();
//     UCIEngine uci(argc, argv);
//     Tune::init(uci.engine_options());
//     uci.loop();
// UCIEngine reads from std::cin and writes to std::cout, so we hijack
// both via custom std::streambuf subclasses backed by in-memory queues.

#include <atomic>
#include <chrono>
#include <condition_variable>
#include <cstring>
#include <deque>
#include <iostream>
#include <mutex>
#include <string>
#include <thread>

#include "bitboard.h"
#include "position.h"
#include "tune.h"
#include "uci.h"

namespace {
  std::thread engine_thread;
  std::atomic<bool> running{false};

  std::mutex in_mu, out_mu;
  std::condition_variable in_cv, out_cv;
  std::deque<std::string> in_queue;
  std::deque<std::string> out_queue;

  class QueueOutBuf : public std::streambuf {
    std::string buf;
  protected:
    int_type overflow(int_type c) override {
      if (c == traits_type::eof()) return c;
      if (c == '\n') {
        flushLine();
      } else {
        buf.push_back(static_cast<char>(c));
      }
      return c;
    }

    int sync() override {
      if (!buf.empty()) flushLine();
      return 0;
    }

    void flushLine() {
      std::lock_guard<std::mutex> lk(out_mu);
      out_queue.push_back(buf);
      buf.clear();
      out_cv.notify_all();
    }
  };

  class QueueInBuf : public std::streambuf {
    std::string current;
  protected:
    int_type underflow() override {
      // Wait for a queued command, then expose it (with trailing newline)
      // as the current get-area for the consumer (UCIEngine's getline).
      std::unique_lock<std::mutex> lk(in_mu);
      in_cv.wait(lk, [] { return !in_queue.empty() || !running.load(); });
      if (in_queue.empty()) return traits_type::eof();
      current = in_queue.front() + "\n";
      in_queue.pop_front();
      lk.unlock();

      char* begin = &current[0];
      setg(begin, begin, begin + current.size());
      return traits_type::to_int_type(*begin);
    }
  };

  QueueOutBuf out_buf;
  QueueInBuf in_buf;
  std::streambuf* saved_cin = nullptr;
  std::streambuf* saved_cout = nullptr;
}

extern "C" void stockfish_start() {
  if (running.exchange(true)) return;

  saved_cin = std::cin.rdbuf(&in_buf);
  saved_cout = std::cout.rdbuf(&out_buf);

  engine_thread = std::thread([] {
    using namespace Stockfish;

    Bitboards::init();
    Position::init();

    int argc = 1;
    const char* argv_storage[] = { "stockfish" };
    char** argv = const_cast<char**>(argv_storage);

    UCIEngine uci(argc, argv);
    Tune::init(uci.engine_options());

    // Blocks until the UCI "quit" command is received.
    uci.loop();
    // UCIEngine's destructor waits for the search to finish and Engine
    // cleans up its thread pool.
  });
}

extern "C" void stockfish_send(const char* command) {
  if (!running.load()) return;
  {
    std::lock_guard<std::mutex> lk(in_mu);
    in_queue.emplace_back(command);
  }
  in_cv.notify_all();
}

extern "C" bool stockfish_read_line(char* out, int out_size, int timeout_ms) {
  if (out == nullptr || out_size <= 0) return false;
  std::unique_lock<std::mutex> lk(out_mu);
  if (!out_cv.wait_for(lk, std::chrono::milliseconds(timeout_ms),
                       [] { return !out_queue.empty(); })) {
    return false;
  }
  std::string line = std::move(out_queue.front());
  out_queue.pop_front();
  std::strncpy(out, line.c_str(), out_size - 1);
  out[out_size - 1] = '\0';
  return true;
}

extern "C" void stockfish_stop() {
  if (!running.exchange(false)) return;

  // Wake the engine thread (currently parked in QueueInBuf::underflow) so
  // it can observe `running == false` and exit, or so UCI's getline can
  // consume the "quit" command we push.
  {
    std::lock_guard<std::mutex> lk(in_mu);
    in_queue.emplace_back("quit");
  }
  in_cv.notify_all();

  if (engine_thread.joinable()) engine_thread.join();

  if (saved_cin) std::cin.rdbuf(saved_cin);
  if (saved_cout) std::cout.rdbuf(saved_cout);
  saved_cin = nullptr;
  saved_cout = nullptr;

  // Drain any leftover state so a subsequent start() begins clean.
  {
    std::lock_guard<std::mutex> lk(in_mu);
    in_queue.clear();
  }
  {
    std::lock_guard<std::mutex> lk(out_mu);
    out_queue.clear();
  }
}
