'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PinConfig = require('../util/PinConfig');

var _PinConst = require('../util/PinConst');

var _i18n = require('../util/i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _PinUtil = require('../util/PinUtil');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @prop {string} (required) type - enum of either 'any' or 'one'
 *
 */
var PinterestBase = function (_React$Component) {
    _inherits(PinterestBase, _React$Component);

    function PinterestBase(props) {
        _classCallCheck(this, PinterestBase);

        var _this = _possibleConstructorReturn(this, (PinterestBase.__proto__ || Object.getPrototypeOf(PinterestBase)).call(this, props));

        _this.debounceInitialLogging();
        _i18n2.default.lang = _this.props.lang;
        return _this;
    }

    /**
     * Wait for the page to settle before logging the widget counts
     */


    _createClass(PinterestBase, [{
        key: 'debounceInitialLogging',
        value: function debounceInitialLogging() {
            if (!PinterestBase.initialized) {
                clearTimeout(this.timeout);
                this.timeout = setTimeout(function () {
                    var _log;

                    PinterestBase.initialized = true;
                    (0, _PinUtil.log)((_log = {}, _defineProperty(_log, _PinConst.COUNT_TYPES.BUTTON, _PinConfig.Counts.BUTTON), _defineProperty(_log, _PinConst.COUNT_TYPES.FOLLOW, _PinConfig.Counts.FOLLOW), _defineProperty(_log, _PinConst.COUNT_TYPES.PIN_SMALL, _PinConfig.Counts.PIN_SMALL), _defineProperty(_log, _PinConst.COUNT_TYPES.PIN_MEDIUM, _PinConfig.Counts.PIN_MEDIUM), _defineProperty(_log, _PinConst.COUNT_TYPES.PIN_LARGE, _PinConfig.Counts.PIN_LARGE), _defineProperty(_log, _PinConst.COUNT_TYPES.PROFILE, _PinConfig.Counts.PROFILE), _defineProperty(_log, _PinConst.COUNT_TYPES.BOARD, _PinConfig.Counts.BOARD), _log));
                }, 1000);
            }
        }

        /**
         * Increases the log count for the page, only matters if called
         * before the initial logging call
         * @param {string} type - the type of widget to log
         */

    }, {
        key: 'logCount',
        value: function logCount(type) {
            _PinConfig.Counts[type]++;
        }
    }]);

    return PinterestBase;
}(_react2.default.Component);

exports.default = PinterestBase;