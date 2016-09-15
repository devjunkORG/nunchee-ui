'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactJsonTable = require('react-json-table');

var _reactJsonTable2 = _interopRequireDefault(_reactJsonTable);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = {
    clone: _lodash.clone,
    find: _lodash.find
};

var Table = function (_React$Component) {
    _inherits(Table, _React$Component);

    function Table(props) {
        _classCallCheck(this, Table);

        var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

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
            var rows = _.clone(this.props.rows);
            if (this.props.defaultRow && !_.find(rows, this.props.defaultRow)) {
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
                if (currentRows.length > expectedInitialRows && !_.find(currentRows, item)) {
                    item._new = true;
                }
                return item;
            });
            if (newProps.defaultRow && !_.find(rows, newProps.defaultRow)) {
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
                    onClickRow: this.props.onClickRow,
                    settings: this.props.settings
                }),
                _react2.default.createElement(
                    'div',
                    { ref: function ref(div) {
                            return _this2._bottom = div;
                        }, style: { padding: '4rem', opacity: this.state.atBottom ? 1 : 0 }, className: 'ui segment endOfTable' },
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
                            this.props.loadingText ? this.props.loadingText : _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'svg',
                                    { width: '80', height: '34', viewBox: '0 0 236 100' },
                                    _react2.default.createElement(
                                        'g',
                                        { id: 'loadinglogo' },
                                        _react2.default.createElement('path', { id: 'loadinglogo', fill: '#c0c0c0', d: 'M234.951,74.192 C234.948,74.633 234.789,75.070 234.662,75.728 C234.662,75.728 214.837,75.728 214.837,75.728 C215.039,79.221 215.193,82.666 215.457,86.102 C215.583,87.774 216.653,88.762 218.182,89.372 C222.625,91.143 225.802,90.371 229.822,86.445 C231.384,87.332 233.010,88.150 234.491,89.178 C234.779,89.378 234.767,90.609 234.448,90.999 C230.886,95.387 226.278,97.416 220.627,96.743 C219.015,96.549 217.403,96.164 215.866,95.649 C211.541,94.198 208.847,91.195 208.726,86.567 C208.482,77.071 207.972,67.532 208.569,58.076 C209.189,48.311 215.562,43.322 225.165,44.486 C229.926,45.062 232.527,48.381 233.962,52.690 C234.475,54.230 234.928,55.873 234.957,57.478 C235.067,63.047 234.983,68.620 234.951,74.192 zM227.985,55.711 C227.570,52.702 225.440,50.848 222.838,50.915 C219.612,50.997 216.773,51.578 215.993,55.225 C215.033,59.714 214.796,64.361 214.236,69.077 C214.236,69.077 229.119,69.077 229.119,69.077 C228.757,64.537 228.592,60.094 227.985,55.711 zM191.786,75.722 C191.786,75.722 181.785,75.722 181.785,75.722 C182.043,79.393 182.222,83.090 182.629,86.758 C182.716,87.523 183.507,88.410 184.215,88.865 C187.912,91.235 192.990,90.476 195.995,87.223 C196.217,86.985 196.439,86.748 196.759,86.406 C198.594,87.474 200.430,88.539 202.268,89.608 C200.100,94.372 193.469,97.600 187.413,96.722 C185.868,96.497 184.318,96.150 182.843,95.649 C178.518,94.183 175.832,91.176 175.712,86.545 C175.469,77.106 175.216,67.652 175.516,58.220 C175.666,53.370 177.498,48.840 182.205,46.239 C189.273,42.339 199.169,43.527 201.437,54.467 C202.882,61.437 202.637,68.413 201.736,75.722 C201.736,75.722 191.786,75.722 191.786,75.722 zM195.024,55.968 C194.581,52.712 192.402,50.933 189.695,50.859 C186.240,50.766 183.584,52.343 182.874,55.536 C182.178,58.645 182.007,61.874 181.698,65.059 C181.570,66.387 181.677,67.737 181.677,69.077 C181.677,69.077 196.075,69.077 196.075,69.077 C195.740,64.663 195.612,60.287 195.024,55.968 zM169.050,97.568 C166.874,97.797 164.777,98.019 162.151,98.294 C162.151,95.323 162.089,92.662 162.163,90.010 C162.321,84.439 162.628,78.872 162.724,73.304 C162.780,70.031 162.738,66.736 162.404,63.484 C162.054,60.059 159.173,57.540 155.762,57.392 C153.872,57.308 151.965,57.435 150.074,57.562 C149.110,57.625 148.409,57.963 148.474,59.273 C148.982,69.908 148.718,80.527 147.731,91.130 C147.568,92.882 147.560,94.651 147.481,96.419 C147.481,96.419 140.932,96.419 140.932,96.419 C141.384,88.530 141.876,80.827 142.244,73.118 C142.344,71.035 142.063,68.935 141.991,66.840 C141.424,50.237 141.455,33.632 141.973,17.027 C142.106,12.783 141.995,8.530 141.995,4.055 C141.995,4.055 148.949,4.055 148.949,4.055 C148.668,19.795 148.384,35.575 148.105,51.190 C151.129,51.014 153.794,50.679 156.453,50.746 C162.150,50.887 165.932,54.087 167.793,59.214 C168.859,62.156 169.366,65.453 169.394,68.594 C169.474,77.774 169.189,86.956 169.050,96.137 C169.042,96.524 169.050,96.912 169.050,97.568 zM120.673,90.478 C124.511,91.551 128.001,88.976 128.714,84.989 C128.816,84.411 128.920,83.833 129.055,83.086 C130.067,82.977 131.095,82.832 132.127,82.778 C133.165,82.725 134.211,82.769 135.259,82.769 C136.410,87.013 133.628,92.686 129.177,95.281 C120.041,100.607 107.422,94.163 107.763,82.892 C107.983,75.614 107.968,68.327 108.076,61.047 C108.120,58.236 107.875,55.363 108.371,52.629 C109.465,46.614 114.595,42.604 121.154,42.135 C124.793,41.878 128.202,42.456 131.130,44.802 C134.279,47.325 135.584,50.648 135.333,54.753 C135.333,54.753 128.783,54.753 128.783,54.753 C128.707,54.415 128.651,54.178 128.606,53.944 C127.894,49.979 125.970,48.361 122.038,48.421 C118.282,48.481 115.075,50.868 114.831,54.284 C114.584,57.734 114.946,61.226 114.865,64.693 C114.733,70.197 114.644,75.715 114.190,81.198 C113.763,86.411 116.003,89.175 120.673,90.478 zM101.587,97.691 C99.537,97.804 97.531,97.917 95.020,98.055 C95.020,94.281 94.956,90.637 95.035,86.998 C95.185,80.247 95.443,73.499 95.598,66.747 C95.654,64.320 95.529,61.889 95.508,59.461 C95.473,55.225 92.923,52.304 88.721,52.075 C86.415,51.948 84.084,52.271 82.041,52.378 C81.794,66.973 81.556,81.180 81.311,95.738 C79.619,95.813 77.519,95.907 75.252,96.009 C75.185,94.887 75.080,93.988 75.083,93.090 C75.133,84.568 75.251,76.043 75.242,67.519 C75.236,63.403 74.992,59.290 74.885,55.175 C74.855,53.938 75.092,52.674 74.922,51.463 C74.581,49.031 74.043,46.625 73.529,43.911 C75.343,43.259 77.472,42.495 79.756,41.674 C80.283,43.221 80.761,44.627 81.217,45.973 C83.851,45.775 86.445,45.360 89.021,45.433 C96.543,45.656 101.977,51.128 101.991,58.668 C102.007,67.848 101.719,77.026 101.594,86.204 C101.545,89.927 101.587,93.651 101.587,97.691 zM62.305,93.257 C59.443,94.139 56.767,95.352 53.980,95.708 C51.547,96.021 48.872,95.762 46.514,95.050 C42.622,93.876 41.033,90.450 40.656,86.743 C40.274,82.981 40.468,79.153 40.487,75.355 C40.543,65.645 40.644,55.930 40.730,46.215 C40.735,45.637 40.782,45.057 40.816,44.353 C40.816,44.353 47.301,44.353 47.301,44.353 C47.301,45.750 47.314,47.109 47.299,48.466 C47.166,60.207 47.029,71.952 46.895,83.692 C46.841,88.350 49.594,90.414 54.047,89.051 C59.785,87.297 59.808,87.297 59.831,81.324 C59.863,73.782 59.754,66.239 59.893,58.701 C59.989,53.396 60.405,48.096 60.694,42.505 C62.797,42.639 64.843,42.769 66.891,42.900 C66.891,46.304 66.949,49.619 66.878,52.931 C66.745,59.358 66.508,65.778 66.373,72.205 C66.273,76.792 66.271,81.387 66.217,85.979 C66.192,88.181 66.761,88.674 68.963,88.794 C69.474,88.822 70.281,89.530 70.372,90.035 C70.668,91.632 70.693,93.283 70.849,95.228 C67.473,95.819 64.631,95.130 62.305,93.257 zM34.681,97.779 C34.707,98.361 34.685,98.941 34.685,99.784 C32.710,99.870 30.831,100.048 28.964,99.971 C28.501,99.950 27.826,99.180 27.663,98.632 C24.898,89.279 22.110,79.936 19.515,70.537 C17.044,61.578 14.941,52.515 12.390,43.581 C10.813,38.060 8.709,32.692 6.828,27.258 C6.800,27.177 6.642,27.142 6.537,27.082 C6.537,27.082 6.537,96.370 6.537,96.370 L0.000,96.370 L0.000,5.870 C0.000,5.870 5.873,5.870 5.873,5.870 C14.822,28.044 22.179,50.567 26.591,74.002 C26.916,73.949 27.245,73.900 27.571,73.847 C27.571,73.847 27.571,-0.001 27.571,-0.001 C27.571,-0.001 34.111,-0.001 34.111,-0.001 C34.111,3.217 34.058,6.411 34.120,9.601 C34.300,18.856 34.944,28.121 34.645,37.356 C33.999,57.505 33.846,77.639 34.681,97.779 z' })
                                    )
                                ),
                                _react2.default.createElement(
                                    'h5',
                                    null,
                                    'No hay más contenido que cargar'
                                )
                            )
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