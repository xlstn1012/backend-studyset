import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsController } from './board/boards.controller';

@Module({
  imports: [],
  controllers: [AppController, BoardsController],
  providers: [AppService],
})
export class AppModule {}
