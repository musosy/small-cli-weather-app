const axios = require('axios');

module.exports = {
    locationByIp: async _ => {
        const res = await axios('https://1.1.1.1/cdn-cgi/trace');
        const ipAdress = res.data.split('ip=')[1].split('\n')[0];
        const geoloc = await axios(`http://ip-api.com/json/${ipAdress}`);
        return {
            name:     geoloc.data.city,
            lat:      geoloc.data.lat,
            lng:      geoloc.data.lon,
            timezone: geoloc.data.timezone.split('/').join('%2F')
        };
    },
    /**
     * 
     * @param {string} location 
     * @returns {object}
     * Get the lat, lng and timezone of the requested location
     * 
     */
    locationByCityName: async location => {
        const geoloc = await axios(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1`)
        return {
            name:     location,
            lat:      geoloc.data.results[0].latitude,
            lng:      geoloc.data.results[0].longitude,
            timezone: geoloc.data.results[0].timezone.split('/').join('%2F')
        };
    }
}