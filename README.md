# ScrollFreezer
Frost scroll event on window. A no-jumping javascript alternative to overflow:hidden.

### Why

What's the probelem with `overflow:hidden`? Well if people have their browsers
defaulting to show scrollbars (not overlayed fancy ghost ones like mac/safari)
content will jump to right when overflow is applied. It's kind of ugly/janky.


### Public Methods
```javascript
// assuming an instance
const myScrollFreezer = new ScrollFreezer('body');
```

| Method                             | Description                           
| ----------------------------------| ------------------                    
| `myScrollFreezer.freeze()`        | Locks scroll. Sets `isFrozen=true`
| `myScrollFreezer.defrost()`       | Unlocks scroll. Sets `isFrozen=false`
| `myScrollFreezer.toggleFreeze()`  | toggle state between frozeen and defrosted
| `myScrollFreezer.getState()`      | returns an state `Object`. {isFrozen: bool, curScrollLockPos: number} 

### Usage

```javascript
// Instanciate
var bodyScrollFreezer = new ScrollFreezer('body');

// starts at false
document.querySelector('.someTrigger').addEventListener('click', function(){
  bodyScrollFreezer.toggleFreeze();
}, false);

/*
 * Manual verfication Example
 */
var isFrozen = bodyScrollFreezer.getState().isFrozen;

if (isFrozen){
  bodyScrollFreezer.defrost()
} else {
  bodyScrollFreezer.freeze()
}

`````
### Credits
Technique originally seen at facebook, at least that's what [@fhilM](https://stackoverflow.com/users/2370007/philm) said.  

Based on [philm SO answer](https://stackoverflow.com/a/45230674/2801012) 🙌
