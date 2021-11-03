const { today } = require('../utils/weather');
const weatherInterpretationCodes = require('../utils/weatherInterpretationCodes');

module.exports = async args => {
    try {
        let location = args.location || args.l;
        const weather = await today(location);
        console.log(weather)
        console.log(`Current conditions in ${weather.city}:`)
        console.log(`\t${weather.current_weather.temperature} °C and ${weatherInterpretationCodes[weather.current_weather.weathercode].toLowerCase()}`)
    } catch (err) {
        console.log(err)
    }
}