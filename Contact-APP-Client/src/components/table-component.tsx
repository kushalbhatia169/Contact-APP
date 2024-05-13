import * as React from 'react'; // Importing React library
import Paper from '@mui/material/Paper'; // Importing Paper component from Material-UI
import Table from '@mui/material/Table'; // Importing Table component from Material-UI
import TableBody from '@mui/material/TableBody'; // Importing TableBody component from Material-UI
import TableCell from '@mui/material/TableCell'; // Importing TableCell component from Material-UI
import TableContainer from '@mui/material/TableContainer'; // Importing TableContainer component from Material-UI
import TableHead from '@mui/material/TableHead'; // Importing TableHead component from Material-UI
import TablePagination from '@mui/material/TablePagination'; // Importing TablePagination component from Material-UI
import TableRow from '@mui/material/TableRow'; // Importing TableRow component from Material-UI
import { useState } from 'react'; // Importing useState hook from React
import { Delete } from '@mui/icons-material'; // Importing Delete icon from Material-UI
import { Button } from '@mui/material'; // Importing Button component from Material-UI
import { Link } from 'react-router-dom'; // Importing Link component from React Router
import AlertDialog from './dialog-box'; // Importing AlertDialog component
import { deleteContact } from '../actions/contacts'; // Importing deleteContact action
import useStore from '../store/useStore'; // Importing custom hook for accessing store
import { Column, TableComponentProps } from '../types/table-component.type'; // Importing type definitions
import { IModifyOrCreateContact } from '../types/modify-or-create-comppnent';

// Columns configuration for the table
const columns: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 70 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 250 },
  { id: 'address', label: 'Address', minWidth: 170 },
  { id: 'city', label: 'City', minWidth: 170 },
  { id: 'country', label: 'Country', minWidth: 170 },
  { id: 'postalCode', label: 'Postal Code', minWidth: 170 },
  { id: 'phoneNumber', label: 'Phone Number', minWidth: 170 },
  { id: 'delete', label: 'Delete', minWidth: 170 }
];

// Functional component for rendering a table
export default function TableComponent(props: TableComponentProps) {
  const [page, setPage] = React.useState(0); // State for current page number
  const [rowsPerPage, setRowsPerPage] = React.useState(10); // State for number of rows per page
  const [rows, setRows] = useState(props.data); // State for table rows
  const [deleteId, setDeleteId] = useState(0); // State for ID of the item to be deleted
  const [isOpenBox, setIsOpenBox] = useState(false); // State for controlling the visibility of the delete confirmation dialog box
  const { dispatch } = useStore(); // Custom hook for accessing store

  // Event handler for changing the current page
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Event handler for changing the number of rows per page
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Function to handle deletion of a contact and updating the table rows
  const onDeleteSetRows = (id: number) => {
    deleteContact(id, dispatch)
      .then((res) => {
        if (res) {
          alert('🦄 Wow Contact deleted'); // Alert message upon successful deletion
          setRows(rows.filter(i => i.id !== id)); // Filtering out the deleted contact from the table rows
        } else {
          throw new Error("Sorry your contact cannot be deleted."); // Error message if deletion fails
        }
      })
      .catch((error) => {
        console.warn(error); // Logging any errors
      });
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {/* Rendering table column headers */}
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Rendering table rows */}
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: IModifyOrCreateContact) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      if (column.id === "id") {
                        // Render ID column as a link to update contact page
                        return <TableCell>
                          <Link to={`/updateContact/${row[column.id]}`}>{row[column.id]}</Link>
                        </TableCell>
                      }
                      if (column.id === "delete") {
                        // Render Delete column with a button to open delete confirmation dialog
                        return <TableCell>
                          <Button onClick={() => {
                            setDeleteId(row["id"]); // Set the ID of the item to be deleted
                            setIsOpenBox(true); // Open the delete confirmation dialog box
                          }}>
                            <Delete /> {/* Delete icon */}
                          </Button>
                        </TableCell>
                      } else {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value} {/* Render the cell value */}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Table pagination component */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* Delete confirmation dialog */}
      {isOpenBox && deleteId && <AlertDialog
        content='Are you really want to delete this contact?' // Dialog content
        id={deleteId} // ID of the item to be deleted
        onDelete={onDeleteSetRows} // Callback function for deleting the item
        isOpen={isOpenBox} // Flag to control the visibility of the dialog
        setIsOpenBox={setIsOpenBox} // Function to update the visibility of the dialog
      />}
    </Paper>
  );
}
