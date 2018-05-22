'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PinConst = require('../util/PinConst');

var _PinUtil = require('../util/PinUtil');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import PropTypes from 'prop-types';

/**
 * An <a> tag. Is used to manage click logging and popups.
 * @prop {string} href - the anchor tag's href attribute
 * @prop {string} log - the string to log as <type>
 * @prop {string} className - the string of classes
 * @prop {object} style - the JSX style object
 * @prop {bool} popup - Show url in popup window
 */
var Anchor = function (_React$Component) {
    _inherits(Anchor, _React$Component);

    function Anchor() {
        _classCallCheck(this, Anchor);

        return _possibleConstructorReturn(this, (Anchor.__proto__ || Object.getPrototypeOf(Anchor)).apply(this, arguments));
    }

    _createClass(Anchor, [{
        key: 'handleClick',

        /**
         * Handle click logging and optional popup
         * @param {Event} React event object
         */
        value: function handleClick(evt) {
            var href = this.props.href;

            if (this.props.popup) {
                evt.preventDefault();
                var key = this.props.popup.toUpperCase();
                window.open(href, 'pin' + new Date().getTime(), _PinConst.POPUP_OPTIONS[key]);
            }
            (0, _PinUtil.log)({ type: this.props.log, href: href });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                style = _props.style,
                href = _props.href;

            return _react2.default.createElement(
                'a',
                { className: className, style: style, href: href, onClick: this.handleClick.bind(this), target: '_blank' },
                this.props.children
            );
        }
    }]);

    return Anchor;
}(_react2.default.Component);

// Anchor.propTypes = {
//     href: PropTypes.string.isRequired,
//     log: PropTypes.string.isRequired,
//     className: PropTypes.string,
//     style: PropTypes.object,
// };


exports.default = Anchor;