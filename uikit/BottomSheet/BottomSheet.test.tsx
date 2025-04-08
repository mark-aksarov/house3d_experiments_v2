import React from "react";
import BottomSheet from "./BottomSheet";
import { ButtonSize } from "uikit/Button";
import { SheetBody, SheetHeader } from "../Sheet";
import { render, screen } from "@testing-library/react";

describe("BottomSheet component", () => {
  it("renders the BottomSheet component", () => {
    render(
      <BottomSheet open={true} onClose={() => { }}>
        <SheetHeader>
          Header Content
        </SheetHeader>
        <SheetBody>
          Body Content
        </SheetBody>
      </BottomSheet>
    )

    const bottomSheet = screen.getByRole("dialog");
    const backButton = screen.queryByLabelText('Back button');

    expect(bottomSheet).toBeInTheDocument();
    expect(backButton).not.toBeInTheDocument();
  });

  it("should render back button when onBackButtonClick is given", () => {
    render(
      <BottomSheet open={true} onClose={() => { }}>
        <SheetHeader onBackButtonClick={() => { }}>
          Header Content
        </SheetHeader>
        <SheetBody>
          Body Content
        </SheetBody>
      </BottomSheet>
    )

    const backButton = screen.queryByLabelText('Back button');

    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveClass('regular');
  });

  it.each(new Array<ButtonSize>('small', 'regular', 'large'))(
    'render back button with given "%s" size',
    (size) => {
      render(
        <BottomSheet open={true} onClose={() => { }}>
          <SheetHeader closeButtonSize={size} onBackButtonClick={() => { }}>
            Header Content
          </SheetHeader>
          <SheetBody>
            Body Content
          </SheetBody>
        </BottomSheet>
      )

      const backButton = screen.queryByLabelText('Back button');

      expect(backButton).toHaveClass("prevSheetButton", size);
    },
  );
});