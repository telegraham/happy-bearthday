import React from 'react';
import PrettyPrintDate from './PrettyPrintDate'

export default ({ date }) => <h2>
  { date.isBirthdayToday ? "Happy birthday! " : "" }
  Your last birthday was <PrettyPrintDate date={ date } />.
</h2>