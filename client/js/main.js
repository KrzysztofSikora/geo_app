require.config({
  paths: {
    'backgrid': '../bower_components/backgrid/lib/backgrid',
    'lunr': '../bower_components/lunr.js/lunr',
    'underscore': '../bower_components/underscore/underscore',
    'backbone': '../bower_components/backbone/backbone',
    'marionette': '../bower_components/backbone.marionette/lib/backbone.marionette',
    'jquery': '../bower_components/jquery/dist/jquery',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
    'text': '../bower_components/text/text',
    'jquery.cookie': '../bower_components/jquery.cookie/jquery.cookie',
    'parsley': '../lib/parsley/parsley',
    'tpl': '../lib/tpl/tpl',
    'backgrid-paginator': '../bower_components/backgrid-paginator/backgrid-paginator',
    'backbone.paginator': '../bower_components/backbone.paginator/lib/backbone.paginator',
    'backgrid-filter': '../bower_components/backgrid-filter/backgrid-filter'

  },
  shim: {
    'lunr': {
      exports: 'lunr'
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'marionette': {
      deps: ['backbone'],
      exports: 'Backbone.Marionette'
    },
    'bootstrap': {
      deps: ['jquery'],
      exports: 'Bootstrap'
    },
    'parsley': {
      deps: ['jquery']
    },
    'jquery.cookie': {
      deps: ['jquery']
    },
    'backbone-paginator': {
      deps: ['backbone'],
      exports: 'backbone-paginator'
    },
    'backbone.paginator': {
      deps: ['backbone'],
      exports: 'backbone.paginator'
    },
    'backgrid-filter': {
      deps: ['backgrid', 'lunr'],
      exports: 'Backgrid-filter'
    }
  },
  deps: ['jquery', 'underscore']
});

require([
  'app',
  'backbone',
  'Router',
  'RouterController',
  'jquery.cookie',
  'backgrid-paginator'

], function (app, Backbone, Router, RouterController) {
  'use strict';


// add bootstrap pagination
  var Paginator = Backgrid.Extension.Paginator = Backgrid.Extension.Paginator.extend({
    render: function () {
      Paginator.__super__.render.apply(this, arguments);
      this.$el.find('ul').addClass('pagination');
      return this;
    }
  });


  $.ajaxSetup({
    cache: false,
    contentType: 'application/json',
    dataType: 'json',
    headers: {
      'Authorization': $.cookie('access_token') || ''
    },
    statusCode: {
      401: function () {
        window.location.replace('#/login');
      }
    }
  });

  app.session.checkAuth({
    complete: function () {
      app.start();
      new Router({controller: RouterController});
      Backbone.history.start();
    }
  });
});
