import { FC } from 'react'

import RestaurantCard from '../components/RestaurantCard'

type Props = {}

const Home: FC<Props> = () => {
  return (
    <div className='min-h-full max-w-full py-5 px-6 sm:py-4 lg:px-8 grid grid-cols-6'>
      <div className='flex flex-col col-span-6 sm:col-span-2 gap-6'>
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
      </div>
      <div className='hidden sm:block col-span-4'></div>
    </div>
  )
}

export default Home
