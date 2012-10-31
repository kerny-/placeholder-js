/**
 * Emulation placeholder in older browsers that do not support html5
 * IE 5.5 +, Opera+, Firefox+ and other
 * @author Kerny
 * @site http:/kerny.ru/
 * @date 2012-10-05
 * @version 1.0.4 
 */

var EMPTY="",
elementTags = new Array("input","textarea");
    
function supportPlaceholder() {
    var support = document.createElement('input');
    return 'placeholder' in support;
}

bindReady(function() {
    if (supportPlaceholder()==false) {
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
                    events(elements[j]);        
                    onBlur(elements[j]);
                }
            }        
        } 
    }
});

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

function bindReady(handler){

    var called = false

    function ready() { // (1)
        if (called) return
        called = true
        handler()
    }

    if ( document.addEventListener ) { // (2)
        document.addEventListener( "DOMContentLoaded", function(){
            ready()
        }, false )
    } else if ( document.attachEvent ) {  // (3)

        // (3.1)
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

        // (3.2)
        document.attachEvent("onreadystatechange", function(){

            if ( document.readyState === "complete" ) {
                ready()
            }
        })
    }

    // (4)
    if (window.addEventListener)
        window.addEventListener('load', ready, false)
    else if (window.attachEvent)
        window.attachEvent('onload', ready)
/*  else  // (4.1)
        window.onload=ready
	*/
}