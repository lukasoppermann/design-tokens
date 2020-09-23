
//
// StyleDictionaryColor.m
//
// Do not edit directly
// Generated on Wed, 23 Sep 2020 11:56:09 GMT
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

    ];
  });

  return colorArray;
}

@end
