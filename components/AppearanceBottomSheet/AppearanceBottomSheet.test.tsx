import App from "@/components/App";
import { render } from "@/utils/test-utils";
import createMatchMedia from "@/utils/createMatchMedia";
import { screen, fireEvent } from "@testing-library/react";

describe("AppearanceBottomSheet", () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth);
  });

  test("renders AppearanceBottomSheet component", () => {
    render(<App />);

    const appearanceButton = screen.getByRole("tab", { name: /appearance/i });
    fireEvent.click(appearanceButton);

    expect(screen.getByTestId("appearance-bottom-sheet")).toBeInTheDocument();

    expect(screen.getByRole("tab", { name: /theme/i })).toBeInTheDocument();

    expect(screen.getByRole("tabpanel", { name: /theme/i })).toHaveClass("tabPanelHidden");
  });

  test("switches tabs correctly", () => {
    render(<App />);

    const appearanceButton = screen.getByRole("tab", { name: /appearance/i });
    fireEvent.click(appearanceButton);

    expect(screen.getByRole("tabpanel", { name: /theme/i })).toHaveClass("tabPanelHidden");

    fireEvent.click(screen.getByRole("tab", { name: /theme/i }));

    expect(screen.getByRole("tabpanel", { name: /theme/i })).not.toHaveClass("tabPanelHidden");
  });
});