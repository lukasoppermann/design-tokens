![Design Tokens plugin for fimga](https://github.com/lukasoppermann/design-tokens/raw/main/_resources/Design%20Tokens%20Plugin%20Cover.png)
# Design Tokens

**Note:** This plugin is currently in a beta phase. If you find any bugs / issues or have feature ideas please [create an issue](https://github.com/lukasoppermann/design-tokens/issues/new).

The **Design Tokens** plugin for figma allows you to export design tokens into a json format that can be used with the [Amazon style dictionary](https://amzn.github.io/style-dictionary/#/) package. This allows you to transform your tokens to different languages / platforms like web, iOS or Android. 

## Installation

## Transforming tokens using Amazon style dictionary
1. Clone the [design token transformer](https://github.com/lukasoppermann/design-token-transformer) repositiory.
```cli
git clone https://github.com/lukasoppermann/design-token-transformer.git
```
2. Export your tokens using the plugin and place the json file in the `tokens` folder within the transformer repositry
3. Run `npm run transform-tokens` from the commandline
4. 🎉 Your converted tokens should be in the `build` folder. For more customization options check out the [design token transformer documentation](https://github.com/lukasoppermann/design-token-transformer)
