import { describe, expect, it } from 'vitest';

// Mock date formatter functions
const formatDate = (
  date: Date | string,
  format: string = 'MM/dd/yyyy'
): string => {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error('Invalid date');
  }

  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();

  switch (format) {
    case 'MM/dd/yyyy':
      return `${month}/${day}/${year}`;
    case 'dd/MM/yyyy':
      return `${day}/${month}/${year}`;
    case 'yyyy-MM-dd':
      return `${year}-${month}-${day}`;
    case 'MMM dd, yyyy':
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      return `${monthNames[d.getMonth()]} ${day}, ${year}`;
    default:
      return `${month}/${day}/${year}`;
  }
};

const formatTime = (date: Date | string): string => {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error('Invalid date');
  }

  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  return `${hours}:${minutes} ${ampm}`;
};

const formatDateTime = (date: Date | string): string => {
  return `${formatDate(date)} ${formatTime(date)}`;
};

const getRelativeTime = (date: Date | string): string => {
  const d = new Date(date);
  const now = new Date();
  const diffInMs = now.getTime() - d.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) {
    return 'just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
  } else {
    return formatDate(date);
  }
};

describe('Date Formatter Utils', () => {
  describe('formatDate', () => {
    it('should format date in default MM/dd/yyyy format', () => {
      const date = new Date('2024-01-15');
      expect(formatDate(date)).toBe('01/15/2024');
    });

    it('should format date in dd/MM/yyyy format', () => {
      const date = new Date('2024-01-15');
      expect(formatDate(date, 'dd/MM/yyyy')).toBe('15/01/2024');
    });

    it('should format date in yyyy-MM-dd format', () => {
      const date = new Date('2024-01-15');
      expect(formatDate(date, 'yyyy-MM-dd')).toBe('2024-01-15');
    });

    it('should format date in MMM dd, yyyy format', () => {
      const date = new Date('2024-01-15');
      expect(formatDate(date, 'MMM dd, yyyy')).toBe('Jan 15, 2024');
    });

    it('should handle string dates', () => {
      expect(formatDate('2024-01-15')).toBe('01/15/2024');
    });

    it('should throw error for invalid dates', () => {
      expect(() => formatDate('invalid-date')).toThrow('Invalid date');
    });

    it('should handle edge cases', () => {
      // Leap year
      const leapYear = new Date('2024-02-29');
      expect(formatDate(leapYear)).toBe('02/29/2024');

      // End of year
      const endOfYear = new Date('2024-12-31');
      expect(formatDate(endOfYear)).toBe('12/31/2024');
    });
  });

  describe('formatTime', () => {
    it('should format time in 12-hour format', () => {
      const date = new Date('2024-01-15T14:30:00');
      expect(formatTime(date)).toBe('2:30 PM');
    });

    it('should handle midnight', () => {
      const date = new Date('2024-01-15T00:00:00');
      expect(formatTime(date)).toBe('12:00 AM');
    });

    it('should handle noon', () => {
      const date = new Date('2024-01-15T12:00:00');
      expect(formatTime(date)).toBe('12:00 PM');
    });

    it('should handle morning times', () => {
      const date = new Date('2024-01-15T09:15:00');
      expect(formatTime(date)).toBe('9:15 AM');
    });

    it('should pad minutes with zero', () => {
      const date = new Date('2024-01-15T14:05:00');
      expect(formatTime(date)).toBe('2:05 PM');
    });

    it('should throw error for invalid dates', () => {
      expect(() => formatTime('invalid-date')).toThrow('Invalid date');
    });
  });

  describe('formatDateTime', () => {
    it('should format date and time together', () => {
      const date = new Date('2024-01-15T14:30:00');
      expect(formatDateTime(date)).toBe('01/15/2024 2:30 PM');
    });

    it('should handle string input', () => {
      expect(formatDateTime('2024-01-15T09:00:00')).toBe('01/15/2024 9:00 AM');
    });
  });

  describe('getRelativeTime', () => {
    it('should return "just now" for very recent times', () => {
      const now = new Date();
      expect(getRelativeTime(now)).toBe('just now');
    });

    it('should return minutes ago for recent times', () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      expect(getRelativeTime(fiveMinutesAgo)).toBe('5 minutes ago');
    });

    it('should return singular minute for one minute ago', () => {
      const oneMinuteAgo = new Date(Date.now() - 1 * 60 * 1000);
      expect(getRelativeTime(oneMinuteAgo)).toBe('1 minute ago');
    });

    it('should return hours ago for times within 24 hours', () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
      expect(getRelativeTime(twoHoursAgo)).toBe('2 hours ago');
    });

    it('should return singular hour for one hour ago', () => {
      const oneHourAgo = new Date(Date.now() - 1 * 60 * 60 * 1000);
      expect(getRelativeTime(oneHourAgo)).toBe('1 hour ago');
    });

    it('should return days ago for times within a week', () => {
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
      expect(getRelativeTime(threeDaysAgo)).toBe('3 days ago');
    });

    it('should return singular day for one day ago', () => {
      const oneDayAgo = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
      expect(getRelativeTime(oneDayAgo)).toBe('1 day ago');
    });

    it('should return formatted date for times older than a week', () => {
      const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
      const formatted = formatDate(twoWeeksAgo);
      expect(getRelativeTime(twoWeeksAgo)).toBe(formatted);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle timezone differences', () => {
      const utcDate = new Date('2024-01-15T12:00:00Z');
      const result = formatDate(utcDate);
      expect(result).toMatch(/\d{2}\/\d{2}\/2024/);
    });

    it('should handle different date formats as input', () => {
      const formats = [
        '2024-01-15',
        '01/15/2024',
        '2024-01-15T14:30:00',
        '2024-01-15T14:30:00Z',
      ];

      formats.forEach((format) => {
        expect(() => formatDate(format)).not.toThrow();
      });
    });

    it('should handle boundary dates', () => {
      // Unix epoch
      const epoch = new Date(0);
      expect(() => formatDate(epoch)).not.toThrow();

      // Far future date
      const futureDate = new Date('2099-12-31');
      expect(() => formatDate(futureDate)).not.toThrow();
    });
  });
});
