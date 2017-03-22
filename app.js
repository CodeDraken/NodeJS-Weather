const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (error, results) => {
  if (error) {
    console.log(error);
  } else {
    console.log(results.address);
    weather.getWeather(results.latitude, results.longitude, (error, results) => {
      !error ? console.log(`The temperature is ${results.temperature}F It feels like ${results.apparentTemperature}F`) : console.log(error);
    });
  }
});

