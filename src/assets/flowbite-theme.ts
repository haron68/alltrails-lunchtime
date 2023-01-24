import { FlowbiteTheme } from 'flowbite-react'

const Theme: Partial<FlowbiteTheme> = {
  button: {
    base: 'group flex h-min items-center justify-center p-0.5 text-center font-bold focus:z-10',
    fullSized: 'w-full',
    color: {
      dark: 'text-white bg-gray-800 border border-transparent hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 disabled:hover:bg-gray-800',
      failure:
        'text-white bg-red-700 border border-transparent hover:bg-red-800 focus:ring-4 focus:ring-red-300 disabled:hover:bg-red-800',
      gray: 'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-primary-700 disabled:hover:bg-white focus:ring-primary-700 focus:text-primary-700',
      info: 'text-white bg-primary-700 border border-transparent hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 disabled:hover:bg-primary-700',
      light:
        'text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 disabled:hover:bg-white',
      purple:
        'text-white bg-purple-700 border border-transparent hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 disabled:hover:bg-purple-700',
      success:
        'text-white bg-green-400 border border-transparent hover:bg-green-600 focus:ring-4 focus:ring-green-300 disabled:hover:bg-green-700',
      warning:
        'text-white bg-yellow-400 border border-transparent hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 disabled:hover:bg-yellow-400',
    },
    disabled: 'cursor-not-allowed opacity-50',
    gradient: {
      cyan: 'text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-cyan-300',
      failure:
        'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-red-300',
      info: 'text-white bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-primary-300',
      lime: 'text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:ring-lime-300',
      pink: 'text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-pink-300',
      purple:
        'text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-300',
      success:
        'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-green-300',
      teal: 'text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-teal-300',
    },
    gradientDuoTone: {
      cyanToBlue:
        'text-white bg-gradient-to-r from-cyan-500 to-primary-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300',
      greenToBlue:
        'text-white bg-gradient-to-br from-green-400 to-primary-600 hover:bg-gradient-to-bl focus:ring-4 focus:ring-green-200',
      pinkToOrange:
        'text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200',
      purpleToBlue:
        'text-white bg-gradient-to-br from-purple-600 to-primary-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-primary-300',
      purpleToPink:
        'text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:ring-purple-200',
      redToYellow:
        'text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-100',
      tealToLime:
        'text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 hover:!text-gray-900 focus:ring-4 focus:ring-lime-200',
    },
    inner: {
      base: 'flex items-center',
      position: {
        none: '',
        start: 'rounded-r-none',
        middle: '!rounded-none',
        end: 'rounded-l-none',
      },
      outline: 'border border-transparent',
    },
    label:
      'ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-green-200 text-xs font-semibold text-green-800',
    outline: {
      color: {
        gray: 'border border-gray-900',
        default: 'border-0',
        light: '',
      },
      off: '',
      on: 'bg-white text-gray-900 transition-all duration-75 ease-in group-hover:bg-opacity-0 group-hover:text-inherit',
      pill: {
        off: 'rounded-full',
        on: 'rounded-full',
      },
    },
    pill: {
      off: 'rounded-full',
      on: 'rounded-full',
    },
    size: {
      xs: 'text-xs px-2 py-1',
      sm: 'text-sm px-3 py-1.5',
      md: 'text-sm px-4 py-2',
      lg: 'text-base px-5 py-2.5',
      xl: 'text-base px-6 py-3',
    },
  },
  card: {
    base: 'flex rounded-2xl border border-gray-200 bg-white shadow-xl',
    children:
      'flex h-full w-full flex-col justify-center gap-0.5 p-4 overflow-hidden whitespace-nowrap',
    horizontal: {
      off: 'flex-col',
      on: 'flex-row',
    },
    href: 'hover:bg-gray-100',
    img: {
      base: '',
      horizontal: {
        off: 'rounded-t-2xl',
        on: 'h-20 w-20 object-none object-center my-4 ml-4',
      },
    },
  },
  spinner: {
    base: 'inline animate-spin text-gray-200',
    color: {
      failure: 'fill-red-600',
      gray: 'fill-gray-600',
      info: 'fill-primary-600',
      pink: 'fill-pink-600',
      purple: 'fill-purple-600',
      success: 'fill-green-500',
      warning: 'fill-yellow-400',
    },
    light: {
      off: {
        base: 'dark:text-gray-300',
        color: {
          failure: '',
          gray: 'dark:fill-gray-300',
          info: '',
          pink: '',
          purple: '',
          success: '',
          warning: '',
        },
      },
      on: {
        base: '',
        color: {
          failure: '',
          gray: '',
          info: '',
          pink: '',
          purple: '',
          success: '',
          warning: '',
        },
      },
    },
    size: {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-10 h-10',
    },
  },
  textInput: {
    base: 'flex',
    addon:
      'inline-flex items-center rounded-l-full border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900',
    field: {
      base: 'relative w-full',
      icon: {
        base: 'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3',
        svg: 'h-5 w-5 text-gray-500',
      },
      input: {
        base: 'block w-full border disabled:cursor-not-allowed disabled:opacity-50',
        sizes: {
          sm: 'p-2 sm:text-xs',
          md: 'p-2.5 text-sm',
          lg: 'sm:text-md p-4',
        },
        colors: {
          gray: 'border-none bg-gray-100 border-gray-300 text-gray-900 focus:border-primary-500 focus:ring-primary-500',
          info: 'border-primary-500 bg-primary-50 text-primary-900 placeholder-primary-700 focus:border-primary-500 focus:ring-primary-500',
          failure:
            'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500',
          warning:
            'border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500',
          success:
            'border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500',
        },
        withIcon: {
          on: 'pl-10',
          off: '',
        },
        withAddon: {
          on: 'rounded-r-full',
          off: 'rounded-full',
        },
        withShadow: {
          on: 'shadow-sm',
          off: '',
        },
      },
    },
  },
}

export default Theme
