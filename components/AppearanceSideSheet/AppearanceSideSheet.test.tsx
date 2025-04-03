import App from "components/App";
import { mockedRenderer, render } from "@/utils/test-utils";
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
    expect(screen.getByTestId("outline-color-toggle-button-group")).toBeInTheDocument();
    expect(screen.getByTestId("outline-edge-strength-range-input")).toBeInTheDocument();
    expect(screen.getByTestId("outline-edge-glow-range-input")).toBeInTheDocument();
    expect(screen.getByTestId("outline-edge-thickness-range-input")).toBeInTheDocument();
    expect(screen.getByTestId("outline-pulse-period-range-input")).toBeInTheDocument();
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

  it('should change outline color', () => {
    render(<App />);

    const appearanceButton = screen.getByRole("button", { name: /appearance/i });
    fireEvent.click(appearanceButton);

    const whiteButtons = screen.getAllByRole("button", { name: /white/i });
    expect(whiteButtons[0]).not.toHaveClass("active");
    fireEvent.click(whiteButtons[0]);
    expect(whiteButtons[0]).toHaveClass("active");
  });

  it('should change outline edge strength', () => {
    render(<App />);

    const appearanceButton = screen.getByRole("button", { name: /appearance/i });
    fireEvent.click(appearanceButton);

    const input = screen.queryByTestId("outline-edge-strength-range-input") as HTMLInputElement;

    mockedRenderer.render.mockClear();
    fireEvent.change(input, { target: { value: "2.5" } });

    //expect(mockedRenderer.render).toHaveBeenCalledTimes(1);
    expect(input.value).toBe("2.5");
  });

  it('should change outline edge glow', () => {
    render(<App />);

    const appearanceButton = screen.getByRole("button", { name: /appearance/i });
    fireEvent.click(appearanceButton);

    const input = screen.queryByTestId("outline-edge-glow-range-input") as HTMLInputElement;

    mockedRenderer.render.mockClear();
    fireEvent.change(input, { target: { value: "0.8" } });

    //expect(mockedRenderer.render).toHaveBeenCalledTimes(1);
    expect(input.value).toBe("0.8");
  });

  it('should change outline edge thickness', () => {
    render(<App />);

    const appearanceButton = screen.getByRole("button", { name: /appearance/i });
    fireEvent.click(appearanceButton);

    const input = screen.queryByTestId("outline-edge-thickness-range-input") as HTMLInputElement;

    mockedRenderer.render.mockClear();
    fireEvent.change(input, { target: { value: "0.7" } });

    //expect(mockedRenderer.render).toHaveBeenCalledTimes(1);
    expect(input.value).toBe("0.7");
  });

  it('should change outline pulse period', () => {
    render(<App />);

    const appearanceButton = screen.getByRole("button", { name: /appearance/i });
    fireEvent.click(appearanceButton);

    const input = screen.queryByTestId("outline-pulse-period-range-input") as HTMLInputElement;

    mockedRenderer.render.mockClear();
    fireEvent.change(input, { target: { value: "3" } });

    //expect(mockedRenderer.render).toHaveBeenCalledTimes(1);
    expect(input.value).toBe("3");
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