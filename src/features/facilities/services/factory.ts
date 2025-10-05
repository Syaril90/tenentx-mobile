// existing imports...
import { MockFacilitiesRepository } from '../services/adapters/mock/repositories';
import type { FacilitiesRepository } from '../services/repositories';

export const FacilityRepos = {
  facilities: (): FacilitiesRepository => new MockFacilitiesRepository(),
} as const;
