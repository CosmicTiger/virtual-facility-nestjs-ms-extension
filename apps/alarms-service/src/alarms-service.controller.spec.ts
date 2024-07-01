import { Test, TestingModule } from '@nestjs/testing';
import { AlarmsServiceController } from './alarms-service.controller';
import { AlarmsServiceService } from './alarms-service.service';

describe('AlarmsServiceController', () => {
  let alarmsServiceController: AlarmsServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AlarmsServiceController],
      providers: [AlarmsServiceService],
    }).compile();

    alarmsServiceController = app.get<AlarmsServiceController>(AlarmsServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(alarmsServiceController.getHello()).toBe('Hello World!');
    });
  });
});
