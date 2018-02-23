/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jsonp = __webpack_require__(1);

var _jsonp2 = _interopRequireDefault(_jsonp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.jsonp = _jsonp2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = jsonp;

var _encodeQueryStr = __webpack_require__(2);

var _encodeQueryStr2 = _interopRequireDefault(_encodeQueryStr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * jsonp 函数
 *
 * @args {Object} 参数
 * - url {String} 发起请求的 URL
 * - data {Object} 需要附加到 URL 上的参数
 * - callback {Function} jsonp 的数据处理函数
 * - opt {Object} jsonp 的一些选项
 * * - prefix {String} 生成 jsonp 处理数据函数的前缀
 * * - name {String} 生成 jsonp 处理数据函数的名字，该值若存在会忽略 prefix
 * * - timeout {Number} 设置响应的超时上限，默认为 60000ms.
 */

var count = 0;

function jsonp(args) {
  // jsonp 默认配置
  var defaultOpt = {
    prefix: '__jp',
    timeout: 60000
  };

  // 将自定义配置合并到默认配置
  Object.assign(defaultOpt, args);

  // Symbol 注册名
  var _defaultOpt$name = defaultOpt.name,
      name = _defaultOpt$name === undefined ? '' + defaultOpt.prefix + count : _defaultOpt$name;

  count += 1;

  // 函数名 {Symbol}
  var fn = Symbol.for(name);

  // 拼接 queryString
  var queryString = (0, _encodeQueryStr2.default)(defaultOpt.data);

  // 拼接 URL
  var url = defaultOpt.url;

  if (!queryString) {
    url += url.indexOf('?') === -1 ? '?' + queryString : '&' + queryString;
  }

  // 在 Window 上挂载函数
  window[fn] = defaultOpt.callback;

  var result = new Promise(function (resolve, reject) {
    var timer = void 0;

    var script = document.createElement('script');
    script.addEventListener('load', function () {
      var target = document.querySelector('script') || document.head;
      target.parentElement.insertBefore(script, target);
      reject();
    });
    script.addEventListener('error', function () {
      window[fn] = function () {};
      script = null;
      clearInterval(timer);
      reject(new Error('请求发生错误！'));
    });
    script.src = url;

    // 设置超时
    timer = setTimeout(function () {
      window[fn] = function () {};
      script = null;
      clearTimeout(timer);
      reject(new Error('请求超时！'));
    }, defaultOpt.timeout);
  });

  return result;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = encodeQueryStr;
function encodeQueryStr(data) {
  var s = '';

  if (data == null || !Object.keys(data).length) {
    return '';
  }

  var entries = Object.entries(data);

  entries.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    s += key + '=' + encodeURIComponent(value) + '&';
  });

  s = s.slice(0, -1);

  return s;
}

/***/ })
/******/ ]);
//# sourceMappingURL=jsonp.js.map