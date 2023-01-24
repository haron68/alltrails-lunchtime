import mapReducer, { MapState } from './mapSlice'

import { configureStore } from '@reduxjs/toolkit'

export interface AppState {
  map: MapState
}

export default configureStore({
  reducer: {
    map: mapReducer,
  },
})
