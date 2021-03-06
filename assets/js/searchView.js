////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// main page - searchView
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

$(document).ready(function(e) {

  $("select[name='category']").focus(function() {
    $(this).css("background-color", "#ecf5ff");
  });
  $("select[name='category']").blur(function() {
    $(this).css("background-color", "#ffffff");
  });

  $$(".categories .button").click(function() {
    var keyword = $$(this).attr('data-keyword');
    $(".searchbar-input > input").val(keyword);
    // reset click state
    var length = $$(".categories > .button").length;
    for (var i = 0; i <= length; i++) {
      $($(".categories > .button")[i]).removeClass('suggestClicked');
    }
    // give the one be clicked new state.
    $(this).addClass('suggestClicked');
    goSearch(keyword);
  });

  $$("#formSearch").on('submit', function(e) {
    e.preventDefault();
    var keyword = $(".searchbar-input > input").val();
    if (keyword) {
      goSearch(keyword);
    } else {
      window.myApp.alert("Don't forget to type something!");
    }
  }); // end submit

}); // end ready

function goSearch(keyword) {
  $$.ajax({
    url: "/search/" + keyword,
    type: "GET",
    success: function(result) {
      var data = JSON.parse(result);
      console.log(data[0]);
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
