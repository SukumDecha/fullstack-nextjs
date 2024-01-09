import { z } from 'zod';

// z.object({
//     name: z.string().optional(),
//     gender: z.enum(['male', 'female']),
//     age: z.number().min(1),
//     email: z.string().email(),
//     password: z.string().min(8)
// })

export const add = z.object({
    title: z.string()
})

export const update = add.partial();

