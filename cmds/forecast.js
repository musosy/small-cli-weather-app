const chalk = require('chalk');
const Spinner = require('clui').Spinner;
const { Table } = require('console-table-printer')
const { forecast } = require('../utils/weather');
const weatherInterpretationCodes = require('../utils/weatherInterpretationCodes');
const ipLocation = require('../utils/location')

module.exports = async args => {
    let wait = new Spinner('Loading forecast ...');
    wait.start();
    try {
        const location = args.location || args.l || await ipLocation();
        const weather = await forecast(location);
        
        let table = new Table({
            columns: [
                {name: "date", alignment: "center", title: "Date (Y-M-D)"},
                {name: "weather", alignment: "center", title: "Weather"},
                {name: "min", title: "Min temp ( °C)"},
                {name: "max", title: "Max temp ( °C)"},
                {name: "prec", title: "Precipitation time"}
            ]
        });
        for (let i = 0; i < weather.daily.time.length; i++) {
            table.addRow({
                date: new Date(weather.daily.time[i]).toDateString(),
                weather: weatherInterpretationCodes[weather.daily.weathercode[i]],
                min: chalk.blue(weather.daily.apparent_temperature_min[i]), 
                max: chalk.red(weather.daily.apparent_temperature_max[i]),
                prec: chalk.green(weather.daily.precipitation_hours[i])
            })
        }
        wait.stop()
        console.log(`Forecast for the next 7 days in ${chalk.bold.blue(weather.city)}:`)
        table.printTable()
    } catch (err) {
        wait.stop();
        console.log(err)
    }
}