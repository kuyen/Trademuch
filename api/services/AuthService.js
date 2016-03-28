import axios from 'axios';
import jwt from 'jsonwebtoken';

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
  appRegister: async(data) => {
    try {
      let passport =  await Passport.findOne({
        where: {
          protocol: 'app',
          provider: 'facebook',
          identifier: data.FBUserID,
          accessToken: data.FBToken,
        }
      });
      let user;
      if(!passport){
        passport = await Passport.create({
          protocol: 'app',
          provider: 'facebook',
          identifier: data.FBUserID,
          accessToken: data.FBToken,
        });
        const userData = await axios.get(`https://graph.facebook.com/v2.5/${data.FBUserID}?fields=id,name,email&access_token=${data.FBToken}`);
        user = await User.create({
          username: userData.data.name,
          email: userData.data.email,
        });
        passport.UserId = user.id;
        passport = await passport.save();
      }else{
        user = await User.findById(passport.UserId);
      }
      const token = jwt.sign({
        userId: passport.UserId,
        FBUserID: passport.identifier,
      },sails.config.jwt.secret)
      return {
        userId: user.id,
        userName: user.username,
        email: user.email,
        jwt: token,
      };
    } catch (e) {
      throw e;
    }

  },

  jwtDecode: async(token) => {
    try {
      var decoded = jwt.verify(token, sails.config.jwt.secret);
      let findUser = await Passport.findOne({
        where:{
          identifier: decoded.FBUserID,
          UserId: decoded.userId,
        }
      })
      let user = {}
      if(findUser){
        user = await User.findById(decoded.userId);
      }
      return user;
    } catch (e) {
      throw e;
    }
  }
}
