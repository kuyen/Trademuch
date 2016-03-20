module.exports = {

  pcOrMobile: async(req, res) => {
    try {
      if (/mobile/i.test(req.headers['user-agent'])) {
        return res.redirect('/app');
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
      let items = await PostService.getAllPost();
      // check login state
      let loginState = await UserService.getLoginState(req);
      let loginedUser = {},
        favorites = {},
        favIds = [],
        fbId = 0;

      if (loginState) {
        loginedUser = await UserService.getLoginUser(req);
        fbId = await UserService.getFBId(loginedUser.id);
        favorites = await FavoriteService.get({
          userId: loginedUser.id,
        });
        sails.log.info("| MainController.index:[loginedUser]", loginedUser);

        for (let i = 0; i < favorites.length; i++) {
          favIds.push(favorites[i].id);
        }
        sails.log.info("| MainController.index:[favIds]", favIds);

        for (let i = 0; i < favIds.length; i++) {
          items.data[favIds[i] - 1].isFav = true;
          sails.log.info("| MainController.index:[favId]%s,[itemsId]%s", favIds[i], items.data[favIds[i] - 1].id);
        }
        // sails.log.info("| MainController.index:[items]", items);
      } // end if

      sails.log.info("| MainController.index:[loginState]", loginState);

      // prepare user profile data
      let profile = {};
      if (loginState) {
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
          activity: Math.round(profilePost.length * 1.5 + favorites.length),
          fbId: fbId,
        }
      }

      // output!
      res.view('app', {
        loginState,
        favorites,
        items: items.data,
        profile,
      });
    } catch (e) {
      res.serverError(e);
    }
  },

  search: async(req, res) => {
    try {
      // find items
      let keyword = req.param('keyword');
      let items = await PostService.getPostByKeyword(keyword);

      sails.log.info("| MainController.search:[keyword]", keyword);
      sails.log.info("| MainController.search:[items]", items);

      // check login state
      let loginState = await UserService.getLoginState(req);
      let loginedUser = {},
        favorites = {},
        isFav = false,
        fbId = 0;

      if (loginState) {
        loginedUser = await UserService.getLoginUser(req);
        fbId = await UserService.getFBId(loginedUser.id);
        favorites = await FavoriteService.get({
          userId: loginedUser.id,
        });
        sails.log.info("| MainController.index:[loginedUser]", loginedUser);

        for (let i = 0; i < favorites.length; i++) {
          favIds.push(favorites[i].id);
        }
        sails.log.info("| MainController.index:[favIds]", favIds);

        for (let i = 0; i < favIds.length; i++) {
          items.data[favIds[i] - 1].isFav = true;
          csails.log.info("| MainController.index:[favId]%s,[itemsId]%s", favIds[i], items.data[favIds[i] - 1].id);
        }
        // sails.log.info("| MainController.index:[items]", items);
      } // end if

      sails.log.info("| MainController.index:[loginState]", loginState);

      // prepare user profile data
      let profile = {};
      if (loginState) {
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
          activity: Math.round(profilePost.length * 1.5 + favorites.length),
          fbId: fbId,
        }
      }

      // output!
      res.view('app', {
        loginState,
        favorites,
        profile,
        items,
        keyword,
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },


}
