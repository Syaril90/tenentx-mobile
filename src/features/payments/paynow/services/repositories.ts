import { Invoice } from '../types';

export interface PayNowRepository {
  listOutstanding(): Promise<Invoice[]>;
}
