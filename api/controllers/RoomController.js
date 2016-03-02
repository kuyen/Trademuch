module.exports = {

  // List a chat room member and online count -- this is bound to 'get /room/:roomName/list'
  'list': async(req, res) => {
    if (_.isUndefined(req.param('roomName'))) {
      return res.badRequest('`roomName` is required.');
    }
    if (!req.isSocket) {
      return res.badRequest('This endpoints only supports socket requests.');
    }
    var socketId = sails.sockets.id(req);
    var roomName = req.param('roomName');

    try {
      let login = await UserService.getLoginState(req);
      if (!login) {
        return res.serverError('please log in.');
      }

      let room = await RoomService.list(roomName);

      console.log('ListRoom', room);

      return res.ok(
        room
      );

    } catch (e) {
      res.serverError(e.toString());
    }

  }, // end list


  // Join a chat room -- this is bound to 'post /room/:roomName/users'
  'join': async(req, res) => {
    if (_.isUndefined(req.param('roomName'))) {
      return res.badRequest('`roomName` is required.');
    }
    if (!req.isSocket) {
      return res.badRequest('This endpoints only supports socket requests.');
    }
    var socketId = sails.sockets.id(req);
    var roomName = req.param('roomName');
    var userId = req.param('userId');
    var limit = req.param('limit') | 0;
    var type = userId != undefined ? 'private' : 'public';

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
