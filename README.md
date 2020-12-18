![Design Tokens plugin for figma](https://github.com/lukasoppermann/design-tokens/raw/main/_resources/Design%20Tokens%20Plugin%20Cover%20+%20Github.png)
# Design Tokens

<a href="https://www.producthunt.com/posts/figma-design-tokens-2?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-figma-design-tokens-2" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=273532&theme=light" alt="Figma Design Tokens - Export & convert design tokens or sync with github repo. | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

[![Test status](https://github.com/lukasoppermann/design-tokens/workflows/Testing%20and%20linting/badge.svg)](https://github.com/lukasoppermann/design-tokens/actions?query=workflow%3A%22Testing+and+linting%22) [![Coverage Status](https://coveralls.io/repos/github/lukasoppermann/design-tokens/badge.svg?branch=main)](https://coveralls.io/github/lukasoppermann/design-tokens?branch=main)

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
The plugin converts the styles you define in Figma into design tokens, this includes `Text Styles`, `Color Styles`, `Grid Styles` and `Effect Styles`.

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

In the settings you can change the prefix to anything you want.


### Custom design tokens
The plugin also supports custom tokens for `borders`, `radii`, `spaces` & `motion`.

- Every custom design token must be within a `Frame` with a name starting with `_tokens`.
- The token itself has to have a name starting with `sizes`, `borders` or `radii` and has to be a `Frame`, `Rectangle` or `Main Component`. This is so that the plugin can identify what is and what isn't a token.
- The token has to be a direct child of a `_token` frame

If you wanted to create a custom spacer token for an `8px` space you would do the following:

1. Create a new `Frame` and name it `_tokens/spacers` (Note: It must start with `_tokens`)
2. Create a new `Component`, set its width to `8px` (currently only width is used for size elements)
3. Name the new component `sizes/spacers/8px` (Note: It must start with `sizes`, `borders` or `radii`)
4. Run the plugin `Design Tokens > Export Design Tokens`

#### Motion Tokens
Motion tokens are a combination of an `easing curve`, a `duration` and an animation type. 
To create a motion token follow this flow:

1. create a new `Frame` called `_tokens/motion`
2. Create a new `Frame`, `Component` or `Rectangle` and give it a name e.g. `motion/ease-in`
3. Enter `prototyping mode` and link the the element `motion/ease-in` to any other element
4. Choose an `animation type`, `easing curve` and a `duration`

When exporting your tokens you will now get a set of properties for this motion.


### Available properties
To allow for maximum customizability I decided to provide all values that Figma provides. Many are not applicable to for example `css` but may be usable in other languages.

**Colors** are provided in `rgba` but can be converted using [Amazon style dictionary](https://amzn.github.io/style-dictionary/#/).

## Settings

![Design Tokens plugin settings](https://github.com/lukasoppermann/design-tokens/raw/main/_resources/settings.png)

### Filename
This allows you to define the file name that is used when exporting tokens. The `.json` extension will be automatically appended to the name.
The filename will also be send to the server when sending design tokens to the server.

### Prefix (used to in-/exclude styles)
#### **Prefix**
You can change the prefix from `_` to anything, e.g. `_tokens`.   
#### **Exclude**
The toggle allows you to switch from `exclude` to `include` mode. This means that only prefixed styles will be exported. For example if you only wanted to export styles that are named `_tokens/...`.

**Note:** This setting only applies to Figma styles (colors, typography, grids & effects). It does not apply to custom tokens.

### Push to Server
When a `server url` is specified, the command `Send Design Tokens to Url` will send a `POST` request to the provided url.
The body of the request will look like the following:
```ts
  "event_type": "update-tokens", // or any string you defined
  "client_payload": { 
    "tokenFileName": "design-tokens.json", // this is the filename you define above
    "tokens": "{...}", // the stringified json object holding all your desing tokens
    "filename": "Design Tokens" // the Figma file name from which the tokens were exported
  }
```

#### **Event type**
This is the `event_type` property that is send in the body of the request with the `client_payload`.
#### **Server url**
The url the post request is send to. This must be SSL secured (using `https`) as Figma is a secure environment and thus does not allow non-secure requests.
A limitation that comes with Figma is that the server must allow access from any origin and send the following header: `Access-Control-Allow-Origin: *`

##### Pushing to Github
If you push to github the server url must be in the format 
```
https://api.github.com/repo/:username/:repo/dispatches
```

For the repositiory `lukasoppermann/design-token-transformer` this would be:
```
https://api.github.com/repos/lukasoppermann/design-token-transformer/dispatches
```

#### **Auth header**
This defines the authentication method used with the access token. The current choices are:
- `token` (used for github)
- `bearer` token
- `basic` auth
#### **Access token**
The token send using the authentication method defined above. Learn more about creating a [personal access token for github](https://github.com/lukasoppermann/design-token-transformer#personal-access-token).

#### Github repo or custom server
You can use this feature to integrate tokens into your build pipeline. The ideal is to send tokens from Figma to a repository and automatically transform them. Depending on your setup you could either trigger a webhook on your product repos, create a new semversion on the tokens repo or notify the dev teams in another way.

To learn how to set this up using `github` and `actions` check out the documentation and code examples in the [design token transformer repositry](https://github.com/lukasoppermann/design-token-transformer).

## Roadmap & PRs
### Roadmap
This plugin is under active development. You can find all planned features in the [roadmap](https://github.com/lukasoppermann/design-tokens/issues/2).
### Feature requests & help
If you would like to see a specific feature implemented, please [create an issue](https://github.com/lukasoppermann/design-tokens/issues/new) including a description of the feature and a use case.

If you can build the feature yourself and send a PR, this is even better. Please still create an issue first and mention that you want to implement it.
I will get back to you asap to discuss the details of how to implement it.

#### Help develop this plugin
If you are interested in helping please comment on any issue you would like to take on. I will get back to you to discuss how to implement it.
