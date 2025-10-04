import { MockPaymentsRepository } from './adapters/mock/repositories';
import { PaymentsRepository } from './repositories';

export const PaymentsRepos = {
  payments: (): PaymentsRepository => new MockPaymentsRepository(),
} as const;
