import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert
} from '@mui/material';
import useActivities from '@/hooks/firebase/useActivities';

const ActivitiesTable: React.FC = () => {
  const { activities, isLoading, error } = useActivities();

  const translateActionType = (actionType: string) => {
    switch (actionType) {
      case 'search':
        return 'Buscar';
      case 'modify':
        return 'Modificar';
      case 'delete':
        return 'Eliminar';
      case 'insert':
        return 'Insertar';
      default:
        return actionType;
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{`There was an error: ${error}`}</Alert>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: '10px', width: '100%', maxHeight: '480px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID de la Acción</TableCell>
            <TableCell>Tipo de Acción</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>ISBN del Documento</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activities
            ?.filter(activity => activity.action_type !== 'search')
            .map(activity => (
              <TableRow key={activity.action_id}>
                <TableCell>{activity.action_id}</TableCell>
                <TableCell>{translateActionType(activity.action_type)}</TableCell>
                <TableCell>{new Date(activity.action_date).toLocaleString()}</TableCell>
                <TableCell>{activity.document_id ?? '-'}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ActivitiesTable;
