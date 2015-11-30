import pika
import signal

# Clean exit on CTRL+C
signal.signal(signal.SIGINT, signal.SIG_DFL)

# Connect to amqp server on 'localhost'
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Create queue 'hello'
channel.queue_declare(queue='hello')

print('\nWaiting for messages. To exit press CTRL+C\n');

def callback(ch, method, properties, body):
    print(' - Received "' + body.decode('utf-8') + '"')

# Setup consume method for message on queue 'hello'
channel.basic_consume(callback,
                      queue='hello',
                      no_ack=True)

# Start consuming
channel.start_consuming()