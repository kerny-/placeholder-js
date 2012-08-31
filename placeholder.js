/**
 * Emulation placeholder in older browsers that do not support html5
 * IE 5.5 +, Opera+, Firefox+ and other
 * @author Kerny
 * @site http:/kerny.ru/
 * @date 2012-08-31
 * @version 1.1 
 */

window.onload = function() {
    var elements, elementTagsLength, i,j,
    
    elementTags = new Array("input","textarea");    
    elementTagsLength = elementTags.length;   
    
    for(i = 0; i < elementTagsLength; i++){        
        elements = document.getElementsByTagName(elementTags[i]);
        var length = elements.length;
        
        for (j = 0; j < length; j++) {       
            events(elements[j]);        
            onBlur(elements[j]);
        }        
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