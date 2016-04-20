module.exports = {

  request: async(req, res) => {
    let postId = req.param('postId');

    try {
      let login = await UserService.getLoginState(req);
      if (!login) {
        return res.serverError('please log in.');
      }
      let user = await UserService.getLoginUser(req);

      let record = await TradeRecordService.create({
        state: "pedding",
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

  getPostRecord:async(req, res) => {
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

      return res.ok(
        record
      );

    } catch (e) {
      res.serverError(e.toString());
    }
  }, // end getPostRecord

  accepted: async(req, res) => {
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

      record.state = "accepted";
      record.save();

      return res.ok(
        record
      );

    } catch (e) {
      res.serverError(e.toString());
    }
  }, // end accepted

  pedding: async(req, res) => {
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

      record.state = "pedding";
      record.save();

      return res.ok(
        record
      );
    } catch (e) {
      res.serverError(e.toString());
    }
  }, // end pedding

  refused: async(req, res) => {
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

      record.state = "refused";
      record.save();

      return res.ok(
        record
      );

    } catch (e) {
      res.serverError(e.toString());
    }
  }, // end refused

};
