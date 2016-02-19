module.exports = {
  findAll: async () => {
    try {
      return await User.findAll();
    } catch (e) {
      throw e;
    }
  },
  getLoginState: function(req) {
    if (req.session.authenticated) {
      return true;
    } else {
      return false;
    }
  },

  getLoginUser: function(req) {
    if (req.session.passport != undefined && req.session.passport.user) {
      return req.session.passport.user;
    } else {
      return null;
    }
  },

  getFBId: async(userId) => {
    try {
      let UserFaceBook = await Passport.findOne({
        where:{
          UserId: userId,
          provider: 'facebook'
        },
        attributes: { exclude: ['createdAt','updatedAt', 'protocol', 'password', 'accessToken', 'tokens'] }
      });
      return UserFaceBook.identifier;
    } catch (e) {
      throw e
    }
  }
}
