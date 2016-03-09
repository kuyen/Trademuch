$$(document).on('pageInit', '.page[data-page="postDetailF7"]', function(e) {
  $$('a.left.back.link').click(function() {
    console.log("!!!!!!");
    var historyView = mainView.history;
    if (historyView[historyView.length - 2] == '#home') {
      mainView.router.back();
    } else {
      window.location.href = '/app';
    }
    //  window.location.href = '/app';
    //  mainView.router.loadPage('/app');
  });
});


// when page loaded
var postDetailAfterAnimation = myApp.onPageAfterAnimation('postDetail', function(page) {

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return "asdas";
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v2.5&appId=915539495181624";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  $$(function() {
    var origin = window.location.origin;
    $$(".fb-comments").attr('data-href', origin);
  });

  $$(".fbShare").on('click', function() {
    console.log("fb click");
    var origin = window.location.href;
    FB.ui({
        method: 'share',
        href: origin
      },
      // callback
      function(response) {
        if (response && !response.error_message) {
          //- alert('Posting completed.');
        } else {
          //- alert('Error while posting.');
        }
      });
  }); // end fbShare

  $$('.lineIt').attr('href', $$('.lineIt').attr('href') + window.location.href)

});
