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
var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
// Actual matching.
// Parentheses and commas are optional, but not required.
// Whitespace can take the place of commas or opening paren
var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
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
        return this.a === 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this.roundA + ")";
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
        return this.a === 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this.roundA + ")";
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
        return this.a === 1 ? "rgb(" + r + ", " + g + ", " + b + ")" : "rgba(" + r + ", " + g + ", " + b + ", " + this.roundA + ")";
    };
    /**
     * Returns the object as a RGBA object.
     */
    TinyColor.prototype.toPercentageRgb = function () {
        var fmt = function (x) { return Math.round(Object(_util__WEBPACK_IMPORTED_MODULE_3__["bound01"])(x, 255) * 100) + "%"; };
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
            ? "rgb(" + rnd(this.r) + "%, " + rnd(this.g) + "%, " + rnd(this.b) + "%)"
            : "rgba(" + rnd(this.r) + "%, " + rnd(this.g) + "%, " + rnd(this.b) + "%, " + this.roundA + ")";
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
    return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
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
        return Number(n) * 100 + "%";
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
            height: 685
        },
        export: {
            width: 550,
            height: 420
        },
        urlExport: {
            width: 550,
            height: 575
        }
    },
    key: {
        lastVersionSettingsOpened: 'lastVersionSettingsOpened',
        fileId: 'fileId',
        settings: 'settings',
        extensionPluginData: 'org.lukasoppermann.figmaDesignTokens',
        extensionFigmaStyleId: 'styleId'
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
    authType: 'token',
    exclusionPrefix: '',
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
                value: [...node.dashPattern],
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




const gradientType = {
    GRADIENT_LINEAR: 'linear',
    GRADIENT_RADIAL: 'radial',
    GRADIENT_ANGULAR: 'angular',
    GRADIENT_DIAMOND: 'diamond'
};
const isGradient = (paint) => ['GRADIENT_LINEAR', 'GRADIENT_RADIAL', 'GRADIENT_ANGULAR', 'GRADIENT_DIAMOND'].includes(paint.type);
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
        // remove images fills from tokens
        .map(node => {
        node.paints = node.paints.filter(paint => paint.type !== 'IMAGE');
        return node;
    })
        // remove tokens with no fill
        .filter(node => node.paints.length > 0)
        // transform style
        .map(node => ({
        name: `${isGradient(node.paints[0]) ? prefixArray.gradient[0] : prefixArray.color[0]}/${node.name}`,
        category: isGradient(node.paints[0]) ? 'gradient' : 'color',
        exportKey: (isGradient(node.paints[0]) ? _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["tokenTypes"].gradient.key : _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["tokenTypes"].color.key),
        description: node.description || null,
        values: node.paints.map(paint => extractFills(paint)),
        extensions: {
            [_config_config__WEBPACK_IMPORTED_MODULE_3__["default"].key.extensionPluginData]: {
                [_config_config__WEBPACK_IMPORTED_MODULE_3__["default"].key.extensionFigmaStyleId]: node.id,
                exportKey: (isGradient(node.paints[0]) ? _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["tokenTypes"].gradient.key : _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["tokenTypes"].color.key)
            }
        }
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
    thin: 100,
    extralight: 200,
    ultralight: 200,
    extraleicht: 200,
    light: 300,
    leicht: 300,
    normal: 400,
    regular: 400,
    buch: 400,
    medium: 500,
    kraeftig: 500,
    kräftig: 500,
    semibold: 600,
    demibold: 600,
    halbfett: 600,
    bold: 700,
    dreiviertelfett: 700,
    extrabold: 800,
    ultabold: 800,
    fett: 800,
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
                unit: node.letterSpacing.unit.toLowerCase(),
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
const rgbaObjectToHex8 = (rgbaObject) => Object(_ctrl_tinycolor__WEBPACK_IMPORTED_MODULE_1__["fromRatio"])(rgbaObject).toHex8String();


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
        ...Object(_extractor_extractColors__WEBPACK_IMPORTED_MODULE_0__["default"])(figmaData.paintStyles, { color: getPrefixArray(settings.prefix.color), gradient: getPrefixArray(settings.prefix.gradient) }),
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
const version = '6.0.1';
/* harmony default export */ __webpack_exports__["default"] = (version);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BjdHJsL3Rpbnljb2xvci9kaXN0L21vZHVsZS9jb252ZXJzaW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AY3RybC90aW55Y29sb3IvZGlzdC9tb2R1bGUvY3NzLWNvbG9yLW5hbWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AY3RybC90aW55Y29sb3IvZGlzdC9tb2R1bGUvZm9ybWF0LWlucHV0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AY3RybC90aW55Y29sb3IvZGlzdC9tb2R1bGUvZnJvbS1yYXRpby5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGN0cmwvdGlueWNvbG9yL2Rpc3QvbW9kdWxlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AY3RybC90aW55Y29sb3IvZGlzdC9tb2R1bGUvaW50ZXJmYWNlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGN0cmwvdGlueWNvbG9yL2Rpc3QvbW9kdWxlL3B1YmxpY19hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BjdHJsL3Rpbnljb2xvci9kaXN0L21vZHVsZS9yYW5kb20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BjdHJsL3Rpbnljb2xvci9kaXN0L21vZHVsZS9yZWFkYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGN0cmwvdGlueWNvbG9yL2Rpc3QvbW9kdWxlL3RvLW1zLWZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGN0cmwvdGlueWNvbG9yL2Rpc3QvbW9kdWxlL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZy9jb21tYW5kcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL2NvbmZpZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL2RlZmF1bHRTZXR0aW5ncy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL3Rva2VuVHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0Qm9yZGVycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RCcmVha3BvaW50cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RDb2xvcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0RWZmZWN0cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RGb250cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RHcmlkcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RNb3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0UmFkaWkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0U2l6ZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0U3BhY2luZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RVdGlsaXRpZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvYWNjZXNzVG9rZW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9idWlsZEZpZ21hRGF0YS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2NvbnZlcnRDb2xvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2V4dHJhY3RUb2tlbk5vZGVWYWx1ZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9maWx0ZXJCeU5hbWVQcm9wZXJ0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2dldEVmZmVjdFN0eWxlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2dldEZpbGVJZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2dldEdyaWRTdHlsZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9nZXRQYWludFN0eWxlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2dldFRleHRTdHlsZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9nZXRUb2tlbkpzb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9nZXRUb2tlbk5vZGVzLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvZ2V0VmVyc2lvbkRpZmZlcmVuY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9pc1Rva2VuTm9kZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL3JvdW5kV2l0aERlY2ltYWxzLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvc2VtVmVyRGlmZmVyZW5jZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL3NldHRpbmdzLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvc3RyaW5naWZ5SnNvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL3ZlcnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNB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Q1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDMU9BO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3pKQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFrRztBQUN4RDtBQUNl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QUFDUDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDakZBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNYQTtBQUFBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUN0Q0Y7QUFBQTtBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzNDQTtBQUFBO0FBQUE7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNB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QUNoQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLHdFQUFjO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDZEQUFVO0FBQzdCO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYSxFQUFFO0FBQ2Y7QUFDQSxhQUFhLHNEQUFNO0FBQ25CLDJCQUEyQiw2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QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNaRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUEwRDtBQUN0QjtBQUNZO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxzREFBTTtBQUN4RDtBQUNBO0FBQ0EsZUFBZSx1RUFBZTtBQUM5QjtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsdUVBQWU7QUFDNUQ7QUFDQSx5QkFBeUIsdUVBQWU7QUFDeEM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QjtBQUNBO0FBQ0EsNkNBQTZDLEVBQUUsdUVBQWU7QUFDOUQ7QUFDQSw2QkFBNkIsc0RBQU0sZUFBZSxvRUFBYTtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELHNEQUFNLGVBQWUsb0VBQWEsQ0FBQyx1RUFBZTtBQUN2RztBQUNtRDs7Ozs7Ozs7Ozs7OztBQ3ZDbkQ7QUFBQTtBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDTkE7QUFBQTtBQUNBO0FBQ2Usc0VBQU8sRUFBQyIsImZpbGUiOiJwbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IGJvdW5kMDEsIHBhZDIgfSBmcm9tICcuL3V0aWwnO1xuLy8gYHJnYlRvSHNsYCwgYHJnYlRvSHN2YCwgYGhzbFRvUmdiYCwgYGhzdlRvUmdiYCBtb2RpZmllZCBmcm9tOlxuLy8gPGh0dHA6Ly9tamlqYWNrc29uLmNvbS8yMDA4LzAyL3JnYi10by1oc2wtYW5kLXJnYi10by1oc3YtY29sb3ItbW9kZWwtY29udmVyc2lvbi1hbGdvcml0aG1zLWluLWphdmFzY3JpcHQ+XG4vKipcbiAqIEhhbmRsZSBib3VuZHMgLyBwZXJjZW50YWdlIGNoZWNraW5nIHRvIGNvbmZvcm0gdG8gQ1NTIGNvbG9yIHNwZWNcbiAqIDxodHRwOi8vd3d3LnczLm9yZy9UUi9jc3MzLWNvbG9yLz5cbiAqICpBc3N1bWVzOiogciwgZywgYiBpbiBbMCwgMjU1XSBvciBbMCwgMV1cbiAqICpSZXR1cm5zOiogeyByLCBnLCBiIH0gaW4gWzAsIDI1NV1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJnYlRvUmdiKHIsIGcsIGIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByOiBib3VuZDAxKHIsIDI1NSkgKiAyNTUsXG4gICAgICAgIGc6IGJvdW5kMDEoZywgMjU1KSAqIDI1NSxcbiAgICAgICAgYjogYm91bmQwMShiLCAyNTUpICogMjU1LFxuICAgIH07XG59XG4vKipcbiAqIENvbnZlcnRzIGFuIFJHQiBjb2xvciB2YWx1ZSB0byBIU0wuXG4gKiAqQXNzdW1lczoqIHIsIGcsIGFuZCBiIGFyZSBjb250YWluZWQgaW4gWzAsIDI1NV0gb3IgWzAsIDFdXG4gKiAqUmV0dXJuczoqIHsgaCwgcywgbCB9IGluIFswLDFdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZ2JUb0hzbChyLCBnLCBiKSB7XG4gICAgciA9IGJvdW5kMDEociwgMjU1KTtcbiAgICBnID0gYm91bmQwMShnLCAyNTUpO1xuICAgIGIgPSBib3VuZDAxKGIsIDI1NSk7XG4gICAgdmFyIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpO1xuICAgIHZhciBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcbiAgICB2YXIgaCA9IDA7XG4gICAgdmFyIHMgPSAwO1xuICAgIHZhciBsID0gKG1heCArIG1pbikgLyAyO1xuICAgIGlmIChtYXggPT09IG1pbikge1xuICAgICAgICBzID0gMDtcbiAgICAgICAgaCA9IDA7IC8vIGFjaHJvbWF0aWNcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBkID0gbWF4IC0gbWluO1xuICAgICAgICBzID0gbCA+IDAuNSA/IGQgLyAoMiAtIG1heCAtIG1pbikgOiBkIC8gKG1heCArIG1pbik7XG4gICAgICAgIHN3aXRjaCAobWF4KSB7XG4gICAgICAgICAgICBjYXNlIHI6XG4gICAgICAgICAgICAgICAgaCA9IChnIC0gYikgLyBkICsgKGcgPCBiID8gNiA6IDApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBnOlxuICAgICAgICAgICAgICAgIGggPSAoYiAtIHIpIC8gZCArIDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGI6XG4gICAgICAgICAgICAgICAgaCA9IChyIC0gZykgLyBkICsgNDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaCAvPSA2O1xuICAgIH1cbiAgICByZXR1cm4geyBoOiBoLCBzOiBzLCBsOiBsIH07XG59XG5mdW5jdGlvbiBodWUycmdiKHAsIHEsIHQpIHtcbiAgICBpZiAodCA8IDApIHtcbiAgICAgICAgdCArPSAxO1xuICAgIH1cbiAgICBpZiAodCA+IDEpIHtcbiAgICAgICAgdCAtPSAxO1xuICAgIH1cbiAgICBpZiAodCA8IDEgLyA2KSB7XG4gICAgICAgIHJldHVybiBwICsgKHEgLSBwKSAqICg2ICogdCk7XG4gICAgfVxuICAgIGlmICh0IDwgMSAvIDIpIHtcbiAgICAgICAgcmV0dXJuIHE7XG4gICAgfVxuICAgIGlmICh0IDwgMiAvIDMpIHtcbiAgICAgICAgcmV0dXJuIHAgKyAocSAtIHApICogKDIgLyAzIC0gdCkgKiA2O1xuICAgIH1cbiAgICByZXR1cm4gcDtcbn1cbi8qKlxuICogQ29udmVydHMgYW4gSFNMIGNvbG9yIHZhbHVlIHRvIFJHQi5cbiAqXG4gKiAqQXNzdW1lczoqIGggaXMgY29udGFpbmVkIGluIFswLCAxXSBvciBbMCwgMzYwXSBhbmQgcyBhbmQgbCBhcmUgY29udGFpbmVkIFswLCAxXSBvciBbMCwgMTAwXVxuICogKlJldHVybnM6KiB7IHIsIGcsIGIgfSBpbiB0aGUgc2V0IFswLCAyNTVdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoc2xUb1JnYihoLCBzLCBsKSB7XG4gICAgdmFyIHI7XG4gICAgdmFyIGc7XG4gICAgdmFyIGI7XG4gICAgaCA9IGJvdW5kMDEoaCwgMzYwKTtcbiAgICBzID0gYm91bmQwMShzLCAxMDApO1xuICAgIGwgPSBib3VuZDAxKGwsIDEwMCk7XG4gICAgaWYgKHMgPT09IDApIHtcbiAgICAgICAgLy8gYWNocm9tYXRpY1xuICAgICAgICBnID0gbDtcbiAgICAgICAgYiA9IGw7XG4gICAgICAgIHIgPSBsO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIHEgPSBsIDwgMC41ID8gbCAqICgxICsgcykgOiBsICsgcyAtIGwgKiBzO1xuICAgICAgICB2YXIgcCA9IDIgKiBsIC0gcTtcbiAgICAgICAgciA9IGh1ZTJyZ2IocCwgcSwgaCArIDEgLyAzKTtcbiAgICAgICAgZyA9IGh1ZTJyZ2IocCwgcSwgaCk7XG4gICAgICAgIGIgPSBodWUycmdiKHAsIHEsIGggLSAxIC8gMyk7XG4gICAgfVxuICAgIHJldHVybiB7IHI6IHIgKiAyNTUsIGc6IGcgKiAyNTUsIGI6IGIgKiAyNTUgfTtcbn1cbi8qKlxuICogQ29udmVydHMgYW4gUkdCIGNvbG9yIHZhbHVlIHRvIEhTVlxuICpcbiAqICpBc3N1bWVzOiogciwgZywgYW5kIGIgYXJlIGNvbnRhaW5lZCBpbiB0aGUgc2V0IFswLCAyNTVdIG9yIFswLCAxXVxuICogKlJldHVybnM6KiB7IGgsIHMsIHYgfSBpbiBbMCwxXVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmdiVG9Ic3YociwgZywgYikge1xuICAgIHIgPSBib3VuZDAxKHIsIDI1NSk7XG4gICAgZyA9IGJvdW5kMDEoZywgMjU1KTtcbiAgICBiID0gYm91bmQwMShiLCAyNTUpO1xuICAgIHZhciBtYXggPSBNYXRoLm1heChyLCBnLCBiKTtcbiAgICB2YXIgbWluID0gTWF0aC5taW4ociwgZywgYik7XG4gICAgdmFyIGggPSAwO1xuICAgIHZhciB2ID0gbWF4O1xuICAgIHZhciBkID0gbWF4IC0gbWluO1xuICAgIHZhciBzID0gbWF4ID09PSAwID8gMCA6IGQgLyBtYXg7XG4gICAgaWYgKG1heCA9PT0gbWluKSB7XG4gICAgICAgIGggPSAwOyAvLyBhY2hyb21hdGljXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzd2l0Y2ggKG1heCkge1xuICAgICAgICAgICAgY2FzZSByOlxuICAgICAgICAgICAgICAgIGggPSAoZyAtIGIpIC8gZCArIChnIDwgYiA/IDYgOiAwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgZzpcbiAgICAgICAgICAgICAgICBoID0gKGIgLSByKSAvIGQgKyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBiOlxuICAgICAgICAgICAgICAgIGggPSAociAtIGcpIC8gZCArIDQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGggLz0gNjtcbiAgICB9XG4gICAgcmV0dXJuIHsgaDogaCwgczogcywgdjogdiB9O1xufVxuLyoqXG4gKiBDb252ZXJ0cyBhbiBIU1YgY29sb3IgdmFsdWUgdG8gUkdCLlxuICpcbiAqICpBc3N1bWVzOiogaCBpcyBjb250YWluZWQgaW4gWzAsIDFdIG9yIFswLCAzNjBdIGFuZCBzIGFuZCB2IGFyZSBjb250YWluZWQgaW4gWzAsIDFdIG9yIFswLCAxMDBdXG4gKiAqUmV0dXJuczoqIHsgciwgZywgYiB9IGluIHRoZSBzZXQgWzAsIDI1NV1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhzdlRvUmdiKGgsIHMsIHYpIHtcbiAgICBoID0gYm91bmQwMShoLCAzNjApICogNjtcbiAgICBzID0gYm91bmQwMShzLCAxMDApO1xuICAgIHYgPSBib3VuZDAxKHYsIDEwMCk7XG4gICAgdmFyIGkgPSBNYXRoLmZsb29yKGgpO1xuICAgIHZhciBmID0gaCAtIGk7XG4gICAgdmFyIHAgPSB2ICogKDEgLSBzKTtcbiAgICB2YXIgcSA9IHYgKiAoMSAtIGYgKiBzKTtcbiAgICB2YXIgdCA9IHYgKiAoMSAtICgxIC0gZikgKiBzKTtcbiAgICB2YXIgbW9kID0gaSAlIDY7XG4gICAgdmFyIHIgPSBbdiwgcSwgcCwgcCwgdCwgdl1bbW9kXTtcbiAgICB2YXIgZyA9IFt0LCB2LCB2LCBxLCBwLCBwXVttb2RdO1xuICAgIHZhciBiID0gW3AsIHAsIHQsIHYsIHYsIHFdW21vZF07XG4gICAgcmV0dXJuIHsgcjogciAqIDI1NSwgZzogZyAqIDI1NSwgYjogYiAqIDI1NSB9O1xufVxuLyoqXG4gKiBDb252ZXJ0cyBhbiBSR0IgY29sb3IgdG8gaGV4XG4gKlxuICogQXNzdW1lcyByLCBnLCBhbmQgYiBhcmUgY29udGFpbmVkIGluIHRoZSBzZXQgWzAsIDI1NV1cbiAqIFJldHVybnMgYSAzIG9yIDYgY2hhcmFjdGVyIGhleFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmdiVG9IZXgociwgZywgYiwgYWxsb3czQ2hhcikge1xuICAgIHZhciBoZXggPSBbXG4gICAgICAgIHBhZDIoTWF0aC5yb3VuZChyKS50b1N0cmluZygxNikpLFxuICAgICAgICBwYWQyKE1hdGgucm91bmQoZykudG9TdHJpbmcoMTYpKSxcbiAgICAgICAgcGFkMihNYXRoLnJvdW5kKGIpLnRvU3RyaW5nKDE2KSksXG4gICAgXTtcbiAgICAvLyBSZXR1cm4gYSAzIGNoYXJhY3RlciBoZXggaWYgcG9zc2libGVcbiAgICBpZiAoYWxsb3czQ2hhciAmJlxuICAgICAgICBoZXhbMF0uc3RhcnRzV2l0aChoZXhbMF0uY2hhckF0KDEpKSAmJlxuICAgICAgICBoZXhbMV0uc3RhcnRzV2l0aChoZXhbMV0uY2hhckF0KDEpKSAmJlxuICAgICAgICBoZXhbMl0uc3RhcnRzV2l0aChoZXhbMl0uY2hhckF0KDEpKSkge1xuICAgICAgICByZXR1cm4gaGV4WzBdLmNoYXJBdCgwKSArIGhleFsxXS5jaGFyQXQoMCkgKyBoZXhbMl0uY2hhckF0KDApO1xuICAgIH1cbiAgICByZXR1cm4gaGV4LmpvaW4oJycpO1xufVxuLyoqXG4gKiBDb252ZXJ0cyBhbiBSR0JBIGNvbG9yIHBsdXMgYWxwaGEgdHJhbnNwYXJlbmN5IHRvIGhleFxuICpcbiAqIEFzc3VtZXMgciwgZywgYiBhcmUgY29udGFpbmVkIGluIHRoZSBzZXQgWzAsIDI1NV0gYW5kXG4gKiBhIGluIFswLCAxXS4gUmV0dXJucyBhIDQgb3IgOCBjaGFyYWN0ZXIgcmdiYSBoZXhcbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1wYXJhbXNcbmV4cG9ydCBmdW5jdGlvbiByZ2JhVG9IZXgociwgZywgYiwgYSwgYWxsb3c0Q2hhcikge1xuICAgIHZhciBoZXggPSBbXG4gICAgICAgIHBhZDIoTWF0aC5yb3VuZChyKS50b1N0cmluZygxNikpLFxuICAgICAgICBwYWQyKE1hdGgucm91bmQoZykudG9TdHJpbmcoMTYpKSxcbiAgICAgICAgcGFkMihNYXRoLnJvdW5kKGIpLnRvU3RyaW5nKDE2KSksXG4gICAgICAgIHBhZDIoY29udmVydERlY2ltYWxUb0hleChhKSksXG4gICAgXTtcbiAgICAvLyBSZXR1cm4gYSA0IGNoYXJhY3RlciBoZXggaWYgcG9zc2libGVcbiAgICBpZiAoYWxsb3c0Q2hhciAmJlxuICAgICAgICBoZXhbMF0uc3RhcnRzV2l0aChoZXhbMF0uY2hhckF0KDEpKSAmJlxuICAgICAgICBoZXhbMV0uc3RhcnRzV2l0aChoZXhbMV0uY2hhckF0KDEpKSAmJlxuICAgICAgICBoZXhbMl0uc3RhcnRzV2l0aChoZXhbMl0uY2hhckF0KDEpKSAmJlxuICAgICAgICBoZXhbM10uc3RhcnRzV2l0aChoZXhbM10uY2hhckF0KDEpKSkge1xuICAgICAgICByZXR1cm4gaGV4WzBdLmNoYXJBdCgwKSArIGhleFsxXS5jaGFyQXQoMCkgKyBoZXhbMl0uY2hhckF0KDApICsgaGV4WzNdLmNoYXJBdCgwKTtcbiAgICB9XG4gICAgcmV0dXJuIGhleC5qb2luKCcnKTtcbn1cbi8qKlxuICogQ29udmVydHMgYW4gUkdCQSBjb2xvciB0byBhbiBBUkdCIEhleDggc3RyaW5nXG4gKiBSYXJlbHkgdXNlZCwgYnV0IHJlcXVpcmVkIGZvciBcInRvRmlsdGVyKClcIlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmdiYVRvQXJnYkhleChyLCBnLCBiLCBhKSB7XG4gICAgdmFyIGhleCA9IFtcbiAgICAgICAgcGFkMihjb252ZXJ0RGVjaW1hbFRvSGV4KGEpKSxcbiAgICAgICAgcGFkMihNYXRoLnJvdW5kKHIpLnRvU3RyaW5nKDE2KSksXG4gICAgICAgIHBhZDIoTWF0aC5yb3VuZChnKS50b1N0cmluZygxNikpLFxuICAgICAgICBwYWQyKE1hdGgucm91bmQoYikudG9TdHJpbmcoMTYpKSxcbiAgICBdO1xuICAgIHJldHVybiBoZXguam9pbignJyk7XG59XG4vKiogQ29udmVydHMgYSBkZWNpbWFsIHRvIGEgaGV4IHZhbHVlICovXG5leHBvcnQgZnVuY3Rpb24gY29udmVydERlY2ltYWxUb0hleChkKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQocGFyc2VGbG9hdChkKSAqIDI1NSkudG9TdHJpbmcoMTYpO1xufVxuLyoqIENvbnZlcnRzIGEgaGV4IHZhbHVlIHRvIGEgZGVjaW1hbCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRIZXhUb0RlY2ltYWwoaCkge1xuICAgIHJldHVybiBwYXJzZUludEZyb21IZXgoaCkgLyAyNTU7XG59XG4vKiogUGFyc2UgYSBiYXNlLTE2IGhleCB2YWx1ZSBpbnRvIGEgYmFzZS0xMCBpbnRlZ2VyICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VJbnRGcm9tSGV4KHZhbCkge1xuICAgIHJldHVybiBwYXJzZUludCh2YWwsIDE2KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBudW1iZXJJbnB1dFRvT2JqZWN0KGNvbG9yKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcjogY29sb3IgPj4gMTYsXG4gICAgICAgIGc6IChjb2xvciAmIDB4ZmYwMCkgPj4gOCxcbiAgICAgICAgYjogY29sb3IgJiAweGZmLFxuICAgIH07XG59XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vYmFoYW1hczEwL2Nzcy1jb2xvci1uYW1lcy9ibG9iL21hc3Rlci9jc3MtY29sb3ItbmFtZXMuanNvblxuLyoqXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCB2YXIgbmFtZXMgPSB7XG4gICAgYWxpY2VibHVlOiAnI2YwZjhmZicsXG4gICAgYW50aXF1ZXdoaXRlOiAnI2ZhZWJkNycsXG4gICAgYXF1YTogJyMwMGZmZmYnLFxuICAgIGFxdWFtYXJpbmU6ICcjN2ZmZmQ0JyxcbiAgICBhenVyZTogJyNmMGZmZmYnLFxuICAgIGJlaWdlOiAnI2Y1ZjVkYycsXG4gICAgYmlzcXVlOiAnI2ZmZTRjNCcsXG4gICAgYmxhY2s6ICcjMDAwMDAwJyxcbiAgICBibGFuY2hlZGFsbW9uZDogJyNmZmViY2QnLFxuICAgIGJsdWU6ICcjMDAwMGZmJyxcbiAgICBibHVldmlvbGV0OiAnIzhhMmJlMicsXG4gICAgYnJvd246ICcjYTUyYTJhJyxcbiAgICBidXJseXdvb2Q6ICcjZGViODg3JyxcbiAgICBjYWRldGJsdWU6ICcjNWY5ZWEwJyxcbiAgICBjaGFydHJldXNlOiAnIzdmZmYwMCcsXG4gICAgY2hvY29sYXRlOiAnI2QyNjkxZScsXG4gICAgY29yYWw6ICcjZmY3ZjUwJyxcbiAgICBjb3JuZmxvd2VyYmx1ZTogJyM2NDk1ZWQnLFxuICAgIGNvcm5zaWxrOiAnI2ZmZjhkYycsXG4gICAgY3JpbXNvbjogJyNkYzE0M2MnLFxuICAgIGN5YW46ICcjMDBmZmZmJyxcbiAgICBkYXJrYmx1ZTogJyMwMDAwOGInLFxuICAgIGRhcmtjeWFuOiAnIzAwOGI4YicsXG4gICAgZGFya2dvbGRlbnJvZDogJyNiODg2MGInLFxuICAgIGRhcmtncmF5OiAnI2E5YTlhOScsXG4gICAgZGFya2dyZWVuOiAnIzAwNjQwMCcsXG4gICAgZGFya2dyZXk6ICcjYTlhOWE5JyxcbiAgICBkYXJra2hha2k6ICcjYmRiNzZiJyxcbiAgICBkYXJrbWFnZW50YTogJyM4YjAwOGInLFxuICAgIGRhcmtvbGl2ZWdyZWVuOiAnIzU1NmIyZicsXG4gICAgZGFya29yYW5nZTogJyNmZjhjMDAnLFxuICAgIGRhcmtvcmNoaWQ6ICcjOTkzMmNjJyxcbiAgICBkYXJrcmVkOiAnIzhiMDAwMCcsXG4gICAgZGFya3NhbG1vbjogJyNlOTk2N2EnLFxuICAgIGRhcmtzZWFncmVlbjogJyM4ZmJjOGYnLFxuICAgIGRhcmtzbGF0ZWJsdWU6ICcjNDgzZDhiJyxcbiAgICBkYXJrc2xhdGVncmF5OiAnIzJmNGY0ZicsXG4gICAgZGFya3NsYXRlZ3JleTogJyMyZjRmNGYnLFxuICAgIGRhcmt0dXJxdW9pc2U6ICcjMDBjZWQxJyxcbiAgICBkYXJrdmlvbGV0OiAnIzk0MDBkMycsXG4gICAgZGVlcHBpbms6ICcjZmYxNDkzJyxcbiAgICBkZWVwc2t5Ymx1ZTogJyMwMGJmZmYnLFxuICAgIGRpbWdyYXk6ICcjNjk2OTY5JyxcbiAgICBkaW1ncmV5OiAnIzY5Njk2OScsXG4gICAgZG9kZ2VyYmx1ZTogJyMxZTkwZmYnLFxuICAgIGZpcmVicmljazogJyNiMjIyMjInLFxuICAgIGZsb3JhbHdoaXRlOiAnI2ZmZmFmMCcsXG4gICAgZm9yZXN0Z3JlZW46ICcjMjI4YjIyJyxcbiAgICBmdWNoc2lhOiAnI2ZmMDBmZicsXG4gICAgZ2FpbnNib3JvOiAnI2RjZGNkYycsXG4gICAgZ2hvc3R3aGl0ZTogJyNmOGY4ZmYnLFxuICAgIGdvbGRlbnJvZDogJyNkYWE1MjAnLFxuICAgIGdvbGQ6ICcjZmZkNzAwJyxcbiAgICBncmF5OiAnIzgwODA4MCcsXG4gICAgZ3JlZW46ICcjMDA4MDAwJyxcbiAgICBncmVlbnllbGxvdzogJyNhZGZmMmYnLFxuICAgIGdyZXk6ICcjODA4MDgwJyxcbiAgICBob25leWRldzogJyNmMGZmZjAnLFxuICAgIGhvdHBpbms6ICcjZmY2OWI0JyxcbiAgICBpbmRpYW5yZWQ6ICcjY2Q1YzVjJyxcbiAgICBpbmRpZ286ICcjNGIwMDgyJyxcbiAgICBpdm9yeTogJyNmZmZmZjAnLFxuICAgIGtoYWtpOiAnI2YwZTY4YycsXG4gICAgbGF2ZW5kZXJibHVzaDogJyNmZmYwZjUnLFxuICAgIGxhdmVuZGVyOiAnI2U2ZTZmYScsXG4gICAgbGF3bmdyZWVuOiAnIzdjZmMwMCcsXG4gICAgbGVtb25jaGlmZm9uOiAnI2ZmZmFjZCcsXG4gICAgbGlnaHRibHVlOiAnI2FkZDhlNicsXG4gICAgbGlnaHRjb3JhbDogJyNmMDgwODAnLFxuICAgIGxpZ2h0Y3lhbjogJyNlMGZmZmYnLFxuICAgIGxpZ2h0Z29sZGVucm9keWVsbG93OiAnI2ZhZmFkMicsXG4gICAgbGlnaHRncmF5OiAnI2QzZDNkMycsXG4gICAgbGlnaHRncmVlbjogJyM5MGVlOTAnLFxuICAgIGxpZ2h0Z3JleTogJyNkM2QzZDMnLFxuICAgIGxpZ2h0cGluazogJyNmZmI2YzEnLFxuICAgIGxpZ2h0c2FsbW9uOiAnI2ZmYTA3YScsXG4gICAgbGlnaHRzZWFncmVlbjogJyMyMGIyYWEnLFxuICAgIGxpZ2h0c2t5Ymx1ZTogJyM4N2NlZmEnLFxuICAgIGxpZ2h0c2xhdGVncmF5OiAnIzc3ODg5OScsXG4gICAgbGlnaHRzbGF0ZWdyZXk6ICcjNzc4ODk5JyxcbiAgICBsaWdodHN0ZWVsYmx1ZTogJyNiMGM0ZGUnLFxuICAgIGxpZ2h0eWVsbG93OiAnI2ZmZmZlMCcsXG4gICAgbGltZTogJyMwMGZmMDAnLFxuICAgIGxpbWVncmVlbjogJyMzMmNkMzInLFxuICAgIGxpbmVuOiAnI2ZhZjBlNicsXG4gICAgbWFnZW50YTogJyNmZjAwZmYnLFxuICAgIG1hcm9vbjogJyM4MDAwMDAnLFxuICAgIG1lZGl1bWFxdWFtYXJpbmU6ICcjNjZjZGFhJyxcbiAgICBtZWRpdW1ibHVlOiAnIzAwMDBjZCcsXG4gICAgbWVkaXVtb3JjaGlkOiAnI2JhNTVkMycsXG4gICAgbWVkaXVtcHVycGxlOiAnIzkzNzBkYicsXG4gICAgbWVkaXVtc2VhZ3JlZW46ICcjM2NiMzcxJyxcbiAgICBtZWRpdW1zbGF0ZWJsdWU6ICcjN2I2OGVlJyxcbiAgICBtZWRpdW1zcHJpbmdncmVlbjogJyMwMGZhOWEnLFxuICAgIG1lZGl1bXR1cnF1b2lzZTogJyM0OGQxY2MnLFxuICAgIG1lZGl1bXZpb2xldHJlZDogJyNjNzE1ODUnLFxuICAgIG1pZG5pZ2h0Ymx1ZTogJyMxOTE5NzAnLFxuICAgIG1pbnRjcmVhbTogJyNmNWZmZmEnLFxuICAgIG1pc3R5cm9zZTogJyNmZmU0ZTEnLFxuICAgIG1vY2Nhc2luOiAnI2ZmZTRiNScsXG4gICAgbmF2YWpvd2hpdGU6ICcjZmZkZWFkJyxcbiAgICBuYXZ5OiAnIzAwMDA4MCcsXG4gICAgb2xkbGFjZTogJyNmZGY1ZTYnLFxuICAgIG9saXZlOiAnIzgwODAwMCcsXG4gICAgb2xpdmVkcmFiOiAnIzZiOGUyMycsXG4gICAgb3JhbmdlOiAnI2ZmYTUwMCcsXG4gICAgb3JhbmdlcmVkOiAnI2ZmNDUwMCcsXG4gICAgb3JjaGlkOiAnI2RhNzBkNicsXG4gICAgcGFsZWdvbGRlbnJvZDogJyNlZWU4YWEnLFxuICAgIHBhbGVncmVlbjogJyM5OGZiOTgnLFxuICAgIHBhbGV0dXJxdW9pc2U6ICcjYWZlZWVlJyxcbiAgICBwYWxldmlvbGV0cmVkOiAnI2RiNzA5MycsXG4gICAgcGFwYXlhd2hpcDogJyNmZmVmZDUnLFxuICAgIHBlYWNocHVmZjogJyNmZmRhYjknLFxuICAgIHBlcnU6ICcjY2Q4NTNmJyxcbiAgICBwaW5rOiAnI2ZmYzBjYicsXG4gICAgcGx1bTogJyNkZGEwZGQnLFxuICAgIHBvd2RlcmJsdWU6ICcjYjBlMGU2JyxcbiAgICBwdXJwbGU6ICcjODAwMDgwJyxcbiAgICByZWJlY2NhcHVycGxlOiAnIzY2MzM5OScsXG4gICAgcmVkOiAnI2ZmMDAwMCcsXG4gICAgcm9zeWJyb3duOiAnI2JjOGY4ZicsXG4gICAgcm95YWxibHVlOiAnIzQxNjllMScsXG4gICAgc2FkZGxlYnJvd246ICcjOGI0NTEzJyxcbiAgICBzYWxtb246ICcjZmE4MDcyJyxcbiAgICBzYW5keWJyb3duOiAnI2Y0YTQ2MCcsXG4gICAgc2VhZ3JlZW46ICcjMmU4YjU3JyxcbiAgICBzZWFzaGVsbDogJyNmZmY1ZWUnLFxuICAgIHNpZW5uYTogJyNhMDUyMmQnLFxuICAgIHNpbHZlcjogJyNjMGMwYzAnLFxuICAgIHNreWJsdWU6ICcjODdjZWViJyxcbiAgICBzbGF0ZWJsdWU6ICcjNmE1YWNkJyxcbiAgICBzbGF0ZWdyYXk6ICcjNzA4MDkwJyxcbiAgICBzbGF0ZWdyZXk6ICcjNzA4MDkwJyxcbiAgICBzbm93OiAnI2ZmZmFmYScsXG4gICAgc3ByaW5nZ3JlZW46ICcjMDBmZjdmJyxcbiAgICBzdGVlbGJsdWU6ICcjNDY4MmI0JyxcbiAgICB0YW46ICcjZDJiNDhjJyxcbiAgICB0ZWFsOiAnIzAwODA4MCcsXG4gICAgdGhpc3RsZTogJyNkOGJmZDgnLFxuICAgIHRvbWF0bzogJyNmZjYzNDcnLFxuICAgIHR1cnF1b2lzZTogJyM0MGUwZDAnLFxuICAgIHZpb2xldDogJyNlZTgyZWUnLFxuICAgIHdoZWF0OiAnI2Y1ZGViMycsXG4gICAgd2hpdGU6ICcjZmZmZmZmJyxcbiAgICB3aGl0ZXNtb2tlOiAnI2Y1ZjVmNScsXG4gICAgeWVsbG93OiAnI2ZmZmYwMCcsXG4gICAgeWVsbG93Z3JlZW46ICcjOWFjZDMyJyxcbn07XG4iLCJpbXBvcnQgeyBjb252ZXJ0SGV4VG9EZWNpbWFsLCBoc2xUb1JnYiwgaHN2VG9SZ2IsIHBhcnNlSW50RnJvbUhleCwgcmdiVG9SZ2IgfSBmcm9tICcuL2NvbnZlcnNpb24nO1xuaW1wb3J0IHsgbmFtZXMgfSBmcm9tICcuL2Nzcy1jb2xvci1uYW1lcyc7XG5pbXBvcnQgeyBib3VuZEFscGhhLCBjb252ZXJ0VG9QZXJjZW50YWdlIH0gZnJvbSAnLi91dGlsJztcbi8qKlxuICogR2l2ZW4gYSBzdHJpbmcgb3Igb2JqZWN0LCBjb252ZXJ0IHRoYXQgaW5wdXQgdG8gUkdCXG4gKlxuICogUG9zc2libGUgc3RyaW5nIGlucHV0czpcbiAqIGBgYFxuICogXCJyZWRcIlxuICogXCIjZjAwXCIgb3IgXCJmMDBcIlxuICogXCIjZmYwMDAwXCIgb3IgXCJmZjAwMDBcIlxuICogXCIjZmYwMDAwMDBcIiBvciBcImZmMDAwMDAwXCJcbiAqIFwicmdiIDI1NSAwIDBcIiBvciBcInJnYiAoMjU1LCAwLCAwKVwiXG4gKiBcInJnYiAxLjAgMCAwXCIgb3IgXCJyZ2IgKDEsIDAsIDApXCJcbiAqIFwicmdiYSAoMjU1LCAwLCAwLCAxKVwiIG9yIFwicmdiYSAyNTUsIDAsIDAsIDFcIlxuICogXCJyZ2JhICgxLjAsIDAsIDAsIDEpXCIgb3IgXCJyZ2JhIDEuMCwgMCwgMCwgMVwiXG4gKiBcImhzbCgwLCAxMDAlLCA1MCUpXCIgb3IgXCJoc2wgMCAxMDAlIDUwJVwiXG4gKiBcImhzbGEoMCwgMTAwJSwgNTAlLCAxKVwiIG9yIFwiaHNsYSAwIDEwMCUgNTAlLCAxXCJcbiAqIFwiaHN2KDAsIDEwMCUsIDEwMCUpXCIgb3IgXCJoc3YgMCAxMDAlIDEwMCVcIlxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnB1dFRvUkdCKGNvbG9yKSB7XG4gICAgdmFyIHJnYiA9IHsgcjogMCwgZzogMCwgYjogMCB9O1xuICAgIHZhciBhID0gMTtcbiAgICB2YXIgcyA9IG51bGw7XG4gICAgdmFyIHYgPSBudWxsO1xuICAgIHZhciBsID0gbnVsbDtcbiAgICB2YXIgb2sgPSBmYWxzZTtcbiAgICB2YXIgZm9ybWF0ID0gZmFsc2U7XG4gICAgaWYgKHR5cGVvZiBjb2xvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29sb3IgPSBzdHJpbmdJbnB1dFRvT2JqZWN0KGNvbG9yKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjb2xvciA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKGlzVmFsaWRDU1NVbml0KGNvbG9yLnIpICYmIGlzVmFsaWRDU1NVbml0KGNvbG9yLmcpICYmIGlzVmFsaWRDU1NVbml0KGNvbG9yLmIpKSB7XG4gICAgICAgICAgICByZ2IgPSByZ2JUb1JnYihjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iKTtcbiAgICAgICAgICAgIG9rID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvcm1hdCA9IFN0cmluZyhjb2xvci5yKS5zdWJzdHIoLTEpID09PSAnJScgPyAncHJnYicgOiAncmdiJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc1ZhbGlkQ1NTVW5pdChjb2xvci5oKSAmJiBpc1ZhbGlkQ1NTVW5pdChjb2xvci5zKSAmJiBpc1ZhbGlkQ1NTVW5pdChjb2xvci52KSkge1xuICAgICAgICAgICAgcyA9IGNvbnZlcnRUb1BlcmNlbnRhZ2UoY29sb3Iucyk7XG4gICAgICAgICAgICB2ID0gY29udmVydFRvUGVyY2VudGFnZShjb2xvci52KTtcbiAgICAgICAgICAgIHJnYiA9IGhzdlRvUmdiKGNvbG9yLmgsIHMsIHYpO1xuICAgICAgICAgICAgb2sgPSB0cnVlO1xuICAgICAgICAgICAgZm9ybWF0ID0gJ2hzdic7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNWYWxpZENTU1VuaXQoY29sb3IuaCkgJiYgaXNWYWxpZENTU1VuaXQoY29sb3IucykgJiYgaXNWYWxpZENTU1VuaXQoY29sb3IubCkpIHtcbiAgICAgICAgICAgIHMgPSBjb252ZXJ0VG9QZXJjZW50YWdlKGNvbG9yLnMpO1xuICAgICAgICAgICAgbCA9IGNvbnZlcnRUb1BlcmNlbnRhZ2UoY29sb3IubCk7XG4gICAgICAgICAgICByZ2IgPSBoc2xUb1JnYihjb2xvci5oLCBzLCBsKTtcbiAgICAgICAgICAgIG9rID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvcm1hdCA9ICdoc2wnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY29sb3IsICdhJykpIHtcbiAgICAgICAgICAgIGEgPSBjb2xvci5hO1xuICAgICAgICB9XG4gICAgfVxuICAgIGEgPSBib3VuZEFscGhhKGEpO1xuICAgIHJldHVybiB7XG4gICAgICAgIG9rOiBvayxcbiAgICAgICAgZm9ybWF0OiBjb2xvci5mb3JtYXQgfHwgZm9ybWF0LFxuICAgICAgICByOiBNYXRoLm1pbigyNTUsIE1hdGgubWF4KHJnYi5yLCAwKSksXG4gICAgICAgIGc6IE1hdGgubWluKDI1NSwgTWF0aC5tYXgocmdiLmcsIDApKSxcbiAgICAgICAgYjogTWF0aC5taW4oMjU1LCBNYXRoLm1heChyZ2IuYiwgMCkpLFxuICAgICAgICBhOiBhLFxuICAgIH07XG59XG4vLyA8aHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy12YWx1ZXMvI2ludGVnZXJzPlxudmFyIENTU19JTlRFR0VSID0gJ1stXFxcXCtdP1xcXFxkKyU/Jztcbi8vIDxodHRwOi8vd3d3LnczLm9yZy9UUi9jc3MzLXZhbHVlcy8jbnVtYmVyLXZhbHVlPlxudmFyIENTU19OVU1CRVIgPSAnWy1cXFxcK10/XFxcXGQqXFxcXC5cXFxcZCslPyc7XG4vLyBBbGxvdyBwb3NpdGl2ZS9uZWdhdGl2ZSBpbnRlZ2VyL251bWJlci4gIERvbid0IGNhcHR1cmUgdGhlIGVpdGhlci9vciwganVzdCB0aGUgZW50aXJlIG91dGNvbWUuXG52YXIgQ1NTX1VOSVQgPSBcIig/OlwiICsgQ1NTX05VTUJFUiArIFwiKXwoPzpcIiArIENTU19JTlRFR0VSICsgXCIpXCI7XG4vLyBBY3R1YWwgbWF0Y2hpbmcuXG4vLyBQYXJlbnRoZXNlcyBhbmQgY29tbWFzIGFyZSBvcHRpb25hbCwgYnV0IG5vdCByZXF1aXJlZC5cbi8vIFdoaXRlc3BhY2UgY2FuIHRha2UgdGhlIHBsYWNlIG9mIGNvbW1hcyBvciBvcGVuaW5nIHBhcmVuXG52YXIgUEVSTUlTU0lWRV9NQVRDSDMgPSBcIltcXFxcc3xcXFxcKF0rKFwiICsgQ1NTX1VOSVQgKyBcIilbLHxcXFxcc10rKFwiICsgQ1NTX1VOSVQgKyBcIilbLHxcXFxcc10rKFwiICsgQ1NTX1VOSVQgKyBcIilcXFxccypcXFxcKT9cIjtcbnZhciBQRVJNSVNTSVZFX01BVENINCA9IFwiW1xcXFxzfFxcXFwoXSsoXCIgKyBDU1NfVU5JVCArIFwiKVssfFxcXFxzXSsoXCIgKyBDU1NfVU5JVCArIFwiKVssfFxcXFxzXSsoXCIgKyBDU1NfVU5JVCArIFwiKVssfFxcXFxzXSsoXCIgKyBDU1NfVU5JVCArIFwiKVxcXFxzKlxcXFwpP1wiO1xudmFyIG1hdGNoZXJzID0ge1xuICAgIENTU19VTklUOiBuZXcgUmVnRXhwKENTU19VTklUKSxcbiAgICByZ2I6IG5ldyBSZWdFeHAoJ3JnYicgKyBQRVJNSVNTSVZFX01BVENIMyksXG4gICAgcmdiYTogbmV3IFJlZ0V4cCgncmdiYScgKyBQRVJNSVNTSVZFX01BVENINCksXG4gICAgaHNsOiBuZXcgUmVnRXhwKCdoc2wnICsgUEVSTUlTU0lWRV9NQVRDSDMpLFxuICAgIGhzbGE6IG5ldyBSZWdFeHAoJ2hzbGEnICsgUEVSTUlTU0lWRV9NQVRDSDQpLFxuICAgIGhzdjogbmV3IFJlZ0V4cCgnaHN2JyArIFBFUk1JU1NJVkVfTUFUQ0gzKSxcbiAgICBoc3ZhOiBuZXcgUmVnRXhwKCdoc3ZhJyArIFBFUk1JU1NJVkVfTUFUQ0g0KSxcbiAgICBoZXgzOiAvXiM/KFswLTlhLWZBLUZdezF9KShbMC05YS1mQS1GXXsxfSkoWzAtOWEtZkEtRl17MX0pJC8sXG4gICAgaGV4NjogL14jPyhbMC05YS1mQS1GXXsyfSkoWzAtOWEtZkEtRl17Mn0pKFswLTlhLWZBLUZdezJ9KSQvLFxuICAgIGhleDQ6IC9eIz8oWzAtOWEtZkEtRl17MX0pKFswLTlhLWZBLUZdezF9KShbMC05YS1mQS1GXXsxfSkoWzAtOWEtZkEtRl17MX0pJC8sXG4gICAgaGV4ODogL14jPyhbMC05YS1mQS1GXXsyfSkoWzAtOWEtZkEtRl17Mn0pKFswLTlhLWZBLUZdezJ9KShbMC05YS1mQS1GXXsyfSkkLyxcbn07XG4vKipcbiAqIFBlcm1pc3NpdmUgc3RyaW5nIHBhcnNpbmcuICBUYWtlIGluIGEgbnVtYmVyIG9mIGZvcm1hdHMsIGFuZCBvdXRwdXQgYW4gb2JqZWN0XG4gKiBiYXNlZCBvbiBkZXRlY3RlZCBmb3JtYXQuICBSZXR1cm5zIGB7IHIsIGcsIGIgfWAgb3IgYHsgaCwgcywgbCB9YCBvciBgeyBoLCBzLCB2fWBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ0lucHV0VG9PYmplY3QoY29sb3IpIHtcbiAgICBjb2xvciA9IGNvbG9yLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChjb2xvci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgbmFtZWQgPSBmYWxzZTtcbiAgICBpZiAobmFtZXNbY29sb3JdKSB7XG4gICAgICAgIGNvbG9yID0gbmFtZXNbY29sb3JdO1xuICAgICAgICBuYW1lZCA9IHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbG9yID09PSAndHJhbnNwYXJlbnQnKSB7XG4gICAgICAgIHJldHVybiB7IHI6IDAsIGc6IDAsIGI6IDAsIGE6IDAsIGZvcm1hdDogJ25hbWUnIH07XG4gICAgfVxuICAgIC8vIFRyeSB0byBtYXRjaCBzdHJpbmcgaW5wdXQgdXNpbmcgcmVndWxhciBleHByZXNzaW9ucy5cbiAgICAvLyBLZWVwIG1vc3Qgb2YgdGhlIG51bWJlciBib3VuZGluZyBvdXQgb2YgdGhpcyBmdW5jdGlvbiAtIGRvbid0IHdvcnJ5IGFib3V0IFswLDFdIG9yIFswLDEwMF0gb3IgWzAsMzYwXVxuICAgIC8vIEp1c3QgcmV0dXJuIGFuIG9iamVjdCBhbmQgbGV0IHRoZSBjb252ZXJzaW9uIGZ1bmN0aW9ucyBoYW5kbGUgdGhhdC5cbiAgICAvLyBUaGlzIHdheSB0aGUgcmVzdWx0IHdpbGwgYmUgdGhlIHNhbWUgd2hldGhlciB0aGUgdGlueWNvbG9yIGlzIGluaXRpYWxpemVkIHdpdGggc3RyaW5nIG9yIG9iamVjdC5cbiAgICB2YXIgbWF0Y2ggPSBtYXRjaGVycy5yZ2IuZXhlYyhjb2xvcik7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIHJldHVybiB7IHI6IG1hdGNoWzFdLCBnOiBtYXRjaFsyXSwgYjogbWF0Y2hbM10gfTtcbiAgICB9XG4gICAgbWF0Y2ggPSBtYXRjaGVycy5yZ2JhLmV4ZWMoY29sb3IpO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgICByZXR1cm4geyByOiBtYXRjaFsxXSwgZzogbWF0Y2hbMl0sIGI6IG1hdGNoWzNdLCBhOiBtYXRjaFs0XSB9O1xuICAgIH1cbiAgICBtYXRjaCA9IG1hdGNoZXJzLmhzbC5leGVjKGNvbG9yKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIHsgaDogbWF0Y2hbMV0sIHM6IG1hdGNoWzJdLCBsOiBtYXRjaFszXSB9O1xuICAgIH1cbiAgICBtYXRjaCA9IG1hdGNoZXJzLmhzbGEuZXhlYyhjb2xvcik7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIHJldHVybiB7IGg6IG1hdGNoWzFdLCBzOiBtYXRjaFsyXSwgbDogbWF0Y2hbM10sIGE6IG1hdGNoWzRdIH07XG4gICAgfVxuICAgIG1hdGNoID0gbWF0Y2hlcnMuaHN2LmV4ZWMoY29sb3IpO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgICByZXR1cm4geyBoOiBtYXRjaFsxXSwgczogbWF0Y2hbMl0sIHY6IG1hdGNoWzNdIH07XG4gICAgfVxuICAgIG1hdGNoID0gbWF0Y2hlcnMuaHN2YS5leGVjKGNvbG9yKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIHsgaDogbWF0Y2hbMV0sIHM6IG1hdGNoWzJdLCB2OiBtYXRjaFszXSwgYTogbWF0Y2hbNF0gfTtcbiAgICB9XG4gICAgbWF0Y2ggPSBtYXRjaGVycy5oZXg4LmV4ZWMoY29sb3IpO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcjogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzFdKSxcbiAgICAgICAgICAgIGc6IHBhcnNlSW50RnJvbUhleChtYXRjaFsyXSksXG4gICAgICAgICAgICBiOiBwYXJzZUludEZyb21IZXgobWF0Y2hbM10pLFxuICAgICAgICAgICAgYTogY29udmVydEhleFRvRGVjaW1hbChtYXRjaFs0XSksXG4gICAgICAgICAgICBmb3JtYXQ6IG5hbWVkID8gJ25hbWUnIDogJ2hleDgnLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBtYXRjaCA9IG1hdGNoZXJzLmhleDYuZXhlYyhjb2xvcik7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByOiBwYXJzZUludEZyb21IZXgobWF0Y2hbMV0pLFxuICAgICAgICAgICAgZzogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzJdKSxcbiAgICAgICAgICAgIGI6IHBhcnNlSW50RnJvbUhleChtYXRjaFszXSksXG4gICAgICAgICAgICBmb3JtYXQ6IG5hbWVkID8gJ25hbWUnIDogJ2hleCcsXG4gICAgICAgIH07XG4gICAgfVxuICAgIG1hdGNoID0gbWF0Y2hlcnMuaGV4NC5leGVjKGNvbG9yKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHI6IHBhcnNlSW50RnJvbUhleChtYXRjaFsxXSArIG1hdGNoWzFdKSxcbiAgICAgICAgICAgIGc6IHBhcnNlSW50RnJvbUhleChtYXRjaFsyXSArIG1hdGNoWzJdKSxcbiAgICAgICAgICAgIGI6IHBhcnNlSW50RnJvbUhleChtYXRjaFszXSArIG1hdGNoWzNdKSxcbiAgICAgICAgICAgIGE6IGNvbnZlcnRIZXhUb0RlY2ltYWwobWF0Y2hbNF0gKyBtYXRjaFs0XSksXG4gICAgICAgICAgICBmb3JtYXQ6IG5hbWVkID8gJ25hbWUnIDogJ2hleDgnLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBtYXRjaCA9IG1hdGNoZXJzLmhleDMuZXhlYyhjb2xvcik7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByOiBwYXJzZUludEZyb21IZXgobWF0Y2hbMV0gKyBtYXRjaFsxXSksXG4gICAgICAgICAgICBnOiBwYXJzZUludEZyb21IZXgobWF0Y2hbMl0gKyBtYXRjaFsyXSksXG4gICAgICAgICAgICBiOiBwYXJzZUludEZyb21IZXgobWF0Y2hbM10gKyBtYXRjaFszXSksXG4gICAgICAgICAgICBmb3JtYXQ6IG5hbWVkID8gJ25hbWUnIDogJ2hleCcsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbi8qKlxuICogQ2hlY2sgdG8gc2VlIGlmIGl0IGxvb2tzIGxpa2UgYSBDU1MgdW5pdFxuICogKHNlZSBgbWF0Y2hlcnNgIGFib3ZlIGZvciBkZWZpbml0aW9uKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRDU1NVbml0KGNvbG9yKSB7XG4gICAgcmV0dXJuIEJvb2xlYW4obWF0Y2hlcnMuQ1NTX1VOSVQuZXhlYyhTdHJpbmcoY29sb3IpKSk7XG59XG4iLCJpbXBvcnQgeyBUaW55Q29sb3IgfSBmcm9tICcuL2luZGV4JztcbmltcG9ydCB7IGNvbnZlcnRUb1BlcmNlbnRhZ2UgfSBmcm9tICcuL3V0aWwnO1xuLyoqXG4gKiBJZiBpbnB1dCBpcyBhbiBvYmplY3QsIGZvcmNlIDEgaW50byBcIjEuMFwiIHRvIGhhbmRsZSByYXRpb3MgcHJvcGVybHlcbiAqIFN0cmluZyBpbnB1dCByZXF1aXJlcyBcIjEuMFwiIGFzIGlucHV0LCBzbyAxIHdpbGwgYmUgdHJlYXRlZCBhcyAxXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmcm9tUmF0aW8ocmF0aW8sIG9wdHMpIHtcbiAgICB2YXIgbmV3Q29sb3IgPSB7XG4gICAgICAgIHI6IGNvbnZlcnRUb1BlcmNlbnRhZ2UocmF0aW8uciksXG4gICAgICAgIGc6IGNvbnZlcnRUb1BlcmNlbnRhZ2UocmF0aW8uZyksXG4gICAgICAgIGI6IGNvbnZlcnRUb1BlcmNlbnRhZ2UocmF0aW8uYiksXG4gICAgfTtcbiAgICBpZiAocmF0aW8uYSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG5ld0NvbG9yLmEgPSBOdW1iZXIocmF0aW8uYSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgVGlueUNvbG9yKG5ld0NvbG9yLCBvcHRzKTtcbn1cbi8qKiBvbGQgcmFuZG9tIGZ1bmN0aW9uICovXG5leHBvcnQgZnVuY3Rpb24gbGVnYWN5UmFuZG9tKCkge1xuICAgIHJldHVybiBuZXcgVGlueUNvbG9yKHtcbiAgICAgICAgcjogTWF0aC5yYW5kb20oKSxcbiAgICAgICAgZzogTWF0aC5yYW5kb20oKSxcbiAgICAgICAgYjogTWF0aC5yYW5kb20oKSxcbiAgICB9KTtcbn1cbiIsImltcG9ydCB7IHJnYmFUb0hleCwgcmdiVG9IZXgsIHJnYlRvSHNsLCByZ2JUb0hzdiwgbnVtYmVySW5wdXRUb09iamVjdCB9IGZyb20gJy4vY29udmVyc2lvbic7XG5pbXBvcnQgeyBuYW1lcyB9IGZyb20gJy4vY3NzLWNvbG9yLW5hbWVzJztcbmltcG9ydCB7IGlucHV0VG9SR0IgfSBmcm9tICcuL2Zvcm1hdC1pbnB1dCc7XG5pbXBvcnQgeyBib3VuZDAxLCBib3VuZEFscGhhLCBjbGFtcDAxIH0gZnJvbSAnLi91dGlsJztcbnZhciBUaW55Q29sb3IgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGlueUNvbG9yKGNvbG9yLCBvcHRzKSB7XG4gICAgICAgIGlmIChjb2xvciA9PT0gdm9pZCAwKSB7IGNvbG9yID0gJyc7IH1cbiAgICAgICAgaWYgKG9wdHMgPT09IHZvaWQgMCkgeyBvcHRzID0ge307IH1cbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAvLyBJZiBpbnB1dCBpcyBhbHJlYWR5IGEgdGlueWNvbG9yLCByZXR1cm4gaXRzZWxmXG4gICAgICAgIGlmIChjb2xvciBpbnN0YW5jZW9mIFRpbnlDb2xvcikge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnN0cnVjdG9yLXJldHVyblxuICAgICAgICAgICAgcmV0dXJuIGNvbG9yO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgY29sb3IgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBjb2xvciA9IG51bWJlcklucHV0VG9PYmplY3QoY29sb3IpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3JpZ2luYWxJbnB1dCA9IGNvbG9yO1xuICAgICAgICB2YXIgcmdiID0gaW5wdXRUb1JHQihjb2xvcik7XG4gICAgICAgIHRoaXMub3JpZ2luYWxJbnB1dCA9IGNvbG9yO1xuICAgICAgICB0aGlzLnIgPSByZ2IucjtcbiAgICAgICAgdGhpcy5nID0gcmdiLmc7XG4gICAgICAgIHRoaXMuYiA9IHJnYi5iO1xuICAgICAgICB0aGlzLmEgPSByZ2IuYTtcbiAgICAgICAgdGhpcy5yb3VuZEEgPSBNYXRoLnJvdW5kKDEwMCAqIHRoaXMuYSkgLyAxMDA7XG4gICAgICAgIHRoaXMuZm9ybWF0ID0gKF9hID0gb3B0cy5mb3JtYXQpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHJnYi5mb3JtYXQ7XG4gICAgICAgIHRoaXMuZ3JhZGllbnRUeXBlID0gb3B0cy5ncmFkaWVudFR5cGU7XG4gICAgICAgIC8vIERvbid0IGxldCB0aGUgcmFuZ2Ugb2YgWzAsMjU1XSBjb21lIGJhY2sgaW4gWzAsMV0uXG4gICAgICAgIC8vIFBvdGVudGlhbGx5IGxvc2UgYSBsaXR0bGUgYml0IG9mIHByZWNpc2lvbiBoZXJlLCBidXQgd2lsbCBmaXggaXNzdWVzIHdoZXJlXG4gICAgICAgIC8vIC41IGdldHMgaW50ZXJwcmV0ZWQgYXMgaGFsZiBvZiB0aGUgdG90YWwsIGluc3RlYWQgb2YgaGFsZiBvZiAxXG4gICAgICAgIC8vIElmIGl0IHdhcyBzdXBwb3NlZCB0byBiZSAxMjgsIHRoaXMgd2FzIGFscmVhZHkgdGFrZW4gY2FyZSBvZiBieSBgaW5wdXRUb1JnYmBcbiAgICAgICAgaWYgKHRoaXMuciA8IDEpIHtcbiAgICAgICAgICAgIHRoaXMuciA9IE1hdGgucm91bmQodGhpcy5yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5nIDwgMSkge1xuICAgICAgICAgICAgdGhpcy5nID0gTWF0aC5yb3VuZCh0aGlzLmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmIgPCAxKSB7XG4gICAgICAgICAgICB0aGlzLmIgPSBNYXRoLnJvdW5kKHRoaXMuYik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc1ZhbGlkID0gcmdiLm9rO1xuICAgIH1cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLmlzRGFyayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QnJpZ2h0bmVzcygpIDwgMTI4O1xuICAgIH07XG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS5pc0xpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuaXNEYXJrKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBwZXJjZWl2ZWQgYnJpZ2h0bmVzcyBvZiB0aGUgY29sb3IsIGZyb20gMC0yNTUuXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS5nZXRCcmlnaHRuZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9BRVJUI2NvbG9yLWNvbnRyYXN0XG4gICAgICAgIHZhciByZ2IgPSB0aGlzLnRvUmdiKCk7XG4gICAgICAgIHJldHVybiAocmdiLnIgKiAyOTkgKyByZ2IuZyAqIDU4NyArIHJnYi5iICogMTE0KSAvIDEwMDA7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBwZXJjZWl2ZWQgbHVtaW5hbmNlIG9mIGEgY29sb3IsIGZyb20gMC0xLlxuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUuZ2V0THVtaW5hbmNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDA4L1JFQy1XQ0FHMjAtMjAwODEyMTEvI3JlbGF0aXZlbHVtaW5hbmNlZGVmXG4gICAgICAgIHZhciByZ2IgPSB0aGlzLnRvUmdiKCk7XG4gICAgICAgIHZhciBSO1xuICAgICAgICB2YXIgRztcbiAgICAgICAgdmFyIEI7XG4gICAgICAgIHZhciBSc1JHQiA9IHJnYi5yIC8gMjU1O1xuICAgICAgICB2YXIgR3NSR0IgPSByZ2IuZyAvIDI1NTtcbiAgICAgICAgdmFyIEJzUkdCID0gcmdiLmIgLyAyNTU7XG4gICAgICAgIGlmIChSc1JHQiA8PSAwLjAzOTI4KSB7XG4gICAgICAgICAgICBSID0gUnNSR0IgLyAxMi45MjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZXhwb25lbnRpYXRpb24tb3BlcmF0b3JcbiAgICAgICAgICAgIFIgPSBNYXRoLnBvdygoUnNSR0IgKyAwLjA1NSkgLyAxLjA1NSwgMi40KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoR3NSR0IgPD0gMC4wMzkyOCkge1xuICAgICAgICAgICAgRyA9IEdzUkdCIC8gMTIuOTI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWV4cG9uZW50aWF0aW9uLW9wZXJhdG9yXG4gICAgICAgICAgICBHID0gTWF0aC5wb3coKEdzUkdCICsgMC4wNTUpIC8gMS4wNTUsIDIuNCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEJzUkdCIDw9IDAuMDM5MjgpIHtcbiAgICAgICAgICAgIEIgPSBCc1JHQiAvIDEyLjkyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1leHBvbmVudGlhdGlvbi1vcGVyYXRvclxuICAgICAgICAgICAgQiA9IE1hdGgucG93KChCc1JHQiArIDAuMDU1KSAvIDEuMDU1LCAyLjQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwLjIxMjYgKiBSICsgMC43MTUyICogRyArIDAuMDcyMiAqIEI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBhbHBoYSB2YWx1ZSBvZiBhIGNvbG9yLCBmcm9tIDAtMS5cbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLmdldEFscGhhID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgYWxwaGEgdmFsdWUgb24gdGhlIGN1cnJlbnQgY29sb3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYWxwaGEgLSBUaGUgbmV3IGFscGhhIHZhbHVlLiBUaGUgYWNjZXB0ZWQgcmFuZ2UgaXMgMC0xLlxuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUuc2V0QWxwaGEgPSBmdW5jdGlvbiAoYWxwaGEpIHtcbiAgICAgICAgdGhpcy5hID0gYm91bmRBbHBoYShhbHBoYSk7XG4gICAgICAgIHRoaXMucm91bmRBID0gTWF0aC5yb3VuZCgxMDAgKiB0aGlzLmEpIC8gMTAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG9iamVjdCBhcyBhIEhTVkEgb2JqZWN0LlxuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUudG9Ic3YgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBoc3YgPSByZ2JUb0hzdih0aGlzLnIsIHRoaXMuZywgdGhpcy5iKTtcbiAgICAgICAgcmV0dXJuIHsgaDogaHN2LmggKiAzNjAsIHM6IGhzdi5zLCB2OiBoc3YudiwgYTogdGhpcy5hIH07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBoc3ZhIHZhbHVlcyBpbnRlcnBvbGF0ZWQgaW50byBhIHN0cmluZyB3aXRoIHRoZSBmb2xsb3dpbmcgZm9ybWF0OlxuICAgICAqIFwiaHN2YSh4eHgsIHh4eCwgeHh4LCB4eClcIi5cbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnRvSHN2U3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaHN2ID0gcmdiVG9Ic3YodGhpcy5yLCB0aGlzLmcsIHRoaXMuYik7XG4gICAgICAgIHZhciBoID0gTWF0aC5yb3VuZChoc3YuaCAqIDM2MCk7XG4gICAgICAgIHZhciBzID0gTWF0aC5yb3VuZChoc3YucyAqIDEwMCk7XG4gICAgICAgIHZhciB2ID0gTWF0aC5yb3VuZChoc3YudiAqIDEwMCk7XG4gICAgICAgIHJldHVybiB0aGlzLmEgPT09IDEgPyBcImhzdihcIiArIGggKyBcIiwgXCIgKyBzICsgXCIlLCBcIiArIHYgKyBcIiUpXCIgOiBcImhzdmEoXCIgKyBoICsgXCIsIFwiICsgcyArIFwiJSwgXCIgKyB2ICsgXCIlLCBcIiArIHRoaXMucm91bmRBICsgXCIpXCI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBvYmplY3QgYXMgYSBIU0xBIG9iamVjdC5cbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnRvSHNsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaHNsID0gcmdiVG9Ic2wodGhpcy5yLCB0aGlzLmcsIHRoaXMuYik7XG4gICAgICAgIHJldHVybiB7IGg6IGhzbC5oICogMzYwLCBzOiBoc2wucywgbDogaHNsLmwsIGE6IHRoaXMuYSB9O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgaHNsYSB2YWx1ZXMgaW50ZXJwb2xhdGVkIGludG8gYSBzdHJpbmcgd2l0aCB0aGUgZm9sbG93aW5nIGZvcm1hdDpcbiAgICAgKiBcImhzbGEoeHh4LCB4eHgsIHh4eCwgeHgpXCIuXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS50b0hzbFN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGhzbCA9IHJnYlRvSHNsKHRoaXMuciwgdGhpcy5nLCB0aGlzLmIpO1xuICAgICAgICB2YXIgaCA9IE1hdGgucm91bmQoaHNsLmggKiAzNjApO1xuICAgICAgICB2YXIgcyA9IE1hdGgucm91bmQoaHNsLnMgKiAxMDApO1xuICAgICAgICB2YXIgbCA9IE1hdGgucm91bmQoaHNsLmwgKiAxMDApO1xuICAgICAgICByZXR1cm4gdGhpcy5hID09PSAxID8gXCJoc2woXCIgKyBoICsgXCIsIFwiICsgcyArIFwiJSwgXCIgKyBsICsgXCIlKVwiIDogXCJoc2xhKFwiICsgaCArIFwiLCBcIiArIHMgKyBcIiUsIFwiICsgbCArIFwiJSwgXCIgKyB0aGlzLnJvdW5kQSArIFwiKVwiO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgaGV4IHZhbHVlIG9mIHRoZSBjb2xvci5cbiAgICAgKiBAcGFyYW0gYWxsb3czQ2hhciB3aWxsIHNob3J0ZW4gaGV4IHZhbHVlIHRvIDMgY2hhciBpZiBwb3NzaWJsZVxuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUudG9IZXggPSBmdW5jdGlvbiAoYWxsb3czQ2hhcikge1xuICAgICAgICBpZiAoYWxsb3czQ2hhciA9PT0gdm9pZCAwKSB7IGFsbG93M0NoYXIgPSBmYWxzZTsgfVxuICAgICAgICByZXR1cm4gcmdiVG9IZXgodGhpcy5yLCB0aGlzLmcsIHRoaXMuYiwgYWxsb3czQ2hhcik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBoZXggdmFsdWUgb2YgdGhlIGNvbG9yIC13aXRoIGEgIyBhcHBlbmVkLlxuICAgICAqIEBwYXJhbSBhbGxvdzNDaGFyIHdpbGwgc2hvcnRlbiBoZXggdmFsdWUgdG8gMyBjaGFyIGlmIHBvc3NpYmxlXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS50b0hleFN0cmluZyA9IGZ1bmN0aW9uIChhbGxvdzNDaGFyKSB7XG4gICAgICAgIGlmIChhbGxvdzNDaGFyID09PSB2b2lkIDApIHsgYWxsb3czQ2hhciA9IGZhbHNlOyB9XG4gICAgICAgIHJldHVybiAnIycgKyB0aGlzLnRvSGV4KGFsbG93M0NoYXIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgaGV4IDggdmFsdWUgb2YgdGhlIGNvbG9yLlxuICAgICAqIEBwYXJhbSBhbGxvdzRDaGFyIHdpbGwgc2hvcnRlbiBoZXggdmFsdWUgdG8gNCBjaGFyIGlmIHBvc3NpYmxlXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS50b0hleDggPSBmdW5jdGlvbiAoYWxsb3c0Q2hhcikge1xuICAgICAgICBpZiAoYWxsb3c0Q2hhciA9PT0gdm9pZCAwKSB7IGFsbG93NENoYXIgPSBmYWxzZTsgfVxuICAgICAgICByZXR1cm4gcmdiYVRvSGV4KHRoaXMuciwgdGhpcy5nLCB0aGlzLmIsIHRoaXMuYSwgYWxsb3c0Q2hhcik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBoZXggOCB2YWx1ZSBvZiB0aGUgY29sb3IgLXdpdGggYSAjIGFwcGVuZWQuXG4gICAgICogQHBhcmFtIGFsbG93NENoYXIgd2lsbCBzaG9ydGVuIGhleCB2YWx1ZSB0byA0IGNoYXIgaWYgcG9zc2libGVcbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnRvSGV4OFN0cmluZyA9IGZ1bmN0aW9uIChhbGxvdzRDaGFyKSB7XG4gICAgICAgIGlmIChhbGxvdzRDaGFyID09PSB2b2lkIDApIHsgYWxsb3c0Q2hhciA9IGZhbHNlOyB9XG4gICAgICAgIHJldHVybiAnIycgKyB0aGlzLnRvSGV4OChhbGxvdzRDaGFyKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG9iamVjdCBhcyBhIFJHQkEgb2JqZWN0LlxuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUudG9SZ2IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByOiBNYXRoLnJvdW5kKHRoaXMuciksXG4gICAgICAgICAgICBnOiBNYXRoLnJvdW5kKHRoaXMuZyksXG4gICAgICAgICAgICBiOiBNYXRoLnJvdW5kKHRoaXMuYiksXG4gICAgICAgICAgICBhOiB0aGlzLmEsXG4gICAgICAgIH07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBSR0JBIHZhbHVlcyBpbnRlcnBvbGF0ZWQgaW50byBhIHN0cmluZyB3aXRoIHRoZSBmb2xsb3dpbmcgZm9ybWF0OlxuICAgICAqIFwiUkdCQSh4eHgsIHh4eCwgeHh4LCB4eClcIi5cbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnRvUmdiU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgciA9IE1hdGgucm91bmQodGhpcy5yKTtcbiAgICAgICAgdmFyIGcgPSBNYXRoLnJvdW5kKHRoaXMuZyk7XG4gICAgICAgIHZhciBiID0gTWF0aC5yb3VuZCh0aGlzLmIpO1xuICAgICAgICByZXR1cm4gdGhpcy5hID09PSAxID8gXCJyZ2IoXCIgKyByICsgXCIsIFwiICsgZyArIFwiLCBcIiArIGIgKyBcIilcIiA6IFwicmdiYShcIiArIHIgKyBcIiwgXCIgKyBnICsgXCIsIFwiICsgYiArIFwiLCBcIiArIHRoaXMucm91bmRBICsgXCIpXCI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBvYmplY3QgYXMgYSBSR0JBIG9iamVjdC5cbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnRvUGVyY2VudGFnZVJnYiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGZtdCA9IGZ1bmN0aW9uICh4KSB7IHJldHVybiBNYXRoLnJvdW5kKGJvdW5kMDEoeCwgMjU1KSAqIDEwMCkgKyBcIiVcIjsgfTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHI6IGZtdCh0aGlzLnIpLFxuICAgICAgICAgICAgZzogZm10KHRoaXMuZyksXG4gICAgICAgICAgICBiOiBmbXQodGhpcy5iKSxcbiAgICAgICAgICAgIGE6IHRoaXMuYSxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIFJHQkEgcmVsYXRpdmUgdmFsdWVzIGludGVycG9sYXRlZCBpbnRvIGEgc3RyaW5nXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS50b1BlcmNlbnRhZ2VSZ2JTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBybmQgPSBmdW5jdGlvbiAoeCkgeyByZXR1cm4gTWF0aC5yb3VuZChib3VuZDAxKHgsIDI1NSkgKiAxMDApOyB9O1xuICAgICAgICByZXR1cm4gdGhpcy5hID09PSAxXG4gICAgICAgICAgICA/IFwicmdiKFwiICsgcm5kKHRoaXMucikgKyBcIiUsIFwiICsgcm5kKHRoaXMuZykgKyBcIiUsIFwiICsgcm5kKHRoaXMuYikgKyBcIiUpXCJcbiAgICAgICAgICAgIDogXCJyZ2JhKFwiICsgcm5kKHRoaXMucikgKyBcIiUsIFwiICsgcm5kKHRoaXMuZykgKyBcIiUsIFwiICsgcm5kKHRoaXMuYikgKyBcIiUsIFwiICsgdGhpcy5yb3VuZEEgKyBcIilcIjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSAncmVhbCcgbmFtZSBvZiB0aGUgY29sb3IgLWlmIHRoZXJlIGlzIG9uZS5cbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnRvTmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuYSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuICd0cmFuc3BhcmVudCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYSA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaGV4ID0gJyMnICsgcmdiVG9IZXgodGhpcy5yLCB0aGlzLmcsIHRoaXMuYiwgZmFsc2UpO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gT2JqZWN0LmVudHJpZXMobmFtZXMpOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIF9iID0gX2FbX2ldLCBrZXkgPSBfYlswXSwgdmFsdWUgPSBfYlsxXTtcbiAgICAgICAgICAgIGlmIChoZXggPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICB2YXIgZm9ybWF0U2V0ID0gQm9vbGVhbihmb3JtYXQpO1xuICAgICAgICBmb3JtYXQgPSBmb3JtYXQgIT09IG51bGwgJiYgZm9ybWF0ICE9PSB2b2lkIDAgPyBmb3JtYXQgOiB0aGlzLmZvcm1hdDtcbiAgICAgICAgdmFyIGZvcm1hdHRlZFN0cmluZyA9IGZhbHNlO1xuICAgICAgICB2YXIgaGFzQWxwaGEgPSB0aGlzLmEgPCAxICYmIHRoaXMuYSA+PSAwO1xuICAgICAgICB2YXIgbmVlZHNBbHBoYUZvcm1hdCA9ICFmb3JtYXRTZXQgJiYgaGFzQWxwaGEgJiYgKGZvcm1hdC5zdGFydHNXaXRoKCdoZXgnKSB8fCBmb3JtYXQgPT09ICduYW1lJyk7XG4gICAgICAgIGlmIChuZWVkc0FscGhhRm9ybWF0KSB7XG4gICAgICAgICAgICAvLyBTcGVjaWFsIGNhc2UgZm9yIFwidHJhbnNwYXJlbnRcIiwgYWxsIG90aGVyIG5vbi1hbHBoYSBmb3JtYXRzXG4gICAgICAgICAgICAvLyB3aWxsIHJldHVybiByZ2JhIHdoZW4gdGhlcmUgaXMgdHJhbnNwYXJlbmN5LlxuICAgICAgICAgICAgaWYgKGZvcm1hdCA9PT0gJ25hbWUnICYmIHRoaXMuYSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRvTmFtZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9SZ2JTdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZm9ybWF0ID09PSAncmdiJykge1xuICAgICAgICAgICAgZm9ybWF0dGVkU3RyaW5nID0gdGhpcy50b1JnYlN0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmb3JtYXQgPT09ICdwcmdiJykge1xuICAgICAgICAgICAgZm9ybWF0dGVkU3RyaW5nID0gdGhpcy50b1BlcmNlbnRhZ2VSZ2JTdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZm9ybWF0ID09PSAnaGV4JyB8fCBmb3JtYXQgPT09ICdoZXg2Jykge1xuICAgICAgICAgICAgZm9ybWF0dGVkU3RyaW5nID0gdGhpcy50b0hleFN0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmb3JtYXQgPT09ICdoZXgzJykge1xuICAgICAgICAgICAgZm9ybWF0dGVkU3RyaW5nID0gdGhpcy50b0hleFN0cmluZyh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZm9ybWF0ID09PSAnaGV4NCcpIHtcbiAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IHRoaXMudG9IZXg4U3RyaW5nKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmb3JtYXQgPT09ICdoZXg4Jykge1xuICAgICAgICAgICAgZm9ybWF0dGVkU3RyaW5nID0gdGhpcy50b0hleDhTdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZm9ybWF0ID09PSAnbmFtZScpIHtcbiAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IHRoaXMudG9OYW1lKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZvcm1hdCA9PT0gJ2hzbCcpIHtcbiAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IHRoaXMudG9Ic2xTdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZm9ybWF0ID09PSAnaHN2Jykge1xuICAgICAgICAgICAgZm9ybWF0dGVkU3RyaW5nID0gdGhpcy50b0hzdlN0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtYXR0ZWRTdHJpbmcgfHwgdGhpcy50b0hleFN0cmluZygpO1xuICAgIH07XG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS50b051bWJlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIChNYXRoLnJvdW5kKHRoaXMucikgPDwgMTYpICsgKE1hdGgucm91bmQodGhpcy5nKSA8PCA4KSArIE1hdGgucm91bmQodGhpcy5iKTtcbiAgICB9O1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVGlueUNvbG9yKHRoaXMudG9TdHJpbmcoKSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBMaWdodGVuIHRoZSBjb2xvciBhIGdpdmVuIGFtb3VudC4gUHJvdmlkaW5nIDEwMCB3aWxsIGFsd2F5cyByZXR1cm4gd2hpdGUuXG4gICAgICogQHBhcmFtIGFtb3VudCAtIHZhbGlkIGJldHdlZW4gMS0xMDBcbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLmxpZ2h0ZW4gPSBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgIGlmIChhbW91bnQgPT09IHZvaWQgMCkgeyBhbW91bnQgPSAxMDsgfVxuICAgICAgICB2YXIgaHNsID0gdGhpcy50b0hzbCgpO1xuICAgICAgICBoc2wubCArPSBhbW91bnQgLyAxMDA7XG4gICAgICAgIGhzbC5sID0gY2xhbXAwMShoc2wubCk7XG4gICAgICAgIHJldHVybiBuZXcgVGlueUNvbG9yKGhzbCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBCcmlnaHRlbiB0aGUgY29sb3IgYSBnaXZlbiBhbW91bnQsIGZyb20gMCB0byAxMDAuXG4gICAgICogQHBhcmFtIGFtb3VudCAtIHZhbGlkIGJldHdlZW4gMS0xMDBcbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLmJyaWdodGVuID0gZnVuY3Rpb24gKGFtb3VudCkge1xuICAgICAgICBpZiAoYW1vdW50ID09PSB2b2lkIDApIHsgYW1vdW50ID0gMTA7IH1cbiAgICAgICAgdmFyIHJnYiA9IHRoaXMudG9SZ2IoKTtcbiAgICAgICAgcmdiLnIgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIHJnYi5yIC0gTWF0aC5yb3VuZCgyNTUgKiAtKGFtb3VudCAvIDEwMCkpKSk7XG4gICAgICAgIHJnYi5nID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCByZ2IuZyAtIE1hdGgucm91bmQoMjU1ICogLShhbW91bnQgLyAxMDApKSkpO1xuICAgICAgICByZ2IuYiA9IE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgcmdiLmIgLSBNYXRoLnJvdW5kKDI1NSAqIC0oYW1vdW50IC8gMTAwKSkpKTtcbiAgICAgICAgcmV0dXJuIG5ldyBUaW55Q29sb3IocmdiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIERhcmtlbiB0aGUgY29sb3IgYSBnaXZlbiBhbW91bnQsIGZyb20gMCB0byAxMDAuXG4gICAgICogUHJvdmlkaW5nIDEwMCB3aWxsIGFsd2F5cyByZXR1cm4gYmxhY2suXG4gICAgICogQHBhcmFtIGFtb3VudCAtIHZhbGlkIGJldHdlZW4gMS0xMDBcbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLmRhcmtlbiA9IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgICAgICAgaWYgKGFtb3VudCA9PT0gdm9pZCAwKSB7IGFtb3VudCA9IDEwOyB9XG4gICAgICAgIHZhciBoc2wgPSB0aGlzLnRvSHNsKCk7XG4gICAgICAgIGhzbC5sIC09IGFtb3VudCAvIDEwMDtcbiAgICAgICAgaHNsLmwgPSBjbGFtcDAxKGhzbC5sKTtcbiAgICAgICAgcmV0dXJuIG5ldyBUaW55Q29sb3IoaHNsKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIE1peCB0aGUgY29sb3Igd2l0aCBwdXJlIHdoaXRlLCBmcm9tIDAgdG8gMTAwLlxuICAgICAqIFByb3ZpZGluZyAwIHdpbGwgZG8gbm90aGluZywgcHJvdmlkaW5nIDEwMCB3aWxsIGFsd2F5cyByZXR1cm4gd2hpdGUuXG4gICAgICogQHBhcmFtIGFtb3VudCAtIHZhbGlkIGJldHdlZW4gMS0xMDBcbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnRpbnQgPSBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgIGlmIChhbW91bnQgPT09IHZvaWQgMCkgeyBhbW91bnQgPSAxMDsgfVxuICAgICAgICByZXR1cm4gdGhpcy5taXgoJ3doaXRlJywgYW1vdW50KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIE1peCB0aGUgY29sb3Igd2l0aCBwdXJlIGJsYWNrLCBmcm9tIDAgdG8gMTAwLlxuICAgICAqIFByb3ZpZGluZyAwIHdpbGwgZG8gbm90aGluZywgcHJvdmlkaW5nIDEwMCB3aWxsIGFsd2F5cyByZXR1cm4gYmxhY2suXG4gICAgICogQHBhcmFtIGFtb3VudCAtIHZhbGlkIGJldHdlZW4gMS0xMDBcbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnNoYWRlID0gZnVuY3Rpb24gKGFtb3VudCkge1xuICAgICAgICBpZiAoYW1vdW50ID09PSB2b2lkIDApIHsgYW1vdW50ID0gMTA7IH1cbiAgICAgICAgcmV0dXJuIHRoaXMubWl4KCdibGFjaycsIGFtb3VudCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEZXNhdHVyYXRlIHRoZSBjb2xvciBhIGdpdmVuIGFtb3VudCwgZnJvbSAwIHRvIDEwMC5cbiAgICAgKiBQcm92aWRpbmcgMTAwIHdpbGwgaXMgdGhlIHNhbWUgYXMgY2FsbGluZyBncmV5c2NhbGVcbiAgICAgKiBAcGFyYW0gYW1vdW50IC0gdmFsaWQgYmV0d2VlbiAxLTEwMFxuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUuZGVzYXR1cmF0ZSA9IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgICAgICAgaWYgKGFtb3VudCA9PT0gdm9pZCAwKSB7IGFtb3VudCA9IDEwOyB9XG4gICAgICAgIHZhciBoc2wgPSB0aGlzLnRvSHNsKCk7XG4gICAgICAgIGhzbC5zIC09IGFtb3VudCAvIDEwMDtcbiAgICAgICAgaHNsLnMgPSBjbGFtcDAxKGhzbC5zKTtcbiAgICAgICAgcmV0dXJuIG5ldyBUaW55Q29sb3IoaHNsKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNhdHVyYXRlIHRoZSBjb2xvciBhIGdpdmVuIGFtb3VudCwgZnJvbSAwIHRvIDEwMC5cbiAgICAgKiBAcGFyYW0gYW1vdW50IC0gdmFsaWQgYmV0d2VlbiAxLTEwMFxuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUuc2F0dXJhdGUgPSBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgIGlmIChhbW91bnQgPT09IHZvaWQgMCkgeyBhbW91bnQgPSAxMDsgfVxuICAgICAgICB2YXIgaHNsID0gdGhpcy50b0hzbCgpO1xuICAgICAgICBoc2wucyArPSBhbW91bnQgLyAxMDA7XG4gICAgICAgIGhzbC5zID0gY2xhbXAwMShoc2wucyk7XG4gICAgICAgIHJldHVybiBuZXcgVGlueUNvbG9yKGhzbCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb21wbGV0ZWx5IGRlc2F0dXJhdGVzIGEgY29sb3IgaW50byBncmV5c2NhbGUuXG4gICAgICogU2FtZSBhcyBjYWxsaW5nIGBkZXNhdHVyYXRlKDEwMClgXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS5ncmV5c2NhbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlc2F0dXJhdGUoMTAwKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNwaW4gdGFrZXMgYSBwb3NpdGl2ZSBvciBuZWdhdGl2ZSBhbW91bnQgd2l0aGluIFstMzYwLCAzNjBdIGluZGljYXRpbmcgdGhlIGNoYW5nZSBvZiBodWUuXG4gICAgICogVmFsdWVzIG91dHNpZGUgb2YgdGhpcyByYW5nZSB3aWxsIGJlIHdyYXBwZWQgaW50byB0aGlzIHJhbmdlLlxuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUuc3BpbiA9IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgICAgICAgdmFyIGhzbCA9IHRoaXMudG9Ic2woKTtcbiAgICAgICAgdmFyIGh1ZSA9IChoc2wuaCArIGFtb3VudCkgJSAzNjA7XG4gICAgICAgIGhzbC5oID0gaHVlIDwgMCA/IDM2MCArIGh1ZSA6IGh1ZTtcbiAgICAgICAgcmV0dXJuIG5ldyBUaW55Q29sb3IoaHNsKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIE1peCB0aGUgY3VycmVudCBjb2xvciBhIGdpdmVuIGFtb3VudCB3aXRoIGFub3RoZXIgY29sb3IsIGZyb20gMCB0byAxMDAuXG4gICAgICogMCBtZWFucyBubyBtaXhpbmcgKHJldHVybiBjdXJyZW50IGNvbG9yKS5cbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLm1peCA9IGZ1bmN0aW9uIChjb2xvciwgYW1vdW50KSB7XG4gICAgICAgIGlmIChhbW91bnQgPT09IHZvaWQgMCkgeyBhbW91bnQgPSA1MDsgfVxuICAgICAgICB2YXIgcmdiMSA9IHRoaXMudG9SZ2IoKTtcbiAgICAgICAgdmFyIHJnYjIgPSBuZXcgVGlueUNvbG9yKGNvbG9yKS50b1JnYigpO1xuICAgICAgICB2YXIgcCA9IGFtb3VudCAvIDEwMDtcbiAgICAgICAgdmFyIHJnYmEgPSB7XG4gICAgICAgICAgICByOiAocmdiMi5yIC0gcmdiMS5yKSAqIHAgKyByZ2IxLnIsXG4gICAgICAgICAgICBnOiAocmdiMi5nIC0gcmdiMS5nKSAqIHAgKyByZ2IxLmcsXG4gICAgICAgICAgICBiOiAocmdiMi5iIC0gcmdiMS5iKSAqIHAgKyByZ2IxLmIsXG4gICAgICAgICAgICBhOiAocmdiMi5hIC0gcmdiMS5hKSAqIHAgKyByZ2IxLmEsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgVGlueUNvbG9yKHJnYmEpO1xuICAgIH07XG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS5hbmFsb2dvdXMgPSBmdW5jdGlvbiAocmVzdWx0cywgc2xpY2VzKSB7XG4gICAgICAgIGlmIChyZXN1bHRzID09PSB2b2lkIDApIHsgcmVzdWx0cyA9IDY7IH1cbiAgICAgICAgaWYgKHNsaWNlcyA9PT0gdm9pZCAwKSB7IHNsaWNlcyA9IDMwOyB9XG4gICAgICAgIHZhciBoc2wgPSB0aGlzLnRvSHNsKCk7XG4gICAgICAgIHZhciBwYXJ0ID0gMzYwIC8gc2xpY2VzO1xuICAgICAgICB2YXIgcmV0ID0gW3RoaXNdO1xuICAgICAgICBmb3IgKGhzbC5oID0gKGhzbC5oIC0gKChwYXJ0ICogcmVzdWx0cykgPj4gMSkgKyA3MjApICUgMzYwOyAtLXJlc3VsdHM7KSB7XG4gICAgICAgICAgICBoc2wuaCA9IChoc2wuaCArIHBhcnQpICUgMzYwO1xuICAgICAgICAgICAgcmV0LnB1c2gobmV3IFRpbnlDb2xvcihoc2wpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogdGFrZW4gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vaW5mdXNpb24valF1ZXJ5LXhjb2xvci9ibG9iL21hc3Rlci9qcXVlcnkueGNvbG9yLmpzXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS5jb21wbGVtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaHNsID0gdGhpcy50b0hzbCgpO1xuICAgICAgICBoc2wuaCA9IChoc2wuaCArIDE4MCkgJSAzNjA7XG4gICAgICAgIHJldHVybiBuZXcgVGlueUNvbG9yKGhzbCk7XG4gICAgfTtcbiAgICBUaW55Q29sb3IucHJvdG90eXBlLm1vbm9jaHJvbWF0aWMgPSBmdW5jdGlvbiAocmVzdWx0cykge1xuICAgICAgICBpZiAocmVzdWx0cyA9PT0gdm9pZCAwKSB7IHJlc3VsdHMgPSA2OyB9XG4gICAgICAgIHZhciBoc3YgPSB0aGlzLnRvSHN2KCk7XG4gICAgICAgIHZhciBoID0gaHN2Lmg7XG4gICAgICAgIHZhciBzID0gaHN2LnM7XG4gICAgICAgIHZhciB2ID0gaHN2LnY7XG4gICAgICAgIHZhciByZXMgPSBbXTtcbiAgICAgICAgdmFyIG1vZGlmaWNhdGlvbiA9IDEgLyByZXN1bHRzO1xuICAgICAgICB3aGlsZSAocmVzdWx0cy0tKSB7XG4gICAgICAgICAgICByZXMucHVzaChuZXcgVGlueUNvbG9yKHsgaDogaCwgczogcywgdjogdiB9KSk7XG4gICAgICAgICAgICB2ID0gKHYgKyBtb2RpZmljYXRpb24pICUgMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH07XG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS5zcGxpdGNvbXBsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBoc2wgPSB0aGlzLnRvSHNsKCk7XG4gICAgICAgIHZhciBoID0gaHNsLmg7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgbmV3IFRpbnlDb2xvcih7IGg6IChoICsgNzIpICUgMzYwLCBzOiBoc2wucywgbDogaHNsLmwgfSksXG4gICAgICAgICAgICBuZXcgVGlueUNvbG9yKHsgaDogKGggKyAyMTYpICUgMzYwLCBzOiBoc2wucywgbDogaHNsLmwgfSksXG4gICAgICAgIF07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb21wdXRlIGhvdyB0aGUgY29sb3Igd291bGQgYXBwZWFyIG9uIGEgYmFja2dyb3VuZFxuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUub25CYWNrZ3JvdW5kID0gZnVuY3Rpb24gKGJhY2tncm91bmQpIHtcbiAgICAgICAgdmFyIGZnID0gdGhpcy50b1JnYigpO1xuICAgICAgICB2YXIgYmcgPSBuZXcgVGlueUNvbG9yKGJhY2tncm91bmQpLnRvUmdiKCk7XG4gICAgICAgIHJldHVybiBuZXcgVGlueUNvbG9yKHtcbiAgICAgICAgICAgIHI6IGJnLnIgKyAoZmcuciAtIGJnLnIpICogZmcuYSxcbiAgICAgICAgICAgIGc6IGJnLmcgKyAoZmcuZyAtIGJnLmcpICogZmcuYSxcbiAgICAgICAgICAgIGI6IGJnLmIgKyAoZmcuYiAtIGJnLmIpICogZmcuYSxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3IgYHBvbHlhZCgzKWBcbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnRyaWFkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb2x5YWQoMyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3IgYHBvbHlhZCg0KWBcbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnRldHJhZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9seWFkKDQpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHBvbHlhZCBjb2xvcnMsIGxpa2UgKGZvciAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCBldGMuLi4pXG4gICAgICogbW9uYWQsIGR5YWQsIHRyaWFkLCB0ZXRyYWQsIHBlbnRhZCwgaGV4YWQsIGhlcHRhZCwgb2N0YWQsIGV0Yy4uLlxuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUucG9seWFkID0gZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgdmFyIGhzbCA9IHRoaXMudG9Ic2woKTtcbiAgICAgICAgdmFyIGggPSBoc2wuaDtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFt0aGlzXTtcbiAgICAgICAgdmFyIGluY3JlbWVudCA9IDM2MCAvIG47XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChuZXcgVGlueUNvbG9yKHsgaDogKGggKyBpICogaW5jcmVtZW50KSAlIDM2MCwgczogaHNsLnMsIGw6IGhzbC5sIH0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogY29tcGFyZSBjb2xvciB2cyBjdXJyZW50IGNvbG9yXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiAoY29sb3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9SZ2JTdHJpbmcoKSA9PT0gbmV3IFRpbnlDb2xvcihjb2xvcikudG9SZ2JTdHJpbmcoKTtcbiAgICB9O1xuICAgIHJldHVybiBUaW55Q29sb3I7XG59KCkpO1xuZXhwb3J0IHsgVGlueUNvbG9yIH07XG4vLyBrZXB0IGZvciBiYWNrd2FyZHMgY29tcGF0YWJpbGl0eSB3aXRoIHYxXG5leHBvcnQgZnVuY3Rpb24gdGlueWNvbG9yKGNvbG9yLCBvcHRzKSB7XG4gICAgaWYgKGNvbG9yID09PSB2b2lkIDApIHsgY29sb3IgPSAnJzsgfVxuICAgIGlmIChvcHRzID09PSB2b2lkIDApIHsgb3B0cyA9IHt9OyB9XG4gICAgcmV0dXJuIG5ldyBUaW55Q29sb3IoY29sb3IsIG9wdHMpO1xufVxuIiwiZXhwb3J0IHt9O1xuIiwiaW1wb3J0IHsgdGlueWNvbG9yIH0gZnJvbSAnLi9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vY3NzLWNvbG9yLW5hbWVzJztcbmV4cG9ydCAqIGZyb20gJy4vcmVhZGFiaWxpdHknO1xuZXhwb3J0ICogZnJvbSAnLi90by1tcy1maWx0ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9mcm9tLXJhdGlvJztcbmV4cG9ydCAqIGZyb20gJy4vZm9ybWF0LWlucHV0JztcbmV4cG9ydCAqIGZyb20gJy4vcmFuZG9tJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlcyc7XG5leHBvcnQgKiBmcm9tICcuL2NvbnZlcnNpb24nO1xuLy8ga2VwdCBmb3IgYmFja3dhcmRzIGNvbXBhdGFiaWxpdHkgd2l0aCB2MVxuZXhwb3J0IGRlZmF1bHQgdGlueWNvbG9yO1xuIiwiLy8gcmFuZG9tQ29sb3IgYnkgRGF2aWQgTWVyZmllbGQgdW5kZXIgdGhlIENDMCBsaWNlbnNlXG4vLyBodHRwczovL2dpdGh1Yi5jb20vZGF2aWRtZXJmaWVsZC9yYW5kb21Db2xvci9cbmltcG9ydCB7IFRpbnlDb2xvciB9IGZyb20gJy4vaW5kZXgnO1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbShvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAvLyBDaGVjayBpZiB3ZSBuZWVkIHRvIGdlbmVyYXRlIG11bHRpcGxlIGNvbG9yc1xuICAgIGlmIChvcHRpb25zLmNvdW50ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgb3B0aW9ucy5jb3VudCAhPT0gbnVsbCkge1xuICAgICAgICB2YXIgdG90YWxDb2xvcnMgPSBvcHRpb25zLmNvdW50O1xuICAgICAgICB2YXIgY29sb3JzID0gW107XG4gICAgICAgIG9wdGlvbnMuY291bnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHdoaWxlICh0b3RhbENvbG9ycyA+IGNvbG9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIFNpbmNlIHdlJ3JlIGdlbmVyYXRpbmcgbXVsdGlwbGUgY29sb3JzLFxuICAgICAgICAgICAgLy8gaW5jcmVtZW1lbnQgdGhlIHNlZWQuIE90aGVyd2lzZSB3ZSdkIGp1c3RcbiAgICAgICAgICAgIC8vIGdlbmVyYXRlIHRoZSBzYW1lIGNvbG9yIGVhY2ggdGltZS4uLlxuICAgICAgICAgICAgb3B0aW9ucy5jb3VudCA9IG51bGw7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5zZWVkKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5zZWVkICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb2xvcnMucHVzaChyYW5kb20ob3B0aW9ucykpO1xuICAgICAgICB9XG4gICAgICAgIG9wdGlvbnMuY291bnQgPSB0b3RhbENvbG9ycztcbiAgICAgICAgcmV0dXJuIGNvbG9ycztcbiAgICB9XG4gICAgLy8gRmlyc3Qgd2UgcGljayBhIGh1ZSAoSClcbiAgICB2YXIgaCA9IHBpY2tIdWUob3B0aW9ucy5odWUsIG9wdGlvbnMuc2VlZCk7XG4gICAgLy8gVGhlbiB1c2UgSCB0byBkZXRlcm1pbmUgc2F0dXJhdGlvbiAoUylcbiAgICB2YXIgcyA9IHBpY2tTYXR1cmF0aW9uKGgsIG9wdGlvbnMpO1xuICAgIC8vIFRoZW4gdXNlIFMgYW5kIEggdG8gZGV0ZXJtaW5lIGJyaWdodG5lc3MgKEIpLlxuICAgIHZhciB2ID0gcGlja0JyaWdodG5lc3MoaCwgcywgb3B0aW9ucyk7XG4gICAgdmFyIHJlcyA9IHsgaDogaCwgczogcywgdjogdiB9O1xuICAgIGlmIChvcHRpb25zLmFscGhhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzLmEgPSBvcHRpb25zLmFscGhhO1xuICAgIH1cbiAgICAvLyBUaGVuIHdlIHJldHVybiB0aGUgSFNCIGNvbG9yIGluIHRoZSBkZXNpcmVkIGZvcm1hdFxuICAgIHJldHVybiBuZXcgVGlueUNvbG9yKHJlcyk7XG59XG5mdW5jdGlvbiBwaWNrSHVlKGh1ZSwgc2VlZCkge1xuICAgIHZhciBodWVSYW5nZSA9IGdldEh1ZVJhbmdlKGh1ZSk7XG4gICAgdmFyIHJlcyA9IHJhbmRvbVdpdGhpbihodWVSYW5nZSwgc2VlZCk7XG4gICAgLy8gSW5zdGVhZCBvZiBzdG9yaW5nIHJlZCBhcyB0d28gc2VwZXJhdGUgcmFuZ2VzLFxuICAgIC8vIHdlIGdyb3VwIHRoZW0sIHVzaW5nIG5lZ2F0aXZlIG51bWJlcnNcbiAgICBpZiAocmVzIDwgMCkge1xuICAgICAgICByZXMgPSAzNjAgKyByZXM7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5mdW5jdGlvbiBwaWNrU2F0dXJhdGlvbihodWUsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5odWUgPT09ICdtb25vY2hyb21lJykge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMubHVtaW5vc2l0eSA9PT0gJ3JhbmRvbScpIHtcbiAgICAgICAgcmV0dXJuIHJhbmRvbVdpdGhpbihbMCwgMTAwXSwgb3B0aW9ucy5zZWVkKTtcbiAgICB9XG4gICAgdmFyIHNhdHVyYXRpb25SYW5nZSA9IGdldENvbG9ySW5mbyhodWUpLnNhdHVyYXRpb25SYW5nZTtcbiAgICB2YXIgc01pbiA9IHNhdHVyYXRpb25SYW5nZVswXTtcbiAgICB2YXIgc01heCA9IHNhdHVyYXRpb25SYW5nZVsxXTtcbiAgICBzd2l0Y2ggKG9wdGlvbnMubHVtaW5vc2l0eSkge1xuICAgICAgICBjYXNlICdicmlnaHQnOlxuICAgICAgICAgICAgc01pbiA9IDU1O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2RhcmsnOlxuICAgICAgICAgICAgc01pbiA9IHNNYXggLSAxMDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdsaWdodCc6XG4gICAgICAgICAgICBzTWF4ID0gNTU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gcmFuZG9tV2l0aGluKFtzTWluLCBzTWF4XSwgb3B0aW9ucy5zZWVkKTtcbn1cbmZ1bmN0aW9uIHBpY2tCcmlnaHRuZXNzKEgsIFMsIG9wdGlvbnMpIHtcbiAgICB2YXIgYk1pbiA9IGdldE1pbmltdW1CcmlnaHRuZXNzKEgsIFMpO1xuICAgIHZhciBiTWF4ID0gMTAwO1xuICAgIHN3aXRjaCAob3B0aW9ucy5sdW1pbm9zaXR5KSB7XG4gICAgICAgIGNhc2UgJ2RhcmsnOlxuICAgICAgICAgICAgYk1heCA9IGJNaW4gKyAyMDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdsaWdodCc6XG4gICAgICAgICAgICBiTWluID0gKGJNYXggKyBiTWluKSAvIDI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncmFuZG9tJzpcbiAgICAgICAgICAgIGJNaW4gPSAwO1xuICAgICAgICAgICAgYk1heCA9IDEwMDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiByYW5kb21XaXRoaW4oW2JNaW4sIGJNYXhdLCBvcHRpb25zLnNlZWQpO1xufVxuZnVuY3Rpb24gZ2V0TWluaW11bUJyaWdodG5lc3MoSCwgUykge1xuICAgIHZhciBsb3dlckJvdW5kcyA9IGdldENvbG9ySW5mbyhIKS5sb3dlckJvdW5kcztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxvd2VyQm91bmRzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICB2YXIgczEgPSBsb3dlckJvdW5kc1tpXVswXTtcbiAgICAgICAgdmFyIHYxID0gbG93ZXJCb3VuZHNbaV1bMV07XG4gICAgICAgIHZhciBzMiA9IGxvd2VyQm91bmRzW2kgKyAxXVswXTtcbiAgICAgICAgdmFyIHYyID0gbG93ZXJCb3VuZHNbaSArIDFdWzFdO1xuICAgICAgICBpZiAoUyA+PSBzMSAmJiBTIDw9IHMyKSB7XG4gICAgICAgICAgICB2YXIgbSA9ICh2MiAtIHYxKSAvIChzMiAtIHMxKTtcbiAgICAgICAgICAgIHZhciBiID0gdjEgLSBtICogczE7XG4gICAgICAgICAgICByZXR1cm4gbSAqIFMgKyBiO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAwO1xufVxuZnVuY3Rpb24gZ2V0SHVlUmFuZ2UoY29sb3JJbnB1dCkge1xuICAgIHZhciBudW0gPSBwYXJzZUludChjb2xvcklucHV0LCAxMCk7XG4gICAgaWYgKCFOdW1iZXIuaXNOYU4obnVtKSAmJiBudW0gPCAzNjAgJiYgbnVtID4gMCkge1xuICAgICAgICByZXR1cm4gW251bSwgbnVtXTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjb2xvcklucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICB2YXIgbmFtZWRDb2xvciA9IGJvdW5kcy5maW5kKGZ1bmN0aW9uIChuKSB7IHJldHVybiBuLm5hbWUgPT09IGNvbG9ySW5wdXQ7IH0pO1xuICAgICAgICBpZiAobmFtZWRDb2xvcikge1xuICAgICAgICAgICAgdmFyIGNvbG9yID0gZGVmaW5lQ29sb3IobmFtZWRDb2xvcik7XG4gICAgICAgICAgICBpZiAoY29sb3IuaHVlUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sb3IuaHVlUmFuZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBhcnNlZCA9IG5ldyBUaW55Q29sb3IoY29sb3JJbnB1dCk7XG4gICAgICAgIGlmIChwYXJzZWQuaXNWYWxpZCkge1xuICAgICAgICAgICAgdmFyIGh1ZSA9IHBhcnNlZC50b0hzdigpLmg7XG4gICAgICAgICAgICByZXR1cm4gW2h1ZSwgaHVlXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gWzAsIDM2MF07XG59XG5mdW5jdGlvbiBnZXRDb2xvckluZm8oaHVlKSB7XG4gICAgLy8gTWFwcyByZWQgY29sb3JzIHRvIG1ha2UgcGlja2luZyBodWUgZWFzaWVyXG4gICAgaWYgKGh1ZSA+PSAzMzQgJiYgaHVlIDw9IDM2MCkge1xuICAgICAgICBodWUgLT0gMzYwO1xuICAgIH1cbiAgICBmb3IgKHZhciBfaSA9IDAsIGJvdW5kc18xID0gYm91bmRzOyBfaSA8IGJvdW5kc18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgYm91bmQgPSBib3VuZHNfMVtfaV07XG4gICAgICAgIHZhciBjb2xvciA9IGRlZmluZUNvbG9yKGJvdW5kKTtcbiAgICAgICAgaWYgKGNvbG9yLmh1ZVJhbmdlICYmIGh1ZSA+PSBjb2xvci5odWVSYW5nZVswXSAmJiBodWUgPD0gY29sb3IuaHVlUmFuZ2VbMV0pIHtcbiAgICAgICAgICAgIHJldHVybiBjb2xvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBFcnJvcignQ29sb3Igbm90IGZvdW5kJyk7XG59XG5mdW5jdGlvbiByYW5kb21XaXRoaW4ocmFuZ2UsIHNlZWQpIHtcbiAgICBpZiAoc2VlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHJhbmdlWzBdICsgTWF0aC5yYW5kb20oKSAqIChyYW5nZVsxXSArIDEgLSByYW5nZVswXSkpO1xuICAgIH1cbiAgICAvLyBTZWVkZWQgcmFuZG9tIGFsZ29yaXRobSBmcm9tIGh0dHA6Ly9pbmRpZWdhbXIuY29tL2dlbmVyYXRlLXJlcGVhdGFibGUtcmFuZG9tLW51bWJlcnMtaW4tanMvXG4gICAgdmFyIG1heCA9IHJhbmdlWzFdIHx8IDE7XG4gICAgdmFyIG1pbiA9IHJhbmdlWzBdIHx8IDA7XG4gICAgc2VlZCA9IChzZWVkICogOTMwMSArIDQ5Mjk3KSAlIDIzMzI4MDtcbiAgICB2YXIgcm5kID0gc2VlZCAvIDIzMzI4MC4wO1xuICAgIHJldHVybiBNYXRoLmZsb29yKG1pbiArIHJuZCAqIChtYXggLSBtaW4pKTtcbn1cbmZ1bmN0aW9uIGRlZmluZUNvbG9yKGJvdW5kKSB7XG4gICAgdmFyIHNNaW4gPSBib3VuZC5sb3dlckJvdW5kc1swXVswXTtcbiAgICB2YXIgc01heCA9IGJvdW5kLmxvd2VyQm91bmRzW2JvdW5kLmxvd2VyQm91bmRzLmxlbmd0aCAtIDFdWzBdO1xuICAgIHZhciBiTWluID0gYm91bmQubG93ZXJCb3VuZHNbYm91bmQubG93ZXJCb3VuZHMubGVuZ3RoIC0gMV1bMV07XG4gICAgdmFyIGJNYXggPSBib3VuZC5sb3dlckJvdW5kc1swXVsxXTtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBib3VuZC5uYW1lLFxuICAgICAgICBodWVSYW5nZTogYm91bmQuaHVlUmFuZ2UsXG4gICAgICAgIGxvd2VyQm91bmRzOiBib3VuZC5sb3dlckJvdW5kcyxcbiAgICAgICAgc2F0dXJhdGlvblJhbmdlOiBbc01pbiwgc01heF0sXG4gICAgICAgIGJyaWdodG5lc3NSYW5nZTogW2JNaW4sIGJNYXhdLFxuICAgIH07XG59XG4vKipcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IHZhciBib3VuZHMgPSBbXG4gICAge1xuICAgICAgICBuYW1lOiAnbW9ub2Nocm9tZScsXG4gICAgICAgIGh1ZVJhbmdlOiBudWxsLFxuICAgICAgICBsb3dlckJvdW5kczogW1xuICAgICAgICAgICAgWzAsIDBdLFxuICAgICAgICAgICAgWzEwMCwgMF0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdyZWQnLFxuICAgICAgICBodWVSYW5nZTogWy0yNiwgMThdLFxuICAgICAgICBsb3dlckJvdW5kczogW1xuICAgICAgICAgICAgWzIwLCAxMDBdLFxuICAgICAgICAgICAgWzMwLCA5Ml0sXG4gICAgICAgICAgICBbNDAsIDg5XSxcbiAgICAgICAgICAgIFs1MCwgODVdLFxuICAgICAgICAgICAgWzYwLCA3OF0sXG4gICAgICAgICAgICBbNzAsIDcwXSxcbiAgICAgICAgICAgIFs4MCwgNjBdLFxuICAgICAgICAgICAgWzkwLCA1NV0sXG4gICAgICAgICAgICBbMTAwLCA1MF0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdvcmFuZ2UnLFxuICAgICAgICBodWVSYW5nZTogWzE5LCA0Nl0sXG4gICAgICAgIGxvd2VyQm91bmRzOiBbXG4gICAgICAgICAgICBbMjAsIDEwMF0sXG4gICAgICAgICAgICBbMzAsIDkzXSxcbiAgICAgICAgICAgIFs0MCwgODhdLFxuICAgICAgICAgICAgWzUwLCA4Nl0sXG4gICAgICAgICAgICBbNjAsIDg1XSxcbiAgICAgICAgICAgIFs3MCwgNzBdLFxuICAgICAgICAgICAgWzEwMCwgNzBdLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAneWVsbG93JyxcbiAgICAgICAgaHVlUmFuZ2U6IFs0NywgNjJdLFxuICAgICAgICBsb3dlckJvdW5kczogW1xuICAgICAgICAgICAgWzI1LCAxMDBdLFxuICAgICAgICAgICAgWzQwLCA5NF0sXG4gICAgICAgICAgICBbNTAsIDg5XSxcbiAgICAgICAgICAgIFs2MCwgODZdLFxuICAgICAgICAgICAgWzcwLCA4NF0sXG4gICAgICAgICAgICBbODAsIDgyXSxcbiAgICAgICAgICAgIFs5MCwgODBdLFxuICAgICAgICAgICAgWzEwMCwgNzVdLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZ3JlZW4nLFxuICAgICAgICBodWVSYW5nZTogWzYzLCAxNzhdLFxuICAgICAgICBsb3dlckJvdW5kczogW1xuICAgICAgICAgICAgWzMwLCAxMDBdLFxuICAgICAgICAgICAgWzQwLCA5MF0sXG4gICAgICAgICAgICBbNTAsIDg1XSxcbiAgICAgICAgICAgIFs2MCwgODFdLFxuICAgICAgICAgICAgWzcwLCA3NF0sXG4gICAgICAgICAgICBbODAsIDY0XSxcbiAgICAgICAgICAgIFs5MCwgNTBdLFxuICAgICAgICAgICAgWzEwMCwgNDBdLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnYmx1ZScsXG4gICAgICAgIGh1ZVJhbmdlOiBbMTc5LCAyNTddLFxuICAgICAgICBsb3dlckJvdW5kczogW1xuICAgICAgICAgICAgWzIwLCAxMDBdLFxuICAgICAgICAgICAgWzMwLCA4Nl0sXG4gICAgICAgICAgICBbNDAsIDgwXSxcbiAgICAgICAgICAgIFs1MCwgNzRdLFxuICAgICAgICAgICAgWzYwLCA2MF0sXG4gICAgICAgICAgICBbNzAsIDUyXSxcbiAgICAgICAgICAgIFs4MCwgNDRdLFxuICAgICAgICAgICAgWzkwLCAzOV0sXG4gICAgICAgICAgICBbMTAwLCAzNV0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdwdXJwbGUnLFxuICAgICAgICBodWVSYW5nZTogWzI1OCwgMjgyXSxcbiAgICAgICAgbG93ZXJCb3VuZHM6IFtcbiAgICAgICAgICAgIFsyMCwgMTAwXSxcbiAgICAgICAgICAgIFszMCwgODddLFxuICAgICAgICAgICAgWzQwLCA3OV0sXG4gICAgICAgICAgICBbNTAsIDcwXSxcbiAgICAgICAgICAgIFs2MCwgNjVdLFxuICAgICAgICAgICAgWzcwLCA1OV0sXG4gICAgICAgICAgICBbODAsIDUyXSxcbiAgICAgICAgICAgIFs5MCwgNDVdLFxuICAgICAgICAgICAgWzEwMCwgNDJdLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAncGluaycsXG4gICAgICAgIGh1ZVJhbmdlOiBbMjgzLCAzMzRdLFxuICAgICAgICBsb3dlckJvdW5kczogW1xuICAgICAgICAgICAgWzIwLCAxMDBdLFxuICAgICAgICAgICAgWzMwLCA5MF0sXG4gICAgICAgICAgICBbNDAsIDg2XSxcbiAgICAgICAgICAgIFs2MCwgODRdLFxuICAgICAgICAgICAgWzgwLCA4MF0sXG4gICAgICAgICAgICBbOTAsIDc1XSxcbiAgICAgICAgICAgIFsxMDAsIDczXSxcbiAgICAgICAgXSxcbiAgICB9LFxuXTtcbiIsImltcG9ydCB7IFRpbnlDb2xvciB9IGZyb20gJy4vaW5kZXgnO1xuLy8gUmVhZGFiaWxpdHkgRnVuY3Rpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIDxodHRwOi8vd3d3LnczLm9yZy9UUi8yMDA4L1JFQy1XQ0FHMjAtMjAwODEyMTEvI2NvbnRyYXN0LXJhdGlvZGVmIChXQ0FHIFZlcnNpb24gMilcbi8qKlxuICogQUtBIGBjb250cmFzdGBcbiAqXG4gKiBBbmFseXplIHRoZSAyIGNvbG9ycyBhbmQgcmV0dXJucyB0aGUgY29sb3IgY29udHJhc3QgZGVmaW5lZCBieSAoV0NBRyBWZXJzaW9uIDIpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWFkYWJpbGl0eShjb2xvcjEsIGNvbG9yMikge1xuICAgIHZhciBjMSA9IG5ldyBUaW55Q29sb3IoY29sb3IxKTtcbiAgICB2YXIgYzIgPSBuZXcgVGlueUNvbG9yKGNvbG9yMik7XG4gICAgcmV0dXJuICgoTWF0aC5tYXgoYzEuZ2V0THVtaW5hbmNlKCksIGMyLmdldEx1bWluYW5jZSgpKSArIDAuMDUpIC9cbiAgICAgICAgKE1hdGgubWluKGMxLmdldEx1bWluYW5jZSgpLCBjMi5nZXRMdW1pbmFuY2UoKSkgKyAwLjA1KSk7XG59XG4vKipcbiAqIEVuc3VyZSB0aGF0IGZvcmVncm91bmQgYW5kIGJhY2tncm91bmQgY29sb3IgY29tYmluYXRpb25zIG1lZXQgV0NBRzIgZ3VpZGVsaW5lcy5cbiAqIFRoZSB0aGlyZCBhcmd1bWVudCBpcyBhbiBvYmplY3QuXG4gKiAgICAgIHRoZSAnbGV2ZWwnIHByb3BlcnR5IHN0YXRlcyAnQUEnIG9yICdBQUEnIC0gaWYgbWlzc2luZyBvciBpbnZhbGlkLCBpdCBkZWZhdWx0cyB0byAnQUEnO1xuICogICAgICB0aGUgJ3NpemUnIHByb3BlcnR5IHN0YXRlcyAnbGFyZ2UnIG9yICdzbWFsbCcgLSBpZiBtaXNzaW5nIG9yIGludmFsaWQsIGl0IGRlZmF1bHRzIHRvICdzbWFsbCcuXG4gKiBJZiB0aGUgZW50aXJlIG9iamVjdCBpcyBhYnNlbnQsIGlzUmVhZGFibGUgZGVmYXVsdHMgdG8ge2xldmVsOlwiQUFcIixzaXplOlwic21hbGxcIn0uXG4gKlxuICogRXhhbXBsZVxuICogYGBgdHNcbiAqIG5ldyBUaW55Q29sb3IoKS5pc1JlYWRhYmxlKCcjMDAwJywgJyMxMTEnKSA9PiBmYWxzZVxuICogbmV3IFRpbnlDb2xvcigpLmlzUmVhZGFibGUoJyMwMDAnLCAnIzExMScsIHsgbGV2ZWw6ICdBQScsIHNpemU6ICdsYXJnZScgfSkgPT4gZmFsc2VcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNSZWFkYWJsZShjb2xvcjEsIGNvbG9yMiwgd2NhZzIpIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGlmICh3Y2FnMiA9PT0gdm9pZCAwKSB7IHdjYWcyID0geyBsZXZlbDogJ0FBJywgc2l6ZTogJ3NtYWxsJyB9OyB9XG4gICAgdmFyIHJlYWRhYmlsaXR5TGV2ZWwgPSByZWFkYWJpbGl0eShjb2xvcjEsIGNvbG9yMik7XG4gICAgc3dpdGNoICgoKF9hID0gd2NhZzIubGV2ZWwpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICdBQScpICsgKChfYiA9IHdjYWcyLnNpemUpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6ICdzbWFsbCcpKSB7XG4gICAgICAgIGNhc2UgJ0FBc21hbGwnOlxuICAgICAgICBjYXNlICdBQUFsYXJnZSc6XG4gICAgICAgICAgICByZXR1cm4gcmVhZGFiaWxpdHlMZXZlbCA+PSA0LjU7XG4gICAgICAgIGNhc2UgJ0FBbGFyZ2UnOlxuICAgICAgICAgICAgcmV0dXJuIHJlYWRhYmlsaXR5TGV2ZWwgPj0gMztcbiAgICAgICAgY2FzZSAnQUFBc21hbGwnOlxuICAgICAgICAgICAgcmV0dXJuIHJlYWRhYmlsaXR5TGV2ZWwgPj0gNztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4vKipcbiAqIEdpdmVuIGEgYmFzZSBjb2xvciBhbmQgYSBsaXN0IG9mIHBvc3NpYmxlIGZvcmVncm91bmQgb3IgYmFja2dyb3VuZFxuICogY29sb3JzIGZvciB0aGF0IGJhc2UsIHJldHVybnMgdGhlIG1vc3QgcmVhZGFibGUgY29sb3IuXG4gKiBPcHRpb25hbGx5IHJldHVybnMgQmxhY2sgb3IgV2hpdGUgaWYgdGhlIG1vc3QgcmVhZGFibGUgY29sb3IgaXMgdW5yZWFkYWJsZS5cbiAqXG4gKiBAcGFyYW0gYmFzZUNvbG9yIC0gdGhlIGJhc2UgY29sb3IuXG4gKiBAcGFyYW0gY29sb3JMaXN0IC0gYXJyYXkgb2YgY29sb3JzIHRvIHBpY2sgdGhlIG1vc3QgcmVhZGFibGUgb25lIGZyb20uXG4gKiBAcGFyYW0gYXJncyAtIGFuZCBvYmplY3Qgd2l0aCBleHRyYSBhcmd1bWVudHNcbiAqXG4gKiBFeGFtcGxlXG4gKiBgYGB0c1xuICogbmV3IFRpbnlDb2xvcigpLm1vc3RSZWFkYWJsZSgnIzEyMycsIFsnIzEyNFwiLCBcIiMxMjUnXSwgeyBpbmNsdWRlRmFsbGJhY2tDb2xvcnM6IGZhbHNlIH0pLnRvSGV4U3RyaW5nKCk7IC8vIFwiIzExMjI1NVwiXG4gKiBuZXcgVGlueUNvbG9yKCkubW9zdFJlYWRhYmxlKCcjMTIzJywgWycjMTI0XCIsIFwiIzEyNSddLHsgaW5jbHVkZUZhbGxiYWNrQ29sb3JzOiB0cnVlIH0pLnRvSGV4U3RyaW5nKCk7ICAvLyBcIiNmZmZmZmZcIlxuICogbmV3IFRpbnlDb2xvcigpLm1vc3RSZWFkYWJsZSgnI2E4MDE1YScsIFtcIiNmYWYzZjNcIl0sIHsgaW5jbHVkZUZhbGxiYWNrQ29sb3JzOnRydWUsIGxldmVsOiAnQUFBJywgc2l6ZTogJ2xhcmdlJyB9KS50b0hleFN0cmluZygpOyAvLyBcIiNmYWYzZjNcIlxuICogbmV3IFRpbnlDb2xvcigpLm1vc3RSZWFkYWJsZSgnI2E4MDE1YScsIFtcIiNmYWYzZjNcIl0sIHsgaW5jbHVkZUZhbGxiYWNrQ29sb3JzOnRydWUsIGxldmVsOiAnQUFBJywgc2l6ZTogJ3NtYWxsJyB9KS50b0hleFN0cmluZygpOyAvLyBcIiNmZmZmZmZcIlxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtb3N0UmVhZGFibGUoYmFzZUNvbG9yLCBjb2xvckxpc3QsIGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PT0gdm9pZCAwKSB7IGFyZ3MgPSB7IGluY2x1ZGVGYWxsYmFja0NvbG9yczogZmFsc2UsIGxldmVsOiAnQUEnLCBzaXplOiAnc21hbGwnIH07IH1cbiAgICB2YXIgYmVzdENvbG9yID0gbnVsbDtcbiAgICB2YXIgYmVzdFNjb3JlID0gMDtcbiAgICB2YXIgaW5jbHVkZUZhbGxiYWNrQ29sb3JzID0gYXJncy5pbmNsdWRlRmFsbGJhY2tDb2xvcnMsIGxldmVsID0gYXJncy5sZXZlbCwgc2l6ZSA9IGFyZ3Muc2l6ZTtcbiAgICBmb3IgKHZhciBfaSA9IDAsIGNvbG9yTGlzdF8xID0gY29sb3JMaXN0OyBfaSA8IGNvbG9yTGlzdF8xLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgY29sb3IgPSBjb2xvckxpc3RfMVtfaV07XG4gICAgICAgIHZhciBzY29yZSA9IHJlYWRhYmlsaXR5KGJhc2VDb2xvciwgY29sb3IpO1xuICAgICAgICBpZiAoc2NvcmUgPiBiZXN0U2NvcmUpIHtcbiAgICAgICAgICAgIGJlc3RTY29yZSA9IHNjb3JlO1xuICAgICAgICAgICAgYmVzdENvbG9yID0gbmV3IFRpbnlDb2xvcihjb2xvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzUmVhZGFibGUoYmFzZUNvbG9yLCBiZXN0Q29sb3IsIHsgbGV2ZWw6IGxldmVsLCBzaXplOiBzaXplIH0pIHx8ICFpbmNsdWRlRmFsbGJhY2tDb2xvcnMpIHtcbiAgICAgICAgcmV0dXJuIGJlc3RDb2xvcjtcbiAgICB9XG4gICAgYXJncy5pbmNsdWRlRmFsbGJhY2tDb2xvcnMgPSBmYWxzZTtcbiAgICByZXR1cm4gbW9zdFJlYWRhYmxlKGJhc2VDb2xvciwgWycjZmZmJywgJyMwMDAnXSwgYXJncyk7XG59XG4iLCJpbXBvcnQgeyByZ2JhVG9BcmdiSGV4IH0gZnJvbSAnLi9jb252ZXJzaW9uJztcbmltcG9ydCB7IFRpbnlDb2xvciB9IGZyb20gJy4vaW5kZXgnO1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBjb2xvciByZXByZXNlbnRlZCBhcyBhIE1pY3Jvc29mdCBmaWx0ZXIgZm9yIHVzZSBpbiBvbGQgdmVyc2lvbnMgb2YgSUUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b01zRmlsdGVyKGZpcnN0Q29sb3IsIHNlY29uZENvbG9yKSB7XG4gICAgdmFyIGNvbG9yID0gbmV3IFRpbnlDb2xvcihmaXJzdENvbG9yKTtcbiAgICB2YXIgaGV4OFN0cmluZyA9ICcjJyArIHJnYmFUb0FyZ2JIZXgoY29sb3IuciwgY29sb3IuZywgY29sb3IuYiwgY29sb3IuYSk7XG4gICAgdmFyIHNlY29uZEhleDhTdHJpbmcgPSBoZXg4U3RyaW5nO1xuICAgIHZhciBncmFkaWVudFR5cGUgPSBjb2xvci5ncmFkaWVudFR5cGUgPyAnR3JhZGllbnRUeXBlID0gMSwgJyA6ICcnO1xuICAgIGlmIChzZWNvbmRDb2xvcikge1xuICAgICAgICB2YXIgcyA9IG5ldyBUaW55Q29sb3Ioc2Vjb25kQ29sb3IpO1xuICAgICAgICBzZWNvbmRIZXg4U3RyaW5nID0gJyMnICsgcmdiYVRvQXJnYkhleChzLnIsIHMuZywgcy5iLCBzLmEpO1xuICAgIH1cbiAgICByZXR1cm4gXCJwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuZ3JhZGllbnQoXCIgKyBncmFkaWVudFR5cGUgKyBcInN0YXJ0Q29sb3JzdHI9XCIgKyBoZXg4U3RyaW5nICsgXCIsZW5kQ29sb3JzdHI9XCIgKyBzZWNvbmRIZXg4U3RyaW5nICsgXCIpXCI7XG59XG4iLCIvKipcbiAqIFRha2UgaW5wdXQgZnJvbSBbMCwgbl0gYW5kIHJldHVybiBpdCBhcyBbMCwgMV1cbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJvdW5kMDEobiwgbWF4KSB7XG4gICAgaWYgKGlzT25lUG9pbnRaZXJvKG4pKSB7XG4gICAgICAgIG4gPSAnMTAwJSc7XG4gICAgfVxuICAgIHZhciBpc1BlcmNlbnQgPSBpc1BlcmNlbnRhZ2Uobik7XG4gICAgbiA9IG1heCA9PT0gMzYwID8gbiA6IE1hdGgubWluKG1heCwgTWF0aC5tYXgoMCwgcGFyc2VGbG9hdChuKSkpO1xuICAgIC8vIEF1dG9tYXRpY2FsbHkgY29udmVydCBwZXJjZW50YWdlIGludG8gbnVtYmVyXG4gICAgaWYgKGlzUGVyY2VudCkge1xuICAgICAgICBuID0gcGFyc2VJbnQoU3RyaW5nKG4gKiBtYXgpLCAxMCkgLyAxMDA7XG4gICAgfVxuICAgIC8vIEhhbmRsZSBmbG9hdGluZyBwb2ludCByb3VuZGluZyBlcnJvcnNcbiAgICBpZiAoTWF0aC5hYnMobiAtIG1heCkgPCAwLjAwMDAwMSkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgLy8gQ29udmVydCBpbnRvIFswLCAxXSByYW5nZSBpZiBpdCBpc24ndCBhbHJlYWR5XG4gICAgaWYgKG1heCA9PT0gMzYwKSB7XG4gICAgICAgIC8vIElmIG4gaXMgYSBodWUgZ2l2ZW4gaW4gZGVncmVlcyxcbiAgICAgICAgLy8gd3JhcCBhcm91bmQgb3V0LW9mLXJhbmdlIHZhbHVlcyBpbnRvIFswLCAzNjBdIHJhbmdlXG4gICAgICAgIC8vIHRoZW4gY29udmVydCBpbnRvIFswLCAxXS5cbiAgICAgICAgbiA9IChuIDwgMCA/IChuICUgbWF4KSArIG1heCA6IG4gJSBtYXgpIC8gcGFyc2VGbG9hdChTdHJpbmcobWF4KSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBJZiBuIG5vdCBhIGh1ZSBnaXZlbiBpbiBkZWdyZWVzXG4gICAgICAgIC8vIENvbnZlcnQgaW50byBbMCwgMV0gcmFuZ2UgaWYgaXQgaXNuJ3QgYWxyZWFkeS5cbiAgICAgICAgbiA9IChuICUgbWF4KSAvIHBhcnNlRmxvYXQoU3RyaW5nKG1heCkpO1xuICAgIH1cbiAgICByZXR1cm4gbjtcbn1cbi8qKlxuICogRm9yY2UgYSBudW1iZXIgYmV0d2VlbiAwIGFuZCAxXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGFtcDAxKHZhbCkge1xuICAgIHJldHVybiBNYXRoLm1pbigxLCBNYXRoLm1heCgwLCB2YWwpKTtcbn1cbi8qKlxuICogTmVlZCB0byBoYW5kbGUgMS4wIGFzIDEwMCUsIHNpbmNlIG9uY2UgaXQgaXMgYSBudW1iZXIsIHRoZXJlIGlzIG5vIGRpZmZlcmVuY2UgYmV0d2VlbiBpdCBhbmQgMVxuICogPGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNzQyMjA3Mi9qYXZhc2NyaXB0LWhvdy10by1kZXRlY3QtbnVtYmVyLWFzLWEtZGVjaW1hbC1pbmNsdWRpbmctMS0wPlxuICogQGhpZGRlblxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPbmVQb2ludFplcm8obikge1xuICAgIHJldHVybiB0eXBlb2YgbiA9PT0gJ3N0cmluZycgJiYgbi5pbmRleE9mKCcuJykgIT09IC0xICYmIHBhcnNlRmxvYXQobikgPT09IDE7XG59XG4vKipcbiAqIENoZWNrIHRvIHNlZSBpZiBzdHJpbmcgcGFzc2VkIGluIGlzIGEgcGVyY2VudGFnZVxuICogQGhpZGRlblxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNQZXJjZW50YWdlKG4pIHtcbiAgICByZXR1cm4gdHlwZW9mIG4gPT09ICdzdHJpbmcnICYmIG4uaW5kZXhPZignJScpICE9PSAtMTtcbn1cbi8qKlxuICogUmV0dXJuIGEgdmFsaWQgYWxwaGEgdmFsdWUgWzAsMV0gd2l0aCBhbGwgaW52YWxpZCB2YWx1ZXMgYmVpbmcgc2V0IHRvIDFcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJvdW5kQWxwaGEoYSkge1xuICAgIGEgPSBwYXJzZUZsb2F0KGEpO1xuICAgIGlmIChpc05hTihhKSB8fCBhIDwgMCB8fCBhID4gMSkge1xuICAgICAgICBhID0gMTtcbiAgICB9XG4gICAgcmV0dXJuIGE7XG59XG4vKipcbiAqIFJlcGxhY2UgYSBkZWNpbWFsIHdpdGggaXQncyBwZXJjZW50YWdlIHZhbHVlXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VG9QZXJjZW50YWdlKG4pIHtcbiAgICBpZiAobiA8PSAxKSB7XG4gICAgICAgIHJldHVybiBOdW1iZXIobikgKiAxMDAgKyBcIiVcIjtcbiAgICB9XG4gICAgcmV0dXJuIG47XG59XG4vKipcbiAqIEZvcmNlIGEgaGV4IHZhbHVlIHRvIGhhdmUgMiBjaGFyYWN0ZXJzXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYWQyKGMpIHtcbiAgICByZXR1cm4gYy5sZW5ndGggPT09IDEgPyAnMCcgKyBjIDogU3RyaW5nKGMpO1xufVxuIiwiZXhwb3J0IGNvbnN0IGNvbW1hbmRzID0ge1xuICAgIGdlbmVyYWxTZXR0aW5nczogJ2dlbmVyYWxTZXR0aW5ncycsXG4gICAgZXhwb3J0OiAnZXhwb3J0JyxcbiAgICBzZW5kU2V0dGluZ3M6ICdzZW5kU2V0dGluZ3MnLFxuICAgIHVybEV4cG9ydDogJ3VybEV4cG9ydCcsXG4gICAgaGVscDogJ2hlbHAnLFxuICAgIGRlbW86ICdkZW1vJyxcbiAgICBvcGVuVXJsOiAnb3BlblVybCcsXG4gICAgcmVzZXQ6ICdyZXNldCcsXG4gICAgc2F2ZVNldHRpbmdzOiAnc2F2ZVNldHRpbmdzJyxcbiAgICBjbG9zZVBsdWdpbjogJ2Nsb3NlUGx1Z2luJ1xufTtcbiIsIi8qIGlzdGFuYnVsIGlnbm9yZSBmaWxlICovXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgdWk6IHtcbiAgICAgICAgZ2VuZXJhbFNldHRpbmdzOiB7XG4gICAgICAgICAgICB3aWR0aDogNTUwLFxuICAgICAgICAgICAgaGVpZ2h0OiA2ODVcbiAgICAgICAgfSxcbiAgICAgICAgZXhwb3J0OiB7XG4gICAgICAgICAgICB3aWR0aDogNTUwLFxuICAgICAgICAgICAgaGVpZ2h0OiA0MjBcbiAgICAgICAgfSxcbiAgICAgICAgdXJsRXhwb3J0OiB7XG4gICAgICAgICAgICB3aWR0aDogNTUwLFxuICAgICAgICAgICAgaGVpZ2h0OiA1NzVcbiAgICAgICAgfVxuICAgIH0sXG4gICAga2V5OiB7XG4gICAgICAgIGxhc3RWZXJzaW9uU2V0dGluZ3NPcGVuZWQ6ICdsYXN0VmVyc2lvblNldHRpbmdzT3BlbmVkJyxcbiAgICAgICAgZmlsZUlkOiAnZmlsZUlkJyxcbiAgICAgICAgc2V0dGluZ3M6ICdzZXR0aW5ncycsXG4gICAgICAgIGV4dGVuc2lvblBsdWdpbkRhdGE6ICdvcmcubHVrYXNvcHBlcm1hbm4uZmlnbWFEZXNpZ25Ub2tlbnMnLFxuICAgICAgICBleHRlbnNpb25GaWdtYVN0eWxlSWQ6ICdzdHlsZUlkJ1xuICAgIH0sXG4gICAgZXhjbHVzaW9uUHJlZml4RGVmYXVsdDogWydfJywgJy4nXSxcbiAgICBmaWxlRXh0ZW5zaW9uczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBsYWJlbDogJy50b2tlbnMuanNvbicsXG4gICAgICAgICAgICB2YWx1ZTogJy50b2tlbnMuanNvbidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbGFiZWw6ICcudG9rZW5zJyxcbiAgICAgICAgICAgIHZhbHVlOiAnLnRva2VucydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbGFiZWw6ICcuanNvbicsXG4gICAgICAgICAgICB2YWx1ZTogJy5qc29uJ1xuICAgICAgICB9XG4gICAgXVxufTtcbiIsImV4cG9ydCBjb25zdCBkZWZhdWx0U2V0dGluZ3MgPSB7XG4gICAgZmlsZW5hbWU6ICdkZXNpZ24tdG9rZW5zJyxcbiAgICBleHRlbnNpb246ICcudG9rZW5zLmpzb24nLFxuICAgIG5hbWVDb252ZXJzaW9uOiAnZGVmYXVsdCcsXG4gICAgdG9rZW5Gb3JtYXQ6ICdzdGFuZGFyZCcsXG4gICAgY29tcHJlc3Npb246IGZhbHNlLFxuICAgIHVybEpzb25Db21wcmVzc2lvbjogdHJ1ZSxcbiAgICBzZXJ2ZXJVcmw6IHVuZGVmaW5lZCxcbiAgICBldmVudFR5cGU6ICd1cGRhdGUtdG9rZW5zJyxcbiAgICBhY2Nlc3NUb2tlbjogdW5kZWZpbmVkLFxuICAgIGFjY2VwdEhlYWRlcjogJ2FwcGxpY2F0aW9uL3ZuZC5naXRodWIuZXZlcmVzdC1wcmV2aWV3K2pzb24nLFxuICAgIGF1dGhUeXBlOiAndG9rZW4nLFxuICAgIGV4Y2x1c2lvblByZWZpeDogJycsXG4gICAga2V5SW5OYW1lOiBmYWxzZSxcbiAgICBwcmVmaXhJbk5hbWU6IHRydWUsXG4gICAgcHJlZml4OiB7XG4gICAgICAgIGNvbG9yOiAnY29sb3InLFxuICAgICAgICBncmFkaWVudDogJ2dyYWRpZW50JyxcbiAgICAgICAgdHlwb2dyYXBoeTogJ3R5cG9ncmFwaHknLFxuICAgICAgICBmb250OiAnZm9udCcsXG4gICAgICAgIGVmZmVjdDogJ2VmZmVjdCcsXG4gICAgICAgIGdyaWQ6ICdncmlkJyxcbiAgICAgICAgYm9yZGVyOiAnYm9yZGVyLCBib3JkZXJzJyxcbiAgICAgICAgYnJlYWtwb2ludDogJ2JyZWFrcG9pbnQsIGJyZWFrcG9pbnRzJyxcbiAgICAgICAgcmFkaXVzOiAncmFkaXVzLCByYWRpaScsXG4gICAgICAgIHNpemU6ICdzaXplLCBzaXplcycsXG4gICAgICAgIHNwYWNpbmc6ICdzcGFjaW5nJyxcbiAgICAgICAgbW90aW9uOiAnbW90aW9uJ1xuICAgIH0sXG4gICAgZXhwb3J0czoge1xuICAgICAgICBjb2xvcjogdHJ1ZSxcbiAgICAgICAgZ3JhZGllbnQ6IHRydWUsXG4gICAgICAgIGZvbnQ6IHRydWUsXG4gICAgICAgIHR5cG9ncmFwaHk6IHRydWUsXG4gICAgICAgIGVmZmVjdDogdHJ1ZSxcbiAgICAgICAgZ3JpZDogdHJ1ZSxcbiAgICAgICAgYm9yZGVyOiB0cnVlLFxuICAgICAgICBicmVha3BvaW50OiB0cnVlLFxuICAgICAgICByYWRpdXM6IHRydWUsXG4gICAgICAgIHNpemU6IHRydWUsXG4gICAgICAgIHNwYWNpbmc6IHRydWUsXG4gICAgICAgIG1vdGlvbjogdHJ1ZVxuICAgIH1cbn07XG4iLCIvKiBpc3RhbmJ1bCBpZ25vcmUgZmlsZSAqL1xuZXhwb3J0IGNvbnN0IHRva2VuVHlwZXMgPSB7XG4gICAgY29sb3I6IHtcbiAgICAgICAgbGFiZWw6ICdDb2xvcnMnLFxuICAgICAgICBrZXk6ICdjb2xvcidcbiAgICB9LFxuICAgIGdyYWRpZW50OiB7XG4gICAgICAgIGxhYmVsOiAnR3JhZGllbnRzJyxcbiAgICAgICAga2V5OiAnZ3JhZGllbnQnXG4gICAgfSxcbiAgICBmb250OiB7XG4gICAgICAgIGxhYmVsOiAnRm9udCBTdHlsZXMnLFxuICAgICAgICBrZXk6ICdmb250J1xuICAgIH0sXG4gICAgdHlwb2dyYXBoeToge1xuICAgICAgICBsYWJlbDogJ1R5cG9ncmFwaHknLFxuICAgICAgICBrZXk6ICd0eXBvZ3JhcGh5JyxcbiAgICAgICAgZXhjbHVkZTogWydvcmlnaW5hbCddXG4gICAgfSxcbiAgICBlZmZlY3Q6IHtcbiAgICAgICAgbGFiZWw6ICdFZmZlY3RzJyxcbiAgICAgICAga2V5OiAnZWZmZWN0J1xuICAgIH0sXG4gICAgZ3JpZDoge1xuICAgICAgICBsYWJlbDogJ0dyaWRzJyxcbiAgICAgICAga2V5OiAnZ3JpZCdcbiAgICB9LFxuICAgIGJvcmRlcjoge1xuICAgICAgICBsYWJlbDogJ0JvcmRlcnMnLFxuICAgICAgICBrZXk6ICdib3JkZXInXG4gICAgfSxcbiAgICBicmVha3BvaW50OiB7XG4gICAgICAgIGxhYmVsOiAnQnJlYWtwb2ludHMnLFxuICAgICAgICBrZXk6ICdicmVha3BvaW50J1xuICAgIH0sXG4gICAgcmFkaXVzOiB7XG4gICAgICAgIGxhYmVsOiAnUmFkaWknLFxuICAgICAgICBrZXk6ICdyYWRpdXMnXG4gICAgfSxcbiAgICBzaXplOiB7XG4gICAgICAgIGxhYmVsOiAnU2l6ZXMnLFxuICAgICAgICBrZXk6ICdzaXplJ1xuICAgIH0sXG4gICAgc3BhY2luZzoge1xuICAgICAgICBsYWJlbDogJ1NwYWNpbmcnLFxuICAgICAgICBrZXk6ICdzcGFjaW5nJ1xuICAgIH0sXG4gICAgbW90aW9uOiB7XG4gICAgICAgIGxhYmVsOiAnTW90aW9uJyxcbiAgICAgICAga2V5OiAnbW90aW9uJ1xuICAgIH1cbn07XG4iLCJpbXBvcnQgcm91bmRXaXRoRGVjaW1hbHMgZnJvbSAnLi4vdXRpbGl0aWVzL3JvdW5kV2l0aERlY2ltYWxzJztcbmltcG9ydCB7IHRva2VuVHlwZXMgfSBmcm9tICdAY29uZmlnL3Rva2VuVHlwZXMnO1xuaW1wb3J0IHsgZmlsdGVyQnlQcmVmaXggfSBmcm9tICcuL2V4dHJhY3RVdGlsaXRpZXMnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICdAY29uZmlnL2NvbmZpZyc7XG5jb25zdCBzdHJva2VKb2lucyA9IHtcbiAgICBNSVRFUjogJ21pdGVyJyxcbiAgICBCRVZFTDogJ2JldmVsJyxcbiAgICBST1VORDogJ3JvdW5kJ1xufTtcbmNvbnN0IHN0cm9rZUFsaWducyA9IHtcbiAgICBDRU5URVI6ICdjZW50ZXInLFxuICAgIElOU0lERTogJ2luc2lkZScsXG4gICAgT1VUU0lERTogJ291dHNpZGUnXG59O1xuY29uc3QgZXh0cmFjdEJvcmRlcnMgPSAodG9rZW5Ob2RlcywgcHJlZml4QXJyYXkpID0+IHtcbiAgICAvLyByZXR1cm4gYXMgb2JqZWN0XG4gICAgcmV0dXJuIHRva2VuTm9kZXMuZmlsdGVyKGZpbHRlckJ5UHJlZml4KHByZWZpeEFycmF5KSlcbiAgICAgICAgLy8gcmVtb3ZlIG5vZGVzIHdpdGggbm8gYm9yZGVyIHByb3BlcnR5XG4gICAgICAgIC5maWx0ZXIobm9kZSA9PiBub2RlLnN0cm9rZXMubGVuZ3RoID4gMClcbiAgICAgICAgLy8gY29udmVydCBib3JkZXJzXG4gICAgICAgIC5tYXAobm9kZSA9PiAoe1xuICAgICAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgICAgIGNhdGVnb3J5OiAnYm9yZGVyJyxcbiAgICAgICAgZXhwb3J0S2V5OiB0b2tlblR5cGVzLmJvcmRlci5rZXksXG4gICAgICAgIGRlc2NyaXB0aW9uOiBub2RlLmRlc2NyaXB0aW9uIHx8IG51bGwsXG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgc3Ryb2tlQWxpZ246IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogc3Ryb2tlQWxpZ25zW25vZGUuc3Ryb2tlQWxpZ25dLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGFzaFBhdHRlcm46IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogWy4uLm5vZGUuZGFzaFBhdHRlcm5dLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3Ryb2tlQ2FwOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6ICgodHlwZW9mIG5vZGUuc3Ryb2tlQ2FwID09PSAnc3RyaW5nJykgPyBub2RlLnN0cm9rZUNhcC50b0xvd2VyQ2FzZSgpIDogJ21peGVkJyksXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdHJva2VKb2luOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHN0cm9rZUpvaW5zW25vZGUuc3Ryb2tlSm9pbl0sXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdHJva2VNaXRlckxpbWl0OiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKG5vZGUuc3Ryb2tlTWl0ZXJMaW1pdCksXG4gICAgICAgICAgICAgICAgdW5pdDogJ2RlZ3JlZScsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBzdHJva2VTdHlsZUlkOiB7XG4gICAgICAgICAgICAvLyAgIHZhbHVlOiBub2RlLnN0cm9rZVN0eWxlSWRcbiAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICBzdHJva2VXZWlnaHQ6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbm9kZS5zdHJva2VXZWlnaHQsXG4gICAgICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0cm9rZToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLnN0cm9rZXNbMF0sXG4gICAgICAgICAgICAgICAgdHlwZTogJ2NvbG9yJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBleHRlbnNpb25zOiB7XG4gICAgICAgICAgICBbY29uZmlnLmtleS5leHRlbnNpb25QbHVnaW5EYXRhXToge1xuICAgICAgICAgICAgICAgIGV4cG9ydEtleTogdG9rZW5UeXBlcy5ib3JkZXIua2V5XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZXh0cmFjdEJvcmRlcnM7XG4iLCJpbXBvcnQgeyB0b2tlblR5cGVzIH0gZnJvbSAnQGNvbmZpZy90b2tlblR5cGVzJztcbmltcG9ydCByb3VuZFdpdGhEZWNpbWFscyBmcm9tICcuLi91dGlsaXRpZXMvcm91bmRXaXRoRGVjaW1hbHMnO1xuaW1wb3J0IHsgZmlsdGVyQnlQcmVmaXggfSBmcm9tICcuL2V4dHJhY3RVdGlsaXRpZXMnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICdAY29uZmlnL2NvbmZpZyc7XG5jb25zdCBleHRyYWN0QnJlYWtwb2ludHMgPSAodG9rZW5Ob2RlcywgcHJlZml4QXJyYXkpID0+IHtcbiAgICAvLyByZXR1cm4gYXMgb2JqZWN0XG4gICAgcmV0dXJuIHRva2VuTm9kZXMuZmlsdGVyKGZpbHRlckJ5UHJlZml4KHByZWZpeEFycmF5KSkubWFwKG5vZGUgPT4gKHtcbiAgICAgICAgbmFtZTogbm9kZS5uYW1lLFxuICAgICAgICBjYXRlZ29yeTogJ2JyZWFrcG9pbnQnLFxuICAgICAgICBleHBvcnRLZXk6IHRva2VuVHlwZXMuYnJlYWtwb2ludC5rZXksXG4gICAgICAgIGRlc2NyaXB0aW9uOiBub2RlLmRlc2NyaXB0aW9uIHx8IG51bGwsXG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgd2lkdGg6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMobm9kZS53aWR0aCwgMiksXG4gICAgICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhlaWdodDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLmhlaWdodCwgMiksXG4gICAgICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBleHRlbnNpb25zOiB7XG4gICAgICAgICAgICBbY29uZmlnLmtleS5leHRlbnNpb25QbHVnaW5EYXRhXToge1xuICAgICAgICAgICAgICAgIGV4cG9ydEtleTogdG9rZW5UeXBlcy5icmVha3BvaW50LmtleVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3RCcmVha3BvaW50cztcbiIsImltcG9ydCB7IHRva2VuVHlwZXMgfSBmcm9tICdAY29uZmlnL3Rva2VuVHlwZXMnO1xuaW1wb3J0IHsgY29udmVydFBhaW50VG9SZ2JhLCByb3VuZFJnYmEgfSBmcm9tICcuLi91dGlsaXRpZXMvY29udmVydENvbG9yJztcbmltcG9ydCByb3VuZFdpdGhEZWNpbWFscyBmcm9tICcuLi91dGlsaXRpZXMvcm91bmRXaXRoRGVjaW1hbHMnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICdAY29uZmlnL2NvbmZpZyc7XG5jb25zdCBncmFkaWVudFR5cGUgPSB7XG4gICAgR1JBRElFTlRfTElORUFSOiAnbGluZWFyJyxcbiAgICBHUkFESUVOVF9SQURJQUw6ICdyYWRpYWwnLFxuICAgIEdSQURJRU5UX0FOR1VMQVI6ICdhbmd1bGFyJyxcbiAgICBHUkFESUVOVF9ESUFNT05EOiAnZGlhbW9uZCdcbn07XG5jb25zdCBpc0dyYWRpZW50ID0gKHBhaW50KSA9PiBbJ0dSQURJRU5UX0xJTkVBUicsICdHUkFESUVOVF9SQURJQUwnLCAnR1JBRElFTlRfQU5HVUxBUicsICdHUkFESUVOVF9ESUFNT05EJ10uaW5jbHVkZXMocGFpbnQudHlwZSk7XG5jb25zdCByb3RhdGlvbkZyb21NYXRyaXggPSAoW1t4MSwgeTFdLCBbeDIsIHkyXV0pID0+IHtcbiAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yNDkwOTU4Ni9maW5kLXJvdGF0aW9uLWFuZ2xlLWZvci1hZmZpbmUtdHJhbnNmb3JtXG4gICAgY29uc3QgYW5nbGUgPSBNYXRoLmF0YW4yKHkyIC0geTEsIHgyIC0geDEpICogKDE4MC4wIC8gTWF0aC5QSSkgKyAzMTU7XG4gICAgcmV0dXJuIGFuZ2xlID4gMzYwID8gYW5nbGUgLSAzNjAgOiBhbmdsZTtcbn07XG5jb25zdCBleHRyYWN0RmlsbHMgPSAocGFpbnQpID0+IHtcbiAgICBpZiAocGFpbnQudHlwZSA9PT0gJ1NPTElEJykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmlsbDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBjb252ZXJ0UGFpbnRUb1JnYmEocGFpbnQpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdjb2xvcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgaWYgKFsnR1JBRElFTlRfTElORUFSJywgJ0dSQURJRU5UX1JBRElBTCcsICdHUkFESUVOVF9BTkdVTEFSJywgJ0dSQURJRU5UX0RJQU1PTkQnXS5pbmNsdWRlcyhwYWludC50eXBlKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ3JhZGllbnRUeXBlOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGdyYWRpZW50VHlwZVtwYWludC50eXBlXSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJvdGF0aW9uOiB7XG4gICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjQ5MDk1ODYvZmluZC1yb3RhdGlvbi1hbmdsZS1mb3ItYWZmaW5lLXRyYW5zZm9ybVxuICAgICAgICAgICAgICAgIHZhbHVlOiByb3RhdGlvbkZyb21NYXRyaXgocGFpbnQuZ3JhZGllbnRUcmFuc2Zvcm0pLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdkZWdyZWUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RvcHM6IHBhaW50LmdyYWRpZW50U3RvcHMubWFwKHN0b3AgPT4gKHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMoc3RvcC5wb3NpdGlvbiksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb2xvcjoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRSZ2JhKHN0b3AuY29sb3IpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgb3BhY2l0eToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhwYWludC5vcGFjaXR5KSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICAvLyByZXR1cm4gbnVsbCBpZiBubyBtYXRjaGluZyB0eXBlXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICByZXR1cm4gbnVsbDtcbn07XG5jb25zdCBleHRyYWN0Q29sb3JzID0gKHRva2VuTm9kZXMsIHByZWZpeEFycmF5KSA9PiB7XG4gICAgLy8gZ2V0IGFsbCBwYWludCBzdHlsZXNcbiAgICByZXR1cm4gdG9rZW5Ob2Rlc1xuICAgICAgICAvLyByZW1vdmUgaW1hZ2VzIGZpbGxzIGZyb20gdG9rZW5zXG4gICAgICAgIC5tYXAobm9kZSA9PiB7XG4gICAgICAgIG5vZGUucGFpbnRzID0gbm9kZS5wYWludHMuZmlsdGVyKHBhaW50ID0+IHBhaW50LnR5cGUgIT09ICdJTUFHRScpO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9KVxuICAgICAgICAvLyByZW1vdmUgdG9rZW5zIHdpdGggbm8gZmlsbFxuICAgICAgICAuZmlsdGVyKG5vZGUgPT4gbm9kZS5wYWludHMubGVuZ3RoID4gMClcbiAgICAgICAgLy8gdHJhbnNmb3JtIHN0eWxlXG4gICAgICAgIC5tYXAobm9kZSA9PiAoe1xuICAgICAgICBuYW1lOiBgJHtpc0dyYWRpZW50KG5vZGUucGFpbnRzWzBdKSA/IHByZWZpeEFycmF5LmdyYWRpZW50WzBdIDogcHJlZml4QXJyYXkuY29sb3JbMF19LyR7bm9kZS5uYW1lfWAsXG4gICAgICAgIGNhdGVnb3J5OiBpc0dyYWRpZW50KG5vZGUucGFpbnRzWzBdKSA/ICdncmFkaWVudCcgOiAnY29sb3InLFxuICAgICAgICBleHBvcnRLZXk6IChpc0dyYWRpZW50KG5vZGUucGFpbnRzWzBdKSA/IHRva2VuVHlwZXMuZ3JhZGllbnQua2V5IDogdG9rZW5UeXBlcy5jb2xvci5rZXkpLFxuICAgICAgICBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgICB2YWx1ZXM6IG5vZGUucGFpbnRzLm1hcChwYWludCA9PiBleHRyYWN0RmlsbHMocGFpbnQpKSxcbiAgICAgICAgZXh0ZW5zaW9uczoge1xuICAgICAgICAgICAgW2NvbmZpZy5rZXkuZXh0ZW5zaW9uUGx1Z2luRGF0YV06IHtcbiAgICAgICAgICAgICAgICBbY29uZmlnLmtleS5leHRlbnNpb25GaWdtYVN0eWxlSWRdOiBub2RlLmlkLFxuICAgICAgICAgICAgICAgIGV4cG9ydEtleTogKGlzR3JhZGllbnQobm9kZS5wYWludHNbMF0pID8gdG9rZW5UeXBlcy5ncmFkaWVudC5rZXkgOiB0b2tlblR5cGVzLmNvbG9yLmtleSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0Q29sb3JzO1xuIiwiaW1wb3J0IHsgdG9rZW5UeXBlcyB9IGZyb20gJ0Bjb25maWcvdG9rZW5UeXBlcyc7XG5pbXBvcnQgeyByb3VuZFJnYmEgfSBmcm9tICcuLi91dGlsaXRpZXMvY29udmVydENvbG9yJztcbmltcG9ydCBjb25maWcgZnJvbSAnQGNvbmZpZy9jb25maWcnO1xuY29uc3QgZWZmZWN0VHlwZSA9IHtcbiAgICBMQVlFUl9CTFVSOiAnbGF5ZXJCbHVyJyxcbiAgICBCQUNLR1JPVU5EX0JMVVI6ICdiYWNrZ3JvdW5kQmx1cicsXG4gICAgRFJPUF9TSEFET1c6ICdkcm9wU2hhZG93JyxcbiAgICBJTk5FUl9TSEFET1c6ICdpbm5lclNoYWRvdydcbn07XG5jb25zdCBibHVyVmFsdWVzID0gKGVmZmVjdCkgPT4gKHtcbiAgICBlZmZlY3RUeXBlOiB7XG4gICAgICAgIHZhbHVlOiBlZmZlY3RUeXBlW2VmZmVjdC50eXBlXSxcbiAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICB9LFxuICAgIHJhZGl1czoge1xuICAgICAgICB2YWx1ZTogZWZmZWN0LnJhZGl1cyxcbiAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICB9XG59KTtcbmNvbnN0IHNoYWRvd1ZhbHVlcyA9IGVmZmVjdCA9PiAoe1xuICAgIGVmZmVjdFR5cGU6IHtcbiAgICAgICAgdmFsdWU6IGVmZmVjdFR5cGVbZWZmZWN0LnR5cGVdLFxuICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgIH0sXG4gICAgcmFkaXVzOiB7XG4gICAgICAgIHZhbHVlOiBlZmZlY3QucmFkaXVzLFxuICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgIH0sXG4gICAgY29sb3I6IHtcbiAgICAgICAgdmFsdWU6IHJvdW5kUmdiYShlZmZlY3QuY29sb3IpLFxuICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgfSxcbiAgICBvZmZzZXQ6IHtcbiAgICAgICAgeDoge1xuICAgICAgICAgICAgdmFsdWU6IGVmZmVjdC5vZmZzZXQueCxcbiAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICB5OiB7XG4gICAgICAgICAgICB2YWx1ZTogZWZmZWN0Lm9mZnNldC55LFxuICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHNwcmVhZDoge1xuICAgICAgICB2YWx1ZTogZWZmZWN0LnNwcmVhZCxcbiAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICB9XG59KTtcbmNvbnN0IGV4dHJhY3RFZmZlY3RzID0gKHRva2VuTm9kZXMsIHByZWZpeEFycmF5KSA9PiB7XG4gICAgLy8gZ2V0IGVmZmVjdCBzdHlsZXNcbiAgICByZXR1cm4gdG9rZW5Ob2Rlc1xuICAgICAgICAvLyByZW1vdmUgdG9rZW5zIHdpdGggbm8gZ3JpZFxuICAgICAgICAuZmlsdGVyKG5vZGUgPT4gbm9kZS5lZmZlY3RzLmxlbmd0aCA+IDApXG4gICAgICAgIC8vIGJ1aWxkXG4gICAgICAgIC5tYXAobm9kZSA9PiAoe1xuICAgICAgICBuYW1lOiBgJHtwcmVmaXhBcnJheVswXX0vJHtub2RlLm5hbWV9YCxcbiAgICAgICAgY2F0ZWdvcnk6ICdlZmZlY3QnLFxuICAgICAgICBleHBvcnRLZXk6IHRva2VuVHlwZXMuZWZmZWN0LmtleSxcbiAgICAgICAgZGVzY3JpcHRpb246IG5vZGUuZGVzY3JpcHRpb24gfHwgbnVsbCxcbiAgICAgICAgdmFsdWVzOiBub2RlLmVmZmVjdHMubWFwKChlZmZlY3QpID0+IGVmZmVjdC50eXBlID09PSAnTEFZRVJfQkxVUicgfHwgZWZmZWN0LnR5cGUgPT09ICdCQUNLR1JPVU5EX0JMVVInXG4gICAgICAgICAgICA/IGJsdXJWYWx1ZXMoZWZmZWN0KVxuICAgICAgICAgICAgOiBzaGFkb3dWYWx1ZXMoZWZmZWN0KSksXG4gICAgICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgICAgICAgIFtjb25maWcua2V5LmV4dGVuc2lvblBsdWdpbkRhdGFdOiB7XG4gICAgICAgICAgICAgICAgW2NvbmZpZy5rZXkuZXh0ZW5zaW9uRmlnbWFTdHlsZUlkXTogbm9kZS5pZCxcbiAgICAgICAgICAgICAgICBleHBvcnRLZXk6IHRva2VuVHlwZXMuZWZmZWN0LmtleVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3RFZmZlY3RzO1xuIiwiaW1wb3J0IHsgdG9rZW5UeXBlcyB9IGZyb20gJ0Bjb25maWcvdG9rZW5UeXBlcyc7XG5pbXBvcnQgcm91bmRXaXRoRGVjaW1hbHMgZnJvbSAnLi4vdXRpbGl0aWVzL3JvdW5kV2l0aERlY2ltYWxzJztcbmltcG9ydCBjb25maWcgZnJvbSAnQGNvbmZpZy9jb25maWcnO1xuY29uc3QgdGV4dERlY29yYXRpb25zID0ge1xuICAgIE5PTkU6ICdub25lJyxcbiAgICBVTkRFUkxJTkU6ICd1bmRlcmxpbmUnLFxuICAgIFNUUklLRVRIUk9VR0g6ICdsaW5lLXRocm91Z2gnXG59O1xuY29uc3QgdGV4dENhc2VzID0ge1xuICAgIE9SSUdJTkFMOiAnbm9uZScsXG4gICAgVVBQRVI6ICd1cHBlcmNhc2UnLFxuICAgIExPV0VSOiAnbG93ZXJjYXNlJyxcbiAgICBUSVRMRTogJ2NhcGl0YWxpemUnXG59O1xuY29uc3QgZm9udFdlaWdodHMgPSB7XG4gICAgdGhpbjogMTAwLFxuICAgIGV4dHJhbGlnaHQ6IDIwMCxcbiAgICB1bHRyYWxpZ2h0OiAyMDAsXG4gICAgZXh0cmFsZWljaHQ6IDIwMCxcbiAgICBsaWdodDogMzAwLFxuICAgIGxlaWNodDogMzAwLFxuICAgIG5vcm1hbDogNDAwLFxuICAgIHJlZ3VsYXI6IDQwMCxcbiAgICBidWNoOiA0MDAsXG4gICAgbWVkaXVtOiA1MDAsXG4gICAga3JhZWZ0aWc6IDUwMCxcbiAgICBrcsOkZnRpZzogNTAwLFxuICAgIHNlbWlib2xkOiA2MDAsXG4gICAgZGVtaWJvbGQ6IDYwMCxcbiAgICBoYWxiZmV0dDogNjAwLFxuICAgIGJvbGQ6IDcwMCxcbiAgICBkcmVpdmllcnRlbGZldHQ6IDcwMCxcbiAgICBleHRyYWJvbGQ6IDgwMCxcbiAgICB1bHRhYm9sZDogODAwLFxuICAgIGZldHQ6IDgwMCxcbiAgICBibGFjazogOTAwLFxuICAgIGhlYXZ5OiA5MDAsXG4gICAgc3VwZXI6IDkwMCxcbiAgICBleHRyYWZldHQ6IDkwMFxufTtcbmNvbnN0IGZvbnRTdHJldGNoID0ge1xuICAgIG5vcm1hbDogJ25vcm1hbCcsXG4gICAgY29uZGVuc2VkOiAnY29uZGVuc2VkJyxcbiAgICBleHBhbmRlZDogJ2V4cGFuZGVkJyxcbiAgICBleHRlbmRlZDogJ2V4cGFuZGVkJ1xufTtcbmNvbnN0IGZvbnRTdHlsZXMgPSB7XG4gICAgbm9ybWFsOiAnbm9ybWFsJyxcbiAgICBpdGFsaWM6ICdpdGFsaWMnLFxuICAgIGt1cnNpdjogJ2l0YWxpYycsXG4gICAgb2JsaXF1ZTogJ29ibGlxdWUnXG59O1xuY29uc3QgcGFyc2VGb250V2VpZ2h0ID0gKGZvbnRTdHlsZSkgPT4ge1xuICAgIGNvbnN0IHBhcnRzID0gZm9udFN0eWxlLnRvTG93ZXJDYXNlKCkuc3BsaXQoJyAnKTtcbiAgICBsZXQgd2VpZ2h0ID0gcGFydHNbMF07XG4gICAgLy8gbWVyZ2UgaWYgc3BhY2UgYWZ0ZXIgZXh0cmFcbiAgICBpZiAoWydleHRyYScsICd1bHRyYScsICdzZW1pJywgJ2RlbWknXS5pbmNsdWRlcyhwYXJ0c1swXSkgJiYgWydib2xkJywgJ2xpZ2h0J10uaW5jbHVkZXMocGFydHNbMV0pKSB7XG4gICAgICAgIHdlaWdodCA9IGAke3BhcnRzWzBdfSR7cGFydHNbMV19YDtcbiAgICB9XG4gICAgcmV0dXJuIGZvbnRXZWlnaHRzW3dlaWdodF0gfHwgNDAwO1xufTtcbmNvbnN0IHBhcnNlRm9udFN0cmV0Y2ggPSAoZm9udFN0eWxlKSA9PiB7XG4gICAgY29uc3QgcGFydHMgPSBmb250U3R5bGUudG9Mb3dlckNhc2UoKS5zcGxpdCgnICcpO1xuICAgIHJldHVybiBmb250U3RyZXRjaFtwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXV0gfHwgZm9udFN0cmV0Y2hbcGFydHNbcGFydHMubGVuZ3RoIC0gMl1dIHx8ICdub3JtYWwnO1xufTtcbmNvbnN0IHBhcnNlRm9udFN0eWxlID0gKGZvbnRTdHlsZSkgPT4ge1xuICAgIGNvbnN0IHBhcnQgPSBmb250U3R5bGUudG9Mb3dlckNhc2UoKS5zcGxpdCgnICcpLnBvcCgpO1xuICAgIHJldHVybiBmb250U3R5bGVzW3BhcnRdIHx8ICdub3JtYWwnO1xufTtcbmNvbnN0IGV4dHJhY3RGb250cyA9ICh0b2tlbk5vZGVzLCBwcmVmaXhBcnJheSkgPT4ge1xuICAgIC8vIGdldCByYXcgdGV4dCBzdHlsZXNcbiAgICByZXR1cm4gdG9rZW5Ob2Rlcy5tYXAobm9kZSA9PiAoe1xuICAgICAgICBuYW1lOiBgJHtwcmVmaXhBcnJheVswXX0vJHtub2RlLm5hbWV9YCxcbiAgICAgICAgY2F0ZWdvcnk6ICdmb250JyxcbiAgICAgICAgZXhwb3J0S2V5OiB0b2tlblR5cGVzLmZvbnQua2V5LFxuICAgICAgICBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB8fCB1bmRlZmluZWQsXG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgZm9udFNpemU6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbm9kZS5mb250U2l6ZSxcbiAgICAgICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGV4dERlY29yYXRpb246IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGV4dERlY29yYXRpb25zW25vZGUudGV4dERlY29yYXRpb25dLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9udEZhbWlseToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLmZvbnROYW1lLmZhbWlseSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcGFyc2VGb250V2VpZ2h0KG5vZGUuZm9udE5hbWUuc3R5bGUpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9udFN0eWxlOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHBhcnNlRm9udFN0eWxlKG5vZGUuZm9udE5hbWUuc3R5bGUpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9udFN0cmV0Y2g6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcGFyc2VGb250U3RyZXRjaChub2RlLmZvbnROYW1lLnN0eWxlKSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9mb250U3R5bGVPbGQ6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbm9kZS5mb250TmFtZS5zdHlsZSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMobm9kZS5sZXR0ZXJTcGFjaW5nLnZhbHVlKSxcbiAgICAgICAgICAgICAgICB1bml0OiBub2RlLmxldHRlclNwYWNpbmcudW5pdC50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGluZUhlaWdodDoge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMobm9kZS5saW5lSGVpZ2h0LnZhbHVlKSB8fCAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgICB1bml0OiBub2RlLmxpbmVIZWlnaHQudW5pdC50b0xvd2VyQ2FzZSgpID09PSAncGl4ZWxzJyA/ICdwaXhlbCcgOiBub2RlLmxpbmVIZWlnaHQudW5pdC50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgICAgIHR5cGU6IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobm9kZS5saW5lSGVpZ2h0LCAndmFsdWUnKSA/ICdudW1iZXInIDogJ3N0cmluZycpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGFyYWdyYXBoSW5kZW50OiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG5vZGUucGFyYWdyYXBoSW5kZW50LFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXJhZ3JhcGhTcGFjaW5nOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG5vZGUucGFyYWdyYXBoU3BhY2luZyxcbiAgICAgICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGV4dENhc2U6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGV4dENhc2VzW25vZGUudGV4dENhc2VdLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgICAgICAgIFtjb25maWcua2V5LmV4dGVuc2lvblBsdWdpbkRhdGFdOiB7XG4gICAgICAgICAgICAgICAgW2NvbmZpZy5rZXkuZXh0ZW5zaW9uRmlnbWFTdHlsZUlkXTogbm9kZS5pZCxcbiAgICAgICAgICAgICAgICBleHBvcnRLZXk6IHRva2VuVHlwZXMuZm9udC5rZXlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0Rm9udHM7XG4iLCJpbXBvcnQgeyB0b2tlblR5cGVzIH0gZnJvbSAnQGNvbmZpZy90b2tlblR5cGVzJztcbmltcG9ydCBjb25maWcgZnJvbSAnQGNvbmZpZy9jb25maWcnO1xuY29uc3QgZ3JpZFZhbHVlcyA9IChncmlkKSA9PiAoe1xuICAgIHBhdHRlcm46IHtcbiAgICAgICAgdmFsdWU6IGdyaWQucGF0dGVybi50b0xvd2VyQ2FzZSgpLFxuICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgIH0sXG4gICAgc2VjdGlvblNpemU6IHtcbiAgICAgICAgdmFsdWU6IGdyaWQuc2VjdGlvblNpemUsXG4gICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgfVxufSk7XG5jb25zdCBnZXRDb3VudCA9IGNvdW50ID0+IHtcbiAgICBpZiAoY291bnQgPT09IEluZmluaXR5KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogJ2F1dG8nLFxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IGNvdW50LFxuICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgIH07XG59O1xuY29uc3Qgcm93Q29sdW1uVmFsdWVzID0gKGdyaWQpID0+IChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7IHBhdHRlcm46IHtcbiAgICAgICAgdmFsdWU6IGdyaWQucGF0dGVybi50b0xvd2VyQ2FzZSgpLFxuICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgIH0gfSwgKGdyaWQuc2VjdGlvblNpemUgIT09IHVuZGVmaW5lZCAmJiB7XG4gICAgc2VjdGlvblNpemU6IHtcbiAgICAgICAgdmFsdWU6IGdyaWQuc2VjdGlvblNpemUsXG4gICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgfVxufSkpLCB7IGd1dHRlclNpemU6IHtcbiAgICAgICAgdmFsdWU6IGdyaWQuZ3V0dGVyU2l6ZSxcbiAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICB9LCBhbGlnbm1lbnQ6IHtcbiAgICAgICAgdmFsdWU6IGdyaWQuYWxpZ25tZW50LnRvTG93ZXJDYXNlKCksXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgfSwgY291bnQ6IGdldENvdW50KGdyaWQuY291bnQpIH0pLCAoZ3JpZC5vZmZzZXQgIT09IHVuZGVmaW5lZCAmJiB7XG4gICAgb2Zmc2V0OiB7XG4gICAgICAgIHZhbHVlOiBncmlkLm9mZnNldCxcbiAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICB9XG59KSkpO1xuY29uc3QgZXh0cmFjdEdyaWRzID0gKHRva2VuTm9kZXMsIHByZWZpeEFycmF5KSA9PiB7XG4gICAgLy8gZ2V0IGdyaWQgc3R5bGVzXG4gICAgcmV0dXJuIHRva2VuTm9kZXNcbiAgICAgICAgLy8gcmVtb3ZlIHRva2VucyB3aXRoIG5vIGdyaWRcbiAgICAgICAgLmZpbHRlcihub2RlID0+IG5vZGUubGF5b3V0R3JpZHMubGVuZ3RoID4gMClcbiAgICAgICAgLy8gYnVpbGRcbiAgICAgICAgLm1hcChub2RlID0+ICh7XG4gICAgICAgIG5hbWU6IGAke3ByZWZpeEFycmF5WzBdfS8ke25vZGUubmFtZX1gLFxuICAgICAgICBjYXRlZ29yeTogJ2dyaWQnLFxuICAgICAgICBleHBvcnRLZXk6IHRva2VuVHlwZXMuZ3JpZC5rZXksXG4gICAgICAgIGRlc2NyaXB0aW9uOiBub2RlLmRlc2NyaXB0aW9uIHx8IG51bGwsXG4gICAgICAgIHZhbHVlczogbm9kZS5sYXlvdXRHcmlkcy5tYXAoKGdyaWQpID0+IGdyaWQucGF0dGVybiA9PT0gJ0dSSUQnID8gZ3JpZFZhbHVlcyhncmlkKSA6IHJvd0NvbHVtblZhbHVlcyhncmlkKSksXG4gICAgICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgICAgICAgIFtjb25maWcua2V5LmV4dGVuc2lvblBsdWdpbkRhdGFdOiB7XG4gICAgICAgICAgICAgICAgW2NvbmZpZy5rZXkuZXh0ZW5zaW9uRmlnbWFTdHlsZUlkXTogbm9kZS5pZCxcbiAgICAgICAgICAgICAgICBleHBvcnRLZXk6IHRva2VuVHlwZXMuZ3JpZC5rZXlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0R3JpZHM7XG4iLCJpbXBvcnQgeyB0b2tlblR5cGVzIH0gZnJvbSAnQGNvbmZpZy90b2tlblR5cGVzJztcbmltcG9ydCB7IGZpbHRlckJ5UHJlZml4IH0gZnJvbSAnLi9leHRyYWN0VXRpbGl0aWVzJztcbmltcG9ydCBjb25maWcgZnJvbSAnQGNvbmZpZy9jb25maWcnO1xuY29uc3QgZGlyZWN0aW9uID0gKHRyYW5zaXRpb24pID0+IHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRyYW5zaXRpb24sICdkaXJlY3Rpb24nKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlyZWN0aW9uOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHRyYW5zaXRpb24uZGlyZWN0aW9uLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59O1xuY29uc3QgZWFzaW5ncyA9IHtcbiAgICBDVVNUT01fQ1VCSUNfQkVaSUVSOiB7fSxcbiAgICBMSU5FQVI6IHtcbiAgICAgICAgdHlwZTogJ2xpbmVhcicsXG4gICAgICAgIGVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXI6IHtcbiAgICAgICAgICAgIHgxOiAwLFxuICAgICAgICAgICAgeTE6IDAsXG4gICAgICAgICAgICB4MjogMSxcbiAgICAgICAgICAgIHkyOiAxXG4gICAgICAgIH1cbiAgICB9LFxuICAgIEVBU0VfSU46IHtcbiAgICAgICAgdHlwZTogJ2Vhc2UtaW4nLFxuICAgICAgICBlYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyOiB7XG4gICAgICAgICAgICB4MTogMC40MTk5OTk5ODY4ODY5NzgxNSxcbiAgICAgICAgICAgIHkxOiAwLFxuICAgICAgICAgICAgeDI6IDEsXG4gICAgICAgICAgICB5MjogMVxuICAgICAgICB9XG4gICAgfSxcbiAgICBFQVNFX09VVDoge1xuICAgICAgICB0eXBlOiAnZWFzZS1vdXQnLFxuICAgICAgICBlYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyOiB7XG4gICAgICAgICAgICB4MTogMCxcbiAgICAgICAgICAgIHkxOiAwLFxuICAgICAgICAgICAgeDI6IDAuNTc5OTk5OTgzMzEwNjk5NSxcbiAgICAgICAgICAgIHkyOiAxXG4gICAgICAgIH1cbiAgICB9LFxuICAgIEVBU0VfSU5fQU5EX09VVDoge1xuICAgICAgICB0eXBlOiAnZWFzZS1pbi1vdXQnLFxuICAgICAgICBlYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyOiB7XG4gICAgICAgICAgICB4MTogMC40MTk5OTk5ODY4ODY5NzgxNSxcbiAgICAgICAgICAgIHkxOiAwLFxuICAgICAgICAgICAgeDI6IDAuNTc5OTk5OTgzMzEwNjk5NSxcbiAgICAgICAgICAgIHkyOiAxXG4gICAgICAgIH1cbiAgICB9LFxuICAgIEVBU0VfSU5fQkFDSzoge1xuICAgICAgICB0eXBlOiAnZWFzZS1pbi1iYWNrJyxcbiAgICAgICAgZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllcjoge1xuICAgICAgICAgICAgeDE6IDAuMzAwMDAwMDExOTIwOTI4OTYsXG4gICAgICAgICAgICB5MTogLTAuMDUwMDAwMDAwNzQ1MDU4MDYsXG4gICAgICAgICAgICB4MjogMC42OTk5OTk5ODgwNzkwNzEsXG4gICAgICAgICAgICB5MjogLTAuNVxuICAgICAgICB9XG4gICAgfSxcbiAgICBFQVNFX09VVF9CQUNLOiB7XG4gICAgICAgIHR5cGU6ICdlYXNlLW91dC1iYWNrJyxcbiAgICAgICAgZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllcjoge1xuICAgICAgICAgICAgeDE6IDAuNDQ5OTk5OTg4MDc5MDcxMDQsXG4gICAgICAgICAgICB5MTogMS40NTAwMDAwNDc2ODM3MTU4LFxuICAgICAgICAgICAgeDI6IDAuODAwMDAwMDExOTIwOTI5LFxuICAgICAgICAgICAgeTI6IDFcbiAgICAgICAgfVxuICAgIH0sXG4gICAgRUFTRV9JTl9BTkRfT1VUX0JBQ0s6IHtcbiAgICAgICAgdHlwZTogJ2Vhc2UtaW4tb3V0LWJhY2snLFxuICAgICAgICBlYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyOiB7XG4gICAgICAgICAgICB4MTogMC42OTk5OTk5ODgwNzkwNzEsXG4gICAgICAgICAgICB5MTogLTAuNDAwMDAwMDA1OTYwNDY0NSxcbiAgICAgICAgICAgIHgyOiAwLjQwMDAwMDAwNTk2MDQ2NDUsXG4gICAgICAgICAgICB5MjogMS4zOTk5OTk5NzYxNTgxNDJcbiAgICAgICAgfVxuICAgIH1cbn07XG5jb25zdCBlYXNpbmcgPSAoZWFzaW5nKSA9PiB7XG4gICAgLy8gYWJvcnQgaWYgaW52YWxpZiBlYXNpbmcgdHlwZVxuICAgIGlmICghKCd0eXBlJyBpbiBlYXNpbmcpIHx8IGVhc2luZ3NbZWFzaW5nLnR5cGVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgLy8gcmV0dXJuIGN1c3RvbSBlYXNpbmdcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgaWYgKGVhc2luZy50eXBlID09PSAnQ1VTVE9NX0NVQklDX0JFWklFUicpIHtcbiAgICAgICAgZWFzaW5ncy5DVVNUT01fQ1VCSUNfQkVaSUVSID0ge1xuICAgICAgICAgICAgdHlwZTogJ2N1YmljLWJlemllcicsXG4gICAgICAgICAgICBlYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyOiB7XG4gICAgICAgICAgICAgICAgeDE6IGVhc2luZy5lYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyLngxLFxuICAgICAgICAgICAgICAgIHkxOiBlYXNpbmcuZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllci55MSxcbiAgICAgICAgICAgICAgICB4MjogZWFzaW5nLmVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXIueDIsXG4gICAgICAgICAgICAgICAgeTI6IGVhc2luZy5lYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyLnkyXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGVhc2luZzoge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgdmFsdWU6IGVhc2luZ3NbZWFzaW5nLnR5cGVdLnR5cGUsXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBlYXNpbmdGdW5jdGlvbjoge1xuICAgICAgICAgICAgeDE6IHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgdmFsdWU6IGVhc2luZ3NbZWFzaW5nLnR5cGVdLmVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXIueDEsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB4Mjoge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICB2YWx1ZTogZWFzaW5nc1tlYXNpbmcudHlwZV0uZWFzaW5nRnVuY3Rpb25DdWJpY0Jlemllci54MixcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHkxOiB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIHZhbHVlOiBlYXNpbmdzW2Vhc2luZy50eXBlXS5lYXNpbmdGdW5jdGlvbkN1YmljQmV6aWVyLnkxLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeTI6IHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgdmFsdWU6IGVhc2luZ3NbZWFzaW5nLnR5cGVdLmVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXIueTIsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59O1xuY29uc3QgZXh0cmFjdE1vdGlvbiA9ICh0b2tlbk5vZGVzLCBwcmVmaXhBcnJheSkgPT4ge1xuICAgIC8vIHJldHVybiBhcyBvYmplY3RcbiAgICByZXR1cm4gdG9rZW5Ob2Rlcy5maWx0ZXIoZmlsdGVyQnlQcmVmaXgocHJlZml4QXJyYXkpKVxuICAgICAgICAvLyBmaWx0ZXIgdG8gb25seSBpbmNsdWRlIGl0ZW1zIHdoaWNoIGhhdmUgYSB0cmFuc2l0aW9uIHByb3BlcnR5XG4gICAgICAgIC5maWx0ZXIobm9kZSA9PiB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKG5vZGUucmVhY3Rpb25zLmxlbmd0aCA+IDAgJiYgKChfYSA9IG5vZGUucmVhY3Rpb25zWzBdLmFjdGlvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnR5cGUpID09PSAnTk9ERScgJiYgbm9kZS5yZWFjdGlvbnNbMF0uYWN0aW9uLnRyYW5zaXRpb24gIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KVxuICAgICAgICAvLyByZXRyaWV2ZSB2YWx1ZXNcbiAgICAgICAgLm1hcCgobm9kZSkgPT4gKHtcbiAgICAgICAgbmFtZTogbm9kZS5uYW1lLFxuICAgICAgICBjYXRlZ29yeTogJ21vdGlvbicsXG4gICAgICAgIGV4cG9ydEtleTogdG9rZW5UeXBlcy5tb3Rpb24ua2V5LFxuICAgICAgICBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgICB2YWx1ZXM6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7IHRyYW5zaXRpb25UeXBlOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG5vZGUucmVhY3Rpb25zWzBdLmFjdGlvbi50cmFuc2l0aW9uLnR5cGUudG9Mb2NhbGVMb3dlckNhc2UoKSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfSwgZHVyYXRpb246IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogTWF0aC5yb3VuZCgobm9kZS5yZWFjdGlvbnNbMF0uYWN0aW9uLnRyYW5zaXRpb24uZHVyYXRpb24gKyBOdW1iZXIuRVBTSUxPTikgKiAxMDAwKSAvIDEwMDAsXG4gICAgICAgICAgICAgICAgdW5pdDogJ3MnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9IH0sIGVhc2luZyhub2RlLnJlYWN0aW9uc1swXS5hY3Rpb24udHJhbnNpdGlvbi5lYXNpbmcpKSwgZGlyZWN0aW9uKG5vZGUucmVhY3Rpb25zWzBdLmFjdGlvbi50cmFuc2l0aW9uKSksXG4gICAgICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgICAgICAgIFtjb25maWcua2V5LmV4dGVuc2lvblBsdWdpbkRhdGFdOiB7XG4gICAgICAgICAgICAgICAgZXhwb3J0S2V5OiB0b2tlblR5cGVzLm1vdGlvbi5rZXlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0TW90aW9uO1xuZXhwb3J0IGNvbnN0IF9fdGVzdGluZyA9IHtcbiAgICBlYXNpbmc6IGVhc2luZ1xufTtcbiIsImltcG9ydCB7IHRva2VuVHlwZXMgfSBmcm9tICdAY29uZmlnL3Rva2VuVHlwZXMnO1xuaW1wb3J0IHJvdW5kV2l0aERlY2ltYWxzIGZyb20gJy4uL3V0aWxpdGllcy9yb3VuZFdpdGhEZWNpbWFscyc7XG5pbXBvcnQgeyBmaWx0ZXJCeVByZWZpeCB9IGZyb20gJy4vZXh0cmFjdFV0aWxpdGllcyc7XG5pbXBvcnQgY29uZmlnIGZyb20gJ0Bjb25maWcvY29uZmlnJztcbmNvbnN0IGV4dHJhY3RSYWRpaSA9ICh0b2tlbk5vZGVzLCBwcmVmaXhBcnJheSkgPT4ge1xuICAgIC8vIGdldCB0aGUgdHlwZSBvZiB0aGUgY29ybmVyIHJhZGl1c1xuICAgIGNvbnN0IGdldFJhZGl1c1R5cGUgPSByYWRpdXMgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHJhZGl1cyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiAnc2luZ2xlJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ21peGVkJztcbiAgICB9O1xuICAgIC8vIGdldCB0aGUgaW5kaXZpZHVhbCByYWRpaVxuICAgIGNvbnN0IGdldFJhZGlpID0gKG5vZGUpID0+ICh7XG4gICAgICAgIHRvcExlZnQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiBub2RlLnRvcExlZnRSYWRpdXMgfHwgMCxcbiAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICB0b3BSaWdodDoge1xuICAgICAgICAgICAgdmFsdWU6IG5vZGUudG9wUmlnaHRSYWRpdXMgfHwgMCxcbiAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBib3R0b21SaWdodDoge1xuICAgICAgICAgICAgdmFsdWU6IG5vZGUuYm90dG9tUmlnaHRSYWRpdXMgfHwgMCxcbiAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBib3R0b21MZWZ0OiB7XG4gICAgICAgICAgICB2YWx1ZTogbm9kZS5ib3R0b21MZWZ0UmFkaXVzIHx8IDAsXG4gICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIHJldHVybiBhcyBvYmplY3RcbiAgICByZXR1cm4gdG9rZW5Ob2Rlcy5maWx0ZXIoZmlsdGVyQnlQcmVmaXgocHJlZml4QXJyYXkpKVxuICAgICAgICAubWFwKG5vZGUgPT4gKHtcbiAgICAgICAgbmFtZTogbm9kZS5uYW1lLFxuICAgICAgICBjYXRlZ29yeTogJ3JhZGl1cycsXG4gICAgICAgIGV4cG9ydEtleTogdG9rZW5UeXBlcy5yYWRpdXMua2V5LFxuICAgICAgICBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgICB2YWx1ZXM6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgKHR5cGVvZiBub2RlLmNvcm5lclJhZGl1cyA9PT0gJ251bWJlcicgJiYge1xuICAgICAgICAgICAgcmFkaXVzOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG5vZGUuY29ybmVyUmFkaXVzLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpLCB7IHJhZGl1c1R5cGU6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogZ2V0UmFkaXVzVHlwZShub2RlLmNvcm5lclJhZGl1cyksXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH0sIHJhZGlpOiBnZXRSYWRpaShub2RlKSwgc21vb3RoaW5nOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKG5vZGUuY29ybmVyU21vb3RoaW5nLCAyKSxcbiAgICAgICAgICAgICAgICBjb21tZW50OiAnUGVyY2VudCBhcyBkZWNpbWFsIGZyb20gMC4wIC0gMS4wJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSB9KSxcbiAgICAgICAgZXh0ZW5zaW9uczoge1xuICAgICAgICAgICAgW2NvbmZpZy5rZXkuZXh0ZW5zaW9uUGx1Z2luRGF0YV06IHtcbiAgICAgICAgICAgICAgICBleHBvcnRLZXk6IHRva2VuVHlwZXMucmFkaXVzLmtleVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3RSYWRpaTtcbiIsImltcG9ydCB7IHRva2VuVHlwZXMgfSBmcm9tICdAY29uZmlnL3Rva2VuVHlwZXMnO1xuaW1wb3J0IHJvdW5kV2l0aERlY2ltYWxzIGZyb20gJy4uL3V0aWxpdGllcy9yb3VuZFdpdGhEZWNpbWFscyc7XG5pbXBvcnQgeyBmaWx0ZXJCeVByZWZpeCB9IGZyb20gJy4vZXh0cmFjdFV0aWxpdGllcyc7XG5pbXBvcnQgY29uZmlnIGZyb20gJ0Bjb25maWcvY29uZmlnJztcbmNvbnN0IGV4dHJhY3RTaXplcyA9ICh0b2tlbk5vZGVzLCBwcmVmaXhBcnJheSkgPT4ge1xuICAgIC8vIHJldHVybiBhcyBvYmplY3RcbiAgICByZXR1cm4gdG9rZW5Ob2Rlcy5maWx0ZXIoZmlsdGVyQnlQcmVmaXgocHJlZml4QXJyYXkpKS5tYXAobm9kZSA9PiAoe1xuICAgICAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgICAgIGNhdGVnb3J5OiAnc2l6ZScsXG4gICAgICAgIGV4cG9ydEtleTogdG9rZW5UeXBlcy5zaXplLmtleSxcbiAgICAgICAgZGVzY3JpcHRpb246IG5vZGUuZGVzY3JpcHRpb24gfHwgbnVsbCxcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICB3aWR0aDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLndpZHRoLCAyKSxcbiAgICAgICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVpZ2h0OiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKG5vZGUuaGVpZ2h0LCAyKSxcbiAgICAgICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgICAgICAgIFtjb25maWcua2V5LmV4dGVuc2lvblBsdWdpbkRhdGFdOiB7XG4gICAgICAgICAgICAgICAgZXhwb3J0S2V5OiB0b2tlblR5cGVzLnNpemUua2V5XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZXh0cmFjdFNpemVzO1xuIiwiaW1wb3J0IHsgdG9rZW5UeXBlcyB9IGZyb20gJ0Bjb25maWcvdG9rZW5UeXBlcyc7XG5pbXBvcnQgcm91bmRXaXRoRGVjaW1hbHMgZnJvbSAnLi4vdXRpbGl0aWVzL3JvdW5kV2l0aERlY2ltYWxzJztcbmltcG9ydCB7IGZpbHRlckJ5UHJlZml4IH0gZnJvbSAnLi9leHRyYWN0VXRpbGl0aWVzJztcbmltcG9ydCBjb25maWcgZnJvbSAnQGNvbmZpZy9jb25maWcnO1xuY29uc3QgZXh0cmFjdFNwYWNpbmcgPSAodG9rZW5Ob2RlcywgcHJlZml4QXJyYXkpID0+IHtcbiAgICAvLyByZXR1cm4gYXMgb2JqZWN0XG4gICAgcmV0dXJuIHRva2VuTm9kZXMuZmlsdGVyKGZpbHRlckJ5UHJlZml4KHByZWZpeEFycmF5KSlcbiAgICAgICAgLm1hcChub2RlID0+ICh7XG4gICAgICAgIG5hbWU6IG5vZGUubmFtZSxcbiAgICAgICAgY2F0ZWdvcnk6ICdzcGFjaW5nJyxcbiAgICAgICAgZXhwb3J0S2V5OiB0b2tlblR5cGVzLnNwYWNpbmcua2V5LFxuICAgICAgICBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHRvcDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLnBhZGRpbmdUb3AsIDIpLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByaWdodDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLnBhZGRpbmdSaWdodCwgMiksXG4gICAgICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvdHRvbToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLnBhZGRpbmdCb3R0b20sIDIpLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWZ0OiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKG5vZGUucGFkZGluZ0xlZnQsIDIpLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXh0ZW5zaW9uczoge1xuICAgICAgICAgICAgW2NvbmZpZy5rZXkuZXh0ZW5zaW9uUGx1Z2luRGF0YV06IHtcbiAgICAgICAgICAgICAgICBleHBvcnRLZXk6IHRva2VuVHlwZXMuc3BhY2luZy5rZXlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0U3BhY2luZztcbiIsImV4cG9ydCBjb25zdCBmaWx0ZXJCeVByZWZpeCA9IChwcmVmaXhBcnJheSkgPT4gbm9kZSA9PiB7XG4gICAgcmV0dXJuIHByZWZpeEFycmF5LmluY2x1ZGVzKG5vZGUubmFtZS5zdWJzdHIoMCwgbm9kZS5uYW1lLmluZGV4T2YoJy8nKSkucmVwbGFjZSgvXFxzKy9nLCAnJykpO1xufTtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgZ2V0U2V0dGluZ3MsIHJlc2V0U2V0dGluZ3MsIHNldFNldHRpbmdzIH0gZnJvbSAnLi91dGlsaXRpZXMvc2V0dGluZ3MnO1xuaW1wb3J0IHsgZ2V0QWNjZXNzVG9rZW4sIHNldEFjY2Vzc1Rva2VuIH0gZnJvbSAnLi91dGlsaXRpZXMvYWNjZXNzVG9rZW4nO1xuaW1wb3J0IGNvbmZpZyBmcm9tICdAY29uZmlnL2NvbmZpZyc7XG5pbXBvcnQgeyBjb21tYW5kcyB9IGZyb20gJ0Bjb25maWcvY29tbWFuZHMnO1xuaW1wb3J0IGdldFZlcnNpb25EaWZmZXJlbmNlIGZyb20gJy4vdXRpbGl0aWVzL2dldFZlcnNpb25EaWZmZXJlbmNlJztcbmltcG9ydCBnZXRGaWxlSWQgZnJvbSAnLi91dGlsaXRpZXMvZ2V0RmlsZUlkJztcbmltcG9ydCB7IGV4cG9ydFJhd1Rva2VuQXJyYXkgfSBmcm9tICcuL3V0aWxpdGllcy9nZXRUb2tlbkpzb24nO1xuaW1wb3J0IHsgc3RyaW5naWZ5SnNvbiB9IGZyb20gJy4vdXRpbGl0aWVzL3N0cmluZ2lmeUpzb24nO1xuLy8gaW5pdGlhdGUgVUlcbmZpZ21hLnNob3dVSShfX2h0bWxfXywge1xuICAgIHZpc2libGU6IGZhbHNlXG59KTtcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gb3BlbiBVSVxuaWYgKFtjb21tYW5kcy5leHBvcnQsIGNvbW1hbmRzLnVybEV4cG9ydCwgY29tbWFuZHMuZ2VuZXJhbFNldHRpbmdzXS5pbmNsdWRlcyhmaWdtYS5jb21tYW5kKSkge1xuICAgIC8vIHdyYXAgaW4gZnVuY3Rpb24gYmVjYXVzZSBvZiBhc3luYyBjbGllbnQgU3RvcmFnZVxuICAgIGNvbnN0IG9wZW5VaSA9ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAvLyBHZXQgdGhlIHVzZXIgc2V0dGluZ3NcbiAgICAgICAgY29uc3QgdXNlclNldHRpbmdzID0gZ2V0U2V0dGluZ3MoKTtcbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IHZlcnNpb24gZGlmZmVyZW5jZXMgdG8gdGhlIGxhc3QgdGltZSB0aGUgcGx1Z2luIHdhcyBvcGVuZWRcbiAgICAgICAgY29uc3QgdmVyc2lvbkRpZmZlcmVuY2UgPSB5aWVsZCBnZXRWZXJzaW9uRGlmZmVyZW5jZShmaWdtYSk7XG4gICAgICAgIC8vIHJlc2l6ZSBVSSBpZiBuZWVkZWRcbiAgICAgICAgZmlnbWEudWkucmVzaXplKGNvbmZpZy51aVtmaWdtYS5jb21tYW5kXS53aWR0aCwgY29uZmlnLnVpW2ZpZ21hLmNvbW1hbmRdLmhlaWdodCk7XG4gICAgICAgIGlmICh2ZXJzaW9uRGlmZmVyZW5jZSAhPT0gdW5kZWZpbmVkICYmIHZlcnNpb25EaWZmZXJlbmNlICE9PSAncGF0Y2gnKSB7XG4gICAgICAgICAgICBmaWdtYS51aS5yZXNpemUoY29uZmlnLnVpW2ZpZ21hLmNvbW1hbmRdLndpZHRoLCBjb25maWcudWlbZmlnbWEuY29tbWFuZF0uaGVpZ2h0ICsgNjApO1xuICAgICAgICB9XG4gICAgICAgIC8vIHdyaXRlIHRva2VucyB0byBqc29uIGZpbGVcbiAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgY29tbWFuZDogZmlnbWEuY29tbWFuZCxcbiAgICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgICAgICBzZXR0aW5nczogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB1c2VyU2V0dGluZ3MpLCB7IGFjY2Vzc1Rva2VuOiB5aWVsZCBnZXRBY2Nlc3NUb2tlbihnZXRGaWxlSWQoZmlnbWEpKSB9KSxcbiAgICAgICAgICAgICAgICBkYXRhOiBzdHJpbmdpZnlKc29uKGV4cG9ydFJhd1Rva2VuQXJyYXkoZmlnbWEsIHVzZXJTZXR0aW5ncykpLFxuICAgICAgICAgICAgICAgIHZlcnNpb25EaWZmZXJlbmNlOiB2ZXJzaW9uRGlmZmVyZW5jZSxcbiAgICAgICAgICAgICAgICBtZXRhZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBmaWxlbmFtZTogZmlnbWEucm9vdC5uYW1lXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gcmVnaXN0ZXIgdGhlIHNldHRpbmdzIFVJXG4gICAgICAgIGZpZ21hLnVpLnNob3coKTtcbiAgICB9KTtcbiAgICAvLyBydW4gZnVuY3Rpb25cbiAgICBvcGVuVWkoKTtcbn1cbi8qKlxuICogT3BlbiBIZWxwXG4gKiBPcGVuIGdpdGh1YiBoZWxwIHBhZ2VcbiAqL1xuaWYgKGZpZ21hLmNvbW1hbmQgPT09IGNvbW1hbmRzLmhlbHApIHtcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgIGNvbW1hbmQ6IGNvbW1hbmRzLmhlbHAsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9sdWthc29wcGVybWFubi9kZXNpZ24tdG9rZW5zJ1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIE9wZW4gZGVtb1xuICovXG5pZiAoZmlnbWEuY29tbWFuZCA9PT0gY29tbWFuZHMuZGVtbykge1xuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgY29tbWFuZDogY29tbWFuZHMuZGVtbyxcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly93d3cuZmlnbWEuY29tL2ZpbGUvMk1RNzU5UjVrSnR6UW40cVNIdXFSNy9EZXNpZ24tVG9rZW5zLWZvci1GaWdtYT9ub2RlLWlkPTIzMSUzQTInXG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogUmVzZXQgc2V0dGluZ3NcbiAqL1xuaWYgKGZpZ21hLmNvbW1hbmQgPT09IGNvbW1hbmRzLnJlc2V0KSB7XG4gICAgcmVzZXRTZXR0aW5ncygpO1xuICAgIC8vIHNlbWQgbWVzc2FnZVxuICAgIGZpZ21hLm5vdGlmeSgn4pqZ77iPIFNldHRpbmdzIGhhdmUgYmVlbiByZXNldC4nKTtcbiAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xufVxuLyoqXG4gKiBSZWFjdCB0byBtZXNzYWdlc1xuICovXG5maWdtYS51aS5vbm1lc3NhZ2UgPSAobWVzc2FnZSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgY29uc3QgeyBjb21tYW5kLCBwYXlsb2FkIH0gPSBtZXNzYWdlO1xuICAgIC8qKlxuICAgICAqIG9uIGNsb3NlUGx1Z2luXG4gICAgICogY2xvc2UgcGx1Z2luIGFuZCBzaG93IG5vdGlmaWNhdGlvbiBpZiBhdmFpbGFibGVcbiAgICAgKi9cbiAgICBpZiAoY29tbWFuZCA9PT0gY29tbWFuZHMuY2xvc2VQbHVnaW4pIHtcbiAgICAgICAgLy8gc2hvdyBub3RpZmljYXRpb24gaWYgc2VuZFxuICAgICAgICBpZiAoKHBheWxvYWQgPT09IG51bGwgfHwgcGF5bG9hZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGF5bG9hZC5ub3RpZmljYXRpb24pICE9PSB1bmRlZmluZWQgJiYgKHBheWxvYWQgPT09IG51bGwgfHwgcGF5bG9hZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGF5bG9hZC5ub3RpZmljYXRpb24pICE9PSAnJykge1xuICAgICAgICAgICAgZmlnbWEubm90aWZ5KHBheWxvYWQubm90aWZpY2F0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjbG9zZSBwbHVnaW5cbiAgICAgICAgZmlnbWEudWkuaGlkZSgpO1xuICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBvbiBzYXZlU2V0dGluZ3NcbiAgICAgKiBzYXZlIHNldHRpbmdzLCBhY2Nlc3MgdG9rZW4gYW5kIGNsb3NlIHBsdWdpblxuICAgICAqL1xuICAgIGlmIChjb21tYW5kID09PSBjb21tYW5kcy5zYXZlU2V0dGluZ3MpIHtcbiAgICAgICAgLy8gc3RvcmUgc2V0dGluZ3NcbiAgICAgICAgc2V0U2V0dGluZ3MocGF5bG9hZC5zZXR0aW5ncyk7XG4gICAgICAgIC8vIGFjY2Vzc1Rva2VuXG4gICAgICAgIHlpZWxkIHNldEFjY2Vzc1Rva2VuKGdldEZpbGVJZChmaWdtYSksIHBheWxvYWQuYWNjZXNzVG9rZW4pO1xuICAgICAgICAvLyBjbG9zZSBwbHVnaW5cbiAgICAgICAgaWYgKHBheWxvYWQuY2xvc2VQbHVnaW4gJiYgcGF5bG9hZC5jbG9zZVBsdWdpbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG4vKipcbiAqIEBuYW1lIGdldEFjY2Vzc1Rva2VuXG4gKiBAZGVzY3JpcHRpb24gcmV0dXJucyB0aGUgYWNjZXNzIHRva2VuIGZvciB0aGUgY3VycmVudCBmaWxlIG9yIHVuZGVmaW5lZFxuICogQHBhcmFtIGZpbGVJZCB7c3RyaW5nfSDigJQgSUQgb2YgdGhlIGN1cnJlbnQgZmlsZVxuICovXG5jb25zdCBnZXRBY2Nlc3NUb2tlbiA9IChmaWxlSWQpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIC8vIGdldCBhbGwgYWNjZXNzIHRva2Vuc1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VucyA9IHlpZWxkIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoJ2FjY2Vzc1Rva2VucycpO1xuICAgIC8vIGlmIGFjY2VzcyB0b2tlbnMgb2JqZWN0IGlzIHByZXNlbnRcbiAgICBpZiAoYWNjZXNzVG9rZW5zICE9PSB1bmRlZmluZWQgJiYgYWNjZXNzVG9rZW5zIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSBhY2Nlc3MgdG9rZW4gZnJvbSB0aGUgY2FjaGVcbiAgICAgICAgY29uc3QgYWNjZXNzVG9rZW4gPSBhY2Nlc3NUb2tlbnNbZmlsZUlkXTtcbiAgICAgICAgLy8gcmV0dXJuIHRoZSBhY2Nlc3MgdG9rZW4gb3IgYW4gZW1wdHkgc3RyaW5nXG4gICAgICAgIHJldHVybiBhY2Nlc3NUb2tlbiB8fCAnJztcbiAgICB9XG4gICAgLy8gcmV0dXJuIGVtcHR5IHN0cmluZyBpZiBubyB0b2tlbiBpcyBzdG9yZWRcbiAgICByZXR1cm4gJyc7XG59KTtcbi8qKlxuICogQG5hbWUgc2V0QWNjZXNzVG9rZW5cbiAqIEBkZXNjcmlwdGlvbiBzdG9yZSB0aGUgYWNjZXNzIHRva2VuIGZvciB0aGUgY3VycmVudCBmaXZlbiBmaWxlIGluIHRoZSB1c2VyIGNsaWVudFN0b3JhZ2VcbiAqIEBwYXJhbSBmaWxlSWQge3N0cmluZ30g4oCUIElEIG9mIHRoZSBjdXJyZW50IGZpbGVcbiAqIEBwYXJhbSBmaWxlSWQge3N0cmluZ30g4oCUIGFjY2VzcyB0b2tlblxuICovXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuY29uc3Qgc2V0QWNjZXNzVG9rZW4gPSAoZmlsZUlkLCBhY2Nlc3NUb2tlbikgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgLy8gZ2V0IHRoZSBhY2Nlc3MgdG9rZW4gb2JqZWN0XG4gICAgY29uc3QgYWNjZXNzVG9rZW5zID0gKHlpZWxkIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoJ2FjY2Vzc1Rva2VucycpKSB8fCB7fTtcbiAgICAvLyBtZXJnZSB0b2tlbnNcbiAgICBjb25zdCBtZXJnZWRUb2tlbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGFjY2Vzc1Rva2VucyksIHsgW2ZpbGVJZF06IGFjY2Vzc1Rva2VuIH0pO1xuICAgIC8vIG1lcmdlIHRoZSBuZXcgdG9rZW4gaW50byB0aGUgb2JqZWN0XG4gICAgcmV0dXJuIHlpZWxkIGZpZ21hLmNsaWVudFN0b3JhZ2Uuc2V0QXN5bmMoJ2FjY2Vzc1Rva2VucycsIG1lcmdlZFRva2Vucyk7XG59KTtcbmV4cG9ydCB7IGdldEFjY2Vzc1Rva2VuLCBzZXRBY2Nlc3NUb2tlbiB9O1xuIiwiaW1wb3J0IGZpbHRlckJ5UHJvcGVydHlOYW1lIGZyb20gJy4vZmlsdGVyQnlOYW1lUHJvcGVydHknO1xuaW1wb3J0IGdldFBhaW50U3R5bGVzIGZyb20gJy4vZ2V0UGFpbnRTdHlsZXMnO1xuaW1wb3J0IGdldEdyaWRTdHlsZXMgZnJvbSAnLi9nZXRHcmlkU3R5bGVzJztcbmltcG9ydCBnZXRUb2tlbk5vZGVzIGZyb20gJy4vZ2V0VG9rZW5Ob2Rlcyc7XG5pbXBvcnQgZ2V0VGV4dFN0eWxlcyBmcm9tICcuL2dldFRleHRTdHlsZXMnO1xuaW1wb3J0IGdldEVmZmVjdFN0eWxlcyBmcm9tICcuL2dldEVmZmVjdFN0eWxlcyc7XG4vKipcbiAqIEBmdW5jdGlvbiBidWlsZEZpZ21hRGF0YSDigJMgcmV0dXJuIGFuIG9iamVjdCB3aXRoIGFsbCBzdHlsZXMgJiBmcmFtZSB0byB1c2UgZm9yIGV4cG9ydFxuICogQHBhcmFtIHtQbHVnaW5BUEl9IGZpZ21hIOKAlCB0aGUgZmlnbWEgUGx1Z2luQVBJIG9iamVjdFxuICogQHBhcmFtIG9wdGlvbnMg4oCTIG9wdGlvbnMgb2JqZWN0XG4gKi9cbmNvbnN0IGJ1aWxkRmlnbWFEYXRhID0gKGZpZ21hLCBzZXR0aW5ncykgPT4ge1xuICAgIC8vIHVzZSBzcHJlYWQgb3BlcmF0b3IgYmVjYXVzZSB0aGUgb3JpZ2luYWwgaXMgcmVhZE9ubHlcbiAgICBjb25zdCB0b2tlbkZyYW1lcyA9IGdldFRva2VuTm9kZXMoWy4uLmZpZ21hLnJvb3QuY2hpbGRyZW5dKTtcbiAgICAvLyBnZXQgdXNlciBleGNsdXNpb24gcHJlZml4ZXNcbiAgICBjb25zdCB1c2VyRXhjbHVzaW9uUHJlZml4ZXMgPSBzZXR0aW5ncy5leGNsdXNpb25QcmVmaXguc3BsaXQoJywnKS5tYXAoaXRlbSA9PiBpdGVtLnJlcGxhY2UoL1xccysvZywgJycpKTtcbiAgICAvLyBnZXQgZGF0YSBmcm9tIGZpZ21hXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW5GcmFtZXM6IHRva2VuRnJhbWVzLFxuICAgICAgICBwYWludFN0eWxlczogZ2V0UGFpbnRTdHlsZXMoZmlnbWEuZ2V0TG9jYWxQYWludFN0eWxlcygpKS5maWx0ZXIoaXRlbSA9PiBmaWx0ZXJCeVByb3BlcnR5TmFtZShpdGVtLCB1c2VyRXhjbHVzaW9uUHJlZml4ZXMpKSxcbiAgICAgICAgZ3JpZFN0eWxlczogZ2V0R3JpZFN0eWxlcyhmaWdtYS5nZXRMb2NhbEdyaWRTdHlsZXMoKSkuZmlsdGVyKGl0ZW0gPT4gZmlsdGVyQnlQcm9wZXJ0eU5hbWUoaXRlbSwgdXNlckV4Y2x1c2lvblByZWZpeGVzKSksXG4gICAgICAgIHRleHRTdHlsZXM6IGdldFRleHRTdHlsZXMoZmlnbWEuZ2V0TG9jYWxUZXh0U3R5bGVzKCkpLmZpbHRlcihpdGVtID0+IGZpbHRlckJ5UHJvcGVydHlOYW1lKGl0ZW0sIHVzZXJFeGNsdXNpb25QcmVmaXhlcykpLFxuICAgICAgICBlZmZlY3RTdHlsZXM6IGdldEVmZmVjdFN0eWxlcyhmaWdtYS5nZXRMb2NhbEVmZmVjdFN0eWxlcygpKS5maWx0ZXIoaXRlbSA9PiBmaWx0ZXJCeVByb3BlcnR5TmFtZShpdGVtLCB1c2VyRXhjbHVzaW9uUHJlZml4ZXMpKVxuICAgIH07XG59O1xuZXhwb3J0IGRlZmF1bHQgYnVpbGRGaWdtYURhdGE7XG4iLCJpbXBvcnQgcm91bmRXaXRoRGVjaW1hbHMgZnJvbSAnLi9yb3VuZFdpdGhEZWNpbWFscyc7XG5pbXBvcnQgeyBmcm9tUmF0aW8gfSBmcm9tICdAY3RybC90aW55Y29sb3InO1xuZXhwb3J0IGNvbnN0IHJvdW5kUmdiYSA9IChyZ2JhLCBvcGFjaXR5KSA9PiAoe1xuICAgIHI6IHJvdW5kV2l0aERlY2ltYWxzKHJnYmEuciAqIDI1NSwgMCksXG4gICAgZzogcm91bmRXaXRoRGVjaW1hbHMocmdiYS5nICogMjU1LCAwKSxcbiAgICBiOiByb3VuZFdpdGhEZWNpbWFscyhyZ2JhLmIgKiAyNTUsIDApLFxuICAgIGE6IHJvdW5kV2l0aERlY2ltYWxzKG9wYWNpdHkgfHwgcmdiYS5hIHx8IDEpXG59KTtcbmV4cG9ydCBjb25zdCBjb252ZXJ0UGFpbnRUb1JnYmEgPSAocGFpbnQpID0+IHtcbiAgICBpZiAocGFpbnQudHlwZSA9PT0gJ1NPTElEJyAmJiBwYWludC52aXNpYmxlID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiByb3VuZFJnYmEocGFpbnQuY29sb3IsIChwYWludC5vcGFjaXR5IHx8IG51bGwpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuZXhwb3J0IGNvbnN0IGNvbnZlcnRSZ2JhT2JqZWN0VG9TdHJpbmcgPSAocmdiYU9iamVjdCkgPT4gYHJnYmEoJHtyZ2JhT2JqZWN0LnJ9LCAke3JnYmFPYmplY3QuZ30sICR7cmdiYU9iamVjdC5ifSwgJHtyZ2JhT2JqZWN0LmF9KWA7XG5leHBvcnQgY29uc3QgcmdiYU9iamVjdFRvSGV4OCA9IChyZ2JhT2JqZWN0KSA9PiBmcm9tUmF0aW8ocmdiYU9iamVjdCkudG9IZXg4U3RyaW5nKCk7XG4iLCJpbXBvcnQgeyBjb252ZXJ0UGFpbnRUb1JnYmEgfSBmcm9tICcuL2NvbnZlcnRDb2xvcic7XG4vKipcbiAqIFJldHVybiBhbiBhcnJheSBvZiBzb2xpZCBzdHJva2UgY29sb3JzXG4gKi9cbmNvbnN0IGdldFNvbGlkU3Ryb2tlcyA9IChwYWludHMpID0+IHtcbiAgICAvLyBjbG9uZSB3aXRob3V0IHJlZmVyZW5jZVxuICAgIHJldHVybiBbLi4ucGFpbnRzXVxuICAgICAgICAubWFwKHBhaW50ID0+IGNvbnZlcnRQYWludFRvUmdiYShwYWludCkpXG4gICAgICAgIC5maWx0ZXIocGFpbnQgPT4gcGFpbnQgIT0gbnVsbCk7XG59O1xuLyoqXG4gKiBleHRyYWN0VG9rZW5Ob2RlVmFsdWVzXG4gKiBAcGFyYW0gbm9kZTogU2NlbmVOb2RlXG4gKiBAcmV0dXJucyBub2RlIG9iamVjdFxuICovXG5jb25zdCBleHRyYWN0VG9rZW5Ob2RlVmFsdWVzID0gKG5vZGUpID0+ICh7XG4gICAgbmFtZTogbm9kZS5uYW1lLFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB8fCB1bmRlZmluZWQsXG4gICAgYm90dG9tTGVmdFJhZGl1czogbm9kZS5ib3R0b21MZWZ0UmFkaXVzLFxuICAgIGJvdHRvbVJpZ2h0UmFkaXVzOiBub2RlLmJvdHRvbVJpZ2h0UmFkaXVzLFxuICAgIHRvcExlZnRSYWRpdXM6IG5vZGUudG9wTGVmdFJhZGl1cyxcbiAgICB0b3BSaWdodFJhZGl1czogbm9kZS50b3BSaWdodFJhZGl1cyxcbiAgICBjb3JuZXJSYWRpdXM6IG5vZGUuY29ybmVyUmFkaXVzIHx8IHVuZGVmaW5lZCxcbiAgICBjb3JuZXJTbW9vdGhpbmc6IG5vZGUuY29ybmVyU21vb3RoaW5nLFxuICAgIHN0cm9rZXM6IGdldFNvbGlkU3Ryb2tlcyhub2RlLnN0cm9rZXMpLFxuICAgIHN0cm9rZVdlaWdodDogbm9kZS5zdHJva2VXZWlnaHQsXG4gICAgc3Ryb2tlU3R5bGVJZDogbm9kZS5zdHJva2VTdHlsZUlkLFxuICAgIHN0cm9rZU1pdGVyTGltaXQ6IG5vZGUuc3Ryb2tlTWl0ZXJMaW1pdCxcbiAgICBzdHJva2VKb2luOiBub2RlLnN0cm9rZUpvaW4sXG4gICAgc3Ryb2tlQ2FwOiBub2RlLnN0cm9rZUNhcCxcbiAgICBkYXNoUGF0dGVybjogbm9kZS5kYXNoUGF0dGVybixcbiAgICBzdHJva2VBbGlnbjogbm9kZS5zdHJva2VBbGlnbixcbiAgICB3aWR0aDogbm9kZS53aWR0aCxcbiAgICBoZWlnaHQ6IG5vZGUuaGVpZ2h0LFxuICAgIHJlYWN0aW9uczogbm9kZS5yZWFjdGlvbnMgfHwgdW5kZWZpbmVkLFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwYWRkaW5nVG9wOiBub2RlLnBhZGRpbmdUb3AgfHwgMCxcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcGFkZGluZ1JpZ2h0OiBub2RlLnBhZGRpbmdSaWdodCB8fCAwLFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwYWRkaW5nQm90dG9tOiBub2RlLnBhZGRpbmdCb3R0b20gfHwgMCxcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcGFkZGluZ0xlZnQ6IG5vZGUucGFkZGluZ0xlZnQgfHwgMFxufSk7XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0VG9rZW5Ob2RlVmFsdWVzO1xuIiwiaW1wb3J0IGNvbmZpZyBmcm9tICdAY29uZmlnL2NvbmZpZyc7XG5jb25zdCBleGNsdXNpb25QcmVmaXggPSAoZXhjbHVzaW9uUHJlZml4U3RyaW5ncykgPT4ge1xuICAgIHJldHVybiBbXG4gICAgICAgIC4uLmNvbmZpZy5leGNsdXNpb25QcmVmaXhEZWZhdWx0LFxuICAgICAgICAuLi5leGNsdXNpb25QcmVmaXhTdHJpbmdzXG4gICAgXTtcbn07XG5jb25zdCBmaWx0ZXJCeVByb3BlcnR5TmFtZSA9IChvYmplY3QsIGV4Y2x1c2lvblByZWZpeFN0cmluZ3MpID0+ICFleGNsdXNpb25QcmVmaXgoZXhjbHVzaW9uUHJlZml4U3RyaW5ncykuaW5jbHVkZXMob2JqZWN0Lm5hbWUudHJpbSgpLnN1YnN0cigwLCAxKSk7XG5leHBvcnQgZGVmYXVsdCBmaWx0ZXJCeVByb3BlcnR5TmFtZTtcbiIsIi8qKlxuICogQGZ1bmN0aW9uIGdldEVmZmVjdFN0eWxlc1xuICogQHBhcmFtIHtBcnJheTxFZmZlY3RTdHlsZT59IHN0eWxlcyDigJMgdGhlIGVmZmVjdFN0eWxlIGZyb20gdGhlIGZpZ21hIGZpbGVcbiAqL1xuY29uc3QgZ2V0RWZmZWN0U3R5bGVzID0gKHN0eWxlcykgPT4ge1xuICAgIC8vIGluaXQgc3R5bGVBcnJheVxuICAgIGNvbnN0IHN0eWxlQXJyYXkgPSBbXTtcbiAgICAvLyBsb29wIHRocm91Z2ggRmlnbWEgc3R5bGVzIGFuZCBhZGQgdG8gYXJyYXlcbiAgICBzdHlsZXMuZm9yRWFjaChzdHlsZSA9PiB7XG4gICAgICAgIHN0eWxlQXJyYXkucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBzdHlsZS5uYW1lLFxuICAgICAgICAgICAgaWQ6IHN0eWxlLmlkLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHN0eWxlLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZWZmZWN0czogc3R5bGUuZWZmZWN0c1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyByZXR1cm4gYXJyYXlcbiAgICByZXR1cm4gc3R5bGVBcnJheTtcbn07XG5leHBvcnQgZGVmYXVsdCBnZXRFZmZlY3RTdHlsZXM7XG4iLCJpbXBvcnQgY29uZmlnIGZyb20gJ0Bjb25maWcvY29uZmlnJztcbmNvbnN0IGdldEZpbGVJZCA9IChmaWdtYSkgPT4ge1xuICAgIGxldCBmaWxlSWQgPSBmaWdtYS5yb290LmdldFBsdWdpbkRhdGEoY29uZmlnLmtleS5maWxlSWQpO1xuICAgIC8vIHNldCBwbHVnaW4gaWQgaWYgaXQgZG9lcyBub3QgZXhpc3RcbiAgICBpZiAoZmlsZUlkID09PSB1bmRlZmluZWQgfHwgZmlsZUlkID09PSAnJykge1xuICAgICAgICBmaWdtYS5yb290LnNldFBsdWdpbkRhdGEoY29uZmlnLmtleS5maWxlSWQsIGZpZ21hLnJvb3QubmFtZSArICcgJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAwMDApKTtcbiAgICAgICAgLy8gZ3JhYiBmaWxlIElEXG4gICAgICAgIGZpbGVJZCA9IGZpZ21hLnJvb3QuZ2V0UGx1Z2luRGF0YShjb25maWcua2V5LmZpbGVJZCk7XG4gICAgfVxuICAgIHJldHVybiBmaWxlSWQ7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0RmlsZUlkO1xuIiwiLyoqXG4gKiBAZnVuY3Rpb24gZ2V0R3JpZFN0eWxlc1xuICogQHBhcmFtIHtBcnJheX0gZ3JpZFN0eWxlcyDigJMgdGhlIGdyaWRTdHlsZXMgZnJvbSB0aGUgZmlnbWEgZmlsZVxuICovXG5jb25zdCBnZXRHcmlkU3R5bGVzID0gKHN0eWxlcykgPT4ge1xuICAgIC8vIGluaXQgc3R5bGVBcnJheVxuICAgIGNvbnN0IHN0eWxlQXJyYXkgPSBbXTtcbiAgICAvLyBsb29wIHRocm91Z2ggRmlnbWEgc3R5bGVzIGFuZCBhZGQgdG8gYXJyYXlcbiAgICBzdHlsZXMuZm9yRWFjaChzdHlsZSA9PiB7XG4gICAgICAgIHN0eWxlQXJyYXkucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBzdHlsZS5uYW1lLFxuICAgICAgICAgICAgaWQ6IHN0eWxlLmlkLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHN0eWxlLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgbGF5b3V0R3JpZHM6IHN0eWxlLmxheW91dEdyaWRzXG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIHJldHVybiBhcnJheVxuICAgIHJldHVybiBzdHlsZUFycmF5O1xufTtcbmV4cG9ydCBkZWZhdWx0IGdldEdyaWRTdHlsZXM7XG4iLCIvKipcbiAqIEBmdW5jdGlvbiBnZXRQYWludFN0eWxlc1xuICogQHBhcmFtIHtBcnJheX0gcGFpbnRTdHlsZXMg4oCTIHRoZSBwYWludFN0eWxlcyBmcm9tIHRoZSBmaWdtYSBmaWxlIChzb21laG93IHN0aWxsIGNvbm5lY3RlZClcbiAqL1xuY29uc3QgZ2V0UGFpbnRTdHlsZXMgPSAoc3R5bGVzKSA9PiB7XG4gICAgLy8gaW5pdCBzdHlsZUFycmF5XG4gICAgY29uc3Qgc3R5bGVBcnJheSA9IFtdO1xuICAgIC8vIGxvb3AgdGhyb3VnaCBGaWdtYSBzdHlsZXMgYW5kIGFkZCB0byBhcnJheVxuICAgIHN0eWxlcy5mb3JFYWNoKHN0eWxlID0+IHtcbiAgICAgICAgc3R5bGVBcnJheS5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IHN0eWxlLm5hbWUsXG4gICAgICAgICAgICBpZDogc3R5bGUuaWQsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogc3R5bGUuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBwYWludHM6IHN0eWxlLnBhaW50c1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyByZXR1cm4gYXJyYXlcbiAgICByZXR1cm4gc3R5bGVBcnJheTtcbn07XG5leHBvcnQgZGVmYXVsdCBnZXRQYWludFN0eWxlcztcbiIsIi8qKlxuICogQGZ1bmN0aW9uIGdldFRleHRTdHlsZXNcbiAqIEBwYXJhbSB7QXJyYXk8VGV4dFN0eWxlPn0gc3R5bGVzIOKAkyB0aGUgcGFpbnRTdHlsZXMgZnJvbSB0aGUgZmlnbWEgZmlsZSAoc29tZWhvdyBzdGlsbCBjb25uZWN0ZWQpXG4gKi9cbmNvbnN0IGdldFRleHRTdHlsZXMgPSAoc3R5bGVzKSA9PiB7XG4gICAgLy8gaW5pdCBzdHlsZUFycmF5XG4gICAgY29uc3Qgc3R5bGVBcnJheSA9IFtdO1xuICAgIC8vIGxvb3AgdGhyb3VnaCBGaWdtYSBzdHlsZXMgYW5kIGFkZCB0byBhcnJheVxuICAgIHN0eWxlcy5mb3JFYWNoKHN0eWxlID0+IHtcbiAgICAgICAgc3R5bGVBcnJheS5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IHN0eWxlLm5hbWUsXG4gICAgICAgICAgICBpZDogc3R5bGUuaWQsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogc3R5bGUuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBmb250U2l6ZTogc3R5bGUuZm9udFNpemUsXG4gICAgICAgICAgICB0ZXh0RGVjb3JhdGlvbjogc3R5bGUudGV4dERlY29yYXRpb24sXG4gICAgICAgICAgICBmb250TmFtZTogc3R5bGUuZm9udE5hbWUsXG4gICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiBzdHlsZS5sZXR0ZXJTcGFjaW5nLFxuICAgICAgICAgICAgbGluZUhlaWdodDogc3R5bGUubGluZUhlaWdodCxcbiAgICAgICAgICAgIHBhcmFncmFwaEluZGVudDogc3R5bGUucGFyYWdyYXBoSW5kZW50LFxuICAgICAgICAgICAgcGFyYWdyYXBoU3BhY2luZzogc3R5bGUucGFyYWdyYXBoU3BhY2luZyxcbiAgICAgICAgICAgIHRleHRDYXNlOiBzdHlsZS50ZXh0Q2FzZVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyByZXR1cm4gYXJyYXlcbiAgICByZXR1cm4gc3R5bGVBcnJheTtcbn07XG5leHBvcnQgZGVmYXVsdCBnZXRUZXh0U3R5bGVzO1xuIiwiaW1wb3J0IGV4dHJhY3RDb2xvcnMgZnJvbSAnLi4vZXh0cmFjdG9yL2V4dHJhY3RDb2xvcnMnO1xuaW1wb3J0IGV4dHJhY3RHcmlkcyBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdEdyaWRzJztcbmltcG9ydCBleHRyYWN0Rm9udHMgZnJvbSAnLi4vZXh0cmFjdG9yL2V4dHJhY3RGb250cyc7XG5pbXBvcnQgZXh0cmFjdEVmZmVjdHMgZnJvbSAnLi4vZXh0cmFjdG9yL2V4dHJhY3RFZmZlY3RzJztcbmltcG9ydCBleHRyYWN0TW90aW9uIGZyb20gJy4uL2V4dHJhY3Rvci9leHRyYWN0TW90aW9uJztcbmltcG9ydCBleHRyYWN0U2l6ZXMgZnJvbSAnLi4vZXh0cmFjdG9yL2V4dHJhY3RTaXplcyc7XG5pbXBvcnQgZXh0cmFjdFNwYWNpbmcgZnJvbSAnLi4vZXh0cmFjdG9yL2V4dHJhY3RTcGFjaW5nJztcbmltcG9ydCBleHRyYWN0Qm9yZGVycyBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdEJvcmRlcnMnO1xuaW1wb3J0IGV4dHJhY3RSYWRpaSBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdFJhZGlpJztcbmltcG9ydCBleHRyYWN0QnJlYWtwb2ludHMgZnJvbSAnLi4vZXh0cmFjdG9yL2V4dHJhY3RCcmVha3BvaW50cyc7XG5pbXBvcnQgYnVpbGRGaWdtYURhdGEgZnJvbSAnLi9idWlsZEZpZ21hRGF0YSc7XG5jb25zdCBnZXRQcmVmaXhBcnJheSA9IChwcmVmaXhTdHJpbmcpID0+IHByZWZpeFN0cmluZy5zcGxpdCgnLCcpLm1hcChpdGVtID0+IGl0ZW0ucmVwbGFjZSgvXFxzKy9nLCAnJykpO1xuZXhwb3J0IGNvbnN0IGV4cG9ydFJhd1Rva2VuQXJyYXkgPSAoZmlnbWEsIHNldHRpbmdzKSA9PiB7XG4gICAgY29uc3QgZmlnbWFEYXRhID0gYnVpbGRGaWdtYURhdGEoZmlnbWEsIHNldHRpbmdzKTtcbiAgICAvLyBnZXQgdG9rZW5zXG4gICAgcmV0dXJuIFtcbiAgICAgICAgLi4uZXh0cmFjdFNpemVzKGZpZ21hRGF0YS50b2tlbkZyYW1lcywgZ2V0UHJlZml4QXJyYXkoc2V0dGluZ3MucHJlZml4LnNpemUpKSxcbiAgICAgICAgLi4uZXh0cmFjdEJyZWFrcG9pbnRzKGZpZ21hRGF0YS50b2tlbkZyYW1lcywgZ2V0UHJlZml4QXJyYXkoc2V0dGluZ3MucHJlZml4LmJyZWFrcG9pbnQpKSxcbiAgICAgICAgLi4uZXh0cmFjdFNwYWNpbmcoZmlnbWFEYXRhLnRva2VuRnJhbWVzLCBnZXRQcmVmaXhBcnJheShzZXR0aW5ncy5wcmVmaXguc3BhY2luZykpLFxuICAgICAgICAuLi5leHRyYWN0Qm9yZGVycyhmaWdtYURhdGEudG9rZW5GcmFtZXMsIGdldFByZWZpeEFycmF5KHNldHRpbmdzLnByZWZpeC5ib3JkZXIpKSxcbiAgICAgICAgLi4uZXh0cmFjdFJhZGlpKGZpZ21hRGF0YS50b2tlbkZyYW1lcywgZ2V0UHJlZml4QXJyYXkoc2V0dGluZ3MucHJlZml4LnJhZGl1cykpLFxuICAgICAgICAuLi5leHRyYWN0TW90aW9uKGZpZ21hRGF0YS50b2tlbkZyYW1lcywgZ2V0UHJlZml4QXJyYXkoc2V0dGluZ3MucHJlZml4Lm1vdGlvbikpLFxuICAgICAgICAuLi5leHRyYWN0Q29sb3JzKGZpZ21hRGF0YS5wYWludFN0eWxlcywgeyBjb2xvcjogZ2V0UHJlZml4QXJyYXkoc2V0dGluZ3MucHJlZml4LmNvbG9yKSwgZ3JhZGllbnQ6IGdldFByZWZpeEFycmF5KHNldHRpbmdzLnByZWZpeC5ncmFkaWVudCkgfSksXG4gICAgICAgIC4uLmV4dHJhY3RHcmlkcyhmaWdtYURhdGEuZ3JpZFN0eWxlcywgZ2V0UHJlZml4QXJyYXkoc2V0dGluZ3MucHJlZml4LmdyaWQpKSxcbiAgICAgICAgLi4uZXh0cmFjdEZvbnRzKGZpZ21hRGF0YS50ZXh0U3R5bGVzLCBnZXRQcmVmaXhBcnJheShzZXR0aW5ncy5wcmVmaXguZm9udCkpLFxuICAgICAgICAuLi5leHRyYWN0RWZmZWN0cyhmaWdtYURhdGEuZWZmZWN0U3R5bGVzLCBnZXRQcmVmaXhBcnJheShzZXR0aW5ncy5wcmVmaXguZWZmZWN0KSlcbiAgICBdO1xufTtcbiIsImltcG9ydCBleHRyYWN0VG9rZW5Ob2RlVmFsdWVzIGZyb20gJy4vZXh0cmFjdFRva2VuTm9kZVZhbHVlcyc7XG5pbXBvcnQgaXNUb2tlbk5vZGUgZnJvbSAnLi9pc1Rva2VuTm9kZSc7XG4vLyB0aGUgbmFtZSB0aGF0IHRva2VuIGZyYW1lcyBoYXZlXG5jb25zdCB0b2tlbkZyYW1lTmFtZSA9ICdfdG9rZW5zJztcbi8vIGNoZWNrIGlmIGEgZnJhbWUgaXMgYSBfdG9rZW4gZnJhbWVcbmNvbnN0IGlzVG9rZW5GcmFtZSA9IChub2RlKSA9PiBub2RlLnR5cGUgPT09ICdGUkFNRScgJiYgbm9kZS5uYW1lLnRyaW0oKS50b0xvd2VyQ2FzZSgpLnN1YnN0cigwLCB0b2tlbkZyYW1lTmFtZS5sZW5ndGgpID09PSB0b2tlbkZyYW1lTmFtZTtcbi8vIHJldHVybiBvbmx5IG5vZGVzIHRoYXQgYXJlIGZyYW1lc1xuY29uc3QgZ2V0RnJhbWVOb2RlcyA9IChub2RlcykgPT4gWy4uLm5vZGVzLm1hcChwYWdlID0+IHBhZ2UuZmluZENoaWxkcmVuKG5vZGUgPT4gaXNUb2tlbkZyYW1lKG5vZGUpKSkucmVkdWNlKChmbGF0dGVuLCBhcnIpID0+IFsuLi5mbGF0dGVuLCAuLi5hcnJdKV07XG4vKipcbiAqIGdldFZhcmlhbnROYW1lXG4gKiBjcmVhdGVzIHRoZSB2YXJpYW50IG5hbWUgb2YgdGhlIHBhcmVudCBhbmQgY2hpbGQgbmFtZVxuICovXG5jb25zdCBnZXRWYXJpYW50TmFtZSA9IChwYXJlbnROYW1lLCBjaGlsZE5hbWUpID0+IHtcbiAgICAvLyBzcGxpdCBpbnRvIGFycmF5XG4gICAgY2hpbGROYW1lID0gY2hpbGROYW1lLnNwbGl0KCcsJylcbiAgICAgICAgLy8gcmVtb3ZlIGhpZGRlbiBuYW1lc1xuICAgICAgICAuZmlsdGVyKHBhcnQgPT4gIVsnXycsICcuJ10uaW5jbHVkZXMocGFydC50cmltKCkuc3Vic3RyKDAsIDEpKSlcbiAgICAgICAgLy8gY2xlYW51cCBuYW1lcywgb25seSByZXR1cm4gdmFsdWUgcGFydFxuICAgICAgICAubWFwKHBhcnQgPT4gcGFydC5zcGxpdCgnPScpWzFdKVxuICAgICAgICAvLyBjb21iaW5lXG4gICAgICAgIC5qb2luKCcvJyk7XG4gICAgLy8gcmV0dXJuIGZ1bGwgbmFtZVxuICAgIHJldHVybiBgJHtwYXJlbnROYW1lfS8ke2NoaWxkTmFtZX1gO1xufTtcbi8qKlxuICogUmV0dXJucyBhbGwgZnJhbWVzIGZyb20gdGhlIGZpbGUgdGhhdCBoYXZlIGEgbmFtZSB0aGF0IHN0YXJ0cyB3aXRoIF90b2tlbnMgb3IgdGhlIHVzZXIgZGVmaW5lZCB0b2tlbiBzcGVjaWZpZXJcbiAqXG4gKiBAcGFyYW0gcGFnZXMgUGFnZU5vZGVzXG4gKi9cbmNvbnN0IGdldFRva2VuTm9kZXMgPSAocGFnZXMpID0+IHtcbiAgICAvLyBnZXQgdG9rZW4gZnJhbWVzXG4gICAgY29uc3QgdG9rZW5GcmFtZXMgPSBnZXRGcmFtZU5vZGVzKHBhZ2VzKTtcbiAgICAvLyBnZXQgYWxsIGNoaWxkcmVuIG9mIHRva2VuIGZyYW1lc1xuICAgIHJldHVybiB0b2tlbkZyYW1lcy5tYXAoZnJhbWUgPT4gZnJhbWVcbiAgICAgICAgLy8gY2hlY2sgaWYgY2hpbGRyZW4gYXJlIG9mIHZhbGlkZSB0eXBlc1xuICAgICAgICAuZmluZEFsbChcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIG5vZGUgPT4gaXNUb2tlbk5vZGUobm9kZSkpKVxuICAgICAgICAvLyBtZXJnZXMgYWxsIGNoaWxkcmVuIGludG8gb25lIGFycmF5XG4gICAgICAgIC5yZWR1Y2UoKGZsYXR0ZW4sIGFycikgPT4gWy4uLmZsYXR0ZW4sIC4uLmFycl0sIFtdKVxuICAgICAgICAvLyB1bnBhY2sgdmFyaWFudHMgJiB3YXJuIGFib3V0IGRlcHJlY2F0ZWQgdHlwZXNcbiAgICAgICAgLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoaXRlbS50eXBlID09PSAnUkVDVEFOR0xFJyB8fCBpdGVtLnR5cGUgPT09ICdGUkFNRScpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignUGxlYXNlIHVzZSBvbmx5IG1haW4gY29tcG9uZW50cyBhbmQgdmFyaWFudHMsIG90aGVyIHR5cGVzIG1heSBiZSBkZXByZWNhdGVkIGFzIHRva2VucyBpbiB0aGUgZnV0dXJlJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdW5wYWNrIHZhcmlhbnRzXG4gICAgICAgIGlmIChpdGVtLnR5cGUgPT09ICdDT01QT05FTlRfU0VUJykge1xuICAgICAgICAgICAgLy8gVE9ETzogTmFtZSBpcyBvdmVyd3JpdGluZyByZWFsIG9iamVjdCBpbiBmaWdtYVxuICAgICAgICAgICAgLy8gLT4gY3JlYXRlIGNsb25lIGFuZCBtb3ZlIHRvIG5ldyBhcnJheSB0byByZXR1cm5cbiAgICAgICAgICAgIHJldHVybiBpdGVtLmNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGV4dHJhY3RUb2tlbk5vZGVWYWx1ZXMoY2hpbGQpKSwgeyBuYW1lOiBnZXRWYXJpYW50TmFtZShpdGVtLm5hbWUsIGNoaWxkLm5hbWUpIH0pKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmV0dXJuIG5vcm1hbCBpdGVtIGFzIGFycmF5IHRvIHVucGFjayBsYXRlclxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJldHVybiBbZXh0cmFjdFRva2VuTm9kZVZhbHVlcyhpdGVtKV07XG4gICAgfSlcbiAgICAgICAgLy8gbWVyZ2VzIHRoZSB2YXJpYW50IGNoaWxkcmVuIGludG8gb25lIGFycmF5XG4gICAgICAgIC5yZWR1Y2UoKGZsYXR0ZW4sIGFycikgPT4gWy4uLmZsYXR0ZW4sIC4uLmFycl0sIFtdKTtcbn07XG5leHBvcnQgZGVmYXVsdCBnZXRUb2tlbk5vZGVzO1xuZXhwb3J0IGNvbnN0IF9fdGVzdGluZyA9IHtcbiAgICBpc1Rva2VuTm9kZTogaXNUb2tlbk5vZGUsXG4gICAgaXNUb2tlbkZyYW1lOiBpc1Rva2VuRnJhbWVcbn07XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCBzZW1WZXJEaWZmZXJlbmNlIGZyb20gJy4vc2VtVmVyRGlmZmVyZW5jZSc7XG5pbXBvcnQgY3VycmVudFZlcnNpb24gZnJvbSAnLi92ZXJzaW9uJztcbmltcG9ydCBjb25maWcgZnJvbSAnQGNvbmZpZy9jb25maWcnO1xuY29uc3QgZ2V0VmVyc2lvbkRpZmZlcmVuY2UgPSAoZmlnbWEpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIC8vIGdldCB2ZXJzaW9uICYgdmVyc2lvbiBkaWZmZXJlbmNlXG4gICAgY29uc3QgbGFzdFZlcnNpb25TZXR0aW5nc09wZW5lZCA9IHlpZWxkIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoY29uZmlnLmtleS5sYXN0VmVyc2lvblNldHRpbmdzT3BlbmVkKTtcbiAgICBjb25zdCB2ZXJzaW9uRGlmZmVyZW5jZSA9IHNlbVZlckRpZmZlcmVuY2UoY3VycmVudFZlcnNpb24sIGxhc3RWZXJzaW9uU2V0dGluZ3NPcGVuZWQpO1xuICAgIC8vIHVwZGF0ZSB2ZXJzaW9uXG4gICAgaWYgKCFsYXN0VmVyc2lvblNldHRpbmdzT3BlbmVkIHx8IGxhc3RWZXJzaW9uU2V0dGluZ3NPcGVuZWQgIT09IGN1cnJlbnRWZXJzaW9uKSB7XG4gICAgICAgIHlpZWxkIGZpZ21hLmNsaWVudFN0b3JhZ2Uuc2V0QXN5bmMoY29uZmlnLmtleS5sYXN0VmVyc2lvblNldHRpbmdzT3BlbmVkLCBjdXJyZW50VmVyc2lvbik7XG4gICAgfVxuICAgIC8vIHJldHVybiB2ZXJzaW9uIERpZmZlcmVuY2VcbiAgICByZXR1cm4gdmVyc2lvbkRpZmZlcmVuY2U7XG59KTtcbmV4cG9ydCBkZWZhdWx0IGdldFZlcnNpb25EaWZmZXJlbmNlO1xuIiwiLy8gdGhlIG5vZGUgdHlwZXMgdGhhdCBjYW4gYmUgdXNlZCBmb3IgdG9rZW5zXG5jb25zdCB0b2tlbk5vZGVUeXBlcyA9IFtcbiAgICAnQ09NUE9ORU5UJyxcbiAgICAnQ09NUE9ORU5UX1NFVCcsXG4gICAgJ1JFQ1RBTkdMRScsXG4gICAgJ0ZSQU1FJ1xuXTtcbi8qKlxuICogY2hlY2sgaWYgYSBub2RlIGlzIGEgdmFsaWQgdG9rZW4gbm9kZSB0eXBlXG4gKiBDdXJyZW50bHk6ICdDT01QT05FTlQnLCAnRlJBTUUgb3IgJ1JFQ1RBTkdMRSdcbiAqIEBwYXJhbSBTY2VuZU5vZGUgbm9kZVxuICovXG5jb25zdCBpc1Rva2VuTm9kZSA9IChub2RlKSA9PiB7XG4gICAgcmV0dXJuIG5vZGUucGFyZW50LnR5cGUgIT09ICdDT01QT05FTlRfU0VUJyAmJiB0b2tlbk5vZGVUeXBlcy5pbmNsdWRlcyhub2RlLnR5cGUpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGlzVG9rZW5Ob2RlO1xuIiwiLyoqXG4gKiBJZiB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYSBudW1iZXJcbiAqIGl0IGlzIHJvdW5kZWQgdG8gMyBkZWNpbWFsIHBvc2l0aW9uc1xuICogb3RoZXJ3aXNlIGl0IGlzIHJldHVybmVkIGFzIGlzXG4gKiBAcGFyYW0gdmFsdWUgbnVtYmVyXG4gKiBAcGFyYW0gZGVjaW1hbFBsYWNlcyBpbnRcbiAqL1xuY29uc3Qgcm91bmRXaXRoRGVjaW1hbHMgPSAodmFsdWUsIGRlY2ltYWxQbGFjZXMgPSAyKSA9PiB7XG4gICAgLy8gZXhpdCBpZiB2YWx1ZSBpcyB1bmRlZmluZWRcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIGNoZWNrIGZvciBjb3JyZWN0IGlucHV0c1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInIHx8IHR5cGVvZiBkZWNpbWFsUGxhY2VzICE9PSAnbnVtYmVyJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcGFyYW1ldGVycywgYm90aCB2YWx1ZSBcIiR7dmFsdWV9XCIgKCR7dHlwZW9mIHZhbHVlfSkgYW5kIGRlY2ltYWxQbGFjZXMgXCIke2RlY2ltYWxQbGFjZXN9XCIgKCR7dHlwZW9mIGRlY2ltYWxQbGFjZXN9KSBtdXN0IGJlIG9mIHR5cGUgbnVtYmVyYCk7XG4gICAgfVxuICAgIC8vIHNldCBkZWNpbWFsIHBsYWNlc1xuICAgIGNvbnN0IGZhY3Rvck9mVGVuID0gTWF0aC5wb3coMTAsIGRlY2ltYWxQbGFjZXMpO1xuICAgIC8vIHJvdW5kIHJlc3VsdCBhbmQgcmV0dXJuXG4gICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiBmYWN0b3JPZlRlbikgLyBmYWN0b3JPZlRlbjtcbn07XG5leHBvcnQgZGVmYXVsdCByb3VuZFdpdGhEZWNpbWFscztcbiIsImV4cG9ydCBkZWZhdWx0IChjdXJyZW50U2VtVmVyLCBwcmV2U2VtVmVycyA9ICcxLjAuMCcpID0+IHtcbiAgICBjb25zdCBbcE1ham9yLCBwTWlub3IsIHBQYXRjaF0gPSBwcmV2U2VtVmVycy5zcGxpdCgnLicpO1xuICAgIGNvbnN0IFtjTWFqb3IsIGNNaW5vciwgY1BhdGNoXSA9IGN1cnJlbnRTZW1WZXIuc3BsaXQoJy4nKTtcbiAgICBpZiAocE1ham9yIDwgY01ham9yKSB7XG4gICAgICAgIHJldHVybiAnbWFqb3InO1xuICAgIH1cbiAgICBpZiAocE1pbm9yIDwgY01pbm9yKSB7XG4gICAgICAgIHJldHVybiAnbWlub3InO1xuICAgIH1cbiAgICBpZiAocFBhdGNoIDwgY1BhdGNoKSB7XG4gICAgICAgIHJldHVybiAncGF0Y2gnO1xuICAgIH1cbn07XG4iLCJpbXBvcnQgeyBkZWZhdWx0U2V0dGluZ3MgfSBmcm9tICdAY29uZmlnL2RlZmF1bHRTZXR0aW5ncyc7XG5pbXBvcnQgY29uZmlnIGZyb20gJ0Bjb25maWcvY29uZmlnJztcbmltcG9ydCB7IHN0cmluZ2lmeUpzb24gfSBmcm9tICcuL3N0cmluZ2lmeUpzb24nO1xuLyoqXG4gKiBnZXQgdGhlIGN1cnJlbnQgdXNlcnMgc2V0dGluZ3NcbiAqIGZvciBzZXR0aW5ncyB0aGF0IGFyZSBub3Qgc2V0LCB0aGUgZGVmYXVsdHMgd2lsbCBiZSB1c2VkXG4gKiBAcmV0dXJuIG9iamVjdFxuICovXG5jb25zdCBnZXRTZXR0aW5ncyA9ICgpID0+IHtcbiAgICBsZXQgc3RvcmVkU2V0dGluZ3MgPSBmaWdtYS5yb290LmdldFBsdWdpbkRhdGEoY29uZmlnLmtleS5zZXR0aW5ncyk7XG4gICAgLy8gcmV0dXJuIGRlZmF1bHRzIGlmIG5vIHNldHRpbmdzIGFyZSBwcmVzZW50XG4gICAgaWYgKHN0b3JlZFNldHRpbmdzID09PSAnJykge1xuICAgICAgICByZXR1cm4gZGVmYXVsdFNldHRpbmdzO1xuICAgIH1cbiAgICAvLyBwYXJzZSBzdG9yZWQgc2V0dGluZ3NcbiAgICBzdG9yZWRTZXR0aW5ncyA9IEpTT04ucGFyc2Uoc3RvcmVkU2V0dGluZ3MpO1xuICAgIHJldHVybiBPYmplY3QuZnJvbUVudHJpZXMoT2JqZWN0LmVudHJpZXMoZGVmYXVsdFNldHRpbmdzKS5tYXAoKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygc3RvcmVkU2V0dGluZ3Nba2V5XSAhPT0gdHlwZW9mIHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gW2tleSwgZGVmYXVsdFNldHRpbmdzW2tleV1dO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBba2V5LCBzdG9yZWRTZXR0aW5nc1trZXldXTtcbiAgICB9KSk7XG59O1xuLyoqXG4gKiBAbmFtZSBzYXZlU2V0dGluZ3NcbiAqIEBkZXNjcmlwdGlvbiBzYXZlIHRoZSB1c2VyIHNldHRpbmdzIHRvIHRoZSBcImNhY2hlXCJcbiAqIEBwYXJhbSB7VXNlclNldHRpbmdzfSBzZXR0aW5nc1xuICovXG5jb25zdCBzZXRTZXR0aW5ncyA9IChzZXR0aW5ncykgPT4ge1xuICAgIHNldHRpbmdzID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0U2V0dGluZ3MpLCBzZXR0aW5ncyk7XG4gICAgLy8gc3RvcmUgcHVibGljIHNldHRpbmdzIHRoYXQgc2hvdWxkIGJlIHNoYXJlZCBhY3Jvc3Mgb3JnXG4gICAgZmlnbWEucm9vdC5zZXRQbHVnaW5EYXRhKGNvbmZpZy5rZXkuc2V0dGluZ3MsIHN0cmluZ2lmeUpzb24oc2V0dGluZ3MpKTtcbn07XG4vKipcbiAqIEBuYW1lIHJlc2V0U2V0dGluZ3NcbiAqIEBkZXNjcmlwdGlvbiByZXNldFNldHRpbmdzIHRoZSB1c2VyIHNldHRpbmdzIHRvIHRoZSBcImNhY2hlXCJcbiAqL1xuY29uc3QgcmVzZXRTZXR0aW5ncyA9ICgpID0+IGZpZ21hLnJvb3Quc2V0UGx1Z2luRGF0YShjb25maWcua2V5LnNldHRpbmdzLCBzdHJpbmdpZnlKc29uKGRlZmF1bHRTZXR0aW5ncykpO1xuLy8gZXhwb3J0c1xuZXhwb3J0IHsgZ2V0U2V0dGluZ3MsIHNldFNldHRpbmdzLCByZXNldFNldHRpbmdzIH07XG4iLCJleHBvcnQgY29uc3Qgc3RyaW5naWZ5SnNvbiA9IChvYmplY3QsIGNvbXByZXNzaW9uID0gdHJ1ZSkgPT4ge1xuICAgIGlmIChjb21wcmVzc2lvbiA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqZWN0KTtcbiAgICB9XG4gICAgLy8gcmV0dXJuIHVuY29tcHJlc3NlZCBqc29uXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iamVjdCwgbnVsbCwgMik7XG59O1xuIiwiLyogaXN0YW5idWwgaWdub3JlIGZpbGUgKi9cbmNvbnN0IHZlcnNpb24gPSAnNi4wLjEnO1xuZXhwb3J0IGRlZmF1bHQgdmVyc2lvbjtcbiJdLCJzb3VyY2VSb290IjoiIn0=