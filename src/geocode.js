const req = require('postman-request');
const uri = 'https://api.mapbox.com/geocoding/v5/'
const endPoints = 'mapbox.places';
const token = 'pk.eyJ1IjoicHJlbTg4NiIsImEiOiJjbDJyZG10dm8wMDQ4M2JvMjV6azhuM294In0.Ua5An3It7qFfYSax33fI1g';

const getGeoLocation = (location, callback) => {
    const updatedUrl = `${uri}${endPoints}/${location}.json?access_token=${token}`;
    req(updatedUrl, { json: true }, (err, res) => {
        if (res.body.features.length > 0) {
            callback(err, res.body.features[0]);
        } else {
            callback({ 'error': 'City is not valid' }, null);
        }
    });
}

const getWeatherData = (lat, long, callback) => {
    const key = 'da1fa06d345b437185f71454220405';
    const api = 'http://api.weatherapi.com/v1/forecast.json';
    const city = `${lat},${long}`;
    const url = api + `?key=${key}` + `&q=${city}`;
    req(url, { json: true }, (err, res) => {
        callback(err, res);
    });
}


module.exports = {
    getGeoLocation,
    getWeatherData
}