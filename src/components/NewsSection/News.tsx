import { SectionHeading } from '../SectionHeading';
import { WidgetContainer } from '../WidgetContainer';

export const NewsWidget = () => {
  return (
    <WidgetContainer>
      <SectionHeading
        testId="news-section-heading"
        heading={'News'}
        headingStyles={{ display: 'inline-block' }}
      />
    </WidgetContainer>
  );
};
