'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _testUtils = require('react-dom/test-utils');

var _testUtils2 = _interopRequireDefault(_testUtils);

var _shallow = require('react-test-renderer/shallow');

var _shallow2 = _interopRequireDefault(_shallow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('../PinterestAnchor');

var shallowRenderer = new _shallow2.default();

// Require the component to test
var PinterestAnchor = require('../PinterestAnchor').default;

describe('PinterestAnchor', function () {
    var validAnchor = _react2.default.createElement(
        PinterestAnchor,
        {
            href: 'https://pinterest.com/adamburmister',
            log: 'test_log',
            className: 'test-anchor',
            style: { fontWeight: 'bold' }
        },
        'Follow Adam Burmister'
    );
    var shallowRender = void 0;
    var anchor = void 0;

    beforeEach(function () {
        anchor = _testUtils2.default.renderIntoDocument(validAnchor);
        shallowRenderer.render(validAnchor);
        shallowRender = shallowRenderer.getRenderOutput();
    });

    it('should render an anchor with child text', function () {
        expect(shallowRender.type).toBe('a');
        expect(shallowRender.props.children).toEqual('Follow Adam Burmister');
    });

    xit('should trigger the click handler when clicked', function () {
        shallowRender.props.onClick = jest.genMockFunction;
        _testUtils2.default.Simulate.click(shallowRender);
        expect(shallowRender.props.onClick).toBeCalled();
    });
});