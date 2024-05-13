import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants';
import { IModifyOrCreateContact } from '../pages/modify-or-create-contact/modify-or-create-contact';

import * as api from '../services/api-service';
import { Action } from '../store/store';

export const getContacts = async (dispatch: React.Dispatch<Action>) => {
  try {
    const { data } = await api.fetchContacts();

    dispatch({ type: FETCH_ALL, payload: data });
    return true;
  } catch (error) {
    console.log(error as unknown as Error);
    return false;
  }
};

export const createContact = (contact: IModifyOrCreateContact) => async (dispatch: React.Dispatch<Action>) => {
  try {
    const { data } = await api.createContact(contact);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error as unknown as Error);
  }
};

export const updateContact = (id: string, Contact: IModifyOrCreateContact) => async (dispatch: React.Dispatch<Action> ) => {
  try {
    const { data } = await api.updateContact(id, Contact);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error as unknown as Error);
  }
};

export const deleteContact = (id: string) => async (dispatch: React.Dispatch<Action>) => {
  try {
    await api.deleteContact(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error as unknown as Error);
  }
};
