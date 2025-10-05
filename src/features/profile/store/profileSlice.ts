import type { StateCreator } from 'zustand';
import { ProfileRepos } from '../services/factory';
import type { Preferences, ProfileAggregate, UnitRef, User } from '../types';

export type ProfileState = {
  profileMe?: User;
  profileUnits: UnitRef[];
  profilePrefs?: Preferences;

  profileLoading: boolean;
  profileError?: string;
};

export type ProfileActions = {
  loadProfile(): Promise<void>;
  updateProfileMe(patch: Partial<Pick<User, 'name' | 'email' | 'phone' | 'avatarUrl'>>): Promise<void>;
  togglePushPref(): Promise<void>;
  toggleEmailPref(): Promise<void>;
  setLanguagePref(lang: string): Promise<void>;
  logoutProfile(): Promise<void>;
};

export type ProfileSlice = ProfileState & ProfileActions;

// devtools typing matches your other slice pattern
export const createProfileSlice: StateCreator<
  ProfileSlice,
  [['zustand/devtools', never]],
  [],
  ProfileSlice
> = (set, get) => ({
  profileMe: undefined,
  profileUnits: [],
  profilePrefs: undefined,

  profileLoading: false,
  profileError: undefined,

  async loadProfile() {
    set({ profileLoading: true, profileError: undefined });
    try {
      const repo = ProfileRepos.profile();
      const data: ProfileAggregate = await repo.get();
      set({
        profileMe: data.me,
        profileUnits: data.units,
        profilePrefs: data.preferences,
        profileLoading: false,
      });
    } catch (e) {
      set({ profileError: 'Failed to load profile', profileLoading: false });
    }
  },

  async updateProfileMe(patch) {
    try {
      const repo = ProfileRepos.profile();
      const updated = await repo.updateMe(patch);
      set({ profileMe: updated });
    } catch {
      // keep existing; optionally set error
    }
  },

  async togglePushPref() {
    const current = get().profilePrefs;
    if (!current) return;
    try {
      const repo = ProfileRepos.profile();
      const prefs = await repo.setPreferences({ push: !current.push });
      set({ profilePrefs: prefs });
    } catch {
      // ignore in mock
    }
  },

  async toggleEmailPref() {
    const current = get().profilePrefs;
    if (!current) return;
    try {
      const repo = ProfileRepos.profile();
      const prefs = await repo.setPreferences({ email: !current.email });
      set({ profilePrefs: prefs });
    } catch {
      // ignore in mock
    }
  },

  async setLanguagePref(lang: string) {
    const current = get().profilePrefs;
    if (!current) return;
    try {
      const repo = ProfileRepos.profile();
      const prefs = await repo.setPreferences({ language: lang });
      set({ profilePrefs: prefs });
    } catch {
      // ignore in mock
    }
  },

  async logoutProfile() {
    try {
      const repo = ProfileRepos.profile();
      await repo.logout();
    } finally {
      set({
        profileMe: undefined,
        profileUnits: [],
        profilePrefs: undefined,
      });
    }
  },
});
