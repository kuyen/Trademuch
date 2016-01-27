//
var myApp = new Framework7({
  modalTitle: 'Framework7',
  animateNavBackIcon: true,
  template7Pages: true,
  pushState: true,
  swipeBackPage: false,
  init: false,
  imagesLazyLoadSequential: true,
  imagesLazyLoadThreshold: 50
});
window.myApp = myApp;

// Expose Internal DOM library
window.$$ = Framework7.$;

// Add main view
var mainView = myApp.addView('.view-main', {
  // Enable Dynamic Navbar for this view
  dynamicNavbar: true
});
window.mainView = mainView;


$$(document).on('pageInit pageReInit', '.page[data-page="postDetailF7"]', function(e) {

  var id = $$("input#itemId").val();
  $("#postDetailF7 > .page-content").load("/postDetail/" + id);
  $$(".back.link").on("click", function() {
    var a = document.getElementById("facebook-jssdk");
    a.parentNode.removeChild(a);
  });

});


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

  $$('.hobbyItem').click(function() {
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
    nums[i] = Math.floor(Math.random() * (18 - 4) + 1);
    if (i == 8) nums[i + 1] = Math.floor(Math.random() * 4) + 1;
  }
  $$.each(nums, function(index, num) {
    $('.hobbyItem')[num].click();
  });

  /*hobby page back to top */

  // fade in #back-top
  $(".page-content").scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#back-top').fadeIn();
    } else {
      $('#back-top').fadeOut();
    }
  });

  // scroll body to 0px on click
  $('#back-top').click(function() {
    $(".page-content").animate({
      scrollTop: 0
    }, 400);
    return false;
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
    mainView.router.loadPage('/storyDetail/' + id)
    console.log(storedData);
    // if(storedData.hobby != "" && storedData.hasOwnProperty('hobby') ) {
    //   $$('#nextSetp2').removeAttr("disabled");
    // }else{
    //   $$('#nextSetp2').attr("disabled",true);
    // }
  });
});


$$(document).on('pageInit', '.page[data-page="home"]', function(e) {
  $$(".favoriteView").click(function() {
    $("#favoriteView > .page-content").load("/favorites");
  });

  $$("a.searchView.tab-link").click(function() {
    $$("#searchView > .page-content").addClass("active");
    $$("#favoriteView  > .page-content").removeClass("active");
    $$("#profileView > .page-content").removeClass("active");
  });

  $$("a.favoriteView.tab-link").click(function() {
    $$("#favoriteView > .page-content").addClass("active");
    $$("#searchView > .page-content").removeClass("active");
    $$("#profileView > .page-content").removeClass("active");
  });

  $$("a.profileView.tab-link").click(function() {
    $$("#profileView > .page-content").addClass("active");
    $$("#searchView > .page-content").removeClass("active");
    $$("#favoritetView > .page-content").removeClass("active");
  });

  // hide Scroll bar when scroll down.
  var timer, lock = false;
  $('.page-content').delegate('.active', 'mousewheel', function(event) {
    // disable on mapView
    if ($(this).attr('id') == "mapView") return;

    if ($$(".page-content.active").offset().top <= 35) {
      if (event.originalEvent.wheelDelta > 0) {
        // console.log('Scroll up');
        scrollUp();
      } else if (event.originalEvent.wheelDelta < 0) {
        // console.log('Scroll down');
        scrollDown();
      } else {
        timer = setTimeout(function() {
          scrollUp(false);
        }, 5000);
      }
    } else scrollUp();

    function scrollUp(showBackToTopBtn) {
      if (lock) {
        lock = false;
        timer = null;
        window.myApp.showToolbar(".mainToolbar");
      }
      if (showBackToTopBtn || showBackToTopBtn == undefinded)
        if ($$(".page-content.active").offset().top >= 0) $('#back-top').fadeOut();
    } // end scrollUp

    function scrollDown() {
      if (!lock) {
        lock = true;
        timer = null;
        window.myApp.hideToolbar(".mainToolbar");
      }
      if ($$(".page-content.active").offset().top <= 0) $('#back-top').fadeIn();
    } // end scrollDown

  }); // end delegate

  $$('#back-top').click(function() {
    $(this).hide();
    $(".page-content").animate({
      scrollTop: $(".card").offset().top
    }, 2500);
    window.myApp.showToolbar(".mainToolbar");
    return false;
  });

});


$$(document).on('click', '.link.like', function() {
  var fav = $$(this);
  var id = fav.attr("data-id");
  console.log("favboxa id=>", id);
  $$.ajax({
    url: "/addUserFavorite/" + id,
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


$$(document).on('click', '.item-link', function(e) {
  console.log("item clicked");
  $$("iframe#mapView").src = $$(this).attr("data-url");
});


$$(document).on('click', '.tab-link', function(e) {
  console.log("tab-link clicked");
  $('#back-top').fadeOut()
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
