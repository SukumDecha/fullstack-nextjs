'use client';
import { useUiStore } from '@/features/ui/store';
import { useRegister } from '../hooks/api';
import { SignUp } from '../types';
import AuthForm from './AuthForm';
import { useRouter } from 'next/navigation';

const Register = () => {
  const { mutateAsync } = useRegister();
  const router = useRouter();
  const setToast = useUiStore((state) => state.setToast);

  const submit = async (credentials: SignUp) => {
    await mutateAsync(credentials);
    setToast({
      type: 'Success',
      message: 'Your account have been registered.',
    });
    router.replace('/');
  };
  return <AuthForm kind="register" onSubmit={submit} />;
};

export default Register;
