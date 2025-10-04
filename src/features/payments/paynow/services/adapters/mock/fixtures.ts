import { Invoice } from '../../../types';

export const mockOutstanding: Invoice[] = [
  {
    id: 'p4', // matches Payment History "Special Assessment"
    title: 'Special Assessment',
    dueDateISO: '2024-01-05',
    total: { currency: 'MYR', minor: 1_000_000 }, // RM 10,000.00
    status: 'pending',
  },
  {
    id: 'inv_1',
    title: 'Monthly Maintenance Fee - Jan 2024',
    dueDateISO: '2024-01-31',
    total: { currency: 'MYR', minor: 23_000 }, // RM 230.00
    prechecked: true,
    status: 'overdue',
    items: [
      { id: 'i1', label: 'Service Charge', amount: { currency: 'MYR', minor: 15_000 } },
      { id: 'i2', label: 'Sinking Fund',  amount: { currency: 'MYR', minor:  5_000 } },
      { id: 'i3', label: 'Water Bill',    amount: { currency: 'MYR', minor:  3_000 } },
    ],
  },
  {
    id: 'inv_3',
    title: 'Renovation Deposit',
    dueDateISO: '2024-02-10',
    total: { currency: 'MYR', minor: 50_000 }, // RM 500.00
    prechecked: true,
    status: 'unpaid',
  },
];
