// adapted from https://codesandbox.io/embed/github/googlemaps/js-samples/tree/sample-react-map
import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectSelectedLocation,
  setSelectedLocation,
} from '../../../store/mapSlice'

type Props = {
  location: google.maps.places.PlaceResult
} & google.maps.MarkerOptions

const Marker: FC<Props> = ({ location, ...options }) => {
  const dispatch = useDispatch()
  const [marker, setMarker] = useState<google.maps.Marker>()
  const selectedLocation = useSelector(selectSelectedLocation)
  const isSelected = location.place_id == selectedLocation?.place_id

  useEffect(() => {
    if (!marker) {
      const newMarker = new google.maps.Marker()
      newMarker.setIcon('/icons/pin.png')
      setMarker(newMarker)
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null)
      }
    }
  }, [marker])

  useEffect(() => {
    if (marker) {
      marker.addListener('click', (e: google.maps.MapMouseEvent) => {
        dispatch(setSelectedLocation(location))
      })

      if (isSelected) {
        marker.setIcon('/icons/pin-selected.png')
        marker.setZIndex(google.maps.Marker.MAX_ZINDEX)
      } else {
        marker.setIcon('/icons/pin.png')
      }
      marker.setOptions(options)
    }
  }, [marker, options])

  return null
}

export default Marker
