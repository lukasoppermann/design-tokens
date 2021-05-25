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

/***/ "./src/extractor/extractBreakpoints.ts":
/*!*********************************************!*\
  !*** ./src/extractor/extractBreakpoints.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/roundWithDecimals */ "./src/utilities/roundWithDecimals.ts");

const extractBreakpoints = (tokenNodes) => {
    const nodeName = 'breakpoints';
    // return as object
    return tokenNodes.filter(node => node.name.substr(0, nodeName.length) === nodeName).map(node => ({
        name: node.name,
        // @ts-ignore
        description: node.description || null,
        category: 'breakpoint',
        values: {
            width: {
                value: Object(_utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__["default"])(node.width, 2),
                unit: 'pixel',
                type: 'number'
            }
        }
    }));
};
/* harmony default export */ __webpack_exports__["default"] = (extractBreakpoints);


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
/* harmony import */ var _extractor_extractBreakpoints__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../extractor/extractBreakpoints */ "./src/extractor/extractBreakpoints.ts");
/* harmony import */ var _groupByName__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./groupByName */ "./src/utilities/groupByName.ts");
/* harmony import */ var _transformer_styleDictionaryTransformer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../transformer/styleDictionaryTransformer */ "./src/transformer/styleDictionaryTransformer.ts");












const transformer = {
    styleDictionary: _transformer_styleDictionaryTransformer__WEBPACK_IMPORTED_MODULE_11__["default"]
};
const exportRawTokenArray = (figmaData) => {
    // get tokens
    return [
        ...Object(_extractor_extractSizes__WEBPACK_IMPORTED_MODULE_5__["default"])(figmaData.tokenFrames),
        ...Object(_extractor_extractBreakpoints__WEBPACK_IMPORTED_MODULE_9__["default"])(figmaData.tokenFrames),
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
    const groupedTokens = Object(_groupByName__WEBPACK_IMPORTED_MODULE_10__["default"])(formattedTokens, true, nameConversion);
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
const version = '4.0.0';
/* harmony default export */ __webpack_exports__["default"] = (version);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0Qm9yZGVycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RCcmVha3BvaW50cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RDb2xvcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0RWZmZWN0cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RGb250cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RHcmlkcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RNb3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0UmFkaWkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0U2l6ZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0U3BhY2luZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVyL3N0eWxlRGljdGlvbmFyeVRyYW5zZm9ybWVyLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lci91dGlsaXRpZXMvZ2V0RGVzY3JpcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9hY2Nlc3NUb2tlbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2J1aWxkRmlnbWFEYXRhLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvY29uZmlnLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvY29udmVydENvbG9yLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvZGVlcE1lcmdlLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvZXh0cmFjdFRva2VuTm9kZVZhbHVlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2ZpbHRlckJ5TmFtZVByb3BlcnR5LnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvZ2V0RWZmZWN0U3R5bGVzLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvZ2V0RmlsZUlkLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvZ2V0R3JpZFN0eWxlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2dldEpzb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9nZXRQYWludFN0eWxlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2dldFRleHRTdHlsZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9nZXRUb2tlbkpzb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9nZXRUb2tlbk5vZGVzLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvZ2V0VmVyc2lvbkRpZmZlcmVuY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9ncm91cEJ5TmFtZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2lzVG9rZW5Ob2RlLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvcm91bmRXaXRoRGVjaW1hbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9zZW1WZXJEaWZmZXJlbmNlLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvc2V0dGluZ3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9zZXR0aW5nc0RlZmF1bHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy90cmFuc2Zvcm1OYW1lLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvdmVyc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFD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Q0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhFQUE4RTtBQUM5RTtBQUNBO0FBQ0EsS0FBSyxFQUFFO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsS0FBSztBQUNOO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSywrQkFBK0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNlLDJFQUFZLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUN2RDVCO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFD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QSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNuQ0Y7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxlQUFlLE9BQU8sV0FBVyxrQkFBa0IsZ0JBQWdCO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLEdBQUc7QUFDN0I7QUFDQTtBQUNBLHlDQUF5Qyx5QkFBeUIsRUFBRTtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixHQUFHO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZSw0RUFBYSxFQUFDO0FBQ3RCO0FBQ1A7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDNUNBO0FBQUE7QUFDQTtBQUNlLHNFQUFPLEVBQUMiLCJmaWxlIjoicGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgcm91bmRXaXRoRGVjaW1hbHMgZnJvbSAnLi4vdXRpbGl0aWVzL3JvdW5kV2l0aERlY2ltYWxzJztcbmNvbnN0IHN0cm9rZUpvaW5zID0ge1xuICAgIE1JVEVSOiAnbWl0ZXInLFxuICAgIEJFVkVMOiAnYmV2ZWwnLFxuICAgIFJPVU5EOiAncm91bmQnXG59O1xuY29uc3Qgc3Ryb2tlQWxpZ25zID0ge1xuICAgIENFTlRFUjogJ2NlbnRlcicsXG4gICAgSU5TSURFOiAnaW5zaWRlJyxcbiAgICBPVVRTSURFOiAnb3V0c2lkZSdcbn07XG5jb25zdCBleHRyYWN0Qm9yZGVycyA9ICh0b2tlbk5vZGVzKSA9PiB7XG4gICAgY29uc3Qgbm9kZU5hbWUgPSAnYm9yZGVycyc7XG4gICAgLy8gcmV0dXJuIGFzIG9iamVjdFxuICAgIHJldHVybiB0b2tlbk5vZGVzXG4gICAgICAgIC8vIG9ubHkgZ2V0IGJvcmRlciBub2Rlc1xuICAgICAgICAuZmlsdGVyKG5vZGUgPT4gbm9kZS5uYW1lLnN1YnN0cigwLCBub2RlTmFtZS5sZW5ndGgpID09PSBub2RlTmFtZSlcbiAgICAgICAgLy8gcmVtb3ZlIG5vZGVzIHdpdGggbm8gYm9yZGVyIHByb3BlcnR5XG4gICAgICAgIC5maWx0ZXIobm9kZSA9PiBub2RlLnN0cm9rZXMubGVuZ3RoID4gMClcbiAgICAgICAgLy8gY29udmVydCBib3JkZXJzXG4gICAgICAgIC5tYXAobm9kZSA9PiAoe1xuICAgICAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgICAgIGNhdGVnb3J5OiAnYm9yZGVyJyxcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHN0cm9rZUFsaWduOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHN0cm9rZUFsaWduc1tub2RlLnN0cm9rZUFsaWduXSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhc2hQYXR0ZXJuOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG5vZGUuZGFzaFBhdHRlcm4udG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0cm9rZUNhcDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiAoKHR5cGVvZiBub2RlLnN0cm9rZUNhcCA9PT0gJ3N0cmluZycpID8gbm9kZS5zdHJva2VDYXAudG9Mb3dlckNhc2UoKSA6ICdtaXhlZCcpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3Ryb2tlSm9pbjoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBzdHJva2VKb2luc1tub2RlLnN0cm9rZUpvaW5dLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3Ryb2tlTWl0ZXJMaW1pdDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLnN0cm9rZU1pdGVyTGltaXQpLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdkZWdyZWUnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gc3Ryb2tlU3R5bGVJZDoge1xuICAgICAgICAgICAgLy8gICB2YWx1ZTogbm9kZS5zdHJva2VTdHlsZUlkXG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgc3Ryb2tlV2VpZ2h0OiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG5vZGUuc3Ryb2tlV2VpZ2h0LFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdHJva2U6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbm9kZS5zdHJva2VzWzBdLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdjb2xvcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0Qm9yZGVycztcbiIsImltcG9ydCByb3VuZFdpdGhEZWNpbWFscyBmcm9tICcuLi91dGlsaXRpZXMvcm91bmRXaXRoRGVjaW1hbHMnO1xuY29uc3QgZXh0cmFjdEJyZWFrcG9pbnRzID0gKHRva2VuTm9kZXMpID0+IHtcbiAgICBjb25zdCBub2RlTmFtZSA9ICdicmVha3BvaW50cyc7XG4gICAgLy8gcmV0dXJuIGFzIG9iamVjdFxuICAgIHJldHVybiB0b2tlbk5vZGVzLmZpbHRlcihub2RlID0+IG5vZGUubmFtZS5zdWJzdHIoMCwgbm9kZU5hbWUubGVuZ3RoKSA9PT0gbm9kZU5hbWUpLm1hcChub2RlID0+ICh7XG4gICAgICAgIG5hbWU6IG5vZGUubmFtZSxcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgICBjYXRlZ29yeTogJ2JyZWFrcG9pbnQnLFxuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHdpZHRoOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKG5vZGUud2lkdGgsIDIpLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0QnJlYWtwb2ludHM7XG4iLCJpbXBvcnQgeyBjb252ZXJ0UGFpbnRUb1JnYmEsIHJvdW5kUmdiYSB9IGZyb20gJy4uL3V0aWxpdGllcy9jb252ZXJ0Q29sb3InO1xuaW1wb3J0IHJvdW5kV2l0aERlY2ltYWxzIGZyb20gJy4uL3V0aWxpdGllcy9yb3VuZFdpdGhEZWNpbWFscyc7XG5jb25zdCBncmFkaWVudFR5cGUgPSB7XG4gICAgR1JBRElFTlRfTElORUFSOiAnbGluZWFyJyxcbiAgICBHUkFESUVOVF9SQURJQUw6ICdyYWRpYWwnLFxuICAgIEdSQURJRU5UX0FOR1VMQVI6ICdhbmd1bGFyJyxcbiAgICBHUkFESUVOVF9ESUFNT05EOiAnZGlhbW9uZCdcbn07XG5jb25zdCBleHRyYWN0RmlsbHMgPSAocGFpbnQpID0+IHtcbiAgICBpZiAocGFpbnQudHlwZSA9PT0gJ1NPTElEJykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmlsbDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBjb252ZXJ0UGFpbnRUb1JnYmEocGFpbnQpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdjb2xvcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgaWYgKFsnR1JBRElFTlRfTElORUFSJywgJ0dSQURJRU5UX1JBRElBTCcsICdHUkFESUVOVF9BTkdVTEFSJywgJ0dSQURJRU5UX0RJQU1PTkQnXS5pbmNsdWRlcyhwYWludC50eXBlKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ3JhZGllbnRUeXBlOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGdyYWRpZW50VHlwZVtwYWludC50eXBlXSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0b3BzOiBwYWludC5ncmFkaWVudFN0b3BzLm1hcChzdG9wID0+ICh7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKHN0b3AucG9zaXRpb24pLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kUmdiYShzdG9wLmNvbG9yKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2NvbG9yJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIG9wYWNpdHk6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMocGFpbnQub3BhY2l0eSksXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgLy8gcmV0dXJuIG51bGwgaWYgbm8gbWF0Y2hpbmcgdHlwZVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgcmV0dXJuIG51bGw7XG59O1xuY29uc3QgZXh0cmFjdENvbG9ycyA9ICh0b2tlbk5vZGVzKSA9PiB7XG4gICAgLy8gZ2V0IGFsbCBwYWludCBzdHlsZXNcbiAgICByZXR1cm4gdG9rZW5Ob2Rlc1xuICAgICAgICAvLyByZW1vdmUgaW1hZ2VzIGZpbGxzIGZyb20gdG9rZW5zXG4gICAgICAgIC5tYXAobm9kZSA9PiB7XG4gICAgICAgIG5vZGUucGFpbnRzID0gbm9kZS5wYWludHMuZmlsdGVyKHBhaW50ID0+IHBhaW50LnR5cGUgIT09ICdJTUFHRScpO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9KVxuICAgICAgICAvLyByZW1vdmUgdG9rZW5zIHdpdGggbm8gZmlsbFxuICAgICAgICAuZmlsdGVyKG5vZGUgPT4gbm9kZS5wYWludHMubGVuZ3RoID4gMClcbiAgICAgICAgLy8gdHJhbnNmb3JtIHN0eWxlXG4gICAgICAgIC5tYXAobm9kZSA9PiAoe1xuICAgICAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgICAgIC8vIGlkOiBub2RlLmlkLFxuICAgICAgICBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgICBjYXRlZ29yeTogJ2ZpbGwnLFxuICAgICAgICB2YWx1ZXM6IG5vZGUucGFpbnRzLm1hcChwYWludCA9PiBleHRyYWN0RmlsbHMocGFpbnQpKVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0Q29sb3JzO1xuIiwiaW1wb3J0IHsgcm91bmRSZ2JhIH0gZnJvbSAnLi4vdXRpbGl0aWVzL2NvbnZlcnRDb2xvcic7XG5jb25zdCBlZmZlY3RUeXBlID0ge1xuICAgIExBWUVSX0JMVVI6ICdsYXllckJsdXInLFxuICAgIEJBQ0tHUk9VTkRfQkxVUjogJ2JhY2tncm91bmRCbHVyJyxcbiAgICBEUk9QX1NIQURPVzogJ2Ryb3BTaGFkb3cnLFxuICAgIElOTkVSX1NIQURPVzogJ2lubmVyU2hhZG93J1xufTtcbmNvbnN0IGJsdXJWYWx1ZXMgPSAoZWZmZWN0KSA9PiAoe1xuICAgIHR5cGU6IHtcbiAgICAgICAgdmFsdWU6IGVmZmVjdFR5cGVbZWZmZWN0LnR5cGVdLFxuICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgIH0sXG4gICAgcmFkaXVzOiB7XG4gICAgICAgIHZhbHVlOiBlZmZlY3QucmFkaXVzLFxuICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgIH1cbn0pO1xuY29uc3Qgc2hhZG93VmFsdWVzID0gZWZmZWN0ID0+ICh7XG4gICAgdHlwZToge1xuICAgICAgICB2YWx1ZTogZWZmZWN0VHlwZVtlZmZlY3QudHlwZV0sXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgfSxcbiAgICByYWRpdXM6IHtcbiAgICAgICAgdmFsdWU6IGVmZmVjdC5yYWRpdXMsXG4gICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgfSxcbiAgICBjb2xvcjoge1xuICAgICAgICB2YWx1ZTogcm91bmRSZ2JhKGVmZmVjdC5jb2xvciksXG4gICAgICAgIHR5cGU6ICdjb2xvcidcbiAgICB9LFxuICAgIG9mZnNldDoge1xuICAgICAgICB4OiB7XG4gICAgICAgICAgICB2YWx1ZTogZWZmZWN0Lm9mZnNldC54LFxuICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIHk6IHtcbiAgICAgICAgICAgIHZhbHVlOiBlZmZlY3Qub2Zmc2V0LnksXG4gICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfVxuICAgIH0sXG4gICAgc3ByZWFkOiB7XG4gICAgICAgIHZhbHVlOiBlZmZlY3Quc3ByZWFkLFxuICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgIH1cbn0pO1xuY29uc3QgZXh0cmFjdEVmZmVjdHMgPSAodG9rZW5Ob2RlcykgPT4ge1xuICAgIC8vIGdldCBlZmZlY3Qgc3R5bGVzXG4gICAgcmV0dXJuIHRva2VuTm9kZXMubWFwKG5vZGUgPT4gKHtcbiAgICAgICAgbmFtZTogbm9kZS5uYW1lLFxuICAgICAgICBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgICBjYXRlZ29yeTogJ2VmZmVjdCcsXG4gICAgICAgIHZhbHVlczogbm9kZS5lZmZlY3RzLm1hcCgoZWZmZWN0KSA9PiBlZmZlY3QudHlwZSA9PT0gJ0xBWUVSX0JMVVInIHx8IGVmZmVjdC50eXBlID09PSAnQkFDS0dST1VORF9CTFVSJ1xuICAgICAgICAgICAgPyBibHVyVmFsdWVzKGVmZmVjdClcbiAgICAgICAgICAgIDogc2hhZG93VmFsdWVzKGVmZmVjdCkpXG4gICAgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3RFZmZlY3RzO1xuIiwiaW1wb3J0IHJvdW5kV2l0aERlY2ltYWxzIGZyb20gJy4uL3V0aWxpdGllcy9yb3VuZFdpdGhEZWNpbWFscyc7XG5jb25zdCB0ZXh0RGVjb3JhdGlvbnMgPSB7XG4gICAgTk9ORTogJ25vbmUnLFxuICAgIFVOREVSTElORTogJ3VuZGVybGluZScsXG4gICAgU1RSSUtFVEhST1VHSDogJ2xpbmUtdGhyb3VnaCdcbn07XG5jb25zdCB0ZXh0Q2FzZXMgPSB7XG4gICAgT1JJR0lOQUw6ICdub25lJyxcbiAgICBVUFBFUjogJ3VwcGVyY2FzZScsXG4gICAgTE9XRVI6ICdsb3dlcmNhc2UnLFxuICAgIFRJVExFOiAnY2FwaXRhbGl6ZSdcbn07XG5jb25zdCBmb250V2VpZ2h0cyA9IHtcbiAgICB0aGluOiAxMDAsXG4gICAgZXh0cmFsaWdodDogMjAwLFxuICAgIHVsdHJhbGlnaHQ6IDIwMCxcbiAgICBsaWdodDogMzAwLFxuICAgIG5vcm1hbDogNDAwLFxuICAgIHJlZ3VsYXI6IDQwMCxcbiAgICBtZWRpdW06IDUwMCxcbiAgICBzZW1pYm9sZDogNjAwLFxuICAgIGRlbWlib2xkOiA2MDAsXG4gICAgYm9sZDogNzAwLFxuICAgIGV4dHJhYm9sZDogODAwLFxuICAgIHVsdGFib2xkOiA4MDAsXG4gICAgYmxhY2s6IDkwMCxcbiAgICBoZWF2eTogOTAwLFxuICAgIHN1cGVyOiA5MDBcbn07XG5jb25zdCBmb250U3RyZXRjaCA9IHtcbiAgICBub3JtYWw6ICdub3JtYWwnLFxuICAgIGNvbmRlbnNlZDogJ2NvbmRlbnNlZCcsXG4gICAgZXhwYW5kZWQ6ICdleHBhbmRlZCcsXG4gICAgZXh0ZW5kZWQ6ICdleHBhbmRlZCdcbn07XG5jb25zdCBmb250U3R5bGVzID0ge1xuICAgIG5vcm1hbDogJ25vcm1hbCcsXG4gICAgaXRhbGljOiAnaXRhbGljJyxcbiAgICBvYmxpcXVlOiAnb2JsaXF1ZSdcbn07XG5jb25zdCBwYXJzZUZvbnRXZWlnaHQgPSAoZm9udFN0eWxlKSA9PiB7XG4gICAgY29uc3QgcGFydHMgPSBmb250U3R5bGUudG9Mb3dlckNhc2UoKS5zcGxpdCgnICcpO1xuICAgIGxldCB3ZWlnaHQgPSBwYXJ0c1swXTtcbiAgICAvLyBtZXJnZSBpZiBzcGFjZSBhZnRlciBleHRyYVxuICAgIGlmIChbJ2V4dHJhJywgJ3VsdHJhJywgJ3NlbWknLCAnZGVtaSddLmluY2x1ZGVzKHBhcnRzWzBdKSAmJiBbJ2JvbGQnLCAnbGlnaHQnXS5pbmNsdWRlcyhwYXJ0c1sxXSkpIHtcbiAgICAgICAgd2VpZ2h0ID0gYCR7cGFydHNbMF19JHtwYXJ0c1sxXX1gO1xuICAgIH1cbiAgICByZXR1cm4gZm9udFdlaWdodHNbd2VpZ2h0XSB8fCA0MDA7XG59O1xuY29uc3QgcGFyc2VGb250U3RyZXRjaCA9IChmb250U3R5bGUpID0+IHtcbiAgICBjb25zdCBwYXJ0cyA9IGZvbnRTdHlsZS50b0xvd2VyQ2FzZSgpLnNwbGl0KCcgJyk7XG4gICAgcmV0dXJuIGZvbnRTdHJldGNoW3BhcnRzW3BhcnRzLmxlbmd0aCAtIDFdXSB8fCBmb250U3RyZXRjaFtwYXJ0c1twYXJ0cy5sZW5ndGggLSAyXV0gfHwgJ25vcm1hbCc7XG59O1xuY29uc3QgcGFyc2VGb250U3R5bGUgPSAoZm9udFN0eWxlKSA9PiB7XG4gICAgY29uc3QgcGFydCA9IGZvbnRTdHlsZS50b0xvd2VyQ2FzZSgpLnNwbGl0KCcgJykucG9wKCk7XG4gICAgcmV0dXJuIGZvbnRTdHlsZXNbcGFydF0gfHwgJ25vcm1hbCc7XG59O1xuY29uc3QgZXh0cmFjdEZvbnRzID0gKHRva2VuTm9kZXMpID0+IHtcbiAgICAvLyBnZXQgcmF3IHRleHQgc3R5bGVzXG4gICAgcmV0dXJuIHRva2VuTm9kZXMubWFwKG5vZGUgPT4gKHtcbiAgICAgICAgbmFtZTogbm9kZS5uYW1lLFxuICAgICAgICBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB8fCB1bmRlZmluZWQsXG4gICAgICAgIGNhdGVnb3J5OiAnZm9udCcsXG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgZm9udFNpemU6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbm9kZS5mb250U2l6ZSxcbiAgICAgICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGV4dERlY29yYXRpb246IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGV4dERlY29yYXRpb25zW25vZGUudGV4dERlY29yYXRpb25dLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9udEZhbWlseToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLmZvbnROYW1lLmZhbWlseSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcGFyc2VGb250V2VpZ2h0KG5vZGUuZm9udE5hbWUuc3R5bGUpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9udFN0eWxlOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHBhcnNlRm9udFN0eWxlKG5vZGUuZm9udE5hbWUuc3R5bGUpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9udFN0cmV0Y2g6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcGFyc2VGb250U3RyZXRjaChub2RlLmZvbnROYW1lLnN0eWxlKSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9mb250U3R5bGVPbGQ6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbm9kZS5mb250TmFtZS5zdHlsZSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMobm9kZS5sZXR0ZXJTcGFjaW5nLnZhbHVlKSxcbiAgICAgICAgICAgICAgICB1bml0OiBub2RlLmxldHRlclNwYWNpbmcudW5pdC50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGluZUhlaWdodDoge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMobm9kZS5saW5lSGVpZ2h0LnZhbHVlKSB8fCAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgICB1bml0OiBub2RlLmxpbmVIZWlnaHQudW5pdC50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgICAgIHR5cGU6IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobm9kZS5saW5lSGVpZ2h0LCAndmFsdWUnKSA/ICdudW1iZXInIDogJ3N0cmluZycpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGFyYWdyYXBoSW5kZW50OiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG5vZGUucGFyYWdyYXBoSW5kZW50LFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXJhZ3JhcGhTcGFjaW5nOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG5vZGUucGFyYWdyYXBoU3BhY2luZyxcbiAgICAgICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGV4dENhc2U6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGV4dENhc2VzW25vZGUudGV4dENhc2VdLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZXh0cmFjdEZvbnRzO1xuIiwiY29uc3QgZ3JpZFZhbHVlcyA9IChncmlkKSA9PiAoe1xuICAgIHBhdHRlcm46IHtcbiAgICAgICAgdmFsdWU6IGdyaWQucGF0dGVybi50b0xvd2VyQ2FzZSgpLFxuICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgIH0sXG4gICAgc2VjdGlvblNpemU6IHtcbiAgICAgICAgdmFsdWU6IGdyaWQuc2VjdGlvblNpemUsXG4gICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgfVxufSk7XG5jb25zdCBnZXRDb3VudCA9IGNvdW50ID0+IHtcbiAgICBpZiAoY291bnQgPT09IEluZmluaXR5KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogJ2F1dG8nLFxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IGNvdW50LFxuICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgIH07XG59O1xuY29uc3Qgcm93Q29sdW1uVmFsdWVzID0gKGdyaWQpID0+IChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7IHBhdHRlcm46IHtcbiAgICAgICAgdmFsdWU6IGdyaWQucGF0dGVybi50b0xvd2VyQ2FzZSgpLFxuICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgIH0gfSwgKGdyaWQuc2VjdGlvblNpemUgIT09IHVuZGVmaW5lZCAmJiB7XG4gICAgc2VjdGlvblNpemU6IHtcbiAgICAgICAgdmFsdWU6IGdyaWQuc2VjdGlvblNpemUsXG4gICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgfVxufSkpLCB7IGd1dHRlclNpemU6IHtcbiAgICAgICAgdmFsdWU6IGdyaWQuZ3V0dGVyU2l6ZSxcbiAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICB9LCBhbGlnbm1lbnQ6IHtcbiAgICAgICAgdmFsdWU6IGdyaWQuYWxpZ25tZW50LnRvTG93ZXJDYXNlKCksXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgfSwgY291bnQ6IGdldENvdW50KGdyaWQuY291bnQpIH0pLCAoZ3JpZC5vZmZzZXQgIT09IHVuZGVmaW5lZCAmJiB7XG4gICAgb2Zmc2V0OiB7XG4gICAgICAgIHZhbHVlOiBncmlkLm9mZnNldCxcbiAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICB9XG59KSkpO1xuY29uc3QgZXh0cmFjdEdyaWRzID0gKHRva2VuTm9kZXMpID0+IHtcbiAgICAvLyBnZXQgZ3JpZCBzdHlsZXNcbiAgICByZXR1cm4gdG9rZW5Ob2Rlcy5tYXAobm9kZSA9PiAoe1xuICAgICAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBub2RlLmRlc2NyaXB0aW9uIHx8IG51bGwsXG4gICAgICAgIGNhdGVnb3J5OiAnZ3JpZCcsXG4gICAgICAgIHZhbHVlczogbm9kZS5sYXlvdXRHcmlkcy5tYXAoKGdyaWQpID0+IGdyaWQucGF0dGVybiA9PT0gJ0dSSUQnID8gZ3JpZFZhbHVlcyhncmlkKSA6IHJvd0NvbHVtblZhbHVlcyhncmlkKSlcbiAgICB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZXh0cmFjdEdyaWRzO1xuIiwiY29uc3QgZGlyZWN0aW9uID0gKHRyYW5zaXRpb24pID0+IHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRyYW5zaXRpb24sICdkaXJlY3Rpb24nKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlyZWN0aW9uOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHRyYW5zaXRpb24uZGlyZWN0aW9uLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59O1xuY29uc3QgZWFzaW5ncyA9IHtcbiAgICBDVVNUT01fQ1VCSUNfQkVaSUVSOiB7fSxcbiAgICBMSU5FQVI6IHtcbiAgICAgICAgdHlwZTogJ2xpbmVhcicsXG4gICAgICAgIGVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXI6IHtcbiAgICAgICAgICAgIHgxOiAwLFxuICAgICAgICAgICAgeTE6IDAsXG4gICAgICAgICAgICB4MjogMSxcbiAgICAgICAgICAgIHkyOiAxXG4gICAgICAgIH1cbiAgICB9LFxuICAgIEVBU0VfSU46IHtcbiAgICAgICAgdHlwZTogJ2Vhc2UtaW4nLFxuICAgICAgICBlYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyOiB7XG4gICAgICAgICAgICB4MTogMC40MTk5OTk5ODY4ODY5NzgxNSxcbiAgICAgICAgICAgIHkxOiAwLFxuICAgICAgICAgICAgeDI6IDEsXG4gICAgICAgICAgICB5MjogMVxuICAgICAgICB9XG4gICAgfSxcbiAgICBFQVNFX09VVDoge1xuICAgICAgICB0eXBlOiAnZWFzZS1vdXQnLFxuICAgICAgICBlYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyOiB7XG4gICAgICAgICAgICB4MTogMCxcbiAgICAgICAgICAgIHkxOiAwLFxuICAgICAgICAgICAgeDI6IDAuNTc5OTk5OTgzMzEwNjk5NSxcbiAgICAgICAgICAgIHkyOiAxXG4gICAgICAgIH1cbiAgICB9LFxuICAgIEVBU0VfSU5fQU5EX09VVDoge1xuICAgICAgICB0eXBlOiAnZWFzZS1pbi1vdXQnLFxuICAgICAgICBlYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyOiB7XG4gICAgICAgICAgICB4MTogMC40MTk5OTk5ODY4ODY5NzgxNSxcbiAgICAgICAgICAgIHkxOiAwLFxuICAgICAgICAgICAgeDI6IDAuNTc5OTk5OTgzMzEwNjk5NSxcbiAgICAgICAgICAgIHkyOiAxXG4gICAgICAgIH1cbiAgICB9LFxuICAgIEVBU0VfSU5fQkFDSzoge1xuICAgICAgICB0eXBlOiAnZWFzZS1pbi1iYWNrJyxcbiAgICAgICAgZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllcjoge1xuICAgICAgICAgICAgeDE6IDAuMzAwMDAwMDExOTIwOTI4OTYsXG4gICAgICAgICAgICB5MTogLTAuMDUwMDAwMDAwNzQ1MDU4MDYsXG4gICAgICAgICAgICB4MjogMC42OTk5OTk5ODgwNzkwNzEsXG4gICAgICAgICAgICB5MjogLTAuNVxuICAgICAgICB9XG4gICAgfSxcbiAgICBFQVNFX09VVF9CQUNLOiB7XG4gICAgICAgIHR5cGU6ICdlYXNlLW91dC1iYWNrJyxcbiAgICAgICAgZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllcjoge1xuICAgICAgICAgICAgeDE6IDAuNDQ5OTk5OTg4MDc5MDcxMDQsXG4gICAgICAgICAgICB5MTogMS40NTAwMDAwNDc2ODM3MTU4LFxuICAgICAgICAgICAgeDI6IDAuODAwMDAwMDExOTIwOTI5LFxuICAgICAgICAgICAgeTI6IDFcbiAgICAgICAgfVxuICAgIH0sXG4gICAgRUFTRV9JTl9BTkRfT1VUX0JBQ0s6IHtcbiAgICAgICAgdHlwZTogJ2Vhc2UtaW4tb3V0LWJhY2snLFxuICAgICAgICBlYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyOiB7XG4gICAgICAgICAgICB4MTogMC42OTk5OTk5ODgwNzkwNzEsXG4gICAgICAgICAgICB5MTogLTAuNDAwMDAwMDA1OTYwNDY0NSxcbiAgICAgICAgICAgIHgyOiAwLjQwMDAwMDAwNTk2MDQ2NDUsXG4gICAgICAgICAgICB5MjogMS4zOTk5OTk5NzYxNTgxNDJcbiAgICAgICAgfVxuICAgIH1cbn07XG5jb25zdCBlYXNpbmcgPSAoZWFzaW5nKSA9PiB7XG4gICAgLy8gYWJvcnQgaWYgaW52YWxpZiBlYXNpbmcgdHlwZVxuICAgIGlmICghT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwoZWFzaW5ncywgZWFzaW5nLnR5cGUpKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIC8vIHJldHVybiBjdXN0b20gZWFzaW5nXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGlmIChlYXNpbmcudHlwZSA9PT0gJ0NVU1RPTV9DVUJJQ19CRVpJRVInKSB7XG4gICAgICAgIGVhc2luZ3MuQ1VTVE9NX0NVQklDX0JFWklFUiA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdjdWJpYy1iZXppZXInLFxuICAgICAgICAgICAgZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllcjoge1xuICAgICAgICAgICAgICAgIHgxOiBlYXNpbmcuZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllci54MSxcbiAgICAgICAgICAgICAgICB5MTogZWFzaW5nLmVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXIueTEsXG4gICAgICAgICAgICAgICAgeDI6IGVhc2luZy5lYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyLngyLFxuICAgICAgICAgICAgICAgIHkyOiBlYXNpbmcuZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllci55MlxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBlYXNpbmc6IHtcbiAgICAgICAgICAgIHZhbHVlOiBlYXNpbmdzW2Vhc2luZy50eXBlXS50eXBlLFxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgZWFzaW5nRnVuY3Rpb246IHtcbiAgICAgICAgICAgIHgxOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGVhc2luZ3NbZWFzaW5nLnR5cGVdLmVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXIueDEsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB4Mjoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBlYXNpbmdzW2Vhc2luZy50eXBlXS5lYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyLngyLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeTE6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogZWFzaW5nc1tlYXNpbmcudHlwZV0uZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllci55MSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHkyOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGVhc2luZ3NbZWFzaW5nLnR5cGVdLmVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXIueTIsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59O1xuY29uc3QgZXh0cmFjdE1vdGlvbiA9ICh0b2tlbk5vZGVzKSA9PiB7XG4gICAgY29uc3Qgbm9kZU5hbWUgPSAnbW90aW9uJztcbiAgICAvLyByZXR1cm4gYXMgb2JqZWN0XG4gICAgcmV0dXJuIHRva2VuTm9kZXNcbiAgICAgICAgLy8gb25seSBnZXQgbW90aW9uIG5vZGVzXG4gICAgICAgIC5maWx0ZXIobm9kZSA9PiBub2RlLm5hbWUuc3Vic3RyKDAsIG5vZGVOYW1lLmxlbmd0aCkgPT09IG5vZGVOYW1lKVxuICAgICAgICAvLyBmaWx0ZXIgdG8gb25seSBpbmNsdWRlIGl0ZW1zIHdoaWNoIGhhdmUgYSB0cmFuc2l0aW9uIHByb3BlcnR5XG4gICAgICAgIC5maWx0ZXIobm9kZSA9PiB7XG4gICAgICAgIGlmIChub2RlLnJlYWN0aW9ucy5sZW5ndGggPiAwICYmIG5vZGUucmVhY3Rpb25zWzBdLmFjdGlvbi50eXBlID09PSAnTk9ERScgJiYgbm9kZS5yZWFjdGlvbnNbMF0uYWN0aW9uLnRyYW5zaXRpb24gIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KVxuICAgICAgICAvLyByZXRyaWV2ZSB2YWx1ZXNcbiAgICAgICAgLm1hcCgobm9kZSkgPT4gKHtcbiAgICAgICAgbmFtZTogbm9kZS5uYW1lLFxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGRlc2NyaXB0aW9uOiBub2RlLmRlc2NyaXB0aW9uIHx8IG51bGwsXG4gICAgICAgIGNhdGVnb3J5OiAnbW90aW9uJyxcbiAgICAgICAgdmFsdWVzOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oeyB0eXBlOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG5vZGUucmVhY3Rpb25zWzBdLmFjdGlvbi50cmFuc2l0aW9uLnR5cGUudG9Mb2NhbGVMb3dlckNhc2UoKSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfSwgZHVyYXRpb246IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogTWF0aC5yb3VuZCgobm9kZS5yZWFjdGlvbnNbMF0uYWN0aW9uLnRyYW5zaXRpb24uZHVyYXRpb24gKyBOdW1iZXIuRVBTSUxPTikgKiAxMDAwKSAvIDEwMDAsXG4gICAgICAgICAgICAgICAgdW5pdDogJ3MnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9IH0sIGVhc2luZyhub2RlLnJlYWN0aW9uc1swXS5hY3Rpb24udHJhbnNpdGlvbi5lYXNpbmcpKSwgZGlyZWN0aW9uKG5vZGUucmVhY3Rpb25zWzBdLmFjdGlvbi50cmFuc2l0aW9uKSlcbiAgICB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZXh0cmFjdE1vdGlvbjtcbmV4cG9ydCBjb25zdCBfX3Rlc3RpbmcgPSB7XG4gICAgZWFzaW5nOiBlYXNpbmdcbn07XG4iLCJpbXBvcnQgcm91bmRXaXRoRGVjaW1hbHMgZnJvbSAnLi4vdXRpbGl0aWVzL3JvdW5kV2l0aERlY2ltYWxzJztcbmNvbnN0IGV4dHJhY3RSYWRpaSA9ICh0b2tlbk5vZGVzKSA9PiB7XG4gICAgY29uc3Qgbm9kZU5hbWUgPSAncmFkaWknO1xuICAgIC8vIGdldCB0aGUgdHlwZSBvZiB0aGUgY29ybmVyIHJhZGl1c1xuICAgIGNvbnN0IGdldFJhZGl1c1R5cGUgPSByYWRpdXMgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHJhZGl1cyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiAnc2luZ2xlJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ21peGVkJztcbiAgICB9O1xuICAgIC8vIGdldCB0aGUgaW5kaXZpZHVhbCByYWRpaVxuICAgIGNvbnN0IGdldFJhZGlpID0gKG5vZGUpID0+ICh7XG4gICAgICAgIHRvcExlZnQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiBub2RlLnRvcExlZnRSYWRpdXMgfHwgMCxcbiAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICB0b3BSaWdodDoge1xuICAgICAgICAgICAgdmFsdWU6IG5vZGUudG9wUmlnaHRSYWRpdXMgfHwgMCxcbiAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBib3R0b21SaWdodDoge1xuICAgICAgICAgICAgdmFsdWU6IG5vZGUuYm90dG9tUmlnaHRSYWRpdXMgfHwgMCxcbiAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBib3R0b21MZWZ0OiB7XG4gICAgICAgICAgICB2YWx1ZTogbm9kZS5ib3R0b21MZWZ0UmFkaXVzIHx8IDAsXG4gICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIHJldHVybiBhcyBvYmplY3RcbiAgICByZXR1cm4gdG9rZW5Ob2Rlcy5maWx0ZXIobm9kZSA9PiBub2RlLm5hbWUuc3Vic3RyKDAsIG5vZGVOYW1lLmxlbmd0aCkgPT09IG5vZGVOYW1lKS5tYXAobm9kZSA9PiAoe1xuICAgICAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgZGVzY3JpcHRpb246IG5vZGUuZGVzY3JpcHRpb24gfHwgbnVsbCxcbiAgICAgICAgY2F0ZWdvcnk6ICdyYWRpdXMnLFxuICAgICAgICB2YWx1ZXM6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgKHR5cGVvZiBub2RlLmNvcm5lclJhZGl1cyA9PT0gJ251bWJlcicgJiYge1xuICAgICAgICAgICAgcmFkaXVzOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG5vZGUuY29ybmVyUmFkaXVzLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpLCB7IHJhZGl1c1R5cGU6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogZ2V0UmFkaXVzVHlwZShub2RlLmNvcm5lclJhZGl1cyksXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH0sIHJhZGlpOiBnZXRSYWRpaShub2RlKSwgc21vb3RoaW5nOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKG5vZGUuY29ybmVyU21vb3RoaW5nLCAyKSxcbiAgICAgICAgICAgICAgICBjb21tZW50OiAnUGVyY2VudCBhcyBkZWNpbWFsIGZyb20gMC4wIC0gMS4wJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSB9KVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0UmFkaWk7XG4iLCJpbXBvcnQgcm91bmRXaXRoRGVjaW1hbHMgZnJvbSAnLi4vdXRpbGl0aWVzL3JvdW5kV2l0aERlY2ltYWxzJztcbmNvbnN0IGV4dHJhY3RTaXplcyA9ICh0b2tlbk5vZGVzKSA9PiB7XG4gICAgY29uc3Qgbm9kZU5hbWUgPSAnc2l6ZXMnO1xuICAgIC8vIHJldHVybiBhcyBvYmplY3RcbiAgICByZXR1cm4gdG9rZW5Ob2Rlcy5maWx0ZXIobm9kZSA9PiBub2RlLm5hbWUuc3Vic3RyKDAsIG5vZGVOYW1lLmxlbmd0aCkgPT09IG5vZGVOYW1lKS5tYXAobm9kZSA9PiAoe1xuICAgICAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgZGVzY3JpcHRpb246IG5vZGUuZGVzY3JpcHRpb24gfHwgbnVsbCxcbiAgICAgICAgY2F0ZWdvcnk6ICdzaXplJyxcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICB3aWR0aDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLndpZHRoLCAyKSxcbiAgICAgICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVpZ2h0OiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKG5vZGUuaGVpZ2h0LCAyKSxcbiAgICAgICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZXh0cmFjdFNpemVzO1xuIiwiaW1wb3J0IHJvdW5kV2l0aERlY2ltYWxzIGZyb20gJy4uL3V0aWxpdGllcy9yb3VuZFdpdGhEZWNpbWFscyc7XG5jb25zdCBleHRyYWN0U3BhY2luZyA9ICh0b2tlbk5vZGVzKSA9PiB7XG4gICAgY29uc3Qgbm9kZU5hbWUgPSAnc3BhY2luZyc7XG4gICAgLy8gcmV0dXJuIGFzIG9iamVjdFxuICAgIHJldHVybiB0b2tlbk5vZGVzLmZpbHRlcihub2RlID0+IG5vZGUubmFtZS5zdWJzdHIoMCwgbm9kZU5hbWUubGVuZ3RoKSA9PT0gbm9kZU5hbWUpXG4gICAgICAgIC5tYXAobm9kZSA9PiAoe1xuICAgICAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgZGVzY3JpcHRpb246IG5vZGUuZGVzY3JpcHRpb24gfHwgbnVsbCxcbiAgICAgICAgY2F0ZWdvcnk6ICdzcGFjaW5nJyxcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICB0b3A6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMobm9kZS5wYWRkaW5nVG9wLCAyKSxcbiAgICAgICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmlnaHQ6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMobm9kZS5wYWRkaW5nUmlnaHQsIDIpLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib3R0b206IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMobm9kZS5wYWRkaW5nQm90dG9tLCAyKSxcbiAgICAgICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVmdDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLnBhZGRpbmdMZWZ0LCAyKSxcbiAgICAgICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZXh0cmFjdFNwYWNpbmc7XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IGdldFNldHRpbmdzLCBzZXRTZXR0aW5ncyB9IGZyb20gJy4vdXRpbGl0aWVzL3NldHRpbmdzJztcbmltcG9ydCB7IGdldEFjY2Vzc1Rva2VuLCBzZXRBY2Nlc3NUb2tlbiB9IGZyb20gJy4vdXRpbGl0aWVzL2FjY2Vzc1Rva2VuJztcbmltcG9ydCBnZXRKc29uIGZyb20gJy4vdXRpbGl0aWVzL2dldEpzb24nO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuL3V0aWxpdGllcy9jb25maWcnO1xuaW1wb3J0IGdldFZlcnNpb25EaWZmZXJlbmNlIGZyb20gJy4vdXRpbGl0aWVzL2dldFZlcnNpb25EaWZmZXJlbmNlJztcbmltcG9ydCBnZXRGaWxlSWQgZnJvbSAnLi91dGlsaXRpZXMvZ2V0RmlsZUlkJztcbi8vIGluaXRpYXRlIFVJXG5maWdtYS5zaG93VUkoX19odG1sX18sIHtcbiAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICB3aWR0aDogY29uZmlnLnNldHRpbmdzRGlhbG9nLndpZHRoLFxuICAgIGhlaWdodDogY29uZmlnLnNldHRpbmdzRGlhbG9nLmhlaWdodFxufSk7XG4vLyBHZXQgdGhlIHVzZXIgc2V0dGluZ3NcbmNvbnN0IHVzZXJTZXR0aW5ncyA9IGdldFNldHRpbmdzKCk7XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEVYUE9SVCBUTyBGSUxFXG4vLyBleHBvcnRzIHRoZSBkZXNpZ24gdG9rZW5zIHRvIGEgZmlsZVxuaWYgKGZpZ21hLmNvbW1hbmQgPT09ICdleHBvcnQnKSB7XG4gICAgLy8gd3JpdGUgdG9rZW5zIHRvIGpzb24gZmlsZVxuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgY29tbWFuZDogJ2V4cG9ydCcsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGZpbGVuYW1lOiBgJHt1c2VyU2V0dGluZ3MuZmlsZW5hbWV9Lmpzb25gLFxuICAgICAgICAgICAgZGF0YTogZ2V0SnNvbihmaWdtYSwgdXNlclNldHRpbmdzKVxuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyBTRU5EIFRPIFVSTFxuLy8gc2VuZCB0b2tlbnMgdG8gdXJsXG5pZiAoZmlnbWEuY29tbWFuZCA9PT0gJ3VybEV4cG9ydCcpIHtcbiAgICAvLyBuZWVkZWQgZm9yIGdldEFjY2Vzc1Rva2VuIGFzeW5jXG4gICAgY29uc3QgdXJsRXhwb3J0ID0gKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIGNvbW1hbmQ6ICd1cmxFeHBvcnQnLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHVybDogdXNlclNldHRpbmdzLnNlcnZlclVybCxcbiAgICAgICAgICAgICAgICBhY2Nlc3NUb2tlbjogeWllbGQgZ2V0QWNjZXNzVG9rZW4oZ2V0RmlsZUlkKGZpZ21hKSksXG4gICAgICAgICAgICAgICAgYWNjZXB0SGVhZGVyOiB1c2VyU2V0dGluZ3MuYWNjZXB0SGVhZGVyLFxuICAgICAgICAgICAgICAgIGF1dGhUeXBlOiB1c2VyU2V0dGluZ3MuYXV0aFR5cGUsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBldmVudF90eXBlOiB1c2VyU2V0dGluZ3MuZXZlbnRUeXBlLFxuICAgICAgICAgICAgICAgICAgICBjbGllbnRfcGF5bG9hZDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW5GaWxlTmFtZTogYCR7dXNlclNldHRpbmdzLmZpbGVuYW1lfS5qc29uYCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuczogYCR7Z2V0SnNvbihmaWdtYSwgdXNlclNldHRpbmdzLCB0cnVlKX1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZW5hbWU6IGZpZ21hLnJvb3QubmFtZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBydW4gZXhwb3J0IHVybCBmdW5jdGlvblxuICAgIHVybEV4cG9ydCgpO1xufVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBTRVRUSU5HU1xuLy8gc2V0dGluZ3MgZm9yIHRoZSBkZXNpZ24gdG9rZW5zXG5pZiAoZmlnbWEuY29tbWFuZCA9PT0gJ3NldHRpbmdzJykge1xuICAgIC8vIHdyYXAgaW4gZnVuY3Rpb24gYmVjYXVzZSBvZiBhc3luYyBjbGllbnQgU3RvcmFnZVxuICAgIGNvbnN0IG9wZW5VaSA9ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnQgdmVyc2lvbiBkaWZmZXJlbmNlcyB0byB0aGUgbGFzdCB0aW1lIHRoZSBwbHVnaW4gd2FzIG9wZW5lZFxuICAgICAgICBjb25zdCB2ZXJzaW9uRGlmZmVyZW5jZSA9IHlpZWxkIGdldFZlcnNpb25EaWZmZXJlbmNlKGZpZ21hKTtcbiAgICAgICAgLy8gcmVzaXplIFVJIGlmIG5lZWRlZFxuICAgICAgICBpZiAodmVyc2lvbkRpZmZlcmVuY2UgIT09IHVuZGVmaW5lZCAmJiB2ZXJzaW9uRGlmZmVyZW5jZSAhPT0gJ3BhdGNoJykge1xuICAgICAgICAgICAgZmlnbWEudWkucmVzaXplKGNvbmZpZy5zZXR0aW5nc0RpYWxvZy53aWR0aCwgY29uZmlnLnNldHRpbmdzRGlhbG9nLmhlaWdodCArIDYwKTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZWdpc3RlciB0aGUgc2V0dGluZ3MgVUlcbiAgICAgICAgZmlnbWEudWkuc2hvdygpO1xuICAgICAgICAvLyBzZW50IHNldHRpbmdzIHRvIFVJXG4gICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIGNvbW1hbmQ6ICdnZXRTZXR0aW5ncycsXG4gICAgICAgICAgICBzZXR0aW5nczogdXNlclNldHRpbmdzLFxuICAgICAgICAgICAgYWNjZXNzVG9rZW46IHlpZWxkIGdldEFjY2Vzc1Rva2VuKGdldEZpbGVJZChmaWdtYSkpLFxuICAgICAgICAgICAgdmVyc2lvbkRpZmZlcmVuY2U6IHZlcnNpb25EaWZmZXJlbmNlXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGZpZ21hLnVpLnNob3coKTtcbiAgICB9KTtcbiAgICAvLyBydW4gZnVuY3Rpb25cbiAgICBvcGVuVWkoKTtcbn1cbi8qKlxuICogT3BlbiBIZWxwXG4gKiBPcGVuIGdpdGh1YiBoZWxwIHBhZ2VcbiAqL1xuaWYgKGZpZ21hLmNvbW1hbmQgPT09ICdoZWxwJykge1xuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgY29tbWFuZDogJ2hlbHAnXG4gICAgfSk7XG59XG4vKipcbiAqIFJlYWN0IHRvIG1lc3NhZ2VzXG4gKi9cbmZpZ21hLnVpLm9ubWVzc2FnZSA9IChtZXNzYWdlKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAvKipcbiAgICAgKiBvbiBjbG9zZVBsdWdpblxuICAgICAqIGNsb3NlIHBsdWdpbiBhbmQgc2hvdyBub3RpZmljYXRpb24gaWYgYXZhaWxhYmxlXG4gICAgICovXG4gICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ2Nsb3NlUGx1Z2luJykge1xuICAgICAgICAvLyBzaG93IG5vdGlmaWNhdGlvbiBpZiBzZW5kXG4gICAgICAgIGlmIChtZXNzYWdlLm5vdGlmaWNhdGlvbiAhPT0gdW5kZWZpbmVkICYmIG1lc3NhZ2Uubm90aWZpY2F0aW9uICE9PSAnJykge1xuICAgICAgICAgICAgZmlnbWEubm90aWZ5KG1lc3NhZ2Uubm90aWZpY2F0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjbG9zZSBwbHVnaW5cbiAgICAgICAgZmlnbWEudWkuaGlkZSgpO1xuICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBvbiBzYXZlU2V0dGluZ3NcbiAgICAgKiBzYXZlIHNldHRpbmdzLCBhY2Nlc3MgdG9rZW4gYW5kIGNsb3NlIHBsdWdpblxuICAgICAqL1xuICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdzYXZlU2V0dGluZ3MnKSB7XG4gICAgICAgIC8vIHN0b3JlIHNldHRpbmdzXG4gICAgICAgIHNldFNldHRpbmdzKG1lc3NhZ2Uuc2V0dGluZ3MpO1xuICAgICAgICAvLyBhY2Nlc3NUb2tlblxuICAgICAgICB5aWVsZCBzZXRBY2Nlc3NUb2tlbihnZXRGaWxlSWQoZmlnbWEpLCBtZXNzYWdlLmFjY2Vzc1Rva2VuKTtcbiAgICAgICAgLy8gY2xvc2UgcGx1Z2luXG4gICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gICAgfVxufSk7XG4iLCJpbXBvcnQgeyBjb252ZXJ0UmdiYU9iamVjdFRvU3RyaW5nIH0gZnJvbSAnLi4vdXRpbGl0aWVzL2NvbnZlcnRDb2xvcic7XG5pbXBvcnQgZ2V0RGVzY3JpcHRpb24gZnJvbSAnLi91dGlsaXRpZXMvZ2V0RGVzY3JpcHRpb24nO1xuY29uc3QgZGVmYXVsdFRyYW5zZm9ybWVyID0gcHJvcGVydHlHcm91cFZhbHVlcyA9PiB7XG4gICAgLy8gdHVybiBhcnJheSB3aXRoIG9ubHkgb25lIGl0ZW0gaW50byBub3JtYWwgb2JqZWN0XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcGVydHlHcm91cFZhbHVlcykgJiYgcHJvcGVydHlHcm91cFZhbHVlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcHJvcGVydHlHcm91cFZhbHVlcyA9IHByb3BlcnR5R3JvdXBWYWx1ZXNbMF07XG4gICAgfVxuICAgIC8vIGRlZmluZSBvYmplY3RcbiAgICBjb25zdCB0cmFuc2Zvcm1lZFByb3BlcnRpZXMgPSB7fTtcbiAgICAvLyB0cmFuc2Zvcm0gcHJvZXBydGllc1xuICAgIE9iamVjdC5rZXlzKHByb3BlcnR5R3JvdXBWYWx1ZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAvLyBpZiB0aGlzIGlzIHRoZSBmaW5hbCBsZXZlbFxuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3BlcnR5R3JvdXBWYWx1ZXNba2V5XSwgJ3ZhbHVlJykpIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybWVkUHJvcGVydGllc1trZXldID0gc3R5bGVEaWN0aW9uYXJ5Rm9ybWF0KHByb3BlcnR5R3JvdXBWYWx1ZXNba2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgbW9yZSBuZXN0aW5nXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJhbnNmb3JtZWRQcm9wZXJ0aWVzW2tleV0gPSBkZWZhdWx0VHJhbnNmb3JtZXIocHJvcGVydHlHcm91cFZhbHVlc1trZXldKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIGlmIG9ubHkgb25lIHByb3BlcnR5IGlzIGluIG9iamVjdCAoZS5nLiBvbmx5IGZpbGwgZm9yIGNvbG9yKVxuICAgIC8vIHJldHVybiB0ZWggdmFsdWUgb2YgdGhpcyBwcm9wZXJ0eSBkaXJlY3RseSAoZS5nLiBjb2xvci1ibHVlOiAjMDAwMEFBIGluc3RlYWQgb2YgY29sb3ItYmx1ZS1maWxsOiAjMDAwMEFBKVxuICAgIGlmIChPYmplY3Qua2V5cyh0cmFuc2Zvcm1lZFByb3BlcnRpZXMpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyh0cmFuc2Zvcm1lZFByb3BlcnRpZXMpWzBdO1xuICAgIH1cbiAgICAvLyByZXR1cm4gdHJhbnNmb3JtZWQgcHJvcGVydGllc1xuICAgIHJldHVybiB0cmFuc2Zvcm1lZFByb3BlcnRpZXM7XG59O1xuY29uc3Qgc2l6ZVRyYW5zZm9ybWVyID0gcHJvcGVydHlHcm91cFZhbHVlcyA9PiB7XG4gICAgcmV0dXJuIHN0eWxlRGljdGlvbmFyeUZvcm1hdChwcm9wZXJ0eUdyb3VwVmFsdWVzLndpZHRoKTtcbn07XG5jb25zdCBjYXRlZ29yeVRyYW5zZm9ybWVyID0ge1xuICAgIGRlZmF1bHQ6IGRlZmF1bHRUcmFuc2Zvcm1lcixcbiAgICBmb250OiBkZWZhdWx0VHJhbnNmb3JtZXIsXG4gICAgYm9yZGVyOiBkZWZhdWx0VHJhbnNmb3JtZXIsXG4gICAgc2l6ZTogc2l6ZVRyYW5zZm9ybWVyLFxuICAgIGdyaWQ6IGRlZmF1bHRUcmFuc2Zvcm1lcixcbiAgICBlZmZlY3Q6IGRlZmF1bHRUcmFuc2Zvcm1lcixcbiAgICByYWRpdXM6IGRlZmF1bHRUcmFuc2Zvcm1lcixcbiAgICBmaWxsOiBkZWZhdWx0VHJhbnNmb3JtZXJcbn07XG5jb25zdCBzdHlsZURpY3Rpb25hcnlDb252ZXJ0VmFsdWUgPSAodmFsdWUsIHR5cGUpID0+IHtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAnY29sb3InKSB7XG4gICAgICAgIHJldHVybiBjb252ZXJ0UmdiYU9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufTtcbmNvbnN0IHN0eWxlRGljdGlvbmFyeUZvcm1hdCA9IChwcm9wZXJ0eSkgPT4gKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7IHZhbHVlOiBzdHlsZURpY3Rpb25hcnlDb252ZXJ0VmFsdWUocHJvcGVydHkudmFsdWUsIHByb3BlcnR5LnR5cGUpLCB0eXBlOiBwcm9wZXJ0eS50eXBlIH0sIChwcm9wZXJ0eS5kZXNjcmlwdGlvbiAhPT0gdW5kZWZpbmVkICYmIHsgY29tbWVudDogcHJvcGVydHkuZGVzY3JpcHRpb24gfSkpLCAocHJvcGVydHkudW5pdCAhPT0gdW5kZWZpbmVkICYmIHsgdW5pdDogcHJvcGVydHkudW5pdCB9KSkpO1xuY29uc3QgcHJvcGVydHlUcmFuc2Zvcm1lciA9IChwcm9wZXJ0eUdyb3VwLCBjYXRlZ29yeSkgPT4ge1xuICAgIC8vIGlmIGN1c3RvbSB0cmFuc2Zvcm1lciBpcyBkZWZpbmVkXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjYXRlZ29yeVRyYW5zZm9ybWVyLCBwcm9wZXJ0eUdyb3VwLmNhdGVnb3J5KSkge1xuICAgICAgICByZXR1cm4gY2F0ZWdvcnlUcmFuc2Zvcm1lcltwcm9wZXJ0eUdyb3VwLmNhdGVnb3J5XShwcm9wZXJ0eUdyb3VwLnZhbHVlcyk7XG4gICAgfVxuICAgIC8vIG90aGVyd2lzZSByZXR1cm4gd2l0aCBkZWZhdWx0IHRyYW5zZm9ybWVyXG4gICAgcmV0dXJuIGRlZmF1bHRUcmFuc2Zvcm1lcihwcm9wZXJ0eUdyb3VwLnZhbHVlcyk7XG59O1xuY29uc3Qgc3R5bGVEaWN0aW9uYXJ5VHJhbnNmb3JtZXIgPSAocHJvcGVydHlHcm91cCkgPT4ge1xuICAgIC8vIHRyYW5zZm9ybSB0byBhbWF6b24gc3R5bGUgRGljdGlvbmFyeSBzdHJ1Y3R1cmVcbiAgICBjb25zdCB0cmFuc2Zvcm1lZFByb3BlcnRpZXMgPSBwcm9wZXJ0eVRyYW5zZm9ybWVyKHByb3BlcnR5R3JvdXAsIHByb3BlcnR5R3JvdXAuY2F0ZWdvcnkpO1xuICAgIC8vIHJldHVybiB2YWx1ZXNcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHsgbmFtZTogcHJvcGVydHlHcm91cC5uYW1lLCBjYXRlZ29yeTogcHJvcGVydHlHcm91cC5jYXRlZ29yeSB9LCBnZXREZXNjcmlwdGlvbihwcm9wZXJ0eUdyb3VwLmRlc2NyaXB0aW9uKSksIHRyYW5zZm9ybWVkUHJvcGVydGllcyk7XG59O1xuZXhwb3J0IGRlZmF1bHQgc3R5bGVEaWN0aW9uYXJ5VHJhbnNmb3JtZXI7XG5leHBvcnQgY29uc3QgX190ZXN0aW5nID0ge1xuICAgIHN0eWxlRGljdGlvbmFyeUNvbnZlcnRWYWx1ZTogc3R5bGVEaWN0aW9uYXJ5Q29udmVydFZhbHVlLFxuICAgIHNpemVUcmFuc2Zvcm1lcjogc2l6ZVRyYW5zZm9ybWVyXG59O1xuIiwiY29uc3QgZ2V0RGVzY3JpcHRpb24gPSAoZGVzY3JpcHRpb24sIGRlc2NyaXB0aW9uS2V5ID0gJ2NvbW1lbnQnKSA9PiB7XG4gICAgLy8gaWYgdmFsaWQgZGVzY3JpcHRpb25cbiAgICBpZiAoZGVzY3JpcHRpb24gJiYgdHlwZW9mIGRlc2NyaXB0aW9uID09PSAnc3RyaW5nJyAmJiBkZXNjcmlwdGlvbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB7IGNvbW1lbnQ6IGRlc2NyaXB0aW9uIH07XG4gICAgfVxuICAgIC8vIGlmIGludmFsaWQgZGVzY3JpcHRpb24gcmV0dXJuIGFuIGVtcHR5IG9iamVjdFxuICAgIHJldHVybiB7fTtcbn07XG5leHBvcnQgZGVmYXVsdCBnZXREZXNjcmlwdGlvbjtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuLyoqXG4gKiBAbmFtZSBnZXRBY2Nlc3NUb2tlblxuICogQGRlc2NyaXB0aW9uIHJldHVybnMgdGhlIGFjY2VzcyB0b2tlbiBmb3IgdGhlIGN1cnJlbnQgZmlsZSBvciB1bmRlZmluZWRcbiAqIEBwYXJhbSBmaWxlSWQge3N0cmluZ30g4oCUIElEIG9mIHRoZSBjdXJyZW50IGZpbGVcbiAqL1xuY29uc3QgZ2V0QWNjZXNzVG9rZW4gPSAoZmlsZUlkKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAvLyBnZXQgYWxsIGFjY2VzcyB0b2tlbnNcbiAgICBjb25zdCBhY2Nlc3NUb2tlbnMgPSB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKCdhY2Nlc3NUb2tlbnMnKTtcbiAgICAvLyBpZiBhY2Nlc3MgdG9rZW5zIG9iamVjdCBpcyBwcmVzZW50XG4gICAgaWYgKGFjY2Vzc1Rva2VucyAhPT0gdW5kZWZpbmVkICYmIGFjY2Vzc1Rva2VucyBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgYWNjZXNzIHRva2VuIGZyb20gdGhlIGNhY2hlXG4gICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gYWNjZXNzVG9rZW5zW2ZpbGVJZF07XG4gICAgICAgIC8vIHJldHVybiB0aGUgYWNjZXNzIHRva2VuIG9yIGFuIGVtcHR5IHN0cmluZ1xuICAgICAgICByZXR1cm4gYWNjZXNzVG9rZW4gfHwgJyc7XG4gICAgfVxuICAgIC8vIHJldHVybiBlbXB0eSBzdHJpbmcgaWYgbm8gdG9rZW4gaXMgc3RvcmVkXG4gICAgcmV0dXJuICcnO1xufSk7XG4vKipcbiAqIEBuYW1lIHNldEFjY2Vzc1Rva2VuXG4gKiBAZGVzY3JpcHRpb24gc3RvcmUgdGhlIGFjY2VzcyB0b2tlbiBmb3IgdGhlIGN1cnJlbnQgZml2ZW4gZmlsZSBpbiB0aGUgdXNlciBjbGllbnRTdG9yYWdlXG4gKiBAcGFyYW0gZmlsZUlkIHtzdHJpbmd9IOKAlCBJRCBvZiB0aGUgY3VycmVudCBmaWxlXG4gKiBAcGFyYW0gZmlsZUlkIHtzdHJpbmd9IOKAlCBhY2Nlc3MgdG9rZW5cbiAqL1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmNvbnN0IHNldEFjY2Vzc1Rva2VuID0gKGZpbGVJZCwgYWNjZXNzVG9rZW4pID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIC8vIGdldCB0aGUgYWNjZXNzIHRva2VuIG9iamVjdFxuICAgIGNvbnN0IGFjY2Vzc1Rva2VucyA9ICh5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKCdhY2Nlc3NUb2tlbnMnKSkgfHwge307XG4gICAgLy8gbWVyZ2UgdG9rZW5zXG4gICAgY29uc3QgbWVyZ2VkVG9rZW5zID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBhY2Nlc3NUb2tlbnMpLCB7IFtmaWxlSWRdOiBhY2Nlc3NUb2tlbiB9KTtcbiAgICAvLyBtZXJnZSB0aGUgbmV3IHRva2VuIGludG8gdGhlIG9iamVjdFxuICAgIHJldHVybiB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKCdhY2Nlc3NUb2tlbnMnLCBtZXJnZWRUb2tlbnMpO1xufSk7XG5leHBvcnQgeyBnZXRBY2Nlc3NUb2tlbiwgc2V0QWNjZXNzVG9rZW4gfTtcbiIsImltcG9ydCBmaWx0ZXJCeU5hbWVQcm9wZXJ0eSBmcm9tICcuL2ZpbHRlckJ5TmFtZVByb3BlcnR5JztcbmltcG9ydCBnZXRQYWludFN0eWxlcyBmcm9tICcuL2dldFBhaW50U3R5bGVzJztcbmltcG9ydCBnZXRHcmlkU3R5bGVzIGZyb20gJy4vZ2V0R3JpZFN0eWxlcyc7XG5pbXBvcnQgZ2V0VG9rZW5Ob2RlcyBmcm9tICcuL2dldFRva2VuTm9kZXMnO1xuaW1wb3J0IGdldFRleHRTdHlsZXMgZnJvbSAnLi9nZXRUZXh0U3R5bGVzJztcbmltcG9ydCBnZXRFZmZlY3RTdHlsZXMgZnJvbSAnLi9nZXRFZmZlY3RTdHlsZXMnO1xuLyoqXG4gKiBAZnVuY3Rpb24gYnVpbGRGaWdtYURhdGEg4oCTIHJldHVybiBhbiBvYmplY3Qgd2l0aCBhbGwgc3R5bGVzICYgZnJhbWUgdG8gdXNlIGZvciBleHBvcnRcbiAqIEBwYXJhbSB7UGx1Z2luQVBJfSBmaWdtYSDigJQgdGhlIGZpZ21hIFBsdWdpbkFQSSBvYmplY3RcbiAqIEBwYXJhbSBvcHRpb25zIOKAkyBvcHRpb25zIG9iamVjdFxuICovXG5jb25zdCBidWlsZEZpZ21hRGF0YSA9IChmaWdtYSwgb3B0aW9ucyA9IHtcbiAgICBwcmVmaXg6ICdfJyxcbiAgICBleGNsdWRlUHJlZml4OiB0cnVlXG59KSA9PiB7XG4gICAgLy8gdXNlIHNwcmVhZCBvcGVyYXRvciBiZWNhdXNlIHRoZSBvcmlnaW5hbCBpcyByZWFkT25seVxuICAgIGNvbnN0IHRva2VuRnJhbWVzID0gZ2V0VG9rZW5Ob2RlcyhbLi4uZmlnbWEucm9vdC5jaGlsZHJlbl0pO1xuICAgIC8vIGdldCBkYXRhIGZyb20gZmlnbWFcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbkZyYW1lczogdG9rZW5GcmFtZXMsXG4gICAgICAgIHBhaW50U3R5bGVzOiBnZXRQYWludFN0eWxlcyhmaWdtYS5nZXRMb2NhbFBhaW50U3R5bGVzKCkpLmZpbHRlcihmaWx0ZXJCeU5hbWVQcm9wZXJ0eShvcHRpb25zLnByZWZpeCwgb3B0aW9ucy5leGNsdWRlUHJlZml4KSksXG4gICAgICAgIGdyaWRTdHlsZXM6IGdldEdyaWRTdHlsZXMoZmlnbWEuZ2V0TG9jYWxHcmlkU3R5bGVzKCkpLmZpbHRlcihmaWx0ZXJCeU5hbWVQcm9wZXJ0eShvcHRpb25zLnByZWZpeCwgb3B0aW9ucy5leGNsdWRlUHJlZml4KSksXG4gICAgICAgIHRleHRTdHlsZXM6IGdldFRleHRTdHlsZXMoZmlnbWEuZ2V0TG9jYWxUZXh0U3R5bGVzKCkpLmZpbHRlcihmaWx0ZXJCeU5hbWVQcm9wZXJ0eShvcHRpb25zLnByZWZpeCwgb3B0aW9ucy5leGNsdWRlUHJlZml4KSksXG4gICAgICAgIGVmZmVjdFN0eWxlczogZ2V0RWZmZWN0U3R5bGVzKGZpZ21hLmdldExvY2FsRWZmZWN0U3R5bGVzKCkpLmZpbHRlcihmaWx0ZXJCeU5hbWVQcm9wZXJ0eShvcHRpb25zLnByZWZpeCwgb3B0aW9ucy5leGNsdWRlUHJlZml4KSlcbiAgICB9O1xufTtcbmV4cG9ydCBkZWZhdWx0IGJ1aWxkRmlnbWFEYXRhO1xuIiwiLyogaXN0YW5idWwgaWdub3JlIGZpbGUgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBzZXR0aW5nc0RpYWxvZzoge1xuICAgICAgICB3aWR0aDogNTUwLFxuICAgICAgICBoZWlnaHQ6IDU2NVxuICAgIH0sXG4gICAga2V5OiB7XG4gICAgICAgIGxhc3RWZXJzaW9uU2V0dGluZ3NPcGVuZWQ6ICdsYXN0VmVyc2lvblNldHRpbmdzT3BlbmVkJyxcbiAgICAgICAgZmlsZUlkOiAnZmlsZUlkJ1xuICAgIH1cbn07XG4iLCJpbXBvcnQgcm91bmRXaXRoRGVjaW1hbHMgZnJvbSAnLi9yb3VuZFdpdGhEZWNpbWFscyc7XG5leHBvcnQgY29uc3Qgcm91bmRSZ2JhID0gKHJnYmEsIG9wYWNpdHkpID0+ICh7XG4gICAgcjogcm91bmRXaXRoRGVjaW1hbHMocmdiYS5yICogMjU1LCAwKSxcbiAgICBnOiByb3VuZFdpdGhEZWNpbWFscyhyZ2JhLmcgKiAyNTUsIDApLFxuICAgIGI6IHJvdW5kV2l0aERlY2ltYWxzKHJnYmEuYiAqIDI1NSwgMCksXG4gICAgYTogcm91bmRXaXRoRGVjaW1hbHMob3BhY2l0eSB8fCByZ2JhLmEgfHwgMSlcbn0pO1xuZXhwb3J0IGNvbnN0IGNvbnZlcnRQYWludFRvUmdiYSA9IChwYWludCkgPT4ge1xuICAgIGlmIChwYWludC50eXBlID09PSAnU09MSUQnICYmIHBhaW50LnZpc2libGUgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHJvdW5kUmdiYShwYWludC5jb2xvciwgKHBhaW50Lm9wYWNpdHkgfHwgbnVsbCkpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5leHBvcnQgY29uc3QgY29udmVydFJnYmFPYmplY3RUb1N0cmluZyA9IChyZ2JhT2JqZWN0KSA9PiBgcmdiYSgke3JnYmFPYmplY3Qucn0sICR7cmdiYU9iamVjdC5nfSwgJHtyZ2JhT2JqZWN0LmJ9LCAke3JnYmFPYmplY3QuYX0pYDtcbiIsIi8qKlxuICogUGVyZm9ybXMgYSBkZWVwIG1lcmdlIG9mIGBzb3VyY2VgIGludG8gYHRhcmdldGAuXG4gKiBNdXRhdGVzIGB0YXJnZXRgIG9ubHkgYnV0IG5vdCBpdHMgb2JqZWN0cyBhbmQgYXJyYXlzLlxuICpcbiAqIEBhdXRob3IgaW5zcGlyZWQgYnkgW2poaWxkZW5iaWRkbGVdKGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80ODIxODIwOSkuXG4gKi9cbmNvbnN0IGRlZXBNZXJnZSA9ICh0YXJnZXQsIHNvdXJjZSkgPT4ge1xuICAgIC8vIGZ1bmN0aW9uIHRvIHRlc3QgaWYgYSB2YXJpYWJsZSBpcyBhbiBvYmplY3RcbiAgICBjb25zdCBpc09iamVjdCA9IChvYmopID0+IG9iaiAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JztcbiAgICAvLyBtYWtlIHN1cmUgYm90aCB0aGUgdGFyZ2V0IGFuZCB0aGUgc291cmNlIGFyZSBvYmplY3RzXG4gICAgLy8gb3RoZXJ3aXNlIHJldHVybiBzb3VyY2VcbiAgICBpZiAoIWlzT2JqZWN0KHRhcmdldCkgfHwgIWlzT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICB9XG4gICAgLy8gaXRlcmF0cmUgb3ZlciBzb3VyY2VcbiAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgLy8gZ2V0IHZhbHVlcyBmcm9tIGJvdGggdGFyZ2V0IGFuZCBzb3VyY2UgZm9yIHRoZSBnaXZlbiBrZXlcbiAgICAgICAgY29uc3QgdGFyZ2V0VmFsdWUgPSB0YXJnZXRba2V5XTtcbiAgICAgICAgY29uc3Qgc291cmNlVmFsdWUgPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgLy8gbWVyZ2UgYm90aCB2YWx1ZXNcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0VmFsdWUpICYmIEFycmF5LmlzQXJyYXkoc291cmNlVmFsdWUpKSB7XG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IHRhcmdldFZhbHVlLmNvbmNhdChzb3VyY2VWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNPYmplY3QodGFyZ2V0VmFsdWUpICYmIGlzT2JqZWN0KHNvdXJjZVZhbHVlKSkge1xuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBkZWVwTWVyZ2UoT2JqZWN0LmFzc2lnbih7fSwgdGFyZ2V0VmFsdWUpLCBzb3VyY2VWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVZhbHVlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gcmV0dXJuIG1lcmdlIG9iamVjdFxuICAgIHJldHVybiB0YXJnZXQ7XG59O1xuZXhwb3J0IGRlZmF1bHQgZGVlcE1lcmdlO1xuIiwiaW1wb3J0IHsgY29udmVydFBhaW50VG9SZ2JhIH0gZnJvbSAnLi9jb252ZXJ0Q29sb3InO1xuLyoqXG4gKiBSZXR1cm4gYW4gYXJyYXkgb2Ygc29saWQgc3Ryb2tlIGNvbG9yc1xuICovXG5jb25zdCBnZXRTb2xpZFN0cm9rZXMgPSAocGFpbnRzKSA9PiB7XG4gICAgLy8gY2xvbmUgd2l0aG91dCByZWZlcmVuY2VcbiAgICByZXR1cm4gWy4uLnBhaW50c11cbiAgICAgICAgLm1hcChwYWludCA9PiBjb252ZXJ0UGFpbnRUb1JnYmEocGFpbnQpKTtcbn07XG4vKipcbiAqIGV4dHJhY3RUb2tlbk5vZGVWYWx1ZXNcbiAqIEBwYXJhbSBub2RlOiBTY2VuZU5vZGVcbiAqIEByZXR1cm5zIG5vZGUgb2JqZWN0XG4gKi9cbmNvbnN0IGV4dHJhY3RUb2tlbk5vZGVWYWx1ZXMgPSAobm9kZSkgPT4gKHtcbiAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGRlc2NyaXB0aW9uOiBub2RlLmRlc2NyaXB0aW9uIHx8IHVuZGVmaW5lZCxcbiAgICBib3R0b21MZWZ0UmFkaXVzOiBub2RlLmJvdHRvbUxlZnRSYWRpdXMsXG4gICAgYm90dG9tUmlnaHRSYWRpdXM6IG5vZGUuYm90dG9tUmlnaHRSYWRpdXMsXG4gICAgdG9wTGVmdFJhZGl1czogbm9kZS50b3BMZWZ0UmFkaXVzLFxuICAgIHRvcFJpZ2h0UmFkaXVzOiBub2RlLnRvcFJpZ2h0UmFkaXVzLFxuICAgIGNvcm5lclJhZGl1czogbm9kZS5jb3JuZXJSYWRpdXMgfHwgdW5kZWZpbmVkLFxuICAgIGNvcm5lclNtb290aGluZzogbm9kZS5jb3JuZXJTbW9vdGhpbmcsXG4gICAgc3Ryb2tlczogZ2V0U29saWRTdHJva2VzKG5vZGUuc3Ryb2tlcyksXG4gICAgc3Ryb2tlV2VpZ2h0OiBub2RlLnN0cm9rZVdlaWdodCxcbiAgICBzdHJva2VTdHlsZUlkOiBub2RlLnN0cm9rZVN0eWxlSWQsXG4gICAgc3Ryb2tlTWl0ZXJMaW1pdDogbm9kZS5zdHJva2VNaXRlckxpbWl0LFxuICAgIHN0cm9rZUpvaW46IG5vZGUuc3Ryb2tlSm9pbixcbiAgICBzdHJva2VDYXA6IG5vZGUuc3Ryb2tlQ2FwLFxuICAgIGRhc2hQYXR0ZXJuOiBub2RlLmRhc2hQYXR0ZXJuLFxuICAgIHN0cm9rZUFsaWduOiBub2RlLnN0cm9rZUFsaWduLFxuICAgIHdpZHRoOiBub2RlLndpZHRoLFxuICAgIGhlaWdodDogbm9kZS5oZWlnaHQsXG4gICAgcmVhY3Rpb25zOiBub2RlLnJlYWN0aW9ucyB8fCB1bmRlZmluZWQsXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHBhZGRpbmdUb3A6IG5vZGUucGFkZGluZ1RvcCB8fCAwLFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwYWRkaW5nUmlnaHQ6IG5vZGUucGFkZGluZ1JpZ2h0IHx8IDAsXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHBhZGRpbmdCb3R0b206IG5vZGUucGFkZGluZ0JvdHRvbSB8fCAwLFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwYWRkaW5nTGVmdDogbm9kZS5wYWRkaW5nTGVmdCB8fCAwXG59KTtcbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3RUb2tlbk5vZGVWYWx1ZXM7XG4iLCJjb25zdCBmaWx0ZXJCeVByb3BlcnR5TmFtZSA9IChwcmVmaXggPSAnXycsIGV4Y2x1ZGUgPSB0cnVlKSA9PiB7XG4gICAgcmV0dXJuIChvYmplY3QpID0+IChvYmplY3QubmFtZS50cmltKCkuc3Vic3RyKDAsIHByZWZpeC5sZW5ndGgpICE9PSBwcmVmaXgpID09PSBleGNsdWRlO1xufTtcbmV4cG9ydCBkZWZhdWx0IGZpbHRlckJ5UHJvcGVydHlOYW1lO1xuIiwiLyoqXG4gKiBAZnVuY3Rpb24gZ2V0RWZmZWN0U3R5bGVzXG4gKiBAcGFyYW0ge0FycmF5PEVmZmVjdFN0eWxlPn0gc3R5bGVzIOKAkyB0aGUgZWZmZWN0U3R5bGUgZnJvbSB0aGUgZmlnbWEgZmlsZVxuICovXG5jb25zdCBnZXRFZmZlY3RTdHlsZXMgPSAoc3R5bGVzKSA9PiB7XG4gICAgLy8gaW5pdCBzdHlsZUFycmF5XG4gICAgY29uc3Qgc3R5bGVBcnJheSA9IFtdO1xuICAgIC8vIGxvb3AgdGhyb3VnaCBGaWdtYSBzdHlsZXMgYW5kIGFkZCB0byBhcnJheVxuICAgIHN0eWxlcy5mb3JFYWNoKHN0eWxlID0+IHtcbiAgICAgICAgc3R5bGVBcnJheS5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IHN0eWxlLm5hbWUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogc3R5bGUuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBlZmZlY3RzOiBzdHlsZS5lZmZlY3RzXG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIHJldHVybiBhcnJheVxuICAgIHJldHVybiBzdHlsZUFycmF5O1xufTtcbmV4cG9ydCBkZWZhdWx0IGdldEVmZmVjdFN0eWxlcztcbiIsImltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuY29uc3QgZ2V0RmlsZUlkID0gKGZpZ21hKSA9PiB7XG4gICAgbGV0IGZpbGVJZCA9IGZpZ21hLnJvb3QuZ2V0UGx1Z2luRGF0YShjb25maWcua2V5LmZpbGVJZCk7XG4gICAgLy8gc2V0IHBsdWdpbiBpZCBpZiBpdCBkb2VzIG5vdCBleGlzdFxuICAgIGlmIChmaWxlSWQgPT09IHVuZGVmaW5lZCB8fCBmaWxlSWQgPT09ICcnKSB7XG4gICAgICAgIGZpZ21hLnJvb3Quc2V0UGx1Z2luRGF0YShjb25maWcua2V5LmZpbGVJZCwgZmlnbWEucm9vdC5uYW1lICsgJyAnICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwMDAwMCkpO1xuICAgICAgICAvLyBncmFiIGZpbGUgSURcbiAgICAgICAgZmlsZUlkID0gZmlnbWEucm9vdC5nZXRQbHVnaW5EYXRhKGNvbmZpZy5rZXkuZmlsZUlkKTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbGVJZDtcbn07XG5leHBvcnQgZGVmYXVsdCBnZXRGaWxlSWQ7XG4iLCIvKipcbiAqIEBmdW5jdGlvbiBnZXRHcmlkU3R5bGVzXG4gKiBAcGFyYW0ge0FycmF5fSBncmlkU3R5bGVzIOKAkyB0aGUgZ3JpZFN0eWxlcyBmcm9tIHRoZSBmaWdtYSBmaWxlXG4gKi9cbmNvbnN0IGdldEdyaWRTdHlsZXMgPSAoc3R5bGVzKSA9PiB7XG4gICAgLy8gaW5pdCBzdHlsZUFycmF5XG4gICAgY29uc3Qgc3R5bGVBcnJheSA9IFtdO1xuICAgIC8vIGxvb3AgdGhyb3VnaCBGaWdtYSBzdHlsZXMgYW5kIGFkZCB0byBhcnJheVxuICAgIHN0eWxlcy5mb3JFYWNoKHN0eWxlID0+IHtcbiAgICAgICAgc3R5bGVBcnJheS5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IHN0eWxlLm5hbWUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogc3R5bGUuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBsYXlvdXRHcmlkczogc3R5bGUubGF5b3V0R3JpZHNcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy8gcmV0dXJuIGFycmF5XG4gICAgcmV0dXJuIHN0eWxlQXJyYXk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0R3JpZFN0eWxlcztcbiIsImltcG9ydCBnZXRUb2tlbkpzb24gZnJvbSAnLi9nZXRUb2tlbkpzb24nO1xuaW1wb3J0IGJ1aWxkRmlnbWFEYXRhIGZyb20gJy4vYnVpbGRGaWdtYURhdGEnO1xuLyoqXG4gKiBAbmFtZSBnZXRKc29uXG4gKiBAcGFyYW0ge1BsdWdpbkFQSX0gZmlnbWFcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc3RyaW5naWZ5XG4gKi9cbmNvbnN0IGdldEpzb24gPSAoZmlnbWEsIHVzZXJTZXR0aW5ncywgc3RyaW5naWZ5ID0gdHJ1ZSkgPT4ge1xuICAgIC8vIGNvbnN0cnVjdCBmaWdtYSBkYXRhIG9iamVjdFxuICAgIGNvbnN0IGZpZ21hRGF0YSA9IGJ1aWxkRmlnbWFEYXRhKGZpZ21hLCB7XG4gICAgICAgIHByZWZpeDogdXNlclNldHRpbmdzLnByZWZpeCxcbiAgICAgICAgZXhjbHVkZVByZWZpeDogdXNlclNldHRpbmdzLmV4Y2x1ZGVQcmVmaXhcbiAgICB9KTtcbiAgICBpZiAoc3RyaW5naWZ5ID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gZ2V0VG9rZW5Kc29uKGZpZ21hRGF0YSwgJ3N0eWxlRGljdGlvbmFyeScsIHVzZXJTZXR0aW5ncy5uYW1lQ29udmVyc2lvbik7XG4gICAgfVxuICAgIC8vIGdldCB0b2tlbnMgYXMgc3RyaW5naWZpZWQganNvblxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShnZXRUb2tlbkpzb24oZmlnbWFEYXRhLCAnc3R5bGVEaWN0aW9uYXJ5JywgdXNlclNldHRpbmdzLm5hbWVDb252ZXJzaW9uKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0SnNvbjtcbiIsIi8qKlxuICogQGZ1bmN0aW9uIGdldFBhaW50U3R5bGVzXG4gKiBAcGFyYW0ge0FycmF5fSBwYWludFN0eWxlcyDigJMgdGhlIHBhaW50U3R5bGVzIGZyb20gdGhlIGZpZ21hIGZpbGUgKHNvbWVob3cgc3RpbGwgY29ubmVjdGVkKVxuICovXG5jb25zdCBnZXRQYWludFN0eWxlcyA9IChzdHlsZXMpID0+IHtcbiAgICAvLyBpbml0IHN0eWxlQXJyYXlcbiAgICBjb25zdCBzdHlsZUFycmF5ID0gW107XG4gICAgLy8gbG9vcCB0aHJvdWdoIEZpZ21hIHN0eWxlcyBhbmQgYWRkIHRvIGFycmF5XG4gICAgc3R5bGVzLmZvckVhY2goc3R5bGUgPT4ge1xuICAgICAgICBzdHlsZUFycmF5LnB1c2goe1xuICAgICAgICAgICAgbmFtZTogc3R5bGUubmFtZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBzdHlsZS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIHBhaW50czogc3R5bGUucGFpbnRzXG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIHJldHVybiBhcnJheVxuICAgIHJldHVybiBzdHlsZUFycmF5O1xufTtcbmV4cG9ydCBkZWZhdWx0IGdldFBhaW50U3R5bGVzO1xuIiwiLyoqXG4gKiBAZnVuY3Rpb24gZ2V0VGV4dFN0eWxlc1xuICogQHBhcmFtIHtBcnJheTxUZXh0U3R5bGU+fSBzdHlsZXMg4oCTIHRoZSBwYWludFN0eWxlcyBmcm9tIHRoZSBmaWdtYSBmaWxlIChzb21laG93IHN0aWxsIGNvbm5lY3RlZClcbiAqL1xuY29uc3QgZ2V0VGV4dFN0eWxlcyA9IChzdHlsZXMpID0+IHtcbiAgICAvLyBpbml0IHN0eWxlQXJyYXlcbiAgICBjb25zdCBzdHlsZUFycmF5ID0gW107XG4gICAgLy8gbG9vcCB0aHJvdWdoIEZpZ21hIHN0eWxlcyBhbmQgYWRkIHRvIGFycmF5XG4gICAgc3R5bGVzLmZvckVhY2goc3R5bGUgPT4ge1xuICAgICAgICBzdHlsZUFycmF5LnB1c2goe1xuICAgICAgICAgICAgbmFtZTogc3R5bGUubmFtZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBzdHlsZS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGZvbnRTaXplOiBzdHlsZS5mb250U2l6ZSxcbiAgICAgICAgICAgIHRleHREZWNvcmF0aW9uOiBzdHlsZS50ZXh0RGVjb3JhdGlvbixcbiAgICAgICAgICAgIGZvbnROYW1lOiBzdHlsZS5mb250TmFtZSxcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6IHN0eWxlLmxldHRlclNwYWNpbmcsXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiBzdHlsZS5saW5lSGVpZ2h0LFxuICAgICAgICAgICAgcGFyYWdyYXBoSW5kZW50OiBzdHlsZS5wYXJhZ3JhcGhJbmRlbnQsXG4gICAgICAgICAgICBwYXJhZ3JhcGhTcGFjaW5nOiBzdHlsZS5wYXJhZ3JhcGhTcGFjaW5nLFxuICAgICAgICAgICAgdGV4dENhc2U6IHN0eWxlLnRleHRDYXNlXG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIHJldHVybiBhcnJheVxuICAgIHJldHVybiBzdHlsZUFycmF5O1xufTtcbmV4cG9ydCBkZWZhdWx0IGdldFRleHRTdHlsZXM7XG4iLCJpbXBvcnQgZXh0cmFjdENvbG9ycyBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdENvbG9ycyc7XG5pbXBvcnQgZXh0cmFjdEdyaWRzIGZyb20gJy4uL2V4dHJhY3Rvci9leHRyYWN0R3JpZHMnO1xuaW1wb3J0IGV4dHJhY3RGb250cyBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdEZvbnRzJztcbmltcG9ydCBleHRyYWN0RWZmZWN0cyBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdEVmZmVjdHMnO1xuaW1wb3J0IGV4dHJhY3RNb3Rpb24gZnJvbSAnLi4vZXh0cmFjdG9yL2V4dHJhY3RNb3Rpb24nO1xuaW1wb3J0IGV4dHJhY3RTaXplcyBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdFNpemVzJztcbmltcG9ydCBleHRyYWN0U3BhY2luZyBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdFNwYWNpbmcnO1xuaW1wb3J0IGV4dHJhY3RCb3JkZXJzIGZyb20gJy4uL2V4dHJhY3Rvci9leHRyYWN0Qm9yZGVycyc7XG5pbXBvcnQgZXh0cmFjdFJhZGlpIGZyb20gJy4uL2V4dHJhY3Rvci9leHRyYWN0UmFkaWknO1xuaW1wb3J0IGV4dHJhY3RCcmVha3BvaW50cyBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdEJyZWFrcG9pbnRzJztcbmltcG9ydCBncm91cEJ5TmFtZSBmcm9tICcuL2dyb3VwQnlOYW1lJztcbmltcG9ydCBzdHlsZURpY3Rpb25hcnlUcmFuc2Zvcm1lciBmcm9tICcuLi90cmFuc2Zvcm1lci9zdHlsZURpY3Rpb25hcnlUcmFuc2Zvcm1lcic7XG5jb25zdCB0cmFuc2Zvcm1lciA9IHtcbiAgICBzdHlsZURpY3Rpb25hcnk6IHN0eWxlRGljdGlvbmFyeVRyYW5zZm9ybWVyXG59O1xuY29uc3QgZXhwb3J0UmF3VG9rZW5BcnJheSA9IChmaWdtYURhdGEpID0+IHtcbiAgICAvLyBnZXQgdG9rZW5zXG4gICAgcmV0dXJuIFtcbiAgICAgICAgLi4uZXh0cmFjdFNpemVzKGZpZ21hRGF0YS50b2tlbkZyYW1lcyksXG4gICAgICAgIC4uLmV4dHJhY3RCcmVha3BvaW50cyhmaWdtYURhdGEudG9rZW5GcmFtZXMpLFxuICAgICAgICAuLi5leHRyYWN0U3BhY2luZyhmaWdtYURhdGEudG9rZW5GcmFtZXMpLFxuICAgICAgICAuLi5leHRyYWN0Qm9yZGVycyhmaWdtYURhdGEudG9rZW5GcmFtZXMpLFxuICAgICAgICAuLi5leHRyYWN0UmFkaWkoZmlnbWFEYXRhLnRva2VuRnJhbWVzKSxcbiAgICAgICAgLi4uZXh0cmFjdE1vdGlvbihmaWdtYURhdGEudG9rZW5GcmFtZXMpLFxuICAgICAgICAuLi5leHRyYWN0Q29sb3JzKGZpZ21hRGF0YS5wYWludFN0eWxlcyksXG4gICAgICAgIC4uLmV4dHJhY3RHcmlkcyhmaWdtYURhdGEuZ3JpZFN0eWxlcyksXG4gICAgICAgIC4uLmV4dHJhY3RGb250cyhmaWdtYURhdGEudGV4dFN0eWxlcyksXG4gICAgICAgIC4uLmV4dHJhY3RFZmZlY3RzKGZpZ21hRGF0YS5lZmZlY3RTdHlsZXMpXG4gICAgXTtcbn07XG5jb25zdCBnZXRUb2tlbkpzb24gPSAoZmlnbWFEYXRhLCBmb3JtYXQgPSAnc3R5bGVEaWN0aW9uYXJ5JywgbmFtZUNvbnZlcnNpb24gPSAnZGVmYXVsdCcpID0+IHtcbiAgICAvLyBnZXQgdG9rZW4gYXJyYXlcbiAgICBjb25zdCB0b2tlbkFycmF5ID0gZXhwb3J0UmF3VG9rZW5BcnJheShmaWdtYURhdGEpO1xuICAgIC8vIGZvcm1hdCB0b2tlbnNcbiAgICBjb25zdCBmb3JtYXR0ZWRUb2tlbnMgPSB0b2tlbkFycmF5Lm1hcCgodG9rZW4pID0+IHRyYW5zZm9ybWVyW2Zvcm1hdF0odG9rZW4pKTtcbiAgICAvLyBncm91cCB0b2tlbnNcbiAgICBjb25zdCBncm91cGVkVG9rZW5zID0gZ3JvdXBCeU5hbWUoZm9ybWF0dGVkVG9rZW5zLCB0cnVlLCBuYW1lQ29udmVyc2lvbik7XG4gICAgLy8gcmV0dXJuIGdyb3VwIHRva2Vuc1xuICAgIHJldHVybiBncm91cGVkVG9rZW5zO1xufTtcbmV4cG9ydCBkZWZhdWx0IGdldFRva2VuSnNvbjtcbiIsImltcG9ydCBleHRyYWN0VG9rZW5Ob2RlVmFsdWVzIGZyb20gJy4vZXh0cmFjdFRva2VuTm9kZVZhbHVlcyc7XG5pbXBvcnQgaXNUb2tlbk5vZGUgZnJvbSAnLi9pc1Rva2VuTm9kZSc7XG4vLyB0aGUgbmFtZSB0aGF0IHRva2VuIGZyYW1lcyBoYXZlXG5jb25zdCB0b2tlbkZyYW1lTmFtZSA9ICdfdG9rZW5zJztcbi8vIGNoZWNrIGlmIGEgZnJhbWUgaXMgYSBfdG9rZW4gZnJhbWVcbmNvbnN0IGlzVG9rZW5GcmFtZSA9IChub2RlKSA9PiBub2RlLnR5cGUgPT09ICdGUkFNRScgJiYgbm9kZS5uYW1lLnRyaW0oKS50b0xvd2VyQ2FzZSgpLnN1YnN0cigwLCB0b2tlbkZyYW1lTmFtZS5sZW5ndGgpID09PSB0b2tlbkZyYW1lTmFtZTtcbi8vIHJldHVybiBvbmx5IG5vZGVzIHRoYXQgYXJlIGZyYW1lc1xuY29uc3QgZ2V0RnJhbWVOb2RlcyA9IChub2RlcykgPT4gWy4uLm5vZGVzLm1hcChwYWdlID0+IHBhZ2UuZmluZENoaWxkcmVuKG5vZGUgPT4gaXNUb2tlbkZyYW1lKG5vZGUpKSkucmVkdWNlKChmbGF0dGVuLCBhcnIpID0+IFsuLi5mbGF0dGVuLCAuLi5hcnJdKV07XG4vKipcbiAqIGdldFZhcmlhbnROYW1lXG4gKiBjcmVhdGVzIHRoZSB2YXJpYW50IG5hbWUgb2YgdGhlIHBhcmVudCBhbmQgY2hpbGQgbmFtZVxuICovXG5jb25zdCBnZXRWYXJpYW50TmFtZSA9IChwYXJlbnROYW1lLCBjaGlsZE5hbWUpID0+IHtcbiAgICAvLyBzcGxpdCBpbnRvIGFycmF5XG4gICAgY2hpbGROYW1lID0gY2hpbGROYW1lLnNwbGl0KCcsJylcbiAgICAgICAgLy8gcmVtb3ZlIGhpZGRlbiBuYW1lc1xuICAgICAgICAuZmlsdGVyKHBhcnQgPT4gIVsnXycsICcuJ10uaW5jbHVkZXMocGFydC50cmltKCkuc3Vic3RyKDAsIDEpKSlcbiAgICAgICAgLy8gY2xlYW51cCBuYW1lcywgb25seSByZXR1cm4gdmFsdWUgcGFydFxuICAgICAgICAubWFwKHBhcnQgPT4gcGFydC5zcGxpdCgnPScpWzFdKVxuICAgICAgICAvLyBjb21iaW5lXG4gICAgICAgIC5qb2luKCcvJyk7XG4gICAgLy8gcmV0dXJuIGZ1bGwgbmFtZVxuICAgIHJldHVybiBgJHtwYXJlbnROYW1lfS8ke2NoaWxkTmFtZX1gO1xufTtcbi8qKlxuICogUmV0dXJucyBhbGwgZnJhbWVzIGZyb20gdGhlIGZpbGUgdGhhdCBoYXZlIGEgbmFtZSB0aGF0IHN0YXJ0cyB3aXRoIF90b2tlbnMgb3IgdGhlIHVzZXIgZGVmaW5lZCB0b2tlbiBzcGVjaWZpZXJcbiAqXG4gKiBAcGFyYW0gcGFnZXMgUGFnZU5vZGVzXG4gKi9cbmNvbnN0IGdldFRva2VuTm9kZXMgPSAocGFnZXMpID0+IHtcbiAgICAvLyBnZXQgdG9rZW4gZnJhbWVzXG4gICAgY29uc3QgdG9rZW5GcmFtZXMgPSBnZXRGcmFtZU5vZGVzKHBhZ2VzKTtcbiAgICAvLyBnZXQgYWxsIGNoaWxkcmVuIG9mIHRva2VuIGZyYW1lc1xuICAgIHJldHVybiB0b2tlbkZyYW1lcy5tYXAoZnJhbWUgPT4gZnJhbWVcbiAgICAgICAgLy8gY2hlY2sgaWYgY2hpbGRyZW4gYXJlIG9mIHZhbGlkZSB0eXBlc1xuICAgICAgICAuZmluZEFsbChcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIG5vZGUgPT4gaXNUb2tlbk5vZGUobm9kZSkpKVxuICAgICAgICAvLyBtZXJnZXMgYWxsIGNoaWxkcmVuIGludG8gb25lIGFycmF5XG4gICAgICAgIC5yZWR1Y2UoKGZsYXR0ZW4sIGFycikgPT4gWy4uLmZsYXR0ZW4sIC4uLmFycl0sIFtdKVxuICAgICAgICAvLyB1bnBhY2sgdmFyaWFudHMgJiB3YXJuIGFib3V0IGRlcHJlY2F0ZWQgdHlwZXNcbiAgICAgICAgLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoaXRlbS50eXBlID09PSAnUkVDVEFOR0xFJyB8fCBpdGVtLnR5cGUgPT09ICdGUkFNRScpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignUGxlYXNlIHVzZSBvbmx5IG1haW4gY29tcG9uZW50cyBhbmQgdmFyaWFudHMsIG90aGVyIHR5cGVzIG1heSBiZSBkZXByZWNhdGVkIGFzIHRva2VucyBpbiB0aGUgZnV0dXJlJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdW5wYWNrIHZhcmlhbnRzXG4gICAgICAgIGlmIChpdGVtLnR5cGUgPT09ICdDT01QT05FTlRfU0VUJykge1xuICAgICAgICAgICAgLy8gVE9ETzogTmFtZSBpcyBvdmVyd3JpdGluZyByZWFsIG9iamVjdCBpbiBmaWdtYVxuICAgICAgICAgICAgLy8gLT4gY3JlYXRlIGNsb25lIGFuZCBtb3ZlIHRvIG5ldyBhcnJheSB0byByZXR1cm5cbiAgICAgICAgICAgIHJldHVybiBpdGVtLmNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGV4dHJhY3RUb2tlbk5vZGVWYWx1ZXMoY2hpbGQpKSwgeyBuYW1lOiBnZXRWYXJpYW50TmFtZShpdGVtLm5hbWUsIGNoaWxkLm5hbWUpIH0pKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmV0dXJuIG5vcm1hbCBpdGVtIGFzIGFycmF5IHRvIHVucGFjayBsYXRlclxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJldHVybiBbZXh0cmFjdFRva2VuTm9kZVZhbHVlcyhpdGVtKV07XG4gICAgfSlcbiAgICAgICAgLy8gbWVyZ2VzIHRoZSB2YXJpYW50IGNoaWxkcmVuIGludG8gb25lIGFycmF5XG4gICAgICAgIC5yZWR1Y2UoKGZsYXR0ZW4sIGFycikgPT4gWy4uLmZsYXR0ZW4sIC4uLmFycl0sIFtdKTtcbn07XG5leHBvcnQgZGVmYXVsdCBnZXRUb2tlbk5vZGVzO1xuZXhwb3J0IGNvbnN0IF9fdGVzdGluZyA9IHtcbiAgICBpc1Rva2VuTm9kZTogaXNUb2tlbk5vZGUsXG4gICAgaXNUb2tlbkZyYW1lOiBpc1Rva2VuRnJhbWVcbn07XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCBzZW1WZXJEaWZmZXJlbmNlIGZyb20gJy4vc2VtVmVyRGlmZmVyZW5jZSc7XG5pbXBvcnQgY3VycmVudFZlcnNpb24gZnJvbSAnLi92ZXJzaW9uJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuY29uc3QgZ2V0VmVyc2lvbkRpZmZlcmVuY2UgPSAoZmlnbWEpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIC8vIGdldCB2ZXJzaW9uICYgdmVyc2lvbiBkaWZmZXJlbmNlXG4gICAgY29uc3QgbGFzdFZlcnNpb25TZXR0aW5nc09wZW5lZCA9IHlpZWxkIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoY29uZmlnLmtleS5sYXN0VmVyc2lvblNldHRpbmdzT3BlbmVkKTtcbiAgICBjb25zdCB2ZXJzaW9uRGlmZmVyZW5jZSA9IHNlbVZlckRpZmZlcmVuY2UoY3VycmVudFZlcnNpb24sIGxhc3RWZXJzaW9uU2V0dGluZ3NPcGVuZWQpO1xuICAgIC8vIHVwZGF0ZSB2ZXJzaW9uXG4gICAgaWYgKCFsYXN0VmVyc2lvblNldHRpbmdzT3BlbmVkIHx8IGxhc3RWZXJzaW9uU2V0dGluZ3NPcGVuZWQgIT09IGN1cnJlbnRWZXJzaW9uKSB7XG4gICAgICAgIHlpZWxkIGZpZ21hLmNsaWVudFN0b3JhZ2Uuc2V0QXN5bmMoY29uZmlnLmtleS5sYXN0VmVyc2lvblNldHRpbmdzT3BlbmVkLCBjdXJyZW50VmVyc2lvbik7XG4gICAgfVxuICAgIC8vIHJldHVybiB2ZXJzaW9uIERpZmZlcmVuY2VcbiAgICByZXR1cm4gdmVyc2lvbkRpZmZlcmVuY2U7XG59KTtcbmV4cG9ydCBkZWZhdWx0IGdldFZlcnNpb25EaWZmZXJlbmNlO1xuIiwiaW1wb3J0IGRlZXBNZXJnZSBmcm9tICcuL2RlZXBNZXJnZSc7XG5pbXBvcnQgdHJhbnNmb3JtTmFtZSBmcm9tICcuLi91dGlsaXRpZXMvdHJhbnNmb3JtTmFtZSc7XG4vLyBjcmVhdGUgYSBuZXN0ZWQgb2JqZWN0IHN0cnVjdHVyZSBmcm9tIHRoZSBhcnJheSAoWydzdHlsZScsJ2NvbG9ycycsJ21haW4nLCdyZWQnXSlcbmNvbnN0IG5lc3RlZE9iamVjdEZyb21BcnJheSA9IChhcnJheSwgdmFsdWUpID0+IHtcbiAgICAvLyByZWR1Y2VyXG4gICAgY29uc3QgcmVkdWNlciA9ICh2YWwsIGtleSkgPT4gKHsgW2tleV06IHZhbCB9KTtcbiAgICAvLyByZXR1cm4gcmVkdWNlZCBhcnJheVxuICAgIHJldHVybiBhcnJheS5yZWR1Y2VSaWdodChyZWR1Y2VyLCB2YWx1ZSk7XG59O1xuY29uc3QgZ3JvdXBCeU5hbWUgPSAodG9rZW5BcnJheSwgcmVtb3ZlTmFtZSA9IHRydWUsIG5hbWVDb252ZXJzaW9uID0gJ2RlZmF1bHQnKSA9PiB7XG4gICAgLy8gbmVzdCB0b2tlbnMgaW50byBvYmplY3Qgd2l0aCBoaWVyYWNoeSBkZWZpbmVkIGJ5IG5hbWUgdXNpbmcgL1xuICAgIGNvbnN0IGdyb3VwZWRUb2tlbnMgPSB0b2tlbkFycmF5Lm1hcCh0b2tlbiA9PiB7XG4gICAgICAgIC8vIHNwbGl0IHRva2VuIG5hbWUgaW50byBhcnJheVxuICAgICAgICAvLyByZW1vdmUgbGVhZGluZyBhbmQgZm9sbG93aW5nIHdoaXRlc3BhY2UgZm9yIGV2ZXJ5IGl0ZW1cbiAgICAgICAgLy8gdHJhbnNmb3JtIGl0ZW1zIHRvIGxvd2VyQ2FzZVxuICAgICAgICBjb25zdCBncm91cHNGcm9tTmFtZSA9IHRva2VuLm5hbWUuc3BsaXQoJy8nKS5tYXAoZ3JvdXAgPT4gdHJhbnNmb3JtTmFtZShncm91cCwgbmFtZUNvbnZlcnNpb24pKTtcbiAgICAgICAgLy8gcmVtb3ZlIG5hbWUgaWYgbm90IG90aGVyd2lzZSBzcGVjaWZpZWRcbiAgICAgICAgaWYgKHJlbW92ZU5hbWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0b2tlbi5uYW1lO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJldHVyblxuICAgICAgICByZXR1cm4gbmVzdGVkT2JqZWN0RnJvbUFycmF5KGdyb3Vwc0Zyb21OYW1lLCB0b2tlbik7XG4gICAgfSk7XG4gICAgaWYgKGdyb3VwZWRUb2tlbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyByZXR1cm4gbWVyZ2VkIG9iamVjdCBvZiB0b2tlbnMgZ3JvdXBlZCBieSBuYW1lIGhpZXJhY2h5XG4gICAgICAgIHJldHVybiBncm91cGVkVG9rZW5zLnJlZHVjZSgoYWNjdW11bGF0b3IgPSB7fSwgY3VycmVudFZhbHVlKSA9PiBkZWVwTWVyZ2UoYWNjdW11bGF0b3IsIGN1cnJlbnRWYWx1ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gW107XG59O1xuZXhwb3J0IGRlZmF1bHQgZ3JvdXBCeU5hbWU7XG4iLCIvLyB0aGUgbm9kZSB0eXBlcyB0aGF0IGNhbiBiZSB1c2VkIGZvciB0b2tlbnNcbmNvbnN0IHRva2VuTm9kZVR5cGVzID0gW1xuICAgICdDT01QT05FTlQnLFxuICAgICdDT01QT05FTlRfU0VUJyxcbiAgICAnUkVDVEFOR0xFJyxcbiAgICAnRlJBTUUnXG5dO1xuLyoqXG4gKiBjaGVjayBpZiBhIG5vZGUgaXMgYSB2YWxpZCB0b2tlbiBub2RlIHR5cGVcbiAqIEN1cnJlbnRseTogJ0NPTVBPTkVOVCcsICdGUkFNRSBvciAnUkVDVEFOR0xFJ1xuICogQHBhcmFtIFNjZW5lTm9kZSBub2RlXG4gKi9cbmNvbnN0IGlzVG9rZW5Ob2RlID0gKG5vZGUpID0+IHtcbiAgICByZXR1cm4gbm9kZS5wYXJlbnQudHlwZSAhPT0gJ0NPTVBPTkVOVF9TRVQnICYmIHRva2VuTm9kZVR5cGVzLmluY2x1ZGVzKG5vZGUudHlwZSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgaXNUb2tlbk5vZGU7XG4iLCIvKipcbiAqIElmIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIG51bWJlclxuICogaXQgaXMgcm91bmRlZCB0byAzIGRlY2ltYWwgcG9zaXRpb25zXG4gKiBvdGhlcndpc2UgaXQgaXMgcmV0dXJuZWQgYXMgaXNcbiAqIEBwYXJhbSB2YWx1ZSBudW1iZXJcbiAqIEBwYXJhbSBkZWNpbWFsUGxhY2VzIGludFxuICovXG5jb25zdCByb3VuZFdpdGhEZWNpbWFscyA9ICh2YWx1ZSwgZGVjaW1hbFBsYWNlcyA9IDIpID0+IHtcbiAgICAvLyBleGl0IGlmIHZhbHVlIGlzIHVuZGVmaW5lZFxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gY2hlY2sgZm9yIGNvcnJlY3QgaW5wdXRzXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicgfHwgdHlwZW9mIGRlY2ltYWxQbGFjZXMgIT09ICdudW1iZXInKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwYXJhbWV0ZXJzLCBib3RoIHZhbHVlIFwiJHt2YWx1ZX1cIiAoJHt0eXBlb2YgdmFsdWV9KSBhbmQgZGVjaW1hbFBsYWNlcyBcIiR7ZGVjaW1hbFBsYWNlc31cIiAoJHt0eXBlb2YgZGVjaW1hbFBsYWNlc30pIG11c3QgYmUgb2YgdHlwZSBudW1iZXJgKTtcbiAgICB9XG4gICAgLy8gc2V0IGRlY2ltYWwgcGxhY2VzXG4gICAgY29uc3QgZmFjdG9yT2ZUZW4gPSBNYXRoLnBvdygxMCwgZGVjaW1hbFBsYWNlcyk7XG4gICAgLy8gcm91bmQgcmVzdWx0IGFuZCByZXR1cm5cbiAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIGZhY3Rvck9mVGVuKSAvIGZhY3Rvck9mVGVuO1xufTtcbmV4cG9ydCBkZWZhdWx0IHJvdW5kV2l0aERlY2ltYWxzO1xuIiwiZXhwb3J0IGRlZmF1bHQgKGN1cnJlbnRTZW1WZXIsIHByZXZTZW1WZXJzID0gJzEuMC4wJykgPT4ge1xuICAgIGNvbnN0IFtwTWFqb3IsIHBNaW5vciwgcFBhdGNoXSA9IHByZXZTZW1WZXJzLnNwbGl0KCcuJyk7XG4gICAgY29uc3QgW2NNYWpvciwgY01pbm9yLCBjUGF0Y2hdID0gY3VycmVudFNlbVZlci5zcGxpdCgnLicpO1xuICAgIGlmIChwTWFqb3IgPCBjTWFqb3IpIHtcbiAgICAgICAgcmV0dXJuICdtYWpvcic7XG4gICAgfVxuICAgIGlmIChwTWlub3IgPCBjTWlub3IpIHtcbiAgICAgICAgcmV0dXJuICdtaW5vcic7XG4gICAgfVxuICAgIGlmIChwUGF0Y2ggPCBjUGF0Y2gpIHtcbiAgICAgICAgcmV0dXJuICdwYXRjaCc7XG4gICAgfVxufTtcbiIsImltcG9ydCBzZXR0aW5nc0RlZmF1bHQgZnJvbSAnLi9zZXR0aW5nc0RlZmF1bHQnO1xuY29uc3Qgc2V0dGluZ3NLZXkgPSAnc2V0dGluZ3MnO1xuLyoqXG4gKiBGdW5jdGlvbiBzYW5pdGl6ZXMgYW5kIHByZXBhcmVzIHNldHRpbmdzIHRvIGJlIHN0b3JlZFxuICogQHBhcmFtIG5ld1NldHRpbmdzXG4gKiBAcGFyYW0gY3VycmVudFNldHRpbmdzXG4gKi9cbmNvbnN0IHNldHRpbmdzUHJlcGFyZSA9IChuZXdTZXR0aW5ncywgY3VycmVudFNldHRpbmdzKSA9PiB7XG4gICAgLy8gaW5pdGlhbGl6ZSBvYmplY3RcbiAgICBjb25zdCBtZXJnZWRTZXR0aW5ncyA9IHt9O1xuICAgIC8vIGFkZCBwdWJsaWMgc2V0dGluZ3NcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhzZXR0aW5nc0RlZmF1bHQpKSB7XG4gICAgICAgIC8vIGF2b2lkIGVtcHR5IHZhbHVlc1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlLmRlZmF1bHQgPT09ICdzdHJpbmcnICYmIHZhbHVlLmVtcHR5ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKG5ld1NldHRpbmdzW2tleV0udHJpbSgpID09PSAnJykge1xuICAgICAgICAgICAgICAgIG5ld1NldHRpbmdzW2tleV0gPSBjdXJyZW50U2V0dGluZ3Nba2V5XSB8fCB2YWx1ZS5kZWZhdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHZhbGlkIG5ldyBzZXR0aW5nc1xuICAgICAgICBpZiAodHlwZW9mIG5ld1NldHRpbmdzW2tleV0gPT09IHR5cGVvZiB2YWx1ZS5kZWZhdWx0KSB7XG4gICAgICAgICAgICBtZXJnZWRTZXR0aW5nc1trZXldID0gbmV3U2V0dGluZ3Nba2V5XTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiB2YWxpZCBjdXJyZW50IHNldHRpbmdzXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBjdXJyZW50U2V0dGluZ3Nba2V5XSA9PT0gdHlwZW9mIHZhbHVlLmRlZmF1bHQpIHtcbiAgICAgICAgICAgIG1lcmdlZFNldHRpbmdzW2tleV0gPSBjdXJyZW50U2V0dGluZ3Nba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGlmIGJvdGggbmV3IGFuZCBvbGQgdmFsdWUgZG9uJ3QgZml0LCB1c2UgZGVmYXVsdFxuICAgICAgICAgICAgbWVyZ2VkU2V0dGluZ3Nba2V5XSA9IHZhbHVlLmRlZmF1bHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gcmV0dXJuIG1lcmdlZCBzZXR0aW5ncyBvYmplY3RcbiAgICByZXR1cm4gbWVyZ2VkU2V0dGluZ3M7XG59O1xuLyoqXG4gKiBnZXQgdGhlIGN1cnJlbnQgdXNlcnMgc2V0dGluZ3NcbiAqIGZvciBzZXR0aW5ncyB0aGF0IGFyZSBub3Qgc2V0LCB0aGUgZGVmYXVsdHMgd2lsbCBiZSB1c2VkXG4gKiBAcmV0dXJuIG9iamVjdFxuICovXG5jb25zdCBnZXRTZXR0aW5ncyA9ICgpID0+IHtcbiAgICBsZXQgdXNlclNldHRpbmdzID0gZmlnbWEucm9vdC5nZXRQbHVnaW5EYXRhKHNldHRpbmdzS2V5KTtcbiAgICBpZiAodXNlclNldHRpbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdXNlclNldHRpbmdzID0gSlNPTi5wYXJzZSh1c2VyU2V0dGluZ3MpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdXNlclNldHRpbmdzID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvLyBpbml0IHNldHRpbmdzIG9iamVjdFxuICAgIGNvbnN0IHNldHRpbmdzID0ge307XG4gICAgLy8gZmlsbCB3aXRoIHVzZXIgc2V0dGluZ3Mgb3IgZGVmYXVsdHNcbiAgICBPYmplY3QuZW50cmllcyhzZXR0aW5nc0RlZmF1bHQpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICBpZiAodXNlclNldHRpbmdzICE9PSB1bmRlZmluZWQgJiYgdXNlclNldHRpbmdzW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHNldHRpbmdzW2tleV0gPSB1c2VyU2V0dGluZ3Nba2V5XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2V0dGluZ3Nba2V5XSA9IHZhbHVlLmRlZmF1bHQ7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNldHRpbmdzO1xufTtcbi8qKlxuICogQG5hbWUgc2F2ZVNldHRpbmdzXG4gKiBAZGVzY3JpcHRpb24gc2F2ZSB0aGUgdXNlciBzZXR0aW5ncyB0byB0aGUgXCJjYWNoZVwiXG4gKiBAcGFyYW0ge1VzZXJTZXR0aW5nc30gc2V0dGluZ3NcbiAqL1xuY29uc3Qgc2V0U2V0dGluZ3MgPSAoc2V0dGluZ3MpID0+IHtcbiAgICBzZXR0aW5ncyA9IHNldHRpbmdzUHJlcGFyZShzZXR0aW5ncywgZ2V0U2V0dGluZ3MoKSk7XG4gICAgLy8gc3RvcmUgcHVibGljIHNldHRpbmdzIHRoYXQgc2hvdWxkIGJlIHNoYXJlZCBhY3Jvc3Mgb3JnXG4gICAgZmlnbWEucm9vdC5zZXRQbHVnaW5EYXRhKHNldHRpbmdzS2V5LCBKU09OLnN0cmluZ2lmeShzZXR0aW5ncywgbnVsbCwgMikpO1xufTtcbi8vIGV4cG9ydHNcbmV4cG9ydCB7IHNldHRpbmdzS2V5LCBnZXRTZXR0aW5ncywgc2V0U2V0dGluZ3MgfTtcbmV4cG9ydCBjb25zdCBfX3Rlc3RpbmcgPSB7XG4gICAgc2V0dGluZ3NQcmVwYXJlOiBzZXR0aW5nc1ByZXBhcmVcbn07XG4iLCIvKiBpc3RhbmJ1bCBpZ25vcmUgZmlsZSAqL1xuLy8gc2V0dGluZ3Mgc3RydWN0dXJlICYgZGVmYXVsdCB2YWx1ZXNcbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBmaWxlbmFtZToge1xuICAgICAgICBkZWZhdWx0OiAnZGVzaWduLXRva2VucycsXG4gICAgICAgIGVtcHR5OiBmYWxzZVxuICAgIH0sXG4gICAgbmFtZUNvbnZlcnNpb246IHtcbiAgICAgICAgZGVmYXVsdDogJ2RlZmF1bHQnLFxuICAgICAgICBlbXB0eTogZmFsc2VcbiAgICB9LFxuICAgIGV4Y2x1ZGVQcmVmaXg6IHtcbiAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgZW1wdHk6IGZhbHNlXG4gICAgfSxcbiAgICBwcmVmaXg6IHtcbiAgICAgICAgZGVmYXVsdDogJ18nLFxuICAgICAgICBlbXB0eTogZmFsc2VcbiAgICB9LFxuICAgIHNlcnZlclVybDoge1xuICAgICAgICBkZWZhdWx0OiAnJyxcbiAgICAgICAgZW1wdHk6IHRydWVcbiAgICB9LFxuICAgIGV2ZW50VHlwZToge1xuICAgICAgICBkZWZhdWx0OiAndXBkYXRlLXRva2VucycsXG4gICAgICAgIGVtcHR5OiBmYWxzZVxuICAgIH0sXG4gICAgYWNjZXB0SGVhZGVyOiB7XG4gICAgICAgIGRlZmF1bHQ6ICdhcHBsaWNhdGlvbi92bmQuZ2l0aHViLmV2ZXJlc3QtcHJldmlldytqc29uJyxcbiAgICAgICAgZW1wdHk6IHRydWVcbiAgICB9LFxuICAgIGF1dGhUeXBlOiB7XG4gICAgICAgIGRlZmF1bHQ6ICd0b2tlbicsXG4gICAgICAgIGVtcHR5OiBmYWxzZVxuICAgIH1cbn07XG4iLCJjb25zdCByZXR1cm5PclRocm93ID0gKGNvbnZlcnRlZFN0cmluZywgb3JpZ2luYWxTdHJpbmcsIHN0cmluZ0Nhc2UpID0+IHtcbiAgICAvLyByZXR1cm4gY29udmVydGVkIHN0cmluZyBpZiBzdWNjZXNzZnVsXG4gICAgaWYgKHR5cGVvZiBjb252ZXJ0ZWRTdHJpbmcgPT09ICdzdHJpbmcnICYmIGNvbnZlcnRlZFN0cmluZyAhPT0gJycpIHtcbiAgICAgICAgcmV0dXJuIGNvbnZlcnRlZFN0cmluZztcbiAgICB9XG4gICAgLy8gdGhyb3cgZXJyb3JcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGNvbnZlcnRpbmcgXCIke29yaWdpbmFsU3RyaW5nfVwiIHRvICR7c3RyaW5nQ2FzZX0sIHJlc3VsdGluZyBpbiBcIiR7Y29udmVydGVkU3RyaW5nfVwiYCk7XG59O1xuY29uc3QgdG9DYW1lbENhc2UgPSAoc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgY29udmVydGVkU3RyaW5nID0gc3RyaW5nLnRvTG93ZXJDYXNlKClcbiAgICAgICAgLnJlcGxhY2UoL1snXCJdL2csICcnKVxuICAgICAgICAucmVwbGFjZSgvKFstXyBdKXsxLH0vZywgJyAnKVxuICAgICAgICAucmVwbGFjZSgvXFxXKy9nLCAnICcpXG4gICAgICAgIC50cmltKClcbiAgICAgICAgLnJlcGxhY2UoLyAoLikvZywgZnVuY3Rpb24gKCQxKSB7IHJldHVybiAkMS50b1VwcGVyQ2FzZSgpOyB9KVxuICAgICAgICAucmVwbGFjZSgvIC9nLCAnJyk7XG4gICAgLy8gcmV0dXJuIG9yIHRocm93XG4gICAgcmV0dXJuIHJldHVybk9yVGhyb3coY29udmVydGVkU3RyaW5nLCBzdHJpbmcsICdjYW1lbENhc2UnKTtcbn07XG5jb25zdCB0b0tlYmFiQ2FzZSA9IChzdHJpbmcpID0+IHtcbiAgICBjb25zdCBjb252ZXJ0ZWRTdHJpbmcgPSBzdHJpbmcudG9Mb3dlckNhc2UoKVxuICAgICAgICAucmVwbGFjZSgvWydcIl0vZywgJycpXG4gICAgICAgIC5yZXBsYWNlKC8oWy1fIF0pezEsfS9nLCAnICcpXG4gICAgICAgIC5yZXBsYWNlKC9cXFcrL2csICcgJylcbiAgICAgICAgLnRyaW0oKVxuICAgICAgICAucmVwbGFjZSgvIC9nLCAnLScpO1xuICAgIC8vIHJldHVybiBvciB0aHJvd1xuICAgIHJldHVybiByZXR1cm5PclRocm93KGNvbnZlcnRlZFN0cmluZywgc3RyaW5nLCAna2ViYWJDYXNlJyk7XG59O1xuY29uc3QgdHJhbnNmb3JtTmFtZSA9IChuYW1lLCBuYW1lQ29udmVyc2lvbiA9ICdkZWZhdWx0JykgPT4ge1xuICAgIC8vIGlmIGNhbWVsQ2FzZVxuICAgIGlmIChuYW1lQ29udmVyc2lvbiA9PT0gJ2NhbWVsQ2FzZScpIHtcbiAgICAgICAgcmV0dXJuIHRvQ2FtZWxDYXNlKG5hbWUpO1xuICAgIH1cbiAgICAvLyBpZiBrZWJhYkNhc2VcbiAgICBpZiAobmFtZUNvbnZlcnNpb24gPT09ICdrZWJhYkNhc2UnKSB7XG4gICAgICAgIHJldHVybiB0b0tlYmFiQ2FzZShuYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIG5hbWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG59O1xuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtTmFtZTtcbmV4cG9ydCBjb25zdCBfX3Rlc3RpbmcgPSB7XG4gICAgdG9DYW1lbENhc2U6IHRvQ2FtZWxDYXNlLFxuICAgIHRvS2ViYWJDYXNlOiB0b0tlYmFiQ2FzZVxufTtcbiIsIi8qIGlzdGFuYnVsIGlnbm9yZSBmaWxlICovXG5jb25zdCB2ZXJzaW9uID0gJzQuMC4wJztcbmV4cG9ydCBkZWZhdWx0IHZlcnNpb247XG4iXSwic291cmNlUm9vdCI6IiJ9