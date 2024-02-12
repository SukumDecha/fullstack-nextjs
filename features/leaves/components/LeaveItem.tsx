import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/features/shadcn/components/ui/card';
import { Leave } from '../type';
import { toDateString } from '@/features/shared/helpers/date';
import { Separator } from '@/features/shadcn/components/ui/separator';
import { Badge } from '@/features/shadcn/components/ui/badge';
import { Edit } from 'lucide-react';
import Link from 'next/link';

const statusColor = (status: Leave['status']) => {
  switch (status) {
    case 'PENDING':
      return 'bg-cyan-500';
    case 'APPROVED':
      return 'bg-green-500';
    case 'REJECTED':
      return 'bg-red-500';
  }
};
const LeaveItem = ({ id, reason, status, leaveDate }: Leave) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="font-bold">{toDateString(leaveDate)}</CardHeader>
      <CardContent>{reason}</CardContent>
      <Separator />
      <CardFooter className="flex items-center justify-between px-6 py-3">
        <Badge className={statusColor(status)}>{status}</Badge>
        <Link href={`/leaves/${id}/edit`}>
          <Edit className="h-6 w-6" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LeaveItem;
