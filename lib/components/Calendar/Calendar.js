'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rcCalendar = require('rc-calendar');

var _rcCalendar2 = _interopRequireDefault(_rcCalendar);

var _Picker = require('rc-calendar/lib/Picker');

var _Picker2 = _interopRequireDefault(_Picker);

var _gregorianCalendarFormat = require('gregorian-calendar-format');

var _gregorianCalendarFormat2 = _interopRequireDefault(_gregorianCalendarFormat);

var _en_US = require('rc-calendar/lib/locale/en_US');

var _en_US2 = _interopRequireDefault(_en_US);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_React$Component) {
    _inherits(Calendar, _React$Component);

    function Calendar(props) {
        _classCallCheck(this, Calendar);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Calendar).call(this, props));

        _this.getCalendarContainer = _this.getCalendarContainer.bind(_this);
        _this.openPicker = _this.openPicker.bind(_this);
        _this.closePicker = _this.closePicker.bind(_this);
        _this.state = {
            calendarOpen: false
        };
        return _this;
    }

    _createClass(Calendar, [{
        key: 'openPicker',
        value: function openPicker() {
            this.setState({ calendarOpen: true });
        }
    }, {
        key: 'closePicker',
        value: function closePicker() {
            this.setState({ calendarOpen: false });
        }
    }, {
        key: 'getCalendarContainer',
        value: function getCalendarContainer() {
            return this._calendar || document.getElementById('calendarContainer');
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var dateFormatter = new _gregorianCalendarFormat2.default('dd-MM-yyyy');
            var defaultValue = this.props.defaultValue;
            return _react2.default.createElement(
                'div',
                { className: 'field' },
                _react2.default.createElement('div', { ref: function ref(calContainer) {
                        _this2._calendar = calContainer;
                    },
                    style: {
                        display: this.state.calendarOpen ? 'block' : 'none',
                        position: 'fixed',
                        zIndex: 9999
                    },
                    noField: true }),
                this.props.label ? _react2.default.createElement(
                    'label',
                    null,
                    this.props.label
                ) : '',
                _react2.default.createElement(
                    _Picker2.default,
                    { calendar: _react2.default.createElement(_rcCalendar2.default, null),
                        getCalendarContainer: this.getCalendarContainer,
                        onOpen: this.openPicker,
                        onClose: this.closePicker,
                        label: this.props.label,
                        style: { top: '21px', cursor: 'text' } },
                    function (_ref) {
                        var value = _ref.value;

                        return _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement('input', {
                                name: _this2.props.name,
                                readOnly: true,
                                value: value && dateFormatter.format(value) || defaultValue && (0, _moment2.default)(defaultValue).format('DD-MM-YYYY'),
                                style: { cursor: 'text' }
                            })
                        );
                    }
                )
            );
        }
    }]);

    return Calendar;
}(_react2.default.Component);

Calendar.propTypes = {
    defaultValue: _react2.default.PropTypes.string
};
Calendar.defaultProps = {
    defaultValue: ''
};

exports.default = Calendar;