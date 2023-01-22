import { FC, useState } from 'react'

import ToggleMapListButton from '../components/buttons/ToggleMapListButton'
import RestaurantCard from '../components/RestaurantCard'
import classNames from 'classnames'

type Props = {}

const Home: FC<Props> = () => {
  const [isMapView, setMapView] = useState(false)

  return (
    <>
      <div className='min-h-full max-w-full py-5 px-6 sm:py-4 lg:px-8 grid grid-cols-6'>
        <div className={classNames('sm:h-screen sm:overflow-y-auto flex flex-col col-span-6 sm:col-span-2 gap-6 pb-16 sm:p-4 sm:-m-4', isMapView ? 'hidden sm:flex' : '')}>
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
        </div>
        <div className={classNames('col-span-4', isMapView ? '' : 'hidden sm:flex')}></div>
      </div>
      <ToggleMapListButton isMapView={isMapView} setMapView={setMapView} />
    </>
  )
}

export default Home
