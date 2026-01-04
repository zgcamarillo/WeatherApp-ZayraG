const request = require('postman-request');

const url ='https://api.open-meteo.com/v1/forecast?latitude=35.2271&longitude=-80.8431&daily=snowfall_sum,rain_sum,showers_sum&hourly=temperature_2m,precipitation,apparent_temperature,precipitation_probability,rain,snowfall,showers,snow_depth&current=temperature_2m,precipitation,rain,is_day,showers,snowfall&forecast_days=1&temperature_unit=fahrenheit'

request({ url: url, json: true }, (error, response) => { 
    if (error) {
        console.log('unable to connect to weather service!')
    } else if (!response.body){
        console.log('Unable to find location')
    }
    else {
        console.log('It is currently ' + response.body.current.temperature_2m)
    }
    // // console.log('It is currently ' + response.body.current.temperature_2m)
    // console.log(response.body)
})

const geoUrl = 'https://geocoding-api.open-meteo.com/v1/search?name=philadelphia&count=1'
request({ url: geoUrl, json: true }, (error, response) => {
    if (error) {
        console.log('unable to connect to location services')
    } else if (!response.body.results) {
        console.log('invalid location entered')
    } else {
    const latitude = response.body.results[0].latitude
    const longitude = response.body.results[0].longitude
    console.log(latitude, longitude)
    }
})