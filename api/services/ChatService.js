module.exports = {

  // get chat history
  history: async(req) => {
    var socketId = sails.sockets.id(req);
    var roomName = req.param('roomName');
    var roomId = req.param('roomId');
    try {
      if(!roomId){
        let room = await Room.findOne({
          where:{
            uuid:roomName
          }
        });
        if (!room) {
          throw Error('room `' + roomName + '` doesn`t exist.');
        }
        roomId = room.id;
      }
      let chat = await Chat.findAll({
        where: {
          room_id: roomId
        }
      })
      if (!chat || !chat.length > 0) {
        throw Error('room `' + roomName + '` has no history.');
      }

      return chat;
    } catch (e) {
      throw e;
    }
  }, // end history


};
