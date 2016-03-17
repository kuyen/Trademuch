(function() {
  Framework7.prototype.plugins.searchView = function(app, params) {
    // exit if not enabled
    if (!params) return;

    var tag = {
      name: 'searchView',
      color: 5
    };
    pluginLog(tag, 'loaded');

    return {
      hooks: {
        appInit: function() {
          // appInit();
        },
        pageBeforeInit: function(pageData) {
          // if (pageData.name == "search") pageBeforeInit(pageData);
        },
        pageInit: function(pageData) {
          if (pageData.name == "search") pageInit(pageData);
        },
        pageBeforeRemove: function(pageData) {
          // if (pageData.name == "search") pageBeforeRemove(pageData);
        },
      } // end hooks
    };
  };

  //
  function pageInit(pageData) {
    // $$("#search-btn").click(function(e) {
    //   e.preventDefault();
    //   // window.myApp.showIndicator();
    //   var keyword = $(".searchbar-input > input").val();
    //   if (keyword) {
    //     goSearch(keyword);
    //   } else {
    //     // window.myApp.alert("Don't forget to type something!")
    //   }
    // }); // end click

    // $$(document).on('click',"a.backTop", function(e) {
    //   $$("div.page-content").scrollTop(0)
    // }); // end click

    // $(document).ready(function(e) {
    //
    // }); // end ready

    // $$("select[name='category']").focus(function() {
    //   $$(this).css("background-color", "#ecf5ff");
    // });
    // $$("select[name='category']").blur(function() {
    //   $$(this).css("background-color", "#ffffff");
    // });

    $$(".categories .button").click(function() {
      var keyword = $$(this).attr('data-keyword');
      $$(".searchbar-input > input").val(keyword);
      // reset click state
      var length = $$(".categories > .button").length;
      for (var i = 0; i <= length; i++) {
        $$($$(".categories > .button")[i]).removeClass('suggestClicked');
      }
      // give the one be clicked new state.
      $$(this).addClass('suggestClicked');
      goSearch(keyword);
    });

    $$("#formSearch").on('submit', function(e) {
      e.preventDefault();
      var keyword = $$(".searchbar-input > input").val();
      if (keyword) {
        goSearch(keyword);
      } else {
        window.myApp.alert("Don't forget to type something!");
      }
    }); // end submit


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
  }


  function goSearch(keyword) {
    $$.ajax({
      url: "/rest/post/search/" + keyword,
      type: "GET",
      success: function(result) {
        var data = JSON.parse(result);
        console.log("goSearch(keyword:%s)=>%o", keyword, data);
        showSearchResult(data);
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.log("xhr.status,thrownError=>", xhr.status, thrownError);
        if (xhr.status == 403) {
          // to-do print it out
        }
      }
    }); // end ajax
  }; // end goSearch

  function showSearchResult(data) {
    console.log("f7 showSearchResult=>", data);
    var searchResultTemplate = $$('script#searchResult').html();
    var compiledSearchResultTemplate = Template7.compile(searchResultTemplate);
    // window.myApp.template7Data.searchResult = data;
    $$('#search-result').html(compiledSearchResultTemplate(data));
  }; // end search-result
})();
