import type { StateCreator } from 'zustand';
import { FacilityRepos } from '../services/factory';
import type { Facility, FacilityCategory, FacilitySlot } from '../types';

export type FacilitiesState = {
  facilities: Facility[];
  facilitiesLoading: boolean;
  facilitiesError?: string;

  tab: 'browse' | 'my';
  category: FacilityCategory | 'all';

  selected?: Facility;
  dateISO: string;
  slots: FacilitySlot[];
  slotsLoading: boolean;
  pickedSlotId?: string;
};

export type FacilitiesActions = {
  load(): Promise<void>;
  setTab(t: FacilitiesState['tab']): void;
  setCategory(c: FacilitiesState['category']): void;

  open(f: Facility): Promise<void>;
  close(): void;

  setDate(dateISO: string): Promise<void>;
  pickSlot(id?: string): void;

  confirm(): Promise<void>;
};

export type FacilitiesSlice = FacilitiesState & FacilitiesActions;

export const createFacilitiesSlice: StateCreator<
  FacilitiesSlice,
  [['zustand/devtools', never]],
  [],
  FacilitiesSlice
> = (set, get) => ({
  facilities: [],
  facilitiesLoading: false,
  tab: 'browse',
  category: 'all',

  selected: undefined,
  dateISO: new Date().toISOString().slice(0, 10),
  slots: [],
  slotsLoading: false,
  pickedSlotId: undefined,

  async load() {
    set({ facilitiesLoading: true, facilitiesError: undefined });
    try {
      const facilities = await FacilityRepos.facilities().list();
      set({ facilities, facilitiesLoading: false });
    } catch {
      set({ facilitiesLoading: false, facilitiesError: 'Failed to load facilities' });
    }
  },

  setTab(t) { set({ tab: t }); },
  setCategory(c) { set({ category: c }); },

  async open(f) {
    set({ selected: f, pickedSlotId: undefined, slotsLoading: true });
    const slots = await FacilityRepos.facilities().slots(f.id, get().dateISO);
    set({ slots, slotsLoading: false });
  },

  close() { set({ selected: undefined, pickedSlotId: undefined }); },

  async setDate(dateISO) {
    set({ dateISO, slotsLoading: true, pickedSlotId: undefined });
    const current = get().selected;
    const slots = current ? await FacilityRepos.facilities().slots(current.id, dateISO) : [];
    set({ slots, slotsLoading: false });
  },

  pickSlot(id) { set({ pickedSlotId: id }); },

  async confirm() {
    const { selected, dateISO, pickedSlotId } = get();
    if (!selected || !pickedSlotId) return;
    console.log('BOOK =>', selected.id, dateISO, pickedSlotId);
    set({ selected: undefined, pickedSlotId: undefined });
  },
});
