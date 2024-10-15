import { render, screen, fireEvent } from '@testing-library/react';
import Filter from './index.tsx';

describe('Filter Component', () => {
  const mockSetForcedApiError = jest.fn();
  const mockHandleTransactionSort = jest.fn();
  const mockHandleTransactionDateStart = jest.fn();
  const mockHandleTransactionDateEnd = jest.fn();
  const mockHandleTransactionPageSize = jest.fn();

  const defaultProps = {
    forcedApiError: false,
    transactionSortKey: 'date-asc',
    handleTransactionSort: mockHandleTransactionSort,
    setForcedApiError: mockSetForcedApiError,
    transactionDateStart: new Date(2021, 0, 1),
    handleTransactionDateStart: mockHandleTransactionDateStart,
    transactionDateEnd: new Date(2021, 0, 10),
    handleTransactionDateEnd: mockHandleTransactionDateEnd,
    transactionPageSize: 5,
    handleTransactionPageSize: mockHandleTransactionPageSize,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Filter component with initial values', () => {
    render(<Filter {...defaultProps} />);
    
    expect(screen.getByLabelText(/force error/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /sorting/i })).toHaveValue('date-asc');
    expect(screen.getByRole('combobox', { name: /page size/i })).toHaveValue('5');
  });

  test('calls setForcedApiError when button is clicked', () => {
    render(<Filter {...defaultProps} />);
    
    fireEvent.click(screen.getByLabelText(/force error/i));
    expect(mockSetForcedApiError).toHaveBeenCalledWith(true);
  });

  test('calls handleTransactionSort when sorting is changed', () => {
    render(<Filter {...defaultProps} />);
    
    fireEvent.change(screen.getByRole('combobox', { name: /sorting/i }), { target: { value: 'date-desc' } });
    expect(mockHandleTransactionSort).toHaveBeenCalled();
  });

  test('calls handleTransactionPageSize when page size is changed', () => {
    render(<Filter {...defaultProps} />);
    
    fireEvent.change(screen.getByRole('combobox', { name: /page size/i }), { target: { value: '10' } });
    expect(mockHandleTransactionPageSize).toHaveBeenCalled();
  });
});
