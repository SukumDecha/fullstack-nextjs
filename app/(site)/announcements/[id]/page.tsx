import { findById } from '@/features/announcements/api';
import AnnouncementDetail from '@/features/announcements/components/AnnouncementDetail';

interface AnnouncementPageProps {
  params: {
    id: string;
  };
}
const AnnouncementPage = async ({ params: { id } }: AnnouncementPageProps) => {
  const announcement = await findById(+id);

  return <AnnouncementDetail announcement={announcement} />;
};

export default AnnouncementPage;
