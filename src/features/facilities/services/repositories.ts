import type { Facility, FacilitySlot } from '../types';

export interface FacilitiesRepository {
  list(): Promise<Facility[]>;
  slots(facilityId: string, dateISO: string): Promise<FacilitySlot[]>;
  book(facilityId: string, slotId: string): Promise<void>;
}