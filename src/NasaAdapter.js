
const API_KEY = "TgqhL3hIhNodtr2agaWlmX3bUbt7rLsuIPzTPZ6j"

const pathifyDateString = nasaDate => nasaDate.replace(/-/g, "/")

const processImages = (images, style, nasaDate) => {
  if (!images.length)
    return images // probably an error
  const dateString = pathifyDateString(nasaDate);
  return images.map(image => ({
    description: image.caption,
    url: `https://epic.gsfc.nasa.gov/archive/${ style }/${ dateString }/png/${ image.image }.png?API_KEY=${ API_KEY }`
  }))
}

class NasaAdapter {
  static fetchAvailableImages(callback, style='natural') { // could also be 'enhanced'
    fetch(`https://epic.gsfc.nasa.gov/api/${ style }/all?api_key=${ API_KEY }`)
      .then(response => response.json())
      .then(callback)
  }

  static fetchImagesForDate(callback, dateString, style='natural') {
    fetch(`https://api.nasa.gov/EPIC/api/${ style }/date/${ dateString }?api_key=${ API_KEY }`)
      .then(res => res.json())
      .then(images => processImages(images, style, dateString))
      .then(callback)
  }
}

export default NasaAdapter