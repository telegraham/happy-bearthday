const findLastBirthdayAsOf = (month, day, nowYear, nowMonth, nowDay) => {
  const thisYear = nowYear;
  const lastYear = nowYear - 1;
  const hadABirthdayThisYearAlready = (nowMonth > month) || (nowMonth === month && nowDay > day)
  const year = hadABirthdayThisYearAlready ? thisYear : lastYear
  const isBirthdayToday = month === nowMonth && day === nowDay
  return {
    month, day, year, isBirthdayToday
  }
}

const findLastBirthday = (dateObject) => {
  if (!dateObject || !dateObject.month || !dateObject.day) {
    return null
  }
  const now = new Date();
  return findLastBirthdayAsOf(dateObject.month, dateObject.day, now.getFullYear(), now.getMonth() + 1, now.getDate())
}

const nasaifyDate = ({ day, month, year }) => {
  const parts = [ year, month, day ];
  return parts.map(num => num.toString().padStart(2, '0')).join("-")
}

const deNasaifyDate = (dateString) => {
  const [ year, month, day ] = dateString.split("-").map(chunk => parseInt(chunk))
  return { year, month, day }
}

const findAvailableImagery = (lastBirthday, availableImages) => {

  const sorted = availableImages.map(image => image.date).sort(); // performance might become untenable 
  const stringifiedLastbirthday = nasaifyDate(lastBirthday);
  let exactMatch = false;
  let match = null;

  for (let i = 0; i < sorted.length; i++) {
    if (stringifiedLastbirthday === sorted[i])
      exactMatch = true;
    if (sorted[i] >= stringifiedLastbirthday) {
      match = sorted[i]
      break
    }
  }

  if (!match)
    return { notFound: true }
  else
    return {
      dateString: match,
      date: deNasaifyDate(match),
      exact: exactMatch
    }
}

export { findLastBirthday, findLastBirthdayAsOf, findAvailableImagery, nasaifyDate }