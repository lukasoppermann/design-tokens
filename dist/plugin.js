/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@ctrl/tinycolor/dist/module/conversion.js":
/*!****************************************************************!*\
  !*** ./node_modules/@ctrl/tinycolor/dist/module/conversion.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertDecimalToHex": () => (/* binding */ convertDecimalToHex),
/* harmony export */   "convertHexToDecimal": () => (/* binding */ convertHexToDecimal),
/* harmony export */   "hslToRgb": () => (/* binding */ hslToRgb),
/* harmony export */   "hsvToRgb": () => (/* binding */ hsvToRgb),
/* harmony export */   "numberInputToObject": () => (/* binding */ numberInputToObject),
/* harmony export */   "parseIntFromHex": () => (/* binding */ parseIntFromHex),
/* harmony export */   "rgbToHex": () => (/* binding */ rgbToHex),
/* harmony export */   "rgbToHsl": () => (/* binding */ rgbToHsl),
/* harmony export */   "rgbToHsv": () => (/* binding */ rgbToHsv),
/* harmony export */   "rgbToRgb": () => (/* binding */ rgbToRgb),
/* harmony export */   "rgbaToArgbHex": () => (/* binding */ rgbaToArgbHex),
/* harmony export */   "rgbaToHex": () => (/* binding */ rgbaToHex)
/* harmony export */ });
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
        r: (0,_util__WEBPACK_IMPORTED_MODULE_0__.bound01)(r, 255) * 255,
        g: (0,_util__WEBPACK_IMPORTED_MODULE_0__.bound01)(g, 255) * 255,
        b: (0,_util__WEBPACK_IMPORTED_MODULE_0__.bound01)(b, 255) * 255,
    };
}
/**
 * Converts an RGB color value to HSL.
 * *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
 * *Returns:* { h, s, l } in [0,1]
 */
function rgbToHsl(r, g, b) {
    r = (0,_util__WEBPACK_IMPORTED_MODULE_0__.bound01)(r, 255);
    g = (0,_util__WEBPACK_IMPORTED_MODULE_0__.bound01)(g, 255);
    b = (0,_util__WEBPACK_IMPORTED_MODULE_0__.bound01)(b, 255);
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
    h = (0,_util__WEBPACK_IMPORTED_MODULE_0__.bound01)(h, 360);
    s = (0,_util__WEBPACK_IMPORTED_MODULE_0__.bound01)(s, 100);
    l = (0,_util__WEBPACK_IMPORTED_MODULE_0__.bound01)(l, 100);
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
    r = (0,_util__WEBPACK_IMPORTED_MODULE_0__.bound01)(r, 255);
    g = (0,_util__WEBPACK_IMPORTED_MODULE_0__.bound01)(g, 255);
    b = (0,_util__WEBPACK_IMPORTED_MODULE_0__.bound01)(b, 255);
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
    h = (0,_util__WEBPACK_IMPORTED_MODULE_0__.bound01)(h, 360) * 6;
    s = (0,_util__WEBPACK_IMPORTED_MODULE_0__.bound01)(s, 100);
    v = (0,_util__WEBPACK_IMPORTED_MODULE_0__.bound01)(v, 100);
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
        (0,_util__WEBPACK_IMPORTED_MODULE_0__.pad2)(Math.round(r).toString(16)),
        (0,_util__WEBPACK_IMPORTED_MODULE_0__.pad2)(Math.round(g).toString(16)),
        (0,_util__WEBPACK_IMPORTED_MODULE_0__.pad2)(Math.round(b).toString(16)),
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
        (0,_util__WEBPACK_IMPORTED_MODULE_0__.pad2)(Math.round(r).toString(16)),
        (0,_util__WEBPACK_IMPORTED_MODULE_0__.pad2)(Math.round(g).toString(16)),
        (0,_util__WEBPACK_IMPORTED_MODULE_0__.pad2)(Math.round(b).toString(16)),
        (0,_util__WEBPACK_IMPORTED_MODULE_0__.pad2)(convertDecimalToHex(a)),
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
        (0,_util__WEBPACK_IMPORTED_MODULE_0__.pad2)(convertDecimalToHex(a)),
        (0,_util__WEBPACK_IMPORTED_MODULE_0__.pad2)(Math.round(r).toString(16)),
        (0,_util__WEBPACK_IMPORTED_MODULE_0__.pad2)(Math.round(g).toString(16)),
        (0,_util__WEBPACK_IMPORTED_MODULE_0__.pad2)(Math.round(b).toString(16)),
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "names": () => (/* binding */ names)
/* harmony export */ });
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "inputToRGB": () => (/* binding */ inputToRGB),
/* harmony export */   "isValidCSSUnit": () => (/* binding */ isValidCSSUnit),
/* harmony export */   "stringInputToObject": () => (/* binding */ stringInputToObject)
/* harmony export */ });
/* harmony import */ var _conversion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./conversion */ "./node_modules/@ctrl/tinycolor/dist/module/conversion.js");
/* harmony import */ var _css_color_names__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./css-color-names */ "./node_modules/@ctrl/tinycolor/dist/module/css-color-names.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./node_modules/@ctrl/tinycolor/dist/module/util.js");



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
            rgb = (0,_conversion__WEBPACK_IMPORTED_MODULE_0__.rgbToRgb)(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === '%' ? 'prgb' : 'rgb';
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = (0,_util__WEBPACK_IMPORTED_MODULE_1__.convertToPercentage)(color.s);
            v = (0,_util__WEBPACK_IMPORTED_MODULE_1__.convertToPercentage)(color.v);
            rgb = (0,_conversion__WEBPACK_IMPORTED_MODULE_0__.hsvToRgb)(color.h, s, v);
            ok = true;
            format = 'hsv';
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = (0,_util__WEBPACK_IMPORTED_MODULE_1__.convertToPercentage)(color.s);
            l = (0,_util__WEBPACK_IMPORTED_MODULE_1__.convertToPercentage)(color.l);
            rgb = (0,_conversion__WEBPACK_IMPORTED_MODULE_0__.hslToRgb)(color.h, s, l);
            ok = true;
            format = 'hsl';
        }
        if (Object.prototype.hasOwnProperty.call(color, 'a')) {
            a = color.a;
        }
    }
    a = (0,_util__WEBPACK_IMPORTED_MODULE_1__.boundAlpha)(a);
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
    if (_css_color_names__WEBPACK_IMPORTED_MODULE_2__.names[color]) {
        color = _css_color_names__WEBPACK_IMPORTED_MODULE_2__.names[color];
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
            r: (0,_conversion__WEBPACK_IMPORTED_MODULE_0__.parseIntFromHex)(match[1]),
            g: (0,_conversion__WEBPACK_IMPORTED_MODULE_0__.parseIntFromHex)(match[2]),
            b: (0,_conversion__WEBPACK_IMPORTED_MODULE_0__.parseIntFromHex)(match[3]),
            a: (0,_conversion__WEBPACK_IMPORTED_MODULE_0__.convertHexToDecimal)(match[4]),
            format: named ? 'name' : 'hex8',
        };
    }
    match = matchers.hex6.exec(color);
    if (match) {
        return {
            r: (0,_conversion__WEBPACK_IMPORTED_MODULE_0__.parseIntFromHex)(match[1]),
            g: (0,_conversion__WEBPACK_IMPORTED_MODULE_0__.parseIntFromHex)(match[2]),
            b: (0,_conversion__WEBPACK_IMPORTED_MODULE_0__.parseIntFromHex)(match[3]),
            format: named ? 'name' : 'hex',
        };
    }
    match = matchers.hex4.exec(color);
    if (match) {
        return {
            r: (0,_conversion__WEBPACK_IMPORTED_MODULE_0__.parseIntFromHex)(match[1] + match[1]),
            g: (0,_conversion__WEBPACK_IMPORTED_MODULE_0__.parseIntFromHex)(match[2] + match[2]),
            b: (0,_conversion__WEBPACK_IMPORTED_MODULE_0__.parseIntFromHex)(match[3] + match[3]),
            a: (0,_conversion__WEBPACK_IMPORTED_MODULE_0__.convertHexToDecimal)(match[4] + match[4]),
            format: named ? 'name' : 'hex8',
        };
    }
    match = matchers.hex3.exec(color);
    if (match) {
        return {
            r: (0,_conversion__WEBPACK_IMPORTED_MODULE_0__.parseIntFromHex)(match[1] + match[1]),
            g: (0,_conversion__WEBPACK_IMPORTED_MODULE_0__.parseIntFromHex)(match[2] + match[2]),
            b: (0,_conversion__WEBPACK_IMPORTED_MODULE_0__.parseIntFromHex)(match[3] + match[3]),
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

/***/ "./node_modules/@ctrl/tinycolor/dist/module/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/@ctrl/tinycolor/dist/module/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TinyColor": () => (/* binding */ TinyColor),
/* harmony export */   "tinycolor": () => (/* binding */ tinycolor)
/* harmony export */ });
/* harmony import */ var _conversion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./conversion */ "./node_modules/@ctrl/tinycolor/dist/module/conversion.js");
/* harmony import */ var _css_color_names__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./css-color-names */ "./node_modules/@ctrl/tinycolor/dist/module/css-color-names.js");
/* harmony import */ var _format_input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./format-input */ "./node_modules/@ctrl/tinycolor/dist/module/format-input.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./node_modules/@ctrl/tinycolor/dist/module/util.js");




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
            color = (0,_conversion__WEBPACK_IMPORTED_MODULE_0__.numberInputToObject)(color);
        }
        this.originalInput = color;
        var rgb = (0,_format_input__WEBPACK_IMPORTED_MODULE_1__.inputToRGB)(color);
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
        this.a = (0,_util__WEBPACK_IMPORTED_MODULE_2__.boundAlpha)(alpha);
        this.roundA = Math.round(100 * this.a) / 100;
        return this;
    };
    /**
     * Returns the object as a HSVA object.
     */
    TinyColor.prototype.toHsv = function () {
        var hsv = (0,_conversion__WEBPACK_IMPORTED_MODULE_0__.rgbToHsv)(this.r, this.g, this.b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a };
    };
    /**
     * Returns the hsva values interpolated into a string with the following format:
     * "hsva(xxx, xxx, xxx, xx)".
     */
    TinyColor.prototype.toHsvString = function () {
        var hsv = (0,_conversion__WEBPACK_IMPORTED_MODULE_0__.rgbToHsv)(this.r, this.g, this.b);
        var h = Math.round(hsv.h * 360);
        var s = Math.round(hsv.s * 100);
        var v = Math.round(hsv.v * 100);
        return this.a === 1 ? "hsv(".concat(h, ", ").concat(s, "%, ").concat(v, "%)") : "hsva(".concat(h, ", ").concat(s, "%, ").concat(v, "%, ").concat(this.roundA, ")");
    };
    /**
     * Returns the object as a HSLA object.
     */
    TinyColor.prototype.toHsl = function () {
        var hsl = (0,_conversion__WEBPACK_IMPORTED_MODULE_0__.rgbToHsl)(this.r, this.g, this.b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a };
    };
    /**
     * Returns the hsla values interpolated into a string with the following format:
     * "hsla(xxx, xxx, xxx, xx)".
     */
    TinyColor.prototype.toHslString = function () {
        var hsl = (0,_conversion__WEBPACK_IMPORTED_MODULE_0__.rgbToHsl)(this.r, this.g, this.b);
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
        return (0,_conversion__WEBPACK_IMPORTED_MODULE_0__.rgbToHex)(this.r, this.g, this.b, allow3Char);
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
        return (0,_conversion__WEBPACK_IMPORTED_MODULE_0__.rgbaToHex)(this.r, this.g, this.b, this.a, allow4Char);
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
        var fmt = function (x) { return "".concat(Math.round((0,_util__WEBPACK_IMPORTED_MODULE_2__.bound01)(x, 255) * 100), "%"); };
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
        var rnd = function (x) { return Math.round((0,_util__WEBPACK_IMPORTED_MODULE_2__.bound01)(x, 255) * 100); };
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
        var hex = '#' + (0,_conversion__WEBPACK_IMPORTED_MODULE_0__.rgbToHex)(this.r, this.g, this.b, false);
        for (var _i = 0, _a = Object.entries(_css_color_names__WEBPACK_IMPORTED_MODULE_3__.names); _i < _a.length; _i++) {
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
        hsl.l = (0,_util__WEBPACK_IMPORTED_MODULE_2__.clamp01)(hsl.l);
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
        hsl.l = (0,_util__WEBPACK_IMPORTED_MODULE_2__.clamp01)(hsl.l);
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
        hsl.s = (0,_util__WEBPACK_IMPORTED_MODULE_2__.clamp01)(hsl.s);
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
        hsl.s = (0,_util__WEBPACK_IMPORTED_MODULE_2__.clamp01)(hsl.s);
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

/***/ "./node_modules/@ctrl/tinycolor/dist/module/util.js":
/*!**********************************************************!*\
  !*** ./node_modules/@ctrl/tinycolor/dist/module/util.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bound01": () => (/* binding */ bound01),
/* harmony export */   "boundAlpha": () => (/* binding */ boundAlpha),
/* harmony export */   "clamp01": () => (/* binding */ clamp01),
/* harmony export */   "convertToPercentage": () => (/* binding */ convertToPercentage),
/* harmony export */   "isOnePointZero": () => (/* binding */ isOnePointZero),
/* harmony export */   "isPercentage": () => (/* binding */ isPercentage),
/* harmony export */   "pad2": () => (/* binding */ pad2)
/* harmony export */ });
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "commands": () => (/* binding */ commands)
/* harmony export */ });
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* istanbul ignore file */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    ui: {
        generalSettings: {
            width: 550,
            height: 836
        },
        export: {
            width: 550,
            height: 356
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
        extensionVariableStyleId: 'variableId',
        extensionAlias: 'alias',
        authType: {
            token: 'token',
            gitlabToken: 'gitlab_token',
            gitlabCommit: 'gitlab_commit',
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultSettings": () => (/* binding */ defaultSettings)
/* harmony export */ });
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
    excludeExtensionProp: false,
    alias: 'alias, ref, reference',
    keyInName: false,
    prefixInName: true,
    modeInTokenValue: false,
    modeInTokenName: false,
    resolveSameCollectionOrModeReference: false,
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
        motion: 'motion',
        opacity: 'opacity, opacities'
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
        motion: true,
        opacity: true,
        variables: true
    }
};


/***/ }),

/***/ "./src/config/tokenTypes.ts":
/*!**********************************!*\
  !*** ./src/config/tokenTypes.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tokenTypes": () => (/* binding */ tokenTypes)
/* harmony export */ });
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
    },
    opacity: {
        label: 'Opacity',
        key: 'opacity'
    },
    variables: {
        label: 'Figma Variables (BETA)',
        key: 'variables',
        exclude: ['original']
    }
};


/***/ }),

/***/ "./src/extractor/extractBorders.ts":
/*!*****************************************!*\
  !*** ./src/extractor/extractBorders.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utils/roundWithDecimals */ "./src/utilities/roundWithDecimals.ts");
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
    return tokenNodes.filter((0,_extractUtilities__WEBPACK_IMPORTED_MODULE_2__.filterByPrefix)(prefixArray))
        // remove nodes with no border property
        .filter(node => node.strokes.length > 0)
        // convert borders
        .map(node => ({
        name: node.name,
        category: 'border',
        exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_1__.tokenTypes.border.key,
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
                value: (0,_utils_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__["default"])(node.strokeMiterLimit),
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
                exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_1__.tokenTypes.border.key
            }
        }
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extractBorders);


/***/ }),

/***/ "./src/extractor/extractBreakpoints.ts":
/*!*********************************************!*\
  !*** ./src/extractor/extractBreakpoints.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @config/tokenTypes */ "./src/config/tokenTypes.ts");
/* harmony import */ var _utils_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @utils/roundWithDecimals */ "./src/utilities/roundWithDecimals.ts");
/* harmony import */ var _extractUtilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extractUtilities */ "./src/extractor/extractUtilities.ts");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @config/config */ "./src/config/config.ts");




const extractBreakpoints = (tokenNodes, prefixArray) => {
    // return as object
    return tokenNodes.filter((0,_extractUtilities__WEBPACK_IMPORTED_MODULE_2__.filterByPrefix)(prefixArray)).map(node => ({
        name: node.name,
        category: 'breakpoint',
        exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__.tokenTypes.breakpoint.key,
        description: node.description || null,
        values: {
            width: {
                value: (0,_utils_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__["default"])(node.width, 2),
                unit: 'pixel',
                type: 'number'
            },
            height: {
                value: (0,_utils_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__["default"])(node.height, 2),
                unit: 'pixel',
                type: 'number'
            }
        },
        extensions: {
            [_config_config__WEBPACK_IMPORTED_MODULE_3__["default"].key.extensionPluginData]: {
                exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__.tokenTypes.breakpoint.key
            }
        }
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extractBreakpoints);


/***/ }),

/***/ "./src/extractor/extractColors.ts":
/*!****************************************!*\
  !*** ./src/extractor/extractColors.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @config/tokenTypes */ "./src/config/tokenTypes.ts");
/* harmony import */ var _utils_convertColor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @utils/convertColor */ "./src/utilities/convertColor.ts");
/* harmony import */ var _utils_roundWithDecimals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @utils/roundWithDecimals */ "./src/utilities/roundWithDecimals.ts");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @config/config */ "./src/config/config.ts");




const transparentFill = {
    fill: {
        value: { r: 0, g: 0, b: 0, a: 0 },
        type: 'color',
        blendMode: 'normal'
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
    var _a;
    if (paint.type === 'SOLID') {
        return {
            fill: {
                value: (0,_utils_convertColor__WEBPACK_IMPORTED_MODULE_1__.convertPaintToRgba)(paint),
                type: 'color',
                blendMode: ((_a = paint.blendMode) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || 'normal'
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
                    value: (0,_utils_roundWithDecimals__WEBPACK_IMPORTED_MODULE_2__["default"])(stop.position),
                    type: 'number'
                },
                color: {
                    value: (0,_utils_convertColor__WEBPACK_IMPORTED_MODULE_1__.roundRgba)(stop.color),
                    type: 'color'
                }
            })),
            opacity: {
                value: (0,_utils_roundWithDecimals__WEBPACK_IMPORTED_MODULE_2__["default"])(paint.opacity),
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
                exportKey: (nodeIsGradient ? _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__.tokenTypes.gradient.key : _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__.tokenTypes.color.key),
                description: description,
                values,
                extensions: {
                    [_config_config__WEBPACK_IMPORTED_MODULE_3__["default"].key.extensionPluginData]: Object.assign({ [_config_config__WEBPACK_IMPORTED_MODULE_3__["default"].key.extensionFigmaStyleId]: node.id, exportKey: (nodeIsGradient ? _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__.tokenTypes.gradient.key : _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__.tokenTypes.color.key) }, (addAlias(alias)))
                }
            }
        ];
    }, []);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extractColors);


/***/ }),

/***/ "./src/extractor/extractEffects.ts":
/*!*****************************************!*\
  !*** ./src/extractor/extractEffects.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @config/tokenTypes */ "./src/config/tokenTypes.ts");
/* harmony import */ var _utils_convertColor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @utils/convertColor */ "./src/utilities/convertColor.ts");
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
        value: (0,_utils_convertColor__WEBPACK_IMPORTED_MODULE_1__.roundRgba)(effect.color),
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
        exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__.tokenTypes.effect.key,
        description: node.description || null,
        values: node.effects.map((effect) => effect.type === 'LAYER_BLUR' || effect.type === 'BACKGROUND_BLUR'
            ? blurValues(effect)
            : shadowValues(effect)),
        extensions: {
            [_config_config__WEBPACK_IMPORTED_MODULE_2__["default"].key.extensionPluginData]: {
                [_config_config__WEBPACK_IMPORTED_MODULE_2__["default"].key.extensionFigmaStyleId]: node.id,
                exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__.tokenTypes.effect.key
            }
        }
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extractEffects);


/***/ }),

/***/ "./src/extractor/extractFonts.ts":
/*!***************************************!*\
  !*** ./src/extractor/extractFonts.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @config/tokenTypes */ "./src/config/tokenTypes.ts");
/* harmony import */ var _utils_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @utils/roundWithDecimals */ "./src/utilities/roundWithDecimals.ts");
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
    TITLE: 'capitalize',
    SMALL_CAPS: 'small-caps'
};
const fontWeights = {
    100: 100,
    thin: 100,
    w1: 100,
    200: 200,
    w2: 200,
    extralight: 200,
    ultralight: 200,
    extraleicht: 200,
    300: 300,
    light: 300,
    leicht: 300,
    w3: 300,
    400: 400,
    normal: 400,
    regular: 400,
    buch: 400,
    w4: 400,
    500: 500,
    medium: 500,
    kraeftig: 500,
    kräftig: 500,
    w5: 500,
    600: 600,
    semibold: 600,
    demibold: 600,
    halbfett: 600,
    w6: 600,
    700: 700,
    bold: 700,
    dreiviertelfett: 700,
    w7: 700,
    800: 800,
    extrabold: 800,
    ultabold: 800,
    fett: 800,
    w8: 800,
    900: 900,
    black: 900,
    heavy: 900,
    super: 900,
    extrafett: 900,
    w9: 900
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
        exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__.tokenTypes.font.key,
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
                value: (0,_utils_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__["default"])(node.letterSpacing.value),
                unit: (node.letterSpacing.unit.toLowerCase() === 'pixels' ? 'pixel' : node.letterSpacing.unit.toLowerCase()),
                type: 'number'
            },
            lineHeight: {
                // @ts-ignore
                value: (0,_utils_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__["default"])(node.lineHeight.value) || 'normal',
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
                value: textCases[node.textCase] || 'none',
                type: 'string'
            }
        },
        extensions: {
            [_config_config__WEBPACK_IMPORTED_MODULE_2__["default"].key.extensionPluginData]: {
                [_config_config__WEBPACK_IMPORTED_MODULE_2__["default"].key.extensionFigmaStyleId]: node.id,
                exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__.tokenTypes.font.key
            }
        }
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extractFonts);


/***/ }),

/***/ "./src/extractor/extractGrids.ts":
/*!***************************************!*\
  !*** ./src/extractor/extractGrids.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
        exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__.tokenTypes.grid.key,
        description: node.description || null,
        values: node.layoutGrids.map((grid) => grid.pattern === 'GRID' ? gridValues(grid) : rowColumnValues(grid)),
        extensions: {
            [_config_config__WEBPACK_IMPORTED_MODULE_1__["default"].key.extensionPluginData]: {
                [_config_config__WEBPACK_IMPORTED_MODULE_1__["default"].key.extensionFigmaStyleId]: node.id,
                exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__.tokenTypes.grid.key
            }
        }
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extractGrids);


/***/ }),

/***/ "./src/extractor/extractMotion.ts":
/*!****************************************!*\
  !*** ./src/extractor/extractMotion.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__testing": () => (/* binding */ __testing),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
    CUSTOM_CUBIC_BEZIER: {
        type: 'custom-cubicBezier',
        curveType: 'cubicBezier',
        easing: undefined
    },
    CUSTOM_SPRING: {
        type: 'custom-spring',
        curveType: 'spring',
        easing: undefined
    },
    LINEAR: {
        type: 'linear',
        curveType: 'cubicBezier',
        easing: {
            x1: 0,
            y1: 0,
            x2: 1,
            y2: 1
        }
    },
    EASE_IN: {
        type: 'ease-in',
        curveType: 'cubicBezier',
        easing: {
            x1: 0.41999998688697815,
            y1: 0,
            x2: 1,
            y2: 1
        }
    },
    EASE_OUT: {
        type: 'ease-out',
        curveType: 'cubicBezier',
        easing: {
            x1: 0,
            y1: 0,
            x2: 0.5799999833106995,
            y2: 1
        }
    },
    EASE_IN_AND_OUT: {
        type: 'ease-in-out',
        curveType: 'cubicBezier',
        easing: {
            x1: 0.41999998688697815,
            y1: 0,
            x2: 0.5799999833106995,
            y2: 1
        }
    },
    EASE_IN_BACK: {
        type: 'ease-in-back',
        curveType: 'cubicBezier',
        easing: {
            x1: 0.30000001192092896,
            y1: -0.05000000074505806,
            x2: 0.699999988079071,
            y2: -0.5
        }
    },
    EASE_OUT_BACK: {
        type: 'ease-out-back',
        curveType: 'cubicBezier',
        easing: {
            x1: 0.44999998807907104,
            y1: 1.4500000476837158,
            x2: 0.800000011920929,
            y2: 1
        }
    },
    EASE_IN_AND_OUT_BACK: {
        type: 'ease-in-out-back',
        curveType: 'cubicBezier',
        easing: {
            x1: 0.699999988079071,
            y1: -0.4000000059604645,
            x2: 0.4000000059604645,
            y2: 1.399999976158142
        }
    },
    BOUNCY: {
        type: 'bouncy',
        curveType: 'spring',
        easing: {
            mass: 1,
            stiffness: 600,
            damping: 15
        }
    },
    GENTLE: {
        type: 'gentle',
        curveType: 'spring',
        easing: {
            mass: 1,
            stiffness: 100,
            damping: 15
        }
    },
    QUICK: {
        type: 'quick',
        curveType: 'spring',
        easing: {
            mass: 1,
            stiffness: 300,
            damping: 20
        }
    },
    SLOW: {
        type: 'slow',
        curveType: 'spring',
        easing: {
            mass: 1,
            stiffness: 80,
            damping: 20
        }
    }
};
const formatEasingFunction = easingObject => {
    // spring curve
    if (easingObject.curveType === 'spring') {
        return {
            mass: {
                value: easingObject.easing.mass,
                type: 'number'
            },
            stiffness: {
                value: easingObject.easing.stiffness,
                type: 'number'
            },
            damping: {
                value: easingObject.easing.damping,
                type: 'number'
            }
        };
    }
    // spring bezier
    if (easingObject.curveType === 'cubicBezier') {
        return {
            x1: {
                // @ts-ignore
                value: easingObject.easing.x1,
                type: 'number'
            },
            x2: {
                // @ts-ignore
                value: easingObject.easing.x2,
                type: 'number'
            },
            y1: {
                // @ts-ignore
                value: easingObject.easing.y1,
                type: 'number'
            },
            y2: {
                // @ts-ignore
                value: easingObject.easing.y2,
                type: 'number'
            }
        };
    }
};
const easing = (easing) => {
    // abort if invalid easing type
    if (!('type' in easing) || easings[easing.type] === undefined) {
        return undefined;
    }
    // return custom easing
    if (easing.type === 'CUSTOM_CUBIC_BEZIER') {
        // @ts-ignore
        easings.CUSTOM_CUBIC_BEZIER.easing = {
            x1: easing.easingFunctionCubicBezier.x1,
            y1: easing.easingFunctionCubicBezier.y1,
            x2: easing.easingFunctionCubicBezier.x2,
            y2: easing.easingFunctionCubicBezier.y2
        };
    }
    // TODO: remove when figma typings are updated
    // @ts-ignore
    if (easing.type === 'CUSTOM_SPRING') {
        // @ts-ignore
        easings.CUSTOM_SPRING.easing = {
            // @ts-ignore
            mass: easing.easingFunctionSpring.mass,
            // @ts-ignore
            stiffness: easing.easingFunctionSpring.stiffness,
            // @ts-ignore
            damping: easing.easingFunctionSpring.damping
        };
    }
    return {
        easingType: {
            value: easings[easing.type].type,
            type: 'string'
        },
        easingCurveType: {
            value: easings[easing.type].curveType,
            type: 'string'
        },
        easingFunction: formatEasingFunction(easings[easing.type])
    };
};
const filterValidMotionTokens = (node) => {
    var _a;
    const validEasingTypes = Object.keys(easings);
    // @ts-ignore
    if (node.reactions.length > 0 && ((_a = node.reactions[0].action) === null || _a === void 0 ? void 0 : _a.type) === 'NODE' && node.reactions[0].action.transition !== null && validEasingTypes.includes(node.reactions[0].action.transition.easing.type)) {
        return true;
    }
    return false;
};
const extractMotion = (tokenNodes, prefixArray) => {
    // return as object
    return tokenNodes.filter((0,_extractUtilities__WEBPACK_IMPORTED_MODULE_1__.filterByPrefix)(prefixArray))
        // filter to only include items which have a transition property
        .filter(filterValidMotionTokens)
        // retrieve values
        .map((node) => ({
        name: node.name,
        category: 'motion',
        exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__.tokenTypes.motion.key,
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
                exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__.tokenTypes.motion.key
            }
        }
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extractMotion);
const __testing = {
    easing: easing
};


/***/ }),

/***/ "./src/extractor/extractOpacities.ts":
/*!*******************************************!*\
  !*** ./src/extractor/extractOpacities.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @config/tokenTypes */ "./src/config/tokenTypes.ts");
/* harmony import */ var _utils_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @utils/roundWithDecimals */ "./src/utilities/roundWithDecimals.ts");
/* harmony import */ var _extractUtilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extractUtilities */ "./src/extractor/extractUtilities.ts");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @config/config */ "./src/config/config.ts");




const extractOpacities = (tokenNodes, prefixArray) => {
    // return as object
    return tokenNodes.filter((0,_extractUtilities__WEBPACK_IMPORTED_MODULE_2__.filterByPrefix)(prefixArray)).map(node => ({
        name: node.name,
        category: 'opacity',
        exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__.tokenTypes.opacity.key,
        description: node.description || null,
        values: {
            opacity: {
                value: (0,_utils_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__["default"])(node.opacity, 2),
                type: 'number'
            }
        },
        extensions: {
            [_config_config__WEBPACK_IMPORTED_MODULE_3__["default"].key.extensionPluginData]: {
                exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__.tokenTypes.opacity.key
            }
        }
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extractOpacities);


/***/ }),

/***/ "./src/extractor/extractRadii.ts":
/*!***************************************!*\
  !*** ./src/extractor/extractRadii.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @config/tokenTypes */ "./src/config/tokenTypes.ts");
/* harmony import */ var _utils_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @utils/roundWithDecimals */ "./src/utilities/roundWithDecimals.ts");
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
    return tokenNodes.filter((0,_extractUtilities__WEBPACK_IMPORTED_MODULE_2__.filterByPrefix)(prefixArray))
        .map(node => ({
        name: node.name,
        category: 'radius',
        exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__.tokenTypes.radius.key,
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
                value: (0,_utils_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__["default"])(node.cornerSmoothing, 2),
                comment: 'Percent as decimal from 0.0 - 1.0',
                type: 'number'
            } }),
        extensions: {
            [_config_config__WEBPACK_IMPORTED_MODULE_3__["default"].key.extensionPluginData]: {
                exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__.tokenTypes.radius.key
            }
        }
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extractRadii);


/***/ }),

/***/ "./src/extractor/extractSizes.ts":
/*!***************************************!*\
  !*** ./src/extractor/extractSizes.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @config/tokenTypes */ "./src/config/tokenTypes.ts");
/* harmony import */ var _utils_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @utils/roundWithDecimals */ "./src/utilities/roundWithDecimals.ts");
/* harmony import */ var _extractUtilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extractUtilities */ "./src/extractor/extractUtilities.ts");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @config/config */ "./src/config/config.ts");




const extractSizes = (tokenNodes, prefixArray) => {
    // return as object
    return tokenNodes.filter((0,_extractUtilities__WEBPACK_IMPORTED_MODULE_2__.filterByPrefix)(prefixArray)).map(node => ({
        name: node.name,
        category: 'size',
        exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__.tokenTypes.size.key,
        description: node.description || null,
        values: {
            width: {
                value: (0,_utils_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__["default"])(node.width, 2),
                unit: 'pixel',
                type: 'number'
            },
            height: {
                value: (0,_utils_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__["default"])(node.height, 2),
                unit: 'pixel',
                type: 'number'
            }
        },
        extensions: {
            [_config_config__WEBPACK_IMPORTED_MODULE_3__["default"].key.extensionPluginData]: {
                exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__.tokenTypes.size.key
            }
        }
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extractSizes);


/***/ }),

/***/ "./src/extractor/extractSpacing.ts":
/*!*****************************************!*\
  !*** ./src/extractor/extractSpacing.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @config/tokenTypes */ "./src/config/tokenTypes.ts");
/* harmony import */ var _utils_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @utils/roundWithDecimals */ "./src/utilities/roundWithDecimals.ts");
/* harmony import */ var _extractUtilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extractUtilities */ "./src/extractor/extractUtilities.ts");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @config/config */ "./src/config/config.ts");




const extractSpacing = (tokenNodes, prefixArray) => {
    // return as object
    return tokenNodes.filter((0,_extractUtilities__WEBPACK_IMPORTED_MODULE_2__.filterByPrefix)(prefixArray))
        .map(node => ({
        name: node.name,
        category: 'spacing',
        exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__.tokenTypes.spacing.key,
        description: node.description || null,
        values: {
            top: {
                value: (0,_utils_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__["default"])(node.paddingTop, 2),
                unit: 'pixel',
                type: 'number'
            },
            right: {
                value: (0,_utils_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__["default"])(node.paddingRight, 2),
                unit: 'pixel',
                type: 'number'
            },
            bottom: {
                value: (0,_utils_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__["default"])(node.paddingBottom, 2),
                unit: 'pixel',
                type: 'number'
            },
            left: {
                value: (0,_utils_roundWithDecimals__WEBPACK_IMPORTED_MODULE_1__["default"])(node.paddingLeft, 2),
                unit: 'pixel',
                type: 'number'
            }
        },
        extensions: {
            [_config_config__WEBPACK_IMPORTED_MODULE_3__["default"].key.extensionPluginData]: {
                exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__.tokenTypes.spacing.key
            }
        }
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extractSpacing);


/***/ }),

/***/ "./src/extractor/extractUtilities.ts":
/*!*******************************************!*\
  !*** ./src/extractor/extractUtilities.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "filterByPrefix": () => (/* binding */ filterByPrefix)
/* harmony export */ });
const filterByPrefix = (prefixArray) => node => {
    // abort if wrong argument
    if (!Array.isArray(prefixArray))
        return;
    // extract prefix from node name
    const nodePrefix = node.name.substr(0, node.name.indexOf('/')).replace(/\s+/g, '');
    // abort if no prefix
    if (nodePrefix.length === 0)
        return;
    // return array
    return prefixArray.includes(nodePrefix);
};


/***/ }),

/***/ "./src/utilities/accessToken.ts":
/*!**************************************!*\
  !*** ./src/utilities/accessToken.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAccessToken": () => (/* binding */ getAccessToken),
/* harmony export */   "setAccessToken": () => (/* binding */ setAccessToken)
/* harmony export */ });
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
 * @description store the access token for the current given file in the user clientStorage
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_filterByNameProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utils/filterByNameProperty */ "./src/utilities/filterByNameProperty.ts");
/* harmony import */ var _utils_getPaintStyles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @utils/getPaintStyles */ "./src/utilities/getPaintStyles.ts");
/* harmony import */ var _utils_getGridStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @utils/getGridStyles */ "./src/utilities/getGridStyles.ts");
/* harmony import */ var _utils_getTokenNodes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @utils/getTokenNodes */ "./src/utilities/getTokenNodes.ts");
/* harmony import */ var _utils_getTextStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @utils/getTextStyles */ "./src/utilities/getTextStyles.ts");
/* harmony import */ var _utils_getEffectStyles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @utils/getEffectStyles */ "./src/utilities/getEffectStyles.ts");
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
 * @function buildFigmaData – return an object with all styles & frame to use for export
 * @param {PluginAPI} figma — the figma PluginAPI object
 * @param options – options object
 */
const buildFigmaData = (figma, settings) => __awaiter(void 0, void 0, void 0, function* () {
    // use spread operator because the original is readOnly
    const tokenFrames = yield (0,_utils_getTokenNodes__WEBPACK_IMPORTED_MODULE_3__["default"])([...figma.root.children]);
    // get user exclusion prefixes
    const userExclusionPrefixes = settings.exclusionPrefix
        .split(',')
        .map((item) => item.replace(/\s+/g, ''));
    // get data from figma
    return {
        tokenFrames: tokenFrames,
        paintStyles: (0,_utils_getPaintStyles__WEBPACK_IMPORTED_MODULE_1__["default"])(yield figma.getLocalPaintStylesAsync()).filter((item) => (0,_utils_filterByNameProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(item, userExclusionPrefixes)),
        gridStyles: (0,_utils_getGridStyles__WEBPACK_IMPORTED_MODULE_2__["default"])(yield figma.getLocalGridStylesAsync()).filter((item) => (0,_utils_filterByNameProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(item, userExclusionPrefixes)),
        textStyles: (0,_utils_getTextStyles__WEBPACK_IMPORTED_MODULE_4__["default"])(yield figma.getLocalTextStylesAsync()).filter((item) => (0,_utils_filterByNameProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(item, userExclusionPrefixes)),
        effectStyles: (0,_utils_getEffectStyles__WEBPACK_IMPORTED_MODULE_5__["default"])(yield figma.getLocalEffectStylesAsync()).filter((item) => (0,_utils_filterByNameProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(item, userExclusionPrefixes))
    };
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (buildFigmaData);


/***/ }),

/***/ "./src/utilities/changeNotation.ts":
/*!*****************************************!*\
  !*** ./src/utilities/changeNotation.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changeNotation": () => (/* binding */ changeNotation)
/* harmony export */ });
const changeNotation = (name, currentDelimiter = '/', desiredDelimiter = '.') => {
    return name.split(currentDelimiter).join(desiredDelimiter).toLowerCase();
};


/***/ }),

/***/ "./src/utilities/convertColor.ts":
/*!***************************************!*\
  !*** ./src/utilities/convertColor.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertPaintToRgba": () => (/* binding */ convertPaintToRgba),
/* harmony export */   "convertRgbaObjectToString": () => (/* binding */ convertRgbaObjectToString),
/* harmony export */   "rgbaObjectToHex8": () => (/* binding */ rgbaObjectToHex8),
/* harmony export */   "roundRgba": () => (/* binding */ roundRgba)
/* harmony export */ });
/* harmony import */ var _roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./roundWithDecimals */ "./src/utilities/roundWithDecimals.ts");
/* harmony import */ var _ctrl_tinycolor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ctrl/tinycolor */ "./node_modules/@ctrl/tinycolor/dist/module/index.js");


const roundRgba = (rgba, opacity) => {
    var _a;
    return ({
        r: (0,_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__["default"])(rgba.r * 255, 0),
        g: (0,_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__["default"])(rgba.g * 255, 0),
        b: (0,_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__["default"])(rgba.b * 255, 0),
        a: (0,_roundWithDecimals__WEBPACK_IMPORTED_MODULE_0__["default"])((_a = opacity !== null && opacity !== void 0 ? opacity : rgba.a) !== null && _a !== void 0 ? _a : 1)
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
    return (0,_ctrl_tinycolor__WEBPACK_IMPORTED_MODULE_1__.tinycolor)(convertRgbaObjectToString(rgbaObject)).toHex8String();
};


/***/ }),

/***/ "./src/utilities/deepMerge.ts":
/*!************************************!*\
  !*** ./src/utilities/deepMerge.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
    // iterate over source
    Object.keys(source).forEach(key => {
        // get values from both target and source for the given key
        const targetValue = target[key];
        const sourceValue = source[key];
        // merge both values
        if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
            target[key] = [...new Set(targetValue.concat(sourceValue))];
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (deepMerge);


/***/ }),

/***/ "./src/utilities/extractTokenNodeValues.ts":
/*!*************************************************!*\
  !*** ./src/utilities/extractTokenNodeValues.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _convertColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./convertColor */ "./src/utilities/convertColor.ts");

/**
 * Return an array of solid stroke colors
 */
const getSolidStrokes = (paints) => {
    // clone without reference
    return [...paints]
        .map(paint => (0,_convertColor__WEBPACK_IMPORTED_MODULE_0__.convertPaintToRgba)(paint))
        .filter(paint => paint != null);
};
/**
 * extractTokenNodeValues
 * @param node: SceneNode
 * @returns node object
 */
const extractTokenNodeValues = (node) => {
    var _a;
    return ({
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
        paddingLeft: node.paddingLeft || 0,
        opacity: (_a = node.opacity) !== null && _a !== void 0 ? _a : 1
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extractTokenNodeValues);


/***/ }),

/***/ "./src/utilities/filterByNameProperty.ts":
/*!***********************************************!*\
  !*** ./src/utilities/filterByNameProperty.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @config/config */ "./src/config/config.ts");

const exclusionPrefix = (exclusionPrefixStrings) => {
    return [
        ..._config_config__WEBPACK_IMPORTED_MODULE_0__["default"].exclusionPrefixDefault,
        ...exclusionPrefixStrings
    ];
};
const filterByPropertyName = (object, exclusionPrefixStrings) => !exclusionPrefix(exclusionPrefixStrings).includes(object.name.trim().substr(0, 1));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (filterByPropertyName);


/***/ }),

/***/ "./src/utilities/getEffectStyles.ts":
/*!******************************************!*\
  !*** ./src/utilities/getEffectStyles.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getEffectStyles);


/***/ }),

/***/ "./src/utilities/getFileId.ts":
/*!************************************!*\
  !*** ./src/utilities/getFileId.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getFileId);


/***/ }),

/***/ "./src/utilities/getGridStyles.ts":
/*!****************************************!*\
  !*** ./src/utilities/getGridStyles.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getGridStyles);


/***/ }),

/***/ "./src/utilities/getPaintStyles.ts":
/*!*****************************************!*\
  !*** ./src/utilities/getPaintStyles.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getPaintStyles);


/***/ }),

/***/ "./src/utilities/getTextStyles.ts":
/*!****************************************!*\
  !*** ./src/utilities/getTextStyles.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getTextStyles);


/***/ }),

/***/ "./src/utilities/getTokenJson.ts":
/*!***************************************!*\
  !*** ./src/utilities/getTokenJson.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "exportRawTokenArray": () => (/* binding */ exportRawTokenArray)
/* harmony export */ });
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
/* harmony import */ var _extractor_extractOpacities__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../extractor/extractOpacities */ "./src/extractor/extractOpacities.ts");
/* harmony import */ var _buildFigmaData__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./buildFigmaData */ "./src/utilities/buildFigmaData.ts");
/* harmony import */ var _getVariables__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./getVariables */ "./src/utilities/getVariables.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};













const getPrefixArray = (prefixString = '') => prefixString.split(',').map(item => item.replace(/\s+/g, ''));
const exportRawTokenArray = (figma, settings) => __awaiter(void 0, void 0, void 0, function* () {
    const figmaData = yield (0,_buildFigmaData__WEBPACK_IMPORTED_MODULE_11__["default"])(figma, settings);
    // get tokens
    return [
        ...(0,_extractor_extractSizes__WEBPACK_IMPORTED_MODULE_5__["default"])(figmaData.tokenFrames, getPrefixArray(settings.prefix.size)),
        ...(0,_extractor_extractBreakpoints__WEBPACK_IMPORTED_MODULE_9__["default"])(figmaData.tokenFrames, getPrefixArray(settings.prefix.breakpoint)),
        ...(0,_extractor_extractSpacing__WEBPACK_IMPORTED_MODULE_6__["default"])(figmaData.tokenFrames, getPrefixArray(settings.prefix.spacing)),
        ...(0,_extractor_extractBorders__WEBPACK_IMPORTED_MODULE_7__["default"])(figmaData.tokenFrames, getPrefixArray(settings.prefix.border)),
        ...(0,_extractor_extractRadii__WEBPACK_IMPORTED_MODULE_8__["default"])(figmaData.tokenFrames, getPrefixArray(settings.prefix.radius)),
        ...(0,_extractor_extractMotion__WEBPACK_IMPORTED_MODULE_4__["default"])(figmaData.tokenFrames, getPrefixArray(settings.prefix.motion)),
        ...(0,_extractor_extractOpacities__WEBPACK_IMPORTED_MODULE_10__["default"])(figmaData.tokenFrames, getPrefixArray(settings.prefix.opacity)),
        ...(0,_extractor_extractColors__WEBPACK_IMPORTED_MODULE_0__["default"])(figmaData.paintStyles, { color: getPrefixArray(settings.prefix.color), gradient: getPrefixArray(settings.prefix.gradient), alias: getPrefixArray(settings.alias) }),
        ...(0,_extractor_extractGrids__WEBPACK_IMPORTED_MODULE_1__["default"])(figmaData.gridStyles, getPrefixArray(settings.prefix.grid)),
        ...(0,_extractor_extractFonts__WEBPACK_IMPORTED_MODULE_2__["default"])(figmaData.textStyles, getPrefixArray(settings.prefix.font)),
        ...(0,_extractor_extractEffects__WEBPACK_IMPORTED_MODULE_3__["default"])(figmaData.effectStyles, getPrefixArray(settings.prefix.effect)),
        ...(yield (0,_getVariables__WEBPACK_IMPORTED_MODULE_12__.getVariables)(figma, settings))
    ];
});


/***/ }),

/***/ "./src/utilities/getTokenNodes.ts":
/*!****************************************!*\
  !*** ./src/utilities/getTokenNodes.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__testing": () => (/* binding */ __testing),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_extractTokenNodeValues__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utils/extractTokenNodeValues */ "./src/utilities/extractTokenNodeValues.ts");
/* harmony import */ var _utils_isTokenNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @utils/isTokenNode */ "./src/utilities/isTokenNode.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


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
const getTokenNodes = (pages) => __awaiter(void 0, void 0, void 0, function* () {
    yield figma.loadAllPagesAsync();
    // get token frames
    const tokenFrames = getFrameNodes(pages);
    // get all children of token frames
    return tokenFrames.map(frame => frame
        // check if children are of valid types
        .findAll(
    /* istanbul ignore next */
    node => (0,_utils_isTokenNode__WEBPACK_IMPORTED_MODULE_1__["default"])(node)))
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
            return item.children.map((child) => (Object.assign(Object.assign({}, (0,_utils_extractTokenNodeValues__WEBPACK_IMPORTED_MODULE_0__["default"])(child)), { name: getVariantName(item.name, child.name) })));
        }
        // return normal item as array to unpack later
        // @ts-ignore
        return [(0,_utils_extractTokenNodeValues__WEBPACK_IMPORTED_MODULE_0__["default"])(item)];
    })
        // merges the variant children into one array
        .reduce((flatten, arr) => [...flatten, ...arr], []);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getTokenNodes);
const __testing = {
    isTokenNode: _utils_isTokenNode__WEBPACK_IMPORTED_MODULE_1__["default"],
    isTokenFrame: isTokenFrame
};


/***/ }),

/***/ "./src/utilities/getVariableTypeByValue.ts":
/*!*************************************************!*\
  !*** ./src/utilities/getVariableTypeByValue.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getVariableTypeByValue": () => (/* binding */ getVariableTypeByValue)
/* harmony export */ });
const getVariableTypeByValue = (value) => {
    if (typeof value === 'boolean')
        return 'string';
    if (typeof value === 'number')
        return 'dimension';
    if (typeof value === 'object')
        return 'color';
    if (typeof value === 'string')
        return 'string';
};


/***/ }),

/***/ "./src/utilities/getVariables.ts":
/*!***************************************!*\
  !*** ./src/utilities/getVariables.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getVariables": () => (/* binding */ getVariables)
/* harmony export */ });
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @config/config */ "./src/config/config.ts");
/* harmony import */ var _config_tokenTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @config/tokenTypes */ "./src/config/tokenTypes.ts");
/* harmony import */ var _utils_convertColor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @utils/convertColor */ "./src/utilities/convertColor.ts");
/* harmony import */ var _utils_roundWithDecimals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @utils/roundWithDecimals */ "./src/utilities/roundWithDecimals.ts");
/* harmony import */ var _utils_handleVariableAlias__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @utils/handleVariableAlias */ "./src/utilities/handleVariableAlias.ts");
/* harmony import */ var _utils_processAliasModes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @utils/processAliasModes */ "./src/utilities/processAliasModes.ts");
/* harmony import */ var _utils_deepMerge__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @utils/deepMerge */ "./src/utilities/deepMerge.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







const extractVariable = (variable, value, // eslint-disable-line @typescript-eslint/no-explicit-any
mode) => __awaiter(void 0, void 0, void 0, function* () {
    let category = 'color';
    let values = {};
    if (value.type === 'VARIABLE_ALIAS') {
        return yield (0,_utils_handleVariableAlias__WEBPACK_IMPORTED_MODULE_4__["default"])(variable, value, mode);
    }
    switch (variable.resolvedType) {
        case 'COLOR':
            category = 'color';
            values = {
                fill: {
                    value: (0,_utils_convertColor__WEBPACK_IMPORTED_MODULE_2__.roundRgba)(value),
                    type: 'color',
                    blendMode: 'normal'
                }
            };
            break;
        case 'FLOAT':
            category = 'dimension';
            values = (0,_utils_roundWithDecimals__WEBPACK_IMPORTED_MODULE_3__["default"])(value, 2);
            break;
        case 'STRING':
            category = 'string';
            values = value;
            break;
        case 'BOOLEAN':
            category = 'boolean';
            values = value;
            break;
    }
    return {
        name: variable.name,
        description: variable.description || undefined,
        exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_1__.tokenTypes.variables.key,
        category,
        values
    };
});
const detectVariableReferencesInCollection = (collection, variable) => {
    var _a;
    let tmpVariable = {};
    if (variable) {
        (_a = collection === null || collection === void 0 ? void 0 : collection.modes) === null || _a === void 0 ? void 0 : _a.forEach((mode) => {
            var _a;
            const modeValue = variable.valuesByMode[mode.modeId];
            // Loop through other variables in the same collection to check for references
            (_a = collection.variableIds) === null || _a === void 0 ? void 0 : _a.forEach((otherVariableId) => __awaiter(void 0, void 0, void 0, function* () {
                const otherVariable = yield figma.variables.getVariableByIdAsync(otherVariableId);
                if (otherVariable &&
                    modeValue &&
                    typeof modeValue === 'object' &&
                    variable.name !== otherVariable.name && // Avoid self-reference
                    modeValue.id === otherVariable.id) {
                    const aliasSameMode = true;
                    tmpVariable = (0,_utils_handleVariableAlias__WEBPACK_IMPORTED_MODULE_4__["default"])(variable, modeValue, mode, aliasSameMode);
                }
            }));
        });
    }
    return (0,_utils_deepMerge__WEBPACK_IMPORTED_MODULE_6__["default"])(variable, tmpVariable);
};
const getVariables = (figma, settings) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const localVariableCollections = yield figma.variables.getLocalVariableCollectionsAsync();
    const localVariables = yield figma.variables.getLocalVariablesAsync();
    const excludedCollectionIds = localVariableCollections === null || localVariableCollections === void 0 ? void 0 : localVariableCollections.filter((collection) => !['.', '_', ...settings.exclusionPrefix.split(',')].includes(collection.name.charAt(0))).map((collection) => collection.id);
    // get collections
    const collections = localVariableCollections
        ? Object.fromEntries(localVariableCollections === null || localVariableCollections === void 0 ? void 0 : localVariableCollections.map((collection) => [collection.id, collection]))
        : [];
    // get variables
    const variables = yield Promise.all(((_a = localVariables === null || localVariables === void 0 ? void 0 : localVariables.filter((variable) => excludedCollectionIds.includes(variable.variableCollectionId))) === null || _a === void 0 ? void 0 : _a.map((variable) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        // get collection name and modes
        const { variableCollectionId } = variable;
        const { name: collection, modes } = collections[variableCollectionId];
        if (settings.resolveSameCollectionOrModeReference) {
            variable = detectVariableReferencesInCollection(collections[variableCollectionId], variable);
        }
        // return each mode value as a separate variable
        return yield Promise.all((_b = Object.entries(variable.valuesByMode)) === null || _b === void 0 ? void 0 : _b.map(([id, value]) => __awaiter(void 0, void 0, void 0, function* () {
            // Only add mode if there's more than one
            // and if modeInTokenName is set to true
            const addModeInTokenName = settings.modeInTokenName && modes.length > 1;
            const mode = modes.find(({ modeId }) => modeId === id);
            const variableName = `${collection}/${variable.name}`;
            const variableNameWithMode = `${collection}/${mode.name}/${variable.name}`;
            const extractedVariable = yield extractVariable(variable, value, mode);
            return Object.assign(Object.assign({}, extractedVariable), { 
                // name is constructed from collection, mode and variable name
                name: addModeInTokenName ? variableNameWithMode : variableName, 
                // add metadata to extensions
                extensions: {
                    [_config_config__WEBPACK_IMPORTED_MODULE_0__["default"].key.extensionPluginData]: {
                        mode: settings.modeInTokenValue ? mode.name : undefined,
                        collection: collection,
                        scopes: variable.scopes,
                        [_config_config__WEBPACK_IMPORTED_MODULE_0__["default"].key.extensionVariableStyleId]: variable.id,
                        exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_1__.tokenTypes.variables.key
                    }
                } });
        })));
    }))) || []);
    // add the mode name to the variable values value in order
    // to be able to reference to it correctly:
    // values: collection.value becomes collection.[mode name].value
    //
    // `variablesWithAliasInTheSameCollection` is not used when `settings.modeInTokenValue`
    // is set to `true` to avoid values in the form of: collection.[mode name].[mode name].value
    const variablesWithAliasInTheSameCollection = () => variables
        .flat()
        // @ts-ignore
        .map((v) => ((v === null || v === void 0 ? void 0 : v.aliasSameMode) ? (0,_utils_processAliasModes__WEBPACK_IMPORTED_MODULE_5__["default"])([v]) : v))
        .flat();
    return settings.modeInTokenValue
        ? (0,_utils_processAliasModes__WEBPACK_IMPORTED_MODULE_5__["default"])(variables.flat())
        : variablesWithAliasInTheSameCollection();
});


/***/ }),

/***/ "./src/utilities/getVersionDifference.ts":
/*!***********************************************!*\
  !*** ./src/utilities/getVersionDifference.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
    const versionDifference = (0,_semVerDifference__WEBPACK_IMPORTED_MODULE_0__["default"])(_version__WEBPACK_IMPORTED_MODULE_1__["default"], lastVersionSettingsOpened);
    // update version
    if (!lastVersionSettingsOpened || lastVersionSettingsOpened !== _version__WEBPACK_IMPORTED_MODULE_1__["default"]) {
        yield figma.clientStorage.setAsync(_config_config__WEBPACK_IMPORTED_MODULE_2__["default"].key.lastVersionSettingsOpened, _version__WEBPACK_IMPORTED_MODULE_1__["default"]);
    }
    // return version Difference
    return versionDifference;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getVersionDifference);


/***/ }),

/***/ "./src/utilities/handleVariableAlias.ts":
/*!**********************************************!*\
  !*** ./src/utilities/handleVariableAlias.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @config/tokenTypes */ "./src/config/tokenTypes.ts");
/* harmony import */ var _utils_getVariableTypeByValue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @utils/getVariableTypeByValue */ "./src/utilities/getVariableTypeByValue.ts");
/* harmony import */ var _utils_changeNotation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @utils/changeNotation */ "./src/utilities/changeNotation.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



function handleVariableAlias(variable, value, mode, aliasSameMode = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const resolvedAlias = yield figma.variables.getVariableByIdAsync(value.id);
        const collection = yield figma.variables.getVariableCollectionByIdAsync(resolvedAlias.variableCollectionId);
        return {
            description: variable.description || '',
            exportKey: _config_tokenTypes__WEBPACK_IMPORTED_MODULE_0__.tokenTypes.variables.key,
            category: (0,_utils_getVariableTypeByValue__WEBPACK_IMPORTED_MODULE_1__.getVariableTypeByValue)(Object.values(resolvedAlias.valuesByMode)[0]),
            values: `{${collection.name.toLowerCase()}.${(0,_utils_changeNotation__WEBPACK_IMPORTED_MODULE_2__.changeNotation)(resolvedAlias.name, '/', '.')}}`,
            // this is being stored so we can properly update the design tokens later to account for all
            // modes when using aliases
            aliasCollectionName: collection.name.toLowerCase(),
            aliasMode: mode,
            aliasSameMode: variable.aliasSameMode || aliasSameMode
        };
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handleVariableAlias);


/***/ }),

/***/ "./src/utilities/isTokenNode.ts":
/*!**************************************!*\
  !*** ./src/utilities/isTokenNode.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
    return node.parent.type !== 'COMPONENT_SET' && tokenNodeTypes.includes(node.type) && node.name.length > 0;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isTokenNode);


/***/ }),

/***/ "./src/utilities/processAliasModes.ts":
/*!********************************************!*\
  !*** ./src/utilities/processAliasModes.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const processAliasModes = (variables) => {
    return variables.reduce((collector, variable) => {
        // only one mode will be passed in if any
        if (!variable.aliasMode) {
            collector.push(variable);
            return collector;
        }
        // alias mode singular because only one is shown
        const { aliasMode, aliasCollectionName } = variable;
        collector.push(Object.assign(Object.assign({}, variable), { values: variable.values.replace(`{${aliasCollectionName}.`, `{${aliasCollectionName}.${aliasMode.name.toLowerCase()}.`) }));
        return collector;
    }, []);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (processAliasModes);


/***/ }),

/***/ "./src/utilities/roundWithDecimals.ts":
/*!********************************************!*\
  !*** ./src/utilities/roundWithDecimals.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (roundWithDecimals);


/***/ }),

/***/ "./src/utilities/semVerDifference.ts":
/*!*******************************************!*\
  !*** ./src/utilities/semVerDifference.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((currentSemVer, prevSemVers = '1.0.0') => {
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSettings": () => (/* binding */ getSettings),
/* harmony export */   "resetSettings": () => (/* binding */ resetSettings),
/* harmony export */   "setSettings": () => (/* binding */ setSettings)
/* harmony export */ });
/* harmony import */ var _config_defaultSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @config/defaultSettings */ "./src/config/defaultSettings.ts");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @config/config */ "./src/config/config.ts");
/* harmony import */ var _stringifyJson__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringifyJson */ "./src/utilities/stringifyJson.ts");



const fixMissing = (defaults, current) => Object.fromEntries(Object.entries(defaults).map(([key, value]) => {
    if (value !== undefined && typeof current[key] !== typeof value) {
        return [key, defaults[key]];
    }
    return [key, current[key]];
}));
/**
 * get the current users settings
 * for settings that are not set, the defaults will be used
 * @return object
 */
const getSettings = () => {
    let storedSettings = figma.root.getPluginData(_config_config__WEBPACK_IMPORTED_MODULE_1__["default"].key.settings);
    // return defaults if no settings are present
    if (storedSettings === '') {
        return _config_defaultSettings__WEBPACK_IMPORTED_MODULE_0__.defaultSettings;
    }
    // parse stored settings
    storedSettings = JSON.parse(storedSettings);
    // fix issues on first level
    const fixedSettings = fixMissing(_config_defaultSettings__WEBPACK_IMPORTED_MODULE_0__.defaultSettings, storedSettings);
    fixedSettings.prefix = fixMissing(_config_defaultSettings__WEBPACK_IMPORTED_MODULE_0__.defaultSettings.prefix, fixedSettings.prefix);
    fixedSettings.exports = fixMissing(_config_defaultSettings__WEBPACK_IMPORTED_MODULE_0__.defaultSettings.exports, fixedSettings.exports);
    // return settings
    return fixedSettings;
};
/**
 * @name saveSettings
 * @description save the user settings to the "cache"
 * @param {UserSettings} settings
 */
const setSettings = (settings) => {
    settings = Object.assign(Object.assign({}, _config_defaultSettings__WEBPACK_IMPORTED_MODULE_0__.defaultSettings), settings);
    // store public settings that should be shared across org
    figma.root.setPluginData(_config_config__WEBPACK_IMPORTED_MODULE_1__["default"].key.settings, (0,_stringifyJson__WEBPACK_IMPORTED_MODULE_2__.stringifyJson)(settings));
};
/**
 * @name resetSettings
 * @description resetSettings the user settings to the "cache"
 */
const resetSettings = () => figma.root.setPluginData(_config_config__WEBPACK_IMPORTED_MODULE_1__["default"].key.settings, (0,_stringifyJson__WEBPACK_IMPORTED_MODULE_2__.stringifyJson)(_config_defaultSettings__WEBPACK_IMPORTED_MODULE_0__.defaultSettings));
// exports



/***/ }),

/***/ "./src/utilities/stringifyJson.ts":
/*!****************************************!*\
  !*** ./src/utilities/stringifyJson.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "stringifyJson": () => (/* binding */ stringifyJson)
/* harmony export */ });
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* istanbul ignore file */
const version = '6.11.1';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (version);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utils/settings */ "./src/utilities/settings.ts");
/* harmony import */ var _utils_accessToken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @utils/accessToken */ "./src/utilities/accessToken.ts");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @config/config */ "./src/config/config.ts");
/* harmony import */ var _config_commands__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @config/commands */ "./src/config/commands.ts");
/* harmony import */ var _utils_getVersionDifference__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @utils/getVersionDifference */ "./src/utilities/getVersionDifference.ts");
/* harmony import */ var _utils_getFileId__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @utils/getFileId */ "./src/utilities/getFileId.ts");
/* harmony import */ var _utils_getTokenJson__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @utils/getTokenJson */ "./src/utilities/getTokenJson.ts");
/* harmony import */ var _utils_stringifyJson__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @utils/stringifyJson */ "./src/utilities/stringifyJson.ts");
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
if ([_config_commands__WEBPACK_IMPORTED_MODULE_3__.commands["export"], _config_commands__WEBPACK_IMPORTED_MODULE_3__.commands.urlExport, _config_commands__WEBPACK_IMPORTED_MODULE_3__.commands.generalSettings].includes(figma.command)) {
    // wrap in function because of async client Storage
    const openUi = () => __awaiter(void 0, void 0, void 0, function* () {
        // Get the user settings
        const userSettings = (0,_utils_settings__WEBPACK_IMPORTED_MODULE_0__.getSettings)();
        // get the current version differences to the last time the plugin was opened
        const versionDifference = yield (0,_utils_getVersionDifference__WEBPACK_IMPORTED_MODULE_4__["default"])(figma);
        // resize UI if needed
        figma.ui.resize(_config_config__WEBPACK_IMPORTED_MODULE_2__["default"].ui[figma.command].width, _config_config__WEBPACK_IMPORTED_MODULE_2__["default"].ui[figma.command].height);
        if (versionDifference !== undefined && versionDifference !== 'patch') {
            figma.ui.resize(_config_config__WEBPACK_IMPORTED_MODULE_2__["default"].ui[figma.command].width, _config_config__WEBPACK_IMPORTED_MODULE_2__["default"].ui[figma.command].height + 60);
        }
        const postMessageObject = {
            command: figma.command,
            payload: {
                settings: Object.assign(Object.assign({}, userSettings), { accessToken: yield (0,_utils_accessToken__WEBPACK_IMPORTED_MODULE_1__.getAccessToken)((0,_utils_getFileId__WEBPACK_IMPORTED_MODULE_5__["default"])(figma)) }),
                data: null,
                versionDifference: versionDifference,
                metadata: {
                    filename: figma.root.name
                }
            }
        };
        if ([_config_commands__WEBPACK_IMPORTED_MODULE_3__.commands["export"], _config_commands__WEBPACK_IMPORTED_MODULE_3__.commands.urlExport].includes(figma.command)) {
            postMessageObject.payload.data = (0,_utils_stringifyJson__WEBPACK_IMPORTED_MODULE_7__.stringifyJson)(yield (0,_utils_getTokenJson__WEBPACK_IMPORTED_MODULE_6__.exportRawTokenArray)(figma, userSettings));
        }
        figma.ui.postMessage(Object.assign({}, postMessageObject));
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
if (figma.command === _config_commands__WEBPACK_IMPORTED_MODULE_3__.commands.help) {
    figma.ui.postMessage({
        command: _config_commands__WEBPACK_IMPORTED_MODULE_3__.commands.help,
        payload: {
            url: 'https://github.com/lukasoppermann/design-tokens'
        }
    });
}
/**
 * Open demo
 */
if (figma.command === _config_commands__WEBPACK_IMPORTED_MODULE_3__.commands.demo) {
    figma.ui.postMessage({
        command: _config_commands__WEBPACK_IMPORTED_MODULE_3__.commands.demo,
        payload: {
            url: 'https://www.figma.com/file/2MQ759R5kJtzQn4qSHuqR7/Design-Tokens-for-Figma?node-id=231%3A2'
        }
    });
}
/**
 * Reset settings
 */
if (figma.command === _config_commands__WEBPACK_IMPORTED_MODULE_3__.commands.reset) {
    (0,_utils_settings__WEBPACK_IMPORTED_MODULE_0__.resetSettings)();
    // send message
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
    if (command === _config_commands__WEBPACK_IMPORTED_MODULE_3__.commands.closePlugin) {
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
    if (command === _config_commands__WEBPACK_IMPORTED_MODULE_3__.commands.saveSettings) {
        // store settings
        (0,_utils_settings__WEBPACK_IMPORTED_MODULE_0__.setSettings)(payload.settings);
        // accessToken
        yield (0,_utils_accessToken__WEBPACK_IMPORTED_MODULE_1__.setAccessToken)((0,_utils_getFileId__WEBPACK_IMPORTED_MODULE_5__["default"])(figma), payload.accessToken);
        // close plugin
        if (payload.closePlugin && payload.closePlugin === true) {
            figma.closePlugin();
        }
    }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBLGdCQUFnQiw4Q0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBLGdCQUFnQiw4Q0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0EsZ0JBQWdCLDhDQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSxnQkFBZ0IsOENBQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQyxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0Esb0VBQW9FLFVBQVU7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxrQkFBa0I7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHVDQUF1QztBQUNuRSw0QkFBNEIsd0NBQXdDO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CLHdDQUF3QyxrREFBa0Q7QUFDMUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ29CO0FBQ3JCO0FBQ087QUFDUCw0QkFBNEI7QUFDNUIsMkJBQTJCO0FBQzNCO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFlQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDakZPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDWEE7QUFDQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDL0NLO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3JEQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNB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QTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixpRUFBYztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFB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LHVCQUF1Qix5REFBUztBQUNqRTtBQUNBLDRCQUE0Qix5REFBUyx1QkFBdUIseURBQVM7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsbUJBQW1CLG1CQUFtQixrRUFBYyxDQUFDLDREQUFTLFVBQVU7QUFDaEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGdFQUFlLEVBQUUsZ0VBQWtCO0FBQ2hELDZDQUE2QyxtRUFBYSxPQUFPLHdFQUFtQjtBQUNwRjtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDJEQUFhO0FBQ25DO0FBQ0EsaUJBQWlCLDJEQUFhO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiwyREFBYTtBQUNuQztBQUNBLGlCQUFpQiwyREFBYTtBQUM5QjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsNERBQWM7QUFDcEMsSUFBSSw4REFBYTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxtQkFBbUI7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0VBQW9CO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixtRUFBcUI7QUFDekM7QUFDQSxRQUFRLDREQUFXO0FBQ25CO0FBQ0EsY0FBYyxrRUFBYyxDQUFDLDREQUFTO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGVzaWduLXRva2Vucy8uL25vZGVfbW9kdWxlcy9AY3RybC90aW55Y29sb3IvZGlzdC9tb2R1bGUvY29udmVyc2lvbi5qcyIsIndlYnBhY2s6Ly9kZXNpZ24tdG9rZW5zLy4vbm9kZV9tb2R1bGVzL0BjdHJsL3Rpbnljb2xvci9kaXN0L21vZHVsZS9jc3MtY29sb3ItbmFtZXMuanMiLCJ3ZWJwYWNrOi8vZGVzaWduLXRva2Vucy8uL25vZGVfbW9kdWxlcy9AY3RybC90aW55Y29sb3IvZGlzdC9tb2R1bGUvZm9ybWF0LWlucHV0LmpzIiwid2VicGFjazovL2Rlc2lnbi10b2tlbnMvLi9ub2RlX21vZHVsZXMvQGN0cmwvdGlueWNvbG9yL2Rpc3QvbW9kdWxlL2luZGV4LmpzIiwid2VicGFjazovL2Rlc2lnbi10b2tlbnMvLi9ub2RlX21vZHVsZXMvQGN0cmwvdGlueWNvbG9yL2Rpc3QvbW9kdWxlL3V0aWwuanMiLCJ3ZWJwYWNrOi8vZGVzaWduLXRva2Vucy8uL3NyYy9jb25maWcvY29tbWFuZHMudHMiLCJ3ZWJwYWNrOi8vZGVzaWduLXRva2Vucy8uL3NyYy9jb25maWcvY29uZmlnLnRzIiwid2VicGFjazovL2Rlc2lnbi10b2tlbnMvLi9zcmMvY29uZmlnL2RlZmF1bHRTZXR0aW5ncy50cyIsIndlYnBhY2s6Ly9kZXNpZ24tdG9rZW5zLy4vc3JjL2NvbmZpZy90b2tlblR5cGVzLnRzIiwid2VicGFjazovL2Rlc2lnbi10b2tlbnMvLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RCb3JkZXJzLnRzIiwid2VicGFjazovL2Rlc2lnbi10b2tlbnMvLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RCcmVha3BvaW50cy50cyIsIndlYnBhY2s6Ly9kZXNpZ24tdG9rZW5zLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0Q29sb3JzLnRzIiwid2VicGFjazovL2Rlc2lnbi10b2tlbnMvLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RFZmZlY3RzLnRzIiwid2VicGFjazovL2Rlc2lnbi10b2tlbnMvLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RGb250cy50cyIsIndlYnBhY2s6Ly9kZXNpZ24tdG9rZW5zLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0R3JpZHMudHMiLCJ3ZWJwYWNrOi8vZGVzaWduLXRva2Vucy8uL3NyYy9leHRyYWN0b3IvZXh0cmFjdE1vdGlvbi50cyIsIndlYnBhY2s6Ly9kZXNpZ24tdG9rZW5zLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0T3BhY2l0aWVzLnRzIiwid2VicGFjazovL2Rlc2lnbi10b2tlbnMvLi9zcmMvZXh0cmFjdG9yL2V4dHJhY3RSYWRpaS50cyIsIndlYnBhY2s6Ly9kZXNpZ24tdG9rZW5zLy4vc3JjL2V4dHJhY3Rvci9leHRyYWN0U2l6ZXMudHMiLCJ3ZWJwYWNrOi8vZGVzaWduLXRva2Vucy8uL3NyYy9leHRyYWN0b3IvZXh0cmFjdFNwYWNpbmcudHMiLCJ3ZWJwYWNrOi8vZGVzaWduLXRva2Vucy8uL3NyYy9leHRyYWN0b3IvZXh0cmFjdFV0aWxpdGllcy50cyIsIndlYnBhY2s6Ly9kZXNpZ24tdG9rZW5zLy4vc3JjL3V0aWxpdGllcy9hY2Nlc3NUb2tlbi50cyIsIndlYnBhY2s6Ly9kZXNpZ24tdG9rZW5zLy4vc3JjL3V0aWxpdGllcy9idWlsZEZpZ21hRGF0YS50cyIsIndlYnBhY2s6Ly9kZXNpZ24tdG9rZW5zLy4vc3JjL3V0aWxpdGllcy9jaGFuZ2VOb3RhdGlvbi50cyIsIndlYnBhY2s6Ly9kZXNpZ24tdG9rZW5zLy4vc3JjL3V0aWxpdGllcy9jb252ZXJ0Q29sb3IudHMiLCJ3ZWJwYWNrOi8vZGVzaWduLXRva2Vucy8uL3NyYy91dGlsaXRpZXMvZGVlcE1lcmdlLnRzIiwid2VicGFjazovL2Rlc2lnbi10b2tlbnMvLi9zcmMvdXRpbGl0aWVzL2V4dHJhY3RUb2tlbk5vZGVWYWx1ZXMudHMiLCJ3ZWJwYWNrOi8vZGVzaWduLXRva2Vucy8uL3NyYy91dGlsaXRpZXMvZmlsdGVyQnlOYW1lUHJvcGVydHkudHMiLCJ3ZWJwYWNrOi8vZGVzaWduLXRva2Vucy8uL3NyYy91dGlsaXRpZXMvZ2V0RWZmZWN0U3R5bGVzLnRzIiwid2VicGFjazovL2Rlc2lnbi10b2tlbnMvLi9zcmMvdXRpbGl0aWVzL2dldEZpbGVJZC50cyIsIndlYnBhY2s6Ly9kZXNpZ24tdG9rZW5zLy4vc3JjL3V0aWxpdGllcy9nZXRHcmlkU3R5bGVzLnRzIiwid2VicGFjazovL2Rlc2lnbi10b2tlbnMvLi9zcmMvdXRpbGl0aWVzL2dldFBhaW50U3R5bGVzLnRzIiwid2VicGFjazovL2Rlc2lnbi10b2tlbnMvLi9zcmMvdXRpbGl0aWVzL2dldFRleHRTdHlsZXMudHMiLCJ3ZWJwYWNrOi8vZGVzaWduLXRva2Vucy8uL3NyYy91dGlsaXRpZXMvZ2V0VG9rZW5Kc29uLnRzIiwid2VicGFjazovL2Rlc2lnbi10b2tlbnMvLi9zcmMvdXRpbGl0aWVzL2dldFRva2VuTm9kZXMudHMiLCJ3ZWJwYWNrOi8vZGVzaWduLXRva2Vucy8uL3NyYy91dGlsaXRpZXMvZ2V0VmFyaWFibGVUeXBlQnlWYWx1ZS50cyIsIndlYnBhY2s6Ly9kZXNpZ24tdG9rZW5zLy4vc3JjL3V0aWxpdGllcy9nZXRWYXJpYWJsZXMudHMiLCJ3ZWJwYWNrOi8vZGVzaWduLXRva2Vucy8uL3NyYy91dGlsaXRpZXMvZ2V0VmVyc2lvbkRpZmZlcmVuY2UudHMiLCJ3ZWJwYWNrOi8vZGVzaWduLXRva2Vucy8uL3NyYy91dGlsaXRpZXMvaGFuZGxlVmFyaWFibGVBbGlhcy50cyIsIndlYnBhY2s6Ly9kZXNpZ24tdG9rZW5zLy4vc3JjL3V0aWxpdGllcy9pc1Rva2VuTm9kZS50cyIsIndlYnBhY2s6Ly9kZXNpZ24tdG9rZW5zLy4vc3JjL3V0aWxpdGllcy9wcm9jZXNzQWxpYXNNb2Rlcy50cyIsIndlYnBhY2s6Ly9kZXNpZ24tdG9rZW5zLy4vc3JjL3V0aWxpdGllcy9yb3VuZFdpdGhEZWNpbWFscy50cyIsIndlYnBhY2s6Ly9kZXNpZ24tdG9rZW5zLy4vc3JjL3V0aWxpdGllcy9zZW1WZXJEaWZmZXJlbmNlLnRzIiwid2VicGFjazovL2Rlc2lnbi10b2tlbnMvLi9zcmMvdXRpbGl0aWVzL3NldHRpbmdzLnRzIiwid2VicGFjazovL2Rlc2lnbi10b2tlbnMvLi9zcmMvdXRpbGl0aWVzL3N0cmluZ2lmeUpzb24udHMiLCJ3ZWJwYWNrOi8vZGVzaWduLXRva2Vucy8uL3NyYy91dGlsaXRpZXMvdmVyc2lvbi50cyIsIndlYnBhY2s6Ly9kZXNpZ24tdG9rZW5zL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Rlc2lnbi10b2tlbnMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Rlc2lnbi10b2tlbnMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9kZXNpZ24tdG9rZW5zL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZGVzaWduLXRva2Vucy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBib3VuZDAxLCBwYWQyIH0gZnJvbSAnLi91dGlsJztcbi8vIGByZ2JUb0hzbGAsIGByZ2JUb0hzdmAsIGBoc2xUb1JnYmAsIGBoc3ZUb1JnYmAgbW9kaWZpZWQgZnJvbTpcbi8vIDxodHRwOi8vbWppamFja3Nvbi5jb20vMjAwOC8wMi9yZ2ItdG8taHNsLWFuZC1yZ2ItdG8taHN2LWNvbG9yLW1vZGVsLWNvbnZlcnNpb24tYWxnb3JpdGhtcy1pbi1qYXZhc2NyaXB0PlxuLyoqXG4gKiBIYW5kbGUgYm91bmRzIC8gcGVyY2VudGFnZSBjaGVja2luZyB0byBjb25mb3JtIHRvIENTUyBjb2xvciBzcGVjXG4gKiA8aHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1jb2xvci8+XG4gKiAqQXNzdW1lczoqIHIsIGcsIGIgaW4gWzAsIDI1NV0gb3IgWzAsIDFdXG4gKiAqUmV0dXJuczoqIHsgciwgZywgYiB9IGluIFswLCAyNTVdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZ2JUb1JnYihyLCBnLCBiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcjogYm91bmQwMShyLCAyNTUpICogMjU1LFxuICAgICAgICBnOiBib3VuZDAxKGcsIDI1NSkgKiAyNTUsXG4gICAgICAgIGI6IGJvdW5kMDEoYiwgMjU1KSAqIDI1NSxcbiAgICB9O1xufVxuLyoqXG4gKiBDb252ZXJ0cyBhbiBSR0IgY29sb3IgdmFsdWUgdG8gSFNMLlxuICogKkFzc3VtZXM6KiByLCBnLCBhbmQgYiBhcmUgY29udGFpbmVkIGluIFswLCAyNTVdIG9yIFswLCAxXVxuICogKlJldHVybnM6KiB7IGgsIHMsIGwgfSBpbiBbMCwxXVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmdiVG9Ic2wociwgZywgYikge1xuICAgIHIgPSBib3VuZDAxKHIsIDI1NSk7XG4gICAgZyA9IGJvdW5kMDEoZywgMjU1KTtcbiAgICBiID0gYm91bmQwMShiLCAyNTUpO1xuICAgIHZhciBtYXggPSBNYXRoLm1heChyLCBnLCBiKTtcbiAgICB2YXIgbWluID0gTWF0aC5taW4ociwgZywgYik7XG4gICAgdmFyIGggPSAwO1xuICAgIHZhciBzID0gMDtcbiAgICB2YXIgbCA9IChtYXggKyBtaW4pIC8gMjtcbiAgICBpZiAobWF4ID09PSBtaW4pIHtcbiAgICAgICAgcyA9IDA7XG4gICAgICAgIGggPSAwOyAvLyBhY2hyb21hdGljXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgZCA9IG1heCAtIG1pbjtcbiAgICAgICAgcyA9IGwgPiAwLjUgPyBkIC8gKDIgLSBtYXggLSBtaW4pIDogZCAvIChtYXggKyBtaW4pO1xuICAgICAgICBzd2l0Y2ggKG1heCkge1xuICAgICAgICAgICAgY2FzZSByOlxuICAgICAgICAgICAgICAgIGggPSAoZyAtIGIpIC8gZCArIChnIDwgYiA/IDYgOiAwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgZzpcbiAgICAgICAgICAgICAgICBoID0gKGIgLSByKSAvIGQgKyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBiOlxuICAgICAgICAgICAgICAgIGggPSAociAtIGcpIC8gZCArIDQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGggLz0gNjtcbiAgICB9XG4gICAgcmV0dXJuIHsgaDogaCwgczogcywgbDogbCB9O1xufVxuZnVuY3Rpb24gaHVlMnJnYihwLCBxLCB0KSB7XG4gICAgaWYgKHQgPCAwKSB7XG4gICAgICAgIHQgKz0gMTtcbiAgICB9XG4gICAgaWYgKHQgPiAxKSB7XG4gICAgICAgIHQgLT0gMTtcbiAgICB9XG4gICAgaWYgKHQgPCAxIC8gNikge1xuICAgICAgICByZXR1cm4gcCArIChxIC0gcCkgKiAoNiAqIHQpO1xuICAgIH1cbiAgICBpZiAodCA8IDEgLyAyKSB7XG4gICAgICAgIHJldHVybiBxO1xuICAgIH1cbiAgICBpZiAodCA8IDIgLyAzKSB7XG4gICAgICAgIHJldHVybiBwICsgKHEgLSBwKSAqICgyIC8gMyAtIHQpICogNjtcbiAgICB9XG4gICAgcmV0dXJuIHA7XG59XG4vKipcbiAqIENvbnZlcnRzIGFuIEhTTCBjb2xvciB2YWx1ZSB0byBSR0IuXG4gKlxuICogKkFzc3VtZXM6KiBoIGlzIGNvbnRhaW5lZCBpbiBbMCwgMV0gb3IgWzAsIDM2MF0gYW5kIHMgYW5kIGwgYXJlIGNvbnRhaW5lZCBbMCwgMV0gb3IgWzAsIDEwMF1cbiAqICpSZXR1cm5zOiogeyByLCBnLCBiIH0gaW4gdGhlIHNldCBbMCwgMjU1XVxuICovXG5leHBvcnQgZnVuY3Rpb24gaHNsVG9SZ2IoaCwgcywgbCkge1xuICAgIHZhciByO1xuICAgIHZhciBnO1xuICAgIHZhciBiO1xuICAgIGggPSBib3VuZDAxKGgsIDM2MCk7XG4gICAgcyA9IGJvdW5kMDEocywgMTAwKTtcbiAgICBsID0gYm91bmQwMShsLCAxMDApO1xuICAgIGlmIChzID09PSAwKSB7XG4gICAgICAgIC8vIGFjaHJvbWF0aWNcbiAgICAgICAgZyA9IGw7XG4gICAgICAgIGIgPSBsO1xuICAgICAgICByID0gbDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBxID0gbCA8IDAuNSA/IGwgKiAoMSArIHMpIDogbCArIHMgLSBsICogcztcbiAgICAgICAgdmFyIHAgPSAyICogbCAtIHE7XG4gICAgICAgIHIgPSBodWUycmdiKHAsIHEsIGggKyAxIC8gMyk7XG4gICAgICAgIGcgPSBodWUycmdiKHAsIHEsIGgpO1xuICAgICAgICBiID0gaHVlMnJnYihwLCBxLCBoIC0gMSAvIDMpO1xuICAgIH1cbiAgICByZXR1cm4geyByOiByICogMjU1LCBnOiBnICogMjU1LCBiOiBiICogMjU1IH07XG59XG4vKipcbiAqIENvbnZlcnRzIGFuIFJHQiBjb2xvciB2YWx1ZSB0byBIU1ZcbiAqXG4gKiAqQXNzdW1lczoqIHIsIGcsIGFuZCBiIGFyZSBjb250YWluZWQgaW4gdGhlIHNldCBbMCwgMjU1XSBvciBbMCwgMV1cbiAqICpSZXR1cm5zOiogeyBoLCBzLCB2IH0gaW4gWzAsMV1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJnYlRvSHN2KHIsIGcsIGIpIHtcbiAgICByID0gYm91bmQwMShyLCAyNTUpO1xuICAgIGcgPSBib3VuZDAxKGcsIDI1NSk7XG4gICAgYiA9IGJvdW5kMDEoYiwgMjU1KTtcbiAgICB2YXIgbWF4ID0gTWF0aC5tYXgociwgZywgYik7XG4gICAgdmFyIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuICAgIHZhciBoID0gMDtcbiAgICB2YXIgdiA9IG1heDtcbiAgICB2YXIgZCA9IG1heCAtIG1pbjtcbiAgICB2YXIgcyA9IG1heCA9PT0gMCA/IDAgOiBkIC8gbWF4O1xuICAgIGlmIChtYXggPT09IG1pbikge1xuICAgICAgICBoID0gMDsgLy8gYWNocm9tYXRpY1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc3dpdGNoIChtYXgpIHtcbiAgICAgICAgICAgIGNhc2UgcjpcbiAgICAgICAgICAgICAgICBoID0gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGc6XG4gICAgICAgICAgICAgICAgaCA9IChiIC0gcikgLyBkICsgMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYjpcbiAgICAgICAgICAgICAgICBoID0gKHIgLSBnKSAvIGQgKyA0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBoIC89IDY7XG4gICAgfVxuICAgIHJldHVybiB7IGg6IGgsIHM6IHMsIHY6IHYgfTtcbn1cbi8qKlxuICogQ29udmVydHMgYW4gSFNWIGNvbG9yIHZhbHVlIHRvIFJHQi5cbiAqXG4gKiAqQXNzdW1lczoqIGggaXMgY29udGFpbmVkIGluIFswLCAxXSBvciBbMCwgMzYwXSBhbmQgcyBhbmQgdiBhcmUgY29udGFpbmVkIGluIFswLCAxXSBvciBbMCwgMTAwXVxuICogKlJldHVybnM6KiB7IHIsIGcsIGIgfSBpbiB0aGUgc2V0IFswLCAyNTVdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoc3ZUb1JnYihoLCBzLCB2KSB7XG4gICAgaCA9IGJvdW5kMDEoaCwgMzYwKSAqIDY7XG4gICAgcyA9IGJvdW5kMDEocywgMTAwKTtcbiAgICB2ID0gYm91bmQwMSh2LCAxMDApO1xuICAgIHZhciBpID0gTWF0aC5mbG9vcihoKTtcbiAgICB2YXIgZiA9IGggLSBpO1xuICAgIHZhciBwID0gdiAqICgxIC0gcyk7XG4gICAgdmFyIHEgPSB2ICogKDEgLSBmICogcyk7XG4gICAgdmFyIHQgPSB2ICogKDEgLSAoMSAtIGYpICogcyk7XG4gICAgdmFyIG1vZCA9IGkgJSA2O1xuICAgIHZhciByID0gW3YsIHEsIHAsIHAsIHQsIHZdW21vZF07XG4gICAgdmFyIGcgPSBbdCwgdiwgdiwgcSwgcCwgcF1bbW9kXTtcbiAgICB2YXIgYiA9IFtwLCBwLCB0LCB2LCB2LCBxXVttb2RdO1xuICAgIHJldHVybiB7IHI6IHIgKiAyNTUsIGc6IGcgKiAyNTUsIGI6IGIgKiAyNTUgfTtcbn1cbi8qKlxuICogQ29udmVydHMgYW4gUkdCIGNvbG9yIHRvIGhleFxuICpcbiAqIEFzc3VtZXMgciwgZywgYW5kIGIgYXJlIGNvbnRhaW5lZCBpbiB0aGUgc2V0IFswLCAyNTVdXG4gKiBSZXR1cm5zIGEgMyBvciA2IGNoYXJhY3RlciBoZXhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJnYlRvSGV4KHIsIGcsIGIsIGFsbG93M0NoYXIpIHtcbiAgICB2YXIgaGV4ID0gW1xuICAgICAgICBwYWQyKE1hdGgucm91bmQocikudG9TdHJpbmcoMTYpKSxcbiAgICAgICAgcGFkMihNYXRoLnJvdW5kKGcpLnRvU3RyaW5nKDE2KSksXG4gICAgICAgIHBhZDIoTWF0aC5yb3VuZChiKS50b1N0cmluZygxNikpLFxuICAgIF07XG4gICAgLy8gUmV0dXJuIGEgMyBjaGFyYWN0ZXIgaGV4IGlmIHBvc3NpYmxlXG4gICAgaWYgKGFsbG93M0NoYXIgJiZcbiAgICAgICAgaGV4WzBdLnN0YXJ0c1dpdGgoaGV4WzBdLmNoYXJBdCgxKSkgJiZcbiAgICAgICAgaGV4WzFdLnN0YXJ0c1dpdGgoaGV4WzFdLmNoYXJBdCgxKSkgJiZcbiAgICAgICAgaGV4WzJdLnN0YXJ0c1dpdGgoaGV4WzJdLmNoYXJBdCgxKSkpIHtcbiAgICAgICAgcmV0dXJuIGhleFswXS5jaGFyQXQoMCkgKyBoZXhbMV0uY2hhckF0KDApICsgaGV4WzJdLmNoYXJBdCgwKTtcbiAgICB9XG4gICAgcmV0dXJuIGhleC5qb2luKCcnKTtcbn1cbi8qKlxuICogQ29udmVydHMgYW4gUkdCQSBjb2xvciBwbHVzIGFscGhhIHRyYW5zcGFyZW5jeSB0byBoZXhcbiAqXG4gKiBBc3N1bWVzIHIsIGcsIGIgYXJlIGNvbnRhaW5lZCBpbiB0aGUgc2V0IFswLCAyNTVdIGFuZFxuICogYSBpbiBbMCwgMV0uIFJldHVybnMgYSA0IG9yIDggY2hhcmFjdGVyIHJnYmEgaGV4XG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtcGFyYW1zXG5leHBvcnQgZnVuY3Rpb24gcmdiYVRvSGV4KHIsIGcsIGIsIGEsIGFsbG93NENoYXIpIHtcbiAgICB2YXIgaGV4ID0gW1xuICAgICAgICBwYWQyKE1hdGgucm91bmQocikudG9TdHJpbmcoMTYpKSxcbiAgICAgICAgcGFkMihNYXRoLnJvdW5kKGcpLnRvU3RyaW5nKDE2KSksXG4gICAgICAgIHBhZDIoTWF0aC5yb3VuZChiKS50b1N0cmluZygxNikpLFxuICAgICAgICBwYWQyKGNvbnZlcnREZWNpbWFsVG9IZXgoYSkpLFxuICAgIF07XG4gICAgLy8gUmV0dXJuIGEgNCBjaGFyYWN0ZXIgaGV4IGlmIHBvc3NpYmxlXG4gICAgaWYgKGFsbG93NENoYXIgJiZcbiAgICAgICAgaGV4WzBdLnN0YXJ0c1dpdGgoaGV4WzBdLmNoYXJBdCgxKSkgJiZcbiAgICAgICAgaGV4WzFdLnN0YXJ0c1dpdGgoaGV4WzFdLmNoYXJBdCgxKSkgJiZcbiAgICAgICAgaGV4WzJdLnN0YXJ0c1dpdGgoaGV4WzJdLmNoYXJBdCgxKSkgJiZcbiAgICAgICAgaGV4WzNdLnN0YXJ0c1dpdGgoaGV4WzNdLmNoYXJBdCgxKSkpIHtcbiAgICAgICAgcmV0dXJuIGhleFswXS5jaGFyQXQoMCkgKyBoZXhbMV0uY2hhckF0KDApICsgaGV4WzJdLmNoYXJBdCgwKSArIGhleFszXS5jaGFyQXQoMCk7XG4gICAgfVxuICAgIHJldHVybiBoZXguam9pbignJyk7XG59XG4vKipcbiAqIENvbnZlcnRzIGFuIFJHQkEgY29sb3IgdG8gYW4gQVJHQiBIZXg4IHN0cmluZ1xuICogUmFyZWx5IHVzZWQsIGJ1dCByZXF1aXJlZCBmb3IgXCJ0b0ZpbHRlcigpXCJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJnYmFUb0FyZ2JIZXgociwgZywgYiwgYSkge1xuICAgIHZhciBoZXggPSBbXG4gICAgICAgIHBhZDIoY29udmVydERlY2ltYWxUb0hleChhKSksXG4gICAgICAgIHBhZDIoTWF0aC5yb3VuZChyKS50b1N0cmluZygxNikpLFxuICAgICAgICBwYWQyKE1hdGgucm91bmQoZykudG9TdHJpbmcoMTYpKSxcbiAgICAgICAgcGFkMihNYXRoLnJvdW5kKGIpLnRvU3RyaW5nKDE2KSksXG4gICAgXTtcbiAgICByZXR1cm4gaGV4LmpvaW4oJycpO1xufVxuLyoqIENvbnZlcnRzIGEgZGVjaW1hbCB0byBhIGhleCB2YWx1ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnREZWNpbWFsVG9IZXgoZCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHBhcnNlRmxvYXQoZCkgKiAyNTUpLnRvU3RyaW5nKDE2KTtcbn1cbi8qKiBDb252ZXJ0cyBhIGhleCB2YWx1ZSB0byBhIGRlY2ltYWwgKi9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0SGV4VG9EZWNpbWFsKGgpIHtcbiAgICByZXR1cm4gcGFyc2VJbnRGcm9tSGV4KGgpIC8gMjU1O1xufVxuLyoqIFBhcnNlIGEgYmFzZS0xNiBoZXggdmFsdWUgaW50byBhIGJhc2UtMTAgaW50ZWdlciAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlSW50RnJvbUhleCh2YWwpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQodmFsLCAxNik7XG59XG5leHBvcnQgZnVuY3Rpb24gbnVtYmVySW5wdXRUb09iamVjdChjb2xvcikge1xuICAgIHJldHVybiB7XG4gICAgICAgIHI6IGNvbG9yID4+IDE2LFxuICAgICAgICBnOiAoY29sb3IgJiAweGZmMDApID4+IDgsXG4gICAgICAgIGI6IGNvbG9yICYgMHhmZixcbiAgICB9O1xufVxuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL2JhaGFtYXMxMC9jc3MtY29sb3ItbmFtZXMvYmxvYi9tYXN0ZXIvY3NzLWNvbG9yLW5hbWVzLmpzb25cbi8qKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgdmFyIG5hbWVzID0ge1xuICAgIGFsaWNlYmx1ZTogJyNmMGY4ZmYnLFxuICAgIGFudGlxdWV3aGl0ZTogJyNmYWViZDcnLFxuICAgIGFxdWE6ICcjMDBmZmZmJyxcbiAgICBhcXVhbWFyaW5lOiAnIzdmZmZkNCcsXG4gICAgYXp1cmU6ICcjZjBmZmZmJyxcbiAgICBiZWlnZTogJyNmNWY1ZGMnLFxuICAgIGJpc3F1ZTogJyNmZmU0YzQnLFxuICAgIGJsYWNrOiAnIzAwMDAwMCcsXG4gICAgYmxhbmNoZWRhbG1vbmQ6ICcjZmZlYmNkJyxcbiAgICBibHVlOiAnIzAwMDBmZicsXG4gICAgYmx1ZXZpb2xldDogJyM4YTJiZTInLFxuICAgIGJyb3duOiAnI2E1MmEyYScsXG4gICAgYnVybHl3b29kOiAnI2RlYjg4NycsXG4gICAgY2FkZXRibHVlOiAnIzVmOWVhMCcsXG4gICAgY2hhcnRyZXVzZTogJyM3ZmZmMDAnLFxuICAgIGNob2NvbGF0ZTogJyNkMjY5MWUnLFxuICAgIGNvcmFsOiAnI2ZmN2Y1MCcsXG4gICAgY29ybmZsb3dlcmJsdWU6ICcjNjQ5NWVkJyxcbiAgICBjb3Juc2lsazogJyNmZmY4ZGMnLFxuICAgIGNyaW1zb246ICcjZGMxNDNjJyxcbiAgICBjeWFuOiAnIzAwZmZmZicsXG4gICAgZGFya2JsdWU6ICcjMDAwMDhiJyxcbiAgICBkYXJrY3lhbjogJyMwMDhiOGInLFxuICAgIGRhcmtnb2xkZW5yb2Q6ICcjYjg4NjBiJyxcbiAgICBkYXJrZ3JheTogJyNhOWE5YTknLFxuICAgIGRhcmtncmVlbjogJyMwMDY0MDAnLFxuICAgIGRhcmtncmV5OiAnI2E5YTlhOScsXG4gICAgZGFya2toYWtpOiAnI2JkYjc2YicsXG4gICAgZGFya21hZ2VudGE6ICcjOGIwMDhiJyxcbiAgICBkYXJrb2xpdmVncmVlbjogJyM1NTZiMmYnLFxuICAgIGRhcmtvcmFuZ2U6ICcjZmY4YzAwJyxcbiAgICBkYXJrb3JjaGlkOiAnIzk5MzJjYycsXG4gICAgZGFya3JlZDogJyM4YjAwMDAnLFxuICAgIGRhcmtzYWxtb246ICcjZTk5NjdhJyxcbiAgICBkYXJrc2VhZ3JlZW46ICcjOGZiYzhmJyxcbiAgICBkYXJrc2xhdGVibHVlOiAnIzQ4M2Q4YicsXG4gICAgZGFya3NsYXRlZ3JheTogJyMyZjRmNGYnLFxuICAgIGRhcmtzbGF0ZWdyZXk6ICcjMmY0ZjRmJyxcbiAgICBkYXJrdHVycXVvaXNlOiAnIzAwY2VkMScsXG4gICAgZGFya3Zpb2xldDogJyM5NDAwZDMnLFxuICAgIGRlZXBwaW5rOiAnI2ZmMTQ5MycsXG4gICAgZGVlcHNreWJsdWU6ICcjMDBiZmZmJyxcbiAgICBkaW1ncmF5OiAnIzY5Njk2OScsXG4gICAgZGltZ3JleTogJyM2OTY5NjknLFxuICAgIGRvZGdlcmJsdWU6ICcjMWU5MGZmJyxcbiAgICBmaXJlYnJpY2s6ICcjYjIyMjIyJyxcbiAgICBmbG9yYWx3aGl0ZTogJyNmZmZhZjAnLFxuICAgIGZvcmVzdGdyZWVuOiAnIzIyOGIyMicsXG4gICAgZnVjaHNpYTogJyNmZjAwZmYnLFxuICAgIGdhaW5zYm9ybzogJyNkY2RjZGMnLFxuICAgIGdob3N0d2hpdGU6ICcjZjhmOGZmJyxcbiAgICBnb2xkZW5yb2Q6ICcjZGFhNTIwJyxcbiAgICBnb2xkOiAnI2ZmZDcwMCcsXG4gICAgZ3JheTogJyM4MDgwODAnLFxuICAgIGdyZWVuOiAnIzAwODAwMCcsXG4gICAgZ3JlZW55ZWxsb3c6ICcjYWRmZjJmJyxcbiAgICBncmV5OiAnIzgwODA4MCcsXG4gICAgaG9uZXlkZXc6ICcjZjBmZmYwJyxcbiAgICBob3RwaW5rOiAnI2ZmNjliNCcsXG4gICAgaW5kaWFucmVkOiAnI2NkNWM1YycsXG4gICAgaW5kaWdvOiAnIzRiMDA4MicsXG4gICAgaXZvcnk6ICcjZmZmZmYwJyxcbiAgICBraGFraTogJyNmMGU2OGMnLFxuICAgIGxhdmVuZGVyYmx1c2g6ICcjZmZmMGY1JyxcbiAgICBsYXZlbmRlcjogJyNlNmU2ZmEnLFxuICAgIGxhd25ncmVlbjogJyM3Y2ZjMDAnLFxuICAgIGxlbW9uY2hpZmZvbjogJyNmZmZhY2QnLFxuICAgIGxpZ2h0Ymx1ZTogJyNhZGQ4ZTYnLFxuICAgIGxpZ2h0Y29yYWw6ICcjZjA4MDgwJyxcbiAgICBsaWdodGN5YW46ICcjZTBmZmZmJyxcbiAgICBsaWdodGdvbGRlbnJvZHllbGxvdzogJyNmYWZhZDInLFxuICAgIGxpZ2h0Z3JheTogJyNkM2QzZDMnLFxuICAgIGxpZ2h0Z3JlZW46ICcjOTBlZTkwJyxcbiAgICBsaWdodGdyZXk6ICcjZDNkM2QzJyxcbiAgICBsaWdodHBpbms6ICcjZmZiNmMxJyxcbiAgICBsaWdodHNhbG1vbjogJyNmZmEwN2EnLFxuICAgIGxpZ2h0c2VhZ3JlZW46ICcjMjBiMmFhJyxcbiAgICBsaWdodHNreWJsdWU6ICcjODdjZWZhJyxcbiAgICBsaWdodHNsYXRlZ3JheTogJyM3Nzg4OTknLFxuICAgIGxpZ2h0c2xhdGVncmV5OiAnIzc3ODg5OScsXG4gICAgbGlnaHRzdGVlbGJsdWU6ICcjYjBjNGRlJyxcbiAgICBsaWdodHllbGxvdzogJyNmZmZmZTAnLFxuICAgIGxpbWU6ICcjMDBmZjAwJyxcbiAgICBsaW1lZ3JlZW46ICcjMzJjZDMyJyxcbiAgICBsaW5lbjogJyNmYWYwZTYnLFxuICAgIG1hZ2VudGE6ICcjZmYwMGZmJyxcbiAgICBtYXJvb246ICcjODAwMDAwJyxcbiAgICBtZWRpdW1hcXVhbWFyaW5lOiAnIzY2Y2RhYScsXG4gICAgbWVkaXVtYmx1ZTogJyMwMDAwY2QnLFxuICAgIG1lZGl1bW9yY2hpZDogJyNiYTU1ZDMnLFxuICAgIG1lZGl1bXB1cnBsZTogJyM5MzcwZGInLFxuICAgIG1lZGl1bXNlYWdyZWVuOiAnIzNjYjM3MScsXG4gICAgbWVkaXVtc2xhdGVibHVlOiAnIzdiNjhlZScsXG4gICAgbWVkaXVtc3ByaW5nZ3JlZW46ICcjMDBmYTlhJyxcbiAgICBtZWRpdW10dXJxdW9pc2U6ICcjNDhkMWNjJyxcbiAgICBtZWRpdW12aW9sZXRyZWQ6ICcjYzcxNTg1JyxcbiAgICBtaWRuaWdodGJsdWU6ICcjMTkxOTcwJyxcbiAgICBtaW50Y3JlYW06ICcjZjVmZmZhJyxcbiAgICBtaXN0eXJvc2U6ICcjZmZlNGUxJyxcbiAgICBtb2NjYXNpbjogJyNmZmU0YjUnLFxuICAgIG5hdmFqb3doaXRlOiAnI2ZmZGVhZCcsXG4gICAgbmF2eTogJyMwMDAwODAnLFxuICAgIG9sZGxhY2U6ICcjZmRmNWU2JyxcbiAgICBvbGl2ZTogJyM4MDgwMDAnLFxuICAgIG9saXZlZHJhYjogJyM2YjhlMjMnLFxuICAgIG9yYW5nZTogJyNmZmE1MDAnLFxuICAgIG9yYW5nZXJlZDogJyNmZjQ1MDAnLFxuICAgIG9yY2hpZDogJyNkYTcwZDYnLFxuICAgIHBhbGVnb2xkZW5yb2Q6ICcjZWVlOGFhJyxcbiAgICBwYWxlZ3JlZW46ICcjOThmYjk4JyxcbiAgICBwYWxldHVycXVvaXNlOiAnI2FmZWVlZScsXG4gICAgcGFsZXZpb2xldHJlZDogJyNkYjcwOTMnLFxuICAgIHBhcGF5YXdoaXA6ICcjZmZlZmQ1JyxcbiAgICBwZWFjaHB1ZmY6ICcjZmZkYWI5JyxcbiAgICBwZXJ1OiAnI2NkODUzZicsXG4gICAgcGluazogJyNmZmMwY2InLFxuICAgIHBsdW06ICcjZGRhMGRkJyxcbiAgICBwb3dkZXJibHVlOiAnI2IwZTBlNicsXG4gICAgcHVycGxlOiAnIzgwMDA4MCcsXG4gICAgcmViZWNjYXB1cnBsZTogJyM2NjMzOTknLFxuICAgIHJlZDogJyNmZjAwMDAnLFxuICAgIHJvc3licm93bjogJyNiYzhmOGYnLFxuICAgIHJveWFsYmx1ZTogJyM0MTY5ZTEnLFxuICAgIHNhZGRsZWJyb3duOiAnIzhiNDUxMycsXG4gICAgc2FsbW9uOiAnI2ZhODA3MicsXG4gICAgc2FuZHlicm93bjogJyNmNGE0NjAnLFxuICAgIHNlYWdyZWVuOiAnIzJlOGI1NycsXG4gICAgc2Vhc2hlbGw6ICcjZmZmNWVlJyxcbiAgICBzaWVubmE6ICcjYTA1MjJkJyxcbiAgICBzaWx2ZXI6ICcjYzBjMGMwJyxcbiAgICBza3libHVlOiAnIzg3Y2VlYicsXG4gICAgc2xhdGVibHVlOiAnIzZhNWFjZCcsXG4gICAgc2xhdGVncmF5OiAnIzcwODA5MCcsXG4gICAgc2xhdGVncmV5OiAnIzcwODA5MCcsXG4gICAgc25vdzogJyNmZmZhZmEnLFxuICAgIHNwcmluZ2dyZWVuOiAnIzAwZmY3ZicsXG4gICAgc3RlZWxibHVlOiAnIzQ2ODJiNCcsXG4gICAgdGFuOiAnI2QyYjQ4YycsXG4gICAgdGVhbDogJyMwMDgwODAnLFxuICAgIHRoaXN0bGU6ICcjZDhiZmQ4JyxcbiAgICB0b21hdG86ICcjZmY2MzQ3JyxcbiAgICB0dXJxdW9pc2U6ICcjNDBlMGQwJyxcbiAgICB2aW9sZXQ6ICcjZWU4MmVlJyxcbiAgICB3aGVhdDogJyNmNWRlYjMnLFxuICAgIHdoaXRlOiAnI2ZmZmZmZicsXG4gICAgd2hpdGVzbW9rZTogJyNmNWY1ZjUnLFxuICAgIHllbGxvdzogJyNmZmZmMDAnLFxuICAgIHllbGxvd2dyZWVuOiAnIzlhY2QzMicsXG59O1xuIiwiaW1wb3J0IHsgY29udmVydEhleFRvRGVjaW1hbCwgaHNsVG9SZ2IsIGhzdlRvUmdiLCBwYXJzZUludEZyb21IZXgsIHJnYlRvUmdiIH0gZnJvbSAnLi9jb252ZXJzaW9uJztcbmltcG9ydCB7IG5hbWVzIH0gZnJvbSAnLi9jc3MtY29sb3ItbmFtZXMnO1xuaW1wb3J0IHsgYm91bmRBbHBoYSwgY29udmVydFRvUGVyY2VudGFnZSB9IGZyb20gJy4vdXRpbCc7XG4vKipcbiAqIEdpdmVuIGEgc3RyaW5nIG9yIG9iamVjdCwgY29udmVydCB0aGF0IGlucHV0IHRvIFJHQlxuICpcbiAqIFBvc3NpYmxlIHN0cmluZyBpbnB1dHM6XG4gKiBgYGBcbiAqIFwicmVkXCJcbiAqIFwiI2YwMFwiIG9yIFwiZjAwXCJcbiAqIFwiI2ZmMDAwMFwiIG9yIFwiZmYwMDAwXCJcbiAqIFwiI2ZmMDAwMDAwXCIgb3IgXCJmZjAwMDAwMFwiXG4gKiBcInJnYiAyNTUgMCAwXCIgb3IgXCJyZ2IgKDI1NSwgMCwgMClcIlxuICogXCJyZ2IgMS4wIDAgMFwiIG9yIFwicmdiICgxLCAwLCAwKVwiXG4gKiBcInJnYmEgKDI1NSwgMCwgMCwgMSlcIiBvciBcInJnYmEgMjU1LCAwLCAwLCAxXCJcbiAqIFwicmdiYSAoMS4wLCAwLCAwLCAxKVwiIG9yIFwicmdiYSAxLjAsIDAsIDAsIDFcIlxuICogXCJoc2woMCwgMTAwJSwgNTAlKVwiIG9yIFwiaHNsIDAgMTAwJSA1MCVcIlxuICogXCJoc2xhKDAsIDEwMCUsIDUwJSwgMSlcIiBvciBcImhzbGEgMCAxMDAlIDUwJSwgMVwiXG4gKiBcImhzdigwLCAxMDAlLCAxMDAlKVwiIG9yIFwiaHN2IDAgMTAwJSAxMDAlXCJcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5wdXRUb1JHQihjb2xvcikge1xuICAgIHZhciByZ2IgPSB7IHI6IDAsIGc6IDAsIGI6IDAgfTtcbiAgICB2YXIgYSA9IDE7XG4gICAgdmFyIHMgPSBudWxsO1xuICAgIHZhciB2ID0gbnVsbDtcbiAgICB2YXIgbCA9IG51bGw7XG4gICAgdmFyIG9rID0gZmFsc2U7XG4gICAgdmFyIGZvcm1hdCA9IGZhbHNlO1xuICAgIGlmICh0eXBlb2YgY29sb3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbG9yID0gc3RyaW5nSW5wdXRUb09iamVjdChjb2xvcik7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgY29sb3IgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChpc1ZhbGlkQ1NTVW5pdChjb2xvci5yKSAmJiBpc1ZhbGlkQ1NTVW5pdChjb2xvci5nKSAmJiBpc1ZhbGlkQ1NTVW5pdChjb2xvci5iKSkge1xuICAgICAgICAgICAgcmdiID0gcmdiVG9SZ2IoY29sb3IuciwgY29sb3IuZywgY29sb3IuYik7XG4gICAgICAgICAgICBvayA9IHRydWU7XG4gICAgICAgICAgICBmb3JtYXQgPSBTdHJpbmcoY29sb3Iucikuc3Vic3RyKC0xKSA9PT0gJyUnID8gJ3ByZ2InIDogJ3JnYic7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNWYWxpZENTU1VuaXQoY29sb3IuaCkgJiYgaXNWYWxpZENTU1VuaXQoY29sb3IucykgJiYgaXNWYWxpZENTU1VuaXQoY29sb3IudikpIHtcbiAgICAgICAgICAgIHMgPSBjb252ZXJ0VG9QZXJjZW50YWdlKGNvbG9yLnMpO1xuICAgICAgICAgICAgdiA9IGNvbnZlcnRUb1BlcmNlbnRhZ2UoY29sb3Iudik7XG4gICAgICAgICAgICByZ2IgPSBoc3ZUb1JnYihjb2xvci5oLCBzLCB2KTtcbiAgICAgICAgICAgIG9rID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvcm1hdCA9ICdoc3YnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzVmFsaWRDU1NVbml0KGNvbG9yLmgpICYmIGlzVmFsaWRDU1NVbml0KGNvbG9yLnMpICYmIGlzVmFsaWRDU1NVbml0KGNvbG9yLmwpKSB7XG4gICAgICAgICAgICBzID0gY29udmVydFRvUGVyY2VudGFnZShjb2xvci5zKTtcbiAgICAgICAgICAgIGwgPSBjb252ZXJ0VG9QZXJjZW50YWdlKGNvbG9yLmwpO1xuICAgICAgICAgICAgcmdiID0gaHNsVG9SZ2IoY29sb3IuaCwgcywgbCk7XG4gICAgICAgICAgICBvayA9IHRydWU7XG4gICAgICAgICAgICBmb3JtYXQgPSAnaHNsJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbG9yLCAnYScpKSB7XG4gICAgICAgICAgICBhID0gY29sb3IuYTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhID0gYm91bmRBbHBoYShhKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBvazogb2ssXG4gICAgICAgIGZvcm1hdDogY29sb3IuZm9ybWF0IHx8IGZvcm1hdCxcbiAgICAgICAgcjogTWF0aC5taW4oMjU1LCBNYXRoLm1heChyZ2IuciwgMCkpLFxuICAgICAgICBnOiBNYXRoLm1pbigyNTUsIE1hdGgubWF4KHJnYi5nLCAwKSksXG4gICAgICAgIGI6IE1hdGgubWluKDI1NSwgTWF0aC5tYXgocmdiLmIsIDApKSxcbiAgICAgICAgYTogYSxcbiAgICB9O1xufVxuLy8gPGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtdmFsdWVzLyNpbnRlZ2Vycz5cbnZhciBDU1NfSU5URUdFUiA9ICdbLVxcXFwrXT9cXFxcZCslPyc7XG4vLyA8aHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy12YWx1ZXMvI251bWJlci12YWx1ZT5cbnZhciBDU1NfTlVNQkVSID0gJ1stXFxcXCtdP1xcXFxkKlxcXFwuXFxcXGQrJT8nO1xuLy8gQWxsb3cgcG9zaXRpdmUvbmVnYXRpdmUgaW50ZWdlci9udW1iZXIuICBEb24ndCBjYXB0dXJlIHRoZSBlaXRoZXIvb3IsIGp1c3QgdGhlIGVudGlyZSBvdXRjb21lLlxudmFyIENTU19VTklUID0gXCIoPzpcIi5jb25jYXQoQ1NTX05VTUJFUiwgXCIpfCg/OlwiKS5jb25jYXQoQ1NTX0lOVEVHRVIsIFwiKVwiKTtcbi8vIEFjdHVhbCBtYXRjaGluZy5cbi8vIFBhcmVudGhlc2VzIGFuZCBjb21tYXMgYXJlIG9wdGlvbmFsLCBidXQgbm90IHJlcXVpcmVkLlxuLy8gV2hpdGVzcGFjZSBjYW4gdGFrZSB0aGUgcGxhY2Ugb2YgY29tbWFzIG9yIG9wZW5pbmcgcGFyZW5cbnZhciBQRVJNSVNTSVZFX01BVENIMyA9IFwiW1xcXFxzfFxcXFwoXSsoXCIuY29uY2F0KENTU19VTklULCBcIilbLHxcXFxcc10rKFwiKS5jb25jYXQoQ1NTX1VOSVQsIFwiKVssfFxcXFxzXSsoXCIpLmNvbmNhdChDU1NfVU5JVCwgXCIpXFxcXHMqXFxcXCk/XCIpO1xudmFyIFBFUk1JU1NJVkVfTUFUQ0g0ID0gXCJbXFxcXHN8XFxcXChdKyhcIi5jb25jYXQoQ1NTX1VOSVQsIFwiKVssfFxcXFxzXSsoXCIpLmNvbmNhdChDU1NfVU5JVCwgXCIpWyx8XFxcXHNdKyhcIikuY29uY2F0KENTU19VTklULCBcIilbLHxcXFxcc10rKFwiKS5jb25jYXQoQ1NTX1VOSVQsIFwiKVxcXFxzKlxcXFwpP1wiKTtcbnZhciBtYXRjaGVycyA9IHtcbiAgICBDU1NfVU5JVDogbmV3IFJlZ0V4cChDU1NfVU5JVCksXG4gICAgcmdiOiBuZXcgUmVnRXhwKCdyZ2InICsgUEVSTUlTU0lWRV9NQVRDSDMpLFxuICAgIHJnYmE6IG5ldyBSZWdFeHAoJ3JnYmEnICsgUEVSTUlTU0lWRV9NQVRDSDQpLFxuICAgIGhzbDogbmV3IFJlZ0V4cCgnaHNsJyArIFBFUk1JU1NJVkVfTUFUQ0gzKSxcbiAgICBoc2xhOiBuZXcgUmVnRXhwKCdoc2xhJyArIFBFUk1JU1NJVkVfTUFUQ0g0KSxcbiAgICBoc3Y6IG5ldyBSZWdFeHAoJ2hzdicgKyBQRVJNSVNTSVZFX01BVENIMyksXG4gICAgaHN2YTogbmV3IFJlZ0V4cCgnaHN2YScgKyBQRVJNSVNTSVZFX01BVENINCksXG4gICAgaGV4MzogL14jPyhbMC05YS1mQS1GXXsxfSkoWzAtOWEtZkEtRl17MX0pKFswLTlhLWZBLUZdezF9KSQvLFxuICAgIGhleDY6IC9eIz8oWzAtOWEtZkEtRl17Mn0pKFswLTlhLWZBLUZdezJ9KShbMC05YS1mQS1GXXsyfSkkLyxcbiAgICBoZXg0OiAvXiM/KFswLTlhLWZBLUZdezF9KShbMC05YS1mQS1GXXsxfSkoWzAtOWEtZkEtRl17MX0pKFswLTlhLWZBLUZdezF9KSQvLFxuICAgIGhleDg6IC9eIz8oWzAtOWEtZkEtRl17Mn0pKFswLTlhLWZBLUZdezJ9KShbMC05YS1mQS1GXXsyfSkoWzAtOWEtZkEtRl17Mn0pJC8sXG59O1xuLyoqXG4gKiBQZXJtaXNzaXZlIHN0cmluZyBwYXJzaW5nLiAgVGFrZSBpbiBhIG51bWJlciBvZiBmb3JtYXRzLCBhbmQgb3V0cHV0IGFuIG9iamVjdFxuICogYmFzZWQgb24gZGV0ZWN0ZWQgZm9ybWF0LiAgUmV0dXJucyBgeyByLCBnLCBiIH1gIG9yIGB7IGgsIHMsIGwgfWAgb3IgYHsgaCwgcywgdn1gXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdJbnB1dFRvT2JqZWN0KGNvbG9yKSB7XG4gICAgY29sb3IgPSBjb2xvci50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoY29sb3IubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIG5hbWVkID0gZmFsc2U7XG4gICAgaWYgKG5hbWVzW2NvbG9yXSkge1xuICAgICAgICBjb2xvciA9IG5hbWVzW2NvbG9yXTtcbiAgICAgICAgbmFtZWQgPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChjb2xvciA9PT0gJ3RyYW5zcGFyZW50Jykge1xuICAgICAgICByZXR1cm4geyByOiAwLCBnOiAwLCBiOiAwLCBhOiAwLCBmb3JtYXQ6ICduYW1lJyB9O1xuICAgIH1cbiAgICAvLyBUcnkgdG8gbWF0Y2ggc3RyaW5nIGlucHV0IHVzaW5nIHJlZ3VsYXIgZXhwcmVzc2lvbnMuXG4gICAgLy8gS2VlcCBtb3N0IG9mIHRoZSBudW1iZXIgYm91bmRpbmcgb3V0IG9mIHRoaXMgZnVuY3Rpb24gLSBkb24ndCB3b3JyeSBhYm91dCBbMCwxXSBvciBbMCwxMDBdIG9yIFswLDM2MF1cbiAgICAvLyBKdXN0IHJldHVybiBhbiBvYmplY3QgYW5kIGxldCB0aGUgY29udmVyc2lvbiBmdW5jdGlvbnMgaGFuZGxlIHRoYXQuXG4gICAgLy8gVGhpcyB3YXkgdGhlIHJlc3VsdCB3aWxsIGJlIHRoZSBzYW1lIHdoZXRoZXIgdGhlIHRpbnljb2xvciBpcyBpbml0aWFsaXplZCB3aXRoIHN0cmluZyBvciBvYmplY3QuXG4gICAgdmFyIG1hdGNoID0gbWF0Y2hlcnMucmdiLmV4ZWMoY29sb3IpO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgICByZXR1cm4geyByOiBtYXRjaFsxXSwgZzogbWF0Y2hbMl0sIGI6IG1hdGNoWzNdIH07XG4gICAgfVxuICAgIG1hdGNoID0gbWF0Y2hlcnMucmdiYS5leGVjKGNvbG9yKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIHsgcjogbWF0Y2hbMV0sIGc6IG1hdGNoWzJdLCBiOiBtYXRjaFszXSwgYTogbWF0Y2hbNF0gfTtcbiAgICB9XG4gICAgbWF0Y2ggPSBtYXRjaGVycy5oc2wuZXhlYyhjb2xvcik7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIHJldHVybiB7IGg6IG1hdGNoWzFdLCBzOiBtYXRjaFsyXSwgbDogbWF0Y2hbM10gfTtcbiAgICB9XG4gICAgbWF0Y2ggPSBtYXRjaGVycy5oc2xhLmV4ZWMoY29sb3IpO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgICByZXR1cm4geyBoOiBtYXRjaFsxXSwgczogbWF0Y2hbMl0sIGw6IG1hdGNoWzNdLCBhOiBtYXRjaFs0XSB9O1xuICAgIH1cbiAgICBtYXRjaCA9IG1hdGNoZXJzLmhzdi5leGVjKGNvbG9yKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIHsgaDogbWF0Y2hbMV0sIHM6IG1hdGNoWzJdLCB2OiBtYXRjaFszXSB9O1xuICAgIH1cbiAgICBtYXRjaCA9IG1hdGNoZXJzLmhzdmEuZXhlYyhjb2xvcik7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIHJldHVybiB7IGg6IG1hdGNoWzFdLCBzOiBtYXRjaFsyXSwgdjogbWF0Y2hbM10sIGE6IG1hdGNoWzRdIH07XG4gICAgfVxuICAgIG1hdGNoID0gbWF0Y2hlcnMuaGV4OC5leGVjKGNvbG9yKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHI6IHBhcnNlSW50RnJvbUhleChtYXRjaFsxXSksXG4gICAgICAgICAgICBnOiBwYXJzZUludEZyb21IZXgobWF0Y2hbMl0pLFxuICAgICAgICAgICAgYjogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzNdKSxcbiAgICAgICAgICAgIGE6IGNvbnZlcnRIZXhUb0RlY2ltYWwobWF0Y2hbNF0pLFxuICAgICAgICAgICAgZm9ybWF0OiBuYW1lZCA/ICduYW1lJyA6ICdoZXg4JyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgbWF0Y2ggPSBtYXRjaGVycy5oZXg2LmV4ZWMoY29sb3IpO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcjogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzFdKSxcbiAgICAgICAgICAgIGc6IHBhcnNlSW50RnJvbUhleChtYXRjaFsyXSksXG4gICAgICAgICAgICBiOiBwYXJzZUludEZyb21IZXgobWF0Y2hbM10pLFxuICAgICAgICAgICAgZm9ybWF0OiBuYW1lZCA/ICduYW1lJyA6ICdoZXgnLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBtYXRjaCA9IG1hdGNoZXJzLmhleDQuZXhlYyhjb2xvcik7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByOiBwYXJzZUludEZyb21IZXgobWF0Y2hbMV0gKyBtYXRjaFsxXSksXG4gICAgICAgICAgICBnOiBwYXJzZUludEZyb21IZXgobWF0Y2hbMl0gKyBtYXRjaFsyXSksXG4gICAgICAgICAgICBiOiBwYXJzZUludEZyb21IZXgobWF0Y2hbM10gKyBtYXRjaFszXSksXG4gICAgICAgICAgICBhOiBjb252ZXJ0SGV4VG9EZWNpbWFsKG1hdGNoWzRdICsgbWF0Y2hbNF0pLFxuICAgICAgICAgICAgZm9ybWF0OiBuYW1lZCA/ICduYW1lJyA6ICdoZXg4JyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgbWF0Y2ggPSBtYXRjaGVycy5oZXgzLmV4ZWMoY29sb3IpO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcjogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzFdICsgbWF0Y2hbMV0pLFxuICAgICAgICAgICAgZzogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzJdICsgbWF0Y2hbMl0pLFxuICAgICAgICAgICAgYjogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzNdICsgbWF0Y2hbM10pLFxuICAgICAgICAgICAgZm9ybWF0OiBuYW1lZCA/ICduYW1lJyA6ICdoZXgnLFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG4vKipcbiAqIENoZWNrIHRvIHNlZSBpZiBpdCBsb29rcyBsaWtlIGEgQ1NTIHVuaXRcbiAqIChzZWUgYG1hdGNoZXJzYCBhYm92ZSBmb3IgZGVmaW5pdGlvbikuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkQ1NTVW5pdChjb2xvcikge1xuICAgIHJldHVybiBCb29sZWFuKG1hdGNoZXJzLkNTU19VTklULmV4ZWMoU3RyaW5nKGNvbG9yKSkpO1xufVxuIiwiaW1wb3J0IHsgbnVtYmVySW5wdXRUb09iamVjdCwgcmdiYVRvSGV4LCByZ2JUb0hleCwgcmdiVG9Ic2wsIHJnYlRvSHN2IH0gZnJvbSAnLi9jb252ZXJzaW9uJztcbmltcG9ydCB7IG5hbWVzIH0gZnJvbSAnLi9jc3MtY29sb3ItbmFtZXMnO1xuaW1wb3J0IHsgaW5wdXRUb1JHQiB9IGZyb20gJy4vZm9ybWF0LWlucHV0JztcbmltcG9ydCB7IGJvdW5kMDEsIGJvdW5kQWxwaGEsIGNsYW1wMDEgfSBmcm9tICcuL3V0aWwnO1xudmFyIFRpbnlDb2xvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUaW55Q29sb3IoY29sb3IsIG9wdHMpIHtcbiAgICAgICAgaWYgKGNvbG9yID09PSB2b2lkIDApIHsgY29sb3IgPSAnJzsgfVxuICAgICAgICBpZiAob3B0cyA9PT0gdm9pZCAwKSB7IG9wdHMgPSB7fTsgfVxuICAgICAgICB2YXIgX2E7XG4gICAgICAgIC8vIElmIGlucHV0IGlzIGFscmVhZHkgYSB0aW55Y29sb3IsIHJldHVybiBpdHNlbGZcbiAgICAgICAgaWYgKGNvbG9yIGluc3RhbmNlb2YgVGlueUNvbG9yKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RydWN0b3ItcmV0dXJuXG4gICAgICAgICAgICByZXR1cm4gY29sb3I7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBjb2xvciA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGNvbG9yID0gbnVtYmVySW5wdXRUb09iamVjdChjb2xvcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcmlnaW5hbElucHV0ID0gY29sb3I7XG4gICAgICAgIHZhciByZ2IgPSBpbnB1dFRvUkdCKGNvbG9yKTtcbiAgICAgICAgdGhpcy5vcmlnaW5hbElucHV0ID0gY29sb3I7XG4gICAgICAgIHRoaXMuciA9IHJnYi5yO1xuICAgICAgICB0aGlzLmcgPSByZ2IuZztcbiAgICAgICAgdGhpcy5iID0gcmdiLmI7XG4gICAgICAgIHRoaXMuYSA9IHJnYi5hO1xuICAgICAgICB0aGlzLnJvdW5kQSA9IE1hdGgucm91bmQoMTAwICogdGhpcy5hKSAvIDEwMDtcbiAgICAgICAgdGhpcy5mb3JtYXQgPSAoX2EgPSBvcHRzLmZvcm1hdCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogcmdiLmZvcm1hdDtcbiAgICAgICAgdGhpcy5ncmFkaWVudFR5cGUgPSBvcHRzLmdyYWRpZW50VHlwZTtcbiAgICAgICAgLy8gRG9uJ3QgbGV0IHRoZSByYW5nZSBvZiBbMCwyNTVdIGNvbWUgYmFjayBpbiBbMCwxXS5cbiAgICAgICAgLy8gUG90ZW50aWFsbHkgbG9zZSBhIGxpdHRsZSBiaXQgb2YgcHJlY2lzaW9uIGhlcmUsIGJ1dCB3aWxsIGZpeCBpc3N1ZXMgd2hlcmVcbiAgICAgICAgLy8gLjUgZ2V0cyBpbnRlcnByZXRlZCBhcyBoYWxmIG9mIHRoZSB0b3RhbCwgaW5zdGVhZCBvZiBoYWxmIG9mIDFcbiAgICAgICAgLy8gSWYgaXQgd2FzIHN1cHBvc2VkIHRvIGJlIDEyOCwgdGhpcyB3YXMgYWxyZWFkeSB0YWtlbiBjYXJlIG9mIGJ5IGBpbnB1dFRvUmdiYFxuICAgICAgICBpZiAodGhpcy5yIDwgMSkge1xuICAgICAgICAgICAgdGhpcy5yID0gTWF0aC5yb3VuZCh0aGlzLnIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmcgPCAxKSB7XG4gICAgICAgICAgICB0aGlzLmcgPSBNYXRoLnJvdW5kKHRoaXMuZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYiA8IDEpIHtcbiAgICAgICAgICAgIHRoaXMuYiA9IE1hdGgucm91bmQodGhpcy5iKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzVmFsaWQgPSByZ2Iub2s7XG4gICAgfVxuICAgIFRpbnlDb2xvci5wcm90b3R5cGUuaXNEYXJrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRCcmlnaHRuZXNzKCkgPCAxMjg7XG4gICAgfTtcbiAgICBUaW55Q29sb3IucHJvdG90eXBlLmlzTGlnaHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5pc0RhcmsoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHBlcmNlaXZlZCBicmlnaHRuZXNzIG9mIHRoZSBjb2xvciwgZnJvbSAwLTI1NS5cbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLmdldEJyaWdodG5lc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL0FFUlQjY29sb3ItY29udHJhc3RcbiAgICAgICAgdmFyIHJnYiA9IHRoaXMudG9SZ2IoKTtcbiAgICAgICAgcmV0dXJuIChyZ2IuciAqIDI5OSArIHJnYi5nICogNTg3ICsgcmdiLmIgKiAxMTQpIC8gMTAwMDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHBlcmNlaXZlZCBsdW1pbmFuY2Ugb2YgYSBjb2xvciwgZnJvbSAwLTEuXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS5nZXRMdW1pbmFuY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMDgvUkVDLVdDQUcyMC0yMDA4MTIxMS8jcmVsYXRpdmVsdW1pbmFuY2VkZWZcbiAgICAgICAgdmFyIHJnYiA9IHRoaXMudG9SZ2IoKTtcbiAgICAgICAgdmFyIFI7XG4gICAgICAgIHZhciBHO1xuICAgICAgICB2YXIgQjtcbiAgICAgICAgdmFyIFJzUkdCID0gcmdiLnIgLyAyNTU7XG4gICAgICAgIHZhciBHc1JHQiA9IHJnYi5nIC8gMjU1O1xuICAgICAgICB2YXIgQnNSR0IgPSByZ2IuYiAvIDI1NTtcbiAgICAgICAgaWYgKFJzUkdCIDw9IDAuMDM5MjgpIHtcbiAgICAgICAgICAgIFIgPSBSc1JHQiAvIDEyLjkyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1leHBvbmVudGlhdGlvbi1vcGVyYXRvclxuICAgICAgICAgICAgUiA9IE1hdGgucG93KChSc1JHQiArIDAuMDU1KSAvIDEuMDU1LCAyLjQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChHc1JHQiA8PSAwLjAzOTI4KSB7XG4gICAgICAgICAgICBHID0gR3NSR0IgLyAxMi45MjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZXhwb25lbnRpYXRpb24tb3BlcmF0b3JcbiAgICAgICAgICAgIEcgPSBNYXRoLnBvdygoR3NSR0IgKyAwLjA1NSkgLyAxLjA1NSwgMi40KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQnNSR0IgPD0gMC4wMzkyOCkge1xuICAgICAgICAgICAgQiA9IEJzUkdCIC8gMTIuOTI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWV4cG9uZW50aWF0aW9uLW9wZXJhdG9yXG4gICAgICAgICAgICBCID0gTWF0aC5wb3coKEJzUkdCICsgMC4wNTUpIC8gMS4wNTUsIDIuNCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDAuMjEyNiAqIFIgKyAwLjcxNTIgKiBHICsgMC4wNzIyICogQjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGFscGhhIHZhbHVlIG9mIGEgY29sb3IsIGZyb20gMC0xLlxuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUuZ2V0QWxwaGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmE7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBhbHBoYSB2YWx1ZSBvbiB0aGUgY3VycmVudCBjb2xvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBhbHBoYSAtIFRoZSBuZXcgYWxwaGEgdmFsdWUuIFRoZSBhY2NlcHRlZCByYW5nZSBpcyAwLTEuXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS5zZXRBbHBoYSA9IGZ1bmN0aW9uIChhbHBoYSkge1xuICAgICAgICB0aGlzLmEgPSBib3VuZEFscGhhKGFscGhhKTtcbiAgICAgICAgdGhpcy5yb3VuZEEgPSBNYXRoLnJvdW5kKDEwMCAqIHRoaXMuYSkgLyAxMDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgb2JqZWN0IGFzIGEgSFNWQSBvYmplY3QuXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS50b0hzdiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGhzdiA9IHJnYlRvSHN2KHRoaXMuciwgdGhpcy5nLCB0aGlzLmIpO1xuICAgICAgICByZXR1cm4geyBoOiBoc3YuaCAqIDM2MCwgczogaHN2LnMsIHY6IGhzdi52LCBhOiB0aGlzLmEgfTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGhzdmEgdmFsdWVzIGludGVycG9sYXRlZCBpbnRvIGEgc3RyaW5nIHdpdGggdGhlIGZvbGxvd2luZyBmb3JtYXQ6XG4gICAgICogXCJoc3ZhKHh4eCwgeHh4LCB4eHgsIHh4KVwiLlxuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUudG9Ic3ZTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBoc3YgPSByZ2JUb0hzdih0aGlzLnIsIHRoaXMuZywgdGhpcy5iKTtcbiAgICAgICAgdmFyIGggPSBNYXRoLnJvdW5kKGhzdi5oICogMzYwKTtcbiAgICAgICAgdmFyIHMgPSBNYXRoLnJvdW5kKGhzdi5zICogMTAwKTtcbiAgICAgICAgdmFyIHYgPSBNYXRoLnJvdW5kKGhzdi52ICogMTAwKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYSA9PT0gMSA/IFwiaHN2KFwiLmNvbmNhdChoLCBcIiwgXCIpLmNvbmNhdChzLCBcIiUsIFwiKS5jb25jYXQodiwgXCIlKVwiKSA6IFwiaHN2YShcIi5jb25jYXQoaCwgXCIsIFwiKS5jb25jYXQocywgXCIlLCBcIikuY29uY2F0KHYsIFwiJSwgXCIpLmNvbmNhdCh0aGlzLnJvdW5kQSwgXCIpXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgb2JqZWN0IGFzIGEgSFNMQSBvYmplY3QuXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS50b0hzbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGhzbCA9IHJnYlRvSHNsKHRoaXMuciwgdGhpcy5nLCB0aGlzLmIpO1xuICAgICAgICByZXR1cm4geyBoOiBoc2wuaCAqIDM2MCwgczogaHNsLnMsIGw6IGhzbC5sLCBhOiB0aGlzLmEgfTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGhzbGEgdmFsdWVzIGludGVycG9sYXRlZCBpbnRvIGEgc3RyaW5nIHdpdGggdGhlIGZvbGxvd2luZyBmb3JtYXQ6XG4gICAgICogXCJoc2xhKHh4eCwgeHh4LCB4eHgsIHh4KVwiLlxuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUudG9Ic2xTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBoc2wgPSByZ2JUb0hzbCh0aGlzLnIsIHRoaXMuZywgdGhpcy5iKTtcbiAgICAgICAgdmFyIGggPSBNYXRoLnJvdW5kKGhzbC5oICogMzYwKTtcbiAgICAgICAgdmFyIHMgPSBNYXRoLnJvdW5kKGhzbC5zICogMTAwKTtcbiAgICAgICAgdmFyIGwgPSBNYXRoLnJvdW5kKGhzbC5sICogMTAwKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYSA9PT0gMSA/IFwiaHNsKFwiLmNvbmNhdChoLCBcIiwgXCIpLmNvbmNhdChzLCBcIiUsIFwiKS5jb25jYXQobCwgXCIlKVwiKSA6IFwiaHNsYShcIi5jb25jYXQoaCwgXCIsIFwiKS5jb25jYXQocywgXCIlLCBcIikuY29uY2F0KGwsIFwiJSwgXCIpLmNvbmNhdCh0aGlzLnJvdW5kQSwgXCIpXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgaGV4IHZhbHVlIG9mIHRoZSBjb2xvci5cbiAgICAgKiBAcGFyYW0gYWxsb3czQ2hhciB3aWxsIHNob3J0ZW4gaGV4IHZhbHVlIHRvIDMgY2hhciBpZiBwb3NzaWJsZVxuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUudG9IZXggPSBmdW5jdGlvbiAoYWxsb3czQ2hhcikge1xuICAgICAgICBpZiAoYWxsb3czQ2hhciA9PT0gdm9pZCAwKSB7IGFsbG93M0NoYXIgPSBmYWxzZTsgfVxuICAgICAgICByZXR1cm4gcmdiVG9IZXgodGhpcy5yLCB0aGlzLmcsIHRoaXMuYiwgYWxsb3czQ2hhcik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBoZXggdmFsdWUgb2YgdGhlIGNvbG9yIC13aXRoIGEgIyBhcHBlbmVkLlxuICAgICAqIEBwYXJhbSBhbGxvdzNDaGFyIHdpbGwgc2hvcnRlbiBoZXggdmFsdWUgdG8gMyBjaGFyIGlmIHBvc3NpYmxlXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS50b0hleFN0cmluZyA9IGZ1bmN0aW9uIChhbGxvdzNDaGFyKSB7XG4gICAgICAgIGlmIChhbGxvdzNDaGFyID09PSB2b2lkIDApIHsgYWxsb3czQ2hhciA9IGZhbHNlOyB9XG4gICAgICAgIHJldHVybiAnIycgKyB0aGlzLnRvSGV4KGFsbG93M0NoYXIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgaGV4IDggdmFsdWUgb2YgdGhlIGNvbG9yLlxuICAgICAqIEBwYXJhbSBhbGxvdzRDaGFyIHdpbGwgc2hvcnRlbiBoZXggdmFsdWUgdG8gNCBjaGFyIGlmIHBvc3NpYmxlXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS50b0hleDggPSBmdW5jdGlvbiAoYWxsb3c0Q2hhcikge1xuICAgICAgICBpZiAoYWxsb3c0Q2hhciA9PT0gdm9pZCAwKSB7IGFsbG93NENoYXIgPSBmYWxzZTsgfVxuICAgICAgICByZXR1cm4gcmdiYVRvSGV4KHRoaXMuciwgdGhpcy5nLCB0aGlzLmIsIHRoaXMuYSwgYWxsb3c0Q2hhcik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBoZXggOCB2YWx1ZSBvZiB0aGUgY29sb3IgLXdpdGggYSAjIGFwcGVuZWQuXG4gICAgICogQHBhcmFtIGFsbG93NENoYXIgd2lsbCBzaG9ydGVuIGhleCB2YWx1ZSB0byA0IGNoYXIgaWYgcG9zc2libGVcbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnRvSGV4OFN0cmluZyA9IGZ1bmN0aW9uIChhbGxvdzRDaGFyKSB7XG4gICAgICAgIGlmIChhbGxvdzRDaGFyID09PSB2b2lkIDApIHsgYWxsb3c0Q2hhciA9IGZhbHNlOyB9XG4gICAgICAgIHJldHVybiAnIycgKyB0aGlzLnRvSGV4OChhbGxvdzRDaGFyKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG9iamVjdCBhcyBhIFJHQkEgb2JqZWN0LlxuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUudG9SZ2IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByOiBNYXRoLnJvdW5kKHRoaXMuciksXG4gICAgICAgICAgICBnOiBNYXRoLnJvdW5kKHRoaXMuZyksXG4gICAgICAgICAgICBiOiBNYXRoLnJvdW5kKHRoaXMuYiksXG4gICAgICAgICAgICBhOiB0aGlzLmEsXG4gICAgICAgIH07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBSR0JBIHZhbHVlcyBpbnRlcnBvbGF0ZWQgaW50byBhIHN0cmluZyB3aXRoIHRoZSBmb2xsb3dpbmcgZm9ybWF0OlxuICAgICAqIFwiUkdCQSh4eHgsIHh4eCwgeHh4LCB4eClcIi5cbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnRvUmdiU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgciA9IE1hdGgucm91bmQodGhpcy5yKTtcbiAgICAgICAgdmFyIGcgPSBNYXRoLnJvdW5kKHRoaXMuZyk7XG4gICAgICAgIHZhciBiID0gTWF0aC5yb3VuZCh0aGlzLmIpO1xuICAgICAgICByZXR1cm4gdGhpcy5hID09PSAxID8gXCJyZ2IoXCIuY29uY2F0KHIsIFwiLCBcIikuY29uY2F0KGcsIFwiLCBcIikuY29uY2F0KGIsIFwiKVwiKSA6IFwicmdiYShcIi5jb25jYXQociwgXCIsIFwiKS5jb25jYXQoZywgXCIsIFwiKS5jb25jYXQoYiwgXCIsIFwiKS5jb25jYXQodGhpcy5yb3VuZEEsIFwiKVwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG9iamVjdCBhcyBhIFJHQkEgb2JqZWN0LlxuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUudG9QZXJjZW50YWdlUmdiID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZm10ID0gZnVuY3Rpb24gKHgpIHsgcmV0dXJuIFwiXCIuY29uY2F0KE1hdGgucm91bmQoYm91bmQwMSh4LCAyNTUpICogMTAwKSwgXCIlXCIpOyB9O1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcjogZm10KHRoaXMuciksXG4gICAgICAgICAgICBnOiBmbXQodGhpcy5nKSxcbiAgICAgICAgICAgIGI6IGZtdCh0aGlzLmIpLFxuICAgICAgICAgICAgYTogdGhpcy5hLFxuICAgICAgICB9O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgUkdCQSByZWxhdGl2ZSB2YWx1ZXMgaW50ZXJwb2xhdGVkIGludG8gYSBzdHJpbmdcbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnRvUGVyY2VudGFnZVJnYlN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJuZCA9IGZ1bmN0aW9uICh4KSB7IHJldHVybiBNYXRoLnJvdW5kKGJvdW5kMDEoeCwgMjU1KSAqIDEwMCk7IH07XG4gICAgICAgIHJldHVybiB0aGlzLmEgPT09IDFcbiAgICAgICAgICAgID8gXCJyZ2IoXCIuY29uY2F0KHJuZCh0aGlzLnIpLCBcIiUsIFwiKS5jb25jYXQocm5kKHRoaXMuZyksIFwiJSwgXCIpLmNvbmNhdChybmQodGhpcy5iKSwgXCIlKVwiKVxuICAgICAgICAgICAgOiBcInJnYmEoXCIuY29uY2F0KHJuZCh0aGlzLnIpLCBcIiUsIFwiKS5jb25jYXQocm5kKHRoaXMuZyksIFwiJSwgXCIpLmNvbmNhdChybmQodGhpcy5iKSwgXCIlLCBcIikuY29uY2F0KHRoaXMucm91bmRBLCBcIilcIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGUgJ3JlYWwnIG5hbWUgb2YgdGhlIGNvbG9yIC1pZiB0aGVyZSBpcyBvbmUuXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS50b05hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmEgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAndHJhbnNwYXJlbnQnO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmEgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGhleCA9ICcjJyArIHJnYlRvSGV4KHRoaXMuciwgdGhpcy5nLCB0aGlzLmIsIGZhbHNlKTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IE9iamVjdC5lbnRyaWVzKG5hbWVzKTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBfYiA9IF9hW19pXSwga2V5ID0gX2JbMF0sIHZhbHVlID0gX2JbMV07XG4gICAgICAgICAgICBpZiAoaGV4ID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICAgICAgdmFyIGZvcm1hdFNldCA9IEJvb2xlYW4oZm9ybWF0KTtcbiAgICAgICAgZm9ybWF0ID0gZm9ybWF0ICE9PSBudWxsICYmIGZvcm1hdCAhPT0gdm9pZCAwID8gZm9ybWF0IDogdGhpcy5mb3JtYXQ7XG4gICAgICAgIHZhciBmb3JtYXR0ZWRTdHJpbmcgPSBmYWxzZTtcbiAgICAgICAgdmFyIGhhc0FscGhhID0gdGhpcy5hIDwgMSAmJiB0aGlzLmEgPj0gMDtcbiAgICAgICAgdmFyIG5lZWRzQWxwaGFGb3JtYXQgPSAhZm9ybWF0U2V0ICYmIGhhc0FscGhhICYmIChmb3JtYXQuc3RhcnRzV2l0aCgnaGV4JykgfHwgZm9ybWF0ID09PSAnbmFtZScpO1xuICAgICAgICBpZiAobmVlZHNBbHBoYUZvcm1hdCkge1xuICAgICAgICAgICAgLy8gU3BlY2lhbCBjYXNlIGZvciBcInRyYW5zcGFyZW50XCIsIGFsbCBvdGhlciBub24tYWxwaGEgZm9ybWF0c1xuICAgICAgICAgICAgLy8gd2lsbCByZXR1cm4gcmdiYSB3aGVuIHRoZXJlIGlzIHRyYW5zcGFyZW5jeS5cbiAgICAgICAgICAgIGlmIChmb3JtYXQgPT09ICduYW1lJyAmJiB0aGlzLmEgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b05hbWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvUmdiU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZvcm1hdCA9PT0gJ3JnYicpIHtcbiAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IHRoaXMudG9SZ2JTdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZm9ybWF0ID09PSAncHJnYicpIHtcbiAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IHRoaXMudG9QZXJjZW50YWdlUmdiU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZvcm1hdCA9PT0gJ2hleCcgfHwgZm9ybWF0ID09PSAnaGV4NicpIHtcbiAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IHRoaXMudG9IZXhTdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZm9ybWF0ID09PSAnaGV4MycpIHtcbiAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IHRoaXMudG9IZXhTdHJpbmcodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZvcm1hdCA9PT0gJ2hleDQnKSB7XG4gICAgICAgICAgICBmb3JtYXR0ZWRTdHJpbmcgPSB0aGlzLnRvSGV4OFN0cmluZyh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZm9ybWF0ID09PSAnaGV4OCcpIHtcbiAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IHRoaXMudG9IZXg4U3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZvcm1hdCA9PT0gJ25hbWUnKSB7XG4gICAgICAgICAgICBmb3JtYXR0ZWRTdHJpbmcgPSB0aGlzLnRvTmFtZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmb3JtYXQgPT09ICdoc2wnKSB7XG4gICAgICAgICAgICBmb3JtYXR0ZWRTdHJpbmcgPSB0aGlzLnRvSHNsU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZvcm1hdCA9PT0gJ2hzdicpIHtcbiAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IHRoaXMudG9Ic3ZTdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9ybWF0dGVkU3RyaW5nIHx8IHRoaXMudG9IZXhTdHJpbmcoKTtcbiAgICB9O1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUudG9OdW1iZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoTWF0aC5yb3VuZCh0aGlzLnIpIDw8IDE2KSArIChNYXRoLnJvdW5kKHRoaXMuZykgPDwgOCkgKyBNYXRoLnJvdW5kKHRoaXMuYik7XG4gICAgfTtcbiAgICBUaW55Q29sb3IucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFRpbnlDb2xvcih0aGlzLnRvU3RyaW5nKCkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogTGlnaHRlbiB0aGUgY29sb3IgYSBnaXZlbiBhbW91bnQuIFByb3ZpZGluZyAxMDAgd2lsbCBhbHdheXMgcmV0dXJuIHdoaXRlLlxuICAgICAqIEBwYXJhbSBhbW91bnQgLSB2YWxpZCBiZXR3ZWVuIDEtMTAwXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS5saWdodGVuID0gZnVuY3Rpb24gKGFtb3VudCkge1xuICAgICAgICBpZiAoYW1vdW50ID09PSB2b2lkIDApIHsgYW1vdW50ID0gMTA7IH1cbiAgICAgICAgdmFyIGhzbCA9IHRoaXMudG9Ic2woKTtcbiAgICAgICAgaHNsLmwgKz0gYW1vdW50IC8gMTAwO1xuICAgICAgICBoc2wubCA9IGNsYW1wMDEoaHNsLmwpO1xuICAgICAgICByZXR1cm4gbmV3IFRpbnlDb2xvcihoc2wpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQnJpZ2h0ZW4gdGhlIGNvbG9yIGEgZ2l2ZW4gYW1vdW50LCBmcm9tIDAgdG8gMTAwLlxuICAgICAqIEBwYXJhbSBhbW91bnQgLSB2YWxpZCBiZXR3ZWVuIDEtMTAwXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS5icmlnaHRlbiA9IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgICAgICAgaWYgKGFtb3VudCA9PT0gdm9pZCAwKSB7IGFtb3VudCA9IDEwOyB9XG4gICAgICAgIHZhciByZ2IgPSB0aGlzLnRvUmdiKCk7XG4gICAgICAgIHJnYi5yID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCByZ2IuciAtIE1hdGgucm91bmQoMjU1ICogLShhbW91bnQgLyAxMDApKSkpO1xuICAgICAgICByZ2IuZyA9IE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgcmdiLmcgLSBNYXRoLnJvdW5kKDI1NSAqIC0oYW1vdW50IC8gMTAwKSkpKTtcbiAgICAgICAgcmdiLmIgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIHJnYi5iIC0gTWF0aC5yb3VuZCgyNTUgKiAtKGFtb3VudCAvIDEwMCkpKSk7XG4gICAgICAgIHJldHVybiBuZXcgVGlueUNvbG9yKHJnYik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEYXJrZW4gdGhlIGNvbG9yIGEgZ2l2ZW4gYW1vdW50LCBmcm9tIDAgdG8gMTAwLlxuICAgICAqIFByb3ZpZGluZyAxMDAgd2lsbCBhbHdheXMgcmV0dXJuIGJsYWNrLlxuICAgICAqIEBwYXJhbSBhbW91bnQgLSB2YWxpZCBiZXR3ZWVuIDEtMTAwXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS5kYXJrZW4gPSBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgIGlmIChhbW91bnQgPT09IHZvaWQgMCkgeyBhbW91bnQgPSAxMDsgfVxuICAgICAgICB2YXIgaHNsID0gdGhpcy50b0hzbCgpO1xuICAgICAgICBoc2wubCAtPSBhbW91bnQgLyAxMDA7XG4gICAgICAgIGhzbC5sID0gY2xhbXAwMShoc2wubCk7XG4gICAgICAgIHJldHVybiBuZXcgVGlueUNvbG9yKGhzbCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBNaXggdGhlIGNvbG9yIHdpdGggcHVyZSB3aGl0ZSwgZnJvbSAwIHRvIDEwMC5cbiAgICAgKiBQcm92aWRpbmcgMCB3aWxsIGRvIG5vdGhpbmcsIHByb3ZpZGluZyAxMDAgd2lsbCBhbHdheXMgcmV0dXJuIHdoaXRlLlxuICAgICAqIEBwYXJhbSBhbW91bnQgLSB2YWxpZCBiZXR3ZWVuIDEtMTAwXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS50aW50ID0gZnVuY3Rpb24gKGFtb3VudCkge1xuICAgICAgICBpZiAoYW1vdW50ID09PSB2b2lkIDApIHsgYW1vdW50ID0gMTA7IH1cbiAgICAgICAgcmV0dXJuIHRoaXMubWl4KCd3aGl0ZScsIGFtb3VudCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBNaXggdGhlIGNvbG9yIHdpdGggcHVyZSBibGFjaywgZnJvbSAwIHRvIDEwMC5cbiAgICAgKiBQcm92aWRpbmcgMCB3aWxsIGRvIG5vdGhpbmcsIHByb3ZpZGluZyAxMDAgd2lsbCBhbHdheXMgcmV0dXJuIGJsYWNrLlxuICAgICAqIEBwYXJhbSBhbW91bnQgLSB2YWxpZCBiZXR3ZWVuIDEtMTAwXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS5zaGFkZSA9IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgICAgICAgaWYgKGFtb3VudCA9PT0gdm9pZCAwKSB7IGFtb3VudCA9IDEwOyB9XG4gICAgICAgIHJldHVybiB0aGlzLm1peCgnYmxhY2snLCBhbW91bnQpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRGVzYXR1cmF0ZSB0aGUgY29sb3IgYSBnaXZlbiBhbW91bnQsIGZyb20gMCB0byAxMDAuXG4gICAgICogUHJvdmlkaW5nIDEwMCB3aWxsIGlzIHRoZSBzYW1lIGFzIGNhbGxpbmcgZ3JleXNjYWxlXG4gICAgICogQHBhcmFtIGFtb3VudCAtIHZhbGlkIGJldHdlZW4gMS0xMDBcbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLmRlc2F0dXJhdGUgPSBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgIGlmIChhbW91bnQgPT09IHZvaWQgMCkgeyBhbW91bnQgPSAxMDsgfVxuICAgICAgICB2YXIgaHNsID0gdGhpcy50b0hzbCgpO1xuICAgICAgICBoc2wucyAtPSBhbW91bnQgLyAxMDA7XG4gICAgICAgIGhzbC5zID0gY2xhbXAwMShoc2wucyk7XG4gICAgICAgIHJldHVybiBuZXcgVGlueUNvbG9yKGhzbCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTYXR1cmF0ZSB0aGUgY29sb3IgYSBnaXZlbiBhbW91bnQsIGZyb20gMCB0byAxMDAuXG4gICAgICogQHBhcmFtIGFtb3VudCAtIHZhbGlkIGJldHdlZW4gMS0xMDBcbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnNhdHVyYXRlID0gZnVuY3Rpb24gKGFtb3VudCkge1xuICAgICAgICBpZiAoYW1vdW50ID09PSB2b2lkIDApIHsgYW1vdW50ID0gMTA7IH1cbiAgICAgICAgdmFyIGhzbCA9IHRoaXMudG9Ic2woKTtcbiAgICAgICAgaHNsLnMgKz0gYW1vdW50IC8gMTAwO1xuICAgICAgICBoc2wucyA9IGNsYW1wMDEoaHNsLnMpO1xuICAgICAgICByZXR1cm4gbmV3IFRpbnlDb2xvcihoc2wpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ29tcGxldGVseSBkZXNhdHVyYXRlcyBhIGNvbG9yIGludG8gZ3JleXNjYWxlLlxuICAgICAqIFNhbWUgYXMgY2FsbGluZyBgZGVzYXR1cmF0ZSgxMDApYFxuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUuZ3JleXNjYWxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZXNhdHVyYXRlKDEwMCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTcGluIHRha2VzIGEgcG9zaXRpdmUgb3IgbmVnYXRpdmUgYW1vdW50IHdpdGhpbiBbLTM2MCwgMzYwXSBpbmRpY2F0aW5nIHRoZSBjaGFuZ2Ugb2YgaHVlLlxuICAgICAqIFZhbHVlcyBvdXRzaWRlIG9mIHRoaXMgcmFuZ2Ugd2lsbCBiZSB3cmFwcGVkIGludG8gdGhpcyByYW5nZS5cbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnNwaW4gPSBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgIHZhciBoc2wgPSB0aGlzLnRvSHNsKCk7XG4gICAgICAgIHZhciBodWUgPSAoaHNsLmggKyBhbW91bnQpICUgMzYwO1xuICAgICAgICBoc2wuaCA9IGh1ZSA8IDAgPyAzNjAgKyBodWUgOiBodWU7XG4gICAgICAgIHJldHVybiBuZXcgVGlueUNvbG9yKGhzbCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBNaXggdGhlIGN1cnJlbnQgY29sb3IgYSBnaXZlbiBhbW91bnQgd2l0aCBhbm90aGVyIGNvbG9yLCBmcm9tIDAgdG8gMTAwLlxuICAgICAqIDAgbWVhbnMgbm8gbWl4aW5nIChyZXR1cm4gY3VycmVudCBjb2xvcikuXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS5taXggPSBmdW5jdGlvbiAoY29sb3IsIGFtb3VudCkge1xuICAgICAgICBpZiAoYW1vdW50ID09PSB2b2lkIDApIHsgYW1vdW50ID0gNTA7IH1cbiAgICAgICAgdmFyIHJnYjEgPSB0aGlzLnRvUmdiKCk7XG4gICAgICAgIHZhciByZ2IyID0gbmV3IFRpbnlDb2xvcihjb2xvcikudG9SZ2IoKTtcbiAgICAgICAgdmFyIHAgPSBhbW91bnQgLyAxMDA7XG4gICAgICAgIHZhciByZ2JhID0ge1xuICAgICAgICAgICAgcjogKHJnYjIuciAtIHJnYjEucikgKiBwICsgcmdiMS5yLFxuICAgICAgICAgICAgZzogKHJnYjIuZyAtIHJnYjEuZykgKiBwICsgcmdiMS5nLFxuICAgICAgICAgICAgYjogKHJnYjIuYiAtIHJnYjEuYikgKiBwICsgcmdiMS5iLFxuICAgICAgICAgICAgYTogKHJnYjIuYSAtIHJnYjEuYSkgKiBwICsgcmdiMS5hLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IFRpbnlDb2xvcihyZ2JhKTtcbiAgICB9O1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUuYW5hbG9nb3VzID0gZnVuY3Rpb24gKHJlc3VsdHMsIHNsaWNlcykge1xuICAgICAgICBpZiAocmVzdWx0cyA9PT0gdm9pZCAwKSB7IHJlc3VsdHMgPSA2OyB9XG4gICAgICAgIGlmIChzbGljZXMgPT09IHZvaWQgMCkgeyBzbGljZXMgPSAzMDsgfVxuICAgICAgICB2YXIgaHNsID0gdGhpcy50b0hzbCgpO1xuICAgICAgICB2YXIgcGFydCA9IDM2MCAvIHNsaWNlcztcbiAgICAgICAgdmFyIHJldCA9IFt0aGlzXTtcbiAgICAgICAgZm9yIChoc2wuaCA9IChoc2wuaCAtICgocGFydCAqIHJlc3VsdHMpID4+IDEpICsgNzIwKSAlIDM2MDsgLS1yZXN1bHRzOykge1xuICAgICAgICAgICAgaHNsLmggPSAoaHNsLmggKyBwYXJ0KSAlIDM2MDtcbiAgICAgICAgICAgIHJldC5wdXNoKG5ldyBUaW55Q29sb3IoaHNsKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHRha2VuIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2luZnVzaW9uL2pRdWVyeS14Y29sb3IvYmxvYi9tYXN0ZXIvanF1ZXJ5Lnhjb2xvci5qc1xuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUuY29tcGxlbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGhzbCA9IHRoaXMudG9Ic2woKTtcbiAgICAgICAgaHNsLmggPSAoaHNsLmggKyAxODApICUgMzYwO1xuICAgICAgICByZXR1cm4gbmV3IFRpbnlDb2xvcihoc2wpO1xuICAgIH07XG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS5tb25vY2hyb21hdGljID0gZnVuY3Rpb24gKHJlc3VsdHMpIHtcbiAgICAgICAgaWYgKHJlc3VsdHMgPT09IHZvaWQgMCkgeyByZXN1bHRzID0gNjsgfVxuICAgICAgICB2YXIgaHN2ID0gdGhpcy50b0hzdigpO1xuICAgICAgICB2YXIgaCA9IGhzdi5oO1xuICAgICAgICB2YXIgcyA9IGhzdi5zO1xuICAgICAgICB2YXIgdiA9IGhzdi52O1xuICAgICAgICB2YXIgcmVzID0gW107XG4gICAgICAgIHZhciBtb2RpZmljYXRpb24gPSAxIC8gcmVzdWx0cztcbiAgICAgICAgd2hpbGUgKHJlc3VsdHMtLSkge1xuICAgICAgICAgICAgcmVzLnB1c2gobmV3IFRpbnlDb2xvcih7IGg6IGgsIHM6IHMsIHY6IHYgfSkpO1xuICAgICAgICAgICAgdiA9ICh2ICsgbW9kaWZpY2F0aW9uKSAlIDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9O1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUuc3BsaXRjb21wbGVtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaHNsID0gdGhpcy50b0hzbCgpO1xuICAgICAgICB2YXIgaCA9IGhzbC5oO1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgIG5ldyBUaW55Q29sb3IoeyBoOiAoaCArIDcyKSAlIDM2MCwgczogaHNsLnMsIGw6IGhzbC5sIH0pLFxuICAgICAgICAgICAgbmV3IFRpbnlDb2xvcih7IGg6IChoICsgMjE2KSAlIDM2MCwgczogaHNsLnMsIGw6IGhzbC5sIH0pLFxuICAgICAgICBdO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSBob3cgdGhlIGNvbG9yIHdvdWxkIGFwcGVhciBvbiBhIGJhY2tncm91bmRcbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLm9uQmFja2dyb3VuZCA9IGZ1bmN0aW9uIChiYWNrZ3JvdW5kKSB7XG4gICAgICAgIHZhciBmZyA9IHRoaXMudG9SZ2IoKTtcbiAgICAgICAgdmFyIGJnID0gbmV3IFRpbnlDb2xvcihiYWNrZ3JvdW5kKS50b1JnYigpO1xuICAgICAgICByZXR1cm4gbmV3IFRpbnlDb2xvcih7XG4gICAgICAgICAgICByOiBiZy5yICsgKGZnLnIgLSBiZy5yKSAqIGZnLmEsXG4gICAgICAgICAgICBnOiBiZy5nICsgKGZnLmcgLSBiZy5nKSAqIGZnLmEsXG4gICAgICAgICAgICBiOiBiZy5iICsgKGZnLmIgLSBiZy5iKSAqIGZnLmEsXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIGBwb2x5YWQoMylgXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS50cmlhZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9seWFkKDMpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIGBwb2x5YWQoNClgXG4gICAgICovXG4gICAgVGlueUNvbG9yLnByb3RvdHlwZS50ZXRyYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvbHlhZCg0KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBwb2x5YWQgY29sb3JzLCBsaWtlIChmb3IgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgZXRjLi4uKVxuICAgICAqIG1vbmFkLCBkeWFkLCB0cmlhZCwgdGV0cmFkLCBwZW50YWQsIGhleGFkLCBoZXB0YWQsIG9jdGFkLCBldGMuLi5cbiAgICAgKi9cbiAgICBUaW55Q29sb3IucHJvdG90eXBlLnBvbHlhZCA9IGZ1bmN0aW9uIChuKSB7XG4gICAgICAgIHZhciBoc2wgPSB0aGlzLnRvSHNsKCk7XG4gICAgICAgIHZhciBoID0gaHNsLmg7XG4gICAgICAgIHZhciByZXN1bHQgPSBbdGhpc107XG4gICAgICAgIHZhciBpbmNyZW1lbnQgPSAzNjAgLyBuO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3IFRpbnlDb2xvcih7IGg6IChoICsgaSAqIGluY3JlbWVudCkgJSAzNjAsIHM6IGhzbC5zLCBsOiBoc2wubCB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGNvbXBhcmUgY29sb3IgdnMgY3VycmVudCBjb2xvclxuICAgICAqL1xuICAgIFRpbnlDb2xvci5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKGNvbG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvUmdiU3RyaW5nKCkgPT09IG5ldyBUaW55Q29sb3IoY29sb3IpLnRvUmdiU3RyaW5nKCk7XG4gICAgfTtcbiAgICByZXR1cm4gVGlueUNvbG9yO1xufSgpKTtcbmV4cG9ydCB7IFRpbnlDb2xvciB9O1xuLy8ga2VwdCBmb3IgYmFja3dhcmRzIGNvbXBhdGFiaWxpdHkgd2l0aCB2MVxuZXhwb3J0IGZ1bmN0aW9uIHRpbnljb2xvcihjb2xvciwgb3B0cykge1xuICAgIGlmIChjb2xvciA9PT0gdm9pZCAwKSB7IGNvbG9yID0gJyc7IH1cbiAgICBpZiAob3B0cyA9PT0gdm9pZCAwKSB7IG9wdHMgPSB7fTsgfVxuICAgIHJldHVybiBuZXcgVGlueUNvbG9yKGNvbG9yLCBvcHRzKTtcbn1cbiIsIi8qKlxuICogVGFrZSBpbnB1dCBmcm9tIFswLCBuXSBhbmQgcmV0dXJuIGl0IGFzIFswLCAxXVxuICogQGhpZGRlblxuICovXG5leHBvcnQgZnVuY3Rpb24gYm91bmQwMShuLCBtYXgpIHtcbiAgICBpZiAoaXNPbmVQb2ludFplcm8obikpIHtcbiAgICAgICAgbiA9ICcxMDAlJztcbiAgICB9XG4gICAgdmFyIGlzUGVyY2VudCA9IGlzUGVyY2VudGFnZShuKTtcbiAgICBuID0gbWF4ID09PSAzNjAgPyBuIDogTWF0aC5taW4obWF4LCBNYXRoLm1heCgwLCBwYXJzZUZsb2F0KG4pKSk7XG4gICAgLy8gQXV0b21hdGljYWxseSBjb252ZXJ0IHBlcmNlbnRhZ2UgaW50byBudW1iZXJcbiAgICBpZiAoaXNQZXJjZW50KSB7XG4gICAgICAgIG4gPSBwYXJzZUludChTdHJpbmcobiAqIG1heCksIDEwKSAvIDEwMDtcbiAgICB9XG4gICAgLy8gSGFuZGxlIGZsb2F0aW5nIHBvaW50IHJvdW5kaW5nIGVycm9yc1xuICAgIGlmIChNYXRoLmFicyhuIC0gbWF4KSA8IDAuMDAwMDAxKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICAvLyBDb252ZXJ0IGludG8gWzAsIDFdIHJhbmdlIGlmIGl0IGlzbid0IGFscmVhZHlcbiAgICBpZiAobWF4ID09PSAzNjApIHtcbiAgICAgICAgLy8gSWYgbiBpcyBhIGh1ZSBnaXZlbiBpbiBkZWdyZWVzLFxuICAgICAgICAvLyB3cmFwIGFyb3VuZCBvdXQtb2YtcmFuZ2UgdmFsdWVzIGludG8gWzAsIDM2MF0gcmFuZ2VcbiAgICAgICAgLy8gdGhlbiBjb252ZXJ0IGludG8gWzAsIDFdLlxuICAgICAgICBuID0gKG4gPCAwID8gKG4gJSBtYXgpICsgbWF4IDogbiAlIG1heCkgLyBwYXJzZUZsb2F0KFN0cmluZyhtYXgpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIElmIG4gbm90IGEgaHVlIGdpdmVuIGluIGRlZ3JlZXNcbiAgICAgICAgLy8gQ29udmVydCBpbnRvIFswLCAxXSByYW5nZSBpZiBpdCBpc24ndCBhbHJlYWR5LlxuICAgICAgICBuID0gKG4gJSBtYXgpIC8gcGFyc2VGbG9hdChTdHJpbmcobWF4KSk7XG4gICAgfVxuICAgIHJldHVybiBuO1xufVxuLyoqXG4gKiBGb3JjZSBhIG51bWJlciBiZXR3ZWVuIDAgYW5kIDFcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsYW1wMDEodmFsKSB7XG4gICAgcmV0dXJuIE1hdGgubWluKDEsIE1hdGgubWF4KDAsIHZhbCkpO1xufVxuLyoqXG4gKiBOZWVkIHRvIGhhbmRsZSAxLjAgYXMgMTAwJSwgc2luY2Ugb25jZSBpdCBpcyBhIG51bWJlciwgdGhlcmUgaXMgbm8gZGlmZmVyZW5jZSBiZXR3ZWVuIGl0IGFuZCAxXG4gKiA8aHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy83NDIyMDcyL2phdmFzY3JpcHQtaG93LXRvLWRldGVjdC1udW1iZXItYXMtYS1kZWNpbWFsLWluY2x1ZGluZy0xLTA+XG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09uZVBvaW50WmVybyhuKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBuID09PSAnc3RyaW5nJyAmJiBuLmluZGV4T2YoJy4nKSAhPT0gLTEgJiYgcGFyc2VGbG9hdChuKSA9PT0gMTtcbn1cbi8qKlxuICogQ2hlY2sgdG8gc2VlIGlmIHN0cmluZyBwYXNzZWQgaW4gaXMgYSBwZXJjZW50YWdlXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1BlcmNlbnRhZ2Uobikge1xuICAgIHJldHVybiB0eXBlb2YgbiA9PT0gJ3N0cmluZycgJiYgbi5pbmRleE9mKCclJykgIT09IC0xO1xufVxuLyoqXG4gKiBSZXR1cm4gYSB2YWxpZCBhbHBoYSB2YWx1ZSBbMCwxXSB3aXRoIGFsbCBpbnZhbGlkIHZhbHVlcyBiZWluZyBzZXQgdG8gMVxuICogQGhpZGRlblxuICovXG5leHBvcnQgZnVuY3Rpb24gYm91bmRBbHBoYShhKSB7XG4gICAgYSA9IHBhcnNlRmxvYXQoYSk7XG4gICAgaWYgKGlzTmFOKGEpIHx8IGEgPCAwIHx8IGEgPiAxKSB7XG4gICAgICAgIGEgPSAxO1xuICAgIH1cbiAgICByZXR1cm4gYTtcbn1cbi8qKlxuICogUmVwbGFjZSBhIGRlY2ltYWwgd2l0aCBpdCdzIHBlcmNlbnRhZ2UgdmFsdWVcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUb1BlcmNlbnRhZ2Uobikge1xuICAgIGlmIChuIDw9IDEpIHtcbiAgICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KE51bWJlcihuKSAqIDEwMCwgXCIlXCIpO1xuICAgIH1cbiAgICByZXR1cm4gbjtcbn1cbi8qKlxuICogRm9yY2UgYSBoZXggdmFsdWUgdG8gaGF2ZSAyIGNoYXJhY3RlcnNcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhZDIoYykge1xuICAgIHJldHVybiBjLmxlbmd0aCA9PT0gMSA/ICcwJyArIGMgOiBTdHJpbmcoYyk7XG59XG4iLCJleHBvcnQgY29uc3QgY29tbWFuZHMgPSB7XG4gICAgZ2VuZXJhbFNldHRpbmdzOiAnZ2VuZXJhbFNldHRpbmdzJyxcbiAgICBleHBvcnQ6ICdleHBvcnQnLFxuICAgIHNlbmRTZXR0aW5nczogJ3NlbmRTZXR0aW5ncycsXG4gICAgdXJsRXhwb3J0OiAndXJsRXhwb3J0JyxcbiAgICBoZWxwOiAnaGVscCcsXG4gICAgZGVtbzogJ2RlbW8nLFxuICAgIG9wZW5Vcmw6ICdvcGVuVXJsJyxcbiAgICByZXNldDogJ3Jlc2V0JyxcbiAgICBzYXZlU2V0dGluZ3M6ICdzYXZlU2V0dGluZ3MnLFxuICAgIGNsb3NlUGx1Z2luOiAnY2xvc2VQbHVnaW4nXG59O1xuIiwiLyogaXN0YW5idWwgaWdub3JlIGZpbGUgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICB1aToge1xuICAgICAgICBnZW5lcmFsU2V0dGluZ3M6IHtcbiAgICAgICAgICAgIHdpZHRoOiA1NTAsXG4gICAgICAgICAgICBoZWlnaHQ6IDgzNlxuICAgICAgICB9LFxuICAgICAgICBleHBvcnQ6IHtcbiAgICAgICAgICAgIHdpZHRoOiA1NTAsXG4gICAgICAgICAgICBoZWlnaHQ6IDM1NlxuICAgICAgICB9LFxuICAgICAgICB1cmxFeHBvcnQ6IHtcbiAgICAgICAgICAgIHdpZHRoOiA1NTAsXG4gICAgICAgICAgICBoZWlnaHQ6IDY1MFxuICAgICAgICB9XG4gICAgfSxcbiAgICBrZXk6IHtcbiAgICAgICAgbGFzdFZlcnNpb25TZXR0aW5nc09wZW5lZDogJ2xhc3RWZXJzaW9uU2V0dGluZ3NPcGVuZWQnLFxuICAgICAgICBmaWxlSWQ6ICdmaWxlSWQnLFxuICAgICAgICBzZXR0aW5nczogJ3NldHRpbmdzJyxcbiAgICAgICAgZXh0ZW5zaW9uUGx1Z2luRGF0YTogJ29yZy5sdWthc29wcGVybWFubi5maWdtYURlc2lnblRva2VucycsXG4gICAgICAgIGV4dGVuc2lvbkZpZ21hU3R5bGVJZDogJ3N0eWxlSWQnLFxuICAgICAgICBleHRlbnNpb25WYXJpYWJsZVN0eWxlSWQ6ICd2YXJpYWJsZUlkJyxcbiAgICAgICAgZXh0ZW5zaW9uQWxpYXM6ICdhbGlhcycsXG4gICAgICAgIGF1dGhUeXBlOiB7XG4gICAgICAgICAgICB0b2tlbjogJ3Rva2VuJyxcbiAgICAgICAgICAgIGdpdGxhYlRva2VuOiAnZ2l0bGFiX3Rva2VuJyxcbiAgICAgICAgICAgIGdpdGxhYkNvbW1pdDogJ2dpdGxhYl9jb21taXQnLFxuICAgICAgICAgICAgYmFzaWM6ICdCYXNpYycsXG4gICAgICAgICAgICBiZWFyZXI6ICdCZWFyZXInXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGV4Y2x1c2lvblByZWZpeERlZmF1bHQ6IFsnXycsICcuJ10sXG4gICAgZmlsZUV4dGVuc2lvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgbGFiZWw6ICcudG9rZW5zLmpzb24nLFxuICAgICAgICAgICAgdmFsdWU6ICcudG9rZW5zLmpzb24nXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxhYmVsOiAnLnRva2VucycsXG4gICAgICAgICAgICB2YWx1ZTogJy50b2tlbnMnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxhYmVsOiAnLmpzb24nLFxuICAgICAgICAgICAgdmFsdWU6ICcuanNvbidcbiAgICAgICAgfVxuICAgIF1cbn07XG4iLCJleHBvcnQgY29uc3QgZGVmYXVsdFNldHRpbmdzID0ge1xuICAgIGZpbGVuYW1lOiAnZGVzaWduLXRva2VucycsXG4gICAgZXh0ZW5zaW9uOiAnLnRva2Vucy5qc29uJyxcbiAgICBuYW1lQ29udmVyc2lvbjogJ2RlZmF1bHQnLFxuICAgIHRva2VuRm9ybWF0OiAnc3RhbmRhcmQnLFxuICAgIGNvbXByZXNzaW9uOiBmYWxzZSxcbiAgICB1cmxKc29uQ29tcHJlc3Npb246IHRydWUsXG4gICAgc2VydmVyVXJsOiB1bmRlZmluZWQsXG4gICAgZXZlbnRUeXBlOiAndXBkYXRlLXRva2VucycsXG4gICAgYWNjZXNzVG9rZW46IHVuZGVmaW5lZCxcbiAgICBhY2NlcHRIZWFkZXI6ICdhcHBsaWNhdGlvbi92bmQuZ2l0aHViLmV2ZXJlc3QtcHJldmlldytqc29uJyxcbiAgICBjb250ZW50VHlwZTogJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcsXG4gICAgYXV0aFR5cGU6ICd0b2tlbicsXG4gICAgcmVmZXJlbmNlOiAnbWFpbicsXG4gICAgZXhjbHVzaW9uUHJlZml4OiAnJyxcbiAgICBleGNsdWRlRXh0ZW5zaW9uUHJvcDogZmFsc2UsXG4gICAgYWxpYXM6ICdhbGlhcywgcmVmLCByZWZlcmVuY2UnLFxuICAgIGtleUluTmFtZTogZmFsc2UsXG4gICAgcHJlZml4SW5OYW1lOiB0cnVlLFxuICAgIG1vZGVJblRva2VuVmFsdWU6IGZhbHNlLFxuICAgIG1vZGVJblRva2VuTmFtZTogZmFsc2UsXG4gICAgcmVzb2x2ZVNhbWVDb2xsZWN0aW9uT3JNb2RlUmVmZXJlbmNlOiBmYWxzZSxcbiAgICBwcmVmaXg6IHtcbiAgICAgICAgY29sb3I6ICdjb2xvcicsXG4gICAgICAgIGdyYWRpZW50OiAnZ3JhZGllbnQnLFxuICAgICAgICB0eXBvZ3JhcGh5OiAndHlwb2dyYXBoeScsXG4gICAgICAgIGZvbnQ6ICdmb250JyxcbiAgICAgICAgZWZmZWN0OiAnZWZmZWN0JyxcbiAgICAgICAgZ3JpZDogJ2dyaWQnLFxuICAgICAgICBib3JkZXI6ICdib3JkZXIsIGJvcmRlcnMnLFxuICAgICAgICBicmVha3BvaW50OiAnYnJlYWtwb2ludCwgYnJlYWtwb2ludHMnLFxuICAgICAgICByYWRpdXM6ICdyYWRpdXMsIHJhZGlpJyxcbiAgICAgICAgc2l6ZTogJ3NpemUsIHNpemVzJyxcbiAgICAgICAgc3BhY2luZzogJ3NwYWNpbmcnLFxuICAgICAgICBtb3Rpb246ICdtb3Rpb24nLFxuICAgICAgICBvcGFjaXR5OiAnb3BhY2l0eSwgb3BhY2l0aWVzJ1xuICAgIH0sXG4gICAgZXhwb3J0czoge1xuICAgICAgICBjb2xvcjogdHJ1ZSxcbiAgICAgICAgZ3JhZGllbnQ6IHRydWUsXG4gICAgICAgIGZvbnQ6IHRydWUsXG4gICAgICAgIHR5cG9ncmFwaHk6IHRydWUsXG4gICAgICAgIGVmZmVjdDogdHJ1ZSxcbiAgICAgICAgZ3JpZDogdHJ1ZSxcbiAgICAgICAgYm9yZGVyOiB0cnVlLFxuICAgICAgICBicmVha3BvaW50OiB0cnVlLFxuICAgICAgICByYWRpdXM6IHRydWUsXG4gICAgICAgIHNpemU6IHRydWUsXG4gICAgICAgIHNwYWNpbmc6IHRydWUsXG4gICAgICAgIG1vdGlvbjogdHJ1ZSxcbiAgICAgICAgb3BhY2l0eTogdHJ1ZSxcbiAgICAgICAgdmFyaWFibGVzOiB0cnVlXG4gICAgfVxufTtcbiIsIi8qIGlzdGFuYnVsIGlnbm9yZSBmaWxlICovXG5leHBvcnQgY29uc3QgdG9rZW5UeXBlcyA9IHtcbiAgICBjb2xvcjoge1xuICAgICAgICBsYWJlbDogJ0NvbG9ycycsXG4gICAgICAgIGtleTogJ2NvbG9yJ1xuICAgIH0sXG4gICAgZ3JhZGllbnQ6IHtcbiAgICAgICAgbGFiZWw6ICdHcmFkaWVudHMnLFxuICAgICAgICBrZXk6ICdncmFkaWVudCdcbiAgICB9LFxuICAgIGZvbnQ6IHtcbiAgICAgICAgbGFiZWw6ICdGb250IFN0eWxlcycsXG4gICAgICAgIGtleTogJ2ZvbnQnXG4gICAgfSxcbiAgICB0eXBvZ3JhcGh5OiB7XG4gICAgICAgIGxhYmVsOiAnVHlwb2dyYXBoeScsXG4gICAgICAgIGtleTogJ3R5cG9ncmFwaHknLFxuICAgICAgICBleGNsdWRlOiBbJ29yaWdpbmFsJ11cbiAgICB9LFxuICAgIGVmZmVjdDoge1xuICAgICAgICBsYWJlbDogJ0VmZmVjdHMnLFxuICAgICAgICBrZXk6ICdlZmZlY3QnXG4gICAgfSxcbiAgICBncmlkOiB7XG4gICAgICAgIGxhYmVsOiAnR3JpZHMnLFxuICAgICAgICBrZXk6ICdncmlkJ1xuICAgIH0sXG4gICAgYm9yZGVyOiB7XG4gICAgICAgIGxhYmVsOiAnQm9yZGVycycsXG4gICAgICAgIGtleTogJ2JvcmRlcidcbiAgICB9LFxuICAgIGJyZWFrcG9pbnQ6IHtcbiAgICAgICAgbGFiZWw6ICdCcmVha3BvaW50cycsXG4gICAgICAgIGtleTogJ2JyZWFrcG9pbnQnXG4gICAgfSxcbiAgICByYWRpdXM6IHtcbiAgICAgICAgbGFiZWw6ICdSYWRpaScsXG4gICAgICAgIGtleTogJ3JhZGl1cydcbiAgICB9LFxuICAgIHNpemU6IHtcbiAgICAgICAgbGFiZWw6ICdTaXplcycsXG4gICAgICAgIGtleTogJ3NpemUnXG4gICAgfSxcbiAgICBzcGFjaW5nOiB7XG4gICAgICAgIGxhYmVsOiAnU3BhY2luZycsXG4gICAgICAgIGtleTogJ3NwYWNpbmcnXG4gICAgfSxcbiAgICBtb3Rpb246IHtcbiAgICAgICAgbGFiZWw6ICdNb3Rpb24nLFxuICAgICAgICBrZXk6ICdtb3Rpb24nXG4gICAgfSxcbiAgICBvcGFjaXR5OiB7XG4gICAgICAgIGxhYmVsOiAnT3BhY2l0eScsXG4gICAgICAgIGtleTogJ29wYWNpdHknXG4gICAgfSxcbiAgICB2YXJpYWJsZXM6IHtcbiAgICAgICAgbGFiZWw6ICdGaWdtYSBWYXJpYWJsZXMgKEJFVEEpJyxcbiAgICAgICAga2V5OiAndmFyaWFibGVzJyxcbiAgICAgICAgZXhjbHVkZTogWydvcmlnaW5hbCddXG4gICAgfVxufTtcbiIsImltcG9ydCByb3VuZFdpdGhEZWNpbWFscyBmcm9tICdAdXRpbHMvcm91bmRXaXRoRGVjaW1hbHMnO1xuaW1wb3J0IHsgdG9rZW5UeXBlcyB9IGZyb20gJ0Bjb25maWcvdG9rZW5UeXBlcyc7XG5pbXBvcnQgeyBmaWx0ZXJCeVByZWZpeCB9IGZyb20gJy4vZXh0cmFjdFV0aWxpdGllcyc7XG5pbXBvcnQgY29uZmlnIGZyb20gJ0Bjb25maWcvY29uZmlnJztcbmNvbnN0IHN0cm9rZUpvaW5zID0ge1xuICAgIE1JVEVSOiAnbWl0ZXInLFxuICAgIEJFVkVMOiAnYmV2ZWwnLFxuICAgIFJPVU5EOiAncm91bmQnXG59O1xuY29uc3Qgc3Ryb2tlQWxpZ25zID0ge1xuICAgIENFTlRFUjogJ2NlbnRlcicsXG4gICAgSU5TSURFOiAnaW5zaWRlJyxcbiAgICBPVVRTSURFOiAnb3V0c2lkZSdcbn07XG5jb25zdCBleHRyYWN0Qm9yZGVycyA9ICh0b2tlbk5vZGVzLCBwcmVmaXhBcnJheSkgPT4ge1xuICAgIC8vIHJldHVybiBhcyBvYmplY3RcbiAgICByZXR1cm4gdG9rZW5Ob2Rlcy5maWx0ZXIoZmlsdGVyQnlQcmVmaXgocHJlZml4QXJyYXkpKVxuICAgICAgICAvLyByZW1vdmUgbm9kZXMgd2l0aCBubyBib3JkZXIgcHJvcGVydHlcbiAgICAgICAgLmZpbHRlcihub2RlID0+IG5vZGUuc3Ryb2tlcy5sZW5ndGggPiAwKVxuICAgICAgICAvLyBjb252ZXJ0IGJvcmRlcnNcbiAgICAgICAgLm1hcChub2RlID0+ICh7XG4gICAgICAgIG5hbWU6IG5vZGUubmFtZSxcbiAgICAgICAgY2F0ZWdvcnk6ICdib3JkZXInLFxuICAgICAgICBleHBvcnRLZXk6IHRva2VuVHlwZXMuYm9yZGVyLmtleSxcbiAgICAgICAgZGVzY3JpcHRpb246IG5vZGUuZGVzY3JpcHRpb24gfHwgbnVsbCxcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICBzdHJva2VBbGlnbjoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBzdHJva2VBbGlnbnNbbm9kZS5zdHJva2VBbGlnbl0sXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkYXNoUGF0dGVybjoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBbLi4uKG5vZGUuZGFzaFBhdHRlcm4gIT09IHVuZGVmaW5lZCAmJiBub2RlLmRhc2hQYXR0ZXJuLmxlbmd0aCA+IDAgPyBub2RlLmRhc2hQYXR0ZXJuIDogWzAsIDBdKV0sXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdHJva2VDYXA6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogKCh0eXBlb2Ygbm9kZS5zdHJva2VDYXAgPT09ICdzdHJpbmcnKSA/IG5vZGUuc3Ryb2tlQ2FwLnRvTG93ZXJDYXNlKCkgOiAnbWl4ZWQnKSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0cm9rZUpvaW46IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogc3Ryb2tlSm9pbnNbbm9kZS5zdHJva2VKb2luXSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0cm9rZU1pdGVyTGltaXQ6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMobm9kZS5zdHJva2VNaXRlckxpbWl0KSxcbiAgICAgICAgICAgICAgICB1bml0OiAnZGVncmVlJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHN0cm9rZVN0eWxlSWQ6IHtcbiAgICAgICAgICAgIC8vICAgdmFsdWU6IG5vZGUuc3Ryb2tlU3R5bGVJZFxuICAgICAgICAgICAgLy8gfSxcbiAgICAgICAgICAgIHN0cm9rZVdlaWdodDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLnN0cm9rZVdlaWdodCxcbiAgICAgICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3Ryb2tlOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG5vZGUuc3Ryb2tlc1swXSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgICAgICAgIFtjb25maWcua2V5LmV4dGVuc2lvblBsdWdpbkRhdGFdOiB7XG4gICAgICAgICAgICAgICAgZXhwb3J0S2V5OiB0b2tlblR5cGVzLmJvcmRlci5rZXlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0Qm9yZGVycztcbiIsImltcG9ydCB7IHRva2VuVHlwZXMgfSBmcm9tICdAY29uZmlnL3Rva2VuVHlwZXMnO1xuaW1wb3J0IHJvdW5kV2l0aERlY2ltYWxzIGZyb20gJ0B1dGlscy9yb3VuZFdpdGhEZWNpbWFscyc7XG5pbXBvcnQgeyBmaWx0ZXJCeVByZWZpeCB9IGZyb20gJy4vZXh0cmFjdFV0aWxpdGllcyc7XG5pbXBvcnQgY29uZmlnIGZyb20gJ0Bjb25maWcvY29uZmlnJztcbmNvbnN0IGV4dHJhY3RCcmVha3BvaW50cyA9ICh0b2tlbk5vZGVzLCBwcmVmaXhBcnJheSkgPT4ge1xuICAgIC8vIHJldHVybiBhcyBvYmplY3RcbiAgICByZXR1cm4gdG9rZW5Ob2Rlcy5maWx0ZXIoZmlsdGVyQnlQcmVmaXgocHJlZml4QXJyYXkpKS5tYXAobm9kZSA9PiAoe1xuICAgICAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgICAgIGNhdGVnb3J5OiAnYnJlYWtwb2ludCcsXG4gICAgICAgIGV4cG9ydEtleTogdG9rZW5UeXBlcy5icmVha3BvaW50LmtleSxcbiAgICAgICAgZGVzY3JpcHRpb246IG5vZGUuZGVzY3JpcHRpb24gfHwgbnVsbCxcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICB3aWR0aDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLndpZHRoLCAyKSxcbiAgICAgICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVpZ2h0OiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKG5vZGUuaGVpZ2h0LCAyKSxcbiAgICAgICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgICAgICAgIFtjb25maWcua2V5LmV4dGVuc2lvblBsdWdpbkRhdGFdOiB7XG4gICAgICAgICAgICAgICAgZXhwb3J0S2V5OiB0b2tlblR5cGVzLmJyZWFrcG9pbnQua2V5XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZXh0cmFjdEJyZWFrcG9pbnRzO1xuIiwiaW1wb3J0IHsgdG9rZW5UeXBlcyB9IGZyb20gJ0Bjb25maWcvdG9rZW5UeXBlcyc7XG5pbXBvcnQgeyBjb252ZXJ0UGFpbnRUb1JnYmEsIHJvdW5kUmdiYSB9IGZyb20gJ0B1dGlscy9jb252ZXJ0Q29sb3InO1xuaW1wb3J0IHJvdW5kV2l0aERlY2ltYWxzIGZyb20gJ0B1dGlscy9yb3VuZFdpdGhEZWNpbWFscyc7XG5pbXBvcnQgY29uZmlnIGZyb20gJ0Bjb25maWcvY29uZmlnJztcbmNvbnN0IHRyYW5zcGFyZW50RmlsbCA9IHtcbiAgICBmaWxsOiB7XG4gICAgICAgIHZhbHVlOiB7IHI6IDAsIGc6IDAsIGI6IDAsIGE6IDAgfSxcbiAgICAgICAgdHlwZTogJ2NvbG9yJyxcbiAgICAgICAgYmxlbmRNb2RlOiAnbm9ybWFsJ1xuICAgIH1cbn07XG5jb25zdCBwYXJzZURlc2NyaXB0aW9uID0gKGRlc2NyaXB0aW9uID0gJycsIGFsaWFzQXJyYXkpID0+IHtcbiAgICBhbGlhc0FycmF5ID0gIWFsaWFzQXJyYXkgfHwgYWxpYXNBcnJheS5maWx0ZXIoaSA9PiBpKS5sZW5ndGggPT09IDAgPyBbJ1JlZjonXSA6IGFsaWFzQXJyYXk7XG4gICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKCcoJyArIGFsaWFzQXJyYXkuam9pbignfCcpLnRvTG93ZXJDYXNlKCkgKyAnKScgKyAnOj9cXFxccycpO1xuICAgIC8vIHNwbGl0IGRlc2NyaXB0aW9uIGluIGxpbmVzXG4gICAgbGV0IGFsaWFzO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uTGluZXMgPSBkZXNjcmlwdGlvbi5zcGxpdCgvXFxyP1xcbi8pXG4gICAgICAgIC8vIGZpbmQgbWF0Y2hcbiAgICAgICAgLmZpbHRlcihsaW5lID0+IHtcbiAgICAgICAgaWYgKGxpbmUudG9Mb3dlckNhc2UoKS5tYXRjaChyZWdleCkpIHtcbiAgICAgICAgICAgIGFsaWFzID0gbGluZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UocmVnZXgsICcnKS50cmltKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gICAgLy8gcmV0dXJuIG9iamVjdFxuICAgIHJldHVybiB7XG4gICAgICAgIGFsaWFzOiBhbGlhcyxcbiAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uTGluZXMuam9pbignXFxuJylcbiAgICB9O1xufTtcbmNvbnN0IGFkZEFsaWFzID0gKGFsaWFzKSA9PiBhbGlhcyA/ICh7IFtjb25maWcua2V5LmV4dGVuc2lvbkFsaWFzXTogYWxpYXMgfSkgOiAoe30pO1xuY29uc3QgZ3JhZGllbnRUeXBlID0ge1xuICAgIEdSQURJRU5UX0xJTkVBUjogJ2xpbmVhcicsXG4gICAgR1JBRElFTlRfUkFESUFMOiAncmFkaWFsJyxcbiAgICBHUkFESUVOVF9BTkdVTEFSOiAnYW5ndWxhcicsXG4gICAgR1JBRElFTlRfRElBTU9ORDogJ2RpYW1vbmQnXG59O1xuY29uc3QgaXNHcmFkaWVudCA9IChwYWludCkgPT4gWydHUkFESUVOVF9MSU5FQVInLCAnR1JBRElFTlRfUkFESUFMJywgJ0dSQURJRU5UX0FOR1VMQVInLCAnR1JBRElFTlRfRElBTU9ORCddLmluY2x1ZGVzKHBhaW50ID09PSBudWxsIHx8IHBhaW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYWludC50eXBlKTtcbmNvbnN0IHJvdGF0aW9uRnJvbU1hdHJpeCA9IChbW3gxLCB5MV0sIFt4MiwgeTJdXSkgPT4ge1xuICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI0OTA5NTg2L2ZpbmQtcm90YXRpb24tYW5nbGUtZm9yLWFmZmluZS10cmFuc2Zvcm1cbiAgICBjb25zdCBhbmdsZSA9IE1hdGguYXRhbjIoeTIgLSB5MSwgeDIgLSB4MSkgKiAoMTgwLjAgLyBNYXRoLlBJKSArIDMxNTtcbiAgICByZXR1cm4gYW5nbGUgPiAzNjAgPyBhbmdsZSAtIDM2MCA6IGFuZ2xlO1xufTtcbmNvbnN0IGV4dHJhY3RGaWxscyA9IChwYWludCkgPT4ge1xuICAgIHZhciBfYTtcbiAgICBpZiAocGFpbnQudHlwZSA9PT0gJ1NPTElEJykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmlsbDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBjb252ZXJ0UGFpbnRUb1JnYmEocGFpbnQpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdjb2xvcicsXG4gICAgICAgICAgICAgICAgYmxlbmRNb2RlOiAoKF9hID0gcGFpbnQuYmxlbmRNb2RlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9Mb3dlckNhc2UoKSkgfHwgJ25vcm1hbCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgaWYgKFsnR1JBRElFTlRfTElORUFSJywgJ0dSQURJRU5UX1JBRElBTCcsICdHUkFESUVOVF9BTkdVTEFSJywgJ0dSQURJRU5UX0RJQU1PTkQnXS5pbmNsdWRlcyhwYWludC50eXBlKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ3JhZGllbnRUeXBlOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGdyYWRpZW50VHlwZVtwYWludC50eXBlXSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJvdGF0aW9uOiB7XG4gICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjQ5MDk1ODYvZmluZC1yb3RhdGlvbi1hbmdsZS1mb3ItYWZmaW5lLXRyYW5zZm9ybVxuICAgICAgICAgICAgICAgIHZhbHVlOiByb3RhdGlvbkZyb21NYXRyaXgocGFpbnQuZ3JhZGllbnRUcmFuc2Zvcm0pLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdkZWdyZWUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RvcHM6IHBhaW50LmdyYWRpZW50U3RvcHMubWFwKHN0b3AgPT4gKHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMoc3RvcC5wb3NpdGlvbiksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb2xvcjoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRSZ2JhKHN0b3AuY29sb3IpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgb3BhY2l0eToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhwYWludC5vcGFjaXR5KSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICAvLyByZXR1cm4gbnVsbCBpZiBubyBtYXRjaGluZyB0eXBlXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICByZXR1cm4gbnVsbDtcbn07XG5jb25zdCBleHRyYWN0Q29sb3JzID0gKHRva2VuTm9kZXMsIHByZWZpeEFycmF5KSA9PiB7XG4gICAgLy8gZ2V0IGFsbCBwYWludCBzdHlsZXNcbiAgICByZXR1cm4gdG9rZW5Ob2Rlc1xuICAgICAgICAucmVkdWNlKChwcmV2aW91c1ZhbHVlLCBub2RlKSA9PiB7XG4gICAgICAgIC8vIGlnbm9yZSBpbWFnZS1vbmx5IGZpbGxzXG4gICAgICAgIGNvbnN0IHBhaW50c0FmdGVySW1hZ2VGaWx0ZXIgPSBub2RlLnBhaW50cy5maWx0ZXIocGFpbnQgPT4gcGFpbnQudHlwZSAhPT0gJ0lNQUdFJyk7XG4gICAgICAgIGlmIChub2RlLnBhaW50cy5sZW5ndGggJiYgcGFpbnRzQWZ0ZXJJbWFnZUZpbHRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBwcmV2aW91c1ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlbW92ZSBpbWFnZXMgZmlsbHMgZnJvbSB0b2tlbnNcbiAgICAgICAgbm9kZS5wYWludHMgPSBwYWludHNBZnRlckltYWdlRmlsdGVyO1xuICAgICAgICBjb25zdCB7IGFsaWFzLCBkZXNjcmlwdGlvbiB9ID0gcGFyc2VEZXNjcmlwdGlvbihub2RlLmRlc2NyaXB0aW9uLCBwcmVmaXhBcnJheS5hbGlhcyk7XG4gICAgICAgIGNvbnN0IG5vZGVJc0dyYWRpZW50ID0gaXNHcmFkaWVudChub2RlLnBhaW50c1swXSk7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IG5vZGUucGFpbnRzLmxlbmd0aCA/IG5vZGUucGFpbnRzLm1hcChwYWludCA9PiBleHRyYWN0RmlsbHMocGFpbnQpKSA6IFt0cmFuc3BhcmVudEZpbGxdO1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgLi4ucHJldmlvdXNWYWx1ZSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBgJHtub2RlSXNHcmFkaWVudCA/IHByZWZpeEFycmF5LmdyYWRpZW50WzBdIDogcHJlZml4QXJyYXkuY29sb3JbMF19LyR7bm9kZS5uYW1lfWAsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IG5vZGVJc0dyYWRpZW50ID8gJ2dyYWRpZW50JyA6ICdjb2xvcicsXG4gICAgICAgICAgICAgICAgZXhwb3J0S2V5OiAobm9kZUlzR3JhZGllbnQgPyB0b2tlblR5cGVzLmdyYWRpZW50LmtleSA6IHRva2VuVHlwZXMuY29sb3Iua2V5KSxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgdmFsdWVzLFxuICAgICAgICAgICAgICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgW2NvbmZpZy5rZXkuZXh0ZW5zaW9uUGx1Z2luRGF0YV06IE9iamVjdC5hc3NpZ24oeyBbY29uZmlnLmtleS5leHRlbnNpb25GaWdtYVN0eWxlSWRdOiBub2RlLmlkLCBleHBvcnRLZXk6IChub2RlSXNHcmFkaWVudCA/IHRva2VuVHlwZXMuZ3JhZGllbnQua2V5IDogdG9rZW5UeXBlcy5jb2xvci5rZXkpIH0sIChhZGRBbGlhcyhhbGlhcykpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICB9LCBbXSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZXh0cmFjdENvbG9ycztcbiIsImltcG9ydCB7IHRva2VuVHlwZXMgfSBmcm9tICdAY29uZmlnL3Rva2VuVHlwZXMnO1xuaW1wb3J0IHsgcm91bmRSZ2JhIH0gZnJvbSAnQHV0aWxzL2NvbnZlcnRDb2xvcic7XG5pbXBvcnQgY29uZmlnIGZyb20gJ0Bjb25maWcvY29uZmlnJztcbmNvbnN0IGVmZmVjdFR5cGUgPSB7XG4gICAgTEFZRVJfQkxVUjogJ2xheWVyQmx1cicsXG4gICAgQkFDS0dST1VORF9CTFVSOiAnYmFja2dyb3VuZEJsdXInLFxuICAgIERST1BfU0hBRE9XOiAnZHJvcFNoYWRvdycsXG4gICAgSU5ORVJfU0hBRE9XOiAnaW5uZXJTaGFkb3cnXG59O1xuY29uc3QgYmx1clZhbHVlcyA9IChlZmZlY3QpID0+ICh7XG4gICAgZWZmZWN0VHlwZToge1xuICAgICAgICB2YWx1ZTogZWZmZWN0VHlwZVtlZmZlY3QudHlwZV0sXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgfSxcbiAgICByYWRpdXM6IHtcbiAgICAgICAgdmFsdWU6IGVmZmVjdC5yYWRpdXMsXG4gICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgfVxufSk7XG5jb25zdCBzaGFkb3dWYWx1ZXMgPSBlZmZlY3QgPT4gKHtcbiAgICBlZmZlY3RUeXBlOiB7XG4gICAgICAgIHZhbHVlOiBlZmZlY3RUeXBlW2VmZmVjdC50eXBlXSxcbiAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICB9LFxuICAgIHJhZGl1czoge1xuICAgICAgICB2YWx1ZTogZWZmZWN0LnJhZGl1cyxcbiAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICB9LFxuICAgIGNvbG9yOiB7XG4gICAgICAgIHZhbHVlOiByb3VuZFJnYmEoZWZmZWN0LmNvbG9yKSxcbiAgICAgICAgdHlwZTogJ2NvbG9yJ1xuICAgIH0sXG4gICAgb2Zmc2V0OiB7XG4gICAgICAgIHg6IHtcbiAgICAgICAgICAgIHZhbHVlOiBlZmZlY3Qub2Zmc2V0LngsXG4gICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgeToge1xuICAgICAgICAgICAgdmFsdWU6IGVmZmVjdC5vZmZzZXQueSxcbiAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBzcHJlYWQ6IHtcbiAgICAgICAgdmFsdWU6IGVmZmVjdC5zcHJlYWQsXG4gICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgfVxufSk7XG5jb25zdCBleHRyYWN0RWZmZWN0cyA9ICh0b2tlbk5vZGVzLCBwcmVmaXhBcnJheSkgPT4ge1xuICAgIC8vIGdldCBlZmZlY3Qgc3R5bGVzXG4gICAgcmV0dXJuIHRva2VuTm9kZXNcbiAgICAgICAgLy8gcmVtb3ZlIHRva2VucyB3aXRoIG5vIGdyaWRcbiAgICAgICAgLmZpbHRlcihub2RlID0+IG5vZGUuZWZmZWN0cy5sZW5ndGggPiAwKVxuICAgICAgICAvLyBidWlsZFxuICAgICAgICAubWFwKG5vZGUgPT4gKHtcbiAgICAgICAgbmFtZTogYCR7cHJlZml4QXJyYXlbMF19LyR7bm9kZS5uYW1lfWAsXG4gICAgICAgIGNhdGVnb3J5OiAnZWZmZWN0JyxcbiAgICAgICAgZXhwb3J0S2V5OiB0b2tlblR5cGVzLmVmZmVjdC5rZXksXG4gICAgICAgIGRlc2NyaXB0aW9uOiBub2RlLmRlc2NyaXB0aW9uIHx8IG51bGwsXG4gICAgICAgIHZhbHVlczogbm9kZS5lZmZlY3RzLm1hcCgoZWZmZWN0KSA9PiBlZmZlY3QudHlwZSA9PT0gJ0xBWUVSX0JMVVInIHx8IGVmZmVjdC50eXBlID09PSAnQkFDS0dST1VORF9CTFVSJ1xuICAgICAgICAgICAgPyBibHVyVmFsdWVzKGVmZmVjdClcbiAgICAgICAgICAgIDogc2hhZG93VmFsdWVzKGVmZmVjdCkpLFxuICAgICAgICBleHRlbnNpb25zOiB7XG4gICAgICAgICAgICBbY29uZmlnLmtleS5leHRlbnNpb25QbHVnaW5EYXRhXToge1xuICAgICAgICAgICAgICAgIFtjb25maWcua2V5LmV4dGVuc2lvbkZpZ21hU3R5bGVJZF06IG5vZGUuaWQsXG4gICAgICAgICAgICAgICAgZXhwb3J0S2V5OiB0b2tlblR5cGVzLmVmZmVjdC5rZXlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0RWZmZWN0cztcbiIsImltcG9ydCB7IHRva2VuVHlwZXMgfSBmcm9tICdAY29uZmlnL3Rva2VuVHlwZXMnO1xuaW1wb3J0IHJvdW5kV2l0aERlY2ltYWxzIGZyb20gJ0B1dGlscy9yb3VuZFdpdGhEZWNpbWFscyc7XG5pbXBvcnQgY29uZmlnIGZyb20gJ0Bjb25maWcvY29uZmlnJztcbmNvbnN0IHRleHREZWNvcmF0aW9ucyA9IHtcbiAgICBOT05FOiAnbm9uZScsXG4gICAgVU5ERVJMSU5FOiAndW5kZXJsaW5lJyxcbiAgICBTVFJJS0VUSFJPVUdIOiAnbGluZS10aHJvdWdoJ1xufTtcbmNvbnN0IHRleHRDYXNlcyA9IHtcbiAgICBPUklHSU5BTDogJ25vbmUnLFxuICAgIFVQUEVSOiAndXBwZXJjYXNlJyxcbiAgICBMT1dFUjogJ2xvd2VyY2FzZScsXG4gICAgVElUTEU6ICdjYXBpdGFsaXplJyxcbiAgICBTTUFMTF9DQVBTOiAnc21hbGwtY2Fwcydcbn07XG5jb25zdCBmb250V2VpZ2h0cyA9IHtcbiAgICAxMDA6IDEwMCxcbiAgICB0aGluOiAxMDAsXG4gICAgdzE6IDEwMCxcbiAgICAyMDA6IDIwMCxcbiAgICB3MjogMjAwLFxuICAgIGV4dHJhbGlnaHQ6IDIwMCxcbiAgICB1bHRyYWxpZ2h0OiAyMDAsXG4gICAgZXh0cmFsZWljaHQ6IDIwMCxcbiAgICAzMDA6IDMwMCxcbiAgICBsaWdodDogMzAwLFxuICAgIGxlaWNodDogMzAwLFxuICAgIHczOiAzMDAsXG4gICAgNDAwOiA0MDAsXG4gICAgbm9ybWFsOiA0MDAsXG4gICAgcmVndWxhcjogNDAwLFxuICAgIGJ1Y2g6IDQwMCxcbiAgICB3NDogNDAwLFxuICAgIDUwMDogNTAwLFxuICAgIG1lZGl1bTogNTAwLFxuICAgIGtyYWVmdGlnOiA1MDAsXG4gICAga3LDpGZ0aWc6IDUwMCxcbiAgICB3NTogNTAwLFxuICAgIDYwMDogNjAwLFxuICAgIHNlbWlib2xkOiA2MDAsXG4gICAgZGVtaWJvbGQ6IDYwMCxcbiAgICBoYWxiZmV0dDogNjAwLFxuICAgIHc2OiA2MDAsXG4gICAgNzAwOiA3MDAsXG4gICAgYm9sZDogNzAwLFxuICAgIGRyZWl2aWVydGVsZmV0dDogNzAwLFxuICAgIHc3OiA3MDAsXG4gICAgODAwOiA4MDAsXG4gICAgZXh0cmFib2xkOiA4MDAsXG4gICAgdWx0YWJvbGQ6IDgwMCxcbiAgICBmZXR0OiA4MDAsXG4gICAgdzg6IDgwMCxcbiAgICA5MDA6IDkwMCxcbiAgICBibGFjazogOTAwLFxuICAgIGhlYXZ5OiA5MDAsXG4gICAgc3VwZXI6IDkwMCxcbiAgICBleHRyYWZldHQ6IDkwMCxcbiAgICB3OTogOTAwXG59O1xuY29uc3QgZm9udFN0cmV0Y2ggPSB7XG4gICAgbm9ybWFsOiAnbm9ybWFsJyxcbiAgICBjb25kZW5zZWQ6ICdjb25kZW5zZWQnLFxuICAgIGV4cGFuZGVkOiAnZXhwYW5kZWQnLFxuICAgIGV4dGVuZGVkOiAnZXhwYW5kZWQnXG59O1xuY29uc3QgZm9udFN0eWxlcyA9IHtcbiAgICBub3JtYWw6ICdub3JtYWwnLFxuICAgIGl0YWxpYzogJ2l0YWxpYycsXG4gICAga3Vyc2l2OiAnaXRhbGljJyxcbiAgICBvYmxpcXVlOiAnb2JsaXF1ZSdcbn07XG5jb25zdCBwYXJzZUZvbnRXZWlnaHQgPSAoZm9udFN0eWxlKSA9PiB7XG4gICAgY29uc3QgcGFydHMgPSBmb250U3R5bGUudG9Mb3dlckNhc2UoKS5zcGxpdCgnICcpO1xuICAgIGxldCB3ZWlnaHQgPSBwYXJ0c1swXTtcbiAgICAvLyBtZXJnZSBpZiBzcGFjZSBhZnRlciBleHRyYVxuICAgIGlmIChbJ2V4dHJhJywgJ3VsdHJhJywgJ3NlbWknLCAnZGVtaSddLmluY2x1ZGVzKHBhcnRzWzBdKSAmJiBbJ2JvbGQnLCAnbGlnaHQnXS5pbmNsdWRlcyhwYXJ0c1sxXSkpIHtcbiAgICAgICAgd2VpZ2h0ID0gYCR7cGFydHNbMF19JHtwYXJ0c1sxXX1gO1xuICAgIH1cbiAgICByZXR1cm4gZm9udFdlaWdodHNbd2VpZ2h0XSB8fCA0MDA7XG59O1xuY29uc3QgcGFyc2VGb250U3RyZXRjaCA9IChmb250U3R5bGUpID0+IHtcbiAgICBjb25zdCBwYXJ0cyA9IGZvbnRTdHlsZS50b0xvd2VyQ2FzZSgpLnNwbGl0KCcgJyk7XG4gICAgcmV0dXJuIGZvbnRTdHJldGNoW3BhcnRzW3BhcnRzLmxlbmd0aCAtIDFdXSB8fCBmb250U3RyZXRjaFtwYXJ0c1twYXJ0cy5sZW5ndGggLSAyXV0gfHwgJ25vcm1hbCc7XG59O1xuY29uc3QgcGFyc2VGb250U3R5bGUgPSAoZm9udFN0eWxlKSA9PiB7XG4gICAgY29uc3QgcGFydCA9IGZvbnRTdHlsZS50b0xvd2VyQ2FzZSgpLnNwbGl0KCcgJykucG9wKCk7XG4gICAgcmV0dXJuIGZvbnRTdHlsZXNbcGFydF0gfHwgJ25vcm1hbCc7XG59O1xuY29uc3QgZXh0cmFjdEZvbnRzID0gKHRva2VuTm9kZXMsIHByZWZpeEFycmF5KSA9PiB7XG4gICAgLy8gZ2V0IHJhdyB0ZXh0IHN0eWxlc1xuICAgIHJldHVybiB0b2tlbk5vZGVzLm1hcChub2RlID0+ICh7XG4gICAgICAgIG5hbWU6IGAke3ByZWZpeEFycmF5WzBdfS8ke25vZGUubmFtZX1gLFxuICAgICAgICBjYXRlZ29yeTogJ2ZvbnQnLFxuICAgICAgICBleHBvcnRLZXk6IHRva2VuVHlwZXMuZm9udC5rZXksXG4gICAgICAgIGRlc2NyaXB0aW9uOiBub2RlLmRlc2NyaXB0aW9uIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICBmb250U2l6ZToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLmZvbnRTaXplLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZXh0RGVjb3JhdGlvbjoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB0ZXh0RGVjb3JhdGlvbnNbbm9kZS50ZXh0RGVjb3JhdGlvbl0sXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb250RmFtaWx5OiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG5vZGUuZm9udE5hbWUuZmFtaWx5LFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9udFdlaWdodDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBwYXJzZUZvbnRXZWlnaHQobm9kZS5mb250TmFtZS5zdHlsZSksXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb250U3R5bGU6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcGFyc2VGb250U3R5bGUobm9kZS5mb250TmFtZS5zdHlsZSksXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb250U3RyZXRjaDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBwYXJzZUZvbnRTdHJldGNoKG5vZGUuZm9udE5hbWUuc3R5bGUpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2ZvbnRTdHlsZU9sZDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLmZvbnROYW1lLnN0eWxlLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByb3VuZFdpdGhEZWNpbWFscyhub2RlLmxldHRlclNwYWNpbmcudmFsdWUpLFxuICAgICAgICAgICAgICAgIHVuaXQ6IChub2RlLmxldHRlclNwYWNpbmcudW5pdC50b0xvd2VyQ2FzZSgpID09PSAncGl4ZWxzJyA/ICdwaXhlbCcgOiBub2RlLmxldHRlclNwYWNpbmcudW5pdC50b0xvd2VyQ2FzZSgpKSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKG5vZGUubGluZUhlaWdodC52YWx1ZSkgfHwgJ25vcm1hbCcsXG4gICAgICAgICAgICAgICAgdW5pdDogbm9kZS5saW5lSGVpZ2h0LnVuaXQudG9Mb3dlckNhc2UoKSA9PT0gJ3BpeGVscycgPyAncGl4ZWwnIDogbm9kZS5saW5lSGVpZ2h0LnVuaXQudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgICAgICB0eXBlOiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5vZGUubGluZUhlaWdodCwgJ3ZhbHVlJykgPyAnbnVtYmVyJyA6ICdzdHJpbmcnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhcmFncmFwaEluZGVudDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLnBhcmFncmFwaEluZGVudCxcbiAgICAgICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGFyYWdyYXBoU3BhY2luZzoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLnBhcmFncmFwaFNwYWNpbmcsXG4gICAgICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRleHRDYXNlOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHRleHRDYXNlc1tub2RlLnRleHRDYXNlXSB8fCAnbm9uZScsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXh0ZW5zaW9uczoge1xuICAgICAgICAgICAgW2NvbmZpZy5rZXkuZXh0ZW5zaW9uUGx1Z2luRGF0YV06IHtcbiAgICAgICAgICAgICAgICBbY29uZmlnLmtleS5leHRlbnNpb25GaWdtYVN0eWxlSWRdOiBub2RlLmlkLFxuICAgICAgICAgICAgICAgIGV4cG9ydEtleTogdG9rZW5UeXBlcy5mb250LmtleVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3RGb250cztcbiIsImltcG9ydCB7IHRva2VuVHlwZXMgfSBmcm9tICdAY29uZmlnL3Rva2VuVHlwZXMnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICdAY29uZmlnL2NvbmZpZyc7XG5jb25zdCBncmlkVmFsdWVzID0gKGdyaWQpID0+ICh7XG4gICAgcGF0dGVybjoge1xuICAgICAgICB2YWx1ZTogZ3JpZC5wYXR0ZXJuLnRvTG93ZXJDYXNlKCksXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgfSxcbiAgICBzZWN0aW9uU2l6ZToge1xuICAgICAgICB2YWx1ZTogZ3JpZC5zZWN0aW9uU2l6ZSxcbiAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICB9XG59KTtcbmNvbnN0IGdldENvdW50ID0gY291bnQgPT4ge1xuICAgIGlmIChjb3VudCA9PT0gSW5maW5pdHkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiAnYXV0bycsXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogY291bnQsXG4gICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgfTtcbn07XG5jb25zdCByb3dDb2x1bW5WYWx1ZXMgPSAoZ3JpZCkgPT4gKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHsgcGF0dGVybjoge1xuICAgICAgICB2YWx1ZTogZ3JpZC5wYXR0ZXJuLnRvTG93ZXJDYXNlKCksXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgfSB9LCAoZ3JpZC5zZWN0aW9uU2l6ZSAhPT0gdW5kZWZpbmVkICYmIHtcbiAgICBzZWN0aW9uU2l6ZToge1xuICAgICAgICB2YWx1ZTogZ3JpZC5zZWN0aW9uU2l6ZSxcbiAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICB9XG59KSksIHsgZ3V0dGVyU2l6ZToge1xuICAgICAgICB2YWx1ZTogZ3JpZC5ndXR0ZXJTaXplLFxuICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgIH0sIGFsaWdubWVudDoge1xuICAgICAgICB2YWx1ZTogZ3JpZC5hbGlnbm1lbnQudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICB9LCBjb3VudDogZ2V0Q291bnQoZ3JpZC5jb3VudCkgfSksIChncmlkLm9mZnNldCAhPT0gdW5kZWZpbmVkICYmIHtcbiAgICBvZmZzZXQ6IHtcbiAgICAgICAgdmFsdWU6IGdyaWQub2Zmc2V0LFxuICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgIH1cbn0pKSk7XG5jb25zdCBleHRyYWN0R3JpZHMgPSAodG9rZW5Ob2RlcywgcHJlZml4QXJyYXkpID0+IHtcbiAgICAvLyBnZXQgZ3JpZCBzdHlsZXNcbiAgICByZXR1cm4gdG9rZW5Ob2Rlc1xuICAgICAgICAvLyByZW1vdmUgdG9rZW5zIHdpdGggbm8gZ3JpZFxuICAgICAgICAuZmlsdGVyKG5vZGUgPT4gbm9kZS5sYXlvdXRHcmlkcy5sZW5ndGggPiAwKVxuICAgICAgICAvLyBidWlsZFxuICAgICAgICAubWFwKG5vZGUgPT4gKHtcbiAgICAgICAgbmFtZTogYCR7cHJlZml4QXJyYXlbMF19LyR7bm9kZS5uYW1lfWAsXG4gICAgICAgIGNhdGVnb3J5OiAnZ3JpZCcsXG4gICAgICAgIGV4cG9ydEtleTogdG9rZW5UeXBlcy5ncmlkLmtleSxcbiAgICAgICAgZGVzY3JpcHRpb246IG5vZGUuZGVzY3JpcHRpb24gfHwgbnVsbCxcbiAgICAgICAgdmFsdWVzOiBub2RlLmxheW91dEdyaWRzLm1hcCgoZ3JpZCkgPT4gZ3JpZC5wYXR0ZXJuID09PSAnR1JJRCcgPyBncmlkVmFsdWVzKGdyaWQpIDogcm93Q29sdW1uVmFsdWVzKGdyaWQpKSxcbiAgICAgICAgZXh0ZW5zaW9uczoge1xuICAgICAgICAgICAgW2NvbmZpZy5rZXkuZXh0ZW5zaW9uUGx1Z2luRGF0YV06IHtcbiAgICAgICAgICAgICAgICBbY29uZmlnLmtleS5leHRlbnNpb25GaWdtYVN0eWxlSWRdOiBub2RlLmlkLFxuICAgICAgICAgICAgICAgIGV4cG9ydEtleTogdG9rZW5UeXBlcy5ncmlkLmtleVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3RHcmlkcztcbiIsImltcG9ydCB7IHRva2VuVHlwZXMgfSBmcm9tICdAY29uZmlnL3Rva2VuVHlwZXMnO1xuaW1wb3J0IHsgZmlsdGVyQnlQcmVmaXggfSBmcm9tICcuL2V4dHJhY3RVdGlsaXRpZXMnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICdAY29uZmlnL2NvbmZpZyc7XG5jb25zdCBkaXJlY3Rpb24gPSAodHJhbnNpdGlvbikgPT4ge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodHJhbnNpdGlvbiwgJ2RpcmVjdGlvbicpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkaXJlY3Rpb246IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdHJhbnNpdGlvbi5kaXJlY3Rpb24udG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn07XG5jb25zdCBlYXNpbmdzID0ge1xuICAgIENVU1RPTV9DVUJJQ19CRVpJRVI6IHtcbiAgICAgICAgdHlwZTogJ2N1c3RvbS1jdWJpY0JlemllcicsXG4gICAgICAgIGN1cnZlVHlwZTogJ2N1YmljQmV6aWVyJyxcbiAgICAgICAgZWFzaW5nOiB1bmRlZmluZWRcbiAgICB9LFxuICAgIENVU1RPTV9TUFJJTkc6IHtcbiAgICAgICAgdHlwZTogJ2N1c3RvbS1zcHJpbmcnLFxuICAgICAgICBjdXJ2ZVR5cGU6ICdzcHJpbmcnLFxuICAgICAgICBlYXNpbmc6IHVuZGVmaW5lZFxuICAgIH0sXG4gICAgTElORUFSOiB7XG4gICAgICAgIHR5cGU6ICdsaW5lYXInLFxuICAgICAgICBjdXJ2ZVR5cGU6ICdjdWJpY0JlemllcicsXG4gICAgICAgIGVhc2luZzoge1xuICAgICAgICAgICAgeDE6IDAsXG4gICAgICAgICAgICB5MTogMCxcbiAgICAgICAgICAgIHgyOiAxLFxuICAgICAgICAgICAgeTI6IDFcbiAgICAgICAgfVxuICAgIH0sXG4gICAgRUFTRV9JTjoge1xuICAgICAgICB0eXBlOiAnZWFzZS1pbicsXG4gICAgICAgIGN1cnZlVHlwZTogJ2N1YmljQmV6aWVyJyxcbiAgICAgICAgZWFzaW5nOiB7XG4gICAgICAgICAgICB4MTogMC40MTk5OTk5ODY4ODY5NzgxNSxcbiAgICAgICAgICAgIHkxOiAwLFxuICAgICAgICAgICAgeDI6IDEsXG4gICAgICAgICAgICB5MjogMVxuICAgICAgICB9XG4gICAgfSxcbiAgICBFQVNFX09VVDoge1xuICAgICAgICB0eXBlOiAnZWFzZS1vdXQnLFxuICAgICAgICBjdXJ2ZVR5cGU6ICdjdWJpY0JlemllcicsXG4gICAgICAgIGVhc2luZzoge1xuICAgICAgICAgICAgeDE6IDAsXG4gICAgICAgICAgICB5MTogMCxcbiAgICAgICAgICAgIHgyOiAwLjU3OTk5OTk4MzMxMDY5OTUsXG4gICAgICAgICAgICB5MjogMVxuICAgICAgICB9XG4gICAgfSxcbiAgICBFQVNFX0lOX0FORF9PVVQ6IHtcbiAgICAgICAgdHlwZTogJ2Vhc2UtaW4tb3V0JyxcbiAgICAgICAgY3VydmVUeXBlOiAnY3ViaWNCZXppZXInLFxuICAgICAgICBlYXNpbmc6IHtcbiAgICAgICAgICAgIHgxOiAwLjQxOTk5OTk4Njg4Njk3ODE1LFxuICAgICAgICAgICAgeTE6IDAsXG4gICAgICAgICAgICB4MjogMC41Nzk5OTk5ODMzMTA2OTk1LFxuICAgICAgICAgICAgeTI6IDFcbiAgICAgICAgfVxuICAgIH0sXG4gICAgRUFTRV9JTl9CQUNLOiB7XG4gICAgICAgIHR5cGU6ICdlYXNlLWluLWJhY2snLFxuICAgICAgICBjdXJ2ZVR5cGU6ICdjdWJpY0JlemllcicsXG4gICAgICAgIGVhc2luZzoge1xuICAgICAgICAgICAgeDE6IDAuMzAwMDAwMDExOTIwOTI4OTYsXG4gICAgICAgICAgICB5MTogLTAuMDUwMDAwMDAwNzQ1MDU4MDYsXG4gICAgICAgICAgICB4MjogMC42OTk5OTk5ODgwNzkwNzEsXG4gICAgICAgICAgICB5MjogLTAuNVxuICAgICAgICB9XG4gICAgfSxcbiAgICBFQVNFX09VVF9CQUNLOiB7XG4gICAgICAgIHR5cGU6ICdlYXNlLW91dC1iYWNrJyxcbiAgICAgICAgY3VydmVUeXBlOiAnY3ViaWNCZXppZXInLFxuICAgICAgICBlYXNpbmc6IHtcbiAgICAgICAgICAgIHgxOiAwLjQ0OTk5OTk4ODA3OTA3MTA0LFxuICAgICAgICAgICAgeTE6IDEuNDUwMDAwMDQ3NjgzNzE1OCxcbiAgICAgICAgICAgIHgyOiAwLjgwMDAwMDAxMTkyMDkyOSxcbiAgICAgICAgICAgIHkyOiAxXG4gICAgICAgIH1cbiAgICB9LFxuICAgIEVBU0VfSU5fQU5EX09VVF9CQUNLOiB7XG4gICAgICAgIHR5cGU6ICdlYXNlLWluLW91dC1iYWNrJyxcbiAgICAgICAgY3VydmVUeXBlOiAnY3ViaWNCZXppZXInLFxuICAgICAgICBlYXNpbmc6IHtcbiAgICAgICAgICAgIHgxOiAwLjY5OTk5OTk4ODA3OTA3MSxcbiAgICAgICAgICAgIHkxOiAtMC40MDAwMDAwMDU5NjA0NjQ1LFxuICAgICAgICAgICAgeDI6IDAuNDAwMDAwMDA1OTYwNDY0NSxcbiAgICAgICAgICAgIHkyOiAxLjM5OTk5OTk3NjE1ODE0MlxuICAgICAgICB9XG4gICAgfSxcbiAgICBCT1VOQ1k6IHtcbiAgICAgICAgdHlwZTogJ2JvdW5jeScsXG4gICAgICAgIGN1cnZlVHlwZTogJ3NwcmluZycsXG4gICAgICAgIGVhc2luZzoge1xuICAgICAgICAgICAgbWFzczogMSxcbiAgICAgICAgICAgIHN0aWZmbmVzczogNjAwLFxuICAgICAgICAgICAgZGFtcGluZzogMTVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgR0VOVExFOiB7XG4gICAgICAgIHR5cGU6ICdnZW50bGUnLFxuICAgICAgICBjdXJ2ZVR5cGU6ICdzcHJpbmcnLFxuICAgICAgICBlYXNpbmc6IHtcbiAgICAgICAgICAgIG1hc3M6IDEsXG4gICAgICAgICAgICBzdGlmZm5lc3M6IDEwMCxcbiAgICAgICAgICAgIGRhbXBpbmc6IDE1XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFFVSUNLOiB7XG4gICAgICAgIHR5cGU6ICdxdWljaycsXG4gICAgICAgIGN1cnZlVHlwZTogJ3NwcmluZycsXG4gICAgICAgIGVhc2luZzoge1xuICAgICAgICAgICAgbWFzczogMSxcbiAgICAgICAgICAgIHN0aWZmbmVzczogMzAwLFxuICAgICAgICAgICAgZGFtcGluZzogMjBcbiAgICAgICAgfVxuICAgIH0sXG4gICAgU0xPVzoge1xuICAgICAgICB0eXBlOiAnc2xvdycsXG4gICAgICAgIGN1cnZlVHlwZTogJ3NwcmluZycsXG4gICAgICAgIGVhc2luZzoge1xuICAgICAgICAgICAgbWFzczogMSxcbiAgICAgICAgICAgIHN0aWZmbmVzczogODAsXG4gICAgICAgICAgICBkYW1waW5nOiAyMFxuICAgICAgICB9XG4gICAgfVxufTtcbmNvbnN0IGZvcm1hdEVhc2luZ0Z1bmN0aW9uID0gZWFzaW5nT2JqZWN0ID0+IHtcbiAgICAvLyBzcHJpbmcgY3VydmVcbiAgICBpZiAoZWFzaW5nT2JqZWN0LmN1cnZlVHlwZSA9PT0gJ3NwcmluZycpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1hc3M6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogZWFzaW5nT2JqZWN0LmVhc2luZy5tYXNzLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RpZmZuZXNzOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGVhc2luZ09iamVjdC5lYXNpbmcuc3RpZmZuZXNzLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGFtcGluZzoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBlYXNpbmdPYmplY3QuZWFzaW5nLmRhbXBpbmcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgLy8gc3ByaW5nIGJlemllclxuICAgIGlmIChlYXNpbmdPYmplY3QuY3VydmVUeXBlID09PSAnY3ViaWNCZXppZXInKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4MToge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICB2YWx1ZTogZWFzaW5nT2JqZWN0LmVhc2luZy54MSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHgyOiB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIHZhbHVlOiBlYXNpbmdPYmplY3QuZWFzaW5nLngyLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeTE6IHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgdmFsdWU6IGVhc2luZ09iamVjdC5lYXNpbmcueTEsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB5Mjoge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICB2YWx1ZTogZWFzaW5nT2JqZWN0LmVhc2luZy55MixcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn07XG5jb25zdCBlYXNpbmcgPSAoZWFzaW5nKSA9PiB7XG4gICAgLy8gYWJvcnQgaWYgaW52YWxpZCBlYXNpbmcgdHlwZVxuICAgIGlmICghKCd0eXBlJyBpbiBlYXNpbmcpIHx8IGVhc2luZ3NbZWFzaW5nLnR5cGVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgLy8gcmV0dXJuIGN1c3RvbSBlYXNpbmdcbiAgICBpZiAoZWFzaW5nLnR5cGUgPT09ICdDVVNUT01fQ1VCSUNfQkVaSUVSJykge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGVhc2luZ3MuQ1VTVE9NX0NVQklDX0JFWklFUi5lYXNpbmcgPSB7XG4gICAgICAgICAgICB4MTogZWFzaW5nLmVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXIueDEsXG4gICAgICAgICAgICB5MTogZWFzaW5nLmVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXIueTEsXG4gICAgICAgICAgICB4MjogZWFzaW5nLmVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXIueDIsXG4gICAgICAgICAgICB5MjogZWFzaW5nLmVhc2luZ0Z1bmN0aW9uQ3ViaWNCZXppZXIueTJcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLy8gVE9ETzogcmVtb3ZlIHdoZW4gZmlnbWEgdHlwaW5ncyBhcmUgdXBkYXRlZFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBpZiAoZWFzaW5nLnR5cGUgPT09ICdDVVNUT01fU1BSSU5HJykge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGVhc2luZ3MuQ1VTVE9NX1NQUklORy5lYXNpbmcgPSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBtYXNzOiBlYXNpbmcuZWFzaW5nRnVuY3Rpb25TcHJpbmcubWFzcyxcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHN0aWZmbmVzczogZWFzaW5nLmVhc2luZ0Z1bmN0aW9uU3ByaW5nLnN0aWZmbmVzcyxcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGRhbXBpbmc6IGVhc2luZy5lYXNpbmdGdW5jdGlvblNwcmluZy5kYW1waW5nXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGVhc2luZ1R5cGU6IHtcbiAgICAgICAgICAgIHZhbHVlOiBlYXNpbmdzW2Vhc2luZy50eXBlXS50eXBlLFxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgZWFzaW5nQ3VydmVUeXBlOiB7XG4gICAgICAgICAgICB2YWx1ZTogZWFzaW5nc1tlYXNpbmcudHlwZV0uY3VydmVUeXBlLFxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgZWFzaW5nRnVuY3Rpb246IGZvcm1hdEVhc2luZ0Z1bmN0aW9uKGVhc2luZ3NbZWFzaW5nLnR5cGVdKVxuICAgIH07XG59O1xuY29uc3QgZmlsdGVyVmFsaWRNb3Rpb25Ub2tlbnMgPSAobm9kZSkgPT4ge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCB2YWxpZEVhc2luZ1R5cGVzID0gT2JqZWN0LmtleXMoZWFzaW5ncyk7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGlmIChub2RlLnJlYWN0aW9ucy5sZW5ndGggPiAwICYmICgoX2EgPSBub2RlLnJlYWN0aW9uc1swXS5hY3Rpb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50eXBlKSA9PT0gJ05PREUnICYmIG5vZGUucmVhY3Rpb25zWzBdLmFjdGlvbi50cmFuc2l0aW9uICE9PSBudWxsICYmIHZhbGlkRWFzaW5nVHlwZXMuaW5jbHVkZXMobm9kZS5yZWFjdGlvbnNbMF0uYWN0aW9uLnRyYW5zaXRpb24uZWFzaW5nLnR5cGUpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuY29uc3QgZXh0cmFjdE1vdGlvbiA9ICh0b2tlbk5vZGVzLCBwcmVmaXhBcnJheSkgPT4ge1xuICAgIC8vIHJldHVybiBhcyBvYmplY3RcbiAgICByZXR1cm4gdG9rZW5Ob2Rlcy5maWx0ZXIoZmlsdGVyQnlQcmVmaXgocHJlZml4QXJyYXkpKVxuICAgICAgICAvLyBmaWx0ZXIgdG8gb25seSBpbmNsdWRlIGl0ZW1zIHdoaWNoIGhhdmUgYSB0cmFuc2l0aW9uIHByb3BlcnR5XG4gICAgICAgIC5maWx0ZXIoZmlsdGVyVmFsaWRNb3Rpb25Ub2tlbnMpXG4gICAgICAgIC8vIHJldHJpZXZlIHZhbHVlc1xuICAgICAgICAubWFwKChub2RlKSA9PiAoe1xuICAgICAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgICAgIGNhdGVnb3J5OiAnbW90aW9uJyxcbiAgICAgICAgZXhwb3J0S2V5OiB0b2tlblR5cGVzLm1vdGlvbi5rZXksXG4gICAgICAgIGRlc2NyaXB0aW9uOiBub2RlLmRlc2NyaXB0aW9uIHx8IG51bGwsXG4gICAgICAgIHZhbHVlczogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHsgdHJhbnNpdGlvblR5cGU6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbm9kZS5yZWFjdGlvbnNbMF0uYWN0aW9uLnRyYW5zaXRpb24udHlwZS50b0xvY2FsZUxvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LCBkdXJhdGlvbjoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBNYXRoLnJvdW5kKChub2RlLnJlYWN0aW9uc1swXS5hY3Rpb24udHJhbnNpdGlvbi5kdXJhdGlvbiArIE51bWJlci5FUFNJTE9OKSAqIDEwMDApIC8gMTAwMCxcbiAgICAgICAgICAgICAgICB1bml0OiAncycsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0gfSwgZWFzaW5nKG5vZGUucmVhY3Rpb25zWzBdLmFjdGlvbi50cmFuc2l0aW9uLmVhc2luZykpLCBkaXJlY3Rpb24obm9kZS5yZWFjdGlvbnNbMF0uYWN0aW9uLnRyYW5zaXRpb24pKSxcbiAgICAgICAgZXh0ZW5zaW9uczoge1xuICAgICAgICAgICAgW2NvbmZpZy5rZXkuZXh0ZW5zaW9uUGx1Z2luRGF0YV06IHtcbiAgICAgICAgICAgICAgICBleHBvcnRLZXk6IHRva2VuVHlwZXMubW90aW9uLmtleVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3RNb3Rpb247XG5leHBvcnQgY29uc3QgX190ZXN0aW5nID0ge1xuICAgIGVhc2luZzogZWFzaW5nXG59O1xuIiwiaW1wb3J0IHsgdG9rZW5UeXBlcyB9IGZyb20gJ0Bjb25maWcvdG9rZW5UeXBlcyc7XG5pbXBvcnQgcm91bmRXaXRoRGVjaW1hbHMgZnJvbSAnQHV0aWxzL3JvdW5kV2l0aERlY2ltYWxzJztcbmltcG9ydCB7IGZpbHRlckJ5UHJlZml4IH0gZnJvbSAnLi9leHRyYWN0VXRpbGl0aWVzJztcbmltcG9ydCBjb25maWcgZnJvbSAnQGNvbmZpZy9jb25maWcnO1xuY29uc3QgZXh0cmFjdE9wYWNpdGllcyA9ICh0b2tlbk5vZGVzLCBwcmVmaXhBcnJheSkgPT4ge1xuICAgIC8vIHJldHVybiBhcyBvYmplY3RcbiAgICByZXR1cm4gdG9rZW5Ob2Rlcy5maWx0ZXIoZmlsdGVyQnlQcmVmaXgocHJlZml4QXJyYXkpKS5tYXAobm9kZSA9PiAoe1xuICAgICAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgICAgIGNhdGVnb3J5OiAnb3BhY2l0eScsXG4gICAgICAgIGV4cG9ydEtleTogdG9rZW5UeXBlcy5vcGFjaXR5LmtleSxcbiAgICAgICAgZGVzY3JpcHRpb246IG5vZGUuZGVzY3JpcHRpb24gfHwgbnVsbCxcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICBvcGFjaXR5OiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKG5vZGUub3BhY2l0eSwgMiksXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXh0ZW5zaW9uczoge1xuICAgICAgICAgICAgW2NvbmZpZy5rZXkuZXh0ZW5zaW9uUGx1Z2luRGF0YV06IHtcbiAgICAgICAgICAgICAgICBleHBvcnRLZXk6IHRva2VuVHlwZXMub3BhY2l0eS5rZXlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0T3BhY2l0aWVzO1xuIiwiaW1wb3J0IHsgdG9rZW5UeXBlcyB9IGZyb20gJ0Bjb25maWcvdG9rZW5UeXBlcyc7XG5pbXBvcnQgcm91bmRXaXRoRGVjaW1hbHMgZnJvbSAnQHV0aWxzL3JvdW5kV2l0aERlY2ltYWxzJztcbmltcG9ydCB7IGZpbHRlckJ5UHJlZml4IH0gZnJvbSAnLi9leHRyYWN0VXRpbGl0aWVzJztcbmltcG9ydCBjb25maWcgZnJvbSAnQGNvbmZpZy9jb25maWcnO1xuY29uc3QgZXh0cmFjdFJhZGlpID0gKHRva2VuTm9kZXMsIHByZWZpeEFycmF5KSA9PiB7XG4gICAgLy8gZ2V0IHRoZSB0eXBlIG9mIHRoZSBjb3JuZXIgcmFkaXVzXG4gICAgY29uc3QgZ2V0UmFkaXVzVHlwZSA9IHJhZGl1cyA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgcmFkaXVzID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuICdzaW5nbGUnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnbWl4ZWQnO1xuICAgIH07XG4gICAgLy8gZ2V0IHRoZSBpbmRpdmlkdWFsIHJhZGlpXG4gICAgY29uc3QgZ2V0UmFkaWkgPSAobm9kZSkgPT4gKHtcbiAgICAgICAgdG9wTGVmdDoge1xuICAgICAgICAgICAgdmFsdWU6IG5vZGUudG9wTGVmdFJhZGl1cyB8fCAwLFxuICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIHRvcFJpZ2h0OiB7XG4gICAgICAgICAgICB2YWx1ZTogbm9kZS50b3BSaWdodFJhZGl1cyB8fCAwLFxuICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIGJvdHRvbVJpZ2h0OiB7XG4gICAgICAgICAgICB2YWx1ZTogbm9kZS5ib3R0b21SaWdodFJhZGl1cyB8fCAwLFxuICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIGJvdHRvbUxlZnQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiBub2RlLmJvdHRvbUxlZnRSYWRpdXMgfHwgMCxcbiAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gcmV0dXJuIGFzIG9iamVjdFxuICAgIHJldHVybiB0b2tlbk5vZGVzLmZpbHRlcihmaWx0ZXJCeVByZWZpeChwcmVmaXhBcnJheSkpXG4gICAgICAgIC5tYXAobm9kZSA9PiAoe1xuICAgICAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgICAgIGNhdGVnb3J5OiAncmFkaXVzJyxcbiAgICAgICAgZXhwb3J0S2V5OiB0b2tlblR5cGVzLnJhZGl1cy5rZXksXG4gICAgICAgIGRlc2NyaXB0aW9uOiBub2RlLmRlc2NyaXB0aW9uIHx8IG51bGwsXG4gICAgICAgIHZhbHVlczogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCAodHlwZW9mIG5vZGUuY29ybmVyUmFkaXVzID09PSAnbnVtYmVyJyAmJiB7XG4gICAgICAgICAgICByYWRpdXM6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbm9kZS5jb3JuZXJSYWRpdXMsXG4gICAgICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSksIHsgcmFkaXVzVHlwZToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBnZXRSYWRpdXNUeXBlKG5vZGUuY29ybmVyUmFkaXVzKSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfSwgcmFkaWk6IGdldFJhZGlpKG5vZGUpLCBzbW9vdGhpbmc6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMobm9kZS5jb3JuZXJTbW9vdGhpbmcsIDIpLFxuICAgICAgICAgICAgICAgIGNvbW1lbnQ6ICdQZXJjZW50IGFzIGRlY2ltYWwgZnJvbSAwLjAgLSAxLjAnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9IH0pLFxuICAgICAgICBleHRlbnNpb25zOiB7XG4gICAgICAgICAgICBbY29uZmlnLmtleS5leHRlbnNpb25QbHVnaW5EYXRhXToge1xuICAgICAgICAgICAgICAgIGV4cG9ydEtleTogdG9rZW5UeXBlcy5yYWRpdXMua2V5XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZXh0cmFjdFJhZGlpO1xuIiwiaW1wb3J0IHsgdG9rZW5UeXBlcyB9IGZyb20gJ0Bjb25maWcvdG9rZW5UeXBlcyc7XG5pbXBvcnQgcm91bmRXaXRoRGVjaW1hbHMgZnJvbSAnQHV0aWxzL3JvdW5kV2l0aERlY2ltYWxzJztcbmltcG9ydCB7IGZpbHRlckJ5UHJlZml4IH0gZnJvbSAnLi9leHRyYWN0VXRpbGl0aWVzJztcbmltcG9ydCBjb25maWcgZnJvbSAnQGNvbmZpZy9jb25maWcnO1xuY29uc3QgZXh0cmFjdFNpemVzID0gKHRva2VuTm9kZXMsIHByZWZpeEFycmF5KSA9PiB7XG4gICAgLy8gcmV0dXJuIGFzIG9iamVjdFxuICAgIHJldHVybiB0b2tlbk5vZGVzLmZpbHRlcihmaWx0ZXJCeVByZWZpeChwcmVmaXhBcnJheSkpLm1hcChub2RlID0+ICh7XG4gICAgICAgIG5hbWU6IG5vZGUubmFtZSxcbiAgICAgICAgY2F0ZWdvcnk6ICdzaXplJyxcbiAgICAgICAgZXhwb3J0S2V5OiB0b2tlblR5cGVzLnNpemUua2V5LFxuICAgICAgICBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHdpZHRoOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKG5vZGUud2lkdGgsIDIpLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWlnaHQ6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMobm9kZS5oZWlnaHQsIDIpLFxuICAgICAgICAgICAgICAgIHVuaXQ6ICdwaXhlbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXh0ZW5zaW9uczoge1xuICAgICAgICAgICAgW2NvbmZpZy5rZXkuZXh0ZW5zaW9uUGx1Z2luRGF0YV06IHtcbiAgICAgICAgICAgICAgICBleHBvcnRLZXk6IHRva2VuVHlwZXMuc2l6ZS5rZXlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0U2l6ZXM7XG4iLCJpbXBvcnQgeyB0b2tlblR5cGVzIH0gZnJvbSAnQGNvbmZpZy90b2tlblR5cGVzJztcbmltcG9ydCByb3VuZFdpdGhEZWNpbWFscyBmcm9tICdAdXRpbHMvcm91bmRXaXRoRGVjaW1hbHMnO1xuaW1wb3J0IHsgZmlsdGVyQnlQcmVmaXggfSBmcm9tICcuL2V4dHJhY3RVdGlsaXRpZXMnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICdAY29uZmlnL2NvbmZpZyc7XG5jb25zdCBleHRyYWN0U3BhY2luZyA9ICh0b2tlbk5vZGVzLCBwcmVmaXhBcnJheSkgPT4ge1xuICAgIC8vIHJldHVybiBhcyBvYmplY3RcbiAgICByZXR1cm4gdG9rZW5Ob2Rlcy5maWx0ZXIoZmlsdGVyQnlQcmVmaXgocHJlZml4QXJyYXkpKVxuICAgICAgICAubWFwKG5vZGUgPT4gKHtcbiAgICAgICAgbmFtZTogbm9kZS5uYW1lLFxuICAgICAgICBjYXRlZ29yeTogJ3NwYWNpbmcnLFxuICAgICAgICBleHBvcnRLZXk6IHRva2VuVHlwZXMuc3BhY2luZy5rZXksXG4gICAgICAgIGRlc2NyaXB0aW9uOiBub2RlLmRlc2NyaXB0aW9uIHx8IG51bGwsXG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgdG9wOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKG5vZGUucGFkZGluZ1RvcCwgMiksXG4gICAgICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJpZ2h0OiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKG5vZGUucGFkZGluZ1JpZ2h0LCAyKSxcbiAgICAgICAgICAgICAgICB1bml0OiAncGl4ZWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm90dG9tOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kV2l0aERlY2ltYWxzKG5vZGUucGFkZGluZ0JvdHRvbSwgMiksXG4gICAgICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZnQ6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcm91bmRXaXRoRGVjaW1hbHMobm9kZS5wYWRkaW5nTGVmdCwgMiksXG4gICAgICAgICAgICAgICAgdW5pdDogJ3BpeGVsJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBleHRlbnNpb25zOiB7XG4gICAgICAgICAgICBbY29uZmlnLmtleS5leHRlbnNpb25QbHVnaW5EYXRhXToge1xuICAgICAgICAgICAgICAgIGV4cG9ydEtleTogdG9rZW5UeXBlcy5zcGFjaW5nLmtleVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3RTcGFjaW5nO1xuIiwiZXhwb3J0IGNvbnN0IGZpbHRlckJ5UHJlZml4ID0gKHByZWZpeEFycmF5KSA9PiBub2RlID0+IHtcbiAgICAvLyBhYm9ydCBpZiB3cm9uZyBhcmd1bWVudFxuICAgIGlmICghQXJyYXkuaXNBcnJheShwcmVmaXhBcnJheSkpXG4gICAgICAgIHJldHVybjtcbiAgICAvLyBleHRyYWN0IHByZWZpeCBmcm9tIG5vZGUgbmFtZVxuICAgIGNvbnN0IG5vZGVQcmVmaXggPSBub2RlLm5hbWUuc3Vic3RyKDAsIG5vZGUubmFtZS5pbmRleE9mKCcvJykpLnJlcGxhY2UoL1xccysvZywgJycpO1xuICAgIC8vIGFib3J0IGlmIG5vIHByZWZpeFxuICAgIGlmIChub2RlUHJlZml4Lmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuO1xuICAgIC8vIHJldHVybiBhcnJheVxuICAgIHJldHVybiBwcmVmaXhBcnJheS5pbmNsdWRlcyhub2RlUHJlZml4KTtcbn07XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbi8qKlxuICogQG5hbWUgZ2V0QWNjZXNzVG9rZW5cbiAqIEBkZXNjcmlwdGlvbiByZXR1cm5zIHRoZSBhY2Nlc3MgdG9rZW4gZm9yIHRoZSBjdXJyZW50IGZpbGUgb3IgdW5kZWZpbmVkXG4gKiBAcGFyYW0gZmlsZUlkIHtzdHJpbmd9IOKAlCBJRCBvZiB0aGUgY3VycmVudCBmaWxlXG4gKi9cbmNvbnN0IGdldEFjY2Vzc1Rva2VuID0gKGZpbGVJZCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgLy8gZ2V0IGFsbCBhY2Nlc3MgdG9rZW5zXG4gICAgY29uc3QgYWNjZXNzVG9rZW5zID0geWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYygnYWNjZXNzVG9rZW5zJyk7XG4gICAgLy8gaWYgYWNjZXNzIHRva2VucyBvYmplY3QgaXMgcHJlc2VudFxuICAgIGlmIChhY2Nlc3NUb2tlbnMgIT09IHVuZGVmaW5lZCAmJiBhY2Nlc3NUb2tlbnMgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgLy8gcmV0cmlldmUgdGhlIGFjY2VzcyB0b2tlbiBmcm9tIHRoZSBjYWNoZVxuICAgICAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGFjY2Vzc1Rva2Vuc1tmaWxlSWRdO1xuICAgICAgICAvLyByZXR1cm4gdGhlIGFjY2VzcyB0b2tlbiBvciBhbiBlbXB0eSBzdHJpbmdcbiAgICAgICAgcmV0dXJuIGFjY2Vzc1Rva2VuIHx8ICcnO1xuICAgIH1cbiAgICAvLyByZXR1cm4gZW1wdHkgc3RyaW5nIGlmIG5vIHRva2VuIGlzIHN0b3JlZFxuICAgIHJldHVybiAnJztcbn0pO1xuLyoqXG4gKiBAbmFtZSBzZXRBY2Nlc3NUb2tlblxuICogQGRlc2NyaXB0aW9uIHN0b3JlIHRoZSBhY2Nlc3MgdG9rZW4gZm9yIHRoZSBjdXJyZW50IGdpdmVuIGZpbGUgaW4gdGhlIHVzZXIgY2xpZW50U3RvcmFnZVxuICogQHBhcmFtIGZpbGVJZCB7c3RyaW5nfSDigJQgSUQgb2YgdGhlIGN1cnJlbnQgZmlsZVxuICogQHBhcmFtIGZpbGVJZCB7c3RyaW5nfSDigJQgYWNjZXNzIHRva2VuXG4gKi9cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5jb25zdCBzZXRBY2Nlc3NUb2tlbiA9IChmaWxlSWQsIGFjY2Vzc1Rva2VuKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAvLyBnZXQgdGhlIGFjY2VzcyB0b2tlbiBvYmplY3RcbiAgICBjb25zdCBhY2Nlc3NUb2tlbnMgPSAoeWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYygnYWNjZXNzVG9rZW5zJykpIHx8IHt9O1xuICAgIC8vIG1lcmdlIHRva2Vuc1xuICAgIGNvbnN0IG1lcmdlZFRva2VucyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgYWNjZXNzVG9rZW5zKSwgeyBbZmlsZUlkXTogYWNjZXNzVG9rZW4gfSk7XG4gICAgLy8gbWVyZ2UgdGhlIG5ldyB0b2tlbiBpbnRvIHRoZSBvYmplY3RcbiAgICByZXR1cm4geWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYygnYWNjZXNzVG9rZW5zJywgbWVyZ2VkVG9rZW5zKTtcbn0pO1xuZXhwb3J0IHsgZ2V0QWNjZXNzVG9rZW4sIHNldEFjY2Vzc1Rva2VuIH07XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCBmaWx0ZXJCeVByb3BlcnR5TmFtZSBmcm9tICdAdXRpbHMvZmlsdGVyQnlOYW1lUHJvcGVydHknO1xuaW1wb3J0IGdldFBhaW50U3R5bGVzIGZyb20gJ0B1dGlscy9nZXRQYWludFN0eWxlcyc7XG5pbXBvcnQgZ2V0R3JpZFN0eWxlcyBmcm9tICdAdXRpbHMvZ2V0R3JpZFN0eWxlcyc7XG5pbXBvcnQgZ2V0VG9rZW5Ob2RlcyBmcm9tICdAdXRpbHMvZ2V0VG9rZW5Ob2Rlcyc7XG5pbXBvcnQgZ2V0VGV4dFN0eWxlcyBmcm9tICdAdXRpbHMvZ2V0VGV4dFN0eWxlcyc7XG5pbXBvcnQgZ2V0RWZmZWN0U3R5bGVzIGZyb20gJ0B1dGlscy9nZXRFZmZlY3RTdHlsZXMnO1xuLyoqXG4gKiBAZnVuY3Rpb24gYnVpbGRGaWdtYURhdGEg4oCTIHJldHVybiBhbiBvYmplY3Qgd2l0aCBhbGwgc3R5bGVzICYgZnJhbWUgdG8gdXNlIGZvciBleHBvcnRcbiAqIEBwYXJhbSB7UGx1Z2luQVBJfSBmaWdtYSDigJQgdGhlIGZpZ21hIFBsdWdpbkFQSSBvYmplY3RcbiAqIEBwYXJhbSBvcHRpb25zIOKAkyBvcHRpb25zIG9iamVjdFxuICovXG5jb25zdCBidWlsZEZpZ21hRGF0YSA9IChmaWdtYSwgc2V0dGluZ3MpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIC8vIHVzZSBzcHJlYWQgb3BlcmF0b3IgYmVjYXVzZSB0aGUgb3JpZ2luYWwgaXMgcmVhZE9ubHlcbiAgICBjb25zdCB0b2tlbkZyYW1lcyA9IHlpZWxkIGdldFRva2VuTm9kZXMoWy4uLmZpZ21hLnJvb3QuY2hpbGRyZW5dKTtcbiAgICAvLyBnZXQgdXNlciBleGNsdXNpb24gcHJlZml4ZXNcbiAgICBjb25zdCB1c2VyRXhjbHVzaW9uUHJlZml4ZXMgPSBzZXR0aW5ncy5leGNsdXNpb25QcmVmaXhcbiAgICAgICAgLnNwbGl0KCcsJylcbiAgICAgICAgLm1hcCgoaXRlbSkgPT4gaXRlbS5yZXBsYWNlKC9cXHMrL2csICcnKSk7XG4gICAgLy8gZ2V0IGRhdGEgZnJvbSBmaWdtYVxuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuRnJhbWVzOiB0b2tlbkZyYW1lcyxcbiAgICAgICAgcGFpbnRTdHlsZXM6IGdldFBhaW50U3R5bGVzKHlpZWxkIGZpZ21hLmdldExvY2FsUGFpbnRTdHlsZXNBc3luYygpKS5maWx0ZXIoKGl0ZW0pID0+IGZpbHRlckJ5UHJvcGVydHlOYW1lKGl0ZW0sIHVzZXJFeGNsdXNpb25QcmVmaXhlcykpLFxuICAgICAgICBncmlkU3R5bGVzOiBnZXRHcmlkU3R5bGVzKHlpZWxkIGZpZ21hLmdldExvY2FsR3JpZFN0eWxlc0FzeW5jKCkpLmZpbHRlcigoaXRlbSkgPT4gZmlsdGVyQnlQcm9wZXJ0eU5hbWUoaXRlbSwgdXNlckV4Y2x1c2lvblByZWZpeGVzKSksXG4gICAgICAgIHRleHRTdHlsZXM6IGdldFRleHRTdHlsZXMoeWllbGQgZmlnbWEuZ2V0TG9jYWxUZXh0U3R5bGVzQXN5bmMoKSkuZmlsdGVyKChpdGVtKSA9PiBmaWx0ZXJCeVByb3BlcnR5TmFtZShpdGVtLCB1c2VyRXhjbHVzaW9uUHJlZml4ZXMpKSxcbiAgICAgICAgZWZmZWN0U3R5bGVzOiBnZXRFZmZlY3RTdHlsZXMoeWllbGQgZmlnbWEuZ2V0TG9jYWxFZmZlY3RTdHlsZXNBc3luYygpKS5maWx0ZXIoKGl0ZW0pID0+IGZpbHRlckJ5UHJvcGVydHlOYW1lKGl0ZW0sIHVzZXJFeGNsdXNpb25QcmVmaXhlcykpXG4gICAgfTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgYnVpbGRGaWdtYURhdGE7XG4iLCJleHBvcnQgY29uc3QgY2hhbmdlTm90YXRpb24gPSAobmFtZSwgY3VycmVudERlbGltaXRlciA9ICcvJywgZGVzaXJlZERlbGltaXRlciA9ICcuJykgPT4ge1xuICAgIHJldHVybiBuYW1lLnNwbGl0KGN1cnJlbnREZWxpbWl0ZXIpLmpvaW4oZGVzaXJlZERlbGltaXRlcikudG9Mb3dlckNhc2UoKTtcbn07XG4iLCJpbXBvcnQgcm91bmRXaXRoRGVjaW1hbHMgZnJvbSAnLi9yb3VuZFdpdGhEZWNpbWFscyc7XG5pbXBvcnQgeyB0aW55Y29sb3IgfSBmcm9tICdAY3RybC90aW55Y29sb3InO1xuZXhwb3J0IGNvbnN0IHJvdW5kUmdiYSA9IChyZ2JhLCBvcGFjaXR5KSA9PiB7XG4gICAgdmFyIF9hO1xuICAgIHJldHVybiAoe1xuICAgICAgICByOiByb3VuZFdpdGhEZWNpbWFscyhyZ2JhLnIgKiAyNTUsIDApLFxuICAgICAgICBnOiByb3VuZFdpdGhEZWNpbWFscyhyZ2JhLmcgKiAyNTUsIDApLFxuICAgICAgICBiOiByb3VuZFdpdGhEZWNpbWFscyhyZ2JhLmIgKiAyNTUsIDApLFxuICAgICAgICBhOiByb3VuZFdpdGhEZWNpbWFscygoX2EgPSBvcGFjaXR5ICE9PSBudWxsICYmIG9wYWNpdHkgIT09IHZvaWQgMCA/IG9wYWNpdHkgOiByZ2JhLmEpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IDEpXG4gICAgfSk7XG59O1xuZXhwb3J0IGNvbnN0IGNvbnZlcnRQYWludFRvUmdiYSA9IChwYWludCkgPT4ge1xuICAgIGlmIChwYWludC50eXBlID09PSAnU09MSUQnICYmIHBhaW50LnZpc2libGUgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHJvdW5kUmdiYShwYWludC5jb2xvciwgcGFpbnQub3BhY2l0eSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcbmV4cG9ydCBjb25zdCBjb252ZXJ0UmdiYU9iamVjdFRvU3RyaW5nID0gKHJnYmFPYmplY3QpID0+IGByZ2JhKCR7cmdiYU9iamVjdC5yfSwgJHtyZ2JhT2JqZWN0Lmd9LCAke3JnYmFPYmplY3QuYn0sICR7cmdiYU9iamVjdC5hfSlgO1xuZXhwb3J0IGNvbnN0IHJnYmFPYmplY3RUb0hleDggPSAocmdiYU9iamVjdCkgPT4ge1xuICAgIC8vIHJldHVybiB2YWx1ZVxuICAgIHJldHVybiB0aW55Y29sb3IoY29udmVydFJnYmFPYmplY3RUb1N0cmluZyhyZ2JhT2JqZWN0KSkudG9IZXg4U3RyaW5nKCk7XG59O1xuIiwiLyoqXG4gKiBQZXJmb3JtcyBhIGRlZXAgbWVyZ2Ugb2YgYHNvdXJjZWAgaW50byBgdGFyZ2V0YC5cbiAqIE11dGF0ZXMgYHRhcmdldGAgb25seSBidXQgbm90IGl0cyBvYmplY3RzIGFuZCBhcnJheXMuXG4gKlxuICogQGF1dGhvciBpbnNwaXJlZCBieSBbamhpbGRlbmJpZGRsZV0oaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQ4MjE4MjA5KS5cbiAqL1xuY29uc3QgZGVlcE1lcmdlID0gKHRhcmdldCwgc291cmNlKSA9PiB7XG4gICAgLy8gZnVuY3Rpb24gdG8gdGVzdCBpZiBhIHZhcmlhYmxlIGlzIGFuIG9iamVjdFxuICAgIGNvbnN0IGlzT2JqZWN0ID0gKG9iaikgPT4gb2JqICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnO1xuICAgIC8vIG1ha2Ugc3VyZSBib3RoIHRoZSB0YXJnZXQgYW5kIHRoZSBzb3VyY2UgYXJlIG9iamVjdHNcbiAgICAvLyBvdGhlcndpc2UgcmV0dXJuIHNvdXJjZVxuICAgIGlmICghaXNPYmplY3QodGFyZ2V0KSB8fCAhaXNPYmplY3Qoc291cmNlKSkge1xuICAgICAgICByZXR1cm4gc291cmNlO1xuICAgIH1cbiAgICAvLyBpdGVyYXRlIG92ZXIgc291cmNlXG4gICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIC8vIGdldCB2YWx1ZXMgZnJvbSBib3RoIHRhcmdldCBhbmQgc291cmNlIGZvciB0aGUgZ2l2ZW4ga2V5XG4gICAgICAgIGNvbnN0IHRhcmdldFZhbHVlID0gdGFyZ2V0W2tleV07XG4gICAgICAgIGNvbnN0IHNvdXJjZVZhbHVlID0gc291cmNlW2tleV07XG4gICAgICAgIC8vIG1lcmdlIGJvdGggdmFsdWVzXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRhcmdldFZhbHVlKSAmJiBBcnJheS5pc0FycmF5KHNvdXJjZVZhbHVlKSkge1xuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBbLi4ubmV3IFNldCh0YXJnZXRWYWx1ZS5jb25jYXQoc291cmNlVmFsdWUpKV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNPYmplY3QodGFyZ2V0VmFsdWUpICYmIGlzT2JqZWN0KHNvdXJjZVZhbHVlKSkge1xuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBkZWVwTWVyZ2UoT2JqZWN0LmFzc2lnbih7fSwgdGFyZ2V0VmFsdWUpLCBzb3VyY2VWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVZhbHVlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gcmV0dXJuIG1lcmdlIG9iamVjdFxuICAgIHJldHVybiB0YXJnZXQ7XG59O1xuZXhwb3J0IGRlZmF1bHQgZGVlcE1lcmdlO1xuIiwiaW1wb3J0IHsgY29udmVydFBhaW50VG9SZ2JhIH0gZnJvbSAnLi9jb252ZXJ0Q29sb3InO1xuLyoqXG4gKiBSZXR1cm4gYW4gYXJyYXkgb2Ygc29saWQgc3Ryb2tlIGNvbG9yc1xuICovXG5jb25zdCBnZXRTb2xpZFN0cm9rZXMgPSAocGFpbnRzKSA9PiB7XG4gICAgLy8gY2xvbmUgd2l0aG91dCByZWZlcmVuY2VcbiAgICByZXR1cm4gWy4uLnBhaW50c11cbiAgICAgICAgLm1hcChwYWludCA9PiBjb252ZXJ0UGFpbnRUb1JnYmEocGFpbnQpKVxuICAgICAgICAuZmlsdGVyKHBhaW50ID0+IHBhaW50ICE9IG51bGwpO1xufTtcbi8qKlxuICogZXh0cmFjdFRva2VuTm9kZVZhbHVlc1xuICogQHBhcmFtIG5vZGU6IFNjZW5lTm9kZVxuICogQHJldHVybnMgbm9kZSBvYmplY3RcbiAqL1xuY29uc3QgZXh0cmFjdFRva2VuTm9kZVZhbHVlcyA9IChub2RlKSA9PiB7XG4gICAgdmFyIF9hO1xuICAgIHJldHVybiAoe1xuICAgICAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgZGVzY3JpcHRpb246IG5vZGUuZGVzY3JpcHRpb24gfHwgdW5kZWZpbmVkLFxuICAgICAgICBib3R0b21MZWZ0UmFkaXVzOiBub2RlLmJvdHRvbUxlZnRSYWRpdXMsXG4gICAgICAgIGJvdHRvbVJpZ2h0UmFkaXVzOiBub2RlLmJvdHRvbVJpZ2h0UmFkaXVzLFxuICAgICAgICB0b3BMZWZ0UmFkaXVzOiBub2RlLnRvcExlZnRSYWRpdXMsXG4gICAgICAgIHRvcFJpZ2h0UmFkaXVzOiBub2RlLnRvcFJpZ2h0UmFkaXVzLFxuICAgICAgICBjb3JuZXJSYWRpdXM6IG5vZGUuY29ybmVyUmFkaXVzIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgY29ybmVyU21vb3RoaW5nOiBub2RlLmNvcm5lclNtb290aGluZyxcbiAgICAgICAgc3Ryb2tlczogZ2V0U29saWRTdHJva2VzKG5vZGUuc3Ryb2tlcyksXG4gICAgICAgIHN0cm9rZVdlaWdodDogbm9kZS5zdHJva2VXZWlnaHQsXG4gICAgICAgIHN0cm9rZVN0eWxlSWQ6IG5vZGUuc3Ryb2tlU3R5bGVJZCxcbiAgICAgICAgc3Ryb2tlTWl0ZXJMaW1pdDogbm9kZS5zdHJva2VNaXRlckxpbWl0LFxuICAgICAgICBzdHJva2VKb2luOiBub2RlLnN0cm9rZUpvaW4sXG4gICAgICAgIHN0cm9rZUNhcDogbm9kZS5zdHJva2VDYXAsXG4gICAgICAgIGRhc2hQYXR0ZXJuOiBub2RlLmRhc2hQYXR0ZXJuLFxuICAgICAgICBzdHJva2VBbGlnbjogbm9kZS5zdHJva2VBbGlnbixcbiAgICAgICAgd2lkdGg6IG5vZGUud2lkdGgsXG4gICAgICAgIGhlaWdodDogbm9kZS5oZWlnaHQsXG4gICAgICAgIHJlYWN0aW9uczogbm9kZS5yZWFjdGlvbnMgfHwgdW5kZWZpbmVkLFxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHBhZGRpbmdUb3A6IG5vZGUucGFkZGluZ1RvcCB8fCAwLFxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHBhZGRpbmdSaWdodDogbm9kZS5wYWRkaW5nUmlnaHQgfHwgMCxcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBwYWRkaW5nQm90dG9tOiBub2RlLnBhZGRpbmdCb3R0b20gfHwgMCxcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBwYWRkaW5nTGVmdDogbm9kZS5wYWRkaW5nTGVmdCB8fCAwLFxuICAgICAgICBvcGFjaXR5OiAoX2EgPSBub2RlLm9wYWNpdHkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IDFcbiAgICB9KTtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0VG9rZW5Ob2RlVmFsdWVzO1xuIiwiaW1wb3J0IGNvbmZpZyBmcm9tICdAY29uZmlnL2NvbmZpZyc7XG5jb25zdCBleGNsdXNpb25QcmVmaXggPSAoZXhjbHVzaW9uUHJlZml4U3RyaW5ncykgPT4ge1xuICAgIHJldHVybiBbXG4gICAgICAgIC4uLmNvbmZpZy5leGNsdXNpb25QcmVmaXhEZWZhdWx0LFxuICAgICAgICAuLi5leGNsdXNpb25QcmVmaXhTdHJpbmdzXG4gICAgXTtcbn07XG5jb25zdCBmaWx0ZXJCeVByb3BlcnR5TmFtZSA9IChvYmplY3QsIGV4Y2x1c2lvblByZWZpeFN0cmluZ3MpID0+ICFleGNsdXNpb25QcmVmaXgoZXhjbHVzaW9uUHJlZml4U3RyaW5ncykuaW5jbHVkZXMob2JqZWN0Lm5hbWUudHJpbSgpLnN1YnN0cigwLCAxKSk7XG5leHBvcnQgZGVmYXVsdCBmaWx0ZXJCeVByb3BlcnR5TmFtZTtcbiIsIi8qKlxuICogQGZ1bmN0aW9uIGdldEVmZmVjdFN0eWxlc1xuICogQHBhcmFtIHtBcnJheTxFZmZlY3RTdHlsZT59IHN0eWxlcyDigJMgdGhlIGVmZmVjdFN0eWxlIGZyb20gdGhlIGZpZ21hIGZpbGVcbiAqL1xuY29uc3QgZ2V0RWZmZWN0U3R5bGVzID0gKHN0eWxlcykgPT4ge1xuICAgIC8vIGluaXQgc3R5bGVBcnJheVxuICAgIGNvbnN0IHN0eWxlQXJyYXkgPSBbXTtcbiAgICAvLyBsb29wIHRocm91Z2ggRmlnbWEgc3R5bGVzIGFuZCBhZGQgdG8gYXJyYXlcbiAgICBzdHlsZXMuZm9yRWFjaChzdHlsZSA9PiB7XG4gICAgICAgIHN0eWxlQXJyYXkucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBzdHlsZS5uYW1lLFxuICAgICAgICAgICAgaWQ6IHN0eWxlLmlkLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHN0eWxlLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZWZmZWN0czogc3R5bGUuZWZmZWN0c1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyByZXR1cm4gYXJyYXlcbiAgICByZXR1cm4gc3R5bGVBcnJheTtcbn07XG5leHBvcnQgZGVmYXVsdCBnZXRFZmZlY3RTdHlsZXM7XG4iLCJpbXBvcnQgY29uZmlnIGZyb20gJ0Bjb25maWcvY29uZmlnJztcbmNvbnN0IGdldEZpbGVJZCA9IChmaWdtYSkgPT4ge1xuICAgIGxldCBmaWxlSWQgPSBmaWdtYS5yb290LmdldFBsdWdpbkRhdGEoY29uZmlnLmtleS5maWxlSWQpO1xuICAgIC8vIHNldCBwbHVnaW4gaWQgaWYgaXQgZG9lcyBub3QgZXhpc3RcbiAgICBpZiAoZmlsZUlkID09PSB1bmRlZmluZWQgfHwgZmlsZUlkID09PSAnJykge1xuICAgICAgICBmaWdtYS5yb290LnNldFBsdWdpbkRhdGEoY29uZmlnLmtleS5maWxlSWQsIGZpZ21hLnJvb3QubmFtZSArICcgJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAwMDApKTtcbiAgICAgICAgLy8gZ3JhYiBmaWxlIElEXG4gICAgICAgIGZpbGVJZCA9IGZpZ21hLnJvb3QuZ2V0UGx1Z2luRGF0YShjb25maWcua2V5LmZpbGVJZCk7XG4gICAgfVxuICAgIHJldHVybiBmaWxlSWQ7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0RmlsZUlkO1xuIiwiLyoqXG4gKiBAZnVuY3Rpb24gZ2V0R3JpZFN0eWxlc1xuICogQHBhcmFtIHtBcnJheX0gZ3JpZFN0eWxlcyDigJMgdGhlIGdyaWRTdHlsZXMgZnJvbSB0aGUgZmlnbWEgZmlsZVxuICovXG5jb25zdCBnZXRHcmlkU3R5bGVzID0gKHN0eWxlcykgPT4ge1xuICAgIC8vIGluaXQgc3R5bGVBcnJheVxuICAgIGNvbnN0IHN0eWxlQXJyYXkgPSBbXTtcbiAgICAvLyBsb29wIHRocm91Z2ggRmlnbWEgc3R5bGVzIGFuZCBhZGQgdG8gYXJyYXlcbiAgICBzdHlsZXMuZm9yRWFjaChzdHlsZSA9PiB7XG4gICAgICAgIHN0eWxlQXJyYXkucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBzdHlsZS5uYW1lLFxuICAgICAgICAgICAgaWQ6IHN0eWxlLmlkLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHN0eWxlLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgbGF5b3V0R3JpZHM6IHN0eWxlLmxheW91dEdyaWRzXG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIHJldHVybiBhcnJheVxuICAgIHJldHVybiBzdHlsZUFycmF5O1xufTtcbmV4cG9ydCBkZWZhdWx0IGdldEdyaWRTdHlsZXM7XG4iLCIvKipcbiAqIEBmdW5jdGlvbiBnZXRQYWludFN0eWxlc1xuICogQHBhcmFtIHtBcnJheX0gcGFpbnRTdHlsZXMg4oCTIHRoZSBwYWludFN0eWxlcyBmcm9tIHRoZSBmaWdtYSBmaWxlIChzb21laG93IHN0aWxsIGNvbm5lY3RlZClcbiAqL1xuY29uc3QgZ2V0UGFpbnRTdHlsZXMgPSAoc3R5bGVzKSA9PiB7XG4gICAgLy8gaW5pdCBzdHlsZUFycmF5XG4gICAgY29uc3Qgc3R5bGVBcnJheSA9IFtdO1xuICAgIC8vIGxvb3AgdGhyb3VnaCBGaWdtYSBzdHlsZXMgYW5kIGFkZCB0byBhcnJheVxuICAgIHN0eWxlcy5mb3JFYWNoKHN0eWxlID0+IHtcbiAgICAgICAgc3R5bGVBcnJheS5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IHN0eWxlLm5hbWUsXG4gICAgICAgICAgICBpZDogc3R5bGUuaWQsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogc3R5bGUuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBwYWludHM6IHN0eWxlLnBhaW50c1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyByZXR1cm4gYXJyYXlcbiAgICByZXR1cm4gc3R5bGVBcnJheTtcbn07XG5leHBvcnQgZGVmYXVsdCBnZXRQYWludFN0eWxlcztcbiIsIi8qKlxuICogQGZ1bmN0aW9uIGdldFRleHRTdHlsZXNcbiAqIEBwYXJhbSB7QXJyYXk8VGV4dFN0eWxlPn0gc3R5bGVzIOKAkyB0aGUgcGFpbnRTdHlsZXMgZnJvbSB0aGUgZmlnbWEgZmlsZSAoc29tZWhvdyBzdGlsbCBjb25uZWN0ZWQpXG4gKi9cbmNvbnN0IGdldFRleHRTdHlsZXMgPSAoc3R5bGVzKSA9PiB7XG4gICAgLy8gaW5pdCBzdHlsZUFycmF5XG4gICAgY29uc3Qgc3R5bGVBcnJheSA9IFtdO1xuICAgIC8vIGxvb3AgdGhyb3VnaCBGaWdtYSBzdHlsZXMgYW5kIGFkZCB0byBhcnJheVxuICAgIHN0eWxlcy5mb3JFYWNoKHN0eWxlID0+IHtcbiAgICAgICAgc3R5bGVBcnJheS5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IHN0eWxlLm5hbWUsXG4gICAgICAgICAgICBpZDogc3R5bGUuaWQsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogc3R5bGUuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBmb250U2l6ZTogc3R5bGUuZm9udFNpemUsXG4gICAgICAgICAgICB0ZXh0RGVjb3JhdGlvbjogc3R5bGUudGV4dERlY29yYXRpb24sXG4gICAgICAgICAgICBmb250TmFtZTogc3R5bGUuZm9udE5hbWUsXG4gICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiBzdHlsZS5sZXR0ZXJTcGFjaW5nLFxuICAgICAgICAgICAgbGluZUhlaWdodDogc3R5bGUubGluZUhlaWdodCxcbiAgICAgICAgICAgIHBhcmFncmFwaEluZGVudDogc3R5bGUucGFyYWdyYXBoSW5kZW50LFxuICAgICAgICAgICAgcGFyYWdyYXBoU3BhY2luZzogc3R5bGUucGFyYWdyYXBoU3BhY2luZyxcbiAgICAgICAgICAgIHRleHRDYXNlOiBzdHlsZS50ZXh0Q2FzZVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyByZXR1cm4gYXJyYXlcbiAgICByZXR1cm4gc3R5bGVBcnJheTtcbn07XG5leHBvcnQgZGVmYXVsdCBnZXRUZXh0U3R5bGVzO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgZXh0cmFjdENvbG9ycyBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdENvbG9ycyc7XG5pbXBvcnQgZXh0cmFjdEdyaWRzIGZyb20gJy4uL2V4dHJhY3Rvci9leHRyYWN0R3JpZHMnO1xuaW1wb3J0IGV4dHJhY3RGb250cyBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdEZvbnRzJztcbmltcG9ydCBleHRyYWN0RWZmZWN0cyBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdEVmZmVjdHMnO1xuaW1wb3J0IGV4dHJhY3RNb3Rpb24gZnJvbSAnLi4vZXh0cmFjdG9yL2V4dHJhY3RNb3Rpb24nO1xuaW1wb3J0IGV4dHJhY3RTaXplcyBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdFNpemVzJztcbmltcG9ydCBleHRyYWN0U3BhY2luZyBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdFNwYWNpbmcnO1xuaW1wb3J0IGV4dHJhY3RCb3JkZXJzIGZyb20gJy4uL2V4dHJhY3Rvci9leHRyYWN0Qm9yZGVycyc7XG5pbXBvcnQgZXh0cmFjdFJhZGlpIGZyb20gJy4uL2V4dHJhY3Rvci9leHRyYWN0UmFkaWknO1xuaW1wb3J0IGV4dHJhY3RCcmVha3BvaW50cyBmcm9tICcuLi9leHRyYWN0b3IvZXh0cmFjdEJyZWFrcG9pbnRzJztcbmltcG9ydCBleHRyYWN0T3BhY2l0aWVzIGZyb20gJy4uL2V4dHJhY3Rvci9leHRyYWN0T3BhY2l0aWVzJztcbmltcG9ydCBidWlsZEZpZ21hRGF0YSBmcm9tICcuL2J1aWxkRmlnbWFEYXRhJztcbmltcG9ydCB7IGdldFZhcmlhYmxlcyB9IGZyb20gJy4vZ2V0VmFyaWFibGVzJztcbmNvbnN0IGdldFByZWZpeEFycmF5ID0gKHByZWZpeFN0cmluZyA9ICcnKSA9PiBwcmVmaXhTdHJpbmcuc3BsaXQoJywnKS5tYXAoaXRlbSA9PiBpdGVtLnJlcGxhY2UoL1xccysvZywgJycpKTtcbmV4cG9ydCBjb25zdCBleHBvcnRSYXdUb2tlbkFycmF5ID0gKGZpZ21hLCBzZXR0aW5ncykgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgY29uc3QgZmlnbWFEYXRhID0geWllbGQgYnVpbGRGaWdtYURhdGEoZmlnbWEsIHNldHRpbmdzKTtcbiAgICAvLyBnZXQgdG9rZW5zXG4gICAgcmV0dXJuIFtcbiAgICAgICAgLi4uZXh0cmFjdFNpemVzKGZpZ21hRGF0YS50b2tlbkZyYW1lcywgZ2V0UHJlZml4QXJyYXkoc2V0dGluZ3MucHJlZml4LnNpemUpKSxcbiAgICAgICAgLi4uZXh0cmFjdEJyZWFrcG9pbnRzKGZpZ21hRGF0YS50b2tlbkZyYW1lcywgZ2V0UHJlZml4QXJyYXkoc2V0dGluZ3MucHJlZml4LmJyZWFrcG9pbnQpKSxcbiAgICAgICAgLi4uZXh0cmFjdFNwYWNpbmcoZmlnbWFEYXRhLnRva2VuRnJhbWVzLCBnZXRQcmVmaXhBcnJheShzZXR0aW5ncy5wcmVmaXguc3BhY2luZykpLFxuICAgICAgICAuLi5leHRyYWN0Qm9yZGVycyhmaWdtYURhdGEudG9rZW5GcmFtZXMsIGdldFByZWZpeEFycmF5KHNldHRpbmdzLnByZWZpeC5ib3JkZXIpKSxcbiAgICAgICAgLi4uZXh0cmFjdFJhZGlpKGZpZ21hRGF0YS50b2tlbkZyYW1lcywgZ2V0UHJlZml4QXJyYXkoc2V0dGluZ3MucHJlZml4LnJhZGl1cykpLFxuICAgICAgICAuLi5leHRyYWN0TW90aW9uKGZpZ21hRGF0YS50b2tlbkZyYW1lcywgZ2V0UHJlZml4QXJyYXkoc2V0dGluZ3MucHJlZml4Lm1vdGlvbikpLFxuICAgICAgICAuLi5leHRyYWN0T3BhY2l0aWVzKGZpZ21hRGF0YS50b2tlbkZyYW1lcywgZ2V0UHJlZml4QXJyYXkoc2V0dGluZ3MucHJlZml4Lm9wYWNpdHkpKSxcbiAgICAgICAgLi4uZXh0cmFjdENvbG9ycyhmaWdtYURhdGEucGFpbnRTdHlsZXMsIHsgY29sb3I6IGdldFByZWZpeEFycmF5KHNldHRpbmdzLnByZWZpeC5jb2xvciksIGdyYWRpZW50OiBnZXRQcmVmaXhBcnJheShzZXR0aW5ncy5wcmVmaXguZ3JhZGllbnQpLCBhbGlhczogZ2V0UHJlZml4QXJyYXkoc2V0dGluZ3MuYWxpYXMpIH0pLFxuICAgICAgICAuLi5leHRyYWN0R3JpZHMoZmlnbWFEYXRhLmdyaWRTdHlsZXMsIGdldFByZWZpeEFycmF5KHNldHRpbmdzLnByZWZpeC5ncmlkKSksXG4gICAgICAgIC4uLmV4dHJhY3RGb250cyhmaWdtYURhdGEudGV4dFN0eWxlcywgZ2V0UHJlZml4QXJyYXkoc2V0dGluZ3MucHJlZml4LmZvbnQpKSxcbiAgICAgICAgLi4uZXh0cmFjdEVmZmVjdHMoZmlnbWFEYXRhLmVmZmVjdFN0eWxlcywgZ2V0UHJlZml4QXJyYXkoc2V0dGluZ3MucHJlZml4LmVmZmVjdCkpLFxuICAgICAgICAuLi4oeWllbGQgZ2V0VmFyaWFibGVzKGZpZ21hLCBzZXR0aW5ncykpXG4gICAgXTtcbn0pO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgZXh0cmFjdFRva2VuTm9kZVZhbHVlcyBmcm9tICdAdXRpbHMvZXh0cmFjdFRva2VuTm9kZVZhbHVlcyc7XG5pbXBvcnQgaXNUb2tlbk5vZGUgZnJvbSAnQHV0aWxzL2lzVG9rZW5Ob2RlJztcbi8vIHRoZSBuYW1lIHRoYXQgdG9rZW4gZnJhbWVzIGhhdmVcbmNvbnN0IHRva2VuRnJhbWVOYW1lID0gJ190b2tlbnMnO1xuLy8gY2hlY2sgaWYgYSBmcmFtZSBpcyBhIF90b2tlbiBmcmFtZVxuY29uc3QgaXNUb2tlbkZyYW1lID0gKG5vZGUpID0+IG5vZGUudHlwZSA9PT0gJ0ZSQU1FJyAmJiBub2RlLm5hbWUudHJpbSgpLnRvTG93ZXJDYXNlKCkuc3Vic3RyKDAsIHRva2VuRnJhbWVOYW1lLmxlbmd0aCkgPT09IHRva2VuRnJhbWVOYW1lO1xuLy8gcmV0dXJuIG9ubHkgbm9kZXMgdGhhdCBhcmUgZnJhbWVzXG5jb25zdCBnZXRGcmFtZU5vZGVzID0gKG5vZGVzKSA9PiBbLi4ubm9kZXMubWFwKHBhZ2UgPT4gcGFnZS5maW5kQ2hpbGRyZW4obm9kZSA9PiBpc1Rva2VuRnJhbWUobm9kZSkpKS5yZWR1Y2UoKGZsYXR0ZW4sIGFycikgPT4gWy4uLmZsYXR0ZW4sIC4uLmFycl0pXTtcbi8qKlxuICogZ2V0VmFyaWFudE5hbWVcbiAqIGNyZWF0ZXMgdGhlIHZhcmlhbnQgbmFtZSBvZiB0aGUgcGFyZW50IGFuZCBjaGlsZCBuYW1lXG4gKi9cbmNvbnN0IGdldFZhcmlhbnROYW1lID0gKHBhcmVudE5hbWUsIGNoaWxkTmFtZSkgPT4ge1xuICAgIC8vIHNwbGl0IGludG8gYXJyYXlcbiAgICBjaGlsZE5hbWUgPSBjaGlsZE5hbWUuc3BsaXQoJywnKVxuICAgICAgICAvLyByZW1vdmUgaGlkZGVuIG5hbWVzXG4gICAgICAgIC5maWx0ZXIocGFydCA9PiAhWydfJywgJy4nXS5pbmNsdWRlcyhwYXJ0LnRyaW0oKS5zdWJzdHIoMCwgMSkpKVxuICAgICAgICAvLyBjbGVhbnVwIG5hbWVzLCBvbmx5IHJldHVybiB2YWx1ZSBwYXJ0XG4gICAgICAgIC5tYXAocGFydCA9PiBwYXJ0LnNwbGl0KCc9JylbMV0pXG4gICAgICAgIC8vIGNvbWJpbmVcbiAgICAgICAgLmpvaW4oJy8nKTtcbiAgICAvLyByZXR1cm4gZnVsbCBuYW1lXG4gICAgcmV0dXJuIGAke3BhcmVudE5hbWV9LyR7Y2hpbGROYW1lfWA7XG59O1xuLyoqXG4gKiBSZXR1cm5zIGFsbCBmcmFtZXMgZnJvbSB0aGUgZmlsZSB0aGF0IGhhdmUgYSBuYW1lIHRoYXQgc3RhcnRzIHdpdGggX3Rva2VucyBvciB0aGUgdXNlciBkZWZpbmVkIHRva2VuIHNwZWNpZmllclxuICpcbiAqIEBwYXJhbSBwYWdlcyBQYWdlTm9kZXNcbiAqL1xuY29uc3QgZ2V0VG9rZW5Ob2RlcyA9IChwYWdlcykgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgeWllbGQgZmlnbWEubG9hZEFsbFBhZ2VzQXN5bmMoKTtcbiAgICAvLyBnZXQgdG9rZW4gZnJhbWVzXG4gICAgY29uc3QgdG9rZW5GcmFtZXMgPSBnZXRGcmFtZU5vZGVzKHBhZ2VzKTtcbiAgICAvLyBnZXQgYWxsIGNoaWxkcmVuIG9mIHRva2VuIGZyYW1lc1xuICAgIHJldHVybiB0b2tlbkZyYW1lcy5tYXAoZnJhbWUgPT4gZnJhbWVcbiAgICAgICAgLy8gY2hlY2sgaWYgY2hpbGRyZW4gYXJlIG9mIHZhbGlkIHR5cGVzXG4gICAgICAgIC5maW5kQWxsKFxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgbm9kZSA9PiBpc1Rva2VuTm9kZShub2RlKSkpXG4gICAgICAgIC8vIG1lcmdlcyBhbGwgY2hpbGRyZW4gaW50byBvbmUgYXJyYXlcbiAgICAgICAgLnJlZHVjZSgoZmxhdHRlbiwgYXJyKSA9PiBbLi4uZmxhdHRlbiwgLi4uYXJyXSwgW10pXG4gICAgICAgIC8vIHVucGFjayB2YXJpYW50cyAmIHdhcm4gYWJvdXQgZGVwcmVjYXRlZCB0eXBlc1xuICAgICAgICAubWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGlmIChpdGVtLnR5cGUgPT09ICdSRUNUQU5HTEUnIHx8IGl0ZW0udHlwZSA9PT0gJ0ZSQU1FJykge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdQbGVhc2UgdXNlIG9ubHkgbWFpbiBjb21wb25lbnRzIGFuZCB2YXJpYW50cywgb3RoZXIgdHlwZXMgbWF5IGJlIGRlcHJlY2F0ZWQgYXMgdG9rZW5zIGluIHRoZSBmdXR1cmUnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB1bnBhY2sgdmFyaWFudHNcbiAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gJ0NPTVBPTkVOVF9TRVQnKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBOYW1lIGlzIG92ZXJ3cml0aW5nIHJlYWwgb2JqZWN0IGluIGZpZ21hXG4gICAgICAgICAgICAvLyAtPiBjcmVhdGUgY2xvbmUgYW5kIG1vdmUgdG8gbmV3IGFycmF5IHRvIHJldHVyblxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZXh0cmFjdFRva2VuTm9kZVZhbHVlcyhjaGlsZCkpLCB7IG5hbWU6IGdldFZhcmlhbnROYW1lKGl0ZW0ubmFtZSwgY2hpbGQubmFtZSkgfSkpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZXR1cm4gbm9ybWFsIGl0ZW0gYXMgYXJyYXkgdG8gdW5wYWNrIGxhdGVyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIFtleHRyYWN0VG9rZW5Ob2RlVmFsdWVzKGl0ZW0pXTtcbiAgICB9KVxuICAgICAgICAvLyBtZXJnZXMgdGhlIHZhcmlhbnQgY2hpbGRyZW4gaW50byBvbmUgYXJyYXlcbiAgICAgICAgLnJlZHVjZSgoZmxhdHRlbiwgYXJyKSA9PiBbLi4uZmxhdHRlbiwgLi4uYXJyXSwgW10pO1xufSk7XG5leHBvcnQgZGVmYXVsdCBnZXRUb2tlbk5vZGVzO1xuZXhwb3J0IGNvbnN0IF9fdGVzdGluZyA9IHtcbiAgICBpc1Rva2VuTm9kZTogaXNUb2tlbk5vZGUsXG4gICAgaXNUb2tlbkZyYW1lOiBpc1Rva2VuRnJhbWVcbn07XG4iLCJleHBvcnQgY29uc3QgZ2V0VmFyaWFibGVUeXBlQnlWYWx1ZSA9ICh2YWx1ZSkgPT4ge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJylcbiAgICAgICAgcmV0dXJuICdzdHJpbmcnO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKVxuICAgICAgICByZXR1cm4gJ2RpbWVuc2lvbic7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpXG4gICAgICAgIHJldHVybiAnY29sb3InO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKVxuICAgICAgICByZXR1cm4gJ3N0cmluZyc7XG59O1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgY29uZmlnIGZyb20gJ0Bjb25maWcvY29uZmlnJztcbmltcG9ydCB7IHRva2VuVHlwZXMgfSBmcm9tICdAY29uZmlnL3Rva2VuVHlwZXMnO1xuaW1wb3J0IHsgcm91bmRSZ2JhIH0gZnJvbSAnQHV0aWxzL2NvbnZlcnRDb2xvcic7XG5pbXBvcnQgcm91bmRXaXRoRGVjaW1hbHMgZnJvbSAnQHV0aWxzL3JvdW5kV2l0aERlY2ltYWxzJztcbmltcG9ydCBoYW5kbGVWYXJpYWJsZUFsaWFzIGZyb20gJ0B1dGlscy9oYW5kbGVWYXJpYWJsZUFsaWFzJztcbmltcG9ydCBwcm9jZXNzQWxpYXNNb2RlcyBmcm9tICdAdXRpbHMvcHJvY2Vzc0FsaWFzTW9kZXMnO1xuaW1wb3J0IGRlZXBNZXJnZSBmcm9tICdAdXRpbHMvZGVlcE1lcmdlJztcbmNvbnN0IGV4dHJhY3RWYXJpYWJsZSA9ICh2YXJpYWJsZSwgdmFsdWUsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxubW9kZSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgbGV0IGNhdGVnb3J5ID0gJ2NvbG9yJztcbiAgICBsZXQgdmFsdWVzID0ge307XG4gICAgaWYgKHZhbHVlLnR5cGUgPT09ICdWQVJJQUJMRV9BTElBUycpIHtcbiAgICAgICAgcmV0dXJuIHlpZWxkIGhhbmRsZVZhcmlhYmxlQWxpYXModmFyaWFibGUsIHZhbHVlLCBtb2RlKTtcbiAgICB9XG4gICAgc3dpdGNoICh2YXJpYWJsZS5yZXNvbHZlZFR5cGUpIHtcbiAgICAgICAgY2FzZSAnQ09MT1InOlxuICAgICAgICAgICAgY2F0ZWdvcnkgPSAnY29sb3InO1xuICAgICAgICAgICAgdmFsdWVzID0ge1xuICAgICAgICAgICAgICAgIGZpbGw6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdW5kUmdiYSh2YWx1ZSksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdjb2xvcicsXG4gICAgICAgICAgICAgICAgICAgIGJsZW5kTW9kZTogJ25vcm1hbCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0ZMT0FUJzpcbiAgICAgICAgICAgIGNhdGVnb3J5ID0gJ2RpbWVuc2lvbic7XG4gICAgICAgICAgICB2YWx1ZXMgPSByb3VuZFdpdGhEZWNpbWFscyh2YWx1ZSwgMik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnU1RSSU5HJzpcbiAgICAgICAgICAgIGNhdGVnb3J5ID0gJ3N0cmluZyc7XG4gICAgICAgICAgICB2YWx1ZXMgPSB2YWx1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdCT09MRUFOJzpcbiAgICAgICAgICAgIGNhdGVnb3J5ID0gJ2Jvb2xlYW4nO1xuICAgICAgICAgICAgdmFsdWVzID0gdmFsdWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogdmFyaWFibGUubmFtZSxcbiAgICAgICAgZGVzY3JpcHRpb246IHZhcmlhYmxlLmRlc2NyaXB0aW9uIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgZXhwb3J0S2V5OiB0b2tlblR5cGVzLnZhcmlhYmxlcy5rZXksXG4gICAgICAgIGNhdGVnb3J5LFxuICAgICAgICB2YWx1ZXNcbiAgICB9O1xufSk7XG5jb25zdCBkZXRlY3RWYXJpYWJsZVJlZmVyZW5jZXNJbkNvbGxlY3Rpb24gPSAoY29sbGVjdGlvbiwgdmFyaWFibGUpID0+IHtcbiAgICB2YXIgX2E7XG4gICAgbGV0IHRtcFZhcmlhYmxlID0ge307XG4gICAgaWYgKHZhcmlhYmxlKSB7XG4gICAgICAgIChfYSA9IGNvbGxlY3Rpb24gPT09IG51bGwgfHwgY29sbGVjdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29sbGVjdGlvbi5tb2RlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmZvckVhY2goKG1vZGUpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IG1vZGVWYWx1ZSA9IHZhcmlhYmxlLnZhbHVlc0J5TW9kZVttb2RlLm1vZGVJZF07XG4gICAgICAgICAgICAvLyBMb29wIHRocm91Z2ggb3RoZXIgdmFyaWFibGVzIGluIHRoZSBzYW1lIGNvbGxlY3Rpb24gdG8gY2hlY2sgZm9yIHJlZmVyZW5jZXNcbiAgICAgICAgICAgIChfYSA9IGNvbGxlY3Rpb24udmFyaWFibGVJZHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5mb3JFYWNoKChvdGhlclZhcmlhYmxlSWQpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG90aGVyVmFyaWFibGUgPSB5aWVsZCBmaWdtYS52YXJpYWJsZXMuZ2V0VmFyaWFibGVCeUlkQXN5bmMob3RoZXJWYXJpYWJsZUlkKTtcbiAgICAgICAgICAgICAgICBpZiAob3RoZXJWYXJpYWJsZSAmJlxuICAgICAgICAgICAgICAgICAgICBtb2RlVmFsdWUgJiZcbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIG1vZGVWYWx1ZSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgICAgICAgICAgdmFyaWFibGUubmFtZSAhPT0gb3RoZXJWYXJpYWJsZS5uYW1lICYmIC8vIEF2b2lkIHNlbGYtcmVmZXJlbmNlXG4gICAgICAgICAgICAgICAgICAgIG1vZGVWYWx1ZS5pZCA9PT0gb3RoZXJWYXJpYWJsZS5pZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbGlhc1NhbWVNb2RlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdG1wVmFyaWFibGUgPSBoYW5kbGVWYXJpYWJsZUFsaWFzKHZhcmlhYmxlLCBtb2RlVmFsdWUsIG1vZGUsIGFsaWFzU2FtZU1vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBkZWVwTWVyZ2UodmFyaWFibGUsIHRtcFZhcmlhYmxlKTtcbn07XG5leHBvcnQgY29uc3QgZ2V0VmFyaWFibGVzID0gKGZpZ21hLCBzZXR0aW5ncykgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IGxvY2FsVmFyaWFibGVDb2xsZWN0aW9ucyA9IHlpZWxkIGZpZ21hLnZhcmlhYmxlcy5nZXRMb2NhbFZhcmlhYmxlQ29sbGVjdGlvbnNBc3luYygpO1xuICAgIGNvbnN0IGxvY2FsVmFyaWFibGVzID0geWllbGQgZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVzQXN5bmMoKTtcbiAgICBjb25zdCBleGNsdWRlZENvbGxlY3Rpb25JZHMgPSBsb2NhbFZhcmlhYmxlQ29sbGVjdGlvbnMgPT09IG51bGwgfHwgbG9jYWxWYXJpYWJsZUNvbGxlY3Rpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBsb2NhbFZhcmlhYmxlQ29sbGVjdGlvbnMuZmlsdGVyKChjb2xsZWN0aW9uKSA9PiAhWycuJywgJ18nLCAuLi5zZXR0aW5ncy5leGNsdXNpb25QcmVmaXguc3BsaXQoJywnKV0uaW5jbHVkZXMoY29sbGVjdGlvbi5uYW1lLmNoYXJBdCgwKSkpLm1hcCgoY29sbGVjdGlvbikgPT4gY29sbGVjdGlvbi5pZCk7XG4gICAgLy8gZ2V0IGNvbGxlY3Rpb25zXG4gICAgY29uc3QgY29sbGVjdGlvbnMgPSBsb2NhbFZhcmlhYmxlQ29sbGVjdGlvbnNcbiAgICAgICAgPyBPYmplY3QuZnJvbUVudHJpZXMobG9jYWxWYXJpYWJsZUNvbGxlY3Rpb25zID09PSBudWxsIHx8IGxvY2FsVmFyaWFibGVDb2xsZWN0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogbG9jYWxWYXJpYWJsZUNvbGxlY3Rpb25zLm1hcCgoY29sbGVjdGlvbikgPT4gW2NvbGxlY3Rpb24uaWQsIGNvbGxlY3Rpb25dKSlcbiAgICAgICAgOiBbXTtcbiAgICAvLyBnZXQgdmFyaWFibGVzXG4gICAgY29uc3QgdmFyaWFibGVzID0geWllbGQgUHJvbWlzZS5hbGwoKChfYSA9IGxvY2FsVmFyaWFibGVzID09PSBudWxsIHx8IGxvY2FsVmFyaWFibGVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBsb2NhbFZhcmlhYmxlcy5maWx0ZXIoKHZhcmlhYmxlKSA9PiBleGNsdWRlZENvbGxlY3Rpb25JZHMuaW5jbHVkZXModmFyaWFibGUudmFyaWFibGVDb2xsZWN0aW9uSWQpKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1hcCgodmFyaWFibGUpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB2YXIgX2I7XG4gICAgICAgIC8vIGdldCBjb2xsZWN0aW9uIG5hbWUgYW5kIG1vZGVzXG4gICAgICAgIGNvbnN0IHsgdmFyaWFibGVDb2xsZWN0aW9uSWQgfSA9IHZhcmlhYmxlO1xuICAgICAgICBjb25zdCB7IG5hbWU6IGNvbGxlY3Rpb24sIG1vZGVzIH0gPSBjb2xsZWN0aW9uc1t2YXJpYWJsZUNvbGxlY3Rpb25JZF07XG4gICAgICAgIGlmIChzZXR0aW5ncy5yZXNvbHZlU2FtZUNvbGxlY3Rpb25Pck1vZGVSZWZlcmVuY2UpIHtcbiAgICAgICAgICAgIHZhcmlhYmxlID0gZGV0ZWN0VmFyaWFibGVSZWZlcmVuY2VzSW5Db2xsZWN0aW9uKGNvbGxlY3Rpb25zW3ZhcmlhYmxlQ29sbGVjdGlvbklkXSwgdmFyaWFibGUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJldHVybiBlYWNoIG1vZGUgdmFsdWUgYXMgYSBzZXBhcmF0ZSB2YXJpYWJsZVxuICAgICAgICByZXR1cm4geWllbGQgUHJvbWlzZS5hbGwoKF9iID0gT2JqZWN0LmVudHJpZXModmFyaWFibGUudmFsdWVzQnlNb2RlKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLm1hcCgoW2lkLCB2YWx1ZV0pID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgLy8gT25seSBhZGQgbW9kZSBpZiB0aGVyZSdzIG1vcmUgdGhhbiBvbmVcbiAgICAgICAgICAgIC8vIGFuZCBpZiBtb2RlSW5Ub2tlbk5hbWUgaXMgc2V0IHRvIHRydWVcbiAgICAgICAgICAgIGNvbnN0IGFkZE1vZGVJblRva2VuTmFtZSA9IHNldHRpbmdzLm1vZGVJblRva2VuTmFtZSAmJiBtb2Rlcy5sZW5ndGggPiAxO1xuICAgICAgICAgICAgY29uc3QgbW9kZSA9IG1vZGVzLmZpbmQoKHsgbW9kZUlkIH0pID0+IG1vZGVJZCA9PT0gaWQpO1xuICAgICAgICAgICAgY29uc3QgdmFyaWFibGVOYW1lID0gYCR7Y29sbGVjdGlvbn0vJHt2YXJpYWJsZS5uYW1lfWA7XG4gICAgICAgICAgICBjb25zdCB2YXJpYWJsZU5hbWVXaXRoTW9kZSA9IGAke2NvbGxlY3Rpb259LyR7bW9kZS5uYW1lfS8ke3ZhcmlhYmxlLm5hbWV9YDtcbiAgICAgICAgICAgIGNvbnN0IGV4dHJhY3RlZFZhcmlhYmxlID0geWllbGQgZXh0cmFjdFZhcmlhYmxlKHZhcmlhYmxlLCB2YWx1ZSwgbW9kZSk7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBleHRyYWN0ZWRWYXJpYWJsZSksIHsgXG4gICAgICAgICAgICAgICAgLy8gbmFtZSBpcyBjb25zdHJ1Y3RlZCBmcm9tIGNvbGxlY3Rpb24sIG1vZGUgYW5kIHZhcmlhYmxlIG5hbWVcbiAgICAgICAgICAgICAgICBuYW1lOiBhZGRNb2RlSW5Ub2tlbk5hbWUgPyB2YXJpYWJsZU5hbWVXaXRoTW9kZSA6IHZhcmlhYmxlTmFtZSwgXG4gICAgICAgICAgICAgICAgLy8gYWRkIG1ldGFkYXRhIHRvIGV4dGVuc2lvbnNcbiAgICAgICAgICAgICAgICBleHRlbnNpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIFtjb25maWcua2V5LmV4dGVuc2lvblBsdWdpbkRhdGFdOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlOiBzZXR0aW5ncy5tb2RlSW5Ub2tlblZhbHVlID8gbW9kZS5uYW1lIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvbjogY29sbGVjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlczogdmFyaWFibGUuc2NvcGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2NvbmZpZy5rZXkuZXh0ZW5zaW9uVmFyaWFibGVTdHlsZUlkXTogdmFyaWFibGUuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBleHBvcnRLZXk6IHRva2VuVHlwZXMudmFyaWFibGVzLmtleVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSB9KTtcbiAgICAgICAgfSkpKTtcbiAgICB9KSkpIHx8IFtdKTtcbiAgICAvLyBhZGQgdGhlIG1vZGUgbmFtZSB0byB0aGUgdmFyaWFibGUgdmFsdWVzIHZhbHVlIGluIG9yZGVyXG4gICAgLy8gdG8gYmUgYWJsZSB0byByZWZlcmVuY2UgdG8gaXQgY29ycmVjdGx5OlxuICAgIC8vIHZhbHVlczogY29sbGVjdGlvbi52YWx1ZSBiZWNvbWVzIGNvbGxlY3Rpb24uW21vZGUgbmFtZV0udmFsdWVcbiAgICAvL1xuICAgIC8vIGB2YXJpYWJsZXNXaXRoQWxpYXNJblRoZVNhbWVDb2xsZWN0aW9uYCBpcyBub3QgdXNlZCB3aGVuIGBzZXR0aW5ncy5tb2RlSW5Ub2tlblZhbHVlYFxuICAgIC8vIGlzIHNldCB0byBgdHJ1ZWAgdG8gYXZvaWQgdmFsdWVzIGluIHRoZSBmb3JtIG9mOiBjb2xsZWN0aW9uLlttb2RlIG5hbWVdLlttb2RlIG5hbWVdLnZhbHVlXG4gICAgY29uc3QgdmFyaWFibGVzV2l0aEFsaWFzSW5UaGVTYW1lQ29sbGVjdGlvbiA9ICgpID0+IHZhcmlhYmxlc1xuICAgICAgICAuZmxhdCgpXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgLm1hcCgodikgPT4gKCh2ID09PSBudWxsIHx8IHYgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHYuYWxpYXNTYW1lTW9kZSkgPyBwcm9jZXNzQWxpYXNNb2Rlcyhbdl0pIDogdikpXG4gICAgICAgIC5mbGF0KCk7XG4gICAgcmV0dXJuIHNldHRpbmdzLm1vZGVJblRva2VuVmFsdWVcbiAgICAgICAgPyBwcm9jZXNzQWxpYXNNb2Rlcyh2YXJpYWJsZXMuZmxhdCgpKVxuICAgICAgICA6IHZhcmlhYmxlc1dpdGhBbGlhc0luVGhlU2FtZUNvbGxlY3Rpb24oKTtcbn0pO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgc2VtVmVyRGlmZmVyZW5jZSBmcm9tICcuL3NlbVZlckRpZmZlcmVuY2UnO1xuaW1wb3J0IGN1cnJlbnRWZXJzaW9uIGZyb20gJy4vdmVyc2lvbic7XG5pbXBvcnQgY29uZmlnIGZyb20gJ0Bjb25maWcvY29uZmlnJztcbmNvbnN0IGdldFZlcnNpb25EaWZmZXJlbmNlID0gKGZpZ21hKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAvLyBnZXQgdmVyc2lvbiAmIHZlcnNpb24gZGlmZmVyZW5jZVxuICAgIGNvbnN0IGxhc3RWZXJzaW9uU2V0dGluZ3NPcGVuZWQgPSB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKGNvbmZpZy5rZXkubGFzdFZlcnNpb25TZXR0aW5nc09wZW5lZCk7XG4gICAgY29uc3QgdmVyc2lvbkRpZmZlcmVuY2UgPSBzZW1WZXJEaWZmZXJlbmNlKGN1cnJlbnRWZXJzaW9uLCBsYXN0VmVyc2lvblNldHRpbmdzT3BlbmVkKTtcbiAgICAvLyB1cGRhdGUgdmVyc2lvblxuICAgIGlmICghbGFzdFZlcnNpb25TZXR0aW5nc09wZW5lZCB8fCBsYXN0VmVyc2lvblNldHRpbmdzT3BlbmVkICE9PSBjdXJyZW50VmVyc2lvbikge1xuICAgICAgICB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKGNvbmZpZy5rZXkubGFzdFZlcnNpb25TZXR0aW5nc09wZW5lZCwgY3VycmVudFZlcnNpb24pO1xuICAgIH1cbiAgICAvLyByZXR1cm4gdmVyc2lvbiBEaWZmZXJlbmNlXG4gICAgcmV0dXJuIHZlcnNpb25EaWZmZXJlbmNlO1xufSk7XG5leHBvcnQgZGVmYXVsdCBnZXRWZXJzaW9uRGlmZmVyZW5jZTtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgdG9rZW5UeXBlcyB9IGZyb20gJ0Bjb25maWcvdG9rZW5UeXBlcyc7XG5pbXBvcnQgeyBnZXRWYXJpYWJsZVR5cGVCeVZhbHVlIH0gZnJvbSAnQHV0aWxzL2dldFZhcmlhYmxlVHlwZUJ5VmFsdWUnO1xuaW1wb3J0IHsgY2hhbmdlTm90YXRpb24gfSBmcm9tICdAdXRpbHMvY2hhbmdlTm90YXRpb24nO1xuZnVuY3Rpb24gaGFuZGxlVmFyaWFibGVBbGlhcyh2YXJpYWJsZSwgdmFsdWUsIG1vZGUsIGFsaWFzU2FtZU1vZGUgPSBmYWxzZSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IHJlc29sdmVkQWxpYXMgPSB5aWVsZCBmaWdtYS52YXJpYWJsZXMuZ2V0VmFyaWFibGVCeUlkQXN5bmModmFsdWUuaWQpO1xuICAgICAgICBjb25zdCBjb2xsZWN0aW9uID0geWllbGQgZmlnbWEudmFyaWFibGVzLmdldFZhcmlhYmxlQ29sbGVjdGlvbkJ5SWRBc3luYyhyZXNvbHZlZEFsaWFzLnZhcmlhYmxlQ29sbGVjdGlvbklkKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB2YXJpYWJsZS5kZXNjcmlwdGlvbiB8fCAnJyxcbiAgICAgICAgICAgIGV4cG9ydEtleTogdG9rZW5UeXBlcy52YXJpYWJsZXMua2V5LFxuICAgICAgICAgICAgY2F0ZWdvcnk6IGdldFZhcmlhYmxlVHlwZUJ5VmFsdWUoT2JqZWN0LnZhbHVlcyhyZXNvbHZlZEFsaWFzLnZhbHVlc0J5TW9kZSlbMF0pLFxuICAgICAgICAgICAgdmFsdWVzOiBgeyR7Y29sbGVjdGlvbi5uYW1lLnRvTG93ZXJDYXNlKCl9LiR7Y2hhbmdlTm90YXRpb24ocmVzb2x2ZWRBbGlhcy5uYW1lLCAnLycsICcuJyl9fWAsXG4gICAgICAgICAgICAvLyB0aGlzIGlzIGJlaW5nIHN0b3JlZCBzbyB3ZSBjYW4gcHJvcGVybHkgdXBkYXRlIHRoZSBkZXNpZ24gdG9rZW5zIGxhdGVyIHRvIGFjY291bnQgZm9yIGFsbFxuICAgICAgICAgICAgLy8gbW9kZXMgd2hlbiB1c2luZyBhbGlhc2VzXG4gICAgICAgICAgICBhbGlhc0NvbGxlY3Rpb25OYW1lOiBjb2xsZWN0aW9uLm5hbWUudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgIGFsaWFzTW9kZTogbW9kZSxcbiAgICAgICAgICAgIGFsaWFzU2FtZU1vZGU6IHZhcmlhYmxlLmFsaWFzU2FtZU1vZGUgfHwgYWxpYXNTYW1lTW9kZVxuICAgICAgICB9O1xuICAgIH0pO1xufVxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlVmFyaWFibGVBbGlhcztcbiIsIi8vIHRoZSBub2RlIHR5cGVzIHRoYXQgY2FuIGJlIHVzZWQgZm9yIHRva2Vuc1xuY29uc3QgdG9rZW5Ob2RlVHlwZXMgPSBbXG4gICAgJ0NPTVBPTkVOVCcsXG4gICAgJ0NPTVBPTkVOVF9TRVQnLFxuICAgICdSRUNUQU5HTEUnLFxuICAgICdGUkFNRSdcbl07XG4vKipcbiAqIGNoZWNrIGlmIGEgbm9kZSBpcyBhIHZhbGlkIHRva2VuIG5vZGUgdHlwZVxuICogQ3VycmVudGx5OiAnQ09NUE9ORU5UJywgJ0ZSQU1FIG9yICdSRUNUQU5HTEUnXG4gKiBAcGFyYW0gU2NlbmVOb2RlIG5vZGVcbiAqL1xuY29uc3QgaXNUb2tlbk5vZGUgPSAobm9kZSkgPT4ge1xuICAgIHJldHVybiBub2RlLnBhcmVudC50eXBlICE9PSAnQ09NUE9ORU5UX1NFVCcgJiYgdG9rZW5Ob2RlVHlwZXMuaW5jbHVkZXMobm9kZS50eXBlKSAmJiBub2RlLm5hbWUubGVuZ3RoID4gMDtcbn07XG5leHBvcnQgZGVmYXVsdCBpc1Rva2VuTm9kZTtcbiIsImNvbnN0IHByb2Nlc3NBbGlhc01vZGVzID0gKHZhcmlhYmxlcykgPT4ge1xuICAgIHJldHVybiB2YXJpYWJsZXMucmVkdWNlKChjb2xsZWN0b3IsIHZhcmlhYmxlKSA9PiB7XG4gICAgICAgIC8vIG9ubHkgb25lIG1vZGUgd2lsbCBiZSBwYXNzZWQgaW4gaWYgYW55XG4gICAgICAgIGlmICghdmFyaWFibGUuYWxpYXNNb2RlKSB7XG4gICAgICAgICAgICBjb2xsZWN0b3IucHVzaCh2YXJpYWJsZSk7XG4gICAgICAgICAgICByZXR1cm4gY29sbGVjdG9yO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFsaWFzIG1vZGUgc2luZ3VsYXIgYmVjYXVzZSBvbmx5IG9uZSBpcyBzaG93blxuICAgICAgICBjb25zdCB7IGFsaWFzTW9kZSwgYWxpYXNDb2xsZWN0aW9uTmFtZSB9ID0gdmFyaWFibGU7XG4gICAgICAgIGNvbGxlY3Rvci5wdXNoKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdmFyaWFibGUpLCB7IHZhbHVlczogdmFyaWFibGUudmFsdWVzLnJlcGxhY2UoYHske2FsaWFzQ29sbGVjdGlvbk5hbWV9LmAsIGB7JHthbGlhc0NvbGxlY3Rpb25OYW1lfS4ke2FsaWFzTW9kZS5uYW1lLnRvTG93ZXJDYXNlKCl9LmApIH0pKTtcbiAgICAgICAgcmV0dXJuIGNvbGxlY3RvcjtcbiAgICB9LCBbXSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgcHJvY2Vzc0FsaWFzTW9kZXM7XG4iLCIvKipcbiAqIElmIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIG51bWJlclxuICogaXQgaXMgcm91bmRlZCB0byAzIGRlY2ltYWwgcG9zaXRpb25zXG4gKiBvdGhlcndpc2UgaXQgaXMgcmV0dXJuZWQgYXMgaXNcbiAqIEBwYXJhbSB2YWx1ZSBudW1iZXJcbiAqIEBwYXJhbSBkZWNpbWFsUGxhY2VzIGludFxuICovXG5jb25zdCByb3VuZFdpdGhEZWNpbWFscyA9ICh2YWx1ZSwgZGVjaW1hbFBsYWNlcyA9IDIpID0+IHtcbiAgICAvLyBleGl0IGlmIHZhbHVlIGlzIHVuZGVmaW5lZFxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gY2hlY2sgZm9yIGNvcnJlY3QgaW5wdXRzXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicgfHwgdHlwZW9mIGRlY2ltYWxQbGFjZXMgIT09ICdudW1iZXInKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwYXJhbWV0ZXJzLCBib3RoIHZhbHVlIFwiJHt2YWx1ZX1cIiAoJHt0eXBlb2YgdmFsdWV9KSBhbmQgZGVjaW1hbFBsYWNlcyBcIiR7ZGVjaW1hbFBsYWNlc31cIiAoJHt0eXBlb2YgZGVjaW1hbFBsYWNlc30pIG11c3QgYmUgb2YgdHlwZSBudW1iZXJgKTtcbiAgICB9XG4gICAgLy8gc2V0IGRlY2ltYWwgcGxhY2VzXG4gICAgY29uc3QgZmFjdG9yT2ZUZW4gPSBNYXRoLnBvdygxMCwgZGVjaW1hbFBsYWNlcyk7XG4gICAgLy8gcm91bmQgcmVzdWx0IGFuZCByZXR1cm5cbiAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIGZhY3Rvck9mVGVuKSAvIGZhY3Rvck9mVGVuO1xufTtcbmV4cG9ydCBkZWZhdWx0IHJvdW5kV2l0aERlY2ltYWxzO1xuIiwiZXhwb3J0IGRlZmF1bHQgKGN1cnJlbnRTZW1WZXIsIHByZXZTZW1WZXJzID0gJzEuMC4wJykgPT4ge1xuICAgIGNvbnN0IFtwTWFqb3IsIHBNaW5vciwgcFBhdGNoXSA9IHByZXZTZW1WZXJzLnNwbGl0KCcuJyk7XG4gICAgY29uc3QgW2NNYWpvciwgY01pbm9yLCBjUGF0Y2hdID0gY3VycmVudFNlbVZlci5zcGxpdCgnLicpO1xuICAgIGlmIChwTWFqb3IgPCBjTWFqb3IpIHtcbiAgICAgICAgcmV0dXJuICdtYWpvcic7XG4gICAgfVxuICAgIGlmIChwTWlub3IgPCBjTWlub3IpIHtcbiAgICAgICAgcmV0dXJuICdtaW5vcic7XG4gICAgfVxuICAgIGlmIChwUGF0Y2ggPCBjUGF0Y2gpIHtcbiAgICAgICAgcmV0dXJuICdwYXRjaCc7XG4gICAgfVxufTtcbiIsImltcG9ydCB7IGRlZmF1bHRTZXR0aW5ncyB9IGZyb20gJ0Bjb25maWcvZGVmYXVsdFNldHRpbmdzJztcbmltcG9ydCBjb25maWcgZnJvbSAnQGNvbmZpZy9jb25maWcnO1xuaW1wb3J0IHsgc3RyaW5naWZ5SnNvbiB9IGZyb20gJy4vc3RyaW5naWZ5SnNvbic7XG5jb25zdCBmaXhNaXNzaW5nID0gKGRlZmF1bHRzLCBjdXJyZW50KSA9PiBPYmplY3QuZnJvbUVudHJpZXMoT2JqZWN0LmVudHJpZXMoZGVmYXVsdHMpLm1hcCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGN1cnJlbnRba2V5XSAhPT0gdHlwZW9mIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBba2V5LCBkZWZhdWx0c1trZXldXTtcbiAgICB9XG4gICAgcmV0dXJuIFtrZXksIGN1cnJlbnRba2V5XV07XG59KSk7XG4vKipcbiAqIGdldCB0aGUgY3VycmVudCB1c2VycyBzZXR0aW5nc1xuICogZm9yIHNldHRpbmdzIHRoYXQgYXJlIG5vdCBzZXQsIHRoZSBkZWZhdWx0cyB3aWxsIGJlIHVzZWRcbiAqIEByZXR1cm4gb2JqZWN0XG4gKi9cbmNvbnN0IGdldFNldHRpbmdzID0gKCkgPT4ge1xuICAgIGxldCBzdG9yZWRTZXR0aW5ncyA9IGZpZ21hLnJvb3QuZ2V0UGx1Z2luRGF0YShjb25maWcua2V5LnNldHRpbmdzKTtcbiAgICAvLyByZXR1cm4gZGVmYXVsdHMgaWYgbm8gc2V0dGluZ3MgYXJlIHByZXNlbnRcbiAgICBpZiAoc3RvcmVkU2V0dGluZ3MgPT09ICcnKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0U2V0dGluZ3M7XG4gICAgfVxuICAgIC8vIHBhcnNlIHN0b3JlZCBzZXR0aW5nc1xuICAgIHN0b3JlZFNldHRpbmdzID0gSlNPTi5wYXJzZShzdG9yZWRTZXR0aW5ncyk7XG4gICAgLy8gZml4IGlzc3VlcyBvbiBmaXJzdCBsZXZlbFxuICAgIGNvbnN0IGZpeGVkU2V0dGluZ3MgPSBmaXhNaXNzaW5nKGRlZmF1bHRTZXR0aW5ncywgc3RvcmVkU2V0dGluZ3MpO1xuICAgIGZpeGVkU2V0dGluZ3MucHJlZml4ID0gZml4TWlzc2luZyhkZWZhdWx0U2V0dGluZ3MucHJlZml4LCBmaXhlZFNldHRpbmdzLnByZWZpeCk7XG4gICAgZml4ZWRTZXR0aW5ncy5leHBvcnRzID0gZml4TWlzc2luZyhkZWZhdWx0U2V0dGluZ3MuZXhwb3J0cywgZml4ZWRTZXR0aW5ncy5leHBvcnRzKTtcbiAgICAvLyByZXR1cm4gc2V0dGluZ3NcbiAgICByZXR1cm4gZml4ZWRTZXR0aW5ncztcbn07XG4vKipcbiAqIEBuYW1lIHNhdmVTZXR0aW5nc1xuICogQGRlc2NyaXB0aW9uIHNhdmUgdGhlIHVzZXIgc2V0dGluZ3MgdG8gdGhlIFwiY2FjaGVcIlxuICogQHBhcmFtIHtVc2VyU2V0dGluZ3N9IHNldHRpbmdzXG4gKi9cbmNvbnN0IHNldFNldHRpbmdzID0gKHNldHRpbmdzKSA9PiB7XG4gICAgc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRTZXR0aW5ncyksIHNldHRpbmdzKTtcbiAgICAvLyBzdG9yZSBwdWJsaWMgc2V0dGluZ3MgdGhhdCBzaG91bGQgYmUgc2hhcmVkIGFjcm9zcyBvcmdcbiAgICBmaWdtYS5yb290LnNldFBsdWdpbkRhdGEoY29uZmlnLmtleS5zZXR0aW5ncywgc3RyaW5naWZ5SnNvbihzZXR0aW5ncykpO1xufTtcbi8qKlxuICogQG5hbWUgcmVzZXRTZXR0aW5nc1xuICogQGRlc2NyaXB0aW9uIHJlc2V0U2V0dGluZ3MgdGhlIHVzZXIgc2V0dGluZ3MgdG8gdGhlIFwiY2FjaGVcIlxuICovXG5jb25zdCByZXNldFNldHRpbmdzID0gKCkgPT4gZmlnbWEucm9vdC5zZXRQbHVnaW5EYXRhKGNvbmZpZy5rZXkuc2V0dGluZ3MsIHN0cmluZ2lmeUpzb24oZGVmYXVsdFNldHRpbmdzKSk7XG4vLyBleHBvcnRzXG5leHBvcnQgeyBnZXRTZXR0aW5ncywgc2V0U2V0dGluZ3MsIHJlc2V0U2V0dGluZ3MgfTtcbiIsImV4cG9ydCBjb25zdCBzdHJpbmdpZnlKc29uID0gKG9iamVjdCwgY29tcHJlc3Npb24gPSB0cnVlKSA9PiB7XG4gICAgaWYgKGNvbXByZXNzaW9uID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmplY3QpO1xuICAgIH1cbiAgICAvLyByZXR1cm4gdW5jb21wcmVzc2VkIGpzb25cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqZWN0LCBudWxsLCAyKTtcbn07XG4iLCIvKiBpc3RhbmJ1bCBpZ25vcmUgZmlsZSAqL1xuY29uc3QgdmVyc2lvbiA9ICc2LjExLjEnO1xuZXhwb3J0IGRlZmF1bHQgdmVyc2lvbjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBnZXRTZXR0aW5ncywgcmVzZXRTZXR0aW5ncywgc2V0U2V0dGluZ3MgfSBmcm9tICdAdXRpbHMvc2V0dGluZ3MnO1xuaW1wb3J0IHsgZ2V0QWNjZXNzVG9rZW4sIHNldEFjY2Vzc1Rva2VuIH0gZnJvbSAnQHV0aWxzL2FjY2Vzc1Rva2VuJztcbmltcG9ydCBjb25maWcgZnJvbSAnQGNvbmZpZy9jb25maWcnO1xuaW1wb3J0IHsgY29tbWFuZHMgfSBmcm9tICdAY29uZmlnL2NvbW1hbmRzJztcbmltcG9ydCBnZXRWZXJzaW9uRGlmZmVyZW5jZSBmcm9tICdAdXRpbHMvZ2V0VmVyc2lvbkRpZmZlcmVuY2UnO1xuaW1wb3J0IGdldEZpbGVJZCBmcm9tICdAdXRpbHMvZ2V0RmlsZUlkJztcbmltcG9ydCB7IGV4cG9ydFJhd1Rva2VuQXJyYXkgfSBmcm9tICdAdXRpbHMvZ2V0VG9rZW5Kc29uJztcbmltcG9ydCB7IHN0cmluZ2lmeUpzb24gfSBmcm9tICdAdXRpbHMvc3RyaW5naWZ5SnNvbic7XG4vLyBpbml0aWF0ZSBVSVxuZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7XG4gICAgdGhlbWVDb2xvcnM6IHRydWUsXG4gICAgdmlzaWJsZTogZmFsc2Vcbn0pO1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBvcGVuIFVJXG5pZiAoW2NvbW1hbmRzLmV4cG9ydCwgY29tbWFuZHMudXJsRXhwb3J0LCBjb21tYW5kcy5nZW5lcmFsU2V0dGluZ3NdLmluY2x1ZGVzKGZpZ21hLmNvbW1hbmQpKSB7XG4gICAgLy8gd3JhcCBpbiBmdW5jdGlvbiBiZWNhdXNlIG9mIGFzeW5jIGNsaWVudCBTdG9yYWdlXG4gICAgY29uc3Qgb3BlblVpID0gKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIEdldCB0aGUgdXNlciBzZXR0aW5nc1xuICAgICAgICBjb25zdCB1c2VyU2V0dGluZ3MgPSBnZXRTZXR0aW5ncygpO1xuICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnQgdmVyc2lvbiBkaWZmZXJlbmNlcyB0byB0aGUgbGFzdCB0aW1lIHRoZSBwbHVnaW4gd2FzIG9wZW5lZFxuICAgICAgICBjb25zdCB2ZXJzaW9uRGlmZmVyZW5jZSA9IHlpZWxkIGdldFZlcnNpb25EaWZmZXJlbmNlKGZpZ21hKTtcbiAgICAgICAgLy8gcmVzaXplIFVJIGlmIG5lZWRlZFxuICAgICAgICBmaWdtYS51aS5yZXNpemUoY29uZmlnLnVpW2ZpZ21hLmNvbW1hbmRdLndpZHRoLCBjb25maWcudWlbZmlnbWEuY29tbWFuZF0uaGVpZ2h0KTtcbiAgICAgICAgaWYgKHZlcnNpb25EaWZmZXJlbmNlICE9PSB1bmRlZmluZWQgJiYgdmVyc2lvbkRpZmZlcmVuY2UgIT09ICdwYXRjaCcpIHtcbiAgICAgICAgICAgIGZpZ21hLnVpLnJlc2l6ZShjb25maWcudWlbZmlnbWEuY29tbWFuZF0ud2lkdGgsIGNvbmZpZy51aVtmaWdtYS5jb21tYW5kXS5oZWlnaHQgKyA2MCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcG9zdE1lc3NhZ2VPYmplY3QgPSB7XG4gICAgICAgICAgICBjb21tYW5kOiBmaWdtYS5jb21tYW5kLFxuICAgICAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHVzZXJTZXR0aW5ncyksIHsgYWNjZXNzVG9rZW46IHlpZWxkIGdldEFjY2Vzc1Rva2VuKGdldEZpbGVJZChmaWdtYSkpIH0pLFxuICAgICAgICAgICAgICAgIGRhdGE6IG51bGwsXG4gICAgICAgICAgICAgICAgdmVyc2lvbkRpZmZlcmVuY2U6IHZlcnNpb25EaWZmZXJlbmNlLFxuICAgICAgICAgICAgICAgIG1ldGFkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGVuYW1lOiBmaWdtYS5yb290Lm5hbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChbY29tbWFuZHMuZXhwb3J0LCBjb21tYW5kcy51cmxFeHBvcnRdLmluY2x1ZGVzKGZpZ21hLmNvbW1hbmQpKSB7XG4gICAgICAgICAgICBwb3N0TWVzc2FnZU9iamVjdC5wYXlsb2FkLmRhdGEgPSBzdHJpbmdpZnlKc29uKHlpZWxkIGV4cG9ydFJhd1Rva2VuQXJyYXkoZmlnbWEsIHVzZXJTZXR0aW5ncykpO1xuICAgICAgICB9XG4gICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKE9iamVjdC5hc3NpZ24oe30sIHBvc3RNZXNzYWdlT2JqZWN0KSk7XG4gICAgICAgIC8vIHJlZ2lzdGVyIHRoZSBzZXR0aW5ncyBVSVxuICAgICAgICBmaWdtYS51aS5zaG93KCk7XG4gICAgfSk7XG4gICAgLy8gcnVuIGZ1bmN0aW9uXG4gICAgb3BlblVpKCk7XG59XG4vKipcbiAqIE9wZW4gSGVscFxuICogT3BlbiBnaXRodWIgaGVscCBwYWdlXG4gKi9cbmlmIChmaWdtYS5jb21tYW5kID09PSBjb21tYW5kcy5oZWxwKSB7XG4gICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBjb21tYW5kOiBjb21tYW5kcy5oZWxwLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICB1cmw6ICdodHRwczovL2dpdGh1Yi5jb20vbHVrYXNvcHBlcm1hbm4vZGVzaWduLXRva2VucydcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBPcGVuIGRlbW9cbiAqL1xuaWYgKGZpZ21hLmNvbW1hbmQgPT09IGNvbW1hbmRzLmRlbW8pIHtcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgIGNvbW1hbmQ6IGNvbW1hbmRzLmRlbW8sXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vd3d3LmZpZ21hLmNvbS9maWxlLzJNUTc1OVI1a0p0elFuNHFTSHVxUjcvRGVzaWduLVRva2Vucy1mb3ItRmlnbWE/bm9kZS1pZD0yMzElM0EyJ1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIFJlc2V0IHNldHRpbmdzXG4gKi9cbmlmIChmaWdtYS5jb21tYW5kID09PSBjb21tYW5kcy5yZXNldCkge1xuICAgIHJlc2V0U2V0dGluZ3MoKTtcbiAgICAvLyBzZW5kIG1lc3NhZ2VcbiAgICBmaWdtYS5ub3RpZnkoJ+Kame+4jyBTZXR0aW5ncyBoYXZlIGJlZW4gcmVzZXQuJyk7XG4gICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbn1cbi8qKlxuICogUmVhY3QgdG8gbWVzc2FnZXNcbiAqL1xuZmlnbWEudWkub25tZXNzYWdlID0gKG1lc3NhZ2UpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGNvbnN0IHsgY29tbWFuZCwgcGF5bG9hZCB9ID0gbWVzc2FnZTtcbiAgICAvKipcbiAgICAgKiBvbiBjbG9zZVBsdWdpblxuICAgICAqIGNsb3NlIHBsdWdpbiBhbmQgc2hvdyBub3RpZmljYXRpb24gaWYgYXZhaWxhYmxlXG4gICAgICovXG4gICAgaWYgKGNvbW1hbmQgPT09IGNvbW1hbmRzLmNsb3NlUGx1Z2luKSB7XG4gICAgICAgIC8vIHNob3cgbm90aWZpY2F0aW9uIGlmIHNlbmRcbiAgICAgICAgaWYgKChwYXlsb2FkID09PSBudWxsIHx8IHBheWxvYWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBheWxvYWQubm90aWZpY2F0aW9uKSAhPT0gdW5kZWZpbmVkICYmIChwYXlsb2FkID09PSBudWxsIHx8IHBheWxvYWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBheWxvYWQubm90aWZpY2F0aW9uKSAhPT0gJycpIHtcbiAgICAgICAgICAgIGZpZ21hLm5vdGlmeShwYXlsb2FkLm5vdGlmaWNhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2xvc2UgcGx1Z2luXG4gICAgICAgIGZpZ21hLnVpLmhpZGUoKTtcbiAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogb24gc2F2ZVNldHRpbmdzXG4gICAgICogc2F2ZSBzZXR0aW5ncywgYWNjZXNzIHRva2VuIGFuZCBjbG9zZSBwbHVnaW5cbiAgICAgKi9cbiAgICBpZiAoY29tbWFuZCA9PT0gY29tbWFuZHMuc2F2ZVNldHRpbmdzKSB7XG4gICAgICAgIC8vIHN0b3JlIHNldHRpbmdzXG4gICAgICAgIHNldFNldHRpbmdzKHBheWxvYWQuc2V0dGluZ3MpO1xuICAgICAgICAvLyBhY2Nlc3NUb2tlblxuICAgICAgICB5aWVsZCBzZXRBY2Nlc3NUb2tlbihnZXRGaWxlSWQoZmlnbWEpLCBwYXlsb2FkLmFjY2Vzc1Rva2VuKTtcbiAgICAgICAgLy8gY2xvc2UgcGx1Z2luXG4gICAgICAgIGlmIChwYXlsb2FkLmNsb3NlUGx1Z2luICYmIHBheWxvYWQuY2xvc2VQbHVnaW4gPT09IHRydWUpIHtcbiAgICAgICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==