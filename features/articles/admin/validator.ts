import { z } from 'zod';
import { image } from '@/features/shared/validators/image';
// z.object({
//     name: z.string().optional(),
//     gender: z.enum(['male', 'female']),
//     age: z.number().min(1),
//     email: z.string().email(),
//     password: z.string().min(8)
// })

export const add = z.object({
  title: z
    .string({ required_error: 'ใส่ข้อความมาหน่อยมั้ย' })
    .min(1, { message: 'ใส่ให้มากกว่า 1 ตัว' }),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  image,
});

export const update = add.partial();
