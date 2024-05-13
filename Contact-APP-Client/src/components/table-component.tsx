import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { IModifyOrCreateContact } from '../pages/modify-or-create-contact/modify-or-create-contact';
import { useState } from 'react';
import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';

interface Column {
  id: 'id' | 'name' | 'email' | 'address' | 'city' | 'country' | 'postalCode' | 'phoneNumber' | 'delete';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

interface TableComponentProps {
  data: IModifyOrCreateContact[]
}

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


export default function TableComponent(props: TableComponentProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState(props.data);
  console.log(props.data);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onDeleteSetRows = (id: string) => {
    console.log(id);
    setRows([]);
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: IModifyOrCreateContact) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      if(column.id === "delete") {
                        return <TableCell>
                          <Button onClick={() => onDeleteSetRows(row["id"])}>
                            <Delete/>
                          </Button>
                        </TableCell>
                      } else {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

