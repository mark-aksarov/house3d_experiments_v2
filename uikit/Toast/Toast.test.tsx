import '@testing-library/jest-dom';
import { ToastsProvider, useToasts } from './ToastsContext';
import { render, screen, fireEvent, act } from '@testing-library/react';

jest.useFakeTimers();

describe('Toasts', () => {
  function ToastTestComponent() {
    const { addToast } = useToasts();

    return (
      <button
        onClick={() => addToast({ id: 'test', title: 'Test Toast', message: 'This is a test', color: 'success' })}
      >
        Show Toast
      </button>
    );
  }

  function renderWithProvider(ui: React.ReactElement) {
    return render(
      <ToastsProvider autoCloseDuration={0}>
        {ui}
      </ToastsProvider>
    );
  }

  it('renders a toast when addToast is called', () => {
    renderWithProvider(<ToastTestComponent />);

    fireEvent.click(screen.getByText('Show Toast'));

    expect(screen.getByText('Test Toast')).toBeInTheDocument();
    expect(screen.getByText('This is a test')).toBeInTheDocument();
  });

  it('closes a toast after autoCloseDuration', async () => {
    renderWithProvider(<ToastTestComponent />);

    fireEvent.click(screen.getByText('Show Toast'));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.queryByText('Test Toast')).not.toBeInTheDocument();
  });

  it('closes a toast when close button is clicked', () => {
    renderWithProvider(<ToastTestComponent />);

    fireEvent.click(screen.getByText('Show Toast'));

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.queryByText('Test Toast')).not.toBeInTheDocument();
  });
});