$$(document).on('pageInit', '.page[data-page="postDetailF7"]', function(e) {
  $$('a.left.back.link').click(function() {
    console.log("!!!!!!");
    var h = mainView.history;
    if(h[h.length-2] == '#home'){
     mainView.router.back('/app');
   }else {
     mainView.router.back('/app');
   }
    //  window.location.href = '/app';
    //  mainView.router.loadPage('/app');
  });
});
