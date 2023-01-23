import { FC } from 'react'

import { Spinner as DefaultSpinner, SpinnerProps } from 'flowbite-react'

type Props = {} & SpinnerProps

const CenteredSpinner: FC<Props> = ({ ...props }) => {
  return (
    <div className='flex h-full w-full justify-center items-center'>
      <DefaultSpinner {...props} />
    </div>
  )
}

export default CenteredSpinner
