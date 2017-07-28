console.log('The bot is starting');

var Twit = require('twit')
 
var T = new Twit({
  consumer_key:         'E82dLhOMSTi0g3Mh7WfED5cWW',
  consumer_secret:      'L4pXnKLIPinFQQjkuWm1r21iIuTOYVfvJEV00C53HLcBf6N8Vu',
  access_token:         '864956202517770240-YzU1dW3GKNxrrZECAGhIYEIaOf70i9s',
  access_token_secret:  'pMZzbNPys9oiaEDoXFinp67p4atvhMRuO4UvBsfxUOfCl',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests. 
})
 
// 
//  tweet 'hello world!' 
// 
//T.post('statuses/update', { status: '@cgongoram, Hello world2!' }, function(err, data, response) {
//  console.log(data)
//})

var stream = T.stream('cgongoram', { stringify_friend_ids: true })
stream.on('direct_message', function (directMsg) {
console.log(directMsg)
}