(function() {
  Framework7.prototype.plugins.profileView = function(app, params) {
    // exit if not enabled
    if (!params) return;

    var tag = {
      name: 'profileView',
      color: 5
    };
    pluginLog(tag, 'loaded');

    return {
      hooks: {
        appInit: function() {
          appInit();
        },
        pageBeforeInit: function(pageData) {
          if (pageData.name == "profile") pageBeforeInit(pageData);
        },
        pageInit: function(pageData) {
          if (pageData.name == "profile") pageInit(pageData);
        },
        pageBeforeRemove: function(pageData) {
          if (pageData.name == "profile") pageBeforeRemove(pageData);
        },
        pageBeforeAnimation: function(pageData) {
          if (pageData.name == "profile") pageBeforeAnimation(pageData);
        },
        pageAfterAnimation: function(pageData) {
          if (pageData.name == "profile") pageAfterAnimation(pageData);
        },
      } // end hooks
    };
  };


  function appInit() {

    myApp.reloadProfile = function() {
      $$.get("/user/profile", function(data) {
        $$("#profileView > .pages").html(data);
        // the way below contant navbar and transform animation.
        // favoriteView.loadContent(data;)
      })
    };

  } // end appInit

  // runs when BEFORE insert a f7 page to view.
  function pageBeforeInit(pageData) {

  } // end pageInit

  // runs when a f7 page be inserted to view.
  function pageInit(pageData) {

    $$(document).on('click', '.deletePost', function() {
      var delPost = $$(this);
      var id = delPost.attr("data-id");
      var li = $$(this).parents('li');
      myApp.confirm('Are you sure?', function() {
        $$.ajax({
          url: "/rest/post/" + id,
          type: "DELETE",
          success: function(result) {
            console.log(result);
            myApp.swipeoutDelete(li)
          },
          error: function(xhr, ajaxOptions, thrownError) {
            console.log("xhr.status,thrownError=>", xhr.status, thrownError);
            alert("if you delete  post, login please :)");
            window.location.assign("/auth/facebook");
          }
        }); // end ajax
      });
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
