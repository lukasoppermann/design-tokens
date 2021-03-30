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
/* harmony import */ var _getTokenNodes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getTokenNodes */ "./src/utilities/getTokenNodes.ts");
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
    const tokenFrames = Object(_getTokenNodes__WEBPACK_IMPORTED_MODULE_3__["default"])([...figma.root.children]);
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

/***/ "./src/utilities/extractTokenNodeValues.ts":
/*!*************************************************!*\
  !*** ./src/utilities/extractTokenNodeValues.ts ***!
  \*************************************************/
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
 * extractTokenNodeValues
 * @param node: SceneNode
 * @returns node object
 */
const extractTokenNodeValues = (node) => ({
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
/* harmony default export */ __webpack_exports__["default"] = (extractTokenNodeValues);


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

/***/ "./src/utilities/getTokenNodes.ts":
/*!****************************************!*\
  !*** ./src/utilities/getTokenNodes.ts ***!
  \****************************************/
/*! exports provided: default, __testing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__testing", function() { return __testing; });
/* harmony import */ var _extractTokenNodeValues__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extractTokenNodeValues */ "./src/utilities/extractTokenNodeValues.ts");
/* harmony import */ var _isTokenNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isTokenNode */ "./src/utilities/isTokenNode.ts");


// the name that token frames have
const tokenFrameName = '_tokens';
// check if a frame is a _token frame
const isTokenFrame = (node) => node.type === 'FRAME' && node.name.trim().toLowerCase().substr(0, tokenFrameName.length) === tokenFrameName;
// return only nodes that are frames
const getFrameNodes = (nodes) => [...nodes.map(page => page.findChildren(node => isTokenFrame(node))).reduce((flatten, arr) => [...flatten, ...arr])];
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
const getTokenNodes = (pages) => {
    // get token frames
    const tokenFrames = getFrameNodes(pages);
    // get all children of token frames
    return tokenFrames.map(frame => frame
        // check if children are of valide types
        .findAll(
    /* istanbul ignore next */
    node => Object(_isTokenNode__WEBPACK_IMPORTED_MODULE_1__["default"])(node)))
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
            return item.children.map((child) => (Object.assign(Object.assign({}, Object(_extractTokenNodeValues__WEBPACK_IMPORTED_MODULE_0__["default"])(child)), { name: getVariantName(item.name, child.name) })));
        }
        // return normal item as array to unpack later
        // @ts-ignore
        return [Object(_extractTokenNodeValues__WEBPACK_IMPORTED_MODULE_0__["default"])(item)];
    })
        // merges the variant children into one array
        .reduce((flatten, arr) => [...flatten, ...arr], []);
};
/* harmony default export */ __webpack_exports__["default"] = (getTokenNodes);
const __testing = {
    isTokenNode: _isTokenNode__WEBPACK_IMPORTED_MODULE_1__["default"],
    isTokenFrame: isTokenFrame
};


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

/***/ "./src/utilities/isTokenNode.ts":
/*!**************************************!*\
  !*** ./src/utilities/isTokenNode.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// the node types that can be used for tokens
const tokenNodeTypes = [
    'COMPONENT',
    'COMPONENT_SET',
    'RECTANGLE',
    'FRAME'
];
/**
 * check if a node is a valid token node type
 * Currently: 'COMPONENT', 'FRAME or 'RECTANGLE'
 * @param SceneNode node
 */
const isTokenNode = (node) => {
    return node.parent.type !== 'COMPONENT_SET' && tokenNodeTypes.includes(node.type);
};
/* harmony default export */ __webpack_exports__["default"] = (isTokenNode);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0Qm9yZGVycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RDb2xvcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0RWZmZWN0cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RGb250cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RHcmlkcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RNb3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0UmFkaWkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0U2l6ZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0U3BhY2luZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVyL3N0eWxlRGljdGlvbmFyeVRyYW5zZm9ybWVyLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lci91dGlsaXRpZXMvZ2V0RGVzY3JpcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9hY2Nlc3NUb2tlbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2J1aWxkRmlnbWFEYXRhLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvY29uZmlnLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvY29udmVydENvbG9yLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvZGVlcE1lcmdlLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvZXh0cmFjdFRva2VuTm9kZVZhbHVlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2ZpbHRlckJ5TmFtZVByb3BlcnR5LnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvZ2V0RWZmZWN0U3R5bGVzLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvZ2V0RmlsZUlkLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvZ2V0R3JpZFN0eWxlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2dldEpzb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9nZXRQYWludFN0eWxlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2dldFRleHRTdHlsZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9nZXRUb2tlbkpzb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9nZXRUb2tlbk5vZGVzLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvZ2V0VmVyc2lvbkRpZmZlcmVuY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9ncm91cEJ5TmFtZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2lzVG9rZW5Ob2RlLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvcm91bmRXaXRoRGVjaW1hbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9zZW1WZXJEaWZmZXJlbmNlLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvc2V0dGluZ3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9zZXR0aW5nc0RlZmF1bHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy90cmFuc2Zvcm1OYW1lLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvdmVyc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FB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SywrQkFBK0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNlLDJFQUFZLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUN2RDVCO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLEdBQUc7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlLDRFQUFhLEVBQUM7QUFDdEI7QUFDUDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM1Q0E7QUFBQTtBQUNBO0FBQ2Usc0VBQU8sRUFBQyIsImZpbGUiOiJwbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCByb3VuZFdpdGhEZWNpbWFscyBmcm9tICcuLi91dGlsaXRpZXMvcm91bmRXaXRoRGVjaW1hbHMnO1xuY29uc3Qgc3Ryb2tlSm9pbnMgPSB7XG4gICAgTUlURVI6ICdtaXRlcicsXG4gICAgQkVWRUw6ICdiZXZlbCcsXG4gICAgUk9VTkQ6ICdyb3VuZCdcbn07XG5jb25zdCBzdHJva2VBbGlnbnMgPSB7XG4gICAgQ0VOVEVSOiAnY2VudGVyJyxcbiAgICBJTlNJREU6ICdpbnNpZGUnLFxuICAgIE9VVFNJREU6ICdvdXRzaWRlJ1xufTtcbmNvbnN0IGV4dHJhY3RCb3JkZXJzID0gKHRva2VuTm9kZXMpID0+IHtcbiAgICBjb25zdCBub2RlTmFtZSA9ICdib3JkZXJzJztcbiAgICAvLyByZXR1cm4gYXMgb2JqZWN0XG4gICAgcmV0dXJuIHRva2VuTm9kZXNcbiAgICAgICAgLy8gb25seSBnZXQgYm9yZGVyIG5vZGVzXG4gICAgICAgIC5maWx0ZXIobm9kZSA9PiBub2RlLm5hbWUuc3Vic3RyKDAsIG5vZGVOYW1lLmxlbmd0aCkgPT09IG5vZGVOYW1lKVxuICAgICAgICAvLyByZW1vdmUgbm9kZXMgd2l0aCBubyBib3JkZXIgcHJvcGVydHlcbiAgICAgICAgLmZpbHRlcihub2RlID0+IG5vZGUuc3Ryb2tlcy5sZW5ndGggPiAwKVxuICAgICAgICAvLyBjb252ZXJ0IGJvcmRlcnNcbiAgICAgICAgLm1hcChub2RlID0+ICh7XG4gICAgICAgIG5hbWU6IG5vZGUubmFtZSxcbiAgICAgICAgY2F0ZWdvcnk6ICdib3JkZXInLFxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGRlc2NyaXB0aW9uOiBub2RlLmRlc2NyaXB0aW9uIHx8IG51bGwsXG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgc3Ryb2tlQWxpZ246IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogc3Ryb2tlQWxpZ25zW25vZGUuc3Ryb2tlQWxpZ25dLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGFzaFBhdHRlcm46IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbm9kZS5kYXNoUGF0dGVybi50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3Ryb2tlQ2FwOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6ICgodHlwZW9mIG5vZGUuc3Ryb2tlQ2FwID09PSAnc3RyaW5nJykgPyBub2RlLnN0cm9rZUNhcC50b0xvd2VyQ2FzZSgpIDogJ21peGVkJyksXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdHJva2VKb2luOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHN0cm9rZUpvaW5zW25vZGUuc3Ryb2tlSm9pbl0sXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdHJva2VNaXRlckxpbWl0OiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKG5vZGUuc3Ryb2tlTWl0ZXJMaW1pdCksXG4gICAgICAgICAgICAgICAgdW5pdDogJ2RlZ3JlZScsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBzdHJva2VTdHlsZUlkOiB7XG4gICAgICAgICAgICAvLyAgIHZhbHVlOiBub2RlLnN0cm9rZVN0eWxlSWRcbiAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICBzdHJva2VXZWlnaHQ6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbm9kZS5zdHJva2VXZWlnaHQsXG4gICAgICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0cm9rZToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLnN0cm9rZXNbMF0sXG4gICAgICAgICAgICAgICAgdHlwZTogJ2NvbG9yJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3RCb3JkZXJzO1xuIiwiaW1wb3J0IHsgY29udmVydFBhaW50VG9SZ2JhLCByb3VuZFJnYmEgfSBmcm9tICcuLi91dGlsaXRpZXMvY29udmVydENvbG9yJztcbmltcG9ydCByb3VuZFdpdGhEZWNpbWFscyBmcm9tICcuLi91dGlsaXRpZXMvcm91bmRXaXRoRGVjaW1hbHMnO1xuY29uc3QgZ3JhZGllbnRUeXBlID0ge1xuICAgIEdSQURJRU5UX0xJTkVBUjogJ2xpbmVhcicsXG4gICAgR1JBRElFTlRfUkFESUFMOiAncmFkaWFsJyxcbiAgICBHUkFESUVOVF9BTkdVTEFSOiAnYW5ndWxhcicsXG4gICAgR1JBRElFTlRfRElBTU9ORDogJ2RpYW1vbmQnXG59O1xuY29uc3QgZXh0cmFjdEZpbGxzID0gKHBhaW50KSA9PiB7XG4gICAgaWYgKHBhaW50LnR5cGUgPT09ICdTT0xJRCcpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZpbGw6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogY29udmVydFBhaW50VG9SZ2JhKHBhaW50KSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmIChbJ0dSQURJRU5UX0xJTkVBUicsICdHUkFESUVOVF9SQURJQUwnLCAnR1JBRElFTlRfQU5HVUxBUicsICdHUkFESUVOVF9ESUFNT05EJ10uaW5jbHVkZXMocGFpbnQudHlwZSkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdyYWRpZW50VHlwZToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBncmFkaWVudFR5cGVbcGFpbnQudHlwZV0sXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdG9wczogcGFpbnQuZ3JhZGllbnRTdG9wcy5tYXAoc3RvcCA9PiAoe1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhzdG9wLnBvc2l0aW9uKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbG9yOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFJnYmEoc3RvcC5jb2xvciksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdjb2xvcidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICBvcGFjaXR5OiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKHBhaW50Lm9wYWNpdHkpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIC8vIHJldHVybiBudWxsIGlmIG5vIG1hdGNoaW5nIHR5cGVcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHJldHVybiBudWxsO1xufTtcbmNvbnN0IGV4dHJhY3RDb2xvcnMgPSAodG9rZW5Ob2RlcykgPT4ge1xuICAgIC8vIGdldCBhbGwgcGFpbnQgc3R5bGVzXG4gICAgcmV0dXJuIHRva2VuTm9kZXNcbiAgICAgICAgLy8gcmVtb3ZlIGltYWdlcyBmaWxscyBmcm9tIHRva2Vuc1xuICAgICAgICAubWFwKG5vZGUgPT4ge1xuICAgICAgICBub2RlLnBhaW50cyA9IG5vZGUucGFpbnRzLmZpbHRlcihwYWludCA9PiBwYWludC50eXBlICE9PSAnSU1BR0UnKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfSlcbiAgICAgICAgLy8gcmVtb3ZlIHRva2VucyB3aXRoIG5vIGZpbGxcbiAgICAgICAgLmZpbHRlcihub2RlID0+IG5vZGUucGFpbnRzLmxlbmd0aCA+IDApXG4gICAgICAgIC8vIHRyYW5zZm9ybSBzdHlsZVxuICAgICAgICAubWFwKG5vZGUgPT4gKHtcbiAgICAgICAgbmFtZTogbm9kZS5uYW1lLFxuICAgICAgICAvLyBpZDogbm9kZS5pZCxcbiAgICAgICAgZGVzY3JpcHRpb246IG5vZGUuZGVzY3JpcHRpb24gfHwgbnVsbCxcbiAgICAgICAgY2F0ZWdvcnk6ICdmaWxsJyxcbiAgICAgICAgdmFsdWVzOiBub2RlLnBhaW50cy5tYXAocGFpbnQgPT4gZXh0cmFjdEZpbGxzKHBhaW50KSlcbiAgICB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZXh0cmFjdENvbG9ycztcbiIsImltcG9ydCB7IHJvdW5kUmdiYSB9IGZyb20gJy4uL3V0aWxpdGllcy9jb252ZXJ0Q29sb3InO1xuY29uc3QgZWZmZWN0VHlwZSA9IHtcbiAgICBMQVlFUl9CTFVSOiAnbGF5ZXJCbHVyJyxcbiAgICBCQUNLR1JPVU5EX0JMVVI6ICdiYWNrZ3JvdW5kQmx1cicsXG4gICAgRFJPUF9TSEFET1c6ICdkcm9wU2hhZG93JyxcbiAgICBJTk5FUl9TSEFET1c6ICdpbm5lclNoYWRvdydcbn07XG5jb25zdCBibHVyVmFsdWVzID0gKGVmZmVjdCkgPT4gKHtcbiAgICB0eXBlOiB7XG4gICAgICAgIHZhbHVlOiBlZmZlY3RUeXBlW2VmZmVjdC50eXBlXSxcbiAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICB9LFxuICAgIHJhZGl1czoge1xuICAgICAgICB2YWx1ZTogZWZmZWN0LnJhZGl1cyxcbiAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICB9XG59KTtcbmNvbnN0IHNoYWRvd1ZhbHVlcyA9IGVmZmVjdCA9PiAoe1xuICAgIHR5cGU6IHtcbiAgICAgICAgdmFsdWU6IGVmZmVjdFR5cGVbZWZmZWN0LnR5cGVdLFxuICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgIH0sXG4gICAgcmFkaXVzOiB7XG4gICAgICAgIHZhbHVlOiBlZmZlY3QucmFkaXVzLFxuICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgIH0sXG4gICAgY29sb3I6IHtcbiAgICAgICAgdmFsdWU6IHJvdW5kUmdiYShlZmZlY3QuY29sb3IpLFxuICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgfSxcbiAgICBvZmZzZXQ6IHtcbiAgICAgICAgeDoge1xuICAgICAgICAgICAgdmFsdWU6IGVmZmVjdC5vZmZzZXQueCxcbiAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICB5OiB7XG4gICAgICAgICAgICB2YWx1ZTogZWZmZWN0Lm9mZnNldC55LFxuICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHNwcmVhZDoge1xuICAgICAgICB2YWx1ZTogZWZmZWN0LnNwcmVhZCxcbiAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICB9XG59KTtcbmNvbnN0IGV4dHJhY3RFZmZlY3RzID0gKHRva2VuTm9kZXMpID0+IHtcbiAgICAvLyBnZXQgZWZmZWN0IHN0eWxlc1xuICAgIHJldHVybiB0b2tlbk5vZGVzLm1hcChub2RlID0+ICh7XG4gICAgICAgIG5hbWU6IG5vZGUubmFtZSxcbiAgICAgICAgZGVzY3JpcHRpb246IG5vZGUuZGVzY3JpcHRpb24gfHwgbnVsbCxcbiAgICAgICAgY2F0ZWdvcnk6ICdlZmZlY3QnLFxuICAgICAgICB2YWx1ZXM6IG5vZGUuZWZmZWN0cy5tYXAoKGVmZmVjdCkgPT4gZWZmZWN0LnR5cGUgPT09ICdMQVlFUl9CTFVSJyB8fCBlZmZlY3QudHlwZSA9PT0gJ0JBQ0tHUk9VTkRfQkxVUidcbiAgICAgICAgICAgID8gYmx1clZhbHVlcyhlZmZlY3QpXG4gICAgICAgICAgICA6IHNoYWRvd1ZhbHVlcyhlZmZlY3QpKVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0RWZmZWN0cztcbiIsImltcG9ydCByb3VuZFdpdGhEZWNpbWFscyBmcm9tICcuLi91dGlsaXRpZXMvcm91bmRXaXRoRGVjaW1hbHMnO1xuY29uc3QgdGV4dERlY29yYXRpb25zID0ge1xuICAgIE5PTkU6ICdub25lJyxcbiAgICBVTkRFUkxJTkU6ICd1bmRlcmxpbmUnLFxuICAgIFNUUklLRVRIUk9VR0g6ICdsaW5lLXRocm91Z2gnXG59O1xuY29uc3QgdGV4dENhc2VzID0ge1xuICAgIE9SSUdJTkFMOiAnbm9uZScsXG4gICAgVVBQRVI6ICd1cHBlcmNhc2UnLFxuICAgIExPV0VSOiAnbG93ZXJjYXNlJyxcbiAgICBUSVRMRTogJ2NhcGl0YWxpemUnXG59O1xuY29uc3QgZm9udFdlaWdodHMgPSB7XG4gICAgdGhpbjogMTAwLFxuICAgIGV4dHJhbGlnaHQ6IDIwMCxcbiAgICB1bHRyYWxpZ2h0OiAyMDAsXG4gICAgbGlnaHQ6IDMwMCxcbiAgICBub3JtYWw6IDQwMCxcbiAgICByZWd1bGFyOiA0MDAsXG4gICAgbWVkaXVtOiA1MDAsXG4gICAgc2VtaWJvbGQ6IDYwMCxcbiAgICBkZW1pYm9sZDogNjAwLFxuICAgIGJvbGQ6IDcwMCxcbiAgICBleHRyYWJvbGQ6IDgwMCxcbiAgICB1bHRhYm9sZDogODAwLFxuICAgIGJsYWNrOiA5MDAsXG4gICAgaGVhdnk6IDkwMCxcbiAgICBzdXBlcjogOTAwXG59O1xuY29uc3QgZm9udFN0cmV0Y2ggPSB7XG4gICAgbm9ybWFsOiAnbm9ybWFsJyxcbiAgICBjb25kZW5zZWQ6ICdjb25kZW5zZWQnLFxuICAgIGV4cGFuZGVkOiAnZXhwYW5kZWQnLFxuICAgIGV4dGVuZGVkOiAnZXhwYW5kZWQnXG59O1xuY29uc3QgZm9udFN0eWxlcyA9IHtcbiAgICBub3JtYWw6ICdub3JtYWwnLFxuICAgIGl0YWxpYzogJ2l0YWxpYycsXG4gICAgb2JsaXF1ZTogJ29ibGlxdWUnXG59O1xuY29uc3QgcGFyc2VGb250V2VpZ2h0ID0gKGZvbnRTdHlsZSkgPT4ge1xuICAgIGNvbnN0IHBhcnRzID0gZm9udFN0eWxlLnRvTG93ZXJDYXNlKCkuc3BsaXQoJyAnKTtcbiAgICBsZXQgd2VpZ2h0ID0gcGFydHNbMF07XG4gICAgLy8gbWVyZ2UgaWYgc3BhY2UgYWZ0ZXIgZXh0cmFcbiAgICBpZiAoWydleHRyYScsICd1bHRyYScsICdzZW1pJywgJ2RlbWknXS5pbmNsdWRlcyhwYXJ0c1swXSkgJiYgWydib2xkJywgJ2xpZ2h0J10uaW5jbHVkZXMocGFydHNbMV0pKSB7XG4gICAgICAgIHdlaWdodCA9IGAke3BhcnRzWzBdfSR7cGFydHNbMV19YDtcbiAgICB9XG4gICAgcmV0dXJuIGZvbnRXZWlnaHRzW3dlaWdodF0gfHwgNDAwO1xufTtcbmNvbnN0IHBhcnNlRm9udFN0cmV0Y2ggPSAoZm9udFN0eWxlKSA9PiB7XG4gICAgY29uc3QgcGFydHMgPSBmb250U3R5bGUudG9Mb3dlckNhc2UoKS5zcGxpdCgnICcpO1xuICAgIHJldHVybiBmb250U3RyZXRjaFtwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXV0gfHwgZm9udFN0cmV0Y2hbcGFydHNbcGFydHMubGVuZ3RoIC0gMl1dIHx8ICdub3JtYWwnO1xufTtcbmNvbnN0IHBhcnNlRm9udFN0eWxlID0gKGZvbnRTdHlsZSkgPT4ge1xuICAgIGNvbnN0IHBhcnQgPSBmb250U3R5bGUudG9Mb3dlckNhc2UoKS5zcGxpdCgnICcpLnBvcCgpO1xuICAgIHJldHVybiBmb250U3R5bGVzW3BhcnRdIHx8ICdub3JtYWwnO1xufTtcbmNvbnN0IGV4dHJhY3RGb250cyA9ICh0b2tlbk5vZGVzKSA9PiB7XG4gICAgLy8gZ2V0IHJhdyB0ZXh0IHN0eWxlc1xuICAgIHJldHVybiB0b2tlbk5vZGVzLm1hcChub2RlID0+ICh7XG4gICAgICAgIG5hbWU6IG5vZGUubmFtZSxcbiAgICAgICAgZGVzY3JpcHRpb246IG5vZGUuZGVzY3JpcHRpb24gfHwgdW5kZWZpbmVkLFxuICAgICAgICBjYXRlZ29yeTogJ2ZvbnQnLFxuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG5vZGUuZm9udFNpemUsXG4gICAgICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRleHREZWNvcmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHRleHREZWNvcmF0aW9uc1tub2RlLnRleHREZWNvcmF0aW9uXSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbm9kZS5mb250TmFtZS5mYW1pbHksXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb250V2VpZ2h0OiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHBhcnNlRm9udFdlaWdodChub2RlLmZvbnROYW1lLnN0eWxlKSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZvbnRTdHlsZToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBwYXJzZUZvbnRTdHlsZShub2RlLmZvbnROYW1lLnN0eWxlKSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZvbnRTdHJldGNoOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHBhcnNlRm9udFN0cmV0Y2gobm9kZS5mb250TmFtZS5zdHlsZSksXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfZm9udFN0eWxlT2xkOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG5vZGUuZm9udE5hbWUuc3R5bGUsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKG5vZGUubGV0dGVyU3BhY2luZy52YWx1ZSksXG4gICAgICAgICAgICAgICAgdW5pdDogbm9kZS5sZXR0ZXJTcGFjaW5nLnVuaXQudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKG5vZGUubGluZUhlaWdodC52YWx1ZSkgfHwgJ25vcm1hbCcsXG4gICAgICAgICAgICAgICAgdW5pdDogbm9kZS5saW5lSGVpZ2h0LnVuaXQudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgICAgICB0eXBlOiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5vZGUubGluZUhlaWdodCwgJ3ZhbHVlJykgPyAnbnVtYmVyJyA6ICdzdHJpbmcnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhcmFncmFwaEluZGVudDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLnBhcmFncmFwaEluZGVudCxcbiAgICAgICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGFyYWdyYXBoU3BhY2luZzoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLnBhcmFncmFwaFNwYWNpbmcsXG4gICAgICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRleHRDYXNlOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHRleHRDYXNlc1tub2RlLnRleHRDYXNlXSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3RGb250cztcbiIsImNvbnN0IGdyaWRWYWx1ZXMgPSAoZ3JpZCkgPT4gKHtcbiAgICBwYXR0ZXJuOiB7XG4gICAgICAgIHZhbHVlOiBncmlkLnBhdHRlcm4udG9Mb3dlckNhc2UoKSxcbiAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICB9LFxuICAgIHNlY3Rpb25TaXplOiB7XG4gICAgICAgIHZhbHVlOiBncmlkLnNlY3Rpb25TaXplLFxuICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgIH1cbn0pO1xuY29uc3QgZ2V0Q291bnQgPSBjb3VudCA9PiB7XG4gICAgaWYgKGNvdW50ID09PSBJbmZpbml0eSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6ICdhdXRvJyxcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiBjb3VudCxcbiAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICB9O1xufTtcbmNvbnN0IHJvd0NvbHVtblZhbHVlcyA9IChncmlkKSA9PiAoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oeyBwYXR0ZXJuOiB7XG4gICAgICAgIHZhbHVlOiBncmlkLnBhdHRlcm4udG9Mb3dlckNhc2UoKSxcbiAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICB9IH0sIChncmlkLnNlY3Rpb25TaXplICE9PSB1bmRlZmluZWQgJiYge1xuICAgIHNlY3Rpb25TaXplOiB7XG4gICAgICAgIHZhbHVlOiBncmlkLnNlY3Rpb25TaXplLFxuICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgIH1cbn0pKSwgeyBndXR0ZXJTaXplOiB7XG4gICAgICAgIHZhbHVlOiBncmlkLmd1dHRlclNpemUsXG4gICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgfSwgYWxpZ25tZW50OiB7XG4gICAgICAgIHZhbHVlOiBncmlkLmFsaWdubWVudC50b0xvd2VyQ2FzZSgpLFxuICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgIH0sIGNvdW50OiBnZXRDb3VudChncmlkLmNvdW50KSB9KSwgKGdyaWQub2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYge1xuICAgIG9mZnNldDoge1xuICAgICAgICB2YWx1ZTogZ3JpZC5vZmZzZXQsXG4gICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgfVxufSkpKTtcbmNvbnN0IGV4dHJhY3RHcmlkcyA9ICh0b2tlbk5vZGVzKSA9PiB7XG4gICAgLy8gZ2V0IGdyaWQgc3R5bGVzXG4gICAgcmV0dXJuIHRva2VuTm9kZXMubWFwKG5vZGUgPT4gKHtcbiAgICAgICAgbmFtZTogbm9kZS5uYW1lLFxuICAgICAgICBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgICBjYXRlZ29yeTogJ2dyaWQnLFxuICAgICAgICB2YWx1ZXM6IG5vZGUubGF5b3V0R3JpZHMubWFwKChncmlkKSA9PiBncmlkLnBhdHRlcm4gPT09ICdHUklEJyA/IGdyaWRWYWx1ZXMoZ3JpZCkgOiByb3dDb2x1bW5WYWx1ZXMoZ3JpZCkpXG4gICAgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3RHcmlkcztcbiIsImNvbnN0IGRpcmVjdGlvbiA9ICh0cmFuc2l0aW9uKSA9PiB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0cmFuc2l0aW9uLCAnZGlyZWN0aW9uJykpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbjoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB0cmFuc2l0aW9uLmRpcmVjdGlvbi50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufTtcbmNvbnN0IGVhc2luZ3MgPSB7XG4gICAgQ1VTVE9NX0NVQklDX0JFWklFUjoge30sXG4gICAgTElORUFSOiB7XG4gICAgICAgIHR5cGU6ICdsaW5lYXInLFxuICAgICAgICBlYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyOiB7XG4gICAgICAgICAgICB4MTogMCxcbiAgICAgICAgICAgIHkxOiAwLFxuICAgICAgICAgICAgeDI6IDEsXG4gICAgICAgICAgICB5MjogMVxuICAgICAgICB9XG4gICAgfSxcbiAgICBFQVNFX0lOOiB7XG4gICAgICAgIHR5cGU6ICdlYXNlLWluJyxcbiAgICAgICAgZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllcjoge1xuICAgICAgICAgICAgeDE6IDAuNDE5OTk5OTg2ODg2OTc4MTUsXG4gICAgICAgICAgICB5MTogMCxcbiAgICAgICAgICAgIHgyOiAxLFxuICAgICAgICAgICAgeTI6IDFcbiAgICAgICAgfVxuICAgIH0sXG4gICAgRUFTRV9PVVQ6IHtcbiAgICAgICAgdHlwZTogJ2Vhc2Utb3V0JyxcbiAgICAgICAgZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllcjoge1xuICAgICAgICAgICAgeDE6IDAsXG4gICAgICAgICAgICB5MTogMCxcbiAgICAgICAgICAgIHgyOiAwLjU3OTk5OTk4MzMxMDY5OTUsXG4gICAgICAgICAgICB5MjogMVxuICAgICAgICB9XG4gICAgfSxcbiAgICBFQVNFX0lOX0FORF9PVVQ6IHtcbiAgICAgICAgdHlwZTogJ2Vhc2UtaW4tb3V0JyxcbiAgICAgICAgZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllcjoge1xuICAgICAgICAgICAgeDE6IDAuNDE5OTk5OTg2ODg2OTc4MTUsXG4gICAgICAgICAgICB5MTogMCxcbiAgICAgICAgICAgIHgyOiAwLjU3OTk5OTk4MzMxMDY5OTUsXG4gICAgICAgICAgICB5MjogMVxuICAgICAgICB9XG4gICAgfSxcbiAgICBFQVNFX0lOX0JBQ0s6IHtcbiAgICAgICAgdHlwZTogJ2Vhc2UtaW4tYmFjaycsXG4gICAgICAgIGVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXI6IHtcbiAgICAgICAgICAgIHgxOiAwLjMwMDAwMDAxMTkyMDkyODk2LFxuICAgICAgICAgICAgeTE6IC0wLjA1MDAwMDAwMDc0NTA1ODA2LFxuICAgICAgICAgICAgeDI6IDAuNjk5OTk5OTg4MDc5MDcxLFxuICAgICAgICAgICAgeTI6IC0wLjVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgRUFTRV9PVVRfQkFDSzoge1xuICAgICAgICB0eXBlOiAnZWFzZS1vdXQtYmFjaycsXG4gICAgICAgIGVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXI6IHtcbiAgICAgICAgICAgIHgxOiAwLjQ0OTk5OTk4ODA3OTA3MTA0LFxuICAgICAgICAgICAgeTE6IDEuNDUwMDAwMDQ3NjgzNzE1OCxcbiAgICAgICAgICAgIHgyOiAwLjgwMDAwMDAxMTkyMDkyOSxcbiAgICAgICAgICAgIHkyOiAxXG4gICAgICAgIH1cbiAgICB9LFxuICAgIEVBU0VfSU5fQU5EX09VVF9CQUNLOiB7XG4gICAgICAgIHR5cGU6ICdlYXNlLWluLW91dC1iYWNrJyxcbiAgICAgICAgZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllcjoge1xuICAgICAgICAgICAgeDE6IDAuNjk5OTk5OTg4MDc5MDcxLFxuICAgICAgICAgICAgeTE6IC0wLjQwMDAwMDAwNTk2MDQ2NDUsXG4gICAgICAgICAgICB4MjogMC40MDAwMDAwMDU5NjA0NjQ1LFxuICAgICAgICAgICAgeTI6IDEuMzk5OTk5OTc2MTU4MTQyXG4gICAgICAgIH1cbiAgICB9XG59O1xuY29uc3QgZWFzaW5nID0gKGVhc2luZykgPT4ge1xuICAgIC8vIGFib3J0IGlmIGludmFsaWYgZWFzaW5nIHR5cGVcbiAgICBpZiAoIU9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKGVhc2luZ3MsIGVhc2luZy50eXBlKSkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvLyByZXR1cm4gY3VzdG9tIGVhc2luZ1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBpZiAoZWFzaW5nLnR5cGUgPT09ICdDVVNUT01fQ1VCSUNfQkVaSUVSJykge1xuICAgICAgICBlYXNpbmdzLkNVU1RPTV9DVUJJQ19CRVpJRVIgPSB7XG4gICAgICAgICAgICB0eXBlOiAnY3ViaWMtYmV6aWVyJyxcbiAgICAgICAgICAgIGVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXI6IHtcbiAgICAgICAgICAgICAgICB4MTogZWFzaW5nLmVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXIueDEsXG4gICAgICAgICAgICAgICAgeTE6IGVhc2luZy5lYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyLnkxLFxuICAgICAgICAgICAgICAgIHgyOiBlYXNpbmcuZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllci54MixcbiAgICAgICAgICAgICAgICB5MjogZWFzaW5nLmVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXIueTJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZWFzaW5nOiB7XG4gICAgICAgICAgICB2YWx1ZTogZWFzaW5nc1tlYXNpbmcudHlwZV0udHlwZSxcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIGVhc2luZ0Z1bmN0aW9uOiB7XG4gICAgICAgICAgICB4MToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBlYXNpbmdzW2Vhc2luZy50eXBlXS5lYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyLngxLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeDI6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogZWFzaW5nc1tlYXNpbmcudHlwZV0uZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllci54MixcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHkxOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGVhc2luZ3NbZWFzaW5nLnR5cGVdLmVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXIueTEsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB5Mjoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBlYXNpbmdzW2Vhc2luZy50eXBlXS5lYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyLnkyLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufTtcbmNvbnN0IGV4dHJhY3RNb3Rpb24gPSAodG9rZW5Ob2RlcykgPT4ge1xuICAgIGNvbnN0IG5vZGVOYW1lID0gJ21vdGlvbic7XG4gICAgLy8gcmV0dXJuIGFzIG9iamVjdFxuICAgIHJldHVybiB0b2tlbk5vZGVzXG4gICAgICAgIC8vIG9ubHkgZ2V0IG1vdGlvbiBub2Rlc1xuICAgICAgICAuZmlsdGVyKG5vZGUgPT4gbm9kZS5uYW1lLnN1YnN0cigwLCBub2RlTmFtZS5sZW5ndGgpID09PSBub2RlTmFtZSlcbiAgICAgICAgLy8gZmlsdGVyIHRvIG9ubHkgaW5jbHVkZSBpdGVtcyB3aGljaCBoYXZlIGEgdHJhbnNpdGlvbiBwcm9wZXJ0eVxuICAgICAgICAuZmlsdGVyKG5vZGUgPT4ge1xuICAgICAgICBpZiAobm9kZS5yZWFjdGlvbnMubGVuZ3RoID4gMCAmJiBub2RlLnJlYWN0aW9uc1swXS5hY3Rpb24udHlwZSA9PT0gJ05PREUnICYmIG5vZGUucmVhY3Rpb25zWzBdLmFjdGlvbi50cmFuc2l0aW9uICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSlcbiAgICAgICAgLy8gcmV0cmlldmUgdmFsdWVzXG4gICAgICAgIC5tYXAoKG5vZGUpID0+ICh7XG4gICAgICAgIG5hbWU6IG5vZGUubmFtZSxcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgICBjYXRlZ29yeTogJ21vdGlvbicsXG4gICAgICAgIHZhbHVlczogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHsgdHlwZToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLnJlYWN0aW9uc1swXS5hY3Rpb24udHJhbnNpdGlvbi50eXBlLnRvTG9jYWxlTG93ZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH0sIGR1cmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IE1hdGgucm91bmQoKG5vZGUucmVhY3Rpb25zWzBdLmFjdGlvbi50cmFuc2l0aW9uLmR1cmF0aW9uICsgTnVtYmVyLkVQU0lMT04pICogMTAwMCkgLyAxMDAwLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdzJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSB9LCBlYXNpbmcobm9kZS5yZWFjdGlvbnNbMF0uYWN0aW9uLnRyYW5zaXRpb24uZWFzaW5nKSksIGRpcmVjdGlvbihub2RlLnJlYWN0aW9uc1swXS5hY3Rpb24udHJhbnNpdGlvbikpXG4gICAgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3RNb3Rpb247XG5leHBvcnQgY29uc3QgX190ZXN0aW5nID0ge1xuICAgIGVhc2luZzogZWFzaW5nXG59O1xuIiwiaW1wb3J0IHJvdW5kV2l0aERlY2ltYWxzIGZyb20gJy4uL3V0aWxpdGllcy9yb3VuZFdpdGhEZWNpbWFscyc7XG5jb25zdCBleHRyYWN0UmFkaWkgPSAodG9rZW5Ob2RlcykgPT4ge1xuICAgIGNvbnN0IG5vZGVOYW1lID0gJ3JhZGlpJztcbiAgICAvLyBnZXQgdGhlIHR5cGUgb2YgdGhlIGNvcm5lciByYWRpdXNcbiAgICBjb25zdCBnZXRSYWRpdXNUeXBlID0gcmFkaXVzID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiByYWRpdXMgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3NpbmdsZSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICdtaXhlZCc7XG4gICAgfTtcbiAgICAvLyBnZXQgdGhlIGluZGl2aWR1YWwgcmFkaWlcbiAgICBjb25zdCBnZXRSYWRpaSA9IChub2RlKSA9PiAoe1xuICAgICAgICB0b3BMZWZ0OiB7XG4gICAgICAgICAgICB2YWx1ZTogbm9kZS50b3BMZWZ0UmFkaXVzIHx8IDAsXG4gICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgdG9wUmlnaHQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiBub2RlLnRvcFJpZ2h0UmFkaXVzIHx8IDAsXG4gICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgYm90dG9tUmlnaHQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiBub2RlLmJvdHRvbVJpZ2h0UmFkaXVzIHx8IDAsXG4gICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgYm90dG9tTGVmdDoge1xuICAgICAgICAgICAgdmFsdWU6IG5vZGUuYm90dG9tTGVmdFJhZGl1cyB8fCAwLFxuICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyByZXR1cm4gYXMgb2JqZWN0XG4gICAgcmV0dXJuIHRva2VuTm9kZXMuZmlsdGVyKG5vZGUgPT4gbm9kZS5uYW1lLnN1YnN0cigwLCBub2RlTmFtZS5sZW5ndGgpID09PSBub2RlTmFtZSkubWFwKG5vZGUgPT4gKHtcbiAgICAgICAgbmFtZTogbm9kZS5uYW1lLFxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGRlc2NyaXB0aW9uOiBub2RlLmRlc2NyaXB0aW9uIHx8IG51bGwsXG4gICAgICAgIGNhdGVnb3J5OiAncmFkaXVzJyxcbiAgICAgICAgdmFsdWVzOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sICh0eXBlb2Ygbm9kZS5jb3JuZXJSYWRpdXMgPT09ICdudW1iZXInICYmIHtcbiAgICAgICAgICAgIHJhZGl1czoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLmNvcm5lclJhZGl1cyxcbiAgICAgICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKSwgeyByYWRpdXNUeXBlOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGdldFJhZGl1c1R5cGUobm9kZS5jb3JuZXJSYWRpdXMpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LCByYWRpaTogZ2V0UmFkaWkobm9kZSksIHNtb290aGluZzoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLmNvcm5lclNtb290aGluZywgMiksXG4gICAgICAgICAgICAgICAgY29tbWVudDogJ1BlcmNlbnQgYXMgZGVjaW1hbCBmcm9tIDAuMCAtIDEuMCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0gfSlcbiAgICB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZXh0cmFjdFJhZGlpO1xuIiwiaW1wb3J0IHJvdW5kV2l0aERlY2ltYWxzIGZyb20gJy4uL3V0aWxpdGllcy9yb3VuZFdpdGhEZWNpbWFscyc7XG5jb25zdCBleHRyYWN0U2l6ZXMgPSAodG9rZW5Ob2RlcykgPT4ge1xuICAgIGNvbnN0IG5vZGVOYW1lID0gJ3NpemVzJztcbiAgICAvLyByZXR1cm4gYXMgb2JqZWN0XG4gICAgcmV0dXJuIHRva2VuTm9kZXMuZmlsdGVyKG5vZGUgPT4gbm9kZS5uYW1lLnN1YnN0cigwLCBub2RlTmFtZS5sZW5ndGgpID09PSBub2RlTmFtZSkubWFwKG5vZGUgPT4gKHtcbiAgICAgICAgbmFtZTogbm9kZS5uYW1lLFxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGRlc2NyaXB0aW9uOiBub2RlLmRlc2NyaXB0aW9uIHx8IG51bGwsXG4gICAgICAgIGNhdGVnb3J5OiAnc2l6ZScsXG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgd2lkdGg6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMobm9kZS53aWR0aCwgMiksXG4gICAgICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhlaWdodDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLmhlaWdodCwgMiksXG4gICAgICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3RTaXplcztcbiIsImltcG9ydCByb3VuZFdpdGhEZWNpbWFscyBmcm9tICcuLi91dGlsaXRpZXMvcm91bmRXaXRoRGVjaW1hbHMnO1xuY29uc3QgZXh0cmFjdFNwYWNpbmcgPSAodG9rZW5Ob2RlcykgPT4ge1xuICAgIGNvbnN0IG5vZGVOYW1lID0gJ3NwYWNpbmcnO1xuICAgIC8vIHJldHVybiBhcyBvYmplY3RcbiAgICByZXR1cm4gdG9rZW5Ob2Rlcy5maWx0ZXIobm9kZSA9PiBub2RlLm5hbWUuc3Vic3RyKDAsIG5vZGVOYW1lLmxlbmd0aCkgPT09IG5vZGVOYW1lKVxuICAgICAgICAubWFwKG5vZGUgPT4gKHtcbiAgICAgICAgbmFtZTogbm9kZS5uYW1lLFxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGRlc2NyaXB0aW9uOiBub2RlLmRlc2NyaXB0aW9uIHx8IG51bGwsXG4gICAgICAgIGNhdGVnb3J5OiAnc3BhY2luZycsXG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgdG9wOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKG5vZGUucGFkZGluZ1RvcCwgMiksXG4gICAgICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJpZ2h0OiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKG5vZGUucGFkZGluZ1JpZ2h0LCAyKSxcbiAgICAgICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm90dG9tOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKG5vZGUucGFkZGluZ0JvdHRvbSwgMiksXG4gICAgICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZnQ6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMobm9kZS5wYWRkaW5nTGVmdCwgMiksXG4gICAgICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3RTcGFjaW5nO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBnZXRTZXR0aW5ncywgc2V0U2V0dGluZ3MgfSBmcm9tICcuL3V0aWxpdGllcy9zZXR0aW5ncyc7XG5pbXBvcnQgeyBnZXRBY2Nlc3NUb2tlbiwgc2V0QWNjZXNzVG9rZW4gfSBmcm9tICcuL3V0aWxpdGllcy9hY2Nlc3NUb2tlbic7XG5pbXBvcnQgZ2V0SnNvbiBmcm9tICcuL3V0aWxpdGllcy9nZXRKc29uJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi91dGlsaXRpZXMvY29uZmlnJztcbmltcG9ydCBnZXRWZXJzaW9uRGlmZmVyZW5jZSBmcm9tICcuL3V0aWxpdGllcy9nZXRWZXJzaW9uRGlmZmVyZW5jZSc7XG5pbXBvcnQgZ2V0RmlsZUlkIGZyb20gJy4vdXRpbGl0aWVzL2dldEZpbGVJZCc7XG4vLyBpbml0aWF0ZSBVSVxuZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7XG4gICAgdmlzaWJsZTogZmFsc2UsXG4gICAgd2lkdGg6IGNvbmZpZy5zZXR0aW5nc0RpYWxvZy53aWR0aCxcbiAgICBoZWlnaHQ6IGNvbmZpZy5zZXR0aW5nc0RpYWxvZy5oZWlnaHRcbn0pO1xuLy8gR2V0IHRoZSB1c2VyIHNldHRpbmdzXG5jb25zdCB1c2VyU2V0dGluZ3MgPSBnZXRTZXR0aW5ncygpO1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFWFBPUlQgVE8gRklMRVxuLy8gZXhwb3J0cyB0aGUgZGVzaWduIHRva2VucyB0byBhIGZpbGVcbmlmIChmaWdtYS5jb21tYW5kID09PSAnZXhwb3J0Jykge1xuICAgIC8vIHNob3cgVUlcbiAgICBmaWdtYS51aS5zaG93KCk7XG4gICAgLy8gd3JpdGUgdG9rZW5zIHRvIGpzb24gZmlsZVxuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgY29tbWFuZDogJ2V4cG9ydCcsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGZpbGVuYW1lOiBgJHt1c2VyU2V0dGluZ3MuZmlsZW5hbWV9Lmpzb25gLFxuICAgICAgICAgICAgZGF0YTogZ2V0SnNvbihmaWdtYSwgdXNlclNldHRpbmdzKVxuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyBTRU5EIFRPIFVSTFxuLy8gc2VuZCB0b2tlbnMgdG8gdXJsXG5pZiAoZmlnbWEuY29tbWFuZCA9PT0gJ3VybEV4cG9ydCcpIHtcbiAgICAvLyBuZWVkZWQgZm9yIGdldEFjY2Vzc1Rva2VuIGFzeW5jXG4gICAgY29uc3QgdXJsRXhwb3J0ID0gKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIGNvbW1hbmQ6ICd1cmxFeHBvcnQnLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHVybDogdXNlclNldHRpbmdzLnNlcnZlclVybCxcbiAgICAgICAgICAgICAgICBhY2Nlc3NUb2tlbjogeWllbGQgZ2V0QWNjZXNzVG9rZW4oZ2V0RmlsZUlkKGZpZ21hKSksXG4gICAgICAgICAgICAgICAgYWNjZXB0SGVhZGVyOiB1c2VyU2V0dGluZ3MuYWNjZXB0SGVhZGVyLFxuICAgICAgICAgICAgICAgIGF1dGhUeXBlOiB1c2VyU2V0dGluZ3MuYXV0aFR5cGUsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBldmVudF90eXBlOiB1c2VyU2V0dGluZ3MuZXZlbnRUeXBlLFxuICAgICAgICAgICAgICAgICAgICBjbGllbnRfcGF5bG9hZDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW5GaWxlTmFtZTogYCR7dXNlclNldHRpbmdzLmZpbGVuYW1lfS5qc29uYCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuczogYCR7Z2V0SnNvbihmaWdtYSwgdXNlclNldHRpbmdzLCB0cnVlKX1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZW5hbWU6IGZpZ21hLnJvb3QubmFtZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBydW4gZXhwb3J0IHVybCBmdW5jdGlvblxuICAgIHVybEV4cG9ydCgpO1xufVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBTRVRUSU5HU1xuLy8gc2V0dGluZ3MgZm9yIHRoZSBkZXNpZ24gdG9rZW5zXG5pZiAoZmlnbWEuY29tbWFuZCA9PT0gJ3NldHRpbmdzJykge1xuICAgIC8vIHdyYXAgaW4gZnVuY3Rpb24gYmVjYXVzZSBvZiBhc3luYyBjbGllbnQgU3RvcmFnZVxuICAgIGNvbnN0IG9wZW5VaSA9ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnQgdmVyc2lvbiBkaWZmZXJlbmNlcyB0byB0aGUgbGFzdCB0aW1lIHRoZSBwbHVnaW4gd2FzIG9wZW5lZFxuICAgICAgICBjb25zdCB2ZXJzaW9uRGlmZmVyZW5jZSA9IHlpZWxkIGdldFZlcnNpb25EaWZmZXJlbmNlKGZpZ21hKTtcbiAgICAgICAgLy8gcmVzaXplIFVJIGlmIG5lZWRlZFxuICAgICAgICBpZiAodmVyc2lvbkRpZmZlcmVuY2UgIT09IHVuZGVmaW5lZCAmJiB2ZXJzaW9uRGlmZmVyZW5jZSAhPT0gJ3BhdGNoJykge1xuICAgICAgICAgICAgZmlnbWEudWkucmVzaXplKGNvbmZpZy5zZXR0aW5nc0RpYWxvZy53aWR0aCwgY29uZmlnLnNldHRpbmdzRGlhbG9nLmhlaWdodCArIDYwKTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZWdpc3RlciB0aGUgc2V0dGluZ3MgVUlcbiAgICAgICAgZmlnbWEudWkuc2hvdygpO1xuICAgICAgICAvLyBzZW50IHNldHRpbmdzIHRvIFVJXG4gICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIGNvbW1hbmQ6ICdnZXRTZXR0aW5ncycsXG4gICAgICAgICAgICBzZXR0aW5nczogdXNlclNldHRpbmdzLFxuICAgICAgICAgICAgYWNjZXNzVG9rZW46IHlpZWxkIGdldEFjY2Vzc1Rva2VuKGdldEZpbGVJZChmaWdtYSkpLFxuICAgICAgICAgICAgdmVyc2lvbkRpZmZlcmVuY2U6IHZlcnNpb25EaWZmZXJlbmNlXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGZpZ21hLnVpLnNob3coKTtcbiAgICB9KTtcbiAgICAvLyBydW4gZnVuY3Rpb25cbiAgICBvcGVuVWkoKTtcbn1cbi8qKlxuICogT3BlbiBIZWxwXG4gKiBPcGVuIGdpdGh1YiBoZWxwIHBhZ2VcbiAqL1xuaWYgKGZpZ21hLmNvbW1hbmQgPT09ICdoZWxwJykge1xuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgY29tbWFuZDogJ2hlbHAnXG4gICAgfSk7XG59XG4vKipcbiAqIFJlYWN0IHRvIG1lc3NhZ2VzXG4gKi9cbmZpZ21hLnVpLm9ubWVzc2FnZSA9IChtZXNzYWdlKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAvKipcbiAgICAgKiBvbiBjbG9zZVBsdWdpblxuICAgICAqIGNsb3NlIHBsdWdpbiBhbmQgc2hvdyBub3RpZmljYXRpb24gaWYgYXZhaWxhYmxlXG4gICAgICovXG4gICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ2Nsb3NlUGx1Z2luJykge1xuICAgICAgICAvLyBzaG93IG5vdGlmaWNhdGlvbiBpZiBzZW5kXG4gICAgICAgIGlmIChtZXNzYWdlLm5vdGlmaWNhdGlvbiAhPT0gdW5kZWZpbmVkICYmIG1lc3NhZ2Uubm90aWZpY2F0aW9uICE9PSAnJykge1xuICAgICAgICAgICAgZmlnbWEubm90aWZ5KG1lc3NhZ2Uubm90aWZpY2F0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjbG9zZSBwbHVnaW5cbiAgICAgICAgZmlnbWEudWkuaGlkZSgpO1xuICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBvbiBzYXZlU2V0dGluZ3NcbiAgICAgKiBzYXZlIHNldHRpbmdzLCBhY2Nlc3MgdG9rZW4gYW5kIGNsb3NlIHBsdWdpblxuICAgICAqL1xuICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdzYXZlU2V0dGluZ3MnKSB7XG4gICAgICAgIC8vIHN0b3JlIHNldHRpbmdzXG4gICAgICAgIHNldFNldHRpbmdzKG1lc3NhZ2Uuc2V0dGluZ3MpO1xuICAgICAgICAvLyBhY2Nlc3NUb2tlblxuICAgICAgICB5aWVsZCBzZXRBY2Nlc3NUb2tlbihnZXRGaWxlSWQoZmlnbWEpLCBtZXNzYWdlLmFjY2Vzc1Rva2VuKTtcbiAgICAgICAgLy8gY2xvc2UgcGx1Z2luXG4gICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gICAgfVxufSk7XG4iLCJpbXBvcnQgeyBjb252ZXJ0UmdiYU9iamVjdFRvU3RyaW5nIH0gZnJvbSAnLi4vdXRpbGl0aWVzL2NvbnZlcnRDb2xvcic7XG5pbXBvcnQgZ2V0RGVzY3JpcHRpb24gZnJvbSAnLi91dGlsaXRpZXMvZ2V0RGVzY3JpcHRpb24nO1xuY29uc3QgZGVmYXVsdFRyYW5zZm9ybWVyID0gcHJvcGVydHlHcm91cFZhbHVlcyA9PiB7XG4gICAgLy8gdHVybiBhcnJheSB3aXRoIG9ubHkgb25lIGl0ZW0gaW50byBub3JtYWwgb2JqZWN0XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcGVydHlHcm91cFZhbHVlcykgJiYgcHJvcGVydHlHcm91cFZhbHVlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcHJvcGVydHlHcm91cFZhbHVlcyA9IHByb3BlcnR5R3JvdXBWYWx1ZXNbMF07XG4gICAgfVxuICAgIC8vIGRlZmluZSBvYmplY3RcbiAgICBjb25zdCB0cmFuc2Zvcm1lZFByb3BlcnRpZXMgPSB7fTtcbiAgICAvLyB0cmFuc2Zvcm0gcHJvZXBydGllc1xuICAgIE9iamVjdC5rZXlzKHByb3BlcnR5R3JvdXBWYWx1ZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAvLyBpZiB0aGlzIGlzIHRoZSBmaW5hbCBsZXZlbFxuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3BlcnR5R3JvdXBWYWx1ZXNba2V5XSwgJ3ZhbHVlJykpIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybWVkUHJvcGVydGllc1trZXldID0gc3R5bGVEaWN0aW9uYXJ5Rm9ybWF0KHByb3BlcnR5R3JvdXBWYWx1ZXNba2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgbW9yZSBuZXN0aW5nXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJhbnNmb3JtZWRQcm9wZXJ0aWVzW2tleV0gPSBkZWZhdWx0VHJhbnNmb3JtZXIocHJvcGVydHlHcm91cFZhbHVlc1trZXldKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIGlmIG9ubHkgb25lIHByb3BlcnR5IGlzIGluIG9iamVjdCAoZS5nLiBvbmx5IGZpbGwgZm9yIGNvbG9yKVxuICAgIC8vIHJldHVybiB0ZWggdmFsdWUgb2YgdGhpcyBwcm9wZXJ0eSBkaXJlY3RseSAoZS5nLiBjb2xvci1ibHVlOiAjMDAwMEFBIGluc3RlYWQgb2YgY29sb3ItYmx1ZS1maWxsOiAjMDAwMEFBKVxuICAgIGlmIChPYmplY3Qua2V5cyh0cmFuc2Zvcm1lZFByb3BlcnRpZXMpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyh0cmFuc2Zvcm1lZFByb3BlcnRpZXMpWzBdO1xuICAgIH1cbiAgICAvLyByZXR1cm4gdHJhbnNmb3JtZWQgcHJvcGVydGllc1xuICAgIHJldHVybiB0cmFuc2Zvcm1lZFByb3BlcnRpZXM7XG59O1xuY29uc3Qgc2l6ZVRyYW5zZm9ybWVyID0gcHJvcGVydHlHcm91cFZhbHVlcyA9PiB7XG4gICAgcmV0dXJuIHN0eWxlRGljdGlvbmFyeUZvcm1hdChwcm9wZXJ0eUdyb3VwVmFsdWVzLndpZHRoKTtcbn07XG5jb25zdCBjYXRlZ29yeVRyYW5zZm9ybWVyID0ge1xuICAgIGRlZmF1bHQ6IGRlZmF1bHRUcmFuc2Zvcm1lcixcbiAgICBmb250OiBkZWZhdWx0VHJhbnNmb3JtZXIsXG4gICAgYm9yZGVyOiBkZWZhdWx0VHJhbnNmb3JtZXIsXG4gICAgc2l6ZTogc2l6ZVRyYW5zZm9ybWVyLFxuICAgIGdyaWQ6IGRlZmF1bHRUcmFuc2Zvcm1lcixcbiAgICBlZmZlY3Q6IGRlZmF1bHRUcmFuc2Zvcm1lcixcbiAgICByYWRpdXM6IGRlZmF1bHRUcmFuc2Zvcm1lcixcbiAgICBmaWxsOiBkZWZhdWx0VHJhbnNmb3JtZXJcbn07XG5jb25zdCBzdHlsZURpY3Rpb25hcnlDb252ZXJ0VmFsdWUgPSAodmFsdWUsIHR5cGUpID0+IHtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAnY29sb3InKSB7XG4gICAgICAgIHJldHVybiBjb252ZXJ0UmdiYU9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufTtcbmNvbnN0IHN0eWxlRGljdGlvbmFyeUZvcm1hdCA9IChwcm9wZXJ0eSkgPT4gKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7IHZhbHVlOiBzdHlsZURpY3Rpb25hcnlDb252ZXJ0VmFsdWUocHJvcGVydHkudmFsdWUsIHByb3BlcnR5LnR5cGUpLCB0eXBlOiBwcm9wZXJ0eS50eXBlIH0sIChwcm9wZXJ0eS5kZXNjcmlwdGlvbiAhPT0gdW5kZWZpbmVkICYmIHsgY29tbWVudDogcHJvcGVydHkuZGVzY3JpcHRpb24gfSkpLCAocHJvcGVydHkudW5pdCAhPT0gdW5kZWZpbmVkICYmIHsgdW5pdDogcHJvcGVydHkudW5pdCB9KSkpO1xuY29uc3QgcHJvcGVydHlUcmFuc2Zvcm1lciA9IChwcm9wZXJ0eUdyb3VwLCBjYXRlZ29yeSkgPT4ge1xuICAgIC8vIGlmIGN1c3RvbSB0cmFuc2Zvcm1lciBpcyBkZWZpbmVkXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjYXRlZ29yeVRyYW5zZm9ybWVyLCBwcm9wZXJ0eUdyb3VwLmNhdGVnb3J5KSkge1xuICAgICAgICByZXR1cm4gY2F0ZWdvcnlUcmFuc2Zvcm1lcltwcm9wZXJ0eUdyb3VwLmNhdGVnb3J5XShwcm9wZXJ0eUdyb3VwLnZhbHVlcyk7XG4gICAgfVxuICAgIC8vIG90aGVyd2lzZSByZXR1cm4gd2l0aCBkZWZhdWx0IHRyYW5zZm9ybWVyXG4gICAgcmV0dXJuIGRlZmF1bHRUcmFuc2Zvcm1lcihwcm9wZXJ0eUdyb3VwLnZhbHVlcyk7XG59O1xuY29uc3Qgc3R5bGVEaWN0aW9uYXJ5VHJhbnNmb3JtZXIgPSAocHJvcGVydHlHcm91cCkgPT4ge1xuICAgIC8vIHRyYW5zZm9ybSB0byBhbWF6b24gc3R5bGUgRGljdGlvbmFyeSBzdHJ1Y3R1cmVcbiAgICBjb25zdCB0cmFuc2Zvcm1lZFByb3BlcnRpZXMgPSBwcm9wZXJ0eVRyYW5zZm9ybWVyKHByb3BlcnR5R3JvdXAsIHByb3BlcnR5R3JvdXAuY2F0ZWdvcnkpO1xuICAgIC8vIHJldHVybiB2YWx1ZXNcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHsgbmFtZTogcHJvcGVydHlHcm91cC5uYW1lLCBjYXRlZ29yeTogcHJvcGVydHlHcm91cC5jYXRlZ29yeSB9LCBnZXREZXNjcmlwdGlvbihwcm9wZXJ0eUdyb3VwLmRlc2NyaXB0aW9uKSksIHRyYW5zZm9ybWVkUHJvcGVydGllcyk7XG59O1xuZXhwb3J0IGRlZmF1bHQgc3R5bGVEaWN0aW9uYXJ5VHJhbnNmb3JtZXI7XG5leHBvcnQgY29uc3QgX190ZXN0aW5nID0ge1xuICAgIHN0eWxlRGljdGlvbmFyeUNvbnZlcnRWYWx1ZTogc3R5bGVEaWN0aW9uYXJ5Q29udmVydFZhbHVlLFxuICAgIHNpemVUcmFuc2Zvcm1lcjogc2l6ZVRyYW5zZm9ybWVyXG59O1xuIiwiY29uc3QgZ2V0RGVzY3JpcHRpb24gPSAoZGVzY3JpcHRpb24sIGRlc2NyaXB0aW9uS2V5ID0gJ2NvbW1lbnQnKSA9PiB7XG4gICAgLy8gaWYgdmFsaWQgZGVzY3JpcHRpb25cbiAgICBpZiAoZGVzY3JpcHRpb24gJiYgdHlwZW9mIGRlc2NyaXB0aW9uID09PSAnc3RyaW5nJyAmJiBkZXNjcmlwdGlvbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB7IGNvbW1lbnQ6IGRlc2NyaXB0aW9uIH07XG4gICAgfVxuICAgIC8vIGlmIGludmFsaWQgZGVzY3JpcHRpb24gcmV0dXJuIGFuIGVtcHR5IG9iamVjdFxuICAgIHJldHVybiB7fTtcbn07XG5leHBvcnQgZGVmYXVsdCBnZXREZXNjcmlwdGlvbjtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuLyoqXG4gKiBAbmFtZSBnZXRBY2Nlc3NUb2tlblxuICogQGRlc2NyaXB0aW9uIHJldHVybnMgdGhlIGFjY2VzcyB0b2tlbiBmb3IgdGhlIGN1cnJlbnQgZmlsZSBvciB1bmRlZmluZWRcbiAqIEBwYXJhbSBmaWxlSWQge3N0cmluZ30g4oCUIElEIG9mIHRoZSBjdXJyZW50IGZpbGVcbiAqL1xuY29uc3QgZ2V0QWNjZXNzVG9rZW4gPSAoZmlsZUlkKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAvLyBnZXQgYWxsIGFjY2VzcyB0b2tlbnNcbiAgICBjb25zdCBhY2Nlc3NUb2tlbnMgPSB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKCdhY2Nlc3NUb2tlbnMnKTtcbiAgICAvLyBpZiBhY2Nlc3MgdG9rZW5zIG9iamVjdCBpcyBwcmVzZW50XG4gICAgaWYgKGFjY2Vzc1Rva2VucyAhPT0gdW5kZWZpbmVkICYmIGFjY2Vzc1Rva2VucyBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgYWNjZXNzIHRva2VuIGZyb20gdGhlIGNhY2hlXG4gICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gYWNjZXNzVG9rZW5zW2ZpbGVJZF07XG4gICAgICAgIC8vIHJldHVybiB0aGUgYWNjZXNzIHRva2VuIG9yIGFuIGVtcHR5IHN0cmluZ1xuICAgICAgICByZXR1cm4gYWNjZXNzVG9rZW4gfHwgJyc7XG4gICAgfVxuICAgIC8vIHJldHVybiBlbXB0eSBzdHJpbmcgaWYgbm8gdG9rZW4gaXMgc3RvcmVkXG4gICAgcmV0dXJuICcnO1xufSk7XG4vKipcbiAqIEBuYW1lIHNldEFjY2Vzc1Rva2VuXG4gKiBAZGVzY3JpcHRpb24gc3RvcmUgdGhlIGFjY2VzcyB0b2tlbiBmb3IgdGhlIGN1cnJlbnQgZml2ZW4gZmlsZSBpbiB0aGUgdXNlciBjbGllbnRTdG9yYWdlXG4gKiBAcGFyYW0gZmlsZUlkIHtzdHJpbmd9IOKAlCBJRCBvZiB0aGUgY3VycmVudCBmaWxlXG4gKiBAcGFyYW0gZmlsZUlkIHtzdHJpbmd9IOKAlCBhY2Nlc3MgdG9rZW5cbiAqL1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmNvbnN0IHNldEFjY2Vzc1Rva2VuID0gKGZpbGVJZCwgYWNjZXNzVG9rZW4pID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIC8vIGdldCB0aGUgYWNjZXNzIHRva2VuIG9iamVjdFxuICAgIGNvbnN0IGFjY2Vzc1Rva2VucyA9ICh5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKCdhY2Nlc3NUb2tlbnMnKSkgfHwge307XG4gICAgLy8gbWVyZ2UgdG9rZW5zXG4gICAgY29uc3QgbWVyZ2VkVG9rZW5zID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBhY2Nlc3NUb2tlbnMpLCB7IFtmaWxlSWRdOiBhY2Nlc3NUb2tlbiB9KTtcbiAgICAvLyBtZXJnZSB0aGUgbmV3IHRva2VuIGludG8gdGhlIG9iamVjdFxuICAgIHJldHVybiB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKCdhY2Nlc3NUb2tlbnMnLCBtZXJnZWRUb2tlbnMpO1xufSk7XG5leHBvcnQgeyBnZXRBY2Nlc3NUb2tlbiwgc2V0QWNjZXNzVG9rZW4gfTtcbiIsImltcG9ydCBmaWx0ZXJCeU5hbWVQcm9wZXJ0eSBmcm9tICcuL2ZpbHRlckJ5TmFtZVByb3BlcnR5JztcbmltcG9ydCBnZXRQYWludFN0eWxlcyBmcm9tICcuL2dldFBhaW50U3R5bGVzJztcbmltcG9ydCBnZXRHcmlkU3R5bGVzIGZyb20gJy4vZ2V0R3JpZFN0eWxlcyc7XG5pbXBvcnQgZ2V0VG9rZW5Ob2RlcyBmcm9tICcuL2dldFRva2VuTm9kZXMnO1xuaW1wb3J0IGdldFRleHRTdHlsZXMgZnJvbSAnLi9nZXRUZXh0U3R5bGVzJztcbmltcG9ydCBnZXRFZmZlY3RTdHlsZXMgZnJvbSAnLi9nZXRFZmZlY3RTdHlsZXMnO1xuLyoqXG4gKiBAZnVuY3Rpb24gYnVpbGRGaWdtYURhdGEg4oCTIHJldHVybiBhbiBvYmplY3Qgd2l0aCBhbGwgc3R5bGVzICYgZnJhbWUgdG8gdXNlIGZvciBleHBvcnRcbiAqIEBwYXJhbSB7UGx1Z2luQVBJfSBmaWdtYSDigJQgdGhlIGZpZ21hIFBsdWdpbkFQSSBvYmplY3RcbiAqIEBwYXJhbSBvcHRpb25zIOKAkyBvcHRpb25zIG9iamVjdFxuICovXG5jb25zdCBidWlsZEZpZ21hRGF0YSA9IChmaWdtYSwgb3B0aW9ucyA9IHtcbiAgICBwcmVmaXg6ICdfJyxcbiAgICBleGNsdWRlUHJlZml4OiB0cnVlXG59KSA9PiB7XG4gICAgLy8gdXNlIHNwcmVhZCBvcGVyYXRvciBiZWNhdXNlIHRoZSBvcmlnaW5hbCBpcyByZWFkT25seVxuICAgIGNvbnN0IHRva2VuRnJhbWVzID0gZ2V0VG9rZW5Ob2RlcyhbLi4uZmlnbWEucm9vdC5jaGlsZHJlbl0pO1xuICAgIC8vIGdldCBkYXRhIGZyb20gZmlnbWFcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbkZyYW1lczogdG9rZW5GcmFtZXMsXG4gICAgICAgIHBhaW50U3R5bGVzOiBnZXRQYWludFN0eWxlcyhmaWdtYS5nZXRMb2NhbFBhaW50U3R5bGVzKCkpLmZpbHRlcihmaWx0ZXJCeU5hbWVQcm9wZXJ0eShvcHRpb25zLnByZWZpeCwgb3B0aW9ucy5leGNsdWRlUHJlZml4KSksXG4gICAgICAgIGdyaWRTdHlsZXM6IGdldEdyaWRTdHlsZXMoZmlnbWEuZ2V0TG9jYWxHcmlkU3R5bGVzKCkpLmZpbHRlcihmaWx0ZXJCeU5hbWVQcm9wZXJ0eShvcHRpb25zLnByZWZpeCwgb3B0aW9ucy5leGNsdWRlUHJlZml4KSksXG4gICAgICAgIHRleHRTdHlsZXM6IGdldFRleHRTdHlsZXMoZmlnbWEuZ2V0TG9jYWxUZXh0U3R5bGVzKCkpLmZpbHRlcihmaWx0ZXJCeU5hbWVQcm9wZXJ0eShvcHRpb25zLnByZWZpeCwgb3B0aW9ucy5leGNsdWRlUHJlZml4KSksXG4gICAgICAgIGVmZmVjdFN0eWxlczogZ2V0RWZmZWN0U3R5bGVzKGZpZ21hLmdldExvY2FsRWZmZWN0U3R5bGVzKCkpLmZpbHRlcihmaWx0ZXJCeU5hbWVQcm9wZXJ0eShvcHRpb25zLnByZWZpeCwgb3B0aW9ucy5leGNsdWRlUHJlZml4KSlcbiAgICB9O1xufTtcbmV4cG9ydCBkZWZhdWx0IGJ1aWxkRmlnbWFEYXRhO1xuIiwiLyogaXN0YW5idWwgaWdub3JlIGZpbGUgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBzZXR0aW5nc0RpYWxvZzoge1xuICAgICAgICB3aWR0aDogNTUwLFxuICAgICAgICBoZWlnaHQ6IDU2NVxuICAgIH0sXG4gICAga2V5OiB7XG4gICAgICAgIGxhc3RWZXJzaW9uU2V0dGluZ3NPcGVuZWQ6ICdsYXN0VmVyc2lvblNldHRpbmdzT3BlbmVkJyxcbiAgICAgICAgZmlsZUlkOiAnZmlsZUlkJ1xuICAgIH1cbn07XG4iLCJpbXBvcnQgcm91bmRXaXRoRGVjaW1hbHMgZnJvbSAnLi9yb3VuZFdpdGhEZWNpbWFscyc7XG5leHBvcnQgY29uc3Qgcm91bmRSZ2JhID0gKHJnYmEsIG9wYWNpdHkpID0+ICh7XG4gICAgcjogcm91bmRXaXRoRGVjaW1hbHMocmdiYS5yICogMjU1LCAwKSxcbiAgICBnOiByb3VuZFdpdGhEZWNpbWFscyhyZ2JhLmcgKiAyNTUsIDApLFxuICAgIGI6IHJvdW5kV2l0aERlY2ltYWxzKHJnYmEuYiAqIDI1NSwgMCksXG4gICAgYTogcm91bmRXaXRoRGVjaW1hbHMob3BhY2l0eSB8fCByZ2JhLmEgfHwgMSlcbn0pO1xuZXhwb3J0IGNvbnN0IGNvbnZlcnRQYWludFRvUmdiYSA9IChwYWludCkgPT4ge1xuICAgIGlmIChwYWludC50eXBlID09PSAnU09MSUQnICYmIHBhaW50LnZpc2libGUgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHJvdW5kUmdiYShwYWludC5jb2xvciwgKHBhaW50Lm9wYWNpdHkgfHwgbnVsbCkpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5leHBvcnQgY29uc3QgY29udmVydFJnYmFPYmplY3RUb1N0cmluZyA9IChyZ2JhT2JqZWN0KSA9PiBgcmdiYSgke3JnYmFPYmplY3Qucn0sICR7cmdiYU9iamVjdC5nfSwgJHtyZ2JhT2JqZWN0LmJ9LCAke3JnYmFPYmplY3QuYX0pYDtcbiIsIi8qKlxuICogUGVyZm9ybXMgYSBkZWVwIG1lcmdlIG9mIGBzb3VyY2VgIGludG8gYHRhcmdldGAuXG4gKiBNdXRhdGVzIGB0YXJnZXRgIG9ubHkgYnV0IG5vdCBpdHMgb2JqZWN0cyBhbmQgYXJyYXlzLlxuICpcbiAqIEBhdXRob3IgaW5zcGlyZWQgYnkgW2poaWxkZW5iaWRkbGVdKGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80ODIxODIwOSkuXG4gKi9cbmNvbnN0IGRlZXBNZXJnZSA9ICh0YXJnZXQsIHNvdXJjZSkgPT4ge1xuICAgIC8vIGZ1bmN0aW9uIHRvIHRlc3QgaWYgYSB2YXJpYWJsZSBpcyBhbiBvYmplY3RcbiAgICBjb25zdCBpc09iamVjdCA9IChvYmopID0+IG9iaiAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JztcbiAgICAvLyBtYWtlIHN1cmUgYm90aCB0aGUgdGFyZ2V0IGFuZCB0aGUgc291cmNlIGFyZSBvYmplY3RzXG4gICAgLy8gb3RoZXJ3aXNlIHJldHVybiBzb3VyY2VcbiAgICBpZiAoIWlzT2JqZWN0KHRhcmdldCkgfHwgIWlzT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICB9XG4gICAgLy8gaXRlcmF0cmUgb3ZlciBzb3VyY2VcbiAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgLy8gZ2V0IHZhbHVlcyBmcm9tIGJvdGggdGFyZ2V0IGFuZCBzb3VyY2UgZm9yIHRoZSBnaXZlbiBrZXlcbiAgICAgICAgY29uc3QgdGFyZ2V0VmFsdWUgPSB0YXJnZXRba2V5XTtcbiAgICAgICAgY29uc3Qgc291cmNlVmFsdWUgPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgLy8gbWVyZ2UgYm90aCB2YWx1ZXNcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0VmFsdWUpICYmIEFycmF5LmlzQXJyYXkoc291cmNlVmFsdWUpKSB7XG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IHRhcmdldFZhbHVlLmNvbmNhdChzb3VyY2VWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNPYmplY3QodGFyZ2V0VmFsdWUpICYmIGlzT2JqZWN0KHNvdXJjZVZhbHVlKSkge1xuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBkZWVwTWVyZ2UoT2JqZWN0LmFzc2lnbih7fSwgdGFyZ2V0VmFsdWUpLCBzb3VyY2VWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVZhbHVlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gcmV0dXJuIG1lcmdlIG9iamVjdFxuICAgIHJldHVybiB0YXJnZXQ7XG59O1xuZXhwb3J0IGRlZmF1bHQgZGVlcE1lcmdlO1xuIiwiaW1wb3J0IHsgY29udmVydFBhaW50VG9SZ2JhIH0gZnJvbSAnLi9jb252ZXJ0Q29sb3InO1xuLyoqXG4gKiBSZXR1cm4gYW4gYXJyYXkgb2Ygc29saWQgc3Ryb2tlIGNvbG9yc1xuICovXG5jb25zdCBnZXRTb2xpZFN0cm9rZXMgPSAocGFpbnRzKSA9PiB7XG4gICAgLy8gY2xvbmUgd2l0aG91dCByZWZlcmVuY2VcbiAgICByZXR1cm4gWy4uLnBhaW50c11cbiAgICAgICAgLm1hcChwYWludCA9PiBjb252ZXJ0UGFpbnRUb1JnYmEocGFpbnQpKTtcbn07XG4vKipcbiAqIGV4dHJhY3RUb2tlbk5vZGVWYWx1ZXNcbiAqIEBwYXJhbSBub2RlOiBTY2VuZU5vZGVcbiAqIEByZXR1cm5zIG5vZGUgb2JqZWN0XG4gKi9cbmNvbnN0IGV4dHJhY3RUb2tlbk5vZGVWYWx1ZXMgPSAobm9kZSkgPT4gKHtcbiAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGRlc2NyaXB0aW9uOiBub2RlLmRlc2NyaXB0aW9uIHx8IHVuZGVmaW5lZCxcbiAgICBib3R0b21MZWZ0UmFkaXVzOiBub2RlLmJvdHRvbUxlZnRSYWRpdXMsXG4gICAgYm90dG9tUmlnaHRSYWRpdXM6IG5vZGUuYm90dG9tUmlnaHRSYWRpdXMsXG4gICAgdG9wTGVmdFJhZGl1czogbm9kZS50b3BMZWZ0UmFkaXVzLFxuICAgIHRvcFJpZ2h0UmFkaXVzOiBub2RlLnRvcFJpZ2h0UmFkaXVzLFxuICAgIGNvcm5lclJhZGl1czogbm9kZS5jb3JuZXJSYWRpdXMgfHwgdW5kZWZpbmVkLFxuICAgIGNvcm5lclNtb290aGluZzogbm9kZS5jb3JuZXJTbW9vdGhpbmcsXG4gICAgc3Ryb2tlczogZ2V0U29saWRTdHJva2VzKG5vZGUuc3Ryb2tlcyksXG4gICAgc3Ryb2tlV2VpZ2h0OiBub2RlLnN0cm9rZVdlaWdodCxcbiAgICBzdHJva2VTdHlsZUlkOiBub2RlLnN0cm9rZVN0eWxlSWQsXG4gICAgc3Ryb2tlTWl0ZXJMaW1pdDogbm9kZS5zdHJva2VNaXRlckxpbWl0LFxuICAgIHN0cm9rZUpvaW46IG5vZGUuc3Ryb2tlSm9pbixcbiAgICBzdHJva2VDYXA6IG5vZGUuc3Ryb2tlQ2FwLFxuICAgIGRhc2hQYXR0ZXJuOiBub2RlLmRhc2hQYXR0ZXJuLFxuICAgIHN0cm9rZUFsaWduOiBub2RlLnN0cm9rZUFsaWduLFxuICAgIHdpZHRoOiBub2RlLndpZHRoLFxuICAgIGhlaWdodDogbm9kZS5oZWlnaHQsXG4gICAgcmVhY3Rpb25zOiBub2RlLnJlYWN0aW9ucyB8fCB1bmRlZmluZWQsXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHBhZGRpbmdUb3A6IG5vZGUucGFkZGluZ1RvcCB8fCAwLFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwYWRkaW5nUmlnaHQ6IG5vZGUucGFkZGluZ1JpZ2h0IHx8IDAsXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHBhZGRpbmdCb3R0b206IG5vZGUucGFkZGluZ0JvdHRvbSB8fCAwLFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwYWRkaW5nTGVmdDogbm9kZS5wYWRkaW5nTGVmdCB8fCAwXG59KTtcbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3RUb2tlbk5vZGVWYWx1ZXM7XG4iLCJjb25zdCBmaWx0ZXJCeVByb3BlcnR5TmFtZSA9IChwcmVmaXggPSAnXycsIGV4Y2x1ZGUgPSB0cnVlKSA9PiB7XG4gICAgcmV0dXJuIChvYmplY3QpID0+IChvYmplY3QubmFtZS50cmltKCkuc3Vic3RyKDAsIHByZWZpeC5sZW5ndGgpICE9PSBwcmVmaXgpID09PSBleGNsdWRlO1xufTtcbmV4cG9ydCBkZWZhdWx0IGZpbHRlckJ5UHJvcGVydHlOYW1lO1xuIiwiLyoqXG4gKiBAZnVuY3Rpb24gZ2V0RWZmZWN0U3R5bGVzXG4gKiBAcGFyYW0ge0FycmF5PEVmZmVjdFN0eWxlPn0gc3R5bGVzIOKAkyB0aGUgZWZmZWN0U3R5bGUgZnJvbSB0aGUgZmlnbWEgZmlsZVxuICovXG5jb25zdCBnZXRFZmZlY3RTdHlsZXMgPSAoc3R5bGVzKSA9PiB7XG4gICAgLy8gaW5pdCBzdHlsZUFycmF5XG4gICAgY29uc3Qgc3R5bGVBcnJheSA9IFtdO1xuICAgIC8vIGxvb3AgdGhyb3VnaCBGaWdtYSBzdHlsZXMgYW5kIGFkZCB0byBhcnJheVxuICAgIHN0eWxlcy5mb3JFYWNoKHN0eWxlID0+IHtcbiAgICAgICAgc3R5bGVBcnJheS5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IHN0eWxlLm5hbWUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogc3R5bGUuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBlZmZlY3RzOiBzdHlsZS5lZmZlY3RzXG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIHJldHVybiBhcnJheVxuICAgIHJldHVybiBzdHlsZUFycmF5O1xufTtcbmV4cG9ydCBkZWZhdWx0IGdldEVmZmVjdFN0eWxlcztcbiIsImltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuY29uc3QgZ2V0RmlsZUlkID0gKGZpZ21hKSA9PiB7XG4gICAgbGV0IGZpbGVJZCA9IGZpZ21hLnJvb3QuZ2V0UGx1Z2luRGF0YShjb25maWcua2V5LmZpbGVJZCk7XG4gICAgLy8gc2V0IHBsdWdpbiBpZCBpZiBpdCBkb2VzIG5vdCBleGlzdFxuICAgIGlmIChmaWxlSWQgPT09IHVuZGVmaW5lZCB8fCBmaWxlSWQgPT09ICcnKSB7XG4gICAgICAgIGZpZ21hLnJvb3Quc2V0UGx1Z2luRGF0YShjb25maWcua2V5LmZpbGVJZCwgZmlnbWEucm9vdC5uYW1lICsgJyAnICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwMDAwMCkpO1xuICAgICAgICAvLyBncmFiIGZpbGUgSURcbiAgICAgICAgZmlsZUlkID0gZmlnbWEucm9vdC5nZXRQbHVnaW5EYXRhKGNvbmZpZy5rZXkuZmlsZUlkKTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbGVJZDtcbn07XG5leHBvcnQgZGVmYXVsdCBnZXRGaWxlSWQ7XG4iLCIvKipcbiAqIEBmdW5jdGlvbiBnZXRHcmlkU3R5bGVzXG4gKiBAcGFyYW0ge0FycmF5fSBncmlkU3R5bGVzIOKAkyB0aGUgZ3JpZFN0eWxlcyBmcm9tIHRoZSBmaWdtYSBmaWxlXG4gKi9cbmNvbnN0IGdldEdyaWRTdHlsZXMgPSAoc3R5bGVzKSA9PiB7XG4gICAgLy8gaW5pdCBzdHlsZUFycmF5XG4gICAgY29uc3Qgc3R5bGVBcnJheSA9IFtdO1xuICAgIC8vIGxvb3AgdGhyb3VnaCBGaWdtYSBzdHlsZXMgYW5kIGFkZCB0byBhcnJheVxuICAgIHN0eWxlcy5mb3JFYWNoKHN0eWxlID0+IHtcbiAgICAgICAgc3R5bGVBcnJheS5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IHN0eWxlLm5hbWUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogc3R5bGUuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBsYXlvdXRHcmlkczogc3R5bGUubGF5b3V0R3JpZHNcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy8gcmV0dXJuIGFycmF5XG4gICAgcmV0dXJuIHN0eWxlQXJyYXk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0R3JpZFN0eWxlcztcbiIsImltcG9ydCBnZXRUb2tlbkpzb24gZnJvbSAnLi9nZXRUb2tlbkpzb24nO1xuaW1wb3J0IGJ1aWxkRmlnbWFEYXRhIGZyb20gJy4vYnVpbGRGaWdtYURhdGEnO1xuLyoqXG4gKiBAbmFtZSBnZXRKc29uXG4gKiBAcGFyYW0ge1BsdWdpbkFQSX0gZmlnbWFcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc3RyaW5naWZ5XG4gKi9cbmNvbnN0IGdldEpzb24gPSAoZmlnbWEsIHVzZXJTZXR0aW5ncywgc3RyaW5naWZ5ID0gdHJ1ZSkgPT4ge1xuICAgIC8vIGNvbnN0cnVjdCBmaWdtYSBkYXRhIG9iamVjdFxuICAgIGNvbnN0IGZpZ21hRGF0YSA9IGJ1aWxkRmlnbWFEYXRhKGZpZ21hLCB7XG4gICAgICAgIHByZWZpeDogdXNlclNldHRpbmdzLnByZWZpeCxcbiAgICAgICAgZXhjbHVkZVByZWZpeDogdXNlclNldHRpbmdzLmV4Y2x1ZGVQcmVmaXhcbiAgICB9KTtcbiAgICBpZiAoc3RyaW5naWZ5ID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gZ2V0VG9rZW5Kc29uKGZpZ21hRGF0YSwgJ3N0eWxlRGljdGlvbmFyeScsIHVzZXJTZXR0aW5ncy5uYW1lQ29udmVyc2lvbik7XG4gICAgfVxuICAgIC8vIGdldCB0b2tlbnMgYXMgc3RyaW5naWZpZWQganNvblxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShnZXRUb2tlbkpzb24oZmlnbWFEYXRhLCAnc3R5bGVEaWN0aW9uYXJ5JywgdXNlclNldHRpbmdzLm5hbWVDb252ZXJzaW9uKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0SnNvbjtcbiIsIi8qKlxuICogQGZ1bmN0aW9uIGdldFBhaW50U3R5bGVzXG4gKiBAcGFyYW0ge0FycmF5fSBwYWludFN0eWxlcyDigJMgdGhlIHBhaW50U3R5bGVzIGZyb20gdGhlIGZpZ21hIGZpbGUgKHNvbWVob3cgc3RpbGwgY29ubmVjdGVkKVxuICovXG5jb25zdCBnZXRQYWludFN0eWxlcyA9IChzdHlsZXMpID0+IHtcbiAgICAvLyBpbml0IHN0eWxlQXJyYXlcbiAgICBjb25zdCBzdHlsZUFycmF5ID0gW107XG4gICAgLy8gbG9vcCB0aHJvdWdoIEZpZ21hIHN0eWxlcyBhbmQgYWRkIHRvIGFycmF5XG4gICAgc3R5bGVzLmZvckVhY2goc3R5bGUgPT4ge1xuICAgICAgICBzdHlsZUFycmF5LnB1c2goe1xuICAgICAgICAgICAgbmFtZTogc3R5bGUubmFtZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBzdHlsZS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIHBhaW50czogc3R5bGUucGFpbnRzXG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIHJldHVybiBhcnJheVxuICAgIHJldHVybiBzdHlsZUFycmF5O1xufTtcbmV4cG9ydCBkZWZhdWx0IGdldFBhaW50U3R5bGVzO1xuIiwiLyoqXG4gKiBAZnVuY3Rpb24gZ2V0VGV4dFN0eWxlc1xuICogQHBhcmFtIHtBcnJheTxUZXh0U3R5bGU+fSBzdHlsZXMg4oCTIHRoZSBwYWludFN0eWxlcyBmcm9tIHRoZSBmaWdtYSBmaWxlIChzb21laG93IHN0aWxsIGNvbm5lY3RlZClcbiAqL1xuY29uc3QgZ2V0VGV4dFN0eWxlcyA9IChzdHlsZXMpID0+IHtcbiAgICAvLyBpbml0IHN0eWxlQXJyYXlcbiAgICBjb25zdCBzdHlsZUFycmF5ID0gW107XG4gICAgLy8gbG9vcCB0aHJvdWdoIEZpZ21hIHN0eWxlcyBhbmQgYWRkIHRvIGFycmF5XG4gICAgc3R5bGVzLmZvckVhY2goc3R5bGUgPT4ge1xuICAgICAgICBzdHlsZUFycmF5LnB1c2goe1xuICAgICAgICAgICAgbmFtZTogc3R5bGUubmFtZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBzdHlsZS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGZvbnRTaXplOiBzdHlsZS5mb250U2l6ZSxcbiAgICAgICAgICAgIHRleHREZWNvcmF0aW9uOiBzdHlsZS50ZXh0RGVjb3JhdGlvbixcbiAgICAgICAgICAgIGZvbnROYW1lOiBzdHlsZS5mb250TmFtZSxcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6IHN0eWxlLmxldHRlclNwYWNpbmcsXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiBzdHlsZS5saW5lSGVpZ2h0LFxuICAgICAgICAgICAgcGFyYWdyYXBoSW5kZW50OiBzdHlsZS5wYXJhZ3JhcGhJbmRlbnQsXG4gICAgICAgICAgICBwYXJhZ3JhcGhTcGFjaW5nOiBzdHlsZS5wYXJhZ3JhcGhTcGFjaW5nLFxuICAgICAgICAgICAgdGV4dENhc2U6IHN0eWxlLnRleHRDYXNlXG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIHJldHVybiBhcnJheVxuICAgIHJldHVybiBzdHlsZUFycmF5O1xufTtcbmV4cG9ydCBkZWZhdWx0IGdldFRleHRTdHlsZXM7XG4iLCJpbXBvcnQgZXh0cmFjdENvbG9ycyBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdENvbG9ycyc7XG5pbXBvcnQgZXh0cmFjdEdyaWRzIGZyb20gJy4uL2V4dHJhY3Rvci9leHRyYWN0R3JpZHMnO1xuaW1wb3J0IGV4dHJhY3RGb250cyBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdEZvbnRzJztcbmltcG9ydCBleHRyYWN0RWZmZWN0cyBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdEVmZmVjdHMnO1xuaW1wb3J0IGV4dHJhY3RNb3Rpb24gZnJvbSAnLi4vZXh0cmFjdG9yL2V4dHJhY3RNb3Rpb24nO1xuaW1wb3J0IGV4dHJhY3RTaXplcyBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdFNpemVzJztcbmltcG9ydCBleHRyYWN0U3BhY2luZyBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdFNwYWNpbmcnO1xuaW1wb3J0IGV4dHJhY3RCb3JkZXJzIGZyb20gJy4uL2V4dHJhY3Rvci9leHRyYWN0Qm9yZGVycyc7XG5pbXBvcnQgZXh0cmFjdFJhZGlpIGZyb20gJy4uL2V4dHJhY3Rvci9leHRyYWN0UmFkaWknO1xuaW1wb3J0IGdyb3VwQnlOYW1lIGZyb20gJy4vZ3JvdXBCeU5hbWUnO1xuaW1wb3J0IHN0eWxlRGljdGlvbmFyeVRyYW5zZm9ybWVyIGZyb20gJy4uL3RyYW5zZm9ybWVyL3N0eWxlRGljdGlvbmFyeVRyYW5zZm9ybWVyJztcbmNvbnN0IHRyYW5zZm9ybWVyID0ge1xuICAgIHN0eWxlRGljdGlvbmFyeTogc3R5bGVEaWN0aW9uYXJ5VHJhbnNmb3JtZXJcbn07XG5jb25zdCBleHBvcnRSYXdUb2tlbkFycmF5ID0gKGZpZ21hRGF0YSkgPT4ge1xuICAgIC8vIGdldCB0b2tlbnNcbiAgICByZXR1cm4gW1xuICAgICAgICAuLi5leHRyYWN0U2l6ZXMoZmlnbWFEYXRhLnRva2VuRnJhbWVzKSxcbiAgICAgICAgLi4uZXh0cmFjdFNwYWNpbmcoZmlnbWFEYXRhLnRva2VuRnJhbWVzKSxcbiAgICAgICAgLi4uZXh0cmFjdEJvcmRlcnMoZmlnbWFEYXRhLnRva2VuRnJhbWVzKSxcbiAgICAgICAgLi4uZXh0cmFjdFJhZGlpKGZpZ21hRGF0YS50b2tlbkZyYW1lcyksXG4gICAgICAgIC4uLmV4dHJhY3RNb3Rpb24oZmlnbWFEYXRhLnRva2VuRnJhbWVzKSxcbiAgICAgICAgLi4uZXh0cmFjdENvbG9ycyhmaWdtYURhdGEucGFpbnRTdHlsZXMpLFxuICAgICAgICAuLi5leHRyYWN0R3JpZHMoZmlnbWFEYXRhLmdyaWRTdHlsZXMpLFxuICAgICAgICAuLi5leHRyYWN0Rm9udHMoZmlnbWFEYXRhLnRleHRTdHlsZXMpLFxuICAgICAgICAuLi5leHRyYWN0RWZmZWN0cyhmaWdtYURhdGEuZWZmZWN0U3R5bGVzKVxuICAgIF07XG59O1xuY29uc3QgZ2V0VG9rZW5Kc29uID0gKGZpZ21hRGF0YSwgZm9ybWF0ID0gJ3N0eWxlRGljdGlvbmFyeScsIG5hbWVDb252ZXJzaW9uID0gJ2RlZmF1bHQnKSA9PiB7XG4gICAgLy8gZ2V0IHRva2VuIGFycmF5XG4gICAgY29uc3QgdG9rZW5BcnJheSA9IGV4cG9ydFJhd1Rva2VuQXJyYXkoZmlnbWFEYXRhKTtcbiAgICAvLyBmb3JtYXQgdG9rZW5zXG4gICAgY29uc3QgZm9ybWF0dGVkVG9rZW5zID0gdG9rZW5BcnJheS5tYXAoKHRva2VuKSA9PiB0cmFuc2Zvcm1lcltmb3JtYXRdKHRva2VuKSk7XG4gICAgLy8gZ3JvdXAgdG9rZW5zXG4gICAgY29uc3QgZ3JvdXBlZFRva2VucyA9IGdyb3VwQnlOYW1lKGZvcm1hdHRlZFRva2VucywgdHJ1ZSwgbmFtZUNvbnZlcnNpb24pO1xuICAgIC8vIHJldHVybiBncm91cCB0b2tlbnNcbiAgICByZXR1cm4gZ3JvdXBlZFRva2Vucztcbn07XG5leHBvcnQgZGVmYXVsdCBnZXRUb2tlbkpzb247XG4iLCJpbXBvcnQgZXh0cmFjdFRva2VuTm9kZVZhbHVlcyBmcm9tICcuL2V4dHJhY3RUb2tlbk5vZGVWYWx1ZXMnO1xuaW1wb3J0IGlzVG9rZW5Ob2RlIGZyb20gJy4vaXNUb2tlbk5vZGUnO1xuLy8gdGhlIG5hbWUgdGhhdCB0b2tlbiBmcmFtZXMgaGF2ZVxuY29uc3QgdG9rZW5GcmFtZU5hbWUgPSAnX3Rva2Vucyc7XG4vLyBjaGVjayBpZiBhIGZyYW1lIGlzIGEgX3Rva2VuIGZyYW1lXG5jb25zdCBpc1Rva2VuRnJhbWUgPSAobm9kZSkgPT4gbm9kZS50eXBlID09PSAnRlJBTUUnICYmIG5vZGUubmFtZS50cmltKCkudG9Mb3dlckNhc2UoKS5zdWJzdHIoMCwgdG9rZW5GcmFtZU5hbWUubGVuZ3RoKSA9PT0gdG9rZW5GcmFtZU5hbWU7XG4vLyByZXR1cm4gb25seSBub2RlcyB0aGF0IGFyZSBmcmFtZXNcbmNvbnN0IGdldEZyYW1lTm9kZXMgPSAobm9kZXMpID0+IFsuLi5ub2Rlcy5tYXAocGFnZSA9PiBwYWdlLmZpbmRDaGlsZHJlbihub2RlID0+IGlzVG9rZW5GcmFtZShub2RlKSkpLnJlZHVjZSgoZmxhdHRlbiwgYXJyKSA9PiBbLi4uZmxhdHRlbiwgLi4uYXJyXSldO1xuLyoqXG4gKiBnZXRWYXJpYW50TmFtZVxuICogY3JlYXRlcyB0aGUgdmFyaWFudCBuYW1lIG9mIHRoZSBwYXJlbnQgYW5kIGNoaWxkIG5hbWVcbiAqL1xuY29uc3QgZ2V0VmFyaWFudE5hbWUgPSAocGFyZW50TmFtZSwgY2hpbGROYW1lKSA9PiB7XG4gICAgLy8gc3BsaXQgaW50byBhcnJheVxuICAgIGNoaWxkTmFtZSA9IGNoaWxkTmFtZS5zcGxpdCgnLCcpXG4gICAgICAgIC8vIHJlbW92ZSBoaWRkZW4gbmFtZXNcbiAgICAgICAgLmZpbHRlcihwYXJ0ID0+ICFbJ18nLCAnLiddLmluY2x1ZGVzKHBhcnQudHJpbSgpLnN1YnN0cigwLCAxKSkpXG4gICAgICAgIC8vIGNsZWFudXAgbmFtZXMsIG9ubHkgcmV0dXJuIHZhbHVlIHBhcnRcbiAgICAgICAgLm1hcChwYXJ0ID0+IHBhcnQuc3BsaXQoJz0nKVsxXSlcbiAgICAgICAgLy8gY29tYmluZVxuICAgICAgICAuam9pbignLycpO1xuICAgIC8vIHJldHVybiBmdWxsIG5hbWVcbiAgICByZXR1cm4gYCR7cGFyZW50TmFtZX0vJHtjaGlsZE5hbWV9YDtcbn07XG4vKipcbiAqIFJldHVybnMgYWxsIGZyYW1lcyBmcm9tIHRoZSBmaWxlIHRoYXQgaGF2ZSBhIG5hbWUgdGhhdCBzdGFydHMgd2l0aCBfdG9rZW5zIG9yIHRoZSB1c2VyIGRlZmluZWQgdG9rZW4gc3BlY2lmaWVyXG4gKlxuICogQHBhcmFtIHBhZ2VzIFBhZ2VOb2Rlc1xuICovXG5jb25zdCBnZXRUb2tlbk5vZGVzID0gKHBhZ2VzKSA9PiB7XG4gICAgLy8gZ2V0IHRva2VuIGZyYW1lc1xuICAgIGNvbnN0IHRva2VuRnJhbWVzID0gZ2V0RnJhbWVOb2RlcyhwYWdlcyk7XG4gICAgLy8gZ2V0IGFsbCBjaGlsZHJlbiBvZiB0b2tlbiBmcmFtZXNcbiAgICByZXR1cm4gdG9rZW5GcmFtZXMubWFwKGZyYW1lID0+IGZyYW1lXG4gICAgICAgIC8vIGNoZWNrIGlmIGNoaWxkcmVuIGFyZSBvZiB2YWxpZGUgdHlwZXNcbiAgICAgICAgLmZpbmRBbGwoXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBub2RlID0+IGlzVG9rZW5Ob2RlKG5vZGUpKSlcbiAgICAgICAgLy8gbWVyZ2VzIGFsbCBjaGlsZHJlbiBpbnRvIG9uZSBhcnJheVxuICAgICAgICAucmVkdWNlKChmbGF0dGVuLCBhcnIpID0+IFsuLi5mbGF0dGVuLCAuLi5hcnJdLCBbXSlcbiAgICAgICAgLy8gdW5wYWNrIHZhcmlhbnRzICYgd2FybiBhYm91dCBkZXByZWNhdGVkIHR5cGVzXG4gICAgICAgIC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gJ1JFQ1RBTkdMRScgfHwgaXRlbS50eXBlID09PSAnRlJBTUUnKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1BsZWFzZSB1c2Ugb25seSBtYWluIGNvbXBvbmVudHMgYW5kIHZhcmlhbnRzLCBvdGhlciB0eXBlcyBtYXkgYmUgZGVwcmVjYXRlZCBhcyB0b2tlbnMgaW4gdGhlIGZ1dHVyZScpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHVucGFjayB2YXJpYW50c1xuICAgICAgICBpZiAoaXRlbS50eXBlID09PSAnQ09NUE9ORU5UX1NFVCcpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IE5hbWUgaXMgb3ZlcndyaXRpbmcgcmVhbCBvYmplY3QgaW4gZmlnbWFcbiAgICAgICAgICAgIC8vIC0+IGNyZWF0ZSBjbG9uZSBhbmQgbW92ZSB0byBuZXcgYXJyYXkgdG8gcmV0dXJuXG4gICAgICAgICAgICByZXR1cm4gaXRlbS5jaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiAoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBleHRyYWN0VG9rZW5Ob2RlVmFsdWVzKGNoaWxkKSksIHsgbmFtZTogZ2V0VmFyaWFudE5hbWUoaXRlbS5uYW1lLCBjaGlsZC5uYW1lKSB9KSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJldHVybiBub3JtYWwgaXRlbSBhcyBhcnJheSB0byB1bnBhY2sgbGF0ZXJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gW2V4dHJhY3RUb2tlbk5vZGVWYWx1ZXMoaXRlbSldO1xuICAgIH0pXG4gICAgICAgIC8vIG1lcmdlcyB0aGUgdmFyaWFudCBjaGlsZHJlbiBpbnRvIG9uZSBhcnJheVxuICAgICAgICAucmVkdWNlKChmbGF0dGVuLCBhcnIpID0+IFsuLi5mbGF0dGVuLCAuLi5hcnJdLCBbXSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0VG9rZW5Ob2RlcztcbmV4cG9ydCBjb25zdCBfX3Rlc3RpbmcgPSB7XG4gICAgaXNUb2tlbk5vZGU6IGlzVG9rZW5Ob2RlLFxuICAgIGlzVG9rZW5GcmFtZTogaXNUb2tlbkZyYW1lXG59O1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgc2VtVmVyRGlmZmVyZW5jZSBmcm9tICcuL3NlbVZlckRpZmZlcmVuY2UnO1xuaW1wb3J0IGN1cnJlbnRWZXJzaW9uIGZyb20gJy4vdmVyc2lvbic7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJztcbmNvbnN0IGdldFZlcnNpb25EaWZmZXJlbmNlID0gKGZpZ21hKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAvLyBnZXQgdmVyc2lvbiAmIHZlcnNpb24gZGlmZmVyZW5jZVxuICAgIGNvbnN0IGxhc3RWZXJzaW9uU2V0dGluZ3NPcGVuZWQgPSB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKGNvbmZpZy5rZXkubGFzdFZlcnNpb25TZXR0aW5nc09wZW5lZCk7XG4gICAgY29uc3QgdmVyc2lvbkRpZmZlcmVuY2UgPSBzZW1WZXJEaWZmZXJlbmNlKGN1cnJlbnRWZXJzaW9uLCBsYXN0VmVyc2lvblNldHRpbmdzT3BlbmVkKTtcbiAgICAvLyB1cGRhdGUgdmVyc2lvblxuICAgIGlmICghbGFzdFZlcnNpb25TZXR0aW5nc09wZW5lZCB8fCBsYXN0VmVyc2lvblNldHRpbmdzT3BlbmVkICE9PSBjdXJyZW50VmVyc2lvbikge1xuICAgICAgICB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKGNvbmZpZy5rZXkubGFzdFZlcnNpb25TZXR0aW5nc09wZW5lZCwgY3VycmVudFZlcnNpb24pO1xuICAgIH1cbiAgICAvLyByZXR1cm4gdmVyc2lvbiBEaWZmZXJlbmNlXG4gICAgcmV0dXJuIHZlcnNpb25EaWZmZXJlbmNlO1xufSk7XG5leHBvcnQgZGVmYXVsdCBnZXRWZXJzaW9uRGlmZmVyZW5jZTtcbiIsImltcG9ydCBkZWVwTWVyZ2UgZnJvbSAnLi9kZWVwTWVyZ2UnO1xuaW1wb3J0IHRyYW5zZm9ybU5hbWUgZnJvbSAnLi4vdXRpbGl0aWVzL3RyYW5zZm9ybU5hbWUnO1xuLy8gY3JlYXRlIGEgbmVzdGVkIG9iamVjdCBzdHJ1Y3R1cmUgZnJvbSB0aGUgYXJyYXkgKFsnc3R5bGUnLCdjb2xvcnMnLCdtYWluJywncmVkJ10pXG5jb25zdCBuZXN0ZWRPYmplY3RGcm9tQXJyYXkgPSAoYXJyYXksIHZhbHVlKSA9PiB7XG4gICAgLy8gcmVkdWNlclxuICAgIGNvbnN0IHJlZHVjZXIgPSAodmFsLCBrZXkpID0+ICh7IFtrZXldOiB2YWwgfSk7XG4gICAgLy8gcmV0dXJuIHJlZHVjZWQgYXJyYXlcbiAgICByZXR1cm4gYXJyYXkucmVkdWNlUmlnaHQocmVkdWNlciwgdmFsdWUpO1xufTtcbmNvbnN0IGdyb3VwQnlOYW1lID0gKHRva2VuQXJyYXksIHJlbW92ZU5hbWUgPSB0cnVlLCBuYW1lQ29udmVyc2lvbiA9ICdkZWZhdWx0JykgPT4ge1xuICAgIC8vIG5lc3QgdG9rZW5zIGludG8gb2JqZWN0IHdpdGggaGllcmFjaHkgZGVmaW5lZCBieSBuYW1lIHVzaW5nIC9cbiAgICBjb25zdCBncm91cGVkVG9rZW5zID0gdG9rZW5BcnJheS5tYXAodG9rZW4gPT4ge1xuICAgICAgICAvLyBzcGxpdCB0b2tlbiBuYW1lIGludG8gYXJyYXlcbiAgICAgICAgLy8gcmVtb3ZlIGxlYWRpbmcgYW5kIGZvbGxvd2luZyB3aGl0ZXNwYWNlIGZvciBldmVyeSBpdGVtXG4gICAgICAgIC8vIHRyYW5zZm9ybSBpdGVtcyB0byBsb3dlckNhc2VcbiAgICAgICAgY29uc3QgZ3JvdXBzRnJvbU5hbWUgPSB0b2tlbi5uYW1lLnNwbGl0KCcvJykubWFwKGdyb3VwID0+IHRyYW5zZm9ybU5hbWUoZ3JvdXAsIG5hbWVDb252ZXJzaW9uKSk7XG4gICAgICAgIC8vIHJlbW92ZSBuYW1lIGlmIG5vdCBvdGhlcndpc2Ugc3BlY2lmaWVkXG4gICAgICAgIGlmIChyZW1vdmVOYW1lID09PSB0cnVlKSB7XG4gICAgICAgICAgICBkZWxldGUgdG9rZW4ubmFtZTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZXR1cm5cbiAgICAgICAgcmV0dXJuIG5lc3RlZE9iamVjdEZyb21BcnJheShncm91cHNGcm9tTmFtZSwgdG9rZW4pO1xuICAgIH0pO1xuICAgIGlmIChncm91cGVkVG9rZW5zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gcmV0dXJuIG1lcmdlZCBvYmplY3Qgb2YgdG9rZW5zIGdyb3VwZWQgYnkgbmFtZSBoaWVyYWNoeVxuICAgICAgICByZXR1cm4gZ3JvdXBlZFRva2Vucy5yZWR1Y2UoKGFjY3VtdWxhdG9yID0ge30sIGN1cnJlbnRWYWx1ZSkgPT4gZGVlcE1lcmdlKGFjY3VtdWxhdG9yLCBjdXJyZW50VmFsdWUpKTtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xufTtcbmV4cG9ydCBkZWZhdWx0IGdyb3VwQnlOYW1lO1xuIiwiLy8gdGhlIG5vZGUgdHlwZXMgdGhhdCBjYW4gYmUgdXNlZCBmb3IgdG9rZW5zXG5jb25zdCB0b2tlbk5vZGVUeXBlcyA9IFtcbiAgICAnQ09NUE9ORU5UJyxcbiAgICAnQ09NUE9ORU5UX1NFVCcsXG4gICAgJ1JFQ1RBTkdMRScsXG4gICAgJ0ZSQU1FJ1xuXTtcbi8qKlxuICogY2hlY2sgaWYgYSBub2RlIGlzIGEgdmFsaWQgdG9rZW4gbm9kZSB0eXBlXG4gKiBDdXJyZW50bHk6ICdDT01QT05FTlQnLCAnRlJBTUUgb3IgJ1JFQ1RBTkdMRSdcbiAqIEBwYXJhbSBTY2VuZU5vZGUgbm9kZVxuICovXG5jb25zdCBpc1Rva2VuTm9kZSA9IChub2RlKSA9PiB7XG4gICAgcmV0dXJuIG5vZGUucGFyZW50LnR5cGUgIT09ICdDT01QT05FTlRfU0VUJyAmJiB0b2tlbk5vZGVUeXBlcy5pbmNsdWRlcyhub2RlLnR5cGUpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGlzVG9rZW5Ob2RlO1xuIiwiLyoqXG4gKiBJZiB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYSBudW1iZXJcbiAqIGl0IGlzIHJvdW5kZWQgdG8gMyBkZWNpbWFsIHBvc2l0aW9uc1xuICogb3RoZXJ3aXNlIGl0IGlzIHJldHVybmVkIGFzIGlzXG4gKiBAcGFyYW0gdmFsdWUgbnVtYmVyXG4gKiBAcGFyYW0gZGVjaW1hbFBsYWNlcyBpbnRcbiAqL1xuY29uc3Qgcm91bmRXaXRoRGVjaW1hbHMgPSAodmFsdWUsIGRlY2ltYWxQbGFjZXMgPSAyKSA9PiB7XG4gICAgLy8gZXhpdCBpZiB2YWx1ZSBpcyB1bmRlZmluZWRcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIGNoZWNrIGZvciBjb3JyZWN0IGlucHV0c1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInIHx8IHR5cGVvZiBkZWNpbWFsUGxhY2VzICE9PSAnbnVtYmVyJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcGFyYW1ldGVycywgYm90aCB2YWx1ZSBcIiR7dmFsdWV9XCIgKCR7dHlwZW9mIHZhbHVlfSkgYW5kIGRlY2ltYWxQbGFjZXMgXCIke2RlY2ltYWxQbGFjZXN9XCIgKCR7dHlwZW9mIGRlY2ltYWxQbGFjZXN9KSBtdXN0IGJlIG9mIHR5cGUgbnVtYmVyYCk7XG4gICAgfVxuICAgIC8vIHNldCBkZWNpbWFsIHBsYWNlc1xuICAgIGNvbnN0IGZhY3Rvck9mVGVuID0gTWF0aC5wb3coMTAsIGRlY2ltYWxQbGFjZXMpO1xuICAgIC8vIHJvdW5kIHJlc3VsdCBhbmQgcmV0dXJuXG4gICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiBmYWN0b3JPZlRlbikgLyBmYWN0b3JPZlRlbjtcbn07XG5leHBvcnQgZGVmYXVsdCByb3VuZFdpdGhEZWNpbWFscztcbiIsImV4cG9ydCBkZWZhdWx0IChjdXJyZW50U2VtVmVyLCBwcmV2U2VtVmVycyA9ICcxLjAuMCcpID0+IHtcbiAgICBjb25zdCBbcE1ham9yLCBwTWlub3IsIHBQYXRjaF0gPSBwcmV2U2VtVmVycy5zcGxpdCgnLicpO1xuICAgIGNvbnN0IFtjTWFqb3IsIGNNaW5vciwgY1BhdGNoXSA9IGN1cnJlbnRTZW1WZXIuc3BsaXQoJy4nKTtcbiAgICBpZiAocE1ham9yIDwgY01ham9yKSB7XG4gICAgICAgIHJldHVybiAnbWFqb3InO1xuICAgIH1cbiAgICBpZiAocE1pbm9yIDwgY01pbm9yKSB7XG4gICAgICAgIHJldHVybiAnbWlub3InO1xuICAgIH1cbiAgICBpZiAocFBhdGNoIDwgY1BhdGNoKSB7XG4gICAgICAgIHJldHVybiAncGF0Y2gnO1xuICAgIH1cbn07XG4iLCJpbXBvcnQgc2V0dGluZ3NEZWZhdWx0IGZyb20gJy4vc2V0dGluZ3NEZWZhdWx0JztcbmNvbnN0IHNldHRpbmdzS2V5ID0gJ3NldHRpbmdzJztcbi8qKlxuICogRnVuY3Rpb24gc2FuaXRpemVzIGFuZCBwcmVwYXJlcyBzZXR0aW5ncyB0byBiZSBzdG9yZWRcbiAqIEBwYXJhbSBuZXdTZXR0aW5nc1xuICogQHBhcmFtIGN1cnJlbnRTZXR0aW5nc1xuICovXG5jb25zdCBzZXR0aW5nc1ByZXBhcmUgPSAobmV3U2V0dGluZ3MsIGN1cnJlbnRTZXR0aW5ncykgPT4ge1xuICAgIC8vIGluaXRpYWxpemUgb2JqZWN0XG4gICAgY29uc3QgbWVyZ2VkU2V0dGluZ3MgPSB7fTtcbiAgICAvLyBhZGQgcHVibGljIHNldHRpbmdzXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc2V0dGluZ3NEZWZhdWx0KSkge1xuICAgICAgICAvLyBhdm9pZCBlbXB0eSB2YWx1ZXNcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZS5kZWZhdWx0ID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5lbXB0eSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmIChuZXdTZXR0aW5nc1trZXldLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICBuZXdTZXR0aW5nc1trZXldID0gY3VycmVudFNldHRpbmdzW2tleV0gfHwgdmFsdWUuZGVmYXVsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBpZiB2YWxpZCBuZXcgc2V0dGluZ3NcbiAgICAgICAgaWYgKHR5cGVvZiBuZXdTZXR0aW5nc1trZXldID09PSB0eXBlb2YgdmFsdWUuZGVmYXVsdCkge1xuICAgICAgICAgICAgbWVyZ2VkU2V0dGluZ3Nba2V5XSA9IG5ld1NldHRpbmdzW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgdmFsaWQgY3VycmVudCBzZXR0aW5nc1xuICAgICAgICBlbHNlIGlmICh0eXBlb2YgY3VycmVudFNldHRpbmdzW2tleV0gPT09IHR5cGVvZiB2YWx1ZS5kZWZhdWx0KSB7XG4gICAgICAgICAgICBtZXJnZWRTZXR0aW5nc1trZXldID0gY3VycmVudFNldHRpbmdzW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBpZiBib3RoIG5ldyBhbmQgb2xkIHZhbHVlIGRvbid0IGZpdCwgdXNlIGRlZmF1bHRcbiAgICAgICAgICAgIG1lcmdlZFNldHRpbmdzW2tleV0gPSB2YWx1ZS5kZWZhdWx0O1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIHJldHVybiBtZXJnZWQgc2V0dGluZ3Mgb2JqZWN0XG4gICAgcmV0dXJuIG1lcmdlZFNldHRpbmdzO1xufTtcbi8qKlxuICogZ2V0IHRoZSBjdXJyZW50IHVzZXJzIHNldHRpbmdzXG4gKiBmb3Igc2V0dGluZ3MgdGhhdCBhcmUgbm90IHNldCwgdGhlIGRlZmF1bHRzIHdpbGwgYmUgdXNlZFxuICogQHJldHVybiBvYmplY3RcbiAqL1xuY29uc3QgZ2V0U2V0dGluZ3MgPSAoKSA9PiB7XG4gICAgbGV0IHVzZXJTZXR0aW5ncyA9IGZpZ21hLnJvb3QuZ2V0UGx1Z2luRGF0YShzZXR0aW5nc0tleSk7XG4gICAgaWYgKHVzZXJTZXR0aW5ncy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHVzZXJTZXR0aW5ncyA9IEpTT04ucGFyc2UodXNlclNldHRpbmdzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHVzZXJTZXR0aW5ncyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgLy8gaW5pdCBzZXR0aW5ncyBvYmplY3RcbiAgICBjb25zdCBzZXR0aW5ncyA9IHt9O1xuICAgIC8vIGZpbGwgd2l0aCB1c2VyIHNldHRpbmdzIG9yIGRlZmF1bHRzXG4gICAgT2JqZWN0LmVudHJpZXMoc2V0dGluZ3NEZWZhdWx0KS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgaWYgKHVzZXJTZXR0aW5ncyAhPT0gdW5kZWZpbmVkICYmIHVzZXJTZXR0aW5nc1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBzZXR0aW5nc1trZXldID0gdXNlclNldHRpbmdzW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNldHRpbmdzW2tleV0gPSB2YWx1ZS5kZWZhdWx0O1xuICAgIH0pO1xuICAgIHJldHVybiBzZXR0aW5ncztcbn07XG4vKipcbiAqIEBuYW1lIHNhdmVTZXR0aW5nc1xuICogQGRlc2NyaXB0aW9uIHNhdmUgdGhlIHVzZXIgc2V0dGluZ3MgdG8gdGhlIFwiY2FjaGVcIlxuICogQHBhcmFtIHtVc2VyU2V0dGluZ3N9IHNldHRpbmdzXG4gKi9cbmNvbnN0IHNldFNldHRpbmdzID0gKHNldHRpbmdzKSA9PiB7XG4gICAgc2V0dGluZ3MgPSBzZXR0aW5nc1ByZXBhcmUoc2V0dGluZ3MsIGdldFNldHRpbmdzKCkpO1xuICAgIC8vIHN0b3JlIHB1YmxpYyBzZXR0aW5ncyB0aGF0IHNob3VsZCBiZSBzaGFyZWQgYWNyb3NzIG9yZ1xuICAgIGZpZ21hLnJvb3Quc2V0UGx1Z2luRGF0YShzZXR0aW5nc0tleSwgSlNPTi5zdHJpbmdpZnkoc2V0dGluZ3MsIG51bGwsIDIpKTtcbn07XG4vLyBleHBvcnRzXG5leHBvcnQgeyBzZXR0aW5nc0tleSwgZ2V0U2V0dGluZ3MsIHNldFNldHRpbmdzIH07XG5leHBvcnQgY29uc3QgX190ZXN0aW5nID0ge1xuICAgIHNldHRpbmdzUHJlcGFyZTogc2V0dGluZ3NQcmVwYXJlXG59O1xuIiwiLyogaXN0YW5idWwgaWdub3JlIGZpbGUgKi9cbi8vIHNldHRpbmdzIHN0cnVjdHVyZSAmIGRlZmF1bHQgdmFsdWVzXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZmlsZW5hbWU6IHtcbiAgICAgICAgZGVmYXVsdDogJ2Rlc2lnbi10b2tlbnMnLFxuICAgICAgICBlbXB0eTogZmFsc2VcbiAgICB9LFxuICAgIG5hbWVDb252ZXJzaW9uOiB7XG4gICAgICAgIGRlZmF1bHQ6ICdkZWZhdWx0JyxcbiAgICAgICAgZW1wdHk6IGZhbHNlXG4gICAgfSxcbiAgICBleGNsdWRlUHJlZml4OiB7XG4gICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgIGVtcHR5OiBmYWxzZVxuICAgIH0sXG4gICAgcHJlZml4OiB7XG4gICAgICAgIGRlZmF1bHQ6ICdfJyxcbiAgICAgICAgZW1wdHk6IGZhbHNlXG4gICAgfSxcbiAgICBzZXJ2ZXJVcmw6IHtcbiAgICAgICAgZGVmYXVsdDogJycsXG4gICAgICAgIGVtcHR5OiB0cnVlXG4gICAgfSxcbiAgICBldmVudFR5cGU6IHtcbiAgICAgICAgZGVmYXVsdDogJ3VwZGF0ZS10b2tlbnMnLFxuICAgICAgICBlbXB0eTogZmFsc2VcbiAgICB9LFxuICAgIGFjY2VwdEhlYWRlcjoge1xuICAgICAgICBkZWZhdWx0OiAnYXBwbGljYXRpb24vdm5kLmdpdGh1Yi5ldmVyZXN0LXByZXZpZXcranNvbicsXG4gICAgICAgIGVtcHR5OiB0cnVlXG4gICAgfSxcbiAgICBhdXRoVHlwZToge1xuICAgICAgICBkZWZhdWx0OiAndG9rZW4nLFxuICAgICAgICBlbXB0eTogZmFsc2VcbiAgICB9XG59O1xuIiwiY29uc3QgcmV0dXJuT3JUaHJvdyA9IChjb252ZXJ0ZWRTdHJpbmcsIG9yaWdpbmFsU3RyaW5nLCBzdHJpbmdDYXNlKSA9PiB7XG4gICAgLy8gcmV0dXJuIGNvbnZlcnRlZCBzdHJpbmcgaWYgc3VjY2Vzc2Z1bFxuICAgIGlmICh0eXBlb2YgY29udmVydGVkU3RyaW5nID09PSAnc3RyaW5nJyAmJiBjb252ZXJ0ZWRTdHJpbmcgIT09ICcnKSB7XG4gICAgICAgIHJldHVybiBjb252ZXJ0ZWRTdHJpbmc7XG4gICAgfVxuICAgIC8vIHRocm93IGVycm9yXG4gICAgdGhyb3cgbmV3IEVycm9yKGBjb252ZXJ0aW5nIFwiJHtvcmlnaW5hbFN0cmluZ31cIiB0byAke3N0cmluZ0Nhc2V9LCByZXN1bHRpbmcgaW4gXCIke2NvbnZlcnRlZFN0cmluZ31cImApO1xufTtcbmNvbnN0IHRvQ2FtZWxDYXNlID0gKHN0cmluZykgPT4ge1xuICAgIGNvbnN0IGNvbnZlcnRlZFN0cmluZyA9IHN0cmluZy50b0xvd2VyQ2FzZSgpXG4gICAgICAgIC5yZXBsYWNlKC9bJ1wiXS9nLCAnJylcbiAgICAgICAgLnJlcGxhY2UoLyhbLV8gXSl7MSx9L2csICcgJylcbiAgICAgICAgLnJlcGxhY2UoL1xcVysvZywgJyAnKVxuICAgICAgICAudHJpbSgpXG4gICAgICAgIC5yZXBsYWNlKC8gKC4pL2csIGZ1bmN0aW9uICgkMSkgeyByZXR1cm4gJDEudG9VcHBlckNhc2UoKTsgfSlcbiAgICAgICAgLnJlcGxhY2UoLyAvZywgJycpO1xuICAgIC8vIHJldHVybiBvciB0aHJvd1xuICAgIHJldHVybiByZXR1cm5PclRocm93KGNvbnZlcnRlZFN0cmluZywgc3RyaW5nLCAnY2FtZWxDYXNlJyk7XG59O1xuY29uc3QgdG9LZWJhYkNhc2UgPSAoc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgY29udmVydGVkU3RyaW5nID0gc3RyaW5nLnRvTG93ZXJDYXNlKClcbiAgICAgICAgLnJlcGxhY2UoL1snXCJdL2csICcnKVxuICAgICAgICAucmVwbGFjZSgvKFstXyBdKXsxLH0vZywgJyAnKVxuICAgICAgICAucmVwbGFjZSgvXFxXKy9nLCAnICcpXG4gICAgICAgIC50cmltKClcbiAgICAgICAgLnJlcGxhY2UoLyAvZywgJy0nKTtcbiAgICAvLyByZXR1cm4gb3IgdGhyb3dcbiAgICByZXR1cm4gcmV0dXJuT3JUaHJvdyhjb252ZXJ0ZWRTdHJpbmcsIHN0cmluZywgJ2tlYmFiQ2FzZScpO1xufTtcbmNvbnN0IHRyYW5zZm9ybU5hbWUgPSAobmFtZSwgbmFtZUNvbnZlcnNpb24gPSAnZGVmYXVsdCcpID0+IHtcbiAgICAvLyBpZiBjYW1lbENhc2VcbiAgICBpZiAobmFtZUNvbnZlcnNpb24gPT09ICdjYW1lbENhc2UnKSB7XG4gICAgICAgIHJldHVybiB0b0NhbWVsQ2FzZShuYW1lKTtcbiAgICB9XG4gICAgLy8gaWYga2ViYWJDYXNlXG4gICAgaWYgKG5hbWVDb252ZXJzaW9uID09PSAna2ViYWJDYXNlJykge1xuICAgICAgICByZXR1cm4gdG9LZWJhYkNhc2UobmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBuYW1lLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xufTtcbmV4cG9ydCBkZWZhdWx0IHRyYW5zZm9ybU5hbWU7XG5leHBvcnQgY29uc3QgX190ZXN0aW5nID0ge1xuICAgIHRvQ2FtZWxDYXNlOiB0b0NhbWVsQ2FzZSxcbiAgICB0b0tlYmFiQ2FzZTogdG9LZWJhYkNhc2Vcbn07XG4iLCIvKiBpc3RhbmJ1bCBpZ25vcmUgZmlsZSAqL1xuY29uc3QgdmVyc2lvbiA9ICczLjAuMSc7XG5leHBvcnQgZGVmYXVsdCB2ZXJzaW9uO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==