/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async function(req, res, next) {
  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  console.log('==== session ====');
  console.log(req.headers);
  try {
    const hasHeader = typeof req.headers != "undefined";
    if (hasHeader) {
      const hasJwt = req.headers.jwt && req.headers.jwt != 'null';
      if (hasJwt) {
        if (UserService.getLoginState(req)) {
          return next();
        }
        let user = await AuthService.jwtDecode(req.headers.jwt);
        await UserService.userToSession(user, req);
        return next();
      } else {
        if (UserService.getLoginState(req)) {
          return next();
        }
      }
    }
    return res.forbidden();
  } catch (e) {
    return res.forbidden();
  }





  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.view('pages/403');
  // return res.redirect('/rest/auth/facebook')
};
