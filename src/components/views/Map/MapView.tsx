import { FC, useEffect, useState } from 'react'

import NotFound from '../../../pages/NotFound'
import CenteredSpinner from '../CenteredSpinner'
import Map from './Map'

import { Status, Wrapper } from '@googlemaps/react-wrapper'
import { Spinner } from 'flowbite-react'

type Props = {}

const MapView: FC<Props> = () => {
  const [clicks, setClicks] = useState<google.maps.LatLng[]>([])
  const [zoom, setZoom] = useState(12) // initial zoom
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 37.773972,
    lng: -122.431297,
  })

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
        setCenter({
          lat: latitude,
          lng: longitude,
        })
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
