
$$("body").on("click", ".favboxa", function() {
  var fav = $$(this);
  var id = fav.attr("data-id");
  console.log("favboxa id=>",id);
  $$.ajax({
    url: "/rest/favorite/" + id,
    type: "POST",
    success: function(result) {
      console.log(result);
      fav.children().css("color","#ff5757");
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("xhr.status,thrownError=>",xhr.status,thrownError);
      fav.children().css("color","white");
      if(xhr.status==403){
        alert("if you like this item, login please :)");
        window.location.assign("/rest/auth/facebook");
      }
    }
  }); // end ajax
}); // end click
