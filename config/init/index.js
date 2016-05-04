// import fs from 'fs-extra';

let like;

let self = module.exports = {

  basicData: async () => {
    let categorys = [
      { name: 'All 都想要'},
      { name: '保養品' },
      { name: '3C產品' },
      { name: '居家用品' },
      { name: '生活家電' },
      { name: '運動用品' },
      { name: '課本講義' },
    ];
    // // await Like.bulkCreate(like);
    for(let category of categorys){
      await Category.findOrCreate({
        where:{
          name: category.name
        },
        defaults: category
      });
    }
    if (sails.config.environment === 'development' || sails.config.environment === 'test') {
      let user = await User.create({username: 'testuser', email: 'test@gmail.com'});
      let passport = await Passport.create({provider: 'local', password: 'testuser'});
      await self.testData();
    }
  },

  testData: async () => {

    let testUser2 = await User.create({
			"username": "testuser2",
    });

    let place = await Place.create({
      "name": 'Test',
      "address": 'address',
      "latitude": 0,
      "longitude": 0,
    })

    let post = await Post.create({
      "uuid": '12311231231',
      "title": "searchPost",
      "startDate": "2015-12-01",
      "user_id": testUser2.id
    });

    let record = await TradeRecord.create({
      user_id: testUser2.id,
      post_id: post.id,
      state: "accepted"
    });

    await post.addPlace(place.id);
    await post.addCategory(1);
    if(sails.config.elasticsearch.open || false){
      await ElasticsearchService.addPost({
        id: post.id,
        title: post.title,
        location:{
          lat: 0,
          lon: 0
        }
      })
    }

    for (let i = 0; i < 30; i++) {
      let latitude = 37.785834 + Math.random() / 100;
      let longitude = -122.406417 + Math.random() / 100;
      let place = await Place.create({
        "latitude": latitude,
        "longitude": longitude,
      })
      let createPost = await Post.create({
        "title": "AAA " + i,
        "startDate": "2015-12-01",
        "user_id": testUser2.id
      });
      await createPost.addPlace(place.id);
      await createPost.addCategory(1);

      if(sails.config.elasticsearch.open || false){
        await ElasticsearchService.addPost({
          id: createPost.id,
          title: createPost.title,
          location:{
            lat: latitude,
            lon: longitude
          },
          pic: '/img/items/1.jpg'
        })
      }
    }
  }
}
