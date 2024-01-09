import { Announcement } from '../type';

interface AnnouncementDetailProps {
  announcement: Announcement;
}
const AnnouncementDetail = ({ announcement }: AnnouncementDetailProps) => {
  return <>{announcement.title}</>;
};

export default AnnouncementDetail;
