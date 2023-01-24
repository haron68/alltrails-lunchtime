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

type Props = {
  className?: string
  onClick?: (e: google.maps.MapMouseEvent) => void
  onIdle?: (map: google.maps.Map) => void
  children?: ReactNode
} & google.maps.MapOptions

const Map: FC<Props> = ({
  className,
  onClick,
  onIdle,
  children,
  ...options
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()

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
    }
  }, [map, options])

  useEffect(() => {
    if (map) {
      ;['click', 'idle'].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      )

      if (onClick) {
        map.addListener('click', onClick)
      }

      if (onIdle) {
        map.addListener('idle', () => onIdle(map))
      }
    }
  }, [map, onClick, onIdle])

  return (
    <>
      <div ref={ref} className={className} />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return cloneElement(child, { map })
        }
      })}
    </>
  )
}

export default Map
