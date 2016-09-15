'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactColor = require('react-color');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColorPicker = function (_React$Component) {
    _inherits(ColorPicker, _React$Component);

    function ColorPicker(props) {
        _classCallCheck(this, ColorPicker);

        var _this = _possibleConstructorReturn(this, (ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).call(this, props));

        _this.setOption = _this.setOption.bind(_this);
        _this.togglePicker = _this.togglePicker.bind(_this);
        _this.setColor = _this.setColor.bind(_this);
        _this.state = _this.initialize();
        return _this;
    }

    _createClass(ColorPicker, [{
        key: 'initialize',
        value: function initialize() {
            return {
                displayPicker: false
            };
        }
    }, {
        key: 'setOption',
        value: function setOption() {
            // set selected option on hidden input @TODO
        }
    }, {
        key: 'togglePicker',
        value: function togglePicker() {
            return this.setState({ displayPicker: !this.state.displayPicker });
        }
    }, {
        key: 'setColor',
        value: function setColor(color) {
            console.log(color);
            $('.custom').css({ backgroundColor: '' + color.hex });
            $('[name=' + this.props.name + ']').val(color.hex);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            $('body').on('click.colorPicker', function () {
                _this2.setState({ displayPicker: false });
            });
            $('body').on('click.colorPicker', '.closeOnClickOut', function (e) {
                e.stopPropagation();
            });
            $('body').on('click.colorPicker', '.custom', function (e) {
                if (_this2.state.displayPicker) {
                    e.stopPropagation();
                }
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            // turn off .colorPicker events on unmount
            $('body').off('.colorPicker');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                'div',
                { className: 'field' },
                _react2.default.createElement(
                    'label',
                    null,
                    this.props.label
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'colorpicker' },
                    _react2.default.createElement('input', { name: this.props.name, type: 'hidden' }),
                    this.props.options.map(function (v, i) {
                        return _react2.default.createElement('div', { key: i, onClick: _this3.setOption, className: 'option', style: { backgroundColor: v } });
                    }),
                    _react2.default.createElement('div', { onClick: this.togglePicker, className: 'custom' }),
                    _react2.default.createElement(
                        'div',
                        { className: (0, _classnames2.default)({ pickercontainer: true, closeOnClickOut: true, hidden: !this.state.displayPicker }) },
                        _react2.default.createElement(_reactColor.SketchPicker, { onChange: this.setColor, type: 'sketch' })
                    )
                )
            );
        }
    }]);

    return ColorPicker;
}(_react2.default.Component);

exports.default = ColorPicker;