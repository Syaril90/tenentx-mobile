export type NotifCategory = 'announcements' | 'payments' | 'complaints' | 'visitors';

export type Notification = {
  id: string;
  title: string;
  subtitle: string;
  category: NotifCategory;
  read: boolean;
  createdAtISO: string; // ISO string
};

// Chips mirror your HTML: All, Unread, Announcements, Payments, Complaints, Visitors
export type NotifFilter =
  | 'all'
  | 'unread'
  | NotifCategory;
