const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a951ad3b647c44d6e1093fbbd0ff14ff&query=' + latitude + ',' + longitude
    request({ url, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            // console.log(body.current)
            callback(undefined, 'It is currently ' + body.current.temperature + ' degress out. ' + 
            'It feels like ' + body.current.feelslike + ' degrees out. ' + 
            'The humidity is ' + body.current.humidity + '%. ' + 
            'The weater descriptions is ' + body.current.weather_descriptions[0] + '.')
        }
    })
}

module.exports = forecast