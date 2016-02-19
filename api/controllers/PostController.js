module.exports = {

  create: async(req, res) => {
    try {
      console.log("==== postStory ===", req.body);
      let data = req.body;
      await PostService.create(data, req);
      res.ok('ok');
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  // search
  search: async(req, res) => {
    try {
      var keyword = req.param('keyword');
      console.log("==== getPostByKeyword ===", keyword);
      let items = await PostService.getPostByKeyword(keyword);
      console.log("=== item[0] ===\n",items[0]);
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
      if(userLogin){
        loginedUser = await UserService.getLoginUser(req);
        // console.log("==== logined User is ===>", loginedUser);
        favorites = await UserService.getUserFavorites({userId:loginedUser.id});
        // console.log("==== user favorites are ===>", favorites);
        result.data.forEach(function(post,index){
          favorites.forEach(function(fav){
            if(post.id===fav.id) post.isFav = true;
            // console.log("index",index);
          }); // end forEach
        });// end forEach
      } // end if
      res.ok(result);
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

}
