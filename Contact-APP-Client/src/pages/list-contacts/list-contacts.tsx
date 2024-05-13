import { useEffect } from 'react'
import { getContacts } from "../../actions/contacts";
import useStore from '../../store/useStore';
import TableComponent from '../../components/table-component';

const ListContacts = () => {
  const {state, dispatch} = useStore();

  useEffect(() => {
    getContacts(dispatch);
  }, [dispatch]);

  console.log(state);
  return (
    <div>
      <TableComponent data = {state.contactsData}/>
    </div>
  )
}

export default ListContacts
