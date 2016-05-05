module.exports = {

  list: async() => {
    try {
      sails.log.info("Category list");
      let list = await Category.findAll();
      return list;
    } catch (e) {
      throw e;
    }
  },

  add: async({postId, categoryIds}) => {
    try {
      let post = await Post.findById(postId);
      await post.addCategory(categoryIds);
    } catch (e) {
      throw e;
    }
  },

  searchById: async(array) => {
    try {
      let post = await Post.findAll({
        include: [{
          model: Category,
          where: {
            id: array,
          },
        },{
          model: Place,
        }],
      });
      post = await PostService.postListFormat(post);
      return post;
    } catch (e) {
      throw e;
    }
  }
}
