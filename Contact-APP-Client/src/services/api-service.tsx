// Import Axios for making HTTP requests and import the type definition for contact modification or creation.
import axios from 'axios';
import { IModifyOrCreateContact } from '../types/modify-or-create-comppnent';

// Define the base URL for the contact API.
const url = 'https://localhost:7082/Contact';

// Function to fetch all contacts from the API.
export const fetchContacts = () => axios.get(url);

// Function to create a new contact by sending a POST request with the contact data.
export const createContact = (contact: IModifyOrCreateContact) => axios.post(url, contact);

// Function to update an existing contact by sending a PUT request with the contact data and its ID.
export const updateContact = (id: number, contact: IModifyOrCreateContact) => axios.put(`${url}/${id}`, contact);

// Function to delete a contact by sending a DELETE request with its ID.
export const deleteContact = (id: number) => axios.delete(`${url}/${id}`);

// Function to view the details of a specific contact by sending a GET request with its ID.
export const viewContact = (id: number) => axios.get(`${url}/${id}`);
