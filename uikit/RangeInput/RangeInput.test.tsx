import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RangeInput, { RangeInputSize } from './RangeInput';

describe('RangeInput', () => {

  it('renders correctly with default props', () => {
    render(<RangeInput value={50} min={0} max={100} onChange={() => { }} />);

    // Check if the input range is rendered with default value
    const input = screen.getByRole('slider');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("50");

    // Check if the value, min, and max labels are rendered
    const value = screen.getByText('50');
    const min = screen.getByText('0');
    const max = screen.getByText('100');

    expect(value).toBeInTheDocument();
    expect(min).toBeInTheDocument();
    expect(max).toBeInTheDocument();
  });

  it('updates the value', () => {
    const { rerender } = render(<RangeInput value={50} min={0} max={100} onChange={() => { }} />);

    rerender(<RangeInput value={75} min={0} max={100} onChange={() => { }} />);

    const input = screen.getByRole('slider');
    expect(input).toHaveValue("75");
  });

  it.each(new Array<RangeInputSize>('small', 'regular', 'large'))(
    'render radio with given "%s" size',
    (size) => {
      render(<RangeInput value={50} min={0} max={100} size={size} onChange={() => { }} />);

      const container = screen.getByTestId('range-input-container');

      expect(container).toHaveClass(size);
    },
  );

  it('renders with custom min and max values', () => {
    render(<RangeInput value={50} min={10} max={200} onChange={() => { }} />);

    // Check if the custom min and max are rendered
    const input = screen.getByRole('slider');
    expect(input).toHaveAttribute('min', '10');
    expect(input).toHaveAttribute('max', '200');

    const min = screen.getByText('10');
    const max = screen.getByText('200');

    expect(min).toBeInTheDocument();
    expect(max).toBeInTheDocument();
  });

  it('does not allow interaction when disabled', () => {
    render(<RangeInput value={50} min={0} max={100} disabled onChange={() => { }} />);

    const input = screen.getByRole('slider');
    expect(input).toBeDisabled();

    // Try to simulate change event
    fireEvent.change(input, { target: { value: 75 } });
    expect(input).toHaveValue("50"); // The value should not change since it's disabled
  });
});