import { FC } from 'react'
import { Outlet } from 'react-router'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { TextInput } from 'flowbite-react'

type Props = {}

const AppLayout: FC<Props> = () => {
  return (
    <>
      <div className='sticky top-0 bg-white z-50'>
        <div
          className='pointer-events-none absolute inset-0 z-30 shadow'
          aria-hidden='true'
        />
        <div className='relative z-20'>
          <div className='mx-auto flex flex-col gap-4 sm:flex-row max-w-full items-center justify-between py-5 px-6 sm:py-4 md:space-x-10 lg:px-8'>
            <div className='text-center sm:text-left'>
              <a href='/' className='flex'>
                <span className='sr-only'>AllTrails</span>
                <img
                  className='h-auto w-56'
                  src='/logo-lunchtime.png'
                  alt='logo'
                />
              </a>
            </div>
            <div className='w-full sm:w-72'>
              <TextInput
                sizing='sm'
                icon={MagnifyingGlassIcon}
                placeholder='Search restaurants'
              />
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default AppLayout
