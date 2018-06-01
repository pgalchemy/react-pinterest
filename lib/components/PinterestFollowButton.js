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

var _PinUtil2 = _interopRequireDefault(_PinUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This is the classic Pinterest follow button, for either a user or a board.
 *
 * <PinterestFollowButton board="zackargyle/travel-ideas" />
 *
 * @prop {string} board - the board slug of the board to follow (<username>/<board_name>)
 * @prop {string} user - the username of the user to follow (<username>/<board_name>)
 */
var PinterestFollowButton = function (_PinterestBase) {
    _inherits(PinterestFollowButton, _PinterestBase);

    function PinterestFollowButton(props) {
        _classCallCheck(this, PinterestFollowButton);

        var _this = _possibleConstructorReturn(this, (PinterestFollowButton.__proto__ || Object.getPrototypeOf(PinterestFollowButton)).call(this, props));

        if (!props.board && !props.user) {
            throw 'PinterestFollowButton requires either a <board> slug or a <user> name.';
        }
        _this.logCount(_PinConst.COUNT_TYPES.FOLLOW);
        return _this;
    }

    /**
     * Render method. Deviates only in the href for either a board or user
     */


    _createClass(PinterestFollowButton, [{
        key: 'render',
        value: function render() {
            var href = void 0;
            if (this.props.board) {
                href = 'https://www.pinterest.com/' + this.props.board + '/follow/?guid=' + _PinConst.GUID;
            } else {
                href = 'https://www.pinterest.com/' + this.props.user + '/pins/follow/?guid=' + _PinConst.GUID;
            }
            return _react2.default.createElement(
                _PinterestAnchor2.default,
                { className: 'pinterest-follow-button', href: href, log: 'button_follow', popup: 'follow' },
                _react2.default.createElement('i', null),
                this.props.children
            );
        }
    }]);

    return PinterestFollowButton;
}(_PinterestBase3.default);

exports.default = PinterestFollowButton;


PinterestFollowButton.propTypes = {
    board: _propTypes2.default.string,
    user: _propTypes2.default.string
};

PinterestFollowButton.defaultProps = {
    board: undefined,
    user: undefined
};