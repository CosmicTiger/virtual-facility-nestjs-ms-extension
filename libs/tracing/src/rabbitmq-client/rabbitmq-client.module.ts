import { Module } from '@nestjs/common';
import { RabbitMQClientProxy } from './rabbitmq-client.proxy';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RABBITMQ_BROKER } from './constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RABBITMQ_BROKER,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'notifications-service',
        },
      },
    ]),
  ],
  providers: [RabbitMQClientProxy],
  exports: [RabbitMQClientProxy],
})
export class NatsClientModule {}
