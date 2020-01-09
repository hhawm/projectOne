// More details at:
// https://developer.mapquest.com/documentation/geocoding-api/reverse/get/
// INCLUDE THESE SCRIPTS IN YOUR HTML
// <script src="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.js"></script>
// <link type="text/css" rel="stylesheet" href="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.css"/>

var lat = 76.29221;     // user latitude;
var lon = 120.19853;    // user longitude;

L.mapquest.key = "cRaBdQ9RUn3PkgcRWcT4gdj6CxzDt1rWE";

// get a geocoder object
var geocoder = L.mapquest.geocoding();

// store the results here
var reversedLocation = {};

// call the reverse method within the geocoder to lookup city,zip,etc. from Latitude and Longitude
geocoder.reverse([lat, lon], function (error, result) {
    // Callback - This function will be called once the results are obtained by the API.
    // Check out what the results contain in the console
    console.log("FULL RESULT", result);
    console.log("1st Result", result.results[0]);
    console.log("1st Location in the first result", result.results[0].locations[0]);

    // Get the reverse geocoding results to obtain city and zip
    let loc = result.results[0].locations[0]; // store access to the 1st location object

    // Save the properties you care about
    reversedLocation.street = loc.street; // Save the Street
    reversedLocation.zip = loc.postalCode; // Save the ZIP Code
    reversedLocation.city = loc[adminArea5]; // Save the City
    reversedLocation.state = loc[adminArea3]; // Save the State
    reversedLocation.country = loc[adminArea1]; // Save the Country
    // and more available if you are interested

    // Print the results as a table to the console
    console.table(reversedLocation);
}