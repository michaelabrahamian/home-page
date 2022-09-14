import { Typography } from '@mui/material';
import { styled } from '@mui/system';

type SectionHeadingProps = {
  heading: string;
  headingStyles?: React.CSSProperties;
  testId: string;
};
export const SectionHeading = ({
  heading,
  headingStyles,
  testId,
}: SectionHeadingProps) => (
  <Heading variant="h3" style={headingStyles} data-testid={testId}>
    {heading}
  </Heading>
);

const Heading = styled(Typography)`
  font-size: 40px;
`;
