import { FC, useState } from 'react'
import { useSelector } from 'react-redux'

import ToggleMapListButton from '../../components/buttons/ToggleMapListButton'
import RestaurantCard from '../../components/RestaurantCard'
import CenteredSpinner from '../../components/views/CenteredSpinner'
import MapContainer from '../../components/views/Map/MapContainer'
import { Strings } from '../../constants/strings'
import {
  selectAllResults,
  selectLoading,
  selectSearchText,
} from '../../store/mapSlice'
import './home.css'

import classNames from 'classnames'

type Props = {}

const Home: FC<Props> = () => {
  const [isMapView, setMapView] = useState(false)
  const isLoading = useSelector(selectLoading)
  const searchText = useSelector(selectSearchText)
  const results = useSelector(selectAllResults)

  const RestaurantList = () => {
    return (
      <>
        {results.map((place) => {
          const photos = place.photos as any[]
          const photoReference =
            photos && photos.length > 0 ? photos[0].photo_reference : undefined
          return (
            <RestaurantCard
              name={place.name}
              rating={place.rating}
              reviewCount={place.user_ratings_total}
              address={place.formatted_address}
              photoRef={photoReference}
            />
          )
        })}
      </>
    )
  }

  const NoResults = () => {
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
            <RestaurantList />
          ) : (
            <NoResults />
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
      <ToggleMapListButton isMapView={isMapView} setMapView={setMapView} />
    </>
  )
}

export default Home
