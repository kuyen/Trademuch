import sinon from 'sinon';

describe('about Post Controller operation.', function() {

  describe('about Post Controller operation.', function() {

    let like, item;
    before(async(done) => {
      try {
        let user = await User.create({
          "username": "testPost",
          "email": "testPostController@gmail.com",
          "age": 18
        });
        sinon.stub(UserService, 'getLoginState', (req) => {
          return true;
        });
        sinon.stub(UserService, 'getLoginUser', (req) => {
          return user;
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

        let createPost = await Post.create({
          "uuid": '12311231231',
          "title": "AAAA",
          "startDate": "2015-12-01",
          "user_id": testUser2.id
        });

        await createPost.addPlace(place.id)

        done();
      } catch (e) {
        done(e)
      }
    });

    after((done) => {
      UserService.getLoginState.restore();
      UserService.getLoginUser.restore();
      done();
    });

    it('add new Post have radioItem should success.', async(done) => {
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

        let result = await request(sails.hooks.http.app)
          .post('/rest/post/create')
          .send(send);

        result.status.should.be.equal(200);

        done();
      } catch (e) {
        done(e);
      }
    });



    it('get all post should success.', async(done) => {
      try {
        let result = await request(sails.hooks.http.app)
          .get('/rest/post');
        sails.log.info(result.body);
        result.status.should.be.equal(200);

        done();
      } catch (e) {
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
          "email": "testDelCOPost1@gmail.com",
          "age": 18
        });

        user2 = await User.create({
          "username": "testDelPost",
          "email": "testDelCOPost2@gmail.com",
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
          let result = await request(sails.hooks.http.app)
            .delete(`/rest/post/${post.id}`);
          result.status.should.be.equal(200);
          result.body.success.should.be.equal('ok');
          console.log(result.body);
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
          let result = await request(sails.hooks.http.app)
            .delete(`/rest/post/${post.id}`);
          result.status.should.be.equal(500);
          result.body.success.should.be.equal('fail');
          done()
        } catch (e) {
          console.log(e);
          done(e)
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
          "email": "testGetPostByUserIdController@gmail.com",
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
    			"email": "xcvxcvcsdfsdfvljlkasasd123@gmail.com",
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

    it('should success.', async(done) => {
      try {
        let posts = await request(sails.hooks.http.app).get(`/rest/post/mypost`);
        console.log("getPostByUserId",JSON.stringify(posts.body, null, 2));
        posts.status.should.be.equal(200);
        posts.body.data.length.should.be.equal(2);
        posts.body.data[1].should.have.property('lastMessage');
        posts.body.data[1].should.have.property('unReadCount');
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });
  });

  describe('set post status by user id', () => {
  let post, user;
  before(async(done) => {
    try {
      user = await User.create({
        "username": "testPost",
        "email": "testGetPostByUserIdController@gmail.com",
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
      const data = {
        postId: post.id,
        status: 'sold',
      };
      let result = await request(sails.hooks.http.app).put(`/rest/post/status`).send(data);
      console.log("update post status result",JSON.stringify(result.body, null, 2));
      result.status.should.be.equal(200);
      result.body.success.should.be.equal(true);
      let updatedPost = await Post.findById(post.id);
      updatedPost.status.should.be.equal('sold');
      done();
    } catch (e) {
      sails.log.error(e);
      done(e);
    }
  });
});

});
