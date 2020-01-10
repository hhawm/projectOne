var x = document.getElementById("demo");





function getLocation() {
    // Make sure browser supports this feature
    if (navigator.geolocation) {
        // Provide our showPosition() function to getCurrentPosition
        navigator.geolocation.getCurrentPosition(showPosition1);
    }
    else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition1(position) {
    // Grab coordinates from the given object
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    console.log("Your coordinates are Latitude: " + lat + " Longitude " + lon);
    L.mapquest.key = "cRaBdQ9RUn3PkgcRWcT4gdj6CxzDt1rW";

    //</YOUR_MAPQUEST_KEY_HERE>get a geocoder object
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


// This will get called after getCurrentPosition()
function showPosition(position) {
            // Grab coordinates from the given object
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            console.log("Your coordinates are Latitude: " + lat + " Longitude " + lon);

            // call next function to assign parameters in map api
            toMap(lat, lon);
            console.log(lat);
            console.log(lon);
        }
function toMap(lat, lon) {
            let mymap = L.map("mapidTwo").setView([lat, lon], 11);
            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGVvbG9wZXoxMCIsImEiOiJjazUzNnRncWswNWlvM2pxdDEwaXVjM3ZiIn0.RfzW0gewoJwX4Dyj518tMg', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 15,
                id: 'mapbox/streets-v11',
                accessToken: 'your.mapbox.access.token'
                // Marker for the map
            }).addTo(mymap);
            let marker = L.marker([lat, lon]).addTo(mymap);
            marker.bindPopup("<b>Hello World I am right here</b><br>Check out the breweries around me.").openPopup();

            // for (let i = 0; i < numRecords; i++) {
            //     let BarMarker[i] = L.marker([lat, lon]).addTo(mymap);
            //     BarMarker[i].bindPopup("BAR HERE").openPopup();
            // };
        }




function useMapquest() {
            // I cannot figure out why these cityEl and stateEl have to be defined again.
            let cityEl = $("#city").val();
            let stateEl = $("#state").val();

            // mapquest api key
            let mqKey = "cRaBdQ9RUn3PkgcRWcT4gdj6CxzDt1rW";
            let queryURL = "http://www.mapquestapi.com/geocoding/v1/address?key=" + mqKey + "&location=" + cityEl + "," + stateEl;

            console.log(mqKey);
            console.log(cityEl);
            console.log(stateEl);

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                // for (let i = 0; i < numRecords; i++) {
                console.log(response);
                let lat = response.results[0].locations[0].latLng.lat;
                console.log(lat);
                let lon = response.results[0].locations[0].latLng.lng;
                console.log(lon);

                toMap(lat, lon);
                // author = author || "Author Unknown";

                // let titleResult = $("<p>").append(i + 1, ". ", title);
                // $("#results").append(titleResult);
                // titleResult.addClass("titleName");
                // let authorResult = $("<p>").append(author);
                // $("#results").append(authorResult);
                // authorResult.addClass("authorName");
                // };
            });
        }



let searchBtn = $("#search-btn");
    searchBtn.on("click", function () {
        // let mymap = $("#mapidTwo").val();
        // mymap.clear();


        // event.preventDefault();
        // document.getElementById("mapidTwo").innerHTML = "";
        // $("#mapidTwo").off();

        // $(this).closest("#mapidTwo").remove();


        let cityEl = $("#city").val();
        let stateEl = $("#state").val();


        if (cityEl === "" && stateEl === "") {

            getLocation();
        } else {

            useMapquest();
        };
    });


