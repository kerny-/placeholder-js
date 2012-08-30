/**
 * Emulation placeholder in older browsers that do not support html5
 * IE 5.5 +, Opera+, Firefox+ and other
 * last update: 2012-08-30
 * @author Kerny
 * @site http:/kerny.ru/
 * @date 2012-08-30
 * @version 1.0 
 */

window.onload = function() {
    var inputs, i;
    inputs = document.getElementsByTagName("input");
    for (i = 0; i < inputs.length; i++) {       
        inputs[i].onfocus = function() { 
            valueClean(this);            
        }
        inputs[i].onblur = function() { 
            placeholderToValue(this);            
        }
        var placeholder=inputs[i].getAttribute("placeholder");
        var value=inputs[i].value;
        if (value==null || value==""){
            inputs[i].setAttribute("value", placeholder);
        } else {
            inputs[i].setAttribute("value", value);
        }
    }
};

function placeholderToValue(elemEvent){   
    var placeholder=elemEvent.getAttribute("placeholder");
    var value=elemEvent.value;
    if(value==null || value==""){
        elemEvent.setAttribute("value", placeholder);
    }    
}

function  valueClean(elemEvent) {
    var placeholder=elemEvent.getAttribute("placeholder");
    var value=elemEvent.value;
    if(value==placeholder){
        elemEvent.setAttribute("value", "");  
    }        
}