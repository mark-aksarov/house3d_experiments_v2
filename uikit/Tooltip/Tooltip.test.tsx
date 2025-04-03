import React from 'react';
import Tooltip from './Tooltip';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';

describe('Tooltip', () => {
  test('renders the child element correctly', async () => {
    render(
      <Tooltip title="Test Tooltip" size="regular">
        <button>Hover me</button>
      </Tooltip>
    );
    await act(async () => { }); // Flush microtasks.

    const button = screen.getByRole('button', { name: /hover me/i });
    expect(button).toBeInTheDocument();
  });

  test('shows the tooltip on hover', async () => {
    render(
      <Tooltip title="Test Tooltip" size="regular">
        <button>Hover me</button>
      </Tooltip>
    );
    await act(async () => { }); // Flush microtasks.

    const button = screen.getByRole('button', { name: /hover me/i });
    fireEvent.mouseEnter(button);

    expect(screen.queryByRole('tooltip')).toBeInTheDocument();
  });

  test('hides the tooltip on mouse leave', async () => {
    render(
      <Tooltip title="Test Tooltip" size="regular">
        <button>Hover me</button>
      </Tooltip>
    );
    await act(async () => { }); // Flush microtasks.

    const button = screen.getByRole('button', { name: /hover me/i });
    fireEvent.mouseEnter(button);

    expect(screen.queryByRole('tooltip')).toBeInTheDocument();
    fireEvent.mouseLeave(button);

    waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    })
  });

  test('applies the correct size class', async () => {
    render(
      <Tooltip title="Small Tooltip" size="small">
        <button>Hover me</button>
      </Tooltip>
    );
    await act(async () => { }); // Flush microtasks.

    fireEvent.mouseEnter(screen.getByRole('button', { name: /hover me/i }));

    const tooltip = screen.getByText('Small Tooltip');
    expect(tooltip).toHaveClass('tooltip');
    expect(tooltip).toHaveClass('small');
  });
});