import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workflow } from './entities/workflow.entity';
import { WorkflowsController } from './workflows.controller';
import { WorkflowsService } from './workflows.service';
import { InboxModule } from '../inbox/inbox.module';
import { WorkflowsInboxProcessor } from './workflows-inbox.processor';

@Module({
  imports: [TypeOrmModule.forFeature([Workflow]), InboxModule], // 👈
  controllers: [WorkflowsController],
  providers: [WorkflowsService, WorkflowsInboxProcessor], // 👈
})
export class WorkflowsModule {}
