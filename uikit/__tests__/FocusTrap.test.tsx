import FocusTrap from "../FocusTrap";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

describe("FocusTrap", () => {
  it("should autofocus the first focusable element", () => {
    render(
      <FocusTrap>
        <button>Button 1</button>
        <button>Button 2</button>
      </FocusTrap>
    );

    expect(screen.getByText("Button 1")).toHaveFocus();
  });

  it("should trap focus within the container", async () => {
    const user = userEvent.setup();
    render(
      <FocusTrap>
        <button>Button 1</button>
        <button>Button 2</button>
      </FocusTrap>
    );

    const button1 = screen.getByText("Button 1");
    const button2 = screen.getByText("Button 2");

    await user.tab();
    expect(button2).toHaveFocus();

    await user.tab();
    expect(button1).toHaveFocus();
  });

  it("should restore focus when unmounting", async () => {
    const { rerender } = render(
      <div>
        <button>Outside</button>
      </div>
    );

    const outsideButton = screen.getByText("Outside");
    outsideButton.focus();
    expect(outsideButton).toHaveFocus();

    rerender(
      <div>
        <button>Outside</button>
        <FocusTrap>
          <button>Inside</button>
        </FocusTrap>
      </div>
    );

    const insideButton = screen.getByText("Inside");
    expect(insideButton).toHaveFocus();

    rerender(
      <div>
        <button>Outside</button>
      </div>
    );

    expect(outsideButton).toHaveFocus();
  });
});
