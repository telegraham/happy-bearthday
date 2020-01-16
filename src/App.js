import React, { useEffect, useState } from 'react';
import ImageForm from './ImageForm';
import './App.css';

const API_KEY = "TgqhL3hIhNodtr2agaWlmX3bUbt7rLsuIPzTPZ6j"

// const date = {
//   year: 2016,
//   month: 5,
//   day: 2
// }

// const dateString = [ date.year, date.month, date.day ].map(num => num.toString().padStart(2, '0')).join("-")
// const datePath = [ date.year, date.month, date.day ].map(num => num.toString().padStart(2, '0')).join("/")

function App() {

  const [ style, setStyle ] = useState("natural");
  const [ date, setDate ] = useState("2016-05-02");
  const datePath = date.replace(/-/g, "/")

  const updateConfig = ({ style, date }) => {
    setDate(date)
    setStyle(style)
  }

  const [ pics, setPics ] = useState([]);
  useEffect(() => {
    fetch(`https://api.nasa.gov/EPIC/api/${ style }/date/${ date }?api_key=${ API_KEY }`)
      .then(res => res.json())
      .then(setPics)
  }, [style, date]);

  return (
    <>
      <ImageForm defaultStyle={ style } defaultDate={ date } updateConfig={ updateConfig } />
      {
        (pics.error && pics.error.code) || 
        pics.map(pic => <img width="100" src={ `https://epic.gsfc.nasa.gov/archive/${ style }/${ datePath }/png/${ pic.image }.png` } />)
      }
    </>
  );
}

export default App;
