import { LeaveItem } from '../type';

export const statusColor = (status: LeaveItem['status']) => {
  switch (status) {
    case 'PENDING':
      return 'bg-cyan-500';
    case 'APPROVED':
      return 'bg-green-500';
    case 'REJECTED':
      return 'bg-red-500';
  }
};
