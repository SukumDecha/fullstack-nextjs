import { add, update } from '@/features/articles/admin/api';

export type AddArticleInput = Parameters<typeof add>[0];

export type UpdateArticleInput = Parameters<typeof update>[0];
