import { findAll, findById } from '@/features/announcements/api';

export type AnnouncementItem = Awaited<ReturnType<typeof findAll>>[number];

export type AnnouncementDetails = NonNullable<
  Awaited<ReturnType<typeof findById>>
>;
