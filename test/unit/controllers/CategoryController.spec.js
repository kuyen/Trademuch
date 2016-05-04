describe.only('about Category Controller operation.', function() {

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
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

  });
});
