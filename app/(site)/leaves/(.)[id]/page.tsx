import CreateLeave from '@/features/leaves/components/CreateLeave';
import LeaveDetail from '@/features/leaves/components/LeaveDetail';
import InterceptDialog from '@/features/ui/components/InterceptDialog';

interface LeaveDetailsPageProps {
  params: {
    id: string;
  };
}

const LeaveDetailsPage = ({ params: { id } }: LeaveDetailsPageProps) => {
  return (
    <InterceptDialog>
      {id === 'new' ? <CreateLeave /> : <LeaveDetail />}
    </InterceptDialog>
  );
};

export default LeaveDetailsPage;
