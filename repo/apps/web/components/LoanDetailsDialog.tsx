import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoanDetailsDialog;
