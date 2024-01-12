'use client';
import { Separator } from '@radix-ui/react-separator';
import AnnouncementItem from './AnnouncementItem';
import * as types from '../type';

interface AnnouncementListProps {
  announcements: types.AnnouncementItem[];
}

const AnnouncementList = ({ announcements }: AnnouncementListProps) => {
  return (
    <section>
      <h1 className="my-4 text-center text-4xl font-bold ">
        All Announcements
      </h1>
      <Separator className="my-4" />
      <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {announcements.map((announcement) => (
          <AnnouncementItem key={announcement.id} {...announcement} />
        ))}
      </div>
    </section>
  );
};

export default AnnouncementList;
