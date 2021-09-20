# Examples

Some example custom amazon style dictionary transfomers to use together with the standard token format.

- `input/*.json` is the token file exported from figma
- `build` is the directory with all the output files for iOS, Android and web
- `build.js` is running amazon style dictionary and has all the configuration. You can run it with the command `node ./examples/build.js`.
- `libs` has all modules that transform the json for the specific platforms
- `filesToCopy` is holding all files that are not generated but should just be copied to the build directory