import axios from 'axios';
import { IModifyOrCreateContact } from '../pages/modify-or-create-contact/modify-or-create-contact';

const url = 'https://localhost:7082/Contact';

export const fetchContacts = () => axios.get(url);
export const createContact = (contact: IModifyOrCreateContact) => axios.post(url, contact);
export const updateContact = (id: string, contact: IModifyOrCreateContact) => axios.patch(`${url}/${id}`, contact);
export const deleteContact = (id: string) => axios.delete(`${url}/${id}`);
export const viewContact = (id: string) => axios.get(`${url}/${id}`);
