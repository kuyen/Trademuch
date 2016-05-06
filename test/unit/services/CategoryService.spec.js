describe('about Category Service .', function() {

  describe('Category ', () => {

    let testUser,post;
    before(async (done) => {
      try {

        testUser = await User.create({
          "username": "testuser",
          "email": '123cc1kjgdlfjgl@gmail.com',
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
        await post.addPlace(place.id);
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

    let testUser, post, category, category2;
    before(async (done) => {
      try {

        testUser = await User.create({
          "username": "testuser",
          "email": '1231kjgdlfjffgl@gmail.com',
        });

        category = await Category.create({
          id: 998,
          name: 'test',
        });
        category2 = await Category.create({
          id: 9998,
          name: 'test',
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
        await post.addCategory(category.id);
        await post.addPlace(place.id);

        post = await Post.create({
          "title": "BBB",
          "description": '1231',
          "startDate": "2015-12-01 08:00:00",
          "user_id": testUser.id,
        });
        await post.addCategory(category2.id);
        await post.addPlace(place.id);
        done();
      } catch (e) {
        console.log(e);
        done(e);
      }
    });

    it('set post category', async (done) => {
      try {
        let post = await CategoryService.searchById([category.id, category2.id]);
        post.length.should.be.equal(2);
        console.log(post);
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });
  });

});
