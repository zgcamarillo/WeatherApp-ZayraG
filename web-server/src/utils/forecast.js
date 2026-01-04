const request = require('postman-request')
const forecast = (latitude, longitude, units = 'fahrenheit',callback) => {
    if (typeof units === 'function') {
    callback = units
    units = 'fahrenheit'
}

    units = typeof units === 'string' ? units.toLowerCase() : 'fahrenheit'
    const tempUnit = units === 'celsius' ? 'celsius' : 'fahrenheit'
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=snowfall_sum,rain_sum,showers_sum' + '&hourly=temperature_2m,precipitation,apparent_temperature,precipitation_probability,rain,snowfall,showers,snow_depth' + '&current=temperature_2m,precipitation,rain,is_day,showers,snowfall' + '&forecast_days=1' + '&temperature_unit=' + tempUnit
    request({url, json: true }, (error, { body }= {}) => { 
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (!body.current) {
            callback('Unable to find location', undefined)
        } else {
            const temp = body.current.temperature_2m
            const unitSymbol = tempUnit === 'fahrenheit' ? '°F' : '°C'
            callback(undefined, 'It is currently ' + temp + unitSymbol + '.')
        }
    })
}

module.exports = forecast