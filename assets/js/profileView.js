
$$("#profileView").on('click', '.swipeout', function(event) {
  var f7open = $$(this).hasClass('swipeout-opened');
  var closeOpen = $$(this).hasClass('close-open');
  if (!f7open) {
    if (closeOpen) {
      $$(this).removeClass('close-open');
      console.log("不動");
    } else {
      console.log("跳轉");
      $$(this).css('background-color', 'rgb(169, 208, 247)');
      // $('#back-top').fadeOut();
      $$('#back-top').removeClass('fadeIn')
      $$('#back-top').addClass('fadeOut')
      mainView.router.load({
        url: '/post/f7/' + $$(this).attr("data-id"),
        ignoreCache: true
      });
    }
  }
}).on("touchend", '.swipeout', function() {
  var f7open = $$(this).hasClass('swipeout-opened');
  if (!f7open) {
    $$(this).removeClass('close-open');
  }
}).on("close", '.swipeout', function() {
  $$(this).addClass('close-open');
});
