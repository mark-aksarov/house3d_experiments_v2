import { useRef } from "react";
import useOnClickOutside from "../useOnClickOutside";
import { render, fireEvent } from "@testing-library/react";

describe("useOnClickOutside", () => {
  it("should call callback when clicking outside the referenced element", () => {
    const callback = jest.fn();
    function TestComponent() {
      const ref = useRef(null);
      useOnClickOutside({ ref, callback });
      return (
        <div>
          <div ref={ref} data-testid="inside">Inside</div>
          <div data-testid="outside">Outside</div>
        </div>
      );
    }

    const { getByTestId } = render(<TestComponent />);
    fireEvent.pointerDown(getByTestId("outside"));
    expect(callback).toHaveBeenCalledTimes(1);

    fireEvent.pointerDown(getByTestId("inside"));
    expect(callback).toHaveBeenCalledTimes(1); // Should not be called again
  });
});
