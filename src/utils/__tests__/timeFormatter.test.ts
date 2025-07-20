import { describe, expect, it } from 'vitest';

// Mock time formatter functions
const formatDuration = (minutes: number): string => {
  if (minutes < 0) {
    throw new Error('Duration cannot be negative');
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}m`;
  } else if (remainingMinutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${remainingMinutes}m`;
  }
};

const parseTimeString = (
  timeString: string
): { hours: number; minutes: number } => {
  const timeRegex = /^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i;
  const match = timeString.match(timeRegex);

  if (!match) {
    throw new Error('Invalid time format');
  }

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3]?.toUpperCase();

  if (minutes >= 60) {
    throw new Error('Invalid minutes');
  }

  if (period) {
    // 12-hour format
    if (hours < 1 || hours > 12) {
      throw new Error('Invalid hours for 12-hour format');
    }
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
  } else {
    // 24-hour format
    if (hours >= 24) {
      throw new Error('Invalid hours for 24-hour format');
    }
  }

  return { hours, minutes };
};

const formatTimeRange = (startTime: string, endTime: string): string => {
  const start = parseTimeString(startTime);
  const end = parseTimeString(endTime);

  const formatTime = (time: { hours: number; minutes: number }): string => {
    const hours12 =
      time.hours === 0 ? 12 : time.hours > 12 ? time.hours - 12 : time.hours;
    const period = time.hours >= 12 ? 'PM' : 'AM';
    const minutes = time.minutes.toString().padStart(2, '0');
    return `${hours12}:${minutes} ${period}`;
  };

  return `${formatTime(start)} - ${formatTime(end)}`;
};

const getTimeDifference = (startTime: string, endTime: string): number => {
  const start = parseTimeString(startTime);
  const end = parseTimeString(endTime);

  const startMinutes = start.hours * 60 + start.minutes;
  let endMinutes = end.hours * 60 + end.minutes;

  // Handle overnight times
  if (endMinutes < startMinutes) {
    endMinutes += 24 * 60; // Add 24 hours
  }

  return endMinutes - startMinutes;
};

const isValidTimeSlot = (time: string, availableSlots: string[]): boolean => {
  return availableSlots.includes(time);
};

const generateTimeSlots = (
  startTime: string,
  endTime: string,
  intervalMinutes: number = 30
): string[] => {
  const start = parseTimeString(startTime);
  const end = parseTimeString(endTime);
  const slots: string[] = [];

  let currentMinutes = start.hours * 60 + start.minutes;
  const endMinutes = end.hours * 60 + end.minutes;

  while (currentMinutes < endMinutes) {
    const hours = Math.floor(currentMinutes / 60);
    const minutes = currentMinutes % 60;

    const hours12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours12}:${minutes
      .toString()
      .padStart(2, '0')} ${period}`;

    slots.push(formattedTime);
    currentMinutes += intervalMinutes;
  }

  return slots;
};

describe('Time Formatter Utils', () => {
  describe('formatDuration', () => {
    it('should format minutes only', () => {
      expect(formatDuration(30)).toBe('30m');
      expect(formatDuration(45)).toBe('45m');
    });

    it('should format hours only', () => {
      expect(formatDuration(60)).toBe('1h');
      expect(formatDuration(120)).toBe('2h');
    });

    it('should format hours and minutes', () => {
      expect(formatDuration(90)).toBe('1h 30m');
      expect(formatDuration(150)).toBe('2h 30m');
    });

    it('should handle zero duration', () => {
      expect(formatDuration(0)).toBe('0m');
    });

    it('should throw error for negative duration', () => {
      expect(() => formatDuration(-30)).toThrow('Duration cannot be negative');
    });

    it('should handle large durations', () => {
      expect(formatDuration(1440)).toBe('24h'); // 24 hours
      expect(formatDuration(1500)).toBe('25h'); // 25 hours
    });
  });

  describe('parseTimeString', () => {
    it('should parse 12-hour format with AM', () => {
      const result = parseTimeString('9:30 AM');
      expect(result).toEqual({ hours: 9, minutes: 30 });
    });

    it('should parse 12-hour format with PM', () => {
      const result = parseTimeString('2:45 PM');
      expect(result).toEqual({ hours: 14, minutes: 45 });
    });

    it('should parse midnight', () => {
      const result = parseTimeString('12:00 AM');
      expect(result).toEqual({ hours: 0, minutes: 0 });
    });

    it('should parse noon', () => {
      const result = parseTimeString('12:00 PM');
      expect(result).toEqual({ hours: 12, minutes: 0 });
    });

    it('should parse 24-hour format', () => {
      const result = parseTimeString('14:30');
      expect(result).toEqual({ hours: 14, minutes: 30 });
    });

    it('should handle single digit hours', () => {
      const result = parseTimeString('9:00 AM');
      expect(result).toEqual({ hours: 9, minutes: 0 });
    });

    it('should throw error for invalid format', () => {
      expect(() => parseTimeString('invalid')).toThrow('Invalid time format');
      expect(() => parseTimeString('25:00')).toThrow(
        'Invalid hours for 24-hour format'
      );
      expect(() => parseTimeString('12:60 PM')).toThrow('Invalid minutes');
    });

    it('should handle case insensitive AM/PM', () => {
      expect(parseTimeString('9:30 am')).toEqual({ hours: 9, minutes: 30 });
      expect(parseTimeString('9:30 pm')).toEqual({ hours: 21, minutes: 30 });
    });
  });

  describe('formatTimeRange', () => {
    it('should format time range correctly', () => {
      expect(formatTimeRange('9:00 AM', '5:00 PM')).toBe('9:00 AM - 5:00 PM');
    });

    it('should handle different formats', () => {
      expect(formatTimeRange('09:00', '17:00')).toBe('9:00 AM - 5:00 PM');
    });

    it('should handle midnight and noon', () => {
      expect(formatTimeRange('12:00 AM', '12:00 PM')).toBe(
        '12:00 AM - 12:00 PM'
      );
    });

    it('should handle same period ranges', () => {
      expect(formatTimeRange('9:00 AM', '11:30 AM')).toBe('9:00 AM - 11:30 AM');
    });
  });

  describe('getTimeDifference', () => {
    it('should calculate difference in minutes', () => {
      expect(getTimeDifference('9:00 AM', '5:00 PM')).toBe(480); // 8 hours
    });

    it('should handle same day times', () => {
      expect(getTimeDifference('2:30 PM', '4:45 PM')).toBe(135); // 2h 15m
    });

    it('should handle overnight times', () => {
      expect(getTimeDifference('11:00 PM', '7:00 AM')).toBe(480); // 8 hours
    });

    it('should handle 24-hour format', () => {
      expect(getTimeDifference('14:30', '16:45')).toBe(135); // 2h 15m
    });

    it('should return 0 for same times', () => {
      expect(getTimeDifference('9:00 AM', '9:00 AM')).toBe(0);
    });
  });

  describe('isValidTimeSlot', () => {
    const availableSlots = [
      '9:00 AM',
      '9:30 AM',
      '10:00 AM',
      '2:00 PM',
      '2:30 PM',
    ];

    it('should return true for valid slots', () => {
      expect(isValidTimeSlot('9:00 AM', availableSlots)).toBe(true);
      expect(isValidTimeSlot('2:30 PM', availableSlots)).toBe(true);
    });

    it('should return false for invalid slots', () => {
      expect(isValidTimeSlot('11:00 AM', availableSlots)).toBe(false);
      expect(isValidTimeSlot('3:00 PM', availableSlots)).toBe(false);
    });

    it('should handle empty slots array', () => {
      expect(isValidTimeSlot('9:00 AM', [])).toBe(false);
    });
  });

  describe('generateTimeSlots', () => {
    it('should generate 30-minute slots by default', () => {
      const slots = generateTimeSlots('9:00 AM', '11:00 AM');
      expect(slots).toEqual(['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM']);
    });

    it('should generate custom interval slots', () => {
      const slots = generateTimeSlots('9:00 AM', '10:00 AM', 15);
      expect(slots).toEqual(['9:00 AM', '9:15 AM', '9:30 AM', '9:45 AM']);
    });

    it('should handle afternoon times', () => {
      const slots = generateTimeSlots('2:00 PM', '3:00 PM');
      expect(slots).toEqual(['2:00 PM', '2:30 PM']);
    });

    it('should handle 24-hour format input', () => {
      const slots = generateTimeSlots('14:00', '15:00');
      expect(slots).toEqual(['2:00 PM', '2:30 PM']);
    });

    it('should return empty array for invalid range', () => {
      const slots = generateTimeSlots('11:00 AM', '9:00 AM');
      expect(slots).toEqual([]);
    });

    it('should handle hour intervals', () => {
      const slots = generateTimeSlots('9:00 AM', '12:00 PM', 60);
      expect(slots).toEqual(['9:00 AM', '10:00 AM', '11:00 AM']);
    });
  });

  describe('Edge Cases', () => {
    it('should handle boundary times', () => {
      expect(() => parseTimeString('0:00')).not.toThrow();
      expect(() => parseTimeString('23:59')).not.toThrow();
    });

    it('should handle various time formats', () => {
      const formats = ['9:00 AM', '09:00 AM', '9:00 am', '09:00', '21:00'];

      formats.forEach((format) => {
        expect(() => parseTimeString(format)).not.toThrow();
      });
    });

    it('should handle edge case durations', () => {
      expect(formatDuration(1)).toBe('1m');
      expect(formatDuration(59)).toBe('59m');
      expect(formatDuration(61)).toBe('1h 1m');
    });
  });
});
