import { Payment } from '../../../types';

export const mockPayments: Payment[] = [
  {
    id: 'p1',
    title: 'Monthly Maintenance Fee - March 2024',
    dateISO: '2024-03-25',
    amountMinor: 500000, // PHP 5,000.00
    currency: 'PHP',
    status: 'paid',
    type: 'maintenance',
    cta: 'receipt',
  },
  {
    id: 'p2',
    title: 'Utility Bill - February 2024',
    dateISO: '2024-02-10',
    amountMinor: 120000, // PHP 1,200.00
    currency: 'PHP',
    status: 'paid',
    type: 'utility',
    cta: 'receipt',
  },
  {
    id: 'p3',
    title: 'Amenity Booking - Gym',
    dateISO: '2024-01-15',
    amountMinor: 50000, // PHP 500.00
    currency: 'PHP',
    status: 'refunded',
    type: 'amenity',
    refundNote: '(PHP 500.00)',
    cta: 'view',
  },
  {
    id: 'p4',
    title: 'Special Assessment',
    dateISO: '2024-01-05',
    amountMinor: 1_000_000, // PHP 10,000.00
    currency: 'PHP',
    status: 'pending',
    type: 'assessment',
    cta: 'pay',
  },
];

export const delay = (ms = 350) => new Promise<void>((r) => setTimeout(r, ms));
