import type { AnnItem } from '../../../types';

export const mockMe = {
  id: 'u_1',
  name: 'Alex',
  avatarUrl:
    'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200&h=200&fit=crop',
};

export const mockUnit = {
  id: 'unit_789',
  unitNo: 'Unit 789',
  building: 'Azure Tower',
  address: '456 Ocean Drive',
  imageUrl:
    'https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1200&h=800&fit=crop',
};

export const mockBalance = {
  amountCents: 25_000,
  currency: 'USD' as const,
};

export const mockAnnouncements: AnnItem[] = [
  {
    id: 'a1',
    title: 'Water Supply Interruption',
    summary:
      'Scheduled maintenance on the main water line. Please store water for your needs.',
    dateISO: '2024-09-20',
    imageUrl:
      'https://images.unsplash.com/photo-1502303756786-c2a8f4f13d53?w=1200&h=800&fit=crop',
    pinned: true,
  },
  {
    id: 'a2',
    title: 'Annual General Meeting',
    summary:
      'Join us for the annual meeting to discuss the budget and future plans.',
    dateISO: '2024-09-15',
    imageUrl:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop',
  },
];

export const mockTickets = { openCount: 2 };
export const mockNextDue = { nextDueAmountCents: 25_000, nextDueLabel: '(Oct 1)' };
