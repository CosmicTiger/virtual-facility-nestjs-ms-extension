import { Inject, Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { ALARMS_SERVICE } from './constants';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AlarmsGeneratorService {
  constructor(
    @Inject(ALARMS_SERVICE) private readonly alarmsService: ClientProxy,
  ) {}

  @Interval(10000)
  generateAlarm() {
    const alarmCreatedEvent = {
      name: 'Alarm #' + Math.floor(Math.random() * 1000) + 1,
      buildingId: Math.floor(Math.random() * 100) + 1,
    };
    this.alarmsService.emit('alarm.created', alarmCreatedEvent);
  }
}
