define([
], function () {
    "use strict";

    return {

        showLoginView: function() {
            window.app.session.resetSession();
            window.app.vent.trigger("login:show");
        },

        showAboutView: function() {
            window.app.vent.trigger("about:show");
        },
      showMapView: function() {
        window.app.vent.trigger("map:show");
      },
      showPointsView: function() {
        window.app.vent.trigger("points:show");
      },
      showContentsView: function() {
        window.app.vent.trigger("contents:show");
      },
      showUsersView: function() {
        window.app.vent.trigger("users:show");
      }
    };
});
