const request = require('request');

module.exports.geocodeAddress = (address, callback) => {
  const generatedURL =  "https://maps.google.com/maps/api/geocode/json?address=" + encodeURIComponent(address);

  request({
    url: generatedURL,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to google server');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find address');
    } else if (body.status === 'OK'){
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });
}

// 3f9f112900c587be196edf477ccfa9ab
