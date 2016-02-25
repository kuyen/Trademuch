module.exports = {

  join: async(req, res) => {
    if (req.isSocket === true) {

      let loginedUser, userFBId;

      // check login state
      let loginState = await UserService.getLoginState(req);
      console.log("==== user login status ===>", loginState);
      if (loginState) {
        loginedUser = await UserService.getLoginUser(req);
        userFBId = await UserService.getFBId(loginedUser.id);
        console.log("==== logined User is ===>", loginedUser);
      }

      let room = req.body.room;
      let type = req.body.type | 'public';
      let limit = req.body.limit | 100;

      console.log('join room=>',room);

      sails.sockets.join(req, room, function(err) {
        if (err) {
          return res.serverError(err);
        }
        sails.sockets.broadcast(room, "new user", {
          'msg': "Hello " + loginedUser
        }, req);
      });

      return res.send(200, 'joined');
    }
    return res.send(202);
  },

  sendToRoom: async(req, res) => {
    if (req.isSocket === true) {
      sails.sockets.broadcast('mysecretroom', 'messageevent', {
        message: "Listen very carefully, I'll shall say this only once..!"
      });
    }
    return res.send(202);
  },

  hello: async(req, res) => {
    try {
      // Make sure this is a socket request (not traditional HTTP)
      if (!req.isSocket) {
        return res.badRequest();
      }
      // Have the socket which made the request join the "funSockets" room
      // Broadcast a "hello" message to all the fun sockets.
      // This message will be sent to all sockets in the "funSockets" room,
      // but will be ignored by any client sockets that are not listening-- i.e. that didn't call `io.socket.on('hello', ...)`
      // sails.sockets.broadcast('funSockets', 'hello', req);
      // Respond to the request with an a-ok message

      sails.sockets.join(req, 'funSockets', async(err) => {
        if (err) {
          return res.serverError(err);
        }

        let loginState = await UserService.getLoginState(req);
        console.log("==== user login status ===>", loginState);

        let loginedUser, userFBId, targetId = req.param('id');
        if (loginState) {
          loginedUser = await UserService.getLoginUser(req);
          userFBId = await UserService.getFBId(loginedUser.id);
          console.log("==== logined User is ===>", loginedUser);
          sails.sockets.broadcast("funSockets", "hello", "Hello" + loginedUser);
        } // end if


        sails.sockets.blast("lalalalalalalaala");
        sails.sockets.broadcast("funSockets", "hello", "Hello to all my fun sockets!");
        sails.sockets.broadcast("funSockets", "test", "test to all my fun sockets!");

        return res.json({
          message: 'Subscribed to a fun room called funSockets!'
        });
      });

    } catch (e) {
      res.serverError(e);
    }
  },

  say: async(req, res) => {
    try {
      // Make sure this is a socket request (not traditional HTTP)
      if (!req.isSocket) {
        return res.badRequest();
      }

      console.log("client says body =>", req.body);
      console.log("client says query =>", req.query);

      let room = req.body.room;
      let msg = req.body.msg;

      console.log('room=>', room);
      console.log('msg=>', msg);

      sails.sockets.join(req, room, function(err) {
        if (err) {
          return res.serverError(err);
        }
        
        sails.sockets.broadcast(room, "say", {
          'msg': 'you say ' + msg
        });

        sails.sockets.broadcast(room, {
          greeting: 'Hola!'
        });
      });

      return res.json({
        message: 'got msg!'
      });

    } catch (e) {
      res.serverError(e);
    }
  },



  chat: async(req, res) => {
    try {

      let loginState = await UserService.getLoginState(req);
      console.log("==== user login status ===>", loginState);

      let loginedUser, userFBId, targetId = req.param('id');

      if (loginState) {
        loginedUser = await UserService.getLoginUser(req);
        userFBId = await UserService.getFBId(loginedUser.id);
        console.log("==== logined User is ===>", loginedUser);
      } // end if

      res.view('chat', {
        loginState: loginState,
        loginedUser: loginedUser,
        // profile,
        userFBId
      });
    } catch (e) {
      res.serverError(e);
    }
  },
  //
  //
  // create: async(req, res) => {
  //   try {
  //     console.log("==== postStory ===", req.body);
  //     let data = req.body;
  //     let result = await PostService.create(data, req);
  //     res.ok(result);
  //   } catch (e) {
  //     sails.log.error(e);
  //     res.serverError(e);
  //   }
  // },
  // join: async(req, res) => {
  //   try {
  //     console.log("==== postStory ===", req.body);
  //     let data = req.body;
  //     let result = await PostService.create(data, req);
  //     res.ok(result);
  //   } catch (e) {
  //     sails.log.error(e);
  //     res.serverError(e);
  //   }
  // },
  // create: async(req, res) => {
  //   try {
  //     console.log("==== postStory ===", req.body);
  //     let data = req.body;
  //     let result = await PostService.create(data, req);
  //     res.ok(result);
  //   } catch (e) {
  //     sails.log.error(e);
  //     res.serverError(e);
  //   }
  // },


}
