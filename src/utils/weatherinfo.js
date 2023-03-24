const request = require("request");

const weatherinfo = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=115ec967e2612fd4f8284b6497b8f696&query='+ latitude + ',' + longitude +'&units=f'
    
    request({ url, json : true}, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined);
    
        } else if (body.error) {
            callback("Unable to find location", undefined);
        }
        
        else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. ' + 'It feels like ' + body.current.feelslike  + ' degrees out.')
        }
    })
}

module.exports = weatherinfo