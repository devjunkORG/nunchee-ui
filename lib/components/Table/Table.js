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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Table).call(this, props));
    }

    _createClass(Table, [{
        key: 'render',
        value: function render() {
            var classes = (0, _classnames2.default)({
                ui: true,
                table: true,
                admin: true
            });

            /*
             * objects are passed by reference, which means that in order to keep
             * the parent state data intact, we have to clone the object.
             * simply using a variable would not work, since this creates another
             * reference.
             */
            var rows = _lodash2.default.clone(this.props.rows);
            if (this.props.defaultRow && !_lodash2.default.find(rows, this.props.defaultRow)) {
                rows.splice(0, 0, this.props.defaultRow);
            }

            return _react2.default.createElement(_reactJsonTable2.default, {
                className: classes,
                rows: rows,
                columns: this.props.columns,
                settings: this.props.settings
            });
        }
    }]);

    return Table;
}(_react2.default.Component);

Table.propTypes = {
    rows: _react2.default.PropTypes.array
};
Table.defaultProps = {
    rows: []
};

exports.default = Table;