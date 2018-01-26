const yargs = require('yargs');
const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.a, function (messageError, results){
  if (messageError) {
    console.log(messageError)
  } else {
    console.log(results.address)
    weather.getWeather(results.latitude, results.longitude, (error, weather_data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Summary: ${weather_data.summary}`);
        console.log(`Temperature: ${weather_data.temperature}`);
        console.log(`Humidity: ${weather_data.humidty}`);
        console.log(`Wind Speed: ${weather_data.windSpeed}`);
      }
    });
  }
});
