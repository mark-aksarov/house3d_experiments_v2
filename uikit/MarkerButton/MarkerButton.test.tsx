import React from 'react';
import MarkerButton from './MarkerButton';
import { render, screen, fireEvent } from '@testing-library/react';

describe('MarkerButton', () => {
  it('renders with default props', () => {
    render(<MarkerButton>Click me</MarkerButton>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('markerButton');
    expect(button).toHaveClass('regular');
    expect(button).toHaveClass('brand');
  });

  it('applies size and color classes', () => {
    render(<MarkerButton size="large" color="danger">Delete</MarkerButton>);
    const button = screen.getByRole('button', { name: /delete/i });
    expect(button).toHaveClass('large');
    expect(button).toHaveClass('danger');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<MarkerButton onClick={handleClick}>Click</MarkerButton>);
    const button = screen.getByRole('button', { name: /click/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as a link when "as" is set to "a"', () => {
    render(
      <MarkerButton as="a" href="https://example.com" target="_blank">
        Go to Example
      </MarkerButton>
    );
    const link = screen.getByRole('link', { name: /go to example/i });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('supports additional class names', () => {
    render(<MarkerButton className="extra-class">Extra</MarkerButton>);
    const button = screen.getByRole('button', { name: /extra/i });
    expect(button).toHaveClass('markerButton');
    expect(button).toHaveClass('extra-class');
  });
});