import { PayNowRepository } from '../../repositories';
import { mockOutstanding } from './fixtures';

const delay = (ms = 250) => new Promise<void>((r) => setTimeout(r, ms));

export class MockPayNowRepository implements PayNowRepository {
  async listOutstanding() {
    await delay();
    return mockOutstanding;
  }
}
