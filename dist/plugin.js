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
    define("utilities/roundWithDecimals", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        /**
         * If the provided value is a number
         * it is rounded to 3 decimal positions
         * otherwise it is returned as is
         * @param value any
         */
        const roundWithDecimals = value => {
            if (typeof value === 'number') {
                return Math.round(value * 1000) / 1000;
            }
            return value;
        };
        exports.default = roundWithDecimals;
    });
    define("utilities/convertColor", ["require", "exports", "utilities/roundWithDecimals"], function (require, exports, roundWithDecimals_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.convertRgbaObjectToString = exports.convertPaintToRgba = exports.roundRgba = void 0;
        exports.roundRgba = (rgba) => ({
            r: roundWithDecimals_1.default(rgba.r),
            g: roundWithDecimals_1.default(rgba.g),
            b: roundWithDecimals_1.default(rgba.b),
            a: roundWithDecimals_1.default(rgba.opacity || rgba.a || 1)
        });
        exports.convertPaintToRgba = (paint) => {
            if (paint.type === 'SOLID' && paint.visible === true) {
                return exports.roundRgba(paint.color);
            }
            return null;
        };
        exports.convertRgbaObjectToString = (rgbaObject) => `rgba(${rgbaObject.r}, ${rgbaObject.g}, ${rgbaObject.b}, ${rgbaObject.a})`;
    });
    define("extractor/extractColors", ["require", "exports", "utilities/convertColor"], function (require, exports, convertColor_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const extractColors = (tokenNodes) => {
            // get all paint styles
            return tokenNodes.map(node => ({
                name: node.name,
                // id: node.id,
                description: node.description || null,
                category: 'color',
                values: {
                    fill: {
                        value: convertColor_1.convertPaintToRgba(node.paints[0]),
                        type: 'color'
                    }
                }
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
                unit: 'pixel',
                type: 'number'
            }
        });
        const getCount = count => {
            if (count === Infinity) {
                return {
                    value: 'auto',
                    type: 'string'
                };
            }
            return {
                value: count,
                type: 'number'
            };
        };
        const rowColumnValues = (grid) => (Object.assign(Object.assign(Object.assign({ pattern: {
                value: grid.pattern.toLowerCase(),
                type: 'string'
            } }, (grid.sectionSize !== undefined && { sectionSize: {
                value: grid.sectionSize,
                unit: 'pixel',
                type: 'number'
            } })), { gutterSize: {
                value: grid.gutterSize,
                unit: 'pixel',
                type: 'number'
            }, alignment: {
                value: grid.alignment.toLowerCase(),
                type: 'string'
            }, count: getCount(grid.count) }), (grid.offset !== undefined && { offset: {
                value: grid.offset,
                unit: 'pixel',
                type: 'number'
            } })));
        const extractGrids = (tokenNodes) => {
            // get grid styles
            return tokenNodes.map(node => ({
                name: node.name,
                description: node.description || null,
                category: 'grid',
                values: node.layoutGrids.map((grid) => grid.pattern === "GRID" ? gridValues(grid) : rowColumnValues(grid))
            }));
        };
        exports.default = extractGrids;
    });
    define("extractor/extractFonts", ["require", "exports", "utilities/roundWithDecimals"], function (require, exports, roundWithDecimals_2) {
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
                description: node.description || undefined,
                values: {
                    fontSize: {
                        value: node.fontSize,
                        unit: 'pixel',
                        type: 'number'
                    },
                    textDecoration: {
                        value: textDecorations[node.textDecoration],
                        type: 'string'
                    },
                    fontFamily: {
                        value: node.fontName.family,
                        type: 'string'
                    },
                    fontStyle: {
                        value: node.fontName.style,
                        type: 'string'
                    },
                    letterSpacing: {
                        value: roundWithDecimals_2.default(node.letterSpacing.value),
                        unit: node.letterSpacing.unit.toLowerCase(),
                        type: 'number'
                    },
                    lineHeight: {
                        // @ts-ignore
                        value: roundWithDecimals_2.default(node.lineHeight.value) || 'normal',
                        unit: node.lineHeight.unit.toLowerCase(),
                        type: (node.lineHeight.hasOwnProperty('value') ? 'number' : 'string')
                    },
                    paragraphIndent: {
                        value: node.paragraphIndent,
                        unit: 'pixel',
                        type: 'number'
                    },
                    paragraphSpacing: {
                        value: node.paragraphSpacing,
                        unit: 'pixel',
                        type: 'number'
                    },
                    textCase: {
                        value: textCases[node.textCase],
                        type: 'string'
                    }
                }
            }));
        };
        exports.default = extractFonts;
    });
    define("extractor/extractEffects", ["require", "exports", "utilities/convertColor"], function (require, exports, convertColor_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const effectType = {
            "LAYER_BLUR": 'layerBlur',
            "BACKGROUND_BLUR": 'backgroundBlur',
            "DROP_SHADOW": 'dropShadow',
            "INNER_SHADOW": 'innerShadow'
        };
        const blurValues = (effect) => ({
            type: {
                value: effectType[effect.type],
                type: 'string'
            },
            radius: {
                value: effect.radius,
                unit: 'pixel',
                type: 'number'
            }
        });
        const shadowValues = effect => ({
            type: {
                value: effectType[effect.type],
                type: 'string'
            },
            radius: {
                value: effect.radius,
                unit: 'pixel',
                type: 'number'
            },
            color: {
                value: convertColor_2.roundRgba(effect.color),
                type: 'color'
            },
            offset: {
                x: {
                    value: effect.offset.x,
                    unit: 'pixel',
                    type: 'number'
                },
                y: {
                    value: effect.offset.y,
                    unit: 'pixel',
                    type: 'number'
                }
            },
            spread: {
                value: effect.spread,
                unit: 'pixel',
                type: 'number'
            }
        });
        const extractEffects = (tokenNodes) => {
            // get effect styles
            return tokenNodes.map(node => ({
                name: node.name,
                description: node.description || null,
                category: 'effect',
                values: node.effects.map((effect) => effect.type === "LAYER_BLUR" || effect.type === "BACKGROUND_BLUR"
                    ? blurValues(effect)
                    : shadowValues(effect))
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
                category: 'size',
                values: {
                    width: {
                        value: node.width,
                        unit: "pixel",
                        type: 'number'
                    },
                    height: {
                        value: node.height,
                        unit: "pixel",
                        type: 'number'
                    }
                }
            }));
        };
        exports.default = extractSizes;
    });
    define("extractor/extractBorders", ["require", "exports", "utilities/convertColor", "utilities/roundWithDecimals"], function (require, exports, convertColor_3, roundWithDecimals_3) {
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
                        value: strokeAligns[node.strokeAlign],
                        type: 'string'
                    },
                    dashPattern: {
                        value: node.dashPattern.toString(),
                        type: 'string'
                    },
                    strokeCap: {
                        value: ((typeof node.strokeCap === 'string') ? node.strokeCap.toLowerCase() : 'mixed'),
                        type: 'string'
                    },
                    strokeJoin: {
                        value: strokeJoins[node.strokeJoin],
                        type: 'string'
                    },
                    strokeMiterAngle: {
                        value: roundWithDecimals_3.default(node.strokeMiterLimit),
                        unit: 'degree',
                        type: 'number'
                    },
                    // strokeStyleId: {
                    //   value: node.strokeStyleId
                    // },
                    strokeWeight: {
                        value: node.strokeWeight,
                        unit: 'pixel',
                        type: 'number'
                    },
                    stroke: {
                        value: convertColor_3.convertPaintToRgba((node.strokes[0])),
                        type: 'color'
                    }
                }
            }));
        };
        exports.default = extractBorders;
    });
    define("extractor/extractRadii", ["require", "exports", "utilities/roundWithDecimals"], function (require, exports, roundWithDecimals_4) {
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
                            unit: 'pixel',
                            type: 'number'
                        },
                        topRight: {
                            value: node.topRightRadius || 0,
                            unit: 'pixel',
                            type: 'number'
                        },
                        bottomRight: {
                            value: node.bottomRightRadius || 0,
                            unit: 'pixel',
                            type: 'number'
                        },
                        bottomLeft: {
                            value: node.bottomLeftRadius || 0,
                            unit: 'pixel',
                            type: 'number'
                        }
                    };
                }
                return {
                    topLeft: {
                        value: node.cornerRadius,
                        unit: 'pixel',
                        type: 'number'
                    },
                    topRight: {
                        value: node.cornerRadius,
                        unit: 'pixel',
                        type: 'number'
                    },
                    bottomRight: {
                        value: node.cornerRadius,
                        unit: 'pixel',
                        type: 'number'
                    },
                    bottomLeft: {
                        value: node.cornerRadius,
                        unit: 'pixel',
                        type: 'number'
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
                        unit: 'pixel',
                        type: 'number'
                    },
                    radiusType: {
                        value: getRadiusType(node.cornerRadius),
                        type: 'string'
                    },
                    radii: getRadii(node),
                    smoothing: {
                        value: roundWithDecimals_4.default(node.cornerSmoothing),
                        comment: "Percent as decimal from 0.0 - 1.0",
                        type: 'number'
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
                .reduce((flatten, arr) => [...flatten, ...arr], []);
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
        const nestedObjectFromArray = (array, value) => {
            // reducer
            const reducer = (val, key) => ({ [key]: val });
            // return reduced array
            return array.reduceRight(reducer, value);
        };
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
    define("utilities/convertSizeUnits", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const convertSizeUnits = (valueObject) => {
            // check if valueObject is a number
            if (typeof valueObject === 'number') {
                return Math.round((valueObject + Number.EPSILON) * 100) / 100;
            }
            // otherwise if unit is defined
            if (typeof valueObject === 'object' && valueObject.unit !== undefined) {
                if (valueObject.unit === "PERCENT") {
                    return (Math.round((valueObject.value + Number.EPSILON) * 100) / 100) + '%';
                }
                return Math.round((valueObject.value + Number.EPSILON) * 100) / 100;
            }
        };
        exports.default = convertSizeUnits;
    });
    define("transformer/amazonStyleDictionaryTransformer", ["require", "exports", "utilities/convertColor"], function (require, exports, convertColor_4) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const defaultTransformer = propertyGroupValues => {
            const transformedProperties = {};
            Object.keys(propertyGroupValues).forEach(function (key) {
                transformedProperties[key] = amazonFormat(propertyGroupValues[key]);
            });
            return transformedProperties;
        };
        const sizeTransformer = propertyGroupValues => {
            return amazonFormat(propertyGroupValues['width']);
        };
        const colorTransformer = propertyGroupValues => {
            return amazonFormat(propertyGroupValues['fill']);
        };
        const arrayTransformer = propertyGroupValueGroups => {
            if (propertyGroupValueGroups.length === 1) {
                return defaultTransformer(propertyGroupValueGroups[0]);
            }
            return propertyGroupValueGroups.map(propertyGroupValues => defaultTransformer(propertyGroupValues));
        };
        const categoryTransformer = {
            default: defaultTransformer,
            size: sizeTransformer,
            color: colorTransformer,
            grid: arrayTransformer,
            effect: arrayTransformer
        };
        const amazonConvertValue = (value, type) => {
            if (value === undefined || value === null) {
                return;
            }
            if (type === 'color') {
                return convertColor_4.convertRgbaObjectToString(value);
            }
            return value;
        };
        const amazonFormat = (property) => (Object.assign(Object.assign({ value: amazonConvertValue(property.value, property.type), type: property.type }, (property.description != undefined && { comment: property.description })), (property.unit != undefined && { unit: property.unit })));
        const amazonStyleDictionaryTransformer = (propertyGroup) => {
            // transform to amazon style Dictionary structure
            const transformedProperties = categoryTransformer[propertyGroup.category || 'default'](propertyGroup.values);
            // return values
            return Object.assign(Object.assign({ name: propertyGroup.name, category: propertyGroup.category }, (propertyGroup.description != undefined && { comment: propertyGroup.description })), transformedProperties);
        };
        exports.default = amazonStyleDictionaryTransformer;
    });
    define("exportTokens", ["require", "exports", "extractor/extractColors", "extractor/extractGrids", "extractor/extractFonts", "extractor/extractEffects", "utilities/getTokenFrames", "utilities/groupByName", "transformer/amazonStyleDictionaryTransformer"], function (require, exports, extractColors_1, extractGrids_1, extractFonts_1, extractEffects_1, getTokenFrames_1, groupByName_1, amazonStyleDictionaryTransformer_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const transformer = {
            amazon: amazonStyleDictionaryTransformer_1.default
        };
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
        const exportRawTokenArray = (figma) => {
            // use spread operator because the original is readOnly
            const tokenFrames = getTokenFrames_1.default([...figma.root.children]);
            // get tokens
            return [
                // ...extractSizes(tokenFrames),
                // ...extractBorders(tokenFrames),
                // ...extractRadii(tokenFrames),
                ...extractColors_1.default(figma.getLocalPaintStyles()),
                ...extractGrids_1.default(figma.getLocalGridStyles()),
                ...extractFonts_1.default(figma.getLocalTextStyles()),
                ...extractEffects_1.default(figma.getLocalEffectStyles())
            ];
        };
        const tokenExport = (figma, format = 'amazon') => {
            // get token array
            const tokenArray = exportRawTokenArray(figma);
            console.log('JSON TOKEN', tokenArray);
            // format tokens
            const formattedTokens = tokenArray.map((token) => transformer[format](token));
            console.log('formatted Tokens', formattedTokens);
            // group tokens
            const groupedTokens = groupByName_1.default(formattedTokens);
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
            exportTokens_1.default(figma);
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
            if (message.command === 'closePlugin') {
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