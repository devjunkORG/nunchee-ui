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


var Confirm = function (_React$Component) {
    _inherits(Confirm, _React$Component);

    function Confirm(props) {
        _classCallCheck(this, Confirm);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Confirm).call(this, props));

        _this.modalOk = _this.modalOk.bind(_this);
        _this.modalCancel = _this.modalCancel.bind(_this);
        return _this;
    }

    _createClass(Confirm, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            //this.forceUpdate();
            var options = {
                onApprove: this.props.onConfirm ? this.props.onConfirm : function () {
                    return true;
                },
                onDeny: function onDeny() {
                    return false;
                },
                allowMultiple: true
            };
            $(this._modal).modal(options).modal('show');
        }
    }, {
        key: 'modalOk',
        value: function modalOk() {
            if (this.props.onConfirm) {
                this.props.onConfirm();
            }
        }
    }, {
        key: 'modalCancel',
        value: function modalCancel() {
            $(this._modal).modal('hide');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var classes = (0, _classnames2.default)({
                ui: true,
                modal: true,
                test: this.props.test || false
            });
            return _react2.default.createElement(
                'div',
                { ref: function ref(modal) {
                        _this2._modal = modal;
                    }, className: classes },
                _react2.default.createElement('i', { className: 'close icon' }),
                _react2.default.createElement(
                    'div',
                    { className: 'header' },
                    'Confirmar'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'content' },
                    this.props.children
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'actions' },
                    _react2.default.createElement(
                        'div',
                        { className: 'ui blue button ok' },
                        'Aceptar'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'ui basic red button cancel' },
                        'Cancelar'
                    )
                )
            );
        }
    }]);

    return Confirm;
}(_react2.default.Component);

exports.default = Confirm;