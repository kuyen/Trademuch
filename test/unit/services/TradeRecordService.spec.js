describe('about TradeRecord Service operation.', function() {

  describe('add and update a TradeRecord', () => {

    let testUser, testPost, testRecord;
    before(async(done) => {
      try {
        testUser = await User.create({
          "username": "TradeRecord testuser",
        });
        testPost = await Post.create({
          "uuid": '12311231231',
          "title": "TradeRecord",
          "startDate": "2015-12-01",
          "user_id": testUser.id
        });
        testRecord = await TradeRecord.create({
          status: "pedding",
          user_id: testUser.id,
          post_id: testPost.id
        });

        console.log("testUser.id=>", testUser.id);
        console.log("testRecord.id=>", testRecord.id);
        console.log("testPost.id=>", testPost.id);
        done();
      } catch (e) {
        console.log(e);
        done(e);
      }
    });

    it('add a new TradeRecord should success.', async(done) => {
      try {

        let record = await TradeRecordService.create({
          status: "pedding",
          user_id: testUser.id,
          post_id: testPost.id
        });

        console.log("record=>", record);

        record.id.should.be.number;
        record.user_id.should.be.equal(testUser.id);

        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    it('update a exist TradeRecord status should success.', async(done) => {
      try {

        let record = await TradeRecordService.update({
          id: testRecord.id,
          status: "accepted"
        });

        console.log("record=>", record);

        record.id.should.be.equal(testRecord.id);
        record.status.should.be.equal("accepted");

        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    it('find a user`s TradeRecords should success.', async(done) => {
      try {

        let thisTestRecord = await TradeRecord.create({
          status: "pedding",
          user_id: testUser.id,
          post_id: testPost.id
        });

        let records = await TradeRecordService.findUserRecords(testUser.id);

        console.log("records=>", JSON.stringify(records));

        records.should.be.object;
        records[0].id.should.be.equal(testRecord.id);

        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    it('find a specific TradeRecord by post and user id should success.', async(done) => {
      try {

        let record = await TradeRecordService.findSpecificPostRecord({
          user_id: testUser.id,
          post_id: testPost.id
        });

        console.log("record=>", record);

        record.id.should.be.equal(testRecord.id);
        record.post_id.should.be.equal(testPost.id);

        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

  }); // end describe

}); // end describe
