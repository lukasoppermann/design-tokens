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
        const tokenExport = () => {
            const count = 5;
            const nodes = [];
            for (let i = 0; i < count; i++) {
                const rect = figma.createRectangle();
                rect.x = i * 150;
                rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
                figma.currentPage.appendChild(rect);
                nodes.push(rect);
            }
            figma.currentPage.selection = nodes;
            figma.viewport.scrollAndZoomIntoView(nodes);
        };
        exports.default = tokenExport;
    });
    define("index", ["require", "exports", "exportTokens"], function (require, exports, exportTokens_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        // This plugin will open a modal to prompt the user to enter a number, and
        // it will then create that many rectangles on the screen.
        figma.showUI(__html__, { visible: false });
        // This file holds the main code for the plugins. It has access to the *document*.
        // You can access browser APIs in the <script> tag inside "ui.html" which has a
        // full browser environment (see documentation).
        if (figma.command === 'export') {
            exportTokens_1.default();
            figma.closePlugin();
        }
        if (figma.command === 'settings') {
            figma.ui.show();
        }
    });
    // This shows the HTML page in "ui.html".
    // figma.showUI(__html__);
    // Calls to "parent.postMessage" from within the HTML page will trigger this
    // callback. The callback will be passed the "pluginMessage" property of the
    // posted message.
    // figma.ui.onmessage = msg => {
    //   // One way of distinguishing between different types of messages sent from
    //   // your HTML page is to use an object with a "type" property like this.
    //   if (msg.type === 'create-rectangles') {
    //     const nodes: SceneNode[] = [];
    //     for (let i = 0; i < msg.count; i++) {
    //       const rect = figma.createRectangle();
    //       rect.x = i * 150;
    //       rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
    //       figma.currentPage.appendChild(rect);
    //       nodes.push(rect);
    //     }
    //     figma.currentPage.selection = nodes;
    //     figma.viewport.scrollAndZoomIntoView(nodes);
    //   }
    //   // Make sure to close the plugin when you're done. Otherwise the plugin will
    //   // keep running, which shows the cancel button at the bottom of the screen.
    //   figma.closePlugin();
    // };
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    
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