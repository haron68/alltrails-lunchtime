// adapted from https://codesandbox.io/embed/github/googlemaps/js-samples/tree/sample-react-map
import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectSelectedLocation,
  setSelectedLocation,
} from '../../../store/mapSlice'

type Props = {
  location: google.maps.places.PlaceResult
  infoWindow?: google.maps.InfoWindow
} & google.maps.MarkerOptions

const Marker: FC<Props> = ({ location, ...options }) => {
  const dispatch = useDispatch()
  const [marker, setMarker] = useState<google.maps.Marker>()
  const selectedLocation = useSelector(selectSelectedLocation)
  const isSelected = location.place_id == selectedLocation?.place_id
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

      if (isSelected) {
        const photos = location.photos as any[]
        const photoReference =
          photos && photos.length > 0 ? photos[0].photo_reference : undefined
        const contentStr = `
          <div class="flex rounded-2xl bg-white flex-row">
          <img alt="" class="h-20 w-20 object-none object-center my-4 ml-4" src="https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photoReference}&amp;maxheight=80&amp;key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}"><div class="flex h-full w-full flex-col justify-center gap-0.5 p-4 overflow-hidden whitespace-nowrap"><div class="w-full flex flex-row justify-between"><h5 class="text-lg font-bold tracking-tight text-gray-900 text-ellipsis overflow-hidden">${location.name}</h5><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="h-6 w-6 cursor-pointer text-primary-700"><path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"></path></svg></div><div class="flex flex-row items-center gap-2"><div class="flex flex-row items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-4 w-4 mr-1 text-primary-200"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd"></path></svg><p class="font-normal text-gray-900">3.6</p></div><div class="h-1 w-1 rounded-full bg-gray-700"></div><p class="font-normal text-gray-500">(494)</p></div><p class="font-normal text-gray-500 text-ellipsis overflow-hidden">${location.formatted_address}</p></div></div>
        `

        infoWindow?.setContent(contentStr)

        infoWindow?.open({
          anchor: marker,
          map,
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
