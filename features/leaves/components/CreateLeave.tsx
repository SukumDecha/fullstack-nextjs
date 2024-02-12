'use client';

import { useRouter } from 'next/navigation';
import { useCreateLeave } from '../hooks/api';
import { AddLeaveInput } from '../type';
import LeaveForm from './LeaveForm';

const CreateLeave = () => {
  const router = useRouter();
  const { mutateAsync } = useCreateLeave();

  const createLeave = async (form: AddLeaveInput) => {
    await mutateAsync(form);
    router.push('/leaves');
  };

  return <LeaveForm kind="create" onSubmit={createLeave} />;
};

export default CreateLeave;
