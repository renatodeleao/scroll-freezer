
/**!
 * Name: scroll-freezer.js es
 * Version: 'v1.0.1'
 * Author: Renato de Leão | https://github.com/@renatodeleao | @renatodeleao
 */

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var ScrollFreezer = function () {
  /**
   * @constructor
   */
  function ScrollFreezer() {
    classCallCheck(this, ScrollFreezer);

    this.isFrozen = false;
    this.curScrollLockPos = 0;
    this._el = document.body;

    this.freeze = this.freeze.bind(this);
    this.defrost = this.defrost.bind(this);
    this.toggleFreeze = this.toggleFreeze.bind(this);
  }

  createClass(ScrollFreezer, [{
    key: "freeze",
    value: function freeze() {
      var self = this;

      self.curScrollLockPos = ScrollFreezer.getScrollPos().y;
      ScrollFreezer.noScrollCSSRules.forEach(function (styleRule) {
        self._el.style[styleRule[0]] = styleRule[1];
      });
      self._el.style.top = -self.curScrollLockPos + "px";
      self.isFrozen = true;
    }
  }, {
    key: "defrost",
    value: function defrost() {
      var self = this;

      // reset styles
      ScrollFreezer.noScrollCSSRules.forEach(function (styleRule) {
        self._el.style[styleRule[0]] = "";
      });
      self._el.style.top = ""; // reset
      window.scrollTo(0, self.curScrollLockPos); // scroll to saved position
      self.isFrozen = false;
    }
  }, {
    key: "toggleFreeze",
    value: function toggleFreeze() {
      var self = this;

      if (!self.isFrozen) {
        self.freeze();
      } else {
        self.defrost();
      }
    }
  }, {
    key: "getState",
    value: function getState() {
      return {
        isFrozen: this.isFrozen,
        curScrollLockPos: this.curScrollLockPos
      };
    }
  }]);
  return ScrollFreezer;
}();

ScrollFreezer.noScrollCSSRules = [["position", "fixed"], ["right", "0px"], ["left", "0px"], ["overflowY", "scroll"]];

ScrollFreezer.getScrollPos = function () {
  var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  return {
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
  };
};

export default ScrollFreezer;
