// when page loaded
var postDetailAfterAnimation = myApp.onPageAfterAnimation('postDetail', function(page) {

  console.log("postDetail onPageAfterAnimation");

  // for fb comment board plugin
  $$(function() {
    var origin = window.location.origin;
    $$(".fb-comments").attr('data-href', origin);
  });

  $$(".favboxa").click(function() {
    var fav = $$(this);
    var id = fav.attr("data-id");
    console.log("`.favboxa` click(): favboxa id=>", id);

    $$.ajax({
      url: "/rest/favorite/" + id,
      type: "POST",
      success: function(result) {
        console.log("result=>", result);
        if (result.length != 0) {
          myApp.getCurrentView().loadContent(result);
        } else {
          fav.children().css("color", "#ff5757");
        }
      },
      error: function(xhr, ajaxOptions, thrownError) {
        fav.children().css("color", "rgb(139, 100, 0)");
        console.log("`.favboxa` click(): thrownError=>", xhr.status, thrownError);
        myApp.alert("Error occured when try to add favorite.", thrownError);
      }
    }); // end ajax
  }); // end click

  // for sns sharing
  var address = myApp.getCurrentView().activePage.url;
  var origin = window.location.origin;
  var shareLink = origin + address;

  // set line share link
  var itemTitle = $$(".post-title").text();
  var lineShareMsg = "Check this amazing stuff out! [" + itemTitle + "] in TradeMuch. (" + shareLink + ")";
  $$('.lineIt').attr('href', $$('.lineIt').attr('href') + lineShareMsg);

  // fb well shareing
  $$(".fbShare").on('click', function() {
    console.log("fb click");
    FB.ui({
        method: 'share',
        href: shareLink
      },
      // callback
      function(response) {
        if (response && !response.error_message) {
          //- alert('Posting completed.');
          console.log("FB share successed=>", response);
        } else {
          //- alert('Error while posting.');
          console.log("FB share failed=>", response);
        }
      });
  }); // end fbShare

});

//
myApp.onPageBeforeRemove('postDetail', function(page) {


});
