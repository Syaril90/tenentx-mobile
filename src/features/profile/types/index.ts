export type UserRole = 'Owner' | 'Tenant' | 'Admin';

export type User = {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone: string;
  avatarUrl?: string;
};

export type UnitRef = {
  id: string;
  tower?: string;
  block?: string;
  building?: string;
  unitNo?: string;
  label?: string;
  primary?: boolean;
};

export type Preferences = {
  push: boolean;
  email: boolean;
  language: string; // e.g., "English"
};

export type ProfileAggregate = {
  me: User;
  units: UnitRef[];
  preferences: Preferences;
};
