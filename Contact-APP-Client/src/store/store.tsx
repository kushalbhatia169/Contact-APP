/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useReducer, createContext, PropsWithChildren, Dispatch } from 'react';
import Reducer from './reducer';
import { IModifyOrCreateContact } from '../pages/modify-or-create-contact/modify-or-create-contact';

export interface StoreInterface {
  contactsData: IModifyOrCreateContact[];
}

const initialState: StoreInterface = {
  contactsData: []
};

export type Action = {
  type: 'CREATE' | 'UPDATE' | 'DELETE' | 'FETCH_ALL';
  payload: any;
}

export interface ContextType {
  state: StoreInterface;
  dispatch: Dispatch<Action>;
}

export const context = createContext<ContextType>({ state: initialState, dispatch: () => {} });

const Store: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <context.Provider value={{ state, dispatch }}>
      {children}
    </context.Provider>
  );
};

export default Store;