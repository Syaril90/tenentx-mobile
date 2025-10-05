import type { Preferences, ProfileAggregate, User } from '../types';

export interface ProfileRepository {
  get(): Promise<ProfileAggregate>;
  updateMe(patch: Partial<Pick<User, 'name' | 'email' | 'phone' | 'avatarUrl'>>): Promise<User>;
  setPreferences(patch: Partial<Preferences>): Promise<Preferences>;
  logout(): Promise<void>;
}
