import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageButton, { ImageButtonSize } from './ImageButton';

describe('ImageButton Component', () => {
  const renderComponent = (props = {}) => {
    const defaultProps = {
      size: 'large' as ImageButtonSize,
      label: 'Test Label',
      image: <img alt="test-image" src="test.png" />,
      onClick: jest.fn(),
      ...props,
    };

    return render(<ImageButton {...defaultProps} />);
  };

  it('renders the component with the correct label and image', () => {
    renderComponent();

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByAltText('test-image')).toBeInTheDocument();
  });

  it('applies the correct size class', () => {
    const { container } = renderComponent({ size: 'small' });

    expect(container.firstChild?.childNodes[0]).toHaveClass('small');
  });

  it('calls onClick handler when clicked', async () => {
    const onClickMock = jest.fn();
    renderComponent({ onClick: onClickMock });

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});