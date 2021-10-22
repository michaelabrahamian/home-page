import { Typography } from '@mui/material';
import { styled } from '@mui/system';

export const PageHeader = () => (
  <header>
    <Heading variant="h1">Home page</Heading>
  </header>
);

const Heading = styled(Typography)`
  font-size: 48px;
`;
