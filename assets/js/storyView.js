////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// story page - storyView
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

myApp.onPageAfterAnimation('storyMode', function(page) {
  console.log('Services page initialized');
  console.log(page);
  $$('.back.link').click(function(e) {
    // e.preventDefault();
    mainView.router.loadPage('/main', {
      "pushState": true
    })
  }); // end click
});



// give/take mode select
$$(document).on('pageInit', '.page[data-page="storyMode"]', function(e) {

  $$('.selectMode').click(function() {
    if ($$(this).find('input').prop("checked")) {
      $$(this).find('input').prop("checked", false);
    } else {
      $$(this).find('input').prop("checked", true);
    }
    var storedData = myApp.formToJSON('#storyModeChoose');
    myApp.formStoreData('storyModeChoose', storedData);

    mainView.router.loadPage('/storyCategory');
      // if(storedData.mode != ""  && storedData.hasOwnProperty('mode')) {
      //   $$('#nextSetp').removeAttr("disabled");
      // }else{
      //   $$('#nextSetp').attr("disabled",true);
      // }
  }); // end click


});

$$(document).on('pageInit pageReInit', '.page[data-page="storyDetail"]', function(e) {

  // init f7-calendar
  var now = new Date();
  // set a range time picker
  var calendarPostPeriod = myApp.calendar({
    input: '#calendar-postPeriod',
    rangePicker: true,
    closeOnSelect: true,
    disabled: function(date) {
      // enable today
      if (date.getFullYear() == now.getFullYear() &&
        date.getMonth() == now.getMonth() &&
        date.getDate() == now.getDate()) {
        return false;
      }
      // only enable future time
      if (date.getTime() < now.getTime()) {
        return true;
      } else {
        return false;
      }
    },
  });

  // if no hobby...
  var category = myApp.formGetData('storyCategoryChoose');
  if (!category) {
    mainView.router.loadPage('/storyCategory');
    return false;
  }
  console.log("category=>", category);

  // if no mode
  var postMode = myApp.formGetData('storyModeChoose');
  if (!postMode) {
    mainView.router.loadPage('/story');
    return false;
  }
  console.log("postMode=>", postMode);

  // category selects
  $$('.radioItem').click(function() {
    $$('.checked').hide();
    $$("input[name='item']").val("");
    if ($$(this).find('input').prop("checked")) {
      $$(this).find('.checked').hide();
      $$(this).find('input').prop("checked", false);
    } else {
      $$(this).find('.checked').show();
      $$(this).find('input').prop("checked", true);
    }

    var storedData = myApp.formToJSON('#storyDetailChoose');
    myApp.formStoreData('storyDetailChoose', storedData);
    console.log("storedData=>", storedData);
  });

  $$("input[name='item']").on('change', function() {
    var radioItem = $$("input[name='radioItem']");
    radioItem.prop("checked", false);
    $$('.checked').hide();
    var item = $$("input[name='item']").val();
    var storedData = myApp.formToJSON('#storyDetailChoose');
    myApp.formStoreData('storyDetailChoose', storedData);
  });

  $$("input[name='title']").on('input', function() {
    var storedData = myApp.formToJSON('#storyDetailChoose');
    myApp.formStoreData('storyDetailChoose', storedData);

    // save title input to itemname at this version.
    $$("input[name='item']").val($$(this).val());
  });

  $$("textarea[name='content']").on('input', function() {
    var storedData = myApp.formToJSON('#storyDetailChoose');
    myApp.formStoreData('storyDetailChoose', storedData);
  });

  $$("input[name='image']").on('change', function() {
    var storedData = myApp.formToJSON('#storyDetailChoose');
    myApp.formStoreData('storyDetailChoose', storedData);
  });

  $$("input[name='price']").on('input', function() {
    var storedData = myApp.formToJSON('#storyDetailChoose');
    myApp.formStoreData('storyDetailChoose', storedData);
  });

  $$("input[name='postPeriod']").on('click', function() {
    $$(this).val("");
    cleanQuickDatePickerState();
  });

  $$("input[name='postPeriod']").on('change', function() {
    var storedData = myApp.formToJSON('#storyDetailChoose');
    myApp.formStoreData('storyDetailChoose', storedData);
    console.log("period=>", $(this).val());
  });

  // posting period qucick picker
  $$(".quickDatePickArea > .col-auto > .button-round").on('click', function(e) {
    var value = $$(this).attr('data-value');
    if (value == "pick") {
      // show f7 date picker
      $$("#calendar-postPeriod").click();
      return;
    } else {
      var now = new Date();
      var yy = parseInt(now.getFullYear());
      var mm = parseInt(now.getMonth() + 1);
      var dd = parseInt(now.getDate());
      var detail = value.split("-");
      var count = parseInt(detail[0]);
      var unit = detail[1];
      var startDate = yy + "-" + mm + "-" + dd;

      if (unit == "m") {
        mm += count;
        if (mm > 12) {
          yy += Math.floor(mm / 12);
          mm = mm % 12;
        } else if (mm < 10) mm = "0" + mm;
      }
      if (unit == "w" || unit == "d") {
        if (unit == "w") dd += count * 7;
        if (unit == "d") dd += count;
        var lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        if (dd > lastDay) {
          console.log("dd=>", dd);
          console.log("lastDay=>", lastDay);
          if (dd >= lastDay) {
            mm += Math.floor(dd / lastDay);
            dd = dd % lastDay;
          }
        }
      }
      var endDate = yy + "-" + mm + "-" + dd;
      $$("#calendar-postPeriod").val(startDate + " - " + endDate);
    }
    // clean state first.
    cleanQuickDatePickerState();
    // give the one be clicked new state.
    $$(this).addClass('suggestClicked');
  }); // end click

  function cleanQuickDatePickerState() {
    // reset click state
    var length = $$(".quickDatePickArea > .col-auto > .button-round").length;
    for (var i = 0; i <= length; i++) {
      $$($$(".quickDatePickArea > .col-auto > .button-round")[i]).removeClass('suggestClicked');
    }
  } // end cleanQuickDatePickerState


  $$(document).on('click', '#finishStep', function(e) {
    // {"mode":"give","hobby":"1","detail":{"title":"123","radioItem":"2","item":""},
    // "location":{"latitude":24.148657699999998,"longitude":120.67413979999999,"accuracy":30}}
    e.preventDefault();

    myApp.showIndicator();

    var postMode = myApp.formGetData('storyModeChoose');
    var category = myApp.formGetData('storyCategoryChoose');
    var detail = myApp.formGetData('storyDetailChoose');

    var data = {};
    data.mode = postMode == undefined ? null : postMode.mode;
    data.hobby = category == undefined ? null : category.hobby;
    data.detail = detail;

    // posting mode
    if (!data.mode || data.mode == null) {
      myApp.hideIndicator();
      mainView.router.loadPage('/story');
      return false;
    }

    // post title
    if (!data.detail || (!data.detail.title || data.detail.title == "")) {
      myApp.hideIndicator();
      myApp.alert("Don't forget to enter a nice title :)", "Oops!");
      return false;
    }

    // post price
    // if (!data.detail.price || data.detail.price == "") {
    //   myApp.hideIndicator();
    //   myApp.alert("Please give your item/service a nice price :)", "Oops!")
    //   return false;
    // }

    // post category
    // var customCategory = $$("input[name='item']").val();
    // if ( !data.detail.radioItem && customCategory == "" ) {
    //   myApp.hideIndicator();
    //   myApp.alert("Please select a category or enter a new one. :)", "Oops!");
    //   return false;
    // }

    // post date period
    // By default give today to startDate if use hasn't selsect period.
    if (!data.detail.startDate || data.detail.startDate == undefined) {
      // get value
      var datePickerValue = $$("#calendar-postPeriod").val();

      if (!datePickerValue || datePickerValue == undefined) {
        var now = new Date();
        data.detail.startDate = "" + now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate();
      } else {
        // re-assembling date period field.
        data.detail.startDate = "" + $$("#calendar-postPeriod").val().split(" - ")[0];
        data.detail.endDate = "" + $$("#calendar-postPeriod").val().split(" - ")[1];
      }
    }
    console.log("data.detail.startDate=>", data.detail.startDate);

    /*---------------------- get user location ----------------------*/
    var location = {};
    navigator.geolocation.getCurrentPosition(
      getLocSuccess,
      getLocError,
      options);

    var options = {
      enableHighAccuracy: true,
      timeout: 2500,
      maximumAge: 2500
    };

    // if html5 geo api works then submit.
    function getLocSuccess(loc) {
      console.log("html5 location=>", loc);
      location = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        accuracy: loc.coords.accuracy
      }
      data.location = location;
      submit();
    } // end GetLocationAndSubmit

    // if html5 geo api failed then use geoIp for instead.
    function getLocError(err) {

      $$.ajax({
        url: 'http://ip-api.com/json/',
        type: 'POST',
        dataType: 'jsonp',
        success: function(loc) {
          var geoip = JSON.parse(loc);
          console.log("geoip location=>", geoip);
          location = {
            latitude: geoip.lat,
            longitude: geoip.lon,
            accuracy: 500
          }
          data.location = location;
          submit();
        },
        error: function(err) {
          // todo
          // if get geoip's data failed then give a default loaciotn from user setting.
        }
      }); // end ajax

    } // end error

    // submit depends on image upload.
    function submit() {
      var imageCount = $("input.uploadBtn").get(0).files.length;
      if ((imageCount != null) && (imageCount > 0)) {
        console.log("saveImagesAndPost");
        saveImagesAndPost(data);
      } else {
        console.log("saveOnlyPost");
        savePost(data);
      }
    }; // end submit

    function savePost(data) {
      console.log("data before submit=>", (data));
      // save post
      $$.ajax({
        url: "/postStory",
        type: "POST",
        data: data,
        success: function(result) {
          console.log(result);
          myApp.formDeleteData('storyModeChoose');
          myApp.formDeleteData('storyCategoryChoose');
          myApp.formDeleteData('storyDetailChoose');
          // window.location.href = '/main';
          myApp.hideIndicator();
        },
        error: function(xhr, ajaxOptions, thrownError) {
          myApp.hideIndicator();
          myApp.alert('Due to internet connection issues, please try again later or check you GPS status. thank you.', 'Error');
          console.log(xhr.status);
          console.log(thrownError);
        }
      }); // end ajax
    }; // end savePost

    function saveImagesAndPost(data) {
      console.log("data before submit=>", (data));
      // submit to upload post image.
      var formData = new FormData($('form[id="storyImageUpload"]')[0]);
      $$.ajax({
        url: "/api/uploadImageBase64",
        type: "POST",
        dataType: "JSON",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function(result) {
          var saveResult = JSON.parse(result);
          console.log("save image finish.->", saveResult);
          console.log("result[0].src->", saveResult[0].src);
          data.images = saveResult[0].src;
          savePost(data);
        },
        error: function(xhr, ajaxOptions, thrownError) {
          myApp.hideIndicator();
          var msg = 'upload image failed. please try it again.(' + xhr.status + ')';
          myApp.alert(msg, 'Error');
          console.log(xhr.status);
        }
      }); // end ajax
    }; // end saveImages
  }); // end finishStep-click

  // default clcik this date period
  setTimeout(function() {
    $$("a[data-value='1-m']").click();
  }, 200);

}); // end pageInit-storyDetail


// post's image-fileinput(use jquery only)
$(function() {

  // using delegate to support multi-fileinput
  $(document).delegate("input[name='image']", "change", function() {
    var input = $(this);

    // shows count
    $("div.fileUpload-btn > span").text("upload a photo(" + input.get(0).files.length + ")");
    var img = document.createElement("img");

    // show wrapper
    $(".canvasWrapper").show();

    // preview selected pic.
    var reader = new FileReader(input);
    var canvas = document.getElementById('viewport');
    var ctx = canvas.getContext('2d');

    reader.onload = function(e) {

      var img = new Image();
      img.onload = function() {
        canvas.width = img.width * 0.25;
        canvas.height = img.height * 0.25;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        var jpegBase64 = canvas.toDataURL("image/jpeg");

        console.log('=== jpegBase64 ===', jpegBase64);
        $('img.preview').attr('src', e.target.result);
        $("input[name='picBase64']").val(jpegBase64);
      }
      if (event.target.result) img.src = event.target.result;

    }
    if (input.get(0).files[0] != null) reader.readAsDataURL(input.get(0).files[0]);

  }); // end fileUpload

});
