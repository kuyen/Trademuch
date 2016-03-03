// when page onload
myApp.onPageBack('chat', function(page) {
  console.log("onPageBeforeRemove=>", page);

  offline(postId);
});

window.onbeforeunload = function() {

  offline(postId);
  myApp.alert("別離開我");
}

function offline(postId) {
  // reassemble post id
  var postId = window.location.pathname.split("/")[3];
  // listen event join
  io.socket.on('leave', function(msg) {
    console.log('leave =>', msg);
  });
  //leave
  io.socket.delete('/room/' + postId + '/users', function(body, sailsResponseObject) {
    console.log('Sails responded with: ', body);
    console.log('and with status code: ', sailsResponseObject.statusCode);
  });
}

// when page loaded
myApp.onPageAfterAnimation('chat', function(page) {
  // "page" variable contains all required information about loaded and initialized page
  console.log("onPageAfterAnimation=>", page);

  // reassemble post id
  var postId = window.location.pathname.split("/")[3];

  // bind enter key to input box
  $$("textarea").on("keydown", function(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      $$(".messagebar .link").click();
    }
  });

  // create or join an exists room.
  io.socket.post('/room/' + postId + '/users', function(body, sailsResponseObject) {
    console.log('Sails responded with: ', body);
    console.log('and with status code: ', sailsResponseObject.statusCode);
  });

  // listen event join
  io.socket.on('join', function(msg) {
    console.log('join =>', msg)
    initMessager(page);
  });

  // received
  io.socket.on('public', function(data) {
    console.log('public =>', data)
    console.log('public =>', data.msg)
    console.log('public =>', data.from.fbId)

    // Init Messages
    var myMessages = myApp.messages('.messages', {
      autoLayout: true
    });

    // Add message
    myMessages.addMessage({
      // Message text
      text: data.msg,
      // Random message type
      type: "received",
      // Avatar and name:
      avatar: '//graph.facebook.com/' + data.from.fbId + '/picture?type=large',
      name: data.from.fullName,
      // Day
      day: !conversationStarted ? 'Today' : false,
      time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
    });

    // Update conversation flag
    conversationStarted = true;

  });

});

function loadHistoryMsgs(page) {
  // Add message
  myMessages.addMessage({
    // Message text
    text: msg.chat.content,
    // Random message type
    type: "received",
    // Avatar and name:
    avatar: '//graph.facebook.com/' + body.user.fbId + '/picture?type=large',
    name: msg.user.fullName,
    // Day
    day: !conversationStarted ? 'Today' : false,
    time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
  });
}

function initMessager(page) {

  // Conversation flag
  var conversationStarted = false;

  // Init Messages
  var myMessages = myApp.messages('.messages', {
    autoLayout: true
  });

  // Init Messagebar
  var myMessagebar = myApp.messagebar('.messagebar');

  // Handle message
  $$('.messagebar .link').on('click', function() {
    // Message text
    var messageText = myMessagebar.value().trim();
    // Exit if empy message
    if (messageText.length === 0) return;

    // Empty messagebar
    myMessagebar.clear()

    // Random message type
    // var messageType = (['sent', 'received'])[Math.round(Math.random())];

    // Avatar and name for received message
    // var avatar, name;
    // if (messageType === 'received') {
    //   avatar = 'http://lorempixel.com/output/people-q-c-100-100-9.jpg';
    //   name = 'Kate';
    // }

    var postId = window.location.pathname.split("/")[3];

    //public
    io.socket.post('/chat/' + postId + '/public', {
        'content': messageText
      },
      function(body, sailsResponseObject) {
        console.log('Sails responded with: ', body);
        console.log('and with status code: ', sailsResponseObject.statusCode);

        // Add message
        myMessages.addMessage({
          // Message text
          text: messageText,
          // Random message type
          // type: "received",
          type: "sent",
          // Avatar and name:
          avatar: '//graph.facebook.com/' + body.user.fbId + '/picture?type=large',
          name: body.user.fullName,
          // Day
          day: !conversationStarted ? 'Today' : false,
          time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
        })

        // Update conversation flag
        conversationStarted = true;

      });

  }); // end click

}
