import { StateCreator } from 'zustand';
import { ComplaintsRepos } from '../services/factory';
import type { Complaint, ComplaintFilters, ComplaintStatus } from '../types';

export type ComplaintsSlice = {
  complaints: Complaint[];
  complaintsLoading: boolean;
  complaintsError?: string;

  filters: ComplaintFilters;

  loadComplaints(): Promise<void>;
  setQuery(q: string): void;
  setStatus(s: 'all' | ComplaintStatus): void;
  toggleSort(): void;
};

export const createComplaintsSlice: StateCreator<
  ComplaintsSlice,
  [['zustand/devtools', never]],
  [],
  ComplaintsSlice
> = (set) => ({
  complaints: [],
  complaintsLoading: false,
  filters: { q: '', status: 'all', sortByDate: 'desc' },

  async loadComplaints() {
    set({ complaintsLoading: true, complaintsError: undefined });
    try {
      const items = await ComplaintsRepos.complaints().list();
      set({ complaints: items, complaintsLoading: false });
    } catch {
      set({ complaintsLoading: false, complaintsError: 'Failed to load complaints' });
    }
  },

  setQuery(q) { set((s) => ({ filters: { ...s.filters, q } })); },
  setStatus(status) { set((s) => ({ filters: { ...s.filters, status } })); },
  toggleSort() { set((s) => ({ filters: { ...s.filters, sortByDate: s.filters.sortByDate === 'desc' ? 'asc' : 'desc' } })); },
});
