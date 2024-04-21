import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, isApprove } from './boards.model';
import { CreateBoardDto } from './dto/create-board-dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  getAllBoards(): any[] {
    return this.boardsService.getAllBoards();
  }

  @Get(':id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardsService.getBoardById(id);
  }

  @Post('create')
  createBoard(@Body() createBoardDto: CreateBoardDto): {
    board: Board;
    message: string;
  } {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Patch(':id/status')
  updateBoard(
    @Param('id') id: string,
    @Body('approvedByAdmin') approvedByAdmin: isApprove,
  ): { board: Board; message: string } {
    return this.boardsService.updateBoard(id, approvedByAdmin);
  }

  @Delete(':id')
  deleteBoard(@Param('id') id: string): { message: string } {
    return this.boardsService.deleteBoard(id);
  }
}
