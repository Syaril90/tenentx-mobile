import type { StateCreator } from 'zustand';
import { ComplaintsRepos } from '../services/factory';
import type { Complaint, ComplaintStatus, CreateComplaintInput } from '../types';

export type ComplaintsState = {
  complaints: Complaint[];
  complaintsLoading: boolean;
  complaintsError?: string;

  creating: boolean;

  query: string;
  statusFilter: ComplaintStatus | 'all';
  sortBy: 'date_desc' | 'date_asc';
};

export type ComplaintsActions = {
  loadComplaints(): Promise<void>;
  createComplaint(input: CreateComplaintInput): Promise<Complaint>;
  setQuery(q: string): void;
  setStatusFilter(s: ComplaintsState['statusFilter']): void;
  setSort(sort: ComplaintsState['sortBy']): void;
};

export type ComplaintsSlice = ComplaintsState & ComplaintsActions;

export const createComplaintsSlice: StateCreator<
  ComplaintsSlice,
  [['zustand/devtools', never]],
  [],
  ComplaintsSlice
> = (set, get) => ({
  complaints: [],
  complaintsLoading: false,
  creating: false,
  query: '',
  statusFilter: 'all',
  sortBy: 'date_desc',

  async loadComplaints() {
    set({ complaintsLoading: true, complaintsError: undefined });
    try {
      const repo = ComplaintsRepos.complaints();
      const data = await repo.list();
      set({ complaints: data, complaintsLoading: false });
    } catch {
      set({ complaintsLoading: false, complaintsError: 'Failed to load complaints' });
    }
  },

  async createComplaint(input) {
    set({ creating: true });
    try {
      const repo = ComplaintsRepos.complaints();
      const created = await repo.create(input);
      // optimistic add to list
      const current = get().complaints;
      set({ complaints: [created, ...current], creating: false });
      return created;
    } catch (e) {
      set({ creating: false });
      throw e;
    }
  },

  setQuery(q) { set({ query: q }); },
  setStatusFilter(s) { set({ statusFilter: s }); },
  setSort(sort) { set({ sortBy: sort }); },
});
