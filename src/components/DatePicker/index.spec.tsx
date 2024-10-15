import { render, screen } from '@testing-library/react';
import Datepicker from './index.tsx';

describe('Datepicker Component', () => {
  const mockOnChangeStartDate = jest.fn();
  const mockOnChangeEndDate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders start date picker', () => {
    render(
      <Datepicker
        startDate={new Date(2021, 0, 1)}
        onChangeStartDate={mockOnChangeStartDate}
      />
    );

    expect(screen.getByLabelText(/date from/i)).toBeInTheDocument();
  });

  test('renders end date picker when multiple is true', () => {
    render(
      <Datepicker
        startDate={new Date(2021, 0, 1)}
        endDate={new Date(2021, 0, 10)}
        onChangeStartDate={mockOnChangeStartDate}
        onChangeEndDate={mockOnChangeEndDate}
        multiple={true}
      />
    );

    expect(screen.getByLabelText(/date to/i)).toBeInTheDocument();
  });
});
