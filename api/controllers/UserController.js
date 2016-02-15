module.exports = {
  pcOrMobile: async(req, res) => {
    try {
      if (/mobile/i.test(req.headers['user-agent'])) {
        res.view('index')
      } else {
        res.view('landing')
      }
    } catch (e) {
      console.log(e);
      res.serverError(e);
    }
  },
  index: async(req, res) => {
    try {
      let allPosts = await PostService.getAllPost();
      let loginedUser, favorites;
      let userLogin = await UserService.getLoginState(req);
      console.log("==== user login status ===>", userLogin);

      let isFav = false;
      let userFBId;
      if (userLogin) {
        loginedUser = await UserService.getLoginUser(req);
        userFBId = await UserService.getFBId(loginedUser.id);
        // console.log("==== logined User is ===>", loginedUser);
        favorites = await UserService.getUserFavorites({
          userId: loginedUser.id
        });
        // console.log("==== user favorites are ===>", favorites);
        allPosts.data.forEach(function(post, index) {
          favorites.forEach(function(fav) {
            if (post.id === fav.id) post.isFav = true;
            // console.log("index",index);
          }); // end forEach
        }); // end forEach
      } // end if
      // console.log("==== user favorites status ===>", favorites);
      // console.log("==== user favorites status ===>", favorites.length);

      // profileViewData
      let profile = {};
      if (userLogin) {
        let profilePost = await Post.findAll({
          where: {
            UserId: loginedUser.id
          }
        });
        profile = {
          name: loginedUser.username,
          allUserPost: profilePost,
          postCount: profilePost.length,
          favCount: favorites.length,
          rate: profilePost.length * 1.5 + favorites.length
        }
      }
      res.view('main', {
        favorites: favorites,
        loginState: userLogin,
        // loginedUser: loginedUser,
        allPosts: allPosts.data,
        profile,
        userFBId
      });
    } catch (e) {
      res.serverError(e);
    }
  },

  find: async(req, res) => {
    try {
      let users = await UserService.findAll();
      res.ok({
        users
      });
    } catch (e) {
      res.serverError(e);
    }
  },

  updateHobbyAndMail: async(req, res) => {
    console.log("====updateHobbyAndMail===", req.body);
    try {
      let data = req.body;
      let user = AuthService.getLoginUser(req);

      if (data.email) {
        await UserService.updateUserMail({
          userId: user.id,
          userMail: data.email
        });
      }
      await UserService.updateUserLocation({
        userId: user.id,
        userLocation: data.location
      });
      await UserService.updateUserLike({
        userId: user.id,
        likeArray: data.hobby
      });
      res.ok('ok');
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  hobbyView: async(req, res) => {
    try {
      let isHasMail = req.query.hasMail;
      if (!isHasMail)
        res.redirect('/')

      let categorys = await PostService.getAllCategory();
      res.view('hobby', {
        isHasMail,
        categorys
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  addUserFavorite: async(req, res) => {
    try {
      sails.log.info("=== addUserFavorite ===", req.param('id'));
      let user = await UserService.getLoginUser(req);
      let data = {
        userId: user.id,
        postId: req.param('id')
      };
      let result = await UserService.addUserFavorite(data);
      res.ok(result);
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  delUserFavorite: async(req, res) => {
    try {
      sails.log.info("=== delUserFavorite ===", req.param('id'));
      let user = await UserService.getLoginUser(req);
      let data = {
        userId: user.id,
        postId: req.param('id')
      };
      let result = await UserService.delUserFavorite(data);
      res.ok('ok');
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  getUserFavorites: async(req, res) => {
    try {
      console.log("==== getUserFavorites ===");
      let user = await UserService.getLoginUser(req);
      let userFavorites = await UserService.getUserFavorites({
        userId: user.id
      });
      res.ok(userFavorites);
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  getFavoriteView: async(req, res) => {
    try {
      console.log("==== getFavoriteViews ===");
      let allPosts = await PostService.getAllPost();
      let loginState = await UserService.getLoginState(req);
      let loginedUser = await UserService.getLoginUser(req);
      let userFavorites = await UserService.getUserFavorites({
        userId: loginedUser.id
      });
      res.view('favorite', {
        favorites: userFavorites,
        loginState: loginState,
        loginedUser: loginedUser,
        allPosts: allPosts.data
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  getProfileView: async(req, res) => {
      try {
        console.log("==== getProfileView ===");
        let loginedUser = await UserService.getLoginUser(req);
        let userFBId = await UserService.getFBId(loginedUser.id);

        let favorites = await UserService.getUserFavorites({
          userId: loginedUser.id
        });

        let profilePost = await Post.findAll({
          where: {
            UserId: loginedUser.id
          }
        });

        let profile = {
          name: loginedUser.username,
          allUserPost: profilePost,
          postCount: profilePost.length,
          favCount: favorites.length,
          rate: profilePost.length * 1.5 + favorites.length
        }

        res.view('profile', {
          profile,
          userFBId
        });
      } catch (e) {
        sails.log.error(e);
        res.serverError(e);
      }
    } // end getProfileView
}
