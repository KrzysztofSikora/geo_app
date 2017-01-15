var assert = require('chai').assert,
  superagent = require('superagent');
var data = require("./data.js");


describe("Geo app Login with Email and Username", function () {

  var domain = "http://localhost:3000";

  /**
   *
   * before login
   *
   *
   *
   */
  before(function (done) {

    done();

  });
  /**
   *
   * after logout
   *
   *
   *
   */
  after(function (done) {



    done();

  });

   it('should login with username or email', function (done) {

     var path = "/api/clients/login";

     superagent
     .post(domain + path ).send(data.admin[0])
     .set('Accept', 'application/json')
     .set('Content-Type', 'application/json')
     .end(function (err, loginRes) {

         if (err) {
         console.error(err);
         return done(err);
         }

         console.log("Login" , loginRes.body);


         assert.equal(loginRes.status, 200);
         assert.ok(loginRes.body);

          return done();


         });

     });


});
