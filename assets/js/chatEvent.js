// when page onload
myApp.onPageBack('chat', function(page) {
  console.log("onPageBeforeRemove=>", page);
  offline();
});

window.onbeforeunload = function() {
  offline();
}

function offline() {
  conversationStarted = false;
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

// // before page fully loaded
// myApp.onPageInit('chat', function(page) {
//   window.myApp.showIndicator();
//   myApp.showIndicator();
// });
// // before page fully loaded
// myApp.onPageBeforeInit('chat', function(page) {
//   window.myApp.showIndicator();
//   myApp.showIndicator();
// });
// // before page fully loaded
// myApp.onPageBeforeAnimation('chat', function(page) {
//   window.myApp.showIndicator();
//   myApp.showIndicator();
// });
// // before page fully loaded
// myApp.onPageReinit('chat', function(page) {
//   window.myApp.showIndicator();
//   myApp.showIndicator();
// });

var socket = io.sails.connect(window.location.origin);

var myMessages, roomInfo, conversationStarted;
// when page loaded
var initPage = myApp.onPageAfterAnimation('chat', function(page) {

  window.myApp.hideIndicator();

  // "page" variable contains all required information about loaded and initialized page
  console.log("onPageAfterAnimation=>", page);

  // reassemble post id
  var postId = window.location.pathname.split("/")[3];

  // join or create a room.
  io.socket.post('/room/' + postId + '/users', function(body, sailsResponseObject) {
    console.log('Sails responded with: ', body);
    console.log('and with status code: ', sailsResponseObject.statusCode);
    console.log("users(0)=>", body.room.users[0]);
  });

  initMessager();

  // listen event join
  io.socket.on('join', function(data) {
    console.log('join =>', data);

    // Add message
    window.myMessages.addMessage({
      // Message text
      text: data.message,
      type: "received",
      // Avatar and name:
      avatar: '/img/chat＿60x60.png',
      name: "TradeMuch Bot",
      // Day
      day: false,
      time: false
    })

  });

  // listen event join
  io.socket.on('leave', function(data) {
    console.log('leave =>', data);

    if (data.room.user.id != $$("#userId").val()) {
      // Add message
      window.myMessages.addMessage({
        // Message text
        text: data.message,
        type: "received",
        // Avatar and name:
        avatar: '/img/chat＿60x60.png',
        name: "TradeMuch Bot",
        // Day
        day: false,
        time: false
      })
    }
  });

  // received
  io.socket.on('public', function(data) {
    console.log('public =>', data)
    console.log('public =>', data.content)
    console.log('public =>', data.user.fbId)

    // Add message
    window.myMessages.addMessage({
      // Message text
      text: data.content,
      // Random message type
      type: "received",
      // Avatar and name:
      avatar: '//graph.facebook.com/' + data.user.fbId + '/picture?type=large',
      name: data.user.fullName,
      // Day
      day: !conversationStarted ? 'Today' : false,
      time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
    });

    // Update conversation flag
    conversationStarted = true;

  });

});


function initMessager() {

  // Conversation flag
  var conversationStarted = false;

  // Init Messages
  myMessages = myApp.messages('.messages', {
    autoLayout: true
  });

  window.myMessages = myMessages;

  // Init Messagebar
  var myMessagebar = myApp.messagebar('.messagebar');

  // bind enter key to input box
  $$("textarea").on("keydown", function(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      $$(".messagebar .link").click();
    }
  });

  // Handle message
  $$('.messagebar .link').on('click', function() {
    // Message text
    var messageText = myMessagebar.value().trim();

    if (messageText.indexOf("</") != -1) {
      var tmp = messageText.split("</");
      messageText = "";
      for (var i = 0; i < tmp.length; i++) {
        messageText += tmp[i];
      }
    }

    // Exit if empy message
    if (messageText.length === 0) return;

    if (messageText.length > 255) {
      myApp.alert("訊息太長了太長了太長了太長了太長了");
      return;
    }

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

    // get room info
    if (messageText.indexOf("/list") != -1) {
      //list
      io.socket.get('/room/' + postId + '/users', function(data, sailsResponseObject) {
        console.log('Sails responded with: ', data);
        console.log('and with status code: ', sailsResponseObject.statusCode);

        var users = "";
        for (var i = 0; i < data.users.length; i++) {
          users += data.users[i].username + "/";
          console.log("data.users[i]=>", data.users[i]);
        }
        console.log("users=>", users);
        var msg =
          "\n\n線上人數：" + data.count +
          "\n人數限制：" + data.limit +
          "\n編號：" + data.id +
          "\n狀態：" + data.state +
          "\n類型：" + data.type +
          "\n線上名單：" + users;

        // Add message
        window.myMessages.addMessage({
          // Message text
          text: msg,
          type: "received",
          // Avatar and name:
          avatar: '/img/chat＿60x60.png',
          name: "TradeMuch Bot",
          // Day
          day: false,
          time: false
        })
      });
      return false;
      ㄉ
    }

    //public
    io.socket.post('/chat/' + postId + '/public', {
        'content': messageText
      },
      function(body, sailsResponseObject) {
        console.log('Sails responded with: ', body);
        console.log('and with status code: ', sailsResponseObject.statusCode);

        // Add message
        window.myMessages.addMessage({
          // Message text
          text: messageText,
          // Random message type
          // type: "received",
          type: "sent",
          // Avatar and name:
          avatar: 'http://graph.facebook.com/' + body.user.fbId + '/picture?type=large',
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
