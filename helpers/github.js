const request = require('request');
const config = require('../config.js');

let getReposByUsername = (term, callback) => {
  console.log('https://api.github.com/users/' + term+'/repos/')
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com/users/' + term + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  request(options, function (error, response, body) {
    //console.log('error:', error); // Print the error if one occurred
    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body); // Print the response
    callback(JSON.parse(body));
  })


}


module.exports.getReposByUsername = getReposByUsername;