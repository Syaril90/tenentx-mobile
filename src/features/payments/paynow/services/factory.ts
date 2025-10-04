import { MockPayNowRepository } from './adapters/mock/repositories';
import type { PayNowRepository } from './repositories';

class PayNowFactory {
  private _repo: PayNowRepository | null = null;
  paynow(): PayNowRepository {
    if (!this._repo) this._repo = new MockPayNowRepository();
    return this._repo;
  }
}

export const PayNowRepos = new PayNowFactory();
