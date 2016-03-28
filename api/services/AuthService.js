import axios from 'axios';
module.exports = {

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
  appLogin: async(data) => {
    try {
      let passport =  await Passport.findOne({
        where: {
          protocol: 'app',
          provider: 'facebook',
          identifier: data.userID,
          accessToken: data.tokenString,
        }
      });
      let user;
      if(!passport){
        passport = await Passport.create({
          protocol: 'app',
          provider: 'facebook',
          identifier: data.userID,
          accessToken: data.tokenString,
        });
        const userData = await axios.get(`https://graph.facebook.com/v2.5/${data.userID}?fields=id,name,email&access_token=${data.tokenString}`);
        user = await User.create({
          username: userData.data.name,
          email: userData.data.email,
        });
        passport.UserId = user.id;
        await passport.save();
      }else{
        user = await User.findById(passport.UserId);
      }
      return user;
    } catch (e) {
      throw e;
    }
  },
}
