import { FC, useState } from 'react'

import Map from './Map'

import { Status, Wrapper } from '@googlemaps/react-wrapper'
import { Spinner } from 'flowbite-react'

type Props = {}

const MapView: FC<Props> = () => {
  const [clicks, setClicks] = useState<google.maps.LatLng[]>([])
  const [zoom, setZoom] = useState(3) // initial zoom
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  })

  const onClick = (e: google.maps.MapMouseEvent) => {
    console.log(e)
  }
  const onIdle = (map: google.maps.Map) => {
    console.log(map)
  }

  const render = (status: Status) => {
    console.log(status)
    if (status == Status.FAILURE) return <p>FAILED</p>
    return <Spinner size='lg' />
  }

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
