import React from "react";
import { Ticket, User } from "../types";
import { MoreHorizontal, Circle, Clock, XCircle } from "lucide-react";
import {
  DoneIcon,
  HighPriorityIcon,
  MediumPriorityIcon,
  LowPriorityIcon,
  UrgentPriorityIcon,
  BacklogIcon,
} from "./Icons";

interface KanbanColumnProps {
  title: string;
  tickets: Ticket[];
  count: number;
  users: User[];
}

const getPriorityIcon = (priority: number) => {
  switch (priority) {
    case 4:
      return <UrgentPriorityIcon />;
    case 3:
      return <HighPriorityIcon />;
    case 2:
      return <MediumPriorityIcon />;
    case 1:
      return <LowPriorityIcon />;
    default:
      return null;
  }
};

const getStatusIcon = (status: string) => {
  const baseClass = "status-icon";
  switch (status.toLowerCase()) {
    case "todo":
      return <Circle className={`${baseClass} status-todo`} />;
    case "in progress":
      return <Clock className={`${baseClass} status-progress`} />;
    case "done":
      return <DoneIcon />;
    case "backlog":
      return <BacklogIcon />;
    case "canceled": 
      return <XCircle className={`${baseClass} status-canceled`} />;
    default:
      return <Circle className={`${baseClass} status-todo`} />;
  }
};

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  tickets,
  count,
  users,
}) => {
  return (
    <div className="column">
      <div className="column-header">
        <div className="column-title">
          {title.toLowerCase().includes("priority") &&
            getPriorityIcon(tickets[0]?.priority)}
          {getStatusIcon(title)}
          <span className="column-title-text">{title}</span>
          <span className="column-count">{count}</span>
        </div>
        <div className="column-actions">
          <button className="action-button">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      <div className="tickets-container">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="ticket">
            <div className="ticket-header">
              <span className="ticket-id">{ticket.id}</span>
              <div className="user-avatar">
                {users.find((u) => u.id === ticket.userId)?.available && (
                  <div className="user-status" />
                )}
              </div>
            </div>
            <div className="ticket-content">
              {getPriorityIcon(ticket.priority)}
              <h3 className="ticket-title">{ticket.title}</h3>
            </div>
            <div className="ticket-tags">
              {ticket.tag.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
