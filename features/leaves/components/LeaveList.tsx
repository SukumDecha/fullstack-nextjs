'use client';

import { Leave } from '@/features/leaves/type';
import { Button } from '@/features/shadcn/components/ui/button';
import { Separator } from '@/features/shadcn/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import LeaveItem from './LeaveItem';

interface LeaveListProps {
  leaves: Leave[];
}

const LeaveList = ({ leaves }: LeaveListProps) => {
  const router = useRouter();
  return (
    <section>
      <h1 className="my-4 text-center text-4xl font-bold">All Leaves</h1>
      <Separator className="my-4" />
      <div className="xl: gaps-4 mx-auto grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3">
        {leaves.map((leave) => (
          <LeaveItem key={leave.id} {...leave} />
        ))}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="z-100 fixed bottom-10 right-10 flex items-center justify-center rounded-full bg-blue-600 text-white drop-shadow"
        onClick={() => router.push('/leaves/new')}
      >
        <Plus />
      </Button>
    </section>
  );
};

export default LeaveList;
