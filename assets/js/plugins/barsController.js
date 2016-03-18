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

          // showing
          function showMyToolbar(toolbar) {
            if (typeof toolbar == 'undefined' || toolbar == null) {
              toolbar = '.toolbar';
            }
            $$(toolbar).addClass('animated');
            $$(toolbar).removeClass('toolbar-hidden');
            $$(toolbar).removeClass('toolbar-hiding');
            $$(toolbar).show();
          }
          myApp.showMyToolbar = showMyToolbar;

          // hiding
          function hideMyToolbar(toolbar) {
            if (typeof toolbar == 'undefined' || toolbar == null) {
              toolbar = '.toolbar';
            }
            $$(toolbar).removeClass('animated');
            $$(toolbar).addClass('toolbar-hiding');
            $$(toolbar).addClass('toolbar-hidden');
            $$(toolbar).hide();
          }
          myApp.hideMyToolbar = hideMyToolbar;

        },
        pageBeforeInit: function(pageData) {

          if (pageData.name == "postDetail") myApp.hideMyToolbar();

        },
        pageInit: function(pageData) {

        },
        pageBeforeRemove: function(pageData) {


        },
        pageBeforeAnimation: function(pageData) {

          var viewNeedsBars = ["search", "main", "favorite", "profile"];

          for (var i = 0; i < viewNeedsBars.length; i++) {

            if (pageData.name == viewNeedsBars[i]) {
              myApp.showMyToolbar();
              var msg = 'hide toolbar for ' + pageData.name;
              pluginLog(tag, msg);
            }

          } // end for

        },
        pageAfterAnimation: function(pageData) {

          var pageNeedsNoBars = ["postDetail", "createDetail", "createDetail"];

          for (var i = 0; i < pageNeedsNoBars.length; i++) {

            if (pageData.name == pageNeedsNoBars[i]) {
              myApp.hideMyToolbar();
              var msg = 'show toolbar for ' + pageData.name;
              pluginLog(tag, msg);
            }

          } // end for

        },
      } // end hooks
    };
  };

  // expose toolbar method

})();
