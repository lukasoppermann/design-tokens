(() => {
    const defines = {};
    const entry = [null];
    function define(name, dependencies, factory) {
        defines[name] = { dependencies, factory };
        entry[0] = name;
    }
    define("require", ["exports"], (exports) => {
        Object.defineProperty(exports, "__cjsModule", { value: true });
        Object.defineProperty(exports, "default", { value: (name) => resolve(name) });
    });
    define("writeJson", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const writeJson = (json) => {
            // convert json to string
            const jsonString = JSON.stringify(json, null, 2);
            console.log('writeJson');
            figma.ui.postMessage({
                command: "export",
                data: {
                    filename: "design-tokens.json",
                    data: jsonString
                }
            });
        };
        exports.default = writeJson;
    });
    define("getColors", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const getColors = () => {
            const paintStyles = figma.getLocalPaintStyles();
            return paintStyles.map(item => ({
                id: item.id,
                name: item.name,
                description: item.description,
                paints: item.paints
            }));
        };
        exports.default = getColors;
    });
    define("getGrids", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const getGrids = () => {
            // get styles
            const gridStyles = figma.getLocalGridStyles();
            // transform styles
            return gridStyles.map(item => ({
                id: item.id,
                name: item.name,
                description: item.description,
                grids: item.layoutGrids
            }));
        };
        exports.default = getGrids;
    });
    define("getFonts", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const getFonts = () => {
            const textStyles = figma.getLocalTextStyles();
            return textStyles.map(item => ({
                id: item.id,
                name: item.name,
                description: item.description,
                fontSize: item.fontSize,
                textDecoration: item.textDecoration,
                fontName: item.fontName,
                letterSpacing: item.letterSpacing,
                lineHeight: item.lineHeight,
                paragraphIndent: item.paragraphIndent,
                paragraphSpacing: item.paragraphSpacing,
                textCase: item.textCase
            }));
        };
        exports.default = getFonts;
    });
    define("getEffects", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const getEffects = () => {
            // get styles
            const effectStyles = figma.getLocalEffectStyles();
            // transform styles
            return effectStyles.map(item => ({
                id: item.id,
                name: item.name,
                description: item.description,
                effects: item.effects
            }));
        };
        exports.default = getEffects;
    });
    define("exportTokens", ["require", "exports", "writeJson", "getColors", "getGrids", "getFonts", "getEffects"], function (require, exports, writeJson_1, getColors_1, getGrids_1, getFonts_1, getEffects_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const tokenExport = () => {
            // writeJson(figma.getLocalPaintStyles())
            // console.log([0])
            // console.log(figma.getStyleById(figma.getLocalPaintStyles()[0].id).name)
            // console.log(figma.getLocalTextStyles())
            // console.log(figma.getLocalEffectStyles())
            // console.log(figma.getLocalGridStyles())
            // return figma.getLocalPaintStyles()
            const colors = getColors_1.default();
            const grids = getGrids_1.default();
            const fonts = getFonts_1.default();
            const effects = getEffects_1.default();
            writeJson_1.default({
                colors: colors,
                grids: grids,
                fonts: fonts,
                effects: effects
            });
        };
        exports.default = tokenExport;
    });
    define("index", ["require", "exports", "exportTokens"], function (require, exports, exportTokens_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        // register the UI 
        // by default it is hidden
        figma.showUI(__html__, { visible: false });
        // const ui = {
        //   settings: figma.showUI(__uiFiles__.settings, {visible: false}),
        //   utilities: figma.showUI(__uiFiles__.utilities, {visible: false})
        // }
        // figma.command is the menu item executed from the plugin menu
        // run different functions depending on the provided command
        //
        // EXPORT
        // exports the design tokens
        console.log("Figma plugin command:" + figma.command);
        if (figma.command === 'export') {
            console.log("Running export");
            exportTokens_1.default();
            // const tokens = exportTokens()
            // console.log(tokens)
            // writeJson(tokens)
            // always run closePlugin otherwise the plugin will keep running
        }
        // SETTINGS
        // settings for the design tokens
        if (figma.command === 'settings') {
            figma.ui.show();
        }
        figma.ui.onmessage = (message) => {
            console.log(message);
            if (message === 'closePlugin') {
                console.log('closing plugin');
                figma.closePlugin();
            }
        };
    });
    
    'marker:resolver';

    function get_define(name) {
        if (defines[name]) {
            return defines[name];
        }
        else if (defines[name + '/index']) {
            return defines[name + '/index'];
        }
        else {
            const dependencies = ['exports'];
            const factory = (exports) => {
                try {
                    Object.defineProperty(exports, "__cjsModule", { value: true });
                    Object.defineProperty(exports, "default", { value: require(name) });
                }
                catch (_a) {
                    throw Error(['module "', name, '" not found.'].join(''));
                }
            };
            return { dependencies, factory };
        }
    }
    const instances = {};
    function resolve(name) {
        if (instances[name]) {
            return instances[name];
        }
        if (name === 'exports') {
            return {};
        }
        const define = get_define(name);
        instances[name] = {};
        const dependencies = define.dependencies.map(name => resolve(name));
        define.factory(...dependencies);
        const exports = dependencies[define.dependencies.indexOf('exports')];
        instances[name] = (exports['__cjsModule']) ? exports.default : exports;
        return instances[name];
    }
    if (entry[0] !== null) {
        return resolve(entry[0]);
    }
})();