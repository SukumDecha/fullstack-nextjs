import { AddLeaveInput } from '@/features/leaves/type';
import * as validators from '@/features/leaves/validators';
import * as api from '@/features/leaves/api';
import { getServerAuthSession } from '@/features/auth/auth';
export const GET = async () => {
  const session = await getServerAuthSession();
  if (!session) return Response.json({ err: 'Please Login' }, { status: 401 });

  const leaves = await api.findAll(+session.user.id);

  return Response.json(leaves);
};

export const POST = async (req: Request) => {
  const session = await getServerAuthSession();
  if (!session) return Response.json({ err: 'Please Login' }, { status: 401 });

  const body = await (req.json() as Promise<AddLeaveInput>);

  try {
    const form = await validators.add.parseAsync(body);
    const leave = await api.add(+session.user.id, form);
    return new Response(JSON.stringify(leave), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 422,
    });
  }
};
