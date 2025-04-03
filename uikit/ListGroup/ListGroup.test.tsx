import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListGroup from "./ListGroup";
import ListItem from "./ListItem";

// Test for ListGroup
describe("ListGroup", () => {
  it("renders correctly with default props", () => {
    render(
      <ListGroup>
        <li>Item 1</li>
        <li>Item 2</li>
      </ListGroup>
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("allows custom class names", () => {
    const { container } = render(
      <ListGroup className="custom-class">
        <li>Item</li>
      </ListGroup>
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders with different elements using as prop", () => {
    const { container } = render(
      <ListGroup as="div">
        <span>Item</span>
      </ListGroup>
    );
    expect(container!.firstChild!.nodeName).toBe("DIV");
  });
});

// Test for ListItem
describe("ListItem", () => {
  it("renders with default size", () => {
    render(<ListItem>Item Text</ListItem>);
    expect(screen.getByText("Item Text")).toBeInTheDocument();
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<ListItem size="large">Large Text</ListItem>);
    expect(screen.getByText("Large Text")).toBeInTheDocument();

    rerender(<ListItem size="small">Small Text</ListItem>);
    expect(screen.getByText("Small Text")).toBeInTheDocument();
  });
});

describe("ListItem", () => {
  it("renders as a link when href is provided", () => {
    render(<ListItem href="/test">Link Item</ListItem>);
    const linkElement = screen.getByRole("link", { name: "Link Item" });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/test");
  });

  it("renders as a button when onClick is provided", async () => {
    const handleClick = jest.fn();
    render(<ListItem onClick={handleClick}>Clickable Item</ListItem>);
    const buttonElement = screen.getByRole("button", { name: "Clickable Item" });
    expect(buttonElement).toBeInTheDocument();
    await userEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});