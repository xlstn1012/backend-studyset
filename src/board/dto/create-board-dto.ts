import { isApprove, isPublic } from '../boards.model';

export class CreateBoardDto {
  name: string;
  description: string;
  writer: string;
  status: isPublic;
  approvedByAdmin: isApprove;
}
