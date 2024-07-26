import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import useUpdate from '@/hooks/useUpdate';
import useDelete from '@/hooks/useDelete';
import moment from 'moment-timezone';

const UpdateDocumentDialog = ({ open, onClose, selectedRow, onInsert }) => {
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
    } else {
      setFormData({
        location: '',
        title: '',
        author: '',
        publisher: '',
        year: '',
        city: '',
        country: '',
        edition: '',
        format: '',
        isbn: '',
        language: '',
        pages: '',
        dimensions: '',
        subject: '',
        notes: ''
      });
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
    if (selectedRow) {
      await insertAction("modify");
      if (await updateDocument(selectedRow.id, formData)) {
        alert('El documento se actualizó.');
      }
    } else {
      await insertAction("insert");
      await onInsert(formData);
    }
    onClose();
  };

  const insertAction = async (actionType: string) => {
    const date = moment().tz('America/La_Paz');
    const actionDate = date.format();
    await fetch('http://localhost:3001/api/activities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ action_type: actionType, action_date: actionDate })
    });
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      await insertAction("delete");
      if (await deleteDocument(selectedRow.id)) {
        alert('El documento se eliminó.');
      }
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{selectedRow ? 'Actualizar Documento' : 'Agregar Documento'}</DialogTitle>
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
        {selectedRow && <Button onClick={handleDelete} color="error">Eliminar</Button>}
        <Button onClick={handleUpdate} color="primary">{selectedRow ? 'Guardar' : 'Agregar'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateDocumentDialog;
