// src/features/announcements/services/adapters/mock/fixtures.ts
import { Announcement } from '../../../types';

export const mockAnnouncements: Announcement[] = [
  {
    id: 'a1',
    title: 'Urgent: Water Shutdown - Block B',
    body: [
      'Dear Residents,',
      'Please be advised that water supply to Block B will be temporarily interrupted due to a scheduled valve replacement by our maintenance contractor.',
      'Date: Friday, October 27, 2023',
      'Time: 9:00 AM – 3:00 PM',
      'During this period, please store enough water for essential use (drinking, cooking, and sanitation). The maintenance team will attempt to restore service earlier if work completes ahead of schedule.',
      'We apologize for the inconvenience and appreciate your understanding.',
      'Building Management',
    ].join('\n\n'),
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
    body: [
      'Hello Residents,',
      'A reminder that our Annual General Meeting (AGM) will be held next week. We will review the previous year’s financials, discuss the proposed budget, and vote on key initiatives for 2024.',
      'Date: Thursday, November 2, 2023',
      'Time: 7:00 PM – 9:00 PM',
      'Venue: Function Room, Ground Floor',
      'The agenda and supporting documents have been shared via email. Light refreshments will be provided. Your participation is important—please attend and make your voice heard.',
      'Thank you,\nManagement Committee',
    ].join('\n\n'),
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
    body: [
      'Dear Residents,',
      'The gym will undergo essential renovations to upgrade flooring and replace select equipment. The facility will be closed during the renovation window.',
      'Closure Dates: November 1 – November 15, 2023',
      'Upgrades include: new free-weight area, improved ventilation, and additional stretch zone. Access to the outdoor fitness corner remains available.',
      'We appreciate your patience as we enhance the amenities for everyone.',
      'Regards,\nFacilities Team',
    ].join('\n\n'),
    category: 'maintenance',
    createdAtISO: '2023-10-26T10:00:00Z',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCjrFSbiAMiNreXXacfgWMUoghW41S4kNtIw5z8ybijWlglODiqpDlNSJl8FMXCq9Q4S9uhASgHzGy89PjeHm5sMXmAqv0rGSdmhLT7dn8Q4-OwIVxR9rfXhz34ZW20u8AK7AXVVYeJ0GIzfUMIe0f8-zpHejfTzG3hnwGQzavZoYFPpXT_iZnwq_BVWznpz04I9BazM_80lu0Y8MXeXACJ2CIDGWXCXhtUw2L-XAZhBCOzLfMmFC8m6u5yIHy-xQaG_sDw4AZR4O62',
    read: false,
  },
  {
    id: 'a4',
    title: 'Community BBQ Invitation',
    body: [
      'Hi Neighbors!',
      'Join us this Saturday for a community BBQ—food, games, and good company. Families and friends welcome!',
      'Date: Saturday, October 28, 2023',
      'Time: 4:00 PM – 7:00 PM',
      'Location: Poolside Deck',
      'Bring your picnic blankets; we’ll handle the grills and beverages. See you there!',
      '— Social Committee',
    ].join('\n\n'),
    category: 'events',
    createdAtISO: '2023-10-25T15:30:00Z',
    read: true,
  },
  {
    id: 'a5',
    title: 'Parking Policy Change',
    body: [
      'Attention All Residents,',
      'Please note an update to our visitor parking policy effective November 1, 2023. All visitor vehicles must be registered at the front desk upon entry and display a temporary permit on the dashboard.',
      'Visitors are limited to 4 hours between 8:00 AM and 10:00 PM. Overnight parking requires prior approval from management.',
      'These measures aim to ensure fair access and safety within the car park. Thank you for your cooperation.',
      'Management Office',
    ].join('\n\n'),
    category: 'notices',
    createdAtISO: '2023-10-24T09:00:00Z',
    read: true,
  },
];

export const delay = (ms = 250) => new Promise<void>((r) => setTimeout(r, ms));
