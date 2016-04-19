module.exports = {

  create: async(date) => {
    try {

      let record = TradeRecord.create({
        type: data.type,
        user_id: data.user_id,
        post_id: data.post

      });

      return record;
    } catch (e) {
      throw e
    }
  },

};
