const yargs = require('yargs');
const axios = require('axios');

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

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then(response => {
  if(response.data.status === 'ZERO_RESULTS')
    throw new Error('Unable to find that address');

  let 
    lat = response.data.results[0].geometry.location.lat,
    lng = response.data.results[0].geometry.location.lng,
    weatherUrl = `https://api.darksky.net/forecast/8f28fb863cb5a4fad8528c6c2ee71f9e/${lat},${lng}`;

  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then(res => {
  let temperature = res.data.currently.temperature,
    apparentTemperature = res.data.currently.apparentTemperature;

  console.log(`The temperature is ${temperature}F, it feels like ${apparentTemperature}F`);
}).catch(err => {
  if (err.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers');
  } else {
    console.log(err.message);
  }
});
