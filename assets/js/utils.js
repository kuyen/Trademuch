// load page
function jsLoad(href) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", href, false);
  xmlhttp.send();
  return xmlhttp.responseText;
}

//
function getCookie(name) {
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null) return unescape(arr[2]);
  return null;
}

//
function setCookie(name, value) {
  //var Days = 1; //default one day
  //var exp  = new Date();
  //exp.setTime(exp.getTime() + Days*24*60*60*1000);
  document.cookie = name + "=" + escape(value) + "; path=/";
}

// console print debug messages
function pluginLog(tag, msg, objs) {
  if (myApp.params.log) {
    var name = tag.name;
    var color = tag.color;
    switch (color) {
      case 0:
        color = 'background:#323131; color: #3eb4ff';
        break;
      case 1:
        color = 'background:#323131; color: #ec9500';
        break;
      case 2:
        color = 'background:#323131; color: #c73eff';
        break;
      case 3:
        color = 'background:#323131; color: #3eff46';
        break;
      case 4:
        color = 'background:#323131; color: #e3195c';
        break;
      case 5:
        color = 'background:#323131; color: #d0ff12';
        break;
      case 6:
        color = 'background:#323131; color: #097178';
        break;
      case 7:
        color = 'background:#323131; color: #5e12ff';
        break;
      default:
        color = 'background:#323131; color: #fbfbfb';
    }
    if (objs)
      console.log(" | %c`%s`%c: %s.", color, name, 'color: #000000', msg, objs);
    else
      console.log(" | %c`%s`%c: %s.", color, name, 'color: #000000', msg);
  }
}
