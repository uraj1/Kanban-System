import { Ticket, GroupedData, User, OrderingOption } from '../types';

export const getPriorityLabel = (priority: number): string => {
  const labels = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No priority'
  };
  return labels[priority as keyof typeof labels] || 'No priority';
};

export const groupTickets = (
  tickets: Ticket[],
  groupBy: string,
  users: User[]
): GroupedData => {
  return tickets.reduce((groups: GroupedData, ticket: Ticket) => {
    let key = '';
    
    switch (groupBy) {
      case 'status':
        key = ticket.status;
        break;
      case 'user':
        const user = users.find(u => u.id === ticket.userId);
        key = user ? user.name : 'Unassigned';
        break;
      case 'priority':
        key = getPriorityLabel(ticket.priority);
        break;
      default:
        key = 'Other';
    }

    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(ticket);
    return groups;
  }, {});
};

export const sortTickets = (tickets: Ticket[], orderBy: OrderingOption): Ticket[] => {
  return [...tickets].sort((a, b) => {
    if (orderBy === 'priority') {
      return b.priority - a.priority;
    }
    return a.title.localeCompare(b.title);
  });
};