module.exports = {

  sendRequestById: async(req, res) => {
    let postId = req.param('postId');

    try {
      let login = await UserService.getLoginState(req);
      if (!login) {
        return res.serverError('please log in.');
      }
      let user = await UserService.getLoginUser(req);

      let record = await TradeRecordService.create({
        status: "pedding",
        user_id: user.id,
        post_id: postId
      });
      sails.log.info('user %d get records %o', user.id, record);

      return res.ok(
        record
      );

    } catch (e) {
      res.serverError(e.toString());
    }
  }, // end list

  list: async(req, res) => {
    try {
      let login = await UserService.getLoginState(req);
      if (!login) {
        return res.serverError('please log in.');
      }
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

  getRecordStatusById:async(req, res) => {
    let postId = req.param('postId');
    let result = {
      result: false,
    };

    try {
      let login = await UserService.getLoginState(req);
      if (!login) {
        return res.serverError('please log in.');
      }
      let user = await UserService.getLoginUser(req);

      let record = await TradeRecordService.findSpecificPostRecord({
        user_id: user.id,
        post_id: postId
      });
      if(!record) {
        return res.serverError('find no record.');
      }
      console.log("record=>",record);

      result = {
        result: record.status
      };

      return res.ok(
        result
      );

    } catch (e) {
      res.serverError(e.toString());
    }
  }, // end getPostRecord

  requestAccepted: async(req, res) => {
    let postId = req.param('postId');

    try {
      let login = await UserService.getLoginState(req);
      if (!login) {
        return res.serverError('please log in.');
      }
      let user = await UserService.getLoginUser(req);

      let record = await TradeRecordService.findSpecificPostRecord({
        user_id: user.id,
        post_id: postId
      });
      if(!record) {
        return res.serverError('find no record.');
      }

      record.status = "accepted";
      record.save();

      return res.ok(
        record
      );

    } catch (e) {
      res.serverError(e.toString());
    }
  }, // end accepted

  requestPedding: async(req, res) => {
    let postId = req.param('postId');

    try {
      let login = await UserService.getLoginState(req);
      if (!login) {
        return res.serverError('please log in.');
      }
      let user = await UserService.getLoginUser(req);

      let record = await TradeRecordService.findSpecificPostRecord({
        user_id: user.id,
        post_id: postId
      });
      if(!record) {
        return res.serverError('find no record.');
      }

      record.status = "pedding";
      record.save();

      return res.ok(
        record
      );
    } catch (e) {
      res.serverError(e.toString());
    }
  }, // end pedding

  requestRefused: async(req, res) => {
    let postId = req.param('postId');

    try {
      let login = await UserService.getLoginState(req);
      if (!login) {
        return res.serverError('please log in.');
      }
      let user = await UserService.getLoginUser(req);

      let record = await TradeRecordService.findSpecificPostRecord({
        user_id: user.id,
        post_id: postId
      });
      if(!record) {
        return res.serverError('find no record.');
      }

      record.status = "refused";
      record.save();

      return res.ok(
        record
      );

    } catch (e) {
      res.serverError(e.toString());
    }
  }, // end refused

};
