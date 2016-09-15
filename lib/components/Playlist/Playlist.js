'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Grid = require('../Grid/Grid');

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

var _AddItem = require('./AddItem');

var _AddItem2 = _interopRequireDefault(_AddItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Playlist = function (_React$Component) {
    _inherits(Playlist, _React$Component);

    function Playlist() {
        _classCallCheck(this, Playlist);

        return _possibleConstructorReturn(this, (Playlist.__proto__ || Object.getPrototypeOf(Playlist)).call(this));
    }

    _createClass(Playlist, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'ui playlist segments' },
                _react2.default.createElement(
                    'div',
                    { className: 'ui segment' },
                    _react2.default.createElement(
                        _Grid.Grid,
                        null,
                        _react2.default.createElement(
                            'div',
                            { className: 'three column row' },
                            _react2.default.createElement(
                                'div',
                                { className: 'column' },
                                _react2.default.createElement(
                                    'h4',
                                    null,
                                    this.props.title
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'column' },
                                this.props.subtitle
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'right aligned column' },
                                _react2.default.createElement('i', { className: 'fa fa-sliders' })
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'ui content segment' },
                    _react2.default.createElement(
                        _Grid.Grid,
                        null,
                        _react2.default.createElement(
                            _Grid.Row,
                            null,
                            _react2.default.createElement(
                                _Item2.default,
                                { subtitle: 'Serie', thumb: 'http://oisa.tmsimg.com/assets/p35273_p_v8_ad.jpg?h=900&h=160' },
                                'The Big Bang Theory'
                            ),
                            _react2.default.createElement(_AddItem2.default, null)
                        )
                    )
                )
            );
        }
    }]);

    return Playlist;
}(_react2.default.Component);

exports.default = Playlist;