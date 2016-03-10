// disabl autoConnect to avoid error 400.
if (io.sails) io.sails.autoConnect = false;

//
var myApp = new Framework7({
  init: false,
  modalTitle: 'TradeMuch',
  template7Pages: true,
  precompileTemplates: true,
  imagesLazyLoadSequential: true,
  imagesLazyLoadThreshold: 50,
  swipeBackPage: true,
  swipeBackPageAnimateShadow: false,
  swipeBackPageAnimateOpacity: false,
  uniqueHistory: true,
  animateNavBackIcon: true,
  hideToolbarOnPageScroll: true,
  pushState: true,
  pushStateSeparator: "",
  pushStateRoot: "/app",
  debug: false,
});

// Add main view
var mainView = myApp.addView('.view-main', {
  // Enable Dynamic Navbar for this view
  dynamicNavbar: true,
  domCache: true
});

// Expose Internal DOM library
window.$$ = Framework7.$;
window.myApp = myApp;
window.mainView = mainView;

function jsLoad(href) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", href, false);
  xmlhttp.send();
  return xmlhttp.responseText;
}


$$(document).on('pageInit', '.page[data-page="hobbyPage"]', function(e) {
  console.log("hobbyPage!!!!!!!!");

  var storedData = myApp.formToJSON('#hobbySelect');
  myApp.formStoreData('hobbySelect', storedData);
  $$("#nextSetp").attr("data-context", JSON.stringify(storedData));
  //console.log($$("#nextSetp").attr("data-context"));
  if (storedData.hobby.length > 0) {
    $$('#nextSetp').removeAttr("disabled");
  } else {
    $$('#nextSetp').attr("disabled", true);
  }

  $$('.hobbyItem').on('click', function() {
    if ($$(this).find('input').prop("checked")) {
      $$(this).find('.checked').hide();
      $$(this).find('input').prop("checked", false);
    } else {
      $$(this).find('.checked').show();
      $$(this).find('input').prop("checked", true);
    }

    storedData = myApp.formToJSON('#hobbySelect');
    myApp.formStoreData('hobbySelect', storedData);
    $$("#nextSetp").attr("data-context", JSON.stringify(storedData));
    if (storedData.hobby.length > 0) {
      $$('#nextSetp').removeAttr("disabled");
    } else {
      $$('#nextSetp').attr("disabled", true);
    }
  }); // end click

  // random selection
  var nums = [];
  for (var i = 0; i <= 8; i++) {
    nums[i] = Math.round(Math.random() * 15 + 4);
    if (i == 8) nums[i + 1] = Math.round(Math.random() * 2 + 1);
  }
  $$.each(nums, function(index, num) {
    if (num < $$('.hobbyItem').length) {
      $$('.hobbyItem')[num].click();
    }
  });
  // force click 1st item.
  $$('.hobbyItem')[0].click();

  /*hobby page back to top */

  // fade in #back-top
  $$(".page-content").scroll(function() {
    if ($$(this).scrollTop() > 100) {
      $$('#back-top').removeClass('hide');
      $$('#back-top').removeClass('fadeOut');
      $$('#back-top').addClass('fadeIn');
    } else {
      $$('#back-top').removeClass('fadeIn');
      $$('#back-top').addClass('fadeOut');
    }
  });

  // scroll body to 0px on click
  $$('#back-top').click(function() {
    $$(".page-content").scrollTop(0, 400)
  });

}); // end hobbyPage


$$(document).on('pageInit', '.page[data-page="storyCategory"]', function(e) {
  $$('.hobbyItem').click(function() {
    if ($$(this).find('input').prop("checked"))
      $$(this).find('input').prop("checked", false);
    else
      $$(this).find('input').prop("checked", true);

    var storedData = myApp.formToJSON('#storyCategoryChoose');
    myApp.formStoreData('storyCategoryChoose', storedData);

    var id = $$(this).find('input').val();
    // mainView.router.loadPage('/post/create')
    mainView.router.load({
      url: "/post/create",
      reload: true,
      pushState: false,
      pushStateOnLoad: false
    });
    console.log(storedData);

    // hack <a> hover to solved #371
    $$("a.back.link :hover").css("color", "white");

  });
});

$$(document).on('pageInit', '.page[data-page="home"]', function(e) {

  setTimeout(function() {
    $$('#splash').addClass('animated fadeOut');
    setTimeout(function() {
      $$('#splash').hide();
    }, 650);
  }, 250);

  $$(".storyView.link").click(function(event) {
    mainView.router.load({
      url: "/post/create/Category",
      pushState: false,
      pushStateOnLoad: false
    });
  });

  $$(".favoriteView").click(function() {
    myApp.closeNotification('.notification-item');
    $$("#favoriteView > .page-content").html(jsLoad("/user/favorites"));
  });

  $$(".profileView").click(function() {
    myApp.closeNotification('.notification-item');
    $$("#profileView > .page-content").html(jsLoad("/user/profile"));
  });

  $$("a.searchView.tab-link").click(function() {
    myApp.closeNotification('.notification-item');
    $$("#searchView > .page-content").addClass("active");
    $$("#favoriteView  > .page-content").removeClass("active");
    $$("#profileView > .page-content").removeClass("active");
  });

  $$("a.favoriteView.tab-link").click(function() {
    myApp.closeNotification('.notification-item');
    $$("#favoriteView > .page-content").addClass("active");
    $$("#searchView > .page-content").removeClass("active");
    $$("#profileView > .page-content").removeClass("active");
  });

  $$("a.profileView.tab-link").click(function() {
    myApp.closeNotification('.notification-item');
    $$("#profileView > .page-content").addClass("active");
    $$("#searchView > .page-content").removeClass("active");
    $$("#favoritetView > .page-content").removeClass("active");
  });

  // hide Scroll bar when scroll down.
  var timer, lock = false;
  // $('.page-content').delegate('.active', 'scroll', function(event) {
  $$('.page-content').scroll(function() {

    var mapView = $$('.tab-link.active').hasClass("mapView");
    var profileView = $$('.tab-link.active').hasClass("profileView");
    var postDetailF7 = $$('.view-main').attr("data-page") == 'postDetailF7' ? true : false;

    // console.log("event.originalEvent.wheelDelta=>", event.originalEvent.target.scrollTop);
    var scrollTop = $$(this).scrollTop();

    if ($$(".page-content.active").offset().top <= 35) {
      if (scrollTop <= 94) {
        // console.log('Scroll up');
        scrollUp();
      } else if (scrollTop >= 95) {
        // console.log('Scroll down');
        scrollDown();
      } else {
        timer = setTimeout(function() {
          scrollUp(false);
        }, 3000);
      }
    } else scrollUp();

    function scrollUp() {
      if (lock) {
        lock = false;
        timer = null;
        // window.myApp.showToolbar(".mainToolbar");
      }
      var backTopBtn = $$("#back-top");
      if (backTopBtn || backTopBtn == undefinded)
        if ($$(".page-content.active").offset().top >= 0) {
          // $('#back-top').fadeOut();
          $$('#back-top').removeClass('fadeIn');
          $$('#back-top').addClass('fadeOut');
        }
    } // end scrollUp

    function scrollDown() {
      if (!lock) {
        lock = true;
        timer = null;
        // window.myApp.hideToolbar(".mainToolbar");
      }
      if ($$(".page-content.active").offset().top <= 0) {
        btnFading();
      }
      // $('#back-top').fadeIn();
    } // end scrollDown

    function btnFading() {
      // if ((!profileView && !mapView) && !postDetailF7) {
      if ((!profileView && !mapView) && !postDetailF7) {
        var toolbarState = $$('.toolbar').hasClass('toolbar-hidden');
        // console.log(toolbarState);
        if (toolbarState) {
          // $('#back-top').fadeOut();
          $$('#back-top').removeClass('fadeIn');
          $$('#back-top').addClass('fadeOut');
        } else {
          // $('#back-top').fadeIn();
          $$('#back-top').show();
          $$('#back-top').removeClass('fadeOut');
          $$('#back-top').addClass('fadeIn');
        }
      }
    } // end btnFading

  }); // end delegate

  function jsScrollTop(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - element.scrollTop();
    var perTick = difference / duration * 10;

    setTimeout(function() {
      element.scrollTop(element.scrollTop() + perTick);
      $$('#back-top').hide()
      if (element.scrollTop() === to) return;
      jsScrollTop(element, to, duration - 10);
    }, 10);
  }

  $$('#back-top').click(function() {
    $$(this).hide();
    jsScrollTop($$(".page-content"), $$(".card").offset().top, 400);
    // $(".page-content").animate({
    //   scrollTop: $$(".card").offset().top
    // }, 400);
    window.myApp.showToolbar(".mainToolbar");
    return false;
  });

  $$(document).on('click', '.like.notif-message', function() {
    var fav = $$(this);
    var id = fav.attr("data-id");
    var img = fav.attr("data-img");
    myApp.addNotification({
      title: 'You like :D',
      message: 'You have Add to Favorite',
      media: '<img width="44" height="44" style="border-radius:100%" src="' + img + '">'
    });
    setTimeout(function() {
      myApp.closeNotification('.notification-item');
    }, 2000);
    $$.ajax({
      url: "/rest/favorite/" + id,
      type: "POST",
      success: function(result) {
        console.log(result);
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.log("xhr.status,thrownError=>", xhr.status, thrownError);
        alert("if you like this item, login please :)");
        window.location.assign("/rest/auth/facebook");
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

  $$(document).on('click', '.deletePost', function() {
    var delPost = $$(this);
    var id = delPost.attr("data-id");
    var li = $$(this).parents('li');
    myApp.confirm('Are you sure?', function() {
      $$.ajax({
        url: "/rest/post/" + id,
        type: "DELETE",
        success: function(result) {
          console.log(result);
          myApp.swipeoutDelete(li)
        },
        error: function(xhr, ajaxOptions, thrownError) {
          console.log("xhr.status,thrownError=>", xhr.status, thrownError);
          alert("if you delete  post, login please :)");
          window.location.assign("/auth/facebook");
        }
      }); // end ajax
    });
  });

  // $$("#search-result").on('click', '.swipeout', function(event) {
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
        mainView.router.load({
          url: '/post/' + $$(this).attr("data-id"),
          ignoreCache: true
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

}); // end page home

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

// $$(document).on('click', '.item-link', function(e) {
//   console.log("item clicked");
//   $$("iframe#mapView").src = $$(this).attr("data-id");
// });


$$(document).on('click', '.tab-link', function(e) {
  console.log("tab-link clicked");

  $$('#back-top').hide();
});


// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
$$(document).on('ajaxStart', function(e) {
  window.myApp.showIndicator();
});
$$(document).on('ajaxComplete', function() {
  window.setTimeout(function() {
    window.myApp.hideIndicator();
  }, 500);
});


/* ===== Change statusbar bg when panel opened/closed ===== */
$$('.panel-left').on('open', function() {
  $$('.statusbar-overlay').addClass('with-panel-left');
});
$$('.panel-right').on('open', function() {
  $$('.statusbar-overlay').addClass('with-panel-right');
});
$$('.panel-left, .panel-right').on('close', function() {
  $$('.statusbar-overlay').removeClass('with-panel-left with-panel-right');
});

myApp.init();

function getCookie(name) {
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null) return unescape(arr[2]);
  return null;
}

function setCookie(name, value) {
  //var Days = 1; //default one day
  //var exp  = new Date();
  //exp.setTime(exp.getTime() + Days*24*60*60*1000);
  document.cookie = name + "=" + escape(value) + "; path=/";
}