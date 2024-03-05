import { ProfileForm, SignUp } from '../auth/types';
import db from '@/features/shared/db';
import bcrypt from 'bcryptjs';
import { removeDirFromFile, saveFile } from '../shared/helpers/file';

export const findById = async (id: number) => {
  const user = await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
    },
  });

  if (!user) throw new Error('User not found');

  return user;
};
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

export const update = async (userId: number, input: ProfileForm) => {
  let { image } = await findById(userId);

  if (input.image) {
    const currentImage = image;
    image = await saveFile(input.image);
    if (currentImage) removeDirFromFile(currentImage);
  }

  const user = await db.user.update({
    where: {
      id: userId,
    },
    data: {
      ...input,
      image,
      password: input.password ? await hashPassword(input.password) : undefined,
    },
  });

  return user;
};
