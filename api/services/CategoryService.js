module.exports = {

  list: async() => {
    try {
      sails.log.info("Category list");
      let list = await Category.findAll();
      return list;
    } catch (e) {
      throw e;
    }
  }
}
