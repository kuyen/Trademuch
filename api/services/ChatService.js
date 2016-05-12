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
            uuid: data.postId
          }
        });
        if (!room) {
          sails.log.info('room name(post id) `' + data.postId + '` doesn`t exist.');
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
        sails.log.warn('room uuid `' + data.postId + '` has no history.');
        return history;
      }

      let post = await Post.findById(data.postId);
      history.empty = false;
      let fbId, tUser, tUser_fb, tCal, tDate, tTime, tResult, result = [];

      for (let chat of chats) {
        const loginUser = data.userId;
        const postOwner = post.UserId;
        if(chat.userId != loginUser && postOwner == loginUser){
          chat.speakRead = true;
          await chat.save();
        }

        tCal = sails.moment(new Date(chat.created_at.toString()));
        tDate = sails.moment(tCal).format("YYYY-MM-DD");
        tTime = sails.moment(tCal).format("HH:mm");

        // find user
        tUser = await User.findOne({
          where: {
            id: chat.user_id
          }
        });
        fbId = await UserService.getFBId(chat.user_id);

        // reassemble user info with fbId
        tUser_fb = {
          id: tUser.id,
          email: tUser.email,
          fullName: tUser.fullName,
          username: tUser.username,
          gender: tUser.gender,
          fbId: fbId,
          avatar: tUser.avatar || 'http://graph.facebook.com/' + fbId + '/picture?type=large',
        }

        tResult = {
          id: chat.id,
          uuid: chat.uuid,
          type: chat.type,
          content: chat.content,
          room_id: chat.room_id,
          dateTime: chat.created_at,
          date: tDate,
          time: tTime,
          user: tUser_fb,
        }
        result.push(tResult);

        sails.log.info(chat.id + 'result =>' + JSON.stringify(tResult));
      }
      history.result = result;

      return history;
    } catch (e) {
      throw e;
    }
  }, // end history

  lastOnehistory: async(uuid, userId) => {
    try {
      let room = await Room.find({
        where:{
          uuid: uuid
        }
      });
      let last, data;
      if(room){
        last = await Chat.findAndCountAll({
          where:{
            room_id: room.id,
            user_id:{
              $ne: userId
            },
            speakRead: false
          },
          limit: 1,
          order: 'created_at DESC'
        });
        if (last.count > 0){
          data = {...last.rows[0].dataValues};
          data.count = last.count;
        }
      }
      return data;
    } catch (e) {
      throw e
    }
  }, // lastOnehistory

  getPostChatCountById: async(uuid, userId) => {
    try {
      let room = await Room.find({
        where:{
          uuid: uuid
        }
      });
      let count = 0, data;
      if(room){
        data = await Chat.count({
          where:{
            room_id: room.id,
            user_id:{
              $ne: userId
            },
          },
        });
        if (data > 0) count = data;
      }
      return count;
    } catch (e) {
      throw e
    }
  }, // getPostChatCountById

};
