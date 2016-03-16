
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
      pushStateOnLoad: false,
    });
    console.log(storedData);

    // hack <a> hover to solved #371
    $$("a.back.link :hover").css("color", "white");

  });
});
