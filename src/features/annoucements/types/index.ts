export type AnnCategory = 'maintenance' | 'events' | 'notices' | 'security';

export type Announcement = {
  id: string;
  title: string;
  body: string;
  category: AnnCategory;
  createdAtISO: string;       // when published
  imageUrl?: string;
  pinned?: boolean;
  read?: boolean;
};
