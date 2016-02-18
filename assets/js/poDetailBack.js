$$(document).on('pageInit', '.page[data-page="postDetailF7"]', function(e) {
  $$('a.left.back.link').click(function() {
    console.log("!!!!!!");
    window.location.href = '/main';
    // mainView.router.loadPage('/main');
    // $("a.back.link :hover").css("color", "white");
  });
});
