'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RichEditor = exports.FileMeta = exports.List = exports.File = exports.Checkbox = exports.Textarea = exports.ColorPicker = exports.Fields = exports.Select = exports.Input = exports.Form = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Fields = require('./Fields');

var _Fields2 = _interopRequireDefault(_Fields);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _ColorPicker = require('./ColorPicker');

var _ColorPicker2 = _interopRequireDefault(_ColorPicker);

var _Textarea = require('./Textarea');

var _Textarea2 = _interopRequireDefault(_Textarea);

var _Checkbox = require('./Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _File = require('./File');

var _File2 = _interopRequireDefault(_File);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _FileMeta = require('./FileMeta');

var _FileMeta2 = _interopRequireDefault(_FileMeta);

var _RichEditor = require('./RichEditor');

var _RichEditor2 = _interopRequireDefault(_RichEditor);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global $ */


var Form = function (_React$Component) {
    _inherits(Form, _React$Component);

    function Form() {
        _classCallCheck(this, Form);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Form).call(this));

        _this.submit = _this.submit.bind(_this);
        return _this;
    }
    /*
        @TODO: Allow construction of forms with field groups from JSON, so modules
        don't have to be loaded twice
    */


    _createClass(Form, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var formOptions = {
                fields: {}
            };
            formOptions.onSuccess = function (e, fields) {
                e.preventDefault();

                var action = void 0;
                if (_this2.props.options && _this2.props.options.setup && _this2.props.options.setup.action) {
                    action = _this2.props.options.setup.action;
                } else {
                    action = _this2.props.action || '';
                }
                if (action.length < 1) {
                    return false;
                }
                _this2.submit(null, action, fields);
            };
            formOptions.onFailure = function (e) {
                e.preventDefault();
            };
            if (!this.props.options || !this.props.options.fields) {
                return $(this._form).form(formOptions);
            }
            for (var i in this.props.options.fields) {
                var current = this.props.options.fields[i];
                if (current.rules) {
                    /*
                    Ignore 'empty' (required) rule when method is PUT,
                    since editing doesn't work properly if all fields are required
                    */
                    if (this.props.options.setup.method === 'PUT') {
                        current.rules = _lodash2.default.difference(current.rules, ['empty']);
                    }
                    formOptions.fields[current.name] = current.rules;
                }
            }
            $(this._form).form(formOptions);
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(e) {
            if (this.props.onSubmit) {
                return this.props.onSubmit(e);
            }
        }
    }, {
        key: 'submit',
        value: function submit(e, action, fields) {
            var _this3 = this;

            if (this.props.onSubmit) {
                return this.props.onSubmit(e, action, fields);
            }
            var req = _superagent2.default.post(action);
            req.send(fields);
            req.end(function (err, res) {
                if (err || !res.ok) {
                    throw new Error(err);
                }
                $('.ui.modal').modal('hide'); // @TODO: decouple
                if (_this3.props.onResponse) {
                    _this3.props.onResponse(res);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var formClasses = (0, _classnames2.default)({
                ui: true,
                form: true,
                equal: this.props.equalWidth,
                width: this.props.equalWidth
            });
            // if no options or fields are given, return basic form
            if (!this.props.options || !this.props.options.fields) {
                return _react2.default.createElement(
                    'form',
                    _extends({
                        ref: function ref(form) {
                            _this4._form = form;
                        },
                        className: formClasses
                    }, this.props),
                    this.props.children
                );
            }
            var elements = [];
            // Create array of elements as per options passed from parent.

            for (var i in this.props.options.fields) {
                var element = this.props.options.fields[i];
                switch (element.type) {
                    case 'text':
                        elements.push(_react2.default.createElement(_Input2.default, _extends({ key: i }, element)));
                        break;
                    case 'password':
                        elements.push(_react2.default.createElement(_Input2.default, _extends({ key: i }, element)));
                        break;
                    case 'select':
                        elements.push(_react2.default.createElement(_Select2.default, _extends({ key: i }, element)));
                        break;
                    case 'color-picker':
                        elements.push(_react2.default.createElement(_ColorPicker2.default, _extends({ key: i }, element)));
                        break;
                    case 'textarea':
                        elements.push(_react2.default.createElement(_Textarea2.default, _extends({ key: i }, element)));
                        break;
                    case 'hidden':
                        elements.push(_react2.default.createElement('input', _extends({ key: i, type: 'hidden' }, element)));
                        break;
                }
            }
            return _react2.default.createElement(
                'form',
                {
                    ref: function ref(form) {
                        _this4._form = form;
                    },
                    action: this.props.options.setup.action,
                    className: formClasses,
                    onSubmit: this.onSubmit
                },
                _react2.default.createElement('input', {
                    type: 'hidden',
                    name: '_method',
                    value: this.props.options.setup.method
                }),
                this.props.children,
                elements
            );
        }
    }]);

    return Form;
}(_react2.default.Component);

Form.propTypes = {
    onSubmit: _react2.default.PropTypes.func
};

exports.Form = Form;
exports.Input = _Input2.default;
exports.Select = _Select2.default;
exports.Fields = _Fields2.default;
exports.ColorPicker = _ColorPicker2.default;
exports.Textarea = _Textarea2.default;
exports.Checkbox = _Checkbox2.default;
exports.File = _File2.default;
exports.List = _List2.default;
exports.FileMeta = _FileMeta2.default;
exports.RichEditor = _RichEditor2.default;
exports.default = Form;