define([
  'marionette'
], function (Marionette) {
  'use strict';

  return Marionette.AppRouter.extend({
    appRoutes: {
      'login': 'showLoginView',
      'about': 'showAboutView',
      'map': 'showMapView',
      '*filter': 'setTodosFilter'

    }
  });
});
