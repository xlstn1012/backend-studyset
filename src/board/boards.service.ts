import { Injectable } from '@nestjs/common';
import { Board, isApprove, isPublic } from './boards.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board-dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id);
  }

  createBoard(createBoardDto: CreateBoardDto): {
    board: Board;
    message: string;
  } {
    const { name, writer, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      name,
      writer,
      description,
      status: isPublic.PRIVATE, // status를 자동으로 PRIVATE로 설정
      approvedByAdmin: isApprove.DISAPPROVE,
    };
    if (board.approvedByAdmin === isApprove.DISAPPROVE) {
      this.boards.push(board);
      console.log('게시물이 보류중입니다.', board);
      return { message: '게시물이 보류중입니다.', board };
    }
    this.boards.push(board);
    console.log('게시물이 보류중입니다.', board);
    return { message: '게시물이 생성되었습니다.', board };
  }

  updateBoard(
    id: string,
    approvedByAdmin: isApprove,
  ): { board: Board; message: string } {
    const board = this.getBoardById(id);
    board.approvedByAdmin = approvedByAdmin;
    console.log(`${approvedByAdmin}로 수정되었습니다.`);
    if (approvedByAdmin === isApprove.APPROVE) {
      board.status = isPublic.PUBLIC;
      console.log('게시물이 올라갔습니다.');
      return { message: '게시물이 올라갔습니다.', board };
    } else {
      board.status = isPublic.PRIVATE;
      console.log('관리자의 승인이 필요합니다.');
      return { message: '관리자의 승인이 필요합니다.', board };
    }
  }

  deleteBoard(id: string): { message: string } {
    const initialLength = this.boards.length;
    this.boards = this.boards.filter((board) => board.id !== id);

    if (this.boards.length < initialLength) {
      console.log(`${id} 게시물이 삭제되었습니다.`);
      return { message: `${id} 게시물을 삭제했습니다.` };
    } else {
      console.log(`${id} 게시물이 없습니다.`);
      return { message: `${id} 게시물이 없습니다.` };
    }
  }
}
