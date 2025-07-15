const { validateSorting } = require('../src/validateSort');

describe('validateSorting', () => {
  it('should return true when articles are sorted newest to oldest', () => {
    const articles = [
      { timestamp: new Date('2025-07-15T01:00:00Z') },
      { timestamp: new Date('2025-07-15T00:59:00Z') },
      { timestamp: new Date('2025-07-15T00:58:00Z') },
    ];

    expect(validateSorting(articles)).toBe(true);
  });

  it('should return false when articles are out of order', () => {
    const articles = [
      { timestamp: new Date('2025-07-15T01:00:00Z') },
      { timestamp: new Date('2025-07-15T01:01:00Z') }, // newer
      { timestamp: new Date('2025-07-15T00:58:00Z') },
    ];

    expect(validateSorting(articles)).toBe(false);
  });

  it('should return true for equal timestamps', () => {
    const timestamp = new Date('2025-07-15T01:00:00Z');
    const articles = [
      { timestamp },
      { timestamp },
      { timestamp },
    ];

    expect(validateSorting(articles)).toBe(true);
  });
});
