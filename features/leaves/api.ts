import { Leave } from '@prisma/client';
import { AddLeaveInput, UpdateLeaveInput } from './type';
import db from '@/features/shared/db';

export const findAll = async () => {
  const leaves = db.leave.findMany({
    select: {
      id: true,
      reason: true,
      leaveDate: true,
      status: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return leaves;
};

export const findById = async (id: number) => {
  const leave = await db.leave.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      leaveDate: true,
      reason: true,
    },
  });

  if (!leave) throw new Error('leave not found');

  return leave;
};
export const add = async (input: AddLeaveInput) => {
  const leave = await db.leave.create({
    data: {
      ...input,
      userId: 1,
    },
  });

  return leave;
};

export const update = async (id: Leave['id'], input: UpdateLeaveInput) => {
  const leave = db.leave.update({
    where: { id },
    data: input,
  });

  return leave;
};
