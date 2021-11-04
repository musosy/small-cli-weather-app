const chalk = require('chalk')
const Spinner = require('clui').Spinner;
const { today } = require('../utils/weather');
const weatherInterpretationCodes = require('../utils/weatherInterpretationCodes');
const ipLocation = require('../utils/location')


module.exports = async args => {
    let wait = new Spinner('Loading weather information ...')
    wait.start()
    try {
        let location = args.location || args.l || await ipLocation();
        const weather = await today(location);
        wait.stop()
        console.log(`Current conditions in ${chalk.bold.blue(weather.city)}:`)
        console.log(`${chalk.green(weather.current_weather.temperature + " °C")}  and ${weatherInterpretationCodes[weather.current_weather.weathercode].toLowerCase()}`)
        console.log()
    } catch (err) {
        wait.stop()
        console.log(err)
    }
}