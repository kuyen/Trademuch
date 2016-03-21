function NotiForFav(title, msg, img) {
  // show notification
  myApp.addNotification({
    title: title,
    message: msg,
    media: '<img width="77" height="77" style="border-radius:80%" src="' + img + '">'
  });
  setTimeout(function() {
    myApp.closeNotification('.notification-item');
  }, 2500);
} // end showNoti
