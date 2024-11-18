import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DisplayMenu } from './components/DisplayMenu';
import { KanbanColumn } from './components/KanbanColumn';
import { KanbanData, DisplayState, GroupedData } from './types';
import { groupTickets, sortTickets } from './utils/dataTransform';
import { loadDisplayState, saveDisplayState } from './utils/localStorage';

function App() {
  const [data, setData] = useState<KanbanData | null>(null);
  const [displayState, setDisplayState] = useState<DisplayState>(loadDisplayState());
  const [groupedTickets, setGroupedTickets] = useState<GroupedData>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.quicksell.co/v1/internal/frontend-assignment'
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const grouped = groupTickets(data.tickets, displayState.grouping, data.users);
      Object.keys(grouped).forEach((key) => {
        grouped[key] = sortTickets(grouped[key], displayState.ordering);
      });
      setGroupedTickets(grouped);
    }
  }, [data, displayState]);

  const handleDisplayChange = (newState: DisplayState) => {
    setDisplayState(newState);
    saveDisplayState(newState);
  };

  if (!data) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <DisplayMenu displayState={displayState} onDisplayChange={handleDisplayChange} />
      </header>

      <main className="main">
        <div className="board">
          {Object.entries(groupedTickets).map(([group, tickets]) => (
            <KanbanColumn
              key={group}
              title={group}
              tickets={tickets}
              count={tickets.length}
              users={data.users}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;