import React, { useState } from 'react';
import MonthSelector from './MonthSelector'
import DaySelector from './DaySelector'
import './DateForm.css'
import { daysInMonth, maxDaysInAnyMonth } from './monthData'

const DateForm = props => {
  const [selectedMonth, setMonth] = useState(null)
  const [selectedDay, setDay] = useState(null)
  const handleSubmit = event => {
    event.preventDefault()
    props.setDate({ month: selectedMonth, day: selectedDay })
  }
  const daysThisMonth = daysInMonth[selectedMonth] || maxDaysInAnyMonth
  const canSubmit = selectedMonth && selectedDay && selectedDay <= daysThisMonth
  return (<form data-test-id="date-form" onSubmit={ handleSubmit } className={ "date-form" + (props.show ? " show" : "") }>
    <h2>When is your birthday?</h2>
    <h3>Month</h3>
    <MonthSelector selectedMonth={ selectedMonth } setMonth={ setMonth } />
    <h3 className="day">Day</h3>
    <DaySelector days={ daysThisMonth } selectedDay={ selectedDay } setDay={ setDay } />
    <input type="submit" disabled={ !canSubmit }/>
  </form>)
}

export default DateForm