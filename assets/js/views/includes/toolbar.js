(function() {
  Framework7.prototype.plugins.toolbar = function(app, params) {
    // exit if not enabled
    if (!params) return;

    var tag = {
      name: 'toolbar',
      color: 5
    };
    pluginLog(tag, 'loaded');

    return {
      hooks: {
        appInit: function() {

          // set current view is main view to make borwser link transforms.
          $$(".tab-link").click(function(event) {
            myApp.getCurrentView().main = true;
            if (myApp.params.log) {
              console.log("set main to view" + myApp.getCurrentView().selector);
            }
          });

          $$(".tab-link.favoriteView").click(function() {
            if (myApp.params.log) console.log("click favoriteView");
            if (loginState == true) {
              myApp.closeNotification('.notification-item');
              myApp.reloadFavorite();
              if (myApp.params.log) console.log("login and click");
            }
          });

          $$(".tab-link.profileView").click(function() {
            if (myApp.params.log) console.log("click profileView");
            if (loginState == true) {
              myApp.closeNotification('.notification-item');
              myApp.reloadProfile();
              if (myApp.params.log) console.log("logined and click profileView");
            }
          });

          $$(".addPostView").click(function(event) {
            if (myApp.params.log) console.log("click addPostView");
            if (loginState == true) {
              if ($$(this).hasClass('tab-link')) {
                $$(this).removeClass('tab-link');
                $$(this).addClass('link');
              }
              myApp.closeNotification('.notification-item');
              myApp.getPostCategory();
              if (myApp.params.log) console.log("logined and click profileView");
            } else {
              if ($$(this).hasClass('link')) {
                $$(this).removeClass('link');
                $$(this).addClass('tab-link');
              }
              $$(this).click()
            }
          });

        },
      } // end hooks
    };
  };
})();
