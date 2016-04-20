import sinon from 'sinon';
describe.only('about TradeRecord Controller operation.', function() { //skip
  describe('TradeRecordController.', () => {

    let testUser, testUser2, post, createPost, requestedPost;
    before(async(done) => {
      try {
        testUser = await User.create({
          "username": "testuser",
        });

        testUser2 = await User.create({
          "username": "testuser2",
        });

        sinon.stub(UserService, 'getLoginState', (req) => {
          return true;
        });

        sinon.stub(UserService, 'getLoginUser', (req) => {
          return testUser;
        });

        let place = await Place.create({
          "name": 'Test',
          "address": 'address',
          "latitude": 0,
          "longitude": 0,
        })

        createPost = await Post.create({
          "uuid": '12311231231',
          "title": "AAAA",
          "startDate": "2015-12-01",
          "user_id": testUser2.id
        });

        await createPost.addPlace(place.id)

        requestedPost = await Post.create({
          "uuid": '4564564uioi',
          "title": "requestedPost",
          "startDate": "2015-12-01",
          "user_id": testUser.id
        });
        await TradeRecord.create({
          user_id: testUser.id,
          post_id: requestedPost.id,
          status: "pedding"
        });

        await testUser.addPost(createPost.id)
        await testUser.addPost(requestedPost.id)
        await requestedPost.addPlace(place.id)
        done();
      } catch (e) {
        sails.log.info(e);
        done(e);
      }
    });

    after((done) => {
      UserService.getLoginState.restore();
      UserService.getLoginUser.restore();
      done();
    });

    it('post a request to add a TradeRecord should success.', async(done) => {
      try {

        let before = await testUser.getTradeRecords();

        let result = await request(sails.hooks.http.app)
          .post('/rest/trade/request/' + createPost.id);
        result.status.should.be.equal(200);

        let after = await testUser.getTradeRecords();
        result.should.be.an.Array;
        after.length.should.be.above(before.length)

        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    it('get TradeRecord status and accepted a trade request should success.', async(done) => {
      try {

        let before = await request(sails.hooks.http.app)
          .get('/rest/trade/status/' + requestedPost.id);

        let result = await request(sails.hooks.http.app)
          .put('/rest/trade/accepted/' + requestedPost.id);

        let after = await request(sails.hooks.http.app)
          .get('/rest/trade/status/' + requestedPost.id);

        sails.log.info("before.body=>", before.body);

        before.body.result.should.be.equal("pedding");
        result.status.should.be.equal(200);
        result.should.be.an.Array;
        after.body.result.should.be.equal("accepted");

        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    it('get a post`s TradeRecord status should success.', async(done) => {
      try {

        let result = await request(sails.hooks.http.app)
          .get('/rest/trade/status/' + requestedPost.id);
        sails.log.info("!!!", result.body);
        result.status.should.be.equal(200);

        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    it('get a user`s TradeRecord list should success.', async(done) => {
      try {

        let result = await request(sails.hooks.http.app)
          .get('/rest/trade/list');
        sails.log.info("!!!", result.body);
        result.status.should.be.equal(200);

        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

  });

});
