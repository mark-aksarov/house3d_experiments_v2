import App from "components/App";
import { render } from "@/utils/test-utils";
import createMatchMedia from "@/utils/createMatchMedia";
import { screen, fireEvent } from "@testing-library/react";

describe("ViewpointSideSheet", () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth);
  });

  it("renders correctly when opened", () => {
    render(<App />);

    const viewpointButton = screen.getByRole("button", { name: /viewpoint/i });
    fireEvent.click(viewpointButton);

    expect(screen.getByTestId("viewpoint-toggle-button-group")).toBeInTheDocument();
  });

  it('should change viewpoint', () => {
    render(<App />);

    const viewpointButton = screen.getByRole("button", { name: /viewpoint/i });
    fireEvent.click(viewpointButton);

    const viewpoint3Buttons = screen.getAllByRole("button", { name: /viewpoint 3/i });
    expect(viewpoint3Buttons[0]).not.toHaveClass("active");
    fireEvent.click(viewpoint3Buttons[0]);
    expect(viewpoint3Buttons[0]).toHaveClass("active");
  });
});