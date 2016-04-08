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
          avatar: `http://graph.facebook.com/${data.FBUserID}/picture?type=large`
        });
        passport.UserId = user.id;
        passport = await passport.save();
      }else{
        passport.accessToken = data.FBToken;
        passport = await passport.save();
        user = await User.findById(passport.UserId);
      }
      const token = jwt.sign({
        userId: passport.UserId,
        FBUserID: passport.identifier,
      },sails.config.jwt.secret)
      console.log('==user==', user.isAgreePolicy);
      return {
        userId: user.id,
        userName: user.username,
        email: user.email,
        avatar: user.avatar,
        isFirstLogin: user.isFirstLogin,
        isAgreePolicies: user.isAgreePolicies,
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
      let user = {};
      if(findUser){
        user = await User.findById(decoded.userId);
      }
      return user;
    } catch (e) {
      throw e;
    }
  }
}
