const request = require('request');

module.exports.getWeather = (lat, lng, callback) => {
  request({
    url:`https://api.darksky.net/forecast/3f9f112900c587be196edf477ccfa9ab/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      callback(undefined, {
        summary: body.currently.summary,
        temperature: body.currently.temperature,
        humidty: body.currently.humidity,
        windSpeed: body.currently.windSpeed
      });
    } else if (error) {
      callback('Unable to connect to Forecast.io API');
    } else if (response.statusCode === 400) {
      callback('Unable to fetch weather')
    }
  });
}
