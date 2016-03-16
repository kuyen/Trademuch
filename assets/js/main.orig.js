//
// // $$(document).on('pageInit', '.page[data-page="main"]', function(e) {
//
// // In page events:
// $$(document).on('pageInit', function (e) {
//   // Page Data contains all required information about loaded and initialized page
//   var page = e.detail.page;
//
//   if(page.name=="main"){
//     setTimeout(function() {
//       $$('#splash').addClass('animated fadeOut');
//       setTimeout(function() {
//         $$('#splash').hide();
//       }, 650);
//     }, 250);
//   }
//
// })
//
//
// myApp.onPageInit('main', function (page) {
//
//   setTimeout(function() {
//     $$('#splash').addClass('animated fadeOut');
//     setTimeout(function() {
//       $$('#splash').hide();
//     }, 650);
//   }, 250);
//
//   // $$(".storyView.link").click(function(event) {
//   //   mainView.router.load({
//   //     url: "/post/create/Category",
//   //     reload: true,
//   //     pushState: false,
//   //     pushStateOnLoad: false,
//   //   });
//   // });
//
//   $$(".favoriteView").click(function() {
//     myApp.closeNotification('.notification-item');
//     $$("#favoriteView > .page-content").html(jsLoad("/user/favorites"));
//   });
//
//   $$(".profileView").click(function() {
//     myApp.closeNotification('.notification-item');
//     $$("#profileView > .page-content").html(jsLoad("/user/profile"));
//   });
//
//   // $$("a.searchView.tab-link").click(function() {
//   //   myApp.closeNotification('.notification-item');
//   //   $$("#searchView > .page-content").addClass("active");
//   //   $$("#favoriteView  > .page-content").removeClass("active");
//   //   $$("#profileView > .page-content").removeClass("active");
//   // });
//   //
//   // $$("a.favoriteView.tab-link").click(function() {
//   //   myApp.closeNotification('.notification-item');
//   //   $$("#favoriteView > .page-content").addClass("active");
//   //   $$("#searchView > .page-content").removeClass("active");
//   //   $$("#profileView > .page-content").removeClass("active");
//   // });
//   //
//   // $$("a.profileView.tab-link").click(function() {
//   //   myApp.closeNotification('.notification-item');
//   //   $$("#profileView > .page-content").addClass("active");
//   //   $$("#searchView > .page-content").removeClass("active");
//   //   $$("#favoritetView > .page-content").removeClass("active");
//   // });
//
//   $$(document).on('click', '.like.notif-message', function() {
//     var fav = $$(this);
//     var id = fav.attr("data-id");
//     var img = fav.attr("data-img");
//     myApp.addNotification({
//       title: 'You like :D',
//       message: 'You have Add to Favorite',
//       media: '<img width="44" height="44" style="border-radius:100%" src="' + img + '">'
//     });
//     setTimeout(function() {
//       myApp.closeNotification('.notification-item');
//     }, 2000);
//     $$.ajax({
//       url: "/rest/favorite/" + id,
//       type: "POST",
//       success: function(result) {
//         console.log(result);
//       },
//       error: function(xhr, ajaxOptions, thrownError) {
//         console.log("xhr.status,thrownError=>", xhr.status, thrownError);
//         alert("if you like this item, login please :)");
//         window.location.assign("/rest/auth/facebook");
//       }
//     }); // end ajax
//   });
//
//   $$(document).on('click', '.deletelike.notif-message.swipeout-delete', function() {
//     var delfav = $$(this);
//     var id = delfav.attr("data-id");
//     var img = delfav.attr("data-img");
//     myApp.addNotification({
//       title: 'You delete :(',
//       message: 'You have delete to Favorite',
//       media: '<img width="44" height="44" style="border-radius:100%" src="' + img + '">'
//     });
//     setTimeout(function() {
//       myApp.closeNotification('.notification-item');
//     }, 2000);
//     $$.ajax({
//       url: "/rest/favorite/" + id,
//       type: "DELETE",
//       success: function(result) {
//         console.log(result);
//       },
//       error: function(xhr, ajaxOptions, thrownError) {
//         console.log("xhr.status,thrownError=>", xhr.status, thrownError);
//         alert("if you like this item, login please :)");
//         window.location.assign("/auth/facebook");
//       }
//     }); // end ajax
//   });
//
//   $$(document).on('click', '.deletePost', function() {
//     var delPost = $$(this);
//     var id = delPost.attr("data-id");
//     var li = $$(this).parents('li');
//     myApp.confirm('Are you sure?', function() {
//       $$.ajax({
//         url: "/rest/post/" + id,
//         type: "DELETE",
//         success: function(result) {
//           console.log(result);
//           myApp.swipeoutDelete(li)
//         },
//         error: function(xhr, ajaxOptions, thrownError) {
//           console.log("xhr.status,thrownError=>", xhr.status, thrownError);
//           alert("if you delete  post, login please :)");
//           window.location.assign("/auth/facebook");
//         }
//       }); // end ajax
//     });
//   });
//
//   // $$("#search-result").on('click', '.swipeout', function(event) {
//   $$(document).on('click', '.swipeout', function(event) {
//     var f7open = $$(this).hasClass('swipeout-opened');
//     var closeOpen = $$(this).hasClass('close-open');
//     if (!f7open) {
//       if (closeOpen) {
//         $$(this).removeClass('close-open');
//         console.log("不動");
//       } else {
//         console.log("跳轉");
//         $$(this).css('background-color', 'rgb(169, 208, 247)');
//         // $('#back-top').fadeOut();
//         $$('#back-top').removeClass('fadeIn')
//         $$('#back-top').addClass('fadeOut')
//         viewSearch.router.load({
//           url: '/post/' + $$(this).attr("data-id"),
//           ignoreCache: true,
//         });
//       }
//     }
//   }).on("touchend", '.swipeout', function() {
//     var f7open = $$(this).hasClass('swipeout-opened');
//     if (!f7open) {
//       $$(this).removeClass('close-open');
//     }
//   }).on("close", '.swipeout', function() {
//     $$(this).addClass('close-open');
//   }).on('pageAfterAnimation', function() {
//     $$('.swipeout').css('background-color', 'white');
//   });
//
// }); // end page main
