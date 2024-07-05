> [!WARNING] 
> **This plugin is only partially supported!**  
> This means: I don't have capacity to add any features or really improve stuff. Bugfixes may be added if time allows.   
> I am also happy to discuss and merge PRs.
> 
> I personally have changed my opinion a long time ago to favor the source fo truth for design tokens to be in a json file. Figma should be a consumer so you only import tokens into figma. This is why I don't use plugins like this one anymore in my work. 

![Design Tokens plugin for figma](https://github.com/lukasoppermann/design-tokens/blob/main/_resources/Design%20Tokens%20Plugin%20Cover.png)
# Design Tokens

<a href="https://www.producthunt.com/posts/figma-design-tokens-2?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-figma-design-tokens-2" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=273532&theme=light" alt="Figma Design Tokens - Export & convert design tokens or sync with github repo. | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

[![Test status](https://github.com/lukasoppermann/design-tokens/workflows/Testing%20and%20linting/badge.svg)](https://github.com/lukasoppermann/design-tokens/actions?query=workflow%3A%22Testing+and+linting%22) [![Coverage Status](https://coveralls.io/repos/github/lukasoppermann/design-tokens/badge.svg?branch=main)](https://coveralls.io/github/lukasoppermann/design-tokens?branch=main)

The **Design Tokens** plugin for Figma allows you to export design tokens into a json format that can be used with the [Amazon style dictionary](https://amzn.github.io/style-dictionary/#/) package. This allows you to transform your tokens to different languages / platforms like web, iOS or Android. 

## Table of content
- [Installation](#installation)
- [Plugin usage](#plugin-usage)
- [FAQ](#faq)
- [Transforming tokens using Amazon style dictionary](#transforming-tokens-using-amazon-style-dictionary)
- [Creating design tokens](#creating-design-tokens)
  - [Figma style design tokens](#creating-design-tokens)
  - [Figma variables](#variables-beta)
  - [Custom design tokens](#custom-design-tokens)
    - [Border tokens](#borders)
    - [Radii token](#radii)
    - [Size token](#sizes)
    - [Spacing token](#spacing)
    - [Breakpoints token](#breakpoints)
    - [Motion token](#motion)
    - [Opacity token](#opacity)
  - [Available properties](#available-properties)
- [Settings](#settings)
  - [File Export Settings](#file-export-settings)  
  - [Push tokens to Github / Server](#push-to-server)
- [Contribution](#contribution)

## Installation

<img src="https://github.com/lukasoppermann/design-tokens/raw/main/_resources/Design%20Tokens%20Plugin%20Icon.png" width="50px"> 

1. Go to the [design tokens plugin page](https://www.figma.com/community/plugin/888356646278934516/Design-Tokens)
2. Click on install in the top right corner

## Plugin usage
The plugin has a couple options in the menu items:
### `Design Tokens > Export Design Token File`
This creates a `.json` file with all design tokens from your Figma project. A dialog will open allowing you to save the file on your hard drive.

### `Design Tokens > Send Design Tokens to Url`
This triggers a request sending your tokens to a server. For this to work you must have configured a server to send your tokens to in the [plugin settings](#push-to-server).

### `Design Tokens > Settings`
Opens the settings view, which allows you to change all settings mentioned in the [settings](#settings) section below.

### `Design Tokens > Reset Settings`
Resets all your settings to the default. This is helpful when you run into problems with corrupted settings (Plugin does not work as expected).

### `Design Tokens > Demo File`
Opens the [demo figma file](https://www.figma.com/file/2MQ759R5kJtzQn4qSHuqR7/Design-Tokens-for-Figma?node-id=231%3A2).
Note: You will not have permission to change or export tokens from this file but it will give you an idea of how to set up tokens.

### `Design Tokens > Help`
Opens this documentation page.

## FAQ
You can find frequent questions and issues in the [faq](https://github.com/lukasoppermann/design-tokens/blob/main/faq.md).

## Transforming tokens using Amazon style dictionary
1. Clone the [design token transformer](https://github.com/lukasoppermann/design-token-transformer) repositiory.
```cli
git clone https://github.com/lukasoppermann/design-token-transformer.git
```
2. Export your tokens using the plugin and place the json file in the `tokens` folder within the transformer repositry
3. Run `npm run transform-tokens` from the commandline
4. 🎉 Your converted tokens should be in the `build` folder. For more customization options check out the [design token transformer documentation](https://github.com/lukasoppermann/design-token-transformer)

## Transforming tokens using Amazon style dictionary and style dictionary utils
The package [style-dictionary-utils](https://github.com/lukasoppermann/style-dictionary-utils) provides a parsers and many filters and transformers that can be used with `w3c design tokens`.

It is meant to help you set up a build process with the tokens exported from figma design tokens.

## Creating Design Tokens
### Figma style design tokens
The plugin converts the styles you define in Figma into design tokens, this includes `Text Styles`, `Color Styles`, `Grid Styles` and `Effect Styles`.

Depending on the export format you get a different result. In the `Original` format every property of a style will be converted to an individual token.
When using the `Standard` format composite tokens are created, for example the properties of a text style are all exported as one composite token.

However for `Text Styles` the `Standard` format has a special `typography` type that if enabled exports the individual tokens as well. This may result in the following tokens (show as transformed css custom properties for readability).

```css
  --font-headline-3-font-size: 20;
  --font-headline-3-text-decoration: none;
  --font-headline-3-font-family: Roboto;
  --font-headline-3-font-style: italic;
  --font-headline-3-font-weight: 500;
  --font-headline-3-font-stretch: condensed;
  --font-headline-3-font-style-old: Medium Italic Condensed; /* only to preserve original value */
  --font-headline-3-letter-spacing: 2;
  --font-headline-3-line-height: 160;
  --font-headline-3-paragraph-indent: 5;
  --font-headline-3-paragraph-spacing: 8;
  --font-headline-3-text-case: uppercase;
```

#### Naming
Styles don't have to follow a specific naming convention. Any style will be exported into a design token, as long as it does not match the [`ignore pattern`](#ignoring-styles). 

This means you can name your styles `Headline` or `Foundation/Colors/Primary/Red/100` and either one works fine.

#### Ignoring styles
Styles you don't want to be exported as design tokens can be prefixed with an `_` underscore. For example a color style called `_readlining/line-color` will not be exported.

In the settings you can change the [prefix](#prefix-used-to-in-exclude-styles) for ignoring/including styles.

### Variables (BETA)
The plugin exports variables to generic design tokens. This only works when the `Standard` export format is selected.
#### Naming
Variables don't have to follow a specific naming convention. When exported the `collection` name and the `mode` name is prefixed to the variable name to avoid naming collisions.

### Custom design tokens
The plugin also supports custom tokens for `borders`, `radii`, `sizes`, `spacing` & `motion`.

- Every custom design token must be within a top-level `Frame` with a name starting with `_tokens`. This means you have a structure like this: `page` > `_tokens/sizes` > `sizes/8`.
- The token itself has to have a name starting with `sizes`, `spacing`, `borders`, `radii` or `motion` and has to be a `Main Component` or `variant`. This is so that the plugin can identify what is and what isn't a token.

#### Variants
**Naming:** The name for the design token will be created by combining the main name with the property value e.g. variant `sizes` with the property `size` with the values `8` and `16` will result in 2 tokens
- `sizes/8`
- `sizes/16`

**Ignore properties:** If you want a property to be ignored you can prefix it with an `_`, e.g. the property `_hidden` will be ignored.

#### Sizes

To create a *sizes token*, do the following:

1. Create a `Frame` and name it `_tokens/sizes` 
2. Create another `Main Component` and set the width property to your `8`.
3. Name it `sizes/8`. Note, it is important to use the `sizes/` prefix.


The token will be exported, if you convert it to css the output would be something like this:

```css
  --sizes-8: 8;
```

![Example size tokens](https://github.com/lukasoppermann/design-tokens/raw/main/_resources/example-sizes-tokens.png)
<a href="https://www.figma.com/file/2MQ759R5kJtzQn4qSHuqR7/Design-Tokens-for-Figma?node-id=1260%3A44" target="_blank">Open example figma file</a>

#### Spacing

To create a *spacing token*, do the following:

1. Create a `Frame` and name it `_tokens/spacing` 
2. Create another `Main Component` and set the padding properties to `10` in the `auto layout`.
3. Name it `spacing/10`. Note, it is important to use the `spacing/` prefix.


The token will be exported, if you convert it to css the output would be something like this:

```css
  --spacing-10-top: 10;
  --spacing-10-right: 10;
  --spacing-10-bottom: 10;
  --spacing-10-left: 10;
```

![Example spacing tokens](https://github.com/lukasoppermann/design-tokens/raw/main/_resources/example-spacing-tokens.png)
<a href="https://www.figma.com/file/2MQ759R5kJtzQn4qSHuqR7/Design-Tokens-for-Figma?node-id=1493%3A0" target="_blank">Open example figma file</a>

#### Breakpoints
To create a *breakpoint token*, do the following:

1. Create a `Frame` and name it `_tokens/breakpoints` 
2. Create another `Main Component` and set the width property to your desired values (example for `lg` -> `1280` ).
3. Name it `breakpoints/lg`. Note, it is important to use the `breakpoints/` prefix.

The token will be exported, if you convert it to css the output would be something like this:

```css
  --breakpoints-lg: 1280;
```

![Example breakpoints tokens](https://github.com/lukasoppermann/design-tokens/raw/main/_resources/example-breakpoints-tokens.png)

#### Borders
To create a *border token*, do the following:

1. Create a `Frame` and name it `_tokens/borders` 
2. Create another `Main Component` and set the stroke property to your desired values.
3. Name it `borders/dashed-outside`. Note, it is important to use the `borders/` prefix.

The token will be exported, if you convert it to css the output would be something like this:

```css
  --borders-dashed-outside-stroke-align: outside;
  --borders-dashed-outside-dash-pattern: 5,5,3,3;
  --borders-dashed-outside-stroke-cap: none;
  --borders-dashed-outside-stroke-join: miter;
  --borders-dashed-outside-stroke-miter-limit: 4;
  --borders-dashed-outside-stroke-weight: 1;
  --borders-dashed-outside-stroke: rgba(64, 255, 186, 1);
```

#### Radii
To create a *radius token*, do the following:

1. Create a `Frame` and name it `_tokens/radii` 
2. Create another `Main Component` and set the radius properties to your desired values.
3. Name it `radii/same-with-smoothing`. Note, it is important to use the `radii/` prefix.


The token will be exported, if you convert it to css the output would be something like this:

```css
  --radii-same-with-smoothing-radius: 5;
  --radii-same-with-smoothing-radius-type: single;
  --radii-same-with-smoothing-radii-top-left: 5;
  --radii-same-with-smoothing-radii-top-right: 5;
  --radii-same-with-smoothing-radii-bottom-right: 5;
  --radii-same-with-smoothing-radii-bottom-left: 5;
  --radii-same-with-smoothing-smoothing: 0.65;
```

#### Motion
Motion tokens are a combination of an `easing curve`, a `duration` and an animation type. 
To create a motion token follow this flow:

1. Create a new `Frame` called `_tokens/motion`
2. Create a new `Main Component`
3. Name it `motion/move-in`. Note, it is important to use the `motion/` prefix.
4. Enter `prototyping mode` and link the element `motion/move-in` to any other element.
5. Choose an `animation type`, `easing curve` and a `duration`

When exporting your tokens you will now get a set of properties for this motion set.

```css
  --motion-move-in-type: move_in;
  --motion-move-in-duration: 0.5;
  --motion-move-in-easing: ease-in;
  --motion-move-in-easing-function-x-1: 0.41999998688697815;
  --motion-move-in-easing-function-x-2: 1;
  --motion-move-in-easing-function-y-1: 0;
  --motion-move-in-easing-function-y-2: 1;
  --motion-move-in-direction: left;
```

#### Opacity
To create opacity tokens, do the following:

1. Create a new `Frame` called `_tokens/opacities`
2. Create a new `Main Component`
3. Set the desired `Pass through` value (ie. 30%)
4. Give it a fitting name, e.g. `opacity/input-disabled`

After exporting it, if you convert it to CSS, the resulting token will look like this:

```css
--opacity-input-disabled: 0.3;
```

### Available properties
To allow for maximum customizability I decided to provide all values that Figma provides. Many are not applicable to for example `css` but may be usable in other languages.

**Colors** are provided in `rgba` but can be converted using [Amazon style dictionary](https://amzn.github.io/style-dictionary/#/).

## Settings

![Design Tokens plugin settings](https://github.com/lukasoppermann/design-tokens/raw/main/_resources/settings.png)

### Add token type to name
When enabled, token names will be prefixed with the token type e.g. "color" or "font". This effectifly groups tokens by type. 

### Name Conversion
This option allows you to define how the token names will be converted when they are store in the json file, the available options are:

- `Default` – spaces from the beginning and end are removed and the name is converted to lowercase
- `camelCase` - spaces from the beginning and end are removed and the name is converted to [camelCase](https://en.wikipedia.org/wiki/Camel_case)
- `kebab-case`  - spaces from the beginning and end are removed and the name is converted to kebab-case

### Token format
This option defines the structure for the json output.

#### Standard (W3C draft)
This format is based on the current spec draft of the [Design Tokens W3C Community Group](https://github.com/design-tokens/community-group).
It is much simpler and makes it easier to define custom transformers for amazon style dictionary.

Every token follows this structure ([learn more](https://github.com/lukasoppermann/design-tokens/blob/main/types/standardToken.d.ts)):
```js
type StandardTokenInterface = {
  name: string,
  description?: string,
  value: StandardTokenValueType | StandardCompositeTokenValueType,
  type: StandardTokenTypes,
  extensions?: StandardTokenExtensionsInterface
}
```

#### Original (deprecated)
This is the original format of the plugin. It is mainly in here to allow teams to slowly migrate to the standard format.
This works better with amazon style dictionary for basics. However if you want to create custom transformers the **Standard** format is better.

### Exclusion Prefix

By default the plugin ignores any style that is prefixed with `_` or `.`. 
You can define any additional prefix via this option, e.g `*`. This can be helpful when you want to have styles that are shared across files in figma, but that should not be exported to your design tokens.

**Notes:** 
1. This setting only applies to Figma styles (colors, typography, grids & effects). It does not apply to custom tokens.
2. The prefix has to be in the beginning of the token name, e.g. `.My Colors/Internal/Red` will be ignored, while `My Colors/.Internal/Red` will be exported.

### Reference mode in variables

![Design Tokens plugin mode export settings](/_resources/settings_mode.png)

In the output JSON generated by the variables, the mode names are included. You can configure whether to include these mode names in the output JSON or not.  
By default, the mode names are included in both the token names and the token values. You can turn off this behavior by disabling the "Enable/Disable mode referencing" checkbox.
If you wish to keep the mode in the token names, but not in the token values, you can disable the first option and enable "Avoid mode in token value".
This last options is disabled when the first one is enabled.

### Aliases (Standard format only)

The standard token format allows you to define an alias/reference for a color tokens via the description field.
For example if you want the color style `danger-color` to reference the color style `core-colors/red` you can add a `ref:` line to the description field of the `danger-color`:

```
Use this color for destructive actions only.
ref: core-colors.red
```

This will create an output in your json like this:

```json
"danger-color": {
  "description": "Use this color for destructive actions only.",
  "type": "color",
  "value": "{core-colors.red}"
}
```

The alias line is removed from the description field during export. If you active prefixing token types or token prefixes they will automatically be added.

In the settings you can defined the valid alias indentifiers like `ref`. By default it is set to `alias, ref, reference`.

### Token Prefixes

#### Include token prefixes in token name
When enabled this option keeps the token prefix in the name, e.g. for `color/red` the token prefix is `color` and the token name is `red`.

**For styles:** Styles do not have a prefix so when enabled the plugin will add the prefix to the token name.

- *Color style:* `red` -> `color/red`
- *Gradient style:* `black to white` -> `gradient/black to white`
- *Font style:* `h1` -> `font/h1`
- *Grid style:* `mobile` -> `grid/mobile`
- *Color style:* `shadow 4dp` -> `effect/shadow 4dp`

**For custom tokens:** Custom tokens use the prefix to identify the token e.g. `radius/5px`, the prefix `radius` is used by the plugin to indetify the token type. This means the name already includes the prefix and nothing will be added. However it this option is disabled the prefix will be removed.

layer name | option enabled | option disabled
---|---|---
`radius/5px` | `radius/5px` | `5px`
`size/8px` | `size/8px` | `8px`
`breakpoint/md` | `breakpoint/md` | `md`

#### Token prefixes names
This option allows you to define custom prefixes for the tokens.

**For styles:** You can only define one prefix which will be added if the `Include token prefixes in token name` is enabled.

**For custom tokens:** You can add multiple prefixes in a comma separated list e.g. `radii,radius`. If `Include token prefixes in token name` is enabled whichever prefix is used in the name of a token will be kept if you have `radius/5px` and `radii/sm` you will also get `radius/5px` and `radii/sm` in the json output.
 
## File Export Settings

![Design Tokens plugin file export settings](https://github.com/lukasoppermann/design-tokens/raw/main/_resources/File-Export-Settings.png)

### Compression for json output file
This option allows you to toggle the json compression for file export.
When enabled the json file will be minified meaning whitespace and linebreaks will be removed.

### Filename
You can define the default filename that will be used when exporting the tokens to a json file.

### Selective export
You can choose which types of tokens to export to a file. 
This can be helpful when debugging your tokens.
By default all types are selected and thus all tokens will be exported.

If you which to ignore specific styles, use the [exclude prefix](https://github.com/lukasoppermann/design-tokens/blob/main/README.md#exclude-prefix).

## Push to Server

![Design Tokens plugin url export settings](https://github.com/lukasoppermann/design-tokens/raw/main/_resources/Url-Export-Settings.png)

When a `server url` is specified, the command `Send Design Tokens to Url` will send a `POST` request to the provided url.
The body of the request will look like the following:
```ts
  "event_type": "update-tokens", // or any string you defined
  "client_payload": { 
    "tokens": "{...}", // the stringified json object holding all your desing tokens
    "filename": "Design Tokens", // the Figma file name from which the tokens were exported
    "commitMessage": "Your commit message"
  }
```

### URL Export Settings
#### Compression for json output to server
This option allows you to toggle the json compression for the export to a server.
When enabled the json that is end to the server will be minified meaning whitespace and linebreaks will be removed.

### Server Settings
#### **Event type**
This is the `event_type` property that is send in the body of the request with the `client_payload`.
#### **Server url**
The url the post request is send to. This must be SSL secured (using `https`) as Figma is a secure environment and thus does not allow non-secure requests.
A limitation that comes with Figma is that the server must allow access from any origin and send the following header: `Access-Control-Allow-Origin: *`

#### **Content Type**
Overrides the content type header for the final HTTP request. Defaults to "plain/text"

##### Pushing to Github
If you push to github the server url must be in the format 
```
https://api.github.com/repos/:username/:repo/dispatches
```

For the repositiory `lukasoppermann/design-token-transformer` this would be:
```
https://api.github.com/repos/lukasoppermann/design-token-transformer/dispatches
```

#### **Auth header**
This defines the authentication method used with the access token. The current choices are:
- `token` (used for github)
- `gitlab_token` (used for Gitlab requests)
- `bearer` token
- `basic` auth
#### **Access token**
The token send using the authentication method defined above. Learn more about creating a [personal access token for github](https://github.com/lukasoppermann/design-token-transformer#personal-access-token).

#### Github repo or custom server
You can use this feature to integrate tokens into your build pipeline. The ideal is to send tokens from Figma to a repository and automatically transform them. Depending on your setup you could either trigger a webhook on your product repos, create a new semversion on the tokens repo or notify the dev teams in another way.

To learn how to set this up using `github` and `actions` check out the documentation and code examples in the [design token transformer repositry](https://github.com/lukasoppermann/design-token-transformer).

#### Gitlab repo
This will set up the plugin to trigger a Gitlab pipeline passing in the variables directly as environment variables. This data flow is documented in the section [Pass CI/CD variables in the API call](https://docs.gitlab.com/ee/ci/triggers/#pass-cicd-variables-in-the-api-call) in the Gitlab "Triggers" documentation.

Once the pipeline is triggered the following values will be available as environment variables:
 - `FIGMA_EVENT_TYPE`: The provided event type string.
 - `FIGMA_CLIENT_PAYLOAD_TOKENS`: The generated tokens JSON string.
 - `FIGMA_CLIENT_PAYLOAD_FILENAME`: The filename for the original Figma file.

> :warning: **NOTE**: It has been found that Gitlab has limitations on how much data can be passed via the environmental 
> variables due to the limit on the size of the ConfigMap at 1048576 bytes. Depending on the system you are running on
> and any configurations already in place you may find you are able to pass more or less data than others. Developers 
> and Designers should be aware of this limitation and plan accordingly. The below warning is an indication you have 
> exceeded the data limit:
> 
>```
> ERROR: Error cleaning up configmap: resource name may not be empty
> ERROR: Job failed (system failure): prepare environment: setting up scripts configMap: generating scripts config map: ConfigMap "[[redacted image name]]" is invalid: []: Too long: must have at most 1048576 bytes. Check https://docs.gitlab.com/runner/shells/index.html#shell-profile-loading for more information
> ```

#### **Reference**
This field is only used when the "gitlab_token" auth header has been selected. This field sets the reference for the Gitlab trigger. This can be a branch, or tag name.

## Errors

### No tokens get exported
There a different possible reasons for this to occur:
1. Tokens are not placed inside a frame named `_tokens`
2. Tokens are nested in groups or frames (they must be the first level children of the `_tokens` frame)
3. You may have changed the `exclude prefix` setting to `false` which means only styles that include the prefix e.g. `_colors/blue` are exported

### Sending tokens to the server returns an error
#### 401
You may be using a wrong access token or the access token is missing the correct permission (`public_repo`).
#### 404
You may be using a wrong `server url` or `auth type`. 
Also assure your access token is valid.
#### General error (custom server)
The server may not have correct cors settings. If you send your tokens to github this probably means that you have a spelling mistake in the URL.


## Contribution
### Feature requests & help
If you would like to see a specific feature implemented, please [create an issue](https://github.com/lukasoppermann/design-tokens/issues/new) including a description of the feature and a use case.

If you can build the feature yourself and send a PR, this is even better. Please still create an issue first and mention that you want to implement it.
I will get back to you asap to discuss the details of how to implement it.

#### Help develop this plugin
If you are interested in helping please comment on any issue you would like to take on. I will get back to you to discuss how to implement it.
