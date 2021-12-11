// Add console.log to check to see if our code is working.
console.log("working");

//approximate center of tge united states 40.7, -94.5
// Create the MAP object with a center and zoom level.
let map = L.map('mapid').setView([37.6213, -122.3790], 5);
//coordinates for each point to be used in the line
let line = [
  [37.6213, -122.3790], //San Francisco airport
  [30.1974, -97.6663], //Austin-Bergstrom airport
  [43.6803, -79.6115], //Toronto Pearson airport
  [40.6413, -73.7781], // JFK airport 
];
//add line for coordinates in line variable and color it red
//dashArray is a dashed line
L.polyline(line, {
  color: "blue",
  dashArray: '20,15',
  opacity: 0.5
}).addTo(map);




// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});



// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);
console.log("done");
