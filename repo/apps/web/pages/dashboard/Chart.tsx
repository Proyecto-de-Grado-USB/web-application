import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import { ChartsTextStyle } from '@mui/x-charts/ChartsText';
import Title from './Title';

function createData(
  time: string,
  amount?: number,
): { time: string; amount: number | null } {
  return { time, amount: amount ?? null };
}

export default function Chart() {
  const theme = useTheme();
  const [data, setData] = React.useState<{ time: string; amount: number | null }[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3001/api/activities');
        const activities = await response.json();

        const filteredActivities = activities.filter((activity: { action_type: string }) => activity.action_type === 'search');

        const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const activityCountByDay: { [key: string]: number } = {};

        daysOfWeek.forEach(day => {
          activityCountByDay[day] = 0;
        });

        filteredActivities.forEach((activity: { action_date: string }) => {
          const date = new Date(activity.action_date);
          const day = daysOfWeek[date.getDay()];
          if (day) {
            activityCountByDay[day] += 1;
          }
        });

        const chartData = daysOfWeek.map(day => createData(day, activityCountByDay[day]));
        setData(chartData);

      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>Consultas de Búsqueda - Semana</Title>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <LineChart
          dataset={data}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: 'point',
              dataKey: 'time',
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
            },
          ]}
          yAxis={[
            {
              label: 'Consultas',
              labelStyle: {
                ...(theme.typography.body1 as ChartsTextStyle),
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
              max: 100,
              tickNumber: 5,
            },
          ]}
          series={[
            {
              dataKey: 'amount',
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
            [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translateX(-25px)',
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}
