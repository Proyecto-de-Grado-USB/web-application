import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert
} from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

type Activity = {
  action_id: string;
  action_type: string;
  action_date: string;
  document_id: string;
};

const ActivitiesTable: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const querySnapshot = await getDocs(collection(db, 'activity'));
        const activitiesData = querySnapshot.docs.map(doc => ({
          action_id: doc.id,
          ...doc.data()
        })) as Activity[];
        setActivities(activitiesData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchActivities();
  }, []);

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
          {activities?.map((activity: Activity) => (
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
