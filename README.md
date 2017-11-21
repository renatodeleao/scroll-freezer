# ScrollFreezer
Frost scroll event on window. A no-jumping javascript alternative to overflow:hidden.

### Why

What's the probelem with `overflow:hidden`? Well if people have their browsers
defaulting to show scrollbars (not overlayed fancy ghost ones like mac/safari)
content will jump to right when overflow is applied. It's kind of ugly/janky.

### Usage

```javascript
// attach to body
var bodyScrollFreezer = new ScrollFreezer('body');

bodyScrollFreezer.toggleScrollLock();
`````
### Credits
Technique originally seen at facebook, at least that's what [@fhilM](https://stackoverflow.com/users/2370007/philm) said.  

Based on [philm SO answer](https://stackoverflow.com/a/45230674/2801012) 🙌
