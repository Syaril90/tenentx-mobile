export type ComplaintStatus = 'new' | 'in_progress' | 'on_hold' | 'resolved';

export type Complaint = {
  id: string;
  title: string;
  description: string;      // full body
  createdAtISO: string;
  status: ComplaintStatus;
  category?: 'facility' | 'security' | 'noise' | 'cleanliness' | 'other';
  location?: 'my_unit' | 'common_area';
  locationNote?: string;    // e.g., "Gym"
  attachments?: string[];   // URIs
  preferredResolution?: 'anytime' | 'morning' | 'afternoon' | 'specific';
  preferredAtISO?: string | null;
};

export type CreateComplaintInput = {
  title: string;
  description: string;
  category: NonNullable<Complaint['category']>;
  location: NonNullable<Complaint['location']>;
  locationNote?: string;
  attachments?: string[];
  preferredResolution: NonNullable<Complaint['preferredResolution']>;
  preferredAtISO?: string | null;
};
