'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addBig = require('../Buttons/addBig');

var _addBig2 = _interopRequireDefault(_addBig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Field = function (_React$Component) {
    _inherits(Field, _React$Component);

    function Field(props) {
        _classCallCheck(this, Field);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Field).call(this, props));

        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }

    _createClass(Field, [{
        key: 'handleClick',
        value: function handleClick(e) {
            e.preventDefault();
            if (this.props.onClick) {
                this.props.onClick();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var containerStyle = {
                display: 'flex'
            };
            var addButtonStyle = {
                borderRadius: '4px'
            };
            var itemStyle = {
                height: '80px',
                width: '80px',
                backgroundColor: 'rgba(0,0,0,0.8)',
                marginRight: '5px',
                borderRadius: '4px'
            };
            return _react2.default.createElement(
                'div',
                { className: 'field' },
                this.props.label ? _react2.default.createElement(
                    'label',
                    null,
                    this.props.label
                ) : '',
                _react2.default.createElement(
                    'div',
                    { style: containerStyle },
                    _react2.default.createElement(_addBig2.default, {
                        onClick: this.handleClick,
                        style: addButtonStyle
                    }),
                    _react2.default.createElement('div', { style: itemStyle })
                )
            );
        }
    }]);

    return Field;
}(_react2.default.Component);

exports.default = Field;