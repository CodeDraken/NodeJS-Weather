const request = require('request');

const getWeather = (latitude, longitude, callback) => {
  const temp = request({
    url: `https://api.darksky.net/forecast/8f28fb863cb5a4fad8528c6c2ee71f9e/${latitude},${longitude}`,
    json: true
  }, (error, response, body) => {
    !error && response.statusCode === 200 ?
      callback(null, body.currently) :
      callback('Something went wrong with that request');
  });
};

module.exports.getWeather = getWeather;
