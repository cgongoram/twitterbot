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
//stream.on('direct_message', function (eventMsg) {
//  var msg = eventMsg.direct_message.text;
//  var screenName = eventMsg.direct_message.sender.screen_name;
//  var msgID = eventMsg.direct_message.id_str;
//  if (msg.search('#talkpay') !== -1) {
//    return T.post('statuses/update', { status: msg}, function () {
//      console.log('I tweeted the message');
//    });
//  }
//});
//




stream.on('direct_message', function (eventMsg) {
  var msg = eventMsg.direct_message.text;
  var screenName = eventMsg.direct_message.sender.screen_name;
  var msgID = eventMsg.direct_message.id_str;

  if (screenName === 'cgongoram_test') {
  	console.log('Descartado. Mensaje recibido de usuario @' + screenName);
    return callbackHandler(msgID);
  }

  else if (msg.search('zendere.ejecutar') !== -1) {
  	console.log('Ejecutando comando especial recibido de usuario @' + screenName);
	T.post('direct_messages/new', {
	      screen_name: screenName,
	      text: 'MENSAJE RECIBIDO @' + screenName + ' ejecutando comando zendere.ejecutar'

	    }, function () {
	      callbackHandler(msgID);
	      console.log('MENSAJE RECIBIDO @' + screenName);
	    });

    return T.post('statuses/update', {
      status: msg
    }, function () {
      callbackHandler(msgID);
      console.log(msgID);
    });


  }

  else {
  	
    return T.post('direct_messages/new', {
      screen_name: screenName,
      text: 'ruhroh, you need to include #talkpay in your DM for me to do my thang'
    }, function () {
    	console.log('NO se encontro el hashtag talkpay en el mensaje recibido del usuario @' + screenName);
      	callbackHandler(msgID);
    });
  }
});


function callbackHandler(id) {
  T.post('direct_messages/destroy', {
    id: id
  }, function (err) {
    if (err) { console.error(err);
    			console.log(err); }
  });
}
