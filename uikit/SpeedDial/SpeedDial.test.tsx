import SpeedDial from './SpeedDial';
import { PlusIcon } from 'lucide-react';
import { render, screen, fireEvent } from '@testing-library/react';

describe('SpeedDial', () => {
  it('renders without crashing', () => {
    render(<SpeedDial />);
    const fabButton = screen.getByRole('button');
    expect(fabButton).toBeInTheDocument();
  });

  it('toggles actions when fab button is clicked', () => {
    render(
      <SpeedDial>
        <div>Action 1</div>
        <div>Action 2</div>
      </SpeedDial>
    );

    const fabButton = screen.getByRole('button');
    const actionsContainer = screen.getByTestId('actions-container');

    // Initially, actions should not be visible
    expect(actionsContainer).toHaveClass('actionsContainer');

    // Click fab button to open the actions
    fireEvent.click(fabButton);
    expect(actionsContainer).toHaveClass('actionsContainer open');

    // Click fab button again to close the actions
    fireEvent.click(fabButton);
    expect(actionsContainer).toHaveClass('actionsContainer');
  });

  it('renders children correctly', () => {
    render(
      <SpeedDial>
        <div>Action 1</div>
        <div>Action 2</div>
      </SpeedDial>
    );

    // Ensure children are rendered correctly
    expect(screen.getByText('Action 1')).toBeInTheDocument();
    expect(screen.getByText('Action 2')).toBeInTheDocument();
  });

  it('uses custom icon and size for fab', () => {
    render(
      <SpeedDial fabProps={{ icon: <PlusIcon />, size: 'large' }}>
        <div>Action</div>
      </SpeedDial>
    );

    const fabButton = screen.getByRole('button');
    expect(fabButton).toHaveClass('large');
    expect(fabButton.querySelector('svg')).toBeInTheDocument();
  });

  it('handles custom className for fab and actions', () => {
    render(
      <SpeedDial fabProps={{ className: 'custom-fab' }}>
        <div>Action 1</div>
      </SpeedDial>
    );

    const fabButton = screen.getByRole('button');
    const actionsContainer = screen.getByTestId('actions-container');

    expect(fabButton).toHaveClass('custom-fab');
    expect(actionsContainer).toHaveClass('actionsContainer');
  });
});