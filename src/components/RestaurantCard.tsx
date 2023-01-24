import { FC, MouseEventHandler, useEffect, useState } from 'react'

import { BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline'
import {
  BookmarkIcon as BookmarkIconFilled,
  StarIcon,
} from '@heroicons/react/24/solid'
import classNames from 'classnames'
import { Card } from 'flowbite-react'

type Props = {
  name?: string
  rating?: number
  reviewCount?: number
  address?: string
  isSaved?: boolean
  isSelected?: boolean
  photoRef?: string
  onClick?: MouseEventHandler<HTMLDivElement>
  className?: string | undefined
}

const RestaurantCard: FC<Props> = ({
  name,
  rating,
  reviewCount,
  address,
  isSaved = false,
  isSelected = false,
  photoRef,
  onClick,
  className,
}) => {
  const [saved, setSaved] = useState(isSaved)
  const [imgSrc, setImgSrc] = useState<string>()

  const toggleSave = (event: any) => {
    event.stopPropagation()
    setSaved(!saved)
  }

  useEffect(() => {
    if (photoRef) {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      const url = encodeURI(
        `${process.env.REACT_APP_GOOGLE_MAPS_PLACES_PHOTO_URI}?photo_reference=${photoRef}&maxheight=80&key=${apiKey}`
      )
      setImgSrc(url)
    }
  }, [photoRef])

  return (
    <Card
      horizontal={true}
      imgSrc={imgSrc}
      className={classNames(
        isSelected ? 'border border-2 border-primary-700' : '',
        onClick ? 'cursor-pointer' : '',
        className
      )}
      onClick={onClick}>
      <div className='w-full flex flex-row justify-between'>
        <h5 className='text-lg font-bold tracking-tight text-gray-900 text-ellipsis overflow-hidden max-w-[80%]'>
          {name}
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
          <p className='font-normal text-gray-900'>{rating}</p>
        </div>
        {reviewCount ? (
          <>
            <div className='h-1 w-1 rounded-full bg-gray-700' />
            <p className='font-normal text-gray-500'>
              (
              {Intl.NumberFormat('en-US', {
                minimumFractionDigits: 0,
              }).format(reviewCount)}
              )
            </p>
          </>
        ) : null}
      </div>
      <p className='font-normal text-gray-500 text-ellipsis overflow-hidden'>
        {address}
      </p>
    </Card>
  )
}

export default RestaurantCard
