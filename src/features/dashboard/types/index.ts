export type User = {
  id: string;
  name: string;
  avatarUrl?: string;
  role: 'tenant' | 'owner' | 'admin';
};

export type Unit = {
  id: string;
  label: string;          // "Unit 789, Azure Tower, 456 Ocean Drive"
  heroImageUrl?: string;
};

export type BalanceSummary = {
  unitId: string;
  outstandingAmountCents: number;
  nextDueLabel?: string;  // "(Oct 1)"
};

export type Announcement = {
  id: string;
  title: string;
  body: string;
  publishedAtISO: string; // ISO timestamp
};

export type TicketSummary = { openCount: number };

export type InvoiceSummary = {
  nextDueAmountCents: number;
  nextDueLabel: string;
};

export type AnnItem = {
  id: string;
  title: string;
  summary: string;      // short body/excerpt
  dateISO: string;      // e.g. "2024-09-20"
  imageUrl?: string;    // optional banner for carousel
  pinned?: boolean;
};
