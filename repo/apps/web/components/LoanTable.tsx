import React, { useState } from 'react';
import { useLoans } from '@/hooks/useLoans';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert
} from '@mui/material';
import LoanDetailsDialog from '../components/LoanDetailsDialog';

const LoanTable: React.FC = () => {
  const { loans, isLoading, error } = useLoans();
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleRowClick = (loan) => {
    setSelectedLoan(loan);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedLoan(null);
  };

  const translateState = (state) => {
    switch (state) {
      case 'standby':
        return 'En Espera';
      case 'pending':
        return 'Pendiente';
      case 'completed':
        return 'Completado';
      case 'rejected':
        return 'Rechazado';
      default:
        return state;
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: '100px', width: '80%', maxHeight: '530px'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ISBN</TableCell>
              <TableCell>Carnet de Identidad</TableCell>
              <TableCell>Fecha de Expiración</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan.document_id} onClick={() => handleRowClick(loan)} style={{ cursor: 'pointer' }}>
                <TableCell>{loan.document_id}</TableCell>
                <TableCell>{loan.user_id}</TableCell>
                <TableCell>{loan.expiration_date}</TableCell>
                <TableCell>{translateState(loan.state)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <LoanDetailsDialog open={isDialogOpen} onClose={handleCloseDialog} selectedRow={selectedLoan} />
    </>
  );
};

export default LoanTable;
