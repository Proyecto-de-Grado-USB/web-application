import * as React from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Title from './Title';
import moment from 'moment-timezone';

export default function Card() {
  const [view, setView] = React.useState('day');
  const [count, setCount] = React.useState(0);

  const handleViewChange = (event: React.MouseEvent<HTMLElement>, newView: string) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3001/api/activities');
        const activities = await response.json();

        const date = moment().tz('America/La_Paz').format('YYYY-MM-DD');
        const filteredActivities = activities.filter((activity: { action_type: string, action_date: string }) => 
          activity.action_type === 'modify' && activity.action_date.startsWith(date)
        );

        setCount(filteredActivities.length);

      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <Title>Documentos Añadidos</Title>
        <Typography component="p" variant="h2" marginTop={0.5}>
          {count}
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          en Total
        </Typography>
        <Box sx={{ mt: 2 }}>
          <ToggleButtonGroup
            color="primary"
            value={view}
            exclusive
            onChange={handleViewChange}
            aria-label="View selection"
          >
            <ToggleButton value="day" aria-label="day view">
              Día
            </ToggleButton>
            <ToggleButton value="month" aria-label="month view">
              Mes
            </ToggleButton>
            <ToggleButton value="year" aria-label="year view">
              Año
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
    </React.Fragment>
  );
}
