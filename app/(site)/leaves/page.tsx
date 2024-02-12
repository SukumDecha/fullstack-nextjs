'use client';

import LeaveList from '@/features/leaves/components/LeaveList';
import { useGetLeaves } from '@/features/leaves/hooks/api';

const LeavePage = () => {
  const { data, status } = useGetLeaves();

  if (status === 'pending') return <div>Loading Data.</div>;
  if (!data) return <div>No Leaves found.</div>;

  return <LeaveList leaves={data} />;
};

export default LeavePage;
