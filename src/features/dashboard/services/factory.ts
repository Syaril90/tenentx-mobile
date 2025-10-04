import { MockDashboardRepository } from './adapters/mock/repositories';
import type { DashboardRepository } from './repositories';

class _DashboardRepos {
  private _repo: DashboardRepository | null = null;
  dashboard(): DashboardRepository {
    if (!this._repo) this._repo = new MockDashboardRepository();
    return this._repo;
  }
}
export const DashboardRepos = new _DashboardRepos();
