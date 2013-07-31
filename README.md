placeholder-js
==============

Emulation placeholder in older browsers that do not support html5.

placeholder.js uses paradigm "Unobtrusive JavaScript". The example in the file **example.html**.

stylization
--------------
For styling, use class *-js-placeholder*

```css
    .-js-placeholder{
        color: red;
        font-style: italic;
    }
```

to dynamically create
--------------
If the input dynamic creation, then use the function *placeholderIni(input)*;

```javascript
    var newInput = document.createElement('input');

    newInput.setAttribute('placeholder', 'example dynamically input');            
    // initialization placeholder for the new input
    placeholderIni(newInput);
```    

More detailed information in the file **example.html**
