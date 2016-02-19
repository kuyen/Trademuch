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
          "title": "searchPost",
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

        let getData = await PostService.getPostByKeyword("searchPost");

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

});
