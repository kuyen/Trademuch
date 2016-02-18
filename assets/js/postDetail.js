$$(document).on('pageInit', '.page[data-page="postDetailF7"]', function(e) {
  $$('a.left.back.link').click(function() {
    console.log("!!!!!!");
    var mainView = mainView.history;
    
    if(mainView.length == 0){
     mainView.router.back();
  }
    // mainView.router.back();
    // window.location.href = '/main';
    // $("a.back.link :hover").css("color", "white");
  });
});
