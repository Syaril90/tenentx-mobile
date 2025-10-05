export type FacilityCategory = 'sports' | 'social' | 'workspace';

export type Facility = {
  id: string;
  name: string;
  category: FacilityCategory;
  imageUrl: string;
  rules?: string[];
  capacityLabel?: string;
  feeLabel?: string;
};

export type FacilitySlot = {
  id: string;        // e.g. "2024-05-03T09:00/10:00"
  dateISO: string;   // "2024-05-03"
  label: string;     // "09:00 - 10:00"
  disabled?: boolean;
};
