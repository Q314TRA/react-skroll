"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactSpring = require("react-spring");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _isFunction = _interopRequireDefault(require("lodash/isFunction"));

var _throttleDebounce = require("throttle-debounce");

var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));

var _scrollInitalState = _interopRequireDefault(require("./scrollInitalState"));

var _nodeToScrollState = _interopRequireDefault(require("./nodeToScrollState"));

var _nodeChildrenToScrollState = _interopRequireDefault(require("./nodeChildrenToScrollState"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var View = _reactSpring.Globals.defaultElement;

var Scroller =
/*#__PURE__*/
function (_Component) {
  _inherits(Scroller, _Component);

  function Scroller(props) {
    var _this;

    _classCallCheck(this, Scroller);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Scroller).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "createRef", function (ref) {
      _this.target = ref; // add component to resize observer to detect changes on resize

      _this.resizeObserver = new _resizeObserverPolyfill.default(function (entries, observer) {
        if (_this.state.ready) {
          _this.handleResize();
        } else {
          _this.setStateScroll({
            ready: true
          });
        }
      });

      if (_this.target) {
        _this.resizeObserver.observe(_this.target);
      }

      _this.props.scrollRef(_this.connection);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "deleteRef", function () {
      if (_this.target) {
        _this.resizeObserver.disconnect(_this.target);
      }

      _this.setStateScroll({
        ready: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setStateScroll", function (additionalStates) {
      var onScrollChange = _this.props.onScrollChange;

      var newScroll = _objectSpread({}, _this.state.scroll, (0, _nodeToScrollState.default)(_this.target), (0, _nodeChildrenToScrollState.default)(_this.target), additionalStates);

      _this.setState({
        scroll: newScroll
      });

      if (onScrollChange) {
        onScrollChange(newScroll);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setStateScrollStart", function (additionalStates) {
      var position = _this.state.scroll.position;

      _this.setStateScroll(_objectSpread({
        originalPosition: position,
        timeStamp: Date.now()
      }, additionalStates));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setStateScrollMove", function (additionalStates) {
      _this.setStateScroll(_objectSpread({
        moving: true,
        resting: false
      }, additionalStates));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setStateScrollRest", function (additionalStates) {
      _this.setStateScroll(_objectSpread({
        moving: false,
        resting: true
      }, additionalStates));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setStateScrollEnd", function (additionalStates) {
      _this.setStateScroll(_objectSpread({
        originalPosition: null,
        changedPosition: null,
        timeStamp: null
      }, additionalStates));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "findChildOnView", function () {
      var children = _this.state.scroll.children;
      return children.find(function (child) {
        return child.onView;
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "findChildIndexOnView", function () {
      var children = _this.state.scroll.children;
      return children.findIndex(function (child) {
        return child.onView;
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollToPosition", function (position) {
      _this.controller.update({
        scroll: position,
        onFrame: function onFrame(_ref) {
          var scroll = _ref.scroll;
          return _this.target.scrollTop = scroll;
        }
      });

      console.log(_this.target);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollToByIndex", function (index) {
      var children = _this.state.scroll.children;

      _this.scrollToPosition(children[index].start);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollToTop", function () {
      var start = _this.state.scroll.start;

      _this.scrollToPosition(start);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollToBottom", function () {
      var end = _this.state.scroll.end;

      _this.scrollToPosition(end);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "previousOfIndex", function () {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.findChildIndexOnView();
      var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.state.scroll.children;
      return arr[i > 0 ? i - 1 : i];
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "nextOfIndex", function () {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.findChildIndexOnView();
      var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.state.scroll.children;
      return arr[i < arr.length - 1 ? i + 1 : i];
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollToPrev", function () {
      var prevPosition = _this.previousOfIndex().start;

      _this.scrollToPosition(prevPosition);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollToNext", function () {
      var nextPosition = _this.nextOfIndex().start;

      _this.scrollToPosition(nextPosition);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollToElement", function (element, options) {
      var start = element.scrollTop;

      _this.scrollToPosition(start);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollToActive", function () {
      var newPosition = _this.findChildOnView().start;

      _this.scrollToPosition(newPosition);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleScroll", function () {
      _this.handleScrollStart();

      _this.handleScrollMove();

      _this.handleScrollEnd();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleScrollStart", function () {
      _this.setStateScrollMove();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleScrollMove", function () {
      _this.setStateScroll();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleScrollEnd", function () {
      _this.setStateScrollRest();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleResize", function () {
      _this.handleResizeStart();

      _this.handleResizeMove();

      _this.handleResizeEnd();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleResizeStart", function () {
      _this.setStateScrollMove();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleResizeMove", function () {
      _this.handleScroll();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleResizeEnd", function () {
      var autoFrame = _this.props.autoFrame;

      if (autoFrame) {
        _this.scrollToActive();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleWheel", function (e) {
      var autoScroll = _this.props.autoScroll;

      if (autoScroll) {
        e.preventDefault();
      }

      _this.handleWheelStart(e);

      _this.handleWheelMove(e);

      _this.handleWheelEnd(e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleWheelStart", function (e) {
      var autoScroll = _this.props.autoScroll;
      var changedPosition = _this.state.scroll.changedPosition;

      _this.setStateScrollStart({
        wheeling: true,
        changedPosition: !autoScroll ? null : changedPosition
      });

      if (autoScroll) {
        var movingUpwards = e.deltaY > 0;
        var movingDownwards = e.deltaY < 0;
        if (movingDownwards) _this.scrollToPrevDebounced();
        if (movingUpwards) _this.scrollToNextDebounced();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleWheelMove", function (e) {
      var autoScroll = _this.props.autoScroll;

      if (autoScroll) {
        var prev = _this.state.deltaY;
        var next = e.deltaY;
        var changed = Math.abs(next) > Math.abs(prev);

        if (changed) {
          var movingUpwards = next > 0;
          var movingDownwards = next < 0;

          if (movingDownwards) {
            _this.scrollToPrevDebounced();
          }

          if (movingUpwards) {
            _this.scrollToNextDebounced();
          }
        }
      }

      _this.setState({
        deltaY: e.deltaY
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleWheelEnd", function (e) {
      var autoFrame = _this.state.scroll.autoFrame;

      _this.setStateScrollEnd({
        wheeling: false,
        deltaY: null
      });

      if (autoFrame) _this.scrollToActive();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleTouchStart", function (e) {
      _this.setStateScrollStart({
        touching: true,
        touches: e.touches
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleTouchMove", function (e) {
      var _this$state$scroll = _this.state.scroll,
          touches = _this$state$scroll.touches,
          originalPosition = _this$state$scroll.originalPosition;
      var distanceFromTouchStart = e.changedTouches[0].clientY - touches[0].clientY;
      var touchPosition = originalPosition - distanceFromTouchStart;

      _this.scrollToPosition(touchPosition);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleTouchEnd", function (e) {
      var _this$state$scroll2 = _this.state.scroll,
          timeStamp = _this$state$scroll2.timeStamp,
          touches = _this$state$scroll2.touches;
      var timeLapse = Date.now() - timeStamp;

      if (timeLapse < 200) {
        var movingUpwards = e.changedTouches[0].clientY < touches[0].clientY;
        var movingDownwards = e.changedTouches[0].clientY > touches[0].clientY;
        if (movingDownwards) _this.scrollToPrev();
        if (movingUpwards) _this.scrollToNext();
      } else {
        _this.scrollToActive();
      }

      _this.setStateScroll({
        touching: false
      });
    });

    _this.state = {
      scroll: _scrollInitalState.default // debounce is used to mimiques start, move and end events that don't have this functions

    };
    _this.handleScrollStart = (0, _throttleDebounce.debounce)(500, true, _this.handleScrollStart);
    _this.handleResizeMove = (0, _throttleDebounce.throttle)(50, _this.handleResizeMove);
    _this.handleScrollEnd = (0, _throttleDebounce.debounce)(500, _this.handleScrollEnd);
    _this.handleWheelStart = (0, _throttleDebounce.debounce)(100, true, _this.handleWheelStart);
    _this.handleWheelEnd = (0, _throttleDebounce.debounce)(100, _this.handleWheelEnd);
    _this.handleResizeStart = (0, _throttleDebounce.debounce)(250, true, _this.handleResizeStart);
    _this.handleResizeEnd = (0, _throttleDebounce.debounce)(250, _this.handleResizeEnd);
    _this.scrollToPrevDebounced = (0, _throttleDebounce.debounce)(250, true, _this.scrollToPrev);
    _this.scrollToNextDebounced = (0, _throttleDebounce.debounce)(250, true, _this.scrollToNext);
    _this.controller = new _reactSpring.Controller({
      scroll: 0
    });
    return _this;
  }

  _createClass(Scroller, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.deleteRef();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          autoFrame = _this$props.autoFrame,
          autoScroll = _this$props.autoScroll,
          ScrollerNavigation = _this$props.ScrollerNavigation;
      var scroll = this.connection;
      return _react.default.createElement(ScrollerContainer, null, _react.default.createElement(ScrollerNavigation, {
        scroll: scroll
      }), _react.default.createElement(ScrollerContent, {
        scrollRef: this.createRef,
        scroll: this.state.scroll,
        onScroll: this.handleScroll,
        onWheel: this.handleWheel,
        onTouchStart: this.handleTouchStart,
        onTouchMove: this.handleTouchMove,
        onTouchEnd: this.handleTouchEnd
      }, (0, _isFunction.default)(children) ? children(scroll) : children));
    }
  }, {
    key: "connection",
    get: function get() {
      return _objectSpread({}, this.state.scroll, {
        target: this.target,
        autoFrame: this.props.autoFrame,
        autoScroll: this.props.autoScroll,
        scrollToPosition: this.scrollToPosition,
        scrollToByIndex: this.scrollToByIndex,
        scrollToTop: this.scrollToTop,
        scrollToBottom: this.scrollToBottom,
        scrollToPrev: this.scrollToPrev,
        scrollToNext: this.scrollToNext,
        scrollToElement: this.scrollToElement,
        scrollToActive: this.scrollToActive
      });
    }
  }]);

  return Scroller;
}(_react.Component);

exports.default = Scroller;

_defineProperty(Scroller, "defaultProps", {
  autoFrame: false,
  autoScroll: false,
  ScrollerNavigation: function ScrollerNavigation() {
    return null;
  }
});

var containerStyle = {
  height: '100%',
  width: '100%'
};

var ScrollerContainer =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ScrollerContainer, _PureComponent);

  function ScrollerContainer() {
    _classCallCheck(this, ScrollerContainer);

    return _possibleConstructorReturn(this, _getPrototypeOf(ScrollerContainer).apply(this, arguments));
  }

  _createClass(ScrollerContainer, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(View, _extends({
        style: containerStyle
      }, this.props));
    }
  }]);

  return ScrollerContainer;
}(_react.PureComponent);

var ScrollerContent =
/*#__PURE__*/
function (_PureComponent2) {
  _inherits(ScrollerContent, _PureComponent2);

  function ScrollerContent() {
    _classCallCheck(this, ScrollerContent);

    return _possibleConstructorReturn(this, _getPrototypeOf(ScrollerContent).apply(this, arguments));
  }

  _createClass(ScrollerContent, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          scroll = _this$props2.scroll,
          scrollRef = _this$props2.scrollRef,
          autoFrame = _this$props2.autoFrame,
          autoScroll = _this$props2.autoScroll,
          props = _objectWithoutProperties(_this$props2, ["scroll", "scrollRef", "autoFrame", "autoScroll"]);

      var style = {
        height: '100%',
        width: '100%',
        overflowY: autoScroll || scroll.touching ? 'hidden' : 'auto' // TODO: investigar glich on touchScroll with overFlow
        // overflowScrolling: 'touch',
        // WebkitOverflowScrolling: 'touch',
        // overflowY: !autoScroll && !touching ? 'auto' : 'hidden',

      };
      return _react.default.createElement(View, _extends({
        ref: scrollRef,
        style: style
      }, props));
    }
  }]);

  return ScrollerContent;
}(_react.PureComponent);