import * as amqp from 'amqplib/callback_api.js';
import { ReviewStatus } from './models/enums/ReviewStatus.js';
import { ProductController } from './controllers/ProductController.js';

const exchangeName = 'reviewExchange';
const productController = new ProductController();
amqp.connect('amqp://rabbitmq', (error: any, connection: amqp.Connection) => {
    if (error) {
        console.log(error);
        return;
    }
    connection.createChannel((error: any, channel: amqp.Channel) => {
        if (error) {
            console.log(error);
            return;
        }

        channel.assertExchange(exchangeName, 'fanout', {durable: false});
        channel.assertQueue('', {exclusive: true}, (error: any, q: amqp.Replies.AssertQueue) => {
            if (error) {
                console.log(error);
                return;
            }
            console.log('Waiting for review messages for processing');
            channel.bindQueue(q.queue, exchangeName, '');

            channel.consume(q.queue, (message: amqp.ConsumeMessage | null) => {
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