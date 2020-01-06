var urlBrew = "https://api.openbrewerydb.org/breweries?by_city=austin";

$.ajax({
    url: urlBrew,
    method: "GET"
}).then(function (responseBrew) {
    console.log(responseBrew);
});

var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=by-pinthouse&location=austin";

$.ajax({
    url: myurl,
    headers: {
        'Authorization': 'Bearer Tj1ORfVUyCEhKkIIHsCm6CLztz_Z7fMnITBAKUNYLVZivHuV-4wQ41Me9lSI9eyhAbwSIuMqerfrTWaB7FY4TQIYy1zs_1i8l1ueMUrirIccE_ZWosspqnwoGp8TXnYx',
    },
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        console.log('success: ' + JSON.stringify(data));
    }
});
