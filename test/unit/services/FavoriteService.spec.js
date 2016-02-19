describe.only('about User Service operation.', function() {

  describe('User Favorite', () => {

    let testUser, post, item, createPost, createPost2;
    before(async (done) => {

      testUser = await User.create({
  			"username": "testuser",
      });

      let like3c = await Like.create({
        title: '測試Ｇet生活3C'
      });

      item = await Item.create({
        itemname: "Server",
        LikeId: like3c.id
      })

      post = {
        title: "testTitle",
        content: 'content',
        startDate: "2015-12-25",
        endDate: "2015-12-31",
        price: "200",
        mode: "give",
        createdAt: "2015-12-15 10:09:07",
        updatedAt: "2015-12-15 10:09:07",
        ItemId: item.id,
        UserId: 1,
        latitude: 24.148657699999998,
        longitude: 120.67413979999999,
        geometry: {
          type: 'Point',
          coordinates: [24.148657699999998,120.67413979999999]
        }
      }

      createPost = await Post.create(post);
      post = {
        title: "testTitlsdfe",
        content: 'content',
        startDate: "2015-12-25",
        endDate: "2015-12-31",
        price: "200",
        mode: "give",
        createdAt: "2015-12-15 10:09:07",
        updatedAt: "2015-12-15 10:09:07",
        ItemId: item.id,
        UserId: 1,
        latitude: 23.148657699999998,
        longitude: 120.67413979999999,
        geometry: {
          type: 'Point',
          coordinates: [23.148657699999998,120.67413979999999]
        }
      }

      createPost2 = await Post.create(post);
      await testUser.addPost(createPost2.id)
      done();
    });

    it('add favorite should success.', async (done) => {
      try {

        let send = {
          userId: testUser.id,
          postId: createPost.id
        }

        let before = await testUser.getPosts();
        let result = await UserService.addUserFavorite(send);
        let after = await testUser.getPosts();
        result.should.be.an.Array;
        after.length.should.be.above(before.length)
        done();

      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    it('del favorite should success.', async (done) => {
      try {

        let send = {
          userId: testUser.id,
          postId: createPost2.id
        }
        console.log(send);
        let before = await testUser.getPosts();
        let result = await UserService.delUserFavorite(send);
        let after = await testUser.getPosts();
        result.should.be.an.Array;
        after.length.should.be.below(before.length)
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    it('get favorites should success.', async (done) => {
      try {

        let send = {
          userId: testUser.id,
        }

        let result = await UserService.getUserFavorites(send);
        result.should.be.an.Array;
        done();

      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

  });

});
