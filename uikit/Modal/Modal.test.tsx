import Modal, { ModalSize } from './Modal';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';
import { ButtonSize } from 'uikit/Button';
import { TypographyVariant } from 'uikit/Typography/Typography';

describe('Modal', () => {
  it('should render modal', async () => {
    render(
      <Modal open={true} onOpenChange={() => true}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>Modal Content</ModalBody>
        <ModalFooter>Modal Footer</ModalFooter>
      </Modal>
    );
    await act(async () => { }); // Flush microtasks.

    // Ensure the modal is open initially
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText('Modal Title')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByText('Modal Footer')).toBeInTheDocument();
  });

  it("closes the Modal when pressing Escape", async () => {
    const onOpenChange = jest.fn();
    render(
      <Modal open={true} onOpenChange={onOpenChange}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>Modal Content</ModalBody>
        <ModalFooter>Modal Footer</ModalFooter>
      </Modal>
    );
    await act(async () => { }); // Flush microtasks.

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Press Escape
    const user = userEvent.setup();
    await user.keyboard('[Escape]');

    // Modal should be closed
    expect(onOpenChange.mock.calls).toHaveLength(1);
  });

  it('should not display modal when open is false', () => {
    render(
      <Modal open={false} onOpenChange={() => true}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>Modal Content</ModalBody>
        <ModalFooter>Modal Footer</ModalFooter>
      </Modal>
    );

    // Ensure the modal is not rendered when open is false
    expect(screen.queryByText('Modal Title')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal Footer')).not.toBeInTheDocument();
  });

  it('should re-render modal when open state changes', async () => {
    const onOpenChange = jest.fn();
    const { rerender } = render(
      <Modal open={false} onOpenChange={onOpenChange}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>Modal Content</ModalBody>
        <ModalFooter>Modal Footer</ModalFooter>
      </Modal>
    );

    // Initially, the modal is closed
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // Re-render with open set to true
    rerender(
      <Modal open={true} onOpenChange={onOpenChange}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>Modal Content</ModalBody>
        <ModalFooter>Modal Footer</ModalFooter>
      </Modal>
    );

    // Verify that the modal is rendered
    expect(screen.getByText('Modal Title')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByText('Modal Footer')).toBeInTheDocument();
  });

  it.each(new Array<ModalSize>('small', 'regular', 'large'))(
    'render modal with given "%s" size',
    (size) => {
      render(
        <Modal open={true} size={size} onOpenChange={() => true}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>Modal Content</ModalBody>
          <ModalFooter>Modal Footer</ModalFooter>
        </Modal>
      );

      expect(screen.getByRole("dialog").children[0]).toHaveClass(size);
    },
  );

  it.each(new Array<ButtonSize>('small', 'regular', 'large'))(
    'render modal close button with given "%s" size',
    (size) => {
      render(
        <Modal open={true} onOpenChange={() => true}>
          <ModalHeader closeButtonSize={size}>
            Modal Title
          </ModalHeader>
          <ModalBody>Modal Content</ModalBody>
          <ModalFooter>Modal Footer</ModalFooter>
        </Modal>
      );

      expect(screen.getByRole("button", { name: /close/i })).toHaveClass(size);
    },
  );

  it.each(new Array<TypographyVariant>(
    'display1', 'display2', 'header1', 'header2', 'header3', 'header4', 'header5', 'header6', 'body1', 'body2', 'body3', 'body4',
  ))(
    'render modal header title with given "%s" variant',
    (variant) => {
      render(
        <Modal open={true} onOpenChange={() => true}>
          <ModalHeader titleVariant={variant}>
            Modal Title
          </ModalHeader>
          <ModalBody>Modal Content</ModalBody>
          <ModalFooter>Modal Footer</ModalFooter>
        </Modal>
      );

      expect(screen.getByRole("heading", { name: /Modal Title/i })).toHaveClass(variant);
    },
  );
});