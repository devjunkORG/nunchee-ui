'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addBig = require('../Buttons/addBig');

var _addBig2 = _interopRequireDefault(_addBig);

var _sha = require('sha1');

var _sha2 = _interopRequireDefault(_sha);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = {
    isArray: _lodash.isArray,
    isString: _lodash.isString,
    isObject: _lodash.isObject,
    isEmpty: _lodash.isEmpty,
    find: _lodash.find,
    without: _lodash.without
};

var File = function (_React$Component) {
    _inherits(File, _React$Component);

    function File(props) {
        _classCallCheck(this, File);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(File).call(this, props));

        _this.handleClick = _this.handleClick.bind(_this);
        _this.processUpload = _this.processUpload.bind(_this);
        _this.addFile = _this.addFile.bind(_this);
        _this.editFile = _this.editFile.bind(_this);
        _this.removeFile = _this.removeFile.bind(_this);
        _this.removeDefault = _this.removeDefault.bind(_this);
        return _this;
    }

    _createClass(File, [{
        key: 'initialize',
        value: function initialize() {
            var defaultValue = [];
            if (this.props.defaultValue && _.isArray(this.props.defaultValue)) {
                defaultValue = this.props.defaultValue;
            }
            if (this.props.defaultValue && (_.isString(this.props.defaultValue) || _.isObject(this.props.defaultValue))) {
                defaultValue = [this.props.defaultValue];
            }
            return {
                files: [],
                defaultValue: defaultValue
            };
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.state = this.initialize();
        }
    }, {
        key: 'handleClick',
        value: function handleClick(e) {
            e.preventDefault();
            if (this.props.onClick) {
                return this.props.onClick();
            }
        }
    }, {
        key: 'removeFile',
        value: function removeFile(item, e) {
            e.preventDefault();
            this._fileInput.value = null;
            var files = this.state.files;
            files = _.without(files, _.find(files, item));
            this.setState({ files: files });
        }
    }, {
        key: 'removeDefault',
        value: function removeDefault(item, e) {
            e.preventDefault();
            var files = _.clone(this.state.defaulValue);
            this.setState({ defaultValue: _.without(files, item) });
        }
    }, {
        key: 'editFile',
        value: function editFile(item, e) {
            e.preventDefault();
            if (this.props.onEdit) {
                return this.props.onEdit(item, e);
            }
        }
    }, {
        key: 'processUpload',
        value: function processUpload(e) {
            if (e.target.files && e.target.files.length > 0) {
                this.addFile(e.target.files[0]);
            }
        }
    }, {
        key: 'addFile',
        value: function addFile(file, noTrigger) {
            var _this2 = this;

            var reader = new FileReader();
            var createFile = function createFile(event, file) {
                var files = _this2.state.files;
                var data = {
                    id: (0, _sha2.default)('' + file.name + file.size + event.target.result),
                    name: file.name,
                    size: file.size,
                    url: event.target.result
                };
                if (_this2.props.multiple) {
                    files.push(data);
                    if (_this2.props.onChange) {
                        _this2.props.onChange(files);
                    }
                    return _this2.setState({ files: files });
                }
                if (_this2.props.onChange && noTrigger !== true) {
                    _this2.props.onChange(data);
                }
                return _this2.setState({ files: [data] });
            };
            reader.onload = function (file) {
                return function (e) {
                    createFile(e, file);
                };
            }(file);
            reader.readAsDataURL(file);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.props.onUpdate && this.state.files.length > 0) {
                this.props.onUpdate(this.state.files);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var containerStyle = {
                display: 'flex',
                position: 'relative'
            };
            var addButtonStyle = {
                borderRadius: '4px'
            };

            var fileInputStyle = {
                position: 'absolute',
                opacity: 0,
                top: 0,
                left: 0,
                bottom: 0,
                height: 80,
                width: 80,
                cursor: 'pointer',
                zIndex: 9999
            };
            var defaultFiles = this.state.defaultValue.map(function (file, key) {
                var itemStyle = {
                    height: '80px',
                    width: '80px',
                    marginRight: '5px',
                    borderRadius: '4px',
                    backgroundSize: 'cover',
                    backgroundImage: _.isObject(file) ? 'url(' + file.url + ')' : 'url(' + file + ')'
                };
                return _react2.default.createElement(
                    'div',
                    { key: key, className: 'item file upload', style: itemStyle },
                    _.isObject(file) ? _react2.default.createElement('input', { type: 'hidden', value: file._id, name: '' + _this3.props.name }) : '',
                    _react2.default.createElement(
                        'div',
                        { className: 'file settings' },
                        _react2.default.createElement(
                            'button',
                            { className: 'close button', onClick: _this3.removeDefault.bind(_this3, file) },
                            _react2.default.createElement('i', { className: 'close icon' })
                        )
                    )
                );
            });
            var file = this.state.files.length > 0 ? this.state.files[0] : '';
            return _react2.default.createElement(
                'div',
                { className: 'field' },
                this.props.label ? _react2.default.createElement(
                    'label',
                    null,
                    this.props.label
                ) : '',
                _react2.default.createElement(
                    'div',
                    { style: containerStyle },
                    _react2.default.createElement(_addBig2.default, {
                        ref: function ref(button) {
                            return _this3._addButton = button;
                        },
                        onClick: this.handleClick,
                        style: addButtonStyle
                    }),
                    _react2.default.createElement('input', {
                        ref: function ref(input) {
                            return _this3._fileInput = input;
                        },
                        type: 'file',
                        name: 'tempFile',
                        style: fileInputStyle,
                        onChange: this.processUpload
                    }),
                    defaultFiles,
                    this.props.multiple ? '' : !_.isEmpty(file) ? _react2.default.createElement('input', { type: 'hidden', name: '' + this.props.name, value: file.url || '' }) : '',
                    this.state.files.map(function (item, key) {
                        var itemStyle = {
                            height: '80px',
                            width: '80px',
                            marginRight: '5px',
                            borderRadius: '4px',
                            backgroundSize: 'cover',
                            backgroundImage: item.url ? 'url(' + item.url + ')' : ''
                        };
                        return _react2.default.createElement(
                            'div',
                            { key: key, className: 'item file upload', style: itemStyle },
                            _this3.props.multiple ? _react2.default.createElement('input', { type: 'hidden', readOnly: true, name: _this3.props.name + '[]', value: item.url }) : '',
                            _react2.default.createElement(
                                'div',
                                { className: 'file settings' },
                                _react2.default.createElement(
                                    'button',
                                    { className: 'close button', onClick: _this3.removeFile.bind(_this3, item) },
                                    _react2.default.createElement('i', { className: 'close icon' })
                                ),
                                _react2.default.createElement(
                                    'button',
                                    { className: 'edit button', onClick: _this3.editFile.bind(_this3, item) },
                                    _react2.default.createElement('i', { className: 'icon-write icon' })
                                )
                            )
                        );
                    })
                )
            );
        }
    }]);

    return File;
}(_react2.default.Component);

File.defaultProps = {
    defaultValue: []
};

exports.default = File;