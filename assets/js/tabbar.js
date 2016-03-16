

$$('#tab1').on('show', function () {
    myApp.alert('Tab 1 is visible');
});

$$('#tab2').on('show', function () {
    myApp.alert('Tab 2 is visible');
});

$$('#tab3').on('show', function () {
    myApp.alert('Tab 3 is visible');
});

$$(".favoriteView").click(function() {
  // myApp.closeNotification('.notification-item');
  $$("#favoriteView > .page-content").html(jsLoad("/user/favorites"));
});

$$(".profileView").click(function() {
  // myApp.closeNotification('.notification-item');
  $$("#profileView > .page-content").html(jsLoad("/user/profile"));
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
