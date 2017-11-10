define([
  "marionette",
  "Templates",
  "backgrid",
  "backgrid-filter",
  "backgrid-paginator"
], function (Marionette, Templates) {
  "use strict";

  return Marionette.ItemView.extend({
    template: Templates.usersItemView,

// events:{
//   "click #putPoint": "putPoint"
// },


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
          name: "email",
          label: "Email",
          editable: false,
          cell: "string" // An integer cell is a number cell that displays humanized integers
        },
        {
          name: "id",
          label: "id",
          editable: false,
          cell: "string" // An integer cell is a number cell that displays humanized integers
        },
        {
          name: "Location",
          label: "Location",
          editable: false,
          cell: "string" // An integer cell is a number cell that displays humanized integers
        },
        {
          name: "createdAt",
          label: "CreatedAt",
          editable: false,
          cell: "string" // An integer cell is a number cell that displays humanized integers
        },{
          name: "updatedAt",
          label: "updatedAt",
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

      this.initMap( this.$el.find("#mapView")[0])
    },








    initMap: function (mapView) {
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




    },
    putPoint: function () {

      console.log("save", this.collection)
    }






  });



});
