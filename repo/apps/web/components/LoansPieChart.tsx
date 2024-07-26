import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useLoans } from '@/hooks/useLoans';
import { Card, CardContent, Typography } from '@mui/material';

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
    { id: 1, value: stateCounts.completed, label: 'Completado' },
    { id: 2, value: stateCounts.pending, label: 'Pendiente' },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
            Préstamos Únicos y Totales
        </Typography>
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
