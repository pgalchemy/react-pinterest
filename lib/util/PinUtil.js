'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.log = log;
exports.loadScript = loadScript;
exports.fetch = fetch;
exports.extend = extend;
exports.getResolution = getResolution;
exports.bind = bind;

var _PinConst = require('./PinConst');

var isBrowser = typeof window !== 'undefined';

/**
 * Utility function for creating a logging request based on parameter data
 * @param {object} data - key/value pairs of query parameters to log
 */
function log(data) {
    var uri = void 0;
    if (isBrowser) {
        uri = window.location.href;
    }
    var query = '?guid=' + _PinConst.GUID + '&via=' + encodeURIComponent(uri);
    Object.keys(data).forEach(function (key) {
        return query += '&' + key + '=' + encodeURIComponent(data[key]);
    });
    loadScript(_PinConst.URL.LOG + query, {});
}

/**
 * Utility function for loading a <script>
 * @param {string} src - the script src
 * @param {object} attributes - attributes to add to the <script>
 */
function loadScript(src) {
    var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!isBrowser) return;
    var script = document.createElement('script');
    script.src = src;
    Object.keys(attributes).forEach(function (key) {
        script[key] = attributes[key];
    });
    script.onload = function () {
        return document.body.removeChild(script);
    };
    document.body.appendChild(script);
}

/**
 * Utility function for loading a script with a jsonp callback
 * @param {string} url - the url for the <script> src
 * @param {function} callback - the callback to be called on complete
 */
function fetch(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            callback(JSON.parse(request.responseText));
        }
    };
    request.send();
}

/**
 * Utility function for extending an object with other objects
 * @param {object} base - the object to extend
 * @param {array} ...args - the objects to do the extending
 * @returns {object} <base> extended
 */
function extend(base) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    args.forEach(function (arg) {
        if (arg && (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object') {
            Object.keys(arg || {}).forEach(function (key) {
                base[key] = arg[key];
            });
        }
    });
    return base;
}

/**
 * Allow for server rendering
 * @returns {number} the screen resolution
 */
function getResolution() {
    try {
        return window.devicePixelRatio >= 2 ? 2 : 1;
    } catch (e) {
        return 1;
    }
}

/**
 * Utility function for autobinding <this> to the function
 * @param {array<string>} args - list of function names to bind
 */
function bind(context) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
    }

    args.forEach(function (fn) {
        return context[fn] = context[fn].bind(context);
    });
}