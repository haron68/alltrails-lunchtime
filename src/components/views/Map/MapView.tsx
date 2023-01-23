import { FC } from 'react'
import { Wrapper } from '@googlemaps/react-wrapper/src/index'

type Props = {}

const MapView: FC<Props> = () => {
  return (
    <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <p>HERE</p>
    </Wrapper>
  )
}

export default MapView
