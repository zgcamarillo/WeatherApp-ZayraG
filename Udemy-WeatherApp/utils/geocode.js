const request = require('postman-request')

const geocode = (address, callback) => {
    const url='https://geocoding-api.open-meteo.com/v1/search?name='+ encodeURIComponent(address) + '&count=1'

    request({ url, json : true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to locations services.', undefined)
        } else if (!body.results) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.results[0].latitude,
                longitude: body.results[0].longitude,
                location: body.results[0].name
            })
        }
    })
}

module.exports = geocode