
import { Action, StoreInterface } from "./store";
import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants";

const Reducer = (state: StoreInterface, action: Action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        state,
        contactsData: action.payload
      };
    case CREATE:
      return {
        ...state,
        contactsData: [...state.contactsData, action.payload]
      };
    case UPDATE:
     return {
        ...state,
        contactsData: [...state.contactsData.filter((contact) => contact.id !== action?.payload?.id), action.payload]
      }
    case DELETE:
      return {
        ...state,
        contactsData: state.contactsData.filter((contact) => contact.id !== action.payload)
      };
    default:
      return state;
  }
};

export default Reducer;