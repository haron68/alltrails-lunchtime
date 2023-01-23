import { useDispatch, useSelector } from 'react-redux'

import { AppState } from './store'

import {
  createAsyncThunk,
  createSlice,
  Draft,
  PayloadAction,
} from '@reduxjs/toolkit'
import axios from 'axios'

export interface MapState {
  isLoading: boolean
  searchText: string
  center: {
    lat: number
    lng: number
  }
  results: any[]
}

const initialState: MapState = {
  isLoading: false,
  searchText: '',
  center: {
    lat: 37.773972,
    lng: -122.431297,
  },
  results: [],
}

export const selectLoading = (state: AppState) => state.map.isLoading
export const selectSearchText = (state: AppState) => state.map.searchText
export const selectCenter = (state: AppState) => state.map.center
export const selectAllResults = (state: AppState) => state.map.results

export const searchRestaurants = createAsyncThunk(
  'map/searchRestaurants',
  async (searchText: string, thunk) => {
    const { dispatch, getState } = thunk
    const state = getState() as AppState
    console.log(searchText)
    dispatch(setLoading(true))
    const { lat, lng } = state.map.center
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    const url = encodeURI(
      `${process.env.REACT_APP_GOOGLE_MAPS_SEARCH_API_URI}/textsearch/json?location=${lat},${lng}&query=${searchText}&radius=10000&key=${apiKey}`
    )

    console.log(url)

    try {
      const response = await axios.get(url)

      dispatch(setLoading(false))
      return response.data
    } catch (e) {
      console.error(e)
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
    },
    setResults: (state: Draft<MapState>, action: PayloadAction<any[]>) => {
      state.results = action.payload
    },
  },
})

export const { setLoading, setSearchText, setCenter, setResults } =
  mapSlice.actions

export default mapSlice.reducer