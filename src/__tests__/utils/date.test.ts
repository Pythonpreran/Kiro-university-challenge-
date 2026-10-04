import { describe, it, expect } from 'vitest';
import { getToday, isToday, formatDate, isPastDue } from '../../utils/date';

describe('date utilities', () => {
  describe('getToday', () => {
    it('returns today date in ISO format', () => {
      const result = getToday();
      const today = new Date().toISOString().split('T')[0];
      expect(result).toBe(today);
    });
  });

  describe('isToday', () => {
    it('returns true for today', () => {
      expect(isToday(getToday())).toBe(true);
    });

    it('returns false for other dates', () => {
      expect(isToday('2000-01-01')).toBe(false);
    });
  });

  describe('formatDate', () => {
    it('formats date in readable format', () => {
      const result = formatDate('2024-01-15');
      expect(result).toBe('Jan 15, 2024');
    });
  });

  describe('isPastDue', () => {
    it('returns true for past dates', () => {
      expect(isPastDue('2000-01-01')).toBe(true);
    });

    it('returns false for future dates', () => {
      const future = new Date();
      future.setDate(future.getDate() + 10);
      expect(isPastDue(future.toISOString().split('T')[0])).toBe(false);
    });

    it('returns false for today', () => {
      expect(isPastDue(getToday())).toBe(false);
    });
  });
});
