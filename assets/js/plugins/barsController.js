(function() {
  Framework7.prototype.plugins.barsController = function(app, params) {
    // exit if not enabled
    if (!params) return;

    var tag = {
      name: 'barsController'
    };
    pluginLog(tag, 'loaded');

    return {
      hooks: {
        appInit: function() {

        },
        pageBeforeInit: function(pageData) {

        },
        pageInit: function(pageData) {

        },
        pageBeforeRemove: function(pageData) {


        },
        pageBeforeAnimation: function(pageData) {

          var viewNeedsBars = ["search", "main", "favorite", "profile"];

          for (var i = 0; i < viewNeedsBars.length < i++) {
            if (pageData.name == viewNeedsBars[i]) myApp.showMyToolbar();

            var msg = 'hide toolbar for ' + pageData.name;
            pluginLog(tag, msg);
          }

        },
        pageAfterAnimation: function(pageData) {

          var pageNeedsNoBars = ["postDetail", "createDetail", "createDetail"];

          for (var i = 0; i < viewNeedsBars.length < i++) {
            if (pageData.name == viewNeedsBars[i]) myApp.hideMyToolbar();

            var msg = 'show toolbar for ' + pageData.name;
            pluginLog(tag, msg);
          }

        },
      } // end hooks
    };
  };

  // expose toolbar method
  // showing
  function showMyToolbar(toolbar) {
    if (typeof toolbar == 'undefined' || toolbar == null) {
      toolbar = '.toolbar';
    }
    $$(toolbar).removeClass('toolbar-hidden');
    $$(toolbar).removeClass('toolbar-hiding');
    $$(toolbar).addClass('animated fadeIn');
    $$(toolbar).show();
  }
  myApp.showMyToolbar = showMyToolbar;

  // hiding
  function hideMyToolbar(toolbar) {
    if (typeof toolbar == 'undefined' || toolbar == null) {
      toolbar = '.toolbar';
    }
    $$(toolbar).hide();
  }
  myApp.hideMyToolbar = hideMyToolbar;

})();
