import { Announcement } from '../../../types';

export const mockAnnouncements: Announcement[] = [
  {
    id: 'a1',
    title: 'Urgent: Water Shutdown - Block B',
    body: 'Water supply will be interrupted due to valve replacement.',
    category: 'maintenance',
    createdAtISO: '2023-10-26T10:00:00Z',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCB-0YcHCRp8VljnvRBJbkITVPKLNI2z5T_FtCs2ALBufwIUY8TvQnhI2A4HExEdDGyLFkOo2ZokO1jfGmuIv6OxC7J7WZfj3vzaGeqbDbmMT7ACcee9X9_5QK45OgshlZHtjdQvbuBW7Zs92zqnfcJb3WXeXFgIdge8fMYXg5o0gGfxVMKT31wuz2MG4uwaciEDrGV1MqlOO_Ucf5oAZ5kMADCQcITExlsbShYd0S4jvlDncGmRzKcV0-IlBg6txVxksYz030SGZ9C',
    pinned: true,
    read: false,
  },
  {
    id: 'a2',
    title: 'Annual General Meeting Reminder',
    body: 'Don’t forget our AGM next week. See agenda attached.',
    category: 'events',
    createdAtISO: '2023-10-25T08:00:00Z',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB0wZjyQgqgssQwdCJp_Kl7PtPIZxKdqZPY8-CJOrUZcl3aEK4FFRhJNuQzm38VZCvs-JEdxu22lZ4bagUBSQKHg4ln1jK-Cm0MIurUyYn3567K_8c58qklZlwJ88u8_HZcjOIEKKnsG-zWEDW09d1f2xWzYIlfTc_8czwV42WnKc_HcRh5Ck5xZz4kGguAwLz29ymPZf0BTv-Jr4zf8w8dUK0Bq-HzAiIjLf-Ww2TlAclU14m5Ilc0OFWjyqNacY3_PFtt35qGjZRb',
    pinned: true,
    read: true,
  },
  {
    id: 'a3',
    title: 'Gym Renovation Update',
    body: 'Gym closed Nov 1–15. We apologize for the inconvenience.',
    category: 'maintenance',
    createdAtISO: '2023-10-26T10:00:00Z',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCjrFSbiAMiNreXXacfgWMUoghW41S4kNtIw5z8ybijWlglODiqpDlNSJl8FMXCq9Q4S9uhASgHzGy89PjeHm5sMXmAqv0rGSdmhLT7dn8Q4-OwIVxR9rfXhz34ZW20u8AK7AXVVYeJ0GIzfUMIe0f8-zpHejfTzG3hnwGQzavZoYFPpXT_iZnwq_BVWznpz04I9BazM_80lu0Y8MXeXACJ2CIDGWXCXhtUw2L-XAZhBCOzLfMmFC8m6u5yIHy-xQaG_sDw4AZR4O62',
    read: false,
  },
  {
    id: 'a4',
    title: 'Community BBQ Invitation',
    body: 'Join us for food, games, and fun this Saturday!',
    category: 'events',
    createdAtISO: '2023-10-25T15:30:00Z',
    read: true,
  },
  {
    id: 'a5',
    title: 'Parking Policy Change',
    body: 'Visitor parking policy updated from Nov 1. Register at front desk.',
    category: 'notices',
    createdAtISO: '2023-10-24T09:00:00Z',
    read: true,
  },
];

export const delay = (ms = 250) => new Promise<void>((r) => setTimeout(r, ms));
