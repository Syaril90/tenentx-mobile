import { StateCreator } from 'zustand';
import { DashboardRepos } from '../services/factory';
import type { AnnItem } from '../types';

export type DashboardSlice = {
  me?: { id: string; name: string; avatarUrl?: string };
  unit?: unknown; // adapted in the screen
  balance?: { amountCents: number; currency: 'USD' | 'MYR' | 'PHP' };
  announcements: AnnItem[];         
  tickets?: { openCount: number };
  nextDue?: { nextDueAmountCents: number; nextDueLabel: string };

  dashboardLoading: boolean;
  dashboardError?: string;
  loadDashboard(): Promise<void>;
};

export const createDashboardSlice: StateCreator<
  DashboardSlice,
  [['zustand/devtools', never]],
  [],
  DashboardSlice
> = (set) => ({
  announcements: [],              
  dashboardLoading: false,
  dashboardError: undefined,

  async loadDashboard() {
    set({ dashboardLoading: true, dashboardError: undefined });
    try {
      const data = await DashboardRepos.dashboard().load();
      set({ ...data, dashboardLoading: false });
    } catch {
      set({ dashboardLoading: false, dashboardError: 'Failed to load home data' });
    }
  },
});
