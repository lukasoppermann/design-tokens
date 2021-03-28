/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/extractor/extractBorders.ts":
/*!*****************************************!*\
  !*** ./src/extractor/extractBorders.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/roundWithDecimals */ "./src/utilities/roundWithDecimals.ts");

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
                value: Object(_utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__["default"])(node.strokeMiterLimit),
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
/* harmony default export */ __webpack_exports__["default"] = (extractBorders);


/***/ }),

/***/ "./src/extractor/extractColors.ts":
/*!****************************************!*\
  !*** ./src/extractor/extractColors.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_convertColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/convertColor */ "./src/utilities/convertColor.ts");
/* harmony import */ var _utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/roundWithDecimals */ "./src/utilities/roundWithDecimals.ts");


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
                value: Object(_utilities_convertColor__WEBPACK_IMPORTED_MODULE_0__["convertPaintToRgba"])(paint),
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
                    value: Object(_utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__["default"])(stop.position),
                    type: 'number'
                },
                color: {
                    value: Object(_utilities_convertColor__WEBPACK_IMPORTED_MODULE_0__["roundRgba"])(stop.color),
                    type: 'color'
                }
            })),
            opacity: {
                value: Object(_utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__["default"])(paint.opacity),
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
/* harmony default export */ __webpack_exports__["default"] = (extractColors);


/***/ }),

/***/ "./src/extractor/extractEffects.ts":
/*!*****************************************!*\
  !*** ./src/extractor/extractEffects.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_convertColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/convertColor */ "./src/utilities/convertColor.ts");

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
        value: Object(_utilities_convertColor__WEBPACK_IMPORTED_MODULE_0__["roundRgba"])(effect.color),
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
/* harmony default export */ __webpack_exports__["default"] = (extractEffects);


/***/ }),

/***/ "./src/extractor/extractFonts.ts":
/*!***************************************!*\
  !*** ./src/extractor/extractFonts.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/roundWithDecimals */ "./src/utilities/roundWithDecimals.ts");

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
const fontWeights = {
    thin: 100,
    extralight: 200,
    ultralight: 200,
    light: 300,
    normal: 400,
    regular: 400,
    medium: 500,
    semibold: 600,
    demibold: 600,
    bold: 700,
    extrabold: 800,
    ultabold: 800,
    black: 900,
    heavy: 900,
    super: 900
};
const fontStretch = {
    normal: 'normal',
    condensed: 'condensed',
    expanded: 'expanded',
    extended: 'expanded'
};
const fontStyles = {
    normal: 'normal',
    italic: 'italic',
    oblique: 'oblique'
};
const parseFontWeight = (fontStyle) => {
    const parts = fontStyle.toLowerCase().split(' ');
    let weight = parts[0];
    // merge if space after extra
    if (['extra', 'ultra', 'semi', 'demi'].includes(parts[0]) && ['bold', 'light'].includes(parts[1])) {
        weight = `${parts[0]}${parts[1]}`;
    }
    return fontWeights[weight] || 400;
};
const parseFontStretch = (fontStyle) => {
    const parts = fontStyle.toLowerCase().split(' ');
    return fontStretch[parts[parts.length - 1]] || fontStretch[parts[parts.length - 2]] || 'normal';
};
const parseFontStyle = (fontStyle) => {
    const part = fontStyle.toLowerCase().split(' ').pop();
    return fontStyles[part] || 'normal';
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
            fontWeight: {
                value: parseFontWeight(node.fontName.style),
                type: 'number'
            },
            fontStyle: {
                value: parseFontStyle(node.fontName.style),
                type: 'string'
            },
            fontStretch: {
                value: parseFontStretch(node.fontName.style),
                type: 'string'
            },
            _fontStyleOld: {
                value: node.fontName.style,
                type: 'string'
            },
            letterSpacing: {
                value: Object(_utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__["default"])(node.letterSpacing.value),
                unit: node.letterSpacing.unit.toLowerCase(),
                type: 'number'
            },
            lineHeight: {
                // @ts-ignore
                value: Object(_utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__["default"])(node.lineHeight.value) || 'normal',
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
/* harmony default export */ __webpack_exports__["default"] = (extractFonts);


/***/ }),

/***/ "./src/extractor/extractGrids.ts":
/*!***************************************!*\
  !*** ./src/extractor/extractGrids.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = (extractGrids);


/***/ }),

/***/ "./src/extractor/extractMotion.ts":
/*!****************************************!*\
  !*** ./src/extractor/extractMotion.ts ***!
  \****************************************/
/*! exports provided: default, __testing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__testing", function() { return __testing; });
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
/* harmony default export */ __webpack_exports__["default"] = (extractMotion);
const __testing = {
    easing: easing
};


/***/ }),

/***/ "./src/extractor/extractRadii.ts":
/*!***************************************!*\
  !*** ./src/extractor/extractRadii.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/roundWithDecimals */ "./src/utilities/roundWithDecimals.ts");

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
                value: Object(_utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__["default"])(node.cornerSmoothing, 2),
                comment: 'Percent as decimal from 0.0 - 1.0',
                type: 'number'
            } })
    }));
};
/* harmony default export */ __webpack_exports__["default"] = (extractRadii);


/***/ }),

/***/ "./src/extractor/extractSizes.ts":
/*!***************************************!*\
  !*** ./src/extractor/extractSizes.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/roundWithDecimals */ "./src/utilities/roundWithDecimals.ts");

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
                value: Object(_utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__["default"])(node.width, 2),
                unit: 'pixel',
                type: 'number'
            },
            height: {
                value: Object(_utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__["default"])(node.height, 2),
                unit: 'pixel',
                type: 'number'
            }
        }
    }));
};
/* harmony default export */ __webpack_exports__["default"] = (extractSizes);


/***/ }),

/***/ "./src/extractor/extractSpacing.ts":
/*!*****************************************!*\
  !*** ./src/extractor/extractSpacing.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/roundWithDecimals */ "./src/utilities/roundWithDecimals.ts");

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
                value: Object(_utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__["default"])(node.paddingTop, 2),
                unit: 'pixel',
                type: 'number'
            },
            right: {
                value: Object(_utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__["default"])(node.paddingRight, 2),
                unit: 'pixel',
                type: 'number'
            },
            bottom: {
                value: Object(_utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__["default"])(node.paddingBottom, 2),
                unit: 'pixel',
                type: 'number'
            },
            left: {
                value: Object(_utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__["default"])(node.paddingLeft, 2),
                unit: 'pixel',
                type: 'number'
            }
        }
    }));
};
/* harmony default export */ __webpack_exports__["default"] = (extractSpacing);


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities/settings */ "./src/utilities/settings.ts");
/* harmony import */ var _utilities_accessToken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities/accessToken */ "./src/utilities/accessToken.ts");
/* harmony import */ var _utilities_getJson__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities/getJson */ "./src/utilities/getJson.ts");
/* harmony import */ var _utilities_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utilities/config */ "./src/utilities/config.ts");
/* harmony import */ var _utilities_getVersionDifference__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utilities/getVersionDifference */ "./src/utilities/getVersionDifference.ts");
/* harmony import */ var _utilities_getFileId__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utilities/getFileId */ "./src/utilities/getFileId.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};






// initiate UI
figma.showUI(__html__, {
    visible: false,
    width: _utilities_config__WEBPACK_IMPORTED_MODULE_3__["default"].settingsDialog.width,
    height: _utilities_config__WEBPACK_IMPORTED_MODULE_3__["default"].settingsDialog.height
});
// Get the user settings
const userSettings = Object(_utilities_settings__WEBPACK_IMPORTED_MODULE_0__["getSettings"])();
// ---------------------------------
// EXPORT TO FILE
// exports the design tokens to a file
if (figma.command === 'export') {
    // show UI
    figma.ui.show();
    // write tokens to json file
    figma.ui.postMessage({
        command: 'export',
        data: {
            filename: `${userSettings.filename}.json`,
            data: Object(_utilities_getJson__WEBPACK_IMPORTED_MODULE_2__["default"])(figma, userSettings)
        }
    });
}
// SEND TO URL
// send tokens to url
if (figma.command === 'urlExport') {
    // needed for getAccessToken async
    const urlExport = () => __awaiter(void 0, void 0, void 0, function* () {
        figma.ui.postMessage({
            command: 'urlExport',
            data: {
                url: userSettings.serverUrl,
                accessToken: yield Object(_utilities_accessToken__WEBPACK_IMPORTED_MODULE_1__["getAccessToken"])(Object(_utilities_getFileId__WEBPACK_IMPORTED_MODULE_5__["default"])(figma)),
                acceptHeader: userSettings.acceptHeader,
                authType: userSettings.authType,
                data: {
                    event_type: userSettings.eventType,
                    client_payload: {
                        tokenFileName: `${userSettings.filename}.json`,
                        tokens: `${Object(_utilities_getJson__WEBPACK_IMPORTED_MODULE_2__["default"])(figma, userSettings, true)}`,
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
    // wrap in function because of async client Storage
    const openUi = () => __awaiter(void 0, void 0, void 0, function* () {
        // get the current version differences to the last time the plugin was opened
        const versionDifference = yield Object(_utilities_getVersionDifference__WEBPACK_IMPORTED_MODULE_4__["default"])(figma);
        // resize UI if needed
        if (versionDifference !== undefined && versionDifference !== 'patch') {
            figma.ui.resize(_utilities_config__WEBPACK_IMPORTED_MODULE_3__["default"].settingsDialog.width, _utilities_config__WEBPACK_IMPORTED_MODULE_3__["default"].settingsDialog.height + 60);
        }
        // register the settings UI
        figma.ui.show();
        // sent settings to UI
        figma.ui.postMessage({
            command: 'getSettings',
            settings: userSettings,
            accessToken: yield Object(_utilities_accessToken__WEBPACK_IMPORTED_MODULE_1__["getAccessToken"])(Object(_utilities_getFileId__WEBPACK_IMPORTED_MODULE_5__["default"])(figma)),
            versionDifference: versionDifference
        });
        // @ts-ignore
        figma.ui.show();
    });
    // run function
    openUi();
}
/**
 * Open Help
 * Open github help page
 */
if (figma.command === 'help') {
    figma.ui.postMessage({
        command: 'help'
    });
}
/**
 * React to messages
 */
figma.ui.onmessage = (message) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * on closePlugin
     * close plugin and show notification if available
     */
    if (message.command === 'closePlugin') {
        // show notification if send
        if (message.notification !== undefined && message.notification !== '') {
            figma.notify(message.notification);
        }
        // close plugin
        figma.ui.hide();
        figma.closePlugin();
    }
    /**
     * on saveSettings
     * save settings, access token and close plugin
     */
    if (message.command === 'saveSettings') {
        // store settings
        Object(_utilities_settings__WEBPACK_IMPORTED_MODULE_0__["setSettings"])(message.settings);
        // accessToken
        yield Object(_utilities_accessToken__WEBPACK_IMPORTED_MODULE_1__["setAccessToken"])(Object(_utilities_getFileId__WEBPACK_IMPORTED_MODULE_5__["default"])(figma), message.accessToken);
        // close plugin
        figma.closePlugin();
    }
});


/***/ }),

/***/ "./src/transformer/styleDictionaryTransformer.ts":
/*!*******************************************************!*\
  !*** ./src/transformer/styleDictionaryTransformer.ts ***!
  \*******************************************************/
/*! exports provided: default, __testing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__testing", function() { return __testing; });
/* harmony import */ var _utilities_convertColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/convertColor */ "./src/utilities/convertColor.ts");
/* harmony import */ var _utilities_getDescription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities/getDescription */ "./src/transformer/utilities/getDescription.ts");


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
        return Object(_utilities_convertColor__WEBPACK_IMPORTED_MODULE_0__["convertRgbaObjectToString"])(value);
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
    return Object.assign(Object.assign({ name: propertyGroup.name, category: propertyGroup.category }, Object(_utilities_getDescription__WEBPACK_IMPORTED_MODULE_1__["default"])(propertyGroup.description)), transformedProperties);
};
/* harmony default export */ __webpack_exports__["default"] = (styleDictionaryTransformer);
const __testing = {
    styleDictionaryConvertValue: styleDictionaryConvertValue,
    sizeTransformer: sizeTransformer
};


/***/ }),

/***/ "./src/transformer/utilities/getDescription.ts":
/*!*****************************************************!*\
  !*** ./src/transformer/utilities/getDescription.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const getDescription = (description, descriptionKey = 'comment') => {
    // if valid description
    if (description && typeof description === 'string' && description.length > 0) {
        return { comment: description };
    }
    // if invalid description return an empty object
    return {};
};
/* harmony default export */ __webpack_exports__["default"] = (getDescription);


/***/ }),

/***/ "./src/utilities/accessToken.ts":
/*!**************************************!*\
  !*** ./src/utilities/accessToken.ts ***!
  \**************************************/
/*! exports provided: getAccessToken, setAccessToken */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAccessToken", function() { return getAccessToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAccessToken", function() { return setAccessToken; });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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



/***/ }),

/***/ "./src/utilities/buildFigmaData.ts":
/*!*****************************************!*\
  !*** ./src/utilities/buildFigmaData.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _filterByNameProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filterByNameProperty */ "./src/utilities/filterByNameProperty.ts");
/* harmony import */ var _getPaintStyles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getPaintStyles */ "./src/utilities/getPaintStyles.ts");
/* harmony import */ var _getGridStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getGridStyles */ "./src/utilities/getGridStyles.ts");
/* harmony import */ var _getTokenFrames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getTokenFrames */ "./src/utilities/getTokenFrames.ts");
/* harmony import */ var _getTextStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getTextStyles */ "./src/utilities/getTextStyles.ts");
/* harmony import */ var _getEffectStyles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getEffectStyles */ "./src/utilities/getEffectStyles.ts");






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
    const tokenFrames = Object(_getTokenFrames__WEBPACK_IMPORTED_MODULE_3__["default"])([...figma.root.children]);
    // get data from figma
    return {
        tokenFrames: tokenFrames,
        paintStyles: Object(_getPaintStyles__WEBPACK_IMPORTED_MODULE_1__["default"])(figma.getLocalPaintStyles()).filter(Object(_filterByNameProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(options.prefix, options.excludePrefix)),
        gridStyles: Object(_getGridStyles__WEBPACK_IMPORTED_MODULE_2__["default"])(figma.getLocalGridStyles()).filter(Object(_filterByNameProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(options.prefix, options.excludePrefix)),
        textStyles: Object(_getTextStyles__WEBPACK_IMPORTED_MODULE_4__["default"])(figma.getLocalTextStyles()).filter(Object(_filterByNameProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(options.prefix, options.excludePrefix)),
        effectStyles: Object(_getEffectStyles__WEBPACK_IMPORTED_MODULE_5__["default"])(figma.getLocalEffectStyles()).filter(Object(_filterByNameProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(options.prefix, options.excludePrefix))
    };
};
/* harmony default export */ __webpack_exports__["default"] = (buildFigmaData);


/***/ }),

/***/ "./src/utilities/config.ts":
/*!*********************************!*\
  !*** ./src/utilities/config.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* istanbul ignore file */
/* harmony default export */ __webpack_exports__["default"] = ({
    settingsDialog: {
        width: 550,
        height: 565
    },
    key: {
        lastVersionSettingsOpened: 'lastVersionSettingsOpened',
        fileId: 'fileId'
    }
});


/***/ }),

/***/ "./src/utilities/convertColor.ts":
/*!***************************************!*\
  !*** ./src/utilities/convertColor.ts ***!
  \***************************************/
/*! exports provided: roundRgba, convertPaintToRgba, convertRgbaObjectToString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "roundRgba", function() { return roundRgba; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertPaintToRgba", function() { return convertPaintToRgba; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertRgbaObjectToString", function() { return convertRgbaObjectToString; });
/* harmony import */ var _roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./roundWithDecimals */ "./src/utilities/roundWithDecimals.ts");

const roundRgba = (rgba, opacity) => ({
    r: Object(_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__["default"])(rgba.r * 255, 0),
    g: Object(_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__["default"])(rgba.g * 255, 0),
    b: Object(_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__["default"])(rgba.b * 255, 0),
    a: Object(_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__["default"])(opacity || rgba.a || 1)
});
const convertPaintToRgba = (paint) => {
    if (paint.type === 'SOLID' && paint.visible === true) {
        return roundRgba(paint.color, (paint.opacity || null));
    }
    return null;
};
const convertRgbaObjectToString = (rgbaObject) => `rgba(${rgbaObject.r}, ${rgbaObject.g}, ${rgbaObject.b}, ${rgbaObject.a})`;


/***/ }),

/***/ "./src/utilities/deepMerge.ts":
/*!************************************!*\
  !*** ./src/utilities/deepMerge.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = (deepMerge);


/***/ }),

/***/ "./src/utilities/filterByNameProperty.ts":
/*!***********************************************!*\
  !*** ./src/utilities/filterByNameProperty.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const filterByPropertyName = (prefix = '_', exclude = true) => {
    return (object) => (object.name.trim().substr(0, prefix.length) !== prefix) === exclude;
};
/* harmony default export */ __webpack_exports__["default"] = (filterByPropertyName);


/***/ }),

/***/ "./src/utilities/getEffectStyles.ts":
/*!******************************************!*\
  !*** ./src/utilities/getEffectStyles.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = (getEffectStyles);


/***/ }),

/***/ "./src/utilities/getFileId.ts":
/*!************************************!*\
  !*** ./src/utilities/getFileId.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/utilities/config.ts");

const getFileId = (figma) => {
    let fileId = figma.root.getPluginData(_config__WEBPACK_IMPORTED_MODULE_0__["default"].key.fileId);
    // set plugin id if it does not exist
    if (fileId === undefined || fileId === '') {
        figma.root.setPluginData(_config__WEBPACK_IMPORTED_MODULE_0__["default"].key.fileId, figma.root.name + ' ' + Math.floor(Math.random() * 1000000000));
        // grab file ID
        fileId = figma.root.getPluginData(_config__WEBPACK_IMPORTED_MODULE_0__["default"].key.fileId);
    }
    return fileId;
};
/* harmony default export */ __webpack_exports__["default"] = (getFileId);


/***/ }),

/***/ "./src/utilities/getGridStyles.ts":
/*!****************************************!*\
  !*** ./src/utilities/getGridStyles.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = (getGridStyles);


/***/ }),

/***/ "./src/utilities/getJson.ts":
/*!**********************************!*\
  !*** ./src/utilities/getJson.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _getTokenJson__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getTokenJson */ "./src/utilities/getTokenJson.ts");
/* harmony import */ var _buildFigmaData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buildFigmaData */ "./src/utilities/buildFigmaData.ts");


/**
 * @name getJson
 * @param {PluginAPI} figma
 * @param {boolean} stringify
 */
const getJson = (figma, userSettings, stringify = true) => {
    // construct figma data object
    const figmaData = Object(_buildFigmaData__WEBPACK_IMPORTED_MODULE_1__["default"])(figma, {
        prefix: userSettings.prefix,
        excludePrefix: userSettings.excludePrefix
    });
    if (stringify === false) {
        return Object(_getTokenJson__WEBPACK_IMPORTED_MODULE_0__["default"])(figmaData, 'styleDictionary', userSettings.nameConversion);
    }
    // get tokens as stringified json
    return JSON.stringify(Object(_getTokenJson__WEBPACK_IMPORTED_MODULE_0__["default"])(figmaData, 'styleDictionary', userSettings.nameConversion));
};
/* harmony default export */ __webpack_exports__["default"] = (getJson);


/***/ }),

/***/ "./src/utilities/getPaintStyles.ts":
/*!*****************************************!*\
  !*** ./src/utilities/getPaintStyles.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = (getPaintStyles);


/***/ }),

/***/ "./src/utilities/getTextStyles.ts":
/*!****************************************!*\
  !*** ./src/utilities/getTextStyles.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = (getTextStyles);


/***/ }),

/***/ "./src/utilities/getTokenFrames.ts":
/*!*****************************************!*\
  !*** ./src/utilities/getTokenFrames.ts ***!
  \*****************************************/
/*! exports provided: default, __testing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__testing", function() { return __testing; });
/* harmony import */ var _convertColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./convertColor */ "./src/utilities/convertColor.ts");

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
        .map(paint => Object(_convertColor__WEBPACK_IMPORTED_MODULE_0__["convertPaintToRgba"])(paint));
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
/* harmony default export */ __webpack_exports__["default"] = (getTokenFrames);
const __testing = {
    isTokenNode: isTokenNode,
    isTokenFrame: isTokenFrame
};


/***/ }),

/***/ "./src/utilities/getTokenJson.ts":
/*!***************************************!*\
  !*** ./src/utilities/getTokenJson.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _extractor_extractColors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../extractor/extractColors */ "./src/extractor/extractColors.ts");
/* harmony import */ var _extractor_extractGrids__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../extractor/extractGrids */ "./src/extractor/extractGrids.ts");
/* harmony import */ var _extractor_extractFonts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../extractor/extractFonts */ "./src/extractor/extractFonts.ts");
/* harmony import */ var _extractor_extractEffects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../extractor/extractEffects */ "./src/extractor/extractEffects.ts");
/* harmony import */ var _extractor_extractMotion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../extractor/extractMotion */ "./src/extractor/extractMotion.ts");
/* harmony import */ var _extractor_extractSizes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../extractor/extractSizes */ "./src/extractor/extractSizes.ts");
/* harmony import */ var _extractor_extractSpacing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../extractor/extractSpacing */ "./src/extractor/extractSpacing.ts");
/* harmony import */ var _extractor_extractBorders__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../extractor/extractBorders */ "./src/extractor/extractBorders.ts");
/* harmony import */ var _extractor_extractRadii__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../extractor/extractRadii */ "./src/extractor/extractRadii.ts");
/* harmony import */ var _groupByName__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./groupByName */ "./src/utilities/groupByName.ts");
/* harmony import */ var _transformer_styleDictionaryTransformer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../transformer/styleDictionaryTransformer */ "./src/transformer/styleDictionaryTransformer.ts");











const transformer = {
    styleDictionary: _transformer_styleDictionaryTransformer__WEBPACK_IMPORTED_MODULE_10__["default"]
};
const exportRawTokenArray = (figmaData) => {
    // get tokens
    return [
        ...Object(_extractor_extractSizes__WEBPACK_IMPORTED_MODULE_5__["default"])(figmaData.tokenFrames),
        ...Object(_extractor_extractSpacing__WEBPACK_IMPORTED_MODULE_6__["default"])(figmaData.tokenFrames),
        ...Object(_extractor_extractBorders__WEBPACK_IMPORTED_MODULE_7__["default"])(figmaData.tokenFrames),
        ...Object(_extractor_extractRadii__WEBPACK_IMPORTED_MODULE_8__["default"])(figmaData.tokenFrames),
        ...Object(_extractor_extractMotion__WEBPACK_IMPORTED_MODULE_4__["default"])(figmaData.tokenFrames),
        ...Object(_extractor_extractColors__WEBPACK_IMPORTED_MODULE_0__["default"])(figmaData.paintStyles),
        ...Object(_extractor_extractGrids__WEBPACK_IMPORTED_MODULE_1__["default"])(figmaData.gridStyles),
        ...Object(_extractor_extractFonts__WEBPACK_IMPORTED_MODULE_2__["default"])(figmaData.textStyles),
        ...Object(_extractor_extractEffects__WEBPACK_IMPORTED_MODULE_3__["default"])(figmaData.effectStyles)
    ];
};
const getTokenJson = (figmaData, format = 'styleDictionary', nameConversion = 'default') => {
    // get token array
    const tokenArray = exportRawTokenArray(figmaData);
    // format tokens
    const formattedTokens = tokenArray.map((token) => transformer[format](token));
    // group tokens
    const groupedTokens = Object(_groupByName__WEBPACK_IMPORTED_MODULE_9__["default"])(formattedTokens, true, nameConversion);
    // return group tokens
    return groupedTokens;
};
/* harmony default export */ __webpack_exports__["default"] = (getTokenJson);


/***/ }),

/***/ "./src/utilities/getVersionDifference.ts":
/*!***********************************************!*\
  !*** ./src/utilities/getVersionDifference.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _semVerDifference__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./semVerDifference */ "./src/utilities/semVerDifference.ts");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./version */ "./src/utilities/version.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config */ "./src/utilities/config.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const getVersionDifference = (figma) => __awaiter(void 0, void 0, void 0, function* () {
    // get version & version difference
    const lastVersionSettingsOpened = yield figma.clientStorage.getAsync(_config__WEBPACK_IMPORTED_MODULE_2__["default"].key.lastVersionSettingsOpened);
    const versionDifference = Object(_semVerDifference__WEBPACK_IMPORTED_MODULE_0__["default"])(_version__WEBPACK_IMPORTED_MODULE_1__["default"], lastVersionSettingsOpened);
    // update version
    if (!lastVersionSettingsOpened || lastVersionSettingsOpened !== _version__WEBPACK_IMPORTED_MODULE_1__["default"]) {
        yield figma.clientStorage.setAsync(_config__WEBPACK_IMPORTED_MODULE_2__["default"].key.lastVersionSettingsOpened, _version__WEBPACK_IMPORTED_MODULE_1__["default"]);
    }
    // return version Difference
    return versionDifference;
});
/* harmony default export */ __webpack_exports__["default"] = (getVersionDifference);


/***/ }),

/***/ "./src/utilities/groupByName.ts":
/*!**************************************!*\
  !*** ./src/utilities/groupByName.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _deepMerge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deepMerge */ "./src/utilities/deepMerge.ts");
/* harmony import */ var _utilities_transformName__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/transformName */ "./src/utilities/transformName.ts");


// create a nested object structure from the array (['style','colors','main','red'])
const nestedObjectFromArray = (array, value) => {
    // reducer
    const reducer = (val, key) => ({ [key]: val });
    // return reduced array
    return array.reduceRight(reducer, value);
};
const groupByName = (tokenArray, removeName = true, nameConversion = 'default') => {
    // nest tokens into object with hierachy defined by name using /
    const groupedTokens = tokenArray.map(token => {
        // split token name into array
        // remove leading and following whitespace for every item
        // transform items to lowerCase
        const groupsFromName = token.name.split('/').map(group => Object(_utilities_transformName__WEBPACK_IMPORTED_MODULE_1__["default"])(group, nameConversion));
        // remove name if not otherwise specified
        if (removeName === true) {
            delete token.name;
        }
        // return
        return nestedObjectFromArray(groupsFromName, token);
    });
    if (groupedTokens.length > 0) {
        // return merged object of tokens grouped by name hierachy
        return groupedTokens.reduce((accumulator = {}, currentValue) => Object(_deepMerge__WEBPACK_IMPORTED_MODULE_0__["default"])(accumulator, currentValue));
    }
    return [];
};
/* harmony default export */ __webpack_exports__["default"] = (groupByName);


/***/ }),

/***/ "./src/utilities/roundWithDecimals.ts":
/*!********************************************!*\
  !*** ./src/utilities/roundWithDecimals.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = (roundWithDecimals);


/***/ }),

/***/ "./src/utilities/semVerDifference.ts":
/*!*******************************************!*\
  !*** ./src/utilities/semVerDifference.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((currentSemVer, prevSemVers = '1.0.0') => {
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
});


/***/ }),

/***/ "./src/utilities/settings.ts":
/*!***********************************!*\
  !*** ./src/utilities/settings.ts ***!
  \***********************************/
/*! exports provided: settingsKey, getSettings, setSettings, __testing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "settingsKey", function() { return settingsKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSettings", function() { return getSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSettings", function() { return setSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__testing", function() { return __testing; });
/* harmony import */ var _settingsDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settingsDefault */ "./src/utilities/settingsDefault.ts");

const settingsKey = 'settings';
/**
 * Function sanitizes and prepares settings to be stored
 * @param newSettings
 * @param currentSettings
 */
const settingsPrepare = (newSettings, currentSettings) => {
    // initialize object
    const mergedSettings = {};
    // add public settings
    for (const [key, value] of Object.entries(_settingsDefault__WEBPACK_IMPORTED_MODULE_0__["default"])) {
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
    Object.entries(_settingsDefault__WEBPACK_IMPORTED_MODULE_0__["default"]).forEach(([key, value]) => {
        if (userSettings !== undefined && userSettings[key] !== undefined) {
            return settings[key] = userSettings[key];
        }
        return settings[key] = value.default;
    });
    return settings;
};
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
// exports

const __testing = {
    settingsPrepare: settingsPrepare
};


/***/ }),

/***/ "./src/utilities/settingsDefault.ts":
/*!******************************************!*\
  !*** ./src/utilities/settingsDefault.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* istanbul ignore file */
// settings structure & default values
/* harmony default export */ __webpack_exports__["default"] = ({
    filename: {
        default: 'design-tokens',
        empty: false
    },
    nameConversion: {
        default: 'default',
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
});


/***/ }),

/***/ "./src/utilities/transformName.ts":
/*!****************************************!*\
  !*** ./src/utilities/transformName.ts ***!
  \****************************************/
/*! exports provided: default, __testing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__testing", function() { return __testing; });
const returnOrThrow = (convertedString, originalString, stringCase) => {
    // return converted string if successful
    if (typeof convertedString === 'string' && convertedString !== '') {
        return convertedString;
    }
    // throw error
    throw new Error(`converting "${originalString}" to ${stringCase}, resulting in "${convertedString}"`);
};
const toCamelCase = (string) => {
    const convertedString = string.toLowerCase()
        .replace(/['"]/g, '')
        .replace(/([-_ ]){1,}/g, ' ')
        .replace(/\W+/g, ' ')
        .trim()
        .replace(/ (.)/g, function ($1) { return $1.toUpperCase(); })
        .replace(/ /g, '');
    // return or throw
    return returnOrThrow(convertedString, string, 'camelCase');
};
const toKebabCase = (string) => {
    const convertedString = string.toLowerCase()
        .replace(/['"]/g, '')
        .replace(/([-_ ]){1,}/g, ' ')
        .replace(/\W+/g, ' ')
        .trim()
        .replace(/ /g, '-');
    // return or throw
    return returnOrThrow(convertedString, string, 'kebabCase');
};
const transformName = (name, nameConversion = 'default') => {
    // if camelCase
    if (nameConversion === 'camelCase') {
        return toCamelCase(name);
    }
    // if kebabCase
    if (nameConversion === 'kebabCase') {
        return toKebabCase(name);
    }
    return name.trim().toLowerCase();
};
/* harmony default export */ __webpack_exports__["default"] = (transformName);
const __testing = {
    toCamelCase: toCamelCase,
    toKebabCase: toKebabCase
};


/***/ }),

/***/ "./src/utilities/version.ts":
/*!**********************************!*\
  !*** ./src/utilities/version.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* istanbul ignore file */
const version = '3.0.0';
/* harmony default export */ __webpack_exports__["default"] = (version);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0Qm9yZGVycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RDb2xvcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0RWZmZWN0cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RGb250cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RHcmlkcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RNb3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0UmFkaWkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0U2l6ZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0U3BhY2luZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVyL3N0eWxlRGljdGlvbmFyeVRyYW5zZm9ybWVyLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lci91dGlsaXRpZXMvZ2V0RGVzY3JpcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9hY2Nlc3NUb2tlbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2J1aWxkRmlnbWFEYXRhLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvY29uZmlnLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvY29udmVydENvbG9yLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvZGVlcE1lcmdlLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvZmlsdGVyQnlOYW1lUHJvcGVydHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9nZXRFZmZlY3RTdHlsZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9nZXRGaWxlSWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9nZXRHcmlkU3R5bGVzLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvZ2V0SnNvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2dldFBhaW50U3R5bGVzLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvZ2V0VGV4dFN0eWxlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2dldFRva2VuRnJhbWVzLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvZ2V0VG9rZW5Kc29uLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvZ2V0VmVyc2lvbkRpZmZlcmVuY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9ncm91cEJ5TmFtZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL3JvdW5kV2l0aERlY2ltYWxzLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvc2VtVmVyRGlmZmVyZW5jZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL3NldHRpbmdzLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvc2V0dGluZ3NEZWZhdWx0LnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvdHJhbnNmb3JtTmFtZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL3ZlcnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENB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ZSwyRUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDdkQ1QjtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYSxFQUFFO0FBQ2YsS0FBSztBQUNMO0FBQ2UsNEVBQWEsRUFBQztBQUN0QjtBQUNQO0FBQ0E7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O0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN4RUE7QUFBQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNuQ0Y7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxlQUFlLE9BQU8sV0FBVyxrQkFBa0IsZ0JBQWdCO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLEdBQUc7QUFDN0I7QUFDQTtBQUNBLHlDQUF5Qyx5QkFBeUIsRUFBRTtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixHQUFHO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZSw0RUFBYSxFQUFDO0FBQ3RCO0FBQ1A7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDNUNBO0FBQUE7QUFDQTtBQUNlLHNFQUFPLEVBQUMiLCJmaWxlIjoicGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgcm91bmRXaXRoRGVjaW1hbHMgZnJvbSAnLi4vdXRpbGl0aWVzL3JvdW5kV2l0aERlY2ltYWxzJztcbmNvbnN0IHN0cm9rZUpvaW5zID0ge1xuICAgIE1JVEVSOiAnbWl0ZXInLFxuICAgIEJFVkVMOiAnYmV2ZWwnLFxuICAgIFJPVU5EOiAncm91bmQnXG59O1xuY29uc3Qgc3Ryb2tlQWxpZ25zID0ge1xuICAgIENFTlRFUjogJ2NlbnRlcicsXG4gICAgSU5TSURFOiAnaW5zaWRlJyxcbiAgICBPVVRTSURFOiAnb3V0c2lkZSdcbn07XG5jb25zdCBleHRyYWN0Qm9yZGVycyA9ICh0b2tlbk5vZGVzKSA9PiB7XG4gICAgY29uc3Qgbm9kZU5hbWUgPSAnYm9yZGVycyc7XG4gICAgLy8gcmV0dXJuIGFzIG9iamVjdFxuICAgIHJldHVybiB0b2tlbk5vZGVzXG4gICAgICAgIC8vIG9ubHkgZ2V0IGJvcmRlciBub2Rlc1xuICAgICAgICAuZmlsdGVyKG5vZGUgPT4gbm9kZS5uYW1lLnN1YnN0cigwLCBub2RlTmFtZS5sZW5ndGgpID09PSBub2RlTmFtZSlcbiAgICAgICAgLy8gcmVtb3ZlIG5vZGVzIHdpdGggbm8gYm9yZGVyIHByb3BlcnR5XG4gICAgICAgIC5maWx0ZXIobm9kZSA9PiBub2RlLnN0cm9rZXMubGVuZ3RoID4gMClcbiAgICAgICAgLy8gY29udmVydCBib3JkZXJzXG4gICAgICAgIC5tYXAobm9kZSA9PiAoe1xuICAgICAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgICAgIGNhdGVnb3J5OiAnYm9yZGVyJyxcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHN0cm9rZUFsaWduOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHN0cm9rZUFsaWduc1tub2RlLnN0cm9rZUFsaWduXSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhc2hQYXR0ZXJuOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG5vZGUuZGFzaFBhdHRlcm4udG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0cm9rZUNhcDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiAoKHR5cGVvZiBub2RlLnN0cm9rZUNhcCA9PT0gJ3N0cmluZycpID8gbm9kZS5zdHJva2VDYXAudG9Mb3dlckNhc2UoKSA6ICdtaXhlZCcpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3Ryb2tlSm9pbjoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBzdHJva2VKb2luc1tub2RlLnN0cm9rZUpvaW5dLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3Ryb2tlTWl0ZXJMaW1pdDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLnN0cm9rZU1pdGVyTGltaXQpLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdkZWdyZWUnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gc3Ryb2tlU3R5bGVJZDoge1xuICAgICAgICAgICAgLy8gICB2YWx1ZTogbm9kZS5zdHJva2VTdHlsZUlkXG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgc3Ryb2tlV2VpZ2h0OiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG5vZGUuc3Ryb2tlV2VpZ2h0LFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdHJva2U6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbm9kZS5zdHJva2VzWzBdLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdjb2xvcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0Qm9yZGVycztcbiIsImltcG9ydCB7IGNvbnZlcnRQYWludFRvUmdiYSwgcm91bmRSZ2JhIH0gZnJvbSAnLi4vdXRpbGl0aWVzL2NvbnZlcnRDb2xvcic7XG5pbXBvcnQgcm91bmRXaXRoRGVjaW1hbHMgZnJvbSAnLi4vdXRpbGl0aWVzL3JvdW5kV2l0aERlY2ltYWxzJztcbmNvbnN0IGdyYWRpZW50VHlwZSA9IHtcbiAgICBHUkFESUVOVF9MSU5FQVI6ICdsaW5lYXInLFxuICAgIEdSQURJRU5UX1JBRElBTDogJ3JhZGlhbCcsXG4gICAgR1JBRElFTlRfQU5HVUxBUjogJ2FuZ3VsYXInLFxuICAgIEdSQURJRU5UX0RJQU1PTkQ6ICdkaWFtb25kJ1xufTtcbmNvbnN0IGV4dHJhY3RGaWxscyA9IChwYWludCkgPT4ge1xuICAgIGlmIChwYWludC50eXBlID09PSAnU09MSUQnKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmaWxsOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGNvbnZlcnRQYWludFRvUmdiYShwYWludCksXG4gICAgICAgICAgICAgICAgdHlwZTogJ2NvbG9yJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoWydHUkFESUVOVF9MSU5FQVInLCAnR1JBRElFTlRfUkFESUFMJywgJ0dSQURJRU5UX0FOR1VMQVInLCAnR1JBRElFTlRfRElBTU9ORCddLmluY2x1ZGVzKHBhaW50LnR5cGUpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBncmFkaWVudFR5cGU6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogZ3JhZGllbnRUeXBlW3BhaW50LnR5cGVdLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RvcHM6IHBhaW50LmdyYWRpZW50U3RvcHMubWFwKHN0b3AgPT4gKHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMoc3RvcC5wb3NpdGlvbiksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb2xvcjoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRSZ2JhKHN0b3AuY29sb3IpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgb3BhY2l0eToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhwYWludC5vcGFjaXR5KSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICAvLyByZXR1cm4gbnVsbCBpZiBubyBtYXRjaGluZyB0eXBlXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICByZXR1cm4gbnVsbDtcbn07XG5jb25zdCBleHRyYWN0Q29sb3JzID0gKHRva2VuTm9kZXMpID0+IHtcbiAgICAvLyBnZXQgYWxsIHBhaW50IHN0eWxlc1xuICAgIHJldHVybiB0b2tlbk5vZGVzXG4gICAgICAgIC8vIHJlbW92ZSBpbWFnZXMgZmlsbHMgZnJvbSB0b2tlbnNcbiAgICAgICAgLm1hcChub2RlID0+IHtcbiAgICAgICAgbm9kZS5wYWludHMgPSBub2RlLnBhaW50cy5maWx0ZXIocGFpbnQgPT4gcGFpbnQudHlwZSAhPT0gJ0lNQUdFJyk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH0pXG4gICAgICAgIC8vIHJlbW92ZSB0b2tlbnMgd2l0aCBubyBmaWxsXG4gICAgICAgIC5maWx0ZXIobm9kZSA9PiBub2RlLnBhaW50cy5sZW5ndGggPiAwKVxuICAgICAgICAvLyB0cmFuc2Zvcm0gc3R5bGVcbiAgICAgICAgLm1hcChub2RlID0+ICh7XG4gICAgICAgIG5hbWU6IG5vZGUubmFtZSxcbiAgICAgICAgLy8gaWQ6IG5vZGUuaWQsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBub2RlLmRlc2NyaXB0aW9uIHx8IG51bGwsXG4gICAgICAgIGNhdGVnb3J5OiAnZmlsbCcsXG4gICAgICAgIHZhbHVlczogbm9kZS5wYWludHMubWFwKHBhaW50ID0+IGV4dHJhY3RGaWxscyhwYWludCkpXG4gICAgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3RDb2xvcnM7XG4iLCJpbXBvcnQgeyByb3VuZFJnYmEgfSBmcm9tICcuLi91dGlsaXRpZXMvY29udmVydENvbG9yJztcbmNvbnN0IGVmZmVjdFR5cGUgPSB7XG4gICAgTEFZRVJfQkxVUjogJ2xheWVyQmx1cicsXG4gICAgQkFDS0dST1VORF9CTFVSOiAnYmFja2dyb3VuZEJsdXInLFxuICAgIERST1BfU0hBRE9XOiAnZHJvcFNoYWRvdycsXG4gICAgSU5ORVJfU0hBRE9XOiAnaW5uZXJTaGFkb3cnXG59O1xuY29uc3QgYmx1clZhbHVlcyA9IChlZmZlY3QpID0+ICh7XG4gICAgdHlwZToge1xuICAgICAgICB2YWx1ZTogZWZmZWN0VHlwZVtlZmZlY3QudHlwZV0sXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgfSxcbiAgICByYWRpdXM6IHtcbiAgICAgICAgdmFsdWU6IGVmZmVjdC5yYWRpdXMsXG4gICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgfVxufSk7XG5jb25zdCBzaGFkb3dWYWx1ZXMgPSBlZmZlY3QgPT4gKHtcbiAgICB0eXBlOiB7XG4gICAgICAgIHZhbHVlOiBlZmZlY3RUeXBlW2VmZmVjdC50eXBlXSxcbiAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICB9LFxuICAgIHJhZGl1czoge1xuICAgICAgICB2YWx1ZTogZWZmZWN0LnJhZGl1cyxcbiAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICB9LFxuICAgIGNvbG9yOiB7XG4gICAgICAgIHZhbHVlOiByb3VuZFJnYmEoZWZmZWN0LmNvbG9yKSxcbiAgICAgICAgdHlwZTogJ2NvbG9yJ1xuICAgIH0sXG4gICAgb2Zmc2V0OiB7XG4gICAgICAgIHg6IHtcbiAgICAgICAgICAgIHZhbHVlOiBlZmZlY3Qub2Zmc2V0LngsXG4gICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgeToge1xuICAgICAgICAgICAgdmFsdWU6IGVmZmVjdC5vZmZzZXQueSxcbiAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBzcHJlYWQ6IHtcbiAgICAgICAgdmFsdWU6IGVmZmVjdC5zcHJlYWQsXG4gICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgfVxufSk7XG5jb25zdCBleHRyYWN0RWZmZWN0cyA9ICh0b2tlbk5vZGVzKSA9PiB7XG4gICAgLy8gZ2V0IGVmZmVjdCBzdHlsZXNcbiAgICByZXR1cm4gdG9rZW5Ob2Rlcy5tYXAobm9kZSA9PiAoe1xuICAgICAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBub2RlLmRlc2NyaXB0aW9uIHx8IG51bGwsXG4gICAgICAgIGNhdGVnb3J5OiAnZWZmZWN0JyxcbiAgICAgICAgdmFsdWVzOiBub2RlLmVmZmVjdHMubWFwKChlZmZlY3QpID0+IGVmZmVjdC50eXBlID09PSAnTEFZRVJfQkxVUicgfHwgZWZmZWN0LnR5cGUgPT09ICdCQUNLR1JPVU5EX0JMVVInXG4gICAgICAgICAgICA/IGJsdXJWYWx1ZXMoZWZmZWN0KVxuICAgICAgICAgICAgOiBzaGFkb3dWYWx1ZXMoZWZmZWN0KSlcbiAgICB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZXh0cmFjdEVmZmVjdHM7XG4iLCJpbXBvcnQgcm91bmRXaXRoRGVjaW1hbHMgZnJvbSAnLi4vdXRpbGl0aWVzL3JvdW5kV2l0aERlY2ltYWxzJztcbmNvbnN0IHRleHREZWNvcmF0aW9ucyA9IHtcbiAgICBOT05FOiAnbm9uZScsXG4gICAgVU5ERVJMSU5FOiAndW5kZXJsaW5lJyxcbiAgICBTVFJJS0VUSFJPVUdIOiAnbGluZS10aHJvdWdoJ1xufTtcbmNvbnN0IHRleHRDYXNlcyA9IHtcbiAgICBPUklHSU5BTDogJ25vbmUnLFxuICAgIFVQUEVSOiAndXBwZXJjYXNlJyxcbiAgICBMT1dFUjogJ2xvd2VyY2FzZScsXG4gICAgVElUTEU6ICdjYXBpdGFsaXplJ1xufTtcbmNvbnN0IGZvbnRXZWlnaHRzID0ge1xuICAgIHRoaW46IDEwMCxcbiAgICBleHRyYWxpZ2h0OiAyMDAsXG4gICAgdWx0cmFsaWdodDogMjAwLFxuICAgIGxpZ2h0OiAzMDAsXG4gICAgbm9ybWFsOiA0MDAsXG4gICAgcmVndWxhcjogNDAwLFxuICAgIG1lZGl1bTogNTAwLFxuICAgIHNlbWlib2xkOiA2MDAsXG4gICAgZGVtaWJvbGQ6IDYwMCxcbiAgICBib2xkOiA3MDAsXG4gICAgZXh0cmFib2xkOiA4MDAsXG4gICAgdWx0YWJvbGQ6IDgwMCxcbiAgICBibGFjazogOTAwLFxuICAgIGhlYXZ5OiA5MDAsXG4gICAgc3VwZXI6IDkwMFxufTtcbmNvbnN0IGZvbnRTdHJldGNoID0ge1xuICAgIG5vcm1hbDogJ25vcm1hbCcsXG4gICAgY29uZGVuc2VkOiAnY29uZGVuc2VkJyxcbiAgICBleHBhbmRlZDogJ2V4cGFuZGVkJyxcbiAgICBleHRlbmRlZDogJ2V4cGFuZGVkJ1xufTtcbmNvbnN0IGZvbnRTdHlsZXMgPSB7XG4gICAgbm9ybWFsOiAnbm9ybWFsJyxcbiAgICBpdGFsaWM6ICdpdGFsaWMnLFxuICAgIG9ibGlxdWU6ICdvYmxpcXVlJ1xufTtcbmNvbnN0IHBhcnNlRm9udFdlaWdodCA9IChmb250U3R5bGUpID0+IHtcbiAgICBjb25zdCBwYXJ0cyA9IGZvbnRTdHlsZS50b0xvd2VyQ2FzZSgpLnNwbGl0KCcgJyk7XG4gICAgbGV0IHdlaWdodCA9IHBhcnRzWzBdO1xuICAgIC8vIG1lcmdlIGlmIHNwYWNlIGFmdGVyIGV4dHJhXG4gICAgaWYgKFsnZXh0cmEnLCAndWx0cmEnLCAnc2VtaScsICdkZW1pJ10uaW5jbHVkZXMocGFydHNbMF0pICYmIFsnYm9sZCcsICdsaWdodCddLmluY2x1ZGVzKHBhcnRzWzFdKSkge1xuICAgICAgICB3ZWlnaHQgPSBgJHtwYXJ0c1swXX0ke3BhcnRzWzFdfWA7XG4gICAgfVxuICAgIHJldHVybiBmb250V2VpZ2h0c1t3ZWlnaHRdIHx8IDQwMDtcbn07XG5jb25zdCBwYXJzZUZvbnRTdHJldGNoID0gKGZvbnRTdHlsZSkgPT4ge1xuICAgIGNvbnN0IHBhcnRzID0gZm9udFN0eWxlLnRvTG93ZXJDYXNlKCkuc3BsaXQoJyAnKTtcbiAgICByZXR1cm4gZm9udFN0cmV0Y2hbcGFydHNbcGFydHMubGVuZ3RoIC0gMV1dIHx8IGZvbnRTdHJldGNoW3BhcnRzW3BhcnRzLmxlbmd0aCAtIDJdXSB8fCAnbm9ybWFsJztcbn07XG5jb25zdCBwYXJzZUZvbnRTdHlsZSA9IChmb250U3R5bGUpID0+IHtcbiAgICBjb25zdCBwYXJ0ID0gZm9udFN0eWxlLnRvTG93ZXJDYXNlKCkuc3BsaXQoJyAnKS5wb3AoKTtcbiAgICByZXR1cm4gZm9udFN0eWxlc1twYXJ0XSB8fCAnbm9ybWFsJztcbn07XG5jb25zdCBleHRyYWN0Rm9udHMgPSAodG9rZW5Ob2RlcykgPT4ge1xuICAgIC8vIGdldCByYXcgdGV4dCBzdHlsZXNcbiAgICByZXR1cm4gdG9rZW5Ob2Rlcy5tYXAobm9kZSA9PiAoe1xuICAgICAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBub2RlLmRlc2NyaXB0aW9uIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgY2F0ZWdvcnk6ICdmb250JyxcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICBmb250U2l6ZToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLmZvbnRTaXplLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZXh0RGVjb3JhdGlvbjoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB0ZXh0RGVjb3JhdGlvbnNbbm9kZS50ZXh0RGVjb3JhdGlvbl0sXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb250RmFtaWx5OiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG5vZGUuZm9udE5hbWUuZmFtaWx5LFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9udFdlaWdodDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBwYXJzZUZvbnRXZWlnaHQobm9kZS5mb250TmFtZS5zdHlsZSksXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb250U3R5bGU6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcGFyc2VGb250U3R5bGUobm9kZS5mb250TmFtZS5zdHlsZSksXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb250U3RyZXRjaDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBwYXJzZUZvbnRTdHJldGNoKG5vZGUuZm9udE5hbWUuc3R5bGUpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2ZvbnRTdHlsZU9sZDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLmZvbnROYW1lLnN0eWxlLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLmxldHRlclNwYWNpbmcudmFsdWUpLFxuICAgICAgICAgICAgICAgIHVuaXQ6IG5vZGUubGV0dGVyU3BhY2luZy51bml0LnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLmxpbmVIZWlnaHQudmFsdWUpIHx8ICdub3JtYWwnLFxuICAgICAgICAgICAgICAgIHVuaXQ6IG5vZGUubGluZUhlaWdodC51bml0LnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgdHlwZTogKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChub2RlLmxpbmVIZWlnaHQsICd2YWx1ZScpID8gJ251bWJlcicgOiAnc3RyaW5nJylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXJhZ3JhcGhJbmRlbnQ6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbm9kZS5wYXJhZ3JhcGhJbmRlbnQsXG4gICAgICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhcmFncmFwaFNwYWNpbmc6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbm9kZS5wYXJhZ3JhcGhTcGFjaW5nLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZXh0Q2FzZToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB0ZXh0Q2FzZXNbbm9kZS50ZXh0Q2FzZV0sXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0Rm9udHM7XG4iLCJjb25zdCBncmlkVmFsdWVzID0gKGdyaWQpID0+ICh7XG4gICAgcGF0dGVybjoge1xuICAgICAgICB2YWx1ZTogZ3JpZC5wYXR0ZXJuLnRvTG93ZXJDYXNlKCksXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgfSxcbiAgICBzZWN0aW9uU2l6ZToge1xuICAgICAgICB2YWx1ZTogZ3JpZC5zZWN0aW9uU2l6ZSxcbiAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICB9XG59KTtcbmNvbnN0IGdldENvdW50ID0gY291bnQgPT4ge1xuICAgIGlmIChjb3VudCA9PT0gSW5maW5pdHkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiAnYXV0bycsXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogY291bnQsXG4gICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgfTtcbn07XG5jb25zdCByb3dDb2x1bW5WYWx1ZXMgPSAoZ3JpZCkgPT4gKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHsgcGF0dGVybjoge1xuICAgICAgICB2YWx1ZTogZ3JpZC5wYXR0ZXJuLnRvTG93ZXJDYXNlKCksXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgfSB9LCAoZ3JpZC5zZWN0aW9uU2l6ZSAhPT0gdW5kZWZpbmVkICYmIHtcbiAgICBzZWN0aW9uU2l6ZToge1xuICAgICAgICB2YWx1ZTogZ3JpZC5zZWN0aW9uU2l6ZSxcbiAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICB9XG59KSksIHsgZ3V0dGVyU2l6ZToge1xuICAgICAgICB2YWx1ZTogZ3JpZC5ndXR0ZXJTaXplLFxuICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgIH0sIGFsaWdubWVudDoge1xuICAgICAgICB2YWx1ZTogZ3JpZC5hbGlnbm1lbnQudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICB9LCBjb3VudDogZ2V0Q291bnQoZ3JpZC5jb3VudCkgfSksIChncmlkLm9mZnNldCAhPT0gdW5kZWZpbmVkICYmIHtcbiAgICBvZmZzZXQ6IHtcbiAgICAgICAgdmFsdWU6IGdyaWQub2Zmc2V0LFxuICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgIH1cbn0pKSk7XG5jb25zdCBleHRyYWN0R3JpZHMgPSAodG9rZW5Ob2RlcykgPT4ge1xuICAgIC8vIGdldCBncmlkIHN0eWxlc1xuICAgIHJldHVybiB0b2tlbk5vZGVzLm1hcChub2RlID0+ICh7XG4gICAgICAgIG5hbWU6IG5vZGUubmFtZSxcbiAgICAgICAgZGVzY3JpcHRpb246IG5vZGUuZGVzY3JpcHRpb24gfHwgbnVsbCxcbiAgICAgICAgY2F0ZWdvcnk6ICdncmlkJyxcbiAgICAgICAgdmFsdWVzOiBub2RlLmxheW91dEdyaWRzLm1hcCgoZ3JpZCkgPT4gZ3JpZC5wYXR0ZXJuID09PSAnR1JJRCcgPyBncmlkVmFsdWVzKGdyaWQpIDogcm93Q29sdW1uVmFsdWVzKGdyaWQpKVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0R3JpZHM7XG4iLCJjb25zdCBkaXJlY3Rpb24gPSAodHJhbnNpdGlvbikgPT4ge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodHJhbnNpdGlvbiwgJ2RpcmVjdGlvbicpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkaXJlY3Rpb246IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdHJhbnNpdGlvbi5kaXJlY3Rpb24udG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn07XG5jb25zdCBlYXNpbmdzID0ge1xuICAgIENVU1RPTV9DVUJJQ19CRVpJRVI6IHt9LFxuICAgIExJTkVBUjoge1xuICAgICAgICB0eXBlOiAnbGluZWFyJyxcbiAgICAgICAgZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllcjoge1xuICAgICAgICAgICAgeDE6IDAsXG4gICAgICAgICAgICB5MTogMCxcbiAgICAgICAgICAgIHgyOiAxLFxuICAgICAgICAgICAgeTI6IDFcbiAgICAgICAgfVxuICAgIH0sXG4gICAgRUFTRV9JTjoge1xuICAgICAgICB0eXBlOiAnZWFzZS1pbicsXG4gICAgICAgIGVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXI6IHtcbiAgICAgICAgICAgIHgxOiAwLjQxOTk5OTk4Njg4Njk3ODE1LFxuICAgICAgICAgICAgeTE6IDAsXG4gICAgICAgICAgICB4MjogMSxcbiAgICAgICAgICAgIHkyOiAxXG4gICAgICAgIH1cbiAgICB9LFxuICAgIEVBU0VfT1VUOiB7XG4gICAgICAgIHR5cGU6ICdlYXNlLW91dCcsXG4gICAgICAgIGVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXI6IHtcbiAgICAgICAgICAgIHgxOiAwLFxuICAgICAgICAgICAgeTE6IDAsXG4gICAgICAgICAgICB4MjogMC41Nzk5OTk5ODMzMTA2OTk1LFxuICAgICAgICAgICAgeTI6IDFcbiAgICAgICAgfVxuICAgIH0sXG4gICAgRUFTRV9JTl9BTkRfT1VUOiB7XG4gICAgICAgIHR5cGU6ICdlYXNlLWluLW91dCcsXG4gICAgICAgIGVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXI6IHtcbiAgICAgICAgICAgIHgxOiAwLjQxOTk5OTk4Njg4Njk3ODE1LFxuICAgICAgICAgICAgeTE6IDAsXG4gICAgICAgICAgICB4MjogMC41Nzk5OTk5ODMzMTA2OTk1LFxuICAgICAgICAgICAgeTI6IDFcbiAgICAgICAgfVxuICAgIH0sXG4gICAgRUFTRV9JTl9CQUNLOiB7XG4gICAgICAgIHR5cGU6ICdlYXNlLWluLWJhY2snLFxuICAgICAgICBlYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyOiB7XG4gICAgICAgICAgICB4MTogMC4zMDAwMDAwMTE5MjA5Mjg5NixcbiAgICAgICAgICAgIHkxOiAtMC4wNTAwMDAwMDA3NDUwNTgwNixcbiAgICAgICAgICAgIHgyOiAwLjY5OTk5OTk4ODA3OTA3MSxcbiAgICAgICAgICAgIHkyOiAtMC41XG4gICAgICAgIH1cbiAgICB9LFxuICAgIEVBU0VfT1VUX0JBQ0s6IHtcbiAgICAgICAgdHlwZTogJ2Vhc2Utb3V0LWJhY2snLFxuICAgICAgICBlYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyOiB7XG4gICAgICAgICAgICB4MTogMC40NDk5OTk5ODgwNzkwNzEwNCxcbiAgICAgICAgICAgIHkxOiAxLjQ1MDAwMDA0NzY4MzcxNTgsXG4gICAgICAgICAgICB4MjogMC44MDAwMDAwMTE5MjA5MjksXG4gICAgICAgICAgICB5MjogMVxuICAgICAgICB9XG4gICAgfSxcbiAgICBFQVNFX0lOX0FORF9PVVRfQkFDSzoge1xuICAgICAgICB0eXBlOiAnZWFzZS1pbi1vdXQtYmFjaycsXG4gICAgICAgIGVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXI6IHtcbiAgICAgICAgICAgIHgxOiAwLjY5OTk5OTk4ODA3OTA3MSxcbiAgICAgICAgICAgIHkxOiAtMC40MDAwMDAwMDU5NjA0NjQ1LFxuICAgICAgICAgICAgeDI6IDAuNDAwMDAwMDA1OTYwNDY0NSxcbiAgICAgICAgICAgIHkyOiAxLjM5OTk5OTk3NjE1ODE0MlxuICAgICAgICB9XG4gICAgfVxufTtcbmNvbnN0IGVhc2luZyA9IChlYXNpbmcpID0+IHtcbiAgICAvLyBhYm9ydCBpZiBpbnZhbGlmIGVhc2luZyB0eXBlXG4gICAgaWYgKCFPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChlYXNpbmdzLCBlYXNpbmcudHlwZSkpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgLy8gcmV0dXJuIGN1c3RvbSBlYXNpbmdcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgaWYgKGVhc2luZy50eXBlID09PSAnQ1VTVE9NX0NVQklDX0JFWklFUicpIHtcbiAgICAgICAgZWFzaW5ncy5DVVNUT01fQ1VCSUNfQkVaSUVSID0ge1xuICAgICAgICAgICAgdHlwZTogJ2N1YmljLWJlemllcicsXG4gICAgICAgICAgICBlYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyOiB7XG4gICAgICAgICAgICAgICAgeDE6IGVhc2luZy5lYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyLngxLFxuICAgICAgICAgICAgICAgIHkxOiBlYXNpbmcuZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllci55MSxcbiAgICAgICAgICAgICAgICB4MjogZWFzaW5nLmVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXIueDIsXG4gICAgICAgICAgICAgICAgeTI6IGVhc2luZy5lYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyLnkyXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGVhc2luZzoge1xuICAgICAgICAgICAgdmFsdWU6IGVhc2luZ3NbZWFzaW5nLnR5cGVdLnR5cGUsXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBlYXNpbmdGdW5jdGlvbjoge1xuICAgICAgICAgICAgeDE6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogZWFzaW5nc1tlYXNpbmcudHlwZV0uZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllci54MSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHgyOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGVhc2luZ3NbZWFzaW5nLnR5cGVdLmVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXIueDIsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB5MToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBlYXNpbmdzW2Vhc2luZy50eXBlXS5lYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyLnkxLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeTI6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogZWFzaW5nc1tlYXNpbmcudHlwZV0uZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllci55MixcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn07XG5jb25zdCBleHRyYWN0TW90aW9uID0gKHRva2VuTm9kZXMpID0+IHtcbiAgICBjb25zdCBub2RlTmFtZSA9ICdtb3Rpb24nO1xuICAgIC8vIHJldHVybiBhcyBvYmplY3RcbiAgICByZXR1cm4gdG9rZW5Ob2Rlc1xuICAgICAgICAvLyBvbmx5IGdldCBtb3Rpb24gbm9kZXNcbiAgICAgICAgLmZpbHRlcihub2RlID0+IG5vZGUubmFtZS5zdWJzdHIoMCwgbm9kZU5hbWUubGVuZ3RoKSA9PT0gbm9kZU5hbWUpXG4gICAgICAgIC8vIGZpbHRlciB0byBvbmx5IGluY2x1ZGUgaXRlbXMgd2hpY2ggaGF2ZSBhIHRyYW5zaXRpb24gcHJvcGVydHlcbiAgICAgICAgLmZpbHRlcihub2RlID0+IHtcbiAgICAgICAgaWYgKG5vZGUucmVhY3Rpb25zLmxlbmd0aCA+IDAgJiYgbm9kZS5yZWFjdGlvbnNbMF0uYWN0aW9uLnR5cGUgPT09ICdOT0RFJyAmJiBub2RlLnJlYWN0aW9uc1swXS5hY3Rpb24udHJhbnNpdGlvbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pXG4gICAgICAgIC8vIHJldHJpZXZlIHZhbHVlc1xuICAgICAgICAubWFwKChub2RlKSA9PiAoe1xuICAgICAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgZGVzY3JpcHRpb246IG5vZGUuZGVzY3JpcHRpb24gfHwgbnVsbCxcbiAgICAgICAgY2F0ZWdvcnk6ICdtb3Rpb24nLFxuICAgICAgICB2YWx1ZXM6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7IHR5cGU6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbm9kZS5yZWFjdGlvbnNbMF0uYWN0aW9uLnRyYW5zaXRpb24udHlwZS50b0xvY2FsZUxvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LCBkdXJhdGlvbjoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBNYXRoLnJvdW5kKChub2RlLnJlYWN0aW9uc1swXS5hY3Rpb24udHJhbnNpdGlvbi5kdXJhdGlvbiArIE51bWJlci5FUFNJTE9OKSAqIDEwMDApIC8gMTAwMCxcbiAgICAgICAgICAgICAgICB1bml0OiAncycsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0gfSwgZWFzaW5nKG5vZGUucmVhY3Rpb25zWzBdLmFjdGlvbi50cmFuc2l0aW9uLmVhc2luZykpLCBkaXJlY3Rpb24obm9kZS5yZWFjdGlvbnNbMF0uYWN0aW9uLnRyYW5zaXRpb24pKVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0TW90aW9uO1xuZXhwb3J0IGNvbnN0IF9fdGVzdGluZyA9IHtcbiAgICBlYXNpbmc6IGVhc2luZ1xufTtcbiIsImltcG9ydCByb3VuZFdpdGhEZWNpbWFscyBmcm9tICcuLi91dGlsaXRpZXMvcm91bmRXaXRoRGVjaW1hbHMnO1xuY29uc3QgZXh0cmFjdFJhZGlpID0gKHRva2VuTm9kZXMpID0+IHtcbiAgICBjb25zdCBub2RlTmFtZSA9ICdyYWRpaSc7XG4gICAgLy8gZ2V0IHRoZSB0eXBlIG9mIHRoZSBjb3JuZXIgcmFkaXVzXG4gICAgY29uc3QgZ2V0UmFkaXVzVHlwZSA9IHJhZGl1cyA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgcmFkaXVzID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuICdzaW5nbGUnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnbWl4ZWQnO1xuICAgIH07XG4gICAgLy8gZ2V0IHRoZSBpbmRpdmlkdWFsIHJhZGlpXG4gICAgY29uc3QgZ2V0UmFkaWkgPSAobm9kZSkgPT4gKHtcbiAgICAgICAgdG9wTGVmdDoge1xuICAgICAgICAgICAgdmFsdWU6IG5vZGUudG9wTGVmdFJhZGl1cyB8fCAwLFxuICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIHRvcFJpZ2h0OiB7XG4gICAgICAgICAgICB2YWx1ZTogbm9kZS50b3BSaWdodFJhZGl1cyB8fCAwLFxuICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIGJvdHRvbVJpZ2h0OiB7XG4gICAgICAgICAgICB2YWx1ZTogbm9kZS5ib3R0b21SaWdodFJhZGl1cyB8fCAwLFxuICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIGJvdHRvbUxlZnQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiBub2RlLmJvdHRvbUxlZnRSYWRpdXMgfHwgMCxcbiAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gcmV0dXJuIGFzIG9iamVjdFxuICAgIHJldHVybiB0b2tlbk5vZGVzLmZpbHRlcihub2RlID0+IG5vZGUubmFtZS5zdWJzdHIoMCwgbm9kZU5hbWUubGVuZ3RoKSA9PT0gbm9kZU5hbWUpLm1hcChub2RlID0+ICh7XG4gICAgICAgIG5hbWU6IG5vZGUubmFtZSxcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgICBjYXRlZ29yeTogJ3JhZGl1cycsXG4gICAgICAgIHZhbHVlczogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCAodHlwZW9mIG5vZGUuY29ybmVyUmFkaXVzID09PSAnbnVtYmVyJyAmJiB7XG4gICAgICAgICAgICByYWRpdXM6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbm9kZS5jb3JuZXJSYWRpdXMsXG4gICAgICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSksIHsgcmFkaXVzVHlwZToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBnZXRSYWRpdXNUeXBlKG5vZGUuY29ybmVyUmFkaXVzKSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfSwgcmFkaWk6IGdldFJhZGlpKG5vZGUpLCBzbW9vdGhpbmc6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMobm9kZS5jb3JuZXJTbW9vdGhpbmcsIDIpLFxuICAgICAgICAgICAgICAgIGNvbW1lbnQ6ICdQZXJjZW50IGFzIGRlY2ltYWwgZnJvbSAwLjAgLSAxLjAnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9IH0pXG4gICAgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3RSYWRpaTtcbiIsImltcG9ydCByb3VuZFdpdGhEZWNpbWFscyBmcm9tICcuLi91dGlsaXRpZXMvcm91bmRXaXRoRGVjaW1hbHMnO1xuY29uc3QgZXh0cmFjdFNpemVzID0gKHRva2VuTm9kZXMpID0+IHtcbiAgICBjb25zdCBub2RlTmFtZSA9ICdzaXplcyc7XG4gICAgLy8gcmV0dXJuIGFzIG9iamVjdFxuICAgIHJldHVybiB0b2tlbk5vZGVzLmZpbHRlcihub2RlID0+IG5vZGUubmFtZS5zdWJzdHIoMCwgbm9kZU5hbWUubGVuZ3RoKSA9PT0gbm9kZU5hbWUpLm1hcChub2RlID0+ICh7XG4gICAgICAgIG5hbWU6IG5vZGUubmFtZSxcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgICBjYXRlZ29yeTogJ3NpemUnLFxuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHdpZHRoOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKG5vZGUud2lkdGgsIDIpLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWlnaHQ6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMobm9kZS5oZWlnaHQsIDIpLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0U2l6ZXM7XG4iLCJpbXBvcnQgcm91bmRXaXRoRGVjaW1hbHMgZnJvbSAnLi4vdXRpbGl0aWVzL3JvdW5kV2l0aERlY2ltYWxzJztcbmNvbnN0IGV4dHJhY3RTcGFjaW5nID0gKHRva2VuTm9kZXMpID0+IHtcbiAgICBjb25zdCBub2RlTmFtZSA9ICdzcGFjaW5nJztcbiAgICAvLyByZXR1cm4gYXMgb2JqZWN0XG4gICAgcmV0dXJuIHRva2VuTm9kZXMuZmlsdGVyKG5vZGUgPT4gbm9kZS5uYW1lLnN1YnN0cigwLCBub2RlTmFtZS5sZW5ndGgpID09PSBub2RlTmFtZSlcbiAgICAgICAgLm1hcChub2RlID0+ICh7XG4gICAgICAgIG5hbWU6IG5vZGUubmFtZSxcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgICBjYXRlZ29yeTogJ3NwYWNpbmcnLFxuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHRvcDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLnBhZGRpbmdUb3AsIDIpLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByaWdodDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLnBhZGRpbmdSaWdodCwgMiksXG4gICAgICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvdHRvbToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLnBhZGRpbmdCb3R0b20sIDIpLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWZ0OiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKG5vZGUucGFkZGluZ0xlZnQsIDIpLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0U3BhY2luZztcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgZ2V0U2V0dGluZ3MsIHNldFNldHRpbmdzIH0gZnJvbSAnLi91dGlsaXRpZXMvc2V0dGluZ3MnO1xuaW1wb3J0IHsgZ2V0QWNjZXNzVG9rZW4sIHNldEFjY2Vzc1Rva2VuIH0gZnJvbSAnLi91dGlsaXRpZXMvYWNjZXNzVG9rZW4nO1xuaW1wb3J0IGdldEpzb24gZnJvbSAnLi91dGlsaXRpZXMvZ2V0SnNvbic7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4vdXRpbGl0aWVzL2NvbmZpZyc7XG5pbXBvcnQgZ2V0VmVyc2lvbkRpZmZlcmVuY2UgZnJvbSAnLi91dGlsaXRpZXMvZ2V0VmVyc2lvbkRpZmZlcmVuY2UnO1xuaW1wb3J0IGdldEZpbGVJZCBmcm9tICcuL3V0aWxpdGllcy9nZXRGaWxlSWQnO1xuLy8gaW5pdGlhdGUgVUlcbmZpZ21hLnNob3dVSShfX2h0bWxfXywge1xuICAgIHZpc2libGU6IGZhbHNlLFxuICAgIHdpZHRoOiBjb25maWcuc2V0dGluZ3NEaWFsb2cud2lkdGgsXG4gICAgaGVpZ2h0OiBjb25maWcuc2V0dGluZ3NEaWFsb2cuaGVpZ2h0XG59KTtcbi8vIEdldCB0aGUgdXNlciBzZXR0aW5nc1xuY29uc3QgdXNlclNldHRpbmdzID0gZ2V0U2V0dGluZ3MoKTtcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRVhQT1JUIFRPIEZJTEVcbi8vIGV4cG9ydHMgdGhlIGRlc2lnbiB0b2tlbnMgdG8gYSBmaWxlXG5pZiAoZmlnbWEuY29tbWFuZCA9PT0gJ2V4cG9ydCcpIHtcbiAgICAvLyBzaG93IFVJXG4gICAgZmlnbWEudWkuc2hvdygpO1xuICAgIC8vIHdyaXRlIHRva2VucyB0byBqc29uIGZpbGVcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgIGNvbW1hbmQ6ICdleHBvcnQnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBmaWxlbmFtZTogYCR7dXNlclNldHRpbmdzLmZpbGVuYW1lfS5qc29uYCxcbiAgICAgICAgICAgIGRhdGE6IGdldEpzb24oZmlnbWEsIHVzZXJTZXR0aW5ncylcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy8gU0VORCBUTyBVUkxcbi8vIHNlbmQgdG9rZW5zIHRvIHVybFxuaWYgKGZpZ21hLmNvbW1hbmQgPT09ICd1cmxFeHBvcnQnKSB7XG4gICAgLy8gbmVlZGVkIGZvciBnZXRBY2Nlc3NUb2tlbiBhc3luY1xuICAgIGNvbnN0IHVybEV4cG9ydCA9ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICBjb21tYW5kOiAndXJsRXhwb3J0JyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICB1cmw6IHVzZXJTZXR0aW5ncy5zZXJ2ZXJVcmwsXG4gICAgICAgICAgICAgICAgYWNjZXNzVG9rZW46IHlpZWxkIGdldEFjY2Vzc1Rva2VuKGdldEZpbGVJZChmaWdtYSkpLFxuICAgICAgICAgICAgICAgIGFjY2VwdEhlYWRlcjogdXNlclNldHRpbmdzLmFjY2VwdEhlYWRlcixcbiAgICAgICAgICAgICAgICBhdXRoVHlwZTogdXNlclNldHRpbmdzLmF1dGhUeXBlLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRfdHlwZTogdXNlclNldHRpbmdzLmV2ZW50VHlwZSxcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50X3BheWxvYWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuRmlsZU5hbWU6IGAke3VzZXJTZXR0aW5ncy5maWxlbmFtZX0uanNvbmAsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbnM6IGAke2dldEpzb24oZmlnbWEsIHVzZXJTZXR0aW5ncywgdHJ1ZSl9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVuYW1lOiBmaWdtYS5yb290Lm5hbWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy8gcnVuIGV4cG9ydCB1cmwgZnVuY3Rpb25cbiAgICB1cmxFeHBvcnQoKTtcbn1cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gU0VUVElOR1Ncbi8vIHNldHRpbmdzIGZvciB0aGUgZGVzaWduIHRva2Vuc1xuaWYgKGZpZ21hLmNvbW1hbmQgPT09ICdzZXR0aW5ncycpIHtcbiAgICAvLyB3cmFwIGluIGZ1bmN0aW9uIGJlY2F1c2Ugb2YgYXN5bmMgY2xpZW50IFN0b3JhZ2VcbiAgICBjb25zdCBvcGVuVWkgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IHZlcnNpb24gZGlmZmVyZW5jZXMgdG8gdGhlIGxhc3QgdGltZSB0aGUgcGx1Z2luIHdhcyBvcGVuZWRcbiAgICAgICAgY29uc3QgdmVyc2lvbkRpZmZlcmVuY2UgPSB5aWVsZCBnZXRWZXJzaW9uRGlmZmVyZW5jZShmaWdtYSk7XG4gICAgICAgIC8vIHJlc2l6ZSBVSSBpZiBuZWVkZWRcbiAgICAgICAgaWYgKHZlcnNpb25EaWZmZXJlbmNlICE9PSB1bmRlZmluZWQgJiYgdmVyc2lvbkRpZmZlcmVuY2UgIT09ICdwYXRjaCcpIHtcbiAgICAgICAgICAgIGZpZ21hLnVpLnJlc2l6ZShjb25maWcuc2V0dGluZ3NEaWFsb2cud2lkdGgsIGNvbmZpZy5zZXR0aW5nc0RpYWxvZy5oZWlnaHQgKyA2MCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVnaXN0ZXIgdGhlIHNldHRpbmdzIFVJXG4gICAgICAgIGZpZ21hLnVpLnNob3coKTtcbiAgICAgICAgLy8gc2VudCBzZXR0aW5ncyB0byBVSVxuICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICBjb21tYW5kOiAnZ2V0U2V0dGluZ3MnLFxuICAgICAgICAgICAgc2V0dGluZ3M6IHVzZXJTZXR0aW5ncyxcbiAgICAgICAgICAgIGFjY2Vzc1Rva2VuOiB5aWVsZCBnZXRBY2Nlc3NUb2tlbihnZXRGaWxlSWQoZmlnbWEpKSxcbiAgICAgICAgICAgIHZlcnNpb25EaWZmZXJlbmNlOiB2ZXJzaW9uRGlmZmVyZW5jZVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBmaWdtYS51aS5zaG93KCk7XG4gICAgfSk7XG4gICAgLy8gcnVuIGZ1bmN0aW9uXG4gICAgb3BlblVpKCk7XG59XG4vKipcbiAqIE9wZW4gSGVscFxuICogT3BlbiBnaXRodWIgaGVscCBwYWdlXG4gKi9cbmlmIChmaWdtYS5jb21tYW5kID09PSAnaGVscCcpIHtcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgIGNvbW1hbmQ6ICdoZWxwJ1xuICAgIH0pO1xufVxuLyoqXG4gKiBSZWFjdCB0byBtZXNzYWdlc1xuICovXG5maWdtYS51aS5vbm1lc3NhZ2UgPSAobWVzc2FnZSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgLyoqXG4gICAgICogb24gY2xvc2VQbHVnaW5cbiAgICAgKiBjbG9zZSBwbHVnaW4gYW5kIHNob3cgbm90aWZpY2F0aW9uIGlmIGF2YWlsYWJsZVxuICAgICAqL1xuICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdjbG9zZVBsdWdpbicpIHtcbiAgICAgICAgLy8gc2hvdyBub3RpZmljYXRpb24gaWYgc2VuZFxuICAgICAgICBpZiAobWVzc2FnZS5ub3RpZmljYXRpb24gIT09IHVuZGVmaW5lZCAmJiBtZXNzYWdlLm5vdGlmaWNhdGlvbiAhPT0gJycpIHtcbiAgICAgICAgICAgIGZpZ21hLm5vdGlmeShtZXNzYWdlLm5vdGlmaWNhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2xvc2UgcGx1Z2luXG4gICAgICAgIGZpZ21hLnVpLmhpZGUoKTtcbiAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogb24gc2F2ZVNldHRpbmdzXG4gICAgICogc2F2ZSBzZXR0aW5ncywgYWNjZXNzIHRva2VuIGFuZCBjbG9zZSBwbHVnaW5cbiAgICAgKi9cbiAgICBpZiAobWVzc2FnZS5jb21tYW5kID09PSAnc2F2ZVNldHRpbmdzJykge1xuICAgICAgICAvLyBzdG9yZSBzZXR0aW5nc1xuICAgICAgICBzZXRTZXR0aW5ncyhtZXNzYWdlLnNldHRpbmdzKTtcbiAgICAgICAgLy8gYWNjZXNzVG9rZW5cbiAgICAgICAgeWllbGQgc2V0QWNjZXNzVG9rZW4oZ2V0RmlsZUlkKGZpZ21hKSwgbWVzc2FnZS5hY2Nlc3NUb2tlbik7XG4gICAgICAgIC8vIGNsb3NlIHBsdWdpblxuICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgIH1cbn0pO1xuIiwiaW1wb3J0IHsgY29udmVydFJnYmFPYmplY3RUb1N0cmluZyB9IGZyb20gJy4uL3V0aWxpdGllcy9jb252ZXJ0Q29sb3InO1xuaW1wb3J0IGdldERlc2NyaXB0aW9uIGZyb20gJy4vdXRpbGl0aWVzL2dldERlc2NyaXB0aW9uJztcbmNvbnN0IGRlZmF1bHRUcmFuc2Zvcm1lciA9IHByb3BlcnR5R3JvdXBWYWx1ZXMgPT4ge1xuICAgIC8vIHR1cm4gYXJyYXkgd2l0aCBvbmx5IG9uZSBpdGVtIGludG8gbm9ybWFsIG9iamVjdFxuICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BlcnR5R3JvdXBWYWx1ZXMpICYmIHByb3BlcnR5R3JvdXBWYWx1ZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHByb3BlcnR5R3JvdXBWYWx1ZXMgPSBwcm9wZXJ0eUdyb3VwVmFsdWVzWzBdO1xuICAgIH1cbiAgICAvLyBkZWZpbmUgb2JqZWN0XG4gICAgY29uc3QgdHJhbnNmb3JtZWRQcm9wZXJ0aWVzID0ge307XG4gICAgLy8gdHJhbnNmb3JtIHByb2VwcnRpZXNcbiAgICBPYmplY3Qua2V5cyhwcm9wZXJ0eUdyb3VwVmFsdWVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgLy8gaWYgdGhpcyBpcyB0aGUgZmluYWwgbGV2ZWxcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChwcm9wZXJ0eUdyb3VwVmFsdWVzW2tleV0sICd2YWx1ZScpKSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm1lZFByb3BlcnRpZXNba2V5XSA9IHN0eWxlRGljdGlvbmFyeUZvcm1hdChwcm9wZXJ0eUdyb3VwVmFsdWVzW2tleV0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIG1vcmUgbmVzdGluZ1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybWVkUHJvcGVydGllc1trZXldID0gZGVmYXVsdFRyYW5zZm9ybWVyKHByb3BlcnR5R3JvdXBWYWx1ZXNba2V5XSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBpZiBvbmx5IG9uZSBwcm9wZXJ0eSBpcyBpbiBvYmplY3QgKGUuZy4gb25seSBmaWxsIGZvciBjb2xvcilcbiAgICAvLyByZXR1cm4gdGVoIHZhbHVlIG9mIHRoaXMgcHJvcGVydHkgZGlyZWN0bHkgKGUuZy4gY29sb3ItYmx1ZTogIzAwMDBBQSBpbnN0ZWFkIG9mIGNvbG9yLWJsdWUtZmlsbDogIzAwMDBBQSlcbiAgICBpZiAoT2JqZWN0LmtleXModHJhbnNmb3JtZWRQcm9wZXJ0aWVzKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC52YWx1ZXModHJhbnNmb3JtZWRQcm9wZXJ0aWVzKVswXTtcbiAgICB9XG4gICAgLy8gcmV0dXJuIHRyYW5zZm9ybWVkIHByb3BlcnRpZXNcbiAgICByZXR1cm4gdHJhbnNmb3JtZWRQcm9wZXJ0aWVzO1xufTtcbmNvbnN0IHNpemVUcmFuc2Zvcm1lciA9IHByb3BlcnR5R3JvdXBWYWx1ZXMgPT4ge1xuICAgIHJldHVybiBzdHlsZURpY3Rpb25hcnlGb3JtYXQocHJvcGVydHlHcm91cFZhbHVlcy53aWR0aCk7XG59O1xuY29uc3QgY2F0ZWdvcnlUcmFuc2Zvcm1lciA9IHtcbiAgICBkZWZhdWx0OiBkZWZhdWx0VHJhbnNmb3JtZXIsXG4gICAgZm9udDogZGVmYXVsdFRyYW5zZm9ybWVyLFxuICAgIGJvcmRlcjogZGVmYXVsdFRyYW5zZm9ybWVyLFxuICAgIHNpemU6IHNpemVUcmFuc2Zvcm1lcixcbiAgICBncmlkOiBkZWZhdWx0VHJhbnNmb3JtZXIsXG4gICAgZWZmZWN0OiBkZWZhdWx0VHJhbnNmb3JtZXIsXG4gICAgcmFkaXVzOiBkZWZhdWx0VHJhbnNmb3JtZXIsXG4gICAgZmlsbDogZGVmYXVsdFRyYW5zZm9ybWVyXG59O1xuY29uc3Qgc3R5bGVEaWN0aW9uYXJ5Q29udmVydFZhbHVlID0gKHZhbHVlLCB0eXBlKSA9PiB7XG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gJ2NvbG9yJykge1xuICAgICAgICByZXR1cm4gY29udmVydFJnYmFPYmplY3RUb1N0cmluZyh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn07XG5jb25zdCBzdHlsZURpY3Rpb25hcnlGb3JtYXQgPSAocHJvcGVydHkpID0+IChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oeyB2YWx1ZTogc3R5bGVEaWN0aW9uYXJ5Q29udmVydFZhbHVlKHByb3BlcnR5LnZhbHVlLCBwcm9wZXJ0eS50eXBlKSwgdHlwZTogcHJvcGVydHkudHlwZSB9LCAocHJvcGVydHkuZGVzY3JpcHRpb24gIT09IHVuZGVmaW5lZCAmJiB7IGNvbW1lbnQ6IHByb3BlcnR5LmRlc2NyaXB0aW9uIH0pKSwgKHByb3BlcnR5LnVuaXQgIT09IHVuZGVmaW5lZCAmJiB7IHVuaXQ6IHByb3BlcnR5LnVuaXQgfSkpKTtcbmNvbnN0IHByb3BlcnR5VHJhbnNmb3JtZXIgPSAocHJvcGVydHlHcm91cCwgY2F0ZWdvcnkpID0+IHtcbiAgICAvLyBpZiBjdXN0b20gdHJhbnNmb3JtZXIgaXMgZGVmaW5lZFxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY2F0ZWdvcnlUcmFuc2Zvcm1lciwgcHJvcGVydHlHcm91cC5jYXRlZ29yeSkpIHtcbiAgICAgICAgcmV0dXJuIGNhdGVnb3J5VHJhbnNmb3JtZXJbcHJvcGVydHlHcm91cC5jYXRlZ29yeV0ocHJvcGVydHlHcm91cC52YWx1ZXMpO1xuICAgIH1cbiAgICAvLyBvdGhlcndpc2UgcmV0dXJuIHdpdGggZGVmYXVsdCB0cmFuc2Zvcm1lclxuICAgIHJldHVybiBkZWZhdWx0VHJhbnNmb3JtZXIocHJvcGVydHlHcm91cC52YWx1ZXMpO1xufTtcbmNvbnN0IHN0eWxlRGljdGlvbmFyeVRyYW5zZm9ybWVyID0gKHByb3BlcnR5R3JvdXApID0+IHtcbiAgICAvLyB0cmFuc2Zvcm0gdG8gYW1hem9uIHN0eWxlIERpY3Rpb25hcnkgc3RydWN0dXJlXG4gICAgY29uc3QgdHJhbnNmb3JtZWRQcm9wZXJ0aWVzID0gcHJvcGVydHlUcmFuc2Zvcm1lcihwcm9wZXJ0eUdyb3VwLCBwcm9wZXJ0eUdyb3VwLmNhdGVnb3J5KTtcbiAgICAvLyByZXR1cm4gdmFsdWVzXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7IG5hbWU6IHByb3BlcnR5R3JvdXAubmFtZSwgY2F0ZWdvcnk6IHByb3BlcnR5R3JvdXAuY2F0ZWdvcnkgfSwgZ2V0RGVzY3JpcHRpb24ocHJvcGVydHlHcm91cC5kZXNjcmlwdGlvbikpLCB0cmFuc2Zvcm1lZFByb3BlcnRpZXMpO1xufTtcbmV4cG9ydCBkZWZhdWx0IHN0eWxlRGljdGlvbmFyeVRyYW5zZm9ybWVyO1xuZXhwb3J0IGNvbnN0IF9fdGVzdGluZyA9IHtcbiAgICBzdHlsZURpY3Rpb25hcnlDb252ZXJ0VmFsdWU6IHN0eWxlRGljdGlvbmFyeUNvbnZlcnRWYWx1ZSxcbiAgICBzaXplVHJhbnNmb3JtZXI6IHNpemVUcmFuc2Zvcm1lclxufTtcbiIsImNvbnN0IGdldERlc2NyaXB0aW9uID0gKGRlc2NyaXB0aW9uLCBkZXNjcmlwdGlvbktleSA9ICdjb21tZW50JykgPT4ge1xuICAgIC8vIGlmIHZhbGlkIGRlc2NyaXB0aW9uXG4gICAgaWYgKGRlc2NyaXB0aW9uICYmIHR5cGVvZiBkZXNjcmlwdGlvbiA9PT0gJ3N0cmluZycgJiYgZGVzY3JpcHRpb24ubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4geyBjb21tZW50OiBkZXNjcmlwdGlvbiB9O1xuICAgIH1cbiAgICAvLyBpZiBpbnZhbGlkIGRlc2NyaXB0aW9uIHJldHVybiBhbiBlbXB0eSBvYmplY3RcbiAgICByZXR1cm4ge307XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0RGVzY3JpcHRpb247XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbi8qKlxuICogQG5hbWUgZ2V0QWNjZXNzVG9rZW5cbiAqIEBkZXNjcmlwdGlvbiByZXR1cm5zIHRoZSBhY2Nlc3MgdG9rZW4gZm9yIHRoZSBjdXJyZW50IGZpbGUgb3IgdW5kZWZpbmVkXG4gKiBAcGFyYW0gZmlsZUlkIHtzdHJpbmd9IOKAlCBJRCBvZiB0aGUgY3VycmVudCBmaWxlXG4gKi9cbmNvbnN0IGdldEFjY2Vzc1Rva2VuID0gKGZpbGVJZCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgLy8gZ2V0IGFsbCBhY2Nlc3MgdG9rZW5zXG4gICAgY29uc3QgYWNjZXNzVG9rZW5zID0geWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYygnYWNjZXNzVG9rZW5zJyk7XG4gICAgLy8gaWYgYWNjZXNzIHRva2VucyBvYmplY3QgaXMgcHJlc2VudFxuICAgIGlmIChhY2Nlc3NUb2tlbnMgIT09IHVuZGVmaW5lZCAmJiBhY2Nlc3NUb2tlbnMgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgLy8gcmV0cmlldmUgdGhlIGFjY2VzcyB0b2tlbiBmcm9tIHRoZSBjYWNoZVxuICAgICAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGFjY2Vzc1Rva2Vuc1tmaWxlSWRdO1xuICAgICAgICAvLyByZXR1cm4gdGhlIGFjY2VzcyB0b2tlbiBvciBhbiBlbXB0eSBzdHJpbmdcbiAgICAgICAgcmV0dXJuIGFjY2Vzc1Rva2VuIHx8ICcnO1xuICAgIH1cbiAgICAvLyByZXR1cm4gZW1wdHkgc3RyaW5nIGlmIG5vIHRva2VuIGlzIHN0b3JlZFxuICAgIHJldHVybiAnJztcbn0pO1xuLyoqXG4gKiBAbmFtZSBzZXRBY2Nlc3NUb2tlblxuICogQGRlc2NyaXB0aW9uIHN0b3JlIHRoZSBhY2Nlc3MgdG9rZW4gZm9yIHRoZSBjdXJyZW50IGZpdmVuIGZpbGUgaW4gdGhlIHVzZXIgY2xpZW50U3RvcmFnZVxuICogQHBhcmFtIGZpbGVJZCB7c3RyaW5nfSDigJQgSUQgb2YgdGhlIGN1cnJlbnQgZmlsZVxuICogQHBhcmFtIGZpbGVJZCB7c3RyaW5nfSDigJQgYWNjZXNzIHRva2VuXG4gKi9cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5jb25zdCBzZXRBY2Nlc3NUb2tlbiA9IChmaWxlSWQsIGFjY2Vzc1Rva2VuKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAvLyBnZXQgdGhlIGFjY2VzcyB0b2tlbiBvYmplY3RcbiAgICBjb25zdCBhY2Nlc3NUb2tlbnMgPSAoeWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYygnYWNjZXNzVG9rZW5zJykpIHx8IHt9O1xuICAgIC8vIG1lcmdlIHRva2Vuc1xuICAgIGNvbnN0IG1lcmdlZFRva2VucyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgYWNjZXNzVG9rZW5zKSwgeyBbZmlsZUlkXTogYWNjZXNzVG9rZW4gfSk7XG4gICAgLy8gbWVyZ2UgdGhlIG5ldyB0b2tlbiBpbnRvIHRoZSBvYmplY3RcbiAgICByZXR1cm4geWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYygnYWNjZXNzVG9rZW5zJywgbWVyZ2VkVG9rZW5zKTtcbn0pO1xuZXhwb3J0IHsgZ2V0QWNjZXNzVG9rZW4sIHNldEFjY2Vzc1Rva2VuIH07XG4iLCJpbXBvcnQgZmlsdGVyQnlOYW1lUHJvcGVydHkgZnJvbSAnLi9maWx0ZXJCeU5hbWVQcm9wZXJ0eSc7XG5pbXBvcnQgZ2V0UGFpbnRTdHlsZXMgZnJvbSAnLi9nZXRQYWludFN0eWxlcyc7XG5pbXBvcnQgZ2V0R3JpZFN0eWxlcyBmcm9tICcuL2dldEdyaWRTdHlsZXMnO1xuaW1wb3J0IGdldFRva2VuRnJhbWVzIGZyb20gJy4vZ2V0VG9rZW5GcmFtZXMnO1xuaW1wb3J0IGdldFRleHRTdHlsZXMgZnJvbSAnLi9nZXRUZXh0U3R5bGVzJztcbmltcG9ydCBnZXRFZmZlY3RTdHlsZXMgZnJvbSAnLi9nZXRFZmZlY3RTdHlsZXMnO1xuLyoqXG4gKiBAZnVuY3Rpb24gYnVpbGRGaWdtYURhdGEg4oCTIHJldHVybiBhbiBvYmplY3Qgd2l0aCBhbGwgc3R5bGVzICYgZnJhbWUgdG8gdXNlIGZvciBleHBvcnRcbiAqIEBwYXJhbSB7UGx1Z2luQVBJfSBmaWdtYSDigJQgdGhlIGZpZ21hIFBsdWdpbkFQSSBvYmplY3RcbiAqIEBwYXJhbSBvcHRpb25zIOKAkyBvcHRpb25zIG9iamVjdFxuICovXG5jb25zdCBidWlsZEZpZ21hRGF0YSA9IChmaWdtYSwgb3B0aW9ucyA9IHtcbiAgICBwcmVmaXg6ICdfJyxcbiAgICBleGNsdWRlUHJlZml4OiB0cnVlXG59KSA9PiB7XG4gICAgLy8gdXNlIHNwcmVhZCBvcGVyYXRvciBiZWNhdXNlIHRoZSBvcmlnaW5hbCBpcyByZWFkT25seVxuICAgIGNvbnN0IHRva2VuRnJhbWVzID0gZ2V0VG9rZW5GcmFtZXMoWy4uLmZpZ21hLnJvb3QuY2hpbGRyZW5dKTtcbiAgICAvLyBnZXQgZGF0YSBmcm9tIGZpZ21hXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW5GcmFtZXM6IHRva2VuRnJhbWVzLFxuICAgICAgICBwYWludFN0eWxlczogZ2V0UGFpbnRTdHlsZXMoZmlnbWEuZ2V0TG9jYWxQYWludFN0eWxlcygpKS5maWx0ZXIoZmlsdGVyQnlOYW1lUHJvcGVydHkob3B0aW9ucy5wcmVmaXgsIG9wdGlvbnMuZXhjbHVkZVByZWZpeCkpLFxuICAgICAgICBncmlkU3R5bGVzOiBnZXRHcmlkU3R5bGVzKGZpZ21hLmdldExvY2FsR3JpZFN0eWxlcygpKS5maWx0ZXIoZmlsdGVyQnlOYW1lUHJvcGVydHkob3B0aW9ucy5wcmVmaXgsIG9wdGlvbnMuZXhjbHVkZVByZWZpeCkpLFxuICAgICAgICB0ZXh0U3R5bGVzOiBnZXRUZXh0U3R5bGVzKGZpZ21hLmdldExvY2FsVGV4dFN0eWxlcygpKS5maWx0ZXIoZmlsdGVyQnlOYW1lUHJvcGVydHkob3B0aW9ucy5wcmVmaXgsIG9wdGlvbnMuZXhjbHVkZVByZWZpeCkpLFxuICAgICAgICBlZmZlY3RTdHlsZXM6IGdldEVmZmVjdFN0eWxlcyhmaWdtYS5nZXRMb2NhbEVmZmVjdFN0eWxlcygpKS5maWx0ZXIoZmlsdGVyQnlOYW1lUHJvcGVydHkob3B0aW9ucy5wcmVmaXgsIG9wdGlvbnMuZXhjbHVkZVByZWZpeCkpXG4gICAgfTtcbn07XG5leHBvcnQgZGVmYXVsdCBidWlsZEZpZ21hRGF0YTtcbiIsIi8qIGlzdGFuYnVsIGlnbm9yZSBmaWxlICovXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgc2V0dGluZ3NEaWFsb2c6IHtcbiAgICAgICAgd2lkdGg6IDU1MCxcbiAgICAgICAgaGVpZ2h0OiA1NjVcbiAgICB9LFxuICAgIGtleToge1xuICAgICAgICBsYXN0VmVyc2lvblNldHRpbmdzT3BlbmVkOiAnbGFzdFZlcnNpb25TZXR0aW5nc09wZW5lZCcsXG4gICAgICAgIGZpbGVJZDogJ2ZpbGVJZCdcbiAgICB9XG59O1xuIiwiaW1wb3J0IHJvdW5kV2l0aERlY2ltYWxzIGZyb20gJy4vcm91bmRXaXRoRGVjaW1hbHMnO1xuZXhwb3J0IGNvbnN0IHJvdW5kUmdiYSA9IChyZ2JhLCBvcGFjaXR5KSA9PiAoe1xuICAgIHI6IHJvdW5kV2l0aERlY2ltYWxzKHJnYmEuciAqIDI1NSwgMCksXG4gICAgZzogcm91bmRXaXRoRGVjaW1hbHMocmdiYS5nICogMjU1LCAwKSxcbiAgICBiOiByb3VuZFdpdGhEZWNpbWFscyhyZ2JhLmIgKiAyNTUsIDApLFxuICAgIGE6IHJvdW5kV2l0aERlY2ltYWxzKG9wYWNpdHkgfHwgcmdiYS5hIHx8IDEpXG59KTtcbmV4cG9ydCBjb25zdCBjb252ZXJ0UGFpbnRUb1JnYmEgPSAocGFpbnQpID0+IHtcbiAgICBpZiAocGFpbnQudHlwZSA9PT0gJ1NPTElEJyAmJiBwYWludC52aXNpYmxlID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiByb3VuZFJnYmEocGFpbnQuY29sb3IsIChwYWludC5vcGFjaXR5IHx8IG51bGwpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuZXhwb3J0IGNvbnN0IGNvbnZlcnRSZ2JhT2JqZWN0VG9TdHJpbmcgPSAocmdiYU9iamVjdCkgPT4gYHJnYmEoJHtyZ2JhT2JqZWN0LnJ9LCAke3JnYmFPYmplY3QuZ30sICR7cmdiYU9iamVjdC5ifSwgJHtyZ2JhT2JqZWN0LmF9KWA7XG4iLCIvKipcbiAqIFBlcmZvcm1zIGEgZGVlcCBtZXJnZSBvZiBgc291cmNlYCBpbnRvIGB0YXJnZXRgLlxuICogTXV0YXRlcyBgdGFyZ2V0YCBvbmx5IGJ1dCBub3QgaXRzIG9iamVjdHMgYW5kIGFycmF5cy5cbiAqXG4gKiBAYXV0aG9yIGluc3BpcmVkIGJ5IFtqaGlsZGVuYmlkZGxlXShodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDgyMTgyMDkpLlxuICovXG5jb25zdCBkZWVwTWVyZ2UgPSAodGFyZ2V0LCBzb3VyY2UpID0+IHtcbiAgICAvLyBmdW5jdGlvbiB0byB0ZXN0IGlmIGEgdmFyaWFibGUgaXMgYW4gb2JqZWN0XG4gICAgY29uc3QgaXNPYmplY3QgPSAob2JqKSA9PiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCc7XG4gICAgLy8gbWFrZSBzdXJlIGJvdGggdGhlIHRhcmdldCBhbmQgdGhlIHNvdXJjZSBhcmUgb2JqZWN0c1xuICAgIC8vIG90aGVyd2lzZSByZXR1cm4gc291cmNlXG4gICAgaWYgKCFpc09iamVjdCh0YXJnZXQpIHx8ICFpc09iamVjdChzb3VyY2UpKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgfVxuICAgIC8vIGl0ZXJhdHJlIG92ZXIgc291cmNlXG4gICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIC8vIGdldCB2YWx1ZXMgZnJvbSBib3RoIHRhcmdldCBhbmQgc291cmNlIGZvciB0aGUgZ2l2ZW4ga2V5XG4gICAgICAgIGNvbnN0IHRhcmdldFZhbHVlID0gdGFyZ2V0W2tleV07XG4gICAgICAgIGNvbnN0IHNvdXJjZVZhbHVlID0gc291cmNlW2tleV07XG4gICAgICAgIC8vIG1lcmdlIGJvdGggdmFsdWVzXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRhcmdldFZhbHVlKSAmJiBBcnJheS5pc0FycmF5KHNvdXJjZVZhbHVlKSkge1xuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSB0YXJnZXRWYWx1ZS5jb25jYXQoc291cmNlVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzT2JqZWN0KHRhcmdldFZhbHVlKSAmJiBpc09iamVjdChzb3VyY2VWYWx1ZSkpIHtcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gZGVlcE1lcmdlKE9iamVjdC5hc3NpZ24oe30sIHRhcmdldFZhbHVlKSwgc291cmNlVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2VWYWx1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIHJldHVybiBtZXJnZSBvYmplY3RcbiAgICByZXR1cm4gdGFyZ2V0O1xufTtcbmV4cG9ydCBkZWZhdWx0IGRlZXBNZXJnZTtcbiIsImNvbnN0IGZpbHRlckJ5UHJvcGVydHlOYW1lID0gKHByZWZpeCA9ICdfJywgZXhjbHVkZSA9IHRydWUpID0+IHtcbiAgICByZXR1cm4gKG9iamVjdCkgPT4gKG9iamVjdC5uYW1lLnRyaW0oKS5zdWJzdHIoMCwgcHJlZml4Lmxlbmd0aCkgIT09IHByZWZpeCkgPT09IGV4Y2x1ZGU7XG59O1xuZXhwb3J0IGRlZmF1bHQgZmlsdGVyQnlQcm9wZXJ0eU5hbWU7XG4iLCIvKipcbiAqIEBmdW5jdGlvbiBnZXRFZmZlY3RTdHlsZXNcbiAqIEBwYXJhbSB7QXJyYXk8RWZmZWN0U3R5bGU+fSBzdHlsZXMg4oCTIHRoZSBlZmZlY3RTdHlsZSBmcm9tIHRoZSBmaWdtYSBmaWxlXG4gKi9cbmNvbnN0IGdldEVmZmVjdFN0eWxlcyA9IChzdHlsZXMpID0+IHtcbiAgICAvLyBpbml0IHN0eWxlQXJyYXlcbiAgICBjb25zdCBzdHlsZUFycmF5ID0gW107XG4gICAgLy8gbG9vcCB0aHJvdWdoIEZpZ21hIHN0eWxlcyBhbmQgYWRkIHRvIGFycmF5XG4gICAgc3R5bGVzLmZvckVhY2goc3R5bGUgPT4ge1xuICAgICAgICBzdHlsZUFycmF5LnB1c2goe1xuICAgICAgICAgICAgbmFtZTogc3R5bGUubmFtZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBzdHlsZS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGVmZmVjdHM6IHN0eWxlLmVmZmVjdHNcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy8gcmV0dXJuIGFycmF5XG4gICAgcmV0dXJuIHN0eWxlQXJyYXk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0RWZmZWN0U3R5bGVzO1xuIiwiaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5jb25zdCBnZXRGaWxlSWQgPSAoZmlnbWEpID0+IHtcbiAgICBsZXQgZmlsZUlkID0gZmlnbWEucm9vdC5nZXRQbHVnaW5EYXRhKGNvbmZpZy5rZXkuZmlsZUlkKTtcbiAgICAvLyBzZXQgcGx1Z2luIGlkIGlmIGl0IGRvZXMgbm90IGV4aXN0XG4gICAgaWYgKGZpbGVJZCA9PT0gdW5kZWZpbmVkIHx8IGZpbGVJZCA9PT0gJycpIHtcbiAgICAgICAgZmlnbWEucm9vdC5zZXRQbHVnaW5EYXRhKGNvbmZpZy5rZXkuZmlsZUlkLCBmaWdtYS5yb290Lm5hbWUgKyAnICcgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMDAwKSk7XG4gICAgICAgIC8vIGdyYWIgZmlsZSBJRFxuICAgICAgICBmaWxlSWQgPSBmaWdtYS5yb290LmdldFBsdWdpbkRhdGEoY29uZmlnLmtleS5maWxlSWQpO1xuICAgIH1cbiAgICByZXR1cm4gZmlsZUlkO1xufTtcbmV4cG9ydCBkZWZhdWx0IGdldEZpbGVJZDtcbiIsIi8qKlxuICogQGZ1bmN0aW9uIGdldEdyaWRTdHlsZXNcbiAqIEBwYXJhbSB7QXJyYXl9IGdyaWRTdHlsZXMg4oCTIHRoZSBncmlkU3R5bGVzIGZyb20gdGhlIGZpZ21hIGZpbGVcbiAqL1xuY29uc3QgZ2V0R3JpZFN0eWxlcyA9IChzdHlsZXMpID0+IHtcbiAgICAvLyBpbml0IHN0eWxlQXJyYXlcbiAgICBjb25zdCBzdHlsZUFycmF5ID0gW107XG4gICAgLy8gbG9vcCB0aHJvdWdoIEZpZ21hIHN0eWxlcyBhbmQgYWRkIHRvIGFycmF5XG4gICAgc3R5bGVzLmZvckVhY2goc3R5bGUgPT4ge1xuICAgICAgICBzdHlsZUFycmF5LnB1c2goe1xuICAgICAgICAgICAgbmFtZTogc3R5bGUubmFtZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBzdHlsZS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGxheW91dEdyaWRzOiBzdHlsZS5sYXlvdXRHcmlkc1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyByZXR1cm4gYXJyYXlcbiAgICByZXR1cm4gc3R5bGVBcnJheTtcbn07XG5leHBvcnQgZGVmYXVsdCBnZXRHcmlkU3R5bGVzO1xuIiwiaW1wb3J0IGdldFRva2VuSnNvbiBmcm9tICcuL2dldFRva2VuSnNvbic7XG5pbXBvcnQgYnVpbGRGaWdtYURhdGEgZnJvbSAnLi9idWlsZEZpZ21hRGF0YSc7XG4vKipcbiAqIEBuYW1lIGdldEpzb25cbiAqIEBwYXJhbSB7UGx1Z2luQVBJfSBmaWdtYVxuICogQHBhcmFtIHtib29sZWFufSBzdHJpbmdpZnlcbiAqL1xuY29uc3QgZ2V0SnNvbiA9IChmaWdtYSwgdXNlclNldHRpbmdzLCBzdHJpbmdpZnkgPSB0cnVlKSA9PiB7XG4gICAgLy8gY29uc3RydWN0IGZpZ21hIGRhdGEgb2JqZWN0XG4gICAgY29uc3QgZmlnbWFEYXRhID0gYnVpbGRGaWdtYURhdGEoZmlnbWEsIHtcbiAgICAgICAgcHJlZml4OiB1c2VyU2V0dGluZ3MucHJlZml4LFxuICAgICAgICBleGNsdWRlUHJlZml4OiB1c2VyU2V0dGluZ3MuZXhjbHVkZVByZWZpeFxuICAgIH0pO1xuICAgIGlmIChzdHJpbmdpZnkgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBnZXRUb2tlbkpzb24oZmlnbWFEYXRhLCAnc3R5bGVEaWN0aW9uYXJ5JywgdXNlclNldHRpbmdzLm5hbWVDb252ZXJzaW9uKTtcbiAgICB9XG4gICAgLy8gZ2V0IHRva2VucyBhcyBzdHJpbmdpZmllZCBqc29uXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGdldFRva2VuSnNvbihmaWdtYURhdGEsICdzdHlsZURpY3Rpb25hcnknLCB1c2VyU2V0dGluZ3MubmFtZUNvbnZlcnNpb24pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBnZXRKc29uO1xuIiwiLyoqXG4gKiBAZnVuY3Rpb24gZ2V0UGFpbnRTdHlsZXNcbiAqIEBwYXJhbSB7QXJyYXl9IHBhaW50U3R5bGVzIOKAkyB0aGUgcGFpbnRTdHlsZXMgZnJvbSB0aGUgZmlnbWEgZmlsZSAoc29tZWhvdyBzdGlsbCBjb25uZWN0ZWQpXG4gKi9cbmNvbnN0IGdldFBhaW50U3R5bGVzID0gKHN0eWxlcykgPT4ge1xuICAgIC8vIGluaXQgc3R5bGVBcnJheVxuICAgIGNvbnN0IHN0eWxlQXJyYXkgPSBbXTtcbiAgICAvLyBsb29wIHRocm91Z2ggRmlnbWEgc3R5bGVzIGFuZCBhZGQgdG8gYXJyYXlcbiAgICBzdHlsZXMuZm9yRWFjaChzdHlsZSA9PiB7XG4gICAgICAgIHN0eWxlQXJyYXkucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBzdHlsZS5uYW1lLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHN0eWxlLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgcGFpbnRzOiBzdHlsZS5wYWludHNcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy8gcmV0dXJuIGFycmF5XG4gICAgcmV0dXJuIHN0eWxlQXJyYXk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0UGFpbnRTdHlsZXM7XG4iLCIvKipcbiAqIEBmdW5jdGlvbiBnZXRUZXh0U3R5bGVzXG4gKiBAcGFyYW0ge0FycmF5PFRleHRTdHlsZT59IHN0eWxlcyDigJMgdGhlIHBhaW50U3R5bGVzIGZyb20gdGhlIGZpZ21hIGZpbGUgKHNvbWVob3cgc3RpbGwgY29ubmVjdGVkKVxuICovXG5jb25zdCBnZXRUZXh0U3R5bGVzID0gKHN0eWxlcykgPT4ge1xuICAgIC8vIGluaXQgc3R5bGVBcnJheVxuICAgIGNvbnN0IHN0eWxlQXJyYXkgPSBbXTtcbiAgICAvLyBsb29wIHRocm91Z2ggRmlnbWEgc3R5bGVzIGFuZCBhZGQgdG8gYXJyYXlcbiAgICBzdHlsZXMuZm9yRWFjaChzdHlsZSA9PiB7XG4gICAgICAgIHN0eWxlQXJyYXkucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBzdHlsZS5uYW1lLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHN0eWxlLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZm9udFNpemU6IHN0eWxlLmZvbnRTaXplLFxuICAgICAgICAgICAgdGV4dERlY29yYXRpb246IHN0eWxlLnRleHREZWNvcmF0aW9uLFxuICAgICAgICAgICAgZm9udE5hbWU6IHN0eWxlLmZvbnROYW1lLFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogc3R5bGUubGV0dGVyU3BhY2luZyxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IHN0eWxlLmxpbmVIZWlnaHQsXG4gICAgICAgICAgICBwYXJhZ3JhcGhJbmRlbnQ6IHN0eWxlLnBhcmFncmFwaEluZGVudCxcbiAgICAgICAgICAgIHBhcmFncmFwaFNwYWNpbmc6IHN0eWxlLnBhcmFncmFwaFNwYWNpbmcsXG4gICAgICAgICAgICB0ZXh0Q2FzZTogc3R5bGUudGV4dENhc2VcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy8gcmV0dXJuIGFycmF5XG4gICAgcmV0dXJuIHN0eWxlQXJyYXk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0VGV4dFN0eWxlcztcbiIsImltcG9ydCB7IGNvbnZlcnRQYWludFRvUmdiYSB9IGZyb20gJy4vY29udmVydENvbG9yJztcbi8vIHRoZSBub2RlIHR5cGVzIHRoYXQgY2FuIGJlIHVzZWQgZm9yIHRva2Vuc1xuY29uc3QgdG9rZW5Ob2RlVHlwZXMgPSBbXG4gICAgJ0NPTVBPTkVOVCcsXG4gICAgJ1JFQ1RBTkdMRScsXG4gICAgJ0ZSQU1FJ1xuXTtcbi8vIHRoZSBuYW1lIHRoYXQgdG9rZW4gZnJhbWVzIGhhdmVcbmNvbnN0IHRva2VuRnJhbWVOYW1lID0gJ190b2tlbnMnO1xuLy8gY2hlY2sgaWYgYSBmcmFtZSBpcyBhIF90b2tlbiBmcmFtZVxuY29uc3QgaXNUb2tlbkZyYW1lID0gKG5vZGUpID0+IG5vZGUudHlwZSA9PT0gJ0ZSQU1FJyAmJiBub2RlLm5hbWUudHJpbSgpLnRvTG93ZXJDYXNlKCkuc3Vic3RyKDAsIHRva2VuRnJhbWVOYW1lLmxlbmd0aCkgPT09IHRva2VuRnJhbWVOYW1lO1xuLy8gcmV0dXJuIG9ubHkgbm9kZXMgdGhhdCBhcmUgZnJhbWVzXG5jb25zdCBnZXRGcmFtZU5vZGVzID0gKG5vZGVzKSA9PiBub2Rlcy5tYXAocGFnZSA9PiBwYWdlLmZpbmRDaGlsZHJlbihub2RlID0+IGlzVG9rZW5GcmFtZShub2RlKSkpLnJlZHVjZSgoZmxhdHRlbiwgYXJyKSA9PiBbLi4uZmxhdHRlbiwgLi4uYXJyXSk7XG4vKipcbiAqIFJldHVybiBhbiBhcnJheSBvZiBzb2xpZCBzdHJva2UgY29sb3JzXG4gKi9cbmNvbnN0IGdldFNvbGlkU3Ryb2tlcyA9IChwYWludHMpID0+IHtcbiAgICAvLyBjbG9uZSB3aXRob3V0IHJlZmVyZW5jZVxuICAgIHJldHVybiBbLi4ucGFpbnRzXVxuICAgICAgICAubWFwKHBhaW50ID0+IGNvbnZlcnRQYWludFRvUmdiYShwYWludCkpO1xufTtcbi8qKlxuICogY2hlY2sgaWYgYSBub2RlIGlzIGEgdmFsaWQgdG9rZW4gbm9kZSB0eXBlXG4gKiBDdXJyZW50bHk6ICdDT01QT05FTlQnIG9yICdSRUNUQU5HTEUnXG4gKiBAcGFyYW0gU2NlbmVOb2RlIG5vZGVcbiAqL1xuY29uc3QgaXNUb2tlbk5vZGUgPSAobm9kZSkgPT4ge1xuICAgIHJldHVybiB0b2tlbk5vZGVUeXBlcy5pbmNsdWRlcyhub2RlLnR5cGUpO1xufTtcbi8qKlxuICogUmV0dXJucyBhbGwgZnJhbWVzIGZyb20gdGhlIGZpbGUgdGhhdCBoYXZlIGEgbmFtZSB0aGF0IHN0YXJ0cyB3aXRoIF90b2tlbnMgb3IgdGhlIHVzZXIgZGVmaW5lZCB0b2tlbiBzcGVjaWZpZXJcbiAqXG4gKiBAcGFyYW0gcGFnZXMgUGFnZU5vZGVzXG4gKi9cbmNvbnN0IGdldFRva2VuRnJhbWVzID0gKHBhZ2VzKSA9PiB7XG4gICAgLy8gZ2V0IHRva2VuIGZyYW1lc1xuICAgIGNvbnN0IHRva2VuRnJhbWVzID0gZ2V0RnJhbWVOb2RlcyhwYWdlcyk7XG4gICAgLy8gZ2V0IGFsbCBjaGlsZHJlbiBvZiB0b2tlbiBmcmFtZXNcbiAgICByZXR1cm4gdG9rZW5GcmFtZXMubWFwKGZyYW1lID0+IGZyYW1lXG4gICAgICAgIC8vIGNoZWNrIGlmIGNoaWxkcmVuIGFyZSBvZiB2YWxpZGUgdHlwZXNcbiAgICAgICAgLmZpbmRDaGlsZHJlbihcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIG5vZGUgPT4gaXNUb2tlbk5vZGUobm9kZSkpKVxuICAgICAgICAvLyBtZXJnZXMgYWxsIGNoaWxkcmVuIGludG8gb25lIGFycmF5XG4gICAgICAgIC5yZWR1Y2UoKGZsYXR0ZW4sIGFycikgPT4gWy4uLmZsYXR0ZW4sIC4uLmFycl0sIFtdKVxuICAgICAgICAvLyBleHBvcnRcbiAgICAgICAgLm1hcChub2RlID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6IG5vZGUubmFtZSxcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBub2RlLmRlc2NyaXB0aW9uIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGJvdHRvbUxlZnRSYWRpdXM6IG5vZGUuYm90dG9tTGVmdFJhZGl1cyxcbiAgICAgICAgICAgIGJvdHRvbVJpZ2h0UmFkaXVzOiBub2RlLmJvdHRvbVJpZ2h0UmFkaXVzLFxuICAgICAgICAgICAgdG9wTGVmdFJhZGl1czogbm9kZS50b3BMZWZ0UmFkaXVzLFxuICAgICAgICAgICAgdG9wUmlnaHRSYWRpdXM6IG5vZGUudG9wUmlnaHRSYWRpdXMsXG4gICAgICAgICAgICBjb3JuZXJSYWRpdXM6IG5vZGUuY29ybmVyUmFkaXVzIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGNvcm5lclNtb290aGluZzogbm9kZS5jb3JuZXJTbW9vdGhpbmcsXG4gICAgICAgICAgICBzdHJva2VzOiBnZXRTb2xpZFN0cm9rZXMobm9kZS5zdHJva2VzKSxcbiAgICAgICAgICAgIHN0cm9rZVdlaWdodDogbm9kZS5zdHJva2VXZWlnaHQsXG4gICAgICAgICAgICBzdHJva2VTdHlsZUlkOiBub2RlLnN0cm9rZVN0eWxlSWQsXG4gICAgICAgICAgICBzdHJva2VNaXRlckxpbWl0OiBub2RlLnN0cm9rZU1pdGVyTGltaXQsXG4gICAgICAgICAgICBzdHJva2VKb2luOiBub2RlLnN0cm9rZUpvaW4sXG4gICAgICAgICAgICBzdHJva2VDYXA6IG5vZGUuc3Ryb2tlQ2FwLFxuICAgICAgICAgICAgZGFzaFBhdHRlcm46IG5vZGUuZGFzaFBhdHRlcm4sXG4gICAgICAgICAgICBzdHJva2VBbGlnbjogbm9kZS5zdHJva2VBbGlnbixcbiAgICAgICAgICAgIHdpZHRoOiBub2RlLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBub2RlLmhlaWdodCxcbiAgICAgICAgICAgIHJlYWN0aW9uczogbm9kZS5yZWFjdGlvbnMgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgcGFkZGluZ1RvcDogbm9kZS5wYWRkaW5nVG9wIHx8IDAsXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IG5vZGUucGFkZGluZ1JpZ2h0IHx8IDAsXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBwYWRkaW5nQm90dG9tOiBub2RlLnBhZGRpbmdCb3R0b20gfHwgMCxcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiBub2RlLnBhZGRpbmdMZWZ0IHx8IDBcbiAgICAgICAgfTtcbiAgICB9KTtcbn07XG5leHBvcnQgZGVmYXVsdCBnZXRUb2tlbkZyYW1lcztcbmV4cG9ydCBjb25zdCBfX3Rlc3RpbmcgPSB7XG4gICAgaXNUb2tlbk5vZGU6IGlzVG9rZW5Ob2RlLFxuICAgIGlzVG9rZW5GcmFtZTogaXNUb2tlbkZyYW1lXG59O1xuIiwiaW1wb3J0IGV4dHJhY3RDb2xvcnMgZnJvbSAnLi4vZXh0cmFjdG9yL2V4dHJhY3RDb2xvcnMnO1xuaW1wb3J0IGV4dHJhY3RHcmlkcyBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdEdyaWRzJztcbmltcG9ydCBleHRyYWN0Rm9udHMgZnJvbSAnLi4vZXh0cmFjdG9yL2V4dHJhY3RGb250cyc7XG5pbXBvcnQgZXh0cmFjdEVmZmVjdHMgZnJvbSAnLi4vZXh0cmFjdG9yL2V4dHJhY3RFZmZlY3RzJztcbmltcG9ydCBleHRyYWN0TW90aW9uIGZyb20gJy4uL2V4dHJhY3Rvci9leHRyYWN0TW90aW9uJztcbmltcG9ydCBleHRyYWN0U2l6ZXMgZnJvbSAnLi4vZXh0cmFjdG9yL2V4dHJhY3RTaXplcyc7XG5pbXBvcnQgZXh0cmFjdFNwYWNpbmcgZnJvbSAnLi4vZXh0cmFjdG9yL2V4dHJhY3RTcGFjaW5nJztcbmltcG9ydCBleHRyYWN0Qm9yZGVycyBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdEJvcmRlcnMnO1xuaW1wb3J0IGV4dHJhY3RSYWRpaSBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdFJhZGlpJztcbmltcG9ydCBncm91cEJ5TmFtZSBmcm9tICcuL2dyb3VwQnlOYW1lJztcbmltcG9ydCBzdHlsZURpY3Rpb25hcnlUcmFuc2Zvcm1lciBmcm9tICcuLi90cmFuc2Zvcm1lci9zdHlsZURpY3Rpb25hcnlUcmFuc2Zvcm1lcic7XG5jb25zdCB0cmFuc2Zvcm1lciA9IHtcbiAgICBzdHlsZURpY3Rpb25hcnk6IHN0eWxlRGljdGlvbmFyeVRyYW5zZm9ybWVyXG59O1xuY29uc3QgZXhwb3J0UmF3VG9rZW5BcnJheSA9IChmaWdtYURhdGEpID0+IHtcbiAgICAvLyBnZXQgdG9rZW5zXG4gICAgcmV0dXJuIFtcbiAgICAgICAgLi4uZXh0cmFjdFNpemVzKGZpZ21hRGF0YS50b2tlbkZyYW1lcyksXG4gICAgICAgIC4uLmV4dHJhY3RTcGFjaW5nKGZpZ21hRGF0YS50b2tlbkZyYW1lcyksXG4gICAgICAgIC4uLmV4dHJhY3RCb3JkZXJzKGZpZ21hRGF0YS50b2tlbkZyYW1lcyksXG4gICAgICAgIC4uLmV4dHJhY3RSYWRpaShmaWdtYURhdGEudG9rZW5GcmFtZXMpLFxuICAgICAgICAuLi5leHRyYWN0TW90aW9uKGZpZ21hRGF0YS50b2tlbkZyYW1lcyksXG4gICAgICAgIC4uLmV4dHJhY3RDb2xvcnMoZmlnbWFEYXRhLnBhaW50U3R5bGVzKSxcbiAgICAgICAgLi4uZXh0cmFjdEdyaWRzKGZpZ21hRGF0YS5ncmlkU3R5bGVzKSxcbiAgICAgICAgLi4uZXh0cmFjdEZvbnRzKGZpZ21hRGF0YS50ZXh0U3R5bGVzKSxcbiAgICAgICAgLi4uZXh0cmFjdEVmZmVjdHMoZmlnbWFEYXRhLmVmZmVjdFN0eWxlcylcbiAgICBdO1xufTtcbmNvbnN0IGdldFRva2VuSnNvbiA9IChmaWdtYURhdGEsIGZvcm1hdCA9ICdzdHlsZURpY3Rpb25hcnknLCBuYW1lQ29udmVyc2lvbiA9ICdkZWZhdWx0JykgPT4ge1xuICAgIC8vIGdldCB0b2tlbiBhcnJheVxuICAgIGNvbnN0IHRva2VuQXJyYXkgPSBleHBvcnRSYXdUb2tlbkFycmF5KGZpZ21hRGF0YSk7XG4gICAgLy8gZm9ybWF0IHRva2Vuc1xuICAgIGNvbnN0IGZvcm1hdHRlZFRva2VucyA9IHRva2VuQXJyYXkubWFwKCh0b2tlbikgPT4gdHJhbnNmb3JtZXJbZm9ybWF0XSh0b2tlbikpO1xuICAgIC8vIGdyb3VwIHRva2Vuc1xuICAgIGNvbnN0IGdyb3VwZWRUb2tlbnMgPSBncm91cEJ5TmFtZShmb3JtYXR0ZWRUb2tlbnMsIHRydWUsIG5hbWVDb252ZXJzaW9uKTtcbiAgICAvLyByZXR1cm4gZ3JvdXAgdG9rZW5zXG4gICAgcmV0dXJuIGdyb3VwZWRUb2tlbnM7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0VG9rZW5Kc29uO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgc2VtVmVyRGlmZmVyZW5jZSBmcm9tICcuL3NlbVZlckRpZmZlcmVuY2UnO1xuaW1wb3J0IGN1cnJlbnRWZXJzaW9uIGZyb20gJy4vdmVyc2lvbic7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJztcbmNvbnN0IGdldFZlcnNpb25EaWZmZXJlbmNlID0gKGZpZ21hKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAvLyBnZXQgdmVyc2lvbiAmIHZlcnNpb24gZGlmZmVyZW5jZVxuICAgIGNvbnN0IGxhc3RWZXJzaW9uU2V0dGluZ3NPcGVuZWQgPSB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKGNvbmZpZy5rZXkubGFzdFZlcnNpb25TZXR0aW5nc09wZW5lZCk7XG4gICAgY29uc3QgdmVyc2lvbkRpZmZlcmVuY2UgPSBzZW1WZXJEaWZmZXJlbmNlKGN1cnJlbnRWZXJzaW9uLCBsYXN0VmVyc2lvblNldHRpbmdzT3BlbmVkKTtcbiAgICAvLyB1cGRhdGUgdmVyc2lvblxuICAgIGlmICghbGFzdFZlcnNpb25TZXR0aW5nc09wZW5lZCB8fCBsYXN0VmVyc2lvblNldHRpbmdzT3BlbmVkICE9PSBjdXJyZW50VmVyc2lvbikge1xuICAgICAgICB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKGNvbmZpZy5rZXkubGFzdFZlcnNpb25TZXR0aW5nc09wZW5lZCwgY3VycmVudFZlcnNpb24pO1xuICAgIH1cbiAgICAvLyByZXR1cm4gdmVyc2lvbiBEaWZmZXJlbmNlXG4gICAgcmV0dXJuIHZlcnNpb25EaWZmZXJlbmNlO1xufSk7XG5leHBvcnQgZGVmYXVsdCBnZXRWZXJzaW9uRGlmZmVyZW5jZTtcbiIsImltcG9ydCBkZWVwTWVyZ2UgZnJvbSAnLi9kZWVwTWVyZ2UnO1xuaW1wb3J0IHRyYW5zZm9ybU5hbWUgZnJvbSAnLi4vdXRpbGl0aWVzL3RyYW5zZm9ybU5hbWUnO1xuLy8gY3JlYXRlIGEgbmVzdGVkIG9iamVjdCBzdHJ1Y3R1cmUgZnJvbSB0aGUgYXJyYXkgKFsnc3R5bGUnLCdjb2xvcnMnLCdtYWluJywncmVkJ10pXG5jb25zdCBuZXN0ZWRPYmplY3RGcm9tQXJyYXkgPSAoYXJyYXksIHZhbHVlKSA9PiB7XG4gICAgLy8gcmVkdWNlclxuICAgIGNvbnN0IHJlZHVjZXIgPSAodmFsLCBrZXkpID0+ICh7IFtrZXldOiB2YWwgfSk7XG4gICAgLy8gcmV0dXJuIHJlZHVjZWQgYXJyYXlcbiAgICByZXR1cm4gYXJyYXkucmVkdWNlUmlnaHQocmVkdWNlciwgdmFsdWUpO1xufTtcbmNvbnN0IGdyb3VwQnlOYW1lID0gKHRva2VuQXJyYXksIHJlbW92ZU5hbWUgPSB0cnVlLCBuYW1lQ29udmVyc2lvbiA9ICdkZWZhdWx0JykgPT4ge1xuICAgIC8vIG5lc3QgdG9rZW5zIGludG8gb2JqZWN0IHdpdGggaGllcmFjaHkgZGVmaW5lZCBieSBuYW1lIHVzaW5nIC9cbiAgICBjb25zdCBncm91cGVkVG9rZW5zID0gdG9rZW5BcnJheS5tYXAodG9rZW4gPT4ge1xuICAgICAgICAvLyBzcGxpdCB0b2tlbiBuYW1lIGludG8gYXJyYXlcbiAgICAgICAgLy8gcmVtb3ZlIGxlYWRpbmcgYW5kIGZvbGxvd2luZyB3aGl0ZXNwYWNlIGZvciBldmVyeSBpdGVtXG4gICAgICAgIC8vIHRyYW5zZm9ybSBpdGVtcyB0byBsb3dlckNhc2VcbiAgICAgICAgY29uc3QgZ3JvdXBzRnJvbU5hbWUgPSB0b2tlbi5uYW1lLnNwbGl0KCcvJykubWFwKGdyb3VwID0+IHRyYW5zZm9ybU5hbWUoZ3JvdXAsIG5hbWVDb252ZXJzaW9uKSk7XG4gICAgICAgIC8vIHJlbW92ZSBuYW1lIGlmIG5vdCBvdGhlcndpc2Ugc3BlY2lmaWVkXG4gICAgICAgIGlmIChyZW1vdmVOYW1lID09PSB0cnVlKSB7XG4gICAgICAgICAgICBkZWxldGUgdG9rZW4ubmFtZTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZXR1cm5cbiAgICAgICAgcmV0dXJuIG5lc3RlZE9iamVjdEZyb21BcnJheShncm91cHNGcm9tTmFtZSwgdG9rZW4pO1xuICAgIH0pO1xuICAgIGlmIChncm91cGVkVG9rZW5zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gcmV0dXJuIG1lcmdlZCBvYmplY3Qgb2YgdG9rZW5zIGdyb3VwZWQgYnkgbmFtZSBoaWVyYWNoeVxuICAgICAgICByZXR1cm4gZ3JvdXBlZFRva2Vucy5yZWR1Y2UoKGFjY3VtdWxhdG9yID0ge30sIGN1cnJlbnRWYWx1ZSkgPT4gZGVlcE1lcmdlKGFjY3VtdWxhdG9yLCBjdXJyZW50VmFsdWUpKTtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xufTtcbmV4cG9ydCBkZWZhdWx0IGdyb3VwQnlOYW1lO1xuIiwiLyoqXG4gKiBJZiB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYSBudW1iZXJcbiAqIGl0IGlzIHJvdW5kZWQgdG8gMyBkZWNpbWFsIHBvc2l0aW9uc1xuICogb3RoZXJ3aXNlIGl0IGlzIHJldHVybmVkIGFzIGlzXG4gKiBAcGFyYW0gdmFsdWUgbnVtYmVyXG4gKiBAcGFyYW0gZGVjaW1hbFBsYWNlcyBpbnRcbiAqL1xuY29uc3Qgcm91bmRXaXRoRGVjaW1hbHMgPSAodmFsdWUsIGRlY2ltYWxQbGFjZXMgPSAyKSA9PiB7XG4gICAgLy8gZXhpdCBpZiB2YWx1ZSBpcyB1bmRlZmluZWRcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIGNoZWNrIGZvciBjb3JyZWN0IGlucHV0c1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInIHx8IHR5cGVvZiBkZWNpbWFsUGxhY2VzICE9PSAnbnVtYmVyJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcGFyYW1ldGVycywgYm90aCB2YWx1ZSBcIiR7dmFsdWV9XCIgKCR7dHlwZW9mIHZhbHVlfSkgYW5kIGRlY2ltYWxQbGFjZXMgXCIke2RlY2ltYWxQbGFjZXN9XCIgKCR7dHlwZW9mIGRlY2ltYWxQbGFjZXN9KSBtdXN0IGJlIG9mIHR5cGUgbnVtYmVyYCk7XG4gICAgfVxuICAgIC8vIHNldCBkZWNpbWFsIHBsYWNlc1xuICAgIGNvbnN0IGZhY3Rvck9mVGVuID0gTWF0aC5wb3coMTAsIGRlY2ltYWxQbGFjZXMpO1xuICAgIC8vIHJvdW5kIHJlc3VsdCBhbmQgcmV0dXJuXG4gICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiBmYWN0b3JPZlRlbikgLyBmYWN0b3JPZlRlbjtcbn07XG5leHBvcnQgZGVmYXVsdCByb3VuZFdpdGhEZWNpbWFscztcbiIsImV4cG9ydCBkZWZhdWx0IChjdXJyZW50U2VtVmVyLCBwcmV2U2VtVmVycyA9ICcxLjAuMCcpID0+IHtcbiAgICBjb25zdCBbcE1ham9yLCBwTWlub3IsIHBQYXRjaF0gPSBwcmV2U2VtVmVycy5zcGxpdCgnLicpO1xuICAgIGNvbnN0IFtjTWFqb3IsIGNNaW5vciwgY1BhdGNoXSA9IGN1cnJlbnRTZW1WZXIuc3BsaXQoJy4nKTtcbiAgICBpZiAocE1ham9yIDwgY01ham9yKSB7XG4gICAgICAgIHJldHVybiAnbWFqb3InO1xuICAgIH1cbiAgICBpZiAocE1pbm9yIDwgY01pbm9yKSB7XG4gICAgICAgIHJldHVybiAnbWlub3InO1xuICAgIH1cbiAgICBpZiAocFBhdGNoIDwgY1BhdGNoKSB7XG4gICAgICAgIHJldHVybiAncGF0Y2gnO1xuICAgIH1cbn07XG4iLCJpbXBvcnQgc2V0dGluZ3NEZWZhdWx0IGZyb20gJy4vc2V0dGluZ3NEZWZhdWx0JztcbmNvbnN0IHNldHRpbmdzS2V5ID0gJ3NldHRpbmdzJztcbi8qKlxuICogRnVuY3Rpb24gc2FuaXRpemVzIGFuZCBwcmVwYXJlcyBzZXR0aW5ncyB0byBiZSBzdG9yZWRcbiAqIEBwYXJhbSBuZXdTZXR0aW5nc1xuICogQHBhcmFtIGN1cnJlbnRTZXR0aW5nc1xuICovXG5jb25zdCBzZXR0aW5nc1ByZXBhcmUgPSAobmV3U2V0dGluZ3MsIGN1cnJlbnRTZXR0aW5ncykgPT4ge1xuICAgIC8vIGluaXRpYWxpemUgb2JqZWN0XG4gICAgY29uc3QgbWVyZ2VkU2V0dGluZ3MgPSB7fTtcbiAgICAvLyBhZGQgcHVibGljIHNldHRpbmdzXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc2V0dGluZ3NEZWZhdWx0KSkge1xuICAgICAgICAvLyBhdm9pZCBlbXB0eSB2YWx1ZXNcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZS5kZWZhdWx0ID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5lbXB0eSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmIChuZXdTZXR0aW5nc1trZXldLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICBuZXdTZXR0aW5nc1trZXldID0gY3VycmVudFNldHRpbmdzW2tleV0gfHwgdmFsdWUuZGVmYXVsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBpZiB2YWxpZCBuZXcgc2V0dGluZ3NcbiAgICAgICAgaWYgKHR5cGVvZiBuZXdTZXR0aW5nc1trZXldID09PSB0eXBlb2YgdmFsdWUuZGVmYXVsdCkge1xuICAgICAgICAgICAgbWVyZ2VkU2V0dGluZ3Nba2V5XSA9IG5ld1NldHRpbmdzW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgdmFsaWQgY3VycmVudCBzZXR0aW5nc1xuICAgICAgICBlbHNlIGlmICh0eXBlb2YgY3VycmVudFNldHRpbmdzW2tleV0gPT09IHR5cGVvZiB2YWx1ZS5kZWZhdWx0KSB7XG4gICAgICAgICAgICBtZXJnZWRTZXR0aW5nc1trZXldID0gY3VycmVudFNldHRpbmdzW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBpZiBib3RoIG5ldyBhbmQgb2xkIHZhbHVlIGRvbid0IGZpdCwgdXNlIGRlZmF1bHRcbiAgICAgICAgICAgIG1lcmdlZFNldHRpbmdzW2tleV0gPSB2YWx1ZS5kZWZhdWx0O1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIHJldHVybiBtZXJnZWQgc2V0dGluZ3Mgb2JqZWN0XG4gICAgcmV0dXJuIG1lcmdlZFNldHRpbmdzO1xufTtcbi8qKlxuICogZ2V0IHRoZSBjdXJyZW50IHVzZXJzIHNldHRpbmdzXG4gKiBmb3Igc2V0dGluZ3MgdGhhdCBhcmUgbm90IHNldCwgdGhlIGRlZmF1bHRzIHdpbGwgYmUgdXNlZFxuICogQHJldHVybiBvYmplY3RcbiAqL1xuY29uc3QgZ2V0U2V0dGluZ3MgPSAoKSA9PiB7XG4gICAgbGV0IHVzZXJTZXR0aW5ncyA9IGZpZ21hLnJvb3QuZ2V0UGx1Z2luRGF0YShzZXR0aW5nc0tleSk7XG4gICAgaWYgKHVzZXJTZXR0aW5ncy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHVzZXJTZXR0aW5ncyA9IEpTT04ucGFyc2UodXNlclNldHRpbmdzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHVzZXJTZXR0aW5ncyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgLy8gaW5pdCBzZXR0aW5ncyBvYmplY3RcbiAgICBjb25zdCBzZXR0aW5ncyA9IHt9O1xuICAgIC8vIGZpbGwgd2l0aCB1c2VyIHNldHRpbmdzIG9yIGRlZmF1bHRzXG4gICAgT2JqZWN0LmVudHJpZXMoc2V0dGluZ3NEZWZhdWx0KS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgaWYgKHVzZXJTZXR0aW5ncyAhPT0gdW5kZWZpbmVkICYmIHVzZXJTZXR0aW5nc1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBzZXR0aW5nc1trZXldID0gdXNlclNldHRpbmdzW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNldHRpbmdzW2tleV0gPSB2YWx1ZS5kZWZhdWx0O1xuICAgIH0pO1xuICAgIHJldHVybiBzZXR0aW5ncztcbn07XG4vKipcbiAqIEBuYW1lIHNhdmVTZXR0aW5nc1xuICogQGRlc2NyaXB0aW9uIHNhdmUgdGhlIHVzZXIgc2V0dGluZ3MgdG8gdGhlIFwiY2FjaGVcIlxuICogQHBhcmFtIHtVc2VyU2V0dGluZ3N9IHNldHRpbmdzXG4gKi9cbmNvbnN0IHNldFNldHRpbmdzID0gKHNldHRpbmdzKSA9PiB7XG4gICAgc2V0dGluZ3MgPSBzZXR0aW5nc1ByZXBhcmUoc2V0dGluZ3MsIGdldFNldHRpbmdzKCkpO1xuICAgIC8vIHN0b3JlIHB1YmxpYyBzZXR0aW5ncyB0aGF0IHNob3VsZCBiZSBzaGFyZWQgYWNyb3NzIG9yZ1xuICAgIGZpZ21hLnJvb3Quc2V0UGx1Z2luRGF0YShzZXR0aW5nc0tleSwgSlNPTi5zdHJpbmdpZnkoc2V0dGluZ3MsIG51bGwsIDIpKTtcbn07XG4vLyBleHBvcnRzXG5leHBvcnQgeyBzZXR0aW5nc0tleSwgZ2V0U2V0dGluZ3MsIHNldFNldHRpbmdzIH07XG5leHBvcnQgY29uc3QgX190ZXN0aW5nID0ge1xuICAgIHNldHRpbmdzUHJlcGFyZTogc2V0dGluZ3NQcmVwYXJlXG59O1xuIiwiLyogaXN0YW5idWwgaWdub3JlIGZpbGUgKi9cbi8vIHNldHRpbmdzIHN0cnVjdHVyZSAmIGRlZmF1bHQgdmFsdWVzXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZmlsZW5hbWU6IHtcbiAgICAgICAgZGVmYXVsdDogJ2Rlc2lnbi10b2tlbnMnLFxuICAgICAgICBlbXB0eTogZmFsc2VcbiAgICB9LFxuICAgIG5hbWVDb252ZXJzaW9uOiB7XG4gICAgICAgIGRlZmF1bHQ6ICdkZWZhdWx0JyxcbiAgICAgICAgZW1wdHk6IGZhbHNlXG4gICAgfSxcbiAgICBleGNsdWRlUHJlZml4OiB7XG4gICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgIGVtcHR5OiBmYWxzZVxuICAgIH0sXG4gICAgcHJlZml4OiB7XG4gICAgICAgIGRlZmF1bHQ6ICdfJyxcbiAgICAgICAgZW1wdHk6IGZhbHNlXG4gICAgfSxcbiAgICBzZXJ2ZXJVcmw6IHtcbiAgICAgICAgZGVmYXVsdDogJycsXG4gICAgICAgIGVtcHR5OiB0cnVlXG4gICAgfSxcbiAgICBldmVudFR5cGU6IHtcbiAgICAgICAgZGVmYXVsdDogJ3VwZGF0ZS10b2tlbnMnLFxuICAgICAgICBlbXB0eTogZmFsc2VcbiAgICB9LFxuICAgIGFjY2VwdEhlYWRlcjoge1xuICAgICAgICBkZWZhdWx0OiAnYXBwbGljYXRpb24vdm5kLmdpdGh1Yi5ldmVyZXN0LXByZXZpZXcranNvbicsXG4gICAgICAgIGVtcHR5OiB0cnVlXG4gICAgfSxcbiAgICBhdXRoVHlwZToge1xuICAgICAgICBkZWZhdWx0OiAndG9rZW4nLFxuICAgICAgICBlbXB0eTogZmFsc2VcbiAgICB9XG59O1xuIiwiY29uc3QgcmV0dXJuT3JUaHJvdyA9IChjb252ZXJ0ZWRTdHJpbmcsIG9yaWdpbmFsU3RyaW5nLCBzdHJpbmdDYXNlKSA9PiB7XG4gICAgLy8gcmV0dXJuIGNvbnZlcnRlZCBzdHJpbmcgaWYgc3VjY2Vzc2Z1bFxuICAgIGlmICh0eXBlb2YgY29udmVydGVkU3RyaW5nID09PSAnc3RyaW5nJyAmJiBjb252ZXJ0ZWRTdHJpbmcgIT09ICcnKSB7XG4gICAgICAgIHJldHVybiBjb252ZXJ0ZWRTdHJpbmc7XG4gICAgfVxuICAgIC8vIHRocm93IGVycm9yXG4gICAgdGhyb3cgbmV3IEVycm9yKGBjb252ZXJ0aW5nIFwiJHtvcmlnaW5hbFN0cmluZ31cIiB0byAke3N0cmluZ0Nhc2V9LCByZXN1bHRpbmcgaW4gXCIke2NvbnZlcnRlZFN0cmluZ31cImApO1xufTtcbmNvbnN0IHRvQ2FtZWxDYXNlID0gKHN0cmluZykgPT4ge1xuICAgIGNvbnN0IGNvbnZlcnRlZFN0cmluZyA9IHN0cmluZy50b0xvd2VyQ2FzZSgpXG4gICAgICAgIC5yZXBsYWNlKC9bJ1wiXS9nLCAnJylcbiAgICAgICAgLnJlcGxhY2UoLyhbLV8gXSl7MSx9L2csICcgJylcbiAgICAgICAgLnJlcGxhY2UoL1xcVysvZywgJyAnKVxuICAgICAgICAudHJpbSgpXG4gICAgICAgIC5yZXBsYWNlKC8gKC4pL2csIGZ1bmN0aW9uICgkMSkgeyByZXR1cm4gJDEudG9VcHBlckNhc2UoKTsgfSlcbiAgICAgICAgLnJlcGxhY2UoLyAvZywgJycpO1xuICAgIC8vIHJldHVybiBvciB0aHJvd1xuICAgIHJldHVybiByZXR1cm5PclRocm93KGNvbnZlcnRlZFN0cmluZywgc3RyaW5nLCAnY2FtZWxDYXNlJyk7XG59O1xuY29uc3QgdG9LZWJhYkNhc2UgPSAoc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgY29udmVydGVkU3RyaW5nID0gc3RyaW5nLnRvTG93ZXJDYXNlKClcbiAgICAgICAgLnJlcGxhY2UoL1snXCJdL2csICcnKVxuICAgICAgICAucmVwbGFjZSgvKFstXyBdKXsxLH0vZywgJyAnKVxuICAgICAgICAucmVwbGFjZSgvXFxXKy9nLCAnICcpXG4gICAgICAgIC50cmltKClcbiAgICAgICAgLnJlcGxhY2UoLyAvZywgJy0nKTtcbiAgICAvLyByZXR1cm4gb3IgdGhyb3dcbiAgICByZXR1cm4gcmV0dXJuT3JUaHJvdyhjb252ZXJ0ZWRTdHJpbmcsIHN0cmluZywgJ2tlYmFiQ2FzZScpO1xufTtcbmNvbnN0IHRyYW5zZm9ybU5hbWUgPSAobmFtZSwgbmFtZUNvbnZlcnNpb24gPSAnZGVmYXVsdCcpID0+IHtcbiAgICAvLyBpZiBjYW1lbENhc2VcbiAgICBpZiAobmFtZUNvbnZlcnNpb24gPT09ICdjYW1lbENhc2UnKSB7XG4gICAgICAgIHJldHVybiB0b0NhbWVsQ2FzZShuYW1lKTtcbiAgICB9XG4gICAgLy8gaWYga2ViYWJDYXNlXG4gICAgaWYgKG5hbWVDb252ZXJzaW9uID09PSAna2ViYWJDYXNlJykge1xuICAgICAgICByZXR1cm4gdG9LZWJhYkNhc2UobmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBuYW1lLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xufTtcbmV4cG9ydCBkZWZhdWx0IHRyYW5zZm9ybU5hbWU7XG5leHBvcnQgY29uc3QgX190ZXN0aW5nID0ge1xuICAgIHRvQ2FtZWxDYXNlOiB0b0NhbWVsQ2FzZSxcbiAgICB0b0tlYmFiQ2FzZTogdG9LZWJhYkNhc2Vcbn07XG4iLCIvKiBpc3RhbmJ1bCBpZ25vcmUgZmlsZSAqL1xuY29uc3QgdmVyc2lvbiA9ICczLjAuMCc7XG5leHBvcnQgZGVmYXVsdCB2ZXJzaW9uO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==