import React, { useState, useEffect } from 'react'

const Carousel = ({ images, loading }) => {

  const [ activeIndex, setActiveIndex ] = useState(0)
  const [ loadedImages, setLoadedImages ] = useState({})

  const nextIndex = (activeIndex + 1) % images.length
  const lastIndex = (activeIndex - 1 + images.length) % images.length

  useEffect(() => { 
    setActiveIndex(0) 
    setLoadedImages({})
  }, [ images ])

  const load = url => event => setLoadedImages({ ...loadedImages, [url]: true })

  const renderImage = (image, index) => {
    const active = index === activeIndex;
    const loaded = !!loadedImages[image.url];
    const cssClass = (loaded ? "loaded" : "") + " " + (active ? "active" : "");
    return (<li key={ image.url }>
      <img alt={ image.description } 
            src={ loaded || active ? image.url : "" }
            onLoad={ load(image.url) }
            className={ cssClass } />
    </li>)
  }

  const nowLoading = loading || (images.length && !loadedImages[images[activeIndex].url])

  return <div className="carousel">
    <ul className="carousel-images">
      {
        images.map(renderImage)
      }
    </ul>
    <nav className="carousel-nav">
      <button className="last" onClick={ event => setActiveIndex(lastIndex) }>
        <span className="emoji" role="img" aria-label="last">👈</span>
      </button>
      { nowLoading ? <h4 className="loading-indicator">Loading...</h4> : ""}
      <button className="next" onClick={ event => setActiveIndex(nextIndex) }>
        <span className="emoji" role="img" aria-label="next">👉</span>
      </button>
    </nav>
  </div>
}

export default Carousel