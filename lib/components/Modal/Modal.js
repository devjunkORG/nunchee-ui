'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global $ */


var _ = {
    isObject: _lodash.isObject,
    isString: _lodash.isString
};

var Modal = function (_React$Component) {
    _inherits(Modal, _React$Component);

    function Modal(props) {
        _classCallCheck(this, Modal);

        var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

        _this.destroyModal = _this.destroyModal.bind(_this);
        _this.modalOk = _this.modalOk.bind(_this);
        _this.modalCancel = _this.modalCancel.bind(_this);
        return _this;
    }

    _createClass(Modal, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            //this.forceUpdate();
            var options = {
                onHidden: this.destroyModal,
                allowMultiple: this.props.options.allowMultiple || true,
                closable: false
            };
            if (this.props.options) {
                for (var i in this.props.options) {
                    options[i] = this.props.options[i];
                }
            }
            if (this.props.closeParent) {
                var parent = this.props.closeParent;
                var selector = void 0;
                if (_.isObject(parent)) {
                    selector = parent._modal;
                }
                if (_.isString(parent)) {
                    selector = parent;
                }
                if (selector) {
                    $(selector).modal('hide');
                }
            }
            $(this._modal).modal(options).modal('show');
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (this.props.options && this.props.options.firstLevel) {
                $('.ui.modal').modal('hide');
            }
        }
    }, {
        key: 'modalOk',
        value: function modalOk() {
            var forms = $(this._modal).find('form');
            var hasForm = forms.length > 0;
            if (hasForm) {
                return $(forms[0]).form('validate form');
            }
            // if (_.find(this.props.options,{ closable: false })) {
            //     return false;
            // }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            // if (!this.props.open) {
            //     this.modalCancel();
            // }
        }
    }, {
        key: 'modalCancel',
        value: function modalCancel() {
            $(this._modal).modal('hide');
        }
    }, {
        key: 'destroyModal',
        value: function destroyModal() {
            var parent = this.props.closeParent;
            var selector = void 0;
            if (_.isObject(parent)) {
                selector = parent._modal;
            }
            if (_.isString(parent)) {
                selector = parent;
            }
            if (selector) {
                $(selector).modal('show');
            }
            // $(this._modal).remove();
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
                    this.props.options.title || ''
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
                        { className: 'ui blue button ok', onClick: this.modalOk },
                        this.props.options.acceptText || 'Aceptar'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'ui basic red button cancel', onClick: this.modalCancel },
                        this.props.options.cancelText || 'Cancelar'
                    )
                )
            );
        }
    }]);

    return Modal;
}(_react2.default.Component);

exports.default = Modal;