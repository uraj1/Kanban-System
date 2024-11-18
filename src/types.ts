export interface Ticket {
  id: string;
  title: string;
  tag: string[];
  userId: string;
  status: string;
  priority: number;
}

export interface User {
  id: string;
  name: string;
  available: boolean;
}

export interface KanbanData {
  tickets: Ticket[];
  users: User[];
}

export interface GroupedData {
  [key: string]: Ticket[];
}

export type GroupingOption = 'status' | 'user' | 'priority';
export type OrderingOption = 'priority' | 'title';

export interface DisplayState {
  grouping: GroupingOption;
  ordering: OrderingOption;
}