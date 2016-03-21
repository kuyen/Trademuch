function deleteFav(id,success) {
  myApp.showIndicator();

  // delete item from favorite list.
  $$.ajax({
    url: "/rest/favorite/" + id,
    type: "DELETE",
    success: function(data) {
      var jsonData = JSON.parse(data);
      if(myApp.params.log) console.log("deleted favorite result=>", jsonData);
      if (!jsonData.result) {
        myApp.getCurrentView().loadContent(result);
      } else {
        success();
      }
    },
    error: function(xhr, ajaxOptions, thrownError) {
      $$(".favboxa").children().css("color", favErrColor);
      if(myApp.params.log) console.log("deleteFav: thrownError=>", xhr.status, thrownError);
      myApp.alert(" Error occurred when try to add favorite.", xhr.status);
    },
    complete: function() {
      myApp.hideIndicator();
    }
  }); // end ajax
} // end deleteFav
