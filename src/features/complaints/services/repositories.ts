import type { Complaint } from '../types';

export interface ComplaintsRepository {
  list(): Promise<Complaint[]>;
}
