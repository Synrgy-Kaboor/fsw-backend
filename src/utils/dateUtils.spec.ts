import { describe, expect, it } from 'vitest';
import { dateToString } from './dateUtils';

describe('Test dateToString function', () => {
  it('should return correct date string for single digit date month and date', () => {
    const date = new Date(Date.UTC(2020, 1, 1));
    const dateString = dateToString(date);

    expect(dateString).toBe('2020-02-01');
  });

  it('should return correct date string for double digit date month and single digit date', () => {
    const date = new Date(Date.UTC(2020, 1, 11));
    const dateString = dateToString(date);

    expect(dateString).toBe('2020-02-11');
  });

  it('should return correct date string for single digit date month and double digit month', () => {
    const date = new Date(Date.UTC(2020, 11, 1));
    const dateString = dateToString(date);

    expect(dateString).toBe('2020-12-01');
  });

  it('should return correct date string for double digit date month and date', () => {
    const date = new Date(Date.UTC(2020, 11, 11));
    const dateString = dateToString(date);

    expect(dateString).toBe('2020-12-11');
  });
});