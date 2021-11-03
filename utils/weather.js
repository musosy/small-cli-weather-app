const axios = require('axios');

/**
 * @param {string} location 
 * @returns object
 * Get the lat, lng and timezone from the requested city by its name
 */
const geoloc = async location => {
    const geoloc = await axios(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1`)
    return {
        name:     location,
        lat:      geoloc.data.results[0].latitude,
        lng:      geoloc.data.results[0].longitude,
        timezone: geoloc.data.results[0].timezone.split('/').join('%2F')
    };
}
/**
 * @param {string} location 
 * @param {string} when 
 * @returns weather data depending on the requested time and location
 */
const getData = async (location, when = 'today') => {
    const result = await geoloc(location);
    let weather;
    switch(when) {
        case 'today':
            weather = await axios(`https://api.open-meteo.com/v1/forecast?latitude=${result.lat}&longitude=${result.lng}&current_weather=true&timezone=${result.timezone}`);
            break;
        case 'forecast':
            weather = await axios(`https://api.open-meteo.com/v1/forecast?latitude=${result.lat}&longitude=${result.lng}&daily=weathercode,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,precipitation_hours&timezone=${result.timezone}`);
            break;
        default:
            break;
    }
    weather.data.city = result.name;
    return weather.data;
}

module.exports = {
    /**
     * @param {string} location 
     * @returns current weather
     * Get the current temperature and weather on the requested location
     */
    today:    async location => getData(location),
    
    /**
     * @param {string} location 
     * @returns weather forecast
     * Get the forecast for the next 7 days
     */
    forecast: async location => getData(location, "forecast")
}