import React from 'react';
import { render, screen } from '@testing-library/react';
import Typography from './Typography';

describe('Typography Component', () => {
  it('renders the correct HTML element based on the "as" prop', () => {
    render(
      <Typography variant="header1" as="h1">
        Test Header
      </Typography>
    );

    const element = screen.getByText('Test Header');
    expect(element.tagName).toBe('H1');
  });

  it('applies the correct variant class based on the "variant" prop', () => {
    render(
      <Typography variant="body1">
        Body Text
      </Typography>
    );

    const element = screen.getByText('Body Text');
    expect(element).toHaveClass('body1');
  });

  it('merges custom class names with variant classes', () => {
    render(
      <Typography variant="body2" className="custom-class">
        Body Text
      </Typography>
    );

    const element = screen.getByText('Body Text');
    expect(element).toHaveClass('body2');
    expect(element).toHaveClass('custom-class');
  });

  it('renders children correctly', () => {
    render(
      <Typography variant="header3">
        <span>Child Text</span>
      </Typography>
    );

    const child = screen.getByText('Child Text');
    expect(child).toBeInTheDocument();
  });

  it('passes additional props to the rendered element', () => {
    render(
      <Typography variant="display1" data-testid="typography-test">
        Display Text
      </Typography>
    );

    const element = screen.getByTestId('typography-test');
    expect(element).toBeInTheDocument();
  });
});