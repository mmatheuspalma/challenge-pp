import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './index.tsx';

describe('Pagination Component', () => {
  const mockGoToTransactionPage = jest.fn();
  const mockGoToPreviousTransactionPage = jest.fn();
  const mockGoToNextTransactionPage = jest.fn();
  
  const setup = (props = {}) => {
    const defaultProps = {
      transactionPage: 1,
      transactionTotalPages: 5,
      goToTransactionPage: mockGoToTransactionPage,
      canGoToTransactionPage: () => true,
      goToPreviousTransactionPage: mockGoToPreviousTransactionPage,
      canGoToPreviousTransactionPage: true,
      goToNextTransactionPage: mockGoToNextTransactionPage,
      canGoToNextTransactionPage: true,
      ...props,
    };

    render(<Pagination {...defaultProps} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders pagination with pages', () => {
    setup();
    
    expect(screen.getByText(/previous/i)).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/2/i)).toBeInTheDocument();
    expect(screen.getByText(/3/i)).toBeInTheDocument();
    expect(screen.getByText(/4/i)).toBeInTheDocument();
    expect(screen.getByText(/5/i)).toBeInTheDocument();
    expect(screen.getByText(/next/i)).toBeInTheDocument();
  });

  test('goToTransactionPage called with page number', () => {
    setup();

    const page2Button = screen.getByText(/2/i);
    fireEvent.click(page2Button);

    expect(mockGoToTransactionPage).toHaveBeenCalledWith(2);
  });

  test('calls goToPreviousTransactionPage', () => {
    setup();

    const previousButton = screen.getByText(/previous/i);
    fireEvent.click(previousButton);

    expect(mockGoToPreviousTransactionPage).toHaveBeenCalled();
  });

  test('calls goToNextTransactionPage', () => {
    setup();

    const nextButton = screen.getByText(/next/i);
    fireEvent.click(nextButton);

    expect(mockGoToNextTransactionPage).toHaveBeenCalled();
  });
});
