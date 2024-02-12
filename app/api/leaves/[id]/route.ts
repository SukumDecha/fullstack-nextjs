import { update } from './../../../../features/leaves/validators';
import { findById } from '@/features/leaves/api';
import { UpdateLeaveInput } from '@/features/leaves/type';
import * as api from '@/features/leaves/api';
import * as validators from '@/features/leaves/validators';

interface PathParams {
  params: {
    id: string;
  };
}

export const GET = async (_req: Request, { params: { id } }: PathParams) => {
  const leave = await findById(+id);

  return Response.json(leave);
};

export const PATCH = async (req: Request, { params: { id } }: PathParams) => {
  const body = await (req.json() as Promise<UpdateLeaveInput>);

  try {
    const form = await validators.update.parseAsync(body);
    const leave = await api.update(+id, form);
    return Response.json(leave);
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 422,
    });
  }
};
