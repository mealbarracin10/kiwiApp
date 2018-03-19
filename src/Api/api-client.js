
import Constants from '../helpers/constants.js';


function getLocation(location) {
    return fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'+location+'.json?access_token='+Constants.mapboxAccessToken)
        .then(response => response.json())
}
export { getLocation }
