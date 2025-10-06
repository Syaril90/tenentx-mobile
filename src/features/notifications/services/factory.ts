// ⛔️ Do NOT replace file. Just add these lines to your existing factory.
import { MockNotificationsRepository } from '../services/adapters/mock/repositories';
import { NotificationsRepository } from '../services/repositories';

export const NotifRepos = {
  notifs: (): NotificationsRepository => new MockNotificationsRepository(),
} as const;
