import { Module } from '@nestjs/common';
import { AlarmsClassifierServiceController } from './alarms-classifier-service.controller';

@Module({
  imports: [],
  controllers: [AlarmsClassifierServiceController],
  providers: [],
})
export class AlarmsClassifierServiceModule {}
