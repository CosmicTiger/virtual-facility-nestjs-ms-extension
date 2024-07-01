import { Module } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { BuildingsController } from './buildings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from './entities/building.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WORKFLOWS_SERVICE } from '../constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Building]),
    ClientsModule.register([
      {
        name: WORKFLOWS_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'workflows-service',
        },
      },
    ]),
  ],
  controllers: [BuildingsController],
  providers: [BuildingsService],
})
export class BuildingsModule {}
