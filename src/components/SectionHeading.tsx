import { Typography } from '@mui/material';
import { styled } from '@mui/system';

type SectionHeadingProps = {
  heading: string;
  headingStyles?: React.CSSProperties;
};
export const SectionHeading = ({
  heading,
  headingStyles,
}: SectionHeadingProps) => (
  <Heading variant="h2" style={headingStyles}>
    {heading}
  </Heading>
);

const Heading = styled(Typography)`
  font-size: 40px;
`;
