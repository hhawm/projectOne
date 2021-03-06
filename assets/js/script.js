let searchBtn = $("#search-btn");

// Converts open brewery db states to 2 characters for the yelp search request
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

};

let stateTwo = {
    'AZ': 'Arizona',
    'AL': 'Alabama',
    'AK': 'Alaska',
    'AR': 'Arkansas',
    'CA': 'California',
    'CO': 'Colorado',
    'CT': 'Connecticut',
    'DC': 'District of Columbia',
    'DE': 'Delaware',
    'FL': 'Florida',
    'GA': 'Georgia',
    'HI': 'Hawaii',
    'ID': 'Idaho',
    'IL': 'Illinois',
    'IN': 'Indiana',
    'IA': 'Iowa',
    'KS': 'Kansas',
    'KY': 'Kentucky',
    'LA': 'Louisiana',
    'ME': 'Maine',
    'MD': 'Maryland',
    'MA': 'Massachusetts',
    'MI': 'Michigan',
    'MN': 'Minnesota',
    'MS': 'Mississippi',
    'MO': 'Missouri',
    'MT': 'Montana',
    'NE': 'Nebraska',
    'NV': 'Nevada',
    'NH': 'New Hampshire',
    'NJ': 'New Jersey',
    'NM': 'New Mexico',
    'NY': 'New York',
    'NC': 'North Carolina',
    'ND': 'North Dakota',
    'OH': 'Ohio',
    'OK': 'Oklahoma',
    'OR': 'Oregon',
    'PA': 'Pennsylvania',
    'RI': 'Rhode Island',
    'SC': 'South Carolina',
    'SD': 'South Dakota',
    'TN': 'Tennessee',
    'TX': 'Texas',
    'UT': 'Utah',
    'VT': 'Vermont',
    'VA': 'Virginia',
    'WA': 'Washington',
    'WV': 'West Virginia',
    'WI': 'Wisconsin',
    'WY': 'Wyoming'
}


//create a variable for our map
let mymap = L.map('mapid');

//create a function to place cooridnates into map
function toMap(brewLat, brewLon) {
    mymap.setView([brewLat, brewLon], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGVvbG9wZXoxMCIsImEiOiJjazUzNnRncWswNWlvM2pxdDEwaXVjM3ZiIn0.RfzW0gewoJwX4Dyj518tMg', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);

};


//variables for the closing the modal by clicking background and the X close button
let modalBackground = $(".modal-background");
let modalCloseBtn = $(".modal-close");

//create a function to activate modal
function activateModal() {
    $(".modal").addClass("is-active animated zoomIn");
};

//create a function to close modal
function closeModal() {
    $(".modal").removeClass("is-active");
};


// Creates cards for each result and displays them in the results section
searchBtn.on("click", function (event) {
    event.preventDefault();
    $("#errorMsg").empty();
    $("#results").empty();

    let city = $("#city").val().trim();
    let state = $("#state").val();

    if (city === "" && state === "") {
        getLocation();
    } else {
        makeCards(city, state);
    }
});

function makeCards(city, state) {

    let brewURL = "https://api.openbrewerydb.org/breweries?by_city=" + city + "&by_state=" + state;

    $.ajax({
        url: brewURL,
        method: "GET"
    }).then(function (responseBrew) {
        console.log(responseBrew);

        if (responseBrew.length === 0) {
            $("#errorMsg").text("Sorry, no breweries in " + city + ", " + state + ".");
        };

        for (let i = 0; i < responseBrew.length; i++) {
            let brewName = responseBrew[i].name;
            let brewAddress = responseBrew[i].street;
            let brewCity = responseBrew[i].city;
            let brewState = responseBrew[i].state;
            let brewLon = responseBrew[i].longitude;
            let brewLat = responseBrew[i].latitude;

            if ((brewLon !== null) && (brewLat !== null)) {

                //Create results dynamically
                let brewResults = $("#results");

                let column = $("<div>").addClass("column is-half");

                let card = $("<div>").addClass("card animated fadeInUp");
                let cardContent = $("<div>").addClass("card-content");
                let media = $("<div>").addClass("media");
                let mediaContent = $("<div>").addClass("media-content");
                let title = $("<p>").addClass("title is-4");
                title.text(brewName);

                //Appending items to resutls
                mediaContent.append(title);
                media.append(mediaContent);
                cardContent.append(media);
                card.append(cardContent);
                column.append(card);
                brewResults.append(column);

                //click function to close modal clear the map that was opened
                modalBackground.on("click", function (event) {
                    event.preventDefault();
                    closeModal();
                });

                //click function to close modal clear the map that was opened
                modalCloseBtn.on("click", function (event) {
                    event.preventDefault();
                    closeModal();
                });

                //created a function to open up a modal with a map in it
                card.on("click", function (event) {

                    event.preventDefault();
                    //if statement that does not allow the modal to open if cooridnates are null
                    if ((brewLon !== null) && (brewLat !== null)) {
                        activateModal();
                        toMap(brewLat, brewLon);
                        let marker = L.marker([brewLat, brewLon]).addTo(mymap);

                        let searchURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/matches?name=" + brewName + "&address1=" + brewAddress + "&city=" + brewCity + "&state=" + states[brewState] + "&country=US";

                        $.ajax({
                            url: searchURL,
                            headers: {
                                'Authorization': 'Bearer Tj1ORfVUyCEhKkIIHsCm6CLztz_Z7fMnITBAKUNYLVZivHuV-4wQ41Me9lSI9eyhAbwSIuMqerfrTWaB7FY4TQIYy1zs_1i8l1ueMUrirIccE_ZWosspqnwoGp8TXnYx',
                            },
                            method: 'GET',
                            dataType: 'json',
                        }).then(function (data) {

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
                                console.log(data.image_url);

                                let brewImage = "<img src=\"" + data.image_url + "\"/ style=\"width: 100%;\">";
                                let brewWeb = responseBrew[i].website_url;
                                let brewPhone = responseBrew[i].phone;
                                let brewRating = data.rating;
                                let brewReview = data.review_count;

                                marker.bindPopup(`${brewImage} 
                                <strong> ${brewName} </strong> 
                                <br>
                                 ${brewAddress}
                                <br> 
                                ${brewCity}, ${brewState} 
                                <br> 
                                <a target="_blank" href= ${brewWeb} > Website </a> 
                                <br> 
                                Phone: ${brewPhone} 
                                <br> 
                                ${brewRating} stars with ${brewReview} reviews`).openPopup();
                            })
                        })
                    }
                })
            }
        }
    });
};


function getLocation() {
    // Make sure browser supports this feature
    if (navigator.geolocation) {
        // Provide our showPosition() function to getCurrentPosition
        navigator.geolocation.getCurrentPosition(showPosition1);
    }
    else {
        return;
        // alert("Geolocation is not supported by this browser.");
    }
}

function showPosition1(position) {
    // Grab coordinates from the given object
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    console.log("Your coordinates are Latitude: " + lat + " Longitude " + lon);
    let mqKey = "cRaBdQ9RUn3PkgcRWcT4gdj6CxzDt1rW";
    let queryURL = "https://www.mapquestapi.com/geocoding/v1/reverse?key=" + mqKey + "&location=" + lat + "," + lon;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (reversedLoc) {
        let cityRev = reversedLoc.results[0].locations[0].adminArea5;
        let stateRev = reversedLoc.results[0].locations[0].adminArea3;
        console.log(cityRev);
        console.log(stateRev);
        console.log(stateTwo[stateRev]);
        makeCards(cityRev, stateTwo[stateRev]);

    });

}

