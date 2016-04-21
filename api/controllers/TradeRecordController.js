module.exports = {

  sendRequestById: async(req, res) => {
    let postId = req.param('postId');
    let result = {
      result: false,
      msg: '',
    };

    try {
      let user = await UserService.getLoginUser(req);

      let record = await TradeRecordService.create({
        status: "pedding",
        user_id: user.id,
        post_id: postId
      });
      sails.log.info('user %d get records %o', user.id, record);

      result = {
        result: true,
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
      let records = await TradeRecordService.findUserRecords(user.id);
      sails.log.info('user %d get records %o', user.id, records);

      return res.ok(
        records
      );

    } catch (e) {
      res.serverError(e.toString());
    }
  }, // end list

  getRecordStatusById: async(req, res) => {
    let postId = req.param('postId');
    let result = {
      result: false,
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
        result: record.status
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
      result: false,
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
      let record = await TradeRecordService.findRecordsByPostId(postId);
      if (!record) {
        result.msg = 'find no record.';
        return res.serverError(result);
      }
      sails.log.info('record.length==>', record.length);

      // take out accept/refuse user and set status.
      for (let i = 0; i < record.length; i++) {
        sails.log.info('find record id=>%d, userId=>%d', record[i].id, record[i].user_id);
        if (action == "accepted") {
          if (record[i].user_id == userId) {
            record[i].status = "accepted";
          } else {
            record[i].status = "refused";
          }
        } else if (action == "refused") {
          record[i].status = "refused";
        }
        await record[i].save();
      } // end for

      if (action == "accepted") PostService.setPostStatus(postId, "sold");

      result = {
        result: true,
        record
      }

      return res.ok(result);
    } catch (e) {
      res.serverError(e.toString());
    }
  }, // end action

};
