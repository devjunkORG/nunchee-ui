'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global $ */


var Filter = function (_React$Component) {
    _inherits(Filter, _React$Component);

    function Filter(props) {
        _classCallCheck(this, Filter);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Filter).call(this, props));

        _this.onChange = _this.onChange.bind(_this);
        _this.removeFilter = _this.removeFilter.bind(_this);
        return _this;
    }

    _createClass(Filter, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            $(this._filter).dropdown({
                onChange: this.onChange
            });
        }
    }, {
        key: 'onChange',
        value: function onChange(value) {
            if (this.props.onChange) {
                this.props.onChange(this.props.name, value);
            }
        }
    }, {
        key: 'removeFilter',
        value: function removeFilter() {
            $(this._filter).dropdown('set text', this.props.defaultText);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var removeButtonClass = (0, _classnames2.default)({
                item: true,
                disabled: this.props.set
            });
            return _react2.default.createElement(
                'section',
                {
                    ref: function ref(div) {
                        return _this2._filter = div;
                    },
                    className: 'ui floating dropdown button'
                },
                _react2.default.createElement(
                    'span',
                    { className: 'text' },
                    this.props.defaultText
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'menu' },
                    _react2.default.createElement(
                        'div',
                        { className: 'ui icon search input' },
                        _react2.default.createElement('i', { className: 'search icon' }),
                        _react2.default.createElement('input', { type: 'text', placeholder: this.props.placeholder })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: removeButtonClass, 'data-value': '-1', onClick: this.removeFilter },
                        _react2.default.createElement('i', { className: 'refresh icon' }),
                        'Remover Filtro'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'scrolling menu' },
                        this.props.filters.map(function (filter, k) {
                            return _react2.default.createElement(
                                'div',
                                { key: k, className: 'item', 'data-value': filter.value },
                                filter.text
                            );
                        })
                    )
                )
            );
        }
    }]);

    return Filter;
}(_react2.default.Component);

Filter.propTypes = {
    name: _react2.default.PropTypes.string,
    defaultText: _react2.default.PropTypes.string,
    placeholder: _react2.default.PropTypes.string,
    onChange: _react2.default.PropTypes.func,
    filters: _react2.default.PropTypes.array,
    set: _react2.default.PropTypes.bool
};
Filter.defaultProps = {
    placeholder: 'Buscar',
    defaultText: 'Filtrar'
};

exports.default = Filter;