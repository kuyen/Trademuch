import sinon from 'sinon';
describe('about User Controller operation.', function() { //skip
  let testUser,place;
  before(async (done) => {
    try {
      testUser = await User.create({
        "username": "testuser",
      });
      done();
    } catch (e) {
      console.log(e);
      done(e);
    }
  });
  
  it.skip('should success.', async (done) => {
    try {
      let res = await request(sails.hooks.http.app).get(`/user/find`);
      let {users} = res.body;
      users.should.be.Array;
      done();
    } catch (e) {
      done(e);
    }
  });
});
