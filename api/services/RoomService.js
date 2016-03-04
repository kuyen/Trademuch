module.exports = {

  list: async(roomName) => {
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
      let name, members = [];
      for (let member of online) {
        members.push(member.user_id);
      }
      members = await User.findAll({
        where: {
          id: members
        }
      });

      let room = {
        count: online.length,
        members: members
      }

      return room;

    } catch (e) {
      throw e;
    }
  }, //end list


  'join': async(data) => {
    try {
      let newRoom = false;

      // check room exist or cteate a room.
      let findRoom = await Room.findOne({
        where: {
          'uuid': data.roomName
        }
      });
      if (!findRoom) {
        findRoom = await Room.create({
          'uuid': data.roomName,
          'type': data.type,
          'limit': data.limit
        });
        newRoom = true;
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
      let findUser = await RoomUser.findOne({
        where: {
          'user_id': data.user.id,
          'room_id': findRoom.id
        }
      });
      // change online state
      if (findUser) {
        sails.log.info("=== reconnect user to room record ==");
        if (findUser.online === false) {
          findUser.online = true;
          findUser = await findUser.save();
        }
      } else {
        sails.log.info("=== add user to room record ==");
        await findRoom.addUser(data.user.id);
      }

      // get online list and count it again.
      online = await RoomUser.findAll({
        where: {
          room_id: findRoom.id,
          online: true
        }
      });

      // get users
      let name, members = [];
      for (let member of online) {
        members.push(member.user_id);
      }
      members = await User.findAll({
        where: {
          id: members
        }
      });

      // merge room info
      let room = {
        id: findRoom.id,
        uuid: findRoom.uuid,
        type: findRoom.type,
        limit: findRoom.limit,
        users: members,
        count: online.length,
        state: newRoom ? "new" : "join"
      };

      sails.log.info('RoomService.join:user=>', data.user.username);
      sails.log.info('RoomService.join:request room id=>', data.roomName);
      sails.log.info('RoomService.join:socketId=>', data.socketId);
      sails.log.info('RoomService.join:room =>', room);

      return room;

    } catch (e) {
      throw e;
    }

  }, // end join


  'leave': async(data) => {
    try {
      // find target room.
      let room = await Room.findOne({
        where: {
          uuid: data.roomName
        }
      });
      if (!room) {
        throw Error('room `' + data.roomName + '` doesn`t exist!');
      }

      // change state flag.
      let roomUser = await RoomUser.findOne({
        where: {
          room_id: room.id,
          user_id: data.user.id
        }
      });
      if (roomUser.online === false) {
        throw Error('user id `' + data.user.id + '` has already leaved room id `' + data.roomName + '`!');
      }

      roomUser.online = false;
      roomUser = await roomUser.save();

      let tUser = await User.findOne({
        where: {
          id: data.user.id
        }
      });

      // reassemble user info with fbId
      let leavedUser = {
        id: tUser.id,
        email: tUser.email,
        fullName: tUser.fullName,
        gender: tUser.gender,
        username: tUser.username,
        telephone: tUser.telephone,
        age: tUser.age
      };
      leavedUser.fbId = await UserService.getFBId(tUser.id);

      let leavedRoom = {
        room: room,
        user: leavedUser
      };

      sails.log.info('RoomService.leave:user=>', data.user.username);
      sails.log.info('RoomService.leave:room uuid=>', data.roomName);
      sails.log.info('RoomService.leave:socketId=>', data.socketId);
      sails.log.info('RoomService.leave:room index =>', room.id);

      return leavedRoom;

    } catch (e) {
      throw e;
    }
  }, // end leave


  'setLimit': async(data) => {
    try {
      let room = await Room.findOne({
        where: {
          uuid: data.roomName
        }
      });
      if (!room) {
        throw Error('room `' + data.roomName + '` doesn`t exist!');
      }
      room.limit = data.limit;
      room = await room.save();

      sails.log.info('RoomService.setLimit:room new limit =>', data.limit);
      sails.log.info('RoomService.setLimit:room uuid=>', data.roomName);
      sails.log.info('RoomService.setLimit:socketId=>', data.socketId);
      sails.log.info('RoomService.setLimit:room id =>', data.room.id);

      return room;

    } catch (e) {
      throw e;
    }
  }, // end setLimit


  'getLimit': async(data) => {
    try {
      let room = await Room.findOne({
        where: {
          uuid: data.roomName
        }
      });
      if (!room) {
        throw Error('room `' + roomName + '` doesn`t exist!');
      }

      sails.log.info('RoomService.getLimit:room new limit =>', data.limit);
      sails.log.info('RoomService.getLimit:room uuid=>', data.roomName);
      sails.log.info('RoomService.getLimit:socketId=>', data.socketId);
      sails.log.info('RoomService.getLimit:room id =>', data.room.id);

      let limit = room.limit | 0;

      return limit;

    } catch (e) {
      throw e;
    }
  }, // end getLimit

};
