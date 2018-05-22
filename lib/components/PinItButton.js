'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _PinterestBase2 = require('./PinterestBase');

var _PinterestBase3 = _interopRequireDefault(_PinterestBase2);

var _PinterestAnchor = require('./PinterestAnchor');

var _PinterestAnchor2 = _interopRequireDefault(_PinterestAnchor);

var _PinConst = require('../util/PinConst');

var _PinUtil = require('../util/PinUtil');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isBrowser = typeof window !== 'undefined';

/**
 * This is the classic Pin It button, with several optional props. The
 * default state is a small, rectangular, gray button.
 *
 * <PinItButton type="any" color="white" large={true}/>
 *
 * @prop {string} type - enum of { any, one }: default 'any'
 * @prop {string} color - enum of { red, white, grey }: default grey
 * @prop {boolean} large - is large sized button: default false
 * @prop {boolean} round - is circular button: default false

 * For type="one" you can either repin or create a new Pin
 * @prop {string} pin - the id of the Pin to repin
 * @prop {string} media - the image url of the Pin to create
 * @prop {string} url - the link back of the Pin to create
 * @prop {string} description - the description of the Pin to create
 */
var PinItButton = function (_PinterestBase) {
    _inherits(PinItButton, _PinterestBase);

    function PinItButton(props) {
        _classCallCheck(this, PinItButton);

        var _this = _possibleConstructorReturn(this, (PinItButton.__proto__ || Object.getPrototypeOf(PinItButton)).call(this, props));

        _this.logCount(_PinConst.COUNT_TYPES.BUTTON);
        return _this;
    }

    /**
     * Build the url for the button image based on the color, size, and shape
     * @returns {string} the url for the button's image
     */


    _createClass(PinItButton, [{
        key: 'getButtonImage',
        value: function getButtonImage() {
            var _props = this.props,
                color = _props.color,
                large = _props.large,
                round = _props.round;

            var shape = round ? 'round' : 'rect';
            var size = round ? large ? '32' : '16' : large ? '28' : '20';
            var _color = round ? 'red' : color;
            var resolution = (0, _PinUtil.getResolution)();
            return '//s-passets.pinimg.com/images/pidgets/pinit_bg_en_' + shape + '_' + _color + '_' + size + '_' + resolution + '.png';
        }

        /**
         * Build the classname dynamically based on requested size and shape
         * @returns {string} the classname to be applied
         */

    }, {
        key: 'getClasses',
        value: function getClasses() {
            return 'pinterest-pinit-button ' + (this.props.large ? 'pinit-button--large ' : '') + (this.props.round ? 'pinit-button--round' : '');
        }

        /**
         * Build the inline style for the icon
         * @returns {object} the inline style object for the button
         */

    }, {
        key: 'getButtonStyle',
        value: function getButtonStyle() {
            return { backgroundImage: 'url(' + this.getButtonImage() + ')' };
        }

        /**
         * Download the bookmarklet code to open the image picker for pinning any valid image
         * @param {event} evt - the corresponding click event
         */

    }, {
        key: 'pinAny',
        value: function pinAny(evt) {
            if (!isBrowser) return;
            evt.preventDefault();
            var url = _PinConst.URL.PINMARKLET + '?r=' + Math.random() * 99999999;
            (0, _PinUtil.loadScript)(url, { pinMethod: 'button' });
            (0, _PinUtil.log)({ type: 'button_pinit_bookmarklet', href: _PinConst.URL.PIN_CREATE });
        }

        /**
         * Render helper for a pin one button
         * @returns {JSX}
         */

    }, {
        key: 'renderPinOne',
        value: function renderPinOne() {
            var _props2 = this.props,
                pin = _props2.pin,
                media = _props2.media;
            var _props3 = this.props,
                url = _props3.url,
                description = _props3.description;

            var href = void 0;
            if (pin) {
                href = _PinConst.URL.REPIN.replace('<id>', pin) + ('?guid=' + _PinConst.GUID);
            } else {
                if (isBrowser) {
                    url = url || window.document.URL;
                    description = description || window.document.title;
                }

                href = _PinConst.URL.PIN_CREATE + ('?guid=' + _PinConst.GUID);
                href += '&media=' + encodeURIComponent(media);
                href += '&url=' + encodeURIComponent(url);
                href += '&description=' + encodeURIComponent(description);
            }
            return _react2.default.createElement(
                _PinterestAnchor2.default,
                { className: this.getClasses(), href: href, log: 'button_pinit', popup: 'pin_create' },
                _react2.default.createElement('i', { style: this.getButtonStyle() })
            );
        }

        /**
         * Render helper for a pin any button
         * @returns {JSX}
         */

    }, {
        key: 'renderPinAny',
        value: function renderPinAny() {
            return _react2.default.createElement(
                'a',
                { className: this.getClasses(), href: _PinConst.URL.PIN_CREATE, onClick: this.pinAny.bind(this) },
                _react2.default.createElement('i', { style: this.getButtonStyle() })
            );
        }

        /**
         * Render method. Deviates in href and click handler based on
         * the <type> of the Pin It button.
         */

    }, {
        key: 'render',
        value: function render() {
            var classes = this.getClasses();
            if (this.props.type === 'one') {
                if (this.props.pin || this.props.media) {
                    return this.renderPinOne();
                } else {
                    console.warn('PinItButton with type="one" requires <pin> or <media>');
                    return this.renderPinAny();
                }
            } else {
                return this.renderPinAny();
            }
        }
    }]);

    return PinItButton;
}(_PinterestBase3.default);

exports.default = PinItButton;


PinItButton.propTypes = {
    type: _propTypes2.default.oneOf(['any', 'one']),
    color: _propTypes2.default.oneOf(['red', 'white', 'gray']),
    large: _propTypes2.default.bool,
    round: _propTypes2.default.bool,
    pin: _propTypes2.default.string,
    media: _propTypes2.default.string,
    url: _propTypes2.default.string,
    description: _propTypes2.default.string
};

PinItButton.defaultProps = {
    type: 'any',
    color: 'gray',
    large: false,
    round: false,
    pin: null,
    media: null,
    url: '',
    description: ''
};