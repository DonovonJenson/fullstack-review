const request = require('request');
const config = require('../config.js');


let getReposByUsername = (term, callback) => {
  console.log('https://api.github.com/users/' + term+'/repos/')
  let options = {
    url: 'https://api.github.com/users/' + term + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  request(options, function (error, response, body) {
    callback(JSON.parse(body));
  })


}


module.exports.getReposByUsername = getReposByUsername;