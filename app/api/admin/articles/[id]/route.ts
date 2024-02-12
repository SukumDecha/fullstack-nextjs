import { UpdateArticleInput } from '@/features/articles/admin/type';
import * as api from '@/features/articles/admin/api';
import * as validators from '@/features/articles/admin/validator';
interface Params {
  params: {
    id: string;
  };
}

//Update
export const PATCH = async (req: Request, { params: { id } }: Params) => {
  const form = await (req.json() as Promise<UpdateArticleInput>);
  const formValidation = await validators.update.safeParseAsync(form);
  if (!formValidation.success) {
    return new Response(JSON.stringify(formValidation.error), {
      status: 422,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const article = api.update(+id, formValidation.data);

  if (!article) return new Response(null, { status: 404 });

  return Response.json(article);
};

//Delete
export const DELETE = async (_req: Request, { params: { id } }: Params) => {
  const index = await api.remove(+id);
  if (index === null) {
    return new Response(null, { status: 404 });
  }

  return new Response(null, { status: 204 });
};
