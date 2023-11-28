import { calculateElapsedTime } from './elapsedTime';

describe('calculateElapsedTime', () => {
  it('calculates the elapsed time correctly', () => {
    const dataEntry = '2023-11-07T10:00:00.000Z';
    const dateProcessed = '2023-11-07T11:30:45.000Z';
    const result = calculateElapsedTime(dataEntry, dateProcessed);
    expect(result).toBe('01:30:45');
  });

  it('handles zero elapsed time', () => {
    const dataEntry = '2023-11-07T10:00:00.000Z';
    const dateProcessed = '2023-11-07T10:00:00.000Z';
    const result = calculateElapsedTime(dataEntry, dateProcessed);
    expect(result).toBe('00:00:00');
  });
});
