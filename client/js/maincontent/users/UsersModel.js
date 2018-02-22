define([
  "backbone"
], function (Backbone) {
  "use strict";

  return Backbone.Model.extend({


    methodToURL: {
      "read": "/api/clients/near"


    },
    initialize: function () {

    },
    parse: function (response) {




      return response;
    },

    url: function () {
      var access_token = $.cookie("access_token");
      console.log("dasdasdas");
      return "/api/clients/near?access_token=" + access_token;
      // return "/api/clients?access_token=" + access_token;
    },


     sync: function (method, model, options) {
      options = options || {};

      // options.beforeSend =

console.log("beng");
      console.log("method", options);
      if (method == "update")
        options.url = model.methodToURL[method.toLowerCase()] + "/" + model.get("id") + "?access_token=" + $.cookie("access_token");
    //
    //
    //   if (method == "create")
    //     options.url = model.methodToURL[method.toLowerCase()] + "?access_token=" + $.cookie("access_token");
    //
    //   if (method == "delete")
    //     options.url = model.methodToURL[method.toLowerCase()] + "/" + model.get("id") + "?access_token=" + $.cookie("access_token");
    //
    //
    //   if (method == "patch")
    //     options.url = model.methodToURL[method.toLowerCase()] + "/" + model.get("id") + "?access_token=" + $.cookie("access_token");
    //
    //
      return Backbone.sync.apply(this, arguments);
     }

  });


});
