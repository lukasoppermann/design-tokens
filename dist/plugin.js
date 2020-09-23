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
    define("utilities/convertPaint", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const convertPaint = (paint) => {
            if (paint.type === 'SOLID' && paint.visible === true) {
                return {
                    color: {
                        value: paint.color
                    },
                    opacity: {
                        value: paint.opacity,
                        comment: "Percent of as decimal from 0.0 - 1.0"
                    }
                };
            }
            return null;
        };
        exports.default = convertPaint;
    });
    define("extractor/extractColors", ["require", "exports", "utilities/convertPaint"], function (require, exports, convertPaint_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const extractColors = (tokenNodes) => {
            // get all paint styles
            return tokenNodes.map(node => ({
                name: node.name,
                description: node.description || null,
                values: convertPaint_1.default(node.paints[0])
            }));
        };
        exports.default = extractColors;
    });
    define("extractor/extractGrids", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const gridValues = (grid) => ({
            pattern: {
                value: grid.pattern.toLowerCase()
            },
            sectionSize: {
                value: grid.sectionSize,
                unit: 'pixels'
            }
        });
        const rowColumnValues = (grid) => ({
            pattern: {
                value: grid.pattern.toLowerCase()
            },
            sectionSize: {
                value: grid.sectionSize,
                unit: 'pixels'
            },
            gutterSize: {
                value: grid.gutterSize,
                unit: 'pixels'
            },
            alignment: {
                value: grid.alignment.toLowerCase()
            },
            count: {
                value: grid.count
            },
            offset: {
                value: grid.offset,
                unit: 'pixels'
            }
        });
        const extractGrids = (tokenNodes) => {
            // get grid styles
            return tokenNodes.map(node => ({
                name: node.name,
                description: node.description || null,
                values: node.layoutGrids.map((grid) => grid.pattern === "GRID" ? gridValues(grid) : rowColumnValues(grid))
            }));
        };
        exports.default = extractGrids;
    });
    // "grids": [
    //   {
    //     "pattern": "COLUMNS",
    //     "visible": true,
    //     "color": {
    //       "r": 1,
    //       "g": 0,
    //       "b": 0,
    //       "a": 0.10000000149011612
    //     },
    //     "gutterSize": 20,
    //     "alignment": "STRETCH",
    //     "count": 5,
    //     "offset": 10
    //   },
    //   {
    //     "pattern": "ROWS",
    //     "visible": true,
    //     "color": {
    //       "r": 1,
    //       "g": 0,
    //       "b": 0,
    //       "a": 0.10000000149011612
    //     },
    //     "gutterSize": 10,
    //     "alignment": "CENTER",
    //     "count": 5,
    //     "sectionSize": 8
    //   },
    //   {
    //     "pattern": "COLUMNS",
    //     "visible": true,
    //     "color": {
    //       "r": 1,
    //       "g": 0,
    //       "b": 0,
    //       "a": 0.10000000149011612
    //     },
    //     "gutterSize": 20,
    //     "alignment": "MAX",
    //     "count": 5,
    //     "sectionSize": 8,
    //     "offset": 10
    //   },
    //   {
    //     "pattern": "COLUMNS",
    //     "visible": true,
    //     "color": {
    //       "r": 1,
    //       "g": 0,
    //       "b": 0,
    //       "a": 0.10000000149011612
    //     },
    //     "gutterSize": 20,
    //     "alignment": "MIN",
    //     "count": 5,
    //     "sectionSize": 34,
    //     "offset": 13
    //   },
    //   {
    //     "pattern": "ROWS",
    //     "visible": true,
    //     "color": {
    //       "r": 1,
    //       "g": 0,
    //       "b": 0,
    //       "a": 0.10000000149011612
    //     },
    //     "gutterSize": 20,
    //     "alignment": "MIN",
    //     "count": 5,
    //     "sectionSize": 8,
    //     "offset": 10
    //   },
    //   {
    //     "pattern": "GRID",
    //     "visible": true,
    //     "color": {
    //       "r": 1,
    //       "g": 0,
    //       "b": 0,
    //       "a": 0.10000000149011612
    //     },
    //     "sectionSize": 8
    //   }
    // ]
    //       }
    //     }
    define("extractor/extractFonts", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const textDecorations = {
            'NONE': 'none',
            'UNDERLINE': 'underline',
            'STRIKETHROUGH': 'line-through'
        };
        const textCases = {
            "ORIGINAL": "none",
            "UPPER": "uppercase",
            "LOWER": "lowercase",
            "TITLE": "capitalize"
        };
        const extractFonts = (tokenNodes) => {
            // get raw text styles
            return tokenNodes.map(node => ({
                name: node.name,
                description: node.description || null,
                values: {
                    fontSize: {
                        value: node.fontSize,
                        unit: 'pixels'
                    },
                    textDecoration: {
                        value: textDecorations[node.textDecoration]
                    },
                    fontFamily: {
                        value: node.fontName.family
                    },
                    fontStyle: {
                        value: node.fontName.style
                    },
                    letterSpacing: {
                        value: node.letterSpacing.value,
                        unit: node.letterSpacing.unit.toLowerCase()
                    },
                    lineHeight: {
                        // @ts-ignore
                        value: node.lineHeight.value || 'normal',
                        unit: node.lineHeight.unit.toLowerCase()
                    },
                    paragraphIndent: {
                        value: node.paragraphIndent,
                        unit: 'pixels'
                    },
                    paragraphSpacing: {
                        value: node.paragraphSpacing,
                        unit: 'pixels'
                    },
                    textCase: {
                        value: textCases[node.textCase]
                    }
                }
            }));
        };
        exports.default = extractFonts;
    });
    define("extractor/extractEffects", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const extractEffects = (tokenNodes) => {
            // get effect styles
            return tokenNodes.map(node => ({
                name: node.name,
                description: node.description || null,
                values: {
                    effects: node.effects
                }
            }));
        };
        exports.default = extractEffects;
    });
    define("extractor/extractSizes", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const extractSizes = (tokenNodes) => {
            const nodeName = 'sizes';
            // return as object
            return tokenNodes.filter(node => node.name.substr(0, nodeName.length) === nodeName).map(node => ({
                name: node.name,
                // @ts-ignore
                description: node.description || null,
                values: {
                    width: {
                        value: node.width,
                        unit: "pixels"
                    },
                    height: {
                        value: node.height,
                        unit: "pixels"
                    }
                }
            }));
        };
        exports.default = extractSizes;
    });
    define("extractor/extractBorders", ["require", "exports", "utilities/convertPaint"], function (require, exports, convertPaint_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const strokeJoins = {
            'MITER': 'miter',
            'BEVEL': 'bevel',
            'ROUND': 'round'
        };
        const strokeAligns = {
            'CENTER': 'center',
            'INSIDE': 'inside',
            'OUTSIDE': 'outside'
        };
        const extractBorders = (tokenNodes) => {
            const nodeName = 'borders';
            // return as object
            return tokenNodes.filter(node => node.name.substr(0, nodeName.length) === nodeName).map(node => ({
                name: node.name,
                // @ts-ignore
                description: node.description || null,
                values: {
                    strokeAlign: {
                        value: strokeAligns[node.strokeAlign]
                    },
                    strokeCap: {
                        value: ((typeof node.strokeCap === 'string') ? node.strokeCap.toLowerCase : 'mixed')
                    },
                    strokeJoin: {
                        value: strokeJoins[node.strokeJoin]
                    },
                    strokeMiterLimit: {
                        value: node.strokeMiterLimit
                    },
                    strokeStyleId: {
                        value: node.strokeStyleId
                    },
                    strokeWeight: {
                        value: node.strokeWeight,
                        unit: 'pixels'
                    },
                    strokes: convertPaint_2.default((node.strokes[0]))
                }
            }));
        };
        exports.default = extractBorders;
    });
    define("extractor/extractRadii", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const extractRadii = (tokenNodes) => {
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
                        topLeft: {
                            value: node.topLeftRadius || 0,
                            unit: 'pixels'
                        },
                        topRight: {
                            value: node.topRightRadius || 0,
                            unit: 'pixels'
                        },
                        bottomRight: {
                            value: node.bottomRightRadius || 0,
                            unit: 'pixels'
                        },
                        bottomLeft: {
                            value: node.bottomLeftRadius || 0,
                            unit: 'pixels'
                        }
                    };
                }
                return {
                    topLeft: {
                        value: node.cornerRadius,
                        unit: 'pixels'
                    },
                    topRight: {
                        value: node.cornerRadius,
                        unit: 'pixels'
                    },
                    bottomRight: {
                        value: node.cornerRadius,
                        unit: 'pixels'
                    },
                    bottomLeft: {
                        value: node.cornerRadius,
                        unit: 'pixels'
                    }
                };
            };
            // return as object
            return tokenNodes.filter(node => node.name.substr(0, nodeName.length) === nodeName).map(node => ({
                name: node.name,
                // @ts-ignore
                description: node.description || null,
                values: {
                    radius: {
                        value: (typeof node.cornerRadius === 'number' ? node.cornerRadius : 'mixed'),
                        unit: 'pixels'
                    },
                    radiusType: {
                        value: getRadiusType(node.cornerRadius)
                    },
                    radii: getRadii(node),
                    smoothing: {
                        value: node.cornerSmoothing,
                        comment: "Percent of as decimal from 0.0 - 1.0"
                    }
                }
            }));
        };
        exports.default = extractRadii;
    });
    define("utilities/getTokenFrames", ["require", "exports"], function (require, exports) {
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
        const isTokenFrame = (node) => node.type === "FRAME" && node.name.trim().toLowerCase().substr(0, tokenFrameName.length) === tokenFrameName;
        // return only nodes that are frames
        const getFrameNodes = (nodes) => nodes.map(page => page.findChildren(node => isTokenFrame(node))).reduce((flatten, arr) => [...flatten, ...arr]);
        /**
         * check if a node is a valid token node type
         * Currently: 'COMPONENT' or 'RECTANGLE'
         * @param SceneNode node
         */
        const isTokenNode = (node) => tokenNodeTypes.includes(node.type);
        /**
         * Returns all frames from the file that have a name that starts with _tokens or the user defined token specifier
         *
         * @param pages PageNodes
         */
        const getTokenFrames = (pages) => {
            // get token frames
            const tokenFrames = getFrameNodes(pages);
            // get all children of token frames
            return tokenFrames.map(frame => frame
                // check if children are of valide types
                .findChildren(node => isTokenNode(node)))
                // merges all children into one array
                .reduce((flatten, arr) => [...flatten, ...arr]);
        };
        exports.default = getTokenFrames;
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
        const groupByName = (tokenArray, removeName = true) => {
            // nest tokens into object with hierachy defined by name using /
            const groupedTokens = tokenArray.map(token => {
                // split token name into array
                // remove leading and following whitespace for every item
                // transform items to lowerCase
                const groupsFromName = token.name.split('/').map(group => group.trim().toLowerCase());
                // remove name if not otherwise specified
                if (removeName === true) {
                    delete token.name;
                }
                // return 
                return nestedObjectFromArray(groupsFromName, token);
            });
            if (groupedTokens.length > 0) {
                // return merged object of tokens grouped by name hierachy
                return groupedTokens.reduce((accumulator = {}, currentValue) => deepMerge_1.default(accumulator, currentValue));
            }
            return [];
        };
        exports.default = groupByName;
    });
    define("exportTokens", ["require", "exports", "extractor/extractColors", "extractor/extractGrids", "extractor/extractFonts", "extractor/extractEffects", "extractor/extractSizes", "extractor/extractBorders", "extractor/extractRadii", "utilities/getTokenFrames", "utilities/groupByName"], function (require, exports, extractColors_1, extractGrids_1, extractFonts_1, extractEffects_1, extractSizes_1, extractBorders_1, extractRadii_1, getTokenFrames_1, groupByName_1) {
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
            console.log('exporting');
            // use spread operator because the original is readOnly
            const tokenFrames = getTokenFrames_1.default([...figma.root.children]);
            // get tokens
            const tokens = [
                ...extractSizes_1.default(tokenFrames),
                ...extractBorders_1.default(tokenFrames),
                ...extractRadii_1.default(tokenFrames),
                ...extractColors_1.default(figma.getLocalPaintStyles()),
                ...extractGrids_1.default(figma.getLocalGridStyles()),
                ...extractFonts_1.default(figma.getLocalTextStyles()),
                ...extractEffects_1.default(figma.getLocalEffectStyles())
            ];
            console.log('Raw Tokens', tokens);
            // group tokens
            const groupedTokens = groupByName_1.default(tokens);
            console.log('grouped Tokens', groupedTokens);
            // write tokens to json file
            sendJsonToUi(groupedTokens);
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
        console.log('index.ts');
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