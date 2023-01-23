import { FC, useState } from 'react'
import { useSelector } from 'react-redux'

import ToggleMapListButton from '../../components/buttons/ToggleMapListButton'
import CenteredSpinner from '../../components/views/CenteredSpinner'
import MapView from '../../components/views/Map/MapView'
import { selectAllResults, selectLoading } from '../../store/mapSlice'
import { AppState } from '../../store/store'
import './home.css'

import classNames from 'classnames'

type Props = {}

const Home: FC<Props> = () => {
  const [isMapView, setMapView] = useState(false)
  const isLoading = useSelector<AppState, boolean>(selectLoading)
  const results = useSelector<AppState, any[]>(selectAllResults)

  const NoResults = () => {
    return (
      <div className='flex h-full w-full justify-center items-center text-center'>
        <p className='text-gray-500'>No results found</p>
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
          {isLoading ? <CenteredSpinner size='xl' /> : <></>}
          <div className='py-8 sm:hidden' />
        </div>
        <div
          className={classNames(
            'col-span-6 sm:col-span-4 map-height -mx-6 -my-5 sm:-my-4 lg:-mx-8 sm:pl-12',
            isMapView ? '' : 'hidden sm:block'
          )}>
          <MapView />
        </div>
      </div>
      <ToggleMapListButton isMapView={isMapView} setMapView={setMapView} />
    </>
  )
}

export default Home
