import { StateCreator } from 'zustand';
import { PaymentsRepos } from '../services/factory';
import { Payment } from '../types';

export type PaymentsState = {
  paymentsHistory: Payment[];
  paymentsLoading: boolean;
  paymentsError?: string;
};

export type PaymentsActions = {
  loadHistory(): Promise<void>;
};

export type PaymentsSlice = PaymentsState & PaymentsActions;

export const createPaymentsSlice: StateCreator<
  PaymentsSlice,
  [['zustand/devtools', never]],
  [],
  PaymentsSlice
> = (set) => ({
  paymentsHistory: [],
  paymentsLoading: false,
  paymentsError: undefined,

  loadHistory: async () => {
    set({ paymentsLoading: true, paymentsError: undefined });
    try {
      const paymentsHistory = await PaymentsRepos.payments().listHistory();
      set({ paymentsHistory, paymentsLoading: false });
    } catch {
      set({ paymentsError: 'Failed to load payments', paymentsLoading: false });
    }
  },
});
