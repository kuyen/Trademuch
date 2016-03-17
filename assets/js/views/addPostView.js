(function() {
  Framework7.prototype.plugins.addPostView = function(app, params) {
    // exit if not enabled
    if (!params) return;

    var tag = {
      name: 'addPostView',
      color: 5
    };
    pluginLog(tag, 'view loaded');

    return {
      hooks: {
        appInit: function() {
          appInit();
        },
        pageBeforeInit: function(pageData) {
          if (pageData.name == "addPost") pageBeforeInit(pageData);
        },
        pageInit: function(pageData) {
          if (pageData.name == "addPost") pageInit(pageData);
        },
        pageBeforeRemove: function(pageData) {
          if (pageData.name == "addPost") pageBeforeRemove(pageData);
        },
        pageBeforeAnimation: function(pageData) {
          if (pageData.name == "addPost") pageBeforeAnimation(pageData);
        },
        pageAfterAnimation: function(pageData) {
          if (pageData.name == "addPost") pageAfterAnimation(pageData);
        },
      } // end hooks
    };
  };

  function appInit() {

    myApp.addPost = function() {
      $$.get("/post/create/Category", function(data) {
        $$("#addPostView > .pages").html(data);
        // the way below contant navbar and transform animation.
        // addPostView.loadContent(data;)
      })
    };

    myApp.getPostCategory = function() {
      myApp.getCurrentView().router.load({
        url: "/post/create/Category",
        reload: false,
        pushState: false,
        pushStateOnLoad: false,
      });
    };

  } // end appInit

  // runs when BEFORE insert a f7 page to view.
  function pageBeforeInit(pageData) {
    // todo

  } // end pageInit

  // runs when a f7 page be inserted to view.
  function pageInit(pageData) {

    // $$(document).on('click', 'a.addPostView', function(e) {
    // var loginState = $(this).attr("data-login");
    // if (loginState=="false") {
    //   myApp.hideIndicator();
    //   mainView.router.loadPage('/story');
    // }
    // });

    // $$(".addPostView").click(function() {
    //   myApp.closeNotification('.notification-item');
    //   $$("#addPostView > .page-content").html(jsLoad("/user/addPosts"));
    // });

    $$(document).on('click', '.deletelike.notif-message.swipeout-delete', function() {
      var delfav = $$(this);
      var id = delfav.attr("data-id");
      var img = delfav.attr("data-img");
      myApp.addNotification({
        title: 'You delete :(',
        message: 'You have delete to addPost',
        media: '<img width="44" height="44" style="border-radius:100%" src="' + img + '">'
      });
      setTimeout(function() {
        myApp.closeNotification('.notification-item');
      }, 2000);
      $$.ajax({
        url: "/rest/addPost/" + id,
        type: "DELETE",
        success: function(result) {
          console.log(result);
        },
        error: function(xhr, ajaxOptions, thrownError) {
          console.log("xhr.status,thrownError=>", xhr.status, thrownError);
          alert("if you like this item, login please :)");
          window.location.assign("/auth/facebook");
        }
      }); // end ajax
    });


  } // end pageInit

  // runs when f7 page be removed from view.
  function pageBeforeRemove(pageData) {
    // todo

  } // end pageBeforeRemove

  // runs when BEFORE f7 transforms between pages.
  function pageBeforeAnimation(pageData) {
    // todo

  } // end pageBeforeRemove

  // runs when AFTER f7 transform between pages.
  function pageAfterAnimation(pageData) {
    // todo

  } // end pageBeforeRemove

})();





























////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// story page - storyView
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// myApp.onPageAfterAnimation('storyMode', function(page) {
//   console.log('Services page initialized');
//   console.log(page);
//   // $$('.back.link').click(function(e) {
//   //   // e.preventDefault();
//   //   mainView.router.loadPage('/app', {
//   //     "pushState": true
//   //   })
//   // }); // end click
// });

// function getCookie(name) {
//   var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
//   if (arr != null) return unescape(arr[2]);
//   return null;
// }

// give/take mode select
// $$(document).on('pageInit', '.page[data-page="storyMode"]', function(e) {
//
//   $$('.selectMode').click(function() {
//     if ($$(this).find('input').prop("checked")) {
//       $$(this).find('input').prop("checked", false);
//     } else {
//       $$(this).find('input').prop("checked", true);
//     }
//     var storedData = myApp.formToJSON('#storyModeChoose');
//     myApp.formStoreData('storyModeChoose', storedData);
//
//     mainView.router.loadPage('/post/create/Category');
//       // if(storedData.mode != ""  && storedData.hasOwnProperty('mode')) {
//       //   $$('#nextSetp').removeAttr("disabled");
//       // }else{
//       //   $$('#nextSetp').attr("disabled",true);
//       // }
//   }); // end click
//
//
// });


// post's image-fileinput(use jquery only)

// using delegate to support multi-fileinput
