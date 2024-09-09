import * as React from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Title from './Title';
import moment from 'moment-timezone';
import useActivities from '@/hooks/firebase/useActivities';

interface CardProps {
  title: string;
  activityType: string;
}

export default function Card({ title, activityType }: CardProps) {
  const [view, setView] = React.useState('day');
  const [count, setCount] = React.useState(0);

  const { activities, isLoading, error } = useActivities();

  const handleViewChange = (event: React.MouseEvent<HTMLElement>, newView: string) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  React.useEffect(() => {
    if (activities && activities.length > 0) {
      const date = moment().tz('America/La_Paz');
      let filteredActivities;

      switch (view) {
        case 'day':
          filteredActivities = activities.filter(
            (activity) =>
              activity.action_type === activityType &&
              moment(activity.action_date).isSame(date, 'day')
          );
          break;
        case 'month':
          filteredActivities = activities.filter(
            (activity) =>
              activity.action_type === activityType &&
              moment(activity.action_date).isSame(date, 'month')
          );
          break;
        case 'year':
          filteredActivities = activities.filter(
            (activity) =>
              activity.action_type === activityType &&
              moment(activity.action_date).isSame(date, 'year')
          );
          break;
        default:
          filteredActivities = [];
      }

      setCount(filteredActivities.length);
    }
  }, [activities, view, activityType]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading activities: {error}</div>;
  }

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
        <Title>{title}</Title>
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
