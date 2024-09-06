import React, { useEffect, useState } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useUpdateState } from '@/hooks/firebase/useUpdateState';

const headerMap = {
  document_id: 'ISBN',
  user_id: 'Carnet de Identidad',
  expiration_date: 'Fecha de Expiración',
  state: 'Estado',
  user_name: 'Nombre de Usuario',
  phone: 'Teléfono',
  email: 'Correo Electrónico',
  teacher: 'Docente',
  career: 'Carrera',
  reg_univ: 'Registro Universitario',
};

const LoanDetailsDialog = ({ open, onClose, selectedRow }) => {
  const { updateState, isLoading, error, success } = useUpdateState();
  const [newState, setNewState] = useState('');

  const handleStateChange = async (event) => {
    const updatedState = event.target.value;
    setNewState(updatedState);
    if (selectedRow && selectedRow.loan_id) {
      await updateState(selectedRow.loan_id, updatedState);
    }
  };

  useEffect(() => {
    if (open) {
      setNewState('');
    }
  }, [open]);

  const renderRowDetails = (row) => {
    return Object.entries(row)
      .filter(([key]) => key !== "loan_id")
      .map(([key, value]) => (
        <DialogContentText key={key} component="div">
          <strong>{`${headerMap[key] || key}:`}</strong> {value}
        </DialogContentText>
      ));
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ style: { minWidth: "500px" } }}>
      <DialogTitle>
        Detalles del Préstamo
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {selectedRow && renderRowDetails(selectedRow)}
        <FormControl margin="normal" sx={{ minWidth: 140, float: 'right' }}>
          <Select
            value={newState}
            onChange={handleStateChange}
            disabled={isLoading}
            displayEmpty
            sx={{ height: 40 }}
          >
            <MenuItem value="" disabled>
              Estado
            </MenuItem>
            <MenuItem value="standby">En Espera</MenuItem>
            <MenuItem value="pending">Pendiente</MenuItem>
            <MenuItem value="completed">Completado</MenuItem>
            <MenuItem value="rejected">Rechazado</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      {error && <DialogContentText color="error">{error.message}</DialogContentText>}
    </Dialog>
  );
};

export default LoanDetailsDialog;
