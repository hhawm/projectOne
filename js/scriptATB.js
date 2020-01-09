let searchBtn = $("#search-button");
let infoModal = $("#info-modal");


let states = {
    'Alabama': 'AL',
    'Alaska': 'AK',
    'Arizona': 'AZ',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'District of Columbia': 'DC',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Pennsylvania': 'PA',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY'
}

searchBtn.on("click", function (event) {
    event.preventDefault();
    $("#results").empty();

    let city = $("#city").val();
    let state = $("#state").val();
    let brewURL = "https://api.openbrewerydb.org/breweries?by_city=" + city + "&by_state=" + state;

    $.ajax({
        url: brewURL,
        method: "GET"
    }).then(function (responseBrew) {
        console.log(responseBrew);
        for (let i = 0; i < responseBrew.length; i++) {
            let brewName = responseBrew[i].name;
            let brewWeb = responseBrew[i].website_url;
            let brewPhone = responseBrew[i].phone;
            let brewAddress = responseBrew[i].street;
            let brewCity = responseBrew[i].city;
            let brewState = responseBrew[i].state;
            let brewLon = responseBrew[i].longitude;
            let brewLat = responseBrew[i].latitude;

            if ((brewLon !== null) && (brewLat !== null)) {
                let brewResults = $("#results");
                let column = $("<div>").addClass("column is-one-third");
                let card = $("<div>").addClass("card");
                // let cardImage = $("<div>").addClass("card-image");
                // let brewImage = $("<figure>").addClass("image is-4by3");
                // let imageSrc = $("<img>");
                // imageSrc.attr("src", "https://bulma.io/images/placeholders/1280x960.png");
                let cardContent = $("<div>").addClass("card-content");
                let media = $("<div>").addClass("media");
                let mediaContent = $("<div>").addClass("media-content");
                let title = $("<p>").addClass("title is-4");
                title.text(brewName);
                let subTitle = $("<p>").addClass("subtitle is-6");
                subTitle.text(brewWeb);
                let subTitle2 = $("<p>").addClass("subtitle is-6");
                subTitle2.text(brewPhone);
                let infoBtn = $("<button>").addClass("info-button");
                infoBtn.text("INFO");

                mediaContent.append(title);
                mediaContent.append(subTitle);
                mediaContent.append(subTitle2);
                mediaContent.append(infoBtn);
                media.append(mediaContent);
                cardContent.append(media);
                // brewImage.append(imageSrc);
                // cardImage.append(brewImage);
                // card.append(cardImage);
                card.append(cardContent);
                column.append(card);
                brewResults.append(column);



                infoBtn.on("click", function (event) {
                    event.preventDefault();

                    let searchURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/matches?name=" + brewName + "&address1=" + brewAddress + "&city=" + brewCity + "&state=" + states[brewState] + "&country=US";

                    $.ajax({
                        url: searchURL,
                        headers: {
                            'Authorization': 'Bearer Tj1ORfVUyCEhKkIIHsCm6CLztz_Z7fMnITBAKUNYLVZivHuV-4wQ41Me9lSI9eyhAbwSIuMqerfrTWaB7FY4TQIYy1zs_1i8l1ueMUrirIccE_ZWosspqnwoGp8TXnYx',
                        },
                        method: 'GET',
                        dataType: 'json',
                    }).then(function (data) {
                        console.log(data);
                        console.log(data.businesses[0].id)

                        let brewID = data.businesses[0].id;

                        let idURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + brewID;

                        $.ajax({
                            url: idURL,
                            headers: {
                                'Authorization': 'Bearer Tj1ORfVUyCEhKkIIHsCm6CLztz_Z7fMnITBAKUNYLVZivHuV-4wQ41Me9lSI9eyhAbwSIuMqerfrTWaB7FY4TQIYy1zs_1i8l1ueMUrirIccE_ZWosspqnwoGp8TXnYx',
                            },
                            method: 'GET',
                            dataType: 'json',
                        }).then(function (data) {
                            console.log(data);

                            infoModal.addClass("is-active");


                            let infoName = $("#infoName");
                            infoName.text(brewName);
                            let infoImage = $("#infoImage");
                            let infoSrc = $("<img>");
                            infoSrc.attr("src", data.image_url);
                            let infoRating = $(".infoRating");
                            let infoReviewCount = $(".infoReviewCount");
                            // added the words 'stars'
                            // infoRating.attr("style", "font-color:red;");
                            infoRating.text(data.rating + " stars from " + data.review_count + " reviews!");
                            // infoReviewCount.text(data.review_count);

                            let cardBody = $(".modal-cbody");

                            cardBody.append(infoName);
                            cardBody.append(infoImage);
                            infoImage.append(infoSrc);
                            cardBody.append(infoImage);
                            cardBody.append(infoRating);
                            cardBody.append(infoReviewCount);
                        })
                    })
                });
            }
        }
    });
});

// $.ajax({
//     url: searchURL,
//     headers: {
//         'Authorization': 'Bearer Tj1ORfVUyCEhKkIIHsCm6CLztz_Z7fMnITBAKUNYLVZivHuV-4wQ41Me9lSI9eyhAbwSIuMqerfrTWaB7FY4TQIYy1zs_1i8l1ueMUrirIccE_ZWosspqnwoGp8TXnYx',
//     },
//     method: 'GET',
//     dataType: 'json',
//     success: function (data) {
//         console.log(data);
//     }
// });
// }

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

