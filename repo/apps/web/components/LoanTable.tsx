// LoanTable.tsx
import React from 'react';
import { useLoans } from '@/hooks/useLoans';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert
} from '@mui/material';

const LoanTable: React.FC = () => {
  const { loans, isLoading, error } = useLoans();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Document ID</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Expiration Date</TableCell>
            <TableCell>State</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Teacher</TableCell>
            <TableCell>Career</TableCell>
            <TableCell>Reg Univ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loans.map((loan) => (
            <TableRow key={loan.document_id}>
              <TableCell>{loan.document_id}</TableCell>
              <TableCell>{loan.user_id}</TableCell>
              <TableCell>{loan.expiration_date}</TableCell>
              <TableCell>{loan.state}</TableCell>
              <TableCell>{loan.user_name}</TableCell>
              <TableCell>{loan.phone}</TableCell>
              <TableCell>{loan.email}</TableCell>
              <TableCell>{loan.teacher}</TableCell>
              <TableCell>{loan.career}</TableCell>
              <TableCell>{loan.reg_univ}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LoanTable;
