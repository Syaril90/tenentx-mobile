import type { Facility, FacilitySlot } from '../../../types';
import { FacilitiesRepository } from '../../repositories';
import { delay, mockFacilities, mockSlots } from '../mock/fixtures';

export class MockFacilitiesRepository implements FacilitiesRepository {
  async list(): Promise<Facility[]> {
    await delay();
    return mockFacilities;
  }

  async slots(_facilityId: string, dateISO: string): Promise<FacilitySlot[]> {
    await delay();
    return mockSlots(dateISO);
  }

  async book(_facilityId: string, _slotId: string): Promise<void> {
    await delay(300);
    // no-op (mock). You could console.log here if you want to see it in dev.
  }
}
