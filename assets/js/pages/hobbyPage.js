
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

  $$('.hobbyItem').on('click', function() {
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
    nums[i] = Math.round(Math.random() * 15 + 4);
    if (i == 8) nums[i + 1] = Math.round(Math.random() * 2 + 1);
  }
  $$.each(nums, function(index, num) {
    if (num < $$('.hobbyItem').length) {
      $$('.hobbyItem')[num].click();
    }
  });
  // force click 1st item.
  $$('.hobbyItem')[0].click();

  /*hobby page back to top */

  // fade in #back-top
  $$(".page-content").scroll(function() {
    if ($$(this).scrollTop() > 100) {
      $$('#back-top').removeClass('hide');
      $$('#back-top').removeClass('fadeOut');
      $$('#back-top').addClass('fadeIn');
    } else {
      $$('#back-top').removeClass('fadeIn');
      $$('#back-top').addClass('fadeOut');
    }
  });

  // scroll body to 0px on click
  $$('#back-top').click(function() {
    $$(".page-content").scrollTop(0, 400)
  });

}); // end hobbyPage
