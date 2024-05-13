import { useEffect, useState } from 'react'; // Importing useEffect and useState hooks from React
import { generateDummyData, getContacts } from "../../actions/contacts"; // Importing getContacts action
import useStore from '../../store/useStore'; // Importing custom hook for accessing store
import TableComponent from '../../components/table-component'; // Importing TableComponent component
import { Box, Button, CircularProgress } from '@mui/material'; // Importing Box and CircularProgress components from Material-UI
import { Link } from 'react-router-dom'; // Importing Link component from React Router
import styles from "./list-contacts.module.css"; // Importing CSS module for styling

// Functional component for listing contacts
const ListContacts = () => {
  const { state, dispatch } = useStore(); // Accessing state and dispatch function from the store
  const [isLoading, setIsLoading] = useState(true); // State for tracking loading state

  // Effect hook to fetch contacts when the component mounts or isLoading state changes
  useEffect(() => {
    if (isLoading) {
      // Fetch contacts and update loading state when component mounts or isLoading changes
      getContacts(dispatch).then(() => {
        setIsLoading(false);
      });
    }
  }, [dispatch, isLoading, state.contactsData]); // Dependencies array for the useEffect hook

  // Logging state for debugging purposes
  console.log(state);

  return (
    <div className='mt-5'>
      <Box className="d-flex">
        {/* Link to navigate to create contact page */}
        <Link className={styles.linkButton} to={{ pathname: "/createContact" }}>Create Contact</Link>
        <Button variant="outlined" color="secondary" className={`${styles.linkButton} ms-2`} onClick={() => {generateDummyData(dispatch)}}>Generate Dummy Data</Button>
      </Box>
      {/* Conditional rendering based on loading state */}
      {isLoading ? <CircularProgress /> : 
        <Box className={styles.boxClass}>
          {/* Rendering TableComponent with contact data */}
          <TableComponent data={state.contactsData} />
        </Box>
      }
    </div>
  );
};

export default ListContacts; // Exporting the ListContacts component as the default export
