'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _nuncheeLanguage = require('nunchee-language');

var _nuncheeLanguage2 = _interopRequireDefault(_nuncheeLanguage);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global $ */


(0, _nuncheeLanguage2.default)('es');

var Select = function (_React$Component) {
    _inherits(Select, _React$Component);

    function Select(props) {
        _classCallCheck(this, Select);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Select).call(this, props));

        _this.getDefault = _this.getDefault.bind(_this);
        _this.createSelect = _this.createSelect.bind(_this);
        return _this;
    }

    _createClass(Select, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.createSelect(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            if (!_lodash2.default.isEqual(props, this.props)) {
                this.createSelect(props);
            }
        }
    }, {
        key: 'createSelect',
        value: function createSelect(props) {
            var options = {};
            if (props.onChange && props.onChange instanceof Function) {
                options.onChange = props.onChange;
            }
            if (props.allowAdditions) {
                options.allowAdditions = props.allowAdditions;
            }
            $(this._select).dropdown(options);
        }
    }, {
        key: 'getDefault',
        value: function getDefault() {
            if (this.props.defaultValue && this.props.options && this.props.options instanceof Array) {

                var withId = _lodash2.default.find(this.props.options, { _id: this.props.defaultValue });
                var withValue = _lodash2.default.find(this.props.options, { value: this.props.defaultValue });

                if (withId && withId.name) {
                    return withId.name.original;
                }
                if (withValue && withValue.name) {
                    return withValue.name.original;
                }
            }
            return false;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var classes = (0, _classnames2.default)({
                ui: true,
                search: this.props.search,
                multiple: this.props.multiple,
                selection: true,
                dropdown: true
            });
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
                    { ref: function ref(select) {
                            return _this2._select = select;
                        }, className: classes },
                    _react2.default.createElement('input', { ref: function ref(input) {
                            return _this2._selectInput = input;
                        }, type: 'hidden', name: this.props.name, value: this.props.defaultValue }),
                    _react2.default.createElement('i', { className: 'dropdown icon' }),
                    _react2.default.createElement(
                        'div',
                        { className: 'default text' },
                        this.getDefault() || this.props.placeholder
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'menu' },
                        this.props.options && this.props.options instanceof Array ? this.props.options.map(function (v, i) {
                            if (!_lodash2.default.isArray(v) && !_lodash2.default.isObject(v)) {
                                return _react2.default.createElement(
                                    'div',
                                    { key: i,
                                        className: 'item',
                                        'data-value': v
                                    },
                                    v
                                );
                            }
                            return _react2.default.createElement(
                                'div',
                                { key: i, className: 'item', 'data-value': v._id || v.value },
                                (0, _nuncheeLanguage2.default)()._(v.name)
                            );
                        }) : ''
                    )
                )
            );
        }
    }]);

    return Select;
}(_react2.default.Component);

Select.propTypes = {
    name: _react2.default.PropTypes.string,
    defaultvalue: _react2.default.PropTypes.string,
    placeholder: _react2.default.PropTypes.string,
    options: _react2.default.PropTypes.array,
    label: _react2.default.PropTypes.string,
    search: _react2.default.PropTypes.bool,
    multiple: _react2.default.PropTypes.bool,
    onChanges: _react2.default.PropTypes.func,
    allowAdditions: _react2.default.PropTypes.bool
};
Select.defeaultProps = {
    search: false,
    multiple: false,
    allowAdditions: false
};

exports.default = Select;