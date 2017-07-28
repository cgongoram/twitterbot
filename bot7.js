console.log('The bot is starting');

var Twit = require('twit')

var config = require('./config.js');
 
var T = new Twit(config);



tweetIt();

function tweetIt() {

	var hrTime = process.hrtime();
	var tweet = {

		status:'@cgongoram #cgongoram twit desde programa node.js en maquina escritorio ' + hrTime
	}
	// 
	//  tweet 'hello world!' 
	// 
	T.post('statuses/update', tweet, tweeted);	

	console.log(hrTime); 
}

function tweeted(err, data, response) {
	if(err) {
		console.log("Ocurrio un error!");
	}
	else {
		console.log("Operacion exitosa!");
	}
}
