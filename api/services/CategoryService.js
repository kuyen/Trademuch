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

  searchById: async(id) => {
    try {
      let post = await Category.findAll({
        where: {
          id: id,
        },
        include: Post
      });
      return post;
    } catch (e) {
      throw e;
    }
  }
}
