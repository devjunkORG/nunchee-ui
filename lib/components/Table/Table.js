'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactJsonTable = require('react-json-table');

var _reactJsonTable2 = _interopRequireDefault(_reactJsonTable);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = function (_React$Component) {
    _inherits(Table, _React$Component);

    function Table(props) {
        _classCallCheck(this, Table);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Table).call(this, props));

        _this.checkPosition = _this.checkPosition.bind(_this);
        return _this;
    }

    _createClass(Table, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            /*
             * objects are passed by reference, which means that in order to keep
             * the parent state data intact, we have to clone the object.
             * simply using a variable would not work, since this creates another
             * reference.
             */
            var rows = _lodash2.default.clone(this.props.rows);
            if (this.props.defaultRow && !_lodash2.default.find(rows, this.props.defaultRow)) {
                rows.unshift(this.props.defaultRow);
            }
            this.state = {
                rows: [],
                atBottom: false
            };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.addEventListener('scroll', this.checkPosition, true);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('scroll', this.checkPosition, true);
        }
    }, {
        key: 'checkPosition',
        value: function checkPosition(e) {
            var rect = this._bottom.getBoundingClientRect();
            var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
            if (!(rect.bottom < 0 || rect.top - viewHeight >= 0) && this.props.onBottom) {
                if (!this.state.atBottom) {
                    this.setState({ atBottom: true });
                    this.props.onBottom(e);
                }
            } else {
                if (this.state.atBottom) {
                    if (this.props.onLeaveBottom) {
                        this.props.onLeaveBottom(e);
                    }
                    this.setState({ atBottom: false });
                }
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            var currentRows = this.state.rows;
            var expectedInitialRows = this.props.defaultRow ? 1 : 0;
            var rows = newProps.rows.map(function (item) {
                if (currentRows.length > expectedInitialRows && !_lodash2.default.find(currentRows, item)) {
                    item._new = true;
                }
                return item;
            });
            if (newProps.defaultRow && !_lodash2.default.find(rows, newProps.defaultRow)) {
                rows.unshift(newProps.defaultRow);
            }
            this.setState({ rows: rows });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var classes = (0, _classnames2.default)({
                ui: true,
                table: true,
                admin: true
            });

            return _react2.default.createElement(
                'section',
                null,
                _react2.default.createElement(_reactJsonTable2.default, {
                    ref: function ref(table) {
                        return _this2._table = table;
                    },
                    className: classes,
                    rows: this.state.rows,
                    columns: this.props.columns,
                    settings: this.props.settings
                }),
                _react2.default.createElement(
                    'div',
                    { ref: function ref(div) {
                            return _this2._bottom = div;
                        }, style: { padding: '4rem', opacity: this.state.atBottom ? 1 : 0 }, className: 'ui segment' },
                    _react2.default.createElement('p', null),
                    _react2.default.createElement(
                        'div',
                        { className: 'ui active inverted dimmer' },
                        this.props.loading ? _react2.default.createElement(
                            'div',
                            { className: 'ui text loader' },
                            'Cargando'
                        ) : _react2.default.createElement(
                            'div',
                            { style: { padding: '0.5rem 0' } },
                            this.props.loadingText ? this.props.loadingText : _react2.default.createElement('span', null)
                        )
                    )
                )
            );
        }
    }]);

    return Table;
}(_react2.default.Component);

Table.propTypes = {
    rows: _react2.default.PropTypes.array,
    onLeaveBottom: _react2.default.PropTypes.func,
    onBottom: _react2.default.PropTypes.func
};
Table.defaultProps = {
    rows: []
};

exports.default = Table;