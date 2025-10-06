import { NotificationsRepository } from '../../repositories';
import { delay, mockNotifications } from '../mock/fixtures';

let mem = [...mockNotifications];

export class MockNotificationsRepository implements NotificationsRepository {
  async list() {
    await delay();
    // newest first
    return [...mem].sort((a, b) => (a.createdAtISO < b.createdAtISO ? 1 : -1));
  }

  async markAllRead() {
    await delay(150);
    mem = mem.map((n) => ({ ...n, read: true }));
  }

  async markRead(id: string) {
    await delay(100);
    mem = mem.map((n) => (n.id === id ? { ...n, read: true } : n));
  }
}
