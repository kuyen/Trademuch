module.exports = {

  list: async(req, res) => {
    try {
      let list = await CategoryService.list();
      res.ok({
        success: true,
        result: list,
      });
    } catch (e) {
      res.serverError({
        success: false,
        msg: e
      });
    }
  },

  add: async(req, res) => {
    try {
      const data = req.body;
      const postId = data.postId;
      const categoryIds = data.categoryIds;
      await CategoryService.add({ postId, categoryIds });
      res.ok({
        success: true,
      });
    } catch (e) {
      res.serverError({
        success: false,
        msg: e
      });
    }
  },

  filter: async(req, res) => {
    try {
      let ids = req.param('categoryIds');
      ids = ids.split(',');
      let posts = await CategoryService.searchById(ids);
      res.ok({
        success: true,
        result: posts,
      })
    } catch (e) {
      res.serverError({
        success: false,
        msg: e
      });
    }
  },
}
