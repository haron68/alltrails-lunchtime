import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import NotFound from '../../../pages/NotFound'
import { selectCenter, setCenter } from '../../../store/mapSlice'
import { AppState } from '../../../store/store'
import CenteredSpinner from '../CenteredSpinner'
import Map from './Map'

import { Status, Wrapper } from '@googlemaps/react-wrapper'

type Props = {}

const MapView: FC<Props> = () => {
  const dispatch = useDispatch()
  const [clicks, setClicks] = useState<google.maps.LatLng[]>([])
  const [zoom, setZoom] = useState(12) // initial zoom
  const center = useSelector<AppState, google.maps.LatLngLiteral>(selectCenter)

  const onClick = (e: google.maps.MapMouseEvent) => {
    console.log(e)
  }
  const onIdle = (map: google.maps.Map) => {
    console.log(map)
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
          style={{ flexGrow: '1', height: '100%' }}
        />
      </Wrapper>
    </div>
  )
}

export default MapView
