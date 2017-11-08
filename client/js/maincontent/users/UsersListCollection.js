define([
  "backbone",
  "maincontent/contents/ContentsModel",
   "backbone.paginator"
], function (Backbone, UsersModel) {
  "use strict";

  return Backbone.PageableCollection.extend({
    model: UsersModel,

    // url to get collection and access_token handler
    url: function () {
      return "/api/clients?access_token=" + $.cookie("access_token");
    },

    //parse results after fetch
    parse: function(response) {
      return response;
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
