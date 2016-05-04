describe('about Category Service .', function() {

  describe('Category ', () => {

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

    it('set post category', async (done) => {
      try {
        await CategoryService.add({
          postId: post.id,
          categoryIds: [1, 2, 3, 4, 5],
        });
        let postCategory = await PostCategory.findAll({
          where: {
            post_id: post.id,
          }
        });
        postCategory.length.should.be.equal(5);
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
        await post.addCategory(7);
        done();
      } catch (e) {
        console.log(e);
        done(e);
      }
    });

    it('set post category', async (done) => {
      try {
        let post = await CategoryService.searchById(7);
        post.length.should.be.equal(1);
        console.log(post);
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });
  });

});
