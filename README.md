# projectOne
Title: Brew Me, Brew Winch, Discover Breweries, Brews Around Me, 

## description
Create an application that presents users with breweries and bars that serve beer around their area. We will provide a default search of current location, and filter option by state, city, and zip code. Results are ordered by closest location and displayed by brewery name and location. After clicking result a modal displays Brewery reviews, website url, address, phone number, hours of operation, small picture of brewery, and location on a map. 

## user story
Story #1

AS a beer enthusiast

I want to find breweries in the location of my choosing

SO THAT I can gain general information about specific breweries 

Story #2

AS a tourist

I want to find a local brewery

So that I can try local beers

## wireframe
![alt text](landing-page.png "Logo Title Text 1")

![alt text](results.png "Logo Title Text 1")

![alt text](modal.png "Logo Title Text 1")

## api keys to be used
 #for maps -- https://leafletjs.com/
 
#<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
   integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
   crossorigin=""/>
  
 #<script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
   integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
   crossorigin=""></script>  

#Brewery Data Base -- https://www.openbrewerydb.org/
#Openbrewery GET URL (no api key needed): https://api.openbrewerydb.org/breweries

#Yelp Database -- https://www.yelp.com/developers/documentation/v3
#Yelp GET URL: https://api.yelp.com/v3/businesses/search
#Yelp API Key:Tj1ORfVUyCEhKkIIHsCm6CLztz_Z7fMnITBAKUNYLVZivHuV-4wQ41Me9lSI9eyhAbwSIuMqerfrTWaB7FY4TQIYy1zs_1i8l1ueMUrirIccE_ZWosspqnwoGp8TXnYx

## rough breakdown of tasks
Create a landing page with a heading 1, 2 and form submission box with button for searching breweries

Create a results div element that is hidden until it is populated with results

Create  a modal that appears when a result is clicked. Modal has brewery information, reviews, and map location

Set up an ajax GET to get information about breweries from OpenBreweryDB
	Be able to display brewery url, address, and phone number.

Set up an ajax GET to get review information and picture from Yelp fusion API
	Be able to display a reviews of brewery, possibly image of brewery, and hours of operation

Set up an ajax GET to show map location from leaflet API
Make address from OpenBreweryDB link to leaflet to display brewery location on a map
