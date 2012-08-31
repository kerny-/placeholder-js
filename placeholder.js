/**
 * Emulation placeholder in older browsers that do not support html5
 * IE 5.5 +, Opera+, Firefox+ and other
 * @author Kerny
 * @site http:/kerny.ru/
 * @date 2012-08-31
 * @version 1.0.2 
 */

var EMPTY="",
    elementTags = new Array("input","textarea");

window.onload = function() {
    var elements, length, i,j, flag,    
    elementTagsLength = elementTags.length;     
    
    for(i = 0; i < elementTagsLength; i++){   
        
        elements = document.getElementsByTagName(elementTags[i]);
        length = elements.length;
        
        for (j = 0; j < length; j++) {   
            flag = elements[j].getAttribute("placeholder");
            if(flag!=null && flag!=EMPTY){
                events(elements[j]);        
                onBlur(elements[j]);
            }
            
            flag = elements[j].getAttribute("type");
            if(flag=="submit"){
                elements[j].onclick = function() { 
                    onSubmit(this);            
                }   
            }
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
    if(value==null || value==EMPTY){
        elemEvent.value= placeholder;
    }    
}

function onFocus(elemEvent) {
    var placeholder=elemEvent.getAttribute("placeholder"),
    value=elemEvent.value;
    if(value==placeholder){
        elemEvent.value=EMPTY;  
    }      
}

function onSubmit() { 
    var j, i, elements, flag, value,    
    elementTagsLength = elementTags.length; 
    
    for(i = 0; i < elementTagsLength; i++){        
        elements = document.getElementsByTagName(elementTags[i]);
        length = elements.length;
        
        for (j = 0; j < length; j++) {   
            flag = elements[j].getAttribute("placeholder");
            
            if(flag!=null && flag!=EMPTY){
                value = elements[j].value;
                if(value==flag){
                    elements[j].value=EMPTY;
                }                
            }
        }    
    }
}