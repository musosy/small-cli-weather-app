const axios = require('axios');

const geoloc = async location => {
    const geoloc = await axios(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1`)
    return {
        name: location,
        lat: geoloc.data.results[0].latitude,
        lng: geoloc.data.results[0].longitude
    };
}

module.exports = {
    today: async location => {
        const result = await geoloc(location);
        const weather = await axios(`https://api.open-meteo.com/v1/forecast?latitude=${result.lat}&longitude=${result.lng}&current_weather=true&timezone=Europe%2FParis`);
        return weather.data;
    },
    forecast: async location => {
        const result = await geoloc(location);
        const weather = await axios(`https://api.open-meteo.com/v1/forecast?latitude=${result.lat}&longitude=${result.lng}&daily=weathercode,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,precipitation_hours&timezone=Europe%2FParis`)
        console.log(weather.data)
        return weather.data;
    }
}