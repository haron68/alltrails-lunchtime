// adapted from https://codesandbox.io/s/react-map-6ytyjj
import {
  Children,
  cloneElement,
  FC,
  isValidElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'

import useDeepCompareEffectForMaps from '../../../hooks/useDeepCompareEffectForMaps'
import './map.css'

type Props = {
  className?: string
  onIdle?: (map: google.maps.Map) => void
  children?: ReactNode
} & google.maps.MapOptions

const Map: FC<Props> = ({ className, onIdle, children, ...options }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow>()

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}))
    }
  }, [ref, map])

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options)
      if (!infoWindow) {
        setInfoWindow(new google.maps.InfoWindow())
      }
    }
  }, [map, options])

  useEffect(() => {
    if (map) {
      ;['idle'].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      )

      if (onIdle) {
        map.addListener('idle', () => onIdle(map))
      }
    }
  }, [map, onIdle])

  return (
    <>
      <div ref={ref} className={className} />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return cloneElement(child, { map, infoWindow })
        }
      })}
    </>
  )
}

export default Map
