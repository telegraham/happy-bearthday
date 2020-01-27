import React from 'react';
import months from './monthData'

const renderMonth = ({ number, name }, selectedMonth, setMonth) => {
  const htmlId = name.toLowerCase()
  return (<li key={ number } className="date-selector-option">
    <input type="radio" 
            name="month" 
            id={ htmlId } 
            value={ number } 
            data-test-id={ htmlId + "-input" }
            checked={ number === selectedMonth }
            onChange={ event => setMonth(parseInt(event.target.value)) } />
    <label htmlFor={ htmlId } data-test-id={ htmlId + "-label" }>
      { name.slice(0, 3) }
    </label>
  </li>)
}

const MonthSelector = props => (<ol className="date-selector month" data-test-id="months">
    {
      months.map(month => renderMonth(month, props.selectedMonth, props.setMonth))
    }
  </ol>)

export default MonthSelector