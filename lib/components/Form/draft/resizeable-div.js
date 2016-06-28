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

var Div = function (_Component) {
   _inherits(Div, _Component);

   function Div() {
      _classCallCheck(this, Div);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Div).apply(this, arguments));
   }

   _createClass(Div, [{
      key: 'render',
      value: function render() {
         var _props = this.props;
         var style = _props.style;
         var className = _props.className;

         var styles = {
            backgroundColor: 'rgba(98, 177, 254, 1.0)',
            width: '100%',
            height: '100%',
            textAlign: 'center',
            color: 'white',
            zIndex: 1,
            position: 'relative'
         };
         return _react2.default.createElement(
            'div',
            { style: styles, className: className, contentEditable: false },
            'Horizontal+Vertical'
         );
      }
   }]);

   return Div;
}(_react.Component);

exports.default = (0, _draftJsResizeablePlugin.ResizeableDecorator)({
   resizeSteps: 10,
   caption: true,
   vertical: 'absolute'
})((0, _draftJsDndPlugin.DraggableDecorator)((0, _draftJsFocusPlugin.FocusDecorator)((0, _draftJsAlignmentPlugin.AlignmentDecorator)((0, _draftJsToolbarPlugin.ToolbarDecorator)()(Div)))));