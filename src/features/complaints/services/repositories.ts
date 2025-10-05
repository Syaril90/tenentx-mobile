import type { ChatMessage, Complaint, CreateComplaintInput } from '../types';

export interface ComplaintsRepository {
  list(): Promise<Complaint[]>;
  create(input: CreateComplaintInput): Promise<Complaint>;
}

export interface ChatsRepository {
  listByComplaint(complaintId: string): Promise<ChatMessage[]>;
  send(complaintId: string, text: string, attachments?: string[]): Promise<ChatMessage>;
}
