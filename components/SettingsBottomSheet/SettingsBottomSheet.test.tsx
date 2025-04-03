import App from "components/App";
import { render } from "@/utils/test-utils";
import createMatchMedia from "@/utils/createMatchMedia";
import { screen, fireEvent } from "@testing-library/react";

describe("SettingsBottomSheet", () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth);
  });

  test("renders SettingsBottomSheet component", () => {
    render(<App />);

    const settingsButton = screen.getByRole("tab", { name: /settings/i });
    fireEvent.click(settingsButton);

    expect(screen.getByTestId("settings-bottom-sheet")).toBeInTheDocument();

    expect(screen.getByRole("tab", { name: /tone mapping/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /toasts/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /camera/i })).toBeInTheDocument();

    expect(screen.getByRole("tabpanel", { name: /tone mapping/i })).not.toHaveClass("tabPanelHidden");
    expect(screen.getByRole("tabpanel", { name: /toasts/i })).toHaveClass("tabPanelHidden");
    expect(screen.getByRole("tabpanel", { name: /camera/i })).toHaveClass("tabPanelHidden");
  });

  test("switches tabs correctly", () => {
    render(<App />);

    const settingsButton = screen.getByRole("tab", { name: /settings/i });
    fireEvent.click(settingsButton);

    expect(screen.getByRole("tabpanel", { name: /tone mapping/i })).not.toHaveClass("tabPanelHidden");
    expect(screen.getByRole("tabpanel", { name: /toasts/i })).toHaveClass("tabPanelHidden");
    expect(screen.getByRole("tabpanel", { name: /camera/i })).toHaveClass("tabPanelHidden");

    fireEvent.click(screen.getByRole("tab", { name: /toasts/i }));

    expect(screen.getByRole("tabpanel", { name: /tone mapping/i })).toHaveClass("tabPanelHidden");
    expect(screen.getByRole("tabpanel", { name: /toasts/i })).not.toHaveClass("tabPanelHidden");
    expect(screen.getByRole("tabpanel", { name: /camera/i })).toHaveClass("tabPanelHidden");
  });

  test("should open the tone mapping bottom sheet", () => {
    render(<App />);

    const settingsButton = screen.getByRole("tab", { name: /settings/i });
    fireEvent.click(settingsButton);

    fireEvent.click(screen.getByRole("button", { name: "Tone mapping" }));
    expect(screen.getByTestId("tone-mapping-bottom-sheet")).toBeInTheDocument();
  });

  test("should open the tone mapping exposure bottom sheet", () => {
    render(<App />);

    const settingsButton = screen.getByRole("tab", { name: /settings/i });
    fireEvent.click(settingsButton);

    fireEvent.click(screen.getByRole("button", { name: "Tone mapping exposure" }));
    expect(screen.getByTestId("tone-mapping-exposure-bottom-sheet")).toBeInTheDocument();
  });

  test("should open the camera fov bottom sheet", () => {
    render(<App />);

    const settingsButton = screen.getByRole("tab", { name: /settings/i });
    fireEvent.click(settingsButton);

    fireEvent.click(screen.getByRole("button", { name: /field of view/i }));
    expect(screen.getByTestId("camera-fov-bottom-sheet")).toBeInTheDocument();
  });

  test("should open the camera moving bottom sheet", () => {
    render(<App />);

    const settingsButton = screen.getByRole("tab", { name: /settings/i });
    fireEvent.click(settingsButton);

    fireEvent.click(screen.getByRole("button", { name: /moving of camera/i }));
    expect(screen.getByTestId("camera-moving-bottom-sheet")).toBeInTheDocument();
  });
});