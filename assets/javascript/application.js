// API URL 
const url = `http://open.mapquestapi.com/geocoding/v1/reverse?`
//
let apiParams = {
    key: `PnXATGIJA1knu3AIiLfjICBBfLexttAQ`,
    outFormat: `json`,
    location: ``,
}

// get user geolocation
function getGeoLocation() {
    // if geolocation is available in browser
    if (navigator.geolocation) {
        // call getCity with geo possition
        navigator.geolocation.getCurrentPosition(getCity);
    }
}

function getCity(userPosition) {
    // get latitude
    let lat = userPosition.coords.latitude;
    // get longitude
    let lng = userPosition.coords.longitude;
    // add location to apiParams
    apiParams.location = `${lat},${lng}`
    // create the url parameters
    let searchParams = new URLSearchParams(apiParams);
    // send request to API  
    fetch(`${url}${searchParams}`)
        // get the api response and parse to JSON
        .then((apiResponse) => apiResponse.json())
        // get the results (by API docs its a array)
        .then((jsonObj) => jsonObj.results[0])
        // get the locations (by API docs its a array)
        .then((result) => result.locations[0])
        // set city and state
        .then((location) => {
            let currentCity = `${location.adminArea5}, ${location.adminArea3}`;
            document.querySelector('#header').innerHTML = currentCity;
            document.querySelector('#map').setAttribute(`src`, location.mapUrl);
        });
}

getGeoLocation();



//console.log(`${url}${searchParams}`);