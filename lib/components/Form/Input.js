'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Input = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global $ */
/**
 * Input Component
 * Takes the following options:
 *
 * {
     type: 'type of input field',
     placeholder: 'Placeholdere text',
     label: 'Field label',
     defaultvalue: 'Default value'
    },
 */


var Input = function (_React$Component) {
    _inherits(Input, _React$Component);

    function Input(props) {
        _classCallCheck(this, Input);

        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

        _this.handleChange = _this.handleChange.bind(_this);
        _this._wordCountClass = (0, _classnames2.default)({
            wordCount: true,
            max: false
        });
        _this.state = {
            value: '',
            count: 0
        };
        return _this;
    }

    _createClass(Input, [{
        key: 'handleChange',
        value: function handleChange(e) {
            if (this.props.onChange) {
                this.props.onChange(e);
            }
            this._wordCountClass = (0, _classnames2.default)({
                wordCount: true,
                max: e.target.value.length >= this.props.maxLength
            });
            this.setState({ count: e.target.value.length });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var label = _props.label;
            var labeled = _props.labeled;
            var left = _props.left;
            var icon = _props.icon;
            var maxLength = _props.maxLength;
            var required = _props.required;

            var rest = _objectWithoutProperties(_props, ['label', 'labeled', 'left', 'icon', 'maxLength', 'required']);

            var fieldClasses = (0, _classnames2.default)({
                ui: labeled,
                labeled: labeled,
                fluid: labeled,
                input: labeled,
                field: !labeled,
                left: left ? true : false,
                icon: icon ? true : false
            });
            var inputClasses = (0, _classnames2.default)({
                ui: true,
                input: true,
                corner: required,
                labeled: labeled || required
            });
            var labelClasses = (0, _classnames2.default)({
                ui: labeled,
                label: label
            });
            /*let inputClasses = classNames({
                fluid: this.props.fluid
            });*/
            return _react2.default.createElement(
                'div',
                { className: 'field' },
                _react2.default.createElement(
                    'div',
                    { className: fieldClasses },
                    _react2.default.createElement(
                        'label',
                        { className: labelClasses },
                        label
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: inputClasses },
                        _react2.default.createElement('input', _extends({
                            ref: name
                        }, rest, {
                            onChange: this.handleChange
                        })),
                        this.props.icon ? _react2.default.createElement('i', { className: icon + ' icon' }) : '',
                        this.props.required ? _react2.default.createElement(
                            'div',
                            { className: 'ui red corner label' },
                            _react2.default.createElement('i', { className: 'asterisk white icon' })
                        ) : ''
                    ),
                    maxLength ? _react2.default.createElement(
                        'p',
                        {
                            ref: function ref(wordCount) {
                                _this2._wordCount = wordCount;
                            },
                            className: this._wordCountClass },
                        this.state.count,
                        '/',
                        this.props.maxLength
                    ) : ''
                )
            );
        }
    }]);

    return Input;
}(_react2.default.Component);

Input.propTypes = {
    type: _react2.default.PropTypes.string
};
Input.defaultProps = {
    type: 'text'
};

exports.Input = Input;
exports.default = Input;