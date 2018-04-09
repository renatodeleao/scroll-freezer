export default class ScrollFreezer {
  /**
   * @constructor
   */
  constructor(){
    this.isFrozen = false;
    this.curScrollLockPos = 0;
    this._el = document.body;

    this.freeze = this.freeze.bind(this);
    this.defrost = this.defrost.bind(this);
    this.toggleFreeze = this.toggleFreeze.bind(this);
  }

  freeze(){
    var self = this;

    self.curScrollLockPos = ScrollFreezer.getScrollPos().y;
    ScrollFreezer.noScrollCSSRules.forEach(function(styleRule){
      self._el.style[styleRule[0]] = styleRule[1];
    });
    self._el.style.top = -self.curScrollLockPos + "px";
    self.isFrozen = true;
  }

  defrost(){
    var self = this;

    // reset styles
    ScrollFreezer.noScrollCSSRules.forEach(function(styleRule){
      self._el.style[styleRule[0]] = "";
    });
    self._el.style.top = ""; // reset
    window.scrollTo(0, self.curScrollLockPos); // scroll to saved position
    self.isFrozen = false
  }

  toggleFreeze(){
    var self = this;

    if(!self.isFrozen){
      self.freeze();
    } else {
      self.defrost();
    }
  }

  getState(){
    return {
      isFrozen: this.isFrozen,
      curScrollLockPos: this.curScrollLockPos
    }
  }

  static noScrollCSSRules = [
    ["position", "fixed"],
    ["right", "0px"],
    ["left", "0px"],
    ["overflowY", "scroll"]
  ];

  static getScrollPos = (el = window) => ({
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
  });
}
