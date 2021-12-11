// Add console.log to check to see if our code is working.
console.log("working");

//approximate center of tge united states 40.7, -94.5
// Create the MAP object with a center and zoom level.
let map = L.map('mapid').setView([40.7, -94.5], 4);

//Add a MARKER to the map for Los Angeles, California
//let marker = L.marker([34.0522, -118.2437]).addTo(map);

//CIRCLE radius is based on meters
//let marker = L.circle([34.0522, -118.2437], {
   // radius: 300,
   // color: 'black',
   // fillColor: '#fef59f',
   // fillOpacity: 0.5,
//}).addTo(map);

//CIRCLEMAKER is based on pixels. Therefore, the 'coverage area' changes based on zoom
//var circleMaker = L.circleMaker([34.0522, -118.2437], {
   // color: 'black',
   // fillColor: '#fef59f',
   // fillOpacity: 0.5,
  // radius: 300
//}).addTo(map);

let cityData = cities;
// Loop through the cities array and create one marker for each city.
//function(city) is the whole city (in cities array) with specifics (location/city/state/population)
//city.location points to the city function and returns only the location 
//.bindPopup binds popup text to marker contains concatenated info from data file
// bindPopup displays when marker is clicked
// population.toLocaleString adds a 'thousands' separator for the population
// changed from l.marker to l.cityMarker to change to circle with the size determined
//    by the population however, based on the size of the population, the circle would 
//    cover the whole map. Therefore we divide to find a proportional size
cityData.forEach(function(city){
    console.log(city);
    L.circleMarker(city.location,{
      radius: city.population/100000,
      color: 'orange',
      fillColor: '#F5B041' ,
      fillOpacity: 0.5,
      lineweight: 4

    })
    .bindPopup("<h2>" + city.city + "," + city.state +"</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
    .addTo(map);
});

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});



// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);
console.log("done");
