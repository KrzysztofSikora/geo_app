define([
  "marionette",
  "Templates",
  "backgrid",
  "backgrid-filter",
  "backgrid-paginator"
], function (Marionette, Templates) {
  "use strict";

  return Marionette.ItemView.extend({
    template: Templates.contentsItemView,

events:{
  "click #putPoint": "putPoint"
},


    initPagination: function () {

      var paginator = new Backgrid.Extension.Paginator({
        collection: this.collection,
        className: "text-center"
      });

      this.$el.find("#pagination").html(paginator.render().el);


    },




    onRender: function () {


      var _this = this;


      var columns = [
        {
          name: "mainContent",
          label: "Content",
          editable: false,
          sortValue: function (model, sortKey) {
            return model.get(sortKey).toLowerCase();
          },
          cell: "string" // An integer cell is a number cell that displays humanized integers
        },
        {
          name: "clientId",
          label: "Client",
          editable: false,
          cell: "string" // An integer cell is a number cell that displays humanized integers
        },{
          name: "createdAt",
          label: "CreatedAt",
          editable: false,
          cell: "string" // An integer cell is a number cell that displays humanized integers
        },{
          name: "updatedAt",
          label: "CpdatedAt",
          editable: false,
          cell: "string" // An integer cell is a number cell that displays humanized integers
        }];



      // Initialize a new Grid instance
      this.grid = new Backgrid.Grid({
        columns: columns,
        collection: this.collection
      });
      this.$el.find("#table-container-grid").append(this.grid.render().el);



      this.initPagination();

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

      var autocomplete = new google.maps.places.Autocomplete(autocompleteField);

      autocomplete.addListener("place_changed", function () {
        var place = autocomplete.getPlace();

        // get to location found

        // delete last marker if is defined
        if(marker != undefined)
          marker.setMap(null);

        if (place.geometry.location) {

          marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, 0)
          });
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

        }

        map.panTo(place.geometry.location);
        map.setZoom(10);


      });

    },
    putPoint: function () {

      console.log("save", this.collection)
    }






  });



});
