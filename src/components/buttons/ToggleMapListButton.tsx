import { Dispatch, FC, SetStateAction } from 'react'

import MapIcon from '../../assets/icons/map-filled.svg'

import { ListBulletIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { Button, ButtonProps, Spinner } from 'flowbite-react'

type Props = {
  isMapView: boolean
  isLoading: boolean
  setMapView: Dispatch<SetStateAction<boolean>>
} & ButtonProps

const ToggleMapListButton: FC<Props> = ({
  isMapView,
  isLoading,
  setMapView,
  className,
  ...props
}) => {
  const onToggleView = () => setMapView(!isMapView)

  return (
    <div className='block sm:hidden fixed bottom-5 left-1/2 w-fit z-10'>
      <Button
        {...props}
        className={classNames('shadow-lg relative w-24 -ml-12', className)}
        onClick={onToggleView}>
        <ToggleBtnContent isMapView={isMapView} isLoading={isLoading} />
      </Button>
    </div>
  )
}

type ToggleBtnContentProps = {
  isMapView: boolean
  isLoading: boolean
}

const ToggleBtnContent: FC<ToggleBtnContentProps> = ({
  isLoading,
  isMapView,
}) => {
  if (isLoading && isMapView) {
    // show loading indicator when in mapview mode for mobile UX
    return <Spinner />
  }

  return isMapView ? (
    <>
      <ListBulletIcon className='h-6 w-6 mr-2' /> List
    </>
  ) : (
    <>
      <img src={MapIcon} className='h-6 w-6 mr-2' alt='' /> Map
    </>
  )
}
export default ToggleMapListButton
