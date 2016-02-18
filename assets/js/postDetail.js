$$(document).on('pageInit', '.page[data-page="postDetailF7"]', function(e) {
  $$('a.left.back.link').click(function() {
    console.log("!!!!!!");
    var  history = mainView.history;
    history[history.length-2] == '#home';
    if(history){
     mainView.router.back();
  }
    // mainView.router.back();
    // window.location.href = '/main';
    // $("a.back.link :hover").css("color", "white");
  });
});
