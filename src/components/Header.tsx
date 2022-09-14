import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Time } from './Time/Time';

export const PageHeader = () => (
  <header>
    <MainHeader variant="h1">Home page</MainHeader>
    <SubHeader variant="h2">
      <Time />
    </SubHeader>
  </header>
);

const MainHeader = styled(Typography)`
  font-size: 48px;
`;

const SubHeader = styled(Typography)`
  font-size: 24px;
`;
