import { useEffect, useState } from 'react'
import { getContacts } from "../../actions/contacts";
import useStore from '../../store/useStore';
import TableComponent from '../../components/table-component';
import { CircularProgress } from '@mui/material';

const ListContacts = () => {
  const {state, dispatch} = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getContacts(dispatch).then((result) => {
      if(result) {
        setIsLoading(false);
      }
    });
  }, [dispatch, isLoading]);

  console.log(state);
  return (
    <div>
      {isLoading ? <CircularProgress/> : <TableComponent data = {state.contactsData}/>}
    </div>
  )
}

export default ListContacts
