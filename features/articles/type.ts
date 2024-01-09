import { z } from 'zod'
import { add, update } from './validator';
export interface Article {
    id: number;
    title: string;
}

export type CreateArticleInput = z.infer<typeof add>
export type UpdateArticleInput = z.infer<typeof update>