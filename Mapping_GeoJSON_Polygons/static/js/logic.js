// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//Create a base layer that holds both maps
//BASE LAYER this will create the radio buttons in index.html for the user to select
//the map that they want to display (streets or dark) from the tilelayers above
let baseMaps = {
    'Streets': streets, 
    'Satellite Streets': satelliteStreets
}

//Alternative method using curly braces notation
//Create the map object with a center and zoom level
let map = L.map("mapid",{
    center: [43.7,-79.3],
    zoom: 11,
    layers: [satelliteStreets]
})

// Pass our map layers into our LAYERS CONTROL and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

let torontoHoods =  "https://raw.githubusercontent.com/SheriZig/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// note: putting the data after the tilelayer loads map before adding data
//access majorAirports.json
//let airportData = "https://raw.githubusercontent.com/SheriZig/Mapping_Earthquakes/main/majorAirports.json";

//apply style to lines and fill on map

function polystyle(feature) {
    return {
        fillColor: 'yellow',
        weight: 2,
        opacity: 1,
        color: 'blue',  //Outline color
        fillOpacity: 0.7
    };
}

//get GeoJSON data
d3.json(torontoHoods).then(function(data){
    console.log(data);

    //Creating a GeoJSON layer with the retrieved data
    //L.geoJSON(data).addTo(map);
    L.geoJson(data, {
        style: polystyle, 
        onEachFeature: function(feature,layer){
            layer.bindPopup( "Neighborhood: "  + feature.properties.AREA_NAME + "</h2> <hr> <h3>Area Code: " + feature.properties.AREA_S_CD + "</h3>"
            )
 
         }
    
    
    }).addTo(map);
});

console.log("done");
