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
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
})

// Pass our map layers into our LAYERS CONTROL and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1, 
        fillColor: "#ffae42", //orange
        color: "#000000", //black
        radius: getRadius(feature.properties.mag),
        stroke: true, 
        weight: 0.5
    };
}

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
//getRadius(magnitude) is referring to the styleinfo getRadius and will populate with feature.proeprties.mag
// if the magnitude is 0 then it will return 1 so that it is plotted on map
// if the magnitude is greater than 0 the magnitude value is multiplied by 4
function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4
}




//get GeoJSON data from earthquake site
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data){
    console.log(data);
    //create geoJSON layer with data 
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng); //creates circles for each earthquake
        },
        style: styleInfo // makes circle size of magnitude based on styleInfo above
    }).addTo(map);
});

console.log("done");
