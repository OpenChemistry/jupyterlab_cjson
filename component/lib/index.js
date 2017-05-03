'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

require('../index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var theme = {
  scheme: 'jupyter',
  base00: '#fff',
  base01: '#fff',
  base02: '#d7d4f0',
  base03: '#408080',
  base04: '#b4b7b4',
  base05: '#c5c8c6',
  base06: '#d7d4f0',
  base07: '#fff',
  base08: '#000',
  base09: '#080',
  base0A: '#fba922',
  base0B: '#408080',
  base0C: '#aa22ff',
  base0D: '#00f',
  base0E: '#008000',
  base0F: '#00f'
};

var CJSONComponent = function (_React$Component) {
  _inherits(CJSONComponent, _React$Component);

  function CJSONComponent() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CJSONComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CJSONComponent.__proto__ || Object.getPrototypeOf(CJSONComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = { filter: '' }, _this.input = null, _this.timer = null, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CJSONComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      /**
       * Stop propagation of keyboard events to JupyterLab
       */
      _reactDom2.default.findDOMNode(this.input).addEventListener('keydown', function (event) {
        event.stopPropagation();
      }, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _reactDom2.default.findDOMNode(this.input).removeEventListener('keydown', function (event) {
        event.stopPropagation();
      }, false);
    }
  }, {
    key: 'render',
    value: function render() {

      console.log('render');
      var _props = this.props,
          data = _props.data,
          metadata = _props.metadata;

      var keyPaths = this.state.filter ? filterPaths(data, this.state.filter) : ['root'];
      return _react2.default.createElement(
        'div',
        { style: {
            position: 'relative',
            width: '100%'
          } },
        _react2.default.createElement(_mongochemclient2.default, { cjson: this.props.data })
      );
    }
  }]);

  return CJSONComponent;
}(_react2.default.Component);

exports.default = CJSONComponent;


function objectIncludes(data, query) {
  return JSON.stringify(data).includes(query);
}