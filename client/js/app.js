define([
  "backbone",
  "marionette",
  "navbar/NavbarItemView",
  "maincontent/login/LoginPageItemView",
  "maincontent/about/AboutItemView",
  "maincontent/map/MapItemView",
  "maincontent/points/PointsItemView",
  "maincontent/contents/ContentsItemView",
  "maincontent/contents/ContentsListCollection",
  "SessionModel"
], function (Backbone, Marionette, NavbarItemView, LoginPageItemView, AboutItemView, MapItemView,PointsItemView,ContentsItemView,
             ContentsListCollection,SessionModel) {
  "use strict";

  var app = new Marionette.Application();

  app.session = new SessionModel({});

  app.addRegions({
    navbar: '#navbar',
    maincontent: '#maincontent'
  });

  app.showNavBar = function () {

    if (app.navbarItemView === undefined) {
      app.navbarItemView = new NavbarItemView();
      app.navbar.show(app.navbarItemView);
    }
  };

  app.showLoginPage = function () {

      app.loginPageItemView = new LoginPageItemView();
    app.maincontent.show(app.loginPageItemView);

  };

  app.showAboutPage = function () {
    if (app.session.get('logged_in') === true) {
    app.aboutPageItemView = new AboutItemView();
    app.maincontent.show(app.aboutPageItemView);
    } else {
      app.showLoginPage();
      Backbone.history.navigate('#/login');
    }
  };

  app.showMapPage = function () {
    if (app.session.get('logged_in') === true) {

    (this.ContentsListCollection = new ContentsListCollection()).fetch().then((function (res) {

      app.mapItemView = new MapItemView({
        collection: this
      });
      app.maincontent.show(app.mapItemView);

    }).bind(this.ContentsListCollection));

    } else {
      app.showLoginPage();
      Backbone.history.navigate('#/login');
    }
  };

  app.showPointsPage = function () {
    if (app.session.get('logged_in') === true) {

    app.pointsItemView = new PointsItemView();
    app.maincontent.show(app.pointsItemView);

    } else {
      app.showLoginPage();
      Backbone.history.navigate('#/login');
    }
  };

  app.showContentsPage = function () {
    if (app.session.get('logged_in') === true) {
    (this.ContentsListCollection = new ContentsListCollection()).fetch().then((function (res) {

      app.contentsItemView = new ContentsItemView({
        collection: this
      });
      app.maincontent.show(app.contentsItemView);

    }).bind(this.ContentsListCollection));

    } else {
      app.showLoginPage();
      Backbone.history.navigate('#/login');
    }

  };

  app.showMainContent = function () {
    if (app.session.get('logged_in') === true) {

      (this.ContentsListCollection = new ContentsListCollection()).fetch().then((function (res) {

        app.mapItemView = new MapItemView({
          collection: this
        });
        app.maincontent.show(app.mapItemView);

      }).bind(this.ContentsListCollection));



      if (Backbone.history.fragment === '' || Backbone.history.fragment === 'login') {
        Backbone.history.navigate('#/map', {trigger: true});
      }
    } else {
      app.showLoginPage();
      Backbone.history.navigate('#/login');
    }
  };



  app.on('start', function () {
    app.showNavBar();
    app.showMainContent();
  });

  app.listenTo(app.session, 'change:logged_in', function () {
    app.showNavBar();
    app.navbarItemView.onLoginStatusChange();
    app.showMainContent();
  });

  app.vent.on("login:show", app.showLoginPage);

  app.vent.on("about:show", app.showAboutPage);

  app.vent.on("map:show", app.showMapPage);
  app.vent.on("points:show", app.showPointsPage);
  app.vent.on("contents:show", app.showContentsPage);


  return window.app = app;
});
