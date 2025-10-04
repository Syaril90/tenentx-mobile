import { StateCreator } from 'zustand';
import { PayNowRepos } from '../services/factory';
import { Invoice, PaymentMethodId, PayNowSettings } from '../types';

export type PayNowState = {
  invoices: Invoice[];
  selected: Record<string, boolean>; // invoiceId -> checked
  expanded: Record<string, boolean>;
  method: PaymentMethodId | null;
  settings: PayNowSettings;
  invoicesLoading: boolean;          // ⬅ renamed from `loading`
  invoicesError?: string;            // ⬅ renamed from `error`
};

export type PayNowActions = {
  loadPayNow(): Promise<void>;       // ⬅ renamed from `load`
  toggleInvoice(id: string): void;
  toggleExpand(id: string): void;
  setMethod(m: PaymentMethodId): void;
  setSettings(patch: Partial<PayNowSettings>): void;
  totalSelectedMinor(): number;
  countSelected(): number;
};

export type PayNowSlice = PayNowState & PayNowActions;

export const createPayNowSlice: StateCreator<
  PayNowSlice,
  [['zustand/devtools', never]],
  [],
  PayNowSlice
> = (set, get) => ({
  invoices: [],
  selected: {},
  expanded: {},
  method: null,
  settings: { saveMethod: false, autoDebit: false, reminders: true },
  invoicesLoading: false,
  invoicesError: undefined,

  loadPayNow: async () => {
    set({ invoicesLoading: true, invoicesError: undefined });
    try {
      const invoices = await PayNowRepos.paynow().listOutstanding();
      const selected: Record<string, boolean> = {};
      invoices.forEach((inv) => { if (inv.prechecked) selected[inv.id] = true; });
      set({ invoices, selected, invoicesLoading: false });
    } catch {
      set({ invoicesError: 'Failed to load outstanding invoices', invoicesLoading: false });
    }
  },

  toggleInvoice: (id) => {
    const s = { ...get().selected };
    s[id] = !s[id];
    set({ selected: s });
  },

  toggleExpand: (id) => {
    const e = { ...get().expanded };
    e[id] = !e[id];
    set({ expanded: e });
  },

  setMethod: (m) => set({ method: m }),
  setSettings: (patch) => set({ settings: { ...get().settings, ...patch } }),

  totalSelectedMinor: () => {
    const { invoices, selected } = get();
    return invoices
      .filter((i) => selected[i.id])
      .reduce((sum, i) => sum + i.total.minor, 0);
  },

  countSelected: () => {
    const { selected } = get();
    return Object.values(selected).filter(Boolean).length;
  },
});
