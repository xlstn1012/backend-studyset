export interface Board {
  id: string;
  name: string;
  description: string;
  writer: string;
  status: isPublic;
  approvedByAdmin: isApprove;
}

export enum isPublic {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export enum isApprove {
  APPROVE = 'APPROVE',
  DISAPPROVE = 'DISAPPROVE',
}
