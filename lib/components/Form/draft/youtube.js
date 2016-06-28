'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJsFocusPlugin = require('draft-js-focus-plugin');

var _draftJsDndPlugin = require('draft-js-dnd-plugin');

var _draftJsToolbarPlugin = require('draft-js-toolbar-plugin');

var _draftJsAlignmentPlugin = require('draft-js-alignment-plugin');

var _draftJsResizeablePlugin = require('draft-js-resizeable-plugin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultVideo = 'https://www.youtube.com/embed/zalYJacOhpo';

var Div = function (_Component) {
   _inherits(Div, _Component);

   function Div() {
      _classCallCheck(this, Div);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Div).apply(this, arguments));
   }

   _createClass(Div, [{
      key: 'setUrl',
      value: function setUrl() {
         var url = window.prompt("URL", this.props.blockProps.url || defaultVideo);
         if (url) {
            var setEntityData = this.props.blockProps.setEntityData;

            setEntityData(this.props.block, { url: url });
         }
      }
   }, {
      key: 'render',
      value: function render() {
         var _this2 = this;

         var _props = this.props;
         var style = _props.style;
         var className = _props.className;
         var ratioContentStyle = _props.ratioContentStyle;
         var ratioContainerStyle = _props.ratioContainerStyle;
         var createRatioPlaceholder = _props.createRatioPlaceholder;

         var action = {
            active: false,
            button: _react2.default.createElement(
               'span',
               null,
               'URL'
            ),
            toggle: function toggle() {
               return _this2.setUrl();
            },
            label: 'URL'
         };
         var styles = {
            width: '100%',
            height: '100%',
            position: 'relative',
            zIndex: 1,
            margin: '3px'
         };
         return _react2.default.createElement(
            'div',
            { style: style, contentEditable: false, className: className },
            createRatioPlaceholder(),
            _react2.default.createElement('iframe', { width: '100%', height: '100%', style: ratioContentStyle, src: this.props.blockProps.url || defaultVideo, frameBorder: '0', allowFullScreen: true })
         );
      }
   }]);

   return Div;
}(_react.Component);

exports.default = (0, _draftJsResizeablePlugin.ResizeableDecorator)({
   resizeSteps: 10,
   ratio: 2 / 3,
   vertical: 'auto',
   handles: true,
   caption: true
})((0, _draftJsDndPlugin.DraggableDecorator)((0, _draftJsFocusPlugin.FocusDecorator)((0, _draftJsAlignmentPlugin.AlignmentDecorator)((0, _draftJsToolbarPlugin.ToolbarDecorator)()(Div)))));