# FAQ

## Why does style dictionary output [object Object]?
If you are using the [`standard` token format](https://github.com/lukasoppermann/design-tokens#standard-w3c-draft) you are expected to write your own transformers ([See examples](https://github.com/lukasoppermann/design-tokens/tree/main/examples)).
While this is a bit more work at first, you can get much better results like splitting dark and light mode, or getting correct conversions for iOS and Android.

To get simple conversion out of the box you need without any custom code, you need to change to the [`original` token format](https://github.com/lukasoppermann/design-tokens#original-deprecated).

## Why is the original format marked as deprecated?
This is the format that was originally shipped with the plugin. It is still in here for compatibility reasons and will stay for a long time.

It is marked as deprecated to push users towards the new `standard` format and to show that it will not receive any new feature updates.

