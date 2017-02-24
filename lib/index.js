'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _keymaster = require('keymaster');

var _keymaster2 = _interopRequireDefault(_keymaster);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var callIfExists = function callIfExists(fnc) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (fnc) {
    return fnc.apply(undefined, args);
  }
  return null;
};

var ReactKeymaster = function (_React$Component) {
  _inherits(ReactKeymaster, _React$Component);

  function ReactKeymaster(props) {
    _classCallCheck(this, ReactKeymaster);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.onKeyUp = _this.onKeyUp.bind(_this);
    _this.handleKeyUpEvent = _this.handleKeyUpEvent.bind(_this);
    _this.isKeyDown = false;
    return _this;
  }

  ReactKeymaster.prototype.componentDidMount = function componentDidMount() {
    _keymaster2.default.unbind(this.props.keyName);
    (0, _keymaster2.default)(this.props.keyName, this.onKeyDown);
    document.addEventListener('keyup', this.handleKeyUpEvent);
  };

  ReactKeymaster.prototype.componentWillUnmount = function componentWillUnmount() {
    _keymaster2.default.unbind(this.props.keyName);
    this.isKeyDown = false;
    document.removeEventListener('keyup', this.handleKeyUpEvent);
  };

  ReactKeymaster.prototype.onKeyUp = function onKeyUp() {
    callIfExists(this.props.onKeyUp, this.props.keyName);
  };

  ReactKeymaster.prototype.onKeyDown = function onKeyDown() {
    if (this.isKeyDown) return;
    this.isKeyDown = true;
    callIfExists(this.props.onKeyDown, this.props.keyName);
    // this.props.onKeyDown(this.props.keyName);
  };

  ReactKeymaster.prototype.handleKeyUpEvent = function handleKeyUpEvent(e) {
    if (!this.isKeyDown) return;
    this.isKeyDown = false;
    var pressedKey = String.fromCharCode(e.keyCode).toLowerCase();
    if (pressedKey !== this.props.keyName) return;
    this.onKeyUp();
  };

  ReactKeymaster.prototype.render = function render() {
    return this.props.children || _react2.default.createElement('div', null);
  };

  return ReactKeymaster;
}(_react2.default.Component);

process.env.NODE_ENV !== "production" ? ReactKeymaster.propTypes = {
  keyName: _react.PropTypes.string,
  onKeyDown: _react.PropTypes.func,
  onKeyUp: _react.PropTypes.func
} : void 0;
exports.default = ReactKeymaster;
module.exports = exports['default'];