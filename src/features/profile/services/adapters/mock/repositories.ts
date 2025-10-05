import type { Preferences, ProfileAggregate, User } from '../../../types';
import type { ProfileRepository } from '../../repositories';
import { delay, mergePreferences, mockProfile } from './fixtures';

let db: ProfileAggregate = JSON.parse(JSON.stringify(mockProfile));

export class MockProfileRepository implements ProfileRepository {
  async get(): Promise<ProfileAggregate> {
    await delay();
    return JSON.parse(JSON.stringify(db));
  }

  async updateMe(
    patch: Partial<Pick<User, 'name' | 'email' | 'phone' | 'avatarUrl'>>
  ): Promise<User> {
    await delay();
    db.me = { ...db.me, ...patch };
    return JSON.parse(JSON.stringify(db.me));
  }

  async setPreferences(patch: Partial<Preferences>): Promise<Preferences> {
    await delay();
    db.preferences = mergePreferences(db.preferences, patch);
    return JSON.parse(JSON.stringify(db.preferences));
  }

  async logout(): Promise<void> {
    await delay();
    // simple mock: clear to defaults
    db = JSON.parse(JSON.stringify(mockProfile));
  }
}
