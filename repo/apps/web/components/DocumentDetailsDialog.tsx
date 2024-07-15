import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

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

function DocumentDetailsDialog({ open, onClose, selectedRow }) {
  const renderRowDetails = (row) => {
    return Object.entries(row)
      .filter(([key]) => key !== "id" && key !== "number")
      .map(([key, value]) => (
        <DialogContentText key={key} component="div">
          <strong>{`${headerMap[key]}:`}</strong> {value}
        </DialogContentText>
      ));
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ style: { minWidth: "400px" } }}>
      <DialogTitle>Detalles del Documento</DialogTitle>
      <DialogContent>
        {selectedRow && renderRowDetails(selectedRow)}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DocumentDetailsDialog;
