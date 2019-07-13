require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer"
], function(Map, MapView,FeatureLayer) {

var map = new Map({
  basemap: "satellite"
});

var view = new MapView({
  container: "viewDiv",
  map: map,
  center: [-118.71511, 34.09042], // longitude, latitude
  zoom: 11
});

   // Trailheads feature layer (points)
   var trailheadsLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
  });

  map.add(trailheadsLayer);







let t=document.querySelector('.nav').addEventListener('click',function(e){
  let list=e.target.closest('.b-list')
  let down=e.target.closest('.b-down')
  if(list){

    console.log(list.innerHTML)
  }else if(down){
    console.log(down.innerHTML)
  }
 
  // console.log(e.target)
})


});