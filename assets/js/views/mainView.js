(function() {
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
        appInit: function() {
          // appInit();
        },
        pageBeforeInit: function(pageData) {
          if (pageData.name == "main") {
            pluginLog(tag, 'pageBeforeInit');
            pageBeforeInit(pageData);
          }
        },
        pageInit: function(pageData) {
          if (pageData.name == "main") {
            pluginLog(tag, 'pageInit');
            pageInit(pageData);
          }
        },
        pageBeforeRemove: function(pageData) {
          if (pageData.name == "main") pageBeforeRemove(pageData);
        },
      } // end hooks
    };
  };

  //
  function pageBeforeInit(pageData) {

    pageData.query.splashState = getCookie("splash");

    if (pageData.query.splashState === "true" || pageData.query.splashState === true) {
      $$('#splash').css("display", "none");
    }

    pluginLog({
      name: 'mainView - cookie splash state',
      color: 5
    }, pageData.query.splashState);

  }

  //
  function pageInit(pageData) {

    var splashState = pageData.query.splashState;

    if (splashState != "true" || splashState != true) {
      setTimeout(function() {
        $$('#splash').addClass('animated fadeOut');
        setTimeout(function() {
          $$('#splash').css("display", "none");
        }, 650);
      }, 250);
      setCookie("splash", true);
    }

    $$(window).on('unload', function() {
      // removeCookie("splash");
    });

  }

  //
  function appInit() {


  }

  //
  function pageBeforeRemove(pageData) {

  }
})();
