'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Row = exports.Column = exports.Grid = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _numToWord = require('num-to-word');

var _numToWord2 = _interopRequireDefault(_numToWord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Grid = function (_React$Component) {
    _inherits(Grid, _React$Component);

    function Grid() {
        _classCallCheck(this, Grid);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Grid).call(this));
    }

    _createClass(Grid, [{
        key: 'render',
        value: function render() {
            var classes = (0, _classnames2.default)({
                ui: true,
                centered: this.props.centered || false,
                right: this.props.right || false,
                left: this.props.left || false,
                aligned: this.props.aligned || false,
                floated: this.props.floated || false,
                grid: true
            });
            return _react2.default.createElement(
                'div',
                { className: classes },
                this.props.children
            );
        }
    }]);

    return Grid;
}(_react2.default.Component);

var Column = function (_React$Component2) {
    _inherits(Column, _React$Component2);

    function Column() {
        _classCallCheck(this, Column);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Column).call(this));
    }

    _createClass(Column, [{
        key: 'render',
        value: function render() {
            var classes = {
                ui: true,
                right: this.props.right || false,
                floated: this.props.floated || false,
                aligned: this.props.aligned || false,
                column: true
            };
            if (this.props.width) {
                var word = (0, _numToWord2.default)(this.props.width);
                classes[word] = true;
                classes['wide'] = true;
            }
            classes = (0, _classnames2.default)(classes);
            return _react2.default.createElement(
                'div',
                { className: classes },
                this.props.children
            );
        }
    }]);

    return Column;
}(_react2.default.Component);

var Row = function (_React$Component3) {
    _inherits(Row, _React$Component3);

    function Row() {
        _classCallCheck(this, Row);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Row).call(this));
    }

    _createClass(Row, [{
        key: 'render',
        value: function render() {
            var classes = {
                ui: true,
                row: true
            };
            if (this.props.columns) {
                var word = (0, _numToWord2.default)(this.props.columns);
                classes[word] = true;
                classes['column'] = true;
            }
            classes = (0, _classnames2.default)(classes);
            return _react2.default.createElement(
                'div',
                { className: classes },
                this.props.children
            );
        }
    }]);

    return Row;
}(_react2.default.Component);

exports.Grid = Grid;
exports.Column = Column;
exports.Row = Row;