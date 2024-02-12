import db from '@/features/shared/db';
import z from 'zod';
import * as validators from './validator';
import { slugify } from '@/features/shared/helpers/slugify';
import { revalidatePath } from 'next/cache';
import { saveFile } from '@/features/shared/helpers/file';

export const add = async (input: z.infer<typeof validators.add>) => {
  if (!input.image) {
    throw Error('No image uploaded');
  }
  
  const image = await saveFile(input.image);
  const article = await db.article.create({
    data: {
      ...input,
      userId: 1,
      image,
      slug: slugify(input.title),
    },
  });

  revalidatePath('/articles');

  return article;
};

export const update = async (
  id: number,
  input: z.infer<typeof validators.update>,
) => {
  const article = db.article.update({
    where: {
      id,
    },
    data: {
      ...input,
      userId: 1,
      image: '',
      slug: input.title ? slugify(input.title) : undefined,
    },
  });

  revalidatePath('/articles');
  revalidatePath(`/articles/${id}`);

  return article;
};

export const remove = async (id: number) => {
  const article = await db.article.delete({
    where: {
      id,
    },
  });

  revalidatePath('/articles');
  revalidatePath(`/articles/${id}`);

  return article;
};
