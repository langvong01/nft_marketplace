import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import Link from 'next/link';

const columns = [
  { id: 'event', align: 'right', label: 'Event', minWidth: 170 },
  { id: 'price', align: 'right', label: 'Price', minWidth: 100 },
  {
    id: 'from',
    label: 'From',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'to',
    label: 'TO',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 170,
    align: 'right',
  },
];
const rows = [
  {
    id: 1,
    event: 'Transfer',
    price: 100,
    from: 'ABCD',
    to: 'QWER',
    date: '2022-11-07',
  },
  {
    id: 2,
    event: 'Transfer',
    price: 100,
    from: 'ABCD',
    to: 'QWER',
    date: '2022-11-07',
  },
  {
    id: 3,
    event: 'Transfer',
    price: 100,
    from: 'ABCD',
    to: 'QWER',
    date: '2022-11-07',
  },
  {
    id: 4,
    event: 'Transfer',
    price: 100,
    from: 'ABCD',
    to: 'QWER',
    date: '2022-11-07',
  },
  {
    id: 5,
    event: 'Transfer',
    price: 100,
    from: 'ABCD',
    to: 'QWER',
    date: '2022-11-07',
  },
  {
    id: 6,
    event: 'Transfer',
    price: 100,
    from: 'ABCD',
    to: 'QWER',
    date: '2022-11-07',
  },
  {
    id: 7,
    event: 'Transfer',
    price: 100,
    from: 'ABCD',
    to: 'QWER',
    date: '2022-11-07',
  },
  {
    id: 8,
    event: 'Transfer',
    price: 100,
    from: 'ABCD',
    to: 'QWER',
    date: '2022-11-07',
  },
  {
    id: 9,
    event: 'Transfer',
    price: 100,
    from: 'ABCD',
    to: 'QWER',
    date: '2022-11-07',
  },
  {
    id: 10,
    event: 'Transfer',
    price: 100,
    from: 'ABCD',
    to: 'QWER',
    date: '2022-11-07',
  },
  {
    id: 11,
    event: 'Transfer',
    price: 100,
    from: 'ABCD',
    to: 'QWER',
    date: '2022-11-07',
  },
  {
    id: 12,
    event: 'Transfer',
    price: 100,
    from: 'ABCD',
    to: 'QWER',
    date: '2022-11-07',
  },
  {
    id: 13,
    event: 'Transfer',
    price: 100,
    from: 'ABCD',
    to: 'QWER',
    date: '2022-11-07',
  },
  {
    id: 14,
    event: 'Transfer',
    price: 100,
    from: 'ABCD',
    to: 'QWER',
    date: '2022-11-07',
  },
  {
    id: 15,
    event: 'Transfer',
    price: 100,
    from: 'ABCD',
    to: 'QWER',
    date: '2022-11-07',
  },
  {
    id: 16,
    event: 'Transfer',
    price: 100,
    from: 'ABCD',
    to: 'QWER',
    date: '2022-11-07',
  },
  {
    id: 17,
    event: 'Transfer',
    price: 100,
    from: 'ABCD',
    to: 'QWER',
    date: '2022-11-07',
  },
];

const NFTActivity = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        ' & .css-jtlhu6-MuiTablePagination-root': {
          color: 'white',
          bgcolor: '#4c5773',
        },
      }}
    >
      <TableContainer
        sx={{
          maxHeight: 440,
          //style for pagination
        }}
      >
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{
            // style for table header
            '& .css-i02g0k-MuiTableCell-root': {
              color: 'white',
              bgcolor: '#4c5773',
            },

            //style for table cell
            '& .css-177gid-MuiTableCell-root': {
              color: '#4c5773',
            },
          }}
        >
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
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {typeof value === 'number' ? `${value} MATIC` : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default NFTActivity;
