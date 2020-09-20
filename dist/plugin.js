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
    define("utilities/groupByName", ["require", "exports", "utilities/deepMerge"], function (require, exports, deepMerge_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        // create a nested object structure from the array (['style','colors','main','red'])
        const nestedObjectFromArray = (array, value) => array.reduceRight((value, key) => ({ [key]: value }), value);
        const groupByName = tokenArray => {
            // nest tokens into object with hierachy defined by name using /
            const groupedTokens = tokenArray.map(token => {
                // split token name into array
                // remove leading and following whitespace for every item
                // transform items to lowerCase
                const groupsFromName = token.name.split('/').map(group => group.trim().toLowerCase());
                // return 
                return nestedObjectFromArray(groupsFromName, token);
            });
            // return merged object of tokens grouped by name hierachy
            return groupedTokens.reduce((accumulator = {}, currentValue) => deepMerge_1.default(accumulator, currentValue));
        };
        exports.default = groupByName;
    });
    define("extractor/extractColors", ["require", "exports", "utilities/groupByName"], function (require, exports, groupByName_1) {
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
            return groupByName_1.default(paintStyles);
        };
        exports.default = getColors;
    });
    define("extractor/extractGrids", ["require", "exports", "utilities/groupByName"], function (require, exports, groupByName_2) {
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
            return groupByName_2.default(gridStyles);
        };
        exports.default = getGrids;
    });
    define("transformer/amazonStyleDirectory", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const amazonStyleDirectoryTransformer = (property) => {
            // transform to amazon style directory structure
            Object.keys(property.values).map(function (key) {
                property.values[key] = Object.assign(Object.assign({}, (property.description != null && { description: property.description })), { value: property.values[key] });
            });
            // return values
            return property;
        };
        exports.default = amazonStyleDirectoryTransformer;
    });
    define("extractor/extractFonts", ["require", "exports", "utilities/groupByName", "transformer/amazonStyleDirectory"], function (require, exports, groupByName_3, amazonStyleDirectory_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const getFonts = () => {
            // get raw text styles
            const textStyles = figma.getLocalTextStyles().map(item => (amazonStyleDirectory_1.default({
                id: item.id,
                name: item.name,
                description: item.description || null,
                values: {
                    fontSize: item.fontSize,
                    textDecoration: item.textDecoration,
                    fontName: item.fontName,
                    letterSpacing: item.letterSpacing,
                    lineHeight: item.lineHeight,
                    paragraphIndent: item.paragraphIndent,
                    paragraphSpacing: item.paragraphSpacing,
                    textCase: item.textCase
                }
            })));
            // return as object
            return groupByName_3.default(textStyles);
        };
        exports.default = getFonts;
    });
    define("extractor/extractEffects", ["require", "exports", "utilities/groupByName"], function (require, exports, groupByName_4) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const getEffects = () => {
            // get effect styles
            const effectStyles = figma.getLocalEffectStyles().map(item => ({
                id: item.id,
                name: item.name,
                description: item.description,
                values: {
                    effects: item.effects
                }
            }));
            // return as object
            return groupByName_4.default(effectStyles);
        };
        exports.default = getEffects;
    });
    define("extractor/extractSpacers", ["require", "exports", "utilities/groupByName"], function (require, exports, groupByName_5) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const extractSpacers = tokenNodes => {
            const nodeName = 'spacers';
            // return as object
            const relevantTokenNodes = tokenNodes.filter(node => node.name.substr(0, nodeName.length) === nodeName).map(node => ({
                name: node.name,
                description: node.description || null,
                width: node.width,
                height: node.height
            }));
            // return as object
            return groupByName_5.default(relevantTokenNodes);
        };
        exports.default = extractSpacers;
    });
    define("extractor/extractSizes", ["require", "exports", "utilities/groupByName"], function (require, exports, groupByName_6) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const extractSizes = tokenNodes => {
            const nodeName = 'sizes';
            // return as object
            const relevantTokenNodes = tokenNodes.filter(node => node.name.substr(0, nodeName.length) === nodeName).map(node => ({
                name: node.name,
                description: node.description || null,
                width: node.width,
                height: node.height
            }));
            // return as object
            return groupByName_6.default(relevantTokenNodes);
        };
        exports.default = extractSizes;
    });
    define("extractor/extractBorders", ["require", "exports", "utilities/groupByName"], function (require, exports, groupByName_7) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const extractBorders = tokenNodes => {
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
            return groupByName_7.default(relevantTokenNodes);
        };
        exports.default = extractBorders;
    });
    define("extractor/extractRadii", ["require", "exports", "utilities/groupByName"], function (require, exports, groupByName_8) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const extractRadii = tokenNodes => {
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
            return groupByName_8.default(relevantTokenNodes);
        };
        exports.default = extractRadii;
    });
    define("extractor/extractCustomTokens", ["require", "exports", "extractor/extractSpacers", "extractor/extractSizes", "extractor/extractBorders", "extractor/extractRadii"], function (require, exports, extractSpacers_1, extractSizes_1, extractBorders_1, extractRadii_1) {
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
            return (Object.assign(Object.assign(Object.assign(Object.assign({}, extractSpacers_1.default(tokens)), extractSizes_1.default(tokens)), extractBorders_1.default(tokens)), extractRadii_1.default(tokens)));
        };
        exports.default = getCustomTokens;
    });
    define("exportTokens", ["require", "exports", "extractor/extractColors", "extractor/extractGrids", "extractor/extractFonts", "extractor/extractEffects", "extractor/extractCustomTokens"], function (require, exports, extractColors_1, extractGrids_1, extractFonts_1, extractEffects_1, extractCustomTokens_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        /**
         * Sending json string to ui
         * @param json object
         */
        const sendJsonToUi = (json) => {
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
        const tokenExport = () => {
            // get tokens
            const rawTokens = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, extractCustomTokens_1.default()), extractColors_1.default()), extractGrids_1.default()), extractFonts_1.default()), extractEffects_1.default());
            console.log('Raw Tokens', rawTokens);
            // write tokens to json file
            sendJsonToUi(rawTokens);
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