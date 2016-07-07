'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var addBig = function (_React$Component) {
    _inherits(addBig, _React$Component);

    function addBig(props) {
        _classCallCheck(this, addBig);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(addBig).call(this, props));
    }

    _createClass(addBig, [{
        key: 'render',
        value: function render() {
            var elementStyle = {
                color: '#d6d6d6',
                display: 'flex',
                alignItems: 'center',
                position: 'relative'
            };
            var buttonStyle = {
                display: 'flex',
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
                width: '80px',
                height: '80px',
                border: '2px dashed #d6d6d6',
                marginRight: '10px'
            };
            if (this.props.style) {
                _lodash2.default.forIn(this.props.style, function (value, key) {
                    buttonStyle[key] = value;
                });
            }
            return _react2.default.createElement(
                'a',
                { href: '#', style: elementStyle, onClick: this.props.onClick },
                _react2.default.createElement(
                    'div',
                    { style: buttonStyle },
                    _react2.default.createElement('i', { className: 'fa fa-plus icon' })
                ),
                this.props.children
            );
        }
    }]);

    return addBig;
}(_react2.default.Component);

exports.default = addBig;