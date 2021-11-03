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
        let table = []
        for (let i = 0; i < weather.daily.time.length; i++) {
            table.push({
                "Date": weather.daily.time[i],
                "Weather": weatherInterpretationCodes[weather.daily.weathercode[i]],
                "Min temp ( °C)": weather.daily.apparent_temperature_min[i], 
                "Max temp ( °C)": weather.daily.apparent_temperature_max[i],
                "Precipitation time": weather.daily.precipitation_hours[i]
            })
        }
        console.table(table)
    } catch (err) {
        console.log(err)
    }
}