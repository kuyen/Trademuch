import sinon from 'sinon';

describe('about Post Controller operation.', function() {

  let like, item;
  before(async (done) => {
    try {
      let user = await User.create({
        "username": "testPost",
        "email": "testPostController@gmail.com",
        "age": 18
      });
      sinon.stub(UserService, 'getLoginState', (req) => {
        return true;
      });
      sinon.stub(UserService, 'getLoginUser', (req) => {
        return user;
      });
      done();
    } catch (e) {
      done(e)
    }
  });

  after( (done) => {
    UserService.getLoginState.restore();
    UserService.getLoginUser.restore();
    done();
  });

  it('add new Post have radioItem should success.', async (done) => {
    try {

      let send = {
        "mode": "give",
        "hobby": 1,
        "detail": {
          "title": "123",
          "startDate": "2015-12-25",
          "endDate": "2015-12-31",
          "price": "200",
          "radioItem": 1,
          "item": ""
        },
        "location": {
          "latitude": 24.148657699999998,
          "longitude": 120.67413979999999,
          "accuracy": 30
        }
      }

      let result = await request(sails.hooks.http.app)
      .post('/rest/post/create')
      .send(send);

      result.status.should.be.equal(200);

      done();
    } catch (e) {
      done(e);
    }
  });



  it('get all post should success.', async (done) => {
    try {
      let result = await request(sails.hooks.http.app)
      .get('/rest/post');
      sails.log.info(result);
      result.status.should.be.equal(200);

      done();
    } catch (e) {
      done(e);
    }
  });
});
