var searchBtn = $(".button");

searchBtn.on("click", function (event) {
    event.preventDefault();
    $("#results").empty();
    var searchCity = $(".input").val();
    var urlBrew = "https://api.openbrewerydb.org/breweries?by_city=" + searchCity;

    $.ajax({
        url: urlBrew,
        method: "GET"
    }).then(function (responseBrew) {
        console.log(responseBrew);
        for (var i = 0; i < responseBrew.length; i++) {
            var breweryName = responseBrew[i].name;
            var results = $("<h2>").append(breweryName)
            $("#results").append(results);
        }
    });
});

var searchURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=by-pinthouse&location=austin";

$.ajax({
    url: searchURL,
    headers: {
        'Authorization': 'Bearer Tj1ORfVUyCEhKkIIHsCm6CLztz_Z7fMnITBAKUNYLVZivHuV-4wQ41Me9lSI9eyhAbwSIuMqerfrTWaB7FY4TQIYy1zs_1i8l1ueMUrirIccE_ZWosspqnwoGp8TXnYx',
    },
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        console.log(JSON.stringify(data));
    }
});

var reviewsURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/j3CWjH0XtesbbDZFVq3c7Q/reviews"

$.ajax({
    url: reviewsURL,
    headers: {
        'Authorization': 'Bearer Tj1ORfVUyCEhKkIIHsCm6CLztz_Z7fMnITBAKUNYLVZivHuV-4wQ41Me9lSI9eyhAbwSIuMqerfrTWaB7FY4TQIYy1zs_1i8l1ueMUrirIccE_ZWosspqnwoGp8TXnYx',
    },
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        console.log(JSON.stringify(data.reviews));
    }
});

// --------------------------------------------------------------------------------------------------------playing with geolocation and leaflet------------------------------------------------------------------------------

//How to gain location based on web browsers geolocation
function getLocation() {
    // Make sure browser supports this feature
    if (navigator.geolocation) {
        // Provide our showPosition() function to getCurrentPosition
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        alert("Geolocation is not supported by this browser.");
    }
}

// This will get called after getCurrentPosition()
function showPosition(position) {
    // Grab coordinates from the given object
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    console.log("Your coordinates are Latitude: " + lat + " Longitude " + lon);

    // call next function to assign parameters in map api
    toMap(lat, lon);
}

function toMap(lat, lon) {
    var mymap = L.map('mapid').setView([lat, lon], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGVvbG9wZXoxMCIsImEiOiJjazUzNnRncWswNWlvM2pxdDEwaXVjM3ZiIn0.RfzW0gewoJwX4Dyj518tMg', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        accessToken: 'your.mapbox.access.token'
        // Marker for the map
    }).addTo(mymap);
    var marker = L.marker([lat, lon]).addTo(mymap);
    marker.bindPopup("<b>Hello World I am right here</b><br>Check out the breweries around me.").openPopup();
}

var beerBtn = $("#beer-btn");

beerBtn.on("click", function () {
    getLocation();
});
