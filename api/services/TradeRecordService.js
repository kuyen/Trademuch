module.exports = {

  create: async(data) => {
    try {
      sails.log.info("=== TradeRecordService@create==>[%o]", data);
      let record = await TradeRecord.create({
        status: data.status,
        user_id: data.user_id,
        post_id: data.post_id
      });

      return record;
    } catch (e) {
      throw e
    }
  }, // end create

  update: async(data) => {
    try {
      sails.log.info("=== TradeRecordService@update==>[%o]", data);
      let record = await TradeRecord.findOne({
        where: {
          id: data.id,
        }
      });
      if(!record) {
        sails.log.info("=== TradeRecordService@update: find no any record id =>", data.id);
        throw Error('no this id');
      }
      record.status = data.status;
      if(data.post_id) record.post_id = data.post_id;
      if(data.user_id) record.user_id = data.user_id;
      record.save();

      return record;
    } catch (e) {
      throw e
    }
  }, // end update

  findUserRecords: async(userId) => {
    try {
      sails.log.info("=== TradeRecordService@findUserRecords id==>", userId);
      let records = await TradeRecord.findAll({
        where:{
          user_id: userId,
        },
        include: {
          model: Post,
          include: {
            model: Place,
          }
        },
      });
      if(!records) {
        sails.log.info("=== TradeRecordService@findUserRecords: find no user id =>", data.id);
        throw Error('no this id');
      }
      return TradeRecordService.tradeRecordFormat(records);
    } catch (e) {
      throw e
    }
  }, // end findUserRecords

  tradeRecordFormat: (tradeRecordList) => {
    let formattedData = tradeRecordList.map((tradeRecord) => {
      let post = tradeRecord.Post;
      let data = {
        id: post.id,
        title: post.title,
        status: tradeRecord.status,
        pic: post.coverImage,
        location: {
          lat: null,
          lon: null,
        },
      };
      if (post.Places.length > 0){
        data.location = {
          lat: post.Places[0].dataValues.latitude,
          lon: post.Places[0].dataValues.longitude,
        }
      }
      return data;
    });
    return formattedData;
  },

  findSpecificPostRecord: async(data) => {
    try {
      sails.log.info("=== TradeRecordService@getPostRecord data==>", data);
      let record = await TradeRecord.findOne({
        where:{
          post_id: data.post_id,
          user_id: data.user_id
        }
      });
      if(!record) {
        sails.log.info("=== TradeRecordService@getPostRecord: find no post/user id =>", data);
        throw Error('no data meets given post/user id.');
      }

      return record;
    } catch (e) {
      throw e
    }
  }, // end findSpecificPostRecord

};
