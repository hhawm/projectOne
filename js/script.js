var searchBtn = $(".button");

searchBtn.on("click", function (event) {
    event.preventDefault();
    $("#results").empty();
    var city = $(".input").val();
    var urlBrew = "https://api.openbrewerydb.org/breweries?by_city=" + city;

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
