import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './index.tsx';

describe('Modal Component', () => {
  const mockClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders modal when isOpen is true', () => {
    render(
      <Modal
        title="Test Title"
        description="Test Description"
        isOpen={true}
        close={mockClose}
      />
    );

    expect(screen.getByText(/test title/i)).toBeInTheDocument();
    expect(screen.getByText(/test description/i)).toBeInTheDocument();
  });

  test('does not render modal when isOpen is false', () => {
    render(
      <Modal
        title="Test Title"
        description="Test Description"
        isOpen={false}
        close={mockClose}
      />
    );

    expect(screen.queryByText(/test title/i)).not.toBeInTheDocument();
  });

  test('calls close function when close button is clicked', () => {
    render(
      <Modal
        title="Test Title"
        description="Test Description"
        isOpen={true}
        close={mockClose}
      />
    );

    const closeButton = screen.getByText('X');
    fireEvent.click(closeButton);

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  test('calls close function when background is clicked', () => {
    render(
      <Modal
        title="Test Title"
        description="Test Description"
        isOpen={true}
        close={mockClose}
      />
    );

    const background = screen.getByText(/test title/i).closest('div');

    if (background) {
      fireEvent.click(background);
      expect(mockClose).toHaveBeenCalledTimes(1);
    } else {
      throw new Error('Background element not found');
    }
  });
});
