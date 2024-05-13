/* eslint-disable @typescript-eslint/no-explicit-any */
// This code defines the context and provider for managing state using React's useContext and useReducer hooks.
import React, { useReducer, createContext, PropsWithChildren, Dispatch } from 'react';
import Reducer from './reducer';
import { IModifyOrCreateContact } from "../types/modify-or-create-comppnent";

// Define the shape of the store interface.
export interface StoreInterface {
  contactsData: IModifyOrCreateContact[];
}

// Set the initial state of the store.
const initialState: StoreInterface = {
  contactsData: []
};

// Define the action types and their payloads.
export type Action = {
  type: 'CREATE' | 'UPDATE' | 'DELETE' | 'FETCH_ALL';
  payload: any;
}

// Define the context type for the store.
export interface ContextType {
  state: StoreInterface;
  dispatch: Dispatch<Action>;
}

// Create the context with initial values.
export const context = createContext<ContextType>({ state: initialState, dispatch: () => {} });

// Define the store component.
const Store: React.FC<PropsWithChildren> = ({ children }) => {
  // Use useReducer to manage state with Reducer function and initial state.
  const [state, dispatch] = useReducer(Reducer, initialState);

  // Provide the state and dispatch function to the context.
  return (
    <context.Provider value={{ state, dispatch }}>
      {children}
    </context.Provider>
  );
};

export default Store;
