import React from 'react';

const makeDaysArray = numberOfDays => (new Array(numberOfDays)).fill(null).map((day, index) => index + 1)

const renderDay = (number, selectedDay, setDay) => {
  const htmlId = `day-${ number }`
  return (<li key={ number } className="date-selector-option">
    <input type="radio"
            name="day" 
            id={ htmlId } 
            value={ number } 
            data-test-id={ htmlId + "-input" }
            checked={ number === selectedDay }
            onChange={ event => setDay(parseInt(event.target.value)) } />
    <label htmlFor={ htmlId } data-test-id={ htmlId + "-label" }>
      { number }
    </label>
  </li>)
}

const DaySelector = props => {
  const days = makeDaysArray(props.days)
  return <ol className="date-selector day">
    {
      days.map(day => renderDay(day, props.selectedDay, props.setDay))
    }
  </ol>
}

export default DaySelector