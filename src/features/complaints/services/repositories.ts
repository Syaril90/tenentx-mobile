import type { Complaint, CreateComplaintInput } from '../types';

export interface ComplaintsRepository {
  list(): Promise<Complaint[]>;
  create(input: CreateComplaintInput): Promise<Complaint>;
}
