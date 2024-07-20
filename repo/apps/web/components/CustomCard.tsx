import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface CustomCardProps {
  title: string;
  content: string;
  icon: JSX.Element;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, content, icon }) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          {icon}
        </Box>
        <Typography variant="h6" sx={{ mt: 2.5 }} color="text.secondary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CustomCard;
