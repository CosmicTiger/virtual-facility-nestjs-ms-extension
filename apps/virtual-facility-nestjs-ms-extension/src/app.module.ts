import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuildingsModule } from './buildings/buildings.module';

@Module({
  imports: [BuildingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
