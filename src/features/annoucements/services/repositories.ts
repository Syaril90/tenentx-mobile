import { Announcement } from '../types';

export interface AnnouncementsRepository {
  list(): Promise<Announcement[]>;
}
