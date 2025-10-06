import { Notification } from '../types';

export interface NotificationsRepository {
  list(): Promise<Notification[]>;
  markAllRead(): Promise<void>;
  markRead(id: string): Promise<void>;
}
