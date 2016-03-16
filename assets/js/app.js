"use strict";

// init f7 app.
var myApp = new Framework7({
  init: false,

  // basic info
  modalTitle: 'TradeMuch',
  statusbarOverlay: true,

  // broswering state
  uniqueHistory: true,
  pushState: true,
  pushStateSeparator: "",
  pushStateRoot: "/app",

  // f7 compile template
  template7Pages: true,
  precompileTemplates: true,

  // lazyload
  imagesLazyLoadSequential: true,
  imagesLazyLoadThreshold: 50,

  // swipe page
  swipeBackPage: true,
  swipeBackPageAnimateShadow: false,
  swipeBackPageAnimateOpacity: false,

  // animation configs
  animatePages: true,
  animateNavBackIcon: true,

  // page scrolling
  hideToolbarOnPageScroll: true,
  hideTabbarOnPageScroll: true,
  hideNavbarOnPageScroll: true,

  // ajax reactions
  onAjaxStart: function(xhr) {
    myApp.showIndicator();
  },
  onAjaxComplete: function(xhr) {
    setTimeout(function() {
      myApp.hideIndicator();
    }, 500);
  },

  // plugin switch
  log: true,
  pageEventCatcher: true,
  disableSocketAutoConnection: true,
  backTopBtn: false,

  // view switch
  mainView: true,
  searchView: true,
  favoriteView: true,
  profileView: true,

}); // end myApp

// Expose Internal DOM library
window.$$ = Framework7.$;
window.myApp = myApp;

// Add main view
var mainView = myApp.addView('.view-main', {
  // Enable Dynamic Navbar for this view
  dynamicNavbar: true,
  domCache: false,
  linksView: mainView,
});
window.mainView = mainView;

// Add search view
var searchView = myApp.addView('.view-search', {
  dynamicNavbar: true,
  domCache: false,
  linksView: searchView,
});
window.searchView = searchView;

// Add addPost view
var searchView = myApp.addView('.view-addPost', {
  dynamicNavbar: true,
  domCache: false,
  linksView: searchView,
});
window.searchView = searchView;

// Add favorite view
var favoriteView = myApp.addView('.view-favorite', {
  dynamicNavbar: true,
  domCache: false,
  linksView: favoriteView,
});
window.favoriteView = favoriteView;

// Add profile view
var profileView = myApp.addView('.view-profile', {
  dynamicNavbar: true,
  domCache: false,
  linksView: profileView,
});
window.profileView = profileView;

// exec f7 app.
myApp.init();
