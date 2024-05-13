import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants'; // Importing action types/constants
import * as api from '../services/api-service'; // Importing API service functions
import { Action } from '../store/store'; // Importing Action type from the store
import { IModifyOrCreateContact } from '../types/modify-or-create-comppnent'; // Importing type definition for modifying or creating a contact

// Function to fetch all contacts from the API
export const getContacts = async (dispatch: React.Dispatch<Action>) => {
  try {
    const { data } = await api.fetchContacts(); // Fetching contacts from the API

    if (data.length > 0) {
      dispatch({ type: FETCH_ALL, payload: data }); // Dispatching action to update state with fetched contacts
      return true;
    } else {
      return false; // Returning false if no contacts are fetched
    }
  } catch (error) {
    console.log(error as unknown as Error); // Logging any errors
    return false; // Returning false in case of an error
  }
};

// Function to create a new contact
export const createContact = async (contact: IModifyOrCreateContact, dispatch: React.Dispatch<Action>) => {
  try {
    const { data } = await api.createContact(contact); // Creating a new contact via the API

    dispatch({ type: CREATE, payload: data }); // Dispatching action to add the new contact to the state
    return true;
  } catch (error) {
    console.log(error as unknown as Error); // Logging any errors
    return false; // Returning false in case of an error
  }
};

// Function to update an existing contact
export const updateContact = async (id: number, contact: IModifyOrCreateContact, dispatch: React.Dispatch<Action>) => {
  try {
    const { data } = await api.updateContact(id, contact); // Updating the contact via the API

    dispatch({ type: UPDATE, payload: data }); // Dispatching action to update the contact in the state
    return true;
  } catch (error) {
    console.log(error as unknown as Error); // Logging any errors
    return false; // Returning false in case of an error
  }
};

// Function to delete a contact
export const deleteContact = async (id: number, dispatch: React.Dispatch<Action>) => {
  try {
    await api.deleteContact(id); // Deleting the contact via the API

    dispatch({ type: DELETE, payload: id }); // Dispatching action to remove the contact from the state
    return true;
  } catch (error) {
    console.log(error as unknown as Error); // Logging any errors
    return false; // Returning false in case of an error
  }
};

// Function to view data of a specific contact
export const viewData = async (id: number) => {
  try {
    console.log(id); // Logging the contact ID
    const { data } = await api.viewContact(id); // Fetching data of the contact with the specified ID

    console.log(data); // Logging the retrieved data
    return data ? data : false; // Returning the data if available, otherwise returning false
  } catch (error) {
    console.log(error as unknown as Error); // Logging any errors
    return false; // Returning false in case of an error
  }
};

//Generate Dummy Data if required
export const generateDummyData = async(dispatch: React.Dispatch<Action>) => {
 try {
    const {data} = await api.generateDummyData();
    dispatch({ type: FETCH_ALL, payload: data }); 
    window.location.reload();
    return data || false;
 } catch (error) {
  return false;
 }
}