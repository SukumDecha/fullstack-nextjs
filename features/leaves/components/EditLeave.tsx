'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEditLeave, useGetLeave } from '../hooks/api';
import LeaveForm from './LeaveForm';
import { UpdateLeaveInput } from '../type';
import { useUiStore } from '@/features/ui/store';

const EditLeave = () => {
  const router = useRouter();
  const setToast = useUiStore((state) => state.setToast);
  const { id } = useParams<{ id: string }>();
  const { data: leave, status, isLoading } = useGetLeave(+id);
  const { mutateAsync } = useEditLeave(+id);

  const editLeave = async (input: UpdateLeaveInput) => {
    await mutateAsync(input);
    setToast({
      type: 'Success',
      message: 'The leave has already been updated',
    });
    router.push('/leaves');
  };
  if (isLoading) return <div>Loading</div>;
  if (!leave) return <div>No leave data found</div>;

  return <LeaveForm kind="edit" leave={leave} onSubmit={editLeave} />;
};

export default EditLeave;
