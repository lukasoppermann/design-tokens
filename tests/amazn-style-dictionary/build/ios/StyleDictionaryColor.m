
//
// StyleDictionaryColor.m
//
// Do not edit directly
// Generated on Fri, 25 Sep 2020 13:41:12 GMT
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
[object Object],
[object Object],
[object Object],
,
[object Object],
[object Object],
[object Object],
[object Object],
[object Object],
[object Object]
    ];
  });

  return colorArray;
}

@end
