////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// main page - favoriteView
//////////////////////////////////////////////
$$(document).on('click', 'a.favoriteView', function(e) {
  // var loginState = $(this).attr("data-login");
  // if (loginState=="false") {
  //   myApp.hideIndicator();
  //   mainView.router.loadPage('/story');
  // }
});


$$(".favoriteView").click(function() {
  myApp.closeNotification('.notification-item');
  $$("#favoriteView > .page-content").html(jsLoad("/user/favorites"));
});


$$(document).on('click', '.link.like', function() {
  var fav = $$(this);
  var id = fav.attr("data-id");
  console.log("favboxa id=>", id);
  $$.ajax({
    url: "/rest/favorite/" + id,
    type: "POST",
    success: function(result) {
      console.log(result);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("xhr.status,thrownError=>", xhr.status, thrownError);
      mainView.router.loadPage('/story');
    }
  }); // end ajax
});

$$(document).on('click', '.deletelike.notif-message.swipeout-delete', function() {
  var delfav = $$(this);
  var id = delfav.attr("data-id");
  var img = delfav.attr("data-img");
  myApp.addNotification({
    title: 'You delete :(',
    message: 'You have delete to Favorite',
    media: '<img width="44" height="44" style="border-radius:100%" src="' + img + '">'
  });
  setTimeout(function() {
    myApp.closeNotification('.notification-item');
  }, 2000);
  $$.ajax({
    url: "/rest/favorite/" + id,
    type: "DELETE",
    success: function(result) {
      console.log(result);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("xhr.status,thrownError=>", xhr.status, thrownError);
      alert("if you like this item, login please :)");
      window.location.assign("/auth/facebook");
    }
  }); // end ajax
});


$$("body").on("click", ".favboxa", function() {
  var fav = $$(this);
  var id = fav.attr("data-id");
  console.log("favboxa id=>", id);
  $$.ajax({
    url: "/rest/favorite/" + id,
    type: "POST",
    success: function(result) {
      console.log(result);
      fav.children().css("color", "#ff5757");
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("xhr.status,thrownError=>", xhr.status, thrownError);
      fav.children().css("color", "white");
      if (xhr.status == 403) {
        alert("if you like this item, login please :)");
        window.location.assign("/rest/auth/facebook");
      }
    }
  }); // end ajax
}); // end click
