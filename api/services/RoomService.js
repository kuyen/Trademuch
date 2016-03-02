module.exports = {

  'join': async(req) => {
    var socketId = sails.sockets.id(req);
    var roomId = req.param('roomId');
    try {
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

      console.log('RoomService.join:user=>', user.username);
      console.log('RoomService.join:room uuid=>', roomId);
      console.log('RoomService.join:socketId=>', socketId);
      console.log('RoomService.join:room id =>', room.id);

      if (room.limit || room.limit != 0) {
        sails.log.info("=== this room has meber limit ==>", room.limit);
        let online = RoomUser.findAll({
          where: {
            'online': true,
            'room_id': roomId
          }
        });
        if (online > room.limit) {
          sails.log.info("=== reach room online limit! ==");
          throw Error('reach room online limit.');
        }
      }

      await sails.sockets.join(req, roomId, function(err) {
        if (err) {
          throw Error(err);
        }
        sails.sockets.broadcast(roomId, "join", {
          'message': "Hello " + user.username
        });
      });

      return room;

    } catch (e) {
      throw Error(e);
    }

  }, // end join


  'leave': async(req) => {
    var socketId = sails.sockets.id(req);
    var roomId = req.param('roomId');
    try {
      let user = await UserService.getLoginUser(req);
      let room = await RoomUser.findOne({
        where: {
          room_id: roomId,
          user_id: user.id
        }
      });

      if (!room) {
        throw Error('room `' + roomId + '` doesn`t exist!');
      }
      if (room.online === false) {
        throw Error('user id `' + user.id + '` has already leaved room id `' + roomId + '`!');
      }

      room.online = false;
      let updatedRoom = await room.save();

      console.log('RoomService.leave:user=>', user.username);
      console.log('RoomService.leave:room uuid=>', roomId);
      console.log('RoomService.leave:socketId=>', socketId);
      console.log('RoomService.leave:room index =>', room.id);

      await sails.sockets.leave(req, roomId, function(err) {
        if (err) {
          throw Error(err);
        }
        sails.sockets.broadcast(roomId, "leave", {
          'message': user + " has leaved."
        });
      });

      return updatedRoom;

    } catch (e) {
      throw (e);
    }
  }, // end leave


  'setLimit': async(req, limit) => {
    var socketId = sails.sockets.id(req);
    var roomId = req.param('roomId');
    var newLimit = req.param('limit');
    try {
      let user = await UserService.getLoginUser(req);
      let room = await Room.findOne({
        where: {
          uuid: roomId
        }
      });
      if (!room) {
        throw Error('room `' + roomId + '` doesn`t exist!');
      }
      room.limit = newLimit;
      let limitedRoom = await room.save();

      console.log('RoomService.setLimit:user=>', user.username);
      console.log('RoomService.setLimit:room uuid=>', roomId);
      console.log('RoomService.setLimit:socketId=>', socketId);
      console.log('RoomService.setLimit:room id =>', limitedRoom.id);
      console.log('RoomService.setLimit:room new limit =>', limitedRoom.limit);

      return limitedRoom;

    } catch (e) {
      throw (e);
    }
  }, // end setLimit


  'getLimit': async(req) => {
      var socketId = sails.sockets.id(req);
      var roomId = req.param('roomId');
      try {
        let user = await UserService.getLoginUser(req);
        let room = await Room.findOne({
          where: {
            uuid: roomId
          }
        });
        if (!room) {
          throw Error('room `' + roomId + '` doesn`t exist!');
        }

        console.log('RoomService.getLimit:user=>', user.username);
        console.log('RoomService.getLimit:room.uuid=>', roomId);
        console.log('RoomService.getLimit:socketId=>', socketId);
        console.log('RoomService.getLimit:room.id =>', room.id);;
        console.log('RoomService.getLimit:room.limit =>', room.limit);

        let limit = room.limit | 0;

        return limit;

      } catch (e) {
        throw (e);
      }
    } // end getLimit

};
