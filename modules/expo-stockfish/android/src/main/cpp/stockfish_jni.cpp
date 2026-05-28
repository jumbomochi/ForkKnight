#include <jni.h>
#include <string>
#include <thread>
#include <atomic>

extern "C" {
  void stockfish_start();
  void stockfish_send(const char* command);
  bool stockfish_read_line(char* out, int out_size, int timeout_ms);
  void stockfish_stop();
}

namespace {
  std::thread reader_thread;
  std::atomic<bool> reader_running{false};
  JavaVM* g_vm = nullptr;
  jobject g_module_global = nullptr;
  jmethodID g_emit_method = nullptr;
}

extern "C" JNIEXPORT jint JNI_OnLoad(JavaVM* vm, void*) {
  g_vm = vm;
  return JNI_VERSION_1_6;
}

extern "C" JNIEXPORT void JNICALL
Java_expo_modules_stockfish_ExpoStockfishModule_nativeStart(JNIEnv* env, jobject self) {
  if (reader_running.exchange(true)) return;
  if (g_module_global) env->DeleteGlobalRef(g_module_global);
  g_module_global = env->NewGlobalRef(self);
  jclass cls = env->GetObjectClass(self);
  g_emit_method = env->GetMethodID(cls, "emitLine", "(Ljava/lang/String;)V");

  stockfish_start();

  reader_thread = std::thread([] {
    JNIEnv* jenv = nullptr;
    g_vm->AttachCurrentThread(&jenv, nullptr);
    char buf[4096];
    while (reader_running.load()) {
      if (stockfish_read_line(buf, sizeof(buf), 100)) {
        jstring jline = jenv->NewStringUTF(buf);
        jenv->CallVoidMethod(g_module_global, g_emit_method, jline);
        jenv->DeleteLocalRef(jline);
      }
    }
    g_vm->DetachCurrentThread();
  });
}

extern "C" JNIEXPORT void JNICALL
Java_expo_modules_stockfish_ExpoStockfishModule_nativeSend(JNIEnv* env, jobject, jstring command) {
  const char* c = env->GetStringUTFChars(command, nullptr);
  stockfish_send(c);
  env->ReleaseStringUTFChars(command, c);
}

extern "C" JNIEXPORT void JNICALL
Java_expo_modules_stockfish_ExpoStockfishModule_nativeStop(JNIEnv* env, jobject) {
  if (!reader_running.exchange(false)) return;
  stockfish_stop();
  if (reader_thread.joinable()) reader_thread.join();
  if (g_module_global) {
    env->DeleteGlobalRef(g_module_global);
    g_module_global = nullptr;
  }
}
