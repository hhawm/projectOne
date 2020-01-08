var searchBtn = $(".button");

searchBtn.on("click", function (event) {
    event.preventDefault();
    $("#results").empty();
    var city = $("#city").val();
    var state = $("#state").val();
    var brewURL = "https://api.openbrewerydb.org/breweries?by_city=" + city + "&by_state=" + state;

    function searchByPhone(searchUrl) {
        console.log(window.performance);
        console.log("run");
        $.ajax({
            url: searchUrl,
            headers: {
                'Authorization': 'Bearer Tj1ORfVUyCEhKkIIHsCm6CLztz_Z7fMnITBAKUNYLVZivHuV-4wQ41Me9lSI9eyhAbwSIuMqerfrTWaB7FY4TQIYy1zs_1i8l1ueMUrirIccE_ZWosspqnwoGp8TXnYx',
            },
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(data);
            }
        });
    }

    var throttledSearchByPhone = _.throttle(searchByPhone, 300)

    $.ajax({
        url: brewURL,
        method: "GET"
    }).then(function (responseBrew) {
        console.log(responseBrew);
        for (var i = 0; i < responseBrew.length; i++) {
            var brewName = responseBrew[i].name;
            var brewWeb = responseBrew[i].website_url;
            let brewPhone = parseInt(responseBrew[i].phone);
            console.log(brewPhone);
            var brewLon = responseBrew[i].longitude;
            var brewLat = responseBrew[i].latitude;

            if ((brewLon !== null) && (brewLat !== null) && (brewPhone !== NaN)) {
                var brewResults = $("#results");
                var column = $("<div>").addClass("column is-one-quarter");
                var card = $("<div>").addClass("card");
                var cardImage = $("<div>").addClass("card-image");
                var brewImage = $("<figure>").addClass("image is-4by3");
                var imageSrc = $("<img>");
                imageSrc.attr("src", "https://bulma.io/images/placeholders/1280x960.png");
                var cardContent = $("<div>").addClass("card-content");
                var media = $("<div>").addClass("media");
                var mediaContent = $("<div>").addClass("media-content");
                var title = $("<p>").addClass("title is-4");
                title.text(brewName);
                var subTitle = $("<p>").addClass("subtitle is-6");
                subTitle.text(brewWeb);
                var subTitle2 = $("<p>").addClass("subtitle is-6");
                subTitle2.text(brewPhone);

                mediaContent.append(title);
                mediaContent.append(subTitle);
                mediaContent.append(subTitle2);
                media.append(mediaContent);
                cardContent.append(media);
                brewImage.append(imageSrc);
                cardImage.append(brewImage);
                card.append(cardImage);
                card.append(cardContent);
                column.append(card);
                brewResults.append(column);

                let searchURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search/phone?phone=+1" + brewPhone;

                throttledSearchByPhone(searchURL);
            }
        }
    });
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


