import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

interface CustomCardProps {
  title: string;
  content: string;
  actionText: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, content, actionText }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{actionText}</Button>
      </CardActions>
    </Card>
  );
}

export default CustomCard;
