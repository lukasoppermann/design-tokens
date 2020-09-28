
//
// StyleDictionaryColor.h
//
// Do not edit directly
// Generated on Sat, 26 Sep 2020 12:57:16 GMT
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
UtilitiesError,
EffectShadowColor,
InnerShadow0Color,
InnerShadow1Color
};

@interface StyleDictionaryColor : NSObject
+ (NSArray *)values;
+ (UIColor *)color:(StyleDictionaryColorName)color;
@end
