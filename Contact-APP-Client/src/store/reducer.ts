// This code defines a reducer function that handles different actions dispatched to the store.

// Import necessary types and constants.
import { Action, StoreInterface } from "./store";
import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants";

// Define the reducer function that updates the store based on the action type.
const Reducer = (state: StoreInterface, action: Action) => {
  switch (action.type) {
    // When FETCH_ALL action is dispatched, update the contactsData in the state with the payload.
    case FETCH_ALL:
      return {
        state,
        contactsData: action.payload
      };
    // When CREATE action is dispatched, add the new contact to the contactsData array in the state.
    case CREATE:
      return {
        ...state,
        contactsData: [...state.contactsData, action.payload]
      };
    // When UPDATE action is dispatched, replace the existing contact with the updated one in the contactsData array.
    case UPDATE:
     return {
        ...state,
        contactsData: [...state.contactsData.filter((contact) => contact.id !== action?.payload?.id), action.payload]
      }
    // When DELETE action is dispatched, remove the contact with the specified ID from the contactsData array.
    case DELETE:
      return {
        ...state,
        contactsData: state.contactsData.filter((contact) => contact.id !== action.payload)
      };
    // If none of the above cases match, return the current state unchanged.
    default:
      return state;
  }
};

// Export the reducer function.
export default Reducer;
