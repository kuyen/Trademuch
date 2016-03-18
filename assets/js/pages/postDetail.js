// $$(document).on('pageInit', '.page[data-page="postDetailF7"]', function(e) {
//   $$('a.left.back.link').click(function() {
//     console.log("!!!!!!");
//     var historyView = mainView.history;
//     if (historyView[historyView.length - 2] == '#main') {
//       mainView.router.back();
//     } else {
//       window.location.href = '/app';
//     }
//     //  window.location.href = '/app';
//     //  mainView.router.loadPage('/app');
//   });
// });
//
//
// $$(document).on('pageInit pageReInit', '.page[data-page="postDetailF7"]', function(e) {
//   var id = $$("input#itemId").val();
//   // $("#postDetailF7 > .page-content").load("/post/" + id);
//   // $$("#postDetailF7 > .page-content").html(jsLoad("/post/" + id));
//   $$(".back.link").on("click", function() {
//     // clean fb sdk stuff
//     // $$('head script[id="facebook-jssdk"]').remove();
//     // $$('head style').remove()
//   });
//
// }); // end page postDetailF7

// when page loaded
var postDetailAfterAnimation = myApp.onPageAfterAnimation('postDetail', function(page) {

  console.log("postDetail onPageAfterAnimation");

  // if (myApp.getCurrentView().activePage.url.indexOf("#") != -1) myApp.showMyToolbar();

  // myApp.hideMyToolbar();

  // $$(function() {
  //   var origin = window.location.origin;
  //   $$(".fb-comments").attr('data-href', origin);
  // });

  $$("body").on("click", ".favboxa", function() {
    var fav = $$(this);
    var id = fav.attr("data-id");
    console.log("favboxa id=>", id);
    $$.ajax({
      url: "/rest/favorite/" + id,
      type: "POST",
      success: function(result) {
        console.log(result);
        fav.children().css("color", "#ff5757");
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.log("xhr.status,thrownError=>", xhr.status, thrownError);
        fav.children().css("color", "white");
        if (xhr.status == 403) {
          alert("if you like this item, login please :)");
          window.location.assign("/rest/auth/facebook");
        }
      }
    }); // end ajax
  }); // end click

  $$(document).on('click', '.link.like', function() {
    var fav = $$(this);
    var id = fav.attr("data-id");
    console.log("favboxa id=>", id);
    $$.ajax({
      url: "/rest/favorite/" + id,
      type: "POST",
      success: function(result) {
        console.log(result);
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.log("xhr.status,thrownError=>", xhr.status, thrownError);
        mainView.router.loadPage('/story');
      }
    }); // end ajax
  });

  // $$('div[data-page="postDetail"] .left .link.postDetailBack').click(function(e) {
  //   console.log(" postDetail back click ");
  //   var historyView = mainView.history;
  //   if (historyView[historyView.length - 2] != '#main') {
  //     console.log("after post");
  //     // historyView = [];
  //     // var homeIndex = 0;
  //     // for (var a = 0; a < mainView.history.length; a++) {
  //     //   console.log(mainView.history[a]);
  //     //   if (mainView.history[a].indexOf("/post/create") == -1) historyView.push(mainView.history[a]);
  //     //   if (mainView.history[a] == "#main") homeIndex = mainView.history.length - a;
  //     // }
  //     // mainView.history = historyView;
  //     mainView.router.back({
  //       url: "#main",
  //       "reloadPrevious": true,
  //       "force": true,
  //       "ignoreCache": true,
  //     });
  //     // } else {
  //     //   mainView.router.back();
  //     // $$(this).addClass('back');
  //     // $$('div[data-page="postDetail"] .left .link.back').addClass('with-animation');
  //     // $$('div[data-page="postDetail"] .left .link.back').attr('data-ignore-cache', 'true');
  //     // $$('div[data-page="postDetail"] .left .link.back').attr('data-reload-previous', 'true');
  //     // $$('div[data-page="postDetail"] .left .link.back').attr('data-force', 'true');
  //     // $$('div[data-page="postDetail"] .left .link.back').attr('href', '/app');
  //   } else {
  //     window.history.back();
  //   }
  // });

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

var pageBeforeRemove = myApp.onPageBeforeRemove('postDetail', function(page) {


});
