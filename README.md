![Design Tokens plugin for fimga](https://github.com/lukasoppermann/design-tokens/raw/main/_resources/Design%20Tokens%20Plugin%20Cover.png)
# Design Tokens

[![Test status](https://github.com/lukasoppermann/design-tokens/workflows/Testing%20and%20linting/badge.svg)](https://github.com/lukasoppermann/design-tokens/actions?query=workflow%3A%22Testing+and+linting%22)

**Note:** This plugin is currently in a beta phase. If you find any bugs / issues or have feature ideas please [create an issue](https://github.com/lukasoppermann/design-tokens/issues/new).

The **Design Tokens** plugin for figma allows you to export design tokens into a json format that can be used with the [Amazon style dictionary](https://amzn.github.io/style-dictionary/#/) package. This allows you to transform your tokens to different languages / platforms like web, iOS or Android. 

## Installation

<img src="https://github.com/lukasoppermann/design-tokens/raw/main/_resources/Design%20Tokens%20Plugin%20Icon.png" width="50px"> 

1. Go to the [design tokens plugin page](https://www.figma.com/community/plugin/888356646278934516/Design-Tokens)
2. Click on install in the top right corner

## Plugin usage
The plugin comes with only menu item `Design Tokens > Export Design Tokens`. Once pressed the tokens will be generated and a dialog opens to allow you to store the resulting json file on your hard drive.

## Transforming tokens using Amazon style dictionary
1. Clone the [design token transformer](https://github.com/lukasoppermann/design-token-transformer) repositiory.
```cli
git clone https://github.com/lukasoppermann/design-token-transformer.git
```
2. Export your tokens using the plugin and place the json file in the `tokens` folder within the transformer repositry
3. Run `npm run transform-tokens` from the commandline
4. 🎉 Your converted tokens should be in the `build` folder. For more customization options check out the [design token transformer documentation](https://github.com/lukasoppermann/design-token-transformer)

## Design Tokens
### Naming
### Design tokens from Styles
The plugin converts the styles you define in Fimga into design tokens, this includes `Text Styles`, `Color Styles`, `Grid Styles` and `Effect Styles`.

Every property of a style will be converted to an individual token. For a `Text Styles` this may result in the following tokens (show as transformed css custom properties for readability).

```css
  --font-headline-3-font-size: 20;
  --font-headline-3-text-decoration: none;
  --font-headline-3-font-family: Roboto;
  --font-headline-3-font-style: Medium;
  --font-headline-3-letter-spacing: 2;
  --font-headline-3-line-height: 160;
  --font-headline-3-paragraph-indent: 5;
  --font-headline-3-paragraph-spacing: 8;
  --font-headline-3-text-case: uppercase;
```

#### Ignoring styles
Styles you don't want to be exported as design tokens can be prefixed with an `_` underscore. For example a color style called `_readlining/line-color` will not be exported.

### Custom design tokens
The plugin also supports custom tokens for `borders`, `radii` & `spaces`.

- Every custom design token must be within a `Frame` with a name starting with `_tokens`.
- The token itself has to have a name starting with `sizes`, `borders` or `radii` and has to be a `Frame`, `Rectangle` or `Main Component`. This is so that the plugin can identify what is and what isn't a token.
- The token has to be a direct child of a `_token` frame

If you wanted to create a custom spacer token for an `8px` space you would do the following:

1. Create a new `Frame` and name ot `_tokens/spacers` (Note: It must start with `_tokens`)
2. Create a new `Component`, set its width to `8px` (currently only width is used for size elements)
3. Name the new component `sizes/spacers/8px` (Note: It must start with `sizes`, `borders` or `radii`)
4. Run the plugin `Design Tokens > Export Design Tokens`

### Available properties
To allow for maximum customizability I decided to provide all values that Fimga provides. Many are not applicable to for example `css` but may be usable in other languages.

**Colors** are provided in `rgba` but can be converted using [Amazon style dictionary](https://amzn.github.io/style-dictionary/#/).

## Roadmap & PRs
### Roadmap
This plugin is under active development. You can find all planned features in the [roadmap](https://github.com/lukasoppermann/design-tokens/issues/2).
### Feature requests & help
If you would like to see a specific feature implemented, please [create an issue](https://github.com/lukasoppermann/design-tokens/issues/new) including a description of the feature and a use case.

If you can build the feature yourself and send a PR, this is even better. Please still create an issue first and mention that you want to implement it.
I will get back to you asap to discuss the details of how to implement it.

#### Help develop this plugin
If you are interested in helping please comment on any issue you would like to take on. I will get back to you to discuss how to implement it.
