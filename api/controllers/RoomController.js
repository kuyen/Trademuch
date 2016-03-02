module.exports = {

  // List a chat room member and online count -- this is bound to 'get /room/:roomId/list'
  'list': async(req, res, next) => {
    if (_.isUndefined(req.param('roomId'))) {
      return res.badRequest('`roomId` is required.');
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

      return res.ok({
        room
      });

    } catch (e) {
      res.serverError(e.toString());
    }

  }, // end join


  // Join a chat room -- this is bound to 'post /room/:roomId/users'
  'join': async(req, res, next) => {
    if (_.isUndefined(req.param('roomId'))) {
      return res.badRequest('`roomId` is required.');
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

  // Leave a chat room -- this is bound to 'delete /room/:roomId/users'
  'leave': async(req, res, next) => {
    if (_.isUndefined(req.param('roomId'))) {
      return res.badRequest('`roomId` is required.');
    }
    if (!req.isSocket) {
      return res.badRequest('This endpoints only supports socket requests.');
    }
    try {
      let login = await UserService.getLoginState(req);
      if (!login) {
        return res.serverError('please log in.');
      }
      // let user = await UserService.getLoginUser(req);
      // let room = await RoomUser.findOne({
      //   where: {
      //     room_id: roomId,
      //     user_id: user.id
      //   }
      // });
      // if (!room) {
      //   return res.serverError('room ``' + roomId + '` doesn`t exist!');
      // }
      // room.online = false;
      // let updatedRoom = await room.save();
      //
      // sails.sockets.leave(req, roomId, function(err) {
      //   if (err) {
      //     return res.serverError(err);
      //   }
      //   sails.sockets.broadcast(roomId, "leave", {
      //     'message': user + "leaved"
      //   });
      //   return res.ok({
      //     updatedRoom,
      //     message: 'leaved room ' + roomId + '!'
      //   });
      // });

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


  // Limit a chat room's total member -- this is bound to 'put /room/:roomId/limit'
  'SetLimit': async(req, res, next) => {
    if (_.isUndefined(req.param('roomId'))) {
      return res.badRequest('`roomId` is required.');
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
        message: 'limit room `' + req.param('roomId') + '` member to `' + req.param('limit') + '`.'
      });

    } catch (e) {
      res.serverError(e.toString());
    }

  }, // end SetLimit


  // Limit a chat room's total member -- this is bound to 'set /room/:roomId/limit'
  'getLimit': async(req, res) => {
      if (_.isUndefined(req.param('roomId'))) {
        return res.badRequest('`roomId` is required.');
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
          'message': "the limit of room `" + req.param('roomId') + "` is `" + roomLimit + "`."
        });

      } catch (e) {
        res.serverError(e.toString());
      }

    } // end getLimit

};
