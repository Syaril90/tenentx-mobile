export type PaymentStatus = 'paid' | 'pending' | 'refunded';
export type PaymentType = 'maintenance' | 'utility' | 'amenity' | 'assessment';

export type Payment = {
  id: string;
  title: string;
  dateISO: string;
  amountMinor: number;            // minor units (e.g., cents)
  currency: 'PHP' | 'MYR' | 'USD';
  status: PaymentStatus;
  type: PaymentType;              // <-- make sure this exists
  refundNote?: string;
  cta?: 'receipt' | 'view' | 'pay';
};
