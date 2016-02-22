$$(document).on('pageInit', '.page[data-page="postDetailF7"]', function(e) {
  $$('a.left.back.link').click(function() {
    console.log("!!!!!!");

    window.location.href = '/app';
    // mainView.router.loadPage('/app');
    // $("a.back.link :hover").css("color", "white");
  });
});
