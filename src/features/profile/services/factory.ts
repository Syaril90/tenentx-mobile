import { MockProfileRepository } from './adapters/mock/repositories';
import type { ProfileRepository } from './repositories';

export const ProfileRepos = {
  profile: (): ProfileRepository => new MockProfileRepository(),
} as const;
