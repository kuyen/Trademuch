(function() {
  Framework7.prototype.plugins.favoriteView = function(app, params) {
    // exit if not enabled
    if (!params) return;

    var tag = {
      name: 'favoriteView',
      color: 5
    };
    pluginLog(tag, 'view loaded');

    return {
      hooks: {
        pageBeforeInit: function(pageData) {
          if (pageData.name == "favorite") pageBeforeInit(pageData);
        },
        pageInit: function(pageData) {
          if (pageData.name == "favorite") pageInit(pageData);
        },
        pageBeforeRemove: function(pageData) {
          if (pageData.name == "favorite") pageBeforeRemove(pageData);
        },
        pageBeforeAnimation: function(pageData) {
          if (pageData.name == "favorite") pageBeforeAnimation(pageData);
        },
        pageAfterAnimation: function(pageData) {
          if (pageData.name == "favorite") pageAfterAnimation(pageData);
        },
      } // end hooks
    };
  };

  // runs when BEFORE insert a f7 page to view.
  function pageBeforeInit(pageData) {
    // todo

    myApp.reloadFavorite = function() {
      $$("#favoriteView > .pages").html(jsLoad("/user/favorites"));
    };

  } // end pageInit

  // runs when a f7 page be inserted to view.
  function pageInit(pageData) {

    // $$(document).on('click', 'a.favoriteView', function(e) {
    // var loginState = $(this).attr("data-login");
    // if (loginState=="false") {
    //   myApp.hideIndicator();
    //   mainView.router.loadPage('/story');
    // }
    // });

    // $$(".favoriteView").click(function() {
    //   myApp.closeNotification('.notification-item');
    //   $$("#favoriteView > .page-content").html(jsLoad("/user/favorites"));
    // });

    $$(document).on('click', '.deletelike.notif-message.swipeout-delete', function() {
      var delfav = $$(this);
      var id = delfav.attr("data-id");
      var img = delfav.attr("data-img");
      myApp.addNotification({
        title: 'You delete :(',
        message: 'You have delete to Favorite',
        media: '<img width="44" height="44" style="border-radius:100%" src="' + img + '">'
      });
      setTimeout(function() {
        myApp.closeNotification('.notification-item');
      }, 2000);
      $$.ajax({
        url: "/rest/favorite/" + id,
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
