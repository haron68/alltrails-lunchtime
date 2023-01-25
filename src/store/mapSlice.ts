import { DatabaseKeys } from '../constants/strings'
import { AppState } from './store'

import {
  createAsyncThunk,
  createSlice,
  Draft,
  PayloadAction,
} from '@reduxjs/toolkit'
import axios from 'axios'

export type SavedLocations = {
  [place_id: string]: google.maps.places.PlaceResult
}

export interface MapState {
  isLoading: boolean
  searchText: string
  center: {
    lat: number
    lng: number
  }
  cameraCenter: {
    lat: number
    lng: number
  }
  results: google.maps.places.PlaceResult[]
  selectedLocation: google.maps.places.PlaceResult | undefined
  savedLocations: SavedLocations
}

const initialState: MapState = {
  isLoading: false,
  searchText: '',
  center: {
    lat: 37.773972,
    lng: -122.431297,
  },
  cameraCenter: {
    lat: 37.773972,
    lng: -122.431297,
  },
  results: [],
  selectedLocation: undefined,
  savedLocations: JSON.parse(
    localStorage.getItem(DatabaseKeys.SAVED_LOCATIONS) ?? '{}'
  ),
}

export const selectLoading = (state: AppState) => state.map.isLoading
export const selectSearchText = (state: AppState) => state.map.searchText
export const selectCenter = (state: AppState) => state.map.center
export const selectCameraCenter = (state: AppState) => state.map.cameraCenter
export const selectAllResults = (state: AppState) => state.map.results
export const selectSelectedLocation = (state: AppState) =>
  state.map.selectedLocation
export const selectSavedLocations = (state: AppState) =>
  state.map.savedLocations

export const searchRestaurants = createAsyncThunk(
  'map/searchRestaurants',
  async (searchText: string, thunk) => {
    const { dispatch, getState } = thunk
    const state = getState() as AppState

    // clear results before query to avoid map whiplash bug
    dispatch(setResults([]))

    dispatch(setLoading(true))
    const { lat, lng } = state.map.cameraCenter
    const url = encodeURI(
      `${process.env.REACT_APP_SEARCH_API_URI}?query=${searchText}&lat=${lat}&lng=${lng}`
    )

    try {
      const response = await axios.get(url)
      const { results } = response.data
      dispatch(setResults(results))
      dispatch(setLoading(false))
      return response.data
    } catch (e) {
      console.error(e)
      dispatch(setResults([]))
      dispatch(setLoading(false))
      return null
    }
  }
)

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setLoading: (state: Draft<MapState>, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setSearchText: (state: Draft<MapState>, action: PayloadAction<string>) => {
      state.searchText = action.payload
    },
    setCenter: (
      state: Draft<MapState>,
      action: PayloadAction<google.maps.LatLngLiteral>
    ) => {
      state.center = action.payload
      state.cameraCenter = action.payload
    },
    setCameraCenter: (
      state: Draft<MapState>,
      action: PayloadAction<google.maps.LatLngLiteral>
    ) => {
      state.cameraCenter = action.payload
    },
    setResults: (
      state: Draft<MapState>,
      action: PayloadAction<google.maps.places.PlaceResult[]>
    ) => {
      state.results = action.payload
    },
    setSelectedLocation: (
      state: Draft<MapState>,
      action: PayloadAction<google.maps.places.PlaceResult>
    ) => {
      state.selectedLocation = action.payload
    },
    saveLocation: (
      state: Draft<MapState>,
      action: PayloadAction<google.maps.places.PlaceResult>
    ) => {
      const location = action.payload
      if (!location.place_id) {
        return
      }
      state.savedLocations[location.place_id] = location

      // persist updated saved locations
      localStorage.setItem(
        DatabaseKeys.SAVED_LOCATIONS,
        JSON.stringify(state.savedLocations)
      )
    },
    removeSavedLocation: (
      state: Draft<MapState>,
      action: PayloadAction<string | undefined>
    ) => {
      const placeId = action.payload
      if (!placeId) {
        return
      }
      delete state.savedLocations[placeId]

      // persist updated saved locations
      localStorage.setItem(
        DatabaseKeys.SAVED_LOCATIONS,
        JSON.stringify(state.savedLocations)
      )
    },
  },
})

export const {
  setLoading,
  setSearchText,
  setCenter,
  setCameraCenter,
  setResults,
  setSelectedLocation,
  saveLocation,
  removeSavedLocation,
} = mapSlice.actions

export default mapSlice.reducer
