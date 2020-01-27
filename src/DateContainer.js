import React, { useMemo, useEffect } from 'react';
import BirthdayBanner from './BirthdayBanner';
import ErrorDisplay from './ErrorDisplay';
import ImageContainer from './ImageContainer';
import PrettyPrintDate from './PrettyPrintDate'
import { findLastBirthday, findAvailableImagery } from './dateMath'
import './DateContainer.css';

const renderHeader = availableImage => {
  if (availableImage.notFound)
    return (<h2>We couldn't find any space pics after that date though.</h2>)
  else if (availableImage.exact)
    return <h2>We found these pictures of that day!</h2>
  else
    return <h2>These pictures were taken on <PrettyPrintDate date={ availableImage.date } />.</h2>
}

const DateContainer = ({ date, availableImages, setFormShowing }) => {

  const lastBirthday = useMemo(() => findLastBirthday(date), [date]);
  const availableImageDate = useMemo(() => {
      if (lastBirthday && availableImages && availableImages.length) //.length precludes it being a NASA error 
        return findAvailableImagery(lastBirthday, availableImages)
      else 
        return null
  }, [lastBirthday, availableImages])

  useEffect(() => setFormShowing(false), [date.month, date.day])

  return (
    <main className="date-container"> 
      <header className="date-header">
        <button onClick={ () => setFormShowing(true) } className="start-over">Change date</button>
        { lastBirthday ? <BirthdayBanner date={ lastBirthday } /> : "" }
        { availableImages.error ? <ErrorDisplay error={ availableImages.error } /> : "" }
        { availableImageDate ? renderHeader(availableImageDate) : "" }
      </header>
      { availableImageDate ? <ImageContainer availableImage={ availableImageDate }/> : "" }
    </main>
  );
}

export default DateContainer;