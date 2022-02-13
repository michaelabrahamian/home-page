import { render, screen } from '@testing-library/react';
import { RenderWithProviders } from './RenderWithProviders';
import { Widgets } from './Widgets';

const renderWidgets = () =>
  render(
    <RenderWithProviders>
      <Widgets />
    </RenderWithProviders>
  );

describe('Widgets', () => {
  it('displays widget headings', () => {
    renderWidgets();

    expect(screen.getByText('Weather')).toBeInTheDocument();
    expect(screen.getByText('News')).toBeInTheDocument();
  });
});
