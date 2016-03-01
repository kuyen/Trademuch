module.exports = {

  // get client socket id
  getId: async(req, res) => {
    if (!req.isSocket) {
      return res.badRequest('This endpoints only supports socket requests.');
    }

    try {
      let socketId = sails.sockets.id(req);
      return res.ok({
        'socketId': socketId
      });
    } catch (e) {
      res.serverError(e);
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
      let roomId = req.param('roomId');
      let login = await UserService.getLoginState(req);

      if (!login) {
        return res.badRequest('please log in.');
      }

      let user = await UserService.getLoginUser(req);
      let chat = await Chat.create({
        'room_id': roomId,
        'user_id': user.id,
        'content': content,
        'type': 'annunciation'
      });

      if (roomId) {
        sails.log.info("=== broadcast to roomId ==>", roomId);
        sails.sockets.broadcast(roomId, "announce", {
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
        message: 'user\'' + user.username + '\' says ' + content + ' to room ' + roomId
      });
    } catch (e) {
      res.serverError(e);
    }
  }, // end announce

  // to-do todo wip
  // Send a private message from one user to another
  private: async(req, res) => {
    // Get the ID of the currently connected socket
    var socketId = sails.sockets.getId(req.socket);
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
      let params = ['content', 'roomId'];
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
        let roomId = req.param('roomId');
        let login = await UserService.getLoginState(req);

        if (!login) {
          return res.badRequest('please log in.');
        }

        let user = await UserService.getLoginUser(req);
        let chat = await Chat.create({
          'room_id': roomId,
          'user_id': user.id,
          'content': content,
          'type': 'public'
        });

        sails.sockets.broadcast(roomId, "public", {
          'from': user,
          'msg': content
        }, req);

        return res.ok({
          chat,
          message: 'user\'' + user.username + '\' says ' + content + ' to room ' + roomId
        });
      } catch (e) {
        res.serverError(e);
      }
    } // end public

};
