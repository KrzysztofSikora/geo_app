'use strict';

module.exports = function(Client) {




  Client.findNear = function (filter, req, cb) {


    console.log("filter", filter);
// var exampleForTest= {
//   coordinates:
//     { $near :
//       {
//         $geometry: { type: "Point",  coordinates: [50.0910917, 20.0108661  ] },
//         $maxDistance: 1000
//       }
//     }
// }

    var loopback = require('loopback');

     var lat = Number(50.0910917);
    var lon = Number(20.0108661);
    // var near = Number(filter.near);
    //
    // var here = new loopback.GeoPoint(50.0910917, 20.0108661);
    // console.log("deb", lat, lon, near);
// console.log("here",here);
    var query = {
      "coordinates": {
        "near": {
          "$geometry": {
            type: "Point",
            coordinates: [lat, lon]
          }, "$maxDistance": 1000
        }
      }
    };


console.log("query", query);


    var here = new loopback.GeoPoint( {lat: 50.0910917, lng: 20.0108661});

    Client.find( {
      where: {
        coordinates: {
          near: here,
          maxDistance: 1,
          unit: 'kilometers'

        }
      }
    }, function(err, customer) {
        if (err) throw err;

        // console.log("customers found: " , customer);
        cb(null, customer);


      });



  };


  Client.remoteMethod("findNear", {
    http: {path: "/near", verb: "get"},
    accepts: [{arg: "filter", type: "object"},{arg: "req", type: "object", http: {source: "req"}}],
    returns: [{arg: "data", type: "any", description: "Client array matching this filter" , root: true }],
    description: "It search client near point with current distance."
  });

};
