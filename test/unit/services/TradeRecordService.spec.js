describe('about TradeRecord Service operation.', function() {
  let testUser, testUser2;
  let testPost;

  before(async(done) => {
    try {
      testUser = await User.create({
        "username": "TradeRecord testuser",
      });
      console.log("testUser.id=>", testUser.id);

      testUser2 = await User.create({
        "username": "TradeRecord testuser2",
      });
      console.log("testUser2.id=>", testUser2.id);

      let place = await Place.create({
        "name": 'Test',
        "address": 'address',
        "latitude": 0,
        "longitude": 0,
      })

      testPost = await Post.create({
        "uuid": '12311231231',
        "title": "TradeRecord",
        "startDate": "2015-12-01",
        "user_id": testUser.id
      });
      await testPost.addPlace(place.id);
      console.log("testPost.id=>", testPost.id);

      done();
    } catch (e) {
      console.log(e);
      done(e);
    }
  });

  // this part using testUser1
  describe('add and update a TradeRecord', () => {
    let testRecord, testRecord2;

    before(async(done) => {
      try {
        testRecord = await TradeRecord.create({
          status: "pedding",
          user_id: testUser.id,
          post_id: testPost.id
        });
        testRecord2 = await TradeRecord.create({
          status: "pedding",
          user_id: testUser.id,
          post_id: testPost.id
        });

        console.log("testRecord.id=>", testRecord.id);
        console.log("testRecord2.id=>", testRecord2.id);

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
        let records = await TradeRecordService.findRecordsByUserId(testUser.id);

        console.log("records=>", JSON.stringify(records, null, 2));

        records.should.be.object;
        records[1].status.should.be.equal(testRecord.status);

        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    it('find a specific TradeRecord by given post and user id, should success.', async(done) => {
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

    it.only('find a list of TradeRecords by given post id, should success.', async(done) => {
      try {
        let recordList = await TradeRecordService.findRecordsByPostId(testPost.id);
        
        console.log("recordList.length=>", recordList.length);
        console.log("recordList=>", JSON.stringify(recordList, null, 2));

        recordList.should.be.object;
        recordList.length.should.be.above(1);

        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

  }); // end describe

  // this part using testUser2
  describe('find user record list', () => {
    let testRecord, testRecord2;

    before(async(done) => {
      try {
        testRecord = await TradeRecord.create({
          status: "pedding",
          user_id: testUser2.id,
          post_id: testPost.id
        });
        testRecord2 = await TradeRecord.create({
          status: "pedding",
          user_id: testUser2.id,
          post_id: testPost.id
        });

        console.log("testRecord.id=>", testRecord.id);
        console.log("testRecord2.id=>", testRecord2.id);

        done();
      } catch (e) {
        console.log(e);
        done(e);
      }
    });

    it('find a user`s TradeRecords should success.', async(done) => {
      try {
        let records = await TradeRecordService.findRecordsByUserId(testUser2.id);

        console.log("records=>", JSON.stringify(records, null, 2));

        records.should.be.object;
        records[0].status.should.be.equal(testRecord.status);
        records[1].status.should.be.equal(testRecord2.status);

        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

  }); // end describe

}); // end describe
