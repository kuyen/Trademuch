 /**
  * Route Mappings
  * (sails.config.routes)
  *
  * Your routes map URLs to views and controllers.
  *
  * If Sails receives a URL that doesn't match any of the routes below,
  * it will check for matching files (images, scripts, stylesheets, etc.)
  * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
  * might match an image file: `/assets/images/foo.jpg`
  *
  * Finally, if those don't match either, the default 404 handler is triggered.
  * See `api/responses/notFound.js` to adjust your app's 404 logic.
  *
  * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
  * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
  * CoffeeScript for the front-end.
  *
  * For more information on configuring custom routes, check out:
  * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
  */

 module.exports.routes = {

   /***************************************************************************
    *                                                                          *
    * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
    * etc. depending on your default view engine) your home page.              *
    *                                                                          *
    * (Alternatively, remove this and add an `index.html` file in your         *
    * `assets` directory)                                                      *
    *                                                                          *
    ***************************************************************************/
   '/public':{
     view: 'landing'
   },

   '/2': {
     view: 'index2'
   },

   '/map': {
     view: 'map'
   },

   '/storyDetail': {
     view: 'storyDetail'
   },

   '/TermService' : {
     view: 'TermService'
   },

   '/PrivacyPolicy' : {
     view: 'PrivacyPolicy'
   },

   '/Specification' : {
     view: 'Specification'
   },

   '/learnMore' : {
     view: 'learnMore'
   },

   'get /login': 'AuthController.login',
   'get /logout': 'AuthController.logout',
   'get /register': 'AuthController.register',

   'get /auth/status': 'AuthController.status',

   'post /auth/local': 'AuthController.callback',
   'post /auth/local/:action': 'AuthController.callback',

   'get /auth/:provider': 'AuthController.provider',
   'get /auth/:provider/callback': 'AuthController.callback',
   'get /auth/:provider/:action': 'AuthController.callback',

   //  /rest/{controllers}/{action}
   'post /updateHobbyAndMail': 'UserController.update',
   'get /hobby': 'FrontUserController.hobby',
   'get /main': 'MainController.index',
   'get /story': 'PostController.create',
   'get /storyCategory': 'FrontPostController.createCategory',
   'get /storyDetail/:categoryId': 'FrontPostController.createByCategoryId',
   'post /getAllPost': 'PostController.getAll',
  // /rest/post/list
   'post /postStory': 'PostController.create',
   'get /postDetail/:id': 'FrontPostController.show',
   'get /postDetailf7/:id': 'FrontPostController.showF7',

   'post /addUserFavorite/:id': 'FavoriteController.create',
   'post /delUserFavorite/:id': 'FavoriteController.delete',
   'get /getUserFavorites': 'FavoriteController.show',
   'get /favorites': 'FrontUserController.favorites',
   'get /profile': 'FrontUserController.profile',


   // image
   'get /testUpload': 'ImageController.index',
   'post /api/uploadImage': 'ImageController.upload',
   'post /api/uploadImageBase64': 'ImageController.upload',

   // search
   'get /search': {
     view: 'search'
   },
   'get /search/:keyword': 'PostController.search',


  // view
   '/': 'MainController.pcOrMobile',
   'get /main': 'MainController.index',

   'get /user/hobby': 'FrontUserController.hobby',
   'get /user/favorites': 'FrontUserController.favorites',
   'get /user/profile': 'FrontUserController.profile',

   'get /post/create/Category': 'FrontPostController.createCategory',
   'get /post/create/:categoryId': 'FrontPostController.createByCategoryId',
   'get /post/:id': 'FrontPostController.show',
   'get /post/f7/:id': 'FrontPostController.showF7',

  //  api
   'get  /rest/auth/login': 'AuthController.login',
   'get  /rest/auth/logout': 'AuthController.logout',
   'get  /rest/auth/register': 'AuthController.register',
   'get  /rest/auth/auth/status': 'AuthController.status',
   'post /rest/auth/local': 'AuthController.callback',
   'post /rest/auth/local/:action': 'AuthController.callback',
   'get  /rest/auth/:provider': 'AuthController.provider',
   'get  /rest/auth/:provider/callback': 'AuthController.callback',
   'get  /rest/auth/:provider/:action': 'AuthController.callback',

   'put  /rest/user/:id': 'UserController.update',
   // 待捕齊
   // get /rest/user/:id': 'UserController.find',

   'get  /rest/favorites': 'FavoriteController.show',
   'post /rest/favorite/:id': 'FavoriteController.create',
   'delete /rest/favorite/:id': 'FavoriteController.delete',

   'post /rest/post/create': 'PostController.create',
   'get  /rest/post': 'PostController.getAll',
   'get  /rest/post/search/:keyword': 'PostController.search',
   // 待捕齊
   // get /rest/post/:id': 'PostController.find',

   'post /rest/image/upload': 'ImageController.upload',


   /***************************************************************************
    *                                                                          *
    * Custom routes here...                                                    *
    *                                                                          *
    * If a request to a URL doesn't match any of the custom routes above, it   *
    * is matched against Sails route blueprints. See `config/blueprints.js`    *
    * for configuration options and examples.                                  *
    *                                                                          *
    ***************************************************************************/

 };
