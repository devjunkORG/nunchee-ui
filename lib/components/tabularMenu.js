'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TabSegments = exports.TabSegment = exports.Tab = exports.Menu = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global $ */


var Menu = function (_React$Component) {
    _inherits(Menu, _React$Component);

    function Menu(props) {
        _classCallCheck(this, Menu);

        return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));
    }

    _createClass(Menu, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            $('.ui.menu .item').tab();
        }
    }, {
        key: 'render',
        value: function render() {
            var props = this.props;
            var children = _react2.default.Children.map(this.props.children, function (child) {
                var isActive = child.props.name === props.activeTab;
                var classes = (0, _classnames2.default)({
                    item: true,
                    active: isActive
                });
                return _react2.default.cloneElement(child, {
                    className: classes,
                    active: isActive
                });
            });
            return _react2.default.createElement(
                'div',
                { className: 'ui tabular menu' },
                children
            );
        }
    }]);

    return Menu;
}(_react2.default.Component);

var Tab = function (_React$Component2) {
    _inherits(Tab, _React$Component2);

    function Tab() {
        _classCallCheck(this, Tab);

        return _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).apply(this, arguments));
    }

    _createClass(Tab, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            $('.ui.menu .item').tab();
        }
    }, {
        key: 'render',
        value: function render() {
            var tabClass = (0, _classnames2.default)({
                item: true,
                active: this.props.active
            });
            return _react2.default.createElement(
                'div',
                { className: tabClass, 'data-tab': this.props.name },
                this.props.children
            );
        }
    }]);

    return Tab;
}(_react2.default.Component);

var TabSegment = function (_React$Component3) {
    _inherits(TabSegment, _React$Component3);

    function TabSegment() {
        _classCallCheck(this, TabSegment);

        return _possibleConstructorReturn(this, (TabSegment.__proto__ || Object.getPrototypeOf(TabSegment)).apply(this, arguments));
    }

    return TabSegment;
}(_react2.default.Component);

var TabSegments = function (_React$Component4) {
    _inherits(TabSegments, _React$Component4);

    function TabSegments() {
        _classCallCheck(this, TabSegments);

        return _possibleConstructorReturn(this, (TabSegments.__proto__ || Object.getPrototypeOf(TabSegments)).apply(this, arguments));
    }

    _createClass(TabSegments, [{
        key: 'render',
        value: function render() {
            var segmentClass = (0, _classnames2.default)({
                ui: true,
                active: this.props.active,
                tab: true,
                segments: !this.props.noContain
            });
            return _react2.default.createElement(
                'div',
                { className: segmentClass, 'data-tab': this.props.name },
                this.props.children
            );
        }
    }]);

    return TabSegments;
}(_react2.default.Component);

exports.Menu = Menu;
exports.Tab = Tab;
exports.TabSegment = TabSegment;
exports.TabSegments = TabSegments;