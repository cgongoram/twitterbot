console.log('The bot is starting');

var Twit = require('twit')

var config = require('./config.js');
 
var T = new Twit(config);
 
// 
//  tweet 'hello world!' 
// 
T.post('statuses/update', { status: '@cgongoram, Hello world3!' }, function(err, data, response) {
  console.log(data)
})

