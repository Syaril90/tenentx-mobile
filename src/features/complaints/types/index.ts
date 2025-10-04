export type ComplaintStatus = 'new' | 'in_progress' | 'on_hold' | 'resolved';

export type Complaint = {
  id: string;
  title: string;
  description: string;
  status: ComplaintStatus;
  createdAtISO: string; // e.g. "2024-01-15"
};

export type ComplaintFilters = {
  q: string;                  // search query
  status: 'all' | ComplaintStatus;
  sortByDate: 'desc' | 'asc'; // "By Date" chip
};
