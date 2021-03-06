import React from 'react';
import PropTypes from 'prop-types';

import PinterestBase from './PinterestBase';
import Anchor from './PinterestAnchor';
import { GUID, COUNT_TYPES, URL } from '../util/PinConst';
import i18n from '../util/i18n';
import { fetch, bind, getResolution } from '../util/PinUtil';
import _ from 'lodash';

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
export default class PinterestPinWidget extends PinterestBase {
    constructor(props) {
        super(props);
        this.logCount(COUNT_TYPES['PIN_' + props.size.toUpperCase()]);
        this.state = { pin: null, showingMenu: false, playingGIF: false };
        bind(this, 'handleToggleMenu', 'handleToggleGIF');
    }

    /**
     * On mount, we fetch the remote Pin data for rendering
     */
    componentDidMount() {
        const url = URL.PIN + `?base_scheme=http&pin_ids=${this.props.pin}`;
        fetch(url, response => {
            if (response && response.data && response.data[0]) {
                this.setState({ pin: response.data[0] });
            } else {
                console.error('Error in fetching Pin:', response);
            }
        });
    }

    /**
     * Handle toggling visibility of the dropdown "copyright" menu
     */
    handleToggleMenu() {
        this.setState({ showingMenu: !this.state.showingMenu });
    }

    /**
     * Handle playing/pausing a GIF
     */
    handleToggleGIF(evt) {
        evt.preventDefault();
        this.setState({ playingGIF: !this.state.playingGIF });
    }

    /**
     * Get the url for the correctly sized remote image
     * @returns {string} image url
     */
    getPinImage() {
        let url = this.state.pin.images['237x'].url;
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
    getButtonImage() {
        const base = 'https://s-passets.pinimg.com/images/pidgets/';
        const resolution = getResolution();
        let url;
        if (this.props.lang === 'ja') {
            url = `pinit_bg_ja_rect_red_20_${resolution}.png`;
        } else {
            const size = this.props.size === 'small' ? 'small' : 'medium';
            url = `repin_${size}_${resolution}.png`;
        }
        return { backgroundImage: `url(${base + url})` };
    }

    /**
     * Render helper when attribution is available
     */
    renderAttribution() {
        const attr = this.state.pin.attribution;
        const shouldRender = attr && attr.url && attr.author_name && attr.provider_icon_url;
        return (
            shouldRender && (
                <span className="pin-widget-attrib">
                    <img className="pin-widget-attrib-icon" src={attr.provider_icon_url} />
                    <span className="pin-widget-attrib">
                        <a className="pin-widget-attrib-anchor" href={attr.url} target="_blank">
                            {attr.author_name}
                        </a>
                    </span>
                </span>
            )
        );
    }


    /**
     * Render helper for rich metadata with fallback to the Pin's domain
     */
    renderMeta() {
        const pin = this.state.pin;
        const image = this.getPinImage();
        // const provider = pin.rich_metadata ? pin.rich_metadata.site_name : pin.domain;
        // const metadata = pin.rich_metadata;
        return (
            <span className="pin-widget-meta">

                {/* Pin Description (if applicable) */}
                { pin.description && (
                    <p>{_.truncate(pin.description, { 'length': 60 })}</p>
                )}
                    
                {/* Save Button */}
                <Anchor
                    className="pinterest-save-button"
                    href={`https://www.pinterest.com/pin/create/button/?url=http://pinterest.olayskinadvisor.com/&media=${image}&description=${
                        pin.description
                    }`}
                    log={'embed_pin_domain' + this.logSize}
                >
                    Save
                </Anchor>
                    
            </span>
        );
    }

    /**
     * Render helper for an embedded GIF
     */
    renderGIF(pin, image) {
        const text = this.state.playingGIF ? 'II GIF' : '▶ GIF';
        const src = this.state.playingGIF ? image.replace(/(237x|345x|600x)/, 'originals') : image;
        return (
            <Anchor
                className="pin-widget-pin-link"
                href={`https://www.pinterest.com/pin/${pin.id}/`}
                log={'embed_pin_img' + this.logSize}
            >
                <img
                    className="pin-widget-pin-link-img"
                    alt={pin.description}
                    data-pin-nopin="true"
                    src={src}
                    width="100%"
                />
                <i className="pin-widget-gif" onClick={this.handleToggleGIF}>
                    {text}
                </i>
            </Anchor>
        );
    }

    /**
     * Render helper for an embedded video
     */
    renderVideo(pin, image) {
        const ratio = Math.floor(pin.images['237x'].height * 100 / pin.images['237x'].width);
        let style = { paddingBottom: ratio + '%' };
        return (
            <a className="pin-widget-pin-link" href={`//www.pinterest.com/pin/${pin.id}/repin/x/`}>
                <span className="pin-widget-link-iframe" style={style}>
                    <iframe src={pin.embed.src.replace(/autoplay=/, 'nerfAutoPlay=')} frameBorder="0" />
                </span>
            </a>
        );
    }

    /**
     * Render helper for a Pin image
     */
    renderImage(pin, image) {
        const metadata = pin.rich_metadata;

        return (
            <span>

                {
                    metadata && metadata.url ? (
                        <Anchor
                            className="pin-widget-pin-link"
                            href={metadata.url}
                            log={'embed_pin_img' + this.logSize}
                        >
                            <img
                                className="pin-widget-pin-link-img"
                                alt={pin.description}
                                data-pin-nopin="true"
                                src={image}
                                width="100%"
                            />
                        </Anchor>
                    ) : (
                        <span
                            className="pin-widget-pin-link"
                            log={'embed_pin_img' + this.logSize}
                        >
                            <img
                                className="pin-widget-pin-link-img"
                                alt={pin.description}
                                data-pin-nopin="true"
                                src={image}
                                width="100%"
                            />
                        </span>
                    )
                }

            </span>
        )

        
    }

    /**
     * Render helper for image/video/GIF type media.
     */
    renderMedia() {
        const pin = this.state.pin;
        const image = this.getPinImage();
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
    renderStats() {
        const pin = this.state.pin;
        return (
            <span className="pin-widget-stats">
                {pin.repin_count !== 0 && <span className="pin-widget-repin-count">{pin.repin_count}</span>}
                {pin.like_count !== 0 && <span className="pin-widget-like-count">{pin.like_count}</span>}
            </span>
        );
    }

    /**
     * Render helper when attribution is available
     */
    renderHeader() {
        return this.props.size === 'large' && <span className="pin-widget-header">{this.renderStats()}</span>;
    }

    /**
     * Render helper for the entire Pin once the remote fetch has finished
     */
    renderPin() {
        this.logSize = this.props.size === 'small' ? '' : `_${this.props.size}`;
        if (this.state.pin && this.state.pin.error) {
            return <span />;
        } else {
            return (
                <span className={`pinterest-widget--pin pin-widget--${this.props.size}`} style={this.props.style}>
                    {this.renderHeader()}
                    {this.renderMedia()}
                    {this.renderMeta()}
                </span>
            );
        }
    }

    /**
     * Render method.
     */
    render() {
        return this.state.pin && this.renderPin();
    }
}

PinterestPinWidget.propTypes = {
    pin: PropTypes.string.isRequired,
    lang: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
};

PinterestPinWidget.defaultProps = {
    pin: undefined,
    size: 'small',
    lang: 'en',
};
