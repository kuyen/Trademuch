module.exports = {

  sendRequestById: async(req, res) => {
    let postId = req.param('postId');
    let result = {
      success: false,
      msg: '',
    };

    try {
      let user = await UserService.getLoginUser(req);

      let checkRecord = await TradeRecord .findOne({
        where:{
          post_id: postId,
          user_id: user.id
        }
      });

      if(checkRecord){
        result.msg = 'you have already requested this item!';
        return res.ok(result);
      }

      let record = await TradeRecordService.create({
        status: "pedding",
        user_id: user.id,
        post_id: postId
      });
      sails.log.info('user %d get records=>', user.id, record);

      result = {
        success: true,
        record
      }
      return res.ok(result);
    } catch (e) {
      res.serverError(e.toString());
    }
  }, // end list

  list: async(req, res) => {
    try {
      let user = await UserService.getLoginUser(req);
      let records = await TradeRecordService.findRecordsByUserId(user.id);
      sails.log.info('user %d get records=>', user.id, records);

      return res.ok({
        data: records
      });

    } catch (e) {
      res.serverError(e.toString());
    }
  }, // end list

  getRecordStatusById: async(req, res) => {
    let postId = req.param('postId');
    let result = {
      success: false,
      msg: '',
    };

    try {
      let user = await UserService.getLoginUser(req);

      let record = await TradeRecordService.findSpecificPostRecord({
        user_id: user.id,
        post_id: postId
      });
      if (!record) {
        result.msg = 'find no record.';
        return res.serverError(result);
      }

      result = {
        status: record.status
      };

      return res.ok(result);
    } catch (e) {
      res.serverError(e.toString());
    }
  }, // end getPostRecord

  action: async(req, res) => {
    let postId = req.param('postId');
    let userId = req.param('userId');
    let action = req.param('action');
    let result = {
      success: false,
      msg: '',
    }

    if (!action) {
      result.msg = 'action field is needed.';
      return res.serverError(result);
    }
    if (!userId) {
      result.msg = 'you need to target a user to accept his request.';
      return res.serverError(result);
    }

    sails.log.info('postId==>', postId);
    sails.log.info('userId==>', userId);
    sails.log.info('action==>', action);

    try {
      let loginedUser = await UserService.getLoginUser(req);

      // find target post's all records by given id.
      let records = await TradeRecordService.findRecordsByPostId(postId);
      if (!records) {
        result.msg = 'find no any record.';
        return res.serverError(result);
      }
      sails.log.info('records.length==>', records.length);

      let accepted = 'accepted';
      let refused = 'refused';
      let pedding = 'pedding';
      let confirm = 'confirm';
      let cancelConfirm = 'cancelConfirm';

      // take out accept/refuse user and set status.
      for(let record of records){
        sails.log.info('find record id=>%d, userId=>', record.id, record.user_id);
        switch (action) {
          case accepted:
            if (record.status === pedding) {
              if (record.user_id == userId) {
                record.status = accepted;
              } else {
                record.status = refused;
              }
            }
            break;
          case refused:
            if (record.status === pedding) record.status = refused;
            break;
          case confirm:
            if (record.status !== pedding) record.isConfirmed = true;
            break;
          case cancelConfirm:
            if (record.status !== pedding) record.isConfirmed = false;
          break;
          default:
        }
        await record.save();
      } // end for

      if (action == "accepted") PostService.setPostStatus(postId, "sold");

      result = {
        success: true,
        records
      }

      console.log("result=>",result);

      return res.ok(result);
    } catch (e) {
      res.serverError(e.toString());
    }
  }, // end action

};
