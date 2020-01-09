//------------------------------------------------------------------------------------yelp api----------------------------------------------------------------------------------------------------------------------------------

// var searchURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=by-pinthouse&location=austin";

// $.ajax({
//     url: searchURL,
//     headers: {
//         'Authorization': 'Bearer Tj1ORfVUyCEhKkIIHsCm6CLztz_Z7fMnITBAKUNYLVZivHuV-4wQ41Me9lSI9eyhAbwSIuMqerfrTWaB7FY4TQIYy1zs_1i8l1ueMUrirIccE_ZWosspqnwoGp8TXnYx',
//     },
//     method: 'GET',
//     dataType: 'json',
//     success: function (data) {
//         console.log(JSON.stringify(data));
//     }
// });

// var reviewsURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/j3CWjH0XtesbbDZFVq3c7Q/reviews"

// $.ajax({
//     url: reviewsURL,
//     headers: {
//         'Authorization': 'Bearer Tj1ORfVUyCEhKkIIHsCm6CLztz_Z7fMnITBAKUNYLVZivHuV-4wQ41Me9lSI9eyhAbwSIuMqerfrTWaB7FY4TQIYy1zs_1i8l1ueMUrirIccE_ZWosspqnwoGp8TXnYx',
//     },
//     method: 'GET',
//     dataType: 'json',
//     success: function (data) {
//         console.log(JSON.stringify(data.reviews));
//     }
// });

// --------------------------------------------------------------------------------------------------------playing with geolocation and leaflet (obtaines current position)------------------------------------------------------------------------------

// //How to gain location based on web browsers geolocation
// function getLocation() {
//     // Make sure browser supports this feature
//     if (navigator.geolocation) {
//         // Provide our showPosition() function to getCurrentPosition
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
//     else {
//         alert("Geolocation is not supported by this browser.");
//     }
// }

// // This will get called after getCurrentPosition()
// function showPosition(position) {
//     // Grab coordinates from the given object
//     var lat = position.coords.latitude;
//     var lon = position.coords.longitude;
//     console.log("Your coordinates are Latitude: " + lat + " Longitude " + lon);

//     // call next function to assign parameters in map api
//     toMap(lat, lon);
// }

// function toMap(lat, lon) {
//     var mymap = L.map('mapid').setView([lat, lon], 13);
//     L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGVvbG9wZXoxMCIsImEiOiJjazUzNnRncWswNWlvM2pxdDEwaXVjM3ZiIn0.RfzW0gewoJwX4Dyj518tMg', {
//         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//         maxZoom: 18,
//         id: 'mapbox/streets-v11',
//         accessToken: 'your.mapbox.access.token'
//         // Marker for the map
//     }).addTo(mymap);
//     var marker = L.marker([lat, lon]).addTo(mymap);
//     marker.bindPopup("<b>Hello World I am right here").openPopup();
// }

// var beerBtn = $("#beer-btn");

// beerBtn.on("click", function () {
//     getLocation();
// });

//----------------------------------------------------------------------------------------Map and modal attempt after clicking a result--------------------------------------------------------------------------------------------


//create a variable for our map
var mymap = L.map('mapid')

//create a function to place cooridnates into map
function toMap(brewLat, brewLon) {
    mymap.setView([brewLat, brewLon], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGVvbG9wZXoxMCIsImEiOiJjazUzNnRncWswNWlvM2pxdDEwaXVjM3ZiIn0.RfzW0gewoJwX4Dyj518tMg', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        accessToken: 'your.mapbox.access.token'
        // Marker for the map
    }).addTo(mymap);

};


//create a function that pulls cooridnates for a specific brewery each time the map button is clicked in the results


//variables for the closing the modal by clicking background and the X close button
var modalBackground = $(".modal-background");
var modalCloseBtn = $(".modal-close");

//create a function to activate modal
function activateModal() {
    $(".modal").toggleClass("is-active");
};
//create a function to close modal
function closeModal() {
    $(".modal").removeClass("is-active");
};


//---------------------------------------------------------------------------------------Andy's code for creating cards--------------------------------------------------------------------------------------------------------------------------
var searchBtn = $("#search-btn");
searchBtn.on("click", function (event) {
    event.preventDefault();
    $("#results").empty();
    var city = $("#city").val();
    var state = $("#state").val();
    var urlBrew = "https://api.openbrewerydb.org/breweries?by_city=" + city + "&by_state=" + state;
    $.ajax({
        url: urlBrew,
        method: "GET"
    }).then(function (responseBrew) {
        console.log(responseBrew);
        for (var i = 0; i < responseBrew.length; i++) {
            //leo adding id, longitude, and latitude
            var brewId = responseBrew[i].id;
            let brewLon = responseBrew[i].longitude;
            let brewLat = responseBrew[i].latitude;
            let brewStreet = responseBrew[i].street;
            let brewCity = responseBrew[i].city;
            let brewState = responseBrew[i].state;
            let brewZip = responseBrew[i].postal_code;
            // console.log(brewLon, brewLat);
            //andy's dynamic elements
            let brewName = responseBrew[i].name;
            var brewPhone = responseBrew[i].phone;
            var brewResults = $("#results");
            var columns = $("<div>").addClass("columns");
            var column = $("<div>").addClass("column");
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
            subTitle.text(brewPhone);
            //adding a button to click for the modal
            var modalBtn = $("<button>").addClass("button is-black");
            modalBtn.text("Map");
            mediaContent.append(title);
            mediaContent.append(subTitle);
            //append button
            mediaContent.append(modalBtn);
            media.append(mediaContent);
            cardContent.append(media);
            brewImage.append(imageSrc);
            cardImage.append(brewImage);
            card.append(cardImage);
            card.append(cardContent);
            column.append(card);
            columns.append(column);
            brewResults.append(columns);

            console.log(brewLat, brewLon);


            //click function to close modal clear the map that was opened
            modalBackground.on("click", function (event) {
                event.preventDefault();
                // mymap.off();
                // mymap.remove();
                closeModal();
            });

            //click function to close modal clear the map that was opened
            modalCloseBtn.on("click", function (event) {
                event.preventDefault();
                // mymap.off();
                closeModal();
            });


            //created a function to open up a modal with a map in it
            //running into two errors: need to learn how to clear the map before reloading when clicking another modalBtn and still only pooling one set of longitude and latitude coordinates
            //possible need to create a function to pull cooridnates of specific location each time
            modalBtn.on("click", function (event) {
                event.preventDefault();
                console.log(brewLat, brewLon);
                //if statement that does not allow the modal to open if cooridnates are null
                if ((brewLon !== null) && (brewLat !== null)) {
                    activateModal();
                    toMap(brewLat, brewLon);
                    var marker = L.marker([brewLat, brewLon]).addTo(mymap);
                    marker.bindPopup(brewName + "<br>" + brewStreet + "<br>" + brewCity + "," + brewState + "<br>" + brewZip).openPopup();
                   
                }
            })
        }
    });
});

