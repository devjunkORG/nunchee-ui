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

var List = function (_React$Component) {
    _inherits(List, _React$Component);

    function List(props) {
        _classCallCheck(this, List);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(List).call(this, props));

        _this.handleFocus = _this.handleFocus.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleKeyPress = _this.handleKeyPress.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.isActive = _this.isActive.bind(_this);
        _this.delimiters = _this.props.delimiters || [',', ' '];
        _this.unique = _this.props.unique ? _this.props.unique : true;
        _this.max = _this.props.max || 0;
        _this.state = _this.initialize();
        return _this;
    }

    _createClass(List, [{
        key: 'initialize',
        value: function initialize() {
            return {
                active: false,
                elements: []
            };
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus() {
            this._input.focus();
            this.setState({ active: true });
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur() {
            this.setState({ active: false });
        }
    }, {
        key: 'handleClick',
        value: function handleClick() {
            this._input.focus();
        }
    }, {
        key: 'isActive',
        value: function isActive() {
            return this.state.active ? ' active' : false;
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            var val = e.target.value;
            var chr = val[val.length - 1];
            if (this.delimiters.indexOf(chr) > -1 && val.trim().length >= 1 && val !== ' ') {
                this.addTag(e.target.value.replace(',', ''));
                e.target.value = '';
            }
        }
    }, {
        key: 'handleKeyPress',
        value: function handleKeyPress(e) {
            if (e.which === 8 && e.target.value.length === 0) {
                var elements = this.state.elements;
                this.setState({ elements: _lodash2.default.take(this.state.elements, this.state.elements.length - 1) });
            }
        }
    }, {
        key: 'addTag',
        value: function addTag(val) {
            var elements = this.state.elements;
            if (elements.indexOf(val.trim()) > -1 && this.unique) {
                return false;
            }
            if (this.max > 0 && elements.length >= this.max) {
                return false;
            }
            elements.push(val.trim());
            return this.setState({ elements: elements });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var inputStyles = {
                background: 'none',
                border: 'none',
                width: 'auto'
            };
            var listStyle = {
                display: 'flex',
                cursor: 'text'
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
                    {
                        ref: function ref(list) {
                            return _this2._list = list;
                        },
                        className: 'styled list ' + this.isActive(),
                        style: listStyle,
                        onClick: this.handleClick
                    },
                    _react2.default.createElement('input', { type: 'hidden', name: this.props.name, value: this.state.elements.join(',') }),
                    _react2.default.createElement(
                        'div',
                        { className: 'elements' },
                        this.state.elements.map(function (element, k) {
                            return _react2.default.createElement(
                                'div',
                                { key: k, className: 'ui label transition visible' },
                                element
                            );
                        }),
                        _react2.default.createElement('input', {
                            ref: function ref(input) {
                                return _this2._input = input;
                            },
                            onKeyDown: this.handleKeyPress,
                            onFocus: this.handleFocus,
                            onBlur: this.handleBlur,
                            onChange: this.handleChange,
                            style: inputStyles,
                            name: this.props.name,
                            type: 'text',
                            placeholder: this.props.placeholder
                        })
                    )
                )
            );
        }
    }]);

    return List;
}(_react2.default.Component);

exports.default = List;