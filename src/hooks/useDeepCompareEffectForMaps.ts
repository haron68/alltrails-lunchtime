import { EffectCallback, useEffect } from 'react'

import useDeepCompareMemoize from './useDeepCompareMemoize'

export default function useDeepCompareEffectForMaps(
  callback: EffectCallback,
  dependencies: any[]
) {
  useEffect(callback, dependencies.map(useDeepCompareMemoize))
}
