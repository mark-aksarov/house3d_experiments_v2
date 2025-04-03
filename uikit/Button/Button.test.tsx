import { PlusIcon } from 'lucide-react';
import Button from './Button';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Button Component', () => {
  it('renders Button component', () => {
    render(
      <Button>
        Click Me
      </Button>
    );

    const button = screen.getByRole('button', { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button');
    expect(button).toHaveClass('regular');
    expect(button).toHaveClass('solid');
    expect(button).toHaveClass('brand');
    expect(button).toHaveTextContent('Click Me');
  });

  it('renders as an anchor element when "as" is set to "a"', () => {
    render(
      <Button
        as="a"
        href="https://example.com"
        target="_blank"
        size="regular"
        variant="solid"
        color="brand"
      >
        Link
      </Button>
    );

    const link = screen.getByRole('link', { name: /link/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('applies custom class names', () => {
    render(
      <Button
        className="custom-class"
        size="regular"
        variant="solid"
        color="brand"
      >
        Click Me
      </Button>
    );
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass('custom-class');
  });

  it('triggers onClick handler when clicked', () => {
    const onClick = jest.fn();
    render(
      <Button size="regular" variant="solid" color="brand" onClick={onClick}>
        Click Me
      </Button>
    );
    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies styles based on size, variant, and color props', () => {
    render(
      <Button size="small" variant="outlined" color="danger">
        Styled Button
      </Button>
    );
    const button = screen.getByRole('button', { name: /styled button/i });
    expect(button).toHaveClass('small');
    expect(button).toHaveClass('outlined');
    expect(button).toHaveClass('danger');
  });

  it('renders children correctly', () => {
    render(
      <Button size="regular" variant="solid" color="brand">
        Test Content
      </Button>
    );
    expect(screen.getByText(/test content/i)).toBeInTheDocument();
  });

  it("renders iconStart when provided", () => {
    const { container } = render(
      <Button iconStart={<PlusIcon data-testid="icon-start" />}>
        Click Me
      </Button>
    );
    expect(container.querySelector("[data-testid='icon-start']")).toBeInTheDocument();
  });

  it("renders iconEnd when provided", () => {
    const { container } = render(
      <Button iconEnd={<PlusIcon data-testid="icon-end" />}>
        Click Me
      </Button>
    );
    expect(container.querySelector("[data-testid='icon-end']")).toBeInTheDocument();
  });

  it("renders both iconStart and iconEnd", () => {
    const { container } = render(
      <Button
        iconStart={<PlusIcon data-testid="icon-start" />}
        iconEnd={<PlusIcon data-testid="icon-end" />}
      >
        Click Me
      </Button>
    );
    expect(container.querySelector("[data-testid='icon-start']")).toBeInTheDocument();
    expect(container.querySelector("[data-testid='icon-end']")).toBeInTheDocument();
  });
});