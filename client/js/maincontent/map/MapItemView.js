define([
  'marionette',
  'Templates'
], function (Marionette, Templates) {
  'use strict';

  return Marionette.ItemView.extend({
    template: Templates.mapItemView,


    onRender: function () {
      this.initMapAndAutocomplete(this.$el.find("#autocompleteField")[0], this.$el.find("#mapView")[0])
    },


    initMapAndAutocomplete: function (autocompleteField, mapView) {

      var marker;
      var mapOption = {
        zoom: 3,
        center: {lat: 37.1, lng: -95.7},
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        streetViewControl: false
      };
      var map = new google.maps.Map(mapView, mapOption);


      // trigger for refresh map
      google.maps.event.addListener(map, "idle", function () {
        google.maps.event.trigger(map, "resize");
      });


      if (this.collection != undefined) {

        for (var i = 0; i < this.collection.length; i++) {
          var model = this.collection.at(i);
          marker = new google.maps.Marker({
            map: map,
            position: {lat: model.get("coordinates").lat, lng: model.get("coordinates").lng}
          });


        }
      }

    }
  });
});
