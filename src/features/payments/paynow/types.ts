export type Money = {
  currency: 'MYR' | 'PHP' | 'USD';
  minor: number; // sen/cents
};

export type InvoiceItem = {
  id: string;
  label: string;
  amount: Money;
};

export type InvoiceStatus = 'pending' | 'overdue' | 'unpaid' | 'paid' | 'refunded';

export type Invoice = {
  id: string;
  title: string;          // e.g., Monthly Maintenance Fee - Jan 2024
  dueDateISO: string;     // e.g., 2024-01-31
  total: Money;           // total due
  items?: InvoiceItem[];  // breakdown (optional)
  prechecked?: boolean;   // default checked
  status: InvoiceStatus;  // ← REQUIRED for PayNow outstanding filter
};

export type PaymentMethodId = 'fpx' | 'card' | 'ewallet';

export type PayNowSettings = {
  saveMethod: boolean;
  autoDebit: boolean;
  reminders: boolean;
};
