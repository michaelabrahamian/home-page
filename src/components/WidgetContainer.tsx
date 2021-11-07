import { Card, Grid } from '@mui/material';

type WidgetContainerProps = { children: React.ReactNode };

const containerStyles = {
  maxWidth: 600,
  margin: 'auto',
};

export const WidgetContainer = ({ children }: WidgetContainerProps) => (
  <Grid item xs={12} p={1} sx={containerStyles}>
    <Card variant="outlined">{children}</Card>
  </Grid>
);
