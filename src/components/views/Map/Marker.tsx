// adapted from https://codesandbox.io/embed/github/googlemaps/js-samples/tree/sample-react-map
import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectSavedLocations,
  selectSelectedLocation,
  setSelectedLocation,
} from '../../../store/mapSlice'
import { getRestaurantCardHtml } from '../../RestaurantCard'

type Props = {
  index: number
  location: google.maps.places.PlaceResult
  infoWindow?: google.maps.InfoWindow
} & google.maps.MarkerOptions

const Marker: FC<Props> = ({ index, location, ...options }) => {
  const dispatch = useDispatch()
  const [marker, setMarker] = useState<google.maps.Marker>()
  const selectedLocation = useSelector(selectSelectedLocation)
  const savedLocations = useSelector(selectSavedLocations)
  const { map, infoWindow } = options

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

      const isSelected = location.place_id == selectedLocation?.place_id

      if (isSelected) {
        const isSaved = location.place_id
          ? location.place_id in savedLocations
          : false
        const contentStr = getRestaurantCardHtml(index, location, isSaved)
        infoWindow?.setContent(contentStr)

        infoWindow?.open({
          anchor: marker,
          map,
          shouldFocus: false,
        })

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
