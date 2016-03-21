function addFav(id, success) {
  myApp.showIndicator();

  // add item to favorite list.
  $$.ajax({
    url: "/rest/favorite/" + id,
    type: "POST",
    success: function(data) {
      var jsonData = JSON.parse(data);
      if(myApp.params.log) console.log("added favorite result=>", jsonData);
      if (!jsonData.result) {
        myApp.getCurrentView().loadContent(result);
      } else {
        success();
      }
    },
    error: function(xhr, ajaxOptions, thrownError) {
      $$(".favboxa").children().css("color", favErrColor);
      if(myApp.params.log) console.log("`addFav thrownError=>", xhr.status, thrownError);
      myApp.alert(" Error occurred when try to add favorite.", xhr.status);
    },
    complete: function() {
      myApp.hideIndicator();
    }
  }); // end ajax
} // end addFav
