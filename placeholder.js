/**
 * Emulation placeholder in older browsers that do not support html5
 * IE 5.5 +, Opera+, Firefox+ and other
 * @author Kerny
 * @site http:/kerny.ru/
 * @date 2012-08-31
 * @version 1.1 
 */

window.onload = function() {
    var inputs, textareas, length, i;
    inputs = document.getElementsByTagName("input");
    textareas = document.getElementsByTagName("textarea");
    
    length = inputs.length;
    for (i = 0; i < length; i++) {       
        events(inputs[i]);        
        onBlur(inputs[i]);
    }    
    length = textareas.length;
    for (i = 0; i < length; i++) {
        events(textareas[i]);     
        onBlur(textareas[i]);        
    }
};

function events(element){
    element.onfocus = function() { 
        onFocus(this);            
    }   
    element.onblur = function() { 
        onBlur(this);            
    }       
}

function onBlur(elemEvent){   
    var placeholder=elemEvent.getAttribute("placeholder"),
    value=elemEvent.value;
    if(value==null || value==""){
        elemEvent.value= placeholder;
    }    
}

function onFocus(elemEvent) {
    var placeholder=elemEvent.getAttribute("placeholder"),
    value=elemEvent.value;
    if(value==placeholder){
        elemEvent.value="";  
    }        
}