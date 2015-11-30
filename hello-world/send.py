import pika

# Connect to amqp server on 'localhost'
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Create queue 'hello'
channel.queue_declare(queue='hello')

# Publish message to the queue
channel.basic_publish(exchange='',
                      routing_key='hello',
                      body='Hello world!')

print('\n\nPublished message "Hello world!" to the "hello" queue.\n\n');