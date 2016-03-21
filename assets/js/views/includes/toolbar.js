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

          $$(".tab-link.favoriteView").click(function() {
            console.log("click");
            if (loginState == true) {
              myApp.closeNotification('.notification-item');
              myApp.reloadFavorite();
              console.log("login and click");
            }
          });

          $$(".tab-link.profileView").click(function() {
            console.log("click");
            if (loginState == true) {
              myApp.closeNotification('.notification-item');
              myApp.reloadProfile();
              console.log("login and click");
            }
          });

          $$(".addPostView").click(function(event) {
            console.log("click");
            console.log(loginState);
            if (loginState == true) {
              if ($$(this).hasClass('tab-link')) {
                $$(this).removeClass('tab-link');
                $$(this).addClass('link');
              }
              myApp.closeNotification('.notification-item');
              myApp.getPostCategory();
              console.log("login and click");
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
