$$('#tab1').on('show', function() {
  myApp.alert('Tab 1 is visible');
});

$$('#tab2').on('show', function() {
  myApp.alert('Tab 2 is visible');
});

$$('#tab3').on('show', function() {
  myApp.alert('Tab 3 is visible');
});

$$(".tab-link.favoriteView").click(function() {
  myApp.closeNotification('.notification-item');
  // $$("#favoriteView > .pages").html(jsLoad("/user/favorites"));
  myApp.reloadFavorite();
});

$$(".tab-link.profileView").click(function() {
  myApp.closeNotification('.notification-item');
  myApp.reloadProfile();
});

// $$(".tab-link.addPostView").click(function() {
//   myApp.closeNotification('.notification-item');
//   $$("#addPostView > .pages").html(jsLoad("/post/create/Category"));
// });

$$(".link.addPostView").click(function(event) {
  // myApp.hideMyToolbar();
  // myApp.getCurrentView().history.push(myApp.getCurrentView())
  myApp.getCurrentView().router.load({
    url: "/post/create/Category",
    pushState: true,
    pushStateOnLoad: true,
  });
});


// $$(document).on('click', '.item-link', function(e) {
//   console.log("item clicked");
//   $$("iframe#mapView").src = $$(this).attr("data-id");
// });

// $$(document).on('click', '.tab-link', function(e) {
//   console.log("tab-link clicked");
//
//   $$('#back-top').hide();
// });
