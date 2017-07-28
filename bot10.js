console.log('The bot is starting');

var Twit = require('twit')

var config = require('./config.js');
 
var T = new Twit(config);

// Setting up a user stream
// var stream = t.stream('user'):
// Anytime someone follows me
// stream.on('follow', followed);

var stream = T.stream('user');
// When a direct message is recieved
//stream.on('direct_message', function (eventMsg) {
//  var msg = eventMsg.direct_message.text;
//  var screenName = eventMsg.direct_message.sender.screen_name;
//  var msgID = eventMsg.direct_message.id_str;
//  console.log('I just received a message from ' + screenName);
//  console.log('msg: ' + msg);
//  console.log('id: ' + msgID);
//});
//
stream.on('direct_message', function (eventMsg) {
  var msg = eventMsg.direct_message.text;
  var screenName = eventMsg.direct_message.sender.screen_name;
  var msgID = eventMsg.direct_message.id_str;

  if (msg.search('#talkpay') !== -1) {
    return T.post('statuses/update', { status: msg}, function () {
      console.log('I tweeted the message');
    });
  }
});


//tweetIt();
//setInterval(tweetIt,1000*60);

function IncommingMessage() {
	console.log('direct_message',direct_message);
}

function followed(event) {
	var name = event.source.name;
	var screenName = event.source.screen_name;
	console.log('I was followed by: ' + name );
}

//tweetIt();
function tweetIt() {

	var hrTime = process.hrtime();
	var hrTime = getDateTime();

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

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "/" + month + "/" + day + " - " + hour + ":" + min + ":" + sec;

}