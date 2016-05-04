describe.skip('about User Controller operation.', function() {

  describe('update user mail & location', () => {

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

    it('readed policy', async (done) => {
      try {
        let result = await request(sails.hooks.http.app)
        .post('/rest/user/agree-policies');
        result.body.isAgreePolicies.should.be.true;
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

  });
});
