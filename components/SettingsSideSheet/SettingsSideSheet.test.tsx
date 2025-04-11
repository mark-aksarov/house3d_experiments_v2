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

    expect(screen.getByRole("radio", { name: /linear/i })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: /reinhard/i })).toBeChecked();
    expect(screen.getByRole("radio", { name: /cineon/i })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: /aces filmic/i })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: /agx/i })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: /neutral/i })).not.toBeChecked();
    expect(screen.getByTestId("tone-mapping-exposure-range-input")).toBeInTheDocument();
    expect(screen.getByTestId("show-toasts-switch")).toBeInTheDocument();
    expect(screen.getByTestId("camera-fov-range-input")).toBeInTheDocument();
    expect(screen.getByTestId("shadows-enabled-switch")).toBeInTheDocument();
    expect(screen.getByTestId("ambient-light-intensity-range-input")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "1024x1024" })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: "2048x2048" })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: "4096x4096" })).toBeChecked();
  });

  it('should change tone mapping', () => {
    render(<App />);

    const settingsButton = screen.getByRole("button", { name: /settings/i });
    fireEvent.click(settingsButton);

    const reinhardOption = screen.getByRole("radio", { name: /linear/i });

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

  it('should switch shadows', () => {
    render(<App />);

    const settingsButton = screen.getByRole("button", { name: /settings/i });
    fireEvent.click(settingsButton);

    const shadowsSwitch = screen.queryByTestId("shadows-enabled-switch") as HTMLInputElement;
    expect(shadowsSwitch).toBeChecked();
    fireEvent.click(shadowsSwitch);
    expect(shadowsSwitch).not.toBeChecked();
  });

  it('should change ambient light intensity', () => {
    render(<App />);

    const settingsButton = screen.getByRole("button", { name: /settings/i });
    fireEvent.click(settingsButton);

    const input = screen.queryByTestId("ambient-light-intensity-range-input") as HTMLInputElement;

    mockedRenderer.render.mockClear();
    fireEvent.change(input, { target: { value: "2" } });

    expect(mockedRenderer.render).toHaveBeenCalledTimes(1);
    expect(input.value).toBe("2");
  });

  it('should change shadows resolution', () => {
    render(<App />);

    const settingsButton = screen.getByRole("button", { name: /settings/i });
    fireEvent.click(settingsButton);

    const resolution1024 = screen.queryByRole("radio", { name: "1024x1024" }) as HTMLInputElement;
    const resolution2048 = screen.queryByRole("radio", { name: "2048x2048" }) as HTMLInputElement;
    const resolution4096 = screen.queryByRole("radio", { name: "4096x4096" }) as HTMLInputElement;

    expect(resolution1024).not.toBeChecked();
    expect(resolution2048).not.toBeChecked();
    expect(resolution4096).toBeChecked();

    fireEvent.click(resolution1024);
    expect(resolution1024).toBeChecked();
    expect(resolution2048).not.toBeChecked();
    expect(resolution4096).not.toBeChecked();
  });
});