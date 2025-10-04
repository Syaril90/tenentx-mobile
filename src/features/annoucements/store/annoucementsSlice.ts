import { StateCreator } from 'zustand';
import { AnnRepos } from '../services/factory';
import { AnnCategory, Announcement } from '../types';

export type AnnState = {
  anns: Announcement[];
  annsLoading: boolean;
  annsError?: string;
  query: string;
  category: AnnCategory | 'all';
};

export type AnnActions = {
  load(): Promise<void>;
  setQuery(q: string): void;
  setCategory(c: AnnCategory | 'all'): void;
  markRead(id: string): void;
};

export type AnnSlice = AnnState & AnnActions;

export const createAnnouncementsSlice: StateCreator<
  AnnSlice,
  [['zustand/devtools', never]],
  [],
  AnnSlice
> = (set, get) => ({
  anns: [],
  annsLoading: false,
  query: '',
  category: 'all',

  async load() {
    set({ annsLoading: true, annsError: undefined });
    try {
      const anns = await AnnRepos.anns().list();
      set({ anns, annsLoading: false });
    } catch {
      set({ annsError: 'Failed to load announcements', annsLoading: false });
    }
  },

  setQuery(q) {
    set({ query: q });
  },

  setCategory(c) {
    set({ category: c });
  },

  markRead(id) {
    const next = get().anns.map((a) => (a.id === id ? { ...a, read: true } : a));
    set({ anns: next });
  },
});
