import React from "react";
import Link from "./Link";
import { render, screen } from "@testing-library/react";

describe("Link component", () => {
  it("renders the Link component with default props", () => {
    render(
      <Link href="https://example.com" size="regular">
        Regular Link
      </Link>
    );

    const link = screen.getByRole("link", { name: /regular link/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveClass("link", "regular");
  });

  it("renders the Link component with small size", () => {
    render(
      <Link href="https://example.com" size="small">
        Small Link
      </Link>
    );

    const link = screen.getByRole("link", { name: /small link/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveClass("link", "small");
  });

  it("applies additional className", () => {
    render(
      <Link href="https://example.com" size="regular" className="custom-class">
        Custom Link
      </Link>
    );

    const link = screen.getByRole("link", { name: /custom link/i });

    expect(link).toHaveClass("link", "regular", "custom-class");
  });
});