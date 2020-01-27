import React, { useEffect, useState } from 'react'
import Carousel from './Carousel';
import ErrorDisplay from './ErrorDisplay';
import NasaAdapter from './NasaAdapter';

const ImageContainer = ({ availableImage }) => {

  const [ picList, setPics ] = useState([])
  const [ loading, setLoading ] = useState(false)

  const setLoadingAndPics = (pics) => {
    setLoading(false)
    setPics(pics)
  };

  const grabImages = () => {
    if (availableImage && !availableImage.notFound) {
      setLoading(true);
      NasaAdapter.fetchImagesForDate(setLoadingAndPics, availableImage.dateString);
    } else if (availableImage.notFound) {
      setPics([])
    }
  }

  useEffect(grabImages, [availableImage.dateString]);

  if (picList.error)
    return <ErrorDisplay error={picList.error} />
  else  
    return <Carousel images={ picList } loading={ loading } />
}


export default ImageContainer