import type { Complaint } from '../../../types';

export const mockComplaints: Complaint[] = [
  {
    id: 'c1',
    title: 'Plumbing Issue',
    description: 'Leaking faucet in the bathroom, constant dripping...',
    createdAtISO: '2023-12-12T10:12:00Z',
    status: 'in_progress',
    category: 'facility',
    location: 'my_unit',
  },
  {
    id: 'c2',
    title: 'Noise Complaint',
    description: 'Loud music from upstairs unit late at night...',
    createdAtISO: '2023-12-11T22:42:00Z',
    status: 'new',
    category: 'noise',
    location: 'common_area',
    locationNote: 'Lobby',
  },
  {
    id: 'c3',
    title: 'Broken Light Fixture',
    description: 'Hallway light outside my unit is flickering.',
    createdAtISO: '2023-12-05T08:30:00Z',
    status: 'resolved',
    category: 'facility',
    location: 'common_area',
    locationNote: 'Level 12 corridor',
  },
  {
    id: 'c4',
    title: 'Parking Spot Dispute',
    description: 'Another vehicle is parked in my assigned spot.',
    createdAtISO: '2023-12-02T15:05:00Z',
    status: 'on_hold',
    category: 'other',
    location: 'common_area',
    locationNote: 'Basement B2',
  },
];

export const delay = (ms = 250) => new Promise<void>((r) => setTimeout(r, ms));
