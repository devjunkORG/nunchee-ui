'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Separator = function (_React$Component) {
    _inherits(Separator, _React$Component);

    function Separator(props) {
        _classCallCheck(this, Separator);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Separator).call(this, props));
    }

    _createClass(Separator, [{
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'div',
                {
                    style: {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        height: '100%'
                    }
                },
                _react2.default.createElement(
                    'div',
                    { style: {
                            borderBottom: '1px solid ' + this.props.color,
                            position: 'relative',
                            marginBottom: '2rem',
                            width: '100%'
                        } },
                    _react2.default.createElement(
                        'div',
                        {
                            style: {
                                position: 'absolute',
                                left: '45%',
                                width: this.props.size || 25,
                                height: this.props.size || 25,
                                border: this.props.circled ? '1px solid ' + this.props.color : 'none',
                                color: this.props.color,
                                borderRadius: '100%',
                                padding: '1rem',
                                backgroundColor: this.props.backgroundColor,
                                top: '-25px'
                            }
                        },
                        this.props.children
                    )
                )
            );
        }
    }]);

    return Separator;
}(_react2.default.Component);

Separator.propTypes = {
    children: _react2.default.PropTypes.string,
    color: _react2.default.PropTypes.string,
    backgroundColor: _react2.default.PropTypes.string
};
Separator.defaultProps = {
    children: 'SP',
    backgroundColor: '#fff',
    color: '#000'
};

exports.default = Separator;