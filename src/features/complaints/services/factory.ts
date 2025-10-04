import { MockComplaintsRepository } from './adapters/mock/repositories';
import type { ComplaintsRepository } from './repositories';

class _ComplaintsRepos {
  private _repo: ComplaintsRepository | null = null;
  complaints(): ComplaintsRepository {
    if (!this._repo) this._repo = new MockComplaintsRepository();
    return this._repo;
  }
}
export const ComplaintsRepos = new _ComplaintsRepos();
