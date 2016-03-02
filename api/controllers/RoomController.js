module.exports = {

  //
  chatView: async(req, res) => {
    try {
      let loginState = await UserService.getLoginState(req);
      console.log("==== user login status ===>", loginState);

      let loginedUser, userFBId, targetId = req.param('id');

      if (loginState) {
        loginedUser = await UserService.getLoginUser(req);
        userFBId = await UserService.getFBId(loginedUser.id);
        console.log("==== logined User is ===>", loginedUser);
      } // end if

      res.view('chat', {
        loginState: loginState,
        loginedUser: loginedUser,
        userFBId
      });
    } catch (e) {
      res.serverError(e);
    }
  },


  // List a chat room member and online count -- this is bound to 'get /room/:roomName/list'
  'list': async(req, res, next) => {
    if (_.isUndefined(req.param('roomName'))) {
      return res.badRequest('`roomName` is required.');
    }
    if (!req.isSocket) {
      return res.badRequest('This endpoints only supports socket requests.');
    }

    try {
      let login = await UserService.getLoginState(req);
      if (!login) {
        return res.serverError('please log in.');
      }

      let room = await RoomService.list(req);

      console.log('ListRoom', room);

      return res.ok(
        room
      );

    } catch (e) {
      res.serverError(e.toString());
    }

  }, // end join


  // Join a chat room -- this is bound to 'post /room/:roomName/users'
  'join': async(req, res, next) => {
    if (_.isUndefined(req.param('roomName'))) {
      return res.badRequest('`roomName` is required.');
    }
    if (!req.isSocket) {
      return res.badRequest('This endpoints only supports socket requests.');
    }

    try {
      let login = await UserService.getLoginState(req);
      if (!login) {
        return res.serverError('please log in.');
      }

      let room = await RoomService.join(req);

      console.log('joinRoom', room);

      return res.ok({
        room,
        message: 'Subscribed to a fun room id ' + room.id + '!'
      });

    } catch (e) {
      res.serverError(e.toString());
    }

  }, // end join

  // Leave a chat room -- this is bound to 'delete /room/:roomName/users'
  'leave': async(req, res, next) => {
    if (_.isUndefined(req.param('roomName'))) {
      return res.badRequest('`roomName` is required.');
    }
    if (!req.isSocket) {
      return res.badRequest('This endpoints only supports socket requests.');
    }
    try {
      let login = await UserService.getLoginState(req);
      if (!login) {
        return res.serverError('please log in.');
      }

      let room = await RoomService.leave(req);

      console.log('leaveRoom', room);

      return res.ok({
        room,
        message: 'leaved room ' + room.id + '!'
      });

    } catch (e) {
      res.serverError(e.toString());
    }

  }, // end leave


  // Limit a chat room's total member -- this is bound to 'put /room/:roomName/limit'
  'SetLimit': async(req, res, next) => {
    if (_.isUndefined(req.param('roomName'))) {
      return res.badRequest('`roomName` is required.');
    }
    if (!req.isSocket) {
      return res.badRequest('This endpoints only supports socket requests.');
    }
    try {
      let login = await UserService.getLoginState(req);
      if (!login) {
        return res.serverError('please log in.');
      }

      let room = await RoomService.setLimit(req);

      console.log('limitedRoom', room);

      return res.ok({
        room,
        message: 'limit room `' + req.param('roomName') + '` member to `' + req.param('limit') + '`.'
      });

    } catch (e) {
      res.serverError(e.toString());
    }

  }, // end SetLimit


  // Limit a chat room's total member -- this is bound to 'set /room/:roomName/limit'
  'getLimit': async(req, res) => {
      if (_.isUndefined(req.param('roomName'))) {
        return res.badRequest('`roomName` is required.');
      }
      if (!req.isSocket) {
        return res.badRequest('This endpoints only supports socket requests.');
      }
      try {
        let login = await UserService.getLoginState(req);
        if (!login) {
          return res.serverError('please log in.');
        }

        let roomLimit = await RoomService.getLimit(req);

        console.log('roomLimit', roomLimit);

        return res.ok({
          roomLimit,
          'message': "the limit of room `" + req.param('roomName') + "` is `" + roomLimit + "`."
        });

      } catch (e) {
        res.serverError(e.toString());
      }

    } // end getLimit

};
