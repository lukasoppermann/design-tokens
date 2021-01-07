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
    var __importDefault = (this && this.__importDefault) || function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    define("types/valueTypes", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/utilities/roundWithDecimals", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        /**
         * If the provided value is a number
         * it is rounded to 3 decimal positions
         * otherwise it is returned as is
         * @param value number
         * @param decimalPlaces int
         */
        const roundWithDecimals = (value, decimalPlaces = 2) => {
            // exit if value is undefined
            if (value === undefined) {
                return;
            }
            // check for correct inputs
            if (typeof value !== 'number' || typeof decimalPlaces !== 'number') {
                throw new Error(`Invalid parameters, both value "${value}" (${typeof value}) and decimalPlaces "${decimalPlaces}" (${typeof decimalPlaces}) must be of type number`);
            }
            // set decimal places
            const factorOfTen = Math.pow(10, decimalPlaces);
            // round result and return
            return Math.round(value * factorOfTen) / factorOfTen;
        };
        exports.default = roundWithDecimals;
    });
    define("src/utilities/convertColor", ["require", "exports", "src/utilities/roundWithDecimals"], function (require, exports, roundWithDecimals_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.convertRgbaObjectToString = exports.convertPaintToRgba = exports.roundRgba = void 0;
        roundWithDecimals_1 = __importDefault(roundWithDecimals_1);
        const roundRgba = (rgba, opacity) => ({
            r: roundWithDecimals_1.default(rgba.r * 255, 0),
            g: roundWithDecimals_1.default(rgba.g * 255, 0),
            b: roundWithDecimals_1.default(rgba.b * 255, 0),
            a: roundWithDecimals_1.default(opacity || rgba.a || 1)
        });
        exports.roundRgba = roundRgba;
        const convertPaintToRgba = (paint) => {
            if (paint.type === 'SOLID' && paint.visible === true) {
                return exports.roundRgba(paint.color, (paint.opacity || null));
            }
            return null;
        };
        exports.convertPaintToRgba = convertPaintToRgba;
        const convertRgbaObjectToString = (rgbaObject) => `rgba(${rgbaObject.r}, ${rgbaObject.g}, ${rgbaObject.b}, ${rgbaObject.a})`;
        exports.convertRgbaObjectToString = convertRgbaObjectToString;
    });
    define("src/extractor/extractColors", ["require", "exports", "src/utilities/convertColor", "src/utilities/roundWithDecimals"], function (require, exports, convertColor_1, roundWithDecimals_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        roundWithDecimals_2 = __importDefault(roundWithDecimals_2);
        const gradientType = {
            GRADIENT_LINEAR: 'linear',
            GRADIENT_RADIAL: 'radial',
            GRADIENT_ANGULAR: 'angular',
            GRADIENT_DIAMOND: 'diamond'
        };
        const extractFills = (paint) => {
            if (paint.type === 'SOLID') {
                return {
                    fill: {
                        value: convertColor_1.convertPaintToRgba(paint),
                        type: 'color'
                    }
                };
            }
            if (['GRADIENT_LINEAR', 'GRADIENT_RADIAL', 'GRADIENT_ANGULAR', 'GRADIENT_DIAMOND'].includes(paint.type)) {
                return {
                    gradientType: {
                        value: gradientType[paint.type],
                        type: 'string'
                    },
                    stops: paint.gradientStops.map(stop => ({
                        position: {
                            value: roundWithDecimals_2.default(stop.position),
                            type: 'number'
                        },
                        color: {
                            value: convertColor_1.roundRgba(stop.color),
                            type: 'color'
                        }
                    })),
                    opacity: {
                        value: roundWithDecimals_2.default(paint.opacity),
                        type: 'number'
                    }
                };
            }
            // return null if no matching type
            /* istanbul ignore next */
            return null;
        };
        const extractColors = (tokenNodes) => {
            // get all paint styles
            return tokenNodes
                // remove images fills from tokens
                .map(node => {
                node.paints = node.paints.filter(paint => paint.type !== 'IMAGE');
                return node;
            })
                // remove tokens with no fill
                .filter(node => node.paints.length > 0)
                // transform style
                .map(node => ({
                name: node.name,
                // id: node.id,
                description: node.description || null,
                category: 'fill',
                values: node.paints.map(paint => extractFills(paint))
            }));
        };
        exports.default = extractColors;
    });
    define("src/extractor/extractGrids", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const gridValues = (grid) => ({
            pattern: {
                value: grid.pattern.toLowerCase(),
                type: 'string'
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
            } }, (grid.sectionSize !== undefined && {
            sectionSize: {
                value: grid.sectionSize,
                unit: 'pixel',
                type: 'number'
            }
        })), { gutterSize: {
                value: grid.gutterSize,
                unit: 'pixel',
                type: 'number'
            }, alignment: {
                value: grid.alignment.toLowerCase(),
                type: 'string'
            }, count: getCount(grid.count) }), (grid.offset !== undefined && {
            offset: {
                value: grid.offset,
                unit: 'pixel',
                type: 'number'
            }
        })));
        const extractGrids = (tokenNodes) => {
            // get grid styles
            return tokenNodes.map(node => ({
                name: node.name,
                description: node.description || null,
                category: 'grid',
                values: node.layoutGrids.map((grid) => grid.pattern === 'GRID' ? gridValues(grid) : rowColumnValues(grid))
            }));
        };
        exports.default = extractGrids;
    });
    define("src/extractor/extractFonts", ["require", "exports", "src/utilities/roundWithDecimals"], function (require, exports, roundWithDecimals_3) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        roundWithDecimals_3 = __importDefault(roundWithDecimals_3);
        const textDecorations = {
            NONE: 'none',
            UNDERLINE: 'underline',
            STRIKETHROUGH: 'line-through'
        };
        const textCases = {
            ORIGINAL: 'none',
            UPPER: 'uppercase',
            LOWER: 'lowercase',
            TITLE: 'capitalize'
        };
        const extractFonts = (tokenNodes) => {
            // get raw text styles
            return tokenNodes.map(node => ({
                name: node.name,
                description: node.description || undefined,
                category: 'font',
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
                        value: roundWithDecimals_3.default(node.letterSpacing.value),
                        unit: node.letterSpacing.unit.toLowerCase(),
                        type: 'number'
                    },
                    lineHeight: {
                        // @ts-ignore
                        value: roundWithDecimals_3.default(node.lineHeight.value) || 'normal',
                        unit: node.lineHeight.unit.toLowerCase(),
                        type: (Object.prototype.hasOwnProperty.call(node.lineHeight, 'value') ? 'number' : 'string')
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
    define("src/extractor/extractEffects", ["require", "exports", "src/utilities/convertColor"], function (require, exports, convertColor_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const effectType = {
            LAYER_BLUR: 'layerBlur',
            BACKGROUND_BLUR: 'backgroundBlur',
            DROP_SHADOW: 'dropShadow',
            INNER_SHADOW: 'innerShadow'
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
                values: node.effects.map((effect) => effect.type === 'LAYER_BLUR' || effect.type === 'BACKGROUND_BLUR'
                    ? blurValues(effect)
                    : shadowValues(effect))
            }));
        };
        exports.default = extractEffects;
    });
    define("src/extractor/extractMotion", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.__testing = void 0;
        const direction = (transition) => {
            if (Object.prototype.hasOwnProperty.call(transition, 'direction')) {
                return {
                    direction: {
                        value: transition.direction.toLowerCase(),
                        type: 'string'
                    }
                };
            }
        };
        const easings = {
            CUSTOM_CUBIC_BEZIER: {},
            LINEAR: {
                type: 'linear',
                easingFunctionCubicBezier: {
                    x1: 0,
                    y1: 0,
                    x2: 1,
                    y2: 1
                }
            },
            EASE_IN: {
                type: 'ease-in',
                easingFunctionCubicBezier: {
                    x1: 0.41999998688697815,
                    y1: 0,
                    x2: 1,
                    y2: 1
                }
            },
            EASE_OUT: {
                type: 'ease-out',
                easingFunctionCubicBezier: {
                    x1: 0,
                    y1: 0,
                    x2: 0.5799999833106995,
                    y2: 1
                }
            },
            EASE_IN_AND_OUT: {
                type: 'ease-in-out',
                easingFunctionCubicBezier: {
                    x1: 0.41999998688697815,
                    y1: 0,
                    x2: 0.5799999833106995,
                    y2: 1
                }
            },
            EASE_IN_BACK: {
                type: 'ease-in-back',
                easingFunctionCubicBezier: {
                    x1: 0.30000001192092896,
                    y1: -0.05000000074505806,
                    x2: 0.699999988079071,
                    y2: -0.5
                }
            },
            EASE_OUT_BACK: {
                type: 'ease-out-back',
                easingFunctionCubicBezier: {
                    x1: 0.44999998807907104,
                    y1: 1.4500000476837158,
                    x2: 0.800000011920929,
                    y2: 1
                }
            },
            EASE_IN_AND_OUT_BACK: {
                type: 'ease-in-out-back',
                easingFunctionCubicBezier: {
                    x1: 0.699999988079071,
                    y1: -0.4000000059604645,
                    x2: 0.4000000059604645,
                    y2: 1.399999976158142
                }
            }
        };
        const easing = (easing) => {
            // abort if invalif easing type
            if (!Object.hasOwnProperty.call(easings, easing.type)) {
                return undefined;
            }
            // return custom easing
            // @ts-ignore
            if (easing.type === 'CUSTOM_CUBIC_BEZIER') {
                easings.CUSTOM_CUBIC_BEZIER = {
                    type: 'cubic-bezier',
                    easingFunctionCubicBezier: {
                        x1: easing.easingFunctionCubicBezier.x1,
                        y1: easing.easingFunctionCubicBezier.y1,
                        x2: easing.easingFunctionCubicBezier.x2,
                        y2: easing.easingFunctionCubicBezier.y2
                    }
                };
            }
            return {
                easing: {
                    value: easings[easing.type].type,
                    type: 'string'
                },
                easingFunction: {
                    x1: {
                        value: easings[easing.type].easingFunctionCubicBezier.x1,
                        type: 'number'
                    },
                    x2: {
                        value: easings[easing.type].easingFunctionCubicBezier.x2,
                        type: 'number'
                    },
                    y1: {
                        value: easings[easing.type].easingFunctionCubicBezier.y1,
                        type: 'number'
                    },
                    y2: {
                        value: easings[easing.type].easingFunctionCubicBezier.y2,
                        type: 'number'
                    }
                }
            };
        };
        const extractMotion = (tokenNodes) => {
            const nodeName = 'motion';
            // return as object
            return tokenNodes
                // only get motion nodes
                .filter(node => node.name.substr(0, nodeName.length) === nodeName)
                // filter to only include items which have a transition property
                .filter(node => {
                if (node.reactions.length > 0 && node.reactions[0].action.type === 'NODE' && node.reactions[0].action.transition !== null) {
                    return true;
                }
                return false;
            })
                // retrieve values
                .map((node) => ({
                name: node.name,
                // @ts-ignore
                description: node.description || null,
                category: 'motion',
                values: Object.assign(Object.assign({ type: {
                        value: node.reactions[0].action.transition.type.toLocaleLowerCase(),
                        type: 'string'
                    }, duration: {
                        value: Math.round((node.reactions[0].action.transition.duration + Number.EPSILON) * 1000) / 1000,
                        unit: 's',
                        type: 'number'
                    } }, easing(node.reactions[0].action.transition.easing)), direction(node.reactions[0].action.transition))
            }));
        };
        exports.default = extractMotion;
        exports.__testing = {
            easing: easing
        };
    });
    define("src/extractor/extractSizes", ["require", "exports", "src/utilities/roundWithDecimals"], function (require, exports, roundWithDecimals_4) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        roundWithDecimals_4 = __importDefault(roundWithDecimals_4);
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
                        value: roundWithDecimals_4.default(node.width, 2),
                        unit: 'pixel',
                        type: 'number'
                    },
                    height: {
                        value: roundWithDecimals_4.default(node.height, 2),
                        unit: 'pixel',
                        type: 'number'
                    }
                }
            }));
        };
        exports.default = extractSizes;
    });
    define("src/extractor/extractSpacing", ["require", "exports", "src/utilities/roundWithDecimals"], function (require, exports, roundWithDecimals_5) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        roundWithDecimals_5 = __importDefault(roundWithDecimals_5);
        const extractSpacing = (tokenNodes) => {
            const nodeName = 'spacing';
            // return as object
            return tokenNodes.filter(node => node.name.substr(0, nodeName.length) === nodeName)
                .map(node => ({
                name: node.name,
                // @ts-ignore
                description: node.description || null,
                category: 'spacing',
                values: {
                    top: {
                        value: roundWithDecimals_5.default(node.paddingTop, 2),
                        unit: 'pixel',
                        type: 'number'
                    },
                    right: {
                        value: roundWithDecimals_5.default(node.paddingRight, 2),
                        unit: 'pixel',
                        type: 'number'
                    },
                    bottom: {
                        value: roundWithDecimals_5.default(node.paddingBottom, 2),
                        unit: 'pixel',
                        type: 'number'
                    },
                    left: {
                        value: roundWithDecimals_5.default(node.paddingLeft, 2),
                        unit: 'pixel',
                        type: 'number'
                    }
                }
            }));
        };
        exports.default = extractSpacing;
    });
    define("src/extractor/extractBorders", ["require", "exports", "src/utilities/roundWithDecimals"], function (require, exports, roundWithDecimals_6) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        roundWithDecimals_6 = __importDefault(roundWithDecimals_6);
        const strokeJoins = {
            MITER: 'miter',
            BEVEL: 'bevel',
            ROUND: 'round'
        };
        const strokeAligns = {
            CENTER: 'center',
            INSIDE: 'inside',
            OUTSIDE: 'outside'
        };
        const extractBorders = (tokenNodes) => {
            const nodeName = 'borders';
            // return as object
            return tokenNodes
                // only get border nodes
                .filter(node => node.name.substr(0, nodeName.length) === nodeName)
                // remove nodes with no border property
                .filter(node => node.strokes.length > 0)
                // convert borders
                .map(node => ({
                name: node.name,
                category: 'border',
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
                    strokeMiterLimit: {
                        value: roundWithDecimals_6.default(node.strokeMiterLimit),
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
                        value: node.strokes[0],
                        type: 'color'
                    }
                }
            }));
        };
        exports.default = extractBorders;
    });
    define("src/extractor/extractRadii", ["require", "exports", "src/utilities/roundWithDecimals"], function (require, exports, roundWithDecimals_7) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        roundWithDecimals_7 = __importDefault(roundWithDecimals_7);
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
            const getRadii = (node) => ({
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
            });
            // return as object
            return tokenNodes.filter(node => node.name.substr(0, nodeName.length) === nodeName).map(node => ({
                name: node.name,
                // @ts-ignore
                description: node.description || null,
                category: 'radius',
                values: Object.assign(Object.assign({}, (typeof node.cornerRadius === 'number' && {
                    radius: {
                        value: node.cornerRadius,
                        unit: 'pixel',
                        type: 'number'
                    }
                })), { radiusType: {
                        value: getRadiusType(node.cornerRadius),
                        type: 'string'
                    }, radii: getRadii(node), smoothing: {
                        value: roundWithDecimals_7.default(node.cornerSmoothing, 2),
                        comment: 'Percent as decimal from 0.0 - 1.0',
                        type: 'number'
                    } })
            }));
        };
        exports.default = extractRadii;
    });
    define("src/utilities/deepMerge", ["require", "exports"], function (require, exports) {
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
    define("src/utilities/groupByName", ["require", "exports", "src/utilities/deepMerge"], function (require, exports, deepMerge_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        deepMerge_1 = __importDefault(deepMerge_1);
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
    define("types/propertyCategory", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("types/styleDictionaryProperties", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/transformer/styleDictionaryTransformer", ["require", "exports", "src/utilities/convertColor"], function (require, exports, convertColor_3) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.__testing = void 0;
        const defaultTransformer = propertyGroupValues => {
            // turn array with only one item into normal object
            if (Array.isArray(propertyGroupValues) && propertyGroupValues.length === 1) {
                propertyGroupValues = propertyGroupValues[0];
            }
            // define object
            const transformedProperties = {};
            // transform proeprties
            Object.keys(propertyGroupValues).forEach(function (key) {
                // if this is the final level
                if (Object.prototype.hasOwnProperty.call(propertyGroupValues[key], 'value')) {
                    transformedProperties[key] = styleDictionaryFormat(propertyGroupValues[key]);
                }
                // if there is more nesting
                else {
                    transformedProperties[key] = defaultTransformer(propertyGroupValues[key]);
                }
            });
            // if only one property is in object (e.g. only fill for color)
            // return teh value of this property directly (e.g. color-blue: #0000AA instead of color-blue-fill: #0000AA)
            if (Object.keys(transformedProperties).length === 1) {
                return Object.values(transformedProperties)[0];
            }
            // return transformed properties
            return transformedProperties;
        };
        const sizeTransformer = propertyGroupValues => {
            return styleDictionaryFormat(propertyGroupValues.width);
        };
        const categoryTransformer = {
            default: defaultTransformer,
            font: defaultTransformer,
            border: defaultTransformer,
            size: sizeTransformer,
            grid: defaultTransformer,
            effect: defaultTransformer,
            radius: defaultTransformer,
            fill: defaultTransformer
        };
        const styleDictionaryConvertValue = (value, type) => {
            if (value === undefined || value === null) {
                return;
            }
            if (type === 'color') {
                return convertColor_3.convertRgbaObjectToString(value);
            }
            return value;
        };
        const styleDictionaryFormat = (property) => (Object.assign(Object.assign({ value: styleDictionaryConvertValue(property.value, property.type), type: property.type }, (property.description !== undefined && { comment: property.description })), (property.unit !== undefined && { unit: property.unit })));
        const propertyTransformer = (propertyGroup, category) => {
            // if custom transformer is defined
            if (Object.prototype.hasOwnProperty.call(categoryTransformer, propertyGroup.category)) {
                return categoryTransformer[propertyGroup.category](propertyGroup.values);
            }
            // otherwise return with default transformer
            return defaultTransformer(propertyGroup.values);
        };
        const styleDictionaryTransformer = (propertyGroup) => {
            // transform to amazon style Dictionary structure
            const transformedProperties = propertyTransformer(propertyGroup, propertyGroup.category);
            // return values
            return Object.assign(Object.assign({ name: propertyGroup.name, category: propertyGroup.category }, (propertyGroup.description !== undefined && { comment: propertyGroup.description })), transformedProperties);
        };
        exports.default = styleDictionaryTransformer;
        exports.__testing = {
            styleDictionaryConvertValue: styleDictionaryConvertValue,
            sizeTransformer: sizeTransformer
        };
    });
    define("types/figmaDataType", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/utilities/getTokenJson", ["require", "exports", "src/extractor/extractColors", "src/extractor/extractGrids", "src/extractor/extractFonts", "src/extractor/extractEffects", "src/extractor/extractMotion", "src/extractor/extractSizes", "src/extractor/extractSpacing", "src/extractor/extractBorders", "src/extractor/extractRadii", "src/utilities/groupByName", "src/transformer/styleDictionaryTransformer"], function (require, exports, extractColors_1, extractGrids_1, extractFonts_1, extractEffects_1, extractMotion_1, extractSizes_1, extractSpacing_1, extractBorders_1, extractRadii_1, groupByName_1, styleDictionaryTransformer_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        extractColors_1 = __importDefault(extractColors_1);
        extractGrids_1 = __importDefault(extractGrids_1);
        extractFonts_1 = __importDefault(extractFonts_1);
        extractEffects_1 = __importDefault(extractEffects_1);
        extractMotion_1 = __importDefault(extractMotion_1);
        extractSizes_1 = __importDefault(extractSizes_1);
        extractSpacing_1 = __importDefault(extractSpacing_1);
        extractBorders_1 = __importDefault(extractBorders_1);
        extractRadii_1 = __importDefault(extractRadii_1);
        groupByName_1 = __importDefault(groupByName_1);
        styleDictionaryTransformer_1 = __importDefault(styleDictionaryTransformer_1);
        const transformer = {
            styleDictionary: styleDictionaryTransformer_1.default
        };
        const exportRawTokenArray = (figmaData) => {
            // get tokens
            return [
                ...extractSizes_1.default(figmaData.tokenFrames),
                ...extractSpacing_1.default(figmaData.tokenFrames),
                ...extractBorders_1.default(figmaData.tokenFrames),
                ...extractRadii_1.default(figmaData.tokenFrames),
                ...extractMotion_1.default(figmaData.tokenFrames),
                ...extractColors_1.default(figmaData.paintStyles),
                ...extractGrids_1.default(figmaData.gridStyles),
                ...extractFonts_1.default(figmaData.textStyles),
                ...extractEffects_1.default(figmaData.effectStyles)
            ];
        };
        const getTokenJson = (figmaData, format = 'styleDictionary') => {
            // get token array
            const tokenArray = exportRawTokenArray(figmaData);
            // format tokens
            const formattedTokens = tokenArray.map((token) => transformer[format](token));
            // group tokens
            const groupedTokens = groupByName_1.default(formattedTokens);
            // return group tokens
            return groupedTokens;
        };
        exports.default = getTokenJson;
    });
    define("src/utilities/filterByNameProperty", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const filterByPropertyName = (prefix = '_', exclude = true) => {
            return (object) => (object.name.trim().substr(0, prefix.length) !== prefix) === exclude;
        };
        exports.default = filterByPropertyName;
    });
    define("src/utilities/getPaintStyles", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        /**
         * @function getPaintStyles
         * @param {Array} paintStyles – the paintStyles from the figma file (somehow still connected)
         */
        const getPaintStyles = (styles) => {
            // init styleArray
            const styleArray = [];
            // loop through Figma styles and add to array
            styles.forEach(style => {
                styleArray.push({
                    name: style.name,
                    description: style.description,
                    paints: style.paints
                });
            });
            // return array
            return styleArray;
        };
        exports.default = getPaintStyles;
    });
    define("src/utilities/getGridStyles", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        /**
         * @function getGridStyles
         * @param {Array} gridStyles – the gridStyles from the figma file
         */
        const getGridStyles = (styles) => {
            // init styleArray
            const styleArray = [];
            // loop through Figma styles and add to array
            styles.forEach(style => {
                styleArray.push({
                    name: style.name,
                    description: style.description,
                    layoutGrids: style.layoutGrids
                });
            });
            // return array
            return styleArray;
        };
        exports.default = getGridStyles;
    });
    define("src/utilities/getTokenFrames", ["require", "exports", "src/utilities/convertColor"], function (require, exports, convertColor_4) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.__testing = void 0;
        // the node types that can be used for tokens
        const tokenNodeTypes = [
            'COMPONENT',
            'RECTANGLE',
            'FRAME'
        ];
        // the name that token frames have
        const tokenFrameName = '_tokens';
        // check if a frame is a _token frame
        const isTokenFrame = (node) => node.type === 'FRAME' && node.name.trim().toLowerCase().substr(0, tokenFrameName.length) === tokenFrameName;
        // return only nodes that are frames
        const getFrameNodes = (nodes) => nodes.map(page => page.findChildren(node => isTokenFrame(node))).reduce((flatten, arr) => [...flatten, ...arr]);
        /**
         * Return an array of solid stroke colors
         */
        const getSolidStrokes = (paints) => {
            // clone without reference
            return [...paints]
                .map(paint => convertColor_4.convertPaintToRgba(paint));
        };
        /**
         * check if a node is a valid token node type
         * Currently: 'COMPONENT' or 'RECTANGLE'
         * @param SceneNode node
         */
        const isTokenNode = (node) => {
            return tokenNodeTypes.includes(node.type);
        };
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
                .findChildren(
            /* istanbul ignore next */
            node => isTokenNode(node)))
                // merges all children into one array
                .reduce((flatten, arr) => [...flatten, ...arr], [])
                // export
                .map(node => {
                return {
                    name: node.name,
                    // @ts-ignore
                    description: node.description || undefined,
                    bottomLeftRadius: node.bottomLeftRadius,
                    bottomRightRadius: node.bottomRightRadius,
                    topLeftRadius: node.topLeftRadius,
                    topRightRadius: node.topRightRadius,
                    cornerRadius: node.cornerRadius || undefined,
                    cornerSmoothing: node.cornerSmoothing,
                    strokes: getSolidStrokes(node.strokes),
                    strokeWeight: node.strokeWeight,
                    strokeStyleId: node.strokeStyleId,
                    strokeMiterLimit: node.strokeMiterLimit,
                    strokeJoin: node.strokeJoin,
                    strokeCap: node.strokeCap,
                    dashPattern: node.dashPattern,
                    strokeAlign: node.strokeAlign,
                    width: node.width,
                    height: node.height,
                    reactions: node.reactions || undefined,
                    // @ts-ignore
                    paddingTop: node.paddingTop || 0,
                    // @ts-ignore
                    paddingRight: node.paddingRight || 0,
                    // @ts-ignore
                    paddingBottom: node.paddingBottom || 0,
                    // @ts-ignore
                    paddingLeft: node.paddingLeft || 0
                };
            });
        };
        exports.default = getTokenFrames;
        exports.__testing = {
            isTokenNode: isTokenNode,
            isTokenFrame: isTokenFrame
        };
    });
    define("src/utilities/getTextStyles", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        /**
         * @function getTextStyles
         * @param {Array<TextStyle>} styles – the paintStyles from the figma file (somehow still connected)
         */
        const getTextStyles = (styles) => {
            // init styleArray
            const styleArray = [];
            // loop through Figma styles and add to array
            styles.forEach(style => {
                styleArray.push({
                    name: style.name,
                    description: style.description,
                    fontSize: style.fontSize,
                    textDecoration: style.textDecoration,
                    fontName: style.fontName,
                    letterSpacing: style.letterSpacing,
                    lineHeight: style.lineHeight,
                    paragraphIndent: style.paragraphIndent,
                    paragraphSpacing: style.paragraphSpacing,
                    textCase: style.textCase
                });
            });
            // return array
            return styleArray;
        };
        exports.default = getTextStyles;
    });
    define("src/utilities/getEffectStyles", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        /**
         * @function getEffectStyles
         * @param {Array<EffectStyle>} styles – the effectStyle from the figma file
         */
        const getEffectStyles = (styles) => {
            // init styleArray
            const styleArray = [];
            // loop through Figma styles and add to array
            styles.forEach(style => {
                styleArray.push({
                    name: style.name,
                    description: style.description,
                    effects: style.effects
                });
            });
            // return array
            return styleArray;
        };
        exports.default = getEffectStyles;
    });
    define("src/utilities/buildFigmaData", ["require", "exports", "src/utilities/filterByNameProperty", "src/utilities/getPaintStyles", "src/utilities/getGridStyles", "src/utilities/getTokenFrames", "src/utilities/getTextStyles", "src/utilities/getEffectStyles"], function (require, exports, filterByNameProperty_1, getPaintStyles_1, getGridStyles_1, getTokenFrames_1, getTextStyles_1, getEffectStyles_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        filterByNameProperty_1 = __importDefault(filterByNameProperty_1);
        getPaintStyles_1 = __importDefault(getPaintStyles_1);
        getGridStyles_1 = __importDefault(getGridStyles_1);
        getTokenFrames_1 = __importDefault(getTokenFrames_1);
        getTextStyles_1 = __importDefault(getTextStyles_1);
        getEffectStyles_1 = __importDefault(getEffectStyles_1);
        /**
         * @function buildFigmaData – return an object with all styles & frame to use for export
         * @param {PluginAPI} figma — the figma PluginAPI object
         * @param options – options object
         */
        const buildFigmaData = (figma, options = {
            prefix: '_',
            excludePrefix: true
        }) => {
            // use spread operator because the original is readOnly
            const tokenFrames = getTokenFrames_1.default([...figma.root.children]);
            // get data from figma
            return {
                tokenFrames: tokenFrames,
                paintStyles: getPaintStyles_1.default(figma.getLocalPaintStyles()).filter(filterByNameProperty_1.default(options.prefix, options.excludePrefix)),
                gridStyles: getGridStyles_1.default(figma.getLocalGridStyles()).filter(filterByNameProperty_1.default(options.prefix, options.excludePrefix)),
                textStyles: getTextStyles_1.default(figma.getLocalTextStyles()).filter(filterByNameProperty_1.default(options.prefix, options.excludePrefix)),
                effectStyles: getEffectStyles_1.default(figma.getLocalEffectStyles()).filter(filterByNameProperty_1.default(options.prefix, options.excludePrefix))
            };
        };
        exports.default = buildFigmaData;
    });
    define("src/utilities/settingsDefault", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        /* istanbul ignore file */
        // settings structure & default values
        exports.default = {
            filename: {
                default: 'design-tokens',
                empty: false
            },
            excludePrefix: {
                default: true,
                empty: false
            },
            prefix: {
                default: '_',
                empty: false
            },
            serverUrl: {
                default: '',
                empty: true
            },
            eventType: {
                default: 'update-tokens',
                empty: false
            },
            acceptHeader: {
                default: 'application/vnd.github.everest-preview+json',
                empty: true
            },
            authType: {
                default: 'token',
                empty: false
            }
        };
    });
    define("src/utilities/settings", ["require", "exports", "src/utilities/settingsDefault"], function (require, exports, settingsDefault_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.__testing = exports.setSettings = exports.getSettings = exports.settingsKey = void 0;
        settingsDefault_1 = __importDefault(settingsDefault_1);
        const settingsKey = 'settings';
        exports.settingsKey = settingsKey;
        /**
         * Function sanitizes and prepares settings to be stored
         * @param newSettings
         * @param currentSettings
         */
        const settingsPrepare = (newSettings, currentSettings) => {
            // initialize object
            const mergedSettings = {};
            // add public settings
            for (const [key, value] of Object.entries(settingsDefault_1.default)) {
                // avoid empty values
                if (typeof value.default === 'string' && value.empty === false) {
                    if (newSettings[key].trim() === '') {
                        newSettings[key] = currentSettings[key] || value.default;
                    }
                }
                // if valid new settings
                if (typeof newSettings[key] === typeof value.default) {
                    mergedSettings[key] = newSettings[key];
                }
                // if valid current settings
                else if (typeof currentSettings[key] === typeof value.default) {
                    mergedSettings[key] = currentSettings[key];
                }
                else {
                    // if both new and old value don't fit, use default
                    mergedSettings[key] = value.default;
                }
            }
            // return merged settings object
            return mergedSettings;
        };
        /**
         * get the current users settings
         * for settings that are not set, the defaults will be used
         * @return object
         */
        const getSettings = () => {
            let userSettings = figma.root.getPluginData(settingsKey);
            if (userSettings.length > 0) {
                userSettings = JSON.parse(userSettings);
            }
            else {
                userSettings = undefined;
            }
            // init settings object
            const settings = {};
            // fill with user settings or defaults
            Object.entries(settingsDefault_1.default).forEach(([key, value]) => {
                if (userSettings !== undefined && userSettings[key] !== undefined) {
                    return settings[key] = userSettings[key];
                }
                return settings[key] = value.default;
            });
            return settings;
        };
        exports.getSettings = getSettings;
        /**
         * @name saveSettings
         * @description save the user settings to the "cache"
         * @param {UserSettings} settings
         */
        const setSettings = (settings) => {
            settings = settingsPrepare(settings, getSettings());
            // store public settings that should be shared across org
            figma.root.setPluginData(settingsKey, JSON.stringify(settings, null, 2));
        };
        exports.setSettings = setSettings;
        exports.__testing = {
            settingsPrepare: settingsPrepare
        };
    });
    define("src/utilities/accessToken", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.setAccessToken = exports.getAccessToken = void 0;
        /**
         * @name getAccessToken
         * @description returns the access token for the current file or undefined
         * @param fileId {string} — ID of the current file
         */
        const getAccessToken = (fileId) => __awaiter(void 0, void 0, void 0, function* () {
            // get all access tokens
            const accessTokens = yield figma.clientStorage.getAsync('accessTokens');
            // if access tokens object is present
            if (accessTokens !== undefined && accessTokens instanceof Object) {
                // retrieve the access token from the cache
                const accessToken = accessTokens[fileId];
                // return the access token or an empty string
                return accessToken || '';
            }
            // return empty string if no token is stored
            return '';
        });
        exports.getAccessToken = getAccessToken;
        /**
         * @name setAccessToken
         * @description store the access token for the current fiven file in the user clientStorage
         * @param fileId {string} — ID of the current file
         * @param fileId {string} — access token
         */
        /* istanbul ignore next */
        const setAccessToken = (fileId, accessToken) => __awaiter(void 0, void 0, void 0, function* () {
            // get the access token object
            const accessTokens = (yield figma.clientStorage.getAsync('accessTokens')) || {};
            // merge tokens
            const mergedTokens = Object.assign(Object.assign({}, accessTokens), { [fileId]: accessToken });
            // merge the new token into the object
            return yield figma.clientStorage.setAsync('accessTokens', mergedTokens);
        });
        exports.setAccessToken = setAccessToken;
    });
    define("src/utilities/version", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        /* istanbul ignore file */
        const version = '1.4.0';
        exports.default = version;
    });
    define("src/utilities/semVerDifference", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = (currentSemVer, prevSemVers = '1.0.0') => {
            const [pMajor, pMinor, pPatch] = prevSemVers.split('.');
            const [cMajor, cMinor, cPatch] = currentSemVer.split('.');
            if (pMajor < cMajor) {
                return 'major';
            }
            if (pMinor < cMinor) {
                return 'minor';
            }
            if (pPatch < cPatch) {
                return 'patch';
            }
        };
    });
    define("src/index", ["require", "exports", "src/utilities/getTokenJson", "src/utilities/buildFigmaData", "src/utilities/settings", "src/utilities/accessToken", "src/utilities/version", "src/utilities/semVerDifference"], function (require, exports, getTokenJson_1, buildFigmaData_1, settings_1, accessToken_1, version_1, semVerDifference_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        getTokenJson_1 = __importDefault(getTokenJson_1);
        buildFigmaData_1 = __importDefault(buildFigmaData_1);
        version_1 = __importDefault(version_1);
        semVerDifference_1 = __importDefault(semVerDifference_1);
        // set plugin id if it does not exist
        if (figma.root.getPluginData('fileId') === '') {
            figma.root.setPluginData('fileId', figma.root.name + ' ' + Math.floor(Math.random() * 1000000000));
        }
        const fileId = figma.root.getPluginData('fileId');
        // Get the user settings
        const userSettings = settings_1.getSettings();
        /**
         * @name activateUtilitiesUi
         * @description activates the utilities ui to run utility functions
         */
        const activateUtilitiesUi = () => {
            // register the utilities UI (hidden by default)
            figma.showUI(__uiFiles__.utilities, { visible: false });
        };
        /**
         * @name getJson
         * @param {PluginAPI} figma
         * @param {boolean} stringify
         */
        const getJson = (figma, stringify = true) => {
            // construct figma data object
            const figmaData = buildFigmaData_1.default(figma, {
                prefix: userSettings.prefix,
                excludePrefix: userSettings.excludePrefix
            });
            if (stringify === false) {
                return getTokenJson_1.default(figmaData);
            }
            // get tokens as stringified json
            return JSON.stringify(getTokenJson_1.default(figmaData), null, 2);
        };
        // ---------------------------------
        // EXPORT TO FILE
        // exports the design tokens to a file
        if (figma.command === 'export') {
            // activete utilities UI
            activateUtilitiesUi();
            // write tokens to json file
            figma.ui.postMessage({
                command: 'export',
                data: {
                    filename: `${userSettings.filename}.json`,
                    data: getJson(figma)
                }
            });
        }
        // SEND TO URL
        // send tokens to url
        if (figma.command === 'urlExport') {
            // activete utilities UI
            activateUtilitiesUi();
            // needed for getAccessToken async
            const urlExport = () => __awaiter(void 0, void 0, void 0, function* () {
                figma.ui.postMessage({
                    command: 'urlExport',
                    data: {
                        url: userSettings.serverUrl,
                        accessToken: yield accessToken_1.getAccessToken(fileId),
                        authType: userSettings.authType,
                        data: {
                            event_type: userSettings.eventType,
                            client_payload: {
                                tokenFileName: `${userSettings.filename}.json`,
                                tokens: `${getJson(figma, true)}`,
                                filename: figma.root.name
                            }
                        }
                    }
                });
            });
            // run export url function
            urlExport();
        }
        // ---------------------------------
        // SETTINGS
        // settings for the design tokens
        if (figma.command === 'settings') {
            const lastVersionSettingsOpenedKey = 'lastVersionSettingsOpened';
            // height for the settings dialog
            let settingsDialogHeight = 530;
            // wrap in function because of async client Storage
            const openUi = () => __awaiter(void 0, void 0, void 0, function* () {
                // get version & version difference
                const lastVersionSettingsOpened = yield figma.clientStorage.getAsync(lastVersionSettingsOpenedKey);
                const versionDifference = semVerDifference_1.default(version_1.default, lastVersionSettingsOpened);
                // update version
                if (!lastVersionSettingsOpened || lastVersionSettingsOpened !== version_1.default) {
                    yield figma.clientStorage.setAsync(lastVersionSettingsOpenedKey, version_1.default);
                }
                // if minor or major update
                if (versionDifference === 'major' || versionDifference === 'minor') {
                    settingsDialogHeight += 60;
                }
                // register the settings UI
                // by default it is hidden
                // @ts-ignore
                figma.showUI(__uiFiles__.settings, {
                    visible: false,
                    width: 550,
                    height: settingsDialogHeight
                });
                // sent settings to UI
                figma.ui.postMessage({
                    command: 'getSettings',
                    settings: userSettings,
                    accessToken: yield accessToken_1.getAccessToken(fileId),
                    versionDifference: versionDifference
                });
                // @ts-ignore
                figma.ui.show(__uiFiles__.settings);
            });
            // run function
            openUi();
        }
        // HELP
        // Open github help page
        if (figma.command === 'help') {
            activateUtilitiesUi();
            figma.ui.postMessage({
                command: 'help'
            });
        }
        // CLOSE PLUGIN
        figma.ui.onmessage = (message) => __awaiter(void 0, void 0, void 0, function* () {
            if (message.command === 'closePlugin') {
                // show notification if send
                if (message.notification !== undefined && message.notification !== '') {
                    figma.notify(message.notification);
                }
                // close plugin
                // console.log('Figma Plugin does not close')
                figma.closePlugin();
            }
            // save settings
            if (message.command === 'saveSettings') {
                // store settings
                settings_1.setSettings(message.settings);
                // accessToken
                yield accessToken_1.setAccessToken(fileId, message.accessToken);
                // close plugin
                figma.closePlugin();
            }
        });
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