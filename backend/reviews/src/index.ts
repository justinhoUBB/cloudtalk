import * as amqp from 'amqplib/callback_api.js';
import { ReviewStatus } from './models/enums/ReviewStatus.js';
import { ProductController } from './controllers/ProductController.js';

const exchangeName = 'reviewExchange';
const queueName = 'reviewQueue';
const productController = new ProductController();
amqp.connect('amqp://rabbitmq', (error: Error, connection: amqp.Connection) => {
    if (error) {
        console.log(error);
        throw error;
    }
    connection.createChannel((error: Error, channel: amqp.Channel) => {
        if (error) {
            console.log(error);
            return;
        }

        channel.assertExchange(exchangeName, 'fanout', {durable: false});
        channel.assertQueue(queueName, {durable: false}, (error: Error, q: amqp.Replies.AssertQueue) => {
            if (error) {
                console.log(error);
                return;
            }
            console.log('Waiting for review messages for processing');
            channel.bindQueue(queueName, exchangeName, '');

            channel.consume(queueName, (message: amqp.ConsumeMessage | null) => {
                if (message!== null) {
                    const { status, review } = JSON.parse(message.content.toString());
                    console.log('Message received', status, review);
                    switch (status) {
                        case ReviewStatus.CREATED:
                            productController.createReview(review);
                            break;
                        case ReviewStatus.DELETED:
                            productController.deleteReview(review);
                            break;
                        case ReviewStatus.UPDATED:
                            productController.updateReview(review);
                            break;
                        default:
                            console.log('Invalid review status received', message)
                    }
                }
            }, {noAck: true});
        });
  });
});