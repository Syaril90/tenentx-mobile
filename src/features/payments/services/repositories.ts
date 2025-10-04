import { Payment } from '../types';

export interface PaymentsRepository {
  listHistory(): Promise<Payment[]>;
}
