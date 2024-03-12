import * as amqp from 'amqplib/callback_api.js'

export function sendToRabbitMQ(exchangeName: string, message: string) {
    amqp.connect(`amqp://rabbitmq`, (error: any, connection: amqp.Connection) => {
    if (error) {
        console.log(error);
        return;
    }
    connection.createChannel((error: any, channel: amqp.Channel) => {
        if (error) {
            console.log(error);
            return;
        }
        channel.assertExchange(exchangeName, 'fanout', { durable: false });
        channel.publish(exchangeName, '', Buffer.from(message))
        });
    });
}