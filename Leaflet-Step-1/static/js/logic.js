var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";  

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  console.log('show me some data: ', data);
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  var geoJsonLayer = L.geoJson(earthquakeData, {
    
    // Set the color based on depth of the earthquake.
    style: function(feature) {
      if (feature.geometry.coordinates[2] > 100) {
        return{color: '#800026'};
      }
      else if (feature.geometry.coordinates[2] > 50) {
        return{color: '#BD0026'};
      }
      else if (feature.geometry.coordinates[2] > 40) {
        return{color: '#E31A1C'};
      }
      else if (feature.geometry.coordinates[2] > 30) {
        return{color: '#FC4E2A'};
      }
      else if (feature.geometry.coordinates[2] > 20) {
        return{color: '#FD8D3C'};
      }
      else if (feature.geometry.coordinates[2] > 10) {
        return{color: '#FEB24C'};
      }
      else {
        return{color: '#90EE90'};
      }
    },
    
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        radius: Math.round(feature.properties.mag) * 5,
        fillOpacity: 0.9  
      });
    },
    
    onEachFeature: function (feature, layer) {
      var popupText = "<b>Magnitude:</b> " + feature.properties.mag +
      "<br><b>Location:</b> " + feature.properties.place +
      "<br><a href='" + feature.properties.url + "'>More info</a>";

      layer.bindPopup(popupText, {
        closeButton: true,
        offset: L.point(0, -20)
      });
      layer.on('click', function() {
        layer.openPopup();
      });
    }
  });
   
createMap(geoJsonLayer);
}
    
function createMap(geoJsonLayer) {
  // Adding tile layer to the map
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });  

  var baseMaps = {
    "Street Map": streetmap 
  };
  var overlayMaps = {
    Earthquakes: geoJsonLayer 
  };

  // Creating our map object
  var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [streetmap, geoJsonLayer]
  });

  // Create a control layer
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  function getColor(d) {
    return d > 100   ? '#800026' :
           d > 50    ? '#BD0026' :
           d > 40    ? '#E31A1C' :
           d > 30    ? '#FC4E2A' :
           d > 20    ? '#FD8D3C' :
           d > 10    ? '#FEB24C' :
                       '#90EE90';
  }

  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function () {

    var div = L.DomUtil.create("div", "info legend");
    var depths = [0, 10, 20, 30, 40, 50, 100];
    //var labels = [];

    var legendInfo = "<h4>Earthquake Depth</h4>";
    div.innerHTML = legendInfo;
    // loop through our depth intervals and generate a label with a colored square for each
    for (var i = 0; i < depths.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(depths[i] + 1) + '"></i> ' +
            depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);

}  