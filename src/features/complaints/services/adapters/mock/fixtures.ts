import { Complaint } from '../types';
export const mockComplaints: Complaint[] = [
  {
    id: 'c1',
    title: 'Plumbing Issue',
    description: 'Leaking faucet in the bathroom, constant dripping...',
    status: 'in_progress',
    createdAtISO: '2023-12-12',
  },
  {
    id: 'c2',
    title: 'Noise Complaint',
    description: 'Loud music from upstairs unit late at night...',
    status: 'new',
    createdAtISO: '2023-12-11',
  },
  {
    id: 'c3',
    title: 'Broken Light Fixture',
    description: 'Hallway light outside my unit is flickering.',
    status: 'resolved',
    createdAtISO: '2023-12-05',
  },
  {
    id: 'c4',
    title: 'Parking Spot Dispute',
    description: 'Another vehicle is parked in my assigned spot.',
    status: 'on_hold',
    createdAtISO: '2023-12-02',
  },
];
