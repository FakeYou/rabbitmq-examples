var amqp = require('amqplib/callback_api');
var Chance = require('chance');

var chance = new Chance();

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, channel) {
    var queue = 'email';

    channel.assertQueue(queue, { durable: false, maxPriority: 5 });

    setInterval(function() {
    	var data = {
    		type: 'newsletter',
    		email: chance.email()
    	};

    	channel.sendToQueue(queue, new Buffer(JSON.stringify(data)));
    	console.log('added email "' + data.type + '" to "' + data.email + '" to queue');
    }, 1000);
  });
});