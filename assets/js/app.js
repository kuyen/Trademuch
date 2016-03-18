// init f7 app.
var myApp = new Framework7({
  init: false,

  // basic info
  modalTitle: 'TradeMuch',
  statusbarOverlay: false,

  // broswering state
  pushState: true,
  pushStateSeparator: "",
  pushStateRoot: "/app",
  preloadPreviousPage: true,
  uniqueHistory: true,
  allowDuplicateUrls: true,

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
  // hideToolbarOnPageScroll: true,
  // hideTabbarOnPageScroll: true,
  // hideNavbarOnPageScroll: true,
  showBarsOnPageScrollEnd: false,

  // ajax reactions
  onAjaxStart: function(xhr) {
    myApp.showIndicator();
  },
  onAjaxComplete: function(xhr) {
    setTimeout(function() {
      myApp.hideIndicator();
    }, 225);
  },

  // --------------------------------------- //
  //            plugin switchs               //
  // --------------------------------------- //
  log: true,
  pageEventCatcher: true,
  disableSocketAutoConnection: true,
  backTopBtn: false,
  fbSupport: true,
  barsController: true,
  upscroller: {
    text: 'Go to Top'
  },

  // --------------------------------------- //
  //              view switchs               //
  // --------------------------------------- //
  mainView: true,
  searchView: true,
  favoriteView: true,
  profileView: true,
  addPostView: true,

}); // end myApp

// Add main view
var mainView = myApp.addView('.view-main', {
  // Enable Dynamic Navbar for this view
  dynamicNavbar: true,
  domCache: false,
  linksView: mainView,
  // url: "/app#main",
});

// Add search view
var searchView = myApp.addView('.view-search', {
  dynamicNavbar: true,
  domCache: false,
  linksView: searchView,
  // url: "/app#search",
});

// Add favorite view
var favoriteView = myApp.addView('.view-favorite', {
  dynamicNavbar: true,
  domCache: false,
  linksView: favoriteView,
  // url: "/app#favorite",
});

// Add profile view
var profileView = myApp.addView('.view-profile', {
  dynamicNavbar: true,
  domCache: false,
  linksView: profileView,
  // url: "/app#profile",
});

// Add addPost view
var addPostView = myApp.addView('.view-addPost', {
  dynamicNavbar: true,
  domCache: false,
  linksView: addPostView,
});

// Expose Internal DOM library
window.$$ = Framework7.$;
window.myApp = myApp;
window.mainView = mainView;
window.searchView = searchView;
window.favoriteView = favoriteView;
window.profileView = profileView;
window.addPostView = addPostView;

// exec f7 app.
myApp.init();
