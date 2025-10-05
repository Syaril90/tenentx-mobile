import { StateCreator } from 'zustand';
import { ComplaintsRepos } from '../services/factory';
import type { Complaint } from '../types';

export type SortBy = 'date_desc' | 'date_asc';
export type StatusFilter = Complaint['status'] | 'all';

export type ComplaintsState = {
  complaints: Complaint[];
  complaintsLoading: boolean;
  complaintsError?: string;

  // UI filters
  query: string;
  statusFilter: StatusFilter;
  sortBy: SortBy;
};

export type ComplaintsActions = {
  loadComplaints(): Promise<void>;
  setQuery(q: string): void;
  setStatusFilter(s: StatusFilter): void;
  setSort(v: SortBy): void;
};

export type ComplaintsSlice = ComplaintsState & ComplaintsActions;

export const createComplaintsSlice: StateCreator<
  ComplaintsSlice,
  [['zustand/devtools', never]],
  [],
  ComplaintsSlice
> = (set) => ({
  complaints: [],
  complaintsLoading: false,
  complaintsError: undefined,

  query: '',
  statusFilter: 'all',
  sortBy: 'date_desc',

  async loadComplaints() {
    set({ complaintsLoading: true, complaintsError: undefined });
    try {
      const repo = ComplaintsRepos.complaints();
      const list = await repo.list();
      // keep most recent first by default (UI can re-sort)
      const sorted = [...list].sort((a, b) =>
        b.createdAtISO.localeCompare(a.createdAtISO)
      );
      set({ complaints: sorted, complaintsLoading: false });
    } catch (e) {
      set({
        complaintsError: 'Failed to load complaints',
        complaintsLoading: false,
      });
    }
  },

  setQuery(q) {
    set({ query: q });
  },

  setStatusFilter(s) {
    set({ statusFilter: s });
  },

  setSort(v) {
    set({ sortBy: v });
  },
});
