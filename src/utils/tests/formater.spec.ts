import { currencyFormatter } from '../formatter.ts';

describe('Checks if currency is being formated correctly', () => {
  test('formats zero correctly', () => {
    const number = 0;
    const formatted = currencyFormatter.format(number);
    
    expect(formatted).toBe('$0.00');
  });

  test('formats as USD currency', () => {
    const number = 1900;
    const formatted = currencyFormatter.format(number);
    
    expect(formatted).toBe('$1,900.00');
  });

  test('formats negative correctly', () => {
    const number = -3934.16;
    const formatted = currencyFormatter.format(number);
    
    expect(formatted).toBe('-$3,934.16');
  });
});
