import { Typography } from '@mui/material';
import { styled } from '@mui/system';

type SectionHeadingProps = {
  heading: string;
};
export const SectionHeading = ({ heading }: SectionHeadingProps) => (
  <header>
    <Heading variant="h2">{heading}</Heading>
  </header>
);

const Heading = styled(Typography)`
  font-size: 40px;
`;
