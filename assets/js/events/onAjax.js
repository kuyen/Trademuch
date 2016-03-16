var onAjax = {
  start:function onAjaxStart(){
    console.log("onAjaxStart");
    myApp.showIndicator();
  },
  complete:function onAjaxComplete(){
    console.log("onAjaxComplete");
    window.setTimeout(function() {
      myApp.hideIndicator();
    }, 500);
  }
}
