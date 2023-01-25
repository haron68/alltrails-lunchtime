import { FC, MouseEventHandler, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { removeSavedLocation, saveLocation } from '../store/mapSlice'

import { BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline'
import {
  BookmarkIcon as BookmarkIconFilled,
  StarIcon,
} from '@heroicons/react/24/solid'
import classNames from 'classnames'
import { Card } from 'flowbite-react'

type Props = {
  location: google.maps.places.PlaceResult
  isSaved?: boolean
  isSelected?: boolean
  onClick?: MouseEventHandler<HTMLDivElement>
  className?: string | undefined
}

const RestaurantCard: FC<Props> = ({
  location,
  isSaved = false,
  isSelected = false,
  onClick,
  className,
}) => {
  const dispatch = useDispatch()
  const [imgSrc, setImgSrc] = useState<string>()

  const {
    name,
    rating,
    user_ratings_total: reviewCount,
    formatted_address: address,
    photos,
  } = location

  const photoReference =
    // @ts-ignore
    photos && photos.length > 0 ? photos[0].photo_reference : undefined

  const toggleSave = (ev: any) => {
    ev.stopPropagation()
    if (!isSaved) {
      dispatch(saveLocation(location))
    } else {
      dispatch(removeSavedLocation(location.place_id))
    }
  }

  useEffect(() => {
    if (photoReference) {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      const url = encodeURI(
        `${process.env.REACT_APP_GOOGLE_MAPS_PLACES_PHOTO_URI}?photo_reference=${photoReference}&maxheight=80&key=${apiKey}`
      )
      setImgSrc(url)
    }
  }, [photoReference])

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
        {isSaved ? (
          <BookmarkIconFilled
            onClick={toggleSave}
            className='h-6 w-6 cursor-pointer text-primary-700'
          />
        ) : (
          <BookmarkIconOutline
            onClick={toggleSave}
            className='h-6 w-6 cursor-pointer text-primary-800'
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

export const getRestaurantCardHtml = (
  index: number,
  location: google.maps.places.PlaceResult,
  isSaved?: boolean
) => {
  const reviewCount = location.user_ratings_total
  const photos = location.photos as any[]
  const photoReference =
    photos && photos.length > 0 ? photos[0].photo_reference : undefined
  return `
    <div class="flex rounded-2xl bg-white flex-row" xmlns="http://www.w3.org/1999/html">
          ${
            photoReference
              ? `<img alt="" class="h-20 w-20 object-none object-center my-4 ml-4" src="https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photoReference}&amp;maxheight=80&amp;key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}">`
              : ``
          }<div class="flex h-full w-full flex-col justify-center gap-y-2 p-4 overflow-hidden whitespace-nowrap"><div class="w-full flex flex-row justify-between"><h5 class="text-lg font-bold tracking-tight text-gray-900 text-ellipsis overflow-hidden max-w-[80%]">${
    location.name
  }</h5>
          <button class="h-fit w-fit" onclick="const saveEvent = new CustomEvent('toggleSave', {detail: ${index}}); document.dispatchEvent(saveEvent);">
          <svg xmlns="http://www.w3.org/2000/svg" fill="${
            isSaved ? 'currentColor' : 'none'
          }" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="h-6 w-6 cursor-pointer ${
    isSaved ? 'text-primary-700' : 'text-primary-800'
  }"><path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"></path></svg></div><div class="flex flex-row items-center gap-2"><div class="flex flex-row items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-4 w-4 mr-1 text-primary-200"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd"></path></svg>
          </button>
          <p class="font-normal text-gray-900">${location.rating}</p></div>
          ${
            reviewCount
              ? `<div class='h-1 w-1 rounded-full bg-gray-700'></div>
            <p class='font-normal text-gray-500'>
            (${Intl.NumberFormat('en-US', {
              minimumFractionDigits: 0,
            }).format(reviewCount)})
            </p>`
              : ``
          }
        </div><p class="font-normal text-gray-500 text-ellipsis overflow-hidden">${
          location.formatted_address
        }</p></div>
        </div>
        `
}

export default RestaurantCard
