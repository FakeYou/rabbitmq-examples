var amqp = require('amqplib/callback_api');
var chalk = require('chalk');

// Connect to amqp server on 'localhost'
amqp.connect('amqp://localhost', function(err, conn) {
	conn.createChannel(function(err, channel) {

		// Create channel 'email'
		var queue = 'email';
		channel.assertQueue(queue, { durable: false, maxPriority: 5 });
		channel.prefetch(1);

		console.log(chalk.white.bold('\nWaiting for messages. To exit press CTRL+C\n'));

		// Setup consume method for message on queue 'hello'
		channel.consume(queue, function(msg) {

			var data = JSON.parse(msg.content.toString())
			var color = chalk.white.bold;
			var start = Date.now();

			if(msg.properties.priority == 5) {
				color = chalk.red.bold;
			}

			console.log(color('Sending email "' + data.type + '" to "' + data.email + '"'));

			setTimeout(function() {
				console.log(color('\temail sent to "' + data.email + '"!\n'));
				channel.ack(msg);
			}, 3000);
		});
	});
});