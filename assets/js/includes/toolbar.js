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
    // myApp.addPost();
    myApp.getPostCategory();
    // addPostView.router.load({
    //   url: "/post/create/Category",
    //   reload: false,
    //   pushState: false,
    //   pushStateOnLoad: false,
    // });
    // myApp.getPostCategory();
    console.log("login and click");
  } else {
    if ($$(this).hasClass('link')) {
      $$(this).removeClass('link');
      $$(this).addClass('tab-link');
    }
    $$(this).click()
  }
});



// $$(".link.addPostView").click(function(event) {
//   if (loginState == true) {
//     myApp.closeNotification('.notification-item');
//     // myApp.getCurrentView().router.load({
//     //   url: "/post/create/Category",
//     //   reload: false,
//     //   pushState: false,
//     //   pushStateOnLoad: false,
//     // });
//     myApp.getPostCategory();
//     console.log("ink.addPostView login and click");
//   } else {
//     $$(this).removeClass('link');
//     $$(this).addClass('tab-link');
//     $$(".link.addPostView").click()
//   }
// });


// $$(document).on('click', '.item-link', function(e) {
//   console.log("item clicked");
//   $$("iframe#mapView").src = $$(this).attr("data-id");
// });

// $$(document).on('click', '.tab-link', function(e) {
//   console.log("tab-link clicked");
//
//   $$('#back-top').hide();
// });
