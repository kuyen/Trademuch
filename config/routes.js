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

   '/': 'UserController.pcOrMobile',

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
   'post /updateHobbyAndMail': 'UserController.updateHobbyAndMail',
   'get /hobby': 'UserController.hobbyView',
   'get /main': 'UserController.index',
   'get /story': 'PostController.story',
   'get /storyCategory': 'PostController.storyCategory',
   'get /storyDetail/:id': 'PostController.getStoryCategoryItemById',
   'post /getAllPost': 'PostController.getAllPost',
  // /rest/post/list
   'post /postStory': 'PostController.postStory',
   'get /postDetail/:id': 'PostController.getPostById',
   'get /postDetailf7/:id': 'PostController.getF7ViewPostById',

   'post /addUserFavorite/:id': 'UserController.addUserFavorite',
   'post /delUserFavorite/:id': 'UserController.delUserFavorite',
   'get /getUserFavorites': 'UserController.getUserFavorites',
   'get /favorites': 'UserController.getFavoriteView',
   'get /profile': 'UserController.getProfileView',


   // image
   'get /testUpload': 'ImageController.index',
   'post /api/uploadImage': 'ImageController.upload',
   'post /api/uploadImageBase64': 'ImageController.uploadBase64',

   // search
   'get /search': {
     view: 'search'
   },
   'get /search/:keyword': 'PostController.getPostByKeyword'


  // view
   'get /hobby': 'UserController.hobbyView',
   'get /main': 'UserController.index',
   'get /story': 'PostController.story',
   'get /storyCategory': 'PostController.storyCategory',
   'get /storyDetail/:id': 'PostController.getStoryCategoryItemById',
   'get /postDetail/:id': 'PostController.getPostById',
   'get /postDetailf7/:id': 'PostController.getF7ViewPostById',
   'get /favorites': 'UserController.getFavoriteView',
   'get /profile': 'UserController.getProfileView',
   'get /search': {
      view: 'search'
    },

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

   'post /rest/user/update/:id': 'UserController.updateHobbyAndMail',
   'get  /rest/user/favorites': 'UserController.getUserFavorites',
   'post /rest/user/add/favorite/:id': 'UserController.addUserFavorite',
   'post /rest/user/del/favorite/:id': 'UserController.delUserFavorite',
    // 待捕齊
    // get /rest/user/:id': 'UserController.getProfileById',

   'post /rest/post/create': 'PostController.postStory',
   'get  /rest/post/search/:keyword': 'PostController.getPostByKeyword'
   // 待捕齊
   // get /rest/post/:id': 'UserController.getPostById',


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
