import sinon from 'sinon';

describe('about Post Service operation.', function() {

  describe('post new item', () => {

    before(async(done) => {
      try {
        let user = await User.create({
          "username": "testPost",
          "email": "testPost@gmail.com",
          "age": 18
        });

        sinon.stub(UserService, 'getLoginState', (req) => {
          return true;
        });

        sinon.stub(UserService, 'getLoginUser', (req) => {
          return user;
        });

        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    after(async(done) => {
      UserService.getLoginState.restore();
      UserService.getLoginUser.restore();
      done();
    });

    it('should success.', async(done) => {
      try {
        let send = {
          "mode": "give",
          "hobby": 1,
          "detail": {
            "title": "123",
            "startDate": "2015-12-25",
            "endDate": "2015-12-31",
            "price": "200",
            "radioItem": 1,
            "item": ""
          },
          "location": {
            "latitude": 24.148657699999998,
            "longitude": 120.67413979999999,
            "accuracy": 30
          }
        }

        let post = await PostService.create(send);
        post.id.should.be.an.INTEGER;

        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });
  });



  describe('get post', () => {

    let post, item;
    before(async(done) => {
      try {
        await Post.destroy({
          where: {
            id: {
              $gte: 1
            }
          }
        });
        let testUser2 = await User.create({
          "username": "testuser2",
        });

        let place = await Place.create({
          "name": 'Test',
          "address": 'address',
          "latitude": 0,
          "longitude": 0,
        })

        post = await Post.create({
          "uuid": '12311231231',
          "title": "searchPostA",
          "startDate": "2015-12-01",
          "user_id": testUser2.id
        });

        await post.addPlace(place.id)

        for (let i = 0; i < 10; i++) {
          let latitude = 51.5377994 + Math.random() / 100;
          let longitude = -0.1006775 + Math.random() / 100;
          let place = await Place.create({
            "latitude": latitude,
            "longitude": longitude,
          })
          let createPost = await Post.create({
            "title": "AAAA",
            "startDate": "2015-12-01",
            "user_id": testUser2.id
          });
          await createPost.addPlace(place.id)
        }

        done();
      } catch (e) {
        console.log(e);
        done(e)
      }
    });

    it('should success.', async(done) => {
      try {

        let getData = await PostService.getAllPost();

        // "data": [
        //   {
        //     "title": "Guilt Trattoria",
        //     "location": "1882 Trainer Avenue",
        //     "latitude": 51.560935,
        //     "longitude": -0.111365,
        //     "url": "item-detail.html",
        //     "type": "Restaurant",
        //     "type_icon": "../icons/store/apparel/bags.png",
        //     "rating": 4,
        //     "gallery": [
        //       "../img/items/5.jpg"
        //     ],
        //     "color": ""
        //   }
        // ]

        sails.log.info(JSON.stringify(getData.data[0], null, 2));
        getData.data.should.be.Array;

        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    it('should success.', async(done) => {
      try {
        let getData = await PostService.getPostById(post.id);
        sails.log.info(JSON.stringify(getData, null, 2));
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    // search
    it('search should success.', async(done) => {
      try {

        let getData = await PostService.getPostByKeyword("searchPostA");

        sails.log.info("search result=>", getData);
        getData.length.should.be.equal(1);
        getData.should.be.Array;

        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

  });

  describe('delete post', (done) => {
    let user1, user2;
    before(async(done) => {
      try {
        user1 = await User.create({
          "username": "testDelPost",
          "email": "testDelPost1@gmail.com",
          "age": 18
        });

        user2 = await User.create({
          "username": "testDelPost",
          "email": "testDelPost2@gmail.com",
          "age": 18
        });

        done();
      } catch (e) {
        console.log(e);
        done(e)
      }
    });

    describe('delete owen post', (done) => {
      let post;
      before(async(done) => {
        try {

          sinon.stub(UserService, 'getLoginState', (req) => {
            return true;
          });

          sinon.stub(UserService, 'getLoginUser', (req) => {
            return user1;
          });

          post = await Post.create({
            uuid: 'sdfsdfs123',
            title: 'test',
            startDate: '2014-12-1',
            endDate: '2014-12-10',
            user_id: user1.id,
            coverImage: ''
          });
          done()
        } catch (e) {
          done(e)
        }
      });

      after(async(done) => {
        UserService.getLoginState.restore();
        UserService.getLoginUser.restore();
        done();
      });


      it('user delete owen post', async(done) => {
        try {
          let before = await Post.findAll();
          console.log(before.length);
          await PostService.delete(user1.id, post.id);
          let after = await Post.findAll();
          before.length.should.be.above(after.length);
          done()
        } catch (e) {
          console.log(e);
          done(e)
        }
      })
    });

    describe('delete not user post', (done) => {
      let post;
      before(async(done) => {
        try {

          sinon.stub(UserService, 'getLoginState', (req) => {
            return true;
          });

          sinon.stub(UserService, 'getLoginUser', (req) => {
            return user2;
          });

          post = await Post.create({
            uuid: '123123123',
            title: 'test',
            startDate: '2014-12-1',
            endDate: '2014-12-10',
            user_id: user1.id,
            coverImage: ''
          });
          done()
        } catch (e) {
          done(e)
        }
      });

      after(async(done) => {
        UserService.getLoginState.restore();
        UserService.getLoginUser.restore();
        done();
      });


      it('user delete owen post', async(done) => {
        try {
          let before = await Post.findAll();
          console.log(before.length);
          await PostService.delete(user2.id, post.id);
          let after = await Post.findAll();
          before.length.should.be.equal(after.length);
          should.fail('no error was thrown when it should have been')
        } catch (e) {
          console.log(e);
          done()
        }
      });
    });
  });


  describe('get post by user id', () => {
    let post, user;
    before(async(done) => {
      try {
        user = await User.create({
          "username": "testPost",
          "email": "testGetPostByUserId@gmail.com",
          "age": 18
        });

        sinon.stub(UserService, 'getLoginState', (req) => {
          return true;
        });

        sinon.stub(UserService, 'getLoginUser', (req) => {
          return user;
        });

        let place = await Place.create({
          "name": 'Test',
          "address": 'address',
          "latitude": 1,
          "longitude": 2,
        })

        post = await Post.create({
          "title": "searchPostA",
          "startDate": "2015-12-01",
          "user_id": user.id,
          description: '12312123',
        });

        await post.addPlace(place.id)

        let place2 = await Place.create({
          "name": 'Test',
          "address": 'address',
          "latitude": 81,
          "longitude": 80,
        })

        let post2 = await Post.create({
          "title": "searchPostA",
          "startDate": "2015-12-01",
          "user_id": user.id,
          description: '12312123',
        });

        await post2.addPlace(place2.id)

        let chatUser = await User.create({
    			"username": "testuser2",
    			"email": "xcsdfsdfvljlkasasd123@gmail.com",
    			"age": 0,
    			"is_first_login": 1,
        });

        let room = await Room.create({
          "uuid": post2.id,
          "type": "public",
          "limit": 0
        });

        let chats = [{
          "uuid": '123e5345123',
          "type": "public",
          "content": "2016-03-10 17:07:59",
          "created_at": "2016-03-10 17:07:59",
          "room_id": room.id,
          "user_id": user.id
        },{
          "uuid": '123e534512312312',
          "type": "public",
          "content": "2016-03-10 17:08:59",
          "created_at": "2016-03-10 17:08:59",
          "room_id": room.id,
          "user_id": chatUser.id
        },
        {
          "uuid": '123e5345123',
          "type": "public",
          "content": "2016-03-10 17:10:59",
          "created_at": "2016-03-10 17:10:59",
          "room_id": room.id,
          "user_id": user.id
        }]
        let chat = await Chat.bulkCreate(chats);

        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    after(async(done) => {
      UserService.getLoginState.restore();
      UserService.getLoginUser.restore();
      done();
    });

    it.only('should success.', async(done) => {
      try {
        let posts = await PostService.getPostByUserId(user.id);
        console.log("getPostByUserId",posts);
        posts.length.should.be.equal(2);
        posts[1].should.have.property('lastMessage');
        posts[1].should.have.property('unReadCount');
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });
  });

});
