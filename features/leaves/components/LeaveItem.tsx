import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/features/shadcn/components/ui/card';
import { type LeaveItem } from '../type';
import { toDateString } from '@/features/shared/helpers/date';
import { Separator } from '@/features/shadcn/components/ui/separator';
import { Badge } from '@/features/shadcn/components/ui/badge';
import { Edit } from 'lucide-react';
import Link from 'next/link';
import { statusColor } from '../helper/leave-status';

const LeaveItem = ({ id, reason, status, leaveDate }: LeaveItem) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="font-bold">
        <Link href={`/leaves/${id}`}>{toDateString(leaveDate)}</Link>
      </CardHeader>
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
