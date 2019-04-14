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
        navigator.geolocation.getCurrentPosition(getCity);
    }
}

function getCity(userPosition) {

    let lat = userPosition.coords.latitude;
    let lng = userPosition.coords.longitude;
    apiParams.location = `${lat},${lng}`
    console.log(`%c location : ${apiParams.location}`, `background-color: blue; color:white;`);

    let searchParams = new URLSearchParams(apiParams);


    fetch(`${url}${searchParams}`)
        .then((apiResponse) => apiResponse.json())
        .then((jsonObj) => jsonObj.results[0])
        .then((result) => result.locations[0])
        .then((location) => {
            let currentCity = `${location.adminArea5}, ${location.adminArea3}`;
            document.querySelector('#header').innerHTML = currentCity;
        });
}

getGeoLocation();



//console.log(`${url}${searchParams}`);