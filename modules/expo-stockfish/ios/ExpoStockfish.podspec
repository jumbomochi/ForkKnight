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
    'SWIFT_COMPILATION_MODE' => 'wholemodule'
  }

  s.source_files = '**/*.{h,m,swift}'
end
