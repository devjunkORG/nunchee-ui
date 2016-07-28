'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _numToWord = require('num-to-word');

var _numToWord2 = _interopRequireDefault(_numToWord);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fields = function (_React$Component) {
    _inherits(Fields, _React$Component);

    function Fields(props) {
        _classCallCheck(this, Fields);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Fields).call(this, props));
    }
    /*
      @TODO: Very Important - Rethink all components that could potentially be
     children of this (Fields) component, because right now it's creating
     .field elements that are children of other .field elements, which
     creates a lot of overhead when rendered (lots of unnecessary html
     containers)
      */


    _createClass(Fields, [{
        key: 'render',
        value: function render() {
            var moreThanOne = this.props.children && this.props.children instanceof Array && this.props.children.length > 1 ? true : false;

            var classes = {
                fields: moreThanOne,
                field: !moreThanOne
            };

            var fieldClasses = {};
            var count = void 0;

            if (this.props.children) {
                count = this.props.count || this.props.children.length || 1;
            }

            fieldClasses[(0, _numToWord2.default)(16 / count)] = true;
            fieldClasses['wide'] = true;

            fieldClasses['field'] = true;
            fieldClasses = (0, _classnames2.default)(fieldClasses);

            classes = (0, _classnames2.default)(classes);

            var children = moreThanOne ? this.props.children.map(function (child, k) {
                if (child.props.noField) {
                    return child;
                }
                return _react2.default.createElement(
                    'div',
                    { key: k, className: fieldClasses },
                    child
                );
            }) : _react2.default.createElement(
                'div',
                null,
                this.props.children
            );

            return _react2.default.createElement(
                'div',
                _extends({ className: classes }, this.props),
                children
            );
        }
    }]);

    return Fields;
}(_react2.default.Component);

Fields.defaultProps = {
    count: 1
};

exports.default = Fields;