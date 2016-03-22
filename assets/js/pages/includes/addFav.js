function addFav(id, success, failed) {
  myApp.showIndicator();

  // add item to favorite list.
  $$.ajax({
    url: "/rest/favorite/" + id,
    type: "POST",
    success: function(data) {
      if (myApp.params.log) console.log("added favorite result=>", data);

      if (data.indexOf("<") == 0) {
        myApp.getCurrentView().loadContent(data);
      } else {
        var jsonData = JSON.parse(data);
        if (jsonData.result)
          if (typeof failed != "undenfined" && typeof failed == "function") success();
      }
    },
    error: function(xhr, ajaxOptions, thrownError) {
      if (typeof failed != "undenfined" && typeof failed == "function") failed();
      if (myApp.params.log) console.log("`addFav thrownError=>", xhr.status, thrownError);
      myApp.alert(" Error occurred when try to add favorite.", xhr.status);
    },
    complete: function() {
      myApp.hideIndicator();
    }
  }); // end ajax
} // end addFav

myApp.addFav = this.addFav;
