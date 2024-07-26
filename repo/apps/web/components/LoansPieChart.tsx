import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useLoans } from '@/hooks/useLoans';
import { Card, CardContent, Typography } from '@mui/material';

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom align='center'>
      {children}
    </Typography>
  );
};

const LoansPieChart: React.FC = () => {
  const { loans, isLoading, error } = useLoans();

  const stateCounts = loans.reduce(
    (acc, loan) => {
      acc[loan.state]++;
      return acc;
    },
    { standby: 0, completed: 0, pending: 0 }
  );

  const data = [
    { id: 0, value: stateCounts.standby, label: 'En Espera' },
    { id: 1, value: stateCounts.completed, label: 'Completada' },
    { id: 2, value: stateCounts.pending, label: 'Pendiente' },
  ];

  return (
    <Card>
      <CardContent>
        <Title>Estado de los Préstamos</Title>
        {isLoading && <Typography>Loading...</Typography>}
        {error && <Typography>Error: {error.message}</Typography>}
        {!isLoading && !error && (
          <PieChart
            series={[
              {
                data: data,
              },
            ]}
            width={400}
            height={200}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default LoansPieChart;
