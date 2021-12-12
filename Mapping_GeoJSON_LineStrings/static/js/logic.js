// Add console.log to check to see if our code is working.
console.log("working");

//approximate center of tge united states
// Create the MAP object with a center and zoom level.
//let map = L.map('mapid').setView([30, 30], 2);





// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//Create a base layer that holds both maps
//BASE LAYER this will create the radio buttons in index.html for the user to select
//the map that they want to display (streets or dark) from the tilelayers above
let baseMaps = {
    Street: streets, 
    Dark: dark
}

//Alternative method using curly braces notation
//Create the map object with a center and zoom level
let map = L.map("mapid",{
    center: [30, 30],
    zoom: 2,
    layers: [streets]
})

// Pass our map layers into our LAYERS CONTROL and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// note: putting the data after the tilelayer loads map before adding data
//access majorAirports.json
let airportData = "https://raw.githubusercontent.com/SheriZig/Mapping_Earthquakes/main/majorAirports.json";

//get GeoJSON data
d3.json(airportData).then(function(data){
    console.log(data);
    //Creating a GeoJSON layer with the retrieved data
    L.geoJSON(data,{
        onEachFeature: function (feature, layer) {
            
            layer.bindPopup(
            '<h1>'+ feature.properties.city + '</h1>'               
            + 'Country: ' + feature.properties.country + '<br>'
            + 'Name: ' + feature.properties.name + '<br>'
            + 'Altitude: ' + feature.properties.alt + '<br>'
            + 'DST: ' + feature.properties.dst + '<br>'
            + 'FAA: ' + feature.properties.faa + '<br>'
            + 'ICAO: ' + feature.properties.icao + '<br>'
            + 'TZ: ' + feature.properties.tz + '<br>'
               
            );
             
            }
        }).addTo(map);
});

console.log("done");
