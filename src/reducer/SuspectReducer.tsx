import React from 'react';
import { CitizenData } from '../api/citizen';

export type SuspectAction = {
  type: string;
  id?: string;
  suspect?: CitizenData;
};

export type SuspectReducer = React.Reducer<
  { [key: string]: CitizenData },
  SuspectAction
>;

export const suspectReducer: SuspectReducer = (
  state: { [key: string]: CitizenData },
  action: SuspectAction
) => {
  switch (action.type) {
    case 'ADD_SUSPECT':
      return { ...state, [action.id!]: action.suspect! };
    case 'REMOVE_SUSPECT':
      delete state[action.id!];
      return { ...state };
    default:
      return state;
  }
};
