// card click
$$(document).on('click', '.swipeout', function(event) {
  var f7open = $$(this).hasClass('swipeout-opened');
  var closeOpen = $$(this).hasClass('close-open');
  if (!f7open) {
    if (closeOpen) {
      $$(this).removeClass('close-open');
      console.log("不動");
    } else {
      console.log("跳轉");
      $$(this).css('background-color', 'rgb(169, 208, 247)');
      // $('#back-top').fadeOut();
      $$('#back-top').removeClass('fadeIn')
      $$('#back-top').addClass('fadeOut')
      myApp.getCurrentView().router.load({
        url: '/post/' + $$(this).attr("data-id"),
        // reload: false,
        // pushState: true,
        // pushStateOnLoad: true,
        // reload: false,
        pushState: true,
        pushStateOnLoad: true,
      });
    }
  }
}).on("touchend", '.swipeout', function() {
  var f7open = $$(this).hasClass('swipeout-opened');
  if (!f7open) {
    $$(this).removeClass('close-open');
  }
}).on("close", '.swipeout', function() {
  $$(this).addClass('close-open');
}).on('pageAfterAnimation', function() {
  $$('.swipeout').css('background-color', 'white');
});

// swiping
$$('.like.notif-message').click(function() {
  console.log('.like.notif-message clicked');
  var fav = $$(this);
  var id = fav.attr("data-id");
  $$.ajax({
    url: "/rest/favorite/" + id,
    type: "POST",
    success: function(result) {
      console.log("result=>",result);
      if (result.length != 0) {
        myApp.getCurrentView().loadContent(result);
      } else {
        var img = fav.attr("data-img");
        myApp.addNotification({
          title: 'You like :D',
          message: 'You have Add to Favorite',
          media: '<img width="44" height="44" style="border-radius:100%" src="' + img + '">'
        });
        setTimeout(function() {
          myApp.closeNotification('.notification-item');
        }, 2000);
      }
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("xhr.status,thrownError=>", xhr.status, thrownError);
      alert("if you like this item, login please :)");
      window.location.assign("/rest/auth/facebook");
    }
  }); // end ajax
}); // end click
