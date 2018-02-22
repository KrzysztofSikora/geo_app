define([
  "backbone",
  "maincontent/users/UsersModel",
  "backbone.paginator"
], function (Backbone, UsersModel) {
  "use strict";

  return Backbone.PageableCollection.extend({
    model: UsersModel,


    methodToURL: {
      "read": "/api/clients/near"


    },


    // url to get collection and access_token handler
    url: function () {
      // return "/api/clients?access_token=" + $.cookie("access_token");
      return "/api/clients/near?access_token=" + $.cookie("access_token");
    },

    //parse results after fetch
    parse: function (response) {
      return response;
    },


    sync: function (method, model, options) {
      options = options || {};

      // override GET method params
      if (method == "read") {
        options.data = {
          "access_token": options.data.access_token,
          "filter": {
            coordinates: {
              near: {lat: 50.0910917, lng: 20.0108661},
              maxDistance: 1,
              unit: 'kilometers'

            }
          }
        }


      }

      // if (method == "update")
      //   options.url = model.methodToURL[method.toLowerCase()] + "/" + model.get("id") + "?access_token=" + $.cookie("access_token");

      return Backbone.sync.apply(this, arguments);
    },


    mode: "client",
    state: {
      pageSize: 5
      // sortKey: "updated",
      // order: 1
    },

    // You can remap the query parameters from `state` keys from
    // the default to those your server supports
    queryParams: {
      //totalPages: null,
      //totalRecords: null,
      //sortKey: "sort"
    },

    parseState: function (resp, queryParams, state, options) {
      return {totalRecords: resp.length};
    },

    parseRecords: function (resp, options) {
      return resp;
    }


  });


});
