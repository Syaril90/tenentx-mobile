import { Notification } from '../../../types';

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'Upcoming Fire Drill on Oct 26th',
    subtitle: 'Announcement',
    category: 'announcements',
    read: false,
    createdAtISO: new Date(Date.now() - 20 * 60 * 1000).toISOString(), // 20m ago
  },
  {
    id: 'n2',
    title: 'Your monthly common fees are due',
    subtitle: 'Payment Reminder',
    category: 'payments',
    read: false,
    createdAtISO: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1h ago
  },
  {
    id: 'n3',
    title: "Complaint 'Leaky Faucet' reviewed",
    subtitle: 'Complaint Status',
    category: 'complaints',
    read: true,
    createdAtISO: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // yesterday
  },
  {
    id: 'n4',
    title: "Visitor 'John Doe' approved for Unit 123",
    subtitle: 'Visitor Approval',
    category: 'visitors',
    read: true,
    createdAtISO: '2024-10-23T10:00:00Z',
  },
];

export const delay = (ms = 250) => new Promise<void>((r) => setTimeout(r, ms));
