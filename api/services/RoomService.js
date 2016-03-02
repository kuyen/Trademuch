module.exports = {

  list: async(req) => {
    var socketId = sails.sockets.id(req);
    var roomName = req.param('roomName');
    try {
      // check room exist or cteate a room.
      let findRoom = await Room.findOne({
        where: {
          'uuid': roomName
        }
      });

      if (!findRoom) {
        throw Error('room `' + roomName + '` doesn`t exist!');
      }

      // get online list and count before add user into.
      let online = await RoomUser.findAll({
        where: {
          room_id: findRoom.id,
          online: true
        }
      });

      // get users
      let name, membersData = [],
        members = [];
      for (let member of online) {
        members.push(member.user_id);
      }
      for (let id of members) {
        try {
          name = await User.findOne({
            where: {
              id: id
            }
          })
          membersData.push(name);
        } catch (e) {
          throw (e);
        }
      }

      let room = {
        count: online.length,
        members: membersData
      }

      return room;

    } catch (e) {
      throw (e);
    }
  }, //end list


  'join': async(req) => {
    var socketId = sails.sockets.id(req);
    var roomName = req.param('roomName');
    var userId = req.param('userId');
    var limit = req.param('limit') | 0;
    var type = userId != undefined ? 'private' : 'public';
    try {
      // check room exist or cteate a room.
      let findRoom = await Room.findOne({
        where: {
          'uuid': roomName
        }
      });
      if (!findRoom) {
        findRoom = await Room.create({
          'uuid': roomName,
          'type': type,
          'limit': limit
        });
      }

      // get online list and count before add user into.
      let online = await RoomUser.findAll({
        where: {
          room_id: findRoom.id,
          online: true
        }
      });

      if (findRoom.limit || findRoom.limit != 0) {
        sails.log.info("=== this room has meber limit ==>", findRoom.limit);
        if (online.length >= findRoom.limit) {
          sails.log.info("=== reach room online limit! ==");
          throw Error('reach room online limit.');
        }
      }

      // check if room exists user and the online state.
      let user = await UserService.getLoginUser(req);
      let findUser = await RoomUser.findOne({
        where: {
          'user_id': user.id
        }
      });
      // change online state
      if (findUser && findUser.online === false) {
        findUser.online = true;
        findUser = await findRoom.save();
      } else {
        await findRoom.addUser(user.id);
      }

      // get online list and count it again.
      online = await RoomUser.findAll({
        where: {
          room_id: findRoom.id,
          online: true
        }
      });

      // get users
      let name, membersData = [],
        members = [];
      for (let member of online) {
        members.push(member.user_id);
      }
      for (let id of members) {
        try {
          name = await User.findOne({
            where: {
              id: id
            }
          })
          membersData.push(name);
        } catch (e) {
          throw (e);
        }
      }

      // merge room info
      let room = {
        id: findRoom.id,
        uuid: findRoom.uuid,
        type: findRoom.type,
        limit: findRoom.limit,
        members: membersData,
        count: online.length
      };

      console.log('RoomService.join:user=>', user.username);
      console.log('RoomService.join:request room id=>', roomName);
      console.log('RoomService.join:socketId=>', socketId);
      console.log('RoomService.join:room =>', room);

      await sails.sockets.join(req, roomName, function(err) {
        if (err) {
          throw Error(err);
        }
        sails.sockets.broadcast(roomName, "join", {
          'message': "Hello " + user.username
        });
      });

      return room;

    } catch (e) {
      throw (e);
    }

  }, // end join


  'leave': async(req) => {
    var socketId = sails.sockets.id(req);
    var roomName = req.param('roomName');
    try {
      let user = await UserService.getLoginUser(req);
      let room = await RoomUser.findOne({
        where: {
          room_id: roomName,
          user_id: user.id
        }
      });

      if (!room) {
        throw Error('room `' + roomName + '` doesn`t exist!');
      }
      if (room.online === false) {
        throw Error('user id `' + user.id + '` has already leaved room id `' + roomName + '`!');
      }

      room.online = false;
      let updatedRoom = await room.save();

      console.log('RoomService.leave:user=>', user.username);
      console.log('RoomService.leave:room uuid=>', roomName);
      console.log('RoomService.leave:socketId=>', socketId);
      console.log('RoomService.leave:room index =>', room.id);

      await sails.sockets.leave(req, roomName, function(err) {
        if (err) {
          throw Error(err);
        }
        sails.sockets.broadcast(roomName, "leave", {
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
    var roomName = req.param('roomName');
    var newLimit = req.param('limit');
    try {
      let user = await UserService.getLoginUser(req);
      let room = await Room.findOne({
        where: {
          uuid: roomName
        }
      });
      if (!room) {
        throw Error('room `' + roomName + '` doesn`t exist!');
      }
      room.limit = newLimit;
      let limitedRoom = await room.save();

      console.log('RoomService.setLimit:user=>', user.username);
      console.log('RoomService.setLimit:room uuid=>', roomName);
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
      var roomName = req.param('roomName');
      try {
        let user = await UserService.getLoginUser(req);
        let room = await Room.findOne({
          where: {
            uuid: roomName
          }
        });
        if (!room) {
          throw Error('room `' + roomName + '` doesn`t exist!');
        }

        console.log('RoomService.getLimit:user=>', user.username);
        console.log('RoomService.getLimit:room.uuid=>', roomName);
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
