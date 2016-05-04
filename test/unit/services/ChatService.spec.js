describe('about Chat Service .', function() {

  describe('get last chat', () => {

    let test_room_1, test_user_1, test_chatUser_1;
    let test_chat_1, test_post_1, chats;
    before(async (done) => {
      try {

        test_user_1 = await User.create({
    			"username": "testuser2",
    			"email": "xcvljlk123@gmail.com",
    			"age": 0,
    			"is_first_login": 1,
        });

        test_chatUser_1 = await User.create({
    			"username": "testuser2",
    			"email": "xcvljlkasasd123@gmail.com",
    			"age": 0,
    			"is_first_login": 1,
        });

        test_post_1 = await Post.create({
    			"uuid": "sdfglsdfglkj",
    			"title": "searchPost",
    			"startDate": "2015-12-01 08:00:00",
    			"created_at": "2016-03-10 17:07:59",
    			"updated_at": "2016-03-10 17:07:59",
    			"user_id": test_user_1.id
        })

        test_room_1 = await Room.create({
          "uuid": test_post_1.uuid,
          "type": "public",
          "limit": 0
        });

        chats = [{
          "uuid": '123e5345123',
          "type": "public",
          "content": "1231213",
          "created_at": "2016-03-10 17:07:59",
          "room_id": test_room_1.id,
          "user_id": test_user_1.id
        },{
          "uuid": '123e534512312312',
          "type": "public",
          "content": "1231213",
          "created_at": "2016-03-10 17:08:59",
          "room_id": test_room_1.id,
          "user_id": test_chatUser_1.id
        },
        {
          "uuid": '123e5345123',
          "type": "public",
          "content": "1231213",
          "created_at": "2016-03-10 17:10:59",
          "room_id": test_room_1.id,
          "user_id": test_user_1.id
        }]
        test_chat_1 = await Chat.bulkCreate(chats);

        done();
      } catch (e) {
        console.log(e);
        done(e);
      }
    });

    it('should success.', async (done) => {
      try {
        let result = await ChatService.lastOnehistory(test_post_1.uuid, test_user_1.id);
        console.log(result);
        result.content.should.be.equal(chats[1].content);
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });
  });


  describe('get message count by item id.', () => {

    let room, itemOwner, chatUser, chat, post, chats;
    before(async (done) => {
      try {

        itemOwner = await User.create({
    			"username": "testuser_getMsgCountByItemId_A",
    			"email": "xcvljl123k123123@gmail.com",
    			"age": 100,
    			"is_first_login": 1,
        });

        chatUser = await User.create({
    			"username": "testuser_getMsgCountByItemId_B",
    			"email": "xcvljlkasaqwdeqwassd123@gmail.com",
    			"age": 0,
    			"is_first_login": 1,
        });

        post = await Post.create({
    			"uuid": "sdfglsdfglkj",
    			"title": "searchPost",
    			"startDate": "2015-12-01 08:00:00",
    			"created_at": "2016-03-10 17:07:59",
    			"updated_at": "2016-03-10 17:07:59",
    			"user_id": itemOwner.id
        })

        room = await Room.create({
          "uuid": post.uuid,
          "type": "public",
          "limit": 0
        });

        chats = [{
          "uuid": '123e5345123',
          "type": "public",
          "content": "1231213",
          "created_at": "2016-03-10 17:07:59",
          "room_id": room.id,
          "user_id": chatUser.id
        },{
          "uuid": '123e534512312312',
          "type": "public",
          "content": "1231213",
          "created_at": "2016-03-10 17:08:59",
          "room_id": room.id,
          "user_id": chatUser.id
        },
        {
          "uuid": '123e5345123',
          "type": "public",
          "content": "1231213",
          "created_at": "2016-03-10 17:10:59",
          "room_id": room.id,
          "user_id": itemOwner.id
        }]
        chat = await Chat.bulkCreate(chats);

        done();
      } catch (e) {
        console.log(e);
        done(e);
      }
    });

    it('should success.', async (done) => {
      try {

        let result = await ChatService.getPostChatCountById(post.uuid, itemOwner.id);
        console.log(result);
        result.should.be.equal(3);
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });
  });

});
