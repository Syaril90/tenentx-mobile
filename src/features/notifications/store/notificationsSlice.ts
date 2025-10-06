import { StateCreator } from 'zustand';
import { NotifFilter, Notification } from '../../../features/notifications/types';
import { NotifRepos } from '../services/factory';
export type NotificationsState = {
  items: Notification[];
  loading: boolean;
  error?: string;
  filter: NotifFilter; // 'all' | 'unread' | category
};

export type NotificationsActions = {
  load(): Promise<void>;
  setFilter(f: NotifFilter): void;
  markAllRead(): Promise<void>;
  markRead(id: string): Promise<void>;
};

export type NotificationsSlice = NotificationsState & NotificationsActions;

export const createNotificationsSlice: StateCreator<
  NotificationsSlice,
  [['zustand/devtools', never]],
  [],
  NotificationsSlice
> = (set, get) => ({
  items: [],
  loading: false,
  filter: 'all',

  async load() {
    set({ loading: true, error: undefined });
    try {
      const items = await NotifRepos.notifs().list();
      set({ items, loading: false });
    } catch (e) {
      set({ loading: false, error: 'Failed to load notifications' });
    }
  },

  setFilter(filter) {
    set({ filter });
  },

  async markAllRead() {
    try {
      await NotifRepos.notifs().markAllRead();
      const next = get().items.map((n) => ({ ...n, read: true }));
      set({ items: next });
    } catch (e) {
      // swallow for mock
    }
  },

  async markRead(id: string) {
    try {
      await NotifRepos.notifs().markRead(id);
      const next = get().items.map((n) => (n.id === id ? { ...n, read: true } : n));
      set({ items: next });
    } catch (e) {
      // swallow for mock
    }
  },
});
