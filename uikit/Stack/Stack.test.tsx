import { render, screen } from '@testing-library/react';
import Stack from './Stack';
import '@testing-library/jest-dom';

describe('Stack Component', () => {
  it('should render Stack with default props', () => {
    render(<Stack>Test Content</Stack>);

    // Check if the component renders with the correct default classes
    const stackElement = screen.getByText('Test Content');
    expect(stackElement).toHaveClass('stack');
    expect(stackElement).toHaveClass('wrap-wrap');
    expect(stackElement).toHaveClass('direction-horizontal');
    expect(stackElement).toHaveClass('justifyContent-start');
    expect(stackElement).toHaveClass('alignItems-flex-start');
  });

  it('should apply custom spacing', () => {
    render(<Stack spacing={4}>Test Content</Stack>);

    const stackElement = screen.getByText('Test Content');
    expect(stackElement).toHaveClass('spacing-4');
  });

  it('should handle responsive wrap prop', () => {
    render(<Stack wrap={{ sm: 'nowrap', md: 'wrap' }}>Test Content</Stack>);

    const stackElement = screen.getByText('Test Content');
    expect(stackElement).toHaveClass('wrap-sm-nowrap');
    expect(stackElement).toHaveClass('wrap-md-wrap');
  });

  it('should render with a custom component', () => {
    render(<Stack as="section">Test Content</Stack>);

    const stackElement = screen.getByText('Test Content');
    expect(stackElement.tagName).toBe('SECTION');
  });

  it('should merge custom className with the default ones', () => {
    render(<Stack className="custom-class">Test Content</Stack>);

    const stackElement = screen.getByText('Test Content');
    expect(stackElement).toHaveClass('stack');
    expect(stackElement).toHaveClass('custom-class');
  });

  it('should handle multiple responsive props', () => {
    render(
      <Stack
        wrap={{ sm: 'nowrap', lg: 'wrap' }}
        direction={{ sm: 'vertical', md: 'horizontal' }}
        justifyContent="center"
        alignItems="stretch"
        spacing={6}>Test Content
      </Stack>
    );

    const stackElement = screen.getByText('Test Content');
    // Check for the correct responsive and static classes
    expect(stackElement).toHaveClass('wrap-sm-nowrap');
    expect(stackElement).toHaveClass('wrap-lg-wrap');
    expect(stackElement).toHaveClass('direction-sm-vertical');
    expect(stackElement).toHaveClass('direction-md-horizontal');
    expect(stackElement).toHaveClass('justifyContent-center');
    expect(stackElement).toHaveClass('alignItems-stretch');
    expect(stackElement).toHaveClass('spacing-6');
  });
});