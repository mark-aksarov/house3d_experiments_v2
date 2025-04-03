import App from "components/App";
import createMatchMedia from "@/utils/createMatchMedia";
import { screen, fireEvent } from "@testing-library/react";
import { mockedRenderer, render } from "@/utils/test-utils";

describe("SettingsSideSheet", () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth);
  });

  it("renders correctly when opened", () => {
    render(<App />);

    const settingsButton = screen.getByRole("button", { name: /settings/i });
    fireEvent.click(settingsButton);

    expect(screen.getByRole("radio", { name: /linear/i })).toBeChecked();
    expect(screen.getByRole("radio", { name: /reinhard/i })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: /cineon/i })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: /aces filmic/i })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: /agx/i })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: /neutral/i })).not.toBeChecked();
    expect(screen.getByTestId("tone-mapping-exposure-range-input")).toBeInTheDocument();
    expect(screen.getByTestId("show-toasts-switch")).toBeInTheDocument();
    expect(screen.getByTestId("camera-fov-range-input")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /immediately/i })).toBeChecked();
    expect(screen.getByRole("radio", { name: /smoothly/i })).not.toBeChecked();
  });

  it('should change tone mapping', () => {
    render(<App />);

    const settingsButton = screen.getByRole("button", { name: /settings/i });
    fireEvent.click(settingsButton);

    const reinhardOption = screen.getByRole("radio", { name: /reinhard/i });

    expect(reinhardOption).not.toBeChecked();
    fireEvent.click(reinhardOption);
    expect(reinhardOption).toBeChecked();
  });

  it('should change tone mapping exposure', () => {
    render(<App />);

    const settingsButton = screen.getByRole("button", { name: /settings/i });
    fireEvent.click(settingsButton);

    const input = screen.queryByTestId("tone-mapping-exposure-range-input") as HTMLInputElement;

    mockedRenderer.render.mockClear();
    fireEvent.change(input, { target: { value: "0.9" } });

    expect(mockedRenderer.render).toHaveBeenCalledTimes(1);
    expect(input.value).toBe("0.9");
  });

  it('should switch show toast', () => {
    render(<App />);

    const settingsButton = screen.getByRole("button", { name: /settings/i });
    fireEvent.click(settingsButton);

    const showToastsSwitch = screen.queryByTestId("show-toasts-switch") as HTMLInputElement;
    expect(showToastsSwitch).toBeChecked();
    fireEvent.click(showToastsSwitch);
    expect(showToastsSwitch).not.toBeChecked();
  });

  it('should change camera fov', () => {
    render(<App />);

    const settingsButton = screen.getByRole("button", { name: /settings/i });
    fireEvent.click(settingsButton);

    const input = screen.queryByTestId("camera-fov-range-input") as HTMLInputElement;

    mockedRenderer.render.mockClear();
    fireEvent.change(input, { target: { value: "70" } });

    expect(mockedRenderer.render).toHaveBeenCalledTimes(1);
    expect(input.value).toBe("70");
  });

  it('should change moving of camera', () => {
    render(<App />);

    const settingsButton = screen.getByRole("button", { name: /settings/i });
    fireEvent.click(settingsButton);

    const smoothlyOption = screen.getByRole("radio", { name: /smoothly/i });

    expect(smoothlyOption).not.toBeChecked();
    fireEvent.click(smoothlyOption);
    expect(smoothlyOption).toBeChecked();
  });
});