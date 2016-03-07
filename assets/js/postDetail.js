$$(document).on('pageInit', '.page[data-page="postDetailF7"]', function(e) {
  $$('a.left.back.link').click(function() {
    console.log("!!!!!!");
    var historyView = mainView.history;
    if(historyView[historyView.length-2] == '#home'){
     mainView.router.back();
   }else {
     window.location.href = '/app';
   }
    //  window.location.href = '/app';
    //  mainView.router.loadPage('/app');
  });
});
