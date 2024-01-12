import { findAll, findById } from './api';

export type ArticleItem = Awaited<ReturnType<typeof findAll>>[number];

export type ArticleDetails = NonNullable<Awaited<ReturnType<typeof findById>>>;
