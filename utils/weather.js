const axios = require('axios');
const { locationByIp, locationByCityName } = require('./location')

/**
 * 
 * @param {string} location 
 * @param {string} when 
 * @returns weather data depending on the requested time and location
 */
const getData = async (location, when = 'today') => {
    const result = location === undefined ? await locationByIp() : locationByCityName(location);
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
     * 
     * @param {string} location 
     * @returns current weather
     * Get the current temperature and weather on the requested location
     */
    today:    async location => getData(location),
    
    /**
     * 
     * @param {string} location 
     * @returns weather forecast
     * Get the forecast for the next 7 days
     */
    forecast: async location => getData(location, "forecast")
}