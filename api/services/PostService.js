module.exports = {

  create: async(data, req) => {
    try {
      let user = UserService.getLoginUser(req);
      console.log("???????????",data);
      let place = await Place.create({
        "latitude": data.location.latitude,
        "longitude": data.location.longitude,
      });
      let post = await Post.create({
        uuid: '',
        title: data.detail.title,
        startDate: data.detail.startDate,
        endDate: data.detail.endDate,
        user_id: user.id,
        coverImage: data.images
      });
      await post.addPlace(place.id);
      return post;
    } catch (e) {
      throw e;
    }
  },

  getAllPost: async() => {
    try {
      let getPost = await Post.findAll({
        include: [{
          model: Place
        },{
          model: User
        }],
        order: 'createdAt DESC'
      });
      // sails.log.info("getPost[0]=>", JSON.stringify(getPost[0],null,2));

      let postArray = getPost.map((post) => {
        let pic = post.coverImage;
        if(!pic) pic = 'img/items/1.jpg';
        let data = {
          id: post.id,
          title: post.title,
          mode: post.mode || '',
          price: post.price || '',
          location: post.Places[0].name || post.Places[0].address || `${post.Places[0].latitude},${post.Places[0].longitude}`,
          latitude: post.Places[0].latitude,
          longitude: post.Places[0].longitude,
          url: `/post/f7/${post.id}`,
          type: '',
          type_icon: "../icons/give.png",
          gallery: [pic],
          content: post.content || '',
          itemname: post.title || '',
          username: post.User.username || post.User.fullName || post.User.fullName
        };
        return data;
      });

      postArray = {
        data: postArray
      }
      return postArray;
    } catch (e) {
      throw e;
    }
  },

  getPostById: async(id) => {
    try {
      let post = await await Post.findOne({
        where: {
          id: id
        },
        include: [{
          model: Place
        },{
          model: User
        }],
      });

      let pic = post.coverImage;
      if(!pic) pic = 'img/items/1.jpg';

      let data = {
        id: post.id,
        title: post.title,
        mode: post.mode || '',
        price: post.price || '',
        location: post.Places[0].name || post.Places[0].address || `${post.Places[0].latitude},${post.Places[0].longitude}`,
        latitude: post.Places[0].latitude,
        longitude: post.Places[0].longitude,
        url: `/post/f7/${post.id}`,
        type: '',
        type_icon: "../icons/give.png",
        gallery: "/" + pic,
        content: post.content || '',
        itemname: post.title || '',
        username: post.User.username || post.User.fullName || post.User.fullName ,
        email: post.User.email || '',
        telephone: post.User.telephone || '',
      };
      return data;
    } catch (e) {
      throw e;
    }
  },

  getAllCategory: async() => {
    try {
      // let like = await Like.findAll();
      let like = [
        {title: '時尚', pic: '/img/hobby/fashion-woman.png'},
        {title: '美妝保養', pic: '/img/hobby/beauty.png'},
        {title: '設計工藝', pic: '/img/hobby/Design-Process.png'},
        {title: '生活3C', pic: '/img/hobby/TechnologyProducts.png'},
        {title: '運動用品', pic: '/img/hobby/sport-foot.png'},
        {title: '攝影拍照', pic: '/img/hobby/camera.png'},
        {title: '名牌精品', pic: '/img/hobby/famousbrand.png'},
        {title: '復古風情', pic: '/img/hobby/Retro.png'},
        {title: '遊戲玩物', pic: '/img/hobby/game.png'},
        {title: '傢具傢居', pic: '/img/hobby/Furniture.png'},
        {title: '課本買賣', pic: '/img/hobby/books.png'},
        {title: '書籍雜誌', pic: '/img/hobby/magazines.png'},
        {title: '樂器樂譜', pic: '/img/hobby/ukulele.png'},
        {title: '廚房家電', pic: '/img/hobby/kitchen.png'},
        {title: '寶寶時尚', pic: '/img/hobby/baby.png'},
        {title: '寵物用品', pic: '/img/hobby/dog.png'},
        {title: '票卷交換', pic: '/img/hobby/tickets.png'},
        {title: '哩哩扣扣', pic: '/img/hobby/other.png'},
        {title: '預售代購', pic: '/img/hobby/sale.png'}
      ]
      sails.log.info(like);
      return like;
    } catch (e) {
      throw e;
    }
  },

  // search
  getPostByKeyword: async(keyword) => {
      try {
        let getPosts = await Post.findAll({
          where: {
            'title': {
              $like: '%'+keyword+'%'
            }
          },
          include: [{
            model: Place
          },{
            model: User
          }],
          order: 'createdAt DESC'
        });
        var data = [];
        getPosts.forEach(function(post) {
          let pic = post.coverImage;
          if(!pic) pic = 'img/items/1.jpg';
          data.push({
            id: post.id,
            title: post.title,
            mode: post.mode || '',
            price: post.price || '',
            location: post.Places[0].name || post.Places[0].address || `${post.Places[0].latitude},${post.Places[0].longitude}`,
            latitude: post.Places[0].latitude,
            longitude: post.Places[0].longitude,
            url: `/post/f7/${post.id}`,
            type: '',
            type_icon: "../icons/give.png",
            gallery: [pic],
            content: post.content || '',
            itemname: post.title || '',
            username: post.User.username || post.User.fullName || post.User.fullName ,
            email: post.User.email || '',
            telephone: post.User.telephone || '',
          });
        }); // end forEach
        console.log("data length=>", data.length);
        return data;
      } catch (e) {
        throw e;
      }
    } // end search

}
