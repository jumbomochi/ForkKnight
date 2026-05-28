#import "StockfishBridge.h"

extern "C" {
  void stockfish_start(void);
  void stockfish_send(const char* command);
  bool stockfish_read_line(char* out, int out_size, int timeout_ms);
  void stockfish_stop(void);
}

@implementation StockfishBridge {
  dispatch_queue_t _readQueue;
  StockfishLineCallback _callback;
  BOOL _running;
}

+ (instancetype)shared {
  static StockfishBridge *sInstance;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sInstance = [[StockfishBridge alloc] init];
  });
  return sInstance;
}

- (instancetype)init {
  if ((self = [super init])) {
    _readQueue = dispatch_queue_create("com.forkknight.stockfish.reader", DISPATCH_QUEUE_SERIAL);
  }
  return self;
}

- (void)startWithCallback:(StockfishLineCallback)callback {
  @synchronized (self) {
    if (_running) return;
    _callback = [callback copy];
    _running = YES;
  }
  stockfish_start();

  __weak typeof(self) weakSelf = self;
  dispatch_async(_readQueue, ^{
    char buf[4096];
    while (true) {
      __strong typeof(self) strongSelf = weakSelf;
      if (strongSelf == nil || !strongSelf->_running) break;
      if (stockfish_read_line(buf, (int)sizeof(buf), 100)) {
        NSString *line = [NSString stringWithUTF8String:buf];
        if (line != nil && strongSelf->_callback) {
          strongSelf->_callback(line);
        }
      }
    }
  });
}

- (void)send:(NSString *)command {
  if (!_running) return;
  stockfish_send([command UTF8String]);
}

- (void)stop {
  @synchronized (self) {
    if (!_running) return;
    _running = NO;
    _callback = nil;
  }
  stockfish_stop();
}

@end
