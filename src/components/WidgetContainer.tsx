import { Card, Grid } from '@mui/material';

type WidgetContainerProps = { children: React.ReactNode };

const ContainerStyles = {
  maxWidth: 600,
  margin: 'auto',
};

export const WidgetContainer = ({ children }: WidgetContainerProps) => (
  <Grid item xs={12} sx={ContainerStyles}>
    <Card variant="outlined">{children}</Card>
  </Grid>
);
