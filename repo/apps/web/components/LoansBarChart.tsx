import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useLoans } from '@/hooks/firebase/useLoans';
import { Card, CardContent, Typography, Box } from '@mui/material';

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom align="center">
      {children}
    </Typography>
  );
};

const CompletedAndTotalLoansChart: React.FC = () => {
  const { loans, isLoading, error } = useLoans();

  const totalLoans = loans.length;
  const completedLoans = loans.filter(loan => loan.state === 'completed').length;

  const data = [
    { id: 0, label: 'Total', value: totalLoans },
    { id: 1, label: 'Completados', value: completedLoans },
  ];

  return (
    <Card>
      <CardContent>
        <Title>Préstamos Completados y Totales</Title>
        {isLoading && <Typography>Loading...</Typography>}
        {error && <Typography>Error: {error.message}</Typography>}
        {!isLoading && !error && (
          <Box display="flex" justifyContent="center" alignItems="center" height={200}>
            <BarChart
              xAxis={[{ scaleType: 'band', data: data.map(item => item.label) }]}
              series={[{ data: data.map(item => item.value) }]}
              width={300}
              height={200}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CompletedAndTotalLoansChart;
