describe.only('about Category Service .', function() {

  describe('get Category list', () => {

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
        const all = 1;
        await post.addCategory(all);
        done();
      } catch (e) {
        console.log(e);
        done(e);
      }
    });

    it('should success', async (done) => {
      try {
        let result = await CategoryService.list();
        result.length.should.be.above(0);
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });
  });

});
