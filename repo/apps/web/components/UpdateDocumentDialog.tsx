import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import useUpdate from '@/hooks/useUpdate';
import useDelete from '@/hooks/useDelete';

const UpdateDocumentDialog = ({ open, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({});
  const { updateDocument } = useUpdate();
  const { deleteDocument } = useDelete();

  const labelMap = {
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

  useEffect(() => {
    if (selectedRow) {
      const { id, number, ...rest } = selectedRow;
      setFormData(rest);
      console.log(rest)
    }
  }, [selectedRow]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    if (await updateDocument(selectedRow.id, formData)) {
      alert('Document updated successfully');
    }
    onClose();
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      if (await deleteDocument(selectedRow.id)) {
        alert('Document deleted successfully');
      }
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Actualizar Documento</DialogTitle>
      <DialogContent>
        {formData && Object.keys(formData).map((key) =>
          <TextField
            key={key}
            name={key}
            label={labelMap[key] || key.charAt(0).toUpperCase() + key.slice(1)}
            value={formData[key] || ''}
            onChange={handleChange}
            margin="dense"
            fullWidth
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} color="error">Eliminar</Button>
        <Button onClick={handleUpdate} color="primary">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateDocumentDialog;
