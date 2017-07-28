console.log('The bot is starting');

var Twit = require('twit')

var config = require('./config.js');
 
var T = new Twit(config);

var hrTime = process.hrtime()



// 
//  search twitter for all tweets containing the word 'banana' since July 11, 2011 
// 
T.get('search/tweets', { q: 'puraschichis since:2017-05-17', count: 10000 }, gotData)

function gotData(err, data, response) {
	var tweets = data.statuses;
	for (var i = 0; i < tweets.length; i++) 
	{
		hrTime = process.hrtime()
		console.log(hrTime[0] * 1000000 + hrTime[1] / 1000)
		console.log(i);
		console.log(tweets[i].text);
	}
}


