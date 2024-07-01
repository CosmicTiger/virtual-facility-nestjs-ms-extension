import { NestFactory } from '@nestjs/core';
import { AlarmsServiceModule } from './alarms-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AlarmsServiceModule);
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.NATS,
      options: {
        servers: process.env.NATS_URL, // 👈
        queue: 'alarms-service', // 👈
      },
    },
    { inheritAppConfig: true },
  );
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
