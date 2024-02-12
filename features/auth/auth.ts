import bcrypt from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';

import db from '@/features/shared/db';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) return null;
        if (!credentials?.password) return null;
        if (!(await bcrypt.compare(credentials?.password, user.password))) {
          return null;
        }

        return { ...user, id: user.id.toString() };
      },
    }),
  ],
};
