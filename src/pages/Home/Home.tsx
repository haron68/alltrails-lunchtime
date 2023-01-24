import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ToggleMapListButton from '../../components/buttons/ToggleMapListButton'
import RestaurantCard from '../../components/RestaurantCard'
import CenteredSpinner from '../../components/views/CenteredSpinner'
import MapContainer from '../../components/views/Map/MapContainer'
import { Strings } from '../../constants/strings'
import {
  SavedLocations,
  selectAllResults,
  selectLoading,
  selectSavedLocations,
  selectSearchText,
  selectSelectedLocation,
  setSelectedLocation,
} from '../../store/mapSlice'
import './home.css'

import classNames from 'classnames'
import { Dispatch } from 'redux'

type Props = {}

const Home: FC<Props> = () => {
  const dispatch = useDispatch()
  const [isMapView, setMapView] = useState(false)
  const isLoading = useSelector(selectLoading)
  const searchText = useSelector(selectSearchText)
  const results = useSelector(selectAllResults)
  const selectedLocation = useSelector(selectSelectedLocation)
  const savedLocations = useSelector(selectSavedLocations)

  return (
    <>
      <div className='min-h-full max-w-full py-5 px-6 sm:py-4 lg:px-8 grid grid-cols-6'>
        <div
          className={classNames(
            'z-10 map-height sm:overflow-y-auto flex flex-col col-span-6 sm:col-span-2 gap-6 pb-16 sm:p-4 sm:-m-4',
            isMapView ? 'hidden sm:flex' : ''
          )}>
          {isLoading ? (
            <CenteredSpinner size='xl' />
          ) : results && results.length > 0 ? (
            <RestaurantList
              dispatch={dispatch}
              results={results}
              selectedLocation={selectedLocation}
              savedLocations={savedLocations}
            />
          ) : (
            <NoResults searchText={searchText} />
          )}
          <div className='py-8 sm:hidden' />
        </div>
        <div
          className={classNames(
            'col-span-6 sm:col-span-4 map-height -mx-6 -my-5 sm:-my-4 lg:-mx-8 sm:pl-12',
            isMapView ? '' : 'hidden sm:block'
          )}>
          <MapContainer />
        </div>
      </div>
      <ToggleMapListButton
        isMapView={isMapView}
        isLoading={isLoading}
        setMapView={setMapView}
      />
    </>
  )
}

type RestaurantListProps = {
  dispatch: Dispatch
  results: google.maps.places.PlaceResult[]
  selectedLocation?: google.maps.places.PlaceResult
  savedLocations?: SavedLocations
}

const RestaurantList: FC<RestaurantListProps> = ({
  dispatch,
  results,
  selectedLocation,
  savedLocations = {},
}) => {
  return (
    <>
      {results.map((place, i) => {
        const isSelected = place.place_id == selectedLocation?.place_id
        const isSaved = place.place_id
          ? place.place_id in savedLocations
          : false
        return (
          <RestaurantCard
            key={i}
            location={place}
            isSaved={isSaved}
            isSelected={isSelected}
            onClick={() => {
              dispatch(setSelectedLocation(place))
            }}
          />
        )
      })}
    </>
  )
}

type NoResultsProps = {
  searchText: string
}

const NoResults: FC<NoResultsProps> = ({ searchText }) => {
  return (
    <div className='flex h-full w-full justify-center items-center text-center'>
      <p className='text-gray-500'>
        {searchText.length == 0
          ? Strings.SEARCH_FOR_RESTAURANTS
          : Strings.NO_RESULTS_FOUND}
      </p>
    </div>
  )
}

export default Home
