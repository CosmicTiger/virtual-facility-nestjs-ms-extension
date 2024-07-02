import { TracingLogger } from '@app/tracing/tracing.logger';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AlarmsClassifierServiceController {
  constructor(private readonly logger: TracingLogger) {}

  @MessagePattern('alarm.classify')
  classifyAlarm(@Payload() data: unknown) {
    // Note: In the real-world application, this service would classify alarms (or alarm groups) using AI/ML algorithms.
    // This service would use a pre-trained model to classify alarms as either "critical", "non-critical", or "invalid".
    this.logger.debug(
      `Received new "alarm.classify" event with data: ${JSON.stringify(data)}`,
    );

    // Randomly return "critical", "non-critical", or "invalid".
    return {
      category: ['critical', 'non-critical', 'invalid'][
        Math.floor(Math.random() * 3)
      ],
    };
  }
}
