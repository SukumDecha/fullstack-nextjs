'use client';

import { useParams } from 'next/navigation';
import { useGetLeave } from '../hooks/api';
import { toDateString } from '@/features/shared/helpers/date';
import { Badge } from '@/features/shadcn/components/ui/badge';
import { statusColor } from '../helper/leave-status';
import { Separator } from '@/features/shadcn/components/ui/separator';

const LeaveDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: leave, isLoading } = useGetLeave(+id);

  if (isLoading) return <div>Loading...</div>;
  if (!leave) return <div>No leave found</div>;

  return (
    <section>
      <header className="my-4 text-center">
        <Badge className={statusColor(leave.status)}>{leave.status}</Badge>
        <h1 className="text-3xl font-bold">{toDateString(leave.leaveDate)}</h1>
      </header>
      <p>{leave.reason}</p>
      {leave.status === 'REJECTED' && (
        <>
          <Separator className="my-4" />
          <p className="text-red-500">{leave.rejectionReason}</p>
        </>
      )}
    </section>
  );
};

export default LeaveDetail;
