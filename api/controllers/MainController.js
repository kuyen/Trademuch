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
        favorites = await FavoriteService.get({
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
          activity: Math.round(profilePost.length * 1.5 + favorites.length)
        }
      }
      res.view('app2', {
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
}
