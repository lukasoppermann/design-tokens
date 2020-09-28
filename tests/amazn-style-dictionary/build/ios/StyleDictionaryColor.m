
//
// StyleDictionaryColor.m
//
// Do not edit directly
// Generated on Mon, 28 Sep 2020 11:44:15 GMT
//

#import "StyleDictionaryColor.h"


@implementation StyleDictionaryColor

+ (UIColor *)color:(StyleDictionaryColorName)colorEnum{
  return [[self values] objectAtIndex:colorEnum];
}

+ (NSArray *)values {
  static NSArray* colorArray;
  static dispatch_once_t onceToken;

  dispatch_once(&onceToken, ^{
    colorArray = @[
[UIColor colorWithRed:0.004f green:0.004f blue:0.004f alpha:1.000f]
    ];
  });

  return colorArray;
}

@end
