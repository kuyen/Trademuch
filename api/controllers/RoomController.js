module.exports = {

  // List a chat room member and online count -- this is bound to 'get /room/:roomName/list'
  'list': async(req, res) => {
    if (_.isUndefined(req.param('roomName'))) {
      return res.badRequest('`roomName` is required.');
    }
    if (!req.isSocket) {
      return res.badRequest('This endpoints only supports socket requests.');
    }
    let socketId = sails.sockets.id(req);
    let roomName = req.param('roomName');

    try {
      let login = await UserService.getLoginState(req);
      if (!login) {
        return res.serverError('please log in.');
      }

      let room = await RoomService.list(roomName);
      sails.log.info('ListRoom', room);

      return res.ok(
        room
      );

    } catch (e) {
      res.serverError(e.toString());
    }
  }, // end list


  // Join a chat room -- this is bound to 'post /room/:roomName/users'
  // if exists userId means is a private chat.
  'join': async(req, res) => {
    if (_.isUndefined(req.param('roomName'))) {
      return res.badRequest('`roomName` is required.');
    }
    if (!req.isSocket) {
      return res.badRequest('This endpoints only supports socket requests.');
    }
    let socketId = sails.sockets.id(req);
    let roomName = req.param('roomName');
    let limit = req.param('limit') | 0;
    let userId = req.param('userId');
    let type = userId != undefined ? 'private' : 'public';

    try {
      let login = await UserService.getLoginState(req);
      if (!login) {
        return res.serverError('please log in.');
      }

      let user = await UserService.getLoginUser(req);
      let room = await RoomService.join({
        socketId,
        roomName,
        user,
        limit,
        type
      });
      sails.log.info('joinRoom', room);

      if (!room) {
        throw Error('join room `' + roomName + '` failed.');
      }

      sails.sockets.join(req, roomName, function(err) {
        if (err) {
          throw Error(err);
        }
        sails.sockets.broadcast(roomName, "join", {
          room,
          'message': user.username + " join"
        });
      });

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
    let socketId = sails.sockets.id(req);
    let roomName = req.param('roomName');

    try {
      let login = await UserService.getLoginState(req);
      if (!login) {
        return res.serverError('please log in.');
      }

      let user = await UserService.getLoginUser(req);
      let room = await RoomService.leave({
        socketId,
        roomName,
        user
      });
      sails.log.info('leaveRoom', room);

      if (!room) {
        throw Error('leave room `' + roomName + '` failed.');
      }

      sails.sockets.leave(req, roomName, function(err) {
        if (err) {
          throw Error(err);
        }
        sails.sockets.broadcast(roomName, "leave", {
          room,
          'message': room.user.username + " leaved."
        });
      });

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
    let socketId = sails.sockets.id(req);
    let roomName = req.param('roomName');
    let limit = req.param('limit');

    try {
      let login = await UserService.getLoginState(req);
      if (!login) {
        return res.serverError('please log in.');
      }

      let room = await RoomService.setLimit({
        socketId,
        roomName,
        limit
      });
      sails.log.info('limitedRoom', room);

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

        sails.log.info('roomLimit', roomLimit);

        return res.ok({
          roomLimit,
          'message': "the limit of room `" + req.param('roomName') + "` is `" + roomLimit + "`."
        });

      } catch (e) {
        res.serverError(e.toString());
      }

    } // end getLimit

};
