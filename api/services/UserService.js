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

  userToSession: async(user, req) => {
    try {
      req.session.authenticated = true;
      req.session.passport = {
        user: user
      }
      let find = await User.findById(user.id);
      if (!find) {
        req.session.authenticated = false;
        delete req.session.passport.user
        throw Error('User forbidden');
      }
    } catch (e) {
      throw e;
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
  },

  updateUserMail: async({userId,userMail,userLocation}) => {
    try {
      sails.log.info("updateUserMail(userId,userMail)=>",userId,userMail);
      let user = await User.findById(parseInt(userId,10));
      user.email = userMail;
      user.isFirstLogin = false;
      user = await user.save();
      return user;
    } catch (e) {
      throw e;
    }
  },

  agreePolicies: async(userId) => {
    try {
      let user = await User.findById(userId);
      user.isAgreePolicies = true;
      user.agreePolicyTime = sails.moment();
      user = await user.save();
      return {
        isAgreePolicies:  true,
      }
    } catch (e) {
      throw e;
    }
  }
}
