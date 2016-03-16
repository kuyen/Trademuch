Framework7.prototype.plugins.mainView = function(app, params) {
  // exit if not enabled
  if (!params) return;

  var tag = {
    name: 'mainView',
    color: 5
  };
  pluginLog(tag, 'loaded');

  return {
    hooks: {
      pageInit: function(pageData) {
        pageInit(pageData);
      },
      pageAfterAnimation: function(pageData) {

      },
      pageBeforeRemove: function(pageData) {

      },
    } // end hooks
  };
};


function pageInit(pageData) {

  setTimeout(function() {
    $$('#splash').addClass('animated fadeOut');
    setTimeout(function() {
      $$('#splash').hide();
    }, 650);
  }, 250);

  $$(".favoriteView").click(function() {
    myApp.closeNotification('.notification-item');
    $$("#favoriteView > .page-content").html(jsLoad("/user/favorites"));
  });

  $$(".profileView").click(function() {
    myApp.closeNotification('.notification-item');
    $$("#profileView > .page-content").html(jsLoad("/user/profile"));
  });

  // $$(".storyView.link").click(function(event) {
  //   mainView.router.load({
  //     url: "/post/create/Category",
  //     reload: true,
  //     pushState: false,
  //     pushStateOnLoad: false,
  //   });
  // });
}
