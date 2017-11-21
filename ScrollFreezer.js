/**!
 * Name: ScrollFreezer.js
 * Version: 'v0.0.2'
 * Author: Renato de Leão | https://github.com/@renatodeleao | @renatodeleao
 * Date: 21 Nov 2017
 * Repo: https://github.com/renatodeleao/ScrollFreezer
 */

(function(){
  /*
   * @constructor
   */
  var ScrollFreezer = function(el){
    this.isFrozen = false;
    this.curScrollLockPos = 0;
    this._el = document.querySelector(el);
    this.noScrollCSSRules = [
      ["position", "fixed"],
      ["right", "0px"],
      ["left", "0px"],
      ["overflowY", "scroll"]
    ];

    this.freeze = this.freeze.bind(this);
    this.defrost = this.defrost.bind(this);
    this.toggleFreeze = this.toggleFreeze.bind(this);
  }

  ScrollFreezer.prototype.freeze = function freeze(){
    var self = this;

    self.curScrollLockPos = getScrollPos().y;
    self.noScrollCSSRules.forEach(function(styleRule){
      self._el.style[styleRule[0]] = styleRule[1];
    });
    self._el.style.top = -self.curScrollLockPos + "px";
    self.isFrozen = true;
  }

  ScrollFreezer.prototype.defrost = function defrost(){
    var self = this;

    // reset styles
    self.noScrollCSSRules.forEach(function(styleRule){
      self._el.style[styleRule[0]] = "";
    });
    self._el.style.top = ""; // reset
    window.scrollTo(0, self.curScrollLockPos); // scroll to saved position
    self.isFrozen = false
  }

  ScrollFreezer.prototype.toggleFreeze = function toggleFreeze(){
    var self = this;

    if(!self.isFrozen){
      self.freeze();
    } else {
      self.defrost();
    }
  }

  ScrollFreezer.prototype.getState = function getState(){
    return {
      isFrozen: this.isFrozen,
      curScrollLockPos: this.curScrollLockPos
    }
  }

  window.ScrollFreezer = ScrollFreezer;
})();
