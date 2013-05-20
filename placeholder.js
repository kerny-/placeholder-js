/**
 * Emulation placeholder in older browsers that do not support html5
 * IE 5.5 +, Opera+, Firefox+ and other
 * @author Kerny
 * @site http:/kerny.ru/
 * @date 2013-05-20
 * @version 1.0.5 
 */

var EMPTY="",
    placeholderClass = "-js-placeholder";
    issupportPlaceholder = supportPlaceholder();
    elementTags = new Array("input","textarea");
    
function supportPlaceholder() {
    var support = document.createElement("input");
    return "placeholder" in support;
}

bindReady(function() {
    if (issupportPlaceholder==false) {
        var elements, length, i,j, flag,    
        elementTagsLength = elementTags.length;     
    
        for(i = 0; i < elementTagsLength; i++){   
        
            elements = document.getElementsByTagName(elementTags[i]);
            length = elements.length;
        
            for (j = 0; j < length; j++) {   
                                
                flag = elements[j].getAttribute("type");
                if(flag=="submit"){
                    elements[j].onclick = function() { 
                        onSubmit(this);            
                    }   
                }                
                if (flag=="password") {                   
                    elements[j].setAttribute("type", "text");                                       
                    elements[j].setAttribute("data-type", "password");                                        
                }
                
                flag = elements[j].getAttribute("placeholder");
                if(flag!=null && flag!=EMPTY){
                    placeholderIni(elements[j]);
                }
            }        
        } 
    }
});

function placeholderIni(element){
    if(issupportPlaceholder==false){
        events(element);
        onBlur(element);
    }
}

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
        var type = elemEvent.getAttribute("data-type");
        if (type!=null){
            elemEvent.setAttribute("type", "text");            
        }        
        elemEvent.className = elemEvent.className + ' ' + placeholderClass;        
        elemEvent.value= placeholder;
    }    
}

function onFocus(elemEvent) {
    var placeholder=elemEvent.getAttribute("placeholder"),
    value=elemEvent.value;
    if(value==placeholder){
        var type = elemEvent.getAttribute("data-type");
        if (type!=null){
            elemEvent.setAttribute("type", type);  
        }
        elemEvent.className= elemEvent.className.replace(new RegExp(placeholderClass,'g'), EMPTY);
        elemEvent.value = EMPTY; 
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

function bindReady(handler){

    var called = false

    function ready() {
        if (called) return
        called = true
        handler()
    }

    if ( document.addEventListener ) {
        document.addEventListener( "DOMContentLoaded", function(){
            ready()
        }, false )
    } else if ( document.attachEvent ) {

        if ( document.documentElement.doScroll && window == window.top ) {
            function tryScroll(){
                if (called) return
                if (!document.body) return
                try {
                    document.documentElement.doScroll("left")
                    ready()
                } catch(e) {
                    setTimeout(tryScroll, 0)
                }
            }
            tryScroll()
        }
        document.attachEvent("onreadystatechange", function(){
            if ( document.readyState === "complete" ) {
                ready()
            }
        })
    }
    if (window.addEventListener)
        window.addEventListener('load', ready, false)
    else if (window.attachEvent)
        window.attachEvent('onload', ready)
}