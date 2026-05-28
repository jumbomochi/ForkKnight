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
    'OTHER_CPLUSPLUSFLAGS' => '-fno-exceptions -fno-rtti -O3'
  }

  s.source_files = [
    '**/*.{h,m,swift}',
    '../cpp/stockfish/**/*.{cpp,h}'
  ]
  s.exclude_files = [
    '../cpp/stockfish/main.cpp',
    '../cpp/stockfish/syzygy/**/*'
  ]
  s.preserve_paths = '../cpp/stockfish/**/*'
  s.header_mappings_dir = '../cpp/stockfish'
end
