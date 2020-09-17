# Figma Plugin API typings
[![npm](https://img.shields.io/npm/v/@figma/plugin-typings?logo=npm&cacheSeconds=1800)](https://www.npmjs.com/package/@figma/plugin-typings)

This repository contains the typings for the Figma Plugin API.

## Usage

1. Installation
    ```sh
    npm i --save-dev @figma/plugin-typings
    # or
    yarn add -D @figma/plugin-typings
    ```

2. Configure _tsconfig.json_
    ```js
    {
        "compilerOptions": {
            "typeRoots": [
                "./node_modules/@types",
                "./node_modules/@figma"
            ]
        }
    }
    ```
    The configuration above is needed for the TypeScript compiler to use type definitions found in both `./node_modules/@types` and `./node_modules/@figma`. Normally, most external type definitions are from DefinitelyTyped and are installed in `/@types`, which included by TypeScript by default. Since we host the plugin typings separately, they are installed outside in `/@figma` instead.

    Types should become globally available without needing to use import statements. We do it this way because the plugin API is part of the host environment, as opposed to being a package that a plugin includes.


## About

Plugin API releases have the format "Version X, Update Y". Equivalent tags are created in this repository as `v<x>.<y>`. Note that not all API releases include API changes, some are just bug fixes. Therefore, some typings versions are skipped.
