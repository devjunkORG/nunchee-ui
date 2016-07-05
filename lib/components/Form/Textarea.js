'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('./draft/index.js');

var _draftWysiwyg = require('draft-wysiwyg');

var _draftWysiwyg2 = _interopRequireDefault(_draftWysiwyg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//<Editor className="rich input" placeholder={ this.props.placeholder } editorState={editorState} onChange={this.onChange} suppressContentEditableWarning />

var Textarea = function (_React$Component) {
    _inherits(Textarea, _React$Component);

    function Textarea(props) {
        _classCallCheck(this, Textarea);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Textarea).call(this, props));

        _this.focusRichEditor = _this.focusRichEditor.bind(_this);
        return _this;
    }

    _createClass(Textarea, [{
        key: 'focusRichEditor',
        value: function focusRichEditor() {
            this._editor.focus();
        }
    }, {
        key: 'blockStyle',
        value: function blockStyle(contentBlock) {
            var type = contentBlock.getType();
            switch (type) {
                case 'header-1':
                    return 'h1';
                case 'header-2':
                    return 'h2';
                case 'header-3':
                    return 'h3';
                case 'header-4':
                    return 'h4';
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            if (this.props.rich) {
                return _react2.default.createElement(
                    'div',
                    { onClick: this.focusRichEditor, className: 'rich textarea field' },
                    _react2.default.createElement(
                        'label',
                        null,
                        this.props.label
                    ),
                    _react2.default.createElement(_draftWysiwyg2.default, _extends({ ref: function ref(editor) {
                            return _this2._editor = editor;
                        } }, this.props, { blockTypes: _index.Blocks }))
                );
            } else {
                return _react2.default.createElement(
                    'div',
                    { className: 'textarea field' },
                    _react2.default.createElement(
                        'label',
                        null,
                        this.props.label
                    ),
                    _react2.default.createElement('textarea', { name: 'description', defaultValue: this.props.defaultValue.original })
                );
            }
        }
    }]);

    return Textarea;
}(_react2.default.Component);

Textarea.propTypes = {
    rich: _react2.default.PropTypes.bool,
    defaultValue: _react2.default.PropTypes.object
};
Textarea.defaultProps = {
    rich: false,
    defaultValue: {
        original: ''
    }
};

exports.default = Textarea;