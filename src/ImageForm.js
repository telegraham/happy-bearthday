import React, { useEffect, useState } from 'react';

export default props => {

  const [ style, setStyle ] = useState(props.defaultStyle);
  const [ date, setDate ] = useState(props.defaultDate);
  const styleChanged = event => setStyle(event.target.value)

  const [ dates, setDates ] = useState([]);
  useEffect(() => {
    fetch(`https://epic.gsfc.nasa.gov/api/${ style }/all`)
      .then(response => response.json())
      .then(setDates)
  }, [style])

  const handleSubmit = event => {
    event.preventDefault();
    props.updateConfig({ date, style })
  }

  return (<form onSubmit={ handleSubmit }>
            <ul>
                <li>
                  <label htmlFor="style-natural">Natural</label>
                  <input id="style-natural" 
                          type="radio" 
                          value="natural" 
                          name="style"
                          onChange={ styleChanged } 
                          checked={ style === "natural" } />
                </li>
                <li>
                  <label htmlFor="style-enhanced">Enhanced</label>
                  <input id="style-enhanced" 
                          type="radio" 
                          value="enhanced" 
                          name="style"
                          onChange={ styleChanged }
                          checked={ style === "enhanced" } />
                </li>
              </ul>
              <select onChange={ event => setDate(event.target.value) } value={ date }>
                {
                  dates.map(({ date }) => <option value={ date }>{ date }</option>)
                }
              </select>
              <input type="submit" />
          </form>)
}