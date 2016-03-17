// $$(document).on('pageInit', '.page[data-page="postCategory"]', function(e) {

var postCategoryInit = myApp.onPageInit('postCategory', function(page) {

  myApp.hideMyToolbar();

  $$('.hobbyItem').click(function() {
    if ($$(this).find('input').prop("checked"))
      $$(this).find('input').prop("checked", false);
    else
      $$(this).find('input').prop("checked", true);

    var storedData = myApp.formToJSON('#postCategoryChoose');
    myApp.formStoreData('postCategoryChoose', storedData);

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
    // $$("a.back.link :hover").css("color", "white");

  });
});

var pageBack = myApp.onPageBack('postCategory', function(page) {

  myApp.showMyToolbar();

});
