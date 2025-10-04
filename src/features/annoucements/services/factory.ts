import { MockAnnouncementsRepository } from './adapters/mock/repositories';
import { AnnouncementsRepository } from './repositories';

export const AnnRepos = {
  anns: (): AnnouncementsRepository => new MockAnnouncementsRepository(),
} as const;
