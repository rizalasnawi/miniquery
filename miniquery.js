let SweetSelector = {
  select: function(element){
    return document.querySelectorAll(element)
  }
}



let DOM = {
 hide: function(element){
   let selected = SweetSelector.select(element)
   for (let i = 0; i < selected.length; i++) {
     selected[i].style.display = "none";
   }
 },
 show: function(element){
   let selected = SweetSelector.select(element)
   for (let i = 0; i < selected.length; i++) {
     selected[i].style.display = "block";
   }
 },
 addClass: function(element, classAdded) {
   let selected = SweetSelector.select(element)
   for (let i = 0; i < selected.length; i++) {
     selected[i].classList.add(classAdded);
   }
 },
 removeClass: function(element, removedClass){
   let selected = SweetSelector.select(element)
   for (let i = 0; i < selected.length; i++) {
     selected[i].classList.remove(removedClass);
   }
 }
}

let EventDispatcher = {
  on: function(element, addEvent, callback){
    let selected = SweetSelector.select(element)
    for (let i = 0; i < selected.length; i++) {
      selected[i].addEventListener(addEvent, callback)
    }
  },
  trigger: function(element, addEvent){
    let selected = SweetSelector.select(element)
    for (let i = 0; i < selected.length; i++) {
      let event = document.createEvent('HTMLEvents')
      event.initEvent(addEvent, true, false)
      selected[i].dispatchEvent(event)
    }
  }
}



let AjaxWrapper = {
  request: function(data){
   let request = new XMLHttpRequest();
   request.open(data.type, data.url, true);

   request.onload = function() {
     if (request.status >= 200 && request.status < 400) {
       
       let resp = request.responseText;
       console.log('Success: ', resp);
     } else {
       console.log("ERROR");
       

     }
   };
   request.onerror = function() {
   };
   request.send();
  }
}


function miniquery(selector){
  function hide(){
    DOM.hide(selector)
  }
  function show(){
    DOM.show(selector)
  }
  function addClass(){
    DOM.addClass(selector)
  }
  function removeClass(){
    DOM.removeClass(selector)
  }
  function on(addEvent, callback){
    EventDispatcher.on(selector, addEvent, callback)
  }
  function trigger(addEvent){
    EventDispatcher.trigger(selector, addEvent)
  }
  return ({
    this: SweetSelector.select(selector),
    hide: hide,
    show: show,
    addClass: addClass,
    removeClass: removeClass,
    on: on,
    trigger: trigger
  })
}

miniquery.ajax = function(data){
 return AjaxWrapper.request(data)
}

let $ = miniquery