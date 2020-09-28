
//
// StyleDictionaryColor.h
//
// Do not edit directly
// Generated on Mon, 28 Sep 2020 11:44:15 GMT
//

#import <UIKit/UIKit.h>


typedef NS_ENUM(NSInteger, StyleDictionaryColorName) {
ColorWhatever
};

@interface StyleDictionaryColor : NSObject
+ (NSArray *)values;
+ (UIColor *)color:(StyleDictionaryColorName)color;
@end
