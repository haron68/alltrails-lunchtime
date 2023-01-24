import { FC } from 'react'

import { Button } from 'flowbite-react'

type Props = {
  statusCode?: number
}

const NotFound: FC<Props> = ({ statusCode = 404 }) => {
  return (
    <div className='min-h-full py-16 px-6 sm:py-24 md:grid md:place-items-center lg:px-8 mx-auto max-w-4xl'>
      <main className='flex flex-col gap-4 justify-center align-center'>
        <p className='text-4xl font-bold tracking-tight text-muted-600 text-center'>
          {statusCode}
        </p>
        <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl text-center'>
          We've reached the end of the trail
        </h1>
        <p className='mt-1 text-2xl text-gray-500 text-center'>
          The page you're looking for either doesn't exist or has a new link.
          Let's get you back on the right path.
        </p>
        <div className='flex justify-center align-center'>
          <Button href='/' size='xl'>
            Go back home
          </Button>
        </div>
      </main>
    </div>
  )
}

export default NotFound
