/**
 * Created by krzysztof on 16.11.16.
 */


module.exports = function (server) {


  var app = require('../../server/server.js');

  var Content = app.models.Content;
  var Client = app.models.Client;
  var RoleMapping = app.models.RoleMapping;



  /**
   *
   * https://github.com/strongloop/loopback-connector-mongodb/issues/128
   * repair no ObjectID while create RoleMapping
   */

  RoleMapping.defineProperty('principalId', {
    type: RoleMapping.getDataSource().connector.getDefaultIdType(),
  });




  //@TODO Add automaticly created Admin and first user, role and role mapping

  Content.getDataSource().connector.connect(function (err, db) {

    var collection = db.collection('Content');

    var query = {"coordinates": "2dsphere"}

    collection.createIndex(query
      , function (err, data) {
        console.log(data)
      });
  });

  Client.getDataSource().connector.connect(function (err, db) {

    var collection = db.collection('Client');

    var query = {"coordinates": "2dsphere"}

    collection.createIndex(query
      , function (err, data) {
        console.log(data)
      });
  });
}
