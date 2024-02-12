'use client';
import { useRouter } from 'next/navigation';
import { SignIn } from '../types';
import AuthForm from './AuthForm';
import { useUiStore } from '@/features/ui/store';
import { signIn } from 'next-auth/react';
const Login = () => {
  const router = useRouter();
  const setToast = useUiStore((state) => state.setToast);
  const submit = async (credentials: SignIn) => {
    const result = await signIn('credentials', {
      ...credentials,
      redirect: false,
    });

    if (result?.ok) {
      setToast({
        type: 'Success',
        message: 'Welcome back',
      });
      router.replace('/');
    }

    if (result?.error) {
      setToast({
        type: 'Error',
        message: 'Invalid Credentials',
      });
    }
  };
  return <AuthForm kind="login" onSubmit={submit} />;
};

export default Login;
