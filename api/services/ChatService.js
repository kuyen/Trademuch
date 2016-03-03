module.exports = {

  // get chat history
  history: async(data) => {
    try {

      let history = {
        empty: true
      };

      if (!data.roomId || data.roomId != 0) {
        let room = await Room.findOne({
          where: {
            uuid: data.roomName
          }
        });
        if (!room) {
          sails.log.info('room `' + data.roomName + '` doesn`t exist.');
          return history;
        }
        data.roomId = room.id;
      }
      sails.log.warn('data.roomId =>' + data.roomId);

      let chats = await Chat.findAll({
        where: {
          room_id: data.roomId
        }
      });
      if (!chats || chats.length == 0) {
        sails.log.warn('room `' + data.roomName + '` has no history.');
        return history;
      }

      history.empty = false;
      let tUser, tUser_fb, tCal, tDate, tTime, tResult, result = [];
      let now = new Date(), nDate = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
      for (let chat of chats) {
        tCal = new Date(chat.created_at.toString());
        tDate = tCal.getFullYear() + "-" + (tCal.getMonth() + 1) + "-" + tCal.getDate();
        tTime = tCal.getHours() + ":" + tCal.getMinutes();

        if(nDate==tDate) tDate = "Today";

        // find user
        tUser = await User.findOne({
          where: {
            id: chat.user_id
          }
        });

        // reassemble user info with fbId
        tUser_fb = {
          id: tUser.id,
          email: tUser.email,
          fullName: tUser.fullName,
          gender: tUser.gender,
          username: tUser.username,
          telephone: tUser.telephone,
          age: tUser.age
        }
        tUser_fb.fbId = await UserService.getFBId(tUser.id);

        tResult = {
          id: chat.id,
          uuid: chat.uuid,
          type: chat.type,
          content: chat.content,
          room_id: chat.room_id,
          user: tUser_fb,
          date: tDate,
          time: tTime
        }
        result.push(tResult);

        sails.log.error('result =>' + JSON.stringify(tResult));
      }
      history.result = result;

      return history;
    } catch (e) {
      throw e;
    }
  }, // end history


};
