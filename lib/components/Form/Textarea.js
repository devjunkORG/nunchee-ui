'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

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

        _this.state = { editorState: _draftJs.EditorState.createEmpty() };
        _this.onChange = function (editorState) {
            return _this.setState({ editorState: editorState });
        };
        return _this;
    }

    _createClass(Textarea, [{
        key: 'render',
        value: function render() {
            var editorState = this.state.editorState;

            if (this.props.rich) {
                return _react2.default.createElement(
                    'div',
                    { className: 'rich textarea field' },
                    _react2.default.createElement(
                        'label',
                        null,
                        this.props.label
                    ),
                    _react2.default.createElement(_draftJs.Editor, { defaultValue: this.props.defaultValue, editorState: editorState, onChange: this.onChange })
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