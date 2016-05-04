module.exports = {

  list: async(req, res) => {
    try {
      let list = await CategoryService.list();
      res.ok({
        result: list,
      });
    } catch (e) {
      res.serverError(e);
    }
  },

}
