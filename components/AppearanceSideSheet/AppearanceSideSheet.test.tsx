import App from "components/App";
import { render } from "@/utils/test-utils";
import createMatchMedia from "@/utils/createMatchMedia";
import { screen, fireEvent } from "@testing-library/react";

describe("AppearanceSideSheet", () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth);
  });

  it("renders correctly when opened", () => {
    render(<App />);

    const appearanceButton = screen.getByRole("button", { name: /appearance/i });
    fireEvent.click(appearanceButton);

    expect(screen.getByTestId("show-markers-switch")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /small/i })).toBeChecked();
    expect(screen.getByRole("radio", { name: /regular/i })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: /large/i })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: /auto/i })).toBeChecked();
    expect(screen.getByRole("radio", { name: /light/i })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: /dark/i })).not.toBeChecked();
  });

  it('should switch show markers', () => {
    render(<App />);

    const appearanceButton = screen.getByRole("button", { name: /appearance/i });
    fireEvent.click(appearanceButton);

    const showMarkersSwitch = screen.queryByTestId("show-markers-switch") as HTMLInputElement;
    expect(showMarkersSwitch).not.toBeChecked();
    fireEvent.click(showMarkersSwitch);
    expect(showMarkersSwitch).toBeChecked();
  });

  it('should change marker size', () => {
    render(<App />);

    const appearanceButton = screen.getByRole("button", { name: /appearance/i });
    fireEvent.click(appearanceButton);

    const largeOption = screen.getByRole("radio", { name: /large/i });

    expect(largeOption).not.toBeChecked();
    fireEvent.click(largeOption);
    expect(largeOption).toBeChecked();
  });

  it('should change theme', () => {
    render(<App />);

    const appearanceButton = screen.getByRole("button", { name: /appearance/i });
    fireEvent.click(appearanceButton);

    const darkThemeOption = screen.getByRole("radio", { name: /dark/i });

    expect(darkThemeOption).not.toBeChecked();
    fireEvent.click(darkThemeOption);
    expect(darkThemeOption).toBeChecked();
  });
});