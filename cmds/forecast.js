const { forecast } = require('../utils/weather');
const weatherInterpretationCodes = require('../utils/weatherInterpretationCodes');
const ipLocation = require('../utils/location')

module.exports = async args => {
    try {
        const location = args.location || args.l || await ipLocation();
        const weather = await forecast(location);
        console.log(`Forecast for the next 7 days in ${weather.city}:`)
        console.log('')
        console.log('')
        for (let i = 0; i < weather.daily.time.length; i++) {
            console.log(`Global weather for the ${weather.daily.time[i]}: ${weatherInterpretationCodes[weather.daily.weathercode[i]]}`)
            console.log(`Min temp: ${weather.daily.apparent_temperature_min[i]} °C - Max temp: ${weather.daily.apparent_temperature_max[i]} °C`)
            console.log(`Precipitation time: ${weather.daily.precipitation_hours[i]}`)
            console.log('')
        }
    } catch (err) {
        console.log(err)
    }
}