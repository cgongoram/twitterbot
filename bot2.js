var Twit = require('twit')
var T = new Twit({
  consumer_key:         'E82dLhOMSTi0g3Mh7WfED5cWW',
  consumer_secret:      'L4pXnKLIPinFQQjkuWm1r21iIuTOYVfvJEV00C53HLcBf6N8Vu',
  access_token:         '864956202517770240-YzU1dW3GKNxrrZECAGhIYEIaOf70i9s',
  access_token_secret:  'pMZzbNPys9oiaEDoXFinp67p4atvhMRuO4UvBsfxUOfCl',
})
var stream = T.stream('user');
stream.on('direct_message', function (eventMsg) {
    console.log(eventMsg)
})