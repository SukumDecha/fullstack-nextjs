import { findAll } from '../api';

interface AnnouncementListProps {
  announcements: Awaited<ReturnType<typeof findAll>>;
}

const AnnouncementList = ({ announcements }: AnnouncementListProps) => {
  return (
    <ul>
      {announcements.map((announcement) => (
        <li key={announcement.id}>{announcement.title}</li>
      ))}
    </ul>
  );
};

export default AnnouncementList;
