Framework7.prototype.plugins.pageEventCatcher = function(app, params) {
  // exit if not enabled
  if (!params) return;

  var tag = {
    name: 'Event',
    color: 1
  };
  pluginLog(tag, 'plugin loaded');

  return {
    hooks: {
      appInit: function() {
        pluginLog(tag, 'appInit');
      },
      navbarInit: function(navbar, pageData) {
        var msg = "[appInit] " + pageData.name;
        pluginLog(tag, msg, {
          navbar,
          pageData
        });
      },
      pageInit: function(pageData) {
        var msg = "[pageInit] " + pageData.name;
        pluginLog(tag, msg, {
          pageData
        });
      },
      pageBeforeInit: function(pageData) {
        var msg = "[pageInit] " + pageData.name;
        pluginLog(tag, msg, {
          pageData
        });
      },
      pageBeforeAnimation: function(pageData) {
        var msg = "[pageInit] " + pageData.name;
        pluginLog(tag, msg, {
          pageData
        });
      },
      pageAfterAnimation: function(pageData) {
        var msg = "[pageInit] " + pageData.name;
        pluginLog(tag, msg, {
          pageData
        });
      },
      pageBeforeRemove: function(pageData) {
        var msg = "[pageInit] " + pageData.name;
        pluginLog(tag, msg, {
          pageData
        });
      },
      addView: function(view) {
        var msg = "[pageInit] " + pageData.name;
        pluginLog(tag, msg, {
          view
        });
      },
      loadPage: function(view, url, content) {
        var msg = "[loadPage] url:" + url;
        pluginLog(tag, msg, {
          view,
          url,
          content
        });
      },
      goBack: function(view, url, preloadOnly) {
        var msg = "[goBack] url:" + url;
        pluginLog(tag, msg, {
          view,
          url,
          preloadOnly
        });
      },
      swipePanelSetTransform: function(views, panel, percentage) {
        var msg = "[swipePanelSetTransform] ";
        pluginLog(tag, msg, {
          views,
          panel,
          percentage
        });
      },
      ajaxStart: function(xhr) {
        var msg = "[ajaxStart] ";
        pluginLog(tag, msg, {
          xhr
        });
      },
      ajaxComplete: function(xhr) {
        var msg = "[ajaxComplete] ";
        pluginLog(tag, msg, {
          xhr
        });
      },
    } // end hooks
  };
};
