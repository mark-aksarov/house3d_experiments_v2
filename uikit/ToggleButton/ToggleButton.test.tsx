import { render, screen, fireEvent } from '@testing-library/react';
import ToggleButtonGroup from './ToggleButtonGroup';
import ToggleButton from './ToggleButton';

describe('ToggleButtonGroup and ToggleButton', () => {
  it('should render the children and provide context value', () => {
    const onChangeMock = jest.fn();

    render(
      <ToggleButtonGroup value="option1" onChange={onChangeMock}>
        <ToggleButton value="option1" onClick={() => { }}>
          Option 1
        </ToggleButton>
        <ToggleButton value="option2" onClick={() => { }}>
          Option 2
        </ToggleButton>
      </ToggleButtonGroup>
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('should call onChange when a ToggleButton is clicked', () => {
    const onChangeMock = jest.fn();

    render(
      <ToggleButtonGroup value="option1" onChange={onChangeMock}>
        <ToggleButton value="option1" onClick={() => { }}>
          Option 1
        </ToggleButton>
        <ToggleButton value="option2" onClick={() => { }}>
          Option 2
        </ToggleButton>
      </ToggleButtonGroup>
    );

    fireEvent.click(screen.getByText('Option 2'));

    expect(onChangeMock).toHaveBeenCalledWith('option2');
  });

  it('should have "active" class when selected', () => {
    const onChangeMock = jest.fn();

    render(
      <ToggleButtonGroup value="option1" onChange={onChangeMock}>
        <ToggleButton value="option1" onClick={() => { }}>
          Option 1
        </ToggleButton>
        <ToggleButton value="option2" onClick={() => { }}>
          Option 2
        </ToggleButton>
      </ToggleButtonGroup>
    );

    expect(screen.getByText('Option 1')).toHaveClass('active');
    expect(screen.getByText('Option 2')).not.toHaveClass('active');
  });

  it('should update selected value on click', () => {
    const onChangeMock = jest.fn();

    render(
      <ToggleButtonGroup value="option1" onChange={onChangeMock}>
        <ToggleButton value="option1" onClick={() => { }}>
          Option 1
        </ToggleButton>
        <ToggleButton value="option2" onClick={() => { }}>
          Option 2
        </ToggleButton>
      </ToggleButtonGroup>
    );

    fireEvent.click(screen.getByText('Option 2'));

    expect(onChangeMock).toHaveBeenCalledWith('option2');
  });
});