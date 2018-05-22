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

var _i18n = require('../util/i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _PinUtil = require('../util/PinUtil');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This is a Pinterest Pin widget.
 *
 * <PinterestPinWidget pin="356417757988637350" />
 *
 * @prop {string} pin - the id of the Pin to display
 * @prop {string} size - enum of { small, medium, large }: default: small
 * @prop {string} lang - language code for Pin: default: en
 * @state {Object} pin - the remote Pin data
 * @state {boolean} showingMenu - should we show the dropdown menu?
 * @state {boolean} playingGIF - should the GIF be playing?
 */
var PinterestPinWidget = function (_PinterestBase) {
    _inherits(PinterestPinWidget, _PinterestBase);

    function PinterestPinWidget(props) {
        _classCallCheck(this, PinterestPinWidget);

        var _this = _possibleConstructorReturn(this, (PinterestPinWidget.__proto__ || Object.getPrototypeOf(PinterestPinWidget)).call(this, props));

        _this.logCount(_PinConst.COUNT_TYPES['PIN_' + props.size.toUpperCase()]);
        _this.state = { pin: null, showingMenu: false, playingGIF: false };
        (0, _PinUtil.bind)(_this, 'handleToggleMenu', 'handleToggleGIF', 'handlePinit');
        return _this;
    }

    /**
     * On mount, we fetch the remote Pin data for rendering
     */


    _createClass(PinterestPinWidget, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var url = _PinConst.URL.PIN + ('?base_scheme=http&pin_ids=' + this.props.pin);
            (0, _PinUtil.fetch)(url, function (response) {
                if (response && response.data && response.data[0]) {
                    _this2.setState({ pin: response.data[0] });
                } else {
                    console.error('Error in fetching Pin:', response);
                }
            });
        }

        /**
         * Handle toggling visibility of the dropdown "copyright" menu
         */

    }, {
        key: 'handleToggleMenu',
        value: function handleToggleMenu() {
            this.setState({ showingMenu: !this.state.showingMenu });
        }

        /**
         * Handle playing/pausing a GIF
         */

    }, {
        key: 'handleToggleGIF',
        value: function handleToggleGIF(evt) {
            evt.preventDefault();
            this.setState({ playingGIF: !this.state.playingGIF });
        }

        /**
         * Handle the clicking of the Pin It button to open the
         * Pin create popup form
         */

    }, {
        key: 'handlePinit',
        value: function handlePinit(evt) {
            evt.preventDefault();
            var href = 'https://www.pinterest.com/pin/' + this.state.pin.id + '/repin/x/?guid=' + _PinConst.GUID;
            window.open(href, 'pin' + new Date().getTime(), POPUP_OPTIONS.PIN_CREATE);
            log({ type: 'embed_pin_repin' + this.logSize, href: href });
        }

        /**
         * Get the url for the correctly sized remote image
         * @returns {string} image url
         */

    }, {
        key: 'getPinImage',
        value: function getPinImage() {
            var url = this.state.pin.images['237x'].url;
            switch (this.props.size) {
                case 'large':
                    return url.replace('237x', '600x');
                case 'medium':
                    return url.replace('237x', '345x');
                default:
                    return url;
            }
        }

        /**
         * Get the url for the correct Pin It button image
         * @returns {string} image url
         */

    }, {
        key: 'getButtonImage',
        value: function getButtonImage() {
            var base = 'https://s-passets.pinimg.com/images/pidgets/';
            var resolution = (0, _PinUtil.getResolution)();
            var url = void 0;
            if (this.props.lang === 'ja') {
                url = 'pinit_bg_ja_rect_red_20_' + resolution + '.png';
            } else {
                var size = this.props.size === 'small' ? 'small' : 'medium';
                url = 'repin_' + size + '_' + resolution + '.png';
            }
            return { backgroundImage: 'url(' + (base + url) + ')' };
        }

        /**
         * Render helper when attribution is available
         */

    }, {
        key: 'renderAttribution',
        value: function renderAttribution() {
            var attr = this.state.pin.attribution;
            var shouldRender = attr && attr.url && attr.author_name && attr.provider_icon_url;
            return shouldRender && _react2.default.createElement(
                'span',
                { className: 'pin-widget-attrib' },
                _react2.default.createElement('img', { className: 'pin-widget-attrib-icon', src: attr.provider_icon_url }),
                _react2.default.createElement(
                    'span',
                    { className: 'pin-widget-attrib' },
                    _react2.default.createElement(
                        'a',
                        { className: 'pin-widget-attrib-anchor', href: attr.url, target: '_blank' },
                        attr.author_name
                    )
                )
            );
        }

        /**
         * Render helper for the description block, including optional
         * attribution and stats counts for non-large Pin widget
         */

    }, {
        key: 'renderDescription',
        value: function renderDescription() {
            var pin = this.state.pin;
            return _react2.default.createElement(
                'span',
                { className: 'pin-widget-description' },
                pin.description,
                this.renderAttribution(),
                this.props.size !== 'large' && this.renderStats()
            );
        }

        /**
         * Render helper for the menu button and the optional dropdown menu
         * for ability to report copyright infringement
         */

    }, {
        key: 'renderMenu',
        value: function renderMenu() {
            var resolution = (0, _PinUtil.getResolution)();
            var image = 'url(https://s-passets.pinimg.com/images/pidgets/menu_' + resolution + '.png)';
            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement('a', { className: 'pin-widget-menu', style: { backgroundImage: image }, onClick: this.handleToggleMenu }),
                this.state.showingMenu && _react2.default.createElement(
                    'span',
                    { className: 'pin-widget-menu-dropdown' },
                    _react2.default.createElement(
                        _PinterestAnchor2.default,
                        { href: 'https://www.pinterest.com/about/copyright/dmca-pin/', log: 'embed_pin_report' },
                        _i18n2.default.translate('Copyright issue')
                    )
                )
            );
        }

        /**
         * Render helper for rich metadata with fallback to the Pin's domain
         */

    }, {
        key: 'renderMeta',
        value: function renderMeta() {
            var pin = this.state.pin;
            var provider = pin.rich_metadata ? pin.rich_metadata.site_name : pin.domain;
            var metadata = pin.rich_metadata;
            return _react2.default.createElement(
                'span',
                { className: 'pin-widget-meta' },
                metadata && _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(
                        _PinterestAnchor2.default,
                        {
                            className: 'pin-widget-meta-anchor',
                            href: metadata.url,
                            log: 'embed_pin_domain' + this.logSize
                        },
                        _react2.default.createElement('img', {
                            src: metadata.favicon_link,
                            alt: pin.rich_metadata.site_name,
                            title: pin.rich_metadata.site_name
                        })
                    ),
                    _react2.default.createElement(
                        _PinterestAnchor2.default,
                        {
                            className: 'pin-widget-meta-anchor',
                            href: metadata.url,
                            log: 'embed_pin_domain' + this.logSize
                        },
                        _i18n2.default.translate('from <b>$1</b>', provider)
                    )
                ),
                !metadata && _react2.default.createElement(
                    _PinterestAnchor2.default,
                    {
                        className: 'pin-widget-meta-anchor',
                        href: 'https://' + pin.domain,
                        log: 'embed_pin_domain' + this.logSize
                    },
                    _i18n2.default.translate('from <b>$1</b>', provider)
                ),
                this.renderMenu()
            );
        }

        /**
         * Render helper for an embedded GIF
         */

    }, {
        key: 'renderGIF',
        value: function renderGIF(pin, image) {
            var text = this.state.playingGIF ? 'II GIF' : '▶ GIF';
            var src = this.state.playingGIF ? image.replace(/(237x|345x|600x)/, 'originals') : image;
            return _react2.default.createElement(
                _PinterestAnchor2.default,
                {
                    className: 'pin-widget-pin-link',
                    href: 'https://www.pinterest.com/pin/' + pin.id + '/',
                    log: 'embed_pin_img' + this.logSize
                },
                _react2.default.createElement('img', {
                    className: 'pin-widget-pin-link-img',
                    alt: pin.description,
                    'data-pin-nopin': 'true',
                    src: src,
                    width: '100%'
                }),
                _react2.default.createElement(
                    'i',
                    { className: 'pin-widget-gif', onClick: this.handleToggleGIF },
                    text
                )
            );
        }

        /**
         * Render helper for an embedded video
         */

    }, {
        key: 'renderVideo',
        value: function renderVideo(pin, image) {
            var ratio = Math.floor(pin.images['237x'].height * 100 / pin.images['237x'].width);
            var style = { paddingBottom: ratio + '%' };
            return _react2.default.createElement(
                'a',
                { className: 'pin-widget-pin-link', href: '//www.pinterest.com/pin/' + pin.id + '/repin/x/' },
                _react2.default.createElement(
                    'span',
                    { className: 'pin-widget-link-iframe', style: style },
                    _react2.default.createElement('iframe', { src: pin.embed.src.replace(/autoplay=/, 'nerfAutoPlay='), frameBorder: '0' })
                )
            );
        }

        /**
         * Render helper for a Pin image
         */

    }, {
        key: 'renderImage',
        value: function renderImage(pin, image) {
            return _react2.default.createElement(
                _PinterestAnchor2.default,
                {
                    className: 'pin-widget-pin-link',
                    href: 'https://www.pinterest.com/pin/' + pin.id + '/',
                    log: 'embed_pin_img' + this.logSize
                },
                _react2.default.createElement('img', {
                    className: 'pin-widget-pin-link-img',
                    alt: pin.description,
                    'data-pin-nopin': 'true',
                    src: image,
                    width: '100%'
                })
            );
        }

        /**
         * Render helper for image/video/GIF type media.
         */

    }, {
        key: 'renderMedia',
        value: function renderMedia() {
            var pin = this.state.pin;
            var image = this.getPinImage();
            if (pin.embed) {
                if (pin.embed.type === 'gif') {
                    return this.renderGIF(pin, image);
                } else {
                    return this.renderVideo(pin, image);
                }
            } else {
                return this.renderImage(pin, image);
            }
        }

        /**
         * Render helper for showing likes/repins only if the count is not zero
         */

    }, {
        key: 'renderStats',
        value: function renderStats() {
            var pin = this.state.pin;
            return _react2.default.createElement(
                'span',
                { className: 'pin-widget-stats' },
                pin.repin_count !== 0 && _react2.default.createElement(
                    'span',
                    { className: 'pin-widget-repin-count' },
                    pin.repin_count
                ),
                pin.like_count !== 0 && _react2.default.createElement(
                    'span',
                    { className: 'pin-widget-like-count' },
                    pin.like_count
                )
            );
        }

        /**
         * Render helper when attribution is available
         */

    }, {
        key: 'renderHeader',
        value: function renderHeader() {
            return this.props.size === 'large' && _react2.default.createElement(
                'span',
                { className: 'pin-widget-header' },
                this.renderStats()
            );
        }

        /**
         * Render helper for the footer
         */

    }, {
        key: 'renderFooter',
        value: function renderFooter() {
            var pin = this.state.pin;
            var isJapan = this.props.lang === 'ja';
            return _react2.default.createElement(
                'span',
                { className: 'pin-widget-footer' },
                _react2.default.createElement(
                    _PinterestAnchor2.default,
                    { href: pin.pinner.profile_url, log: 'embed_pin_pinner' + this.logSize },
                    _react2.default.createElement('img', {
                        className: 'pin-widget-avatar',
                        alt: pin.pinner.full_name,
                        title: pin.pinner.full_name,
                        src: pin.pinner.image_small_url
                    })
                ),
                _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(
                        _PinterestAnchor2.default,
                        {
                            className: 'pin-widget-footer-text',
                            href: pin.pinner.profile_url,
                            log: 'embed_pin_pinner' + this.logSize
                        },
                        _react2.default.createElement(
                            'b',
                            null,
                            pin.pinner.full_name
                        )
                    ),
                    _react2.default.createElement(
                        _PinterestAnchor2.default,
                        {
                            className: 'pin-widget-footer-text',
                            href: '//www.pinterest.com' + pin.board.url,
                            log: 'embed_pin_board' + this.logSize
                        },
                        pin.board.name
                    )
                )
            );
        }

        /**
         * Render helper for the entire Pin once the remote fetch has finished
         */

    }, {
        key: 'renderPin',
        value: function renderPin() {
            this.logSize = this.props.size === 'small' ? '' : '_' + this.props.size;
            return _react2.default.createElement(
                'span',
                { className: 'pinterest-widget--pin pin-widget--' + this.props.size, style: this.props.style },
                _react2.default.createElement('i', { className: 'pin-widget-repin', style: this.getButtonImage(), onClick: this.handlePinit }),
                this.renderHeader(),
                this.renderMedia(),
                this.renderMeta(),
                this.renderDescription(),
                this.renderFooter()
            );
        }

        /**
         * Render method.
         */

    }, {
        key: 'render',
        value: function render() {
            return this.state.pin && this.renderPin();
        }
    }]);

    return PinterestPinWidget;
}(_PinterestBase3.default);

exports.default = PinterestPinWidget;


PinterestPinWidget.propTypes = {
    pin: _propTypes2.default.string.isRequired,
    lang: _propTypes2.default.string,
    size: _propTypes2.default.oneOf(['small', 'medium', 'large'])
};

PinterestPinWidget.defaultProps = {
    pin: undefined,
    size: 'small',
    lang: 'en'
};