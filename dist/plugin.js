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

/***/ "./src/utilities/extractTokenNodes.ts":
/*!********************************************!*\
  !*** ./src/utilities/extractTokenNodes.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _convertColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./convertColor */ "./src/utilities/convertColor.ts");

/**
 * Return an array of solid stroke colors
 */
const getSolidStrokes = (paints) => {
    // clone without reference
    return [...paints]
        .map(paint => Object(_convertColor__WEBPACK_IMPORTED_MODULE_0__["convertPaintToRgba"])(paint));
};
/**
 * extractTokenNode
 * @param node: SceneNode
 * @returns node object
 */
const extractTokenNode = (node) => ({
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
});
/* harmony default export */ __webpack_exports__["default"] = (extractTokenNode);


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
/* harmony import */ var _extractTokenNodes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extractTokenNodes */ "./src/utilities/extractTokenNodes.ts");

// the node types that can be used for tokens
const tokenNodeTypes = [
    'COMPONENT',
    'COMPONENT_SET',
    'RECTANGLE',
    'FRAME'
];
// the name that token frames have
const tokenFrameName = '_tokens';
// check if a frame is a _token frame
const isTokenFrame = (node) => node.type === 'FRAME' && node.name.trim().toLowerCase().substr(0, tokenFrameName.length) === tokenFrameName;
// return only nodes that are frames
const getFrameNodes = (nodes) => [...nodes.map(page => page.findChildren(node => isTokenFrame(node))).reduce((flatten, arr) => [...flatten, ...arr])];
/**
 * check if a node is a valid token node type
 * Currently: 'COMPONENT' or 'RECTANGLE'
 * @param SceneNode node
 */
const isTokenNode = (node) => {
    return tokenNodeTypes.includes(node.type);
};
/**
 * getVariantName
 * creates the variant name of the parent and child name
 */
const getVariantName = (parentName, childName) => {
    // split into array
    childName = childName.split(',')
        // remove hidden names
        .filter(part => !['_', '.'].includes(part.trim().substr(0, 1)))
        // cleanup names, only return value part
        .map(part => part.split('=')[1])
        // combine
        .join('/');
    // return full name
    return `${parentName}/${childName}`;
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
        // unpack variants & warn about deprecated types
        .map((item) => {
        if (item.type === 'RECTANGLE' || item.type === 'FRAME') {
            console.warn('Please use only main components and variants, other types may be deprecated as tokens in the future');
        }
        // unpack variants
        if (item.type === 'COMPONENT_SET') {
            // TODO: Name is overwriting real object in figma
            // -> create clone and move to new array to return
            return item.children.map((child) => (Object.assign(Object.assign({}, Object(_extractTokenNodes__WEBPACK_IMPORTED_MODULE_0__["default"])(child)), { name: getVariantName(item.name, child.name) })));
        }
        // return normal item as array to unpack later
        // @ts-ignore
        return [Object(_extractTokenNodes__WEBPACK_IMPORTED_MODULE_0__["default"])(item)];
    })
        // merges the variant children into one array
        .reduce((flatten, arr) => [...flatten, ...arr], []);
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
const version = '3.0.1';
/* harmony default export */ __webpack_exports__["default"] = (version);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0Qm9yZGVycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RDb2xvcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0RWZmZWN0cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RGb250cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RHcmlkcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RNb3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0UmFkaWkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0U2l6ZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0U3BhY2luZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVyL3N0eWxlRGljdGlvbmFyeVRyYW5zZm9ybWVyLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lci91dGlsaXRpZXMvZ2V0RGVzY3JpcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9hY2Nlc3NUb2tlbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2J1aWxkRmlnbWFEYXRhLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvY29uZmlnLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvY29udmVydENvbG9yLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvZGVlcE1lcmdlLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvZXh0cmFjdFRva2VuTm9kZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9maWx0ZXJCeU5hbWVQcm9wZXJ0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2dldEVmZmVjdFN0eWxlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2dldEZpbGVJZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2dldEdyaWRTdHlsZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9nZXRKc29uLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvZ2V0UGFpbnRTdHlsZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9nZXRUZXh0U3R5bGVzLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvZ2V0VG9rZW5GcmFtZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9nZXRUb2tlbkpzb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9nZXRWZXJzaW9uRGlmZmVyZW5jZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2dyb3VwQnlOYW1lLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvcm91bmRXaXRoRGVjaW1hbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9zZW1WZXJEaWZmZXJlbmNlLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvc2V0dGluZ3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9zZXR0aW5nc0RlZmF1bHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy90cmFuc2Zvcm1OYW1lLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvdmVyc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FB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RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNlLDJFQUFZLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUN2RDVCO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhLEVB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O0FBQ0E7QUFDZSw0RUFBYSxFQUFDO0FBQ3RCO0FBQ1A7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDNUNBO0FBQUE7QUFDQTtBQUNlLHNFQUFPLEVBQUMiLCJmaWxlIjoicGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgcm91bmRXaXRoRGVjaW1hbHMgZnJvbSAnLi4vdXRpbGl0aWVzL3JvdW5kV2l0aERlY2ltYWxzJztcbmNvbnN0IHN0cm9rZUpvaW5zID0ge1xuICAgIE1JVEVSOiAnbWl0ZXInLFxuICAgIEJFVkVMOiAnYmV2ZWwnLFxuICAgIFJPVU5EOiAncm91bmQnXG59O1xuY29uc3Qgc3Ryb2tlQWxpZ25zID0ge1xuICAgIENFTlRFUjogJ2NlbnRlcicsXG4gICAgSU5TSURFOiAnaW5zaWRlJyxcbiAgICBPVVRTSURFOiAnb3V0c2lkZSdcbn07XG5jb25zdCBleHRyYWN0Qm9yZGVycyA9ICh0b2tlbk5vZGVzKSA9PiB7XG4gICAgY29uc3Qgbm9kZU5hbWUgPSAnYm9yZGVycyc7XG4gICAgLy8gcmV0dXJuIGFzIG9iamVjdFxuICAgIHJldHVybiB0b2tlbk5vZGVzXG4gICAgICAgIC8vIG9ubHkgZ2V0IGJvcmRlciBub2Rlc1xuICAgICAgICAuZmlsdGVyKG5vZGUgPT4gbm9kZS5uYW1lLnN1YnN0cigwLCBub2RlTmFtZS5sZW5ndGgpID09PSBub2RlTmFtZSlcbiAgICAgICAgLy8gcmVtb3ZlIG5vZGVzIHdpdGggbm8gYm9yZGVyIHByb3BlcnR5XG4gICAgICAgIC5maWx0ZXIobm9kZSA9PiBub2RlLnN0cm9rZXMubGVuZ3RoID4gMClcbiAgICAgICAgLy8gY29udmVydCBib3JkZXJzXG4gICAgICAgIC5tYXAobm9kZSA9PiAoe1xuICAgICAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgICAgIGNhdGVnb3J5OiAnYm9yZGVyJyxcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHN0cm9rZUFsaWduOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHN0cm9rZUFsaWduc1tub2RlLnN0cm9rZUFsaWduXSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhc2hQYXR0ZXJuOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG5vZGUuZGFzaFBhdHRlcm4udG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0cm9rZUNhcDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiAoKHR5cGVvZiBub2RlLnN0cm9rZUNhcCA9PT0gJ3N0cmluZycpID8gbm9kZS5zdHJva2VDYXAudG9Mb3dlckNhc2UoKSA6ICdtaXhlZCcpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3Ryb2tlSm9pbjoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBzdHJva2VKb2luc1tub2RlLnN0cm9rZUpvaW5dLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3Ryb2tlTWl0ZXJMaW1pdDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLnN0cm9rZU1pdGVyTGltaXQpLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdkZWdyZWUnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gc3Ryb2tlU3R5bGVJZDoge1xuICAgICAgICAgICAgLy8gICB2YWx1ZTogbm9kZS5zdHJva2VTdHlsZUlkXG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgc3Ryb2tlV2VpZ2h0OiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG5vZGUuc3Ryb2tlV2VpZ2h0LFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdHJva2U6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbm9kZS5zdHJva2VzWzBdLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdjb2xvcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0Qm9yZGVycztcbiIsImltcG9ydCB7IGNvbnZlcnRQYWludFRvUmdiYSwgcm91bmRSZ2JhIH0gZnJvbSAnLi4vdXRpbGl0aWVzL2NvbnZlcnRDb2xvcic7XG5pbXBvcnQgcm91bmRXaXRoRGVjaW1hbHMgZnJvbSAnLi4vdXRpbGl0aWVzL3JvdW5kV2l0aERlY2ltYWxzJztcbmNvbnN0IGdyYWRpZW50VHlwZSA9IHtcbiAgICBHUkFESUVOVF9MSU5FQVI6ICdsaW5lYXInLFxuICAgIEdSQURJRU5UX1JBRElBTDogJ3JhZGlhbCcsXG4gICAgR1JBRElFTlRfQU5HVUxBUjogJ2FuZ3VsYXInLFxuICAgIEdSQURJRU5UX0RJQU1PTkQ6ICdkaWFtb25kJ1xufTtcbmNvbnN0IGV4dHJhY3RGaWxscyA9IChwYWludCkgPT4ge1xuICAgIGlmIChwYWludC50eXBlID09PSAnU09MSUQnKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmaWxsOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGNvbnZlcnRQYWludFRvUmdiYShwYWludCksXG4gICAgICAgICAgICAgICAgdHlwZTogJ2NvbG9yJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoWydHUkFESUVOVF9MSU5FQVInLCAnR1JBRElFTlRfUkFESUFMJywgJ0dSQURJRU5UX0FOR1VMQVInLCAnR1JBRElFTlRfRElBTU9ORCddLmluY2x1ZGVzKHBhaW50LnR5cGUpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBncmFkaWVudFR5cGU6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogZ3JhZGllbnRUeXBlW3BhaW50LnR5cGVdLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RvcHM6IHBhaW50LmdyYWRpZW50U3RvcHMubWFwKHN0b3AgPT4gKHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMoc3RvcC5wb3NpdGlvbiksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb2xvcjoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRSZ2JhKHN0b3AuY29sb3IpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgb3BhY2l0eToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhwYWludC5vcGFjaXR5KSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICAvLyByZXR1cm4gbnVsbCBpZiBubyBtYXRjaGluZyB0eXBlXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICByZXR1cm4gbnVsbDtcbn07XG5jb25zdCBleHRyYWN0Q29sb3JzID0gKHRva2VuTm9kZXMpID0+IHtcbiAgICAvLyBnZXQgYWxsIHBhaW50IHN0eWxlc1xuICAgIHJldHVybiB0b2tlbk5vZGVzXG4gICAgICAgIC8vIHJlbW92ZSBpbWFnZXMgZmlsbHMgZnJvbSB0b2tlbnNcbiAgICAgICAgLm1hcChub2RlID0+IHtcbiAgICAgICAgbm9kZS5wYWludHMgPSBub2RlLnBhaW50cy5maWx0ZXIocGFpbnQgPT4gcGFpbnQudHlwZSAhPT0gJ0lNQUdFJyk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH0pXG4gICAgICAgIC8vIHJlbW92ZSB0b2tlbnMgd2l0aCBubyBmaWxsXG4gICAgICAgIC5maWx0ZXIobm9kZSA9PiBub2RlLnBhaW50cy5sZW5ndGggPiAwKVxuICAgICAgICAvLyB0cmFuc2Zvcm0gc3R5bGVcbiAgICAgICAgLm1hcChub2RlID0+ICh7XG4gICAgICAgIG5hbWU6IG5vZGUubmFtZSxcbiAgICAgICAgLy8gaWQ6IG5vZGUuaWQsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBub2RlLmRlc2NyaXB0aW9uIHx8IG51bGwsXG4gICAgICAgIGNhdGVnb3J5OiAnZmlsbCcsXG4gICAgICAgIHZhbHVlczogbm9kZS5wYWludHMubWFwKHBhaW50ID0+IGV4dHJhY3RGaWxscyhwYWludCkpXG4gICAgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3RDb2xvcnM7XG4iLCJpbXBvcnQgeyByb3VuZFJnYmEgfSBmcm9tICcuLi91dGlsaXRpZXMvY29udmVydENvbG9yJztcbmNvbnN0IGVmZmVjdFR5cGUgPSB7XG4gICAgTEFZRVJfQkxVUjogJ2xheWVyQmx1cicsXG4gICAgQkFDS0dST1VORF9CTFVSOiAnYmFja2dyb3VuZEJsdXInLFxuICAgIERST1BfU0hBRE9XOiAnZHJvcFNoYWRvdycsXG4gICAgSU5ORVJfU0hBRE9XOiAnaW5uZXJTaGFkb3cnXG59O1xuY29uc3QgYmx1clZhbHVlcyA9IChlZmZlY3QpID0+ICh7XG4gICAgdHlwZToge1xuICAgICAgICB2YWx1ZTogZWZmZWN0VHlwZVtlZmZlY3QudHlwZV0sXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgfSxcbiAgICByYWRpdXM6IHtcbiAgICAgICAgdmFsdWU6IGVmZmVjdC5yYWRpdXMsXG4gICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgfVxufSk7XG5jb25zdCBzaGFkb3dWYWx1ZXMgPSBlZmZlY3QgPT4gKHtcbiAgICB0eXBlOiB7XG4gICAgICAgIHZhbHVlOiBlZmZlY3RUeXBlW2VmZmVjdC50eXBlXSxcbiAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICB9LFxuICAgIHJhZGl1czoge1xuICAgICAgICB2YWx1ZTogZWZmZWN0LnJhZGl1cyxcbiAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICB9LFxuICAgIGNvbG9yOiB7XG4gICAgICAgIHZhbHVlOiByb3VuZFJnYmEoZWZmZWN0LmNvbG9yKSxcbiAgICAgICAgdHlwZTogJ2NvbG9yJ1xuICAgIH0sXG4gICAgb2Zmc2V0OiB7XG4gICAgICAgIHg6IHtcbiAgICAgICAgICAgIHZhbHVlOiBlZmZlY3Qub2Zmc2V0LngsXG4gICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgeToge1xuICAgICAgICAgICAgdmFsdWU6IGVmZmVjdC5vZmZzZXQueSxcbiAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBzcHJlYWQ6IHtcbiAgICAgICAgdmFsdWU6IGVmZmVjdC5zcHJlYWQsXG4gICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgfVxufSk7XG5jb25zdCBleHRyYWN0RWZmZWN0cyA9ICh0b2tlbk5vZGVzKSA9PiB7XG4gICAgLy8gZ2V0IGVmZmVjdCBzdHlsZXNcbiAgICByZXR1cm4gdG9rZW5Ob2Rlcy5tYXAobm9kZSA9PiAoe1xuICAgICAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBub2RlLmRlc2NyaXB0aW9uIHx8IG51bGwsXG4gICAgICAgIGNhdGVnb3J5OiAnZWZmZWN0JyxcbiAgICAgICAgdmFsdWVzOiBub2RlLmVmZmVjdHMubWFwKChlZmZlY3QpID0+IGVmZmVjdC50eXBlID09PSAnTEFZRVJfQkxVUicgfHwgZWZmZWN0LnR5cGUgPT09ICdCQUNLR1JPVU5EX0JMVVInXG4gICAgICAgICAgICA/IGJsdXJWYWx1ZXMoZWZmZWN0KVxuICAgICAgICAgICAgOiBzaGFkb3dWYWx1ZXMoZWZmZWN0KSlcbiAgICB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZXh0cmFjdEVmZmVjdHM7XG4iLCJpbXBvcnQgcm91bmRXaXRoRGVjaW1hbHMgZnJvbSAnLi4vdXRpbGl0aWVzL3JvdW5kV2l0aERlY2ltYWxzJztcbmNvbnN0IHRleHREZWNvcmF0aW9ucyA9IHtcbiAgICBOT05FOiAnbm9uZScsXG4gICAgVU5ERVJMSU5FOiAndW5kZXJsaW5lJyxcbiAgICBTVFJJS0VUSFJPVUdIOiAnbGluZS10aHJvdWdoJ1xufTtcbmNvbnN0IHRleHRDYXNlcyA9IHtcbiAgICBPUklHSU5BTDogJ25vbmUnLFxuICAgIFVQUEVSOiAndXBwZXJjYXNlJyxcbiAgICBMT1dFUjogJ2xvd2VyY2FzZScsXG4gICAgVElUTEU6ICdjYXBpdGFsaXplJ1xufTtcbmNvbnN0IGZvbnRXZWlnaHRzID0ge1xuICAgIHRoaW46IDEwMCxcbiAgICBleHRyYWxpZ2h0OiAyMDAsXG4gICAgdWx0cmFsaWdodDogMjAwLFxuICAgIGxpZ2h0OiAzMDAsXG4gICAgbm9ybWFsOiA0MDAsXG4gICAgcmVndWxhcjogNDAwLFxuICAgIG1lZGl1bTogNTAwLFxuICAgIHNlbWlib2xkOiA2MDAsXG4gICAgZGVtaWJvbGQ6IDYwMCxcbiAgICBib2xkOiA3MDAsXG4gICAgZXh0cmFib2xkOiA4MDAsXG4gICAgdWx0YWJvbGQ6IDgwMCxcbiAgICBibGFjazogOTAwLFxuICAgIGhlYXZ5OiA5MDAsXG4gICAgc3VwZXI6IDkwMFxufTtcbmNvbnN0IGZvbnRTdHJldGNoID0ge1xuICAgIG5vcm1hbDogJ25vcm1hbCcsXG4gICAgY29uZGVuc2VkOiAnY29uZGVuc2VkJyxcbiAgICBleHBhbmRlZDogJ2V4cGFuZGVkJyxcbiAgICBleHRlbmRlZDogJ2V4cGFuZGVkJ1xufTtcbmNvbnN0IGZvbnRTdHlsZXMgPSB7XG4gICAgbm9ybWFsOiAnbm9ybWFsJyxcbiAgICBpdGFsaWM6ICdpdGFsaWMnLFxuICAgIG9ibGlxdWU6ICdvYmxpcXVlJ1xufTtcbmNvbnN0IHBhcnNlRm9udFdlaWdodCA9IChmb250U3R5bGUpID0+IHtcbiAgICBjb25zdCBwYXJ0cyA9IGZvbnRTdHlsZS50b0xvd2VyQ2FzZSgpLnNwbGl0KCcgJyk7XG4gICAgbGV0IHdlaWdodCA9IHBhcnRzWzBdO1xuICAgIC8vIG1lcmdlIGlmIHNwYWNlIGFmdGVyIGV4dHJhXG4gICAgaWYgKFsnZXh0cmEnLCAndWx0cmEnLCAnc2VtaScsICdkZW1pJ10uaW5jbHVkZXMocGFydHNbMF0pICYmIFsnYm9sZCcsICdsaWdodCddLmluY2x1ZGVzKHBhcnRzWzFdKSkge1xuICAgICAgICB3ZWlnaHQgPSBgJHtwYXJ0c1swXX0ke3BhcnRzWzFdfWA7XG4gICAgfVxuICAgIHJldHVybiBmb250V2VpZ2h0c1t3ZWlnaHRdIHx8IDQwMDtcbn07XG5jb25zdCBwYXJzZUZvbnRTdHJldGNoID0gKGZvbnRTdHlsZSkgPT4ge1xuICAgIGNvbnN0IHBhcnRzID0gZm9udFN0eWxlLnRvTG93ZXJDYXNlKCkuc3BsaXQoJyAnKTtcbiAgICByZXR1cm4gZm9udFN0cmV0Y2hbcGFydHNbcGFydHMubGVuZ3RoIC0gMV1dIHx8IGZvbnRTdHJldGNoW3BhcnRzW3BhcnRzLmxlbmd0aCAtIDJdXSB8fCAnbm9ybWFsJztcbn07XG5jb25zdCBwYXJzZUZvbnRTdHlsZSA9IChmb250U3R5bGUpID0+IHtcbiAgICBjb25zdCBwYXJ0ID0gZm9udFN0eWxlLnRvTG93ZXJDYXNlKCkuc3BsaXQoJyAnKS5wb3AoKTtcbiAgICByZXR1cm4gZm9udFN0eWxlc1twYXJ0XSB8fCAnbm9ybWFsJztcbn07XG5jb25zdCBleHRyYWN0Rm9udHMgPSAodG9rZW5Ob2RlcykgPT4ge1xuICAgIC8vIGdldCByYXcgdGV4dCBzdHlsZXNcbiAgICByZXR1cm4gdG9rZW5Ob2Rlcy5tYXAobm9kZSA9PiAoe1xuICAgICAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBub2RlLmRlc2NyaXB0aW9uIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgY2F0ZWdvcnk6ICdmb250JyxcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICBmb250U2l6ZToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLmZvbnRTaXplLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZXh0RGVjb3JhdGlvbjoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB0ZXh0RGVjb3JhdGlvbnNbbm9kZS50ZXh0RGVjb3JhdGlvbl0sXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb250RmFtaWx5OiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG5vZGUuZm9udE5hbWUuZmFtaWx5LFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9udFdlaWdodDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBwYXJzZUZvbnRXZWlnaHQobm9kZS5mb250TmFtZS5zdHlsZSksXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb250U3R5bGU6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcGFyc2VGb250U3R5bGUobm9kZS5mb250TmFtZS5zdHlsZSksXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb250U3RyZXRjaDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBwYXJzZUZvbnRTdHJldGNoKG5vZGUuZm9udE5hbWUuc3R5bGUpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2ZvbnRTdHlsZU9sZDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLmZvbnROYW1lLnN0eWxlLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLmxldHRlclNwYWNpbmcudmFsdWUpLFxuICAgICAgICAgICAgICAgIHVuaXQ6IG5vZGUubGV0dGVyU3BhY2luZy51bml0LnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLmxpbmVIZWlnaHQudmFsdWUpIHx8ICdub3JtYWwnLFxuICAgICAgICAgICAgICAgIHVuaXQ6IG5vZGUubGluZUhlaWdodC51bml0LnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgdHlwZTogKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChub2RlLmxpbmVIZWlnaHQsICd2YWx1ZScpID8gJ251bWJlcicgOiAnc3RyaW5nJylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXJhZ3JhcGhJbmRlbnQ6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbm9kZS5wYXJhZ3JhcGhJbmRlbnQsXG4gICAgICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhcmFncmFwaFNwYWNpbmc6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbm9kZS5wYXJhZ3JhcGhTcGFjaW5nLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZXh0Q2FzZToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB0ZXh0Q2FzZXNbbm9kZS50ZXh0Q2FzZV0sXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0Rm9udHM7XG4iLCJjb25zdCBncmlkVmFsdWVzID0gKGdyaWQpID0+ICh7XG4gICAgcGF0dGVybjoge1xuICAgICAgICB2YWx1ZTogZ3JpZC5wYXR0ZXJuLnRvTG93ZXJDYXNlKCksXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgfSxcbiAgICBzZWN0aW9uU2l6ZToge1xuICAgICAgICB2YWx1ZTogZ3JpZC5zZWN0aW9uU2l6ZSxcbiAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICB9XG59KTtcbmNvbnN0IGdldENvdW50ID0gY291bnQgPT4ge1xuICAgIGlmIChjb3VudCA9PT0gSW5maW5pdHkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiAnYXV0bycsXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogY291bnQsXG4gICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgfTtcbn07XG5jb25zdCByb3dDb2x1bW5WYWx1ZXMgPSAoZ3JpZCkgPT4gKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHsgcGF0dGVybjoge1xuICAgICAgICB2YWx1ZTogZ3JpZC5wYXR0ZXJuLnRvTG93ZXJDYXNlKCksXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgfSB9LCAoZ3JpZC5zZWN0aW9uU2l6ZSAhPT0gdW5kZWZpbmVkICYmIHtcbiAgICBzZWN0aW9uU2l6ZToge1xuICAgICAgICB2YWx1ZTogZ3JpZC5zZWN0aW9uU2l6ZSxcbiAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICB9XG59KSksIHsgZ3V0dGVyU2l6ZToge1xuICAgICAgICB2YWx1ZTogZ3JpZC5ndXR0ZXJTaXplLFxuICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgIH0sIGFsaWdubWVudDoge1xuICAgICAgICB2YWx1ZTogZ3JpZC5hbGlnbm1lbnQudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICB9LCBjb3VudDogZ2V0Q291bnQoZ3JpZC5jb3VudCkgfSksIChncmlkLm9mZnNldCAhPT0gdW5kZWZpbmVkICYmIHtcbiAgICBvZmZzZXQ6IHtcbiAgICAgICAgdmFsdWU6IGdyaWQub2Zmc2V0LFxuICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgIH1cbn0pKSk7XG5jb25zdCBleHRyYWN0R3JpZHMgPSAodG9rZW5Ob2RlcykgPT4ge1xuICAgIC8vIGdldCBncmlkIHN0eWxlc1xuICAgIHJldHVybiB0b2tlbk5vZGVzLm1hcChub2RlID0+ICh7XG4gICAgICAgIG5hbWU6IG5vZGUubmFtZSxcbiAgICAgICAgZGVzY3JpcHRpb246IG5vZGUuZGVzY3JpcHRpb24gfHwgbnVsbCxcbiAgICAgICAgY2F0ZWdvcnk6ICdncmlkJyxcbiAgICAgICAgdmFsdWVzOiBub2RlLmxheW91dEdyaWRzLm1hcCgoZ3JpZCkgPT4gZ3JpZC5wYXR0ZXJuID09PSAnR1JJRCcgPyBncmlkVmFsdWVzKGdyaWQpIDogcm93Q29sdW1uVmFsdWVzKGdyaWQpKVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0R3JpZHM7XG4iLCJjb25zdCBkaXJlY3Rpb24gPSAodHJhbnNpdGlvbikgPT4ge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodHJhbnNpdGlvbiwgJ2RpcmVjdGlvbicpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkaXJlY3Rpb246IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdHJhbnNpdGlvbi5kaXJlY3Rpb24udG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn07XG5jb25zdCBlYXNpbmdzID0ge1xuICAgIENVU1RPTV9DVUJJQ19CRVpJRVI6IHt9LFxuICAgIExJTkVBUjoge1xuICAgICAgICB0eXBlOiAnbGluZWFyJyxcbiAgICAgICAgZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllcjoge1xuICAgICAgICAgICAgeDE6IDAsXG4gICAgICAgICAgICB5MTogMCxcbiAgICAgICAgICAgIHgyOiAxLFxuICAgICAgICAgICAgeTI6IDFcbiAgICAgICAgfVxuICAgIH0sXG4gICAgRUFTRV9JTjoge1xuICAgICAgICB0eXBlOiAnZWFzZS1pbicsXG4gICAgICAgIGVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXI6IHtcbiAgICAgICAgICAgIHgxOiAwLjQxOTk5OTk4Njg4Njk3ODE1LFxuICAgICAgICAgICAgeTE6IDAsXG4gICAgICAgICAgICB4MjogMSxcbiAgICAgICAgICAgIHkyOiAxXG4gICAgICAgIH1cbiAgICB9LFxuICAgIEVBU0VfT1VUOiB7XG4gICAgICAgIHR5cGU6ICdlYXNlLW91dCcsXG4gICAgICAgIGVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXI6IHtcbiAgICAgICAgICAgIHgxOiAwLFxuICAgICAgICAgICAgeTE6IDAsXG4gICAgICAgICAgICB4MjogMC41Nzk5OTk5ODMzMTA2OTk1LFxuICAgICAgICAgICAgeTI6IDFcbiAgICAgICAgfVxuICAgIH0sXG4gICAgRUFTRV9JTl9BTkRfT1VUOiB7XG4gICAgICAgIHR5cGU6ICdlYXNlLWluLW91dCcsXG4gICAgICAgIGVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXI6IHtcbiAgICAgICAgICAgIHgxOiAwLjQxOTk5OTk4Njg4Njk3ODE1LFxuICAgICAgICAgICAgeTE6IDAsXG4gICAgICAgICAgICB4MjogMC41Nzk5OTk5ODMzMTA2OTk1LFxuICAgICAgICAgICAgeTI6IDFcbiAgICAgICAgfVxuICAgIH0sXG4gICAgRUFTRV9JTl9CQUNLOiB7XG4gICAgICAgIHR5cGU6ICdlYXNlLWluLWJhY2snLFxuICAgICAgICBlYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyOiB7XG4gICAgICAgICAgICB4MTogMC4zMDAwMDAwMTE5MjA5Mjg5NixcbiAgICAgICAgICAgIHkxOiAtMC4wNTAwMDAwMDA3NDUwNTgwNixcbiAgICAgICAgICAgIHgyOiAwLjY5OTk5OTk4ODA3OTA3MSxcbiAgICAgICAgICAgIHkyOiAtMC41XG4gICAgICAgIH1cbiAgICB9LFxuICAgIEVBU0VfT1VUX0JBQ0s6IHtcbiAgICAgICAgdHlwZTogJ2Vhc2Utb3V0LWJhY2snLFxuICAgICAgICBlYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyOiB7XG4gICAgICAgICAgICB4MTogMC40NDk5OTk5ODgwNzkwNzEwNCxcbiAgICAgICAgICAgIHkxOiAxLjQ1MDAwMDA0NzY4MzcxNTgsXG4gICAgICAgICAgICB4MjogMC44MDAwMDAwMTE5MjA5MjksXG4gICAgICAgICAgICB5MjogMVxuICAgICAgICB9XG4gICAgfSxcbiAgICBFQVNFX0lOX0FORF9PVVRfQkFDSzoge1xuICAgICAgICB0eXBlOiAnZWFzZS1pbi1vdXQtYmFjaycsXG4gICAgICAgIGVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXI6IHtcbiAgICAgICAgICAgIHgxOiAwLjY5OTk5OTk4ODA3OTA3MSxcbiAgICAgICAgICAgIHkxOiAtMC40MDAwMDAwMDU5NjA0NjQ1LFxuICAgICAgICAgICAgeDI6IDAuNDAwMDAwMDA1OTYwNDY0NSxcbiAgICAgICAgICAgIHkyOiAxLjM5OTk5OTk3NjE1ODE0MlxuICAgICAgICB9XG4gICAgfVxufTtcbmNvbnN0IGVhc2luZyA9IChlYXNpbmcpID0+IHtcbiAgICAvLyBhYm9ydCBpZiBpbnZhbGlmIGVhc2luZyB0eXBlXG4gICAgaWYgKCFPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChlYXNpbmdzLCBlYXNpbmcudHlwZSkpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgLy8gcmV0dXJuIGN1c3RvbSBlYXNpbmdcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgaWYgKGVhc2luZy50eXBlID09PSAnQ1VTVE9NX0NVQklDX0JFWklFUicpIHtcbiAgICAgICAgZWFzaW5ncy5DVVNUT01fQ1VCSUNfQkVaSUVSID0ge1xuICAgICAgICAgICAgdHlwZTogJ2N1YmljLWJlemllcicsXG4gICAgICAgICAgICBlYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyOiB7XG4gICAgICAgICAgICAgICAgeDE6IGVhc2luZy5lYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyLngxLFxuICAgICAgICAgICAgICAgIHkxOiBlYXNpbmcuZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllci55MSxcbiAgICAgICAgICAgICAgICB4MjogZWFzaW5nLmVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXIueDIsXG4gICAgICAgICAgICAgICAgeTI6IGVhc2luZy5lYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyLnkyXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGVhc2luZzoge1xuICAgICAgICAgICAgdmFsdWU6IGVhc2luZ3NbZWFzaW5nLnR5cGVdLnR5cGUsXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBlYXNpbmdGdW5jdGlvbjoge1xuICAgICAgICAgICAgeDE6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogZWFzaW5nc1tlYXNpbmcudHlwZV0uZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllci54MSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHgyOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGVhc2luZ3NbZWFzaW5nLnR5cGVdLmVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXIueDIsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB5MToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBlYXNpbmdzW2Vhc2luZy50eXBlXS5lYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyLnkxLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeTI6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogZWFzaW5nc1tlYXNpbmcudHlwZV0uZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllci55MixcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn07XG5jb25zdCBleHRyYWN0TW90aW9uID0gKHRva2VuTm9kZXMpID0+IHtcbiAgICBjb25zdCBub2RlTmFtZSA9ICdtb3Rpb24nO1xuICAgIC8vIHJldHVybiBhcyBvYmplY3RcbiAgICByZXR1cm4gdG9rZW5Ob2Rlc1xuICAgICAgICAvLyBvbmx5IGdldCBtb3Rpb24gbm9kZXNcbiAgICAgICAgLmZpbHRlcihub2RlID0+IG5vZGUubmFtZS5zdWJzdHIoMCwgbm9kZU5hbWUubGVuZ3RoKSA9PT0gbm9kZU5hbWUpXG4gICAgICAgIC8vIGZpbHRlciB0byBvbmx5IGluY2x1ZGUgaXRlbXMgd2hpY2ggaGF2ZSBhIHRyYW5zaXRpb24gcHJvcGVydHlcbiAgICAgICAgLmZpbHRlcihub2RlID0+IHtcbiAgICAgICAgaWYgKG5vZGUucmVhY3Rpb25zLmxlbmd0aCA+IDAgJiYgbm9kZS5yZWFjdGlvbnNbMF0uYWN0aW9uLnR5cGUgPT09ICdOT0RFJyAmJiBub2RlLnJlYWN0aW9uc1swXS5hY3Rpb24udHJhbnNpdGlvbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pXG4gICAgICAgIC8vIHJldHJpZXZlIHZhbHVlc1xuICAgICAgICAubWFwKChub2RlKSA9PiAoe1xuICAgICAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgZGVzY3JpcHRpb246IG5vZGUuZGVzY3JpcHRpb24gfHwgbnVsbCxcbiAgICAgICAgY2F0ZWdvcnk6ICdtb3Rpb24nLFxuICAgICAgICB2YWx1ZXM6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7IHR5cGU6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbm9kZS5yZWFjdGlvbnNbMF0uYWN0aW9uLnRyYW5zaXRpb24udHlwZS50b0xvY2FsZUxvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LCBkdXJhdGlvbjoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBNYXRoLnJvdW5kKChub2RlLnJlYWN0aW9uc1swXS5hY3Rpb24udHJhbnNpdGlvbi5kdXJhdGlvbiArIE51bWJlci5FUFNJTE9OKSAqIDEwMDApIC8gMTAwMCxcbiAgICAgICAgICAgICAgICB1bml0OiAncycsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0gfSwgZWFzaW5nKG5vZGUucmVhY3Rpb25zWzBdLmFjdGlvbi50cmFuc2l0aW9uLmVhc2luZykpLCBkaXJlY3Rpb24obm9kZS5yZWFjdGlvbnNbMF0uYWN0aW9uLnRyYW5zaXRpb24pKVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0TW90aW9uO1xuZXhwb3J0IGNvbnN0IF9fdGVzdGluZyA9IHtcbiAgICBlYXNpbmc6IGVhc2luZ1xufTtcbiIsImltcG9ydCByb3VuZFdpdGhEZWNpbWFscyBmcm9tICcuLi91dGlsaXRpZXMvcm91bmRXaXRoRGVjaW1hbHMnO1xuY29uc3QgZXh0cmFjdFJhZGlpID0gKHRva2VuTm9kZXMpID0+IHtcbiAgICBjb25zdCBub2RlTmFtZSA9ICdyYWRpaSc7XG4gICAgLy8gZ2V0IHRoZSB0eXBlIG9mIHRoZSBjb3JuZXIgcmFkaXVzXG4gICAgY29uc3QgZ2V0UmFkaXVzVHlwZSA9IHJhZGl1cyA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgcmFkaXVzID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuICdzaW5nbGUnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnbWl4ZWQnO1xuICAgIH07XG4gICAgLy8gZ2V0IHRoZSBpbmRpdmlkdWFsIHJhZGlpXG4gICAgY29uc3QgZ2V0UmFkaWkgPSAobm9kZSkgPT4gKHtcbiAgICAgICAgdG9wTGVmdDoge1xuICAgICAgICAgICAgdmFsdWU6IG5vZGUudG9wTGVmdFJhZGl1cyB8fCAwLFxuICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIHRvcFJpZ2h0OiB7XG4gICAgICAgICAgICB2YWx1ZTogbm9kZS50b3BSaWdodFJhZGl1cyB8fCAwLFxuICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIGJvdHRvbVJpZ2h0OiB7XG4gICAgICAgICAgICB2YWx1ZTogbm9kZS5ib3R0b21SaWdodFJhZGl1cyB8fCAwLFxuICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIGJvdHRvbUxlZnQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiBub2RlLmJvdHRvbUxlZnRSYWRpdXMgfHwgMCxcbiAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gcmV0dXJuIGFzIG9iamVjdFxuICAgIHJldHVybiB0b2tlbk5vZGVzLmZpbHRlcihub2RlID0+IG5vZGUubmFtZS5zdWJzdHIoMCwgbm9kZU5hbWUubGVuZ3RoKSA9PT0gbm9kZU5hbWUpLm1hcChub2RlID0+ICh7XG4gICAgICAgIG5hbWU6IG5vZGUubmFtZSxcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgICBjYXRlZ29yeTogJ3JhZGl1cycsXG4gICAgICAgIHZhbHVlczogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCAodHlwZW9mIG5vZGUuY29ybmVyUmFkaXVzID09PSAnbnVtYmVyJyAmJiB7XG4gICAgICAgICAgICByYWRpdXM6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbm9kZS5jb3JuZXJSYWRpdXMsXG4gICAgICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSksIHsgcmFkaXVzVHlwZToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBnZXRSYWRpdXNUeXBlKG5vZGUuY29ybmVyUmFkaXVzKSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfSwgcmFkaWk6IGdldFJhZGlpKG5vZGUpLCBzbW9vdGhpbmc6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMobm9kZS5jb3JuZXJTbW9vdGhpbmcsIDIpLFxuICAgICAgICAgICAgICAgIGNvbW1lbnQ6ICdQZXJjZW50IGFzIGRlY2ltYWwgZnJvbSAwLjAgLSAxLjAnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9IH0pXG4gICAgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3RSYWRpaTtcbiIsImltcG9ydCByb3VuZFdpdGhEZWNpbWFscyBmcm9tICcuLi91dGlsaXRpZXMvcm91bmRXaXRoRGVjaW1hbHMnO1xuY29uc3QgZXh0cmFjdFNpemVzID0gKHRva2VuTm9kZXMpID0+IHtcbiAgICBjb25zdCBub2RlTmFtZSA9ICdzaXplcyc7XG4gICAgLy8gcmV0dXJuIGFzIG9iamVjdFxuICAgIHJldHVybiB0b2tlbk5vZGVzLmZpbHRlcihub2RlID0+IG5vZGUubmFtZS5zdWJzdHIoMCwgbm9kZU5hbWUubGVuZ3RoKSA9PT0gbm9kZU5hbWUpLm1hcChub2RlID0+ICh7XG4gICAgICAgIG5hbWU6IG5vZGUubmFtZSxcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgICBjYXRlZ29yeTogJ3NpemUnLFxuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHdpZHRoOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKG5vZGUud2lkdGgsIDIpLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWlnaHQ6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMobm9kZS5oZWlnaHQsIDIpLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0U2l6ZXM7XG4iLCJpbXBvcnQgcm91bmRXaXRoRGVjaW1hbHMgZnJvbSAnLi4vdXRpbGl0aWVzL3JvdW5kV2l0aERlY2ltYWxzJztcbmNvbnN0IGV4dHJhY3RTcGFjaW5nID0gKHRva2VuTm9kZXMpID0+IHtcbiAgICBjb25zdCBub2RlTmFtZSA9ICdzcGFjaW5nJztcbiAgICAvLyByZXR1cm4gYXMgb2JqZWN0XG4gICAgcmV0dXJuIHRva2VuTm9kZXMuZmlsdGVyKG5vZGUgPT4gbm9kZS5uYW1lLnN1YnN0cigwLCBub2RlTmFtZS5sZW5ndGgpID09PSBub2RlTmFtZSlcbiAgICAgICAgLm1hcChub2RlID0+ICh7XG4gICAgICAgIG5hbWU6IG5vZGUubmFtZSxcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgICBjYXRlZ29yeTogJ3NwYWNpbmcnLFxuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHRvcDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLnBhZGRpbmdUb3AsIDIpLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByaWdodDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLnBhZGRpbmdSaWdodCwgMiksXG4gICAgICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvdHRvbToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLnBhZGRpbmdCb3R0b20sIDIpLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWZ0OiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKG5vZGUucGFkZGluZ0xlZnQsIDIpLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0U3BhY2luZztcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgZ2V0U2V0dGluZ3MsIHNldFNldHRpbmdzIH0gZnJvbSAnLi91dGlsaXRpZXMvc2V0dGluZ3MnO1xuaW1wb3J0IHsgZ2V0QWNjZXNzVG9rZW4sIHNldEFjY2Vzc1Rva2VuIH0gZnJvbSAnLi91dGlsaXRpZXMvYWNjZXNzVG9rZW4nO1xuaW1wb3J0IGdldEpzb24gZnJvbSAnLi91dGlsaXRpZXMvZ2V0SnNvbic7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4vdXRpbGl0aWVzL2NvbmZpZyc7XG5pbXBvcnQgZ2V0VmVyc2lvbkRpZmZlcmVuY2UgZnJvbSAnLi91dGlsaXRpZXMvZ2V0VmVyc2lvbkRpZmZlcmVuY2UnO1xuaW1wb3J0IGdldEZpbGVJZCBmcm9tICcuL3V0aWxpdGllcy9nZXRGaWxlSWQnO1xuLy8gaW5pdGlhdGUgVUlcbmZpZ21hLnNob3dVSShfX2h0bWxfXywge1xuICAgIHZpc2libGU6IGZhbHNlLFxuICAgIHdpZHRoOiBjb25maWcuc2V0dGluZ3NEaWFsb2cud2lkdGgsXG4gICAgaGVpZ2h0OiBjb25maWcuc2V0dGluZ3NEaWFsb2cuaGVpZ2h0XG59KTtcbi8vIEdldCB0aGUgdXNlciBzZXR0aW5nc1xuY29uc3QgdXNlclNldHRpbmdzID0gZ2V0U2V0dGluZ3MoKTtcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRVhQT1JUIFRPIEZJTEVcbi8vIGV4cG9ydHMgdGhlIGRlc2lnbiB0b2tlbnMgdG8gYSBmaWxlXG5pZiAoZmlnbWEuY29tbWFuZCA9PT0gJ2V4cG9ydCcpIHtcbiAgICAvLyBzaG93IFVJXG4gICAgZmlnbWEudWkuc2hvdygpO1xuICAgIC8vIHdyaXRlIHRva2VucyB0byBqc29uIGZpbGVcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgIGNvbW1hbmQ6ICdleHBvcnQnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBmaWxlbmFtZTogYCR7dXNlclNldHRpbmdzLmZpbGVuYW1lfS5qc29uYCxcbiAgICAgICAgICAgIGRhdGE6IGdldEpzb24oZmlnbWEsIHVzZXJTZXR0aW5ncylcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy8gU0VORCBUTyBVUkxcbi8vIHNlbmQgdG9rZW5zIHRvIHVybFxuaWYgKGZpZ21hLmNvbW1hbmQgPT09ICd1cmxFeHBvcnQnKSB7XG4gICAgLy8gbmVlZGVkIGZvciBnZXRBY2Nlc3NUb2tlbiBhc3luY1xuICAgIGNvbnN0IHVybEV4cG9ydCA9ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICBjb21tYW5kOiAndXJsRXhwb3J0JyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICB1cmw6IHVzZXJTZXR0aW5ncy5zZXJ2ZXJVcmwsXG4gICAgICAgICAgICAgICAgYWNjZXNzVG9rZW46IHlpZWxkIGdldEFjY2Vzc1Rva2VuKGdldEZpbGVJZChmaWdtYSkpLFxuICAgICAgICAgICAgICAgIGFjY2VwdEhlYWRlcjogdXNlclNldHRpbmdzLmFjY2VwdEhlYWRlcixcbiAgICAgICAgICAgICAgICBhdXRoVHlwZTogdXNlclNldHRpbmdzLmF1dGhUeXBlLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRfdHlwZTogdXNlclNldHRpbmdzLmV2ZW50VHlwZSxcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50X3BheWxvYWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuRmlsZU5hbWU6IGAke3VzZXJTZXR0aW5ncy5maWxlbmFtZX0uanNvbmAsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbnM6IGAke2dldEpzb24oZmlnbWEsIHVzZXJTZXR0aW5ncywgdHJ1ZSl9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVuYW1lOiBmaWdtYS5yb290Lm5hbWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy8gcnVuIGV4cG9ydCB1cmwgZnVuY3Rpb25cbiAgICB1cmxFeHBvcnQoKTtcbn1cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gU0VUVElOR1Ncbi8vIHNldHRpbmdzIGZvciB0aGUgZGVzaWduIHRva2Vuc1xuaWYgKGZpZ21hLmNvbW1hbmQgPT09ICdzZXR0aW5ncycpIHtcbiAgICAvLyB3cmFwIGluIGZ1bmN0aW9uIGJlY2F1c2Ugb2YgYXN5bmMgY2xpZW50IFN0b3JhZ2VcbiAgICBjb25zdCBvcGVuVWkgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IHZlcnNpb24gZGlmZmVyZW5jZXMgdG8gdGhlIGxhc3QgdGltZSB0aGUgcGx1Z2luIHdhcyBvcGVuZWRcbiAgICAgICAgY29uc3QgdmVyc2lvbkRpZmZlcmVuY2UgPSB5aWVsZCBnZXRWZXJzaW9uRGlmZmVyZW5jZShmaWdtYSk7XG4gICAgICAgIC8vIHJlc2l6ZSBVSSBpZiBuZWVkZWRcbiAgICAgICAgaWYgKHZlcnNpb25EaWZmZXJlbmNlICE9PSB1bmRlZmluZWQgJiYgdmVyc2lvbkRpZmZlcmVuY2UgIT09ICdwYXRjaCcpIHtcbiAgICAgICAgICAgIGZpZ21hLnVpLnJlc2l6ZShjb25maWcuc2V0dGluZ3NEaWFsb2cud2lkdGgsIGNvbmZpZy5zZXR0aW5nc0RpYWxvZy5oZWlnaHQgKyA2MCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVnaXN0ZXIgdGhlIHNldHRpbmdzIFVJXG4gICAgICAgIGZpZ21hLnVpLnNob3coKTtcbiAgICAgICAgLy8gc2VudCBzZXR0aW5ncyB0byBVSVxuICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICBjb21tYW5kOiAnZ2V0U2V0dGluZ3MnLFxuICAgICAgICAgICAgc2V0dGluZ3M6IHVzZXJTZXR0aW5ncyxcbiAgICAgICAgICAgIGFjY2Vzc1Rva2VuOiB5aWVsZCBnZXRBY2Nlc3NUb2tlbihnZXRGaWxlSWQoZmlnbWEpKSxcbiAgICAgICAgICAgIHZlcnNpb25EaWZmZXJlbmNlOiB2ZXJzaW9uRGlmZmVyZW5jZVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBmaWdtYS51aS5zaG93KCk7XG4gICAgfSk7XG4gICAgLy8gcnVuIGZ1bmN0aW9uXG4gICAgb3BlblVpKCk7XG59XG4vKipcbiAqIE9wZW4gSGVscFxuICogT3BlbiBnaXRodWIgaGVscCBwYWdlXG4gKi9cbmlmIChmaWdtYS5jb21tYW5kID09PSAnaGVscCcpIHtcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgIGNvbW1hbmQ6ICdoZWxwJ1xuICAgIH0pO1xufVxuLyoqXG4gKiBSZWFjdCB0byBtZXNzYWdlc1xuICovXG5maWdtYS51aS5vbm1lc3NhZ2UgPSAobWVzc2FnZSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgLyoqXG4gICAgICogb24gY2xvc2VQbHVnaW5cbiAgICAgKiBjbG9zZSBwbHVnaW4gYW5kIHNob3cgbm90aWZpY2F0aW9uIGlmIGF2YWlsYWJsZVxuICAgICAqL1xuICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdjbG9zZVBsdWdpbicpIHtcbiAgICAgICAgLy8gc2hvdyBub3RpZmljYXRpb24gaWYgc2VuZFxuICAgICAgICBpZiAobWVzc2FnZS5ub3RpZmljYXRpb24gIT09IHVuZGVmaW5lZCAmJiBtZXNzYWdlLm5vdGlmaWNhdGlvbiAhPT0gJycpIHtcbiAgICAgICAgICAgIGZpZ21hLm5vdGlmeShtZXNzYWdlLm5vdGlmaWNhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2xvc2UgcGx1Z2luXG4gICAgICAgIGZpZ21hLnVpLmhpZGUoKTtcbiAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogb24gc2F2ZVNldHRpbmdzXG4gICAgICogc2F2ZSBzZXR0aW5ncywgYWNjZXNzIHRva2VuIGFuZCBjbG9zZSBwbHVnaW5cbiAgICAgKi9cbiAgICBpZiAobWVzc2FnZS5jb21tYW5kID09PSAnc2F2ZVNldHRpbmdzJykge1xuICAgICAgICAvLyBzdG9yZSBzZXR0aW5nc1xuICAgICAgICBzZXRTZXR0aW5ncyhtZXNzYWdlLnNldHRpbmdzKTtcbiAgICAgICAgLy8gYWNjZXNzVG9rZW5cbiAgICAgICAgeWllbGQgc2V0QWNjZXNzVG9rZW4oZ2V0RmlsZUlkKGZpZ21hKSwgbWVzc2FnZS5hY2Nlc3NUb2tlbik7XG4gICAgICAgIC8vIGNsb3NlIHBsdWdpblxuICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgIH1cbn0pO1xuIiwiaW1wb3J0IHsgY29udmVydFJnYmFPYmplY3RUb1N0cmluZyB9IGZyb20gJy4uL3V0aWxpdGllcy9jb252ZXJ0Q29sb3InO1xuaW1wb3J0IGdldERlc2NyaXB0aW9uIGZyb20gJy4vdXRpbGl0aWVzL2dldERlc2NyaXB0aW9uJztcbmNvbnN0IGRlZmF1bHRUcmFuc2Zvcm1lciA9IHByb3BlcnR5R3JvdXBWYWx1ZXMgPT4ge1xuICAgIC8vIHR1cm4gYXJyYXkgd2l0aCBvbmx5IG9uZSBpdGVtIGludG8gbm9ybWFsIG9iamVjdFxuICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BlcnR5R3JvdXBWYWx1ZXMpICYmIHByb3BlcnR5R3JvdXBWYWx1ZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHByb3BlcnR5R3JvdXBWYWx1ZXMgPSBwcm9wZXJ0eUdyb3VwVmFsdWVzWzBdO1xuICAgIH1cbiAgICAvLyBkZWZpbmUgb2JqZWN0XG4gICAgY29uc3QgdHJhbnNmb3JtZWRQcm9wZXJ0aWVzID0ge307XG4gICAgLy8gdHJhbnNmb3JtIHByb2VwcnRpZXNcbiAgICBPYmplY3Qua2V5cyhwcm9wZXJ0eUdyb3VwVmFsdWVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgLy8gaWYgdGhpcyBpcyB0aGUgZmluYWwgbGV2ZWxcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChwcm9wZXJ0eUdyb3VwVmFsdWVzW2tleV0sICd2YWx1ZScpKSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm1lZFByb3BlcnRpZXNba2V5XSA9IHN0eWxlRGljdGlvbmFyeUZvcm1hdChwcm9wZXJ0eUdyb3VwVmFsdWVzW2tleV0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIG1vcmUgbmVzdGluZ1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybWVkUHJvcGVydGllc1trZXldID0gZGVmYXVsdFRyYW5zZm9ybWVyKHByb3BlcnR5R3JvdXBWYWx1ZXNba2V5XSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBpZiBvbmx5IG9uZSBwcm9wZXJ0eSBpcyBpbiBvYmplY3QgKGUuZy4gb25seSBmaWxsIGZvciBjb2xvcilcbiAgICAvLyByZXR1cm4gdGVoIHZhbHVlIG9mIHRoaXMgcHJvcGVydHkgZGlyZWN0bHkgKGUuZy4gY29sb3ItYmx1ZTogIzAwMDBBQSBpbnN0ZWFkIG9mIGNvbG9yLWJsdWUtZmlsbDogIzAwMDBBQSlcbiAgICBpZiAoT2JqZWN0LmtleXModHJhbnNmb3JtZWRQcm9wZXJ0aWVzKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC52YWx1ZXModHJhbnNmb3JtZWRQcm9wZXJ0aWVzKVswXTtcbiAgICB9XG4gICAgLy8gcmV0dXJuIHRyYW5zZm9ybWVkIHByb3BlcnRpZXNcbiAgICByZXR1cm4gdHJhbnNmb3JtZWRQcm9wZXJ0aWVzO1xufTtcbmNvbnN0IHNpemVUcmFuc2Zvcm1lciA9IHByb3BlcnR5R3JvdXBWYWx1ZXMgPT4ge1xuICAgIHJldHVybiBzdHlsZURpY3Rpb25hcnlGb3JtYXQocHJvcGVydHlHcm91cFZhbHVlcy53aWR0aCk7XG59O1xuY29uc3QgY2F0ZWdvcnlUcmFuc2Zvcm1lciA9IHtcbiAgICBkZWZhdWx0OiBkZWZhdWx0VHJhbnNmb3JtZXIsXG4gICAgZm9udDogZGVmYXVsdFRyYW5zZm9ybWVyLFxuICAgIGJvcmRlcjogZGVmYXVsdFRyYW5zZm9ybWVyLFxuICAgIHNpemU6IHNpemVUcmFuc2Zvcm1lcixcbiAgICBncmlkOiBkZWZhdWx0VHJhbnNmb3JtZXIsXG4gICAgZWZmZWN0OiBkZWZhdWx0VHJhbnNmb3JtZXIsXG4gICAgcmFkaXVzOiBkZWZhdWx0VHJhbnNmb3JtZXIsXG4gICAgZmlsbDogZGVmYXVsdFRyYW5zZm9ybWVyXG59O1xuY29uc3Qgc3R5bGVEaWN0aW9uYXJ5Q29udmVydFZhbHVlID0gKHZhbHVlLCB0eXBlKSA9PiB7XG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gJ2NvbG9yJykge1xuICAgICAgICByZXR1cm4gY29udmVydFJnYmFPYmplY3RUb1N0cmluZyh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn07XG5jb25zdCBzdHlsZURpY3Rpb25hcnlGb3JtYXQgPSAocHJvcGVydHkpID0+IChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oeyB2YWx1ZTogc3R5bGVEaWN0aW9uYXJ5Q29udmVydFZhbHVlKHByb3BlcnR5LnZhbHVlLCBwcm9wZXJ0eS50eXBlKSwgdHlwZTogcHJvcGVydHkudHlwZSB9LCAocHJvcGVydHkuZGVzY3JpcHRpb24gIT09IHVuZGVmaW5lZCAmJiB7IGNvbW1lbnQ6IHByb3BlcnR5LmRlc2NyaXB0aW9uIH0pKSwgKHByb3BlcnR5LnVuaXQgIT09IHVuZGVmaW5lZCAmJiB7IHVuaXQ6IHByb3BlcnR5LnVuaXQgfSkpKTtcbmNvbnN0IHByb3BlcnR5VHJhbnNmb3JtZXIgPSAocHJvcGVydHlHcm91cCwgY2F0ZWdvcnkpID0+IHtcbiAgICAvLyBpZiBjdXN0b20gdHJhbnNmb3JtZXIgaXMgZGVmaW5lZFxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY2F0ZWdvcnlUcmFuc2Zvcm1lciwgcHJvcGVydHlHcm91cC5jYXRlZ29yeSkpIHtcbiAgICAgICAgcmV0dXJuIGNhdGVnb3J5VHJhbnNmb3JtZXJbcHJvcGVydHlHcm91cC5jYXRlZ29yeV0ocHJvcGVydHlHcm91cC52YWx1ZXMpO1xuICAgIH1cbiAgICAvLyBvdGhlcndpc2UgcmV0dXJuIHdpdGggZGVmYXVsdCB0cmFuc2Zvcm1lclxuICAgIHJldHVybiBkZWZhdWx0VHJhbnNmb3JtZXIocHJvcGVydHlHcm91cC52YWx1ZXMpO1xufTtcbmNvbnN0IHN0eWxlRGljdGlvbmFyeVRyYW5zZm9ybWVyID0gKHByb3BlcnR5R3JvdXApID0+IHtcbiAgICAvLyB0cmFuc2Zvcm0gdG8gYW1hem9uIHN0eWxlIERpY3Rpb25hcnkgc3RydWN0dXJlXG4gICAgY29uc3QgdHJhbnNmb3JtZWRQcm9wZXJ0aWVzID0gcHJvcGVydHlUcmFuc2Zvcm1lcihwcm9wZXJ0eUdyb3VwLCBwcm9wZXJ0eUdyb3VwLmNhdGVnb3J5KTtcbiAgICAvLyByZXR1cm4gdmFsdWVzXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7IG5hbWU6IHByb3BlcnR5R3JvdXAubmFtZSwgY2F0ZWdvcnk6IHByb3BlcnR5R3JvdXAuY2F0ZWdvcnkgfSwgZ2V0RGVzY3JpcHRpb24ocHJvcGVydHlHcm91cC5kZXNjcmlwdGlvbikpLCB0cmFuc2Zvcm1lZFByb3BlcnRpZXMpO1xufTtcbmV4cG9ydCBkZWZhdWx0IHN0eWxlRGljdGlvbmFyeVRyYW5zZm9ybWVyO1xuZXhwb3J0IGNvbnN0IF9fdGVzdGluZyA9IHtcbiAgICBzdHlsZURpY3Rpb25hcnlDb252ZXJ0VmFsdWU6IHN0eWxlRGljdGlvbmFyeUNvbnZlcnRWYWx1ZSxcbiAgICBzaXplVHJhbnNmb3JtZXI6IHNpemVUcmFuc2Zvcm1lclxufTtcbiIsImNvbnN0IGdldERlc2NyaXB0aW9uID0gKGRlc2NyaXB0aW9uLCBkZXNjcmlwdGlvbktleSA9ICdjb21tZW50JykgPT4ge1xuICAgIC8vIGlmIHZhbGlkIGRlc2NyaXB0aW9uXG4gICAgaWYgKGRlc2NyaXB0aW9uICYmIHR5cGVvZiBkZXNjcmlwdGlvbiA9PT0gJ3N0cmluZycgJiYgZGVzY3JpcHRpb24ubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4geyBjb21tZW50OiBkZXNjcmlwdGlvbiB9O1xuICAgIH1cbiAgICAvLyBpZiBpbnZhbGlkIGRlc2NyaXB0aW9uIHJldHVybiBhbiBlbXB0eSBvYmplY3RcbiAgICByZXR1cm4ge307XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0RGVzY3JpcHRpb247XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbi8qKlxuICogQG5hbWUgZ2V0QWNjZXNzVG9rZW5cbiAqIEBkZXNjcmlwdGlvbiByZXR1cm5zIHRoZSBhY2Nlc3MgdG9rZW4gZm9yIHRoZSBjdXJyZW50IGZpbGUgb3IgdW5kZWZpbmVkXG4gKiBAcGFyYW0gZmlsZUlkIHtzdHJpbmd9IOKAlCBJRCBvZiB0aGUgY3VycmVudCBmaWxlXG4gKi9cbmNvbnN0IGdldEFjY2Vzc1Rva2VuID0gKGZpbGVJZCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgLy8gZ2V0IGFsbCBhY2Nlc3MgdG9rZW5zXG4gICAgY29uc3QgYWNjZXNzVG9rZW5zID0geWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYygnYWNjZXNzVG9rZW5zJyk7XG4gICAgLy8gaWYgYWNjZXNzIHRva2VucyBvYmplY3QgaXMgcHJlc2VudFxuICAgIGlmIChhY2Nlc3NUb2tlbnMgIT09IHVuZGVmaW5lZCAmJiBhY2Nlc3NUb2tlbnMgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgLy8gcmV0cmlldmUgdGhlIGFjY2VzcyB0b2tlbiBmcm9tIHRoZSBjYWNoZVxuICAgICAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGFjY2Vzc1Rva2Vuc1tmaWxlSWRdO1xuICAgICAgICAvLyByZXR1cm4gdGhlIGFjY2VzcyB0b2tlbiBvciBhbiBlbXB0eSBzdHJpbmdcbiAgICAgICAgcmV0dXJuIGFjY2Vzc1Rva2VuIHx8ICcnO1xuICAgIH1cbiAgICAvLyByZXR1cm4gZW1wdHkgc3RyaW5nIGlmIG5vIHRva2VuIGlzIHN0b3JlZFxuICAgIHJldHVybiAnJztcbn0pO1xuLyoqXG4gKiBAbmFtZSBzZXRBY2Nlc3NUb2tlblxuICogQGRlc2NyaXB0aW9uIHN0b3JlIHRoZSBhY2Nlc3MgdG9rZW4gZm9yIHRoZSBjdXJyZW50IGZpdmVuIGZpbGUgaW4gdGhlIHVzZXIgY2xpZW50U3RvcmFnZVxuICogQHBhcmFtIGZpbGVJZCB7c3RyaW5nfSDigJQgSUQgb2YgdGhlIGN1cnJlbnQgZmlsZVxuICogQHBhcmFtIGZpbGVJZCB7c3RyaW5nfSDigJQgYWNjZXNzIHRva2VuXG4gKi9cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5jb25zdCBzZXRBY2Nlc3NUb2tlbiA9IChmaWxlSWQsIGFjY2Vzc1Rva2VuKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAvLyBnZXQgdGhlIGFjY2VzcyB0b2tlbiBvYmplY3RcbiAgICBjb25zdCBhY2Nlc3NUb2tlbnMgPSAoeWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYygnYWNjZXNzVG9rZW5zJykpIHx8IHt9O1xuICAgIC8vIG1lcmdlIHRva2Vuc1xuICAgIGNvbnN0IG1lcmdlZFRva2VucyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgYWNjZXNzVG9rZW5zKSwgeyBbZmlsZUlkXTogYWNjZXNzVG9rZW4gfSk7XG4gICAgLy8gbWVyZ2UgdGhlIG5ldyB0b2tlbiBpbnRvIHRoZSBvYmplY3RcbiAgICByZXR1cm4geWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYygnYWNjZXNzVG9rZW5zJywgbWVyZ2VkVG9rZW5zKTtcbn0pO1xuZXhwb3J0IHsgZ2V0QWNjZXNzVG9rZW4sIHNldEFjY2Vzc1Rva2VuIH07XG4iLCJpbXBvcnQgZmlsdGVyQnlOYW1lUHJvcGVydHkgZnJvbSAnLi9maWx0ZXJCeU5hbWVQcm9wZXJ0eSc7XG5pbXBvcnQgZ2V0UGFpbnRTdHlsZXMgZnJvbSAnLi9nZXRQYWludFN0eWxlcyc7XG5pbXBvcnQgZ2V0R3JpZFN0eWxlcyBmcm9tICcuL2dldEdyaWRTdHlsZXMnO1xuaW1wb3J0IGdldFRva2VuRnJhbWVzIGZyb20gJy4vZ2V0VG9rZW5GcmFtZXMnO1xuaW1wb3J0IGdldFRleHRTdHlsZXMgZnJvbSAnLi9nZXRUZXh0U3R5bGVzJztcbmltcG9ydCBnZXRFZmZlY3RTdHlsZXMgZnJvbSAnLi9nZXRFZmZlY3RTdHlsZXMnO1xuLyoqXG4gKiBAZnVuY3Rpb24gYnVpbGRGaWdtYURhdGEg4oCTIHJldHVybiBhbiBvYmplY3Qgd2l0aCBhbGwgc3R5bGVzICYgZnJhbWUgdG8gdXNlIGZvciBleHBvcnRcbiAqIEBwYXJhbSB7UGx1Z2luQVBJfSBmaWdtYSDigJQgdGhlIGZpZ21hIFBsdWdpbkFQSSBvYmplY3RcbiAqIEBwYXJhbSBvcHRpb25zIOKAkyBvcHRpb25zIG9iamVjdFxuICovXG5jb25zdCBidWlsZEZpZ21hRGF0YSA9IChmaWdtYSwgb3B0aW9ucyA9IHtcbiAgICBwcmVmaXg6ICdfJyxcbiAgICBleGNsdWRlUHJlZml4OiB0cnVlXG59KSA9PiB7XG4gICAgLy8gdXNlIHNwcmVhZCBvcGVyYXRvciBiZWNhdXNlIHRoZSBvcmlnaW5hbCBpcyByZWFkT25seVxuICAgIGNvbnN0IHRva2VuRnJhbWVzID0gZ2V0VG9rZW5GcmFtZXMoWy4uLmZpZ21hLnJvb3QuY2hpbGRyZW5dKTtcbiAgICAvLyBnZXQgZGF0YSBmcm9tIGZpZ21hXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW5GcmFtZXM6IHRva2VuRnJhbWVzLFxuICAgICAgICBwYWludFN0eWxlczogZ2V0UGFpbnRTdHlsZXMoZmlnbWEuZ2V0TG9jYWxQYWludFN0eWxlcygpKS5maWx0ZXIoZmlsdGVyQnlOYW1lUHJvcGVydHkob3B0aW9ucy5wcmVmaXgsIG9wdGlvbnMuZXhjbHVkZVByZWZpeCkpLFxuICAgICAgICBncmlkU3R5bGVzOiBnZXRHcmlkU3R5bGVzKGZpZ21hLmdldExvY2FsR3JpZFN0eWxlcygpKS5maWx0ZXIoZmlsdGVyQnlOYW1lUHJvcGVydHkob3B0aW9ucy5wcmVmaXgsIG9wdGlvbnMuZXhjbHVkZVByZWZpeCkpLFxuICAgICAgICB0ZXh0U3R5bGVzOiBnZXRUZXh0U3R5bGVzKGZpZ21hLmdldExvY2FsVGV4dFN0eWxlcygpKS5maWx0ZXIoZmlsdGVyQnlOYW1lUHJvcGVydHkob3B0aW9ucy5wcmVmaXgsIG9wdGlvbnMuZXhjbHVkZVByZWZpeCkpLFxuICAgICAgICBlZmZlY3RTdHlsZXM6IGdldEVmZmVjdFN0eWxlcyhmaWdtYS5nZXRMb2NhbEVmZmVjdFN0eWxlcygpKS5maWx0ZXIoZmlsdGVyQnlOYW1lUHJvcGVydHkob3B0aW9ucy5wcmVmaXgsIG9wdGlvbnMuZXhjbHVkZVByZWZpeCkpXG4gICAgfTtcbn07XG5leHBvcnQgZGVmYXVsdCBidWlsZEZpZ21hRGF0YTtcbiIsIi8qIGlzdGFuYnVsIGlnbm9yZSBmaWxlICovXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgc2V0dGluZ3NEaWFsb2c6IHtcbiAgICAgICAgd2lkdGg6IDU1MCxcbiAgICAgICAgaGVpZ2h0OiA1NjVcbiAgICB9LFxuICAgIGtleToge1xuICAgICAgICBsYXN0VmVyc2lvblNldHRpbmdzT3BlbmVkOiAnbGFzdFZlcnNpb25TZXR0aW5nc09wZW5lZCcsXG4gICAgICAgIGZpbGVJZDogJ2ZpbGVJZCdcbiAgICB9XG59O1xuIiwiaW1wb3J0IHJvdW5kV2l0aERlY2ltYWxzIGZyb20gJy4vcm91bmRXaXRoRGVjaW1hbHMnO1xuZXhwb3J0IGNvbnN0IHJvdW5kUmdiYSA9IChyZ2JhLCBvcGFjaXR5KSA9PiAoe1xuICAgIHI6IHJvdW5kV2l0aERlY2ltYWxzKHJnYmEuciAqIDI1NSwgMCksXG4gICAgZzogcm91bmRXaXRoRGVjaW1hbHMocmdiYS5nICogMjU1LCAwKSxcbiAgICBiOiByb3VuZFdpdGhEZWNpbWFscyhyZ2JhLmIgKiAyNTUsIDApLFxuICAgIGE6IHJvdW5kV2l0aERlY2ltYWxzKG9wYWNpdHkgfHwgcmdiYS5hIHx8IDEpXG59KTtcbmV4cG9ydCBjb25zdCBjb252ZXJ0UGFpbnRUb1JnYmEgPSAocGFpbnQpID0+IHtcbiAgICBpZiAocGFpbnQudHlwZSA9PT0gJ1NPTElEJyAmJiBwYWludC52aXNpYmxlID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiByb3VuZFJnYmEocGFpbnQuY29sb3IsIChwYWludC5vcGFjaXR5IHx8IG51bGwpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuZXhwb3J0IGNvbnN0IGNvbnZlcnRSZ2JhT2JqZWN0VG9TdHJpbmcgPSAocmdiYU9iamVjdCkgPT4gYHJnYmEoJHtyZ2JhT2JqZWN0LnJ9LCAke3JnYmFPYmplY3QuZ30sICR7cmdiYU9iamVjdC5ifSwgJHtyZ2JhT2JqZWN0LmF9KWA7XG4iLCIvKipcbiAqIFBlcmZvcm1zIGEgZGVlcCBtZXJnZSBvZiBgc291cmNlYCBpbnRvIGB0YXJnZXRgLlxuICogTXV0YXRlcyBgdGFyZ2V0YCBvbmx5IGJ1dCBub3QgaXRzIG9iamVjdHMgYW5kIGFycmF5cy5cbiAqXG4gKiBAYXV0aG9yIGluc3BpcmVkIGJ5IFtqaGlsZGVuYmlkZGxlXShodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDgyMTgyMDkpLlxuICovXG5jb25zdCBkZWVwTWVyZ2UgPSAodGFyZ2V0LCBzb3VyY2UpID0+IHtcbiAgICAvLyBmdW5jdGlvbiB0byB0ZXN0IGlmIGEgdmFyaWFibGUgaXMgYW4gb2JqZWN0XG4gICAgY29uc3QgaXNPYmplY3QgPSAob2JqKSA9PiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCc7XG4gICAgLy8gbWFrZSBzdXJlIGJvdGggdGhlIHRhcmdldCBhbmQgdGhlIHNvdXJjZSBhcmUgb2JqZWN0c1xuICAgIC8vIG90aGVyd2lzZSByZXR1cm4gc291cmNlXG4gICAgaWYgKCFpc09iamVjdCh0YXJnZXQpIHx8ICFpc09iamVjdChzb3VyY2UpKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgfVxuICAgIC8vIGl0ZXJhdHJlIG92ZXIgc291cmNlXG4gICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIC8vIGdldCB2YWx1ZXMgZnJvbSBib3RoIHRhcmdldCBhbmQgc291cmNlIGZvciB0aGUgZ2l2ZW4ga2V5XG4gICAgICAgIGNvbnN0IHRhcmdldFZhbHVlID0gdGFyZ2V0W2tleV07XG4gICAgICAgIGNvbnN0IHNvdXJjZVZhbHVlID0gc291cmNlW2tleV07XG4gICAgICAgIC8vIG1lcmdlIGJvdGggdmFsdWVzXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRhcmdldFZhbHVlKSAmJiBBcnJheS5pc0FycmF5KHNvdXJjZVZhbHVlKSkge1xuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSB0YXJnZXRWYWx1ZS5jb25jYXQoc291cmNlVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzT2JqZWN0KHRhcmdldFZhbHVlKSAmJiBpc09iamVjdChzb3VyY2VWYWx1ZSkpIHtcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gZGVlcE1lcmdlKE9iamVjdC5hc3NpZ24oe30sIHRhcmdldFZhbHVlKSwgc291cmNlVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2VWYWx1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIHJldHVybiBtZXJnZSBvYmplY3RcbiAgICByZXR1cm4gdGFyZ2V0O1xufTtcbmV4cG9ydCBkZWZhdWx0IGRlZXBNZXJnZTtcbiIsImltcG9ydCB7IGNvbnZlcnRQYWludFRvUmdiYSB9IGZyb20gJy4vY29udmVydENvbG9yJztcbi8qKlxuICogUmV0dXJuIGFuIGFycmF5IG9mIHNvbGlkIHN0cm9rZSBjb2xvcnNcbiAqL1xuY29uc3QgZ2V0U29saWRTdHJva2VzID0gKHBhaW50cykgPT4ge1xuICAgIC8vIGNsb25lIHdpdGhvdXQgcmVmZXJlbmNlXG4gICAgcmV0dXJuIFsuLi5wYWludHNdXG4gICAgICAgIC5tYXAocGFpbnQgPT4gY29udmVydFBhaW50VG9SZ2JhKHBhaW50KSk7XG59O1xuLyoqXG4gKiBleHRyYWN0VG9rZW5Ob2RlXG4gKiBAcGFyYW0gbm9kZTogU2NlbmVOb2RlXG4gKiBAcmV0dXJucyBub2RlIG9iamVjdFxuICovXG5jb25zdCBleHRyYWN0VG9rZW5Ob2RlID0gKG5vZGUpID0+ICh7XG4gICAgbmFtZTogbm9kZS5uYW1lLFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB8fCB1bmRlZmluZWQsXG4gICAgYm90dG9tTGVmdFJhZGl1czogbm9kZS5ib3R0b21MZWZ0UmFkaXVzLFxuICAgIGJvdHRvbVJpZ2h0UmFkaXVzOiBub2RlLmJvdHRvbVJpZ2h0UmFkaXVzLFxuICAgIHRvcExlZnRSYWRpdXM6IG5vZGUudG9wTGVmdFJhZGl1cyxcbiAgICB0b3BSaWdodFJhZGl1czogbm9kZS50b3BSaWdodFJhZGl1cyxcbiAgICBjb3JuZXJSYWRpdXM6IG5vZGUuY29ybmVyUmFkaXVzIHx8IHVuZGVmaW5lZCxcbiAgICBjb3JuZXJTbW9vdGhpbmc6IG5vZGUuY29ybmVyU21vb3RoaW5nLFxuICAgIHN0cm9rZXM6IGdldFNvbGlkU3Ryb2tlcyhub2RlLnN0cm9rZXMpLFxuICAgIHN0cm9rZVdlaWdodDogbm9kZS5zdHJva2VXZWlnaHQsXG4gICAgc3Ryb2tlU3R5bGVJZDogbm9kZS5zdHJva2VTdHlsZUlkLFxuICAgIHN0cm9rZU1pdGVyTGltaXQ6IG5vZGUuc3Ryb2tlTWl0ZXJMaW1pdCxcbiAgICBzdHJva2VKb2luOiBub2RlLnN0cm9rZUpvaW4sXG4gICAgc3Ryb2tlQ2FwOiBub2RlLnN0cm9rZUNhcCxcbiAgICBkYXNoUGF0dGVybjogbm9kZS5kYXNoUGF0dGVybixcbiAgICBzdHJva2VBbGlnbjogbm9kZS5zdHJva2VBbGlnbixcbiAgICB3aWR0aDogbm9kZS53aWR0aCxcbiAgICBoZWlnaHQ6IG5vZGUuaGVpZ2h0LFxuICAgIHJlYWN0aW9uczogbm9kZS5yZWFjdGlvbnMgfHwgdW5kZWZpbmVkLFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwYWRkaW5nVG9wOiBub2RlLnBhZGRpbmdUb3AgfHwgMCxcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcGFkZGluZ1JpZ2h0OiBub2RlLnBhZGRpbmdSaWdodCB8fCAwLFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwYWRkaW5nQm90dG9tOiBub2RlLnBhZGRpbmdCb3R0b20gfHwgMCxcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcGFkZGluZ0xlZnQ6IG5vZGUucGFkZGluZ0xlZnQgfHwgMFxufSk7XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0VG9rZW5Ob2RlO1xuIiwiY29uc3QgZmlsdGVyQnlQcm9wZXJ0eU5hbWUgPSAocHJlZml4ID0gJ18nLCBleGNsdWRlID0gdHJ1ZSkgPT4ge1xuICAgIHJldHVybiAob2JqZWN0KSA9PiAob2JqZWN0Lm5hbWUudHJpbSgpLnN1YnN0cigwLCBwcmVmaXgubGVuZ3RoKSAhPT0gcHJlZml4KSA9PT0gZXhjbHVkZTtcbn07XG5leHBvcnQgZGVmYXVsdCBmaWx0ZXJCeVByb3BlcnR5TmFtZTtcbiIsIi8qKlxuICogQGZ1bmN0aW9uIGdldEVmZmVjdFN0eWxlc1xuICogQHBhcmFtIHtBcnJheTxFZmZlY3RTdHlsZT59IHN0eWxlcyDigJMgdGhlIGVmZmVjdFN0eWxlIGZyb20gdGhlIGZpZ21hIGZpbGVcbiAqL1xuY29uc3QgZ2V0RWZmZWN0U3R5bGVzID0gKHN0eWxlcykgPT4ge1xuICAgIC8vIGluaXQgc3R5bGVBcnJheVxuICAgIGNvbnN0IHN0eWxlQXJyYXkgPSBbXTtcbiAgICAvLyBsb29wIHRocm91Z2ggRmlnbWEgc3R5bGVzIGFuZCBhZGQgdG8gYXJyYXlcbiAgICBzdHlsZXMuZm9yRWFjaChzdHlsZSA9PiB7XG4gICAgICAgIHN0eWxlQXJyYXkucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBzdHlsZS5uYW1lLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHN0eWxlLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZWZmZWN0czogc3R5bGUuZWZmZWN0c1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyByZXR1cm4gYXJyYXlcbiAgICByZXR1cm4gc3R5bGVBcnJheTtcbn07XG5leHBvcnQgZGVmYXVsdCBnZXRFZmZlY3RTdHlsZXM7XG4iLCJpbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJztcbmNvbnN0IGdldEZpbGVJZCA9IChmaWdtYSkgPT4ge1xuICAgIGxldCBmaWxlSWQgPSBmaWdtYS5yb290LmdldFBsdWdpbkRhdGEoY29uZmlnLmtleS5maWxlSWQpO1xuICAgIC8vIHNldCBwbHVnaW4gaWQgaWYgaXQgZG9lcyBub3QgZXhpc3RcbiAgICBpZiAoZmlsZUlkID09PSB1bmRlZmluZWQgfHwgZmlsZUlkID09PSAnJykge1xuICAgICAgICBmaWdtYS5yb290LnNldFBsdWdpbkRhdGEoY29uZmlnLmtleS5maWxlSWQsIGZpZ21hLnJvb3QubmFtZSArICcgJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAwMDApKTtcbiAgICAgICAgLy8gZ3JhYiBmaWxlIElEXG4gICAgICAgIGZpbGVJZCA9IGZpZ21hLnJvb3QuZ2V0UGx1Z2luRGF0YShjb25maWcua2V5LmZpbGVJZCk7XG4gICAgfVxuICAgIHJldHVybiBmaWxlSWQ7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0RmlsZUlkO1xuIiwiLyoqXG4gKiBAZnVuY3Rpb24gZ2V0R3JpZFN0eWxlc1xuICogQHBhcmFtIHtBcnJheX0gZ3JpZFN0eWxlcyDigJMgdGhlIGdyaWRTdHlsZXMgZnJvbSB0aGUgZmlnbWEgZmlsZVxuICovXG5jb25zdCBnZXRHcmlkU3R5bGVzID0gKHN0eWxlcykgPT4ge1xuICAgIC8vIGluaXQgc3R5bGVBcnJheVxuICAgIGNvbnN0IHN0eWxlQXJyYXkgPSBbXTtcbiAgICAvLyBsb29wIHRocm91Z2ggRmlnbWEgc3R5bGVzIGFuZCBhZGQgdG8gYXJyYXlcbiAgICBzdHlsZXMuZm9yRWFjaChzdHlsZSA9PiB7XG4gICAgICAgIHN0eWxlQXJyYXkucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBzdHlsZS5uYW1lLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHN0eWxlLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgbGF5b3V0R3JpZHM6IHN0eWxlLmxheW91dEdyaWRzXG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIHJldHVybiBhcnJheVxuICAgIHJldHVybiBzdHlsZUFycmF5O1xufTtcbmV4cG9ydCBkZWZhdWx0IGdldEdyaWRTdHlsZXM7XG4iLCJpbXBvcnQgZ2V0VG9rZW5Kc29uIGZyb20gJy4vZ2V0VG9rZW5Kc29uJztcbmltcG9ydCBidWlsZEZpZ21hRGF0YSBmcm9tICcuL2J1aWxkRmlnbWFEYXRhJztcbi8qKlxuICogQG5hbWUgZ2V0SnNvblxuICogQHBhcmFtIHtQbHVnaW5BUEl9IGZpZ21hXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHN0cmluZ2lmeVxuICovXG5jb25zdCBnZXRKc29uID0gKGZpZ21hLCB1c2VyU2V0dGluZ3MsIHN0cmluZ2lmeSA9IHRydWUpID0+IHtcbiAgICAvLyBjb25zdHJ1Y3QgZmlnbWEgZGF0YSBvYmplY3RcbiAgICBjb25zdCBmaWdtYURhdGEgPSBidWlsZEZpZ21hRGF0YShmaWdtYSwge1xuICAgICAgICBwcmVmaXg6IHVzZXJTZXR0aW5ncy5wcmVmaXgsXG4gICAgICAgIGV4Y2x1ZGVQcmVmaXg6IHVzZXJTZXR0aW5ncy5leGNsdWRlUHJlZml4XG4gICAgfSk7XG4gICAgaWYgKHN0cmluZ2lmeSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGdldFRva2VuSnNvbihmaWdtYURhdGEsICdzdHlsZURpY3Rpb25hcnknLCB1c2VyU2V0dGluZ3MubmFtZUNvbnZlcnNpb24pO1xuICAgIH1cbiAgICAvLyBnZXQgdG9rZW5zIGFzIHN0cmluZ2lmaWVkIGpzb25cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZ2V0VG9rZW5Kc29uKGZpZ21hRGF0YSwgJ3N0eWxlRGljdGlvbmFyeScsIHVzZXJTZXR0aW5ncy5uYW1lQ29udmVyc2lvbikpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGdldEpzb247XG4iLCIvKipcbiAqIEBmdW5jdGlvbiBnZXRQYWludFN0eWxlc1xuICogQHBhcmFtIHtBcnJheX0gcGFpbnRTdHlsZXMg4oCTIHRoZSBwYWludFN0eWxlcyBmcm9tIHRoZSBmaWdtYSBmaWxlIChzb21laG93IHN0aWxsIGNvbm5lY3RlZClcbiAqL1xuY29uc3QgZ2V0UGFpbnRTdHlsZXMgPSAoc3R5bGVzKSA9PiB7XG4gICAgLy8gaW5pdCBzdHlsZUFycmF5XG4gICAgY29uc3Qgc3R5bGVBcnJheSA9IFtdO1xuICAgIC8vIGxvb3AgdGhyb3VnaCBGaWdtYSBzdHlsZXMgYW5kIGFkZCB0byBhcnJheVxuICAgIHN0eWxlcy5mb3JFYWNoKHN0eWxlID0+IHtcbiAgICAgICAgc3R5bGVBcnJheS5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IHN0eWxlLm5hbWUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogc3R5bGUuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBwYWludHM6IHN0eWxlLnBhaW50c1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyByZXR1cm4gYXJyYXlcbiAgICByZXR1cm4gc3R5bGVBcnJheTtcbn07XG5leHBvcnQgZGVmYXVsdCBnZXRQYWludFN0eWxlcztcbiIsIi8qKlxuICogQGZ1bmN0aW9uIGdldFRleHRTdHlsZXNcbiAqIEBwYXJhbSB7QXJyYXk8VGV4dFN0eWxlPn0gc3R5bGVzIOKAkyB0aGUgcGFpbnRTdHlsZXMgZnJvbSB0aGUgZmlnbWEgZmlsZSAoc29tZWhvdyBzdGlsbCBjb25uZWN0ZWQpXG4gKi9cbmNvbnN0IGdldFRleHRTdHlsZXMgPSAoc3R5bGVzKSA9PiB7XG4gICAgLy8gaW5pdCBzdHlsZUFycmF5XG4gICAgY29uc3Qgc3R5bGVBcnJheSA9IFtdO1xuICAgIC8vIGxvb3AgdGhyb3VnaCBGaWdtYSBzdHlsZXMgYW5kIGFkZCB0byBhcnJheVxuICAgIHN0eWxlcy5mb3JFYWNoKHN0eWxlID0+IHtcbiAgICAgICAgc3R5bGVBcnJheS5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IHN0eWxlLm5hbWUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogc3R5bGUuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBmb250U2l6ZTogc3R5bGUuZm9udFNpemUsXG4gICAgICAgICAgICB0ZXh0RGVjb3JhdGlvbjogc3R5bGUudGV4dERlY29yYXRpb24sXG4gICAgICAgICAgICBmb250TmFtZTogc3R5bGUuZm9udE5hbWUsXG4gICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiBzdHlsZS5sZXR0ZXJTcGFjaW5nLFxuICAgICAgICAgICAgbGluZUhlaWdodDogc3R5bGUubGluZUhlaWdodCxcbiAgICAgICAgICAgIHBhcmFncmFwaEluZGVudDogc3R5bGUucGFyYWdyYXBoSW5kZW50LFxuICAgICAgICAgICAgcGFyYWdyYXBoU3BhY2luZzogc3R5bGUucGFyYWdyYXBoU3BhY2luZyxcbiAgICAgICAgICAgIHRleHRDYXNlOiBzdHlsZS50ZXh0Q2FzZVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyByZXR1cm4gYXJyYXlcbiAgICByZXR1cm4gc3R5bGVBcnJheTtcbn07XG5leHBvcnQgZGVmYXVsdCBnZXRUZXh0U3R5bGVzO1xuIiwiaW1wb3J0IGV4dHJhY3RUb2tlbk5vZGUgZnJvbSAnLi9leHRyYWN0VG9rZW5Ob2Rlcyc7XG4vLyB0aGUgbm9kZSB0eXBlcyB0aGF0IGNhbiBiZSB1c2VkIGZvciB0b2tlbnNcbmNvbnN0IHRva2VuTm9kZVR5cGVzID0gW1xuICAgICdDT01QT05FTlQnLFxuICAgICdDT01QT05FTlRfU0VUJyxcbiAgICAnUkVDVEFOR0xFJyxcbiAgICAnRlJBTUUnXG5dO1xuLy8gdGhlIG5hbWUgdGhhdCB0b2tlbiBmcmFtZXMgaGF2ZVxuY29uc3QgdG9rZW5GcmFtZU5hbWUgPSAnX3Rva2Vucyc7XG4vLyBjaGVjayBpZiBhIGZyYW1lIGlzIGEgX3Rva2VuIGZyYW1lXG5jb25zdCBpc1Rva2VuRnJhbWUgPSAobm9kZSkgPT4gbm9kZS50eXBlID09PSAnRlJBTUUnICYmIG5vZGUubmFtZS50cmltKCkudG9Mb3dlckNhc2UoKS5zdWJzdHIoMCwgdG9rZW5GcmFtZU5hbWUubGVuZ3RoKSA9PT0gdG9rZW5GcmFtZU5hbWU7XG4vLyByZXR1cm4gb25seSBub2RlcyB0aGF0IGFyZSBmcmFtZXNcbmNvbnN0IGdldEZyYW1lTm9kZXMgPSAobm9kZXMpID0+IFsuLi5ub2Rlcy5tYXAocGFnZSA9PiBwYWdlLmZpbmRDaGlsZHJlbihub2RlID0+IGlzVG9rZW5GcmFtZShub2RlKSkpLnJlZHVjZSgoZmxhdHRlbiwgYXJyKSA9PiBbLi4uZmxhdHRlbiwgLi4uYXJyXSldO1xuLyoqXG4gKiBjaGVjayBpZiBhIG5vZGUgaXMgYSB2YWxpZCB0b2tlbiBub2RlIHR5cGVcbiAqIEN1cnJlbnRseTogJ0NPTVBPTkVOVCcgb3IgJ1JFQ1RBTkdMRSdcbiAqIEBwYXJhbSBTY2VuZU5vZGUgbm9kZVxuICovXG5jb25zdCBpc1Rva2VuTm9kZSA9IChub2RlKSA9PiB7XG4gICAgcmV0dXJuIHRva2VuTm9kZVR5cGVzLmluY2x1ZGVzKG5vZGUudHlwZSk7XG59O1xuLyoqXG4gKiBnZXRWYXJpYW50TmFtZVxuICogY3JlYXRlcyB0aGUgdmFyaWFudCBuYW1lIG9mIHRoZSBwYXJlbnQgYW5kIGNoaWxkIG5hbWVcbiAqL1xuY29uc3QgZ2V0VmFyaWFudE5hbWUgPSAocGFyZW50TmFtZSwgY2hpbGROYW1lKSA9PiB7XG4gICAgLy8gc3BsaXQgaW50byBhcnJheVxuICAgIGNoaWxkTmFtZSA9IGNoaWxkTmFtZS5zcGxpdCgnLCcpXG4gICAgICAgIC8vIHJlbW92ZSBoaWRkZW4gbmFtZXNcbiAgICAgICAgLmZpbHRlcihwYXJ0ID0+ICFbJ18nLCAnLiddLmluY2x1ZGVzKHBhcnQudHJpbSgpLnN1YnN0cigwLCAxKSkpXG4gICAgICAgIC8vIGNsZWFudXAgbmFtZXMsIG9ubHkgcmV0dXJuIHZhbHVlIHBhcnRcbiAgICAgICAgLm1hcChwYXJ0ID0+IHBhcnQuc3BsaXQoJz0nKVsxXSlcbiAgICAgICAgLy8gY29tYmluZVxuICAgICAgICAuam9pbignLycpO1xuICAgIC8vIHJldHVybiBmdWxsIG5hbWVcbiAgICByZXR1cm4gYCR7cGFyZW50TmFtZX0vJHtjaGlsZE5hbWV9YDtcbn07XG4vKipcbiAqIFJldHVybnMgYWxsIGZyYW1lcyBmcm9tIHRoZSBmaWxlIHRoYXQgaGF2ZSBhIG5hbWUgdGhhdCBzdGFydHMgd2l0aCBfdG9rZW5zIG9yIHRoZSB1c2VyIGRlZmluZWQgdG9rZW4gc3BlY2lmaWVyXG4gKlxuICogQHBhcmFtIHBhZ2VzIFBhZ2VOb2Rlc1xuICovXG5jb25zdCBnZXRUb2tlbkZyYW1lcyA9IChwYWdlcykgPT4ge1xuICAgIC8vIGdldCB0b2tlbiBmcmFtZXNcbiAgICBjb25zdCB0b2tlbkZyYW1lcyA9IGdldEZyYW1lTm9kZXMocGFnZXMpO1xuICAgIC8vIGdldCBhbGwgY2hpbGRyZW4gb2YgdG9rZW4gZnJhbWVzXG4gICAgcmV0dXJuIHRva2VuRnJhbWVzLm1hcChmcmFtZSA9PiBmcmFtZVxuICAgICAgICAvLyBjaGVjayBpZiBjaGlsZHJlbiBhcmUgb2YgdmFsaWRlIHR5cGVzXG4gICAgICAgIC5maW5kQ2hpbGRyZW4oXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBub2RlID0+IGlzVG9rZW5Ob2RlKG5vZGUpKSlcbiAgICAgICAgLy8gbWVyZ2VzIGFsbCBjaGlsZHJlbiBpbnRvIG9uZSBhcnJheVxuICAgICAgICAucmVkdWNlKChmbGF0dGVuLCBhcnIpID0+IFsuLi5mbGF0dGVuLCAuLi5hcnJdLCBbXSlcbiAgICAgICAgLy8gdW5wYWNrIHZhcmlhbnRzICYgd2FybiBhYm91dCBkZXByZWNhdGVkIHR5cGVzXG4gICAgICAgIC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gJ1JFQ1RBTkdMRScgfHwgaXRlbS50eXBlID09PSAnRlJBTUUnKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1BsZWFzZSB1c2Ugb25seSBtYWluIGNvbXBvbmVudHMgYW5kIHZhcmlhbnRzLCBvdGhlciB0eXBlcyBtYXkgYmUgZGVwcmVjYXRlZCBhcyB0b2tlbnMgaW4gdGhlIGZ1dHVyZScpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHVucGFjayB2YXJpYW50c1xuICAgICAgICBpZiAoaXRlbS50eXBlID09PSAnQ09NUE9ORU5UX1NFVCcpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IE5hbWUgaXMgb3ZlcndyaXRpbmcgcmVhbCBvYmplY3QgaW4gZmlnbWFcbiAgICAgICAgICAgIC8vIC0+IGNyZWF0ZSBjbG9uZSBhbmQgbW92ZSB0byBuZXcgYXJyYXkgdG8gcmV0dXJuXG4gICAgICAgICAgICByZXR1cm4gaXRlbS5jaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiAoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBleHRyYWN0VG9rZW5Ob2RlKGNoaWxkKSksIHsgbmFtZTogZ2V0VmFyaWFudE5hbWUoaXRlbS5uYW1lLCBjaGlsZC5uYW1lKSB9KSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJldHVybiBub3JtYWwgaXRlbSBhcyBhcnJheSB0byB1bnBhY2sgbGF0ZXJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gW2V4dHJhY3RUb2tlbk5vZGUoaXRlbSldO1xuICAgIH0pXG4gICAgICAgIC8vIG1lcmdlcyB0aGUgdmFyaWFudCBjaGlsZHJlbiBpbnRvIG9uZSBhcnJheVxuICAgICAgICAucmVkdWNlKChmbGF0dGVuLCBhcnIpID0+IFsuLi5mbGF0dGVuLCAuLi5hcnJdLCBbXSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0VG9rZW5GcmFtZXM7XG5leHBvcnQgY29uc3QgX190ZXN0aW5nID0ge1xuICAgIGlzVG9rZW5Ob2RlOiBpc1Rva2VuTm9kZSxcbiAgICBpc1Rva2VuRnJhbWU6IGlzVG9rZW5GcmFtZVxufTtcbiIsImltcG9ydCBleHRyYWN0Q29sb3JzIGZyb20gJy4uL2V4dHJhY3Rvci9leHRyYWN0Q29sb3JzJztcbmltcG9ydCBleHRyYWN0R3JpZHMgZnJvbSAnLi4vZXh0cmFjdG9yL2V4dHJhY3RHcmlkcyc7XG5pbXBvcnQgZXh0cmFjdEZvbnRzIGZyb20gJy4uL2V4dHJhY3Rvci9leHRyYWN0Rm9udHMnO1xuaW1wb3J0IGV4dHJhY3RFZmZlY3RzIGZyb20gJy4uL2V4dHJhY3Rvci9leHRyYWN0RWZmZWN0cyc7XG5pbXBvcnQgZXh0cmFjdE1vdGlvbiBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdE1vdGlvbic7XG5pbXBvcnQgZXh0cmFjdFNpemVzIGZyb20gJy4uL2V4dHJhY3Rvci9leHRyYWN0U2l6ZXMnO1xuaW1wb3J0IGV4dHJhY3RTcGFjaW5nIGZyb20gJy4uL2V4dHJhY3Rvci9leHRyYWN0U3BhY2luZyc7XG5pbXBvcnQgZXh0cmFjdEJvcmRlcnMgZnJvbSAnLi4vZXh0cmFjdG9yL2V4dHJhY3RCb3JkZXJzJztcbmltcG9ydCBleHRyYWN0UmFkaWkgZnJvbSAnLi4vZXh0cmFjdG9yL2V4dHJhY3RSYWRpaSc7XG5pbXBvcnQgZ3JvdXBCeU5hbWUgZnJvbSAnLi9ncm91cEJ5TmFtZSc7XG5pbXBvcnQgc3R5bGVEaWN0aW9uYXJ5VHJhbnNmb3JtZXIgZnJvbSAnLi4vdHJhbnNmb3JtZXIvc3R5bGVEaWN0aW9uYXJ5VHJhbnNmb3JtZXInO1xuY29uc3QgdHJhbnNmb3JtZXIgPSB7XG4gICAgc3R5bGVEaWN0aW9uYXJ5OiBzdHlsZURpY3Rpb25hcnlUcmFuc2Zvcm1lclxufTtcbmNvbnN0IGV4cG9ydFJhd1Rva2VuQXJyYXkgPSAoZmlnbWFEYXRhKSA9PiB7XG4gICAgLy8gZ2V0IHRva2Vuc1xuICAgIHJldHVybiBbXG4gICAgICAgIC4uLmV4dHJhY3RTaXplcyhmaWdtYURhdGEudG9rZW5GcmFtZXMpLFxuICAgICAgICAuLi5leHRyYWN0U3BhY2luZyhmaWdtYURhdGEudG9rZW5GcmFtZXMpLFxuICAgICAgICAuLi5leHRyYWN0Qm9yZGVycyhmaWdtYURhdGEudG9rZW5GcmFtZXMpLFxuICAgICAgICAuLi5leHRyYWN0UmFkaWkoZmlnbWFEYXRhLnRva2VuRnJhbWVzKSxcbiAgICAgICAgLi4uZXh0cmFjdE1vdGlvbihmaWdtYURhdGEudG9rZW5GcmFtZXMpLFxuICAgICAgICAuLi5leHRyYWN0Q29sb3JzKGZpZ21hRGF0YS5wYWludFN0eWxlcyksXG4gICAgICAgIC4uLmV4dHJhY3RHcmlkcyhmaWdtYURhdGEuZ3JpZFN0eWxlcyksXG4gICAgICAgIC4uLmV4dHJhY3RGb250cyhmaWdtYURhdGEudGV4dFN0eWxlcyksXG4gICAgICAgIC4uLmV4dHJhY3RFZmZlY3RzKGZpZ21hRGF0YS5lZmZlY3RTdHlsZXMpXG4gICAgXTtcbn07XG5jb25zdCBnZXRUb2tlbkpzb24gPSAoZmlnbWFEYXRhLCBmb3JtYXQgPSAnc3R5bGVEaWN0aW9uYXJ5JywgbmFtZUNvbnZlcnNpb24gPSAnZGVmYXVsdCcpID0+IHtcbiAgICAvLyBnZXQgdG9rZW4gYXJyYXlcbiAgICBjb25zdCB0b2tlbkFycmF5ID0gZXhwb3J0UmF3VG9rZW5BcnJheShmaWdtYURhdGEpO1xuICAgIC8vIGZvcm1hdCB0b2tlbnNcbiAgICBjb25zdCBmb3JtYXR0ZWRUb2tlbnMgPSB0b2tlbkFycmF5Lm1hcCgodG9rZW4pID0+IHRyYW5zZm9ybWVyW2Zvcm1hdF0odG9rZW4pKTtcbiAgICAvLyBncm91cCB0b2tlbnNcbiAgICBjb25zdCBncm91cGVkVG9rZW5zID0gZ3JvdXBCeU5hbWUoZm9ybWF0dGVkVG9rZW5zLCB0cnVlLCBuYW1lQ29udmVyc2lvbik7XG4gICAgLy8gcmV0dXJuIGdyb3VwIHRva2Vuc1xuICAgIHJldHVybiBncm91cGVkVG9rZW5zO1xufTtcbmV4cG9ydCBkZWZhdWx0IGdldFRva2VuSnNvbjtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHNlbVZlckRpZmZlcmVuY2UgZnJvbSAnLi9zZW1WZXJEaWZmZXJlbmNlJztcbmltcG9ydCBjdXJyZW50VmVyc2lvbiBmcm9tICcuL3ZlcnNpb24nO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5jb25zdCBnZXRWZXJzaW9uRGlmZmVyZW5jZSA9IChmaWdtYSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgLy8gZ2V0IHZlcnNpb24gJiB2ZXJzaW9uIGRpZmZlcmVuY2VcbiAgICBjb25zdCBsYXN0VmVyc2lvblNldHRpbmdzT3BlbmVkID0geWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYyhjb25maWcua2V5Lmxhc3RWZXJzaW9uU2V0dGluZ3NPcGVuZWQpO1xuICAgIGNvbnN0IHZlcnNpb25EaWZmZXJlbmNlID0gc2VtVmVyRGlmZmVyZW5jZShjdXJyZW50VmVyc2lvbiwgbGFzdFZlcnNpb25TZXR0aW5nc09wZW5lZCk7XG4gICAgLy8gdXBkYXRlIHZlcnNpb25cbiAgICBpZiAoIWxhc3RWZXJzaW9uU2V0dGluZ3NPcGVuZWQgfHwgbGFzdFZlcnNpb25TZXR0aW5nc09wZW5lZCAhPT0gY3VycmVudFZlcnNpb24pIHtcbiAgICAgICAgeWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYyhjb25maWcua2V5Lmxhc3RWZXJzaW9uU2V0dGluZ3NPcGVuZWQsIGN1cnJlbnRWZXJzaW9uKTtcbiAgICB9XG4gICAgLy8gcmV0dXJuIHZlcnNpb24gRGlmZmVyZW5jZVxuICAgIHJldHVybiB2ZXJzaW9uRGlmZmVyZW5jZTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgZ2V0VmVyc2lvbkRpZmZlcmVuY2U7XG4iLCJpbXBvcnQgZGVlcE1lcmdlIGZyb20gJy4vZGVlcE1lcmdlJztcbmltcG9ydCB0cmFuc2Zvcm1OYW1lIGZyb20gJy4uL3V0aWxpdGllcy90cmFuc2Zvcm1OYW1lJztcbi8vIGNyZWF0ZSBhIG5lc3RlZCBvYmplY3Qgc3RydWN0dXJlIGZyb20gdGhlIGFycmF5IChbJ3N0eWxlJywnY29sb3JzJywnbWFpbicsJ3JlZCddKVxuY29uc3QgbmVzdGVkT2JqZWN0RnJvbUFycmF5ID0gKGFycmF5LCB2YWx1ZSkgPT4ge1xuICAgIC8vIHJlZHVjZXJcbiAgICBjb25zdCByZWR1Y2VyID0gKHZhbCwga2V5KSA9PiAoeyBba2V5XTogdmFsIH0pO1xuICAgIC8vIHJldHVybiByZWR1Y2VkIGFycmF5XG4gICAgcmV0dXJuIGFycmF5LnJlZHVjZVJpZ2h0KHJlZHVjZXIsIHZhbHVlKTtcbn07XG5jb25zdCBncm91cEJ5TmFtZSA9ICh0b2tlbkFycmF5LCByZW1vdmVOYW1lID0gdHJ1ZSwgbmFtZUNvbnZlcnNpb24gPSAnZGVmYXVsdCcpID0+IHtcbiAgICAvLyBuZXN0IHRva2VucyBpbnRvIG9iamVjdCB3aXRoIGhpZXJhY2h5IGRlZmluZWQgYnkgbmFtZSB1c2luZyAvXG4gICAgY29uc3QgZ3JvdXBlZFRva2VucyA9IHRva2VuQXJyYXkubWFwKHRva2VuID0+IHtcbiAgICAgICAgLy8gc3BsaXQgdG9rZW4gbmFtZSBpbnRvIGFycmF5XG4gICAgICAgIC8vIHJlbW92ZSBsZWFkaW5nIGFuZCBmb2xsb3dpbmcgd2hpdGVzcGFjZSBmb3IgZXZlcnkgaXRlbVxuICAgICAgICAvLyB0cmFuc2Zvcm0gaXRlbXMgdG8gbG93ZXJDYXNlXG4gICAgICAgIGNvbnN0IGdyb3Vwc0Zyb21OYW1lID0gdG9rZW4ubmFtZS5zcGxpdCgnLycpLm1hcChncm91cCA9PiB0cmFuc2Zvcm1OYW1lKGdyb3VwLCBuYW1lQ29udmVyc2lvbikpO1xuICAgICAgICAvLyByZW1vdmUgbmFtZSBpZiBub3Qgb3RoZXJ3aXNlIHNwZWNpZmllZFxuICAgICAgICBpZiAocmVtb3ZlTmFtZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgZGVsZXRlIHRva2VuLm5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmV0dXJuXG4gICAgICAgIHJldHVybiBuZXN0ZWRPYmplY3RGcm9tQXJyYXkoZ3JvdXBzRnJvbU5hbWUsIHRva2VuKTtcbiAgICB9KTtcbiAgICBpZiAoZ3JvdXBlZFRva2Vucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIHJldHVybiBtZXJnZWQgb2JqZWN0IG9mIHRva2VucyBncm91cGVkIGJ5IG5hbWUgaGllcmFjaHlcbiAgICAgICAgcmV0dXJuIGdyb3VwZWRUb2tlbnMucmVkdWNlKChhY2N1bXVsYXRvciA9IHt9LCBjdXJyZW50VmFsdWUpID0+IGRlZXBNZXJnZShhY2N1bXVsYXRvciwgY3VycmVudFZhbHVlKSk7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbn07XG5leHBvcnQgZGVmYXVsdCBncm91cEJ5TmFtZTtcbiIsIi8qKlxuICogSWYgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGEgbnVtYmVyXG4gKiBpdCBpcyByb3VuZGVkIHRvIDMgZGVjaW1hbCBwb3NpdGlvbnNcbiAqIG90aGVyd2lzZSBpdCBpcyByZXR1cm5lZCBhcyBpc1xuICogQHBhcmFtIHZhbHVlIG51bWJlclxuICogQHBhcmFtIGRlY2ltYWxQbGFjZXMgaW50XG4gKi9cbmNvbnN0IHJvdW5kV2l0aERlY2ltYWxzID0gKHZhbHVlLCBkZWNpbWFsUGxhY2VzID0gMikgPT4ge1xuICAgIC8vIGV4aXQgaWYgdmFsdWUgaXMgdW5kZWZpbmVkXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBjaGVjayBmb3IgY29ycmVjdCBpbnB1dHNcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJyB8fCB0eXBlb2YgZGVjaW1hbFBsYWNlcyAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHBhcmFtZXRlcnMsIGJvdGggdmFsdWUgXCIke3ZhbHVlfVwiICgke3R5cGVvZiB2YWx1ZX0pIGFuZCBkZWNpbWFsUGxhY2VzIFwiJHtkZWNpbWFsUGxhY2VzfVwiICgke3R5cGVvZiBkZWNpbWFsUGxhY2VzfSkgbXVzdCBiZSBvZiB0eXBlIG51bWJlcmApO1xuICAgIH1cbiAgICAvLyBzZXQgZGVjaW1hbCBwbGFjZXNcbiAgICBjb25zdCBmYWN0b3JPZlRlbiA9IE1hdGgucG93KDEwLCBkZWNpbWFsUGxhY2VzKTtcbiAgICAvLyByb3VuZCByZXN1bHQgYW5kIHJldHVyblxuICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlICogZmFjdG9yT2ZUZW4pIC8gZmFjdG9yT2ZUZW47XG59O1xuZXhwb3J0IGRlZmF1bHQgcm91bmRXaXRoRGVjaW1hbHM7XG4iLCJleHBvcnQgZGVmYXVsdCAoY3VycmVudFNlbVZlciwgcHJldlNlbVZlcnMgPSAnMS4wLjAnKSA9PiB7XG4gICAgY29uc3QgW3BNYWpvciwgcE1pbm9yLCBwUGF0Y2hdID0gcHJldlNlbVZlcnMuc3BsaXQoJy4nKTtcbiAgICBjb25zdCBbY01ham9yLCBjTWlub3IsIGNQYXRjaF0gPSBjdXJyZW50U2VtVmVyLnNwbGl0KCcuJyk7XG4gICAgaWYgKHBNYWpvciA8IGNNYWpvcikge1xuICAgICAgICByZXR1cm4gJ21ham9yJztcbiAgICB9XG4gICAgaWYgKHBNaW5vciA8IGNNaW5vcikge1xuICAgICAgICByZXR1cm4gJ21pbm9yJztcbiAgICB9XG4gICAgaWYgKHBQYXRjaCA8IGNQYXRjaCkge1xuICAgICAgICByZXR1cm4gJ3BhdGNoJztcbiAgICB9XG59O1xuIiwiaW1wb3J0IHNldHRpbmdzRGVmYXVsdCBmcm9tICcuL3NldHRpbmdzRGVmYXVsdCc7XG5jb25zdCBzZXR0aW5nc0tleSA9ICdzZXR0aW5ncyc7XG4vKipcbiAqIEZ1bmN0aW9uIHNhbml0aXplcyBhbmQgcHJlcGFyZXMgc2V0dGluZ3MgdG8gYmUgc3RvcmVkXG4gKiBAcGFyYW0gbmV3U2V0dGluZ3NcbiAqIEBwYXJhbSBjdXJyZW50U2V0dGluZ3NcbiAqL1xuY29uc3Qgc2V0dGluZ3NQcmVwYXJlID0gKG5ld1NldHRpbmdzLCBjdXJyZW50U2V0dGluZ3MpID0+IHtcbiAgICAvLyBpbml0aWFsaXplIG9iamVjdFxuICAgIGNvbnN0IG1lcmdlZFNldHRpbmdzID0ge307XG4gICAgLy8gYWRkIHB1YmxpYyBzZXR0aW5nc1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHNldHRpbmdzRGVmYXVsdCkpIHtcbiAgICAgICAgLy8gYXZvaWQgZW1wdHkgdmFsdWVzXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUuZGVmYXVsdCA9PT0gJ3N0cmluZycgJiYgdmFsdWUuZW1wdHkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAobmV3U2V0dGluZ3Nba2V5XS50cmltKCkgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgbmV3U2V0dGluZ3Nba2V5XSA9IGN1cnJlbnRTZXR0aW5nc1trZXldIHx8IHZhbHVlLmRlZmF1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgdmFsaWQgbmV3IHNldHRpbmdzXG4gICAgICAgIGlmICh0eXBlb2YgbmV3U2V0dGluZ3Nba2V5XSA9PT0gdHlwZW9mIHZhbHVlLmRlZmF1bHQpIHtcbiAgICAgICAgICAgIG1lcmdlZFNldHRpbmdzW2tleV0gPSBuZXdTZXR0aW5nc1trZXldO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHZhbGlkIGN1cnJlbnQgc2V0dGluZ3NcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGN1cnJlbnRTZXR0aW5nc1trZXldID09PSB0eXBlb2YgdmFsdWUuZGVmYXVsdCkge1xuICAgICAgICAgICAgbWVyZ2VkU2V0dGluZ3Nba2V5XSA9IGN1cnJlbnRTZXR0aW5nc1trZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gaWYgYm90aCBuZXcgYW5kIG9sZCB2YWx1ZSBkb24ndCBmaXQsIHVzZSBkZWZhdWx0XG4gICAgICAgICAgICBtZXJnZWRTZXR0aW5nc1trZXldID0gdmFsdWUuZGVmYXVsdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyByZXR1cm4gbWVyZ2VkIHNldHRpbmdzIG9iamVjdFxuICAgIHJldHVybiBtZXJnZWRTZXR0aW5ncztcbn07XG4vKipcbiAqIGdldCB0aGUgY3VycmVudCB1c2VycyBzZXR0aW5nc1xuICogZm9yIHNldHRpbmdzIHRoYXQgYXJlIG5vdCBzZXQsIHRoZSBkZWZhdWx0cyB3aWxsIGJlIHVzZWRcbiAqIEByZXR1cm4gb2JqZWN0XG4gKi9cbmNvbnN0IGdldFNldHRpbmdzID0gKCkgPT4ge1xuICAgIGxldCB1c2VyU2V0dGluZ3MgPSBmaWdtYS5yb290LmdldFBsdWdpbkRhdGEoc2V0dGluZ3NLZXkpO1xuICAgIGlmICh1c2VyU2V0dGluZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICB1c2VyU2V0dGluZ3MgPSBKU09OLnBhcnNlKHVzZXJTZXR0aW5ncyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB1c2VyU2V0dGluZ3MgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIC8vIGluaXQgc2V0dGluZ3Mgb2JqZWN0XG4gICAgY29uc3Qgc2V0dGluZ3MgPSB7fTtcbiAgICAvLyBmaWxsIHdpdGggdXNlciBzZXR0aW5ncyBvciBkZWZhdWx0c1xuICAgIE9iamVjdC5lbnRyaWVzKHNldHRpbmdzRGVmYXVsdCkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgIGlmICh1c2VyU2V0dGluZ3MgIT09IHVuZGVmaW5lZCAmJiB1c2VyU2V0dGluZ3Nba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gc2V0dGluZ3Nba2V5XSA9IHVzZXJTZXR0aW5nc1trZXldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZXR0aW5nc1trZXldID0gdmFsdWUuZGVmYXVsdDtcbiAgICB9KTtcbiAgICByZXR1cm4gc2V0dGluZ3M7XG59O1xuLyoqXG4gKiBAbmFtZSBzYXZlU2V0dGluZ3NcbiAqIEBkZXNjcmlwdGlvbiBzYXZlIHRoZSB1c2VyIHNldHRpbmdzIHRvIHRoZSBcImNhY2hlXCJcbiAqIEBwYXJhbSB7VXNlclNldHRpbmdzfSBzZXR0aW5nc1xuICovXG5jb25zdCBzZXRTZXR0aW5ncyA9IChzZXR0aW5ncykgPT4ge1xuICAgIHNldHRpbmdzID0gc2V0dGluZ3NQcmVwYXJlKHNldHRpbmdzLCBnZXRTZXR0aW5ncygpKTtcbiAgICAvLyBzdG9yZSBwdWJsaWMgc2V0dGluZ3MgdGhhdCBzaG91bGQgYmUgc2hhcmVkIGFjcm9zcyBvcmdcbiAgICBmaWdtYS5yb290LnNldFBsdWdpbkRhdGEoc2V0dGluZ3NLZXksIEpTT04uc3RyaW5naWZ5KHNldHRpbmdzLCBudWxsLCAyKSk7XG59O1xuLy8gZXhwb3J0c1xuZXhwb3J0IHsgc2V0dGluZ3NLZXksIGdldFNldHRpbmdzLCBzZXRTZXR0aW5ncyB9O1xuZXhwb3J0IGNvbnN0IF9fdGVzdGluZyA9IHtcbiAgICBzZXR0aW5nc1ByZXBhcmU6IHNldHRpbmdzUHJlcGFyZVxufTtcbiIsIi8qIGlzdGFuYnVsIGlnbm9yZSBmaWxlICovXG4vLyBzZXR0aW5ncyBzdHJ1Y3R1cmUgJiBkZWZhdWx0IHZhbHVlc1xuZXhwb3J0IGRlZmF1bHQge1xuICAgIGZpbGVuYW1lOiB7XG4gICAgICAgIGRlZmF1bHQ6ICdkZXNpZ24tdG9rZW5zJyxcbiAgICAgICAgZW1wdHk6IGZhbHNlXG4gICAgfSxcbiAgICBuYW1lQ29udmVyc2lvbjoge1xuICAgICAgICBkZWZhdWx0OiAnZGVmYXVsdCcsXG4gICAgICAgIGVtcHR5OiBmYWxzZVxuICAgIH0sXG4gICAgZXhjbHVkZVByZWZpeDoge1xuICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgICBlbXB0eTogZmFsc2VcbiAgICB9LFxuICAgIHByZWZpeDoge1xuICAgICAgICBkZWZhdWx0OiAnXycsXG4gICAgICAgIGVtcHR5OiBmYWxzZVxuICAgIH0sXG4gICAgc2VydmVyVXJsOiB7XG4gICAgICAgIGRlZmF1bHQ6ICcnLFxuICAgICAgICBlbXB0eTogdHJ1ZVxuICAgIH0sXG4gICAgZXZlbnRUeXBlOiB7XG4gICAgICAgIGRlZmF1bHQ6ICd1cGRhdGUtdG9rZW5zJyxcbiAgICAgICAgZW1wdHk6IGZhbHNlXG4gICAgfSxcbiAgICBhY2NlcHRIZWFkZXI6IHtcbiAgICAgICAgZGVmYXVsdDogJ2FwcGxpY2F0aW9uL3ZuZC5naXRodWIuZXZlcmVzdC1wcmV2aWV3K2pzb24nLFxuICAgICAgICBlbXB0eTogdHJ1ZVxuICAgIH0sXG4gICAgYXV0aFR5cGU6IHtcbiAgICAgICAgZGVmYXVsdDogJ3Rva2VuJyxcbiAgICAgICAgZW1wdHk6IGZhbHNlXG4gICAgfVxufTtcbiIsImNvbnN0IHJldHVybk9yVGhyb3cgPSAoY29udmVydGVkU3RyaW5nLCBvcmlnaW5hbFN0cmluZywgc3RyaW5nQ2FzZSkgPT4ge1xuICAgIC8vIHJldHVybiBjb252ZXJ0ZWQgc3RyaW5nIGlmIHN1Y2Nlc3NmdWxcbiAgICBpZiAodHlwZW9mIGNvbnZlcnRlZFN0cmluZyA9PT0gJ3N0cmluZycgJiYgY29udmVydGVkU3RyaW5nICE9PSAnJykge1xuICAgICAgICByZXR1cm4gY29udmVydGVkU3RyaW5nO1xuICAgIH1cbiAgICAvLyB0aHJvdyBlcnJvclxuICAgIHRocm93IG5ldyBFcnJvcihgY29udmVydGluZyBcIiR7b3JpZ2luYWxTdHJpbmd9XCIgdG8gJHtzdHJpbmdDYXNlfSwgcmVzdWx0aW5nIGluIFwiJHtjb252ZXJ0ZWRTdHJpbmd9XCJgKTtcbn07XG5jb25zdCB0b0NhbWVsQ2FzZSA9IChzdHJpbmcpID0+IHtcbiAgICBjb25zdCBjb252ZXJ0ZWRTdHJpbmcgPSBzdHJpbmcudG9Mb3dlckNhc2UoKVxuICAgICAgICAucmVwbGFjZSgvWydcIl0vZywgJycpXG4gICAgICAgIC5yZXBsYWNlKC8oWy1fIF0pezEsfS9nLCAnICcpXG4gICAgICAgIC5yZXBsYWNlKC9cXFcrL2csICcgJylcbiAgICAgICAgLnRyaW0oKVxuICAgICAgICAucmVwbGFjZSgvICguKS9nLCBmdW5jdGlvbiAoJDEpIHsgcmV0dXJuICQxLnRvVXBwZXJDYXNlKCk7IH0pXG4gICAgICAgIC5yZXBsYWNlKC8gL2csICcnKTtcbiAgICAvLyByZXR1cm4gb3IgdGhyb3dcbiAgICByZXR1cm4gcmV0dXJuT3JUaHJvdyhjb252ZXJ0ZWRTdHJpbmcsIHN0cmluZywgJ2NhbWVsQ2FzZScpO1xufTtcbmNvbnN0IHRvS2ViYWJDYXNlID0gKHN0cmluZykgPT4ge1xuICAgIGNvbnN0IGNvbnZlcnRlZFN0cmluZyA9IHN0cmluZy50b0xvd2VyQ2FzZSgpXG4gICAgICAgIC5yZXBsYWNlKC9bJ1wiXS9nLCAnJylcbiAgICAgICAgLnJlcGxhY2UoLyhbLV8gXSl7MSx9L2csICcgJylcbiAgICAgICAgLnJlcGxhY2UoL1xcVysvZywgJyAnKVxuICAgICAgICAudHJpbSgpXG4gICAgICAgIC5yZXBsYWNlKC8gL2csICctJyk7XG4gICAgLy8gcmV0dXJuIG9yIHRocm93XG4gICAgcmV0dXJuIHJldHVybk9yVGhyb3coY29udmVydGVkU3RyaW5nLCBzdHJpbmcsICdrZWJhYkNhc2UnKTtcbn07XG5jb25zdCB0cmFuc2Zvcm1OYW1lID0gKG5hbWUsIG5hbWVDb252ZXJzaW9uID0gJ2RlZmF1bHQnKSA9PiB7XG4gICAgLy8gaWYgY2FtZWxDYXNlXG4gICAgaWYgKG5hbWVDb252ZXJzaW9uID09PSAnY2FtZWxDYXNlJykge1xuICAgICAgICByZXR1cm4gdG9DYW1lbENhc2UobmFtZSk7XG4gICAgfVxuICAgIC8vIGlmIGtlYmFiQ2FzZVxuICAgIGlmIChuYW1lQ29udmVyc2lvbiA9PT0gJ2tlYmFiQ2FzZScpIHtcbiAgICAgICAgcmV0dXJuIHRvS2ViYWJDYXNlKG5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gbmFtZS50cmltKCkudG9Mb3dlckNhc2UoKTtcbn07XG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1OYW1lO1xuZXhwb3J0IGNvbnN0IF9fdGVzdGluZyA9IHtcbiAgICB0b0NhbWVsQ2FzZTogdG9DYW1lbENhc2UsXG4gICAgdG9LZWJhYkNhc2U6IHRvS2ViYWJDYXNlXG59O1xuIiwiLyogaXN0YW5idWwgaWdub3JlIGZpbGUgKi9cbmNvbnN0IHZlcnNpb24gPSAnMy4wLjEnO1xuZXhwb3J0IGRlZmF1bHQgdmVyc2lvbjtcbiJdLCJzb3VyY2VSb290IjoiIn0=