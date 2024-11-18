import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { DisplayState } from '../types';

interface DisplayMenuProps {
  displayState: DisplayState;
  onDisplayChange: (newState: DisplayState) => void;
}

export const DisplayMenu: React.FC<DisplayMenuProps> = ({
  displayState,
  onDisplayChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="display-menu">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="display-button"
      >
        <Settings size={16} />
        <span>Display</span>
      </button>

      {isOpen && (
        <div className="display-dropdown">
          <div className="dropdown-group">
            <label className="dropdown-label">Grouping</label>
            <select
              value={displayState.grouping}
              onChange={(e) =>
                onDisplayChange({
                  ...displayState,
                  grouping: e.target.value as DisplayState['grouping'],
                })
              }
              className="dropdown-select"
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          <div className="dropdown-group">
            <label className="dropdown-label">Ordering</label>
            <select
              value={displayState.ordering}
              onChange={(e) =>
                onDisplayChange({
                  ...displayState,
                  ordering: e.target.value as DisplayState['ordering'],
                })
              }
              className="dropdown-select"
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};