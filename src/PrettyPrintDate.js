import React from 'react';
import { monthNamesByNumber } from './monthData'

export default ({ date: { year, month, day } }) => {
  return (<span>{ monthNamesByNumber[month] } { day }, { year }</span>)
}