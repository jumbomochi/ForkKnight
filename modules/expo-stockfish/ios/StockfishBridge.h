#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

typedef void (^StockfishLineCallback)(NSString *line);

@interface StockfishBridge : NSObject

+ (instancetype)shared;

- (void)startWithCallback:(StockfishLineCallback)callback;
- (void)send:(NSString *)command;
- (void)stop;

@end

NS_ASSUME_NONNULL_END
