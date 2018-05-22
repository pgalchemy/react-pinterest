'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _PinterestBase2 = require('./PinterestBase');

var _PinterestBase3 = _interopRequireDefault(_PinterestBase2);

var _PinterestGrid = require('./PinterestGrid');

var _PinterestGrid2 = _interopRequireDefault(_PinterestGrid);

var _PinterestAnchor = require('./PinterestAnchor');

var _PinterestAnchor2 = _interopRequireDefault(_PinterestAnchor);

var _i18n = require('../util/i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _PinConst = require('../util/PinConst');

var _PinUtil = require('../util/PinUtil');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var gutter = 2;
var border = 1;
var padding = 10;
var footerHeaderHeight = 48 + 60;

/**
 * This is the base class for the profile/board widgets
 * @prop {number} width - the width of the grid widget
 * @prop {number} height - the height of the grid widget
 * @prop {number} columns - the number of columns in the grid
 */

var PinterestGridWidgetBase = function (_PinterestBase) {
    _inherits(PinterestGridWidgetBase, _PinterestBase);

    function PinterestGridWidgetBase(props) {
        _classCallCheck(this, PinterestGridWidgetBase);

        var _this = _possibleConstructorReturn(this, (PinterestGridWidgetBase.__proto__ || Object.getPrototypeOf(PinterestGridWidgetBase)).call(this, props));

        _this.state = { pins: [], user: null, board: null };
        return _this;
    }

    /**
     * Fetch the remote data for a grid widget
     */


    _createClass(PinterestGridWidgetBase, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            (0, _PinUtil.fetch)(this.data.fetchURL, function (response) {
                if (response && response.data && response.data.user) {
                    _this2.setState({
                        user: response.data.user,
                        board: response.data.board,
                        pins: response.data.pins
                    });
                } else {
                    console.error('Error in fetching Pin:', response);
                }
            });
        }

        /**
         * Get the fixed determined width of the grid elements
         * @returns {number} thumbnail width
         */

    }, {
        key: 'getThumbWidth',
        value: function getThumbWidth() {
            var _props = this.props,
                width = _props.width,
                columns = _props.columns;

            var availableWidth = width - padding * 2 - (columns - 1) * gutter;
            return Math.floor(availableWidth / columns);
        }

        /**
         * Get the fixed determined width of the grid, this is determined by the
         * thumbnail width rather than the absolute widget width because the rounded
         * thumbnail width can make the grid a few pixels too large, messing with
         * the border radius of the grid.
         * @returns {number} grid width
         */

    }, {
        key: 'getGridWidth',
        value: function getGridWidth() {
            var columns = this.props.columns;

            return this.getThumbWidth() * columns + (columns - 1) * gutter;
        }

        /**
         * Get the adjusted width/height. We have to remove the padding value
         * to keep the widget itself at <width>/<height>
         * @returns {object} style object
         */

    }, {
        key: 'getGridStyle',
        value: function getGridStyle() {
            var _props2 = this.props,
                height = _props2.height,
                columns = _props2.columns;

            return {
                width: this.getGridWidth() + 'px',
                height: height - footerHeaderHeight + 'px'
            };
        }

        /**
         * Force the widget to size while waiting for grid to load
         * @returns {object} style object
         */

    }, {
        key: 'getWidgetStyle',
        value: function getWidgetStyle() {
            return {
                width: this.props.width - padding * 2 + 'px',
                height: this.props.height - padding * 2 + 'px'
            };
        }

        /**
         * Create the list of clickable images for the grid. They should
         * each be scaled to fit the width of the grid based on number of
         * columns.
         * @returns {array} A list of JSX objects
         */

    }, {
        key: 'renderImages',
        value: function renderImages() {
            var thumbWidth = this.getThumbWidth() + 'px';
            return this.state.pins.map(function (pin, i) {
                return _react2.default.createElement(
                    _PinterestAnchor2.default,
                    { href: _PinConst.URL.PIN_CLOSEUP + pin.id, log: 'embed_board_thumb', key: 'pin-' + i },
                    _react2.default.createElement('img', { width: thumbWidth, src: pin.images['237x'].url })
                );
            });
        }

        /**
         * Render helper for the header.
         * @returns {JSX} the header JSX
         */

    }, {
        key: 'renderHeader',
        value: function renderHeader() {
            var _state$user = this.state.user,
                full_name = _state$user.full_name,
                profile_url = _state$user.profile_url,
                image_small_url = _state$user.image_small_url;

            var log = 'embed_' + this.data.type + '_hd';
            var board_name, board_url;
            if (this.state.board) {
                board_name = this.state.board.name;
                board_url = this.state.board.url;
            }
            return _react2.default.createElement(
                'div',
                { className: 'grid-widget-header' },
                _react2.default.createElement(
                    _PinterestAnchor2.default,
                    { href: profile_url, log: log },
                    _react2.default.createElement('img', { src: image_small_url.replace('_30.jpg', '_60.jpg') })
                ),
                _react2.default.createElement(
                    'span',
                    { className: 'grid-widget-header-text' },
                    _react2.default.createElement(
                        _PinterestAnchor2.default,
                        { href: profile_url, log: log },
                        full_name
                    ),
                    this.state.board && _react2.default.createElement(
                        _PinterestAnchor2.default,
                        { href: _PinConst.URL.PINTEREST + board_url, log: log },
                        board_name
                    )
                )
            );
        }

        /**
         * Render helper for the footer follow button
         * @returns {JSX} the footer JSX
         */

    }, {
        key: 'renderFooter',
        value: function renderFooter() {
            var logo = _server2.default.renderToString(_react2.default.createElement('span', { className: 'grid-widget-logo' }));
            var log = 'embed_' + this.data.type + '_ft';
            var text = _i18n2.default.translate('Follow On $1', logo);
            var width = { width: this.getGridWidth() - border };
            return _react2.default.createElement(
                _PinterestAnchor2.default,
                { className: 'grid-widget-footer', style: width, href: this.data.followURL, log: log, popup: 'follow' },
                _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: text } })
            );
        }

        /**
         * Render
         */

    }, {
        key: 'render',
        value: function render() {
            var className = 'pinterest-widget--grid pinterest-widget--' + this.data.type;
            return this.state.user && _react2.default.createElement(
                'div',
                { className: className, style: this.getWidgetStyle() },
                this.renderHeader(),
                _react2.default.createElement(
                    _PinterestGrid2.default,
                    { style: this.getGridStyle(), gutter: gutter, columns: this.props.columns },
                    this.renderImages()
                ),
                this.renderFooter()
            );
        }
    }]);

    return PinterestGridWidgetBase;
}(_PinterestBase3.default);

exports.default = PinterestGridWidgetBase;


PinterestGridWidgetBase.propTypes = {
    width: _propTypes2.default.number.isRequired,
    height: _propTypes2.default.number.isRequired,
    columns: _propTypes2.default.number.isRequired
};