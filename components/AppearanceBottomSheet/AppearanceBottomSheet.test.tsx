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

    expect(screen.getByRole("tab", { name: /markers/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /outline/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /theme/i })).toBeInTheDocument();

    expect(screen.getByRole("tabpanel", { name: /markers/i })).not.toHaveClass("tabPanelHidden");
    expect(screen.getByRole("tabpanel", { name: /outline/i })).toHaveClass("tabPanelHidden");
    expect(screen.getByRole("tabpanel", { name: /theme/i })).toHaveClass("tabPanelHidden");
  });

  test("switches tabs correctly", () => {
    render(<App />);

    const appearanceButton = screen.getByRole("tab", { name: /appearance/i });
    fireEvent.click(appearanceButton);

    expect(screen.getByRole("tabpanel", { name: /markers/i })).not.toHaveClass("tabPanelHidden");
    expect(screen.getByRole("tabpanel", { name: /outline/i })).toHaveClass("tabPanelHidden");
    expect(screen.getByRole("tabpanel", { name: /theme/i })).toHaveClass("tabPanelHidden");

    fireEvent.click(screen.getByRole("tab", { name: /outline/i }));

    expect(screen.getByRole("tabpanel", { name: /markers/i })).toHaveClass("tabPanelHidden");
    expect(screen.getByRole("tabpanel", { name: /outline/i })).not.toHaveClass("tabPanelHidden");
    expect(screen.getByRole("tabpanel", { name: /theme/i })).toHaveClass("tabPanelHidden");
  });

  test("should open the marker size bottom sheet", () => {
    render(<App />);

    const appearanceButton = screen.getByRole("tab", { name: /appearance/i });
    fireEvent.click(appearanceButton);

    fireEvent.click(screen.getByRole("button", { name: /marker size/i }));
    expect(screen.getByTestId("marker-size-bottom-sheet")).toBeInTheDocument();
  });

  test("should open the outline color bottom sheet", () => {
    render(<App />);

    const appearanceButton = screen.getByRole("tab", { name: /appearance/i });
    fireEvent.click(appearanceButton);

    fireEvent.click(screen.getByRole("button", { name: /color/i }));
    expect(screen.getByTestId("outline-color-bottom-sheet")).toBeInTheDocument();
  });

  test("should open the outline edge strength bottom sheet", () => {
    render(<App />);

    const appearanceButton = screen.getByRole("tab", { name: /appearance/i });
    fireEvent.click(appearanceButton);

    fireEvent.click(screen.getByRole("button", { name: /edge strength/i }));
    expect(screen.getByTestId("outline-edge-strength-bottom-sheet")).toBeInTheDocument();
  });

  test("should open the outline edge glow bottom sheet", () => {
    render(<App />);

    const appearanceButton = screen.getByRole("tab", { name: /appearance/i });
    fireEvent.click(appearanceButton);

    fireEvent.click(screen.getByRole("button", { name: /edge glow/i }));
    expect(screen.getByTestId("outline-edge-glow-bottom-sheet")).toBeInTheDocument();
  });

  test("should open the outline edge thickness bottom sheet", () => {
    render(<App />);

    const appearanceButton = screen.getByRole("tab", { name: /appearance/i });
    fireEvent.click(appearanceButton);

    fireEvent.click(screen.getByRole("button", { name: /edge thickness/i }));
    expect(screen.getByTestId("outline-edge-thickness-bottom-sheet")).toBeInTheDocument();
  });

  test("should open the outline pulse period bottom sheet", () => {
    render(<App />);

    const appearanceButton = screen.getByRole("tab", { name: /appearance/i });
    fireEvent.click(appearanceButton);

    fireEvent.click(screen.getByRole("button", { name: /pulse period/i }));
    expect(screen.getByTestId("outline-pulse-period-bottom-sheet")).toBeInTheDocument();
  });
});