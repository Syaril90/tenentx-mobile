import type { AnnItem } from '../types';

export interface DashboardRepository {
  load(): Promise<{
    me: { id: string; name: string; avatarUrl?: string };
    unit: unknown;
    balance: { amountCents: number; currency: 'USD' | 'MYR' | 'PHP' };
    announcements: AnnItem[];        
    tickets: { openCount: number };
    nextDue: { nextDueAmountCents: number; nextDueLabel: string };
  }>;
}
