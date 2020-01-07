// var urlBrew = "https://api.openbrewerydb.org/breweries?by_city=austin";

// $.ajax({
//     url: urlBrew,
//     method: "GET"
// }).then(function (responseBrew) {
//     console.log(responseBrew);
// });

// var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=by-pinthouse&location=austin";

// $.ajax({
//     url: myurl,
//     headers: {
//         'Authorization': 'Bearer Tj1ORfVUyCEhKkIIHsCm6CLztz_Z7fMnITBAKUNYLVZivHuV-4wQ41Me9lSI9eyhAbwSIuMqerfrTWaB7FY4TQIYy1zs_1i8l1ueMUrirIccE_ZWosspqnwoGp8TXnYx',
//     },
//     method: 'GET',
//     dataType: 'json',
//     success: function (data) {
//         console.log('success: ' + JSON.stringify(data));
//     }
// });



var searchBtn = $("#searchBtn");

searchBtn.on("click", function (event) {
    event.preventDefault();
    // clears previous results before displaying new results
    // $("#results").empty();
    // console.log(clear);

    // var searchInputEl = $("#searchInput").val();
    var searchLocationEl = $("searchLocation").val();

    // if (searchInputEl === "") {
    //     searchInputEl = "";
    // };

    if (searchLocationEl === "") {
        searchLocationEl = document.getElementById("results");

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        };

        function showPosition(position) {
            x.innerHTML = "Latitude: " + position.coords.latitude +
                "<br>Longitude: " + position.coords.longitude;
        };
    };
});


navigator.geolocation.getCurrentPosition(function (location) {
    var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);

    var mymap = L.map('mapid').setView(latlng, 13)
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiYmJyb29rMTU0IiwiYSI6ImNpcXN3dnJrdDAwMGNmd250bjhvZXpnbWsifQ.Nf9Zkfchos577IanoKMoYQ'
    }).addTo(mymap);

    var marker = L.marker(latlng).addTo(mymap);
});