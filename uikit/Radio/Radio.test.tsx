// Radio.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import Radio, { RadioSize } from './Radio';
import RadioGroup from './RadioGroup';

describe('Radio Component', () => {
  it('should render radio button with label', () => {
    render(
      <RadioGroup value="1" name="test-group" onChange={() => { }}>
        <Radio id="radio-1" value="1" label="Option 1" />
      </RadioGroup>
    );

    const radioInput = screen.getByLabelText(/Option 1/i);
    expect(radioInput).toBeInTheDocument();
  });

  it('should be selected when value matches the group value', () => {
    render(
      <RadioGroup value="1" name="test-group" onChange={() => { }}>
        <Radio id="radio-1" value="1" label="Option 1" />
        <Radio id="radio-2" value="2" label="Option 2" />
      </RadioGroup>
    );

    const radio1 = screen.getByLabelText(/Option 1/i) as HTMLInputElement;
    const radio2 = screen.getByLabelText(/Option 2/i) as HTMLInputElement;

    expect(radio1.checked).toBe(true);
    expect(radio2.checked).toBe(false);
  });

  it('should trigger onChange when clicked', () => {
    const onChangeMock = jest.fn();
    render(
      <RadioGroup value="1" name="test-group" onChange={onChangeMock}>
        <Radio id="radio-1" value="1" label="Option 1" />
        <Radio id="radio-2" value="2" label="Option 2" />
      </RadioGroup>
    );

    const radio2 = screen.getByLabelText(/Option 2/i) as HTMLInputElement;

    fireEvent.click(radio2);

    expect(onChangeMock).toHaveBeenCalledWith('2');
  });

  it('should be disabled when disabled prop is passed', () => {
    render(
      <RadioGroup value="1" name="test-group" onChange={() => { }}>
        <Radio id="radio-1" value="1" label="Option 1" disabled />
        <Radio id="radio-2" value="2" label="Option 2" />
      </RadioGroup>
    );

    const radio1 = screen.getByLabelText(/Option 1/i) as HTMLInputElement;
    expect(radio1.disabled).toBe(true);
  });

  it.each(new Array<RadioSize>('small', 'regular', 'large'))(
    'render radio with given "%s" size',
    (size) => {
      render(
        <RadioGroup value="1" name="test-group" onChange={() => { }}>
          <Radio id="radio-1" value="1" label="Option 1" size={size} />
        </RadioGroup>
      );

      const container = screen.getByTestId('radio-container');

      expect(container).toHaveClass(size);
    },
  );
});