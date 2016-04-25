module.exports = {

  create: async(req, res) => {
    try {
      console.log("==== postStory ===", req.body);
      let data = req.body;
      let result = await PostService.create(data, req);
      res.ok(result);
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },
  // search
  sqlSearch: async(req, res) => {
    try {
      var keyword = req.param('keyword');
      console.log("==== getPostByKeyword ===", keyword);
      let items = await PostService.getPostByKeyword(keyword);
      console.log("=== item[0] ===\n", items[0]);
      res.ok({
        items
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  elasticSearch: async(req, res) => {
    try {
      let keyword = req.param('keyword');
      let distance = req.param('distance');
      let lat = req.param('lat');
      let lon = req.param('lon');
      let from = req.param('from');
      let location;
      if (lat) {
        location = {
          lat,
          lon,
        };
      }
      console.log("==== elasticSearch ===", keyword);
      let items = await ElasticsearchService.postPlace({
        keyword: keyword,
        distance: distance,
        location: location,
        from: from,
      });
      if (req.headers.jwt != 'null') {
        const user = await AuthService.jwtDecode(req.headers.jwt);
        if (Object.keys(user).length !== 0) {
          UserService.userToSession(user, req);
          let loginedUser = await UserService.getLoginUser(req);
          let favorites = await FavoriteService.get({
            userId: loginedUser.id
          });
          items.forEach(function(post, index) {
            favorites.forEach(function(fav) {
              if (post.id === fav.id) post.isFav = true;
            });
          });
        }
      }
      res.ok({
        items
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  getAll: async(req, res) => {
    try {
      let result = await PostService.getAllPost();
      let loginedUser, favorites;
      let userLogin = await UserService.getLoginState(req);
      let isFav = false;
      if (userLogin) {
        loginedUser = await UserService.getLoginUser(req);
        // console.log("==== logined User is ===>", loginedUser);
        favorites = await FavoriteService.get({
          userId: loginedUser.id
        });
        // console.log("==== user favorites are ===>", favorites);
        result.data.forEach(function(post, index) {
          favorites.forEach(function(fav) {
            if (post.id === fav.id) post.isFav = true;
            // console.log("index",index);
          }); // end forEach
        }); // end forEach
      } // end if
      res.ok(result);
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  getPostById: async(req, res) => {
    try {
      console.log("==== getPostById ===", req.param('id'));
      let post = await PostService.getPostById(req.param('id'));
      let fbId = 0;

      let login = await UserService.getLoginState(req);
      let isFav = false;
      if (login) {
        let user = await UserService.getLoginUser(req);
        let UserFavorites = await FavoriteService.get({
          userId: user.id
        });
        console.log("===UserFavorites[0]=>", UserFavorites[0]);
        let itemId = req.param('id');
        fbId = await UserService.getFBId(user.id);
        console.log("fbId=>", fbId);
        UserFavorites.forEach(function(fav) {
          if (fav.id == itemId) isFav = true;
        }); // end forEach
      }
      res.ok({
        post,
        isFav,
        fbId
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  delete: async(req, res) => {
    try {
      let user = await UserService.getLoginUser(req);
      let postId = req.param('postId');
      await PostService.delete(user.id, postId);
      res.ok({
        success: 'ok'
      });
    } catch (e) {
      console.log(e);
      res.serverError({
        success: 'fail',
        message: e.message
      });
    }
  },

  getUserAllPost: async(req, res) => {
    try {
      let user = await UserService.getLoginUser(req);
      let posts = await PostService.getPostByUserId(user.id);
      let postWithRecords = [];

      for (let post of posts) {
        let records = await TradeRecordService.findRecordsByPostId(post.id);
        console.log("post id %d records=>", post.id, records);
        if (records) {
          post.requests = records.length;
          post.records = records;
        } else post.requests = 0;
        postWithRecords.push(post);
      }

      console.log("postWithRecords=>", postWithRecords);

      res.ok({
        data: postWithRecords,
      });
    } catch (e) {
      console.log(e);
      res.serverError({
        success: 'fail',
        message: e.message
      });
    }
  },

  setPostStatus: async(req, res) => {
    try {
      let result = await PostService.setPostStatus(req.body.postId, req.body.status);
      res.ok({
        success: true
      });
    } catch (e) {
      console.log(e);
      res.serverError({
        success: false,
        message: e.message
      });
    }
  }

}
