import { findLastBirthday, findLastBirthdayAsOf, findAvailableImagery } from './dateMath.js'

describe('findLastBirthday', () => {
  test('returns null for invalid input and doesn\'t error out', () => {
    expect(findLastBirthday()).toBe(null)
    expect(findLastBirthday({ })).toBe(null)
    expect(findLastBirthday({ month: 5 })).toBe(null)
    expect(findLastBirthday({ day: 9 })).toBe(null)
  });
});

describe('findLastBirthdayAsOf', () => {
  test('gives last year\'s birthday date if person has not had one yet this year', () => {
    const month = 5;
    const day = 2;

    const nowYear = 2020;
    const nowMonth = 1;
    const nowDay = 26;

    const actual = findLastBirthdayAsOf(month, day, nowYear, nowMonth, nowDay)
    const expected = {
      month: 5,
      day: 2,
      year: 2019,
      isBirthdayToday: false
    }

    expect(actual).toStrictEqual(expected)
  });

  test('gives last year\'s birthday date if person has not had one yet this month', () => {
    const month = 1;
    const day = 17;

    const nowYear = 2020;
    const nowMonth = 1;
    const nowDay = 12;

    const actual = findLastBirthdayAsOf(month, day, nowYear, nowMonth, nowDay)
    const expected = {
      month: 1,
      day: 17,
      year: 2019,
      isBirthdayToday: false
    }

    expect(actual).toStrictEqual(expected)
  });

  test('gives this year\'s birthday date if person has already had one this year', () => {
    const month = 4;
    const day = 13;

    const nowYear = 2020;
    const nowMonth = 8;
    const nowDay = 26;

    const actual = findLastBirthdayAsOf(month, day, nowYear, nowMonth, nowDay)
    const expected = {
      month: 4,
      day: 13,
      year: 2020,
      isBirthdayToday: false
    }

    expect(actual).toStrictEqual(expected)
  });


  test('gives this year\'s birthday date if person has already had one this month', () => {
    const month = 1;
    const day = 20;

    const nowYear = 2020;
    const nowMonth = 1;
    const nowDay = 26;

    const actual = findLastBirthdayAsOf(month, day, nowYear, nowMonth, nowDay)
    const expected = {
      month: 1,
      day: 20,
      year: 2020,
      isBirthdayToday: false
    }

    expect(actual).toStrictEqual(expected)
  });

  test('gives last year\'s birthday date if it is the person\'s birthday', () => {
    const month = 8;
    const day = 16;

    const nowYear = 2020;
    const nowMonth = 8;
    const nowDay = 16;

    const actual = findLastBirthdayAsOf(month, day, nowYear, nowMonth, nowDay)
    const expected = {
      month: 8,
      day: 16,
      year: 2019,
      isBirthdayToday: true
    }

    expect(actual).toStrictEqual(expected)
  });

  test('gives impossible dates for the misfortunate people born on February 29', () => {
    const month = 2;
    const day = 29;

    const nowYear = 2020;
    const nowMonth = 1;
    const nowDay = 16;

    const actual = findLastBirthdayAsOf(month, day, nowYear, nowMonth, nowDay)
    const expected = {
      month: 2,
      day: 29,
      year: 2019,
      isBirthdayToday: false
    }

    expect(actual).toStrictEqual(expected)
  });
});

describe('findAvailableImagery', () => {

  test('finds the right date when there\'s an exact match', () => {
    const response = [
      { date: "2019-11-12" },
      { date: "2019-06-12" },
      { date: "2019-06-11" },
      { date: "2019-06-10" },
      { date: "2019-06-09" },
      { date: "2019-06-08" }
    ]

    const lastBirthday = { year: 2019, month: 6, day: 9 }; //to test zero-padding match

    expect(findAvailableImagery(lastBirthday, response)).toStrictEqual({
      dateString: "2019-06-09",
      date: { year: 2019, month: 6, day: 9 },
      exact: true
    })

  });

  test('finds the right date when there\'s not an exact match', () => {

    const response = [
      { date: "2019-06-10" },
      { date: "2019-06-09" },
      { date: "2019-06-08" },
      { date: "2019-06-02" },
      { date: "2019-06-01" }
    ]

    const lastBirthday = { year: 2019, month: 6, day: 5 }; 

    expect(findAvailableImagery(lastBirthday, response)).toStrictEqual({
      dateString: "2019-06-08",
      date: { year: 2019, month: 6, day: 8 },
      exact: false
    })

  });

  test('finds the right date when there\'s not an exact match and the right match is next month', () => {

    const response = [
      { date: "2019-06-02" },
      { date: "2019-05-25" },
      { date: "2019-05-22" },
      { date: "2019-04-13" }
    ]

    const lastBirthday = { year: 2019, month: 5, day: 29 }; 

    expect(findAvailableImagery(lastBirthday, response)).toStrictEqual({
      dateString: "2019-06-02",
      date: { year: 2019, month: 6, day: 2 },
      exact: false
    })

  });

  test('finds the right date when there\'s not an exact match and the right match is next year', () => {

    const response = [
      { date: "2020-01-02" },
      { date: "2019-12-25" },
      { date: "2019-12-22" },
      { date: "2019-12-13" }
    ]

    const lastBirthday = { year: 2019, month: 12, day: 29 }; 

    expect(findAvailableImagery(lastBirthday, response)).toStrictEqual({
      dateString: "2020-01-02",
      date: { year: 2020, month: 1, day: 2 },
      exact: false
    })
  });

  test('specifies that there is no match when one cannot be found', () => {

    const response = [
      { date: "2019-12-25" },
      { date: "2019-12-22" },
      { date: "2019-12-13" }
    ]

    const lastBirthday = { year: 2019, month: 12, day: 29 }; 

    expect(findAvailableImagery(lastBirthday, response)).toStrictEqual({
      notFound: true
    })

  });


});

