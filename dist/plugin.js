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
            // send json string to ui to prompt download
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
    define("utilities/deepMerge", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        /**
         * Performs a deep merge of `source` into `target`.
         * Mutates `target` only but not its objects and arrays.
         *
         * @author inspired by [jhildenbiddle](https://stackoverflow.com/a/48218209).
         */
        const deepMerge = (target, source) => {
            // function to test if a variable is an object
            const isObject = (obj) => obj && typeof obj === 'object';
            // make sure both the target and the source are objects
            // otherwise return source
            if (!isObject(target) || !isObject(source)) {
                return source;
            }
            // iteratre over source
            Object.keys(source).forEach(key => {
                // get values from both target and source for the given key
                const targetValue = target[key];
                const sourceValue = source[key];
                // merge both values
                if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
                    target[key] = targetValue.concat(sourceValue);
                }
                else if (isObject(targetValue) && isObject(sourceValue)) {
                    target[key] = deepMerge(Object.assign({}, targetValue), sourceValue);
                }
                else {
                    target[key] = sourceValue;
                }
            });
            // return merge object
            return target;
        };
        exports.default = deepMerge;
    });
    define("groupTokensByName", ["require", "exports", "utilities/deepMerge"], function (require, exports, deepMerge_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        // create a nested object structure from the array (['style','colors','main','red'])
        const nestedObjectFromArray = (array, value) => array.reduceRight((value, key) => ({ [key]: value }), value);
        const groupTokensByName = tokenArray => {
            // nest tokens into object with hierachy defined by name using /
            const groupedTokens = tokenArray.map(token => {
                // split token name into array
                // remove leading and following whitespace for every item
                // transform items to lowerCase
                const groups = token.name.split('/').map(group => group.trim().toLowerCase());
                // return 
                return nestedObjectFromArray(groups, token);
            });
            console.log(groupedTokens);
            const merged = groupedTokens.reduce((accumulator = {}, currentValue) => deepMerge_1.default(accumulator, currentValue));
            console.log(merged);
        };
        exports.default = groupTokensByName;
    });
    define("getColors", ["require", "exports", "groupTokensByName"], function (require, exports, groupTokensByName_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const getColors = () => {
            // get all paint styles
            const paintStyles = figma.getLocalPaintStyles().map(item => ({
                id: item.id,
                name: item.name,
                description: item.description,
                paints: item.paints
            }));
            // return as object
            return {
                colors: groupTokensByName_1.default(paintStyles)
            };
        };
        exports.default = getColors;
    });
    define("getGrids", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const getGrids = () => {
            // get grid styles
            const gridStyles = figma.getLocalGridStyles().map(item => ({
                id: item.id,
                name: item.name,
                description: item.description,
                grids: item.layoutGrids
            }));
            // return as object
            return {
                grids: gridStyles
            };
        };
        exports.default = getGrids;
    });
    define("getFonts", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const getFonts = () => {
            // get raw text styles
            const textStyles = figma.getLocalTextStyles().map(item => ({
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
            // return as object
            return {
                fonts: textStyles
            };
        };
        exports.default = getFonts;
    });
    define("getEffects", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const getEffects = () => {
            // get effect styles
            const effectStyles = figma.getLocalEffectStyles().map(item => ({
                id: item.id,
                name: item.name,
                description: item.description,
                effects: item.effects
            }));
            // return as object
            return {
                effects: effectStyles
            };
        };
        exports.default = getEffects;
    });
    define("getSpacers", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const getSpacers = tokenNodes => {
            const nodeName = 'spacers';
            // return as object
            const relevantTokenNodes = tokenNodes.filter(node => node.name.substr(0, nodeName.length) === nodeName).map(node => ({
                name: node.name,
                description: node.description || null,
                width: node.width,
                height: node.height
            }));
            // return as object
            return {
                [nodeName]: relevantTokenNodes
            };
        };
        exports.default = getSpacers;
    });
    define("getSizes", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const getSizes = tokenNodes => {
            const nodeName = 'sizes';
            // return as object
            const relevantTokenNodes = tokenNodes.filter(node => node.name.substr(0, nodeName.length) === nodeName).map(node => ({
                name: node.name,
                description: node.description || null,
                width: node.width,
                height: node.height
            }));
            // return as object
            return {
                [nodeName]: relevantTokenNodes
            };
        };
        exports.default = getSizes;
    });
    define("getBorders", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const getBorders = tokenNodes => {
            const nodeName = 'borders';
            // return as object
            const relevantTokenNodes = tokenNodes.filter(node => node.name.substr(0, nodeName.length) === nodeName).map(node => ({
                name: node.name,
                description: node.description || null,
                strokeAlign: node.strokeAlign.toLowerCase,
                strokeCap: node.strokeCap.toLowerCase,
                strokeJoin: node.strokeJoin.toLowerCase,
                strokeMiterLimit: node.strokeMiterLimit,
                strokeStyleId: node.strokeStyleId,
                strokeWeight: node.strokeWeight,
                strokes: node.strokes
            }));
            // return as object
            return {
                [nodeName]: relevantTokenNodes
            };
        };
        exports.default = getBorders;
    });
    define("getRadii", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const getRadii = tokenNodes => {
            const nodeName = 'radii';
            // get the type of the corner radius
            const getRadiusType = radius => {
                if (typeof radius === 'number') {
                    return 'single';
                }
                return 'mixed';
            };
            // get the individual radii
            const getRadii = (node) => {
                if (typeof node.cornerRadius !== 'number') {
                    return {
                        topLeft: node.topLeftRadius || 0,
                        topRight: node.topRightRadius || 0,
                        bottomRight: node.bottomRightRadius || 0,
                        bottomLeft: node.bottomLeftRadius || 0
                    };
                }
                return {
                    topLeft: node.cornerRadius,
                    topRight: node.cornerRadius,
                    bottomRight: node.cornerRadius,
                    bottomLeft: node.cornerRadius
                };
            };
            // return as object
            const relevantTokenNodes = tokenNodes.filter(node => node.name.substr(0, nodeName.length) === nodeName).map(node => ({
                name: node.name,
                description: node.description || null,
                radius: node.cornerRadius,
                radiusType: getRadiusType(node.cornerRadius),
                radii: getRadii(node),
                smoothing: node.cornerSmoothing
            }));
            // return as object
            return {
                [nodeName]: relevantTokenNodes
            };
        };
        exports.default = getRadii;
    });
    define("getCustomTokens", ["require", "exports", "getSpacers", "getSizes", "getBorders", "getRadii"], function (require, exports, getSpacers_1, getSizes_1, getBorders_1, getRadii_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        // the node types that can be used for tokens
        const tokenNodeTypes = [
            'COMPONENT',
            'RECTANGLE'
        ];
        // the name that token frames have
        const tokenFrameName = '_tokens';
        // check if a frame is a _token frame
        const isTokenFrame = node => node.type === "FRAME" && node.name.trim().toLowerCase().substr(0, tokenFrameName.length) === tokenFrameName;
        // return only nodes that are frames
        const getFrameNodes = (nodes) => nodes.map(page => page.findChildren(node => isTokenFrame(node))).reduce((flatten, arr) => [...flatten, ...arr]);
        // check if a node is a valid token node
        const isTokenNode = node => tokenNodeTypes.includes(node.type);
        // get the tokens from the token frames and return custom tokens
        const getCustomTokens = () => {
            // get token frames
            const tokenFrames = getFrameNodes(figma.root.children);
            // get all children of token frames
            const tokens = tokenFrames.map(frame => frame.findChildren(node => isTokenNode(node))).reduce((flatten, arr) => [...flatten, ...arr]);
            // return tokens
            return (Object.assign(Object.assign(Object.assign(Object.assign({}, getSpacers_1.default(tokens)), getSizes_1.default(tokens)), getBorders_1.default(tokens)), getRadii_1.default(tokens)));
        };
        exports.default = getCustomTokens;
    });
    define("exportTokens", ["require", "exports", "writeJson", "getColors", "getGrids", "getFonts", "getEffects", "getCustomTokens"], function (require, exports, writeJson_1, getColors_1, getGrids_1, getFonts_1, getEffects_1, getCustomTokens_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const tokenExport = () => {
            // get tokens
            const rawTokens = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, getCustomTokens_1.default()), getColors_1.default()), getGrids_1.default()), getFonts_1.default()), getEffects_1.default());
            console.log('Raw Tokens', rawTokens);
            // write tokens to json file
            writeJson_1.default(rawTokens);
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
        if (figma.command === 'export') {
            exportTokens_1.default();
            // const tokens = exportTokens()
            // writeJson(tokens)
            // always run closePlugin otherwise the plugin will keep running
        }
        // SETTINGS
        // settings for the design tokens
        if (figma.command === 'settings') {
            const isTokenFrame = node => node.type === "FRAME" && node.name.trim().toLowerCase().substr(0, 7) === '_tokens';
            const frames = figma.root.children.map(page => page.findChildren(node => isTokenFrame(node))).reduce((flatten, arr) => [...flatten, ...arr]);
            figma.ui.show();
        }
        figma.ui.onmessage = (message) => {
            if (message === 'closePlugin') {
                // figma.closePlugin()
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