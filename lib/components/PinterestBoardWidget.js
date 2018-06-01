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
 * Pinterest Board Widget
 *
 * <PinterestBoardWidget board="zackargyle/travel-ideas" />
 *
 * @prop {string} board - the board slug of the board (<username>/<board_name>)
 * @prop {number} width - the width of the board widget
 * @prop {number} height - the height of the board widget
 * @prop {number} columns - the number of columns in the grid
 */
var PinterestBoardWidget = function (_PinterestGridWidgetB) {
    _inherits(PinterestBoardWidget, _PinterestGridWidgetB);

    function PinterestBoardWidget(props) {
        _classCallCheck(this, PinterestBoardWidget);

        var _this = _possibleConstructorReturn(this, (PinterestBoardWidget.__proto__ || Object.getPrototypeOf(PinterestBoardWidget)).call(this, props));

        _this.data = {
            type: 'board',
            fetchURL: '' + _PinConst.URL.BOARD + props.board + '/pins/?base_scheme=http',
            followURL: 'https://www.pinterest.com/' + props.board + '/follow/?guid=' + _PinConst.GUID
        };
        _this.logCount(_PinConst.COUNT_TYPES.BOARD);
        return _this;
    }

    return PinterestBoardWidget;
}(_PinterestGridWidgetBase2.default);

exports.default = PinterestBoardWidget;


PinterestBoardWidget.propTypes = {
    board: _propTypes2.default.string.isRequired
};