module.exports = {

  hobby: async(req, res) => {
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

  favorites: async(req, res) => {
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

  profile: async(req, res) => {
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
