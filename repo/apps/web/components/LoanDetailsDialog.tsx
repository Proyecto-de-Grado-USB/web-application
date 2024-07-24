import React, { useState } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useUpdateState } from '@/hooks/useUpdateState';

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
  const [newState, setNewState] = useState(selectedRow ? selectedRow.state : '');

  const handleStateChange = (event) => {
    setNewState(event.target.value);
  };

  const handleUpdateState = async () => {
    if (selectedRow && selectedRow.loan_id) {
      await updateState(selectedRow.loan_id, newState);
      if (success) {
        onClose();
      }
    }
  };

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
        <FormControl fullWidth margin="normal">
          <InputLabel id="state-label">Estado</InputLabel>
          <Select
            labelId="state-label"
            value={newState}
            onChange={handleStateChange}
          >
            <MenuItem value="standby">En Espera</MenuItem>
            <MenuItem value="pending">Pendiente</MenuItem>
            <MenuItem value="completed">Completado</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleUpdateState} disabled={isLoading}>Actualizar</Button>
      </DialogActions>
      {error && <DialogContentText color="error">{error.message}</DialogContentText>}
    </Dialog>
  );
};

export default LoanDetailsDialog;
