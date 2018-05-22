'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _PinterestBase2 = require('./PinterestBase');

var _PinterestBase3 = _interopRequireDefault(_PinterestBase2);

var _PinUtil = require('../util/PinUtil');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This is the classic Pinterest "masonry" grid. It lays out all of the
 * child nodes in columns, fitting them into the shortest available
 * column for each child.
 *    *** GOTCHA ***
 * If the child component is a custom React component, it must apply its
 * <style> prop to the root node of the component.
 */
var PinterestGrid = function (_PinterestBase) {
    _inherits(PinterestGrid, _PinterestBase);

    function PinterestGrid(props) {
        _classCallCheck(this, PinterestGrid);

        var _this = _possibleConstructorReturn(this, (PinterestGrid.__proto__ || Object.getPrototypeOf(PinterestGrid)).call(this, props));

        _this.state = { styles: [] };
        return _this;
    }

    _createClass(PinterestGrid, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.children.length) {
                this.layout();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.layout();
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return this.props.children.length || this.props.children.length !== nextProps.children.length || this.state.styles.length !== nextState.styles.length;
        }

        /**
         * Build a style attribute based on passed in styles
         * and the opacity signifying readiness
         * @returns {object} style key/value map
         */

    }, {
        key: 'getStyle',
        value: function getStyle() {
            return (0, _PinUtil.extend)({
                opacity: this.state.styles.length ? 1 : 0
            }, this.props.style);
        }

        /**
         * Find which column is the shortest
         * @param {array} a list of column heights
         * @returns {number} the index of the column to use
         */

    }, {
        key: 'getShortestColumn',
        value: function getShortestColumn(columns) {
            var shortest = columns.reduce(function (smallest, columnHeight) {
                return columnHeight < smallest ? columnHeight : smallest;
            });
            return columns.indexOf(shortest);
        }

        /**
         * Look at the root node and/or its parent, and determine
         * how many columns we can fit.
         * @returns {number} the number of columns to use
         */

    }, {
        key: 'getColumnCount',
        value: function getColumnCount() {
            if (this.props.columns) {
                return this.props.columns;
            } else {
                var rootNode = _reactDom2.default.findDOMNode(this.refs.root);
                var rootWidth = rootNode.offsetWidth || rootNode.parentNode.offsetWidth;
                var childNode = _reactDom2.default.findDOMNode(this.refs['child-0']);
                var childWidth = childNode.offsetWidth;
                return Math.floor(rootWidth / (childWidth + this.props.gutter));
            }
        }

        /**
         * Wait for children to render, and then determine each element's
         * absolute positioning within the grid
         * @returns {Promise}
         */

    }, {
        key: 'layout',
        value: function layout() {
            var _this2 = this;

            this.waitForChildren().then(function () {
                var columnCount = _this2.getColumnCount();
                var gutter = _this2.props.gutter;
                var nodeWidth = _reactDom2.default.findDOMNode(_this2.refs['child-0']).offsetWidth;
                var columnHeights = Array.apply(null, Array(columnCount)).map(function (x) {
                    return 0;
                });
                var styles = _this2.props.children.map(function (child, i) {
                    var node = _reactDom2.default.findDOMNode(_this2.refs['child-' + i]);
                    var columnIndex = _this2.getShortestColumn(columnHeights);
                    var top = columnHeights[columnIndex];
                    var left = columnIndex * (nodeWidth + gutter);
                    columnHeights[columnIndex] += node.offsetHeight + gutter;
                    return {
                        position: 'absolute',
                        top: top + 'px',
                        left: left + 'px'
                    };
                });
                _this2.setState({ styles: styles });
            });
        }

        /**
         * Wait for all children to have been rendered
         * @returns {Promise}
         */

    }, {
        key: 'waitForChildren',
        value: function waitForChildren() {
            var _this3 = this;

            return new Promise(function (resolve) {
                var interval = setInterval(function () {
                    var ready = _this3.props.children.every(function (child, i) {
                        var node = _reactDom2.default.findDOMNode(_this3.refs['child-' + i]);
                        return _reactDom2.default.findDOMNode(_this3.refs['child-' + i]);
                    });
                    if (ready) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 50);
            });
        }

        /**
         * Build out the child nodes with the additional style and ref attributes
         * @returns {array} a list of ready-to-render child nodes
         */

    }, {
        key: 'getUpdatedChildren',
        value: function getUpdatedChildren() {
            var _this4 = this;

            return _react2.default.Children.map(this.props.children, function (child, i) {
                var style = child.props.style || {};
                return _react2.default.cloneElement(child, {
                    ref: 'child-' + i,
                    style: (0, _PinUtil.extend)({}, _this4.state.styles[i], child.props.style)
                });
            });
        }

        /**
         * Render the children absolutely positioned within parent
         */

    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { ref: 'root', className: 'pinterest-grid', style: this.getStyle() },
                this.getUpdatedChildren()
            );
        }
    }]);

    return PinterestGrid;
}(_PinterestBase3.default);

exports.default = PinterestGrid;


PinterestGrid.propTypes = {
    gutter: _propTypes2.default.number
};

PinterestGrid.defaultProps = {
    gutter: 0
};