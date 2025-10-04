import type { DashboardRepository } from '../../repositories';
import {
  mockAnnouncements,
  mockBalance,
  mockMe,
  mockNextDue,
  mockTickets,
  mockUnit,
} from './fixtures';

const delay = (ms = 250) => new Promise<void>((r) => setTimeout(r, ms));

export class MockDashboardRepository implements DashboardRepository {
  async load() {
    await delay();
    return {
      me: mockMe,
      unit: mockUnit,
      balance: mockBalance,
      announcements: mockAnnouncements,   
      tickets: mockTickets,
      nextDue: mockNextDue,
    };
  }
}
