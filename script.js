require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/layers/GraphicsLayer",
  "esri/Graphic",
  "esri/tasks/QueryTask", 
  "esri/tasks/support/Query"
], function(Map, MapView, FeatureLayer, GraphicsLayer, Graphic,QueryTask, Query) {

var map = new Map({
  basemap: "satellite"
});

var view = new MapView({
  container: "viewDiv",
  map: map,
  center: [-118.71511, 34.09042], // longitude, latitude
  zoom: 11
});



var graphicsLayer = new GraphicsLayer();
map.add(graphicsLayer);


  function addGraphics(result) {

    graphicsLayer.removeAll();
    result.features.forEach(function(feature){
      var g = new Graphic({
        geometry: feature.geometry,
        attributes: feature.attributes,
        symbol: {
         type: "simple-marker",
          color: [0,0,0],
          outline: {
           width: 2,
           color: [0,255,255],
         },
          size: "20px"
        },
        popupTemplate: {
         title: "{TRL_NAME}",
        //  content: "This a {PARK_NAME} trail located in {CITY_JUR}."
        }
      });
      graphicsLayer.add(g);
      view.goTo(g)
    });
  }

  // let t=document.querySelectorAll('.child >li')
  //     t.forEach(function(el){
  //      el.style.display='block'
  //     })

let t=document.querySelector('.nav').addEventListener('click',function(e){
  let list=e.target.closest('.b-list')
  let down=e.target.closest('.b-down')
  if(list){
    var pointUrl = "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0";

  var queryTask = new QueryTask({
    url: pointUrl 
  });

  var query = new Query();
  query.returnGeometry = true;
  query.outFields = ["*"];
  query.where = `TRL_NAME ='${list.innerHTML}'`;
  // console.log(query.where)

  queryTask.execute(query).then(function(results){
    addGraphics(results)

  
  

    // console.log(results.features);
  });



    // console.log(list.innerHTML)
  }else if(down){
    console.log(down.innerHTML)
  }
 
  // console.log(e.target)
})

    // let t=document.querySelectorAll('.child >li')
    //   t.forEach(function(el){
    //    el.style.display='block'
    //   })
    


});