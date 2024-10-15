import { render, screen } from '@testing-library/react';
import Summary from './index.tsx';

describe('Summary Component', () => {
  test('renders transaction summary correctly', () => {
    const transactionCount = 10;
    const transactionAmount = 2500;

    render(<Summary transactionCount={transactionCount} transactionAmount={transactionAmount} />);

    expect(screen.getByText(/total transactions/i)).toBeInTheDocument();
    expect(screen.getByText(/10/i)).toBeInTheDocument();
    expect(screen.getByText(/total amount/i)).toBeInTheDocument();
    expect(screen.getByText(/\$2,500.00/i)).toBeInTheDocument();
  });
});
