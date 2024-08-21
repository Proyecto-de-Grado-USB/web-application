import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert
} from '@mui/material';

const ActivitiesTable: React.FC = () => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch('http://localhost:3001/api/activities');
        if (!response.ok) {
          throw new Error('Failed to fetch activities');
        }
        const data = await response.json();
        setActivities(data);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchActivities();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{'There was an error'}</Alert>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: '100px', width: '80%', maxHeight: '480px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Action ID</TableCell>
            <TableCell>Action Type</TableCell>
            <TableCell>Action Date</TableCell>
            <TableCell>Document ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activities.map((activity: { action_id: number; action_type: string; action_date: string; document_id: string }) => (
            <TableRow key={activity.action_id}>
              <TableCell>{activity.action_id}</TableCell>
              <TableCell>{activity.action_type}</TableCell>
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
