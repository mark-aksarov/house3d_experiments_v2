import React from 'react';
import Sheet from './Sheet';
import SheetBody from './SheetBody';
import SheetHeader from './SheetHeader';
import { ButtonSize } from 'uikit/Button';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock createPortal
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (element: React.ReactNode) => element,
}));

describe('Sheet', () => {
  const onCloseMock = jest.fn();

  afterEach(() => {
    onCloseMock.mockClear();
  });

  it('should render when open is true', () => {
    render(
      <Sheet open={true} onClose={onCloseMock}>
        <SheetHeader>Header Content</SheetHeader>
        <SheetBody>Body Content</SheetBody>
      </Sheet>
    );

    expect(screen.getByText('Header Content')).toBeInTheDocument();
    expect(screen.getByText('Body Content')).toBeInTheDocument();
  });

  it('should not render when open is false', () => {
    render(
      <Sheet open={false} onClose={onCloseMock}>
        <SheetHeader>Header Content</SheetHeader>
        <SheetBody>Body Content</SheetBody>
      </Sheet>
    );

    expect(screen.queryByText('Header Content')).not.toBeInTheDocument();
    expect(screen.queryByText('Body Content')).not.toBeInTheDocument();
  });

  it('should call onClose when the close button is clicked', () => {
    render(
      <Sheet open={true} onClose={onCloseMock}>
        <SheetHeader>Header Content</SheetHeader>
        <SheetBody>Body Content</SheetBody>
      </Sheet>
    );

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when the escape key is pressed', () => {
    render(
      <Sheet open={true} onClose={onCloseMock}>
        <SheetHeader>Header Content</SheetHeader>
        <SheetBody>Body Content</SheetBody>
      </Sheet>
    );

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should close when clicking outside the Sheet', () => {
    render(
      <Sheet open={true} onClose={onCloseMock}>
        <SheetHeader>Header Content</SheetHeader>
        <SheetBody>Body Content</SheetBody>
      </Sheet>
    );

    fireEvent.pointerDown(document);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it.each(new Array<ButtonSize>('small', 'regular', 'large'))(
    'render close button with given "%s" size',
    (size) => {
      render(
        <Sheet open={true} onClose={onCloseMock}>
          <SheetHeader closeButtonSize={size}>Header Content</SheetHeader>
          <SheetBody>Body Content</SheetBody>
        </Sheet>
      );

      const closeButton = screen.queryByLabelText(/close/i);

      expect(closeButton).toHaveClass("sheetCloseButton", size);
    },
  );
});