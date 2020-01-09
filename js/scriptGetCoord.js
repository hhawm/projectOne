//replaced script.js

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
    console.log(lat);
    console.log(lon);
}
function toMap(lat, lon) {
    let mymap = L.map('mapid1').setView([lat, lon], 11);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGVvbG9wZXoxMCIsImEiOiJjazUzNnRncWswNWlvM2pxdDEwaXVjM3ZiIn0.RfzW0gewoJwX4Dyj518tMg', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 15,
        id: 'mapbox/streets-v11',
        accessToken: 'your.mapbox.access.token'
        // Marker for the map
    }).addTo(mymap);
    var marker = L.marker([lat, lon]).addTo(mymap);
    marker.bindPopup("<b>Hello World I am right here</b><br>Check out the breweries around me.").openPopup();

    // for (var i = 0; i < numRecords; i++) {
    //     var BarMarker[i] = L.marker([lat, lon]).addTo(mymap);
    //     BarMarker[i].bindPopup("BAR HERE").openPopup();
    // };
}




function useMapquest() {
    // I cannot figure out why these cityEl and stateEl have to be defined again.
    var cityEl = $("#searchCity").val();
    var stateEl = $("#searchState").val();

    // mapquest api key
    var mqKey = "cRaBdQ9RUn3PkgcRWcT4gdj6CxzDt1rW";
    var queryURL = "http://www.mapquestapi.com/geocoding/v1/address?key=" + mqKey + "&location=" + cityEl + "," + stateEl;

    console.log(mqKey);
    console.log(cityEl);
    console.log(stateEl);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // for (var i = 0; i < numRecords; i++) {
        console.log(response);
        var lat = response.results[0].locations[0].latLng.lat;
        console.log(lat);
        var lon = response.results[0].locations[0].latLng.lng;
        console.log(lon);

        toMap(lat, lon);
        // author = author || "Author Unknown";

        // var titleResult = $("<p>").append(i + 1, ". ", title);
        // $("#results").append(titleResult);
        // titleResult.addClass("titleName");
        // var authorResult = $("<p>").append(author);
        // $("#results").append(authorResult);
        // authorResult.addClass("authorName");
        // };
    });



}

var beerBtn = $("#beer-btn");
beerBtn.on("click", function () {
    // $("#mapid").empty();
    // mymap.off();


    // Capping at 20 results
    // var numRecordsEl = 20;
    var cityEl = $("#searchCity").val();
    var stateEl = $("#searchState").val();


    if (cityEl === "" && stateEl === "") {
        getLocation();
    } else {
        useMapquest();
    };
});


