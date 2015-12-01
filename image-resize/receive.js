var amqp = require('amqplib/callback_api');
var Jimp = require('jimp');
var path = require('path');

// Connect to amqp server on 'localhost'
amqp.connect('amqp://localhost', function(err, conn) {
	conn.createChannel(function(err, channel) {

		// Create channel 'image_resize'
		var queue = 'image_resize';
		channel.assertQueue(queue, { durable: false });

		console.log('\nWaiting for messages. To exit press CTRL+C\n');

		// Setup consume method for message on queue 'hello'
		channel.consume(queue, function(msg) {
			var data = JSON.parse(msg.content.toString())

			// Read image from path
			Jimp.read(data.path, function(err, image) {
				if(err) { console.error(err); }

				var getName = function(extra) {
					var ext = path.extname(data.name);
					var basename = path.basename(data.name, ext);
					var dir = path.dirname(data.path);

					return path.join(dir, basename + '-' + extra + ext);
				}

				image.cover(256, 256).write(getName('basic'));

				setTimeout(function() {
					console.log('Writing image ' + path.basename(getName('small')));
					image.clone().write(getName('small'));
				}, 1000);

				setTimeout(function() {
					console.log('Writing image ' + path.basename(getName('bw')));
					image.clone().greyscale().write(getName('bw'));
				}, 2000);

				setTimeout(function() {
					console.log('Writing image ' + path.basename(getName('invert')));
					image.clone().invert().write(getName('invert'));
				}, 3000);

				setTimeout(function() {
					console.log('Writing image ' + path.basename(getName('rotate')));
					image.clone().rotate(180).write(getName('rotate'));
				}, 4000);

				setTimeout(function() {
					console.log('Writing image ' + path.basename(getName('sepia')));
					image.clone().sepia().write(getName('sepia'));
				}, 5000);

				setTimeout(function() {
					console.log('Writing image ' + path.basename(getName('darken')));
					image.clone().brightness(-0.5).write(getName('darken'));
				}, 6000);

				setTimeout(function() {
					console.log('Writing image ' + path.basename(getName('lighten')));
					image.clone().brightness(0.5).write(getName('lighten'));
				}, 7000);

				setTimeout(function() {
					console.log('Writing image ' + path.basename(getName('dither')));
					image.clone().dither565().write(getName('dither'));
				}, 8000);

				setTimeout(function() {
					console.log('Writing image ' + path.basename(getName('poster')));
					image.clone().posterize(3).write(getName('poster'));
				}, 9000);
			});

		}, { noAck: true });
	});
});