Pod::Spec.new do |s|
  s.name           = 'ExpoStockfish'
  s.version        = '1.0.0'
  s.summary        = 'Stockfish 17.1 chess engine for Expo.'
  s.description    = 'Native bridge to Stockfish via UCI line protocol.'
  s.author         = ''
  s.homepage       = 'https://github.com/'
  s.platforms      = { :ios => '15.1' }
  s.source         = { :git => '' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'

  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
    'SWIFT_COMPILATION_MODE' => 'wholemodule',
    'CLANG_CXX_LANGUAGE_STANDARD' => 'c++17',
    'GCC_PREPROCESSOR_DEFINITIONS' => 'NDEBUG=1 IS_64BIT=1 USE_POPCNT=1',
    'OTHER_CPLUSPLUSFLAGS' => '-fno-exceptions -fno-rtti -O3',
    # stockfish_entry.cpp lives at the pod root and includes "bitboard.h"
    # etc. from the vendored Stockfish tree at stockfish/. Add that to the
    # header search path so the include resolves.
    'HEADER_SEARCH_PATHS' => '"${PODS_TARGET_SRCROOT}/stockfish"'
  }

  # Glob picks up bridge + Stockfish C++ tree (which lives in stockfish/).
  # CocoaPods does not reliably honor source_files paths containing ".." so
  # the Stockfish source must live inside the pod directory.
  s.source_files = '**/*.{h,m,mm,swift,cpp}'
  # Bridging headers are not supported on framework targets (which is what
  # CocoaPods builds Expo modules as). Expose StockfishBridge.h as a public
  # framework header instead — Swift in the same module sees it via the
  # auto-generated umbrella header.
  s.public_header_files = 'StockfishBridge.h'
  s.exclude_files = [
    'stockfish/main.cpp'
  ]
  # NNUE network files are embedded at compile time via INCBIN; they need to
  # be on disk next to nnue/network.cpp but are not runtime resources.
  s.preserve_paths = 'stockfish/*.nnue'
end
