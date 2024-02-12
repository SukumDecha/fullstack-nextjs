import { SignUp, Profile } from '@/features/auth/types';
import { useMutation } from '@tanstack/react-query';

export const useRegister = () => {
  return useMutation({
    mutationFn: async (input: SignUp) => {
      const res = await fetch('http://localhost/api/auth/sign-up', {
        method: 'POST',
        body: JSON.stringify(input),
      });

      const profile = await (res.json() as Promise<Profile>);

      return profile;
    },
  });
};
