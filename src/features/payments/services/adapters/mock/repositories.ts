import { Payment } from '../../../types';
import { PaymentsRepository } from '../../repositories';
import { delay, mockPayments } from './fixtures';

export class MockPaymentsRepository implements PaymentsRepository {
  async listHistory(): Promise<Payment[]> {
    await delay();
    // newest first
    return [...mockPayments].sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));
  }
}
