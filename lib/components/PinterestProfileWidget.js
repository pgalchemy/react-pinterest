'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _PinterestGridWidgetBase = require('./PinterestGridWidgetBase');

var _PinterestGridWidgetBase2 = _interopRequireDefault(_PinterestGridWidgetBase);

var _PinConst = require('../util/PinConst');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Pinterest Profile Widget.
 *
 * <PinterestProfileWidget user="zackargyle" />
 *
 * @prop {string} user - the username of the profile
 * @prop {number} width - the width of the profile widget
 * @prop {number} height - the height of the profile widget
 * @prop {number} columns - the number of columns in the grid
 */
var PinterestProfileWidget = function (_PinterestGridWidgetB) {
    _inherits(PinterestProfileWidget, _PinterestGridWidgetB);

    function PinterestProfileWidget(props) {
        _classCallCheck(this, PinterestProfileWidget);

        var _this = _possibleConstructorReturn(this, (PinterestProfileWidget.__proto__ || Object.getPrototypeOf(PinterestProfileWidget)).call(this, props));

        _this.data = {
            type: 'user',
            fetchURL: '' + _PinConst.URL.PROFILE + props.user + '/pins/?base_scheme=http',
            followURL: 'https://www.pinterest.com/' + props.user + '/pins/follow/?guid=' + _PinConst.GUID
        };
        _this.logCount(_PinConst.COUNT_TYPES.PROFILE);
        return _this;
    }

    return PinterestProfileWidget;
}(_PinterestGridWidgetBase2.default);

exports.default = PinterestProfileWidget;


PinterestProfileWidget.propTypes = {
    user: _propTypes2.default.string.isRequired
};