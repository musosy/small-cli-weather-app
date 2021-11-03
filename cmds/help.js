const menus = {
    main: `
        outside [command] <options>

        today .............. show weather for today
        forecast ........... show 10-day weather forecast
        version ............ show package version
        help ............... show help menu for a command

        run "outside [command] -h" for more details about a command
    `,
    today: `
        outside today <options>

        --location, -l ..... the location to use

        You can just run "outside today" for the 
        weather of your current location.
    `,
    forecast: `
        outside forecast <options>

        --location, -l ..... the location to use

        You can just run "outside forecast" for the 
        forecast of your current location.
    `,
}

module.exports = args => {
    const subCmd = args._[0] === 'help' ? args._[1] : args._[0];
    console.log(menus[subCmd] || menus.main)
}