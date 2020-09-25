
//
// StyleDictionaryColor.h
//
// Do not edit directly
// Generated on Fri, 25 Sep 2020 13:41:12 GMT
//

#import <UIKit/UIKit.h>


typedef NS_ENUM(NSInteger, StyleDictionaryColorName) {
Borders2OfThemStroke,
BordersRed1PxStroke,
BordersGreen4PxDottedStroke,
BordersGreen4PxGradientStroke,
ColorsOrangeFill,
ColorsGreenFill,
ColorsBlueFill,
ColorsSecondaryGreenFill,
ColorsSecondaryYellowFill,
UtilitiesErrorFill
};

@interface StyleDictionaryColor : NSObject
+ (NSArray *)values;
+ (UIColor *)color:(StyleDictionaryColorName)color;
@end
