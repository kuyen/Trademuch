$$("body").on("click", ".favboxa", function() {
  var delfav = $$(this);
  var id = delfav.attr("data-id");
  console.log("favboxa id=>",id);
  $$.ajax({
    url: "/rest/favorite/" + id,
    type: "DELETE",
    success: function(result) {
      console.log(result);
      delfav.children().css("color","white");
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("xhr.status,thrownError=>",xhr.status,thrownError);
      delfav.children().css("color","#ff5757");
      if(xhr.status==403){
        alert("if you like this item, login please :)");
        window.location.assign("/auth/facebook");
      }
    }
  }); // end ajax
}); // end click
