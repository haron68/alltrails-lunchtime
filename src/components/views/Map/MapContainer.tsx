import { FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import NotFound from '../../../pages/NotFound'
import {
  selectAllResults,
  selectCenter,
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
  const [clicks, setClicks] = useState<google.maps.LatLng[]>([])
  const [zoom, setZoom] = useState(12) // initial zoom
  const center = useSelector(selectCenter)
  const results = useSelector(selectAllResults)

  const onClick = (e: google.maps.MapMouseEvent) => {
    console.log(e)
  }

  const onIdle = (map: google.maps.Map) => {
    const newCenter = map.getCenter()?.toJSON() as google.maps.LatLngLiteral
    // reset center and zoom if user pans map
    dispatch(setCenter(newCenter))
    setZoom(map.getZoom() ?? 12)
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

  return (
    <div className='flex h-full'>
      <Wrapper
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}
        render={render}>
        <Map
          center={center}
          onClick={onClick}
          onIdle={onIdle}
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
