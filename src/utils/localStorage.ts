import { DisplayState } from '../types';

export const saveDisplayState = (state: DisplayState) => {
  localStorage.setItem('kanbanDisplayState', JSON.stringify(state));
};

export const loadDisplayState = (): DisplayState => {
  const saved = localStorage.getItem('kanbanDisplayState');
  return saved ? JSON.parse(saved) : { grouping: 'status', ordering: 'priority' };
};