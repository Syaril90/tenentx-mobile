import type { Preferences, ProfileAggregate } from '../../../types';

export const mockProfile: ProfileAggregate = {
  me: {
    id: 'u_1',
    name: 'John Doe',
    role: 'Owner',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDJj2y8NlJGlcMzrQcnfnO5zOTuKM-68TvamRZx8SR-4H-A0_YCswcicGQOh55Oq_V2qrWResEQ2Yh-Co2Hu_wjtLjf3UKKFolEk7gqsvteVkIEhdXVwAarfsW7QNPt98yGij1Pre4E0-ar2d7OCFUu14js49igGH7I1_5U1drjgwQMXbdiSivHrVPOF6VVTdUsXZkyRTYdbOLMx2tDkhNm9ePUZH0HM6YosJBiDC7z7jSzs2hCmTv5IUnh51QxHCchdwvllQO8rhdn',
  },
  units: [
    {
      id: 'unit_1201',
      building: 'Tower A',
      unitNo: 'Unit 1201',
      primary: true,
    },
  ],
  preferences: {
    push: true,
    email: false,
    language: 'English',
  },
};

export const delay = (ms = 250) => new Promise<void>((r) => setTimeout(r, ms));

export function mergePreferences(
  current: Preferences,
  patch: Partial<Preferences>
): Preferences {
  return { ...current, ...patch };
}
