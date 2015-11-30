<?php

require_once __DIR__ . '/vendor/autoload.php';
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

if(isset($_FILES) && !empty($_FILES)) {
	echo "<pre>";

	$image = $_FILES['image'];

	// Save image to disk
	$uploadFile = dirname(__FILE__) . '\images\\' . $image['name'];
	move_uploaded_file($image['tmp_name'], $uploadFile);
	$image['path'] = $uploadFile;

	// Connect to amqp server on 'locahost'
	$connection = new AMQPStreamConnection('localhost', 5672, 'guest', 'guest');
	$channel = $connection->channel();

	// Create queue 'image_resize'
	$channel->queue_declare('image_resize', false, false, false, false);

	// Create and send a message with our image data
	$msg = new AMQPMessage(json_encode($image));
	$channel->basic_publish($msg, '', 'image_resize');

	// Close the connection
	$channel->close();
	$connection->close();

	echo "</pre>";

	echo "<iframe width=100% height=100% frameBorder=0 src='images.php?name=" . $image['name'] . "'></iframe>";
}
else {
	echo "<form method='post' enctype='multipart/form-data'><input name='image' type='file'><input type='submit'></form>";
}

