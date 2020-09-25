
//
// StyleDictionaryColor.h
//
// Do not edit directly
// Generated on Fri, 25 Sep 2020 14:01:59 GMT
//

#import <UIKit/UIKit.h>


typedef NS_ENUM(NSInteger, StyleDictionaryColorName) {
Borders2OfThemStroke,
BordersRed1PxStroke,
BordersGreen4PxDottedStroke,
ColorsOrange,
ColorsGreen,
ColorsBlue,
ColorsSecondaryGreen,
ColorsSecondaryYellow,
UtilitiesError
};

@interface StyleDictionaryColor : NSObject
+ (NSArray *)values;
+ (UIColor *)color:(StyleDictionaryColorName)color;
@end
