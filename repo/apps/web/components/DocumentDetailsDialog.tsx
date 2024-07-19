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
  number: '#',
  location: 'Ubicación',
  title: 'Título',
  author: 'Autor',
  publisher: 'Editorial',
  year: 'Año',
  city: 'Ciudad',
  country: 'País',
  edition: 'Edición',
  format: 'Formato',
  isbn: 'ISBN',
  language: 'Idioma',
  pages: 'Páginas',
  dimensions: 'Dimensiones',
  subject: 'Tema',
  notes: 'Notas'
};

function DocumentDetailsDialog({ open, onClose, selectedRow, onOpenUserDetails }) {
  const renderRowDetails = (row) => {
    return Object.entries(row)
      .filter(([key]) => key !== "id" && key !== "number")
      .map(([key, value]) => (
        <DialogContentText key={key} component="div">
          <strong>{`${headerMap[key]}:`}</strong> {value}
        </DialogContentText>
      ));
  };

  const handleAddUser = () => {
    onClose();
    onOpenUserDetails();
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ style: { minWidth: "500px" } }}>
      <DialogTitle>
        Detalles del Documento
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
        <Button onClick={handleAddUser}>Solicitar Préstamo</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DocumentDetailsDialog;
