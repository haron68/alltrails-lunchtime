import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import NotFound from '../../../pages/NotFound'
import {
  removeSavedLocation,
  saveLocation,
  selectAllResults,
  selectCenter,
  selectSavedLocations,
  setCenter,
  setSelectedLocation,
} from '../../../store/mapSlice'
import CenteredSpinner from '../CenteredSpinner'
import Map from './Map'
import Marker from './Marker'

import { Status, Wrapper } from '@googlemaps/react-wrapper'

type Props = {}

const MapContainer: FC<Props> = () => {
  const dispatch = useDispatch()
  const [zoom, setZoom] = useState(12) // initial zoom
  const center = useSelector(selectCenter)
  const results = useSelector(selectAllResults)
  const savedLocations = useSelector(selectSavedLocations)

  const toggleSave = (ev: any) => {
    const index = ev.detail
    const location = results[index]
    const { place_id: placeId } = location
    if (placeId) {
      const isSaved = placeId in savedLocations
      if (!isSaved) {
        dispatch(saveLocation(location))
      } else {
        dispatch(removeSavedLocation(placeId))
      }
    }
  }

  const render = (status: Status) => {
    if (status == Status.FAILURE) return <NotFound statusCode={500} />
    return <CenteredSpinner size='xl' />
  }

  useEffect(() => {
    // get user location otherwise we could check user IP address to approximate their location with IP -> Geo
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { coords } = position
        const { latitude, longitude } = coords
        dispatch(
          setCenter({
            lat: latitude,
            lng: longitude,
          })
        )
      })
    }
  }, [])

  // preselect the first location in the results list
  useEffect(() => {
    if (results) {
      const location = results[0]
      const locCenter = location?.geometry?.location as
        | google.maps.LatLngLiteral
        | undefined

      dispatch(setSelectedLocation(location))
      if (locCenter) {
        dispatch(setCenter(locCenter))
      }
    }
  }, [results])

  useEffect(() => {
    // listen to location save events from the map
    document.addEventListener('toggleSave', toggleSave)

    // remove event on unmount
    return () => {
      document.removeEventListener('toggleSave', toggleSave)
    }
  }, [results, savedLocations])

  return (
    <div className='flex h-full'>
      <Wrapper
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}
        render={render}>
        <Map
          center={center}
          zoom={zoom}
          styles={[
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
          ]}
          className='grow h-full'>
          {results.map((place, i) => (
            <Marker
              key={i}
              index={i}
              position={place.geometry?.location}
              location={place}
            />
          ))}
        </Map>
      </Wrapper>
    </div>
  )
}

export default MapContainer
