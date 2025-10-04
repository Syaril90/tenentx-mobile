import type { ComplaintsRepository } from '../../repositories';
import { mockComplaints } from './fixtures';

const delay = (ms = 250) => new Promise<void>((r) => setTimeout(r, ms));

export class MockComplaintsRepository implements ComplaintsRepository {
  async list() {
    await delay();
    return mockComplaints;
  }
}
