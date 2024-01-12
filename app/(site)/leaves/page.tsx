'use client'

import LeaveList from '@/features/leaves/components/LeaveList';
import { useGetLeaves } from '@/features/leaves/hooks/api';

const LeavePage = () => {
  const { loading, leaves } = useGetLeaves();

  if(loading) return <div>Loading Data...</div>
  return <LeaveList leaves={leaves} />;
};

export default LeavePage;
