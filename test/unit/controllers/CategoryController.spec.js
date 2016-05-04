describe('about Category Controller operation.', function() {

  describe('Category ', () => {

    let testUser,post;
    before(async (done) => {
      try {

        testUser = await User.create({
          "username": "testuser",
          "email": '1ss231kjgdlfjgl@gmail.com',
        });

	      post = await Post.create({
          "title": "BBB",
          "description": '1231',
          "startDate": "2015-12-01 08:00:00",
          "user_id": testUser.id,
        });
        const all = 1;
        await post.addCategory(all);

        done();
      } catch (e) {
        console.log(e);
        done(e);
      }
    });

    it('list', async (done) => {
      try {
        let result = await request(sails.hooks.http.app)
        .get('/rest/category');
        result.body.result.should.be.an.Array;
        console.log(result.body);
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    it('add', async (done) => {
      try {
        let result = await request(sails.hooks.http.app)
        .put('/rest/category')
        .send({
          postId: post.id,
          categoryIds: [1, 3, 4, 5],
        });
        result.body.success.should.be.true;
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

  });

  describe('Category search', () => {

    let testUser,post;
    before(async (done) => {
      try {

        testUser = await User.create({
          "username": "testuser",
          "email": '1231kjgdlfjgl@gmail.com',
        });

	      post = await Post.create({
          "title": "BBB",
          "description": '1231',
          "startDate": "2015-12-01 08:00:00",
          "user_id": testUser.id,
        });
        let place = await Place.create({
          "name": 'Test',
          "address": 'address',
          "latitude": 0,
          "longitude": 0,
        })
        await post.addCategory(7);
        await post.addPlace(place.id);
        done();
      } catch (e) {
        console.log(e);
        done(e);
      }
    });

    it('filter', async (done) => {
      try {
        let result = await request(sails.hooks.http.app)
        .get('/rest/category/7');
        console.log(result.body);
        result.body.success.should.be.true;
        result.body.result.length.should.equal(1);
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

  });
});
