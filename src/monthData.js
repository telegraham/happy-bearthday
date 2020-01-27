const months = [
  {
    number: 1,
    name: "January",
    days: 31
  },
  {
    number: 2,
    name: "Febuary",
    days: 29 // because you can have your birthday on a leap year
  },
  {
    number: 3,
    name: "March",
    days: 31
  },
  {
    number: 4,
    name: "April",
    days: 30
  },
  {
    number: 5,
    name: "May",
    days: 31
  },
  {
    number: 6,
    name: "June",
    days: 30
  },
  {
    number: 7,
    name: "July",
    days: 31
  },
  {
    number: 8,
    name: "August",
    days: 31
  },
  {
    number: 9,
    name: "September",
    days: 30
  },
  {
    number: 10,
    name:  "October",
    days: 31
  },
  {
    number: 11,
    name:  "November",
    days: 30
  },
  {
    number: 12,
    name:  "December",
    days: 31
  },
];

const daysInMonth = months.reduce((accumulator, month) => {
  accumulator[month.number] = month.days
  return accumulator
}, {})

const monthNamesByNumber = months.reduce((accumulator, month) => {
  accumulator[month.number] = month.name
  return accumulator
}, {})

const maxDaysInAnyMonth = Math.max(...months.map(month => month.days))

export { daysInMonth, maxDaysInAnyMonth, monthNamesByNumber }

export default months