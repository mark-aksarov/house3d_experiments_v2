import Step from './Step';
import Stepper from './Stepper';
import StepLabel from './StepLabel';
import StepperPanel from './StepperPanel';
import { render, screen } from '@testing-library/react';
import { StepSize } from './StepperContext';

describe('Stepper Component', () => {
  it('renders the Stepper and provides context to Step components', () => {
    render(
      <Stepper selectedIndex={1}>
        <Step index={0}>
          <StepLabel>
            Step 1
          </StepLabel>
        </Step>
        <Step index={1}>
          <StepLabel>
            Step 2
          </StepLabel>
        </Step>
        <Step index={2}>
          <StepLabel>
            Step 3
          </StepLabel>
        </Step>
      </Stepper>
    );

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('renders steps and separators with or without passed class depending on selectedIndex', () => {
    render(
      <Stepper selectedIndex={1}>
        <Step index={0}>
          <StepLabel>
            Step 1
          </StepLabel>
        </Step>
        <Step index={1}>
          <StepLabel>
            Step 2
          </StepLabel>
        </Step>
        <Step index={2}>
          <StepLabel>
            Step 3
          </StepLabel>
        </Step>
      </Stepper>
    );

    const steps = screen.getAllByTestId('step');
    const separators = screen.getAllByTestId('separator');

    expect(steps[0]).toHaveClass('passed');
    expect(steps[1]).toHaveClass('passed');
    expect(steps[2]).not.toHaveClass('passed');

    expect(separators[0]).toHaveClass('passed');
    expect(separators[1]).not.toHaveClass('passed');
  });

  it('renders StepperPanel if the selectedIndex matches the index', () => {
    render(
      <>
        <Stepper selectedIndex={1}>
          <Step index={0}>
            <StepLabel>
              Step 1
            </StepLabel>
          </Step>
          <Step index={1}>
            <StepLabel>
              Step 2
            </StepLabel>
          </Step>
          <Step index={2}>
            <StepLabel>
              Step 3
            </StepLabel>
          </Step>
        </Stepper>

        <StepperPanel index={0} selectedIndex={1}>
          <div>Panel Content 1</div>
        </StepperPanel>

        <StepperPanel index={1} selectedIndex={1}>
          <div>Panel Content 2</div>
        </StepperPanel>
      </>
    );

    expect(screen.getByText('Panel Content 2')).toBeInTheDocument();
  });

  it('does not render content if the selectedIndex does not match the index', () => {
    render(
      <>
        <Stepper selectedIndex={1}>
          <Step index={0}>
            <StepLabel>
              Step 1
            </StepLabel>
          </Step>
          <Step index={1}>
            <StepLabel>
              Step 2
            </StepLabel>
          </Step>
          <Step index={2}>
            <StepLabel>
              Step 3
            </StepLabel>
          </Step>
        </Stepper>

        <StepperPanel index={0} selectedIndex={1}>
          <div>Panel Content 1</div>
        </StepperPanel>

        <StepperPanel index={1} selectedIndex={1}>
          <div>Panel Content 2</div>
        </StepperPanel>
      </>
    );

    expect(screen.queryByText('Panel Content 1')).not.toBeInTheDocument();
  });

  it.each(new Array<StepSize>('small', 'regular'))(
    'render step wrapper with given "%s" size',
    (size) => {
      render(
        <Stepper selectedIndex={1} stepSize={size}>
          <Step index={0}>
            <StepLabel>
              Step 1
            </StepLabel>
          </Step>
        </Stepper>
      );

      const step = screen.getByTestId('step');
      expect(step).toHaveClass(size);
    },
  );

  it('does not render step text if stepSize is "small"', () => {
    render(
      <Stepper selectedIndex={1} stepSize="small">
        <Step index={0}>
          <StepLabel>
            Step 1
          </StepLabel>
        </Step>
      </Stepper>
    );

    const stepText = screen.queryByTestId('step-text');
    expect(stepText).not.toBeInTheDocument();
  });
});