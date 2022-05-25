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

/***/ "./node_modules/@ctrl/tinycolor/dist/module/conversion.js":
/*!****************************************************************!*\
  !*** ./node_modules/@ctrl/tinycolor/dist/module/conversion.js ***!
  \****************************************************************/
/*! exports provided: rgbToRgb, rgbToHsl, hslToRgb, rgbToHsv, hsvToRgb, rgbToHex, rgbaToHex, rgbaToArgbHex, convertDecimalToHex, convertHexToDecimal, parseIntFromHex, numberInputToObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgbToRgb", function() { return rgbToRgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgbToHsl", function() { return rgbToHsl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hslToRgb", function() { return hslToRgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgbToHsv", function() { return rgbToHsv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hsvToRgb", function() { return hsvToRgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgbToHex", function() { return rgbToHex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgbaToHex", function() { return rgbaToHex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgbaToArgbHex", function() { return rgbaToArgbHex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertDecimalToHex", function() { return convertDecimalToHex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertHexToDecimal", function() { return convertHexToDecimal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseIntFromHex", function() { return parseIntFromHex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numberInputToObject", function() { return numberInputToObject; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./node_modules/@ctrl/tinycolor/dist/module/util.js");

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>
/**
 * Handle bounds / percentage checking to conform to CSS color spec
 * <http://www.w3.org/TR/css3-color/>
 * *Assumes:* r, g, b in [0, 255] or [0, 1]
 * *Returns:* { r, g, b } in [0, 255]
 */
function rgbToRgb(r, g, b) {
    return {
        r: Object(_util__WEBPACK_IMPORTED_MODULE_0__["bound01"])(r, 255) * 255,
        g: Object(_util__WEBPACK_IMPORTED_MODULE_0__["bound01"])(g, 255) * 255,
        b: Object(_util__WEBPACK_IMPORTED_MODULE_0__["bound01"])(b, 255) * 255,
    };
}
/**
 * Converts an RGB color value to HSL.
 * *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
 * *Returns:* { h, s, l } in [0,1]
 */
function rgbToHsl(r, g, b) {
    r = Object(_util__WEBPACK_IMPORTED_MODULE_0__["bound01"])(r, 255);
    g = Object(_util__WEBPACK_IMPORTED_MODULE_0__["bound01"])(g, 255);
    b = Object(_util__WEBPACK_IMPORTED_MODULE_0__["bound01"])(b, 255);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var s = 0;
    var l = (max + min) / 2;
    if (max === min) {
        s = 0;
        h = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
            default:
                break;
        }
        h /= 6;
    }
    return { h: h, s: s, l: l };
}
function hue2rgb(p, q, t) {
    if (t < 0) {
        t += 1;
    }
    if (t > 1) {
        t -= 1;
    }
    if (t < 1 / 6) {
        return p + (q - p) * (6 * t);
    }
    if (t < 1 / 2) {
        return q;
    }
    if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
}
/**
 * Converts an HSL color value to RGB.
 *
 * *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
 * *Returns:* { r, g, b } in the set [0, 255]
 */
function hslToRgb(h, s, l) {
    var r;
    var g;
    var b;
    h = Object(_util__WEBPACK_IMPORTED_MODULE_0__["bound01"])(h, 360);
    s = Object(_util__WEBPACK_IMPORTED_MODULE_0__["bound01"])(s, 100);
    l = Object(_util__WEBPACK_IMPORTED_MODULE_0__["bound01"])(l, 100);
    if (s === 0) {
        // achromatic
        g = l;
        b = l;
        r = l;
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: r * 255, g: g * 255, b: b * 255 };
}
/**
 * Converts an RGB color value to HSV
 *
 * *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
 * *Returns:* { h, s, v } in [0,1]
 */
function rgbToHsv(r, g, b) {
    r = Object(_util__WEBPACK_IMPORTED_MODULE_0__["bound01"])(r, 255);
    g = Object(_util__WEBPACK_IMPORTED_MODULE_0__["bound01"])(g, 255);
    b = Object(_util__WEBPACK_IMPORTED_MODULE_0__["bound01"])(b, 255);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var v = max;
    var d = max - min;
    var s = max === 0 ? 0 : d / max;
    if (max === min) {
        h = 0; // achromatic
    }
    else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
            default:
                break;
        }
        h /= 6;
    }
    return { h: h, s: s, v: v };
}
/**
 * Converts an HSV color value to RGB.
 *
 * *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
 * *Returns:* { r, g, b } in the set [0, 255]
 */
function hsvToRgb(h, s, v) {
    h = Object(_util__WEBPACK_IMPORTED_MODULE_0__["bound01"])(h, 360) * 6;
    s = Object(_util__WEBPACK_IMPORTED_MODULE_0__["bound01"])(s, 100);
    v = Object(_util__WEBPACK_IMPORTED_MODULE_0__["bound01"])(v, 100);
    var i = Math.floor(h);
    var f = h - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
    var mod = i % 6;
    var r = [v, q, p, p, t, v][mod];
    var g = [t, v, v, q, p, p][mod];
    var b = [p, p, t, v, v, q][mod];
    return { r: r * 255, g: g * 255, b: b * 255 };
}
/**
 * Converts an RGB color to hex
 *
 * Assumes r, g, and b are contained in the set [0, 255]
 * Returns a 3 or 6 character hex
 */
function rgbToHex(r, g, b, allow3Char) {
    var hex = [
        Object(_util__WEBPACK_IMPORTED_MODULE_0__["pad2"])(Math.round(r).toString(16)),
        Object(_util__WEBPACK_IMPORTED_MODULE_0__["pad2"])(Math.round(g).toString(16)),
        Object(_util__WEBPACK_IMPORTED_MODULE_0__["pad2"])(Math.round(b).toString(16)),
    ];
    // Return a 3 character hex if possible
    if (allow3Char &&
        hex[0].startsWith(hex[0].charAt(1)) &&
        hex[1].startsWith(hex[1].charAt(1)) &&
        hex[2].startsWith(hex[2].charAt(1))) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }
    return hex.join('');
}
/**
 * Converts an RGBA color plus alpha transparency to hex
 *
 * Assumes r, g, b are contained in the set [0, 255] and
 * a in [0, 1]. Returns a 4 or 8 character rgba hex
 */
// eslint-disable-next-line max-params
function rgbaToHex(r, g, b, a, allow4Char) {
    var hex = [
        Object(_util__WEBPACK_IMPORTED_MODULE_0__["pad2"])(Math.round(r).toString(16)),
        Object(_util__WEBPACK_IMPORTED_MODULE_0__["pad2"])(Math.round(g).toString(16)),
        Object(_util__WEBPACK_IMPORTED_MODULE_0__["pad2"])(Math.round(b).toString(16)),
        Object(_util__WEBPACK_IMPORTED_MODULE_0__["pad2"])(convertDecimalToHex(a)),
    ];
    // Return a 4 character hex if possible
    if (allow4Char &&
        hex[0].startsWith(hex[0].charAt(1)) &&
        hex[1].startsWith(hex[1].charAt(1)) &&
        hex[2].startsWith(hex[2].charAt(1)) &&
        hex[3].startsWith(hex[3].charAt(1))) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }
    return hex.join('');
}
/**
 * Converts an RGBA color to an ARGB Hex8 string
 * Rarely used, but required for "toFilter()"
 */
function rgbaToArgbHex(r, g, b, a) {
    var hex = [
        Object(_util__WEBPACK_IMPORTED_MODULE_0__["pad2"])(convertDecimalToHex(a)),
        Object(_util__WEBPACK_IMPORTED_MODULE_0__["pad2"])(Math.round(r).toString(16)),
        Object(_util__WEBPACK_IMPORTED_MODULE_0__["pad2"])(Math.round(g).toString(16)),
        Object(_util__WEBPACK_IMPORTED_MODULE_0__["pad2"])(Math.round(b).toString(16)),
    ];
    return hex.join('');
}
/** Converts a decimal to a hex value */
function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
}
/** Converts a hex value to a decimal */
function convertHexToDecimal(h) {
    return parseIntFromHex(h) / 255;
}
/** Parse a base-16 hex value into a base-10 integer */
function parseIntFromHex(val) {
    return parseInt(val, 16);
}
function numberInputToObject(color) {
    return {
        r: color >> 16,
        g: (color & 0xff00) >> 8,
        b: color & 0xff,
    };
}


/***/ }),

/***/ "./node_modules/@ctrl/tinycolor/dist/module/css-color-names.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@ctrl/tinycolor/dist/module/css-color-names.js ***!
  \*********************************************************************/
/*! exports provided: names */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "names", function() { return names; });
// https://github.com/bahamas10/css-color-names/blob/master/css-color-names.json
/**
 * @hidden
 */
var names = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgreen: '#006400',
    darkgrey: '#a9a9a9',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkslategrey: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    goldenrod: '#daa520',
    gold: '#ffd700',
    gray: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    grey: '#808080',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavenderblush: '#fff0f5',
    lavender: '#e6e6fa',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3',
    lightgreen: '#90ee90',
    lightgrey: '#d3d3d3',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370db',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#db7093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    rebeccapurple: '#663399',
    red: '#ff0000',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32',
};


/***/ }),

/***/ "./node_modules/@ctrl/tinycolor/dist/module/format-input.js":
/*!******************************************************************!*\
  !*** ./node_modules/@ctrl/tinycolor/dist/module/format-input.js ***!
  \******************************************************************/
/*! exports provided: inputToRGB, stringInputToObject, isValidCSSUnit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inputToRGB", function() { return inputToRGB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringInputToObject", function() { return stringInputToObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidCSSUnit", function() { return isValidCSSUnit; });
/* harmony import */ var _conversion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./conversion */ "./node_modules/@ctrl/tinycolor/dist/module/conversion.js");
/* harmony import */ var _css_color_names__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css-color-names */ "./node_modules/@ctrl/tinycolor/dist/module/css-color-names.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./node_modules/@ctrl/tinycolor/dist/module/util.js");



/**
 * Given a string or object, convert that input to RGB
 *
 * Possible string inputs:
 * ```
 * "red"
 * "#f00" or "f00"
 * "#ff0000" or "ff0000"
 * "#ff000000" or "ff000000"
 * "rgb 255 0 0" or "rgb (255, 0, 0)"
 * "rgb 1.0 0 0" or "rgb (1, 0, 0)"
 * "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
 * "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
 * "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
 * "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
 * "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
 * ```
 */
function inputToRGB(color) {
    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format = false;
    if (typeof color === 'string') {
        color = stringInputToObject(color);
    }
    if (typeof color === 'object') {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = Object(_conversion__WEBPACK_IMPORTED_MODULE_0__["rgbToRgb"])(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === '%' ? 'prgb' : 'rgb';
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = Object(_util__WEBPACK_IMPORTED_MODULE_2__["convertToPercentage"])(color.s);
            v = Object(_util__WEBPACK_IMPORTED_MODULE_2__["convertToPercentage"])(color.v);
            rgb = Object(_conversion__WEBPACK_IMPORTED_MODULE_0__["hsvToRgb"])(color.h, s, v);
            ok = true;
            format = 'hsv';
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = Object(_util__WEBPACK_IMPORTED_MODULE_2__["convertToPercentage"])(color.s);
            l = Object(_util__WEBPACK_IMPORTED_MODULE_2__["convertToPercentage"])(color.l);
            rgb = Object(_conversion__WEBPACK_IMPORTED_MODULE_0__["hslToRgb"])(color.h, s, l);
            ok = true;
            format = 'hsl';
        }
        if (Object.prototype.hasOwnProperty.call(color, 'a')) {
            a = color.a;
        }
    }
    a = Object(_util__WEBPACK_IMPORTED_MODULE_2__["boundAlpha"])(a);
    return {
        ok: ok,
        format: color.format || format,
        r: Math.min(255, Math.max(rgb.r, 0)),
        g: Math.min(255, Math.max(rgb.g, 0)),
        b: Math.min(255, Math.max(rgb.b, 0)),
        a: a,
    };
}
// <http://www.w3.org/TR/css3-values/#integers>
var CSS_INTEGER = '[-\\+]?\\d+%?';
// <http://www.w3.org/TR/css3-values/#number-value>
var CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?';
// Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
var CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")");
// Actual matching.
// Parentheses and commas are optional, but not required.
// Whitespace can take the place of commas or opening paren
var PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var matchers = {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp('rgb' + PERMISSIVE_MATCH3),
    rgba: new RegExp('rgba' + PERMISSIVE_MATCH4),
    hsl: new RegExp('hsl' + PERMISSIVE_MATCH3),
    hsla: new RegExp('hsla' + PERMISSIVE_MATCH4),
    hsv: new RegExp('hsv' + PERMISSIVE_MATCH3),
    hsva: new RegExp('hsva' + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
};
/**
 * Permissive string parsing.  Take in a number of formats, and output an object
 * based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
 */
function stringInputToObject(color) {
    color = color.trim().toLowerCase();
    if (color.length === 0) {
        return false;
    }
    var named = false;
    if (_css_color_names__WEBPACK_IMPORTED_MODULE_1__["names"][color]) {
        color = _css_color_names__WEBPACK_IMPORTED_MODULE_1__["names"][color];
        named = true;
    }
    else if (color === 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0, format: 'name' };
    }
    // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether the tinycolor is initialized with string or object.
    var match = matchers.rgb.exec(color);
    if (match) {
        return { r: match[1], g: match[2], b: match[3] };
    }
    match = matchers.rgba.exec(color);
    if (match) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    match = matchers.hsl.exec(color);
    if (match) {
        return { h: match[1], s: match[2], l: match[3] };
    }
    match = matchers.hsla.exec(color);
    if (match) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    match = matchers.hsv.exec(color);
    if (match) {
        return { h: match[1], s: match[2], v: match[3] };
    }
    match = matchers.hsva.exec(color);
    if (match) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    match = matchers.hex8.exec(color);
    if (match) {
        return {
            r: Object(_conversion__WEBPACK_IMPORTED_MODULE_0__["parseIntFromHex"])(match[1]),
            g: Object(_conversion__WEBPACK_IMPORTED_MODULE_0__["parseIntFromHex"])(match[2]),
            b: Object(_conversion__WEBPACK_IMPORTED_MODULE_0__["parseIntFromHex"])(match[3]),
            a: Object(_conversion__WEBPACK_IMPORTED_MODULE_0__["convertHexToDecimal"])(match[4]),
            format: named ? 'name' : 'hex8',
        };
    }
    match = matchers.hex6.exec(color);
    if (match) {
        return {
            r: Object(_conversion__WEBPACK_IMPORTED_MODULE_0__["parseIntFromHex"])(match[1]),
            g: Object(_conversion__WEBPACK_IMPORTED_MODULE_0__["parseIntFromHex"])(match[2]),
            b: Object(_conversion__WEBPACK_IMPORTED_MODULE_0__["parseIntFromHex"])(match[3]),
            format: named ? 'name' : 'hex',
        };
    }
    match = matchers.hex4.exec(color);
    if (match) {
        return {
            r: Object(_conversion__WEBPACK_IMPORTED_MODULE_0__["parseIntFromHex"])(match[1] + match[1]),
            g: Object(_conversion__WEBPACK_IMPORTED_MODULE_0__["parseIntFromHex"])(match[2] + match[2]),
            b: Object(_conversion__WEBPACK_IMPORTED_MODULE_0__["parseIntFromHex"])(match[3] + match[3]),
            a: Object(_conversion__WEBPACK_IMPORTED_MODULE_0__["convertHexToDecimal"])(match[4] + match[4]),
            format: named ? 'name' : 'hex8',
        };
    }
    match = matchers.hex3.exec(color);
    if (match) {
        return {
            r: Object(_conversion__WEBPACK_IMPORTED_MODULE_0__["parseIntFromHex"])(match[1] + match[1]),
            g: Object(_conversion__WEBPACK_IMPORTED_MODULE_0__["parseIntFromHex"])(match[2] + match[2]),
            b: Object(_conversion__WEBPACK_IMPORTED_MODULE_0__["parseIntFromHex"])(match[3] + match[3]),
            format: named ? 'name' : 'hex',
        };
    }
    return false;
}
/**
 * Check to see if it looks like a CSS unit
 * (see `matchers` above for definition).
 */
function isValidCSSUnit(color) {
    return Boolean(matchers.CSS_UNIT.exec(String(color)));
}


/***/ }),

/***/ "./node_modules/@ctrl/tinycolor/dist/module/from-ratio.js":
/*!****************************************************************!*\
  !*** ./node_modules/@ctrl/tinycolor/dist/module/from-ratio.js ***!
  \****************************************************************/
/*! exports provided: fromRatio, legacyRandom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRatio", function() { return fromRatio; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "legacyRandom", function() { return legacyRandom; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./node_modules/@ctrl/tinycolor/dist/module/index.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./node_modules/@ctrl/tinycolor/dist/module/util.js");


/**
 * If input is an object, force 1 into "1.0" to handle ratios properly
 * String input requires "1.0" as input, so 1 will be treated as 1
 */
function fromRatio(ratio, opts) {
    var newColor = {
        r: Object(_util__WEBPACK_IMPORTED_MODULE_1__["convertToPercentage"])(ratio.r),
        g: Object(_util__WEBPACK_IMPORTED_MODULE_1__["convertToPercentage"])(ratio.g),
        b: Object(_util__WEBPACK_IMPORTED_MODULE_1__["convertToPercentage"])(ratio.b),
    };
    if (ratio.a !== undefined) {
        newColor.a = Number(ratio.a);
    }
    return new _index__WEBPACK_IMPORTED_MODULE_0__["TinyColor"](newColor, opts);
}
/** old random function */
function legacyRandom() {
    return new _index__WEBPACK_IMPORTED_MODULE_0__["TinyColor"]({
        r: Math.random(),
        g: Math.random(),
        b: Math.random(),
    });
}


/***/ }),

/***/ "./node_modules/@ctrl/tinycolor/dist/module/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/@ctrl/tinycolor/dist/module/index.js ***!
  \***********************************************************/
/*! exports provided: TinyColor, tinycolor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TinyColor", function() { return TinyColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tinycolor", function() { return tinycolor; });
/* harmony import */ var _conversion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./conversion */ "./node_modules/@ctrl/tinycolor/dist/module/conversion.js");
/* harmony import */ var _css_color_names__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css-color-names */ "./node_modules/@ctrl/tinycolor/dist/module/css-color-names.js");
/* harmony import */ var _format_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./format-input */ "./node_modules/@ctrl/tinycolor/dist/module/format-input.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "./node_modules/@ctrl/tinycolor/dist/module/util.js");




var TinyColor = /** @class */ (function () {
    function TinyColor(color, opts) {
        if (color === void 0) { color = ''; }
        if (opts === void 0) { opts = {}; }
        var _a;
        // If input is already a tinycolor, return itself
        if (color instanceof TinyColor) {
            // eslint-disable-next-line no-constructor-return
            return color;
        }
        if (typeof color === 'number') {
            color = Object(_conversion__WEBPACK_IMPORTED_MODULE_0__["numberInputToObject"])(color);
        }
        this.originalInput = color;
        var rgb = Object(_format_input__WEBPACK_IMPORTED_MODULE_2__["inputToRGB"])(color);
        this.originalInput = color;
        this.r = rgb.r;
        this.g = rgb.g;
        this.b = rgb.b;
        this.a = rgb.a;
        this.roundA = Math.round(100 * this.a) / 100;
        this.format = (_a = opts.format) !== null && _a !== void 0 ? _a : rgb.format;
        this.gradientType = opts.gradientType;
        // Don't let the range of [0,255] come back in [0,1].
        // Potentially lose a little bit of precision here, but will fix issues where
        // .5 gets interpreted as half of the total, instead of half of 1
        // If it was supposed to be 128, this was already taken care of by `inputToRgb`
        if (this.r < 1) {
            this.r = Math.round(this.r);
        }
        if (this.g < 1) {
            this.g = Math.round(this.g);
        }
        if (this.b < 1) {
            this.b = Math.round(this.b);
        }
        this.isValid = rgb.ok;
    }
    TinyColor.prototype.isDark = function () {
        return this.getBrightness() < 128;
    };
    TinyColor.prototype.isLight = function () {
        return !this.isDark();
    };
    /**
     * Returns the perceived brightness of the color, from 0-255.
     */
    TinyColor.prototype.getBrightness = function () {
        // http://www.w3.org/TR/AERT#color-contrast
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    };
    /**
     * Returns the perceived luminance of a color, from 0-1.
     */
    TinyColor.prototype.getLuminance = function () {
        // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        var rgb = this.toRgb();
        var R;
        var G;
        var B;
        var RsRGB = rgb.r / 255;
        var GsRGB = rgb.g / 255;
        var BsRGB = rgb.b / 255;
        if (RsRGB <= 0.03928) {
            R = RsRGB / 12.92;
        }
        else {
            // eslint-disable-next-line prefer-exponentiation-operator
            R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
        }
        if (GsRGB <= 0.03928) {
            G = GsRGB / 12.92;
        }
        else {
            // eslint-disable-next-line prefer-exponentiation-operator
            G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
        }
        if (BsRGB <= 0.03928) {
            B = BsRGB / 12.92;
        }
        else {
            // eslint-disable-next-line prefer-exponentiation-operator
            B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
        }
        return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    };
    /**
     * Returns the alpha value of a color, from 0-1.
     */
    TinyColor.prototype.getAlpha = function () {
        return this.a;
    };
    /**
     * Sets the alpha value on the current color.
     *
     * @param alpha - The new alpha value. The accepted range is 0-1.
     */
    TinyColor.prototype.setAlpha = function (alpha) {
        this.a = Object(_util__WEBPACK_IMPORTED_MODULE_3__["boundAlpha"])(alpha);
        this.roundA = Math.round(100 * this.a) / 100;
        return this;
    };
    /**
     * Returns the object as a HSVA object.
     */
    TinyColor.prototype.toHsv = function () {
        var hsv = Object(_conversion__WEBPACK_IMPORTED_MODULE_0__["rgbToHsv"])(this.r, this.g, this.b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a };
    };
    /**
     * Returns the hsva values interpolated into a string with the following format:
     * "hsva(xxx, xxx, xxx, xx)".
     */
    TinyColor.prototype.toHsvString = function () {
        var hsv = Object(_conversion__WEBPACK_IMPORTED_MODULE_0__["rgbToHsv"])(this.r, this.g, this.b);
        var h = Math.round(hsv.h * 360);
        var s = Math.round(hsv.s * 100);
        var v = Math.round(hsv.v * 100);
        return this.a === 1 ? "hsv(".concat(h, ", ").concat(s, "%, ").concat(v, "%)") : "hsva(".concat(h, ", ").concat(s, "%, ").concat(v, "%, ").concat(this.roundA, ")");
    };
    /**
     * Returns the object as a HSLA object.
     */
    TinyColor.prototype.toHsl = function () {
        var hsl = Object(_conversion__WEBPACK_IMPORTED_MODULE_0__["rgbToHsl"])(this.r, this.g, this.b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a };
    };
    /**
     * Returns the hsla values interpolated into a string with the following format:
     * "hsla(xxx, xxx, xxx, xx)".
     */
    TinyColor.prototype.toHslString = function () {
        var hsl = Object(_conversion__WEBPACK_IMPORTED_MODULE_0__["rgbToHsl"])(this.r, this.g, this.b);
        var h = Math.round(hsl.h * 360);
        var s = Math.round(hsl.s * 100);
        var l = Math.round(hsl.l * 100);
        return this.a === 1 ? "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)") : "hsla(".concat(h, ", ").concat(s, "%, ").concat(l, "%, ").concat(this.roundA, ")");
    };
    /**
     * Returns the hex value of the color.
     * @param allow3Char will shorten hex value to 3 char if possible
     */
    TinyColor.prototype.toHex = function (allow3Char) {
        if (allow3Char === void 0) { allow3Char = false; }
        return Object(_conversion__WEBPACK_IMPORTED_MODULE_0__["rgbToHex"])(this.r, this.g, this.b, allow3Char);
    };
    /**
     * Returns the hex value of the color -with a # appened.
     * @param allow3Char will shorten hex value to 3 char if possible
     */
    TinyColor.prototype.toHexString = function (allow3Char) {
        if (allow3Char === void 0) { allow3Char = false; }
        return '#' + this.toHex(allow3Char);
    };
    /**
     * Returns the hex 8 value of the color.
     * @param allow4Char will shorten hex value to 4 char if possible
     */
    TinyColor.prototype.toHex8 = function (allow4Char) {
        if (allow4Char === void 0) { allow4Char = false; }
        return Object(_conversion__WEBPACK_IMPORTED_MODULE_0__["rgbaToHex"])(this.r, this.g, this.b, this.a, allow4Char);
    };
    /**
     * Returns the hex 8 value of the color -with a # appened.
     * @param allow4Char will shorten hex value to 4 char if possible
     */
    TinyColor.prototype.toHex8String = function (allow4Char) {
        if (allow4Char === void 0) { allow4Char = false; }
        return '#' + this.toHex8(allow4Char);
    };
    /**
     * Returns the object as a RGBA object.
     */
    TinyColor.prototype.toRgb = function () {
        return {
            r: Math.round(this.r),
            g: Math.round(this.g),
            b: Math.round(this.b),
            a: this.a,
        };
    };
    /**
     * Returns the RGBA values interpolated into a string with the following format:
     * "RGBA(xxx, xxx, xxx, xx)".
     */
    TinyColor.prototype.toRgbString = function () {
        var r = Math.round(this.r);
        var g = Math.round(this.g);
        var b = Math.round(this.b);
        return this.a === 1 ? "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")") : "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(this.roundA, ")");
    };
    /**
     * Returns the object as a RGBA object.
     */
    TinyColor.prototype.toPercentageRgb = function () {
        var fmt = function (x) { return "".concat(Math.round(Object(_util__WEBPACK_IMPORTED_MODULE_3__["bound01"])(x, 255) * 100), "%"); };
        return {
            r: fmt(this.r),
            g: fmt(this.g),
            b: fmt(this.b),
            a: this.a,
        };
    };
    /**
     * Returns the RGBA relative values interpolated into a string
     */
    TinyColor.prototype.toPercentageRgbString = function () {
        var rnd = function (x) { return Math.round(Object(_util__WEBPACK_IMPORTED_MODULE_3__["bound01"])(x, 255) * 100); };
        return this.a === 1
            ? "rgb(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%)")
            : "rgba(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%, ").concat(this.roundA, ")");
    };
    /**
     * The 'real' name of the color -if there is one.
     */
    TinyColor.prototype.toName = function () {
        if (this.a === 0) {
            return 'transparent';
        }
        if (this.a < 1) {
            return false;
        }
        var hex = '#' + Object(_conversion__WEBPACK_IMPORTED_MODULE_0__["rgbToHex"])(this.r, this.g, this.b, false);
        for (var _i = 0, _a = Object.entries(_css_color_names__WEBPACK_IMPORTED_MODULE_1__["names"]); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (hex === value) {
                return key;
            }
        }
        return false;
    };
    TinyColor.prototype.toString = function (format) {
        var formatSet = Boolean(format);
        format = format !== null && format !== void 0 ? format : this.format;
        var formattedString = false;
        var hasAlpha = this.a < 1 && this.a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format.startsWith('hex') || format === 'name');
        if (needsAlphaFormat) {
            // Special case for "transparent", all other non-alpha formats
            // will return rgba when there is transparency.
            if (format === 'name' && this.a === 0) {
                return this.toName();
            }
            return this.toRgbString();
        }
        if (format === 'rgb') {
            formattedString = this.toRgbString();
        }
        if (format === 'prgb') {
            formattedString = this.toPercentageRgbString();
        }
        if (format === 'hex' || format === 'hex6') {
            formattedString = this.toHexString();
        }
        if (format === 'hex3') {
            formattedString = this.toHexString(true);
        }
        if (format === 'hex4') {
            formattedString = this.toHex8String(true);
        }
        if (format === 'hex8') {
            formattedString = this.toHex8String();
        }
        if (format === 'name') {
            formattedString = this.toName();
        }
        if (format === 'hsl') {
            formattedString = this.toHslString();
        }
        if (format === 'hsv') {
            formattedString = this.toHsvString();
        }
        return formattedString || this.toHexString();
    };
    TinyColor.prototype.toNumber = function () {
        return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
    };
    TinyColor.prototype.clone = function () {
        return new TinyColor(this.toString());
    };
    /**
     * Lighten the color a given amount. Providing 100 will always return white.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.lighten = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.l += amount / 100;
        hsl.l = Object(_util__WEBPACK_IMPORTED_MODULE_3__["clamp01"])(hsl.l);
        return new TinyColor(hsl);
    };
    /**
     * Brighten the color a given amount, from 0 to 100.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.brighten = function (amount) {
        if (amount === void 0) { amount = 10; }
        var rgb = this.toRgb();
        rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
        rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
        rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
        return new TinyColor(rgb);
    };
    /**
     * Darken the color a given amount, from 0 to 100.
     * Providing 100 will always return black.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.darken = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.l -= amount / 100;
        hsl.l = Object(_util__WEBPACK_IMPORTED_MODULE_3__["clamp01"])(hsl.l);
        return new TinyColor(hsl);
    };
    /**
     * Mix the color with pure white, from 0 to 100.
     * Providing 0 will do nothing, providing 100 will always return white.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.tint = function (amount) {
        if (amount === void 0) { amount = 10; }
        return this.mix('white', amount);
    };
    /**
     * Mix the color with pure black, from 0 to 100.
     * Providing 0 will do nothing, providing 100 will always return black.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.shade = function (amount) {
        if (amount === void 0) { amount = 10; }
        return this.mix('black', amount);
    };
    /**
     * Desaturate the color a given amount, from 0 to 100.
     * Providing 100 will is the same as calling greyscale
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.desaturate = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.s -= amount / 100;
        hsl.s = Object(_util__WEBPACK_IMPORTED_MODULE_3__["clamp01"])(hsl.s);
        return new TinyColor(hsl);
    };
    /**
     * Saturate the color a given amount, from 0 to 100.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.saturate = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.s += amount / 100;
        hsl.s = Object(_util__WEBPACK_IMPORTED_MODULE_3__["clamp01"])(hsl.s);
        return new TinyColor(hsl);
    };
    /**
     * Completely desaturates a color into greyscale.
     * Same as calling `desaturate(100)`
     */
    TinyColor.prototype.greyscale = function () {
        return this.desaturate(100);
    };
    /**
     * Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
     * Values outside of this range will be wrapped into this range.
     */
    TinyColor.prototype.spin = function (amount) {
        var hsl = this.toHsl();
        var hue = (hsl.h + amount) % 360;
        hsl.h = hue < 0 ? 360 + hue : hue;
        return new TinyColor(hsl);
    };
    /**
     * Mix the current color a given amount with another color, from 0 to 100.
     * 0 means no mixing (return current color).
     */
    TinyColor.prototype.mix = function (color, amount) {
        if (amount === void 0) { amount = 50; }
        var rgb1 = this.toRgb();
        var rgb2 = new TinyColor(color).toRgb();
        var p = amount / 100;
        var rgba = {
            r: (rgb2.r - rgb1.r) * p + rgb1.r,
            g: (rgb2.g - rgb1.g) * p + rgb1.g,
            b: (rgb2.b - rgb1.b) * p + rgb1.b,
            a: (rgb2.a - rgb1.a) * p + rgb1.a,
        };
        return new TinyColor(rgba);
    };
    TinyColor.prototype.analogous = function (results, slices) {
        if (results === void 0) { results = 6; }
        if (slices === void 0) { slices = 30; }
        var hsl = this.toHsl();
        var part = 360 / slices;
        var ret = [this];
        for (hsl.h = (hsl.h - ((part * results) >> 1) + 720) % 360; --results;) {
            hsl.h = (hsl.h + part) % 360;
            ret.push(new TinyColor(hsl));
        }
        return ret;
    };
    /**
     * taken from https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js
     */
    TinyColor.prototype.complement = function () {
        var hsl = this.toHsl();
        hsl.h = (hsl.h + 180) % 360;
        return new TinyColor(hsl);
    };
    TinyColor.prototype.monochromatic = function (results) {
        if (results === void 0) { results = 6; }
        var hsv = this.toHsv();
        var h = hsv.h;
        var s = hsv.s;
        var v = hsv.v;
        var res = [];
        var modification = 1 / results;
        while (results--) {
            res.push(new TinyColor({ h: h, s: s, v: v }));
            v = (v + modification) % 1;
        }
        return res;
    };
    TinyColor.prototype.splitcomplement = function () {
        var hsl = this.toHsl();
        var h = hsl.h;
        return [
            this,
            new TinyColor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }),
            new TinyColor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l }),
        ];
    };
    /**
     * Compute how the color would appear on a background
     */
    TinyColor.prototype.onBackground = function (background) {
        var fg = this.toRgb();
        var bg = new TinyColor(background).toRgb();
        return new TinyColor({
            r: bg.r + (fg.r - bg.r) * fg.a,
            g: bg.g + (fg.g - bg.g) * fg.a,
            b: bg.b + (fg.b - bg.b) * fg.a,
        });
    };
    /**
     * Alias for `polyad(3)`
     */
    TinyColor.prototype.triad = function () {
        return this.polyad(3);
    };
    /**
     * Alias for `polyad(4)`
     */
    TinyColor.prototype.tetrad = function () {
        return this.polyad(4);
    };
    /**
     * Get polyad colors, like (for 1, 2, 3, 4, 5, 6, 7, 8, etc...)
     * monad, dyad, triad, tetrad, pentad, hexad, heptad, octad, etc...
     */
    TinyColor.prototype.polyad = function (n) {
        var hsl = this.toHsl();
        var h = hsl.h;
        var result = [this];
        var increment = 360 / n;
        for (var i = 1; i < n; i++) {
            result.push(new TinyColor({ h: (h + i * increment) % 360, s: hsl.s, l: hsl.l }));
        }
        return result;
    };
    /**
     * compare color vs current color
     */
    TinyColor.prototype.equals = function (color) {
        return this.toRgbString() === new TinyColor(color).toRgbString();
    };
    return TinyColor;
}());

// kept for backwards compatability with v1
function tinycolor(color, opts) {
    if (color === void 0) { color = ''; }
    if (opts === void 0) { opts = {}; }
    return new TinyColor(color, opts);
}


/***/ }),

/***/ "./node_modules/@ctrl/tinycolor/dist/module/interfaces.js":
/*!****************************************************************!*\
  !*** ./node_modules/@ctrl/tinycolor/dist/module/interfaces.js ***!
  \****************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/@ctrl/tinycolor/dist/module/public_api.js":
/*!****************************************************************!*\
  !*** ./node_modules/@ctrl/tinycolor/dist/module/public_api.js ***!
  \****************************************************************/
/*! exports provided: TinyColor, tinycolor, names, readability, isReadable, mostReadable, toMsFilter, fromRatio, legacyRandom, inputToRGB, stringInputToObject, isValidCSSUnit, random, bounds, rgbToRgb, rgbToHsl, hslToRgb, rgbToHsv, hsvToRgb, rgbToHex, rgbaToHex, rgbaToArgbHex, convertDecimalToHex, convertHexToDecimal, parseIntFromHex, numberInputToObject, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./node_modules/@ctrl/tinycolor/dist/module/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TinyColor", function() { return _index__WEBPACK_IMPORTED_MODULE_0__["TinyColor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tinycolor", function() { return _index__WEBPACK_IMPORTED_MODULE_0__["tinycolor"]; });

/* harmony import */ var _css_color_names__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css-color-names */ "./node_modules/@ctrl/tinycolor/dist/module/css-color-names.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "names", function() { return _css_color_names__WEBPACK_IMPORTED_MODULE_1__["names"]; });

/* harmony import */ var _readability__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./readability */ "./node_modules/@ctrl/tinycolor/dist/module/readability.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "readability", function() { return _readability__WEBPACK_IMPORTED_MODULE_2__["readability"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isReadable", function() { return _readability__WEBPACK_IMPORTED_MODULE_2__["isReadable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mostReadable", function() { return _readability__WEBPACK_IMPORTED_MODULE_2__["mostReadable"]; });

/* harmony import */ var _to_ms_filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./to-ms-filter */ "./node_modules/@ctrl/tinycolor/dist/module/to-ms-filter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toMsFilter", function() { return _to_ms_filter__WEBPACK_IMPORTED_MODULE_3__["toMsFilter"]; });

/* harmony import */ var _from_ratio__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./from-ratio */ "./node_modules/@ctrl/tinycolor/dist/module/from-ratio.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fromRatio", function() { return _from_ratio__WEBPACK_IMPORTED_MODULE_4__["fromRatio"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "legacyRandom", function() { return _from_ratio__WEBPACK_IMPORTED_MODULE_4__["legacyRandom"]; });

/* harmony import */ var _format_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./format-input */ "./node_modules/@ctrl/tinycolor/dist/module/format-input.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "inputToRGB", function() { return _format_input__WEBPACK_IMPORTED_MODULE_5__["inputToRGB"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stringInputToObject", function() { return _format_input__WEBPACK_IMPORTED_MODULE_5__["stringInputToObject"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isValidCSSUnit", function() { return _format_input__WEBPACK_IMPORTED_MODULE_5__["isValidCSSUnit"]; });

/* harmony import */ var _random__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./random */ "./node_modules/@ctrl/tinycolor/dist/module/random.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "random", function() { return _random__WEBPACK_IMPORTED_MODULE_6__["random"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bounds", function() { return _random__WEBPACK_IMPORTED_MODULE_6__["bounds"]; });

/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./interfaces */ "./node_modules/@ctrl/tinycolor/dist/module/interfaces.js");
/* empty/unused harmony star reexport *//* harmony import */ var _conversion__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./conversion */ "./node_modules/@ctrl/tinycolor/dist/module/conversion.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rgbToRgb", function() { return _conversion__WEBPACK_IMPORTED_MODULE_8__["rgbToRgb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rgbToHsl", function() { return _conversion__WEBPACK_IMPORTED_MODULE_8__["rgbToHsl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hslToRgb", function() { return _conversion__WEBPACK_IMPORTED_MODULE_8__["hslToRgb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rgbToHsv", function() { return _conversion__WEBPACK_IMPORTED_MODULE_8__["rgbToHsv"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hsvToRgb", function() { return _conversion__WEBPACK_IMPORTED_MODULE_8__["hsvToRgb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rgbToHex", function() { return _conversion__WEBPACK_IMPORTED_MODULE_8__["rgbToHex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rgbaToHex", function() { return _conversion__WEBPACK_IMPORTED_MODULE_8__["rgbaToHex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rgbaToArgbHex", function() { return _conversion__WEBPACK_IMPORTED_MODULE_8__["rgbaToArgbHex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "convertDecimalToHex", function() { return _conversion__WEBPACK_IMPORTED_MODULE_8__["convertDecimalToHex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "convertHexToDecimal", function() { return _conversion__WEBPACK_IMPORTED_MODULE_8__["convertHexToDecimal"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseIntFromHex", function() { return _conversion__WEBPACK_IMPORTED_MODULE_8__["parseIntFromHex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "numberInputToObject", function() { return _conversion__WEBPACK_IMPORTED_MODULE_8__["numberInputToObject"]; });











// kept for backwards compatability with v1
/* harmony default export */ __webpack_exports__["default"] = (_index__WEBPACK_IMPORTED_MODULE_0__["tinycolor"]);


/***/ }),

/***/ "./node_modules/@ctrl/tinycolor/dist/module/random.js":
/*!************************************************************!*\
  !*** ./node_modules/@ctrl/tinycolor/dist/module/random.js ***!
  \************************************************************/
/*! exports provided: random, bounds */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bounds", function() { return bounds; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./node_modules/@ctrl/tinycolor/dist/module/index.js");
// randomColor by David Merfield under the CC0 license
// https://github.com/davidmerfield/randomColor/

function random(options) {
    if (options === void 0) { options = {}; }
    // Check if we need to generate multiple colors
    if (options.count !== undefined &&
        options.count !== null) {
        var totalColors = options.count;
        var colors = [];
        options.count = undefined;
        while (totalColors > colors.length) {
            // Since we're generating multiple colors,
            // incremement the seed. Otherwise we'd just
            // generate the same color each time...
            options.count = null;
            if (options.seed) {
                options.seed += 1;
            }
            colors.push(random(options));
        }
        options.count = totalColors;
        return colors;
    }
    // First we pick a hue (H)
    var h = pickHue(options.hue, options.seed);
    // Then use H to determine saturation (S)
    var s = pickSaturation(h, options);
    // Then use S and H to determine brightness (B).
    var v = pickBrightness(h, s, options);
    var res = { h: h, s: s, v: v };
    if (options.alpha !== undefined) {
        res.a = options.alpha;
    }
    // Then we return the HSB color in the desired format
    return new _index__WEBPACK_IMPORTED_MODULE_0__["TinyColor"](res);
}
function pickHue(hue, seed) {
    var hueRange = getHueRange(hue);
    var res = randomWithin(hueRange, seed);
    // Instead of storing red as two seperate ranges,
    // we group them, using negative numbers
    if (res < 0) {
        res = 360 + res;
    }
    return res;
}
function pickSaturation(hue, options) {
    if (options.hue === 'monochrome') {
        return 0;
    }
    if (options.luminosity === 'random') {
        return randomWithin([0, 100], options.seed);
    }
    var saturationRange = getColorInfo(hue).saturationRange;
    var sMin = saturationRange[0];
    var sMax = saturationRange[1];
    switch (options.luminosity) {
        case 'bright':
            sMin = 55;
            break;
        case 'dark':
            sMin = sMax - 10;
            break;
        case 'light':
            sMax = 55;
            break;
        default:
            break;
    }
    return randomWithin([sMin, sMax], options.seed);
}
function pickBrightness(H, S, options) {
    var bMin = getMinimumBrightness(H, S);
    var bMax = 100;
    switch (options.luminosity) {
        case 'dark':
            bMax = bMin + 20;
            break;
        case 'light':
            bMin = (bMax + bMin) / 2;
            break;
        case 'random':
            bMin = 0;
            bMax = 100;
            break;
        default:
            break;
    }
    return randomWithin([bMin, bMax], options.seed);
}
function getMinimumBrightness(H, S) {
    var lowerBounds = getColorInfo(H).lowerBounds;
    for (var i = 0; i < lowerBounds.length - 1; i++) {
        var s1 = lowerBounds[i][0];
        var v1 = lowerBounds[i][1];
        var s2 = lowerBounds[i + 1][0];
        var v2 = lowerBounds[i + 1][1];
        if (S >= s1 && S <= s2) {
            var m = (v2 - v1) / (s2 - s1);
            var b = v1 - m * s1;
            return m * S + b;
        }
    }
    return 0;
}
function getHueRange(colorInput) {
    var num = parseInt(colorInput, 10);
    if (!Number.isNaN(num) && num < 360 && num > 0) {
        return [num, num];
    }
    if (typeof colorInput === 'string') {
        var namedColor = bounds.find(function (n) { return n.name === colorInput; });
        if (namedColor) {
            var color = defineColor(namedColor);
            if (color.hueRange) {
                return color.hueRange;
            }
        }
        var parsed = new _index__WEBPACK_IMPORTED_MODULE_0__["TinyColor"](colorInput);
        if (parsed.isValid) {
            var hue = parsed.toHsv().h;
            return [hue, hue];
        }
    }
    return [0, 360];
}
function getColorInfo(hue) {
    // Maps red colors to make picking hue easier
    if (hue >= 334 && hue <= 360) {
        hue -= 360;
    }
    for (var _i = 0, bounds_1 = bounds; _i < bounds_1.length; _i++) {
        var bound = bounds_1[_i];
        var color = defineColor(bound);
        if (color.hueRange && hue >= color.hueRange[0] && hue <= color.hueRange[1]) {
            return color;
        }
    }
    throw Error('Color not found');
}
function randomWithin(range, seed) {
    if (seed === undefined) {
        return Math.floor(range[0] + Math.random() * (range[1] + 1 - range[0]));
    }
    // Seeded random algorithm from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
    var max = range[1] || 1;
    var min = range[0] || 0;
    seed = (seed * 9301 + 49297) % 233280;
    var rnd = seed / 233280.0;
    return Math.floor(min + rnd * (max - min));
}
function defineColor(bound) {
    var sMin = bound.lowerBounds[0][0];
    var sMax = bound.lowerBounds[bound.lowerBounds.length - 1][0];
    var bMin = bound.lowerBounds[bound.lowerBounds.length - 1][1];
    var bMax = bound.lowerBounds[0][1];
    return {
        name: bound.name,
        hueRange: bound.hueRange,
        lowerBounds: bound.lowerBounds,
        saturationRange: [sMin, sMax],
        brightnessRange: [bMin, bMax],
    };
}
/**
 * @hidden
 */
var bounds = [
    {
        name: 'monochrome',
        hueRange: null,
        lowerBounds: [
            [0, 0],
            [100, 0],
        ],
    },
    {
        name: 'red',
        hueRange: [-26, 18],
        lowerBounds: [
            [20, 100],
            [30, 92],
            [40, 89],
            [50, 85],
            [60, 78],
            [70, 70],
            [80, 60],
            [90, 55],
            [100, 50],
        ],
    },
    {
        name: 'orange',
        hueRange: [19, 46],
        lowerBounds: [
            [20, 100],
            [30, 93],
            [40, 88],
            [50, 86],
            [60, 85],
            [70, 70],
            [100, 70],
        ],
    },
    {
        name: 'yellow',
        hueRange: [47, 62],
        lowerBounds: [
            [25, 100],
            [40, 94],
            [50, 89],
            [60, 86],
            [70, 84],
            [80, 82],
            [90, 80],
            [100, 75],
        ],
    },
    {
        name: 'green',
        hueRange: [63, 178],
        lowerBounds: [
            [30, 100],
            [40, 90],
            [50, 85],
            [60, 81],
            [70, 74],
            [80, 64],
            [90, 50],
            [100, 40],
        ],
    },
    {
        name: 'blue',
        hueRange: [179, 257],
        lowerBounds: [
            [20, 100],
            [30, 86],
            [40, 80],
            [50, 74],
            [60, 60],
            [70, 52],
            [80, 44],
            [90, 39],
            [100, 35],
        ],
    },
    {
        name: 'purple',
        hueRange: [258, 282],
        lowerBounds: [
            [20, 100],
            [30, 87],
            [40, 79],
            [50, 70],
            [60, 65],
            [70, 59],
            [80, 52],
            [90, 45],
            [100, 42],
        ],
    },
    {
        name: 'pink',
        hueRange: [283, 334],
        lowerBounds: [
            [20, 100],
            [30, 90],
            [40, 86],
            [60, 84],
            [80, 80],
            [90, 75],
            [100, 73],
        ],
    },
];


/***/ }),

/***/ "./node_modules/@ctrl/tinycolor/dist/module/readability.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@ctrl/tinycolor/dist/module/readability.js ***!
  \*****************************************************************/
/*! exports provided: readability, isReadable, mostReadable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readability", function() { return readability; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isReadable", function() { return isReadable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mostReadable", function() { return mostReadable; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./node_modules/@ctrl/tinycolor/dist/module/index.js");

// Readability Functions
// ---------------------
// <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)
/**
 * AKA `contrast`
 *
 * Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
 */
function readability(color1, color2) {
    var c1 = new _index__WEBPACK_IMPORTED_MODULE_0__["TinyColor"](color1);
    var c2 = new _index__WEBPACK_IMPORTED_MODULE_0__["TinyColor"](color2);
    return ((Math.max(c1.getLuminance(), c2.getLuminance()) + 0.05) /
        (Math.min(c1.getLuminance(), c2.getLuminance()) + 0.05));
}
/**
 * Ensure that foreground and background color combinations meet WCAG2 guidelines.
 * The third argument is an object.
 *      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
 *      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
 * If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.
 *
 * Example
 * ```ts
 * new TinyColor().isReadable('#000', '#111') => false
 * new TinyColor().isReadable('#000', '#111', { level: 'AA', size: 'large' }) => false
 * ```
 */
function isReadable(color1, color2, wcag2) {
    var _a, _b;
    if (wcag2 === void 0) { wcag2 = { level: 'AA', size: 'small' }; }
    var readabilityLevel = readability(color1, color2);
    switch (((_a = wcag2.level) !== null && _a !== void 0 ? _a : 'AA') + ((_b = wcag2.size) !== null && _b !== void 0 ? _b : 'small')) {
        case 'AAsmall':
        case 'AAAlarge':
            return readabilityLevel >= 4.5;
        case 'AAlarge':
            return readabilityLevel >= 3;
        case 'AAAsmall':
            return readabilityLevel >= 7;
        default:
            return false;
    }
}
/**
 * Given a base color and a list of possible foreground or background
 * colors for that base, returns the most readable color.
 * Optionally returns Black or White if the most readable color is unreadable.
 *
 * @param baseColor - the base color.
 * @param colorList - array of colors to pick the most readable one from.
 * @param args - and object with extra arguments
 *
 * Example
 * ```ts
 * new TinyColor().mostReadable('#123', ['#124", "#125'], { includeFallbackColors: false }).toHexString(); // "#112255"
 * new TinyColor().mostReadable('#123', ['#124", "#125'],{ includeFallbackColors: true }).toHexString();  // "#ffffff"
 * new TinyColor().mostReadable('#a8015a', ["#faf3f3"], { includeFallbackColors:true, level: 'AAA', size: 'large' }).toHexString(); // "#faf3f3"
 * new TinyColor().mostReadable('#a8015a', ["#faf3f3"], { includeFallbackColors:true, level: 'AAA', size: 'small' }).toHexString(); // "#ffffff"
 * ```
 */
function mostReadable(baseColor, colorList, args) {
    if (args === void 0) { args = { includeFallbackColors: false, level: 'AA', size: 'small' }; }
    var bestColor = null;
    var bestScore = 0;
    var includeFallbackColors = args.includeFallbackColors, level = args.level, size = args.size;
    for (var _i = 0, colorList_1 = colorList; _i < colorList_1.length; _i++) {
        var color = colorList_1[_i];
        var score = readability(baseColor, color);
        if (score > bestScore) {
            bestScore = score;
            bestColor = new _index__WEBPACK_IMPORTED_MODULE_0__["TinyColor"](color);
        }
    }
    if (isReadable(baseColor, bestColor, { level: level, size: size }) || !includeFallbackColors) {
        return bestColor;
    }
    args.includeFallbackColors = false;
    return mostReadable(baseColor, ['#fff', '#000'], args);
}


/***/ }),

/***/ "./node_modules/@ctrl/tinycolor/dist/module/to-ms-filter.js":
/*!******************************************************************!*\
  !*** ./node_modules/@ctrl/tinycolor/dist/module/to-ms-filter.js ***!
  \******************************************************************/
/*! exports provided: toMsFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toMsFilter", function() { return toMsFilter; });
/* harmony import */ var _conversion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./conversion */ "./node_modules/@ctrl/tinycolor/dist/module/conversion.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./node_modules/@ctrl/tinycolor/dist/module/index.js");


/**
 * Returns the color represented as a Microsoft filter for use in old versions of IE.
 */
function toMsFilter(firstColor, secondColor) {
    var color = new _index__WEBPACK_IMPORTED_MODULE_1__["TinyColor"](firstColor);
    var hex8String = '#' + Object(_conversion__WEBPACK_IMPORTED_MODULE_0__["rgbaToArgbHex"])(color.r, color.g, color.b, color.a);
    var secondHex8String = hex8String;
    var gradientType = color.gradientType ? 'GradientType = 1, ' : '';
    if (secondColor) {
        var s = new _index__WEBPACK_IMPORTED_MODULE_1__["TinyColor"](secondColor);
        secondHex8String = '#' + Object(_conversion__WEBPACK_IMPORTED_MODULE_0__["rgbaToArgbHex"])(s.r, s.g, s.b, s.a);
    }
    return "progid:DXImageTransform.Microsoft.gradient(".concat(gradientType, "startColorstr=").concat(hex8String, ",endColorstr=").concat(secondHex8String, ")");
}


/***/ }),

/***/ "./node_modules/@ctrl/tinycolor/dist/module/util.js":
/*!**********************************************************!*\
  !*** ./node_modules/@ctrl/tinycolor/dist/module/util.js ***!
  \**********************************************************/
/*! exports provided: bound01, clamp01, isOnePointZero, isPercentage, boundAlpha, convertToPercentage, pad2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bound01", function() { return bound01; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clamp01", function() { return clamp01; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isOnePointZero", function() { return isOnePointZero; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPercentage", function() { return isPercentage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boundAlpha", function() { return boundAlpha; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertToPercentage", function() { return convertToPercentage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pad2", function() { return pad2; });
/**
 * Take input from [0, n] and return it as [0, 1]
 * @hidden
 */
function bound01(n, max) {
    if (isOnePointZero(n)) {
        n = '100%';
    }
    var isPercent = isPercentage(n);
    n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)));
    // Automatically convert percentage into number
    if (isPercent) {
        n = parseInt(String(n * max), 10) / 100;
    }
    // Handle floating point rounding errors
    if (Math.abs(n - max) < 0.000001) {
        return 1;
    }
    // Convert into [0, 1] range if it isn't already
    if (max === 360) {
        // If n is a hue given in degrees,
        // wrap around out-of-range values into [0, 360] range
        // then convert into [0, 1].
        n = (n < 0 ? (n % max) + max : n % max) / parseFloat(String(max));
    }
    else {
        // If n not a hue given in degrees
        // Convert into [0, 1] range if it isn't already.
        n = (n % max) / parseFloat(String(max));
    }
    return n;
}
/**
 * Force a number between 0 and 1
 * @hidden
 */
function clamp01(val) {
    return Math.min(1, Math.max(0, val));
}
/**
 * Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
 * <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
 * @hidden
 */
function isOnePointZero(n) {
    return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1;
}
/**
 * Check to see if string passed in is a percentage
 * @hidden
 */
function isPercentage(n) {
    return typeof n === 'string' && n.indexOf('%') !== -1;
}
/**
 * Return a valid alpha value [0,1] with all invalid values being set to 1
 * @hidden
 */
function boundAlpha(a) {
    a = parseFloat(a);
    if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
    }
    return a;
}
/**
 * Replace a decimal with it's percentage value
 * @hidden
 */
function convertToPercentage(n) {
    if (n <= 1) {
        return "".concat(Number(n) * 100, "%");
    }
    return n;
}
/**
 * Force a hex value to have 2 characters
 * @hidden
 */
function pad2(c) {
    return c.length === 1 ? '0' + c : String(c);
}


/***/ }),

/***/ "./src/config/commands.ts":
/*!********************************!*\
  !*** ./src/config/commands.ts ***!
  \********************************/
/*! exports provided: commands */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commands", function() { return commands; });
const commands = {
    generalSettings: 'generalSettings',
    export: 'export',
    sendSettings: 'sendSettings',
    urlExport: 'urlExport',
    help: 'help',
    demo: 'demo',
    openUrl: 'openUrl',
    reset: 'reset',
    saveSettings: 'saveSettings',
    closePlugin: 'closePlugin'
};


/***/ }),

/***/ "./src/config/config.ts":
/*!******************************!*\
  !*** ./src/config/config.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* istanbul ignore file */
/* harmony default export */ __webpack_exports__["default"] = ({
    ui: {
        generalSettings: {
            width: 550,
            height: 755
        },
        export: {
            width: 550,
            height: 340
        },
        urlExport: {
            width: 550,
            height: 650
        }
    },
    key: {
        lastVersionSettingsOpened: 'lastVersionSettingsOpened',
        fileId: 'fileId',
        settings: 'settings',
        extensionPluginData: 'org.lukasoppermann.figmaDesignTokens',
        extensionFigmaStyleId: 'styleId',
        extensionAlias: 'alias',
        authType: {
            token: 'token',
            gitlabToken: 'gitlab_token',
            basic: 'Basic',
            bearer: 'Bearer'
        }
    },
    exclusionPrefixDefault: ['_', '.'],
    fileExtensions: [
        {
            label: '.tokens.json',
            value: '.tokens.json'
        },
        {
            label: '.tokens',
            value: '.tokens'
        },
        {
            label: '.json',
            value: '.json'
        }
    ]
});


/***/ }),

/***/ "./src/config/defaultSettings.ts":
/*!***************************************!*\
  !*** ./src/config/defaultSettings.ts ***!
  \***************************************/
/*! exports provided: defaultSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultSettings", function() { return defaultSettings; });
const defaultSettings = {
    filename: 'design-tokens',
    extension: '.tokens.json',
    nameConversion: 'default',
    tokenFormat: 'standard',
    compression: false,
    urlJsonCompression: true,
    serverUrl: undefined,
    eventType: 'update-tokens',
    accessToken: undefined,
    acceptHeader: 'application/vnd.github.everest-preview+json',
    contentType: 'text/plain;charset=UTF-8',
    authType: 'token',
    reference: 'main',
    exclusionPrefix: '',
    alias: 'alias, ref, reference',
    keyInName: false,
    prefixInName: true,
    prefix: {
        color: 'color',
        gradient: 'gradient',
        typography: 'typography',
        font: 'font',
        effect: 'effect',
        grid: 'grid',
        border: 'border, borders',
        breakpoint: 'breakpoint, breakpoints',
        radius: 'radius, radii',
        size: 'size, sizes',
        spacing: 'spacing',
        motion: 'motion'
    },
    exports: {
        color: true,
        gradient: true,
        font: true,
        typography: true,
        effect: true,
        grid: true,
        border: true,
        breakpoint: true,
        radius: true,
        size: true,
        spacing: true,
        motion: true
    }
};


/***/ }),

/***/ "./src/config/tokenTypes.ts":
/*!**********************************!*\
  !*** ./src/config/tokenTypes.ts ***!
  \**********************************/
/*! exports provided: tokenTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tokenTypes", function() { return tokenTypes; });
/* istanbul ignore file */
const tokenTypes = {
    color: {
        label: 'Colors',
        key: 'color'
    },
    gradient: {
        label: 'Gradients',
        key: 'gradient'
    },
    font: {
        label: 'Font Styles',
        key: 'font'
    },
    typography: {
        label: 'Typography',
        key: 'typography',
        exclude: ['original']
    },
    effect: {
        label: 'Effects',
        key: 'effect'
    },
    grid: {
        label: 'Grids',
        key: 'grid'
    },
    border: {
        label: 'Borders',
        key: 'border'
    },
    breakpoint: {
        label: 'Breakpoints',
        key: 'breakpoint'
    },
    radius: {
        label: 'Radii',
        key: 'radius'
    },
    size: {
        label: 'Sizes',
        key: 'size'
    },
    spacing: {
        label: 'Spacing',
        key: 'spacing'
    },
    motion: {
        label: 'Motion',
        key: 'motion'
    }
};


/***/ }),

/***/ "./src/extractor/extractBorders.ts":
/*!*****************************************!*\
  !*** ./src/extractor/extractBorders.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/roundWithDecimals */ "./src/utilities/roundWithDecimals.ts");
/* harmony import */ var _config_tokenTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @config/tokenTypes */ "./src/config/tokenTypes.ts");
/* harmony import */ var _extractUtilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extractUtilities */ "./src/extractor/extractUtilities.ts");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @config/config */ "./src/config/config.ts");




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
const extractBorders = (tokenNodes, prefixArray) => {
    // return as object
    return tokenNodes.filter(Object(_extractUtilities__WEBPACK_IMPORTED_MODULE_2__["filterByPrefix"])(prefixArray))
        // remove nodes with no border property
        .filter(node => node.strokes.length > 0)
        // convert borders
        .map(node => ({
        name: node.name,
        category: 'border',
        exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_1__["tokenTypes"].border.key,
        description: node.description || null,
        values: {
            strokeAlign: {
                value: strokeAligns[node.strokeAlign],
                type: 'string'
            },
            dashPattern: {
                value: [...(node.dashPattern !== undefined && node.dashPattern.length > 0 ? node.dashPattern : [0, 0])],
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
        },
        extensions: {
            [_config_config__WEBPACK_IMPORTED_MODULE_3__["default"].key.extensionPluginData]: {
                exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_1__["tokenTypes"].border.key
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
/* harmony import */ var _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @config/tokenTypes */ "./src/config/tokenTypes.ts");
/* harmony import */ var _utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/roundWithDecimals */ "./src/utilities/roundWithDecimals.ts");
/* harmony import */ var _extractUtilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extractUtilities */ "./src/extractor/extractUtilities.ts");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @config/config */ "./src/config/config.ts");




const extractBreakpoints = (tokenNodes, prefixArray) => {
    // return as object
    return tokenNodes.filter(Object(_extractUtilities__WEBPACK_IMPORTED_MODULE_2__["filterByPrefix"])(prefixArray)).map(node => ({
        name: node.name,
        category: 'breakpoint',
        exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["tokenTypes"].breakpoint.key,
        description: node.description || null,
        values: {
            width: {
                value: Object(_utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__["default"])(node.width, 2),
                unit: 'pixel',
                type: 'number'
            },
            height: {
                value: Object(_utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__["default"])(node.height, 2),
                unit: 'pixel',
                type: 'number'
            }
        },
        extensions: {
            [_config_config__WEBPACK_IMPORTED_MODULE_3__["default"].key.extensionPluginData]: {
                exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["tokenTypes"].breakpoint.key
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
/* harmony import */ var _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @config/tokenTypes */ "./src/config/tokenTypes.ts");
/* harmony import */ var _utilities_convertColor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/convertColor */ "./src/utilities/convertColor.ts");
/* harmony import */ var _utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/roundWithDecimals */ "./src/utilities/roundWithDecimals.ts");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @config/config */ "./src/config/config.ts");




const transparentFill = {
    fill: {
        value: { r: 0, g: 0, b: 0, a: 0 },
        type: 'color'
    }
};
const parseDescription = (description = '', aliasArray) => {
    aliasArray = !aliasArray || aliasArray.filter(i => i).length === 0 ? ['Ref:'] : aliasArray;
    const regex = new RegExp('(' + aliasArray.join('|').toLowerCase() + ')' + ':?\\s');
    // split description in lines
    let alias;
    const descriptionLines = description.split(/\r?\n/)
        // find match
        .filter(line => {
        if (line.toLowerCase().match(regex)) {
            alias = line.toLowerCase().replace(regex, '').trim();
            return false;
        }
        return true;
    });
    // return object
    return {
        alias: alias,
        description: descriptionLines.join('\n')
    };
};
const addAlias = (alias) => alias ? ({ [_config_config__WEBPACK_IMPORTED_MODULE_3__["default"].key.extensionAlias]: alias }) : ({});
const gradientType = {
    GRADIENT_LINEAR: 'linear',
    GRADIENT_RADIAL: 'radial',
    GRADIENT_ANGULAR: 'angular',
    GRADIENT_DIAMOND: 'diamond'
};
const isGradient = (paint) => ['GRADIENT_LINEAR', 'GRADIENT_RADIAL', 'GRADIENT_ANGULAR', 'GRADIENT_DIAMOND'].includes(paint === null || paint === void 0 ? void 0 : paint.type);
const rotationFromMatrix = ([[x1, y1], [x2, y2]]) => {
    // https://stackoverflow.com/questions/24909586/find-rotation-angle-for-affine-transform
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180.0 / Math.PI) + 315;
    return angle > 360 ? angle - 360 : angle;
};
const extractFills = (paint) => {
    if (paint.type === 'SOLID') {
        return {
            fill: {
                value: Object(_utilities_convertColor__WEBPACK_IMPORTED_MODULE_1__["convertPaintToRgba"])(paint),
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
            rotation: {
                // https://stackoverflow.com/questions/24909586/find-rotation-angle-for-affine-transform
                value: rotationFromMatrix(paint.gradientTransform),
                type: 'number',
                unit: 'degree'
            },
            stops: paint.gradientStops.map(stop => ({
                position: {
                    value: Object(_utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_2__["default"])(stop.position),
                    type: 'number'
                },
                color: {
                    value: Object(_utilities_convertColor__WEBPACK_IMPORTED_MODULE_1__["roundRgba"])(stop.color),
                    type: 'color'
                }
            })),
            opacity: {
                value: Object(_utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_2__["default"])(paint.opacity),
                type: 'number'
            }
        };
    }
    // return null if no matching type
    /* istanbul ignore next */
    return null;
};
const extractColors = (tokenNodes, prefixArray) => {
    // get all paint styles
    return tokenNodes
        .reduce((previousValue, node) => {
        // ignore image-only fills
        const paintsAfterImageFilter = node.paints.filter(paint => paint.type !== 'IMAGE');
        if (node.paints.length && paintsAfterImageFilter.length === 0) {
            return previousValue;
        }
        // remove images fills from tokens
        node.paints = paintsAfterImageFilter;
        const { alias, description } = parseDescription(node.description, prefixArray.alias);
        const nodeIsGradient = isGradient(node.paints[0]);
        const values = node.paints.length ? node.paints.map(paint => extractFills(paint)) : [transparentFill];
        return [
            ...previousValue,
            {
                name: `${nodeIsGradient ? prefixArray.gradient[0] : prefixArray.color[0]}/${node.name}`,
                category: nodeIsGradient ? 'gradient' : 'color',
                exportKey: (nodeIsGradient ? _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["tokenTypes"].gradient.key : _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["tokenTypes"].color.key),
                description: description,
                values,
                extensions: {
                    [_config_config__WEBPACK_IMPORTED_MODULE_3__["default"].key.extensionPluginData]: Object.assign({ [_config_config__WEBPACK_IMPORTED_MODULE_3__["default"].key.extensionFigmaStyleId]: node.id, exportKey: (nodeIsGradient ? _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["tokenTypes"].gradient.key : _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["tokenTypes"].color.key) }, (addAlias(alias)))
                }
            }
        ];
    }, []);
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
/* harmony import */ var _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @config/tokenTypes */ "./src/config/tokenTypes.ts");
/* harmony import */ var _utilities_convertColor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/convertColor */ "./src/utilities/convertColor.ts");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @config/config */ "./src/config/config.ts");



const effectType = {
    LAYER_BLUR: 'layerBlur',
    BACKGROUND_BLUR: 'backgroundBlur',
    DROP_SHADOW: 'dropShadow',
    INNER_SHADOW: 'innerShadow'
};
const blurValues = (effect) => ({
    effectType: {
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
    effectType: {
        value: effectType[effect.type],
        type: 'string'
    },
    radius: {
        value: effect.radius,
        unit: 'pixel',
        type: 'number'
    },
    color: {
        value: Object(_utilities_convertColor__WEBPACK_IMPORTED_MODULE_1__["roundRgba"])(effect.color),
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
const extractEffects = (tokenNodes, prefixArray) => {
    // get effect styles
    return tokenNodes
        // remove tokens with no grid
        .filter(node => node.effects.length > 0)
        // build
        .map(node => ({
        name: `${prefixArray[0]}/${node.name}`,
        category: 'effect',
        exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["tokenTypes"].effect.key,
        description: node.description || null,
        values: node.effects.map((effect) => effect.type === 'LAYER_BLUR' || effect.type === 'BACKGROUND_BLUR'
            ? blurValues(effect)
            : shadowValues(effect)),
        extensions: {
            [_config_config__WEBPACK_IMPORTED_MODULE_2__["default"].key.extensionPluginData]: {
                [_config_config__WEBPACK_IMPORTED_MODULE_2__["default"].key.extensionFigmaStyleId]: node.id,
                exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["tokenTypes"].effect.key
            }
        }
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
/* harmony import */ var _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @config/tokenTypes */ "./src/config/tokenTypes.ts");
/* harmony import */ var _utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/roundWithDecimals */ "./src/utilities/roundWithDecimals.ts");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @config/config */ "./src/config/config.ts");



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
    100: 100,
    thin: 100,
    200: 200,
    extralight: 200,
    ultralight: 200,
    extraleicht: 200,
    300: 300,
    light: 300,
    leicht: 300,
    400: 400,
    normal: 400,
    regular: 400,
    buch: 400,
    500: 500,
    medium: 500,
    kraeftig: 500,
    kräftig: 500,
    600: 600,
    semibold: 600,
    demibold: 600,
    halbfett: 600,
    700: 700,
    bold: 700,
    dreiviertelfett: 700,
    800: 800,
    extrabold: 800,
    ultabold: 800,
    fett: 800,
    900: 900,
    black: 900,
    heavy: 900,
    super: 900,
    extrafett: 900
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
    kursiv: 'italic',
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
const extractFonts = (tokenNodes, prefixArray) => {
    // get raw text styles
    return tokenNodes.map(node => ({
        name: `${prefixArray[0]}/${node.name}`,
        category: 'font',
        exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["tokenTypes"].font.key,
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
                value: Object(_utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__["default"])(node.letterSpacing.value),
                unit: (node.letterSpacing.unit.toLowerCase() === 'pixels' ? 'pixel' : node.letterSpacing.unit.toLowerCase()),
                type: 'number'
            },
            lineHeight: {
                // @ts-ignore
                value: Object(_utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__["default"])(node.lineHeight.value) || 'normal',
                unit: node.lineHeight.unit.toLowerCase() === 'pixels' ? 'pixel' : node.lineHeight.unit.toLowerCase(),
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
        },
        extensions: {
            [_config_config__WEBPACK_IMPORTED_MODULE_2__["default"].key.extensionPluginData]: {
                [_config_config__WEBPACK_IMPORTED_MODULE_2__["default"].key.extensionFigmaStyleId]: node.id,
                exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["tokenTypes"].font.key
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
/* harmony import */ var _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @config/tokenTypes */ "./src/config/tokenTypes.ts");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @config/config */ "./src/config/config.ts");


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
const extractGrids = (tokenNodes, prefixArray) => {
    // get grid styles
    return tokenNodes
        // remove tokens with no grid
        .filter(node => node.layoutGrids.length > 0)
        // build
        .map(node => ({
        name: `${prefixArray[0]}/${node.name}`,
        category: 'grid',
        exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["tokenTypes"].grid.key,
        description: node.description || null,
        values: node.layoutGrids.map((grid) => grid.pattern === 'GRID' ? gridValues(grid) : rowColumnValues(grid)),
        extensions: {
            [_config_config__WEBPACK_IMPORTED_MODULE_1__["default"].key.extensionPluginData]: {
                [_config_config__WEBPACK_IMPORTED_MODULE_1__["default"].key.extensionFigmaStyleId]: node.id,
                exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["tokenTypes"].grid.key
            }
        }
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
/* harmony import */ var _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @config/tokenTypes */ "./src/config/tokenTypes.ts");
/* harmony import */ var _extractUtilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extractUtilities */ "./src/extractor/extractUtilities.ts");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @config/config */ "./src/config/config.ts");



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
    if (!('type' in easing) || easings[easing.type] === undefined) {
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
            // @ts-ignore
            value: easings[easing.type].type,
            type: 'string'
        },
        easingFunction: {
            x1: {
                // @ts-ignore
                value: easings[easing.type].easingFunctionCubicBezier.x1,
                type: 'number'
            },
            x2: {
                // @ts-ignore
                value: easings[easing.type].easingFunctionCubicBezier.x2,
                type: 'number'
            },
            y1: {
                // @ts-ignore
                value: easings[easing.type].easingFunctionCubicBezier.y1,
                type: 'number'
            },
            y2: {
                // @ts-ignore
                value: easings[easing.type].easingFunctionCubicBezier.y2,
                type: 'number'
            }
        }
    };
};
const extractMotion = (tokenNodes, prefixArray) => {
    // return as object
    return tokenNodes.filter(Object(_extractUtilities__WEBPACK_IMPORTED_MODULE_1__["filterByPrefix"])(prefixArray))
        // filter to only include items which have a transition property
        .filter(node => {
        var _a;
        if (node.reactions.length > 0 && ((_a = node.reactions[0].action) === null || _a === void 0 ? void 0 : _a.type) === 'NODE' && node.reactions[0].action.transition !== null) {
            return true;
        }
        return false;
    })
        // retrieve values
        .map((node) => ({
        name: node.name,
        category: 'motion',
        exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["tokenTypes"].motion.key,
        description: node.description || null,
        values: Object.assign(Object.assign({ transitionType: {
                value: node.reactions[0].action.transition.type.toLocaleLowerCase(),
                type: 'string'
            }, duration: {
                value: Math.round((node.reactions[0].action.transition.duration + Number.EPSILON) * 1000) / 1000,
                unit: 's',
                type: 'number'
            } }, easing(node.reactions[0].action.transition.easing)), direction(node.reactions[0].action.transition)),
        extensions: {
            [_config_config__WEBPACK_IMPORTED_MODULE_2__["default"].key.extensionPluginData]: {
                exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["tokenTypes"].motion.key
            }
        }
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
/* harmony import */ var _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @config/tokenTypes */ "./src/config/tokenTypes.ts");
/* harmony import */ var _utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/roundWithDecimals */ "./src/utilities/roundWithDecimals.ts");
/* harmony import */ var _extractUtilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extractUtilities */ "./src/extractor/extractUtilities.ts");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @config/config */ "./src/config/config.ts");




const extractRadii = (tokenNodes, prefixArray) => {
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
    return tokenNodes.filter(Object(_extractUtilities__WEBPACK_IMPORTED_MODULE_2__["filterByPrefix"])(prefixArray))
        .map(node => ({
        name: node.name,
        category: 'radius',
        exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["tokenTypes"].radius.key,
        description: node.description || null,
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
                value: Object(_utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__["default"])(node.cornerSmoothing, 2),
                comment: 'Percent as decimal from 0.0 - 1.0',
                type: 'number'
            } }),
        extensions: {
            [_config_config__WEBPACK_IMPORTED_MODULE_3__["default"].key.extensionPluginData]: {
                exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["tokenTypes"].radius.key
            }
        }
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
/* harmony import */ var _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @config/tokenTypes */ "./src/config/tokenTypes.ts");
/* harmony import */ var _utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/roundWithDecimals */ "./src/utilities/roundWithDecimals.ts");
/* harmony import */ var _extractUtilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extractUtilities */ "./src/extractor/extractUtilities.ts");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @config/config */ "./src/config/config.ts");




const extractSizes = (tokenNodes, prefixArray) => {
    // return as object
    return tokenNodes.filter(Object(_extractUtilities__WEBPACK_IMPORTED_MODULE_2__["filterByPrefix"])(prefixArray)).map(node => ({
        name: node.name,
        category: 'size',
        exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["tokenTypes"].size.key,
        description: node.description || null,
        values: {
            width: {
                value: Object(_utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__["default"])(node.width, 2),
                unit: 'pixel',
                type: 'number'
            },
            height: {
                value: Object(_utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__["default"])(node.height, 2),
                unit: 'pixel',
                type: 'number'
            }
        },
        extensions: {
            [_config_config__WEBPACK_IMPORTED_MODULE_3__["default"].key.extensionPluginData]: {
                exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["tokenTypes"].size.key
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
/* harmony import */ var _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @config/tokenTypes */ "./src/config/tokenTypes.ts");
/* harmony import */ var _utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/roundWithDecimals */ "./src/utilities/roundWithDecimals.ts");
/* harmony import */ var _extractUtilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extractUtilities */ "./src/extractor/extractUtilities.ts");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @config/config */ "./src/config/config.ts");




const extractSpacing = (tokenNodes, prefixArray) => {
    // return as object
    return tokenNodes.filter(Object(_extractUtilities__WEBPACK_IMPORTED_MODULE_2__["filterByPrefix"])(prefixArray))
        .map(node => ({
        name: node.name,
        category: 'spacing',
        exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["tokenTypes"].spacing.key,
        description: node.description || null,
        values: {
            top: {
                value: Object(_utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__["default"])(node.paddingTop, 2),
                unit: 'pixel',
                type: 'number'
            },
            right: {
                value: Object(_utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__["default"])(node.paddingRight, 2),
                unit: 'pixel',
                type: 'number'
            },
            bottom: {
                value: Object(_utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__["default"])(node.paddingBottom, 2),
                unit: 'pixel',
                type: 'number'
            },
            left: {
                value: Object(_utilities_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__["default"])(node.paddingLeft, 2),
                unit: 'pixel',
                type: 'number'
            }
        },
        extensions: {
            [_config_config__WEBPACK_IMPORTED_MODULE_3__["default"].key.extensionPluginData]: {
                exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["tokenTypes"].spacing.key
            }
        }
    }));
};
/* harmony default export */ __webpack_exports__["default"] = (extractSpacing);


/***/ }),

/***/ "./src/extractor/extractUtilities.ts":
/*!*******************************************!*\
  !*** ./src/extractor/extractUtilities.ts ***!
  \*******************************************/
/*! exports provided: filterByPrefix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterByPrefix", function() { return filterByPrefix; });
const filterByPrefix = (prefixArray) => node => {
    return prefixArray.includes(node.name.substr(0, node.name.indexOf('/')).replace(/\s+/g, ''));
};


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
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @config/config */ "./src/config/config.ts");
/* harmony import */ var _config_commands__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @config/commands */ "./src/config/commands.ts");
/* harmony import */ var _utilities_getVersionDifference__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utilities/getVersionDifference */ "./src/utilities/getVersionDifference.ts");
/* harmony import */ var _utilities_getFileId__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utilities/getFileId */ "./src/utilities/getFileId.ts");
/* harmony import */ var _utilities_getTokenJson__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utilities/getTokenJson */ "./src/utilities/getTokenJson.ts");
/* harmony import */ var _utilities_stringifyJson__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utilities/stringifyJson */ "./src/utilities/stringifyJson.ts");
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
    themeColors: true,
    visible: false
});
// ---------------------------------
// open UI
if ([_config_commands__WEBPACK_IMPORTED_MODULE_3__["commands"].export, _config_commands__WEBPACK_IMPORTED_MODULE_3__["commands"].urlExport, _config_commands__WEBPACK_IMPORTED_MODULE_3__["commands"].generalSettings].includes(figma.command)) {
    // wrap in function because of async client Storage
    const openUi = () => __awaiter(void 0, void 0, void 0, function* () {
        // Get the user settings
        const userSettings = Object(_utilities_settings__WEBPACK_IMPORTED_MODULE_0__["getSettings"])();
        // get the current version differences to the last time the plugin was opened
        const versionDifference = yield Object(_utilities_getVersionDifference__WEBPACK_IMPORTED_MODULE_4__["default"])(figma);
        // resize UI if needed
        figma.ui.resize(_config_config__WEBPACK_IMPORTED_MODULE_2__["default"].ui[figma.command].width, _config_config__WEBPACK_IMPORTED_MODULE_2__["default"].ui[figma.command].height);
        if (versionDifference !== undefined && versionDifference !== 'patch') {
            figma.ui.resize(_config_config__WEBPACK_IMPORTED_MODULE_2__["default"].ui[figma.command].width, _config_config__WEBPACK_IMPORTED_MODULE_2__["default"].ui[figma.command].height + 60);
        }
        // write tokens to json file
        figma.ui.postMessage({
            command: figma.command,
            payload: {
                settings: Object.assign(Object.assign({}, userSettings), { accessToken: yield Object(_utilities_accessToken__WEBPACK_IMPORTED_MODULE_1__["getAccessToken"])(Object(_utilities_getFileId__WEBPACK_IMPORTED_MODULE_5__["default"])(figma)) }),
                data: Object(_utilities_stringifyJson__WEBPACK_IMPORTED_MODULE_7__["stringifyJson"])(Object(_utilities_getTokenJson__WEBPACK_IMPORTED_MODULE_6__["exportRawTokenArray"])(figma, userSettings)),
                versionDifference: versionDifference,
                metadata: {
                    filename: figma.root.name
                }
            }
        });
        // register the settings UI
        figma.ui.show();
    });
    // run function
    openUi();
}
/**
 * Open Help
 * Open github help page
 */
if (figma.command === _config_commands__WEBPACK_IMPORTED_MODULE_3__["commands"].help) {
    figma.ui.postMessage({
        command: _config_commands__WEBPACK_IMPORTED_MODULE_3__["commands"].help,
        payload: {
            url: 'https://github.com/lukasoppermann/design-tokens'
        }
    });
}
/**
 * Open demo
 */
if (figma.command === _config_commands__WEBPACK_IMPORTED_MODULE_3__["commands"].demo) {
    figma.ui.postMessage({
        command: _config_commands__WEBPACK_IMPORTED_MODULE_3__["commands"].demo,
        payload: {
            url: 'https://www.figma.com/file/2MQ759R5kJtzQn4qSHuqR7/Design-Tokens-for-Figma?node-id=231%3A2'
        }
    });
}
/**
 * Reset settings
 */
if (figma.command === _config_commands__WEBPACK_IMPORTED_MODULE_3__["commands"].reset) {
    Object(_utilities_settings__WEBPACK_IMPORTED_MODULE_0__["resetSettings"])();
    // semd message
    figma.notify('⚙️ Settings have been reset.');
    figma.closePlugin();
}
/**
 * React to messages
 */
figma.ui.onmessage = (message) => __awaiter(void 0, void 0, void 0, function* () {
    const { command, payload } = message;
    /**
     * on closePlugin
     * close plugin and show notification if available
     */
    if (command === _config_commands__WEBPACK_IMPORTED_MODULE_3__["commands"].closePlugin) {
        // show notification if send
        if ((payload === null || payload === void 0 ? void 0 : payload.notification) !== undefined && (payload === null || payload === void 0 ? void 0 : payload.notification) !== '') {
            figma.notify(payload.notification);
        }
        // close plugin
        figma.ui.hide();
        figma.closePlugin();
    }
    /**
     * on saveSettings
     * save settings, access token and close plugin
     */
    if (command === _config_commands__WEBPACK_IMPORTED_MODULE_3__["commands"].saveSettings) {
        // store settings
        Object(_utilities_settings__WEBPACK_IMPORTED_MODULE_0__["setSettings"])(payload.settings);
        // accessToken
        yield Object(_utilities_accessToken__WEBPACK_IMPORTED_MODULE_1__["setAccessToken"])(Object(_utilities_getFileId__WEBPACK_IMPORTED_MODULE_5__["default"])(figma), payload.accessToken);
        // close plugin
        if (payload.closePlugin && payload.closePlugin === true) {
            figma.closePlugin();
        }
    }
});


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
const buildFigmaData = (figma, settings) => {
    // use spread operator because the original is readOnly
    const tokenFrames = Object(_getTokenNodes__WEBPACK_IMPORTED_MODULE_3__["default"])([...figma.root.children]);
    // get user exclusion prefixes
    const userExclusionPrefixes = settings.exclusionPrefix.split(',').map(item => item.replace(/\s+/g, ''));
    // get data from figma
    return {
        tokenFrames: tokenFrames,
        paintStyles: Object(_getPaintStyles__WEBPACK_IMPORTED_MODULE_1__["default"])(figma.getLocalPaintStyles()).filter(item => Object(_filterByNameProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(item, userExclusionPrefixes)),
        gridStyles: Object(_getGridStyles__WEBPACK_IMPORTED_MODULE_2__["default"])(figma.getLocalGridStyles()).filter(item => Object(_filterByNameProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(item, userExclusionPrefixes)),
        textStyles: Object(_getTextStyles__WEBPACK_IMPORTED_MODULE_4__["default"])(figma.getLocalTextStyles()).filter(item => Object(_filterByNameProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(item, userExclusionPrefixes)),
        effectStyles: Object(_getEffectStyles__WEBPACK_IMPORTED_MODULE_5__["default"])(figma.getLocalEffectStyles()).filter(item => Object(_filterByNameProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(item, userExclusionPrefixes))
    };
};
/* harmony default export */ __webpack_exports__["default"] = (buildFigmaData);


/***/ }),

/***/ "./src/utilities/convertColor.ts":
/*!***************************************!*\
  !*** ./src/utilities/convertColor.ts ***!
  \***************************************/
/*! exports provided: roundRgba, convertPaintToRgba, convertRgbaObjectToString, rgbaObjectToHex8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "roundRgba", function() { return roundRgba; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertPaintToRgba", function() { return convertPaintToRgba; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertRgbaObjectToString", function() { return convertRgbaObjectToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgbaObjectToHex8", function() { return rgbaObjectToHex8; });
/* harmony import */ var _roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./roundWithDecimals */ "./src/utilities/roundWithDecimals.ts");
/* harmony import */ var _ctrl_tinycolor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ctrl/tinycolor */ "./node_modules/@ctrl/tinycolor/dist/module/public_api.js");


const roundRgba = (rgba, opacity) => {
    var _a;
    return ({
        r: Object(_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__["default"])(rgba.r * 255, 0),
        g: Object(_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__["default"])(rgba.g * 255, 0),
        b: Object(_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__["default"])(rgba.b * 255, 0),
        a: Object(_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__["default"])((_a = opacity !== null && opacity !== void 0 ? opacity : rgba.a) !== null && _a !== void 0 ? _a : 1)
    });
};
const convertPaintToRgba = (paint) => {
    if (paint.type === 'SOLID' && paint.visible === true) {
        return roundRgba(paint.color, paint.opacity);
    }
    return null;
};
const convertRgbaObjectToString = (rgbaObject) => `rgba(${rgbaObject.r}, ${rgbaObject.g}, ${rgbaObject.b}, ${rgbaObject.a})`;
const rgbaObjectToHex8 = (rgbaObject) => {
    // return value
    return Object(_ctrl_tinycolor__WEBPACK_IMPORTED_MODULE_1__["tinycolor"])(convertRgbaObjectToString(rgbaObject)).toHex8String();
};


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
        .map(paint => Object(_convertColor__WEBPACK_IMPORTED_MODULE_0__["convertPaintToRgba"])(paint))
        .filter(paint => paint != null);
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
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @config/config */ "./src/config/config.ts");

const exclusionPrefix = (exclusionPrefixStrings) => {
    return [
        ..._config_config__WEBPACK_IMPORTED_MODULE_0__["default"].exclusionPrefixDefault,
        ...exclusionPrefixStrings
    ];
};
const filterByPropertyName = (object, exclusionPrefixStrings) => !exclusionPrefix(exclusionPrefixStrings).includes(object.name.trim().substr(0, 1));
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
            id: style.id,
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
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @config/config */ "./src/config/config.ts");

const getFileId = (figma) => {
    let fileId = figma.root.getPluginData(_config_config__WEBPACK_IMPORTED_MODULE_0__["default"].key.fileId);
    // set plugin id if it does not exist
    if (fileId === undefined || fileId === '') {
        figma.root.setPluginData(_config_config__WEBPACK_IMPORTED_MODULE_0__["default"].key.fileId, figma.root.name + ' ' + Math.floor(Math.random() * 1000000000));
        // grab file ID
        fileId = figma.root.getPluginData(_config_config__WEBPACK_IMPORTED_MODULE_0__["default"].key.fileId);
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
            id: style.id,
            description: style.description,
            layoutGrids: style.layoutGrids
        });
    });
    // return array
    return styleArray;
};
/* harmony default export */ __webpack_exports__["default"] = (getGridStyles);


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
            id: style.id,
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
            id: style.id,
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
/*! exports provided: exportRawTokenArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exportRawTokenArray", function() { return exportRawTokenArray; });
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
/* harmony import */ var _buildFigmaData__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./buildFigmaData */ "./src/utilities/buildFigmaData.ts");











const getPrefixArray = (prefixString) => prefixString.split(',').map(item => item.replace(/\s+/g, ''));
const exportRawTokenArray = (figma, settings) => {
    const figmaData = Object(_buildFigmaData__WEBPACK_IMPORTED_MODULE_10__["default"])(figma, settings);
    // get tokens
    return [
        ...Object(_extractor_extractSizes__WEBPACK_IMPORTED_MODULE_5__["default"])(figmaData.tokenFrames, getPrefixArray(settings.prefix.size)),
        ...Object(_extractor_extractBreakpoints__WEBPACK_IMPORTED_MODULE_9__["default"])(figmaData.tokenFrames, getPrefixArray(settings.prefix.breakpoint)),
        ...Object(_extractor_extractSpacing__WEBPACK_IMPORTED_MODULE_6__["default"])(figmaData.tokenFrames, getPrefixArray(settings.prefix.spacing)),
        ...Object(_extractor_extractBorders__WEBPACK_IMPORTED_MODULE_7__["default"])(figmaData.tokenFrames, getPrefixArray(settings.prefix.border)),
        ...Object(_extractor_extractRadii__WEBPACK_IMPORTED_MODULE_8__["default"])(figmaData.tokenFrames, getPrefixArray(settings.prefix.radius)),
        ...Object(_extractor_extractMotion__WEBPACK_IMPORTED_MODULE_4__["default"])(figmaData.tokenFrames, getPrefixArray(settings.prefix.motion)),
        ...Object(_extractor_extractColors__WEBPACK_IMPORTED_MODULE_0__["default"])(figmaData.paintStyles, { color: getPrefixArray(settings.prefix.color), gradient: getPrefixArray(settings.prefix.gradient), alias: getPrefixArray(settings.alias) }),
        ...Object(_extractor_extractGrids__WEBPACK_IMPORTED_MODULE_1__["default"])(figmaData.gridStyles, getPrefixArray(settings.prefix.grid)),
        ...Object(_extractor_extractFonts__WEBPACK_IMPORTED_MODULE_2__["default"])(figmaData.textStyles, getPrefixArray(settings.prefix.font)),
        ...Object(_extractor_extractEffects__WEBPACK_IMPORTED_MODULE_3__["default"])(figmaData.effectStyles, getPrefixArray(settings.prefix.effect))
    ];
};


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
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @config/config */ "./src/config/config.ts");
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
    const lastVersionSettingsOpened = yield figma.clientStorage.getAsync(_config_config__WEBPACK_IMPORTED_MODULE_2__["default"].key.lastVersionSettingsOpened);
    const versionDifference = Object(_semVerDifference__WEBPACK_IMPORTED_MODULE_0__["default"])(_version__WEBPACK_IMPORTED_MODULE_1__["default"], lastVersionSettingsOpened);
    // update version
    if (!lastVersionSettingsOpened || lastVersionSettingsOpened !== _version__WEBPACK_IMPORTED_MODULE_1__["default"]) {
        yield figma.clientStorage.setAsync(_config_config__WEBPACK_IMPORTED_MODULE_2__["default"].key.lastVersionSettingsOpened, _version__WEBPACK_IMPORTED_MODULE_1__["default"]);
    }
    // return version Difference
    return versionDifference;
});
/* harmony default export */ __webpack_exports__["default"] = (getVersionDifference);


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
/*! exports provided: getSettings, setSettings, resetSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSettings", function() { return getSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSettings", function() { return setSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetSettings", function() { return resetSettings; });
/* harmony import */ var _config_defaultSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @config/defaultSettings */ "./src/config/defaultSettings.ts");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @config/config */ "./src/config/config.ts");
/* harmony import */ var _stringifyJson__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringifyJson */ "./src/utilities/stringifyJson.ts");



/**
 * get the current users settings
 * for settings that are not set, the defaults will be used
 * @return object
 */
const getSettings = () => {
    let storedSettings = figma.root.getPluginData(_config_config__WEBPACK_IMPORTED_MODULE_1__["default"].key.settings);
    // return defaults if no settings are present
    if (storedSettings === '') {
        return _config_defaultSettings__WEBPACK_IMPORTED_MODULE_0__["defaultSettings"];
    }
    // parse stored settings
    storedSettings = JSON.parse(storedSettings);
    return Object.fromEntries(Object.entries(_config_defaultSettings__WEBPACK_IMPORTED_MODULE_0__["defaultSettings"]).map(([key, value]) => {
        if (value !== undefined && typeof storedSettings[key] !== typeof value) {
            return [key, _config_defaultSettings__WEBPACK_IMPORTED_MODULE_0__["defaultSettings"][key]];
        }
        return [key, storedSettings[key]];
    }));
};
/**
 * @name saveSettings
 * @description save the user settings to the "cache"
 * @param {UserSettings} settings
 */
const setSettings = (settings) => {
    settings = Object.assign(Object.assign({}, _config_defaultSettings__WEBPACK_IMPORTED_MODULE_0__["defaultSettings"]), settings);
    // store public settings that should be shared across org
    figma.root.setPluginData(_config_config__WEBPACK_IMPORTED_MODULE_1__["default"].key.settings, Object(_stringifyJson__WEBPACK_IMPORTED_MODULE_2__["stringifyJson"])(settings));
};
/**
 * @name resetSettings
 * @description resetSettings the user settings to the "cache"
 */
const resetSettings = () => figma.root.setPluginData(_config_config__WEBPACK_IMPORTED_MODULE_1__["default"].key.settings, Object(_stringifyJson__WEBPACK_IMPORTED_MODULE_2__["stringifyJson"])(_config_defaultSettings__WEBPACK_IMPORTED_MODULE_0__["defaultSettings"]));
// exports



/***/ }),

/***/ "./src/utilities/stringifyJson.ts":
/*!****************************************!*\
  !*** ./src/utilities/stringifyJson.ts ***!
  \****************************************/
/*! exports provided: stringifyJson */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringifyJson", function() { return stringifyJson; });
const stringifyJson = (object, compression = true) => {
    if (compression === true) {
        return JSON.stringify(object);
    }
    // return uncompressed json
    return JSON.stringify(object, null, 2);
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
const version = '6.3.2';
/* harmony default export */ __webpack_exports__["default"] = (version);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BjdHJsL3Rpbnljb2xvci9kaXN0L21vZHVsZS9jb252ZXJzaW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AY3RybC90aW55Y29sb3IvZGlzdC9tb2R1bGUvY3NzLWNvbG9yLW5hbWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AY3RybC90aW55Y29sb3IvZGlzdC9tb2R1bGUvZm9ybWF0LWlucHV0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AY3RybC90aW55Y29sb3IvZGlzdC9tb2R1bGUvZnJvbS1yYXRpby5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGN0cmwvdGlueWNvbG9yL2Rpc3QvbW9kdWxlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AY3RybC90aW55Y29sb3IvZGlzdC9tb2R1bGUvaW50ZXJmYWNlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGN0cmwvdGlueWNvbG9yL2Rpc3QvbW9kdWxlL3B1YmxpY19hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BjdHJsL3Rpbnljb2xvci9kaXN0L21vZHVsZS9yYW5kb20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BjdHJsL3Rpbnljb2xvci9kaXN0L21vZHVsZS9yZWFkYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGN0cmwvdGlueWNvbG9yL2Rpc3QvbW9kdWxlL3RvLW1zLWZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGN0cmwvdGlueWNvbG9yL2Rpc3QvbW9kdWxlL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZy9jb21tYW5kcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL2NvbmZpZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL2RlZmF1bHRTZXR0aW5ncy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL3Rva2VuVHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0Qm9yZGVycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RCcmVha3BvaW50cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RDb2xvcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0RWZmZWN0cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RGb250cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RHcmlkcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RNb3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0UmFkaWkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0U2l6ZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0U3BhY2luZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RVdGlsaXRpZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvYWNjZXNzVG9rZW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9idWlsZEZpZ21hRGF0YS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2NvbnZlcnRDb2xvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2V4dHJhY3RUb2tlbk5vZGVWYWx1ZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9maWx0ZXJCeU5hbWVQcm9wZXJ0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2dldEVmZmVjdFN0eWxlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2dldEZpbGVJZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2dldEdyaWRTdHlsZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9nZXRQYWludFN0eWxlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2dldFRleHRTdHlsZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9nZXRUb2tlbkpzb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9nZXRUb2tlbk5vZGVzLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvZ2V0VmVyc2lvbkRpZmZlcmVuY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9pc1Rva2VuTm9kZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL3JvdW5kV2l0aERlY2ltYWxzLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvc2VtVmVyRGlmZmVyZW5jZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL3NldHRpbmdzLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvc3RyaW5naWZ5SnNvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL3ZlcnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNB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Q1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDMU9BO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3pKQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFrRztBQUN4RDtBQUNl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QUFDUDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDakZBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNYQTtBQUFBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRUFBQzs7Ozs7Ozs7Ozs7OztBQzdDRjtBQUFBO0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM5Q0E7QUFBQTtBQUFBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtB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IjoicGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBib3VuZDAxLCBwYWQyIH0gZnJvbSAnLi91dGlsJztcbi8vIGByZ2JUb0hzbGAsIGByZ2JUb0hzdmAsIGBoc2xUb1JnYmAsIGBoc3ZUb1JnYmAgbW9kaWZpZWQgZnJvbTpcbi8vIDxodHRwOi8vbWppamFja3Nvbi5jb20vMjAwOC8wMi9yZ2ItdG8taHNsLWFuZC1yZ2ItdG8taHN2LWNvbG9yLW1vZGVsLWNvbnZlcnNpb24tYWxnb3JpdGhtcy1pbi1qYXZhc2NyaXB0PlxuLyoqXG4gKiBIYW5kbGUgYm91bmRzIC8gcGVyY2VudGFnZSBjaGVja2luZyB0byBjb25mb3JtIHRvIENTUyBjb2xvciBzcGVjXG4gKiA8aHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1jb2xvci8+XG4gKiAqQXNzdW1lczoqIHIsIGcsIGIgaW4gWzAsIDI1NV0gb3IgWzAsIDFdXG4gKiAqUmV0dXJuczoqIHsgciwgZywgYiB9IGluIFswLCAyNTVdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZ2JUb1JnYihyLCBnLCBiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcjogYm91bmQwMShyLCAyNTUpICogMjU1LFxuICAgICAgICBnOiBib3VuZDAxKGcsIDI1NSkgKiAyNTUsXG4gICAgICAgIGI6IGJvdW5kMDEoYiwgMjU1KSAqIDI1NSxcbiAgICB9O1xufVxuLyoqXG4gKiBDb252ZXJ0cyBhbiBSR0IgY29sb3IgdmFsdWUgdG8gSFNMLlxuICogKkFzc3VtZXM6KiByLCBnLCBhbmQgYiBhcmUgY29udGFpbmVkIGluIFswLCAyNTVdIG9yIFswLCAxXVxuICogKlJldHVybnM6KiB7IGgsIHMsIGwgfSBpbiBbMCwxXVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmdiVG9Ic2wociwgZywgYikge1xuICAgIHIgPSBib3VuZDAxKHIsIDI1NSk7XG4gICAgZyA9IGJvdW5kMDEoZywgMjU1KTtcbiAgICBiID0gYm91bmQwMShiLCAyNTUpO1xuICAgIHZhciBtYXggPSBNYXRoLm1heChyLCBnLCBiKTtcbiAgICB2YXIgbWluID0gTWF0aC5taW4ociwgZywgYik7XG4gICAgdmFyIGggPSAwO1xuICAgIHZhciBzID0gMDtcbiAgICB2YXIgbCA9IChtYXggKyBtaW4pIC8gMjtcbiAgICBpZiAobWF4ID09PSBtaW4pIHtcbiAgICAgICAgcyA9IDA7XG4gICAgICAgIGggPSAwOyAvLyBhY2hyb21hdGljXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgZCA9IG1heCAtIG1pbjtcbiAgICAgICAgcyA9IGwgPiAwLjUgPyBkIC8gKDIgLSBtYXggLSBtaW4pIDogZCAvIChtYXggKyBtaW4pO1xuICAgICAgICBzd2l0Y2ggKG1heCkge1xuICAgICAgICAgICAgY2FzZSByOlxuICAgICAgICAgICAgICAgIGggPSAoZyAtIGIpIC8gZCArIChnIDwgYiA/IDYgOiAwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgZzpcbiAgICAgICAgICAgICAgICBoID0gKGIgLSByKSAvIGQgKyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBiOlxuICAgICAgICAgICAgICAgIGggPSAociAtIGcpIC8gZCArIDQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGggLz0gNjtcbiAgICB9XG4gICAgcmV0dXJuIHsgaDogaCwgczogcywgbDogbCB9O1xufVxuZnVuY3Rpb24gaHVlMnJnYihwLCBxLCB0KSB7XG4gICAgaWYgKHQgPCAwKSB7XG4gICAgICAgIHQgKz0gMTtcbiAgICB9XG4gICAgaWYgKHQgPiAxKSB7XG4gICAgICAgIHQgLT0gMTtcbiAgICB9XG4gICAgaWYgKHQgPCAxIC8gNikge1xuICAgICAgICByZXR1cm4gcCArIChxIC0gcCkgKiAoNiAqIHQpO1xuICAgIH1cbiAgICBpZiAodCA8IDEgLyAyKSB7XG4gICAgICAgIHJldHVybiBxO1xuICAgIH1cbiAgICBpZiAodCA8IDIgLyAzKSB7XG4gICAgICAgIHJldHVybiBwICsgKHEgLSBwKSAqICgyIC8gMyAtIHQpICogNjtcbiAgICB9XG4gICAgcmV0dXJuIHA7XG59XG4vKipcbiAqIENvbnZlcnRzIGFuIEhTTCBjb2xvciB2YWx1ZSB0byBSR0IuXG4gKlxuICogKkFzc3VtZXM6KiBoIGlzIGNvbnRhaW5lZCBpbiBbMCwgMV0gb3IgWzAsIDM2MF0gYW5kIHMgYW5kIGwgYXJlIGNvbnRhaW5lZCBbMCwgMV0gb3IgWzAsIDEwMF1cbiAqICpSZXR1cm5zOiogeyByLCBnLCBiIH0gaW4gdGhlIHNldCBbMCwgMjU1XVxuICovXG5leHBvcnQgZnVuY3Rpb24gaHNsVG9SZ2IoaCwgcywgbCkge1xuICAgIHZhciByO1xuICAgIHZhciBnO1xuICAgIHZhciBiO1xuICAgIGggPSBib3VuZDAxKGgsIDM2MCk7XG4gICAgcyA9IGJvdW5kMDEocywgMTAwKTtcbiAgICBsID0gYm91bmQwMShsLCAxMDApO1xuICAgIGlmIChzID09PSAwKSB7XG4gICAgICAgIC8vIGFjaHJvbWF0aWNcbiAgICAgICAgZyA9IGw7XG4gICAgICAgIGIgPSBsO1xuICAgICAgICByID0gbDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBxID0gbCA8IDAuNSA/IGwgKiAoMSArIHMpIDogbCArIHMgLSBsICogcztcbiAgICAgICAgdmFyIHAgPSAyICogbCAtIHE7XG4gICAgICAgIHIgPSBodWUycmdiKHAsIHEsIGggKyAxIC8gMyk7XG4gICAgICAgIGcgPSBodWUycmdiKHAsIHEsIGgpO1xuICAgICAgICBiID0gaHVlMnJnYihwLCBxLCBoIC0gMSAvIDMpO1xuICAgIH1cbiAgICByZXR1cm4geyByOiByICogMjU1LCBnOiBnICogMjU1LCBiOiBiICogMjU1IH07XG59XG4vKipcbiAqIENvbnZlcnRzIGFuIFJHQiBjb2xvciB2YWx1ZSB0byBIU1ZcbiAqXG4gKiAqQXNzdW1lczoqIHIsIGcsIGFuZCBiIGFyZSBjb250YWluZWQgaW4gdGhlIHNldCBbMCwgMjU1XSBvciBbMCwgMV1cbiAqICpSZXR1cm5zOiogeyBoLCBzLCB2IH0gaW4gWzAsMV1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJnYlRvSHN2KHIsIGcsIGIpIHtcbiAgICByID0gYm91bmQwMShyLCAyNTUpO1xuICAgIGcgPSBib3VuZDAxKGcsIDI1NSk7XG4gICAgYiA9IGJvdW5kMDEoYiwgMjU1KTtcbiAgICB2YXIgbWF4ID0gTWF0aC5tYXgociwgZywgYik7XG4gICAgdmFyIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuICAgIHZhciBoID0gMDtcbiAgICB2YXIgdiA9IG1heDtcbiAgICB2YXIgZCA9IG1heCAtIG1pbjtcbiAgICB2YXIgcyA9IG1heCA9PT0gMCA/IDAgOiBkIC8gbWF4O1xuICAgIGlmIChtYXggPT09IG1pbikge1xuICAgICAgICBoID0gMDsgLy8gYWNocm9tYXRpY1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc3dpdGNoIChtYXgpIHtcbiAgICAgICAgICAgIGNhc2UgcjpcbiAgICAgICAgICAgICAgICBoID0gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGc6XG4gICAgICAgICAgICAgICAgaCA9IChiIC0gcikgLyBkICsgMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYjpcbiAgICAgICAgICAgICAgICBoID0gKHIgLSBnKSAvIGQgKyA0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBoIC89IDY7XG4gICAgfVxuICAgIHJldHVybiB7IGg6IGgsIHM6IHMsIHY6IHYgfTtcbn1cbi8qKlxuICogQ29udmVydHMgYW4gSFNWIGNvbG9yIHZhbHVlIHRvIFJHQi5cbiAqXG4gKiAqQXNzdW1lczoqIGggaXMgY29udGFpbmVkIGluIFswLCAxXSBvciBbMCwgMzYwXSBhbmQgcyBhbmQgdiBhcmUgY29udGFpbmVkIGluIFswLCAxXSBvciBbMCwgMTAwXVxuICogKlJldHVybnM6KiB7IHIsIGcsIGIgfSBpbiB0aGUgc2V0IFswLCAyNTVdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoc3ZUb1JnYihoLCBzLCB2KSB7XG4gICAgaCA9IGJvdW5kMDEoaCwgMzYwKSAqIDY7XG4gICAgcyA9IGJvdW5kMDEocywgMTAwKTtcbiAgICB2ID0gYm91bmQwMSh2LCAxMDApO1xuICAgIHZhciBpID0gTWF0aC5mbG9vcihoKTtcbiAgICB2YXIgZiA9IGggLSBpO1xuICAgIHZhciBwID0gdiAqICgxIC0gcyk7XG4gICAgdmFyIHEgPSB2ICogKDEgLSBmICogcyk7XG4gICAgdmFyIHQgPSB2ICogKDEgLSAoMSAtIGYpICogcyk7XG4gICAgdmFyIG1vZCA9IGkgJSA2O1xuICAgIHZhciByID0gW3YsIHEsIHAsIHAsIHQsIHZdW21vZF07XG4gICAgdmFyIGcgPSBbdCwgdiwgdiwgcSwgcCwgcF1bbW9kXTtcbiAgICB2YXIgYiA9IFtwLCBwLCB0LCB2LCB2LCBxXVttb2RdO1xuICAgIHJldHVybiB7IHI6IHIgKiAyNTUsIGc6IGcgKiAyNTUsIGI6IGIgKiAyNTUgfTtcbn1cbi8qKlxuICogQ29udmVydHMgYW4gUkdCIGNvbG9yIHRvIGhleFxuICpcbiAqIEFzc3VtZXMgciwgZywgYW5kIGIgYXJlIGNvbnRhaW5lZCBpbiB0aGUgc2V0IFswLCAyNTVdXG4gKiBSZXR1cm5zIGEgMyBvciA2IGNoYXJhY3RlciBoZXhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJnYlRvSGV4KHIsIGcsIGIsIGFsbG93M0NoYXIpIHtcbiAgICB2YXIgaGV4ID0gW1xuICAgICAgICBwYWQyKE1hdGgucm91bmQocikudG9TdHJpbmcoMTYpKSxcbiAgICAgICAgcGFkMihNYXRoLnJvdW5kKGcpLnRvU3RyaW5nKDE2KSksXG4gICAgICAgIHBhZDIoTWF0aC5yb3VuZChiKS50b1N0cmluZygxNikpLFxuICAgIF07XG4gICAgLy8gUmV0dXJuIGEgMyBjaGFyYWN0ZXIgaGV4IGlmIHBvc3NpYmxlXG4gICAgaWYgKGFsbG93M0NoYXIgJiZcbiAgICAgICAgaGV4WzBdLnN0YXJ0c1dpdGgoaGV4WzBdLmNoYXJBdCgxKSkgJiZcbiAgICAgICAgaGV4WzFdLnN0YXJ0c1dpdGgoaGV4WzFdLmNoYXJBdCgxKSkgJiZcbiAgICAgICAgaGV4WzJdLnN0YXJ0c1dpdGgoaGV4WzJdLmNoYXJBdCgxKSkpIHtcbiAgICAgICAgcmV0dXJuIGhleFswXS5jaGFyQXQoMCkgKyBoZXhbMV0uY2hhckF0KDApICsgaGV4WzJdLmNoYXJBdCgwKTtcbiAgICB9XG4gICAgcmV0dXJuIGhleC5qb2luKCcnKTtcbn1cbi8qKlxuICogQ29udmVydHMgYW4gUkdCQSBjb2xvciBwbHVzIGFscGhhIHRyYW5zcGFyZW5jeSB0byBoZXhcbiAqXG4gKiBBc3N1bWVzIHIsIGcsIGIgYXJlIGNvbnRhaW5lZCBpbiB0aGUgc2V0IFswLCAyNTVdIGFuZFxuICogYSBpbiBbMCwgMV0uIFJldHVybnMgYSA0IG9yIDggY2hhcmFjdGVyIHJnYmEgaGV4XG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtcGFyYW1zXG5leHBvcnQgZnVuY3Rpb24gcmdiYVRvSGV4KHIsIGcsIGIsIGEsIGFsbG93NENoYXIpIHtcbiAgICB2YXIgaGV4ID0gW1xuICAgICAgICBwYWQyKE1hdGgucm91bmQocikudG9TdHJpbmcoMTYpKSxcbiAgICAgICAgcGFkMihNYXRoLnJvdW5kKGcpLnRvU3RyaW5nKDE2KSksXG4gICAgICAgIHBhZDIoTWF0aC5yb3VuZChiKS50b1N0cmluZygxNikpLFxuICAgICAgICBwYWQyKGNvbnZlcnREZWNpbWFsVG9IZXgoYSkpLFxuICAgIF07XG4gICAgLy8gUmV0dXJuIGEgNCBjaGFyYWN0ZXIgaGV4IGlmIHBvc3NpYmxlXG4gICAgaWYgKGFsbG93NENoYXIgJiZcbiAgICAgICAgaGV4WzBdLnN0YXJ0c1dpdGgoaGV4WzBdLmNoYXJBdCgxKSkgJiZcbiAgICAgICAgaGV4WzFdLnN0YXJ0c1dpdGgoaGV4WzFdLmNoYXJBdCgxKSkgJiZcbiAgICAgICAgaGV4WzJdLnN0YXJ0c1dpdGgoaGV4WzJdLmNoYXJBdCgxKSkgJiZcbiAgICAgICAgaGV4WzNdLnN0YXJ0c1dpdGgoaGV4WzNdLmNoYXJBdCgxKSkpIHtcbiAgICAgICAgcmV0dXJuIGhleFswXS5jaGFyQXQoMCkgKyBoZXhbMV0uY2hhckF0KDApICsgaGV4WzJdLmNoYXJBdCgwKSArIGhleFszXS5jaGFyQXQoMCk7XG4gICAgfVxuICAgIHJldHVybiBoZXguam9pbignJyk7XG59XG4vKipcbiAqIENvbnZlcnRzIGFuIFJHQkEgY29sb3IgdG8gYW4gQVJHQiBIZXg4IHN0cmluZ1xuICogUmFyZWx5IHVzZWQsIGJ1dCByZXF1aXJlZCBmb3IgXCJ0b0ZpbHRlcigpXCJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJnYmFUb0FyZ2JIZXgociwgZywgYiwgYSkge1xuICAgIHZhciBoZXggPSBbXG4gICAgICAgIHBhZDIoY29udmVydERlY2ltYWxUb0hleChhKSksXG4gICAgICAgIHBhZDIoTWF0aC5yb3VuZChyKS50b1N0cmluZygxNikpLFxuICAgICAgICBwYWQyKE1hdGgucm91bmQoZykudG9TdHJpbmcoMTYpKSxcbiAgICAgICAgcGFkMihNYXRoLnJvdW5kKGIpLnRvU3RyaW5nKDE2KSksXG4gICAgXTtcbiAgICByZXR1cm4gaGV4LmpvaW4oJycpO1xufVxuLyoqIENvbnZlcnRzIGEgZGVjaW1hbCB0byBhIGhleCB2YWx1ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnREZWNpbWFsVG9IZXgoZCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHBhcnNlRmxvYXQoZCkgKiAyNTUpLnRvU3RyaW5nKDE2KTtcbn1cbi8qKiBDb252ZXJ0cyBhIGhleCB2YWx1ZSB0byBhIGRlY2ltYWwgKi9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0SGV4VG9EZWNpbWFsKGgpIHtcbiAgICByZXR1cm4gcGFyc2VJbnRGcm9tSGV4KGgpIC8gMjU1O1xufVxuLyoqIFBhcnNlIGEgYmFzZS0xNiBoZXggdmFsdWUgaW50byBhIGJhc2UtMTAgaW50ZWdlciAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlSW50RnJvbUhleCh2YWwpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQodmFsLCAxNik7XG59XG5leHBvcnQgZnVuY3Rpb24gbnVtYmVySW5wdXRUb09iamVjdChjb2xvcikge1xuICAgIHJldHVybiB7XG4gICAgICAgIHI6IGNvbG9yID4+IDE2LFxuICAgICAgICBnOiAoY29sb3IgJiAweGZmMDApID4+IDgsXG4gICAgICAgIGI6IGNvbG9yICYgMHhmZixcbiAgICB9O1xufVxuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL2JhaGFtYXMxMC9jc3MtY29sb3ItbmFtZXMvYmxvYi9tYXN0ZXIvY3NzLWNvbG9yLW5hbWVzLmpzb25cbi8qKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgdmFyIG5hbWVzID0ge1xuICAgIGFsaWNlYmx1ZTogJyNmMGY4ZmYnLFxuICAgIGFudGlxdWV3aGl0ZTogJyNmYWViZDcnLFxuICAgIGFxdWE6ICcjMDBmZmZmJyxcbiAgICBhcXVhbWFyaW5lOiAnIzdmZmZkNCcsXG4gICAgYXp1cmU6ICcjZjBmZmZmJyxcbiAgICBiZWlnZTogJyNmNWY1ZGMnLFxuICAgIGJpc3F1ZTogJyNmZmU0YzQnLFxuICAgIGJsYWNrOiAnIzAwMDAwMCcsXG4gICAgYmxhbmNoZWRhbG1vbmQ6ICcjZmZlYmNkJyxcbiAgICBibHVlOiAnIzAwMDBmZicsXG4gICAgYmx1ZXZpb2xldDogJyM4YTJiZTInLFxuICAgIGJyb3duOiAnI2E1MmEyYScsXG4gICAgYnVybHl3b29kOiAnI2RlYjg4NycsXG4gICAgY2FkZXRibHVlOiAnIzVmOWVhMCcsXG4gICAgY2hhcnRyZXVzZTogJyM3ZmZmMDAnLFxuICAgIGNob2NvbGF0ZTogJyNkMjY5MWUnLFxuICAgIGNvcmFsOiAnI2ZmN2Y1MCcsXG4gICAgY29ybmZsb3dlcmJsdWU6ICcjNjQ5NWVkJyxcbiAgICBjb3Juc2lsazogJyNmZmY4ZGMnLFxuICAgIGNyaW1zb246ICcjZGMxNDNjJyxcbiAgICBjeWFuOiAnIzAwZmZmZicsXG4gICAgZGFya2JsdWU6ICcjMDAwMDhiJyxcbiAgICBkYXJrY3lhbjogJyMwMDhiOGInLFxuICAgIGRhcmtnb2xkZW5yb2Q6ICcjYjg4NjBiJyxcbiAgICBkYXJrZ3JheTogJyNhOWE5YTknLFxuICAgIGRhcmtncmVlbjogJyMwMDY0MDAnLFxuICAgIGRhcmtncmV5OiAnI2E5YTlhOScsXG4gICAgZGFya2toYWtpOiAnI2JkYjc2YicsXG4gICAgZGFya21hZ2VudGE6ICcjOGIwMDhiJyxcbiAgICBkYXJrb2xpdmVncmVlbjogJyM1NTZiMmYnLFxuICAgIGRhcmtvcmFuZ2U6ICcjZmY4YzAwJyxcbiAgICBkYXJrb3JjaGlkOiAnIzk5MzJjYycsXG4gICAgZGFya3JlZDogJyM4YjAwMDAnLFxuICAgIGRhcmtzYWxtb246ICcjZTk5NjdhJyxcbiAgICBkYXJrc2VhZ3JlZW46ICcjOGZiYzhmJyxcbiAgICBkYXJrc2xhdGVibHVlOiAnIzQ4M2Q4YicsXG4gICAgZGFya3NsYXRlZ3JheTogJyMyZjRmNGYnLFxuICAgIGRhcmtzbGF0ZWdyZXk6ICcjMmY0ZjRmJyxcbiAgICBkYXJrdHVycXVvaXNlOiAnIzAwY2VkMScsXG4gICAgZGFya3Zpb2xldDogJyM5NDAwZDMnLFxuICAgIGRlZXBwaW5rOiAnI2ZmMTQ5MycsXG4gICAgZGVlcHNreWJsdWU6ICcjMDBiZmZmJyxcbiAgICBkaW1ncmF5OiAnIzY5Njk2OScsXG4gICAgZGltZ3JleTogJyM2OTY5NjknLFxuICAgIGRvZGdlcmJsdWU6ICcjMWU5MGZmJyxcbiAgICBmaXJlYnJpY2s6ICcjYjIyMjIyJyxcbiAgICBmbG9yYWx3aGl0ZTogJyNmZmZhZjAnLFxuICAgIGZvcmVzdGdyZWVuOiAnIzIyOGIyMicsXG4gICAgZnVjaHNpYTogJyNmZjAwZmYnLFxuICAgIGdhaW5zYm9ybzogJyNkY2RjZGMnLFxuICAgIGdob3N0d2hpdGU6ICcjZjhmOGZmJyxcbiAgICBnb2xkZW5yb2Q6ICcjZGFhNTIwJyxcbiAgICBnb2xkOiAnI2ZmZDcwMCcsXG4gICAgZ3JheTogJyM4MDgwODAnLFxuICAgIGdyZWVuOiAnIzAwODAwMCcsXG4gICAgZ3JlZW55ZWxsb3c6ICcjYWRmZjJmJyxcbiAgICBncmV5OiAnIzgwODA4MCcsXG4gICAgaG9uZXlkZXc6ICcjZjBmZmYwJyxcbiAgICBob3RwaW5rOiAnI2ZmNjliNCcsXG4gICAgaW5kaWFucmVkOiAnI2NkNWM1YycsXG4gICAgaW5kaWdvOiAnIzRiMDA4MicsXG4gICAgaXZvcnk6ICcjZmZmZmYwJyxcbiAgICBraGFraTogJyNmMGU2OGMnLFxuICAgIGxhdmVuZGVyYmx1c2g6ICcjZmZmMGY1JyxcbiAgICBsYXZlbmRlcjogJyNlNmU2ZmEnLFxuICAgIGxhd25ncmVlbjogJyM3Y2ZjMDAnLFxuICAgIGxlbW9uY2hpZmZvbjogJyNmZmZhY2QnLFxuICAgIGxpZ2h0Ymx1ZTogJyNhZGQ4ZTYnLFxuICAgIGxpZ2h0Y29yYWw6ICcjZjA4MDgwJyxcbiAgICBsaWdodGN5YW46ICcjZTBmZmZmJyxcbiAgICBsaWdodGdvbGRlbnJvZHllbGxvdzogJyNmYWZhZDInLFxuICAgIGxpZ2h0Z3JheTogJyNkM2QzZDMnLFxuICAgIGxpZ2h0Z3JlZW46ICcjOTBlZTkwJyxcbiAgICBsaWdodGdyZXk6ICcjZDNkM2QzJyxcbiAgICBsaWdodHBpbms6ICcjZmZiNmMxJyxcbiAgICBsaWdodHNhbG1vbjogJyNmZmEwN2EnLFxuICAgIGxpZ2h0c2VhZ3JlZW46ICcjMjBiMmFhJyxcbiAgICBsaWdodHNreWJsdWU6ICcjODdjZWZhJyxcbiAgICBsaWdodHNsYXRlZ3JheTogJyM3Nzg4OTknLFxuICAgIGxpZ2h0c2xhdGVncmV5OiAnIzc3ODg5OScsXG4gICAgbGlnaHRzdGVlbGJsdWU6ICcjYjBjNGRlJyxcbiAgICBsaWdodHllbGxvdzogJyNmZmZmZTAnLFxuICAgIGxpbWU6ICcjMDBmZjAwJyxcbiAgICBsaW1lZ3JlZW46ICcjMzJjZDMyJyxcbiAgICBsaW5lbjogJyNmYWYwZTYnLFxuICAgIG1hZ2VudGE6ICcjZmYwMGZmJyxcbiAgICBtYXJvb246ICcjODAwMDAwJyxcbiAgICBtZWRpdW1hcXVhbWFyaW5lOiAnIzY2Y2RhYScsXG4gICAgbWVkaXVtYmx1ZTogJyMwMDAwY2QnLFxuICAgIG1lZGl1bW9yY2hpZDogJyNiYTU1ZDMnLFxuICAgIG1lZGl1bXB1cnBsZTogJyM5MzcwZGInLFxuICAgIG1lZGl1bXNlYWdyZWVuOiAnIzNjYjM3MScsXG4gICAgbWVkaXVtc2xhdGVibHVlOiAnIzdiNjhlZScsXG4gICAgbWVkaXVtc3ByaW5nZ3JlZW46ICcjMDBmYTlhJyxcbiAgICBtZWRpdW10dXJxdW9pc2U6ICcjNDhkMWNjJyxcbiAgICBtZWRpdW12aW9sZXRyZWQ6ICcjYzcxNTg1JyxcbiAgICBtaWRuaWdodGJsdWU6ICcjMTkxOTcwJyxcbiAgICBtaW50Y3JlYW06ICcjZjVmZmZhJyxcbiAgICBtaXN0eXJvc2U6ICcjZmZlNGUxJyxcbiAgICBtb2NjYXNpbjogJyNmZmU0YjUnLFxuICAgIG5hdmFqb3doaXRlOiAnI2ZmZGVhZCcsXG4gICAgbmF2eTogJyMwMDAwODAnLFxuICAgIG9sZGxhY2U6ICcjZmRmNWU2JyxcbiAgICBvbGl2ZTogJyM4MDgwMDAnLFxuICAgIG9saXZlZHJhYjogJyM2YjhlMjMnLFxuICAgIG9yYW5nZTogJyNmZmE1MDAnLFxuICAgIG9yYW5nZXJlZDogJyNmZjQ1MDAnLFxuICAgIG9yY2hpZDogJyNkYTcwZDYnLFxuICAgIHBhbGVnb2xkZW5yb2Q6ICcjZWVlOGFhJyxcbiAgICBwYWxlZ3JlZW46ICcjOThmYjk4JyxcbiAgICBwYWxldHVycXVvaXNlOiAnI2FmZWVlZScsXG4gICAgcGFsZXZpb2xldHJlZDogJyNkYjcwOTMnLFxuICAgIHBhcGF5YXdoaXA6ICcjZmZlZmQ1JyxcbiAgICBwZWFjaHB1ZmY6ICcjZmZkYWI5JyxcbiAgICBwZXJ1OiAnI2NkODUzZicsXG4gICAgcGluazogJyNmZmMwY2InLFxuICAgIHBsdW06ICcjZGRhMGRkJyxcbiAgICBwb3dkZXJibHVlOiAnI2IwZTBlNicsXG4gICAgcHVycGxlOiAnIzgwMDA4MCcsXG4gICAgcmViZWNjYXB1cnBsZTogJyM2NjMzOTknLFxuICAgIHJlZDogJyNmZjAwMDAnLFxuICAgIHJvc3licm93bjogJyNiYzhmOGYnLFxuICAgIHJveWFsYmx1ZTogJyM0MTY5ZTEnLFxuICAgIHNhZGRsZWJyb3duOiAnIzhiNDUxMycsXG4gICAgc2FsbW9uOiAnI2ZhODA3MicsXG4gICAgc2FuZHlicm93bjogJyNmNGE0NjAnLFxuICAgIHNlYWdyZWVuOiAnIzJlOGI1NycsXG4gICAgc2Vhc2hlbGw6ICcjZmZmNWVlJyxcbiAgICBzaWVubmE6ICcjYTA1MjJkJyxcbiAgICBzaWx2ZXI6ICcjYzBjMGMwJyxcbiAgICBza3libHVlOiAnIzg3Y2VlYicsXG4gICAgc2xhdGVibHVlOiAnIzZhNWFjZCcsXG4gICAgc2xhdGVncmF5OiAnIzcwODA5MCcsXG4gICAgc2xhdGVncmV5OiAnIzcwODA5MCcsXG4gICAgc25vdzogJyNmZmZhZmEnLFxuICAgIHNwcmluZ2dyZWVuOiAnIzAwZmY3ZicsXG4gICAgc3RlZWxibHVlOiAnIzQ2ODJiNCcsXG4gICAgdGFuOiAnI2QyYjQ4YycsXG4gICAgdGVhbDogJyMwMDgwODAnLFxuICAgIHRoaXN0bGU6ICcjZDhiZmQ4JyxcbiAgICB0b21hdG86ICcjZmY2MzQ3JyxcbiAgICB0dXJxdW9pc2U6ICcjNDBlMGQwJyxcbiAgICB2aW9sZXQ6ICcjZWU4MmVlJyxcbiAgICB3aGVhdDogJyNmNWRlYjMnLFxuICAgIHdoaXRlOiAnI2ZmZmZmZicsXG4gICAgd2hpdGVzbW9rZTogJyNmNWY1ZjUnLFxuICAgIHllbGxvdzogJyNmZmZmMDAnLFxuICAgIHllbGxvd2dyZWVuOiAnIzlhY2QzMicsXG59O1xuIiwiaW1wb3J0IHsgY29udmVydEhleFRvRGVjaW1hbCwgaHNsVG9SZ2IsIGhzdlRvUmdiLCBwYXJzZUludEZyb21IZXgsIHJnYlRvUmdiIH0gZnJvbSAnLi9jb252ZXJzaW9uJztcbmltcG9ydCB7IG5hbWVzIH0gZnJvbSAnLi9jc3MtY29sb3ItbmFtZXMnO1xuaW1wb3J0IHsgYm91bmRBbHBoYSwgY29udmVydFRvUGVyY2VudGFnZSB9IGZyb20gJy4vdXRpbCc7XG4vKipcbiAqIEdpdmVuIGEgc3RyaW5nIG9yIG9iamVjdCwgY29udmVydCB0aGF0IGlucHV0IHRvIFJHQlxuICpcbiAqIFBvc3NpYmxlIHN0cmluZyBpbnB1dHM6XG4gKiBgYGBcbiAqIFwicmVkXCJcbiAqIFwiI2YwMFwiIG9yIFwiZjAwXCJcbiAqIFwiI2ZmMDAwMFwiIG9yIFwiZmYwMDAwXCJcbiAqIFwiI2ZmMDAwMDAwXCIgb3IgXCJmZjAwMDAwMFwiXG4gKiBcInJnYiAyNTUgMCAwXCIgb3IgXCJyZ2IgKDI1NSwgMCwgMClcIlxuICogXCJyZ2IgMS4wIDAgMFwiIG9yIFwicmdiICgxLCAwLCAwKVwiXG4gKiBcInJnYmEgKDI1NSwgMCwgMCwgMSlcIiBvciBcInJnYmEgMjU1LCAwLCAwLCAxXCJcbiAqIFwicmdiYSAoMS4wLCAwLCAwLCAxKVwiIG9yIFwicmdiYSAxLjAsIDAsIDAsIDFcIlxuICogXCJoc2woMCwgMTAwJSwgNTAlKVwiIG9yIFwiaHNsIDAgMTAwJSA1MCVcIlxuICogXCJoc2xhKDAsIDEwMCUsIDUwJSwgMSlcIiBvciBcImhzbGEgMCAxMDAlIDUwJSwgMVwiXG4gKiBcImhzdigwLCAxMDAlLCAxMDAlKVwiIG9yIFwiaHN2IDAgMTAwJSAxMDAlXCJcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5wdXRUb1JHQihjb2xvcikge1xuICAgIHZhciByZ2IgPSB7IHI6IDAsIGc6IDAsIGI6IDAgfTtcbiAgICB2YXIgYSA9IDE7XG4gICAgdmFyIHMgPSBudWxsO1xuICAgIHZhciB2ID0gbnVsbDtcbiAgICB2YXIgbCA9IG51bGw7XG4gICAgdmFyIG9rID0gZmFsc2U7XG4gICAgdmFyIGZvcm1hdCA9IGZhbHNlO1xuICAgIGlmICh0eXBlb2YgY29sb3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbG9yID0gc3RyaW5nSW5wdXRUb09iamVjdChjb2xvcik7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgY29sb3IgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChpc1ZhbGlkQ1NTVW5pdChjb2xvci5yKSAmJiBpc1ZhbGlkQ1NTVW5pdChjb2xvci5nKSAmJiBpc1ZhbGlkQ1NTVW5pdChjb2xvci5iKSkge1xuICAgICAgICAgICAgcmdiID0gcmdiVG9SZ2IoY29sb3IuciwgY29sb3IuZywgY29sb3IuYik7XG4gICAgICAgICAgICBvayA9IHRydWU7XG4gICAgICAgICAgICBmb3JtYXQgPSBTdHJpbmcoY29sb3Iucikuc3Vic3RyKC0xKSA9PT0gJyUnID8gJ3ByZ2InIDogJ3JnYic7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNWYWxpZENTU1VuaXQoY29sb3IuaCkgJiYgaXNWYWxpZENTU1VuaXQoY29sb3IucykgJiYgaXNWYWxpZENTU1VuaXQoY29sb3IudikpIHtcbiAgICAgICAgICAgIHMgPSBjb252ZXJ0VG9QZXJjZW50YWdlKGNvbG9yLnMpO1xuICAgICAgICAgICAgdiA9IGNvbnZlcnRUb1BlcmNlbnRhZ2UoY29sb3Iudik7XG4gICAgICAgICAgICByZ2IgPSBoc3ZUb1JnYihjb2xvci5oLCBzLCB2KTtcbiAgICAgICAgICAgIG9rID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvcm1hdCA9ICdoc3YnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzVmFsaWRDU1NVbml0KGNvbG9yLmgpICYmIGlzVmFsaWRDU1NVbml0KGNvbG9yLnMpICYmIGlzVmFsaWRDU1NVbml0KGNvbG9yLmwpKSB7XG4gICAgICAgICAgICBzID0gY29udmVydFRvUGVyY2VudGFnZShjb2xvci5zKTtcbiAgICAgICAgICAgIGwgPSBjb252ZXJ0VG9QZXJjZW50YWdlKGNvbG9yLmwpO1xuICAgICAgICAgICAgcmdiID0gaHNsVG9SZ2IoY29sb3IuaCwgcywgbCk7XG4gICAgICAgICAgICBvayA9IHRydWU7XG4gICAgICAgICAgICBmb3JtYXQgPSAnaHNsJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbG9yLCAnYScpKSB7XG4gICAgICAgICAgICBhID0gY29sb3IuYTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhID0gYm91bmRBbHBoYShhKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBvazogb2ssXG4gICAgICAgIGZvcm1hdDogY29sb3IuZm9ybWF0IHx8IGZvcm1hdCxcbiAgICAgICAgcjogTWF0aC5taW4oMjU1LCBNYXRoLm1heChyZ2IuciwgMCkpLFxuICAgICAgICBnOiBNYXRoLm1pbigyNTUsIE1hdGgubWF4KHJnYi5nLCAwKSksXG4gICAgICAgIGI6IE1hdGgubWluKDI1NSwgTWF0aC5tYXgocmdiLmIsIDApKSxcbiAgICAgICAgYTogYSxcbiAgICB9O1xufVxuLy8gPGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtdmFsdWVzLyNpbnRlZ2Vycz5cbnZhciBDU1NfSU5URUdFUiA9ICdbLVxcXFwrXT9cXFxcZCslPyc7XG4vLyA8aHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy12YWx1ZXMvI251bWJlci12YWx1ZT5cbnZhciBDU1NfTlVNQkVSID0gJ1stXFxcXCtdP1xcXFxkKlxcXFwuXFxcXGQrJT8nO1xuLy8gQWxsb3cgcG9zaXRpdmUvbmVnYXRpdmUgaW50ZWdlci9udW1iZXIuICBEb24ndCBjYXB0dXJlIHRoZSBlaXRoZXIvb3IsIGp1c3QgdGhlIGVudGlyZSBvdXRjb21lLlxudmFyIENTU19VTklUID0gXCIoPzpcIi5jb25jYXQoQ1NTX05VTUJFUiwgXCIpfCg/OlwiKS5jb25jYXQoQ1NTX0lOVEVHRVIsIFwiKVwiKTtcbi8vIEFjdHVhbCBtYXRjaGluZy5cbi8vIFBhcmVudGhlc2VzIGFuZCBjb21tYXMgYXJlIG9wdGlvbmFsLCBidXQgbm90IHJlcXVpcmVkLlxuLy8gV2hpdGVzcGFjZSBjYW4gdGFrZSB0aGUgcGxhY2Ugb2YgY29tbWFzIG9yIG9wZW5pbmcgcGFyZW5cbnZhciBQRVJNSVNTSVZFX01BVENIMyA9IFwiW1xcXFxzfFxcXFwoXSsoXCIuY29uY2F0KENTU19VTklULCBcIilbLHxcXFxcc10rKFwiKS5jb25jYXQoQ1NTX1VOSVQsIFwiKVssfFxcXFxzXSsoXCIpLmNvbmNhdChDU1NfVU5JVCwgXCIpXFxcXHMqXFxcXCk/XCIpO1xudmFyIFBFUk1JU1NJVkVfTUFUQ0g0ID0gXCJbXFxcXHN8XFxcXChdKyhcIi5jb25jYXQoQ1NTX1VOSVQsIFwiKVssfFxcXFxzXSsoXCIpLmNvbmNhdChDU1NfVU5JVCwgXCIpWyx8XFxcXHNdKyhcIikuY29uY2F0KENTU19VTklULCBcIilbLHxcXFxcc10rKFwiKS5jb25jYXQoQ1NTX1VOSVQsIFwiKVxcXFxzKlxcXFwpP1wiKTtcbnZhciBtYXRjaGVycyA9IHtcbiAgICBDU1NfVU5JVDogbmV3IFJlZ0V4cChDU1NfVU5JVCksXG4gICAgcmdiOiBuZXcgUmVnRXhwKCdyZ2InICsgUEVSTUlTU0lWRV9NQVRDSDMpLFxuICAgIHJnYmE6IG5ldyBSZWdFeHAoJ3JnYmEnICsgUEVSTUlTU0lWRV9NQVRDSDQpLFxuICAgIGhzbDogbmV3IFJlZ0V4cCgnaHNsJyArIFBFUk1JU1NJVkVfTUFUQ0gzKSxcbiAgICBoc2xhOiBuZXcgUmVnRXhwKCdoc2xhJyArIFBFUk1JU1NJVkVfTUFUQ0g0KSxcbiAgICBoc3Y6IG5ldyBSZWdFeHAoJ2hzdicgKyBQRVJNSVNTSVZFX01BVENIMyksXG4gICAgaHN2YTogbmV3IFJlZ0V4cCgnaHN2YScgKyBQRVJNSVNTSVZFX01BVENINCksXG4gICAgaGV4MzogL14jPyhbMC05YS1mQS1GXXsxfSkoWzAtOWEtZkEtRl17MX0pKFswLTlhLWZBLUZdezF9KSQvLFxuICAgIGhleDY6IC9eIz8oWzAtOWEtZkEtRl17Mn0pKFswLTlhLWZBLUZdezJ9KShbMC05YS1mQS1GXXsyfSkkLyxcbiAgICBoZXg0OiAvXiM/KFswLTlhLWZBLUZdezF9KShbMC05YS1mQS1GXXsxfSkoWzAtOWEtZkEtRl17MX0pKFswLTlhLWZBLUZdezF9KSQvLFxuICAgIGhleDg6IC9eIz8oWzAtOWEtZkEtRl17Mn0pKFswLTlhLWZBLUZdezJ9KShbMC05YS1mQS1GXXsyfSkoWzAtOWEtZkEtRl17Mn0pJC8sXG59O1xuLyoqXG4gKiBQZXJtaXNzaXZlIHN0cmluZyBwYXJzaW5nLiAgVGFrZSBpbiBhIG51bWJlciBvZiBmb3JtYXRzLCBhbmQgb3V0cHV0IGFuIG9iamVjdFxuICogYmFzZWQgb24gZGV0ZWN0ZWQgZm9ybWF0LiAgUmV0dXJucyBgeyByLCBnLCBiIH1gIG9yIGB7IGgsIHMsIGwgfWAgb3IgYHsgaCwgcywgdn1gXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdJbnB1dFRvT2JqZWN0KGNvbG9yKSB7XG4gICAgY29sb3IgPSBjb2xvci50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoY29sb3IubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIG5hbWVkID0gZmFsc2U7XG4gICAgaWYgKG5hbWVzW2NvbG9yXSkge1xuICAgICAgICBjb2xvciA9IG5hbWVzW2NvbG9yXTtcbiAgICAgICAgbmFtZWQgPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChjb2xvciA9PT0gJ3RyYW5zcGFyZW50Jykge1xuICAgICAgICByZXR1cm4geyByOiAwLCBnOiAwLCBiOiAwLCBhOiAwLCBmb3JtYXQ6ICduYW1lJyB9O1xuICAgIH1cbiAgICAvLyBUcnkgdG8gbWF0Y2ggc3RyaW5nIGlucHV0IHVzaW5nIHJlZ3VsYXIgZXhwcmVzc2lvbnMuXG4gICAgLy8gS2VlcCBtb3N0IG9mIHRoZSBudW1iZXIgYm91bmRpbmcgb3V0IG9mIHRoaXMgZnVuY3Rpb24gLSBkb24ndCB3b3JyeSBhYm91dCBbMCwxXSBvciBbMCwxMDBdIG9yIFswLDM2MF1cbiAgICAvLyBKdXN0IHJldHVybiBhbiBvYmplY3QgYW5kIGxldCB0aGUgY29udmVyc2lvbiBmdW5jdGlvbnMgaGFuZGxlIHRoYXQuXG4gICAgLy8gVGhpcyB3YXkgdGhlIHJlc3VsdCB3aWxsIGJlIHRoZSBzYW1lIHdoZXRoZXIgdGhlIHRpbnljb2xvciBpcyBpbml0aWFsaXplZCB3aXRoIHN0cmluZyBvciBvYmplY3QuXG4gICAgdmFyIG1hdGNoID0gbWF0Y2hlcnMucmdiLmV4ZWMoY29sb3IpO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgICByZXR1cm4geyByOiBtYXRjaFsxXSwgZzogbWF0Y2hbMl0sIGI6IG1hdGNoWzNdIH07XG4gICAgfVxuICAgIG1hdGNoID0gbWF0Y2hlcnMucmdiYS5leGVjKGNvbG9yKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIHsgcjogbWF0Y2hbMV0sIGc6IG1hdGNoWzJdLCBiOiBtYXRjaFszXSwgYTogbWF0Y2hbNF0gfTtcbiAgICB9XG4gICAgbWF0Y2ggPSBtYXRjaGVycy5oc2wuZXhlYyhjb2xvcik7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIHJldHVybiB7IGg6IG1hdGNoWzFdLCBzOiBtYXRjaFsyXSwgbDogbWF0Y2hbM10gfTtcbiAgICB9XG4gICAgbWF0Y2ggPSBtYXRjaGVycy5oc2xhLmV4ZWMoY29sb3IpO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgICByZXR1cm4geyBoOiBtYXRjaFsxXSwgczogbWF0Y2hbMl0sIGw6IG1hdGNoWzNdLCBhOiBtYXRjaFs0XSB9O1xuICAgIH1cbiAgICBtYXRjaCA9IG1hdGNoZXJzLmhzdi5leGVjKGNvbG9yKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIHsgaDogbWF0Y2hbMV0sIHM6IG1hdGNoWzJdLCB2OiBtYXRjaFszXSB9O1xuICAgIH1cbiAgICBtYXRjaCA9IG1hdGNoZXJzLmhzdmEuZXhlYyhjb2xvcik7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIHJldHVybiB7IGg6IG1hdGNoWzFdLCBzOiBtYXRjaFsyXSwgdjogbWF0Y2hbM10sIGE6IG1hdGNoWzRdIH07XG4gICAgfVxuICAgIG1hdGNoID0gbWF0Y2hlcnMuaGV4OC5leGVjKGNvbG9yKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHI6IHBhcnNlSW50RnJvbUhleChtYXRjaFsxXSksXG4gICAgICAgICAgICBnOiBwYXJzZUludEZyb21IZXgobWF0Y2hbMl0pLFxuICAgICAgICAgICAgYjogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzNdKSxcbiAgICAgICAgICAgIGE6IGNvbnZlcnRIZXhUb0RlY2ltYWwobWF0Y2hbNF0pLFxuICAgICAgICAgICAgZm9ybWF0OiBuYW1lZCA/ICduYW1lJyA6ICdoZXg4JyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgbWF0Y2ggPSBtYXRjaGVycy5oZXg2LmV4ZWMoY29sb3IpO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcjogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzFdKSxcbiAgICAgICAgICAgIGc6IHBhcnNlSW50RnJvbUhleChtYXRjaFsyXSksXG4gICAgICAgICAgICBiOiBwYXJzZUludEZyb21IZXgobWF0Y2hbM10pLFxuICAgICAgICAgICAgZm9ybWF0OiBuYW1lZCA/ICduYW1lJyA6ICdoZXgnLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBtYXRjaCA9IG1hdGNoZXJzLmhleDQuZXhlYyhjb2xvcik7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByOiBwYXJzZUludEZyb21IZXgobWF0Y2hbMV0gKyBtYXRjaFsxXSksXG4gICAgICAgICAgICBnOiBwYXJzZUludEZyb21IZXgobWF0Y2hbMl0gKyBtYXRjaFsyXSksXG4gICAgICAgICAgICBiOiBwYXJzZUludEZyb21IZXgobWF0Y2hbM10gKyBtYXRjaFszXSksXG4gICAgICAgICAgICBhOiBjb252ZXJ0SGV4VG9EZWNpbWFsKG1hdGNoWzRdICsgbWF0Y2hbNF0pLFxuICAgICAgICAgICAgZm9ybWF0OiBuYW1lZCA/ICduYW1lJyA6ICdoZXg4JyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgbWF0Y2ggPSBtYXRjaGVycy5oZXgzLmV4ZWMoY29sb3IpO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcjogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzFdICsgbWF0Y2hbMV0pLFxuICAgICAgICAgICAgZzogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzJdICsgbWF0Y2hbMl0pLFxuICAgICAgICAgICAgYjogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzNdICsgbWF0Y2hbM10pLFxuICAgICAgICAgICAgZm9ybWF0OiBuYW1lZCA/ICduYW1lJyA6ICdoZXgnLFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG4vKipcbiAqIENoZWNrIHRvIHNlZSBpZiBpdCBsb29rcyBsaWtlIGEgQ1NTIHVuaXRcbiAqIChzZWUgYG1hdGNoZXJzYCBhYm92ZSBmb3IgZGVmaW5pdGlvbikuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkQ1NTVW5pdChjb2xvcikge1xuICAgIHJldHVybiBCb29sZWFuKG1hdGNoZXJzLkNTU19VTklULmV4ZWMoU3RyaW5nKGNvbG9yKSkpO1xufVxuIiwiaW1wb3J0IHsgVGlueUNvbG9yIH0gZnJvbSAnLi9pbmRleCc7XG5pbXBvcnQgeyBjb252ZXJ0VG9QZXJjZW50YWdlIH0gZnJvbSAnLi91dGlsJztcbi8qKlxuICogSWYgaW5wdXQgaXMgYW4gb2JqZWN0LCBmb3JjZSAxIGludG8gXCIxLjBcIiB0byBoYW5kbGUgcmF0aW9zIHByb3Blcmx5XG4gKiBTdHJpbmcgaW5wdXQgcmVxdWlyZXMgXCIxLjBcIiBhcyBpbnB1dCwgc28gMSB3aWxsIGJlIHRyZWF0ZWQgYXMgMVxuICovXG5leHBvcnQgZnVuY3Rpb24gZnJvbVJhdGlvKHJhdGlvLCBvcHRzKSB7XG4gICAgdmFyIG5ld0NvbG9yID0ge1xuICAgICAgICByOiBjb252ZXJ0VG9QZXJjZW50YWdlKHJhdGlvLnIpLFxuICAgICAgICBnOiBjb252ZXJ0VG9QZXJjZW50YWdlKHJhdGlvLmcpLFxuICAgICAgICBiOiBjb252ZXJ0VG9QZXJjZW50YWdlKHJhdGlvLmIpLFxuICAgIH07XG4gICAgaWYgKHJhdGlvLmEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBuZXdDb2xvci5hID0gTnVtYmVyKHJhdGlvLmEpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFRpbnlDb2xvcihuZXdDb2xvciwgb3B0cyk7XG59XG4vKiogb2xkIHJhbmRvbSBmdW5jdGlvbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxlZ2FjeVJhbmRvbSgpIHtcbiAgICByZXR1cm4gbmV3IFRpbnlDb2xvcih7XG4gICAgICAgIHI6IE1hdGgucmFuZG9tKCksXG4gICAgICAgIGc6IE1hdGgucmFuZG9tKCksXG4gICAgICAgIGI6IE1hdGgucmFuZG9tKCksXG4gICAgfSk7XG59XG4iLCJpbXBvcnQgeyBudW1iZXJJbnB1dFRvT2JqZWN0LCByZ2JhVG9IZXgsIHJnYlRvSGV4LCByZ2JUb0hzbCwgcmdiVG9Ic3YgfSBmcm9tICcuL2NvbnZlcnNpb24nO1xuaW1wb3J0IHsgbmFtZXMgfSBmcm9tICcuL2Nzcy1jb2xvci1uYW1lcyc7XG5pbXBvcnQgeyBpbnB1dFRvUkdCIH0gZnJvbSAnLi9mb3JtYXQtaW5wdXQnO1xuaW1wb3J0IHsgYm91bmQwMSwgYm91bmRBbHBoYSwgY2xhbXAwMSB9IGZyb20gJy4vdXRpbCc7XG52YXIgVGlueUNvbG9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRpbnlDb2xvcihjb2xvciwgb3B0cykge1xuICAgICAgICBpZiAoY29sb3IgPT09IHZvaWQgMCkgeyBjb2xvciA9ICcnOyB9XG4gICAgICAgIGlmIChvcHRzID09PSB2b2lkIDApIHsgb3B0cyA9IHt9OyB9XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgLy8gSWYgaW5wdXQgaXMgYWxyZWFkeSBhIHRpbnljb2xvciwgcmV0dXJuIGl0c2VsZlxuICAgICAgICBpZiAoY29sb3IgaW5zdGFuY2VvZiBUaW55Q29sb3IpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zdHJ1Y3Rvci1yZXR1cm5cbiAgICAgICAgICAgIHJldHVybiBjb2xvcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGNvbG9yID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgY29sb3IgPSBudW1iZXJJbnB1dFRvT2JqZWN0KGNvbG9yKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9yaWdpbmFsSW5wdXQgPSBjb2xvcjtcbiAgICAgICAgdmFyIHJnYiA9IGlucHV0VG9SR0IoY29sb3IpO1xuICAgICAgICB0aGlzLm9yaWdpbmFsSW5wdXQgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5yID0gcmdiLnI7XG4gICAgICAgIHRoaXMuZyA9IHJnYi5nO1xuICAgICAgICB0aGlzLmIgPSByZ2IuYjtcbiAgICAgICAgdGhpcy5hID0gcmdiLmE7XG4gICAgICAgIHRoaXMucm91bmRBID0gTWF0aC5yb3VuZCgxMDAgKiB0aGlzLmEpIC8gMTAwO1xuICAgICAgICB0aGlzLmZvcm1hdCA9IChfYSA9IG9wdHMuZm9ybWF0KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiByZ2IuZm9ybWF0O1xuICAgICAgICB0aGlzLmdyYWRpZW50VHlwZSA9IG9wdHMuZ3JhZGllbnRUeXBlO1xuICAgICAgICAvLyBEb24ndCBsZXQgdGhlIHJhbmdlIG9mIFswLDI1NV0gY29tZSBiYWNrIGluIFswLDFdLlxuICAgICAgICAvLyBQb3RlbnRpYWxseSBsb3NlIGEgbGl0dGxlIGJpdCBvZiBwcmVjaXNpb24gaGVyZSwgYnV0IHdpbGwgZml4IGlzc3VlcyB3aGVyZVxuICAgICAgICAvLyAuNSBnZXRzIGludGVycHJldGVkIGFzIGhhbGYgb2YgdGhlIHRvdGFsLCBpbnN0ZWFkIG9mIGhhbGYgb2YgMVxuICAgICAgICAvLyBJZiBpdCB3YXMgc3VwcG9zZWQgdG8gYmUgMTI4LCB0aGlzIHdhcyBhbHJlYWR5IHRha2VuIGNhcmUgb2YgYnkgYGlucHV0VG9SZ2JgXG4gICAgICAgIGlmICh0aGlzLnIgPCAxKSB7XG4gICAgICAgICAgICB0aGlzLnIgPSBNYXRoLnJvdW5kKHRoaXMucik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZyA8IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZyA9IE1hdGgucm91bmQodGhpcy5nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5iIDwgMSkge1xuICAgICAgICAgICAgdGhpcy5iID0gTWF0aC5yb3VuZCh0aGlzLmIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNWYWxpZCA9IHJnYi5vaztcbiAgICB9XG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS5pc0RhcmsgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEJyaWdodG5lc3MoKSA8IDEyODtcbiAgICB9O1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUuaXNMaWdodCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmlzRGFyaygpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcGVyY2VpdmVkIGJyaWdodG5lc3Mgb2YgdGhlIGNvbG9yLCBmcm9tIDAtMjU1LlxuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUuZ2V0QnJpZ2h0bmVzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvQUVSVCNjb2xvci1jb250cmFzdFxuICAgICAgICB2YXIgcmdiID0gdGhpcy50b1JnYigpO1xuICAgICAgICByZXR1cm4gKHJnYi5yICogMjk5ICsgcmdiLmcgKiA1ODcgKyByZ2IuYiAqIDExNCkgLyAxMDAwO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcGVyY2VpdmVkIGx1bWluYW5jZSBvZiBhIGNvbG9yLCBmcm9tIDAtMS5cbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLmdldEx1bWluYW5jZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAwOC9SRUMtV0NBRzIwLTIwMDgxMjExLyNyZWxhdGl2ZWx1bWluYW5jZWRlZlxuICAgICAgICB2YXIgcmdiID0gdGhpcy50b1JnYigpO1xuICAgICAgICB2YXIgUjtcbiAgICAgICAgdmFyIEc7XG4gICAgICAgIHZhciBCO1xuICAgICAgICB2YXIgUnNSR0IgPSByZ2IuciAvIDI1NTtcbiAgICAgICAgdmFyIEdzUkdCID0gcmdiLmcgLyAyNTU7XG4gICAgICAgIHZhciBCc1JHQiA9IHJnYi5iIC8gMjU1O1xuICAgICAgICBpZiAoUnNSR0IgPD0gMC4wMzkyOCkge1xuICAgICAgICAgICAgUiA9IFJzUkdCIC8gMTIuOTI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWV4cG9uZW50aWF0aW9uLW9wZXJhdG9yXG4gICAgICAgICAgICBSID0gTWF0aC5wb3coKFJzUkdCICsgMC4wNTUpIC8gMS4wNTUsIDIuNCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEdzUkdCIDw9IDAuMDM5MjgpIHtcbiAgICAgICAgICAgIEcgPSBHc1JHQiAvIDEyLjkyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1leHBvbmVudGlhdGlvbi1vcGVyYXRvclxuICAgICAgICAgICAgRyA9IE1hdGgucG93KChHc1JHQiArIDAuMDU1KSAvIDEuMDU1LCAyLjQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChCc1JHQiA8PSAwLjAzOTI4KSB7XG4gICAgICAgICAgICBCID0gQnNSR0IgLyAxMi45MjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZXhwb25lbnRpYXRpb24tb3BlcmF0b3JcbiAgICAgICAgICAgIEIgPSBNYXRoLnBvdygoQnNSR0IgKyAwLjA1NSkgLyAxLjA1NSwgMi40KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMC4yMTI2ICogUiArIDAuNzE1MiAqIEcgKyAwLjA3MjIgKiBCO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgYWxwaGEgdmFsdWUgb2YgYSBjb2xvciwgZnJvbSAwLTEuXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS5nZXRBbHBoYSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGFscGhhIHZhbHVlIG9uIHRoZSBjdXJyZW50IGNvbG9yLlxuICAgICAqXG4gICAgICogQHBhcmFtIGFscGhhIC0gVGhlIG5ldyBhbHBoYSB2YWx1ZS4gVGhlIGFjY2VwdGVkIHJhbmdlIGlzIDAtMS5cbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnNldEFscGhhID0gZnVuY3Rpb24gKGFscGhhKSB7XG4gICAgICAgIHRoaXMuYSA9IGJvdW5kQWxwaGEoYWxwaGEpO1xuICAgICAgICB0aGlzLnJvdW5kQSA9IE1hdGgucm91bmQoMTAwICogdGhpcy5hKSAvIDEwMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBvYmplY3QgYXMgYSBIU1ZBIG9iamVjdC5cbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnRvSHN2ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaHN2ID0gcmdiVG9Ic3YodGhpcy5yLCB0aGlzLmcsIHRoaXMuYik7XG4gICAgICAgIHJldHVybiB7IGg6IGhzdi5oICogMzYwLCBzOiBoc3YucywgdjogaHN2LnYsIGE6IHRoaXMuYSB9O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgaHN2YSB2YWx1ZXMgaW50ZXJwb2xhdGVkIGludG8gYSBzdHJpbmcgd2l0aCB0aGUgZm9sbG93aW5nIGZvcm1hdDpcbiAgICAgKiBcImhzdmEoeHh4LCB4eHgsIHh4eCwgeHgpXCIuXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS50b0hzdlN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGhzdiA9IHJnYlRvSHN2KHRoaXMuciwgdGhpcy5nLCB0aGlzLmIpO1xuICAgICAgICB2YXIgaCA9IE1hdGgucm91bmQoaHN2LmggKiAzNjApO1xuICAgICAgICB2YXIgcyA9IE1hdGgucm91bmQoaHN2LnMgKiAxMDApO1xuICAgICAgICB2YXIgdiA9IE1hdGgucm91bmQoaHN2LnYgKiAxMDApO1xuICAgICAgICByZXR1cm4gdGhpcy5hID09PSAxID8gXCJoc3YoXCIuY29uY2F0KGgsIFwiLCBcIikuY29uY2F0KHMsIFwiJSwgXCIpLmNvbmNhdCh2LCBcIiUpXCIpIDogXCJoc3ZhKFwiLmNvbmNhdChoLCBcIiwgXCIpLmNvbmNhdChzLCBcIiUsIFwiKS5jb25jYXQodiwgXCIlLCBcIikuY29uY2F0KHRoaXMucm91bmRBLCBcIilcIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBvYmplY3QgYXMgYSBIU0xBIG9iamVjdC5cbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnRvSHNsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaHNsID0gcmdiVG9Ic2wodGhpcy5yLCB0aGlzLmcsIHRoaXMuYik7XG4gICAgICAgIHJldHVybiB7IGg6IGhzbC5oICogMzYwLCBzOiBoc2wucywgbDogaHNsLmwsIGE6IHRoaXMuYSB9O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgaHNsYSB2YWx1ZXMgaW50ZXJwb2xhdGVkIGludG8gYSBzdHJpbmcgd2l0aCB0aGUgZm9sbG93aW5nIGZvcm1hdDpcbiAgICAgKiBcImhzbGEoeHh4LCB4eHgsIHh4eCwgeHgpXCIuXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS50b0hzbFN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGhzbCA9IHJnYlRvSHNsKHRoaXMuciwgdGhpcy5nLCB0aGlzLmIpO1xuICAgICAgICB2YXIgaCA9IE1hdGgucm91bmQoaHNsLmggKiAzNjApO1xuICAgICAgICB2YXIgcyA9IE1hdGgucm91bmQoaHNsLnMgKiAxMDApO1xuICAgICAgICB2YXIgbCA9IE1hdGgucm91bmQoaHNsLmwgKiAxMDApO1xuICAgICAgICByZXR1cm4gdGhpcy5hID09PSAxID8gXCJoc2woXCIuY29uY2F0KGgsIFwiLCBcIikuY29uY2F0KHMsIFwiJSwgXCIpLmNvbmNhdChsLCBcIiUpXCIpIDogXCJoc2xhKFwiLmNvbmNhdChoLCBcIiwgXCIpLmNvbmNhdChzLCBcIiUsIFwiKS5jb25jYXQobCwgXCIlLCBcIikuY29uY2F0KHRoaXMucm91bmRBLCBcIilcIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBoZXggdmFsdWUgb2YgdGhlIGNvbG9yLlxuICAgICAqIEBwYXJhbSBhbGxvdzNDaGFyIHdpbGwgc2hvcnRlbiBoZXggdmFsdWUgdG8gMyBjaGFyIGlmIHBvc3NpYmxlXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS50b0hleCA9IGZ1bmN0aW9uIChhbGxvdzNDaGFyKSB7XG4gICAgICAgIGlmIChhbGxvdzNDaGFyID09PSB2b2lkIDApIHsgYWxsb3czQ2hhciA9IGZhbHNlOyB9XG4gICAgICAgIHJldHVybiByZ2JUb0hleCh0aGlzLnIsIHRoaXMuZywgdGhpcy5iLCBhbGxvdzNDaGFyKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGhleCB2YWx1ZSBvZiB0aGUgY29sb3IgLXdpdGggYSAjIGFwcGVuZWQuXG4gICAgICogQHBhcmFtIGFsbG93M0NoYXIgd2lsbCBzaG9ydGVuIGhleCB2YWx1ZSB0byAzIGNoYXIgaWYgcG9zc2libGVcbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnRvSGV4U3RyaW5nID0gZnVuY3Rpb24gKGFsbG93M0NoYXIpIHtcbiAgICAgICAgaWYgKGFsbG93M0NoYXIgPT09IHZvaWQgMCkgeyBhbGxvdzNDaGFyID0gZmFsc2U7IH1cbiAgICAgICAgcmV0dXJuICcjJyArIHRoaXMudG9IZXgoYWxsb3czQ2hhcik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBoZXggOCB2YWx1ZSBvZiB0aGUgY29sb3IuXG4gICAgICogQHBhcmFtIGFsbG93NENoYXIgd2lsbCBzaG9ydGVuIGhleCB2YWx1ZSB0byA0IGNoYXIgaWYgcG9zc2libGVcbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnRvSGV4OCA9IGZ1bmN0aW9uIChhbGxvdzRDaGFyKSB7XG4gICAgICAgIGlmIChhbGxvdzRDaGFyID09PSB2b2lkIDApIHsgYWxsb3c0Q2hhciA9IGZhbHNlOyB9XG4gICAgICAgIHJldHVybiByZ2JhVG9IZXgodGhpcy5yLCB0aGlzLmcsIHRoaXMuYiwgdGhpcy5hLCBhbGxvdzRDaGFyKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGhleCA4IHZhbHVlIG9mIHRoZSBjb2xvciAtd2l0aCBhICMgYXBwZW5lZC5cbiAgICAgKiBAcGFyYW0gYWxsb3c0Q2hhciB3aWxsIHNob3J0ZW4gaGV4IHZhbHVlIHRvIDQgY2hhciBpZiBwb3NzaWJsZVxuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUudG9IZXg4U3RyaW5nID0gZnVuY3Rpb24gKGFsbG93NENoYXIpIHtcbiAgICAgICAgaWYgKGFsbG93NENoYXIgPT09IHZvaWQgMCkgeyBhbGxvdzRDaGFyID0gZmFsc2U7IH1cbiAgICAgICAgcmV0dXJuICcjJyArIHRoaXMudG9IZXg4KGFsbG93NENoYXIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgb2JqZWN0IGFzIGEgUkdCQSBvYmplY3QuXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS50b1JnYiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHI6IE1hdGgucm91bmQodGhpcy5yKSxcbiAgICAgICAgICAgIGc6IE1hdGgucm91bmQodGhpcy5nKSxcbiAgICAgICAgICAgIGI6IE1hdGgucm91bmQodGhpcy5iKSxcbiAgICAgICAgICAgIGE6IHRoaXMuYSxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIFJHQkEgdmFsdWVzIGludGVycG9sYXRlZCBpbnRvIGEgc3RyaW5nIHdpdGggdGhlIGZvbGxvd2luZyBmb3JtYXQ6XG4gICAgICogXCJSR0JBKHh4eCwgeHh4LCB4eHgsIHh4KVwiLlxuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUudG9SZ2JTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByID0gTWF0aC5yb3VuZCh0aGlzLnIpO1xuICAgICAgICB2YXIgZyA9IE1hdGgucm91bmQodGhpcy5nKTtcbiAgICAgICAgdmFyIGIgPSBNYXRoLnJvdW5kKHRoaXMuYik7XG4gICAgICAgIHJldHVybiB0aGlzLmEgPT09IDEgPyBcInJnYihcIi5jb25jYXQociwgXCIsIFwiKS5jb25jYXQoZywgXCIsIFwiKS5jb25jYXQoYiwgXCIpXCIpIDogXCJyZ2JhKFwiLmNvbmNhdChyLCBcIiwgXCIpLmNvbmNhdChnLCBcIiwgXCIpLmNvbmNhdChiLCBcIiwgXCIpLmNvbmNhdCh0aGlzLnJvdW5kQSwgXCIpXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgb2JqZWN0IGFzIGEgUkdCQSBvYmplY3QuXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS50b1BlcmNlbnRhZ2VSZ2IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBmbXQgPSBmdW5jdGlvbiAoeCkgeyByZXR1cm4gXCJcIi5jb25jYXQoTWF0aC5yb3VuZChib3VuZDAxKHgsIDI1NSkgKiAxMDApLCBcIiVcIik7IH07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByOiBmbXQodGhpcy5yKSxcbiAgICAgICAgICAgIGc6IGZtdCh0aGlzLmcpLFxuICAgICAgICAgICAgYjogZm10KHRoaXMuYiksXG4gICAgICAgICAgICBhOiB0aGlzLmEsXG4gICAgICAgIH07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBSR0JBIHJlbGF0aXZlIHZhbHVlcyBpbnRlcnBvbGF0ZWQgaW50byBhIHN0cmluZ1xuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUudG9QZXJjZW50YWdlUmdiU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcm5kID0gZnVuY3Rpb24gKHgpIHsgcmV0dXJuIE1hdGgucm91bmQoYm91bmQwMSh4LCAyNTUpICogMTAwKTsgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYSA9PT0gMVxuICAgICAgICAgICAgPyBcInJnYihcIi5jb25jYXQocm5kKHRoaXMuciksIFwiJSwgXCIpLmNvbmNhdChybmQodGhpcy5nKSwgXCIlLCBcIikuY29uY2F0KHJuZCh0aGlzLmIpLCBcIiUpXCIpXG4gICAgICAgICAgICA6IFwicmdiYShcIi5jb25jYXQocm5kKHRoaXMuciksIFwiJSwgXCIpLmNvbmNhdChybmQodGhpcy5nKSwgXCIlLCBcIikuY29uY2F0KHJuZCh0aGlzLmIpLCBcIiUsIFwiKS5jb25jYXQodGhpcy5yb3VuZEEsIFwiKVwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSAncmVhbCcgbmFtZSBvZiB0aGUgY29sb3IgLWlmIHRoZXJlIGlzIG9uZS5cbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnRvTmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuYSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuICd0cmFuc3BhcmVudCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYSA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaGV4ID0gJyMnICsgcmdiVG9IZXgodGhpcy5yLCB0aGlzLmcsIHRoaXMuYiwgZmFsc2UpO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gT2JqZWN0LmVudHJpZXMobmFtZXMpOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIF9iID0gX2FbX2ldLCBrZXkgPSBfYlswXSwgdmFsdWUgPSBfYlsxXTtcbiAgICAgICAgICAgIGlmIChoZXggPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICB2YXIgZm9ybWF0U2V0ID0gQm9vbGVhbihmb3JtYXQpO1xuICAgICAgICBmb3JtYXQgPSBmb3JtYXQgIT09IG51bGwgJiYgZm9ybWF0ICE9PSB2b2lkIDAgPyBmb3JtYXQgOiB0aGlzLmZvcm1hdDtcbiAgICAgICAgdmFyIGZvcm1hdHRlZFN0cmluZyA9IGZhbHNlO1xuICAgICAgICB2YXIgaGFzQWxwaGEgPSB0aGlzLmEgPCAxICYmIHRoaXMuYSA+PSAwO1xuICAgICAgICB2YXIgbmVlZHNBbHBoYUZvcm1hdCA9ICFmb3JtYXRTZXQgJiYgaGFzQWxwaGEgJiYgKGZvcm1hdC5zdGFydHNXaXRoKCdoZXgnKSB8fCBmb3JtYXQgPT09ICduYW1lJyk7XG4gICAgICAgIGlmIChuZWVkc0FscGhhRm9ybWF0KSB7XG4gICAgICAgICAgICAvLyBTcGVjaWFsIGNhc2UgZm9yIFwidHJhbnNwYXJlbnRcIiwgYWxsIG90aGVyIG5vbi1hbHBoYSBmb3JtYXRzXG4gICAgICAgICAgICAvLyB3aWxsIHJldHVybiByZ2JhIHdoZW4gdGhlcmUgaXMgdHJhbnNwYXJlbmN5LlxuICAgICAgICAgICAgaWYgKGZvcm1hdCA9PT0gJ25hbWUnICYmIHRoaXMuYSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRvTmFtZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9SZ2JTdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZm9ybWF0ID09PSAncmdiJykge1xuICAgICAgICAgICAgZm9ybWF0dGVkU3RyaW5nID0gdGhpcy50b1JnYlN0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmb3JtYXQgPT09ICdwcmdiJykge1xuICAgICAgICAgICAgZm9ybWF0dGVkU3RyaW5nID0gdGhpcy50b1BlcmNlbnRhZ2VSZ2JTdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZm9ybWF0ID09PSAnaGV4JyB8fCBmb3JtYXQgPT09ICdoZXg2Jykge1xuICAgICAgICAgICAgZm9ybWF0dGVkU3RyaW5nID0gdGhpcy50b0hleFN0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmb3JtYXQgPT09ICdoZXgzJykge1xuICAgICAgICAgICAgZm9ybWF0dGVkU3RyaW5nID0gdGhpcy50b0hleFN0cmluZyh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZm9ybWF0ID09PSAnaGV4NCcpIHtcbiAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IHRoaXMudG9IZXg4U3RyaW5nKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmb3JtYXQgPT09ICdoZXg4Jykge1xuICAgICAgICAgICAgZm9ybWF0dGVkU3RyaW5nID0gdGhpcy50b0hleDhTdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZm9ybWF0ID09PSAnbmFtZScpIHtcbiAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IHRoaXMudG9OYW1lKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZvcm1hdCA9PT0gJ2hzbCcpIHtcbiAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IHRoaXMudG9Ic2xTdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZm9ybWF0ID09PSAnaHN2Jykge1xuICAgICAgICAgICAgZm9ybWF0dGVkU3RyaW5nID0gdGhpcy50b0hzdlN0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtYXR0ZWRTdHJpbmcgfHwgdGhpcy50b0hleFN0cmluZygpO1xuICAgIH07XG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS50b051bWJlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIChNYXRoLnJvdW5kKHRoaXMucikgPDwgMTYpICsgKE1hdGgucm91bmQodGhpcy5nKSA8PCA4KSArIE1hdGgucm91bmQodGhpcy5iKTtcbiAgICB9O1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVGlueUNvbG9yKHRoaXMudG9TdHJpbmcoKSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBMaWdodGVuIHRoZSBjb2xvciBhIGdpdmVuIGFtb3VudC4gUHJvdmlkaW5nIDEwMCB3aWxsIGFsd2F5cyByZXR1cm4gd2hpdGUuXG4gICAgICogQHBhcmFtIGFtb3VudCAtIHZhbGlkIGJldHdlZW4gMS0xMDBcbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLmxpZ2h0ZW4gPSBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgIGlmIChhbW91bnQgPT09IHZvaWQgMCkgeyBhbW91bnQgPSAxMDsgfVxuICAgICAgICB2YXIgaHNsID0gdGhpcy50b0hzbCgpO1xuICAgICAgICBoc2wubCArPSBhbW91bnQgLyAxMDA7XG4gICAgICAgIGhzbC5sID0gY2xhbXAwMShoc2wubCk7XG4gICAgICAgIHJldHVybiBuZXcgVGlueUNvbG9yKGhzbCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBCcmlnaHRlbiB0aGUgY29sb3IgYSBnaXZlbiBhbW91bnQsIGZyb20gMCB0byAxMDAuXG4gICAgICogQHBhcmFtIGFtb3VudCAtIHZhbGlkIGJldHdlZW4gMS0xMDBcbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLmJyaWdodGVuID0gZnVuY3Rpb24gKGFtb3VudCkge1xuICAgICAgICBpZiAoYW1vdW50ID09PSB2b2lkIDApIHsgYW1vdW50ID0gMTA7IH1cbiAgICAgICAgdmFyIHJnYiA9IHRoaXMudG9SZ2IoKTtcbiAgICAgICAgcmdiLnIgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIHJnYi5yIC0gTWF0aC5yb3VuZCgyNTUgKiAtKGFtb3VudCAvIDEwMCkpKSk7XG4gICAgICAgIHJnYi5nID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCByZ2IuZyAtIE1hdGgucm91bmQoMjU1ICogLShhbW91bnQgLyAxMDApKSkpO1xuICAgICAgICByZ2IuYiA9IE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgcmdiLmIgLSBNYXRoLnJvdW5kKDI1NSAqIC0oYW1vdW50IC8gMTAwKSkpKTtcbiAgICAgICAgcmV0dXJuIG5ldyBUaW55Q29sb3IocmdiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIERhcmtlbiB0aGUgY29sb3IgYSBnaXZlbiBhbW91bnQsIGZyb20gMCB0byAxMDAuXG4gICAgICogUHJvdmlkaW5nIDEwMCB3aWxsIGFsd2F5cyByZXR1cm4gYmxhY2suXG4gICAgICogQHBhcmFtIGFtb3VudCAtIHZhbGlkIGJldHdlZW4gMS0xMDBcbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLmRhcmtlbiA9IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgICAgICAgaWYgKGFtb3VudCA9PT0gdm9pZCAwKSB7IGFtb3VudCA9IDEwOyB9XG4gICAgICAgIHZhciBoc2wgPSB0aGlzLnRvSHNsKCk7XG4gICAgICAgIGhzbC5sIC09IGFtb3VudCAvIDEwMDtcbiAgICAgICAgaHNsLmwgPSBjbGFtcDAxKGhzbC5sKTtcbiAgICAgICAgcmV0dXJuIG5ldyBUaW55Q29sb3IoaHNsKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIE1peCB0aGUgY29sb3Igd2l0aCBwdXJlIHdoaXRlLCBmcm9tIDAgdG8gMTAwLlxuICAgICAqIFByb3ZpZGluZyAwIHdpbGwgZG8gbm90aGluZywgcHJvdmlkaW5nIDEwMCB3aWxsIGFsd2F5cyByZXR1cm4gd2hpdGUuXG4gICAgICogQHBhcmFtIGFtb3VudCAtIHZhbGlkIGJldHdlZW4gMS0xMDBcbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnRpbnQgPSBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgIGlmIChhbW91bnQgPT09IHZvaWQgMCkgeyBhbW91bnQgPSAxMDsgfVxuICAgICAgICByZXR1cm4gdGhpcy5taXgoJ3doaXRlJywgYW1vdW50KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIE1peCB0aGUgY29sb3Igd2l0aCBwdXJlIGJsYWNrLCBmcm9tIDAgdG8gMTAwLlxuICAgICAqIFByb3ZpZGluZyAwIHdpbGwgZG8gbm90aGluZywgcHJvdmlkaW5nIDEwMCB3aWxsIGFsd2F5cyByZXR1cm4gYmxhY2suXG4gICAgICogQHBhcmFtIGFtb3VudCAtIHZhbGlkIGJldHdlZW4gMS0xMDBcbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnNoYWRlID0gZnVuY3Rpb24gKGFtb3VudCkge1xuICAgICAgICBpZiAoYW1vdW50ID09PSB2b2lkIDApIHsgYW1vdW50ID0gMTA7IH1cbiAgICAgICAgcmV0dXJuIHRoaXMubWl4KCdibGFjaycsIGFtb3VudCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEZXNhdHVyYXRlIHRoZSBjb2xvciBhIGdpdmVuIGFtb3VudCwgZnJvbSAwIHRvIDEwMC5cbiAgICAgKiBQcm92aWRpbmcgMTAwIHdpbGwgaXMgdGhlIHNhbWUgYXMgY2FsbGluZyBncmV5c2NhbGVcbiAgICAgKiBAcGFyYW0gYW1vdW50IC0gdmFsaWQgYmV0d2VlbiAxLTEwMFxuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUuZGVzYXR1cmF0ZSA9IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgICAgICAgaWYgKGFtb3VudCA9PT0gdm9pZCAwKSB7IGFtb3VudCA9IDEwOyB9XG4gICAgICAgIHZhciBoc2wgPSB0aGlzLnRvSHNsKCk7XG4gICAgICAgIGhzbC5zIC09IGFtb3VudCAvIDEwMDtcbiAgICAgICAgaHNsLnMgPSBjbGFtcDAxKGhzbC5zKTtcbiAgICAgICAgcmV0dXJuIG5ldyBUaW55Q29sb3IoaHNsKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNhdHVyYXRlIHRoZSBjb2xvciBhIGdpdmVuIGFtb3VudCwgZnJvbSAwIHRvIDEwMC5cbiAgICAgKiBAcGFyYW0gYW1vdW50IC0gdmFsaWQgYmV0d2VlbiAxLTEwMFxuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUuc2F0dXJhdGUgPSBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgIGlmIChhbW91bnQgPT09IHZvaWQgMCkgeyBhbW91bnQgPSAxMDsgfVxuICAgICAgICB2YXIgaHNsID0gdGhpcy50b0hzbCgpO1xuICAgICAgICBoc2wucyArPSBhbW91bnQgLyAxMDA7XG4gICAgICAgIGhzbC5zID0gY2xhbXAwMShoc2wucyk7XG4gICAgICAgIHJldHVybiBuZXcgVGlueUNvbG9yKGhzbCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb21wbGV0ZWx5IGRlc2F0dXJhdGVzIGEgY29sb3IgaW50byBncmV5c2NhbGUuXG4gICAgICogU2FtZSBhcyBjYWxsaW5nIGBkZXNhdHVyYXRlKDEwMClgXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS5ncmV5c2NhbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlc2F0dXJhdGUoMTAwKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNwaW4gdGFrZXMgYSBwb3NpdGl2ZSBvciBuZWdhdGl2ZSBhbW91bnQgd2l0aGluIFstMzYwLCAzNjBdIGluZGljYXRpbmcgdGhlIGNoYW5nZSBvZiBodWUuXG4gICAgICogVmFsdWVzIG91dHNpZGUgb2YgdGhpcyByYW5nZSB3aWxsIGJlIHdyYXBwZWQgaW50byB0aGlzIHJhbmdlLlxuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUuc3BpbiA9IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgICAgICAgdmFyIGhzbCA9IHRoaXMudG9Ic2woKTtcbiAgICAgICAgdmFyIGh1ZSA9IChoc2wuaCArIGFtb3VudCkgJSAzNjA7XG4gICAgICAgIGhzbC5oID0gaHVlIDwgMCA/IDM2MCArIGh1ZSA6IGh1ZTtcbiAgICAgICAgcmV0dXJuIG5ldyBUaW55Q29sb3IoaHNsKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIE1peCB0aGUgY3VycmVudCBjb2xvciBhIGdpdmVuIGFtb3VudCB3aXRoIGFub3RoZXIgY29sb3IsIGZyb20gMCB0byAxMDAuXG4gICAgICogMCBtZWFucyBubyBtaXhpbmcgKHJldHVybiBjdXJyZW50IGNvbG9yKS5cbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLm1peCA9IGZ1bmN0aW9uIChjb2xvciwgYW1vdW50KSB7XG4gICAgICAgIGlmIChhbW91bnQgPT09IHZvaWQgMCkgeyBhbW91bnQgPSA1MDsgfVxuICAgICAgICB2YXIgcmdiMSA9IHRoaXMudG9SZ2IoKTtcbiAgICAgICAgdmFyIHJnYjIgPSBuZXcgVGlueUNvbG9yKGNvbG9yKS50b1JnYigpO1xuICAgICAgICB2YXIgcCA9IGFtb3VudCAvIDEwMDtcbiAgICAgICAgdmFyIHJnYmEgPSB7XG4gICAgICAgICAgICByOiAocmdiMi5yIC0gcmdiMS5yKSAqIHAgKyByZ2IxLnIsXG4gICAgICAgICAgICBnOiAocmdiMi5nIC0gcmdiMS5nKSAqIHAgKyByZ2IxLmcsXG4gICAgICAgICAgICBiOiAocmdiMi5iIC0gcmdiMS5iKSAqIHAgKyByZ2IxLmIsXG4gICAgICAgICAgICBhOiAocmdiMi5hIC0gcmdiMS5hKSAqIHAgKyByZ2IxLmEsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgVGlueUNvbG9yKHJnYmEpO1xuICAgIH07XG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS5hbmFsb2dvdXMgPSBmdW5jdGlvbiAocmVzdWx0cywgc2xpY2VzKSB7XG4gICAgICAgIGlmIChyZXN1bHRzID09PSB2b2lkIDApIHsgcmVzdWx0cyA9IDY7IH1cbiAgICAgICAgaWYgKHNsaWNlcyA9PT0gdm9pZCAwKSB7IHNsaWNlcyA9IDMwOyB9XG4gICAgICAgIHZhciBoc2wgPSB0aGlzLnRvSHNsKCk7XG4gICAgICAgIHZhciBwYXJ0ID0gMzYwIC8gc2xpY2VzO1xuICAgICAgICB2YXIgcmV0ID0gW3RoaXNdO1xuICAgICAgICBmb3IgKGhzbC5oID0gKGhzbC5oIC0gKChwYXJ0ICogcmVzdWx0cykgPj4gMSkgKyA3MjApICUgMzYwOyAtLXJlc3VsdHM7KSB7XG4gICAgICAgICAgICBoc2wuaCA9IChoc2wuaCArIHBhcnQpICUgMzYwO1xuICAgICAgICAgICAgcmV0LnB1c2gobmV3IFRpbnlDb2xvcihoc2wpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogdGFrZW4gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vaW5mdXNpb24valF1ZXJ5LXhjb2xvci9ibG9iL21hc3Rlci9qcXVlcnkueGNvbG9yLmpzXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS5jb21wbGVtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaHNsID0gdGhpcy50b0hzbCgpO1xuICAgICAgICBoc2wuaCA9IChoc2wuaCArIDE4MCkgJSAzNjA7XG4gICAgICAgIHJldHVybiBuZXcgVGlueUNvbG9yKGhzbCk7XG4gICAgfTtcbiAgICBUaW55Q29sb3IucHJvdG90eXBlLm1vbm9jaHJvbWF0aWMgPSBmdW5jdGlvbiAocmVzdWx0cykge1xuICAgICAgICBpZiAocmVzdWx0cyA9PT0gdm9pZCAwKSB7IHJlc3VsdHMgPSA2OyB9XG4gICAgICAgIHZhciBoc3YgPSB0aGlzLnRvSHN2KCk7XG4gICAgICAgIHZhciBoID0gaHN2Lmg7XG4gICAgICAgIHZhciBzID0gaHN2LnM7XG4gICAgICAgIHZhciB2ID0gaHN2LnY7XG4gICAgICAgIHZhciByZXMgPSBbXTtcbiAgICAgICAgdmFyIG1vZGlmaWNhdGlvbiA9IDEgLyByZXN1bHRzO1xuICAgICAgICB3aGlsZSAocmVzdWx0cy0tKSB7XG4gICAgICAgICAgICByZXMucHVzaChuZXcgVGlueUNvbG9yKHsgaDogaCwgczogcywgdjogdiB9KSk7XG4gICAgICAgICAgICB2ID0gKHYgKyBtb2RpZmljYXRpb24pICUgMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH07XG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS5zcGxpdGNvbXBsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBoc2wgPSB0aGlzLnRvSHNsKCk7XG4gICAgICAgIHZhciBoID0gaHNsLmg7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgbmV3IFRpbnlDb2xvcih7IGg6IChoICsgNzIpICUgMzYwLCBzOiBoc2wucywgbDogaHNsLmwgfSksXG4gICAgICAgICAgICBuZXcgVGlueUNvbG9yKHsgaDogKGggKyAyMTYpICUgMzYwLCBzOiBoc2wucywgbDogaHNsLmwgfSksXG4gICAgICAgIF07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb21wdXRlIGhvdyB0aGUgY29sb3Igd291bGQgYXBwZWFyIG9uIGEgYmFja2dyb3VuZFxuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUub25CYWNrZ3JvdW5kID0gZnVuY3Rpb24gKGJhY2tncm91bmQpIHtcbiAgICAgICAgdmFyIGZnID0gdGhpcy50b1JnYigpO1xuICAgICAgICB2YXIgYmcgPSBuZXcgVGlueUNvbG9yKGJhY2tncm91bmQpLnRvUmdiKCk7XG4gICAgICAgIHJldHVybiBuZXcgVGlueUNvbG9yKHtcbiAgICAgICAgICAgIHI6IGJnLnIgKyAoZmcuciAtIGJnLnIpICogZmcuYSxcbiAgICAgICAgICAgIGc6IGJnLmcgKyAoZmcuZyAtIGJnLmcpICogZmcuYSxcbiAgICAgICAgICAgIGI6IGJnLmIgKyAoZmcuYiAtIGJnLmIpICogZmcuYSxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3IgYHBvbHlhZCgzKWBcbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnRyaWFkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb2x5YWQoMyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3IgYHBvbHlhZCg0KWBcbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnRldHJhZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9seWFkKDQpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHBvbHlhZCBjb2xvcnMsIGxpa2UgKGZvciAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCBldGMuLi4pXG4gICAgICogbW9uYWQsIGR5YWQsIHRyaWFkLCB0ZXRyYWQsIHBlbnRhZCwgaGV4YWQsIGhlcHRhZCwgb2N0YWQsIGV0Yy4uLlxuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUucG9seWFkID0gZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgdmFyIGhzbCA9IHRoaXMudG9Ic2woKTtcbiAgICAgICAgdmFyIGggPSBoc2wuaDtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFt0aGlzXTtcbiAgICAgICAgdmFyIGluY3JlbWVudCA9IDM2MCAvIG47XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChuZXcgVGlueUNvbG9yKHsgaDogKGggKyBpICogaW5jcmVtZW50KSAlIDM2MCwgczogaHNsLnMsIGw6IGhzbC5sIH0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogY29tcGFyZSBjb2xvciB2cyBjdXJyZW50IGNvbG9yXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiAoY29sb3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9SZ2JTdHJpbmcoKSA9PT0gbmV3IFRpbnlDb2xvcihjb2xvcikudG9SZ2JTdHJpbmcoKTtcbiAgICB9O1xuICAgIHJldHVybiBUaW55Q29sb3I7XG59KCkpO1xuZXhwb3J0IHsgVGlueUNvbG9yIH07XG4vLyBrZXB0IGZvciBiYWNrd2FyZHMgY29tcGF0YWJpbGl0eSB3aXRoIHYxXG5leHBvcnQgZnVuY3Rpb24gdGlueWNvbG9yKGNvbG9yLCBvcHRzKSB7XG4gICAgaWYgKGNvbG9yID09PSB2b2lkIDApIHsgY29sb3IgPSAnJzsgfVxuICAgIGlmIChvcHRzID09PSB2b2lkIDApIHsgb3B0cyA9IHt9OyB9XG4gICAgcmV0dXJuIG5ldyBUaW55Q29sb3IoY29sb3IsIG9wdHMpO1xufVxuIiwiZXhwb3J0IHt9O1xuIiwiaW1wb3J0IHsgdGlueWNvbG9yIH0gZnJvbSAnLi9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vY3NzLWNvbG9yLW5hbWVzJztcbmV4cG9ydCAqIGZyb20gJy4vcmVhZGFiaWxpdHknO1xuZXhwb3J0ICogZnJvbSAnLi90by1tcy1maWx0ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9mcm9tLXJhdGlvJztcbmV4cG9ydCAqIGZyb20gJy4vZm9ybWF0LWlucHV0JztcbmV4cG9ydCAqIGZyb20gJy4vcmFuZG9tJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlcyc7XG5leHBvcnQgKiBmcm9tICcuL2NvbnZlcnNpb24nO1xuLy8ga2VwdCBmb3IgYmFja3dhcmRzIGNvbXBhdGFiaWxpdHkgd2l0aCB2MVxuZXhwb3J0IGRlZmF1bHQgdGlueWNvbG9yO1xuIiwiLy8gcmFuZG9tQ29sb3IgYnkgRGF2aWQgTWVyZmllbGQgdW5kZXIgdGhlIENDMCBsaWNlbnNlXG4vLyBodHRwczovL2dpdGh1Yi5jb20vZGF2aWRtZXJmaWVsZC9yYW5kb21Db2xvci9cbmltcG9ydCB7IFRpbnlDb2xvciB9IGZyb20gJy4vaW5kZXgnO1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbShvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAvLyBDaGVjayBpZiB3ZSBuZWVkIHRvIGdlbmVyYXRlIG11bHRpcGxlIGNvbG9yc1xuICAgIGlmIChvcHRpb25zLmNvdW50ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgb3B0aW9ucy5jb3VudCAhPT0gbnVsbCkge1xuICAgICAgICB2YXIgdG90YWxDb2xvcnMgPSBvcHRpb25zLmNvdW50O1xuICAgICAgICB2YXIgY29sb3JzID0gW107XG4gICAgICAgIG9wdGlvbnMuY291bnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHdoaWxlICh0b3RhbENvbG9ycyA+IGNvbG9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIFNpbmNlIHdlJ3JlIGdlbmVyYXRpbmcgbXVsdGlwbGUgY29sb3JzLFxuICAgICAgICAgICAgLy8gaW5jcmVtZW1lbnQgdGhlIHNlZWQuIE90aGVyd2lzZSB3ZSdkIGp1c3RcbiAgICAgICAgICAgIC8vIGdlbmVyYXRlIHRoZSBzYW1lIGNvbG9yIGVhY2ggdGltZS4uLlxuICAgICAgICAgICAgb3B0aW9ucy5jb3VudCA9IG51bGw7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5zZWVkKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5zZWVkICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb2xvcnMucHVzaChyYW5kb20ob3B0aW9ucykpO1xuICAgICAgICB9XG4gICAgICAgIG9wdGlvbnMuY291bnQgPSB0b3RhbENvbG9ycztcbiAgICAgICAgcmV0dXJuIGNvbG9ycztcbiAgICB9XG4gICAgLy8gRmlyc3Qgd2UgcGljayBhIGh1ZSAoSClcbiAgICB2YXIgaCA9IHBpY2tIdWUob3B0aW9ucy5odWUsIG9wdGlvbnMuc2VlZCk7XG4gICAgLy8gVGhlbiB1c2UgSCB0byBkZXRlcm1pbmUgc2F0dXJhdGlvbiAoUylcbiAgICB2YXIgcyA9IHBpY2tTYXR1cmF0aW9uKGgsIG9wdGlvbnMpO1xuICAgIC8vIFRoZW4gdXNlIFMgYW5kIEggdG8gZGV0ZXJtaW5lIGJyaWdodG5lc3MgKEIpLlxuICAgIHZhciB2ID0gcGlja0JyaWdodG5lc3MoaCwgcywgb3B0aW9ucyk7XG4gICAgdmFyIHJlcyA9IHsgaDogaCwgczogcywgdjogdiB9O1xuICAgIGlmIChvcHRpb25zLmFscGhhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzLmEgPSBvcHRpb25zLmFscGhhO1xuICAgIH1cbiAgICAvLyBUaGVuIHdlIHJldHVybiB0aGUgSFNCIGNvbG9yIGluIHRoZSBkZXNpcmVkIGZvcm1hdFxuICAgIHJldHVybiBuZXcgVGlueUNvbG9yKHJlcyk7XG59XG5mdW5jdGlvbiBwaWNrSHVlKGh1ZSwgc2VlZCkge1xuICAgIHZhciBodWVSYW5nZSA9IGdldEh1ZVJhbmdlKGh1ZSk7XG4gICAgdmFyIHJlcyA9IHJhbmRvbVdpdGhpbihodWVSYW5nZSwgc2VlZCk7XG4gICAgLy8gSW5zdGVhZCBvZiBzdG9yaW5nIHJlZCBhcyB0d28gc2VwZXJhdGUgcmFuZ2VzLFxuICAgIC8vIHdlIGdyb3VwIHRoZW0sIHVzaW5nIG5lZ2F0aXZlIG51bWJlcnNcbiAgICBpZiAocmVzIDwgMCkge1xuICAgICAgICByZXMgPSAzNjAgKyByZXM7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5mdW5jdGlvbiBwaWNrU2F0dXJhdGlvbihodWUsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5odWUgPT09ICdtb25vY2hyb21lJykge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMubHVtaW5vc2l0eSA9PT0gJ3JhbmRvbScpIHtcbiAgICAgICAgcmV0dXJuIHJhbmRvbVdpdGhpbihbMCwgMTAwXSwgb3B0aW9ucy5zZWVkKTtcbiAgICB9XG4gICAgdmFyIHNhdHVyYXRpb25SYW5nZSA9IGdldENvbG9ySW5mbyhodWUpLnNhdHVyYXRpb25SYW5nZTtcbiAgICB2YXIgc01pbiA9IHNhdHVyYXRpb25SYW5nZVswXTtcbiAgICB2YXIgc01heCA9IHNhdHVyYXRpb25SYW5nZVsxXTtcbiAgICBzd2l0Y2ggKG9wdGlvbnMubHVtaW5vc2l0eSkge1xuICAgICAgICBjYXNlICdicmlnaHQnOlxuICAgICAgICAgICAgc01pbiA9IDU1O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2RhcmsnOlxuICAgICAgICAgICAgc01pbiA9IHNNYXggLSAxMDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdsaWdodCc6XG4gICAgICAgICAgICBzTWF4ID0gNTU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gcmFuZG9tV2l0aGluKFtzTWluLCBzTWF4XSwgb3B0aW9ucy5zZWVkKTtcbn1cbmZ1bmN0aW9uIHBpY2tCcmlnaHRuZXNzKEgsIFMsIG9wdGlvbnMpIHtcbiAgICB2YXIgYk1pbiA9IGdldE1pbmltdW1CcmlnaHRuZXNzKEgsIFMpO1xuICAgIHZhciBiTWF4ID0gMTAwO1xuICAgIHN3aXRjaCAob3B0aW9ucy5sdW1pbm9zaXR5KSB7XG4gICAgICAgIGNhc2UgJ2RhcmsnOlxuICAgICAgICAgICAgYk1heCA9IGJNaW4gKyAyMDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdsaWdodCc6XG4gICAgICAgICAgICBiTWluID0gKGJNYXggKyBiTWluKSAvIDI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncmFuZG9tJzpcbiAgICAgICAgICAgIGJNaW4gPSAwO1xuICAgICAgICAgICAgYk1heCA9IDEwMDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiByYW5kb21XaXRoaW4oW2JNaW4sIGJNYXhdLCBvcHRpb25zLnNlZWQpO1xufVxuZnVuY3Rpb24gZ2V0TWluaW11bUJyaWdodG5lc3MoSCwgUykge1xuICAgIHZhciBsb3dlckJvdW5kcyA9IGdldENvbG9ySW5mbyhIKS5sb3dlckJvdW5kcztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxvd2VyQm91bmRzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICB2YXIgczEgPSBsb3dlckJvdW5kc1tpXVswXTtcbiAgICAgICAgdmFyIHYxID0gbG93ZXJCb3VuZHNbaV1bMV07XG4gICAgICAgIHZhciBzMiA9IGxvd2VyQm91bmRzW2kgKyAxXVswXTtcbiAgICAgICAgdmFyIHYyID0gbG93ZXJCb3VuZHNbaSArIDFdWzFdO1xuICAgICAgICBpZiAoUyA+PSBzMSAmJiBTIDw9IHMyKSB7XG4gICAgICAgICAgICB2YXIgbSA9ICh2MiAtIHYxKSAvIChzMiAtIHMxKTtcbiAgICAgICAgICAgIHZhciBiID0gdjEgLSBtICogczE7XG4gICAgICAgICAgICByZXR1cm4gbSAqIFMgKyBiO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAwO1xufVxuZnVuY3Rpb24gZ2V0SHVlUmFuZ2UoY29sb3JJbnB1dCkge1xuICAgIHZhciBudW0gPSBwYXJzZUludChjb2xvcklucHV0LCAxMCk7XG4gICAgaWYgKCFOdW1iZXIuaXNOYU4obnVtKSAmJiBudW0gPCAzNjAgJiYgbnVtID4gMCkge1xuICAgICAgICByZXR1cm4gW251bSwgbnVtXTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjb2xvcklucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICB2YXIgbmFtZWRDb2xvciA9IGJvdW5kcy5maW5kKGZ1bmN0aW9uIChuKSB7IHJldHVybiBuLm5hbWUgPT09IGNvbG9ySW5wdXQ7IH0pO1xuICAgICAgICBpZiAobmFtZWRDb2xvcikge1xuICAgICAgICAgICAgdmFyIGNvbG9yID0gZGVmaW5lQ29sb3IobmFtZWRDb2xvcik7XG4gICAgICAgICAgICBpZiAoY29sb3IuaHVlUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sb3IuaHVlUmFuZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBhcnNlZCA9IG5ldyBUaW55Q29sb3IoY29sb3JJbnB1dCk7XG4gICAgICAgIGlmIChwYXJzZWQuaXNWYWxpZCkge1xuICAgICAgICAgICAgdmFyIGh1ZSA9IHBhcnNlZC50b0hzdigpLmg7XG4gICAgICAgICAgICByZXR1cm4gW2h1ZSwgaHVlXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gWzAsIDM2MF07XG59XG5mdW5jdGlvbiBnZXRDb2xvckluZm8oaHVlKSB7XG4gICAgLy8gTWFwcyByZWQgY29sb3JzIHRvIG1ha2UgcGlja2luZyBodWUgZWFzaWVyXG4gICAgaWYgKGh1ZSA+PSAzMzQgJiYgaHVlIDw9IDM2MCkge1xuICAgICAgICBodWUgLT0gMzYwO1xuICAgIH1cbiAgICBmb3IgKHZhciBfaSA9IDAsIGJvdW5kc18xID0gYm91bmRzOyBfaSA8IGJvdW5kc18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgYm91bmQgPSBib3VuZHNfMVtfaV07XG4gICAgICAgIHZhciBjb2xvciA9IGRlZmluZUNvbG9yKGJvdW5kKTtcbiAgICAgICAgaWYgKGNvbG9yLmh1ZVJhbmdlICYmIGh1ZSA+PSBjb2xvci5odWVSYW5nZVswXSAmJiBodWUgPD0gY29sb3IuaHVlUmFuZ2VbMV0pIHtcbiAgICAgICAgICAgIHJldHVybiBjb2xvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBFcnJvcignQ29sb3Igbm90IGZvdW5kJyk7XG59XG5mdW5jdGlvbiByYW5kb21XaXRoaW4ocmFuZ2UsIHNlZWQpIHtcbiAgICBpZiAoc2VlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHJhbmdlWzBdICsgTWF0aC5yYW5kb20oKSAqIChyYW5nZVsxXSArIDEgLSByYW5nZVswXSkpO1xuICAgIH1cbiAgICAvLyBTZWVkZWQgcmFuZG9tIGFsZ29yaXRobSBmcm9tIGh0dHA6Ly9pbmRpZWdhbXIuY29tL2dlbmVyYXRlLXJlcGVhdGFibGUtcmFuZG9tLW51bWJlcnMtaW4tanMvXG4gICAgdmFyIG1heCA9IHJhbmdlWzFdIHx8IDE7XG4gICAgdmFyIG1pbiA9IHJhbmdlWzBdIHx8IDA7XG4gICAgc2VlZCA9IChzZWVkICogOTMwMSArIDQ5Mjk3KSAlIDIzMzI4MDtcbiAgICB2YXIgcm5kID0gc2VlZCAvIDIzMzI4MC4wO1xuICAgIHJldHVybiBNYXRoLmZsb29yKG1pbiArIHJuZCAqIChtYXggLSBtaW4pKTtcbn1cbmZ1bmN0aW9uIGRlZmluZUNvbG9yKGJvdW5kKSB7XG4gICAgdmFyIHNNaW4gPSBib3VuZC5sb3dlckJvdW5kc1swXVswXTtcbiAgICB2YXIgc01heCA9IGJvdW5kLmxvd2VyQm91bmRzW2JvdW5kLmxvd2VyQm91bmRzLmxlbmd0aCAtIDFdWzBdO1xuICAgIHZhciBiTWluID0gYm91bmQubG93ZXJCb3VuZHNbYm91bmQubG93ZXJCb3VuZHMubGVuZ3RoIC0gMV1bMV07XG4gICAgdmFyIGJNYXggPSBib3VuZC5sb3dlckJvdW5kc1swXVsxXTtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBib3VuZC5uYW1lLFxuICAgICAgICBodWVSYW5nZTogYm91bmQuaHVlUmFuZ2UsXG4gICAgICAgIGxvd2VyQm91bmRzOiBib3VuZC5sb3dlckJvdW5kcyxcbiAgICAgICAgc2F0dXJhdGlvblJhbmdlOiBbc01pbiwgc01heF0sXG4gICAgICAgIGJyaWdodG5lc3NSYW5nZTogW2JNaW4sIGJNYXhdLFxuICAgIH07XG59XG4vKipcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IHZhciBib3VuZHMgPSBbXG4gICAge1xuICAgICAgICBuYW1lOiAnbW9ub2Nocm9tZScsXG4gICAgICAgIGh1ZVJhbmdlOiBudWxsLFxuICAgICAgICBsb3dlckJvdW5kczogW1xuICAgICAgICAgICAgWzAsIDBdLFxuICAgICAgICAgICAgWzEwMCwgMF0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdyZWQnLFxuICAgICAgICBodWVSYW5nZTogWy0yNiwgMThdLFxuICAgICAgICBsb3dlckJvdW5kczogW1xuICAgICAgICAgICAgWzIwLCAxMDBdLFxuICAgICAgICAgICAgWzMwLCA5Ml0sXG4gICAgICAgICAgICBbNDAsIDg5XSxcbiAgICAgICAgICAgIFs1MCwgODVdLFxuICAgICAgICAgICAgWzYwLCA3OF0sXG4gICAgICAgICAgICBbNzAsIDcwXSxcbiAgICAgICAgICAgIFs4MCwgNjBdLFxuICAgICAgICAgICAgWzkwLCA1NV0sXG4gICAgICAgICAgICBbMTAwLCA1MF0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdvcmFuZ2UnLFxuICAgICAgICBodWVSYW5nZTogWzE5LCA0Nl0sXG4gICAgICAgIGxvd2VyQm91bmRzOiBbXG4gICAgICAgICAgICBbMjAsIDEwMF0sXG4gICAgICAgICAgICBbMzAsIDkzXSxcbiAgICAgICAgICAgIFs0MCwgODhdLFxuICAgICAgICAgICAgWzUwLCA4Nl0sXG4gICAgICAgICAgICBbNjAsIDg1XSxcbiAgICAgICAgICAgIFs3MCwgNzBdLFxuICAgICAgICAgICAgWzEwMCwgNzBdLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAneWVsbG93JyxcbiAgICAgICAgaHVlUmFuZ2U6IFs0NywgNjJdLFxuICAgICAgICBsb3dlckJvdW5kczogW1xuICAgICAgICAgICAgWzI1LCAxMDBdLFxuICAgICAgICAgICAgWzQwLCA5NF0sXG4gICAgICAgICAgICBbNTAsIDg5XSxcbiAgICAgICAgICAgIFs2MCwgODZdLFxuICAgICAgICAgICAgWzcwLCA4NF0sXG4gICAgICAgICAgICBbODAsIDgyXSxcbiAgICAgICAgICAgIFs5MCwgODBdLFxuICAgICAgICAgICAgWzEwMCwgNzVdLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZ3JlZW4nLFxuICAgICAgICBodWVSYW5nZTogWzYzLCAxNzhdLFxuICAgICAgICBsb3dlckJvdW5kczogW1xuICAgICAgICAgICAgWzMwLCAxMDBdLFxuICAgICAgICAgICAgWzQwLCA5MF0sXG4gICAgICAgICAgICBbNTAsIDg1XSxcbiAgICAgICAgICAgIFs2MCwgODFdLFxuICAgICAgICAgICAgWzcwLCA3NF0sXG4gICAgICAgICAgICBbODAsIDY0XSxcbiAgICAgICAgICAgIFs5MCwgNTBdLFxuICAgICAgICAgICAgWzEwMCwgNDBdLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnYmx1ZScsXG4gICAgICAgIGh1ZVJhbmdlOiBbMTc5LCAyNTddLFxuICAgICAgICBsb3dlckJvdW5kczogW1xuICAgICAgICAgICAgWzIwLCAxMDBdLFxuICAgICAgICAgICAgWzMwLCA4Nl0sXG4gICAgICAgICAgICBbNDAsIDgwXSxcbiAgICAgICAgICAgIFs1MCwgNzRdLFxuICAgICAgICAgICAgWzYwLCA2MF0sXG4gICAgICAgICAgICBbNzAsIDUyXSxcbiAgICAgICAgICAgIFs4MCwgNDRdLFxuICAgICAgICAgICAgWzkwLCAzOV0sXG4gICAgICAgICAgICBbMTAwLCAzNV0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdwdXJwbGUnLFxuICAgICAgICBodWVSYW5nZTogWzI1OCwgMjgyXSxcbiAgICAgICAgbG93ZXJCb3VuZHM6IFtcbiAgICAgICAgICAgIFsyMCwgMTAwXSxcbiAgICAgICAgICAgIFszMCwgODddLFxuICAgICAgICAgICAgWzQwLCA3OV0sXG4gICAgICAgICAgICBbNTAsIDcwXSxcbiAgICAgICAgICAgIFs2MCwgNjVdLFxuICAgICAgICAgICAgWzcwLCA1OV0sXG4gICAgICAgICAgICBbODAsIDUyXSxcbiAgICAgICAgICAgIFs5MCwgNDVdLFxuICAgICAgICAgICAgWzEwMCwgNDJdLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAncGluaycsXG4gICAgICAgIGh1ZVJhbmdlOiBbMjgzLCAzMzRdLFxuICAgICAgICBsb3dlckJvdW5kczogW1xuICAgICAgICAgICAgWzIwLCAxMDBdLFxuICAgICAgICAgICAgWzMwLCA5MF0sXG4gICAgICAgICAgICBbNDAsIDg2XSxcbiAgICAgICAgICAgIFs2MCwgODRdLFxuICAgICAgICAgICAgWzgwLCA4MF0sXG4gICAgICAgICAgICBbOTAsIDc1XSxcbiAgICAgICAgICAgIFsxMDAsIDczXSxcbiAgICAgICAgXSxcbiAgICB9LFxuXTtcbiIsImltcG9ydCB7IFRpbnlDb2xvciB9IGZyb20gJy4vaW5kZXgnO1xuLy8gUmVhZGFiaWxpdHkgRnVuY3Rpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIDxodHRwOi8vd3d3LnczLm9yZy9UUi8yMDA4L1JFQy1XQ0FHMjAtMjAwODEyMTEvI2NvbnRyYXN0LXJhdGlvZGVmIChXQ0FHIFZlcnNpb24gMilcbi8qKlxuICogQUtBIGBjb250cmFzdGBcbiAqXG4gKiBBbmFseXplIHRoZSAyIGNvbG9ycyBhbmQgcmV0dXJucyB0aGUgY29sb3IgY29udHJhc3QgZGVmaW5lZCBieSAoV0NBRyBWZXJzaW9uIDIpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWFkYWJpbGl0eShjb2xvcjEsIGNvbG9yMikge1xuICAgIHZhciBjMSA9IG5ldyBUaW55Q29sb3IoY29sb3IxKTtcbiAgICB2YXIgYzIgPSBuZXcgVGlueUNvbG9yKGNvbG9yMik7XG4gICAgcmV0dXJuICgoTWF0aC5tYXgoYzEuZ2V0THVtaW5hbmNlKCksIGMyLmdldEx1bWluYW5jZSgpKSArIDAuMDUpIC9cbiAgICAgICAgKE1hdGgubWluKGMxLmdldEx1bWluYW5jZSgpLCBjMi5nZXRMdW1pbmFuY2UoKSkgKyAwLjA1KSk7XG59XG4vKipcbiAqIEVuc3VyZSB0aGF0IGZvcmVncm91bmQgYW5kIGJhY2tncm91bmQgY29sb3IgY29tYmluYXRpb25zIG1lZXQgV0NBRzIgZ3VpZGVsaW5lcy5cbiAqIFRoZSB0aGlyZCBhcmd1bWVudCBpcyBhbiBvYmplY3QuXG4gKiAgICAgIHRoZSAnbGV2ZWwnIHByb3BlcnR5IHN0YXRlcyAnQUEnIG9yICdBQUEnIC0gaWYgbWlzc2luZyBvciBpbnZhbGlkLCBpdCBkZWZhdWx0cyB0byAnQUEnO1xuICogICAgICB0aGUgJ3NpemUnIHByb3BlcnR5IHN0YXRlcyAnbGFyZ2UnIG9yICdzbWFsbCcgLSBpZiBtaXNzaW5nIG9yIGludmFsaWQsIGl0IGRlZmF1bHRzIHRvICdzbWFsbCcuXG4gKiBJZiB0aGUgZW50aXJlIG9iamVjdCBpcyBhYnNlbnQsIGlzUmVhZGFibGUgZGVmYXVsdHMgdG8ge2xldmVsOlwiQUFcIixzaXplOlwic21hbGxcIn0uXG4gKlxuICogRXhhbXBsZVxuICogYGBgdHNcbiAqIG5ldyBUaW55Q29sb3IoKS5pc1JlYWRhYmxlKCcjMDAwJywgJyMxMTEnKSA9PiBmYWxzZVxuICogbmV3IFRpbnlDb2xvcigpLmlzUmVhZGFibGUoJyMwMDAnLCAnIzExMScsIHsgbGV2ZWw6ICdBQScsIHNpemU6ICdsYXJnZScgfSkgPT4gZmFsc2VcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNSZWFkYWJsZShjb2xvcjEsIGNvbG9yMiwgd2NhZzIpIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGlmICh3Y2FnMiA9PT0gdm9pZCAwKSB7IHdjYWcyID0geyBsZXZlbDogJ0FBJywgc2l6ZTogJ3NtYWxsJyB9OyB9XG4gICAgdmFyIHJlYWRhYmlsaXR5TGV2ZWwgPSByZWFkYWJpbGl0eShjb2xvcjEsIGNvbG9yMik7XG4gICAgc3dpdGNoICgoKF9hID0gd2NhZzIubGV2ZWwpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICdBQScpICsgKChfYiA9IHdjYWcyLnNpemUpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6ICdzbWFsbCcpKSB7XG4gICAgICAgIGNhc2UgJ0FBc21hbGwnOlxuICAgICAgICBjYXNlICdBQUFsYXJnZSc6XG4gICAgICAgICAgICByZXR1cm4gcmVhZGFiaWxpdHlMZXZlbCA+PSA0LjU7XG4gICAgICAgIGNhc2UgJ0FBbGFyZ2UnOlxuICAgICAgICAgICAgcmV0dXJuIHJlYWRhYmlsaXR5TGV2ZWwgPj0gMztcbiAgICAgICAgY2FzZSAnQUFBc21hbGwnOlxuICAgICAgICAgICAgcmV0dXJuIHJlYWRhYmlsaXR5TGV2ZWwgPj0gNztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4vKipcbiAqIEdpdmVuIGEgYmFzZSBjb2xvciBhbmQgYSBsaXN0IG9mIHBvc3NpYmxlIGZvcmVncm91bmQgb3IgYmFja2dyb3VuZFxuICogY29sb3JzIGZvciB0aGF0IGJhc2UsIHJldHVybnMgdGhlIG1vc3QgcmVhZGFibGUgY29sb3IuXG4gKiBPcHRpb25hbGx5IHJldHVybnMgQmxhY2sgb3IgV2hpdGUgaWYgdGhlIG1vc3QgcmVhZGFibGUgY29sb3IgaXMgdW5yZWFkYWJsZS5cbiAqXG4gKiBAcGFyYW0gYmFzZUNvbG9yIC0gdGhlIGJhc2UgY29sb3IuXG4gKiBAcGFyYW0gY29sb3JMaXN0IC0gYXJyYXkgb2YgY29sb3JzIHRvIHBpY2sgdGhlIG1vc3QgcmVhZGFibGUgb25lIGZyb20uXG4gKiBAcGFyYW0gYXJncyAtIGFuZCBvYmplY3Qgd2l0aCBleHRyYSBhcmd1bWVudHNcbiAqXG4gKiBFeGFtcGxlXG4gKiBgYGB0c1xuICogbmV3IFRpbnlDb2xvcigpLm1vc3RSZWFkYWJsZSgnIzEyMycsIFsnIzEyNFwiLCBcIiMxMjUnXSwgeyBpbmNsdWRlRmFsbGJhY2tDb2xvcnM6IGZhbHNlIH0pLnRvSGV4U3RyaW5nKCk7IC8vIFwiIzExMjI1NVwiXG4gKiBuZXcgVGlueUNvbG9yKCkubW9zdFJlYWRhYmxlKCcjMTIzJywgWycjMTI0XCIsIFwiIzEyNSddLHsgaW5jbHVkZUZhbGxiYWNrQ29sb3JzOiB0cnVlIH0pLnRvSGV4U3RyaW5nKCk7ICAvLyBcIiNmZmZmZmZcIlxuICogbmV3IFRpbnlDb2xvcigpLm1vc3RSZWFkYWJsZSgnI2E4MDE1YScsIFtcIiNmYWYzZjNcIl0sIHsgaW5jbHVkZUZhbGxiYWNrQ29sb3JzOnRydWUsIGxldmVsOiAnQUFBJywgc2l6ZTogJ2xhcmdlJyB9KS50b0hleFN0cmluZygpOyAvLyBcIiNmYWYzZjNcIlxuICogbmV3IFRpbnlDb2xvcigpLm1vc3RSZWFkYWJsZSgnI2E4MDE1YScsIFtcIiNmYWYzZjNcIl0sIHsgaW5jbHVkZUZhbGxiYWNrQ29sb3JzOnRydWUsIGxldmVsOiAnQUFBJywgc2l6ZTogJ3NtYWxsJyB9KS50b0hleFN0cmluZygpOyAvLyBcIiNmZmZmZmZcIlxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtb3N0UmVhZGFibGUoYmFzZUNvbG9yLCBjb2xvckxpc3QsIGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PT0gdm9pZCAwKSB7IGFyZ3MgPSB7IGluY2x1ZGVGYWxsYmFja0NvbG9yczogZmFsc2UsIGxldmVsOiAnQUEnLCBzaXplOiAnc21hbGwnIH07IH1cbiAgICB2YXIgYmVzdENvbG9yID0gbnVsbDtcbiAgICB2YXIgYmVzdFNjb3JlID0gMDtcbiAgICB2YXIgaW5jbHVkZUZhbGxiYWNrQ29sb3JzID0gYXJncy5pbmNsdWRlRmFsbGJhY2tDb2xvcnMsIGxldmVsID0gYXJncy5sZXZlbCwgc2l6ZSA9IGFyZ3Muc2l6ZTtcbiAgICBmb3IgKHZhciBfaSA9IDAsIGNvbG9yTGlzdF8xID0gY29sb3JMaXN0OyBfaSA8IGNvbG9yTGlzdF8xLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgY29sb3IgPSBjb2xvckxpc3RfMVtfaV07XG4gICAgICAgIHZhciBzY29yZSA9IHJlYWRhYmlsaXR5KGJhc2VDb2xvciwgY29sb3IpO1xuICAgICAgICBpZiAoc2NvcmUgPiBiZXN0U2NvcmUpIHtcbiAgICAgICAgICAgIGJlc3RTY29yZSA9IHNjb3JlO1xuICAgICAgICAgICAgYmVzdENvbG9yID0gbmV3IFRpbnlDb2xvcihjb2xvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzUmVhZGFibGUoYmFzZUNvbG9yLCBiZXN0Q29sb3IsIHsgbGV2ZWw6IGxldmVsLCBzaXplOiBzaXplIH0pIHx8ICFpbmNsdWRlRmFsbGJhY2tDb2xvcnMpIHtcbiAgICAgICAgcmV0dXJuIGJlc3RDb2xvcjtcbiAgICB9XG4gICAgYXJncy5pbmNsdWRlRmFsbGJhY2tDb2xvcnMgPSBmYWxzZTtcbiAgICByZXR1cm4gbW9zdFJlYWRhYmxlKGJhc2VDb2xvciwgWycjZmZmJywgJyMwMDAnXSwgYXJncyk7XG59XG4iLCJpbXBvcnQgeyByZ2JhVG9BcmdiSGV4IH0gZnJvbSAnLi9jb252ZXJzaW9uJztcbmltcG9ydCB7IFRpbnlDb2xvciB9IGZyb20gJy4vaW5kZXgnO1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBjb2xvciByZXByZXNlbnRlZCBhcyBhIE1pY3Jvc29mdCBmaWx0ZXIgZm9yIHVzZSBpbiBvbGQgdmVyc2lvbnMgb2YgSUUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b01zRmlsdGVyKGZpcnN0Q29sb3IsIHNlY29uZENvbG9yKSB7XG4gICAgdmFyIGNvbG9yID0gbmV3IFRpbnlDb2xvcihmaXJzdENvbG9yKTtcbiAgICB2YXIgaGV4OFN0cmluZyA9ICcjJyArIHJnYmFUb0FyZ2JIZXgoY29sb3IuciwgY29sb3IuZywgY29sb3IuYiwgY29sb3IuYSk7XG4gICAgdmFyIHNlY29uZEhleDhTdHJpbmcgPSBoZXg4U3RyaW5nO1xuICAgIHZhciBncmFkaWVudFR5cGUgPSBjb2xvci5ncmFkaWVudFR5cGUgPyAnR3JhZGllbnRUeXBlID0gMSwgJyA6ICcnO1xuICAgIGlmIChzZWNvbmRDb2xvcikge1xuICAgICAgICB2YXIgcyA9IG5ldyBUaW55Q29sb3Ioc2Vjb25kQ29sb3IpO1xuICAgICAgICBzZWNvbmRIZXg4U3RyaW5nID0gJyMnICsgcmdiYVRvQXJnYkhleChzLnIsIHMuZywgcy5iLCBzLmEpO1xuICAgIH1cbiAgICByZXR1cm4gXCJwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuZ3JhZGllbnQoXCIuY29uY2F0KGdyYWRpZW50VHlwZSwgXCJzdGFydENvbG9yc3RyPVwiKS5jb25jYXQoaGV4OFN0cmluZywgXCIsZW5kQ29sb3JzdHI9XCIpLmNvbmNhdChzZWNvbmRIZXg4U3RyaW5nLCBcIilcIik7XG59XG4iLCIvKipcbiAqIFRha2UgaW5wdXQgZnJvbSBbMCwgbl0gYW5kIHJldHVybiBpdCBhcyBbMCwgMV1cbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJvdW5kMDEobiwgbWF4KSB7XG4gICAgaWYgKGlzT25lUG9pbnRaZXJvKG4pKSB7XG4gICAgICAgIG4gPSAnMTAwJSc7XG4gICAgfVxuICAgIHZhciBpc1BlcmNlbnQgPSBpc1BlcmNlbnRhZ2Uobik7XG4gICAgbiA9IG1heCA9PT0gMzYwID8gbiA6IE1hdGgubWluKG1heCwgTWF0aC5tYXgoMCwgcGFyc2VGbG9hdChuKSkpO1xuICAgIC8vIEF1dG9tYXRpY2FsbHkgY29udmVydCBwZXJjZW50YWdlIGludG8gbnVtYmVyXG4gICAgaWYgKGlzUGVyY2VudCkge1xuICAgICAgICBuID0gcGFyc2VJbnQoU3RyaW5nKG4gKiBtYXgpLCAxMCkgLyAxMDA7XG4gICAgfVxuICAgIC8vIEhhbmRsZSBmbG9hdGluZyBwb2ludCByb3VuZGluZyBlcnJvcnNcbiAgICBpZiAoTWF0aC5hYnMobiAtIG1heCkgPCAwLjAwMDAwMSkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgLy8gQ29udmVydCBpbnRvIFswLCAxXSByYW5nZSBpZiBpdCBpc24ndCBhbHJlYWR5XG4gICAgaWYgKG1heCA9PT0gMzYwKSB7XG4gICAgICAgIC8vIElmIG4gaXMgYSBodWUgZ2l2ZW4gaW4gZGVncmVlcyxcbiAgICAgICAgLy8gd3JhcCBhcm91bmQgb3V0LW9mLXJhbmdlIHZhbHVlcyBpbnRvIFswLCAzNjBdIHJhbmdlXG4gICAgICAgIC8vIHRoZW4gY29udmVydCBpbnRvIFswLCAxXS5cbiAgICAgICAgbiA9IChuIDwgMCA/IChuICUgbWF4KSArIG1heCA6IG4gJSBtYXgpIC8gcGFyc2VGbG9hdChTdHJpbmcobWF4KSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBJZiBuIG5vdCBhIGh1ZSBnaXZlbiBpbiBkZWdyZWVzXG4gICAgICAgIC8vIENvbnZlcnQgaW50byBbMCwgMV0gcmFuZ2UgaWYgaXQgaXNuJ3QgYWxyZWFkeS5cbiAgICAgICAgbiA9IChuICUgbWF4KSAvIHBhcnNlRmxvYXQoU3RyaW5nKG1heCkpO1xuICAgIH1cbiAgICByZXR1cm4gbjtcbn1cbi8qKlxuICogRm9yY2UgYSBudW1iZXIgYmV0d2VlbiAwIGFuZCAxXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGFtcDAxKHZhbCkge1xuICAgIHJldHVybiBNYXRoLm1pbigxLCBNYXRoLm1heCgwLCB2YWwpKTtcbn1cbi8qKlxuICogTmVlZCB0byBoYW5kbGUgMS4wIGFzIDEwMCUsIHNpbmNlIG9uY2UgaXQgaXMgYSBudW1iZXIsIHRoZXJlIGlzIG5vIGRpZmZlcmVuY2UgYmV0d2VlbiBpdCBhbmQgMVxuICogPGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNzQyMjA3Mi9qYXZhc2NyaXB0LWhvdy10by1kZXRlY3QtbnVtYmVyLWFzLWEtZGVjaW1hbC1pbmNsdWRpbmctMS0wPlxuICogQGhpZGRlblxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPbmVQb2ludFplcm8obikge1xuICAgIHJldHVybiB0eXBlb2YgbiA9PT0gJ3N0cmluZycgJiYgbi5pbmRleE9mKCcuJykgIT09IC0xICYmIHBhcnNlRmxvYXQobikgPT09IDE7XG59XG4vKipcbiAqIENoZWNrIHRvIHNlZSBpZiBzdHJpbmcgcGFzc2VkIGluIGlzIGEgcGVyY2VudGFnZVxuICogQGhpZGRlblxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNQZXJjZW50YWdlKG4pIHtcbiAgICByZXR1cm4gdHlwZW9mIG4gPT09ICdzdHJpbmcnICYmIG4uaW5kZXhPZignJScpICE9PSAtMTtcbn1cbi8qKlxuICogUmV0dXJuIGEgdmFsaWQgYWxwaGEgdmFsdWUgWzAsMV0gd2l0aCBhbGwgaW52YWxpZCB2YWx1ZXMgYmVpbmcgc2V0IHRvIDFcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJvdW5kQWxwaGEoYSkge1xuICAgIGEgPSBwYXJzZUZsb2F0KGEpO1xuICAgIGlmIChpc05hTihhKSB8fCBhIDwgMCB8fCBhID4gMSkge1xuICAgICAgICBhID0gMTtcbiAgICB9XG4gICAgcmV0dXJuIGE7XG59XG4vKipcbiAqIFJlcGxhY2UgYSBkZWNpbWFsIHdpdGggaXQncyBwZXJjZW50YWdlIHZhbHVlXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VG9QZXJjZW50YWdlKG4pIHtcbiAgICBpZiAobiA8PSAxKSB7XG4gICAgICAgIHJldHVybiBcIlwiLmNvbmNhdChOdW1iZXIobikgKiAxMDAsIFwiJVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIG47XG59XG4vKipcbiAqIEZvcmNlIGEgaGV4IHZhbHVlIHRvIGhhdmUgMiBjaGFyYWN0ZXJzXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYWQyKGMpIHtcbiAgICByZXR1cm4gYy5sZW5ndGggPT09IDEgPyAnMCcgKyBjIDogU3RyaW5nKGMpO1xufVxuIiwiZXhwb3J0IGNvbnN0IGNvbW1hbmRzID0ge1xuICAgIGdlbmVyYWxTZXR0aW5nczogJ2dlbmVyYWxTZXR0aW5ncycsXG4gICAgZXhwb3J0OiAnZXhwb3J0JyxcbiAgICBzZW5kU2V0dGluZ3M6ICdzZW5kU2V0dGluZ3MnLFxuICAgIHVybEV4cG9ydDogJ3VybEV4cG9ydCcsXG4gICAgaGVscDogJ2hlbHAnLFxuICAgIGRlbW86ICdkZW1vJyxcbiAgICBvcGVuVXJsOiAnb3BlblVybCcsXG4gICAgcmVzZXQ6ICdyZXNldCcsXG4gICAgc2F2ZVNldHRpbmdzOiAnc2F2ZVNldHRpbmdzJyxcbiAgICBjbG9zZVBsdWdpbjogJ2Nsb3NlUGx1Z2luJ1xufTtcbiIsIi8qIGlzdGFuYnVsIGlnbm9yZSBmaWxlICovXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgdWk6IHtcbiAgICAgICAgZ2VuZXJhbFNldHRpbmdzOiB7XG4gICAgICAgICAgICB3aWR0aDogNTUwLFxuICAgICAgICAgICAgaGVpZ2h0OiA3NTVcbiAgICAgICAgfSxcbiAgICAgICAgZXhwb3J0OiB7XG4gICAgICAgICAgICB3aWR0aDogNTUwLFxuICAgICAgICAgICAgaGVpZ2h0OiAzNDBcbiAgICAgICAgfSxcbiAgICAgICAgdXJsRXhwb3J0OiB7XG4gICAgICAgICAgICB3aWR0aDogNTUwLFxuICAgICAgICAgICAgaGVpZ2h0OiA2NTBcbiAgICAgICAgfVxuICAgIH0sXG4gICAga2V5OiB7XG4gICAgICAgIGxhc3RWZXJzaW9uU2V0dGluZ3NPcGVuZWQ6ICdsYXN0VmVyc2lvblNldHRpbmdzT3BlbmVkJyxcbiAgICAgICAgZmlsZUlkOiAnZmlsZUlkJyxcbiAgICAgICAgc2V0dGluZ3M6ICdzZXR0aW5ncycsXG4gICAgICAgIGV4dGVuc2lvblBsdWdpbkRhdGE6ICdvcmcubHVrYXNvcHBlcm1hbm4uZmlnbWFEZXNpZ25Ub2tlbnMnLFxuICAgICAgICBleHRlbnNpb25GaWdtYVN0eWxlSWQ6ICdzdHlsZUlkJyxcbiAgICAgICAgZXh0ZW5zaW9uQWxpYXM6ICdhbGlhcycsXG4gICAgICAgIGF1dGhUeXBlOiB7XG4gICAgICAgICAgICB0b2tlbjogJ3Rva2VuJyxcbiAgICAgICAgICAgIGdpdGxhYlRva2VuOiAnZ2l0bGFiX3Rva2VuJyxcbiAgICAgICAgICAgIGJhc2ljOiAnQmFzaWMnLFxuICAgICAgICAgICAgYmVhcmVyOiAnQmVhcmVyJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBleGNsdXNpb25QcmVmaXhEZWZhdWx0OiBbJ18nLCAnLiddLFxuICAgIGZpbGVFeHRlbnNpb25zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxhYmVsOiAnLnRva2Vucy5qc29uJyxcbiAgICAgICAgICAgIHZhbHVlOiAnLnRva2Vucy5qc29uJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBsYWJlbDogJy50b2tlbnMnLFxuICAgICAgICAgICAgdmFsdWU6ICcudG9rZW5zJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBsYWJlbDogJy5qc29uJyxcbiAgICAgICAgICAgIHZhbHVlOiAnLmpzb24nXG4gICAgICAgIH1cbiAgICBdXG59O1xuIiwiZXhwb3J0IGNvbnN0IGRlZmF1bHRTZXR0aW5ncyA9IHtcbiAgICBmaWxlbmFtZTogJ2Rlc2lnbi10b2tlbnMnLFxuICAgIGV4dGVuc2lvbjogJy50b2tlbnMuanNvbicsXG4gICAgbmFtZUNvbnZlcnNpb246ICdkZWZhdWx0JyxcbiAgICB0b2tlbkZvcm1hdDogJ3N0YW5kYXJkJyxcbiAgICBjb21wcmVzc2lvbjogZmFsc2UsXG4gICAgdXJsSnNvbkNvbXByZXNzaW9uOiB0cnVlLFxuICAgIHNlcnZlclVybDogdW5kZWZpbmVkLFxuICAgIGV2ZW50VHlwZTogJ3VwZGF0ZS10b2tlbnMnLFxuICAgIGFjY2Vzc1Rva2VuOiB1bmRlZmluZWQsXG4gICAgYWNjZXB0SGVhZGVyOiAnYXBwbGljYXRpb24vdm5kLmdpdGh1Yi5ldmVyZXN0LXByZXZpZXcranNvbicsXG4gICAgY29udGVudFR5cGU6ICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnLFxuICAgIGF1dGhUeXBlOiAndG9rZW4nLFxuICAgIHJlZmVyZW5jZTogJ21haW4nLFxuICAgIGV4Y2x1c2lvblByZWZpeDogJycsXG4gICAgYWxpYXM6ICdhbGlhcywgcmVmLCByZWZlcmVuY2UnLFxuICAgIGtleUluTmFtZTogZmFsc2UsXG4gICAgcHJlZml4SW5OYW1lOiB0cnVlLFxuICAgIHByZWZpeDoge1xuICAgICAgICBjb2xvcjogJ2NvbG9yJyxcbiAgICAgICAgZ3JhZGllbnQ6ICdncmFkaWVudCcsXG4gICAgICAgIHR5cG9ncmFwaHk6ICd0eXBvZ3JhcGh5JyxcbiAgICAgICAgZm9udDogJ2ZvbnQnLFxuICAgICAgICBlZmZlY3Q6ICdlZmZlY3QnLFxuICAgICAgICBncmlkOiAnZ3JpZCcsXG4gICAgICAgIGJvcmRlcjogJ2JvcmRlciwgYm9yZGVycycsXG4gICAgICAgIGJyZWFrcG9pbnQ6ICdicmVha3BvaW50LCBicmVha3BvaW50cycsXG4gICAgICAgIHJhZGl1czogJ3JhZGl1cywgcmFkaWknLFxuICAgICAgICBzaXplOiAnc2l6ZSwgc2l6ZXMnLFxuICAgICAgICBzcGFjaW5nOiAnc3BhY2luZycsXG4gICAgICAgIG1vdGlvbjogJ21vdGlvbidcbiAgICB9LFxuICAgIGV4cG9ydHM6IHtcbiAgICAgICAgY29sb3I6IHRydWUsXG4gICAgICAgIGdyYWRpZW50OiB0cnVlLFxuICAgICAgICBmb250OiB0cnVlLFxuICAgICAgICB0eXBvZ3JhcGh5OiB0cnVlLFxuICAgICAgICBlZmZlY3Q6IHRydWUsXG4gICAgICAgIGdyaWQ6IHRydWUsXG4gICAgICAgIGJvcmRlcjogdHJ1ZSxcbiAgICAgICAgYnJlYWtwb2ludDogdHJ1ZSxcbiAgICAgICAgcmFkaXVzOiB0cnVlLFxuICAgICAgICBzaXplOiB0cnVlLFxuICAgICAgICBzcGFjaW5nOiB0cnVlLFxuICAgICAgICBtb3Rpb246IHRydWVcbiAgICB9XG59O1xuIiwiLyogaXN0YW5idWwgaWdub3JlIGZpbGUgKi9cbmV4cG9ydCBjb25zdCB0b2tlblR5cGVzID0ge1xuICAgIGNvbG9yOiB7XG4gICAgICAgIGxhYmVsOiAnQ29sb3JzJyxcbiAgICAgICAga2V5OiAnY29sb3InXG4gICAgfSxcbiAgICBncmFkaWVudDoge1xuICAgICAgICBsYWJlbDogJ0dyYWRpZW50cycsXG4gICAgICAgIGtleTogJ2dyYWRpZW50J1xuICAgIH0sXG4gICAgZm9udDoge1xuICAgICAgICBsYWJlbDogJ0ZvbnQgU3R5bGVzJyxcbiAgICAgICAga2V5OiAnZm9udCdcbiAgICB9LFxuICAgIHR5cG9ncmFwaHk6IHtcbiAgICAgICAgbGFiZWw6ICdUeXBvZ3JhcGh5JyxcbiAgICAgICAga2V5OiAndHlwb2dyYXBoeScsXG4gICAgICAgIGV4Y2x1ZGU6IFsnb3JpZ2luYWwnXVxuICAgIH0sXG4gICAgZWZmZWN0OiB7XG4gICAgICAgIGxhYmVsOiAnRWZmZWN0cycsXG4gICAgICAgIGtleTogJ2VmZmVjdCdcbiAgICB9LFxuICAgIGdyaWQ6IHtcbiAgICAgICAgbGFiZWw6ICdHcmlkcycsXG4gICAgICAgIGtleTogJ2dyaWQnXG4gICAgfSxcbiAgICBib3JkZXI6IHtcbiAgICAgICAgbGFiZWw6ICdCb3JkZXJzJyxcbiAgICAgICAga2V5OiAnYm9yZGVyJ1xuICAgIH0sXG4gICAgYnJlYWtwb2ludDoge1xuICAgICAgICBsYWJlbDogJ0JyZWFrcG9pbnRzJyxcbiAgICAgICAga2V5OiAnYnJlYWtwb2ludCdcbiAgICB9LFxuICAgIHJhZGl1czoge1xuICAgICAgICBsYWJlbDogJ1JhZGlpJyxcbiAgICAgICAga2V5OiAncmFkaXVzJ1xuICAgIH0sXG4gICAgc2l6ZToge1xuICAgICAgICBsYWJlbDogJ1NpemVzJyxcbiAgICAgICAga2V5OiAnc2l6ZSdcbiAgICB9LFxuICAgIHNwYWNpbmc6IHtcbiAgICAgICAgbGFiZWw6ICdTcGFjaW5nJyxcbiAgICAgICAga2V5OiAnc3BhY2luZydcbiAgICB9LFxuICAgIG1vdGlvbjoge1xuICAgICAgICBsYWJlbDogJ01vdGlvbicsXG4gICAgICAgIGtleTogJ21vdGlvbidcbiAgICB9XG59O1xuIiwiaW1wb3J0IHJvdW5kV2l0aERlY2ltYWxzIGZyb20gJy4uL3V0aWxpdGllcy9yb3VuZFdpdGhEZWNpbWFscyc7XG5pbXBvcnQgeyB0b2tlblR5cGVzIH0gZnJvbSAnQGNvbmZpZy90b2tlblR5cGVzJztcbmltcG9ydCB7IGZpbHRlckJ5UHJlZml4IH0gZnJvbSAnLi9leHRyYWN0VXRpbGl0aWVzJztcbmltcG9ydCBjb25maWcgZnJvbSAnQGNvbmZpZy9jb25maWcnO1xuY29uc3Qgc3Ryb2tlSm9pbnMgPSB7XG4gICAgTUlURVI6ICdtaXRlcicsXG4gICAgQkVWRUw6ICdiZXZlbCcsXG4gICAgUk9VTkQ6ICdyb3VuZCdcbn07XG5jb25zdCBzdHJva2VBbGlnbnMgPSB7XG4gICAgQ0VOVEVSOiAnY2VudGVyJyxcbiAgICBJTlNJREU6ICdpbnNpZGUnLFxuICAgIE9VVFNJREU6ICdvdXRzaWRlJ1xufTtcbmNvbnN0IGV4dHJhY3RCb3JkZXJzID0gKHRva2VuTm9kZXMsIHByZWZpeEFycmF5KSA9PiB7XG4gICAgLy8gcmV0dXJuIGFzIG9iamVjdFxuICAgIHJldHVybiB0b2tlbk5vZGVzLmZpbHRlcihmaWx0ZXJCeVByZWZpeChwcmVmaXhBcnJheSkpXG4gICAgICAgIC8vIHJlbW92ZSBub2RlcyB3aXRoIG5vIGJvcmRlciBwcm9wZXJ0eVxuICAgICAgICAuZmlsdGVyKG5vZGUgPT4gbm9kZS5zdHJva2VzLmxlbmd0aCA+IDApXG4gICAgICAgIC8vIGNvbnZlcnQgYm9yZGVyc1xuICAgICAgICAubWFwKG5vZGUgPT4gKHtcbiAgICAgICAgbmFtZTogbm9kZS5uYW1lLFxuICAgICAgICBjYXRlZ29yeTogJ2JvcmRlcicsXG4gICAgICAgIGV4cG9ydEtleTogdG9rZW5UeXBlcy5ib3JkZXIua2V5LFxuICAgICAgICBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHN0cm9rZUFsaWduOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHN0cm9rZUFsaWduc1tub2RlLnN0cm9rZUFsaWduXSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhc2hQYXR0ZXJuOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IFsuLi4obm9kZS5kYXNoUGF0dGVybiAhPT0gdW5kZWZpbmVkICYmIG5vZGUuZGFzaFBhdHRlcm4ubGVuZ3RoID4gMCA/IG5vZGUuZGFzaFBhdHRlcm4gOiBbMCwgMF0pXSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0cm9rZUNhcDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiAoKHR5cGVvZiBub2RlLnN0cm9rZUNhcCA9PT0gJ3N0cmluZycpID8gbm9kZS5zdHJva2VDYXAudG9Mb3dlckNhc2UoKSA6ICdtaXhlZCcpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3Ryb2tlSm9pbjoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBzdHJva2VKb2luc1tub2RlLnN0cm9rZUpvaW5dLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3Ryb2tlTWl0ZXJMaW1pdDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLnN0cm9rZU1pdGVyTGltaXQpLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdkZWdyZWUnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gc3Ryb2tlU3R5bGVJZDoge1xuICAgICAgICAgICAgLy8gICB2YWx1ZTogbm9kZS5zdHJva2VTdHlsZUlkXG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgc3Ryb2tlV2VpZ2h0OiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG5vZGUuc3Ryb2tlV2VpZ2h0LFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdHJva2U6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbm9kZS5zdHJva2VzWzBdLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdjb2xvcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXh0ZW5zaW9uczoge1xuICAgICAgICAgICAgW2NvbmZpZy5rZXkuZXh0ZW5zaW9uUGx1Z2luRGF0YV06IHtcbiAgICAgICAgICAgICAgICBleHBvcnRLZXk6IHRva2VuVHlwZXMuYm9yZGVyLmtleVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3RCb3JkZXJzO1xuIiwiaW1wb3J0IHsgdG9rZW5UeXBlcyB9IGZyb20gJ0Bjb25maWcvdG9rZW5UeXBlcyc7XG5pbXBvcnQgcm91bmRXaXRoRGVjaW1hbHMgZnJvbSAnLi4vdXRpbGl0aWVzL3JvdW5kV2l0aERlY2ltYWxzJztcbmltcG9ydCB7IGZpbHRlckJ5UHJlZml4IH0gZnJvbSAnLi9leHRyYWN0VXRpbGl0aWVzJztcbmltcG9ydCBjb25maWcgZnJvbSAnQGNvbmZpZy9jb25maWcnO1xuY29uc3QgZXh0cmFjdEJyZWFrcG9pbnRzID0gKHRva2VuTm9kZXMsIHByZWZpeEFycmF5KSA9PiB7XG4gICAgLy8gcmV0dXJuIGFzIG9iamVjdFxuICAgIHJldHVybiB0b2tlbk5vZGVzLmZpbHRlcihmaWx0ZXJCeVByZWZpeChwcmVmaXhBcnJheSkpLm1hcChub2RlID0+ICh7XG4gICAgICAgIG5hbWU6IG5vZGUubmFtZSxcbiAgICAgICAgY2F0ZWdvcnk6ICdicmVha3BvaW50JyxcbiAgICAgICAgZXhwb3J0S2V5OiB0b2tlblR5cGVzLmJyZWFrcG9pbnQua2V5LFxuICAgICAgICBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHdpZHRoOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKG5vZGUud2lkdGgsIDIpLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWlnaHQ6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMobm9kZS5oZWlnaHQsIDIpLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXh0ZW5zaW9uczoge1xuICAgICAgICAgICAgW2NvbmZpZy5rZXkuZXh0ZW5zaW9uUGx1Z2luRGF0YV06IHtcbiAgICAgICAgICAgICAgICBleHBvcnRLZXk6IHRva2VuVHlwZXMuYnJlYWtwb2ludC5rZXlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0QnJlYWtwb2ludHM7XG4iLCJpbXBvcnQgeyB0b2tlblR5cGVzIH0gZnJvbSAnQGNvbmZpZy90b2tlblR5cGVzJztcbmltcG9ydCB7IGNvbnZlcnRQYWludFRvUmdiYSwgcm91bmRSZ2JhIH0gZnJvbSAnLi4vdXRpbGl0aWVzL2NvbnZlcnRDb2xvcic7XG5pbXBvcnQgcm91bmRXaXRoRGVjaW1hbHMgZnJvbSAnLi4vdXRpbGl0aWVzL3JvdW5kV2l0aERlY2ltYWxzJztcbmltcG9ydCBjb25maWcgZnJvbSAnQGNvbmZpZy9jb25maWcnO1xuY29uc3QgdHJhbnNwYXJlbnRGaWxsID0ge1xuICAgIGZpbGw6IHtcbiAgICAgICAgdmFsdWU6IHsgcjogMCwgZzogMCwgYjogMCwgYTogMCB9LFxuICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgfVxufTtcbmNvbnN0IHBhcnNlRGVzY3JpcHRpb24gPSAoZGVzY3JpcHRpb24gPSAnJywgYWxpYXNBcnJheSkgPT4ge1xuICAgIGFsaWFzQXJyYXkgPSAhYWxpYXNBcnJheSB8fCBhbGlhc0FycmF5LmZpbHRlcihpID0+IGkpLmxlbmd0aCA9PT0gMCA/IFsnUmVmOiddIDogYWxpYXNBcnJheTtcbiAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoJygnICsgYWxpYXNBcnJheS5qb2luKCd8JykudG9Mb3dlckNhc2UoKSArICcpJyArICc6P1xcXFxzJyk7XG4gICAgLy8gc3BsaXQgZGVzY3JpcHRpb24gaW4gbGluZXNcbiAgICBsZXQgYWxpYXM7XG4gICAgY29uc3QgZGVzY3JpcHRpb25MaW5lcyA9IGRlc2NyaXB0aW9uLnNwbGl0KC9cXHI/XFxuLylcbiAgICAgICAgLy8gZmluZCBtYXRjaFxuICAgICAgICAuZmlsdGVyKGxpbmUgPT4ge1xuICAgICAgICBpZiAobGluZS50b0xvd2VyQ2FzZSgpLm1hdGNoKHJlZ2V4KSkge1xuICAgICAgICAgICAgYWxpYXMgPSBsaW5lLnRvTG93ZXJDYXNlKCkucmVwbGFjZShyZWdleCwgJycpLnRyaW0oKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgICAvLyByZXR1cm4gb2JqZWN0XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWxpYXM6IGFsaWFzLFxuICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb25MaW5lcy5qb2luKCdcXG4nKVxuICAgIH07XG59O1xuY29uc3QgYWRkQWxpYXMgPSAoYWxpYXMpID0+IGFsaWFzID8gKHsgW2NvbmZpZy5rZXkuZXh0ZW5zaW9uQWxpYXNdOiBhbGlhcyB9KSA6ICh7fSk7XG5jb25zdCBncmFkaWVudFR5cGUgPSB7XG4gICAgR1JBRElFTlRfTElORUFSOiAnbGluZWFyJyxcbiAgICBHUkFESUVOVF9SQURJQUw6ICdyYWRpYWwnLFxuICAgIEdSQURJRU5UX0FOR1VMQVI6ICdhbmd1bGFyJyxcbiAgICBHUkFESUVOVF9ESUFNT05EOiAnZGlhbW9uZCdcbn07XG5jb25zdCBpc0dyYWRpZW50ID0gKHBhaW50KSA9PiBbJ0dSQURJRU5UX0xJTkVBUicsICdHUkFESUVOVF9SQURJQUwnLCAnR1JBRElFTlRfQU5HVUxBUicsICdHUkFESUVOVF9ESUFNT05EJ10uaW5jbHVkZXMocGFpbnQgPT09IG51bGwgfHwgcGFpbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhaW50LnR5cGUpO1xuY29uc3Qgcm90YXRpb25Gcm9tTWF0cml4ID0gKFtbeDEsIHkxXSwgW3gyLCB5Ml1dKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjQ5MDk1ODYvZmluZC1yb3RhdGlvbi1hbmdsZS1mb3ItYWZmaW5lLXRyYW5zZm9ybVxuICAgIGNvbnN0IGFuZ2xlID0gTWF0aC5hdGFuMih5MiAtIHkxLCB4MiAtIHgxKSAqICgxODAuMCAvIE1hdGguUEkpICsgMzE1O1xuICAgIHJldHVybiBhbmdsZSA+IDM2MCA/IGFuZ2xlIC0gMzYwIDogYW5nbGU7XG59O1xuY29uc3QgZXh0cmFjdEZpbGxzID0gKHBhaW50KSA9PiB7XG4gICAgaWYgKHBhaW50LnR5cGUgPT09ICdTT0xJRCcpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZpbGw6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogY29udmVydFBhaW50VG9SZ2JhKHBhaW50KSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmIChbJ0dSQURJRU5UX0xJTkVBUicsICdHUkFESUVOVF9SQURJQUwnLCAnR1JBRElFTlRfQU5HVUxBUicsICdHUkFESUVOVF9ESUFNT05EJ10uaW5jbHVkZXMocGFpbnQudHlwZSkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdyYWRpZW50VHlwZToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBncmFkaWVudFR5cGVbcGFpbnQudHlwZV0sXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByb3RhdGlvbjoge1xuICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI0OTA5NTg2L2ZpbmQtcm90YXRpb24tYW5nbGUtZm9yLWFmZmluZS10cmFuc2Zvcm1cbiAgICAgICAgICAgICAgICB2YWx1ZTogcm90YXRpb25Gcm9tTWF0cml4KHBhaW50LmdyYWRpZW50VHJhbnNmb3JtKSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICB1bml0OiAnZGVncmVlJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0b3BzOiBwYWludC5ncmFkaWVudFN0b3BzLm1hcChzdG9wID0+ICh7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKHN0b3AucG9zaXRpb24pLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kUmdiYShzdG9wLmNvbG9yKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2NvbG9yJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIG9wYWNpdHk6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMocGFpbnQub3BhY2l0eSksXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgLy8gcmV0dXJuIG51bGwgaWYgbm8gbWF0Y2hpbmcgdHlwZVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgcmV0dXJuIG51bGw7XG59O1xuY29uc3QgZXh0cmFjdENvbG9ycyA9ICh0b2tlbk5vZGVzLCBwcmVmaXhBcnJheSkgPT4ge1xuICAgIC8vIGdldCBhbGwgcGFpbnQgc3R5bGVzXG4gICAgcmV0dXJuIHRva2VuTm9kZXNcbiAgICAgICAgLnJlZHVjZSgocHJldmlvdXNWYWx1ZSwgbm9kZSkgPT4ge1xuICAgICAgICAvLyBpZ25vcmUgaW1hZ2Utb25seSBmaWxsc1xuICAgICAgICBjb25zdCBwYWludHNBZnRlckltYWdlRmlsdGVyID0gbm9kZS5wYWludHMuZmlsdGVyKHBhaW50ID0+IHBhaW50LnR5cGUgIT09ICdJTUFHRScpO1xuICAgICAgICBpZiAobm9kZS5wYWludHMubGVuZ3RoICYmIHBhaW50c0FmdGVySW1hZ2VGaWx0ZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZW1vdmUgaW1hZ2VzIGZpbGxzIGZyb20gdG9rZW5zXG4gICAgICAgIG5vZGUucGFpbnRzID0gcGFpbnRzQWZ0ZXJJbWFnZUZpbHRlcjtcbiAgICAgICAgY29uc3QgeyBhbGlhcywgZGVzY3JpcHRpb24gfSA9IHBhcnNlRGVzY3JpcHRpb24obm9kZS5kZXNjcmlwdGlvbiwgcHJlZml4QXJyYXkuYWxpYXMpO1xuICAgICAgICBjb25zdCBub2RlSXNHcmFkaWVudCA9IGlzR3JhZGllbnQobm9kZS5wYWludHNbMF0pO1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBub2RlLnBhaW50cy5sZW5ndGggPyBub2RlLnBhaW50cy5tYXAocGFpbnQgPT4gZXh0cmFjdEZpbGxzKHBhaW50KSkgOiBbdHJhbnNwYXJlbnRGaWxsXTtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIC4uLnByZXZpb3VzVmFsdWUsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogYCR7bm9kZUlzR3JhZGllbnQgPyBwcmVmaXhBcnJheS5ncmFkaWVudFswXSA6IHByZWZpeEFycmF5LmNvbG9yWzBdfS8ke25vZGUubmFtZX1gLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiBub2RlSXNHcmFkaWVudCA/ICdncmFkaWVudCcgOiAnY29sb3InLFxuICAgICAgICAgICAgICAgIGV4cG9ydEtleTogKG5vZGVJc0dyYWRpZW50ID8gdG9rZW5UeXBlcy5ncmFkaWVudC5rZXkgOiB0b2tlblR5cGVzLmNvbG9yLmtleSksXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgIHZhbHVlcyxcbiAgICAgICAgICAgICAgICBleHRlbnNpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIFtjb25maWcua2V5LmV4dGVuc2lvblBsdWdpbkRhdGFdOiBPYmplY3QuYXNzaWduKHsgW2NvbmZpZy5rZXkuZXh0ZW5zaW9uRmlnbWFTdHlsZUlkXTogbm9kZS5pZCwgZXhwb3J0S2V5OiAobm9kZUlzR3JhZGllbnQgPyB0b2tlblR5cGVzLmdyYWRpZW50LmtleSA6IHRva2VuVHlwZXMuY29sb3Iua2V5KSB9LCAoYWRkQWxpYXMoYWxpYXMpKSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgfSwgW10pO1xufTtcbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3RDb2xvcnM7XG4iLCJpbXBvcnQgeyB0b2tlblR5cGVzIH0gZnJvbSAnQGNvbmZpZy90b2tlblR5cGVzJztcbmltcG9ydCB7IHJvdW5kUmdiYSB9IGZyb20gJy4uL3V0aWxpdGllcy9jb252ZXJ0Q29sb3InO1xuaW1wb3J0IGNvbmZpZyBmcm9tICdAY29uZmlnL2NvbmZpZyc7XG5jb25zdCBlZmZlY3RUeXBlID0ge1xuICAgIExBWUVSX0JMVVI6ICdsYXllckJsdXInLFxuICAgIEJBQ0tHUk9VTkRfQkxVUjogJ2JhY2tncm91bmRCbHVyJyxcbiAgICBEUk9QX1NIQURPVzogJ2Ryb3BTaGFkb3cnLFxuICAgIElOTkVSX1NIQURPVzogJ2lubmVyU2hhZG93J1xufTtcbmNvbnN0IGJsdXJWYWx1ZXMgPSAoZWZmZWN0KSA9PiAoe1xuICAgIGVmZmVjdFR5cGU6IHtcbiAgICAgICAgdmFsdWU6IGVmZmVjdFR5cGVbZWZmZWN0LnR5cGVdLFxuICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgIH0sXG4gICAgcmFkaXVzOiB7XG4gICAgICAgIHZhbHVlOiBlZmZlY3QucmFkaXVzLFxuICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgIH1cbn0pO1xuY29uc3Qgc2hhZG93VmFsdWVzID0gZWZmZWN0ID0+ICh7XG4gICAgZWZmZWN0VHlwZToge1xuICAgICAgICB2YWx1ZTogZWZmZWN0VHlwZVtlZmZlY3QudHlwZV0sXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgfSxcbiAgICByYWRpdXM6IHtcbiAgICAgICAgdmFsdWU6IGVmZmVjdC5yYWRpdXMsXG4gICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgfSxcbiAgICBjb2xvcjoge1xuICAgICAgICB2YWx1ZTogcm91bmRSZ2JhKGVmZmVjdC5jb2xvciksXG4gICAgICAgIHR5cGU6ICdjb2xvcidcbiAgICB9LFxuICAgIG9mZnNldDoge1xuICAgICAgICB4OiB7XG4gICAgICAgICAgICB2YWx1ZTogZWZmZWN0Lm9mZnNldC54LFxuICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIHk6IHtcbiAgICAgICAgICAgIHZhbHVlOiBlZmZlY3Qub2Zmc2V0LnksXG4gICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfVxuICAgIH0sXG4gICAgc3ByZWFkOiB7XG4gICAgICAgIHZhbHVlOiBlZmZlY3Quc3ByZWFkLFxuICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgIH1cbn0pO1xuY29uc3QgZXh0cmFjdEVmZmVjdHMgPSAodG9rZW5Ob2RlcywgcHJlZml4QXJyYXkpID0+IHtcbiAgICAvLyBnZXQgZWZmZWN0IHN0eWxlc1xuICAgIHJldHVybiB0b2tlbk5vZGVzXG4gICAgICAgIC8vIHJlbW92ZSB0b2tlbnMgd2l0aCBubyBncmlkXG4gICAgICAgIC5maWx0ZXIobm9kZSA9PiBub2RlLmVmZmVjdHMubGVuZ3RoID4gMClcbiAgICAgICAgLy8gYnVpbGRcbiAgICAgICAgLm1hcChub2RlID0+ICh7XG4gICAgICAgIG5hbWU6IGAke3ByZWZpeEFycmF5WzBdfS8ke25vZGUubmFtZX1gLFxuICAgICAgICBjYXRlZ29yeTogJ2VmZmVjdCcsXG4gICAgICAgIGV4cG9ydEtleTogdG9rZW5UeXBlcy5lZmZlY3Qua2V5LFxuICAgICAgICBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgICB2YWx1ZXM6IG5vZGUuZWZmZWN0cy5tYXAoKGVmZmVjdCkgPT4gZWZmZWN0LnR5cGUgPT09ICdMQVlFUl9CTFVSJyB8fCBlZmZlY3QudHlwZSA9PT0gJ0JBQ0tHUk9VTkRfQkxVUidcbiAgICAgICAgICAgID8gYmx1clZhbHVlcyhlZmZlY3QpXG4gICAgICAgICAgICA6IHNoYWRvd1ZhbHVlcyhlZmZlY3QpKSxcbiAgICAgICAgZXh0ZW5zaW9uczoge1xuICAgICAgICAgICAgW2NvbmZpZy5rZXkuZXh0ZW5zaW9uUGx1Z2luRGF0YV06IHtcbiAgICAgICAgICAgICAgICBbY29uZmlnLmtleS5leHRlbnNpb25GaWdtYVN0eWxlSWRdOiBub2RlLmlkLFxuICAgICAgICAgICAgICAgIGV4cG9ydEtleTogdG9rZW5UeXBlcy5lZmZlY3Qua2V5XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZXh0cmFjdEVmZmVjdHM7XG4iLCJpbXBvcnQgeyB0b2tlblR5cGVzIH0gZnJvbSAnQGNvbmZpZy90b2tlblR5cGVzJztcbmltcG9ydCByb3VuZFdpdGhEZWNpbWFscyBmcm9tICcuLi91dGlsaXRpZXMvcm91bmRXaXRoRGVjaW1hbHMnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICdAY29uZmlnL2NvbmZpZyc7XG5jb25zdCB0ZXh0RGVjb3JhdGlvbnMgPSB7XG4gICAgTk9ORTogJ25vbmUnLFxuICAgIFVOREVSTElORTogJ3VuZGVybGluZScsXG4gICAgU1RSSUtFVEhST1VHSDogJ2xpbmUtdGhyb3VnaCdcbn07XG5jb25zdCB0ZXh0Q2FzZXMgPSB7XG4gICAgT1JJR0lOQUw6ICdub25lJyxcbiAgICBVUFBFUjogJ3VwcGVyY2FzZScsXG4gICAgTE9XRVI6ICdsb3dlcmNhc2UnLFxuICAgIFRJVExFOiAnY2FwaXRhbGl6ZSdcbn07XG5jb25zdCBmb250V2VpZ2h0cyA9IHtcbiAgICAxMDA6IDEwMCxcbiAgICB0aGluOiAxMDAsXG4gICAgMjAwOiAyMDAsXG4gICAgZXh0cmFsaWdodDogMjAwLFxuICAgIHVsdHJhbGlnaHQ6IDIwMCxcbiAgICBleHRyYWxlaWNodDogMjAwLFxuICAgIDMwMDogMzAwLFxuICAgIGxpZ2h0OiAzMDAsXG4gICAgbGVpY2h0OiAzMDAsXG4gICAgNDAwOiA0MDAsXG4gICAgbm9ybWFsOiA0MDAsXG4gICAgcmVndWxhcjogNDAwLFxuICAgIGJ1Y2g6IDQwMCxcbiAgICA1MDA6IDUwMCxcbiAgICBtZWRpdW06IDUwMCxcbiAgICBrcmFlZnRpZzogNTAwLFxuICAgIGtyw6RmdGlnOiA1MDAsXG4gICAgNjAwOiA2MDAsXG4gICAgc2VtaWJvbGQ6IDYwMCxcbiAgICBkZW1pYm9sZDogNjAwLFxuICAgIGhhbGJmZXR0OiA2MDAsXG4gICAgNzAwOiA3MDAsXG4gICAgYm9sZDogNzAwLFxuICAgIGRyZWl2aWVydGVsZmV0dDogNzAwLFxuICAgIDgwMDogODAwLFxuICAgIGV4dHJhYm9sZDogODAwLFxuICAgIHVsdGFib2xkOiA4MDAsXG4gICAgZmV0dDogODAwLFxuICAgIDkwMDogOTAwLFxuICAgIGJsYWNrOiA5MDAsXG4gICAgaGVhdnk6IDkwMCxcbiAgICBzdXBlcjogOTAwLFxuICAgIGV4dHJhZmV0dDogOTAwXG59O1xuY29uc3QgZm9udFN0cmV0Y2ggPSB7XG4gICAgbm9ybWFsOiAnbm9ybWFsJyxcbiAgICBjb25kZW5zZWQ6ICdjb25kZW5zZWQnLFxuICAgIGV4cGFuZGVkOiAnZXhwYW5kZWQnLFxuICAgIGV4dGVuZGVkOiAnZXhwYW5kZWQnXG59O1xuY29uc3QgZm9udFN0eWxlcyA9IHtcbiAgICBub3JtYWw6ICdub3JtYWwnLFxuICAgIGl0YWxpYzogJ2l0YWxpYycsXG4gICAga3Vyc2l2OiAnaXRhbGljJyxcbiAgICBvYmxpcXVlOiAnb2JsaXF1ZSdcbn07XG5jb25zdCBwYXJzZUZvbnRXZWlnaHQgPSAoZm9udFN0eWxlKSA9PiB7XG4gICAgY29uc3QgcGFydHMgPSBmb250U3R5bGUudG9Mb3dlckNhc2UoKS5zcGxpdCgnICcpO1xuICAgIGxldCB3ZWlnaHQgPSBwYXJ0c1swXTtcbiAgICAvLyBtZXJnZSBpZiBzcGFjZSBhZnRlciBleHRyYVxuICAgIGlmIChbJ2V4dHJhJywgJ3VsdHJhJywgJ3NlbWknLCAnZGVtaSddLmluY2x1ZGVzKHBhcnRzWzBdKSAmJiBbJ2JvbGQnLCAnbGlnaHQnXS5pbmNsdWRlcyhwYXJ0c1sxXSkpIHtcbiAgICAgICAgd2VpZ2h0ID0gYCR7cGFydHNbMF19JHtwYXJ0c1sxXX1gO1xuICAgIH1cbiAgICByZXR1cm4gZm9udFdlaWdodHNbd2VpZ2h0XSB8fCA0MDA7XG59O1xuY29uc3QgcGFyc2VGb250U3RyZXRjaCA9IChmb250U3R5bGUpID0+IHtcbiAgICBjb25zdCBwYXJ0cyA9IGZvbnRTdHlsZS50b0xvd2VyQ2FzZSgpLnNwbGl0KCcgJyk7XG4gICAgcmV0dXJuIGZvbnRTdHJldGNoW3BhcnRzW3BhcnRzLmxlbmd0aCAtIDFdXSB8fCBmb250U3RyZXRjaFtwYXJ0c1twYXJ0cy5sZW5ndGggLSAyXV0gfHwgJ25vcm1hbCc7XG59O1xuY29uc3QgcGFyc2VGb250U3R5bGUgPSAoZm9udFN0eWxlKSA9PiB7XG4gICAgY29uc3QgcGFydCA9IGZvbnRTdHlsZS50b0xvd2VyQ2FzZSgpLnNwbGl0KCcgJykucG9wKCk7XG4gICAgcmV0dXJuIGZvbnRTdHlsZXNbcGFydF0gfHwgJ25vcm1hbCc7XG59O1xuY29uc3QgZXh0cmFjdEZvbnRzID0gKHRva2VuTm9kZXMsIHByZWZpeEFycmF5KSA9PiB7XG4gICAgLy8gZ2V0IHJhdyB0ZXh0IHN0eWxlc1xuICAgIHJldHVybiB0b2tlbk5vZGVzLm1hcChub2RlID0+ICh7XG4gICAgICAgIG5hbWU6IGAke3ByZWZpeEFycmF5WzBdfS8ke25vZGUubmFtZX1gLFxuICAgICAgICBjYXRlZ29yeTogJ2ZvbnQnLFxuICAgICAgICBleHBvcnRLZXk6IHRva2VuVHlwZXMuZm9udC5rZXksXG4gICAgICAgIGRlc2NyaXB0aW9uOiBub2RlLmRlc2NyaXB0aW9uIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICBmb250U2l6ZToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLmZvbnRTaXplLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZXh0RGVjb3JhdGlvbjoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB0ZXh0RGVjb3JhdGlvbnNbbm9kZS50ZXh0RGVjb3JhdGlvbl0sXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb250RmFtaWx5OiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG5vZGUuZm9udE5hbWUuZmFtaWx5LFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9udFdlaWdodDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBwYXJzZUZvbnRXZWlnaHQobm9kZS5mb250TmFtZS5zdHlsZSksXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb250U3R5bGU6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcGFyc2VGb250U3R5bGUobm9kZS5mb250TmFtZS5zdHlsZSksXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb250U3RyZXRjaDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBwYXJzZUZvbnRTdHJldGNoKG5vZGUuZm9udE5hbWUuc3R5bGUpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2ZvbnRTdHlsZU9sZDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLmZvbnROYW1lLnN0eWxlLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLmxldHRlclNwYWNpbmcudmFsdWUpLFxuICAgICAgICAgICAgICAgIHVuaXQ6IChub2RlLmxldHRlclNwYWNpbmcudW5pdC50b0xvd2VyQ2FzZSgpID09PSAncGl4ZWxzJyA/ICdwaXhlbCcgOiBub2RlLmxldHRlclNwYWNpbmcudW5pdC50b0xvd2VyQ2FzZSgpKSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKG5vZGUubGluZUhlaWdodC52YWx1ZSkgfHwgJ25vcm1hbCcsXG4gICAgICAgICAgICAgICAgdW5pdDogbm9kZS5saW5lSGVpZ2h0LnVuaXQudG9Mb3dlckNhc2UoKSA9PT0gJ3BpeGVscycgPyAncGl4ZWwnIDogbm9kZS5saW5lSGVpZ2h0LnVuaXQudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgICAgICB0eXBlOiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5vZGUubGluZUhlaWdodCwgJ3ZhbHVlJykgPyAnbnVtYmVyJyA6ICdzdHJpbmcnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhcmFncmFwaEluZGVudDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLnBhcmFncmFwaEluZGVudCxcbiAgICAgICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGFyYWdyYXBoU3BhY2luZzoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLnBhcmFncmFwaFNwYWNpbmcsXG4gICAgICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRleHRDYXNlOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHRleHRDYXNlc1tub2RlLnRleHRDYXNlXSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBleHRlbnNpb25zOiB7XG4gICAgICAgICAgICBbY29uZmlnLmtleS5leHRlbnNpb25QbHVnaW5EYXRhXToge1xuICAgICAgICAgICAgICAgIFtjb25maWcua2V5LmV4dGVuc2lvbkZpZ21hU3R5bGVJZF06IG5vZGUuaWQsXG4gICAgICAgICAgICAgICAgZXhwb3J0S2V5OiB0b2tlblR5cGVzLmZvbnQua2V5XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZXh0cmFjdEZvbnRzO1xuIiwiaW1wb3J0IHsgdG9rZW5UeXBlcyB9IGZyb20gJ0Bjb25maWcvdG9rZW5UeXBlcyc7XG5pbXBvcnQgY29uZmlnIGZyb20gJ0Bjb25maWcvY29uZmlnJztcbmNvbnN0IGdyaWRWYWx1ZXMgPSAoZ3JpZCkgPT4gKHtcbiAgICBwYXR0ZXJuOiB7XG4gICAgICAgIHZhbHVlOiBncmlkLnBhdHRlcm4udG9Mb3dlckNhc2UoKSxcbiAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICB9LFxuICAgIHNlY3Rpb25TaXplOiB7XG4gICAgICAgIHZhbHVlOiBncmlkLnNlY3Rpb25TaXplLFxuICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgIH1cbn0pO1xuY29uc3QgZ2V0Q291bnQgPSBjb3VudCA9PiB7XG4gICAgaWYgKGNvdW50ID09PSBJbmZpbml0eSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6ICdhdXRvJyxcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiBjb3VudCxcbiAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICB9O1xufTtcbmNvbnN0IHJvd0NvbHVtblZhbHVlcyA9IChncmlkKSA9PiAoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oeyBwYXR0ZXJuOiB7XG4gICAgICAgIHZhbHVlOiBncmlkLnBhdHRlcm4udG9Mb3dlckNhc2UoKSxcbiAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICB9IH0sIChncmlkLnNlY3Rpb25TaXplICE9PSB1bmRlZmluZWQgJiYge1xuICAgIHNlY3Rpb25TaXplOiB7XG4gICAgICAgIHZhbHVlOiBncmlkLnNlY3Rpb25TaXplLFxuICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgIH1cbn0pKSwgeyBndXR0ZXJTaXplOiB7XG4gICAgICAgIHZhbHVlOiBncmlkLmd1dHRlclNpemUsXG4gICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgfSwgYWxpZ25tZW50OiB7XG4gICAgICAgIHZhbHVlOiBncmlkLmFsaWdubWVudC50b0xvd2VyQ2FzZSgpLFxuICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgIH0sIGNvdW50OiBnZXRDb3VudChncmlkLmNvdW50KSB9KSwgKGdyaWQub2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYge1xuICAgIG9mZnNldDoge1xuICAgICAgICB2YWx1ZTogZ3JpZC5vZmZzZXQsXG4gICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgfVxufSkpKTtcbmNvbnN0IGV4dHJhY3RHcmlkcyA9ICh0b2tlbk5vZGVzLCBwcmVmaXhBcnJheSkgPT4ge1xuICAgIC8vIGdldCBncmlkIHN0eWxlc1xuICAgIHJldHVybiB0b2tlbk5vZGVzXG4gICAgICAgIC8vIHJlbW92ZSB0b2tlbnMgd2l0aCBubyBncmlkXG4gICAgICAgIC5maWx0ZXIobm9kZSA9PiBub2RlLmxheW91dEdyaWRzLmxlbmd0aCA+IDApXG4gICAgICAgIC8vIGJ1aWxkXG4gICAgICAgIC5tYXAobm9kZSA9PiAoe1xuICAgICAgICBuYW1lOiBgJHtwcmVmaXhBcnJheVswXX0vJHtub2RlLm5hbWV9YCxcbiAgICAgICAgY2F0ZWdvcnk6ICdncmlkJyxcbiAgICAgICAgZXhwb3J0S2V5OiB0b2tlblR5cGVzLmdyaWQua2V5LFxuICAgICAgICBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgICB2YWx1ZXM6IG5vZGUubGF5b3V0R3JpZHMubWFwKChncmlkKSA9PiBncmlkLnBhdHRlcm4gPT09ICdHUklEJyA/IGdyaWRWYWx1ZXMoZ3JpZCkgOiByb3dDb2x1bW5WYWx1ZXMoZ3JpZCkpLFxuICAgICAgICBleHRlbnNpb25zOiB7XG4gICAgICAgICAgICBbY29uZmlnLmtleS5leHRlbnNpb25QbHVnaW5EYXRhXToge1xuICAgICAgICAgICAgICAgIFtjb25maWcua2V5LmV4dGVuc2lvbkZpZ21hU3R5bGVJZF06IG5vZGUuaWQsXG4gICAgICAgICAgICAgICAgZXhwb3J0S2V5OiB0b2tlblR5cGVzLmdyaWQua2V5XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZXh0cmFjdEdyaWRzO1xuIiwiaW1wb3J0IHsgdG9rZW5UeXBlcyB9IGZyb20gJ0Bjb25maWcvdG9rZW5UeXBlcyc7XG5pbXBvcnQgeyBmaWx0ZXJCeVByZWZpeCB9IGZyb20gJy4vZXh0cmFjdFV0aWxpdGllcyc7XG5pbXBvcnQgY29uZmlnIGZyb20gJ0Bjb25maWcvY29uZmlnJztcbmNvbnN0IGRpcmVjdGlvbiA9ICh0cmFuc2l0aW9uKSA9PiB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0cmFuc2l0aW9uLCAnZGlyZWN0aW9uJykpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbjoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB0cmFuc2l0aW9uLmRpcmVjdGlvbi50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufTtcbmNvbnN0IGVhc2luZ3MgPSB7XG4gICAgQ1VTVE9NX0NVQklDX0JFWklFUjoge30sXG4gICAgTElORUFSOiB7XG4gICAgICAgIHR5cGU6ICdsaW5lYXInLFxuICAgICAgICBlYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyOiB7XG4gICAgICAgICAgICB4MTogMCxcbiAgICAgICAgICAgIHkxOiAwLFxuICAgICAgICAgICAgeDI6IDEsXG4gICAgICAgICAgICB5MjogMVxuICAgICAgICB9XG4gICAgfSxcbiAgICBFQVNFX0lOOiB7XG4gICAgICAgIHR5cGU6ICdlYXNlLWluJyxcbiAgICAgICAgZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllcjoge1xuICAgICAgICAgICAgeDE6IDAuNDE5OTk5OTg2ODg2OTc4MTUsXG4gICAgICAgICAgICB5MTogMCxcbiAgICAgICAgICAgIHgyOiAxLFxuICAgICAgICAgICAgeTI6IDFcbiAgICAgICAgfVxuICAgIH0sXG4gICAgRUFTRV9PVVQ6IHtcbiAgICAgICAgdHlwZTogJ2Vhc2Utb3V0JyxcbiAgICAgICAgZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllcjoge1xuICAgICAgICAgICAgeDE6IDAsXG4gICAgICAgICAgICB5MTogMCxcbiAgICAgICAgICAgIHgyOiAwLjU3OTk5OTk4MzMxMDY5OTUsXG4gICAgICAgICAgICB5MjogMVxuICAgICAgICB9XG4gICAgfSxcbiAgICBFQVNFX0lOX0FORF9PVVQ6IHtcbiAgICAgICAgdHlwZTogJ2Vhc2UtaW4tb3V0JyxcbiAgICAgICAgZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllcjoge1xuICAgICAgICAgICAgeDE6IDAuNDE5OTk5OTg2ODg2OTc4MTUsXG4gICAgICAgICAgICB5MTogMCxcbiAgICAgICAgICAgIHgyOiAwLjU3OTk5OTk4MzMxMDY5OTUsXG4gICAgICAgICAgICB5MjogMVxuICAgICAgICB9XG4gICAgfSxcbiAgICBFQVNFX0lOX0JBQ0s6IHtcbiAgICAgICAgdHlwZTogJ2Vhc2UtaW4tYmFjaycsXG4gICAgICAgIGVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXI6IHtcbiAgICAgICAgICAgIHgxOiAwLjMwMDAwMDAxMTkyMDkyODk2LFxuICAgICAgICAgICAgeTE6IC0wLjA1MDAwMDAwMDc0NTA1ODA2LFxuICAgICAgICAgICAgeDI6IDAuNjk5OTk5OTg4MDc5MDcxLFxuICAgICAgICAgICAgeTI6IC0wLjVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgRUFTRV9PVVRfQkFDSzoge1xuICAgICAgICB0eXBlOiAnZWFzZS1vdXQtYmFjaycsXG4gICAgICAgIGVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXI6IHtcbiAgICAgICAgICAgIHgxOiAwLjQ0OTk5OTk4ODA3OTA3MTA0LFxuICAgICAgICAgICAgeTE6IDEuNDUwMDAwMDQ3NjgzNzE1OCxcbiAgICAgICAgICAgIHgyOiAwLjgwMDAwMDAxMTkyMDkyOSxcbiAgICAgICAgICAgIHkyOiAxXG4gICAgICAgIH1cbiAgICB9LFxuICAgIEVBU0VfSU5fQU5EX09VVF9CQUNLOiB7XG4gICAgICAgIHR5cGU6ICdlYXNlLWluLW91dC1iYWNrJyxcbiAgICAgICAgZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllcjoge1xuICAgICAgICAgICAgeDE6IDAuNjk5OTk5OTg4MDc5MDcxLFxuICAgICAgICAgICAgeTE6IC0wLjQwMDAwMDAwNTk2MDQ2NDUsXG4gICAgICAgICAgICB4MjogMC40MDAwMDAwMDU5NjA0NjQ1LFxuICAgICAgICAgICAgeTI6IDEuMzk5OTk5OTc2MTU4MTQyXG4gICAgICAgIH1cbiAgICB9XG59O1xuY29uc3QgZWFzaW5nID0gKGVhc2luZykgPT4ge1xuICAgIC8vIGFib3J0IGlmIGludmFsaWYgZWFzaW5nIHR5cGVcbiAgICBpZiAoISgndHlwZScgaW4gZWFzaW5nKSB8fCBlYXNpbmdzW2Vhc2luZy50eXBlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIC8vIHJldHVybiBjdXN0b20gZWFzaW5nXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGlmIChlYXNpbmcudHlwZSA9PT0gJ0NVU1RPTV9DVUJJQ19CRVpJRVInKSB7XG4gICAgICAgIGVhc2luZ3MuQ1VTVE9NX0NVQklDX0JFWklFUiA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdjdWJpYy1iZXppZXInLFxuICAgICAgICAgICAgZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllcjoge1xuICAgICAgICAgICAgICAgIHgxOiBlYXNpbmcuZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllci54MSxcbiAgICAgICAgICAgICAgICB5MTogZWFzaW5nLmVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXIueTEsXG4gICAgICAgICAgICAgICAgeDI6IGVhc2luZy5lYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyLngyLFxuICAgICAgICAgICAgICAgIHkyOiBlYXNpbmcuZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllci55MlxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBlYXNpbmc6IHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHZhbHVlOiBlYXNpbmdzW2Vhc2luZy50eXBlXS50eXBlLFxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgZWFzaW5nRnVuY3Rpb246IHtcbiAgICAgICAgICAgIHgxOiB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIHZhbHVlOiBlYXNpbmdzW2Vhc2luZy50eXBlXS5lYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyLngxLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeDI6IHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgdmFsdWU6IGVhc2luZ3NbZWFzaW5nLnR5cGVdLmVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXIueDIsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB5MToge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICB2YWx1ZTogZWFzaW5nc1tlYXNpbmcudHlwZV0uZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllci55MSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHkyOiB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIHZhbHVlOiBlYXNpbmdzW2Vhc2luZy50eXBlXS5lYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyLnkyLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufTtcbmNvbnN0IGV4dHJhY3RNb3Rpb24gPSAodG9rZW5Ob2RlcywgcHJlZml4QXJyYXkpID0+IHtcbiAgICAvLyByZXR1cm4gYXMgb2JqZWN0XG4gICAgcmV0dXJuIHRva2VuTm9kZXMuZmlsdGVyKGZpbHRlckJ5UHJlZml4KHByZWZpeEFycmF5KSlcbiAgICAgICAgLy8gZmlsdGVyIHRvIG9ubHkgaW5jbHVkZSBpdGVtcyB3aGljaCBoYXZlIGEgdHJhbnNpdGlvbiBwcm9wZXJ0eVxuICAgICAgICAuZmlsdGVyKG5vZGUgPT4ge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmIChub2RlLnJlYWN0aW9ucy5sZW5ndGggPiAwICYmICgoX2EgPSBub2RlLnJlYWN0aW9uc1swXS5hY3Rpb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50eXBlKSA9PT0gJ05PREUnICYmIG5vZGUucmVhY3Rpb25zWzBdLmFjdGlvbi50cmFuc2l0aW9uICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSlcbiAgICAgICAgLy8gcmV0cmlldmUgdmFsdWVzXG4gICAgICAgIC5tYXAoKG5vZGUpID0+ICh7XG4gICAgICAgIG5hbWU6IG5vZGUubmFtZSxcbiAgICAgICAgY2F0ZWdvcnk6ICdtb3Rpb24nLFxuICAgICAgICBleHBvcnRLZXk6IHRva2VuVHlwZXMubW90aW9uLmtleSxcbiAgICAgICAgZGVzY3JpcHRpb246IG5vZGUuZGVzY3JpcHRpb24gfHwgbnVsbCxcbiAgICAgICAgdmFsdWVzOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oeyB0cmFuc2l0aW9uVHlwZToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLnJlYWN0aW9uc1swXS5hY3Rpb24udHJhbnNpdGlvbi50eXBlLnRvTG9jYWxlTG93ZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH0sIGR1cmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IE1hdGgucm91bmQoKG5vZGUucmVhY3Rpb25zWzBdLmFjdGlvbi50cmFuc2l0aW9uLmR1cmF0aW9uICsgTnVtYmVyLkVQU0lMT04pICogMTAwMCkgLyAxMDAwLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdzJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSB9LCBlYXNpbmcobm9kZS5yZWFjdGlvbnNbMF0uYWN0aW9uLnRyYW5zaXRpb24uZWFzaW5nKSksIGRpcmVjdGlvbihub2RlLnJlYWN0aW9uc1swXS5hY3Rpb24udHJhbnNpdGlvbikpLFxuICAgICAgICBleHRlbnNpb25zOiB7XG4gICAgICAgICAgICBbY29uZmlnLmtleS5leHRlbnNpb25QbHVnaW5EYXRhXToge1xuICAgICAgICAgICAgICAgIGV4cG9ydEtleTogdG9rZW5UeXBlcy5tb3Rpb24ua2V5XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZXh0cmFjdE1vdGlvbjtcbmV4cG9ydCBjb25zdCBfX3Rlc3RpbmcgPSB7XG4gICAgZWFzaW5nOiBlYXNpbmdcbn07XG4iLCJpbXBvcnQgeyB0b2tlblR5cGVzIH0gZnJvbSAnQGNvbmZpZy90b2tlblR5cGVzJztcbmltcG9ydCByb3VuZFdpdGhEZWNpbWFscyBmcm9tICcuLi91dGlsaXRpZXMvcm91bmRXaXRoRGVjaW1hbHMnO1xuaW1wb3J0IHsgZmlsdGVyQnlQcmVmaXggfSBmcm9tICcuL2V4dHJhY3RVdGlsaXRpZXMnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICdAY29uZmlnL2NvbmZpZyc7XG5jb25zdCBleHRyYWN0UmFkaWkgPSAodG9rZW5Ob2RlcywgcHJlZml4QXJyYXkpID0+IHtcbiAgICAvLyBnZXQgdGhlIHR5cGUgb2YgdGhlIGNvcm5lciByYWRpdXNcbiAgICBjb25zdCBnZXRSYWRpdXNUeXBlID0gcmFkaXVzID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiByYWRpdXMgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3NpbmdsZSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICdtaXhlZCc7XG4gICAgfTtcbiAgICAvLyBnZXQgdGhlIGluZGl2aWR1YWwgcmFkaWlcbiAgICBjb25zdCBnZXRSYWRpaSA9IChub2RlKSA9PiAoe1xuICAgICAgICB0b3BMZWZ0OiB7XG4gICAgICAgICAgICB2YWx1ZTogbm9kZS50b3BMZWZ0UmFkaXVzIHx8IDAsXG4gICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgdG9wUmlnaHQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiBub2RlLnRvcFJpZ2h0UmFkaXVzIHx8IDAsXG4gICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgYm90dG9tUmlnaHQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiBub2RlLmJvdHRvbVJpZ2h0UmFkaXVzIHx8IDAsXG4gICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgYm90dG9tTGVmdDoge1xuICAgICAgICAgICAgdmFsdWU6IG5vZGUuYm90dG9tTGVmdFJhZGl1cyB8fCAwLFxuICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyByZXR1cm4gYXMgb2JqZWN0XG4gICAgcmV0dXJuIHRva2VuTm9kZXMuZmlsdGVyKGZpbHRlckJ5UHJlZml4KHByZWZpeEFycmF5KSlcbiAgICAgICAgLm1hcChub2RlID0+ICh7XG4gICAgICAgIG5hbWU6IG5vZGUubmFtZSxcbiAgICAgICAgY2F0ZWdvcnk6ICdyYWRpdXMnLFxuICAgICAgICBleHBvcnRLZXk6IHRva2VuVHlwZXMucmFkaXVzLmtleSxcbiAgICAgICAgZGVzY3JpcHRpb246IG5vZGUuZGVzY3JpcHRpb24gfHwgbnVsbCxcbiAgICAgICAgdmFsdWVzOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sICh0eXBlb2Ygbm9kZS5jb3JuZXJSYWRpdXMgPT09ICdudW1iZXInICYmIHtcbiAgICAgICAgICAgIHJhZGl1czoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLmNvcm5lclJhZGl1cyxcbiAgICAgICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKSwgeyByYWRpdXNUeXBlOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGdldFJhZGl1c1R5cGUobm9kZS5jb3JuZXJSYWRpdXMpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LCByYWRpaTogZ2V0UmFkaWkobm9kZSksIHNtb290aGluZzoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLmNvcm5lclNtb290aGluZywgMiksXG4gICAgICAgICAgICAgICAgY29tbWVudDogJ1BlcmNlbnQgYXMgZGVjaW1hbCBmcm9tIDAuMCAtIDEuMCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0gfSksXG4gICAgICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgICAgICAgIFtjb25maWcua2V5LmV4dGVuc2lvblBsdWdpbkRhdGFdOiB7XG4gICAgICAgICAgICAgICAgZXhwb3J0S2V5OiB0b2tlblR5cGVzLnJhZGl1cy5rZXlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0UmFkaWk7XG4iLCJpbXBvcnQgeyB0b2tlblR5cGVzIH0gZnJvbSAnQGNvbmZpZy90b2tlblR5cGVzJztcbmltcG9ydCByb3VuZFdpdGhEZWNpbWFscyBmcm9tICcuLi91dGlsaXRpZXMvcm91bmRXaXRoRGVjaW1hbHMnO1xuaW1wb3J0IHsgZmlsdGVyQnlQcmVmaXggfSBmcm9tICcuL2V4dHJhY3RVdGlsaXRpZXMnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICdAY29uZmlnL2NvbmZpZyc7XG5jb25zdCBleHRyYWN0U2l6ZXMgPSAodG9rZW5Ob2RlcywgcHJlZml4QXJyYXkpID0+IHtcbiAgICAvLyByZXR1cm4gYXMgb2JqZWN0XG4gICAgcmV0dXJuIHRva2VuTm9kZXMuZmlsdGVyKGZpbHRlckJ5UHJlZml4KHByZWZpeEFycmF5KSkubWFwKG5vZGUgPT4gKHtcbiAgICAgICAgbmFtZTogbm9kZS5uYW1lLFxuICAgICAgICBjYXRlZ29yeTogJ3NpemUnLFxuICAgICAgICBleHBvcnRLZXk6IHRva2VuVHlwZXMuc2l6ZS5rZXksXG4gICAgICAgIGRlc2NyaXB0aW9uOiBub2RlLmRlc2NyaXB0aW9uIHx8IG51bGwsXG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgd2lkdGg6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMobm9kZS53aWR0aCwgMiksXG4gICAgICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhlaWdodDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLmhlaWdodCwgMiksXG4gICAgICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBleHRlbnNpb25zOiB7XG4gICAgICAgICAgICBbY29uZmlnLmtleS5leHRlbnNpb25QbHVnaW5EYXRhXToge1xuICAgICAgICAgICAgICAgIGV4cG9ydEtleTogdG9rZW5UeXBlcy5zaXplLmtleVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3RTaXplcztcbiIsImltcG9ydCB7IHRva2VuVHlwZXMgfSBmcm9tICdAY29uZmlnL3Rva2VuVHlwZXMnO1xuaW1wb3J0IHJvdW5kV2l0aERlY2ltYWxzIGZyb20gJy4uL3V0aWxpdGllcy9yb3VuZFdpdGhEZWNpbWFscyc7XG5pbXBvcnQgeyBmaWx0ZXJCeVByZWZpeCB9IGZyb20gJy4vZXh0cmFjdFV0aWxpdGllcyc7XG5pbXBvcnQgY29uZmlnIGZyb20gJ0Bjb25maWcvY29uZmlnJztcbmNvbnN0IGV4dHJhY3RTcGFjaW5nID0gKHRva2VuTm9kZXMsIHByZWZpeEFycmF5KSA9PiB7XG4gICAgLy8gcmV0dXJuIGFzIG9iamVjdFxuICAgIHJldHVybiB0b2tlbk5vZGVzLmZpbHRlcihmaWx0ZXJCeVByZWZpeChwcmVmaXhBcnJheSkpXG4gICAgICAgIC5tYXAobm9kZSA9PiAoe1xuICAgICAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgICAgIGNhdGVnb3J5OiAnc3BhY2luZycsXG4gICAgICAgIGV4cG9ydEtleTogdG9rZW5UeXBlcy5zcGFjaW5nLmtleSxcbiAgICAgICAgZGVzY3JpcHRpb246IG5vZGUuZGVzY3JpcHRpb24gfHwgbnVsbCxcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICB0b3A6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMobm9kZS5wYWRkaW5nVG9wLCAyKSxcbiAgICAgICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmlnaHQ6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMobm9kZS5wYWRkaW5nUmlnaHQsIDIpLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib3R0b206IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMobm9kZS5wYWRkaW5nQm90dG9tLCAyKSxcbiAgICAgICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVmdDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLnBhZGRpbmdMZWZ0LCAyKSxcbiAgICAgICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgICAgICAgIFtjb25maWcua2V5LmV4dGVuc2lvblBsdWdpbkRhdGFdOiB7XG4gICAgICAgICAgICAgICAgZXhwb3J0S2V5OiB0b2tlblR5cGVzLnNwYWNpbmcua2V5XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZXh0cmFjdFNwYWNpbmc7XG4iLCJleHBvcnQgY29uc3QgZmlsdGVyQnlQcmVmaXggPSAocHJlZml4QXJyYXkpID0+IG5vZGUgPT4ge1xuICAgIHJldHVybiBwcmVmaXhBcnJheS5pbmNsdWRlcyhub2RlLm5hbWUuc3Vic3RyKDAsIG5vZGUubmFtZS5pbmRleE9mKCcvJykpLnJlcGxhY2UoL1xccysvZywgJycpKTtcbn07XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IGdldFNldHRpbmdzLCByZXNldFNldHRpbmdzLCBzZXRTZXR0aW5ncyB9IGZyb20gJy4vdXRpbGl0aWVzL3NldHRpbmdzJztcbmltcG9ydCB7IGdldEFjY2Vzc1Rva2VuLCBzZXRBY2Nlc3NUb2tlbiB9IGZyb20gJy4vdXRpbGl0aWVzL2FjY2Vzc1Rva2VuJztcbmltcG9ydCBjb25maWcgZnJvbSAnQGNvbmZpZy9jb25maWcnO1xuaW1wb3J0IHsgY29tbWFuZHMgfSBmcm9tICdAY29uZmlnL2NvbW1hbmRzJztcbmltcG9ydCBnZXRWZXJzaW9uRGlmZmVyZW5jZSBmcm9tICcuL3V0aWxpdGllcy9nZXRWZXJzaW9uRGlmZmVyZW5jZSc7XG5pbXBvcnQgZ2V0RmlsZUlkIGZyb20gJy4vdXRpbGl0aWVzL2dldEZpbGVJZCc7XG5pbXBvcnQgeyBleHBvcnRSYXdUb2tlbkFycmF5IH0gZnJvbSAnLi91dGlsaXRpZXMvZ2V0VG9rZW5Kc29uJztcbmltcG9ydCB7IHN0cmluZ2lmeUpzb24gfSBmcm9tICcuL3V0aWxpdGllcy9zdHJpbmdpZnlKc29uJztcbi8vIGluaXRpYXRlIFVJXG5maWdtYS5zaG93VUkoX19odG1sX18sIHtcbiAgICB0aGVtZUNvbG9yczogdHJ1ZSxcbiAgICB2aXNpYmxlOiBmYWxzZVxufSk7XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIG9wZW4gVUlcbmlmIChbY29tbWFuZHMuZXhwb3J0LCBjb21tYW5kcy51cmxFeHBvcnQsIGNvbW1hbmRzLmdlbmVyYWxTZXR0aW5nc10uaW5jbHVkZXMoZmlnbWEuY29tbWFuZCkpIHtcbiAgICAvLyB3cmFwIGluIGZ1bmN0aW9uIGJlY2F1c2Ugb2YgYXN5bmMgY2xpZW50IFN0b3JhZ2VcbiAgICBjb25zdCBvcGVuVWkgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8gR2V0IHRoZSB1c2VyIHNldHRpbmdzXG4gICAgICAgIGNvbnN0IHVzZXJTZXR0aW5ncyA9IGdldFNldHRpbmdzKCk7XG4gICAgICAgIC8vIGdldCB0aGUgY3VycmVudCB2ZXJzaW9uIGRpZmZlcmVuY2VzIHRvIHRoZSBsYXN0IHRpbWUgdGhlIHBsdWdpbiB3YXMgb3BlbmVkXG4gICAgICAgIGNvbnN0IHZlcnNpb25EaWZmZXJlbmNlID0geWllbGQgZ2V0VmVyc2lvbkRpZmZlcmVuY2UoZmlnbWEpO1xuICAgICAgICAvLyByZXNpemUgVUkgaWYgbmVlZGVkXG4gICAgICAgIGZpZ21hLnVpLnJlc2l6ZShjb25maWcudWlbZmlnbWEuY29tbWFuZF0ud2lkdGgsIGNvbmZpZy51aVtmaWdtYS5jb21tYW5kXS5oZWlnaHQpO1xuICAgICAgICBpZiAodmVyc2lvbkRpZmZlcmVuY2UgIT09IHVuZGVmaW5lZCAmJiB2ZXJzaW9uRGlmZmVyZW5jZSAhPT0gJ3BhdGNoJykge1xuICAgICAgICAgICAgZmlnbWEudWkucmVzaXplKGNvbmZpZy51aVtmaWdtYS5jb21tYW5kXS53aWR0aCwgY29uZmlnLnVpW2ZpZ21hLmNvbW1hbmRdLmhlaWdodCArIDYwKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB3cml0ZSB0b2tlbnMgdG8ganNvbiBmaWxlXG4gICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIGNvbW1hbmQ6IGZpZ21hLmNvbW1hbmQsXG4gICAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdXNlclNldHRpbmdzKSwgeyBhY2Nlc3NUb2tlbjogeWllbGQgZ2V0QWNjZXNzVG9rZW4oZ2V0RmlsZUlkKGZpZ21hKSkgfSksXG4gICAgICAgICAgICAgICAgZGF0YTogc3RyaW5naWZ5SnNvbihleHBvcnRSYXdUb2tlbkFycmF5KGZpZ21hLCB1c2VyU2V0dGluZ3MpKSxcbiAgICAgICAgICAgICAgICB2ZXJzaW9uRGlmZmVyZW5jZTogdmVyc2lvbkRpZmZlcmVuY2UsXG4gICAgICAgICAgICAgICAgbWV0YWRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZW5hbWU6IGZpZ21hLnJvb3QubmFtZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHJlZ2lzdGVyIHRoZSBzZXR0aW5ncyBVSVxuICAgICAgICBmaWdtYS51aS5zaG93KCk7XG4gICAgfSk7XG4gICAgLy8gcnVuIGZ1bmN0aW9uXG4gICAgb3BlblVpKCk7XG59XG4vKipcbiAqIE9wZW4gSGVscFxuICogT3BlbiBnaXRodWIgaGVscCBwYWdlXG4gKi9cbmlmIChmaWdtYS5jb21tYW5kID09PSBjb21tYW5kcy5oZWxwKSB7XG4gICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBjb21tYW5kOiBjb21tYW5kcy5oZWxwLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICB1cmw6ICdodHRwczovL2dpdGh1Yi5jb20vbHVrYXNvcHBlcm1hbm4vZGVzaWduLXRva2VucydcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBPcGVuIGRlbW9cbiAqL1xuaWYgKGZpZ21hLmNvbW1hbmQgPT09IGNvbW1hbmRzLmRlbW8pIHtcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgIGNvbW1hbmQ6IGNvbW1hbmRzLmRlbW8sXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vd3d3LmZpZ21hLmNvbS9maWxlLzJNUTc1OVI1a0p0elFuNHFTSHVxUjcvRGVzaWduLVRva2Vucy1mb3ItRmlnbWE/bm9kZS1pZD0yMzElM0EyJ1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIFJlc2V0IHNldHRpbmdzXG4gKi9cbmlmIChmaWdtYS5jb21tYW5kID09PSBjb21tYW5kcy5yZXNldCkge1xuICAgIHJlc2V0U2V0dGluZ3MoKTtcbiAgICAvLyBzZW1kIG1lc3NhZ2VcbiAgICBmaWdtYS5ub3RpZnkoJ+Kame+4jyBTZXR0aW5ncyBoYXZlIGJlZW4gcmVzZXQuJyk7XG4gICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbn1cbi8qKlxuICogUmVhY3QgdG8gbWVzc2FnZXNcbiAqL1xuZmlnbWEudWkub25tZXNzYWdlID0gKG1lc3NhZ2UpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGNvbnN0IHsgY29tbWFuZCwgcGF5bG9hZCB9ID0gbWVzc2FnZTtcbiAgICAvKipcbiAgICAgKiBvbiBjbG9zZVBsdWdpblxuICAgICAqIGNsb3NlIHBsdWdpbiBhbmQgc2hvdyBub3RpZmljYXRpb24gaWYgYXZhaWxhYmxlXG4gICAgICovXG4gICAgaWYgKGNvbW1hbmQgPT09IGNvbW1hbmRzLmNsb3NlUGx1Z2luKSB7XG4gICAgICAgIC8vIHNob3cgbm90aWZpY2F0aW9uIGlmIHNlbmRcbiAgICAgICAgaWYgKChwYXlsb2FkID09PSBudWxsIHx8IHBheWxvYWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBheWxvYWQubm90aWZpY2F0aW9uKSAhPT0gdW5kZWZpbmVkICYmIChwYXlsb2FkID09PSBudWxsIHx8IHBheWxvYWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBheWxvYWQubm90aWZpY2F0aW9uKSAhPT0gJycpIHtcbiAgICAgICAgICAgIGZpZ21hLm5vdGlmeShwYXlsb2FkLm5vdGlmaWNhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2xvc2UgcGx1Z2luXG4gICAgICAgIGZpZ21hLnVpLmhpZGUoKTtcbiAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogb24gc2F2ZVNldHRpbmdzXG4gICAgICogc2F2ZSBzZXR0aW5ncywgYWNjZXNzIHRva2VuIGFuZCBjbG9zZSBwbHVnaW5cbiAgICAgKi9cbiAgICBpZiAoY29tbWFuZCA9PT0gY29tbWFuZHMuc2F2ZVNldHRpbmdzKSB7XG4gICAgICAgIC8vIHN0b3JlIHNldHRpbmdzXG4gICAgICAgIHNldFNldHRpbmdzKHBheWxvYWQuc2V0dGluZ3MpO1xuICAgICAgICAvLyBhY2Nlc3NUb2tlblxuICAgICAgICB5aWVsZCBzZXRBY2Nlc3NUb2tlbihnZXRGaWxlSWQoZmlnbWEpLCBwYXlsb2FkLmFjY2Vzc1Rva2VuKTtcbiAgICAgICAgLy8gY2xvc2UgcGx1Z2luXG4gICAgICAgIGlmIChwYXlsb2FkLmNsb3NlUGx1Z2luICYmIHBheWxvYWQuY2xvc2VQbHVnaW4gPT09IHRydWUpIHtcbiAgICAgICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuLyoqXG4gKiBAbmFtZSBnZXRBY2Nlc3NUb2tlblxuICogQGRlc2NyaXB0aW9uIHJldHVybnMgdGhlIGFjY2VzcyB0b2tlbiBmb3IgdGhlIGN1cnJlbnQgZmlsZSBvciB1bmRlZmluZWRcbiAqIEBwYXJhbSBmaWxlSWQge3N0cmluZ30g4oCUIElEIG9mIHRoZSBjdXJyZW50IGZpbGVcbiAqL1xuY29uc3QgZ2V0QWNjZXNzVG9rZW4gPSAoZmlsZUlkKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAvLyBnZXQgYWxsIGFjY2VzcyB0b2tlbnNcbiAgICBjb25zdCBhY2Nlc3NUb2tlbnMgPSB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKCdhY2Nlc3NUb2tlbnMnKTtcbiAgICAvLyBpZiBhY2Nlc3MgdG9rZW5zIG9iamVjdCBpcyBwcmVzZW50XG4gICAgaWYgKGFjY2Vzc1Rva2VucyAhPT0gdW5kZWZpbmVkICYmIGFjY2Vzc1Rva2VucyBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgYWNjZXNzIHRva2VuIGZyb20gdGhlIGNhY2hlXG4gICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gYWNjZXNzVG9rZW5zW2ZpbGVJZF07XG4gICAgICAgIC8vIHJldHVybiB0aGUgYWNjZXNzIHRva2VuIG9yIGFuIGVtcHR5IHN0cmluZ1xuICAgICAgICByZXR1cm4gYWNjZXNzVG9rZW4gfHwgJyc7XG4gICAgfVxuICAgIC8vIHJldHVybiBlbXB0eSBzdHJpbmcgaWYgbm8gdG9rZW4gaXMgc3RvcmVkXG4gICAgcmV0dXJuICcnO1xufSk7XG4vKipcbiAqIEBuYW1lIHNldEFjY2Vzc1Rva2VuXG4gKiBAZGVzY3JpcHRpb24gc3RvcmUgdGhlIGFjY2VzcyB0b2tlbiBmb3IgdGhlIGN1cnJlbnQgZml2ZW4gZmlsZSBpbiB0aGUgdXNlciBjbGllbnRTdG9yYWdlXG4gKiBAcGFyYW0gZmlsZUlkIHtzdHJpbmd9IOKAlCBJRCBvZiB0aGUgY3VycmVudCBmaWxlXG4gKiBAcGFyYW0gZmlsZUlkIHtzdHJpbmd9IOKAlCBhY2Nlc3MgdG9rZW5cbiAqL1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmNvbnN0IHNldEFjY2Vzc1Rva2VuID0gKGZpbGVJZCwgYWNjZXNzVG9rZW4pID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIC8vIGdldCB0aGUgYWNjZXNzIHRva2VuIG9iamVjdFxuICAgIGNvbnN0IGFjY2Vzc1Rva2VucyA9ICh5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKCdhY2Nlc3NUb2tlbnMnKSkgfHwge307XG4gICAgLy8gbWVyZ2UgdG9rZW5zXG4gICAgY29uc3QgbWVyZ2VkVG9rZW5zID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBhY2Nlc3NUb2tlbnMpLCB7IFtmaWxlSWRdOiBhY2Nlc3NUb2tlbiB9KTtcbiAgICAvLyBtZXJnZSB0aGUgbmV3IHRva2VuIGludG8gdGhlIG9iamVjdFxuICAgIHJldHVybiB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKCdhY2Nlc3NUb2tlbnMnLCBtZXJnZWRUb2tlbnMpO1xufSk7XG5leHBvcnQgeyBnZXRBY2Nlc3NUb2tlbiwgc2V0QWNjZXNzVG9rZW4gfTtcbiIsImltcG9ydCBmaWx0ZXJCeVByb3BlcnR5TmFtZSBmcm9tICcuL2ZpbHRlckJ5TmFtZVByb3BlcnR5JztcbmltcG9ydCBnZXRQYWludFN0eWxlcyBmcm9tICcuL2dldFBhaW50U3R5bGVzJztcbmltcG9ydCBnZXRHcmlkU3R5bGVzIGZyb20gJy4vZ2V0R3JpZFN0eWxlcyc7XG5pbXBvcnQgZ2V0VG9rZW5Ob2RlcyBmcm9tICcuL2dldFRva2VuTm9kZXMnO1xuaW1wb3J0IGdldFRleHRTdHlsZXMgZnJvbSAnLi9nZXRUZXh0U3R5bGVzJztcbmltcG9ydCBnZXRFZmZlY3RTdHlsZXMgZnJvbSAnLi9nZXRFZmZlY3RTdHlsZXMnO1xuLyoqXG4gKiBAZnVuY3Rpb24gYnVpbGRGaWdtYURhdGEg4oCTIHJldHVybiBhbiBvYmplY3Qgd2l0aCBhbGwgc3R5bGVzICYgZnJhbWUgdG8gdXNlIGZvciBleHBvcnRcbiAqIEBwYXJhbSB7UGx1Z2luQVBJfSBmaWdtYSDigJQgdGhlIGZpZ21hIFBsdWdpbkFQSSBvYmplY3RcbiAqIEBwYXJhbSBvcHRpb25zIOKAkyBvcHRpb25zIG9iamVjdFxuICovXG5jb25zdCBidWlsZEZpZ21hRGF0YSA9IChmaWdtYSwgc2V0dGluZ3MpID0+IHtcbiAgICAvLyB1c2Ugc3ByZWFkIG9wZXJhdG9yIGJlY2F1c2UgdGhlIG9yaWdpbmFsIGlzIHJlYWRPbmx5XG4gICAgY29uc3QgdG9rZW5GcmFtZXMgPSBnZXRUb2tlbk5vZGVzKFsuLi5maWdtYS5yb290LmNoaWxkcmVuXSk7XG4gICAgLy8gZ2V0IHVzZXIgZXhjbHVzaW9uIHByZWZpeGVzXG4gICAgY29uc3QgdXNlckV4Y2x1c2lvblByZWZpeGVzID0gc2V0dGluZ3MuZXhjbHVzaW9uUHJlZml4LnNwbGl0KCcsJykubWFwKGl0ZW0gPT4gaXRlbS5yZXBsYWNlKC9cXHMrL2csICcnKSk7XG4gICAgLy8gZ2V0IGRhdGEgZnJvbSBmaWdtYVxuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuRnJhbWVzOiB0b2tlbkZyYW1lcyxcbiAgICAgICAgcGFpbnRTdHlsZXM6IGdldFBhaW50U3R5bGVzKGZpZ21hLmdldExvY2FsUGFpbnRTdHlsZXMoKSkuZmlsdGVyKGl0ZW0gPT4gZmlsdGVyQnlQcm9wZXJ0eU5hbWUoaXRlbSwgdXNlckV4Y2x1c2lvblByZWZpeGVzKSksXG4gICAgICAgIGdyaWRTdHlsZXM6IGdldEdyaWRTdHlsZXMoZmlnbWEuZ2V0TG9jYWxHcmlkU3R5bGVzKCkpLmZpbHRlcihpdGVtID0+IGZpbHRlckJ5UHJvcGVydHlOYW1lKGl0ZW0sIHVzZXJFeGNsdXNpb25QcmVmaXhlcykpLFxuICAgICAgICB0ZXh0U3R5bGVzOiBnZXRUZXh0U3R5bGVzKGZpZ21hLmdldExvY2FsVGV4dFN0eWxlcygpKS5maWx0ZXIoaXRlbSA9PiBmaWx0ZXJCeVByb3BlcnR5TmFtZShpdGVtLCB1c2VyRXhjbHVzaW9uUHJlZml4ZXMpKSxcbiAgICAgICAgZWZmZWN0U3R5bGVzOiBnZXRFZmZlY3RTdHlsZXMoZmlnbWEuZ2V0TG9jYWxFZmZlY3RTdHlsZXMoKSkuZmlsdGVyKGl0ZW0gPT4gZmlsdGVyQnlQcm9wZXJ0eU5hbWUoaXRlbSwgdXNlckV4Y2x1c2lvblByZWZpeGVzKSlcbiAgICB9O1xufTtcbmV4cG9ydCBkZWZhdWx0IGJ1aWxkRmlnbWFEYXRhO1xuIiwiaW1wb3J0IHJvdW5kV2l0aERlY2ltYWxzIGZyb20gJy4vcm91bmRXaXRoRGVjaW1hbHMnO1xuaW1wb3J0IHsgdGlueWNvbG9yIH0gZnJvbSAnQGN0cmwvdGlueWNvbG9yJztcbmV4cG9ydCBjb25zdCByb3VuZFJnYmEgPSAocmdiYSwgb3BhY2l0eSkgPT4ge1xuICAgIHZhciBfYTtcbiAgICByZXR1cm4gKHtcbiAgICAgICAgcjogcm91bmRXaXRoRGVjaW1hbHMocmdiYS5yICogMjU1LCAwKSxcbiAgICAgICAgZzogcm91bmRXaXRoRGVjaW1hbHMocmdiYS5nICogMjU1LCAwKSxcbiAgICAgICAgYjogcm91bmRXaXRoRGVjaW1hbHMocmdiYS5iICogMjU1LCAwKSxcbiAgICAgICAgYTogcm91bmRXaXRoRGVjaW1hbHMoKF9hID0gb3BhY2l0eSAhPT0gbnVsbCAmJiBvcGFjaXR5ICE9PSB2b2lkIDAgPyBvcGFjaXR5IDogcmdiYS5hKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAxKVxuICAgIH0pO1xufTtcbmV4cG9ydCBjb25zdCBjb252ZXJ0UGFpbnRUb1JnYmEgPSAocGFpbnQpID0+IHtcbiAgICBpZiAocGFpbnQudHlwZSA9PT0gJ1NPTElEJyAmJiBwYWludC52aXNpYmxlID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiByb3VuZFJnYmEocGFpbnQuY29sb3IsIHBhaW50Lm9wYWNpdHkpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5leHBvcnQgY29uc3QgY29udmVydFJnYmFPYmplY3RUb1N0cmluZyA9IChyZ2JhT2JqZWN0KSA9PiBgcmdiYSgke3JnYmFPYmplY3Qucn0sICR7cmdiYU9iamVjdC5nfSwgJHtyZ2JhT2JqZWN0LmJ9LCAke3JnYmFPYmplY3QuYX0pYDtcbmV4cG9ydCBjb25zdCByZ2JhT2JqZWN0VG9IZXg4ID0gKHJnYmFPYmplY3QpID0+IHtcbiAgICAvLyByZXR1cm4gdmFsdWVcbiAgICByZXR1cm4gdGlueWNvbG9yKGNvbnZlcnRSZ2JhT2JqZWN0VG9TdHJpbmcocmdiYU9iamVjdCkpLnRvSGV4OFN0cmluZygpO1xufTtcbiIsImltcG9ydCB7IGNvbnZlcnRQYWludFRvUmdiYSB9IGZyb20gJy4vY29udmVydENvbG9yJztcbi8qKlxuICogUmV0dXJuIGFuIGFycmF5IG9mIHNvbGlkIHN0cm9rZSBjb2xvcnNcbiAqL1xuY29uc3QgZ2V0U29saWRTdHJva2VzID0gKHBhaW50cykgPT4ge1xuICAgIC8vIGNsb25lIHdpdGhvdXQgcmVmZXJlbmNlXG4gICAgcmV0dXJuIFsuLi5wYWludHNdXG4gICAgICAgIC5tYXAocGFpbnQgPT4gY29udmVydFBhaW50VG9SZ2JhKHBhaW50KSlcbiAgICAgICAgLmZpbHRlcihwYWludCA9PiBwYWludCAhPSBudWxsKTtcbn07XG4vKipcbiAqIGV4dHJhY3RUb2tlbk5vZGVWYWx1ZXNcbiAqIEBwYXJhbSBub2RlOiBTY2VuZU5vZGVcbiAqIEByZXR1cm5zIG5vZGUgb2JqZWN0XG4gKi9cbmNvbnN0IGV4dHJhY3RUb2tlbk5vZGVWYWx1ZXMgPSAobm9kZSkgPT4gKHtcbiAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGRlc2NyaXB0aW9uOiBub2RlLmRlc2NyaXB0aW9uIHx8IHVuZGVmaW5lZCxcbiAgICBib3R0b21MZWZ0UmFkaXVzOiBub2RlLmJvdHRvbUxlZnRSYWRpdXMsXG4gICAgYm90dG9tUmlnaHRSYWRpdXM6IG5vZGUuYm90dG9tUmlnaHRSYWRpdXMsXG4gICAgdG9wTGVmdFJhZGl1czogbm9kZS50b3BMZWZ0UmFkaXVzLFxuICAgIHRvcFJpZ2h0UmFkaXVzOiBub2RlLnRvcFJpZ2h0UmFkaXVzLFxuICAgIGNvcm5lclJhZGl1czogbm9kZS5jb3JuZXJSYWRpdXMgfHwgdW5kZWZpbmVkLFxuICAgIGNvcm5lclNtb290aGluZzogbm9kZS5jb3JuZXJTbW9vdGhpbmcsXG4gICAgc3Ryb2tlczogZ2V0U29saWRTdHJva2VzKG5vZGUuc3Ryb2tlcyksXG4gICAgc3Ryb2tlV2VpZ2h0OiBub2RlLnN0cm9rZVdlaWdodCxcbiAgICBzdHJva2VTdHlsZUlkOiBub2RlLnN0cm9rZVN0eWxlSWQsXG4gICAgc3Ryb2tlTWl0ZXJMaW1pdDogbm9kZS5zdHJva2VNaXRlckxpbWl0LFxuICAgIHN0cm9rZUpvaW46IG5vZGUuc3Ryb2tlSm9pbixcbiAgICBzdHJva2VDYXA6IG5vZGUuc3Ryb2tlQ2FwLFxuICAgIGRhc2hQYXR0ZXJuOiBub2RlLmRhc2hQYXR0ZXJuLFxuICAgIHN0cm9rZUFsaWduOiBub2RlLnN0cm9rZUFsaWduLFxuICAgIHdpZHRoOiBub2RlLndpZHRoLFxuICAgIGhlaWdodDogbm9kZS5oZWlnaHQsXG4gICAgcmVhY3Rpb25zOiBub2RlLnJlYWN0aW9ucyB8fCB1bmRlZmluZWQsXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHBhZGRpbmdUb3A6IG5vZGUucGFkZGluZ1RvcCB8fCAwLFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwYWRkaW5nUmlnaHQ6IG5vZGUucGFkZGluZ1JpZ2h0IHx8IDAsXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHBhZGRpbmdCb3R0b206IG5vZGUucGFkZGluZ0JvdHRvbSB8fCAwLFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwYWRkaW5nTGVmdDogbm9kZS5wYWRkaW5nTGVmdCB8fCAwXG59KTtcbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3RUb2tlbk5vZGVWYWx1ZXM7XG4iLCJpbXBvcnQgY29uZmlnIGZyb20gJ0Bjb25maWcvY29uZmlnJztcbmNvbnN0IGV4Y2x1c2lvblByZWZpeCA9IChleGNsdXNpb25QcmVmaXhTdHJpbmdzKSA9PiB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgLi4uY29uZmlnLmV4Y2x1c2lvblByZWZpeERlZmF1bHQsXG4gICAgICAgIC4uLmV4Y2x1c2lvblByZWZpeFN0cmluZ3NcbiAgICBdO1xufTtcbmNvbnN0IGZpbHRlckJ5UHJvcGVydHlOYW1lID0gKG9iamVjdCwgZXhjbHVzaW9uUHJlZml4U3RyaW5ncykgPT4gIWV4Y2x1c2lvblByZWZpeChleGNsdXNpb25QcmVmaXhTdHJpbmdzKS5pbmNsdWRlcyhvYmplY3QubmFtZS50cmltKCkuc3Vic3RyKDAsIDEpKTtcbmV4cG9ydCBkZWZhdWx0IGZpbHRlckJ5UHJvcGVydHlOYW1lO1xuIiwiLyoqXG4gKiBAZnVuY3Rpb24gZ2V0RWZmZWN0U3R5bGVzXG4gKiBAcGFyYW0ge0FycmF5PEVmZmVjdFN0eWxlPn0gc3R5bGVzIOKAkyB0aGUgZWZmZWN0U3R5bGUgZnJvbSB0aGUgZmlnbWEgZmlsZVxuICovXG5jb25zdCBnZXRFZmZlY3RTdHlsZXMgPSAoc3R5bGVzKSA9PiB7XG4gICAgLy8gaW5pdCBzdHlsZUFycmF5XG4gICAgY29uc3Qgc3R5bGVBcnJheSA9IFtdO1xuICAgIC8vIGxvb3AgdGhyb3VnaCBGaWdtYSBzdHlsZXMgYW5kIGFkZCB0byBhcnJheVxuICAgIHN0eWxlcy5mb3JFYWNoKHN0eWxlID0+IHtcbiAgICAgICAgc3R5bGVBcnJheS5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IHN0eWxlLm5hbWUsXG4gICAgICAgICAgICBpZDogc3R5bGUuaWQsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogc3R5bGUuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBlZmZlY3RzOiBzdHlsZS5lZmZlY3RzXG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIHJldHVybiBhcnJheVxuICAgIHJldHVybiBzdHlsZUFycmF5O1xufTtcbmV4cG9ydCBkZWZhdWx0IGdldEVmZmVjdFN0eWxlcztcbiIsImltcG9ydCBjb25maWcgZnJvbSAnQGNvbmZpZy9jb25maWcnO1xuY29uc3QgZ2V0RmlsZUlkID0gKGZpZ21hKSA9PiB7XG4gICAgbGV0IGZpbGVJZCA9IGZpZ21hLnJvb3QuZ2V0UGx1Z2luRGF0YShjb25maWcua2V5LmZpbGVJZCk7XG4gICAgLy8gc2V0IHBsdWdpbiBpZCBpZiBpdCBkb2VzIG5vdCBleGlzdFxuICAgIGlmIChmaWxlSWQgPT09IHVuZGVmaW5lZCB8fCBmaWxlSWQgPT09ICcnKSB7XG4gICAgICAgIGZpZ21hLnJvb3Quc2V0UGx1Z2luRGF0YShjb25maWcua2V5LmZpbGVJZCwgZmlnbWEucm9vdC5uYW1lICsgJyAnICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwMDAwMCkpO1xuICAgICAgICAvLyBncmFiIGZpbGUgSURcbiAgICAgICAgZmlsZUlkID0gZmlnbWEucm9vdC5nZXRQbHVnaW5EYXRhKGNvbmZpZy5rZXkuZmlsZUlkKTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbGVJZDtcbn07XG5leHBvcnQgZGVmYXVsdCBnZXRGaWxlSWQ7XG4iLCIvKipcbiAqIEBmdW5jdGlvbiBnZXRHcmlkU3R5bGVzXG4gKiBAcGFyYW0ge0FycmF5fSBncmlkU3R5bGVzIOKAkyB0aGUgZ3JpZFN0eWxlcyBmcm9tIHRoZSBmaWdtYSBmaWxlXG4gKi9cbmNvbnN0IGdldEdyaWRTdHlsZXMgPSAoc3R5bGVzKSA9PiB7XG4gICAgLy8gaW5pdCBzdHlsZUFycmF5XG4gICAgY29uc3Qgc3R5bGVBcnJheSA9IFtdO1xuICAgIC8vIGxvb3AgdGhyb3VnaCBGaWdtYSBzdHlsZXMgYW5kIGFkZCB0byBhcnJheVxuICAgIHN0eWxlcy5mb3JFYWNoKHN0eWxlID0+IHtcbiAgICAgICAgc3R5bGVBcnJheS5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IHN0eWxlLm5hbWUsXG4gICAgICAgICAgICBpZDogc3R5bGUuaWQsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogc3R5bGUuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBsYXlvdXRHcmlkczogc3R5bGUubGF5b3V0R3JpZHNcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy8gcmV0dXJuIGFycmF5XG4gICAgcmV0dXJuIHN0eWxlQXJyYXk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0R3JpZFN0eWxlcztcbiIsIi8qKlxuICogQGZ1bmN0aW9uIGdldFBhaW50U3R5bGVzXG4gKiBAcGFyYW0ge0FycmF5fSBwYWludFN0eWxlcyDigJMgdGhlIHBhaW50U3R5bGVzIGZyb20gdGhlIGZpZ21hIGZpbGUgKHNvbWVob3cgc3RpbGwgY29ubmVjdGVkKVxuICovXG5jb25zdCBnZXRQYWludFN0eWxlcyA9IChzdHlsZXMpID0+IHtcbiAgICAvLyBpbml0IHN0eWxlQXJyYXlcbiAgICBjb25zdCBzdHlsZUFycmF5ID0gW107XG4gICAgLy8gbG9vcCB0aHJvdWdoIEZpZ21hIHN0eWxlcyBhbmQgYWRkIHRvIGFycmF5XG4gICAgc3R5bGVzLmZvckVhY2goc3R5bGUgPT4ge1xuICAgICAgICBzdHlsZUFycmF5LnB1c2goe1xuICAgICAgICAgICAgbmFtZTogc3R5bGUubmFtZSxcbiAgICAgICAgICAgIGlkOiBzdHlsZS5pZCxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBzdHlsZS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIHBhaW50czogc3R5bGUucGFpbnRzXG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIHJldHVybiBhcnJheVxuICAgIHJldHVybiBzdHlsZUFycmF5O1xufTtcbmV4cG9ydCBkZWZhdWx0IGdldFBhaW50U3R5bGVzO1xuIiwiLyoqXG4gKiBAZnVuY3Rpb24gZ2V0VGV4dFN0eWxlc1xuICogQHBhcmFtIHtBcnJheTxUZXh0U3R5bGU+fSBzdHlsZXMg4oCTIHRoZSBwYWludFN0eWxlcyBmcm9tIHRoZSBmaWdtYSBmaWxlIChzb21laG93IHN0aWxsIGNvbm5lY3RlZClcbiAqL1xuY29uc3QgZ2V0VGV4dFN0eWxlcyA9IChzdHlsZXMpID0+IHtcbiAgICAvLyBpbml0IHN0eWxlQXJyYXlcbiAgICBjb25zdCBzdHlsZUFycmF5ID0gW107XG4gICAgLy8gbG9vcCB0aHJvdWdoIEZpZ21hIHN0eWxlcyBhbmQgYWRkIHRvIGFycmF5XG4gICAgc3R5bGVzLmZvckVhY2goc3R5bGUgPT4ge1xuICAgICAgICBzdHlsZUFycmF5LnB1c2goe1xuICAgICAgICAgICAgbmFtZTogc3R5bGUubmFtZSxcbiAgICAgICAgICAgIGlkOiBzdHlsZS5pZCxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBzdHlsZS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGZvbnRTaXplOiBzdHlsZS5mb250U2l6ZSxcbiAgICAgICAgICAgIHRleHREZWNvcmF0aW9uOiBzdHlsZS50ZXh0RGVjb3JhdGlvbixcbiAgICAgICAgICAgIGZvbnROYW1lOiBzdHlsZS5mb250TmFtZSxcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6IHN0eWxlLmxldHRlclNwYWNpbmcsXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiBzdHlsZS5saW5lSGVpZ2h0LFxuICAgICAgICAgICAgcGFyYWdyYXBoSW5kZW50OiBzdHlsZS5wYXJhZ3JhcGhJbmRlbnQsXG4gICAgICAgICAgICBwYXJhZ3JhcGhTcGFjaW5nOiBzdHlsZS5wYXJhZ3JhcGhTcGFjaW5nLFxuICAgICAgICAgICAgdGV4dENhc2U6IHN0eWxlLnRleHRDYXNlXG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIHJldHVybiBhcnJheVxuICAgIHJldHVybiBzdHlsZUFycmF5O1xufTtcbmV4cG9ydCBkZWZhdWx0IGdldFRleHRTdHlsZXM7XG4iLCJpbXBvcnQgZXh0cmFjdENvbG9ycyBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdENvbG9ycyc7XG5pbXBvcnQgZXh0cmFjdEdyaWRzIGZyb20gJy4uL2V4dHJhY3Rvci9leHRyYWN0R3JpZHMnO1xuaW1wb3J0IGV4dHJhY3RGb250cyBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdEZvbnRzJztcbmltcG9ydCBleHRyYWN0RWZmZWN0cyBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdEVmZmVjdHMnO1xuaW1wb3J0IGV4dHJhY3RNb3Rpb24gZnJvbSAnLi4vZXh0cmFjdG9yL2V4dHJhY3RNb3Rpb24nO1xuaW1wb3J0IGV4dHJhY3RTaXplcyBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdFNpemVzJztcbmltcG9ydCBleHRyYWN0U3BhY2luZyBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdFNwYWNpbmcnO1xuaW1wb3J0IGV4dHJhY3RCb3JkZXJzIGZyb20gJy4uL2V4dHJhY3Rvci9leHRyYWN0Qm9yZGVycyc7XG5pbXBvcnQgZXh0cmFjdFJhZGlpIGZyb20gJy4uL2V4dHJhY3Rvci9leHRyYWN0UmFkaWknO1xuaW1wb3J0IGV4dHJhY3RCcmVha3BvaW50cyBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdEJyZWFrcG9pbnRzJztcbmltcG9ydCBidWlsZEZpZ21hRGF0YSBmcm9tICcuL2J1aWxkRmlnbWFEYXRhJztcbmNvbnN0IGdldFByZWZpeEFycmF5ID0gKHByZWZpeFN0cmluZykgPT4gcHJlZml4U3RyaW5nLnNwbGl0KCcsJykubWFwKGl0ZW0gPT4gaXRlbS5yZXBsYWNlKC9cXHMrL2csICcnKSk7XG5leHBvcnQgY29uc3QgZXhwb3J0UmF3VG9rZW5BcnJheSA9IChmaWdtYSwgc2V0dGluZ3MpID0+IHtcbiAgICBjb25zdCBmaWdtYURhdGEgPSBidWlsZEZpZ21hRGF0YShmaWdtYSwgc2V0dGluZ3MpO1xuICAgIC8vIGdldCB0b2tlbnNcbiAgICByZXR1cm4gW1xuICAgICAgICAuLi5leHRyYWN0U2l6ZXMoZmlnbWFEYXRhLnRva2VuRnJhbWVzLCBnZXRQcmVmaXhBcnJheShzZXR0aW5ncy5wcmVmaXguc2l6ZSkpLFxuICAgICAgICAuLi5leHRyYWN0QnJlYWtwb2ludHMoZmlnbWFEYXRhLnRva2VuRnJhbWVzLCBnZXRQcmVmaXhBcnJheShzZXR0aW5ncy5wcmVmaXguYnJlYWtwb2ludCkpLFxuICAgICAgICAuLi5leHRyYWN0U3BhY2luZyhmaWdtYURhdGEudG9rZW5GcmFtZXMsIGdldFByZWZpeEFycmF5KHNldHRpbmdzLnByZWZpeC5zcGFjaW5nKSksXG4gICAgICAgIC4uLmV4dHJhY3RCb3JkZXJzKGZpZ21hRGF0YS50b2tlbkZyYW1lcywgZ2V0UHJlZml4QXJyYXkoc2V0dGluZ3MucHJlZml4LmJvcmRlcikpLFxuICAgICAgICAuLi5leHRyYWN0UmFkaWkoZmlnbWFEYXRhLnRva2VuRnJhbWVzLCBnZXRQcmVmaXhBcnJheShzZXR0aW5ncy5wcmVmaXgucmFkaXVzKSksXG4gICAgICAgIC4uLmV4dHJhY3RNb3Rpb24oZmlnbWFEYXRhLnRva2VuRnJhbWVzLCBnZXRQcmVmaXhBcnJheShzZXR0aW5ncy5wcmVmaXgubW90aW9uKSksXG4gICAgICAgIC4uLmV4dHJhY3RDb2xvcnMoZmlnbWFEYXRhLnBhaW50U3R5bGVzLCB7IGNvbG9yOiBnZXRQcmVmaXhBcnJheShzZXR0aW5ncy5wcmVmaXguY29sb3IpLCBncmFkaWVudDogZ2V0UHJlZml4QXJyYXkoc2V0dGluZ3MucHJlZml4LmdyYWRpZW50KSwgYWxpYXM6IGdldFByZWZpeEFycmF5KHNldHRpbmdzLmFsaWFzKSB9KSxcbiAgICAgICAgLi4uZXh0cmFjdEdyaWRzKGZpZ21hRGF0YS5ncmlkU3R5bGVzLCBnZXRQcmVmaXhBcnJheShzZXR0aW5ncy5wcmVmaXguZ3JpZCkpLFxuICAgICAgICAuLi5leHRyYWN0Rm9udHMoZmlnbWFEYXRhLnRleHRTdHlsZXMsIGdldFByZWZpeEFycmF5KHNldHRpbmdzLnByZWZpeC5mb250KSksXG4gICAgICAgIC4uLmV4dHJhY3RFZmZlY3RzKGZpZ21hRGF0YS5lZmZlY3RTdHlsZXMsIGdldFByZWZpeEFycmF5KHNldHRpbmdzLnByZWZpeC5lZmZlY3QpKVxuICAgIF07XG59O1xuIiwiaW1wb3J0IGV4dHJhY3RUb2tlbk5vZGVWYWx1ZXMgZnJvbSAnLi9leHRyYWN0VG9rZW5Ob2RlVmFsdWVzJztcbmltcG9ydCBpc1Rva2VuTm9kZSBmcm9tICcuL2lzVG9rZW5Ob2RlJztcbi8vIHRoZSBuYW1lIHRoYXQgdG9rZW4gZnJhbWVzIGhhdmVcbmNvbnN0IHRva2VuRnJhbWVOYW1lID0gJ190b2tlbnMnO1xuLy8gY2hlY2sgaWYgYSBmcmFtZSBpcyBhIF90b2tlbiBmcmFtZVxuY29uc3QgaXNUb2tlbkZyYW1lID0gKG5vZGUpID0+IG5vZGUudHlwZSA9PT0gJ0ZSQU1FJyAmJiBub2RlLm5hbWUudHJpbSgpLnRvTG93ZXJDYXNlKCkuc3Vic3RyKDAsIHRva2VuRnJhbWVOYW1lLmxlbmd0aCkgPT09IHRva2VuRnJhbWVOYW1lO1xuLy8gcmV0dXJuIG9ubHkgbm9kZXMgdGhhdCBhcmUgZnJhbWVzXG5jb25zdCBnZXRGcmFtZU5vZGVzID0gKG5vZGVzKSA9PiBbLi4ubm9kZXMubWFwKHBhZ2UgPT4gcGFnZS5maW5kQ2hpbGRyZW4obm9kZSA9PiBpc1Rva2VuRnJhbWUobm9kZSkpKS5yZWR1Y2UoKGZsYXR0ZW4sIGFycikgPT4gWy4uLmZsYXR0ZW4sIC4uLmFycl0pXTtcbi8qKlxuICogZ2V0VmFyaWFudE5hbWVcbiAqIGNyZWF0ZXMgdGhlIHZhcmlhbnQgbmFtZSBvZiB0aGUgcGFyZW50IGFuZCBjaGlsZCBuYW1lXG4gKi9cbmNvbnN0IGdldFZhcmlhbnROYW1lID0gKHBhcmVudE5hbWUsIGNoaWxkTmFtZSkgPT4ge1xuICAgIC8vIHNwbGl0IGludG8gYXJyYXlcbiAgICBjaGlsZE5hbWUgPSBjaGlsZE5hbWUuc3BsaXQoJywnKVxuICAgICAgICAvLyByZW1vdmUgaGlkZGVuIG5hbWVzXG4gICAgICAgIC5maWx0ZXIocGFydCA9PiAhWydfJywgJy4nXS5pbmNsdWRlcyhwYXJ0LnRyaW0oKS5zdWJzdHIoMCwgMSkpKVxuICAgICAgICAvLyBjbGVhbnVwIG5hbWVzLCBvbmx5IHJldHVybiB2YWx1ZSBwYXJ0XG4gICAgICAgIC5tYXAocGFydCA9PiBwYXJ0LnNwbGl0KCc9JylbMV0pXG4gICAgICAgIC8vIGNvbWJpbmVcbiAgICAgICAgLmpvaW4oJy8nKTtcbiAgICAvLyByZXR1cm4gZnVsbCBuYW1lXG4gICAgcmV0dXJuIGAke3BhcmVudE5hbWV9LyR7Y2hpbGROYW1lfWA7XG59O1xuLyoqXG4gKiBSZXR1cm5zIGFsbCBmcmFtZXMgZnJvbSB0aGUgZmlsZSB0aGF0IGhhdmUgYSBuYW1lIHRoYXQgc3RhcnRzIHdpdGggX3Rva2VucyBvciB0aGUgdXNlciBkZWZpbmVkIHRva2VuIHNwZWNpZmllclxuICpcbiAqIEBwYXJhbSBwYWdlcyBQYWdlTm9kZXNcbiAqL1xuY29uc3QgZ2V0VG9rZW5Ob2RlcyA9IChwYWdlcykgPT4ge1xuICAgIC8vIGdldCB0b2tlbiBmcmFtZXNcbiAgICBjb25zdCB0b2tlbkZyYW1lcyA9IGdldEZyYW1lTm9kZXMocGFnZXMpO1xuICAgIC8vIGdldCBhbGwgY2hpbGRyZW4gb2YgdG9rZW4gZnJhbWVzXG4gICAgcmV0dXJuIHRva2VuRnJhbWVzLm1hcChmcmFtZSA9PiBmcmFtZVxuICAgICAgICAvLyBjaGVjayBpZiBjaGlsZHJlbiBhcmUgb2YgdmFsaWRlIHR5cGVzXG4gICAgICAgIC5maW5kQWxsKFxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgbm9kZSA9PiBpc1Rva2VuTm9kZShub2RlKSkpXG4gICAgICAgIC8vIG1lcmdlcyBhbGwgY2hpbGRyZW4gaW50byBvbmUgYXJyYXlcbiAgICAgICAgLnJlZHVjZSgoZmxhdHRlbiwgYXJyKSA9PiBbLi4uZmxhdHRlbiwgLi4uYXJyXSwgW10pXG4gICAgICAgIC8vIHVucGFjayB2YXJpYW50cyAmIHdhcm4gYWJvdXQgZGVwcmVjYXRlZCB0eXBlc1xuICAgICAgICAubWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGlmIChpdGVtLnR5cGUgPT09ICdSRUNUQU5HTEUnIHx8IGl0ZW0udHlwZSA9PT0gJ0ZSQU1FJykge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdQbGVhc2UgdXNlIG9ubHkgbWFpbiBjb21wb25lbnRzIGFuZCB2YXJpYW50cywgb3RoZXIgdHlwZXMgbWF5IGJlIGRlcHJlY2F0ZWQgYXMgdG9rZW5zIGluIHRoZSBmdXR1cmUnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB1bnBhY2sgdmFyaWFudHNcbiAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gJ0NPTVBPTkVOVF9TRVQnKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBOYW1lIGlzIG92ZXJ3cml0aW5nIHJlYWwgb2JqZWN0IGluIGZpZ21hXG4gICAgICAgICAgICAvLyAtPiBjcmVhdGUgY2xvbmUgYW5kIG1vdmUgdG8gbmV3IGFycmF5IHRvIHJldHVyblxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZXh0cmFjdFRva2VuTm9kZVZhbHVlcyhjaGlsZCkpLCB7IG5hbWU6IGdldFZhcmlhbnROYW1lKGl0ZW0ubmFtZSwgY2hpbGQubmFtZSkgfSkpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZXR1cm4gbm9ybWFsIGl0ZW0gYXMgYXJyYXkgdG8gdW5wYWNrIGxhdGVyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIFtleHRyYWN0VG9rZW5Ob2RlVmFsdWVzKGl0ZW0pXTtcbiAgICB9KVxuICAgICAgICAvLyBtZXJnZXMgdGhlIHZhcmlhbnQgY2hpbGRyZW4gaW50byBvbmUgYXJyYXlcbiAgICAgICAgLnJlZHVjZSgoZmxhdHRlbiwgYXJyKSA9PiBbLi4uZmxhdHRlbiwgLi4uYXJyXSwgW10pO1xufTtcbmV4cG9ydCBkZWZhdWx0IGdldFRva2VuTm9kZXM7XG5leHBvcnQgY29uc3QgX190ZXN0aW5nID0ge1xuICAgIGlzVG9rZW5Ob2RlOiBpc1Rva2VuTm9kZSxcbiAgICBpc1Rva2VuRnJhbWU6IGlzVG9rZW5GcmFtZVxufTtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHNlbVZlckRpZmZlcmVuY2UgZnJvbSAnLi9zZW1WZXJEaWZmZXJlbmNlJztcbmltcG9ydCBjdXJyZW50VmVyc2lvbiBmcm9tICcuL3ZlcnNpb24nO1xuaW1wb3J0IGNvbmZpZyBmcm9tICdAY29uZmlnL2NvbmZpZyc7XG5jb25zdCBnZXRWZXJzaW9uRGlmZmVyZW5jZSA9IChmaWdtYSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgLy8gZ2V0IHZlcnNpb24gJiB2ZXJzaW9uIGRpZmZlcmVuY2VcbiAgICBjb25zdCBsYXN0VmVyc2lvblNldHRpbmdzT3BlbmVkID0geWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYyhjb25maWcua2V5Lmxhc3RWZXJzaW9uU2V0dGluZ3NPcGVuZWQpO1xuICAgIGNvbnN0IHZlcnNpb25EaWZmZXJlbmNlID0gc2VtVmVyRGlmZmVyZW5jZShjdXJyZW50VmVyc2lvbiwgbGFzdFZlcnNpb25TZXR0aW5nc09wZW5lZCk7XG4gICAgLy8gdXBkYXRlIHZlcnNpb25cbiAgICBpZiAoIWxhc3RWZXJzaW9uU2V0dGluZ3NPcGVuZWQgfHwgbGFzdFZlcnNpb25TZXR0aW5nc09wZW5lZCAhPT0gY3VycmVudFZlcnNpb24pIHtcbiAgICAgICAgeWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYyhjb25maWcua2V5Lmxhc3RWZXJzaW9uU2V0dGluZ3NPcGVuZWQsIGN1cnJlbnRWZXJzaW9uKTtcbiAgICB9XG4gICAgLy8gcmV0dXJuIHZlcnNpb24gRGlmZmVyZW5jZVxuICAgIHJldHVybiB2ZXJzaW9uRGlmZmVyZW5jZTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgZ2V0VmVyc2lvbkRpZmZlcmVuY2U7XG4iLCIvLyB0aGUgbm9kZSB0eXBlcyB0aGF0IGNhbiBiZSB1c2VkIGZvciB0b2tlbnNcbmNvbnN0IHRva2VuTm9kZVR5cGVzID0gW1xuICAgICdDT01QT05FTlQnLFxuICAgICdDT01QT05FTlRfU0VUJyxcbiAgICAnUkVDVEFOR0xFJyxcbiAgICAnRlJBTUUnXG5dO1xuLyoqXG4gKiBjaGVjayBpZiBhIG5vZGUgaXMgYSB2YWxpZCB0b2tlbiBub2RlIHR5cGVcbiAqIEN1cnJlbnRseTogJ0NPTVBPTkVOVCcsICdGUkFNRSBvciAnUkVDVEFOR0xFJ1xuICogQHBhcmFtIFNjZW5lTm9kZSBub2RlXG4gKi9cbmNvbnN0IGlzVG9rZW5Ob2RlID0gKG5vZGUpID0+IHtcbiAgICByZXR1cm4gbm9kZS5wYXJlbnQudHlwZSAhPT0gJ0NPTVBPTkVOVF9TRVQnICYmIHRva2VuTm9kZVR5cGVzLmluY2x1ZGVzKG5vZGUudHlwZSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgaXNUb2tlbk5vZGU7XG4iLCIvKipcbiAqIElmIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIG51bWJlclxuICogaXQgaXMgcm91bmRlZCB0byAzIGRlY2ltYWwgcG9zaXRpb25zXG4gKiBvdGhlcndpc2UgaXQgaXMgcmV0dXJuZWQgYXMgaXNcbiAqIEBwYXJhbSB2YWx1ZSBudW1iZXJcbiAqIEBwYXJhbSBkZWNpbWFsUGxhY2VzIGludFxuICovXG5jb25zdCByb3VuZFdpdGhEZWNpbWFscyA9ICh2YWx1ZSwgZGVjaW1hbFBsYWNlcyA9IDIpID0+IHtcbiAgICAvLyBleGl0IGlmIHZhbHVlIGlzIHVuZGVmaW5lZFxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gY2hlY2sgZm9yIGNvcnJlY3QgaW5wdXRzXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicgfHwgdHlwZW9mIGRlY2ltYWxQbGFjZXMgIT09ICdudW1iZXInKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwYXJhbWV0ZXJzLCBib3RoIHZhbHVlIFwiJHt2YWx1ZX1cIiAoJHt0eXBlb2YgdmFsdWV9KSBhbmQgZGVjaW1hbFBsYWNlcyBcIiR7ZGVjaW1hbFBsYWNlc31cIiAoJHt0eXBlb2YgZGVjaW1hbFBsYWNlc30pIG11c3QgYmUgb2YgdHlwZSBudW1iZXJgKTtcbiAgICB9XG4gICAgLy8gc2V0IGRlY2ltYWwgcGxhY2VzXG4gICAgY29uc3QgZmFjdG9yT2ZUZW4gPSBNYXRoLnBvdygxMCwgZGVjaW1hbFBsYWNlcyk7XG4gICAgLy8gcm91bmQgcmVzdWx0IGFuZCByZXR1cm5cbiAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIGZhY3Rvck9mVGVuKSAvIGZhY3Rvck9mVGVuO1xufTtcbmV4cG9ydCBkZWZhdWx0IHJvdW5kV2l0aERlY2ltYWxzO1xuIiwiZXhwb3J0IGRlZmF1bHQgKGN1cnJlbnRTZW1WZXIsIHByZXZTZW1WZXJzID0gJzEuMC4wJykgPT4ge1xuICAgIGNvbnN0IFtwTWFqb3IsIHBNaW5vciwgcFBhdGNoXSA9IHByZXZTZW1WZXJzLnNwbGl0KCcuJyk7XG4gICAgY29uc3QgW2NNYWpvciwgY01pbm9yLCBjUGF0Y2hdID0gY3VycmVudFNlbVZlci5zcGxpdCgnLicpO1xuICAgIGlmIChwTWFqb3IgPCBjTWFqb3IpIHtcbiAgICAgICAgcmV0dXJuICdtYWpvcic7XG4gICAgfVxuICAgIGlmIChwTWlub3IgPCBjTWlub3IpIHtcbiAgICAgICAgcmV0dXJuICdtaW5vcic7XG4gICAgfVxuICAgIGlmIChwUGF0Y2ggPCBjUGF0Y2gpIHtcbiAgICAgICAgcmV0dXJuICdwYXRjaCc7XG4gICAgfVxufTtcbiIsImltcG9ydCB7IGRlZmF1bHRTZXR0aW5ncyB9IGZyb20gJ0Bjb25maWcvZGVmYXVsdFNldHRpbmdzJztcbmltcG9ydCBjb25maWcgZnJvbSAnQGNvbmZpZy9jb25maWcnO1xuaW1wb3J0IHsgc3RyaW5naWZ5SnNvbiB9IGZyb20gJy4vc3RyaW5naWZ5SnNvbic7XG4vKipcbiAqIGdldCB0aGUgY3VycmVudCB1c2VycyBzZXR0aW5nc1xuICogZm9yIHNldHRpbmdzIHRoYXQgYXJlIG5vdCBzZXQsIHRoZSBkZWZhdWx0cyB3aWxsIGJlIHVzZWRcbiAqIEByZXR1cm4gb2JqZWN0XG4gKi9cbmNvbnN0IGdldFNldHRpbmdzID0gKCkgPT4ge1xuICAgIGxldCBzdG9yZWRTZXR0aW5ncyA9IGZpZ21hLnJvb3QuZ2V0UGx1Z2luRGF0YShjb25maWcua2V5LnNldHRpbmdzKTtcbiAgICAvLyByZXR1cm4gZGVmYXVsdHMgaWYgbm8gc2V0dGluZ3MgYXJlIHByZXNlbnRcbiAgICBpZiAoc3RvcmVkU2V0dGluZ3MgPT09ICcnKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0U2V0dGluZ3M7XG4gICAgfVxuICAgIC8vIHBhcnNlIHN0b3JlZCBzZXR0aW5nc1xuICAgIHN0b3JlZFNldHRpbmdzID0gSlNPTi5wYXJzZShzdG9yZWRTZXR0aW5ncyk7XG4gICAgcmV0dXJuIE9iamVjdC5mcm9tRW50cmllcyhPYmplY3QuZW50cmllcyhkZWZhdWx0U2V0dGluZ3MpLm1hcCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBzdG9yZWRTZXR0aW5nc1trZXldICE9PSB0eXBlb2YgdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBba2V5LCBkZWZhdWx0U2V0dGluZ3Nba2V5XV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtrZXksIHN0b3JlZFNldHRpbmdzW2tleV1dO1xuICAgIH0pKTtcbn07XG4vKipcbiAqIEBuYW1lIHNhdmVTZXR0aW5nc1xuICogQGRlc2NyaXB0aW9uIHNhdmUgdGhlIHVzZXIgc2V0dGluZ3MgdG8gdGhlIFwiY2FjaGVcIlxuICogQHBhcmFtIHtVc2VyU2V0dGluZ3N9IHNldHRpbmdzXG4gKi9cbmNvbnN0IHNldFNldHRpbmdzID0gKHNldHRpbmdzKSA9PiB7XG4gICAgc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRTZXR0aW5ncyksIHNldHRpbmdzKTtcbiAgICAvLyBzdG9yZSBwdWJsaWMgc2V0dGluZ3MgdGhhdCBzaG91bGQgYmUgc2hhcmVkIGFjcm9zcyBvcmdcbiAgICBmaWdtYS5yb290LnNldFBsdWdpbkRhdGEoY29uZmlnLmtleS5zZXR0aW5ncywgc3RyaW5naWZ5SnNvbihzZXR0aW5ncykpO1xufTtcbi8qKlxuICogQG5hbWUgcmVzZXRTZXR0aW5nc1xuICogQGRlc2NyaXB0aW9uIHJlc2V0U2V0dGluZ3MgdGhlIHVzZXIgc2V0dGluZ3MgdG8gdGhlIFwiY2FjaGVcIlxuICovXG5jb25zdCByZXNldFNldHRpbmdzID0gKCkgPT4gZmlnbWEucm9vdC5zZXRQbHVnaW5EYXRhKGNvbmZpZy5rZXkuc2V0dGluZ3MsIHN0cmluZ2lmeUpzb24oZGVmYXVsdFNldHRpbmdzKSk7XG4vLyBleHBvcnRzXG5leHBvcnQgeyBnZXRTZXR0aW5ncywgc2V0U2V0dGluZ3MsIHJlc2V0U2V0dGluZ3MgfTtcbiIsImV4cG9ydCBjb25zdCBzdHJpbmdpZnlKc29uID0gKG9iamVjdCwgY29tcHJlc3Npb24gPSB0cnVlKSA9PiB7XG4gICAgaWYgKGNvbXByZXNzaW9uID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmplY3QpO1xuICAgIH1cbiAgICAvLyByZXR1cm4gdW5jb21wcmVzc2VkIGpzb25cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqZWN0LCBudWxsLCAyKTtcbn07XG4iLCIvKiBpc3RhbmJ1bCBpZ25vcmUgZmlsZSAqL1xuY29uc3QgdmVyc2lvbiA9ICc2LjMuMic7XG5leHBvcnQgZGVmYXVsdCB2ZXJzaW9uO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==