'use client';

import { AnnouncementDetails } from '../type';

interface AnnouncementDetailProps {
  announcement: AnnouncementDetails;
}

const AnnouncementDetail = ({
  announcement: { title, content },
}: AnnouncementDetailProps) => {
  return (
    <article className="container">
      <h2 className="my-4 text-center text-4xl font-bold">{title}</h2>
      <p className="my-4 text-xl">{content}</p>
    </article>
  );
};

export default AnnouncementDetail;
