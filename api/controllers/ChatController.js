module.exports = {

  // send chat view
  chatView: async(req, res) => {
    let socketId = sails.sockets.id(req);
    let roomName = req.param('id');
    sails.log.info('ChatController.chatView:roomName =>', roomName);

    try {
      let loginState = await UserService.getLoginState(req);
      sails.log.info("==== user login status ===>", loginState);

      let history, user, userFBId, date, time;

      if (loginState) {
        user = await UserService.getLoginUser(req);
        userFBId = await UserService.getFBId(user.id);
        user.fbId = userFBId;
        sails.log.info("==== logined User is ===>", user);

        history = await ChatService.history({
          socketId,
          roomName
        });
        sails.log.info('ChatController.history:history =>', JSON.stringify(history));
      } // end if

      res.view('chat', {
        user,
        history
      });
    } catch (e) {
      res.serverError(e.toString());
    }
  },


  // get chat history
  history: async(req, res) => {
    if (!req.isSocket) {
      return res.badRequest('This endpoints only supports socket requests.');
    }
    let socketId = sails.sockets.id(req);
    let roomName = req.param('roomName');
    let roomId = req.param('roomId') | 0;
    sails.log.info('ChatController.history:roomName =>', roomName);
    sails.log.info('ChatController.history:roomId =>', roomId);

    try {
      let history = await ChatService.history({
        socketId,
        roomName,
        roomId
      });
      sails.log.info('ChatController.history:history =>', JSON.stringify(history));

      return res.ok(history);
    } catch (e) {
      res.serverError(e.toString());
    }
  }, // end history


  // get client socket id
  getId: async(req, res) => {
    if (!req.isSocket) {
      return res.badRequest('This endpoints only supports socket requests.');
    }

    try {
      let socketId = sails.sockets.id(req);
      return res.ok(socketId);
    } catch (e) {
      res.serverError(e.toString());
    }
  }, // end getId


  // Send global message
  announce: async(req, res) => {
    if (_.isUndefined(req.param('content'))) {
      return res.badRequest('`content` is required.');
    }
    if (!req.isSocket) {
      return res.badRequest('This endpoints only supports socket requests.');
    }

    try {
      let socketId = sails.sockets.id(req);
      let content = req.param('content');
      let roomName = req.param('roomName');
      let login = await UserService.getLoginState(req);

      if (!login) {
        return res.badRequest('please log in.');
      }

      let user = await UserService.getLoginUser(req);
      let chat = await Chat.create({
        'room_id': roomName,
        'user_id': user.id,
        'content': content,
        'type': 'announce'
      });

      if (roomName) {
        sails.log.info("=== broadcast to roomName ==>", roomName);
        sails.sockets.broadcast(roomName, "announce", {
          'from': user,
          'msg': content
        }, req);
      } else {
        sails.log.info("=== blast ===");
        sails.sockets.blast("announce", {
          'from': user,
          'msg': content
        });
      }

      return res.ok({
        message: 'user\'' + user.username + '\' says ' + content + ' to room ' + roomName
      });
    } catch (e) {
      res.serverError(e.toString());
    }
  }, // end announce

  // to-do todo wip
  // Send a private message from one user to another
  private: async(req, res) => {
    // Get the ID of the currently connected socket
    let socketId = sails.sockets.getId(req.socket);
    // Use that ID to look up the user in the session
    // We need to do this because we can have more than one user
    // per session, since we're creating one user per socket
    User.findOne(req.session.users[socketId].id).exec(function(err, sender) {
      // Publish a message to that user's "room".  In our app, the only subscriber to that
      // room will be the socket that the user is on (subscription occurs in the onConnect
      // method of config/sockets.js), so only they will get this message.
      User.message(req.param('to'), {
        from: sender,
        msg: req.param('msg')
      });

    });
  }, // end private


  // Post a message in a public chat room
  public: async(req, res) => {
      let params = ['content', 'roomName'];
      params.forEach(function(param, index) {
        if (_.isUndefined(req.param(param))) {
          return res.badRequest(param + ' is required.');
        }
      });
      if (!req.isSocket) {
        return res.badRequest('This endpoints only supports socket requests.');
      }

      try {
        let socketId = sails.sockets.id(req);
        let content = req.param('content');
        let roomName = req.param('roomName');
        let login = await UserService.getLoginState(req);

        if (!login) {
          return res.badRequest('please log in.');
        }

        sails.log.info('RoomService.public:room uuid=>', roomName);
        sails.log.info('RoomService.public:socketId=>', socketId);
        sails.log.info('RoomService.public:content=>', content);

        let user = await UserService.getLoginUser(req);
        let userFBId = await UserService.getFBId(user.id);
        user.fbId = userFBId;
        let room = await Room.findOne({
          where: {
            uuid: roomName
          }
        });
        let chat = await Chat.create({
          'room_id': room.id,
          'user_id': user.id,
          'content': content,
          'type': 'public'
        });

        sails.log.info('RoomService.public:user=>', user.username);

        sails.sockets.broadcast(roomName, "public", {
          'from': user,
          'msg': content
        },req);

        return res.ok({
          chat,
          user,
          message: 'user\'' + user.username + '\' says ' + content + ' to room ' + roomName
        });
      } catch (e) {
        res.serverError(e.toString());
      }
    } // end public

};
