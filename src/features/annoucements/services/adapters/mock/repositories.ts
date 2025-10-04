import { AnnouncementsRepository } from '../../repositories';
import { delay, mockAnnouncements } from './fixtures';

export class MockAnnouncementsRepository implements AnnouncementsRepository {
  async list() {
    await delay();
    // newest first; pinned kept as-is (we’ll split in UI)
    return [...mockAnnouncements].sort((a, b) =>
      a.createdAtISO < b.createdAtISO ? 1 : -1
    );
  }
}
