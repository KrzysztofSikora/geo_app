define([
  "marionette"
], function (Marionette) {
  "use strict";

  return Marionette.AppRouter.extend({
    appRoutes: {
      "login": "showLoginView",
      "about": "showAboutView",
      "map": "showMapView",
      "points": "showPointsView",
      "contents": "showContentsView",
      "*filter": "setTodosFilter"

    }
  });
});
