'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Blocks = undefined;

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

var _youtube = require('./youtube');

var _youtube2 = _interopRequireDefault(_youtube);

var _resizeableDiv = require('./resizeable-div');

var _resizeableDiv2 = _interopRequireDefault(_resizeableDiv);

var _resizeableDiv3 = require('./resizeable-div2');

var _resizeableDiv4 = _interopRequireDefault(_resizeableDiv3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*import Columns2 from './columns2';
import Image from './image';
import Unstyled from './unstyled';*/

var blocks = {
    'header-1': (0, _header2.default)(1),
    'header-2': (0, _header2.default)(2),
    'header-3': (0, _header2.default)(3),
    'header-4': (0, _header2.default)(4),
    'header-5': (0, _header2.default)(5),
    youtube: _youtube2.default,
    'resizeable-div': _resizeableDiv2.default,
    'resizeable-div2': _resizeableDiv4.default
};

var Blocks = exports.Blocks = blocks;