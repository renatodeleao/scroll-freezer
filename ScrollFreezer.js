/**!
 * Name: ScrollFreezer.js
 * Version: 'v0.0.1'
 * Author: Renato de Leão | https://github.com/@renatodeleao | @renatodeleao
 * Date: 21 Nov 2017
 *
 * Lock/unlock scroll event on given element
 * Block scroll by keeping track of current scrolled distance
 * and apply specific css to mimic freezing.
 * Why not use: overflow:hidden? because if people have their browsers
 * defaulting to show scrollbars (not overlayed ghost ones like mac/safati)
 * Content will jump to right when overflow is applied. It's ugly
 *
 * Technique original seen at facebook
 * Based on: https://stackoverflow.com/a/45230674/2801012
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

    this.toggleScrollLock = this.toggleScrollLock.bind(this);
  }

  ScrollFreezer.prototype.toggleScrollLock = function toggleScrollLock(){
    var self = this;

    if(!self.isFrozen){
      self.curScrollLockPos = getScrollPos().y;

      self.noScrollCSSRules.forEach(function(styleRule){
        self._el.style[styleRule[0]] = styleRule[1];
      });
      self._el.style.top = -self.curScrollLockPos + "px";
      self.isFrozen = true;
    } else {
      // reset styles
      self.noScrollCSSRules.forEach(function(styleRule){
        self._el.style[styleRule[0]] = "";
      });
      self._el.style.top = ""; // reset
      window.scrollTo(0, self.curScrollLockPos); // scroll to saved position
      self.isFrozen = false
    }
  }

  window.ScrollFreezer = ScrollFreezer;
})();
