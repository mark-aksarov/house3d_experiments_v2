import { render, screen, fireEvent } from '@testing-library/react';
import Switch from './Switch';

describe('Switch component', () => {

  test('renders correctly', () => {
    render(<Switch />);

    const switchInput = screen.getByRole('checkbox');
    expect(switchInput).toBeInTheDocument();
  });

  test('disables the switch when disabled prop is true', () => {
    render(<Switch disabled />);

    const switchInput = screen.getByRole('checkbox');
    expect(switchInput).toBeDisabled();
  });

  test('enables the switch when disabled prop is false', () => {
    render(<Switch disabled={false} />);

    const switchInput = screen.getByRole('checkbox');
    expect(switchInput).not.toBeDisabled();
  });

  test('should apply disabled class when disabled prop is true', () => {
    const { container } = render(<Switch disabled />);

    const label = container.querySelector('label');
    expect(label).toHaveClass('disabled');
  });

  test('changes checked state on user interaction', () => {
    render(<Switch />);

    const switchInput = screen.getByRole('checkbox');
    expect(switchInput).not.toBeChecked();

    fireEvent.click(switchInput);

    expect(switchInput).toBeChecked();

    fireEvent.click(switchInput);

    expect(switchInput).not.toBeChecked();
  });

});