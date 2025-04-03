import React from 'react';
import Checkbox, { CheckboxSize } from './Checkbox';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox id='test' label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders as checked when checked prop is true', () => {
    render(<Checkbox id='test' label="Checked Checkbox" checked={true} onChange={() => { }} />);
    const checkboxInput = screen.getByRole('checkbox');
    expect(checkboxInput).toBeChecked();
  });

  it('renders as unchecked when checked prop is false', () => {
    render(<Checkbox id='test' label="Unchecked Checkbox" checked={false} onChange={() => { }} />);
    const checkboxInput = screen.getByRole('checkbox');
    expect(checkboxInput).not.toBeChecked();
  });

  it('disables input when disabled prop is true', () => {
    render(<Checkbox id='test' label="Disabled Checkbox" disabled={true} onChange={() => { }} />);
    const checkboxInput = screen.getByRole('checkbox');
    expect(checkboxInput).toBeDisabled();
  });

  it('calls onChange handler when clicked', () => {
    const handleChange = jest.fn();
    render(<Checkbox id='test' label="Checkbox with onChange" onChange={handleChange} />);

    const checkboxInput = screen.getByRole('checkbox');
    fireEvent.click(checkboxInput);
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders check icon when checked', () => {
    render(<Checkbox id='test' label="Checkbox with Icon" checked={true} onChange={() => { }} />);
    const checkIcon = screen.getByTestId('checkmark');
    expect(checkIcon).toBeInTheDocument();
  });

  it.each(new Array<CheckboxSize>('small', 'regular', 'large'))(
    'render checkbox with given "%s" size',
    (size) => {
      render(<Checkbox id="checkbox-large" label="Large Checkbox" size={size} checked onChange={() => { }} />);
      const checkmark = screen.getByTestId("checkmark");
      expect(checkmark).toHaveAttribute("width", size === "large" ? "22" : size === "regular" ? "20" : "18");
    },
  );
});