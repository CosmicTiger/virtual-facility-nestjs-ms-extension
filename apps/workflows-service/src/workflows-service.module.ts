import { Module } from '@nestjs/common';
import { WorkflowsServiceController } from './workflows-service.controller';
import { WorkflowsServiceService } from './workflows-service.service';
import { WorkflowsModule } from './workflows/workflows.module';

@Module({
  imports: [WorkflowsModule],
  controllers: [WorkflowsServiceController],
  providers: [WorkflowsServiceService],
})
export class WorkflowsServiceModule {}
