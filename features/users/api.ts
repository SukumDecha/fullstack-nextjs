import { SignUp } from '../auth/types';
import db from '@/features/shared/db';
import bcrypt from 'bcryptjs';
export const add = async (input: SignUp) => {
  const password = await hashPassword(input.password);

  const user = db.user.create({
    data: {
      ...input,
      password,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
    },
  });

  return user;
};

const hashPassword = (password: string) => {
  return bcrypt.hash(password, 12);
};
