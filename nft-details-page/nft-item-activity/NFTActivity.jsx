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
import moment from 'moment/moment';

const columns = [
  { id: 'event', align: 'center', label: 'Event', minWidth: 100 },
  { id: 'price', align: 'center', label: 'Price', minWidth: 100 },
  {
    id: 'from',
    label: 'From',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'to',
    label: 'TO',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'scanLink',
    label: 'ScanLink',
    minWidth: 300,
    align: 'center',
  },
];

const NFTActivity = ({ itemsActivity }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowPerPage] = useState(10);

  console.log(moment('2022-12-15T17:16:38').startOf('days').fromNow());

  const activitys = itemsActivity.map((item) => {
    return {
      id: item.activityId,
      event: item.operation,
      price: item.price,
      from: item.from ? item.from : null,
      to: item.to ? item.to : null,
      date: item.createdAt,
      scanLink: item.txnScanLink,
    };
  });
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
            '& .css-dwuj3p-MuiTableCell-root': {
              color: 'white',
              bgcolor: '#4c5773',
            },
            //style for table cell
            '& .css-177gid-MuiTableCell-root': {
              color: '#4c5773',
            },
            '& .css-1yhpg23-MuiTableCell-root a': {
              color: 'rgb(32, 129, 226)',
              textDecoration: 'underline',
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
            {activitys
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === 'scanLink') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value && (
                              <Link href={value}>
                                <a target="_blank">Go To PolgonScan</a>
                              </Link>
                            )}
                          </TableCell>
                        );
                      }
                      if (column.id === 'date') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value && moment(value).startOf('day').fromNow()}
                          </TableCell>
                        );
                      }
                      if (column.id === 'from' || column.id === 'to') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value?.name && (
                              <Link href={`/account/${value.walletAddress}`}>
                                {value?.name}
                              </Link>
                            )}
                          </TableCell>
                        );
                      }
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
        count={activitys.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default NFTActivity;
