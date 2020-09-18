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
    define("exportTokens", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const drawSquares = (count) => {
            const nodes = [];
            for (let i = 0; i < count; i++) {
                const rect = figma.createRectangle();
                rect.x = i * 150;
                rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0.25 } }];
                figma.currentPage.appendChild(rect);
                nodes.push(rect);
            }
            figma.currentPage.selection = nodes;
            figma.viewport.scrollAndZoomIntoView(nodes);
        };
        const tokenExport = () => {
            drawSquares(5);
            console.log(figma.getLocalPaintStyles()[0]);
            console.log(figma.getStyleById(figma.getLocalPaintStyles()[0].id).name);
            console.log(figma.getLocalTextStyles());
            console.log(figma.getLocalEffectStyles());
            console.log(figma.getLocalGridStyles());
        };
        exports.default = tokenExport;
    });
    define("index", ["require", "exports", "exportTokens"], function (require, exports, exportTokens_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        // register the UI 
        // by default it is hidden
        figma.showUI(__html__, { visible: false });
        // figma.command is the menu item executed from the plugin menu
        // run different functions depending on the provided command
        //
        // EXPORT
        // exports the design tokens
        if (figma.command === 'export') {
            exportTokens_1.default();
            // always run closePlugin otherwise the plugin will keep running
            figma.closePlugin();
        }
        // SETTINGS
        // settings for the design tokens
        if (figma.command === 'settings') {
            figma.ui.show();
        }
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