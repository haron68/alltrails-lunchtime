import { Dispatch, FC, SetStateAction } from 'react'

import MapIcon from '../../assets/icons/map-filled.svg'

import { ListBulletIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { Button, ButtonProps } from 'flowbite-react'

type Props = {
  isMapView: boolean
  setMapView: Dispatch<SetStateAction<boolean>>
} & ButtonProps

const ToggleMapListButton: FC<Props> = ({
  isMapView,
  setMapView,
  className,
  ...props
}) => {
  const handleToggleView = () => setMapView(!isMapView)

  const ToggleBtnContent = () =>
    isMapView ? (
      <>
        <ListBulletIcon className='h-6 w-6 mr-2' /> List
      </>
    ) : (
      <>
        <img src={MapIcon} className='h-6 w-6 mr-2' alt='' /> Map
      </>
    )

  return (
    <div className='block sm:hidden fixed bottom-5 left-1/2 w-fit z-10'>
      <Button
        {...props}
        className={classNames('shadow-lg relative w-24 -ml-12', className)}
        onClick={handleToggleView}>
        <ToggleBtnContent />
      </Button>
    </div>
  )
}

export default ToggleMapListButton
