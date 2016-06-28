'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftWysiwyg = require('draft-wysiwyg');

var _draftWysiwyg2 = _interopRequireDefault(_draftWysiwyg);

var _index = require('./draft/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import { Draft, Data, Blocks } from 'draft-wysiwyg';

var RichEditor = function (_React$Component) {
    _inherits(RichEditor, _React$Component);

    function RichEditor(props) {
        _classCallCheck(this, RichEditor);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RichEditor).call(this, props));

        _this.state = {
            data: {}
        };
        return _this;
    }

    _createClass(RichEditor, [{
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
            return _react2.default.createElement(_draftWysiwyg2.default, _extends({}, this.props, { blockTypes: _index.Blocks }));
        }
    }]);

    return RichEditor;
}(_react2.default.Component);

exports.default = RichEditor;