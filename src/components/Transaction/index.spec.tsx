import { render, screen } from '@testing-library/react';
import Transaction from './index.tsx';

const mockTransaction = {
  id: 1,
  description: 'Test Transaction 1',
  amount: 10000,
  date: new Date('2021-01-02'),
};

describe('Transaction Component', () => {
  test('renders transaction details correctly', () => {
    render(<Transaction {...mockTransaction} />);
    
    expect(screen.getByText(/#1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Transaction 1/i)).toBeInTheDocument();
    expect(screen.getByText(/\$10,000.00/i)).toBeInTheDocument();
    expect(screen.getByText(/created at/i)).toBeInTheDocument();
    expect(screen.getByText(/fri jan 01 2021/i)).toBeInTheDocument();
  });
});
