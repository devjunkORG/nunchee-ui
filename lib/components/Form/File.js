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

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var File = function (_React$Component) {
    _inherits(File, _React$Component);

    function File(props) {
        _classCallCheck(this, File);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(File).call(this, props));

        _this.handleClick = _this.handleClick.bind(_this);
        _this.processUpload = _this.processUpload.bind(_this);
        _this.addFile = _this.addFile.bind(_this);
        return _this;
    }

    _createClass(File, [{
        key: 'initialize',
        value: function initialize() {
            return {
                files: []
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
            // this._fileInput.click();
        }
    }, {
        key: 'removeFile',
        value: function removeFile(item, e) {
            e.preventDefault();
            var files = this.state.files;
            files = _lodash2.default.without(files, _lodash2.default.find(files, item));
            this.setState({ files: files });
        }
    }, {
        key: 'processUpload',
        value: function processUpload(e) {
            if (e.target.files && e.target.files.length > 0) {
                this.addFile(e.target.files[0]);
                // reset the input so if the user adds the same image again after removing it from the
                // list, the onChange event is triggered.
                e.target.value = '';
            }
        }
    }, {
        key: 'addFile',
        value: function addFile(file) {
            var _this2 = this;

            var reader = new FileReader();
            var createFile = function createFile(event, file) {
                var files = _this2.state.files;
                var data = {
                    id: (0, _sha2.default)('' + file.name + file.size + event.target.result),
                    name: file.name,
                    size: file.size,
                    url: 'url(' + event.target.result + ')'
                };
                if (_this2.props.multiple) {
                    files.push(data);
                    return _this2.setState({ files: files });
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
                bottom: 0,
                height: 80,
                width: 80,
                cursor: 'pointer'
            };
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
                    this.state.files.map(function (item, key) {
                        var itemStyle = {
                            height: '80px',
                            width: '80px',
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            marginRight: '5px',
                            borderRadius: '4px',
                            backgroundImage: item.url
                        };
                        return _react2.default.createElement(
                            'div',
                            { key: key, className: 'item file upload', style: itemStyle },
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
                                    { className: 'edit button' },
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

exports.default = File;