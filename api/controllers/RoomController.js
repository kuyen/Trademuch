module.exports = {

  // Join a chat room -- this is bound to 'post /room/:roomId/users'
  'join': async(req, res, next) => {
    if (_.isUndefined(req.param('roomId'))) {
      return res.badRequest('`roomId` is required.');
    }
    if (!req.isSocket) {
      return res.badRequest('This endpoints only supports socket requests.');
    }

    var roomId = req.param('roomId');
    console.log('RoomController.join:roomId=>', roomId);

    try {
      let login = await UserService.getLoginState(req);
      if (!login) {
        return res.serverError('please log in.');
      }

      let user = await UserService.getLoginUser(req);
      let room = await Room.findOne({
        where: {
          'uuid': roomId
        }
      });
      if (!room) {
        room = await Room.create({
          'uuid': roomId
        });
      }
      await room.addUser(user.id);

      if (room.limit) {
        sails.log.info("=== this room has meber limit ==>", room.limit);
        let online = RoomUser.findAll({
          where: {
            'online': true,
            'room_id': roomId
          }
        });
        if (online > room.limit) {
          sails.log.info("=== reach room online limit! ==");
          return res.serverError('reach room online limit.');
        }
      }

      sails.sockets.join(req, roomId, function(err) {
        if (err) {
          return res.serverError(err);
        }
        sails.sockets.broadcast(roomId, "join", {
          'msg': "Hello " + user.username
        });
        return res.ok({
          room,
          message: 'Subscribed to a fun room called ' + roomId + '!'
        });
      });

    } catch (e) {
      res.serverError(e);
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

    var roomId = req.param('roomId');

    try {
      let login = await UserService.getLoginState(req);
      if (!login) {
        return res.serverError('please log in.');
      }

      let user = await UserService.getLoginUser(req);
      let room = await RoomUser.findOne({
        where: {
          room_id: roomId,
          user_id: user.id
        }
      });
      if (!room) {
        return res.serverError('room ``' + roomId + '` doesn`t exist!');
      }
      room.online = false;
      let updatedRoom = await room.save();

      sails.sockets.leave(req, roomId, function(err) {
        if (err) {
          return res.serverError(err);
        }
        sails.sockets.broadcast(roomId, "leave", {
          'msg': user + "leaved"
        });
        return res.ok({
          updatedRoom,
          message: 'leaved room ' + roomId + '!'
        });
      });
    } catch (e) {
      res.serverError(e);
    }

  }, // end leave

  // Limit a chat room's total member -- this is bound to 'put /room/:roomId/limit'
  'limit': async(req, res, next) => {
      if (_.isUndefined(req.param('roomId'))) {
        return res.badRequest('`roomId` is required.');
      }
      if (!req.isSocket) {
        return res.badRequest('This endpoints only supports socket requests.');
      }

      var roomId = req.param('roomId');

      try {
        let login = await UserService.getLoginState(req);
        if (!login) {
          return res.serverError('please log in.');
        }

        let user = await UserService.getLoginUser(req);
        let room = await RoomUser.findOne({
          where: {
            room_id: roomId,
            user_id: user.id
          }
        });
        if (!room) {
          return res.serverError('room ``' + roomId + '` doesn`t exist!');
        }
        room.online = false;
        let updatedRoom = await room.save();

        sails.sockets.leave(req, roomId, function(err) {
          if (err) {
            return res.serverError(err);
          }
          sails.sockets.broadcast(roomId, "leave", {
            'msg': user + "leaved"
          });
          return res.ok({
            updatedRoom,
            message: 'leaved room ' + roomId + '!'
          });
        });
      } catch (e) {
        res.serverError(e);
      }

    } // end limit

};
