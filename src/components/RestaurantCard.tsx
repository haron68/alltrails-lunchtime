import { FC, useState } from 'react'

import { BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline'
import {
  BookmarkIcon as BookmarkIconFilled,
  StarIcon,
} from '@heroicons/react/24/solid'
import { Card } from 'flowbite-react'

type Props = {
  isSaved?: boolean
}

const RestaurantCard: FC<Props> = ({ isSaved = false }) => {
  const [saved, setSaved] = useState(isSaved)

  const toggleSave = () => {
    setSaved(!saved)
  }

  return (
    <Card
      horizontal={true}
      imgSrc='https://flowbite.com/docs/images/blog/image-4.jpg'>
      <div className='w-full flex flex-row justify-between'>
        <h5 className='text-lg font-bold tracking-tight text-gray-900 text-ellipsis'>
          Taco Bell
        </h5>
        {saved ? (
          <BookmarkIconFilled
            onClick={toggleSave}
            className='h-6 w-6 cursor-pointer text-primary-700'
          />
        ) : (
          <BookmarkIconOutline
            onClick={toggleSave}
            className='h-6 w-6 cursor-pointer text-primary-700'
          />
        )}
      </div>
      <div className='flex flex-row items-center gap-2'>
        <div className='flex flex-row items-center'>
          <StarIcon className='h-4 w-4 mr-1 text-primary-200' />
          <p className='font-normal text-gray-900'>4.8</p>
        </div>
        <div className='h-1 w-1 rounded-full bg-gray-700' />
        <p className='font-normal text-gray-500'>
          (
          {Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
          }).format(1500)}
          )
        </p>
      </div>
      <p className='font-normal text-gray-500 text-ellipsis'>
        Taco bell restaurant
      </p>
    </Card>
  )
}

export default RestaurantCard
