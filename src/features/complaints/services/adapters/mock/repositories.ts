import type { Complaint, CreateComplaintInput } from '../../../types';
import type { ComplaintsRepository } from '../../repositories';
import { delay, mockComplaints } from './fixtures';

export class MockComplaintsRepository implements ComplaintsRepository {
  async list(): Promise<Complaint[]> {
    await delay();
    return [...mockComplaints].sort((a, b) =>
      a.createdAtISO < b.createdAtISO ? 1 : -1
    );
  }

  async create(input: CreateComplaintInput): Promise<Complaint> {
    await delay(400);
    const now = new Date().toISOString();
    const created: Complaint = {
      id: `c_${Date.now()}`,
      title: input.title,
      description: input.description,
      createdAtISO: now,
      status: 'new',
      category: input.category,
      location: input.location,
      locationNote: input.locationNote,
      attachments: input.attachments ?? [],
      preferredResolution: input.preferredResolution,
      preferredAtISO: input.preferredAtISO ?? null,
    };
    // keep the in-memory list up-to-date for subsequent list() calls
    mockComplaints.unshift(created);
    return created;
  }
}
