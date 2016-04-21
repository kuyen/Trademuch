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
        }
      });
      if(!records) {
        sails.log.info("=== TradeRecordService@findUserRecords: find no user id =>", data.id);
        throw Error('no this id');
      }

      return records;
    } catch (e) {
      throw e
    }
  }, // end findUserRecords

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

  findRecordsByPostId: async(post_id) => {
    try {
      sails.log.info("=== TradeRecordService@findRecordsByPostId data==>", post_id);
      let records = await TradeRecord.findAll({
        where:{
          post_id: post_id
        },
      });
      if(!records) {
        sails.log.info("=== TradeRecordService@findRecordsByPostId: find no post/user id =>", post_id);
        throw Error('no data meets given post/user id.');
      }

      return records;
    } catch (e) {
      throw e
    }
  }, // end findSpecificPostRecord

};
